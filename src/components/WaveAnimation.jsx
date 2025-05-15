import { Box, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const WaveAnimation = ({ 
  color1 = '#64ffda', 
  color2 = '#7928ca',
  height = 120,
  position = 'bottom',
  interactive = true
}) => {
  const theme = useTheme();
  const { prefersReducedMotion } = useReducedMotion();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Adjust animation speed based on preferences
  const animationDuration = prefersReducedMotion ? 60 : 20;
  
  // For interactive wave effect
  const handleMouseMove = (e) => {
    if (!interactive || isMobile) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };
  
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        overflow: 'hidden',
        marginTop: position === 'top' ? `-${height}px` : 0,
        marginBottom: position === 'bottom' ? `-${height}px` : 0,
        zIndex: 0,
        transform: position === 'top' ? 'rotate(180deg)' : 'none',
        pointerEvents: interactive ? 'auto' : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* First wave layer */}
      <motion.svg
        viewBox="0 0 1440 320"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          bottom: 0,
        }}
        initial={false}
        animate={{
          x: [0, -1440, 0],
          scaleY: isHovered && interactive ? 1.2 : 1,
          scaleX: isHovered && interactive ? 1.05 : 1,
        }}
        transition={{
          x: {
            duration: animationDuration,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          },
          scaleY: {
            duration: 0.8,
            ease: "easeOut"
          },
          scaleX: {
            duration: 0.8,
            ease: "easeOut"
          }
        }}
      >
        <path
          fill={color1}
          fillOpacity="0.3"
          d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,117.3C672,139,768,213,864,234.7C960,256,1056,224,1152,192C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </motion.svg>
      
      {/* Second wave layer */}
      <motion.svg
        viewBox="0 0 1440 320"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          bottom: 0,
        }}
        initial={false}
        animate={{
          x: [0, 1440, 0],
          scaleY: isHovered && interactive ? 1.3 : 1,
          scaleX: isHovered && interactive ? 1.1 : 1,
        }}
        transition={{
          x: {
            duration: animationDuration + 5,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          },
          scaleY: {
            duration: 0.6,
            ease: "easeOut"
          },
          scaleX: {
            duration: 0.6,
            ease: "easeOut"
          }
        }}
      >
        <path
          fill={color2}
          fillOpacity="0.3"
          d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,186.7C672,192,768,224,864,218.7C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </motion.svg>
      
      {/* Third wave layer */}
      <motion.svg
        viewBox="0 0 1440 320"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          bottom: 0,
        }}
        initial={false}
        animate={{
          x: [0, -720, 0],
          scaleY: isHovered && interactive ? 1.4 : 1,
          scaleX: isHovered && interactive ? 1.15 : 1,
        }}
        transition={{
          x: {
            duration: animationDuration + 10,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          },
          scaleY: {
            duration: 0.4,
            ease: "easeOut"
          },
          scaleX: {
            duration: 0.4,
            ease: "easeOut"
          }
        }}
      >
        <path
          fill={color1}
          fillOpacity="0.4"
          d="M0,256L48,266.7C96,277,192,299,288,293.3C384,288,480,256,576,218.7C672,181,768,139,864,117.3C960,96,1056,96,1152,112C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </motion.svg>
      
      {/* Add interactive glow effect */}
      {interactive && !prefersReducedMotion && (
        <Box
          sx={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color1}33 0%, transparent 70%)`,
            opacity: isHovered ? 0.8 : 0,
            transition: 'opacity 0.3s ease',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </Box>
  );
};

export default WaveAnimation; 