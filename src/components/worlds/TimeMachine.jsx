import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, IconButton, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';

const TimeMachine = ({ onClose }) => {
  const navigate = useNavigate();
  const [currentEra, setCurrentEra] = useState('present');
  const [showTimeline, setShowTimeline] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const countdownRef = useRef(null);

  const eras = [
    {
      id: 'past',
      name: 'Victorian Era',
      year: '1890',
      description: 'Explore my early projects and learning journey',
      color: '#8B4513',
      gradient: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
    },
    {
      id: 'present',
      name: 'Modern Cityscape',
      year: '2024',
      description: 'Discover my current work and achievements',
      color: '#2C3E50',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
    },
    {
      id: 'future',
      name: 'Cyberpunk Skyline',
      year: '2050',
      description: 'Preview upcoming projects and innovations',
      color: '#1A237E',
      gradient: 'linear-gradient(135deg, #1A237E 0%, #3949AB 100%)',
    },
  ];

  useEffect(() => {
    if (countdown > 0) {
      countdownRef.current = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else {
      navigate('/contact');
    }

    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
      }
    };
  }, [countdown, navigate]);

  const handleEraChange = (era) => {
    setCurrentEra(era);
  };

  const handleTimelineToggle = () => {
    setShowTimeline(!showTimeline);
  };

  const currentEraData = eras.find(era => era.id === currentEra);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2C1810 0%, #4A2B1A 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Steampunk Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/assets/steampunk-bg.jpg")',
          backgroundSize: 'cover',
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onClose}
            sx={{ color: 'white' }}
          >
            Back to Hub
          </Button>

          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            The Time Machine Workshop
          </Typography>

          <Box>
            <Tooltip title="Download Timeline">
              <IconButton onClick={handleTimelineToggle} sx={{ color: 'white' }}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Time Machine Interface */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            gap: 4,
            height: '70vh',
          }}
        >
          {/* Main Display */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            sx={{
              background: currentEraData.gradient,
              borderRadius: 2,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography variant="h2" sx={{ mb: 2, fontSize: '4rem' }}>
              {currentEraData.year}
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {currentEraData.name}
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 600 }}>
              {currentEraData.description}
            </Typography>
          </Box>

          {/* Control Panel */}
          <Box
            sx={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 2,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {/* Era Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Select Era
              </Typography>
              {eras.map((era) => (
                <Button
                  key={era.id}
                  variant={currentEra === era.id ? 'contained' : 'outlined'}
                  onClick={() => handleEraChange(era.id)}
                  sx={{
                    width: '100%',
                    mb: 1,
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: era.color,
                      backgroundColor: `${era.color}33`,
                    },
                  }}
                >
                  {era.name}
                </Button>
              ))}
            </Box>

            {/* Temporal Stability Monitor */}
            <Box sx={{ mt: 'auto' }}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon />
                Temporal Stability
              </Typography>
              <Box
                sx={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: 1,
                  p: 2,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h3" sx={{ color: countdown < 10 ? '#ff4444' : '#64ffda' }}>
                  {countdown}s
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Time until temporal collapse
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Timeline Modal */}
      <AnimatePresence>
        {showTimeline && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <Box
              sx={{
                background: '#2C1810',
                borderRadius: 2,
                p: 4,
                maxWidth: 600,
                width: '90%',
                maxHeight: '80vh',
                overflow: 'auto',
              }}
            >
              <Typography variant="h5" sx={{ mb: 3 }}>
                Career Timeline
              </Typography>
              {/* Timeline content will be added here */}
              <Button
                variant="contained"
                onClick={handleTimelineToggle}
                sx={{ mt: 2 }}
              >
                Close
              </Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default TimeMachine; 