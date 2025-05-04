
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
    name: 'customer_analytics',
    columns: [
      { name: 'customer_id', type: 'UInt32' },
      { name: 'first_name', type: 'String' },
      { name: 'last_name', type: 'String' },
      { name: 'email', type: 'String' },
      { name: 'country', type: 'String' },
      { name: 'signup_date', type: 'Date' },
      { name: 'last_purchase_date', type: 'Date' },
      { name: 'total_purchases', type: 'UInt32' },
      { name: 'total_spend', type: 'Float64' },
      { name: 'average_order_value', type: 'Float64' },
      { name: 'customer_segment', type: 'String' },
      { name: 'churn_risk', type: 'Float32' }
    ]
  },
  {
    name: 'website_analytics',
    columns: [
      { name: 'event_id', type: 'UUID' },
      { name: 'user_id', type: 'String' },
      { name: 'event_type', type: 'String' },
      { name: 'event_timestamp', type: 'DateTime' },
      { name: 'page_url', type: 'String' },
      { name: 'session_id', type: 'String' },
      { name: 'browser', type: 'String' },
      { name: 'os', type: 'String' },
      { name: 'device_type', type: 'String' },
      { name: 'country', type: 'String' },
      { name: 'city', type: 'String' },
      { name: 'page_views', type: 'UInt32' },
      { name: 'time_spent', type: 'Float32' },
      { name: 'is_conversion', type: 'Boolean' }
    ]
  },
  {
    name: 'product_inventory',
    columns: [
      { name: 'product_id', type: 'String' },
      { name: 'product_name', type: 'String' },
      { name: 'category', type: 'String' },
      { name: 'subcategory', type: 'String' },
      { name: 'price', type: 'Float64' },
      { name: 'stock_quantity', type: 'UInt32' },
      { name: 'last_updated', type: 'DateTime' },
      { name: 'supplier_id', type: 'String' },
      { name: 'supplier_name', type: 'String' },
      { name: 'lead_time', type: 'UInt8' },
      { name: 'reorder_point', type: 'UInt32' },
      { name: 'safety_stock', type: 'UInt32' }
    ]
  },
  {
    name: 'sales_transactions',
    columns: [
      { name: 'transaction_id', type: 'String' },
      { name: 'order_id', type: 'String' },
      { name: 'customer_id', type: 'UInt32' },
      { name: 'product_id', type: 'String' },
      { name: 'quantity', type: 'UInt32' },
      { name: 'unit_price', type: 'Float64' },
      { name: 'total_price', type: 'Float64' },
      { name: 'discount', type: 'Float32' },
      { name: 'tax', type: 'Float32' },
      { name: 'transaction_date', type: 'Date' },
      { name: 'transaction_time', type: 'DateTime' },
      { name: 'payment_method', type: 'String' },
      { name: 'status', type: 'String' },
      { name: 'shipping_address', type: 'String' },
      { name: 'billing_address', type: 'String' }
    ]
  },
  {
    name: 'marketing_campaigns',
    columns: [
      { name: 'campaign_id', type: 'String' },
      { name: 'campaign_name', type: 'String' },
      { name: 'start_date', type: 'Date' },
      { name: 'end_date', type: 'Date' },
      { name: 'budget', type: 'Float64' },
      { name: 'channel', type: 'String' },
      { name: 'target_audience', type: 'String' },
      { name: 'creative_type', type: 'String' },
      { name: 'status', type: 'String' },
      { name: 'impressions', type: 'UInt64' },
      { name: 'clicks', type: 'UInt64' },
      { name: 'conversions', type: 'UInt64' },
      { name: 'cost_per_click', type: 'Float64' },
      { name: 'conversion_rate', type: 'Float32' }
    ]
  },
  {
    name: 'social_media_metrics',
    columns: [
      { name: 'post_id', type: 'String' },
      { name: 'platform', type: 'String' },
      { name: 'post_date', type: 'Date' },
      { name: 'post_time', type: 'DateTime' },
      { name: 'content_type', type: 'String' },
      { name: 'engagement_type', type: 'String' },
      { name: 'likes', type: 'UInt64' },
      { name: 'comments', type: 'UInt64' },
      { name: 'shares', type: 'UInt64' },
      { name: 'reach', type: 'UInt64' },
      { name: 'impressions', type: 'UInt64' },
      { name: 'clicks', type: 'UInt64' },
      { name: 'sentiment_score', type: 'Float32' },
      { name: 'language', type: 'String' }
    ]
  }
];

// Mock sample data
const MOCK_DATA = {
  'customer_analytics': [
    { customer_id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', country: 'USA', signup_date: '2023-01-15', last_purchase_date: '2023-04-20', total_purchases: 15, total_spend: 1250.50, average_order_value: 83.37, customer_segment: 'High Value', churn_risk: 0.15 },
    { customer_id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', country: 'UK', signup_date: '2023-02-22', last_purchase_date: '2023-04-18', total_purchases: 8, total_spend: 675.25, average_order_value: 84.41, customer_segment: 'Medium Value', churn_risk: 0.25 },
    { customer_id: 3, first_name: 'Bob', last_name: 'Johnson', email: 'bob@example.com', country: 'Canada', signup_date: '2023-03-05', last_purchase_date: '2023-04-15', total_purchases: 5, total_spend: 350.75, average_order_value: 70.15, customer_segment: 'Low Value', churn_risk: 0.35 }
  ],
  'website_analytics': [
    { event_id: '123e4567-e89b-12d3-a456-426614174000', user_id: 'user123', event_type: 'page_view', event_timestamp: '2023-04-20 10:00:00', page_url: '/products', session_id: 'session1', browser: 'Chrome', os: 'Windows', device_type: 'Desktop', country: 'USA', city: 'New York', page_views: 1, time_spent: 30.5, is_conversion: false },
    { event_id: '123e4567-e89b-12d3-a456-426614174001', user_id: 'user456', event_type: 'click', event_timestamp: '2023-04-20 10:05:00', page_url: '/products', session_id: 'session2', browser: 'Safari', os: 'iOS', device_type: 'Mobile', country: 'UK', city: 'London', page_views: 1, time_spent: 15.2, is_conversion: true },
    { event_id: '123e4567-e89b-12d3-a456-426614174002', user_id: 'user789', event_type: 'purchase', event_timestamp: '2023-04-20 10:10:00', page_url: '/checkout', session_id: 'session3', browser: 'Firefox', os: 'Linux', device_type: 'Desktop', country: 'Canada', city: 'Toronto', page_views: 1, time_spent: 45.8, is_conversion: true }
  ],
  'product_inventory': [
    { product_id: 'P123', product_name: 'Premium Widget', category: 'Electronics', subcategory: 'Widgets', price: 99.99, stock_quantity: 50, last_updated: '2023-04-20 09:00:00', supplier_id: 'S123', supplier_name: 'Widget Supplier Inc', lead_time: 3, reorder_point: 20, safety_stock: 10 },
    { product_id: 'P456', product_name: 'Basic Widget', category: 'Electronics', subcategory: 'Widgets', price: 49.99, stock_quantity: 100, last_updated: '2023-04-20 09:05:00', supplier_id: 'S456', supplier_name: 'Budget Widgets Ltd', lead_time: 5, reorder_point: 30, safety_stock: 15 },
    { product_id: 'P789', product_name: 'Advanced Widget', category: 'Electronics', subcategory: 'Widgets', price: 149.99, stock_quantity: 30, last_updated: '2023-04-20 09:10:00', supplier_id: 'S789', supplier_name: 'Premium Widgets Corp', lead_time: 2, reorder_point: 15, safety_stock: 5 }
  ],
  'sales_transactions': [
    { transaction_id: 'T123', order_id: 'O123', customer_id: 1, product_id: 'P123', quantity: 2, unit_price: 99.99, total_price: 199.98, discount: 10, tax: 17.99, transaction_date: '2023-04-20', transaction_time: '2023-04-20 10:00:00', payment_method: 'Credit Card', status: 'Completed', shipping_address: '123 Main St', billing_address: '123 Main St' },
    { transaction_id: 'T456', order_id: 'O456', customer_id: 2, product_id: 'P456', quantity: 1, unit_price: 49.99, total_price: 49.99, discount: 0, tax: 4.50, transaction_date: '2023-04-20', transaction_time: '2023-04-20 10:05:00', payment_method: 'PayPal', status: 'Completed', shipping_address: '456 Oak Ave', billing_address: '456 Oak Ave' },
    { transaction_id: 'T789', order_id: 'O789', customer_id: 3, product_id: 'P789', quantity: 3, unit_price: 149.99, total_price: 449.97, discount: 15, tax: 35.99, transaction_date: '2023-04-20', transaction_time: '2023-04-20 10:10:00', payment_method: 'Bank Transfer', status: 'Pending', shipping_address: '789 Pine St', billing_address: '789 Pine St' }
  ],
  'marketing_campaigns': [
    { campaign_id: 'C123', campaign_name: 'Spring Sale 2023', start_date: '2023-03-01', end_date: '2023-04-30', budget: 10000, channel: 'Email', target_audience: 'Existing Customers', creative_type: 'HTML', status: 'Active', impressions: 50000, clicks: 5000, conversions: 500, cost_per_click: 0.50, conversion_rate: 0.10 },
    { campaign_id: 'C456', campaign_name: 'New Product Launch', start_date: '2023-04-01', end_date: '2023-05-31', budget: 15000, channel: 'Social Media', target_audience: 'New Customers', creative_type: 'Video', status: 'Active', impressions: 75000, clicks: 7500, conversions: 750, cost_per_click: 0.75, conversion_rate: 0.10 },
    { campaign_id: 'C789', campaign_name: 'Summer Clearance', start_date: '2023-05-01', end_date: '2023-06-30', budget: 20000, channel: 'Paid Search', target_audience: 'All Customers', creative_type: 'Text', status: 'Planned', impressions: 0, clicks: 0, conversions: 0, cost_per_click: 0, conversion_rate: 0 }
  ],
  'social_media_metrics': [
    { post_id: 'P123', platform: 'Facebook', post_date: '2023-04-20', post_time: '2023-04-20 08:00:00', content_type: 'Image', engagement_type: 'Post', likes: 150, comments: 25, shares: 10, reach: 5000, impressions: 7500, clicks: 200, sentiment_score: 0.85, language: 'en' },
    { post_id: 'P456', platform: 'Twitter', post_date: '2023-04-20', post_time: '2023-04-20 09:00:00', content_type: 'Text', engagement_type: 'Tweet', likes: 50, comments: 10, shares: 5, reach: 2500, impressions: 3500, clicks: 50, sentiment_score: 0.75, language: 'en' },
    { post_id: 'P789', platform: 'Instagram', post_date: '2023-04-20', post_time: '2023-04-20 10:00:00', content_type: 'Video', engagement_type: 'Story', likes: 200, comments: 30, shares: 15, reach: 7500, impressions: 10000, clicks: 300, sentiment_score: 0.90, language: 'en' }
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
