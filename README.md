# ClickHouse Connector Flow

A modern web application for interacting with ClickHouse databases, designed as part of a ZEOTAP internship assignment.

## Project Overview

This application provides a user-friendly interface for ClickHouse database operations, enabling users to:
- Connect to ClickHouse databases
- Execute SQL queries
- Visualize query results
- Export data to CSV
- Import data from CSV

## Architecture

The project follows a clean architecture pattern with three main components:

1. **Frontend**: Modern React + TypeScript application with a clean, responsive UI
2. **Backend**: REST API built with FastAPI for database operations
3. **Database**: ClickHouse integration for efficient data storage and retrieval

## Features

- Database Connection Management
- SQL Query Execution
- Data Visualization
- CSV Import/Export
- Error Handling and User Feedback
- Responsive Design

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query

### Backend
- Python 3.10+
- FastAPI
- ClickHouse Python client
- Pandas
- NumPy

### Development Tools
- Vite
- ESLint
- Prettier
- Git

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- ClickHouse Server

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/clickhouse-connector-flow.git
cd clickhouse-connector-flow
```

2. Install dependencies:
```bash
# Frontend
npm install

# Backend
pip install -r requirements.txt
```

3. Start the servers:
```bash
# Frontend
npm run dev

# Backend
python server/main.py
```

## Project Structure

```
clickhouse-connector-flow/
├── src/                # Frontend source code
│   ├── components/     # React components
│   ├── pages/         # Page components
│   └── styles/        # Global styles
├── server/            # Backend code
│   ├── main.py       # FastAPI application
│   └── routes/       # API routes
└── public/           # Static assets
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/1a984e44-0533-4c6f-93a2-d569e382feaa) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
