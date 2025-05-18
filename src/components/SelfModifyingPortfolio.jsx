import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Paper, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';
import '../styles/SelfModifyingPortfolio.css';

// CSS frameworks to switch between
const frameworks = [
  { name: 'Material UI', className: 'mui-theme', buttonClass: 'mui-button', paperClass: 'mui-paper' },
  { name: 'Tailwind', className: 'tailwind-theme', buttonClass: 'tailwind-button', paperClass: 'tailwind-paper' },
  { name: 'Bootstrap', className: 'bootstrap-theme', buttonClass: 'bootstrap-button', paperClass: 'bootstrap-paper' },
  { name: 'Chakra UI', className: 'chakra-theme', buttonClass: 'chakra-button', paperClass: 'chakra-paper' },
];

// Theme variations
const themeVariations = {
  'mui-theme': {
    primary: '#64ffda',
    secondary: '#7928ca',
    background: '#0a192f',
    paper: '#112240',
    text: '#e6f1ff',
  },
  'tailwind-theme': {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#1e293b',
    paper: '#334155',
    text: '#f8fafc',
  },
  'bootstrap-theme': {
    primary: '#0d6efd',
    secondary: '#6f42c1',
    background: '#212529',
    paper: '#343a40',
    text: '#f8f9fa',
  },
  'chakra-theme': {
    primary: '#3182ce',
    secondary: '#805ad5',
    background: '#1a202c',
    paper: '#2d3748',
    text: '#f7fafc',
  },
};

const SelfModifyingPortfolio = () => {
  const [currentFramework, setCurrentFramework] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const containerRef = useRef(null);
  const theme = useTheme();
  
  // Function to apply a new framework theme
  const applyFramework = (index) => {
    setIsGlitching(true);
    
    // Apply glitch effect
    gsap.to(containerRef.current, {
      duration: 0.5,
      opacity: 0.5,
      scale: 0.98,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentFramework(index);
        gsap.to(containerRef.current, {
          duration: 0.5,
          opacity: 1,
          scale: 1,
          ease: "power2.inOut",
          onComplete: () => {
            setIsGlitching(false);
          }
        });
      }
    });
  };
  
  // Handle hover events to trigger framework changes
  const handleHover = () => {
    setHoverCount(prev => prev + 1);
    setLastInteraction(Date.now());
    
    // Change framework after 3 hovers
    if (hoverCount > 0 && hoverCount % 3 === 0) {
      const nextIndex = (currentFramework + 1) % frameworks.length;
      applyFramework(nextIndex);
    }
  };
  
  // Toggle chaos mode
  const toggleChaosMode = () => {
    setChaosMode(!chaosMode);
  };
  
  // Effect for chaos mode
  useEffect(() => {
    if (!chaosMode) return;
    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * frameworks.length);
      applyFramework(randomIndex);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [chaosMode]);
  
  // Effect to check for inactivity
  useEffect(() => {
    const inactivityCheck = setInterval(() => {
      const now = Date.now();
      const inactiveTime = now - lastInteraction;
      
      // If inactive for more than 30 seconds, change framework
      if (inactiveTime > 30000 && !chaosMode) {
        const nextIndex = (currentFramework + 1) % frameworks.length;
        applyFramework(nextIndex);
        setLastInteraction(now);
      }
    }, 10000);
    
    return () => clearInterval(inactivityCheck);
  }, [lastInteraction, currentFramework, chaosMode]);
  
  // Get current theme colors
  const currentTheme = themeVariations[frameworks[currentFramework].className];
  const currentFrameworkObj = frameworks[currentFramework];
  
  return (
    <Box
      ref={containerRef}
      className={`self-modifying-container ${currentFrameworkObj.className} ${isGlitching ? 'glitch-effect' : ''}`}
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        transition: 'all 0.3s ease',
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
        borderRadius: 2,
        overflow: 'hidden',
      }}
      onMouseEnter={handleHover}
    >
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)',
              mixBlendMode: 'overlay',
              zIndex: 1,
            }}
          />
        )}
      </AnimatePresence>
      
      <Typography 
        variant="h3" 
        component="h2" 
        sx={{ 
          mb: 3, 
          fontWeight: 'bold',
          color: currentTheme.primary,
          textAlign: 'center',
        }}
      >
        {currentFrameworkObj.name} Framework
      </Typography>
      
      <Paper
        elevation={3}
        className={currentFrameworkObj.paperClass}
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: currentTheme.paper,
          color: currentTheme.text,
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <Typography variant="body1" paragraph>
          This portfolio is currently using the {currentFrameworkObj.name} framework.
          Hover over this component multiple times to see it transform into different frameworks.
        </Typography>
        <Typography variant="body1">
          The self-modifying portfolio concept demonstrates how a website can adapt and evolve based on user interactions.
          Try enabling chaos mode to see it change randomly!
        </Typography>
      </Paper>
      
      <Button
        variant="contained"
        onClick={toggleChaosMode}
        className={currentFrameworkObj.buttonClass}
        sx={{
          backgroundColor: chaosMode ? currentTheme.secondary : currentTheme.primary,
          color: '#000',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: chaosMode ? currentTheme.primary : currentTheme.secondary,
          },
        }}
      >
        {chaosMode ? 'Disable Chaos Mode' : 'Enable Chaos Mode'}
      </Button>
      
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 2, 
          color: currentTheme.text,
          opacity: 0.7,
        }}
      >
        Hover count: {hoverCount} | Last interaction: {Math.floor((Date.now() - lastInteraction) / 1000)}s ago
      </Typography>
    </Box>
  );
};

export default SelfModifyingPortfolio; 