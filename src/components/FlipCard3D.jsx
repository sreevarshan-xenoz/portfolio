import { Box, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FlipCard3D = ({ 
  frontContent, 
  backContent, 
  icon, 
  title, 
  color = '#64ffda',
  height = 350 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Handle touch events explicitly for mobile
  const handleTouchStart = (e) => {
    if (isMobile) {
      e.preventDefault(); // Prevent default touch behavior
    }
  };

  return (
    <Box
      sx={{
        perspective: '1500px',
        height: `${height}px`,
        width: '100%',
        maxWidth: '340px',
        mx: 'auto',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front of Card */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            backfaceVisibility: 'hidden',
            backgroundColor: 'rgba(10, 25, 47, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: color,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: `0 10px 30px -15px ${color}44`,
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: `0 20px 30px -15px ${color}66`,
              transform: !isFlipped && !isMobile ? 'translateY(-10px)' : 'none',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: color,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {icon}
              {title}
            </Typography>
            
            <IconButton
              size="small"
              onClick={handleFlip}
              onTouchStart={handleTouchStart}
              sx={{
                color: 'text.secondary',
                backgroundColor: `${color}22`,
                '&:hover': {
                  backgroundColor: `${color}44`,
                },
              }}
            >
              <InfoIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {frontContent}
          </Box>
        </Box>
        
        {/* Back of Card */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            overflow: 'auto',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: 'rgba(10, 25, 47, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: color,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: `0 10px 30px -15px ${color}44`,
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(10, 25, 47, 0.1)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: color,
              borderRadius: '4px',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton
              size="small"
              onClick={handleFlip}
              onTouchStart={handleTouchStart}
              sx={{
                color: color,
                mr: 1,
                backgroundColor: `${color}22`,
                '&:hover': {
                  backgroundColor: `${color}44`,
                },
              }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: color,
              }}
            >
              Details
            </Typography>
          </Box>
          
          <Box
            sx={{
              flexGrow: 1,
              '& a': {
                color: color,
                textDecoration: 'none',
                borderBottom: `1px dashed ${color}`,
                '&:hover': {
                  opacity: 0.8,
                },
              },
            }}
          >
            {backContent}
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default FlipCard3D; 