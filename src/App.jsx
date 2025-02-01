import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';
import Routes from './Routes';
import Navbar from './components/Navbar';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
