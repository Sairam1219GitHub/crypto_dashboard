import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { getTopGainer, getTopLoser } from '../services/api';

const TopGainersLosersPanel = () => {
  const [gainer, setGainer] = useState(null);
  const [loser, setLoser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    // Refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [gainerData, loserData] = await Promise.all([
        getTopGainer(),
        getTopLoser(),
      ]);
      setGainer(gainerData);
      setLoser(loserData);
    } catch (err) {
      setError('Failed to fetch top gainers and losers data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: '#1a1f3a' }}>
        <CircularProgress sx={{ color: '#00d4ff' }} />
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          Loading top gainers and losers...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 4, backgroundColor: '#1a1f3a' }}>
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Top Gainers & Losers (24h)
      </Typography>
      
      <Grid container spacing={3}>
        {/* Top Gainer Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: '#1a1f3a',
              border: '2px solid #00ff88',
              borderRadius: 2,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0, 255, 136, 0.3)',
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ color: '#00ff88', fontSize: 32, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00ff88' }}>
                  Top Gainer
                </Typography>
              </Box>
              
              {gainer && (
                <>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {gainer.name}
                  </Typography>
                  <Chip
                    label={gainer.symbol.toUpperCase()}
                    size="small"
                    sx={{ mb: 2, backgroundColor: '#00ff88', color: '#000' }}
                  />
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Current Price
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#00ff88', fontWeight: 'bold' }}>
                      {formatPrice(gainer.current_price)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      24h Change
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#00ff88',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {formatPercentage(gainer.price_change_percentage_24h)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        24h High
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#00ff88' }}>
                        {formatPrice(gainer.high_24h)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        24h Low
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#00ff88' }}>
                        {formatPrice(gainer.low_24h)}
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Top Loser Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: '#1a1f3a',
              border: '2px solid #ff6b6b',
              borderRadius: 2,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(255, 107, 107, 0.3)',
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingDownIcon sx={{ color: '#ff6b6b', fontSize: 32, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff6b6b' }}>
                  Top Loser
                </Typography>
              </Box>
              
              {loser && (
                <>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {loser.name}
                  </Typography>
                  <Chip
                    label={loser.symbol.toUpperCase()}
                    size="small"
                    sx={{ mb: 2, backgroundColor: '#ff6b6b', color: '#fff' }}
                  />
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Current Price
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                      {formatPrice(loser.current_price)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      24h Change
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#ff6b6b',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {formatPercentage(loser.price_change_percentage_24h)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        24h High
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#ff6b6b' }}>
                        {formatPrice(loser.high_24h)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        24h Low
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#ff6b6b' }}>
                        {formatPrice(loser.low_24h)}
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopGainersLosersPanel;