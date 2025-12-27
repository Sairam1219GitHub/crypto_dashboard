# Quick Start Guide

## Prerequisites
- Node.js (v14+) installed
- npm (comes with Node.js)

## Quick Setup (3 Steps)

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## What to Expect

1. The dashboard will load with:
   - **Top Gainers & Losers Panel** at the top
   - **Detailed Analysis Panel** below with charts

2. Select a cryptocurrency from the dropdown
3. Choose a time frame (7, 14, or 30 days)
4. View interactive price and volume charts

## Troubleshooting

**Backend won't start?**
- Check if port 5000 is available
- Run: `PORT=5001 npm start` (in backend folder)

**Frontend can't connect?**
- Ensure backend is running first
- Check browser console for errors

**Charts not showing?**
- Wait a few seconds for data to load
- Try selecting a different cryptocurrency

For detailed information, see [README.md](./README.md)


