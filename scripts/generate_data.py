import random
import string
import pandas as pd
from datetime import datetime, timedelta
import numpy as np
from faker import Faker

# Initialize Faker
fake = Faker()

# Helper functions
def random_date(start, end):
    return start + timedelta(
        seconds=random.randint(0, int((end - start).total_seconds()))
    )

def generate_customer_data(n=500):
    data = []
    start_date = datetime(2023, 1, 1)
    end_date = datetime(2024, 1, 1)
    
    for i in range(1, n + 1):
        signup_date = random_date(start_date, end_date)
        last_purchase = random_date(signup_date, end_date)
        
        data.append({
            'customer_id': i,
            'first_name': fake.first_name(),
            'last_name': fake.last_name(),
            'email': fake.email(),
            'country': random.choice(['US', 'UK', 'CA', 'AU', 'IN']),
            'signup_date': signup_date.date(),
            'last_purchase_date': last_purchase.date(),
            'total_purchases': random.randint(1, 50),
            'total_spend': round(random.uniform(100, 5000), 2),
            'average_order_value': round(random.uniform(20, 200), 2),
            'customer_segment': random.choice(['new', 'active', 'loyal', 'churned']),
            'churn_risk': round(random.uniform(0, 1), 2)
        })
    
    return pd.DataFrame(data)

def generate_website_data(n=500):
    data = []
    start_date = datetime(2023, 1, 1)
    end_date = datetime(2024, 1, 1)
    
    for i in range(n):
        event_time = random_date(start_date, end_date)
        data.append({
            'event_id': str(fake.uuid4()),
            'user_id': fake.user_name(),
            'event_type': random.choice(['page_view', 'click', 'purchase', 'add_to_cart']),
            'event_timestamp': event_time,
            'page_url': f'/product/{random.randint(1, 100)}',
            'session_id': str(fake.uuid4()),
            'browser': random.choice(['Chrome', 'Firefox', 'Safari', 'Edge']),
            'os': random.choice(['Windows', 'MacOS', 'iOS', 'Android']),
            'device_type': random.choice(['desktop', 'mobile', 'tablet']),
            'country': random.choice(['US', 'UK', 'CA', 'AU', 'IN']),
            'city': fake.city(),
            'page_views': random.randint(1, 20),
            'time_spent': round(random.uniform(1, 120), 2),
            'is_conversion': random.choice([True, False])
        })
    
    return pd.DataFrame(data)

def generate_product_data(n=500):
    categories = ['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Sports']
    subcategories = {
        'Electronics': ['Smartphones', 'Laptops', 'Headphones'],
        'Clothing': ['Men', 'Women', 'Kids'],
        'Home & Garden': ['Furniture', 'Decor', 'Tools'],
        'Books': ['Fiction', 'Non-Fiction', 'Children'],
        'Sports': ['Footwear', 'Equipment', 'Apparel']
    }
    
    data = []
    for i in range(n):
        category = random.choice(categories)
        subcat = random.choice(subcategories[category])
        
        data.append({
            'product_id': f'P{i:06d}',
            'product_name': f'{category} {subcat} {i}',
            'category': category,
            'subcategory': subcat,
            'price': round(random.uniform(10, 1000), 2),
            'stock_quantity': random.randint(0, 100),
            'last_updated': random_date(datetime(2023, 1, 1), datetime.now()),
            'supplier_id': f'S{i:04d}',
            'supplier_name': f'Supplier {i}',
            'lead_time': random.randint(1, 14),
            'reorder_point': random.randint(10, 50),
            'safety_stock': random.randint(5, 20)
        })
    
    return pd.DataFrame(data)

def generate_sales_data(n=500):
    products = pd.read_csv('product_inventory.csv')
    customers = pd.read_csv('customer_analytics.csv')
    
    data = []
    start_date = datetime(2023, 1, 1)
    end_date = datetime(2024, 1, 1)
    
    for i in range(n):
        customer = customers.sample(1).iloc[0]
        product = products.sample(1).iloc[0]
        transaction_time = random_date(start_date, end_date)
        
        data.append({
            'transaction_id': f'T{i:06d}',
            'order_id': f'O{i:06d}',
            'customer_id': int(customer['customer_id']),
            'product_id': product['product_id'],
            'quantity': random.randint(1, 5),
            'unit_price': product['price'],
            'total_price': round(product['price'] * random.randint(1, 5), 2),
            'discount': round(random.uniform(0, 0.3), 2),
            'tax': round(random.uniform(0.05, 0.2), 2),
            'transaction_date': transaction_time.date(),
            'transaction_time': transaction_time,
            'payment_method': random.choice(['credit_card', 'paypal', 'bank_transfer']),
            'status': random.choice(['completed', 'pending', 'cancelled']),
            'shipping_address': fake.address(),
            'billing_address': fake.address()
        })
    
    return pd.DataFrame(data)

def generate_marketing_data(n=500):
    data = []
    start_date = datetime(2023, 1, 1)
    end_date = datetime(2024, 1, 1)
    
    for i in range(n):
        start = random_date(start_date, end_date)
        duration = random.randint(7, 30)
        end = start + timedelta(days=duration)
        
        data.append({
            'campaign_id': f'C{i:06d}',
            'campaign_name': f'Campaign_{i}',
            'start_date': start.date(),
            'end_date': end.date(),
            'budget': round(random.uniform(1000, 100000), 2),
            'channel': random.choice(['Social Media', 'Email', 'Display', 'Search']),
            'target_audience': random.choice(['B2C', 'B2B', 'General']),
            'creative_type': random.choice(['Image', 'Video', 'Text']),
            'status': random.choice(['running', 'completed', 'paused']),
            'impressions': random.randint(1000, 1000000),
            'clicks': random.randint(100, 10000),
            'conversions': random.randint(10, 1000),
            'cost_per_click': round(random.uniform(0.1, 5), 2),
            'conversion_rate': round(random.uniform(0.01, 0.2), 2)
        })
    
    return pd.DataFrame(data)

def generate_social_data(n=500):
    platforms = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok']
    data = []
    start_date = datetime(2023, 1, 1)
    end_date = datetime(2024, 1, 1)
    
    for i in range(n):
        post_time = random_date(start_date, end_date)
        data.append({
            'post_id': f'P{i:06d}',
            'platform': random.choice(platforms),
            'post_date': post_time.date(),
            'post_time': post_time,
            'content_type': random.choice(['image', 'video', 'text']),
            'engagement_type': random.choice(['organic', 'paid']),
            'likes': random.randint(0, 10000),
            'comments': random.randint(0, 1000),
            'shares': random.randint(0, 5000),
            'reach': random.randint(1000, 1000000),
            'impressions': random.randint(1000, 1000000),
            'clicks': random.randint(0, 10000),
            'sentiment_score': round(random.uniform(-1, 1), 2),
            'language': random.choice(['en', 'es', 'fr', 'de', 'zh'])
        })
    
    return pd.DataFrame(data)

# Generate and save data
def main():
    print("Generating customer analytics data...")
    customer_df = generate_customer_data()
    customer_df.to_csv('customer_analytics.csv', index=False)
    
    print("Generating website analytics data...")
    website_df = generate_website_data()
    website_df.to_csv('website_analytics.csv', index=False)
    
    print("Generating product inventory data...")
    product_df = generate_product_data()
    product_df.to_csv('product_inventory.csv', index=False)
    
    print("Generating sales transactions data...")
    sales_df = generate_sales_data()
    sales_df.to_csv('sales_transactions.csv', index=False)
    
    print("Generating marketing campaigns data...")
    marketing_df = generate_marketing_data()
    marketing_df.to_csv('marketing_campaigns.csv', index=False)
    
    print("Generating social media metrics data...")
    social_df = generate_social_data()
    social_df.to_csv('social_media_metrics.csv', index=False)
    
    print("Data generation complete!")

if __name__ == "__main__":
    main()
