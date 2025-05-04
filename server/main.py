
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Header, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from typing import List, Dict, Any, Optional
import clickhouse_connect
import pandas as pd
import io
import csv
import jwt
from pydantic import BaseModel

app = FastAPI(title="ClickHouse Connector Flow API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ColumnSchema(BaseModel):
    name: str
    type: str

class TableSchema(BaseModel):
    name: str
    columns: List[ColumnSchema]

class ConnectionDetails(BaseModel):
    host: str
    port: str
    database: str
    username: str
    password: Optional[str] = None
    use_jwt: bool = False
    jwt_token: Optional[str] = None

class JoinKeyPair(BaseModel):
    first_table_key: str
    second_table_key: str

class JoinConfig(BaseModel):
    second_table: str
    join_type: str  # INNER, LEFT, RIGHT, FULL
    join_keys: List[JoinKeyPair]

class QueryConfig(BaseModel):
    table_name: str
    columns: List[str]
    join_config: Optional[JoinConfig] = None

class ProcessingResult(BaseModel):
    success: bool
    records_processed: int
    message: str
    download_url: Optional[str] = None
    error: Optional[str] = None

# ClickHouse service
class ClickHouseService:
    def __init__(self, connection_details: ConnectionDetails):
        self.connection_details = connection_details
        self.client = None
    
    def connect(self):
        """Connect to ClickHouse using the provided details."""
        try:
            if self.connection_details.use_jwt and self.connection_details.jwt_token:
                # JWT authentication logic would go here
                # This is a placeholder implementation
                headers = {'Authorization': f'Bearer {self.connection_details.jwt_token}'}
                self.client = clickhouse_connect.get_client(
                    host=self.connection_details.host,
                    port=int(self.connection_details.port),
                    database=self.connection_details.database,
                    username=self.connection_details.username,
                    password=self.connection_details.password if self.connection_details.password else '',
                    http_headers=headers
                )
            else:
                # Standard authentication
                self.client = clickhouse_connect.get_client(
                    host=self.connection_details.host,
                    port=int(self.connection_details.port),
                    database=self.connection_details.database,
                    username=self.connection_details.username,
                    password=self.connection_details.password if self.connection_details.password else ''
                )
            return True
        except Exception as e:
            print(f"Connection error: {str(e)}")
            return False
    
    def list_tables(self):
        """List all tables in the database."""
        if not self.client:
            raise Exception("Not connected to ClickHouse")
        
        query = f"SHOW TABLES FROM {self.connection_details.database}"
        result = self.client.query(query)
        tables = []
        
        for row in result.named_results():
            table_name = row['name']
            columns = self.describe_table(table_name)
            tables.append(TableSchema(name=table_name, columns=columns))
            
        return tables
    
    def describe_table(self, table_name: str):
        """Get column information for a specific table."""
        if not self.client:
            raise Exception("Not connected to ClickHouse")
            
        query = f"DESCRIBE TABLE {table_name}"
        result = self.client.query(query)
        
        columns = []
        for row in result.named_results():
            columns.append(ColumnSchema(name=row['name'], type=row['type']))
            
        return columns
    
    def execute_query(self, query: str):
        """Execute a SQL query on ClickHouse."""
        if not self.client:
            raise Exception("Not connected to ClickHouse")
            
        return self.client.query(query)
    
    def preview_data(self, table_name: str, columns: List[str], join_config: Optional[JoinConfig] = None, limit: int = 100):
        """Preview data from a table with optional joins."""
        if not self.client:
            raise Exception("Not connected to ClickHouse")
            
        column_str = ", ".join(columns) if columns else "*"
        
        if join_config:
            # Build JOIN clause
            join_clause = f"{join_config.join_type} JOIN {join_config.second_table} ON "
            join_conditions = []
            
            for key_pair in join_config.join_keys:
                join_conditions.append(
                    f"{table_name}.{key_pair.first_table_key} = {join_config.second_table}.{key_pair.second_table_key}"
                )
                
            join_clause += " AND ".join(join_conditions)
            query = f"SELECT {column_str} FROM {table_name} {join_clause} LIMIT {limit}"
        else:
            query = f"SELECT {column_str} FROM {table_name} LIMIT {limit}"
            
        result = self.client.query(query)
        return result.named_results()
    
    def export_to_csv(self, table_name: str, columns: List[str], join_config: Optional[JoinConfig] = None):
        """Export data from ClickHouse to CSV."""
        if not self.client:
            raise Exception("Not connected to ClickHouse")
            
        column_str = ", ".join(columns) if columns else "*"
        
        if join_config:
            # Build JOIN clause
            join_clause = f"{join_config.join_type} JOIN {join_config.second_table} ON "
            join_conditions = []
            
            for key_pair in join_config.join_keys:
                join_conditions.append(
                    f"{table_name}.{key_pair.first_table_key} = {join_config.second_table}.{key_pair.second_table_key}"
                )
                
            join_clause += " AND ".join(join_conditions)
            query = f"SELECT {column_str} FROM {table_name} {join_clause}"
        else:
            query = f"SELECT {column_str} FROM {table_name}"
            
        result = self.client.query(query)
        data = result.named_results()
        
        # Convert to CSV
        output = io.StringIO()
        writer = csv.DictWriter(output, fieldnames=columns)
        writer.writeheader()
        writer.writerows(data)
        
        return output.getvalue(), len(data)
    
    def import_from_csv(self, table_name: str, csv_data, columns: List[ColumnSchema]):
        """Import CSV data into ClickHouse."""
        if not self.client:
            raise Exception("Not connected to ClickHouse")
            
        # Check if table exists
        try:
            self.describe_table(table_name)
            table_exists = True
        except:
            table_exists = False
            
        # Create table if it doesn't exist
        if not table_exists:
            column_defs = []
            for col in columns:
                column_defs.append(f"{col.name} {col.type}")
                
            create_query = f"CREATE TABLE {table_name} ({', '.join(column_defs)}) ENGINE = MergeTree() ORDER BY tuple()"
            self.client.command(create_query)
            
        # Parse CSV data
        df = pd.read_csv(csv_data)
        
        # Insert data into ClickHouse
        records_processed = self.client.insert_df(table_name, df)
        
        return records_processed

# CSV service
class CSVService:
    @staticmethod
    def parse_csv(file):
        """Parse CSV file and return column types and sample data."""
        content = file.file.read()
        file.file.seek(0)  # Reset file pointer
        
        # Read CSV into pandas DataFrame
        df = pd.read_csv(io.BytesIO(content))
        
        # Determine column types
        columns = []
        for col_name, dtype in df.dtypes.items():
            ch_type = "String"  # Default type
            
            # Map pandas dtypes to ClickHouse types
            if pd.api.types.is_integer_dtype(dtype):
                ch_type = "Int32"
            elif pd.api.types.is_float_dtype(dtype):
                ch_type = "Float64"
            elif pd.api.types.is_datetime64_dtype(dtype):
                ch_type = "DateTime"
            elif pd.api.types.is_bool_dtype(dtype):
                ch_type = "UInt8"
                
            columns.append(ColumnSchema(name=col_name, type=ch_type))
            
        # Get sample data
        sample_data = df.head(5).to_dict('records')
        
        return {
            "columns": columns,
            "sample_data": sample_data
        }
    
    @staticmethod
    def validate_schema(csv_columns, clickhouse_columns):
        """Validate that CSV columns match ClickHouse table schema."""
        # Implementation would check compatibility between CSV and ClickHouse types
        # For now, just return True for the prototype
        return True

# API endpoints
@app.post("/connect", response_model=bool)
async def connect(connection_details: ConnectionDetails):
    """Connect to a ClickHouse server."""
    try:
        service = ClickHouseService(connection_details)
        success = service.connect()
        return success
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Connection error: {str(e)}")

@app.post("/tables", response_model=List[TableSchema])
async def list_tables(connection_details: ConnectionDetails = Body(...)):
    """List all tables in the database."""
    try:
        service = ClickHouseService(connection_details)
        if not service.connect():
            raise HTTPException(status_code=400, detail="Failed to connect to ClickHouse")
            
        tables = service.list_tables()
        return tables
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing tables: {str(e)}")

@app.post("/preview", response_model=List[Dict[str, Any]])
async def preview_data(query_config: QueryConfig, connection_details: ConnectionDetails = Body(...)):
    """Preview data from ClickHouse."""
    try:
        service = ClickHouseService(connection_details)
        if not service.connect():
            raise HTTPException(status_code=400, detail="Failed to connect to ClickHouse")
            
        data = service.preview_data(
            query_config.table_name, 
            query_config.columns, 
            query_config.join_config
        )
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error previewing data: {str(e)}")

@app.post("/export", response_model=ProcessingResult)
async def export_to_csv(query_config: QueryConfig, connection_details: ConnectionDetails = Body(...)):
    """Export data from ClickHouse to CSV."""
    try:
        service = ClickHouseService(connection_details)
        if not service.connect():
            raise HTTPException(status_code=400, detail="Failed to connect to ClickHouse")
            
        csv_data, record_count = service.export_to_csv(
            query_config.table_name, 
            query_config.columns, 
            query_config.join_config
        )
        
        # In a real implementation, the CSV would be saved to a file or object storage
        # and a download URL would be returned. For the prototype, we'll return a success response.
        
        return ProcessingResult(
            success=True,
            records_processed=record_count,
            message=f"Successfully exported {record_count} records from {query_config.table_name}",
            download_url="/download/export.csv"  # This would be a real URL in production
        )
    except Exception as e:
        return ProcessingResult(
            success=False,
            records_processed=0,
            message="Export failed",
            error=str(e)
        )

@app.post("/parse-csv", response_model=Dict[str, Any])
async def parse_csv(file: UploadFile = File(...)):
    """Parse a CSV file and return column information and sample data."""
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")
        
    try:
        csv_service = CSVService()
        result = csv_service.parse_csv(file)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing CSV: {str(e)}")

@app.post("/import", response_model=ProcessingResult)
async def import_csv(
    table_name: str, 
    file: UploadFile = File(...),
    connection_details: ConnectionDetails = Body(...)
):
    """Import CSV data into ClickHouse."""
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")
        
    try:
        # Parse CSV to get columns
        csv_service = CSVService()
        parse_result = csv_service.parse_csv(file)
        columns = parse_result["columns"]
        
        # Connect to ClickHouse
        ch_service = ClickHouseService(connection_details)
        if not ch_service.connect():
            raise HTTPException(status_code=400, detail="Failed to connect to ClickHouse")
        
        # Import data
        file.file.seek(0)  # Reset file pointer
        records_processed = ch_service.import_from_csv(table_name, file.file, columns)
        
        return ProcessingResult(
            success=True,
            records_processed=records_processed,
            message=f"Successfully imported {records_processed} records to {table_name}"
        )
    except Exception as e:
        return ProcessingResult(
            success=False,
            records_processed=0,
            message="Import failed",
            error=str(e)
        )

# For development purposes - a simple health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
