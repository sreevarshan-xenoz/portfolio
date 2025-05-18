import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const StickmanCharacter = ({ position, accessories = [] }) => {
  // Animation variants
  const characterVariants = {
    idle: {
      y: [0, -5, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    walking: {
      x: [0, 5, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "linear"
      }
    },
    jumping: {
      y: [0, -20, 0],
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: 40,
        height: 60,
        zIndex: 10,
      }}
      variants={characterVariants}
      animate="idle"
    >
      {/* Head */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: 'white',
          border: '2px solid #0a192f',
        }}
      />
      
      {/* Body */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 2,
          height: 20,
          backgroundColor: 'white',
        }}
      />
      
      {/* Arms */}
      <Box
        sx={{
          position: 'absolute',
          top: 25,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 20,
          height: 2,
          backgroundColor: 'white',
        }}
      />
      
      {/* Legs */}
      <Box
        sx={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 2,
          height: 20,
          backgroundColor: 'white',
        }}
      />
      
      {/* Left Leg */}
      <Box
        sx={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%) rotate(-30deg)',
          width: 2,
          height: 15,
          backgroundColor: 'white',
          transformOrigin: 'top center',
        }}
      />
      
      {/* Right Leg */}
      <Box
        sx={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%) rotate(30deg)',
          width: 2,
          height: 15,
          backgroundColor: 'white',
          transformOrigin: 'top center',
        }}
      />
      
      {/* Accessories */}
      {accessories.map((accessory) => (
        <Box
          key={accessory.id}
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 24,
            height: 24,
            backgroundImage: `url(${accessory.image})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            zIndex: 11,
          }}
        />
      ))}
    </motion.div>
  );
};

export default StickmanCharacter; 