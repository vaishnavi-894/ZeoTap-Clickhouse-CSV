-- Create a table for customer analytics
CREATE TABLE IF NOT EXISTS customer_analytics
(
    customer_id UInt32,
    first_name String,
    last_name String,
    email String,
    country String,
    signup_date Date,
    last_purchase_date Date,
    total_purchases UInt32,
    total_spend Float64,
    average_order_value Float64,
    customer_segment String,
    churn_risk Float32
) ENGINE = MergeTree()
ORDER BY (customer_id, signup_date);

-- Create a table for website analytics
CREATE TABLE IF NOT EXISTS website_analytics
(
    event_id UUID,
    user_id String,
    event_type String,
    event_timestamp DateTime,
    page_url String,
    session_id String,
    browser String,
    os String,
    device_type String,
    country String,
    city String,
    page_views UInt32,
    time_spent Float32,
    is_conversion Boolean
) ENGINE = MergeTree()
ORDER BY (event_timestamp, user_id);

-- Create a table for product inventory
CREATE TABLE IF NOT EXISTS product_inventory
(
    product_id String,
    product_name String,
    category String,
    subcategory String,
    price Float64,
    stock_quantity UInt32,
    last_updated DateTime,
    supplier_id String,
    supplier_name String,
    lead_time UInt8,
    reorder_point UInt32,
    safety_stock UInt32
) ENGINE = MergeTree()
ORDER BY (product_id, last_updated);

-- Create a table for sales transactions
CREATE TABLE IF NOT EXISTS sales_transactions
(
    transaction_id String,
    order_id String,
    customer_id UInt32,
    product_id String,
    quantity UInt32,
    unit_price Float64,
    total_price Float64,
    discount Float32,
    tax Float32,
    transaction_date Date,
    transaction_time DateTime,
    payment_method String,
    status String,
    shipping_address String,
    billing_address String
) ENGINE = MergeTree()
ORDER BY (transaction_date, customer_id);

-- Create a table for marketing campaigns
CREATE TABLE IF NOT EXISTS marketing_campaigns
(
    campaign_id String,
    campaign_name String,
    start_date Date,
    end_date Date,
    budget Float64,
    channel String,
    target_audience String,
    creative_type String,
    status String,
    impressions UInt64,
    clicks UInt64,
    conversions UInt64,
    cost_per_click Float64,
    conversion_rate Float32
) ENGINE = MergeTree()
ORDER BY (campaign_id, start_date);

-- Create a table for social media metrics
CREATE TABLE IF NOT EXISTS social_media_metrics
(
    post_id String,
    platform String,
    post_date Date,
    post_time DateTime,
    content_type String,
    engagement_type String,
    likes UInt64,
    comments UInt64,
    shares UInt64,
    reach UInt64,
    impressions UInt64,
    clicks UInt64,
    sentiment_score Float32,
    language String
) ENGINE = MergeTree()
ORDER BY (post_date, platform);
