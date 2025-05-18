import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { accessories } from '../../data/gameData';

const CarCharacter = ({ position, rotation, accessories: playerAccessories }) => {
  const carRef = useRef(null);
  
  // Apply 3D transformations
  useEffect(() => {
    if (carRef.current) {
      carRef.current.style.transform = `
        translate3d(${position.x}px, ${position.y}px, ${position.z}px)
        rotateY(${rotation}deg)
      `;
    }
  }, [position, rotation]);
  
  // Get car accessories
  const carAccessories = playerAccessories.map(id => 
    accessories.find(acc => acc.id === id)
  ).filter(Boolean);
  
  return (
    <Box
      ref={carRef}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        position: 'absolute',
        width: '60px',
        height: '30px',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        zIndex: 5,
      }}
    >
      {/* Car body */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#e74c3c',
          borderRadius: '5px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          transform: 'translateZ(0)',
        }}
      >
        {/* Car windows */}
        <Box
          sx={{
            position: 'absolute',
            top: '5px',
            left: '10px',
            width: '40px',
            height: '10px',
            backgroundColor: '#3498db',
            borderRadius: '2px',
          }}
        />
        
        {/* Car wheels */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '-5px',
            left: '5px',
            width: '15px',
            height: '15px',
            backgroundColor: '#2c3e50',
            borderRadius: '50%',
            border: '2px solid #7f8c8d',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-5px',
            right: '5px',
            width: '15px',
            height: '15px',
            backgroundColor: '#2c3e50',
            borderRadius: '50%',
            border: '2px solid #7f8c8d',
          }}
        />
        
        {/* Car headlights */}
        <Box
          sx={{
            position: 'absolute',
            top: '10px',
            left: '0',
            width: '5px',
            height: '5px',
            backgroundColor: '#f1c40f',
            borderRadius: '50%',
            boxShadow: '0 0 5px #f1c40f',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '10px',
            right: '0',
            width: '5px',
            height: '5px',
            backgroundColor: '#f1c40f',
            borderRadius: '50%',
            boxShadow: '0 0 5px #f1c40f',
          }}
        />
      </Box>
      
      {/* Car accessories */}
      {carAccessories.map((accessory, index) => (
        <Box
          key={accessory.id}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${accessory.image})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: 'translateZ(1px)',
          }}
        />
      ))}
    </Box>
  );
};

export default CarCharacter; 