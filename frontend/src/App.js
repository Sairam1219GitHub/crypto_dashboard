import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import DetailedAnalysisPanel from './components/DetailedAnalysisPanel';
import TopGainersLosersPanel from './components/TopGainersLosersPanel';
import './App.css';

// Dark theme for the dashboard
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4ff',
    },
    secondary: {
      main: '#ff6b6b',
    },
    background: {
      default: '#0a0e27',
      paper: '#1a1f3a',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#1a1f3a', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
             Cryptocurrency Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 1 }}>
            Real-Time Crypto Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Powered by CoinGecko API
          </Typography>
        </Box>

 
        <Box sx={{ mb: 4 }}>
          <TopGainersLosersPanel />
        </Box>

       
        <Box>
          <DetailedAnalysisPanel />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;