const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// CoinGecko API base URL
const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";


const cache = new Map();
const CACHE_DURATION = 60000; 


function getCachedData(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}


function setCachedData(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}


app.get("/api/coins/list", async (req, res) => {
  try {
    const cacheKey = "coins_list";
    const cached = getCachedData(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const response = await axios.get(`${COINGECKO_API_BASE}/coins/list`);
    setCachedData(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching coins list:", error.message);
    res.status(500).json({ 
      error: "Failed to fetch coins list",
      message: error.message 
    });
  }
});


app.get("/api/coins/:id/market_chart", async (req, res) => {
  try {
    const { id } = req.params;
    const vs_currency = req.query.vs_currency || "usd";
    const days = req.query.days || "7";

    const cacheKey = `market_chart_${id}_${vs_currency}_${days}`;
    const cached = getCachedData(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const response = await axios.get(
      `${COINGECKO_API_BASE}/coins/${id}/market_chart`,
      {
        params: {
          vs_currency,
          days
        }
      }
    );

    const data = response.data;
    setCachedData(cacheKey, data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching market chart:", error.message);
    res.status(500).json({ 
      error: "Failed to fetch market chart data",
      message: error.message 
    });
  }
});


app.get("/api/coins/markets", async (req, res) => {
  try {
    const vs_currency = req.query.vs_currency || "usd";
    const order = req.query.order || "market_cap_desc";
    const per_page = req.query.per_page || "100";
    const page = req.query.page || "1";

    const cacheKey = `markets_${vs_currency}_${order}_${per_page}_${page}`;
    const cached = getCachedData(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const response = await axios.get(
      `${COINGECKO_API_BASE}/coins/markets`,
      {
        params: {
          vs_currency,
          order,
          per_page,
          page
        }
      }
    );

    const data = response.data;
    setCachedData(cacheKey, data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching markets data:", error.message);
    res.status(500).json({ 
      error: "Failed to fetch markets data",
      message: error.message 
    });
  }
});


app.get("/api/top-gainer", async (req, res) => {
  try {
    const cacheKey = "top_gainer";
    const cached = getCachedData(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const response = await axios.get(
      `${COINGECKO_API_BASE}/coins/markets`,
      {
        params: {
          vs_currency: "usd",
          order: "price_change_percentage_24h_desc",
          per_page: 1,
          page: 1
        }
      }
    );

    const data = response.data[0] || null;
    setCachedData(cacheKey, data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching top gainer:", error.message);
    res.status(500).json({ 
      error: "Failed to fetch top gainer",
      message: error.message 
    });
  }
});


app.get("/api/top-loser", async (req, res) => {
  try {
    const cacheKey = "top_loser";
    const cached = getCachedData(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const response = await axios.get(
      `${COINGECKO_API_BASE}/coins/markets`,
      {
        params: {
          vs_currency: "usd",
          order: "price_change_percentage_24h_asc",
          per_page: 1,
          page: 1
        }
      }
    );

    const data = response.data[0] || null;
    setCachedData(cacheKey, data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching top loser:", error.message);
    res.status(500).json({ 
      error: "Failed to fetch top loser",
      message: error.message 
    });
  }
});


app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Crypto Dashboard API is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(` Crypto Dashboard Backend Server running on port ${PORT}`);
  console.log(` API endpoints available at http://localhost:${PORT}/api`);
});