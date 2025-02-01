import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64ffda',
    },
    secondary: {
      main: '#7928ca',
    },
    background: {
      default: '#0a192f',
      paper: '#112240',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: '100%',
          overflow: 'auto',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        },
      },
    },
  },
});

export default theme; 