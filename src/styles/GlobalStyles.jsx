import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

const GlobalStyles = () => {
  return (
    <MuiGlobalStyles
      styles={{
        '*': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        },
        'html, body': {
          overflow: 'auto',
          height: '100%',
        },
        '#root': {
          height: '100%',
        },
        '.MuiContainer-root': {
          height: '100%',
          overflow: 'auto',
        },
      }}
    />
  );
};

export default GlobalStyles; 