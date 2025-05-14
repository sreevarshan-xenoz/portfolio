import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Typography, Link } from '@mui/material';
import { motion } from 'framer-motion';

const ResumeDownload = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Placeholder for actual resume download link
  // In a real implementation, this would point to an actual PDF file
  const resumeUrl = "https://example.com/sreevarshan-resume.pdf";

  const handleDownloadClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    // In a real implementation, this would trigger the actual download
    setDialogOpen(false);
    setSnackbarOpen(true);
    
    // Simulate the download action for demo purposes
    // In production, you'd use a real PDF URL
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'sreevarshan-resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        sx={{ 
          my: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography 
          variant="h5" 
          component="h3" 
          sx={{ 
            mb: 2,
            background: 'linear-gradient(45deg, #64ffda 30%, #7928ca 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          My Resume
        </Typography>
        
        <Box 
          sx={{ 
            p: 3, 
            borderRadius: 2, 
            backgroundColor: 'rgba(10, 25, 47, 0.4)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(100, 255, 218, 0.1)',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Typography variant="body1" sx={{ mb: 3 }}>
            Want to see more details about my experience, skills, and education? Download my resume for a comprehensive overview.
          </Typography>

          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            color="primary"
            onClick={handleDownloadClick}
            sx={{ 
              borderRadius: '8px',
              background: 'linear-gradient(45deg, #64ffda 30%, #7928ca 90%)',
              color: '#0a192f',
              fontWeight: 'bold',
              py: 1.5,
              px: 3,
              boxShadow: '0 4px 10px rgba(100, 255, 218, 0.3)',
            }}
          >
            Download Resume (PDF)
          </Button>
          
          <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
            Interested in working together? Feel free to{' '}
            <Link 
              href="https://github.com/sreevarshan-xenoz" 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                borderBottom: '1px dashed',
                '&:hover': {
                  borderBottom: '1px solid',
                }
              }}
            >
              reach out on GitHub
            </Link>.
          </Typography>
        </Box>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
            backdropFilter: 'blur(20px)',
            borderRadius: 2,
            border: '1px solid rgba(100, 255, 218, 0.2)',
          }
        }}
      >
        <DialogTitle sx={{ color: 'primary.main' }}>
          Download Resume
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You're about to download Sreevarshan's resume in PDF format. This document contains a detailed overview of skills, experience, and educational background.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleDialogClose} 
            sx={{ 
              color: 'text.secondary', 
              '&:hover': { 
                backgroundColor: 'rgba(100, 255, 218, 0.05)' 
              } 
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDialogConfirm} 
            variant="contained"
            sx={{ 
              background: 'linear-gradient(45deg, #64ffda 30%, #7928ca 90%)',
              color: '#0a192f',
            }}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Notification */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={5000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="success" 
          variant="filled"
          sx={{ 
            backgroundColor: 'primary.main',
            color: 'background.default',
            fontWeight: 'medium'
          }}
        >
          Resume download started!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ResumeDownload; 