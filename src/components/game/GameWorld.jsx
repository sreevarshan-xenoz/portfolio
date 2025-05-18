import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Obstacle from './Obstacle';

const GameWorld = ({ currentZone, currentObstacle, obstacles, gameZones }) => {
  // Get current zone data
  const currentZoneData = gameZones.find(zone => zone.id === currentZone);
  
  // Get zone-specific background and styling
  const getZoneStyle = () => {
    switch (currentZone) {
      case 0: // UX Forest
        return {
          background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
          roadColor: '#34495e',
          roadLineColor: '#ecf0f1',
          decoration: '🌳',
        };
      case 1: // Code Mountains
        return {
          background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
          roadColor: '#7f8c8d',
          roadLineColor: '#ecf0f1',
          decoration: '🏔️',
        };
      case 2: // Writing River
        return {
          background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
          roadColor: '#34495e',
          roadLineColor: '#ecf0f1',
          decoration: '🌊',
        };
      case 3: // Masterpiece Citadel
        return {
          background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
          roadColor: '#7f8c8d',
          roadLineColor: '#ecf0f1',
          decoration: '🏰',
        };
      default:
        return {
          background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
          roadColor: '#34495e',
          roadLineColor: '#ecf0f1',
          decoration: '🌳',
        };
    }
  };
  
  const zoneStyle = getZoneStyle();
  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Sky */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '40%',
          background: zoneStyle.background,
          zIndex: 0,
        }}
      />
      
      {/* Ground */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '60%',
          background: '#8B4513',
          zIndex: 1,
        }}
      />
      
      {/* Road */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          width: '30%',
          height: '40%',
          backgroundColor: zoneStyle.roadColor,
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        {/* Road lines */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: '5%',
            height: '100%',
            backgroundColor: zoneStyle.roadLineColor,
            transform: 'translateX(-50%)',
            zIndex: 3,
          }}
        />
      </Box>
      
      {/* Zone name */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            color: 'white',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            fontWeight: 'bold',
          }}
        >
          {currentZoneData?.name || 'Loading...'}
        </Typography>
      </Box>
      
      {/* Obstacles */}
      {obstacles.map((obstacle) => (
        <Obstacle
          key={obstacle.id}
          obstacle={obstacle}
          isActive={currentObstacle === obstacle.id}
        />
      ))}
      
      {/* Zone-specific decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          fontSize: '2rem',
          zIndex: 4,
        }}
      >
        {zoneStyle.decoration}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          fontSize: '2rem',
          zIndex: 4,
        }}
      >
        {zoneStyle.decoration}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          left: '5%',
          fontSize: '2rem',
          zIndex: 4,
        }}
      >
        {zoneStyle.decoration}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          fontSize: '2rem',
          zIndex: 4,
        }}
      >
        {zoneStyle.decoration}
      </Box>
    </Box>
  );
};

export default GameWorld; 