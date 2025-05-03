
// This file would normally interact with our FastAPI backend
// Since we're mocking the backend for the frontend prototype, we'll simulate API responses

export interface ConnectionDetails {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  useJwt: boolean;
  jwtToken: string;
}

export interface Column {
  name: string;
  type: string;
}

export interface Table {
  name: string;
  columns: Column[];
}

export interface JoinConfig {
  secondTable: string;
  joinType: 'INNER' | 'LEFT' | 'RIGHT' | 'FULL';
  joinKeys: {
    firstTableKey: string;
    secondTableKey: string;
  }[];
}

export interface ProcessingResult {
  success: boolean;
  recordsProcessed: number;
  message: string;
  downloadUrl?: string;
  error?: string;
}

// Mock data for development
const MOCK_TABLES: Table[] = [
  {
    name: 'uk_price_paid',
    columns: [
      { name: 'id', type: 'String' },
      { name: 'price', type: 'UInt32' },
      { name: 'date', type: 'Date' },
      { name: 'postcode', type: 'String' },
      { name: 'property_type', type: 'String' },
      { name: 'old_new', type: 'String' },
      { name: 'duration', type: 'String' },
      { name: 'addr1', type: 'String' },
      { name: 'addr2', type: 'String' },
      { name: 'street', type: 'String' },
      { name: 'locality', type: 'String' },
      { name: 'town', type: 'String' },
      { name: 'district', type: 'String' },
      { name: 'county', type: 'String' },
    ]
  },
  {
    name: 'ontime',
    columns: [
      { name: 'Year', type: 'UInt16' },
      { name: 'Quarter', type: 'UInt8' },
      { name: 'Month', type: 'UInt8' },
      { name: 'DayofMonth', type: 'UInt8' },
      { name: 'DayOfWeek', type: 'UInt8' },
      { name: 'FlightDate', type: 'Date' },
      { name: 'UniqueCarrier', type: 'String' },
      { name: 'AirlineID', type: 'UInt32' },
      { name: 'Carrier', type: 'String' },
      { name: 'TailNum', type: 'String' },
      { name: 'FlightNum', type: 'String' },
      { name: 'OriginAirportID', type: 'UInt32' },
      { name: 'OriginAirportSeqID', type: 'UInt32' },
      { name: 'OriginCityMarketID', type: 'UInt32' },
      { name: 'Origin', type: 'String' },
      { name: 'OriginCityName', type: 'String' },
      { name: 'OriginState', type: 'String' },
      { name: 'OriginStateFips', type: 'String' },
      { name: 'OriginStateName', type: 'String' },
      { name: 'OriginWac', type: 'UInt32' },
      { name: 'DestAirportID', type: 'UInt32' },
      { name: 'DestAirportSeqID', type: 'UInt32' },
      { name: 'DestCityMarketID', type: 'UInt32' },
      { name: 'Dest', type: 'String' },
      { name: 'DestCityName', type: 'String' },
      { name: 'DestState', type: 'String' },
      { name: 'DestStateFips', type: 'String' },
      { name: 'DestStateName', type: 'String' },
      { name: 'DestWac', type: 'UInt32' },
      { name: 'DepTime', type: 'String' },
      { name: 'DepDelay', type: 'Int32' },
      { name: 'DepDelayMinutes', type: 'UInt16' },
      { name: 'ArrTime', type: 'String' },
      { name: 'ArrDelay', type: 'Int32' },
      { name: 'ArrDelayMinutes', type: 'UInt16' },
      { name: 'Cancelled', type: 'UInt8' },
      { name: 'Diverted', type: 'UInt8' },
      { name: 'Distance', type: 'UInt16' },
    ]
  }
];

// Mock sample data
const MOCK_DATA = {
  'uk_price_paid': [
    { id: 'A1B2C3', price: 250000, date: '2023-01-15', postcode: 'SW1A 1AA', property_type: 'F', old_new: 'N', duration: 'L', addr1: '123', addr2: '', street: 'High St', locality: 'Westminster', town: 'London', district: 'City of Westminster', county: 'Greater London' },
    { id: 'D4E5F6', price: 175000, date: '2023-02-22', postcode: 'M1 1AE', property_type: 'T', old_new: 'O', duration: 'F', addr1: '45', addr2: '', street: 'Market St', locality: 'City Centre', town: 'Manchester', district: 'Manchester', county: 'Greater Manchester' },
    { id: 'G7H8I9', price: 320000, date: '2023-03-05', postcode: 'B1 1BD', property_type: 'S', old_new: 'N', duration: 'L', addr1: '8', addr2: '', street: 'Corporation St', locality: 'City Centre', town: 'Birmingham', district: 'Birmingham', county: 'West Midlands' },
  ],
  'ontime': [
    { Year: 2008, Quarter: 1, Month: 1, DayofMonth: 3, DayOfWeek: 4, FlightDate: '2008-01-03', UniqueCarrier: 'AA', AirlineID: 19805, Carrier: 'AA', TailNum: 'N3ALAA', FlightNum: '1', OriginAirportID: 12478, OriginAirportSeqID: 1247802, OriginCityMarketID: 31703, Origin: 'JFK', OriginCityName: 'New York, NY', OriginState: 'NY', OriginStateFips: '36', OriginStateName: 'New York', OriginWac: 22, DestAirportID: 12892, DestAirportSeqID: 1289203, DestCityMarketID: 32575, Dest: 'LAX', DestCityName: 'Los Angeles, CA', DestState: 'CA', DestStateFips: '06', DestStateName: 'California', DestWac: 91, DepTime: '0900', DepDelay: 0, DepDelayMinutes: 0, ArrTime: '1224', ArrDelay: 14, ArrDelayMinutes: 14, Cancelled: 0, Diverted: 0, Distance: 2475 },
    { Year: 2008, Quarter: 1, Month: 1, DayofMonth: 3, DayOfWeek: 4, FlightDate: '2008-01-03', UniqueCarrier: 'AA', AirlineID: 19805, Carrier: 'AA', TailNum: 'N4XDAA', FlightNum: '2', OriginAirportID: 12892, OriginAirportSeqID: 1289203, OriginCityMarketID: 32575, Origin: 'LAX', OriginCityName: 'Los Angeles, CA', OriginState: 'CA', OriginStateFips: '06', OriginStateName: 'California', OriginWac: 91, DestAirportID: 12478, DestAirportSeqID: 1247802, DestCityMarketID: 31703, Dest: 'JFK', DestCityName: 'New York, NY', DestState: 'NY', DestStateFips: '36', DestStateName: 'New York', DestWac: 22, DepTime: '1230', DepDelay: -5, DepDelayMinutes: 0, ArrTime: '2050', ArrDelay: -10, ArrDelayMinutes: 0, Cancelled: 0, Diverted: 0, Distance: 2475 },
    { Year: 2008, Quarter: 1, Month: 1, DayofMonth: 3, DayOfWeek: 4, FlightDate: '2008-01-03', UniqueCarrier: 'AA', AirlineID: 19805, Carrier: 'AA', TailNum: 'N5DGAA', FlightNum: '3', OriginAirportID: 12892, OriginAirportSeqID: 1289203, OriginCityMarketID: 32575, Origin: 'LAX', OriginCityName: 'Los Angeles, CA', OriginState: 'CA', OriginStateFips: '06', OriginStateName: 'California', OriginWac: 91, DestAirportID: 14107, DestAirportSeqID: 1410702, DestCityMarketID: 34819, Dest: 'SFO', DestCityName: 'San Francisco, CA', DestState: 'CA', DestStateFips: '06', DestStateName: 'California', DestWac: 91, DepTime: '0800', DepDelay: 10, DepDelayMinutes: 10, ArrTime: '0930', ArrDelay: 5, ArrDelayMinutes: 5, Cancelled: 0, Diverted: 0, Distance: 337 },
  ]
};

// Simulated API functions
export const api = {
  // Connect to ClickHouse
  connect: async (connectionDetails: ConnectionDetails): Promise<boolean> => {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Always succeed for the prototype
    return true;
  },
  
  // List tables in the database
  listTables: async (): Promise<Table[]> => {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return MOCK_TABLES;
  },
  
  // Describe a table (get columns)
  describeTable: async (tableName: string): Promise<Column[]> => {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const table = MOCK_TABLES.find(t => t.name === tableName);
    return table ? table.columns : [];
  },
  
  // Preview data from a table
  previewData: async (
    tableName: string, 
    columns: string[],
    joinConfig?: JoinConfig
  ): Promise<any[]> => {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (joinConfig) {
      // Mock joined data for prototype
      const data1 = MOCK_DATA[tableName as keyof typeof MOCK_DATA] || [];
      const data2 = MOCK_DATA[joinConfig.secondTable as keyof typeof MOCK_DATA] || [];
      
      // Very simple mock join - just combine a few records
      return data1.slice(0, 3).map((item, index) => ({
        ...item,
        ...data2[index % data2.length]
      }));
    }
    
    // Filter columns if available
    const tableData = MOCK_DATA[tableName as keyof typeof MOCK_DATA] || [];
    
    if (columns.length > 0) {
      return tableData.map((row) => {
        const filteredRow: Record<string, any> = {};
        columns.forEach(col => {
          if (row.hasOwnProperty(col)) {
            filteredRow[col] = row[col];
          }
        });
        return filteredRow;
      });
    }
    
    return tableData;
  },
  
  // Export table data to CSV
  exportToCSV: async (
    tableName: string, 
    columns: string[],
    joinConfig?: JoinConfig
  ): Promise<ProcessingResult> => {
    // Simulate network latency for a larger operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Always succeed for the prototype
    return {
      success: true,
      recordsProcessed: 10000,
      message: `Successfully exported data from ${tableName}${joinConfig ? ' with join' : ''}`,
      downloadUrl: 'data:text/csv;charset=utf-8,id,price,date,postcode\nA1B2C3,250000,2023-01-15,SW1A1AA',
    };
  },
  
  // Parse uploaded CSV file
  parseCSV: async (file: File): Promise<{
    columns: Column[];
    sampleData: any[];
  }> => {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response with sample data
    return {
      columns: [
        { name: 'id', type: 'String' },
        { name: 'price', type: 'UInt32' },
        { name: 'date', type: 'Date' },
        { name: 'postcode', type: 'String' },
        { name: 'property_type', type: 'String' },
      ],
      sampleData: [
        { id: 'X1Y2Z3', price: 425000, date: '2023-04-10', postcode: 'EC1V 9NR', property_type: 'F' },
        { id: 'W4V5U6', price: 350000, date: '2023-04-11', postcode: 'E14 5AB', property_type: 'T' },
        { id: 'T7S8R9', price: 275000, date: '2023-04-12', postcode: 'N1 9GU', property_type: 'S' },
      ]
    };
  },
  
  // Import CSV data to ClickHouse
  importCSV: async (file: File, tableName: string): Promise<ProcessingResult> => {
    // Simulate network latency for a larger operation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Always succeed for the prototype
    return {
      success: true,
      recordsProcessed: 5000,
      message: `Successfully imported data to ${tableName}`,
    };
  }
};
