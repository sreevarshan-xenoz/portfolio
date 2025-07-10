import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';

const RESUME_URL = '/sree-varshan-resume.pdf';

const Resume = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ p: { xs: 1, md: 4 }, minHeight: '100vh', background: 'rgba(10,25,47,0.95)' }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', textAlign: 'center' }}>
        My Resume
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          href={RESUME_URL}
          download
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          Download Resume
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
        <iframe
          src={RESUME_URL}
          title="Resume PDF"
          width={isMobile ? '100vw' : '100%'}
          height={isMobile ? '60vh' : 'calc(100vh - 220px)'}
          style={{
            border: '2px solid #64ffda',
            borderRadius: 8,
            background: '#fff',
            maxWidth: isMobile ? '100vw' : 1200,
            minHeight: isMobile ? 300 : 600,
            width: isMobile ? '100vw' : '100%',
            boxSizing: 'border-box',
          }}
        />
      </Box>
    </Box>
  );
};

export default Resume; 