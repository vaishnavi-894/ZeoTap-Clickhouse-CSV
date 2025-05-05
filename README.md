📊 ClickHouse Connector Flow
A modern web application designed for seamless interaction with ClickHouse databases. This project was developed as part of a ZEOTAP internship assignment.

📌 Project Overview
The ClickHouse Connector Flow provides a user-friendly interface for managing ClickHouse databases. It enables users to:

✅ Connect to ClickHouse databases
✅ Execute SQL queries
✅ Visualize query results
✅ Export data to CSV
✅ Import data from CSV
🏗️ Architecture
The project follows a clean architecture pattern, comprising three main components:

Frontend: A responsive and modern React + TypeScript application
Backend: A powerful REST API built with FastAPI for managing database operations
Database: Seamless ClickHouse integration for efficient data management
✨ Features
🔐 Database Connection Management: Secure and reliable database connection setup
🧠 SQL Query Execution: Execute and manage complex SQL queries
📊 Data Visualization: Visual representation of data results for better analysis
🔄 CSV Import/Export: Effortlessly import and export CSV files
⚠️ Error Handling & Feedback: Clear error messages and responsive user feedback
📱 Responsive Design: Optimized for both desktop and mobile devices
⚙️ Setup Instructions
🐍 Python Environment Setup
Install Python 3.8 or higher from python.org.
Verify installation:
bash
python --version
📦 Dependency Installation
Install backend dependencies:
bash
pip install -r requirements.txt
Install frontend dependencies:
bash
cd frontend
npm install
🗄️ ClickHouse Configuration
Install ClickHouse server from clickhouse.com.
Start the ClickHouse server:
bash
clickhouse-server
Verify ClickHouse is running:
bash
clickhouse-client
🔧 Configuration
Backend Configuration
Create a .env file in the root directory with the following content:

env
CLICKHOUSE_HOST=localhost
CLICKHOUSE_PORT=8123
CLICKHOUSE_USER=default
CLICKHOUSE_PASSWORD=
CLICKHOUSE_DATABASE=default
Modify values as needed:

CLICKHOUSE_HOST: Your ClickHouse server address
CLICKHOUSE_PORT: ClickHouse HTTP port (default: 8123)
CLICKHOUSE_USER: Database username
CLICKHOUSE_PASSWORD: Database password
CLICKHOUSE_DATABASE: Default database to use
🚀 Run Instructions
🖥️ Starting the Application
Start the FastAPI backend:

bash
uvicorn app.main:app --reload
Backend will be available at http://localhost:8000.

Start the frontend development server:

bash
cd frontend
npm run dev
Frontend will be available at http://localhost:5173.

JWT Token for Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGVmYXVsdCIsImV4cCI6MTc0NjQ2NDY0OSwiaWF0IjoxNzQ2NDYxMDQ5fQ.anNKBQrnA8MOKkSAcZV_008WiZnw13J7zulXurPuGhE

🧪 Using the Application
📂 File Upload and Table Selection
Navigate to the main page.
Click Upload CSV to select your CSV files.
Choose the tables and columns you want to work with.
The system automatically detects table schemas.
🔗 Multi-table Joins
Select multiple tables for join operations.
Choose join type: INNER, LEFT, RIGHT, etc.
Specify join conditions.
View joined results in real-time.
📈 CSV Summary Report
After data processing, click Generate Summary. The summary includes:

Row counts
Column statistics
Data distribution
Join performance metrics
🧰 Tech Stack
🎨 Frontend
React 18
TypeScript
Tailwind CSS
shadcn/ui
React Router
TanStack Query
🧠 Backend
Python 3.10+
FastAPI
ClickHouse Python client
Pandas
NumPy
🛠️ Development Tools
Vite
ESLint
Prettier
Git
✅ Prerequisites
Ensure the following tools are installed:

Node.js 18+
Python 3.10+
ClickHouse Server
This version is properly formatted with clear sections, headings, and consistent styling. If you'd like to add or modify anything, let me know!
