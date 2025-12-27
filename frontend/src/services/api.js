import axios from 'axios';

// API base URL - points to backend server
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getCoinsList = async () => {
  try {
    const response = await api.get('/coins/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching coins list:', error);
    throw error;
  }
};

/**
 * Get market chart data for a specific coin
 * @param {string} id 
 * @param {string} vsCurrency 
 * @param {number} days 
 */
export const getMarketChart = async (id, vsCurrency = 'usd', days = 7) => {
  try {
    const response = await api.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: vsCurrency,
        days: days,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market chart:', error);
    throw error;
  }
};

export const getTopGainer = async () => {
  try {
    const response = await api.get('/top-gainer');
    return response.data;
  } catch (error) {
    console.error('Error fetching top gainer:', error);
    throw error;
  }
};


export const getTopLoser = async () => {
  try {
    const response = await api.get('/top-loser');
    return response.data;
  } catch (error) {
    console.error('Error fetching top loser:', error);
    throw error;
  }
};

export default api;


