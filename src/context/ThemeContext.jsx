import { createContext, useContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

// Create theme context - simplified for dark mode only
export const ThemeContext = createContext({
  mode: 'dark',
  isDarkMode: true
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const mode = 'dark';
  const isDarkMode = true;

  // Create a theme with dark mode only
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
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
        text: {
          primary: '#e6f1ff',
          secondary: '#bcd1f0',
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
            body: {
              transition: 'background-color 0.3s ease',
            },
          },
        },
      },
    });
  }, []);

  const contextValue = {
    mode,
    isDarkMode
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 