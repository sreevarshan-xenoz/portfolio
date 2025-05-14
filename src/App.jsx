import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Navbar from './components/Navbar';
import GlobalStyles from './styles/GlobalStyles';
import { Box } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <GlobalStyles />
      <Router>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Routes />
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
