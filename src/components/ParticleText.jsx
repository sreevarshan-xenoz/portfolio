import { Box, useTheme, useMediaQuery } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const ParticleText = ({ 
  text = "SREEVARSHAN",
  color = '#64ffda',
  secondaryColor = '#7928ca',
  size = '3rem',
  particleSize = 5,
  particleDensity = 1,
}) => {
  const theme = useTheme();
  const { prefersReducedMotion } = useReducedMotion();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [particles, setParticles] = useState([]);
  const [textBounds, setTextBounds] = useState({ width: 0, height: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  // Generate particles based on text size
  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;
    
    const textElement = textRef.current;
    const bounds = textElement.getBoundingClientRect();
    
    setTextBounds({
      width: bounds.width,
      height: bounds.height,
    });
    
    // Adjust number of particles based on text size and particle density
    const particleCount = Math.floor((bounds.width * bounds.height) / (400 / particleDensity));
    const particleArray = [];
    
    for (let i = 0; i < particleCount; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * bounds.width,
        y: Math.random() * bounds.height,
        color: Math.random() > 0.7 ? secondaryColor : color,
        size: Math.random() * particleSize + 2,
      });
    }
    
    setParticles(particleArray);
  }, [text, color, secondaryColor, particleSize, particleDensity]);
  
  // Handle mouse/touch interactions
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const containerBounds = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerBounds.left;
    const y = e.clientY - containerBounds.top;
    
    setMousePosition({ x, y });
  };
  
  const handleInteractionStart = () => {
    setIsInteracting(true);
  };
  
  const handleInteractionEnd = () => {
    setIsInteracting(false);
  };
  
  // For mobile touch events
  const handleTouchMove = (e) => {
    if (!containerRef.current || e.touches.length === 0) return;
    
    const containerBounds = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - containerBounds.left;
    const y = e.touches[0].clientY - containerBounds.top;
    
    setMousePosition({ x, y });
  };
  
  // Calculate particle position based on mouse/touch position and whether we're interacting
  const getParticleStyles = (particle) => {
    if (!isInteracting) {
      return {
        x: particle.x,
        y: particle.y,
        opacity: 1,
      };
    }
    
    // Calculate distance from mouse to original particle position
    const dx = mousePosition.x - particle.x;
    const dy = mousePosition.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Repel particles away from mouse position
    const repelRadius = 100; // pixels
    const repelStrength = 50;
    
    if (distance < repelRadius) {
      const angle = Math.atan2(dy, dx);
      const force = (repelRadius - distance) / repelRadius * repelStrength;
      
      return {
        x: particle.x - Math.cos(angle) * force,
        y: particle.y - Math.sin(angle) * force,
        scale: 1.2,
        opacity: 1,
      };
    }
    
    return {
      x: particle.x,
      y: particle.y,
      opacity: 1,
    };
  };
  
  // Don't render particles for reduced motion preference or small screens
  const shouldRenderParticles = !prefersReducedMotion && !isMobile;
  
  return (
    <Box 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      sx={{
        position: 'relative',
        width: '100%',
        height: textBounds.height ? textBounds.height + 40 : 'auto',
        minHeight: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        my: 4,
        cursor: 'default',
      }}
    >
      {/* Hidden text element to measure size */}
      <Box
        ref={textRef}
        sx={{
          position: 'absolute',
          fontSize: size,
          fontWeight: 'bold',
          visibility: 'hidden',
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </Box>
      
      {/* Visible text */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldRenderParticles ? (isInteracting ? 0 : 1) : 1 }}
        transition={{ duration: 0.3 }}
        sx={{
          fontSize: size,
          fontWeight: 'bold',
          background: `linear-gradient(45deg, ${color} 30%, ${secondaryColor} 90%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative',
          zIndex: 2,
          filter: 'drop-shadow(0 0 10px rgba(100, 255, 218, 0.3))',
          userSelect: 'none',
        }}
      >
        {text}
      </Box>
      
      {/* Particles */}
      {shouldRenderParticles && particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: Math.random() * textBounds.width,
            y: Math.random() * textBounds.height,
            opacity: 0,
          }}
          animate={getParticleStyles(particle)}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 20,
            mass: Math.random() * 0.5 + 0.1,
          }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            backgroundColor: particle.color,
            top: '50%',
            left: '50%',
            marginLeft: -textBounds.width / 2,
            marginTop: -textBounds.height / 2,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}66`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}
    </Box>
  );
};

export default ParticleText; 