import pandas as pd
import clickhouse_connect

def import_csv_to_clickhouse(table_name, csv_file):
    # Connect to ClickHouse
    client = clickhouse_connect.get_client(host='localhost', port=9000, username='default')
    
    # Read CSV file
    df = pd.read_csv(csv_file)
    
    # Convert DataFrame to list of dictionaries
    data = df.to_dict('records')
    
    # Get column names and types from the table
    result = client.query(f"DESCRIBE TABLE {table_name}")
    columns = [row['name'] for row in result.named_results()]
    
    # Insert data
    client.insert(table_name, data, column_names=columns)
    
    print(f"Successfully imported {len(data)} records into {table_name}")

if __name__ == "__main__":
    # List of tables and their CSV files
    tables = {
        'customer_analytics': 'customer_analytics.csv',
        'website_analytics': 'website_analytics.csv',
        'product_inventory': 'product_inventory.csv',
        'sales_transactions': 'sales_transactions.csv',
        'marketing_campaigns': 'marketing_campaigns.csv',
        'social_media_metrics': 'social_media_metrics.csv'
    }
    
    # Import each table
    for table, csv_file in tables.items():
        try:
            import_csv_to_clickhouse(table, csv_file)
        except Exception as e:
            print(f"Error importing {table}: {str(e)}")
