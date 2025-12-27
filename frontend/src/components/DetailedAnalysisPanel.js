import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getCoinsList, getMarketChart } from '../services/api';

const DetailedAnalysisPanel = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [timeFrame, setTimeFrame] = useState(7);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coinsLoading, setCoinsLoading] = useState(true);

  // Fetch coins list on component mount
  useEffect(() => {
    fetchCoinsList();
  }, []);

  // Fetch market data when coin or timeframe changes
  useEffect(() => {
    if (selectedCoin) {
      fetchMarketData();
    }
  }, [selectedCoin, timeFrame]);

  const fetchCoinsList = async () => {
    try {
      setCoinsLoading(true);
      const data = await getCoinsList();
      // Filter to popular coins for better UX
      const popularCoins = [
        'bitcoin',
        'ethereum',
        'binancecoin',
        'ripple',
        'cardano',
        'solana',
        'polkadot',
        'dogecoin',
        'matic-network',
        'litecoin',
      ];
      const filtered = data.filter((coin) => popularCoins.includes(coin.id));
      setCoins(filtered.length > 0 ? filtered : data.slice(0, 50));
      
      // Set default to bitcoin if available
      if (data.find((c) => c.id === 'bitcoin')) {
        setSelectedCoin('bitcoin');
      } else if (data.length > 0) {
        setSelectedCoin(data[0].id);
      }
    } catch (err) {
      console.error('Error fetching coins list:', err);
      setError('Failed to load cryptocurrency list');
    } finally {
      setCoinsLoading(false);
    }
  };

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMarketChart(selectedCoin, 'usd', timeFrame);
      
      // Transform data for charts
      const prices = data.prices || [];
      const volumes = data.total_volumes || [];
      
      const transformedData = prices.map((pricePoint, index) => {
        const date = new Date(pricePoint[0]);
        const price = pricePoint[1];
        const volume = volumes[index] ? volumes[index][1] : 0;
        
        return {
          date: date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
          timestamp: date.getTime(),
          price: parseFloat(price.toFixed(2)),
          volume: parseFloat(volume.toFixed(2)),
        };
      });
      
      setChartData(transformedData);
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError('Failed to fetch market data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCoinChange = (event) => {
    setSelectedCoin(event.target.value);
  };

  const handleTimeFrameChange = (event, newTimeFrame) => {
    if (newTimeFrame !== null) {
      setTimeFrame(newTimeFrame);
    }
  };

  const selectedCoinName = coins.find((c) => c.id === selectedCoin)?.name || selectedCoin;

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Cryptocurrency Detailed Analysis
      </Typography>

      <Paper sx={{ p: 3, backgroundColor: '#1a1f3a' }}>
        {/* Controls */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="coin-select-label" sx={{ color: 'text.secondary' }}>
                Select Cryptocurrency
              </InputLabel>
              <Select
                labelId="coin-select-label"
                id="coin-select"
                value={selectedCoin}
                label="Select Cryptocurrency"
                onChange={handleCoinChange}
                disabled={coinsLoading}
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#00d4ff',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#00d4ff',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#00d4ff',
                  },
                }}
              >
                {coins.map((coin) => (
                  <MenuItem key={coin.id} value={coin.id}>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
                Time Frame:
              </Typography>
              <ToggleButtonGroup
                value={timeFrame}
                exclusive
                onChange={handleTimeFrameChange}
                aria-label="time frame"
                sx={{
                  '& .MuiToggleButton-root': {
                    color: '#00d4ff',
                    borderColor: '#00d4ff',
                    '&.Mui-selected': {
                      backgroundColor: '#00d4ff',
                      color: '#0a0e27',
                      '&:hover': {
                        backgroundColor: '#00b8e6',
                      },
                    },
                  },
                }}
              >
                <ToggleButton value={7} aria-label="7 days">
                  7 Days
                </ToggleButton>
                <ToggleButton value={14} aria-label="14 days">
                  14 Days
                </ToggleButton>
                <ToggleButton value={30} aria-label="30 days">
                  30 Days
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Grid>
        </Grid>

   
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

   
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#00d4ff' }} />
          </Box>
        )}

     
        {!loading && chartData && chartData.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
              {selectedCoinName} - Price & Volume Analysis ({timeFrame} Days)
            </Typography>

    
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.secondary' }}>
                Price (USD)
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3f5f" />
                  <XAxis
                    dataKey="date"
                    stroke="#00d4ff"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="#00d4ff"
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft', fill: '#00d4ff' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1f3a',
                      border: '1px solid #00d4ff',
                      borderRadius: '4px',
                      color: '#fff',
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#00d4ff"
                    strokeWidth={2}
                    dot={false}
                    name="Price (USD)"
                    animationDuration={500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

      
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.secondary' }}>
                Trading Volume (USD)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3f5f" />
                  <XAxis
                    dataKey="date"
                    stroke="#00d4ff"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="#00d4ff"
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Volume (USD)', angle: -90, position: 'insideLeft', fill: '#00d4ff' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1f3a',
                      border: '1px solid #00d4ff',
                      borderRadius: '4px',
                      color: '#fff',
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Volume']}
                  />
                  <Legend />
                  <Bar
                    dataKey="volume"
                    fill="#00ff88"
                    name="Volume (USD)"
                    animationDuration={500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        )}

  
        {!loading && !error && (!chartData || chartData.length === 0) && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              No data available. Please select a cryptocurrency.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default DetailedAnalysisPanel;