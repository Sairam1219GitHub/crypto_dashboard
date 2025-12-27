# Cryptocurrency Dashboard

An interactive cryptocurrency dashboard that displays real-time data using the CoinGecko API. The application features detailed price analysis with historical charts and a top gainers/losers panel.

## Features

### Panel 1: Cryptocurrency Detailed Analysis
- **Historical Price Data**: View price data over selectable time frames (7, 14, or 30 days)
- **Trading Volume Data**: Corresponding volume data over the same period
- **Interactive Charts**: 
  - Line chart for price visualization
  - Bar chart for volume visualization
  - Tooltips displaying exact values on hover
- **Cryptocurrency Selection**: Dropdown menu to select from popular cryptocurrencies

### Panel 2: Top Gainers and Losers
- **Top Gainer**: Displays the cryptocurrency with the highest 24h price increase
- **Top Loser**: Displays the cryptocurrency with the lowest 24h price change
- **Visual Enhancements**: 
  - Color coding (green for gainers, red for losers)
  - Icons indicating price movement direction
  - Current price, 24h change, and high/low values

## Tech Stack

### Backend
- **Node.js** with **Express.js**
- **Axios** for HTTP requests to CoinGecko API
- **CORS** enabled for frontend communication
- In-memory caching to optimize API rate limits (60-second cache)

### Frontend
- **React.js** (v18.2.0)
- **Material-UI (MUI)** for UI components and theming
- **Recharts** for data visualization (charts)
- **Axios** for API communication

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

**OR** for Docker deployment:

- **Docker** (v20.10 or higher) - [Download](https://www.docker.com/get-started)
- **Docker Compose** (v2.0 or higher)

## Quick Start with Docker (Recommended)

The easiest way to run the application is using Docker Compose:

```bash
cd Crypto_Dashboard
docker-compose up --build
```

This will build and start both backend and frontend services. Access the application at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

For detailed Docker instructions, see [DOCKER.md](./DOCKER.md).

## Installation & Setup (Manual)

### Step 1: Clone or Navigate to the Project

```bash
cd Crypto_Dashboard
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
npm install
```

## Running the Application

### Step 1: Start the Backend Server

In the `backend` directory:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The backend server will start on **http://localhost:5000**

You should see:
```
 Crypto Dashboard Backend Server running on port 5000
 API endpoints available at http://localhost:5000/api
```

### Step 2: Start the Frontend Application

In a **new terminal window**, navigate to the `frontend` directory:

```bash
cd frontend
npm start
```

The frontend application will start on **http://localhost:3000** and automatically open in your browser.

## Project Structure

```
Crypto_Dashboard_Assessment/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   ├── package.json       # Backend dependencies
│   └── .gitignore
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── DetailedAnalysisPanel.js    # Panel 1: Price & Volume Charts
│   │   │   └── TopGainersLosersPanel.js    # Panel 2: Gainers & Losers
│   │   ├── services/
│   │   │   └── api.js                      # API service functions
│   │   ├── App.js                          # Main app component
│   │   ├── App.css
│   │   ├── index.js                        # React entry point
│   │   └── index.css
│   └── package.json       # Frontend dependencies
└── README.md
```

## API Endpoints

The backend provides the following endpoints that wrap CoinGecko APIs:

### GET `/api/coins/list`
Get list of all supported cryptocurrencies.

### GET `/api/coins/:id/market_chart`
Get historical market data for a specific cryptocurrency.

**Query Parameters:**
- `vs_currency` (default: `usd`) - Currency to compare against
- `days` (default: `7`) - Number of days of historical data (7, 14, or 30)

**Example:**
```
GET /api/coins/bitcoin/market_chart?vs_currency=usd&days=7
```

### GET `/api/top-gainer`
Get the cryptocurrency with the highest 24h price increase.

### GET `/api/top-loser`
Get the cryptocurrency with the lowest 24h price change.

### GET `/api/health`
Health check endpoint.

## Configuration

### Backend Port
The backend runs on port `5000` by default. You can change this by setting the `PORT` environment variable:

```bash
# Windows (PowerShell)
$env:PORT=5000; npm start

# Linux/Mac
PORT=5000 npm start
```

### Frontend API URL
The frontend is configured to connect to `http://localhost:5000/api` by default. If your backend runs on a different port, you can set the `REACT_APP_API_URL` environment variable:

```bash
# Windows (PowerShell)
$env:REACT_APP_API_URL="http://localhost:5000/api"; npm start

# Linux/Mac
REACT_APP_API_URL=http://localhost:5000/api npm start
```

## Features & Optimizations

### Rate Limiting
- The backend implements a 60-second cache to minimize API calls to CoinGecko
- CoinGecko API allows up to 100 requests per minute
- Data automatically refreshes every 60 seconds for the Top Gainers/Losers panel

### Responsive Design
- The dashboard is fully responsive and adapts to different screen sizes
- Mobile-friendly layout with Material-UI's responsive grid system

### Performance
- Efficient data fetching with Promise.all for parallel requests
- Chart animations for smooth user experience
- Loading states and error handling throughout

### UI/UX Enhancements
- Dark theme with modern color scheme
- Smooth transitions and hover effects
- Interactive tooltips on charts
- Color-coded indicators (green for gains, red for losses)

## Troubleshooting

### Backend Issues

**Port Already in Use:**
If port 5000 is already in use, change the port:
```bash
PORT=5001 npm start
```

**API Rate Limit Errors:**
The backend includes caching to prevent rate limit issues. If you still encounter errors, wait a minute before retrying.

### Frontend Issues

**Cannot Connect to Backend:**
- Ensure the backend server is running on port 5000
- Check that CORS is enabled (it should be by default)
- Verify the API URL in the frontend configuration

**Charts Not Displaying:**
- Check browser console for errors
- Ensure the selected cryptocurrency has available data
- Try refreshing the page

**Dependencies Installation Issues:**
If you encounter issues installing dependencies:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Browser Compatibility

The application is tested and works best in:
- **Chrome** (latest version) - Recommended
- **Firefox** (latest version)
- **Edge** (latest version)
- **Safari** (latest version)

## Future Enhancements (Optional)

- Add more time frame options (1 day, 90 days, 1 year)
- Implement candlestick charts for price visualization
- Add more cryptocurrencies to the selection list
- Implement user preferences (favorite coins, saved time frames)
- Add price alerts and notifications
- Implement WebSocket for real-time updates

## License

This project is created for assessment purposes.

## Contact & Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**Note:** This application uses the CoinGecko API, which is free for public use. Please respect their rate limits and terms of service.

