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
          position: 'relative',
        },
        '#root': {
          height: '100%',
          position: 'relative',
          zIndex: 1,
          isolation: 'isolate',
        },
        '.MuiContainer-root': {
          height: '100%',
          overflow: 'auto',
          position: 'relative',
          zIndex: 1,
        },
      }}
    />
  );
};

export default GlobalStyles; 