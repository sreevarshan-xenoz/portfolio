import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Paper, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';
import '../styles/SelfModifyingPortfolio.css';

// CSS frameworks to switch between
const frameworks = [
  { name: 'Material UI', className: 'mui-theme', buttonClass: 'mui-button', paperClass: 'mui-paper', font: 'Inter, Roboto, Helvetica, Arial, sans-serif' },
  { name: 'Tailwind', className: 'tailwind-theme', buttonClass: 'tailwind-button', paperClass: 'tailwind-paper', font: 'Inter, system-ui, sans-serif' },
  { name: 'Bootstrap', className: 'bootstrap-theme', buttonClass: 'bootstrap-button', paperClass: 'bootstrap-paper', font: 'Segoe UI, Arial, sans-serif' },
  { name: 'Chakra UI', className: 'chakra-theme', buttonClass: 'chakra-button', paperClass: 'chakra-paper', font: 'Inter, sans-serif' },
  { name: 'Ant Design', className: 'ant-theme', buttonClass: 'ant-button', paperClass: 'ant-paper', font: 'Alibaba PuHuiTi, Arial, sans-serif' },
  { name: 'Bulma', className: 'bulma-theme', buttonClass: 'bulma-button', paperClass: 'bulma-paper', font: 'Nunito, Arial, sans-serif' },
  { name: 'Neumorphism', className: 'neumorph-theme', buttonClass: 'neumorph-button', paperClass: 'neumorph-paper', font: 'Quicksand, Arial, sans-serif' },
  { name: 'Glassmorphism', className: 'glass-theme', buttonClass: 'glass-button', paperClass: 'glass-paper', font: 'Montserrat, Arial, sans-serif' },
  { name: 'Retro', className: 'retro-theme', buttonClass: 'retro-button', paperClass: 'retro-paper', font: 'Press Start 2P, monospace' },
  { name: 'Cyberpunk', className: 'cyberpunk-theme', buttonClass: 'cyberpunk-button', paperClass: 'cyberpunk-paper', font: 'Orbitron, Arial, sans-serif' },
  { name: 'Matrix', className: 'matrix-theme', buttonClass: 'matrix-button', paperClass: 'matrix-paper', font: 'Share Tech Mono, monospace' },
  { name: 'SpacePunk', className: 'spacepunk-theme', buttonClass: 'spacepunk-button', paperClass: 'spacepunk-paper', font: 'Audiowide, Arial, sans-serif' },
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
  'ant-theme': { primary: '#1890ff', secondary: '#f5222d', background: '#f0f2f5', paper: '#fff', text: '#001529' },
  'bulma-theme': { primary: '#00d1b2', secondary: '#ff3860', background: '#f5f5f5', paper: '#fff', text: '#363636' },
  'neumorph-theme': { primary: '#e0e0e0', secondary: '#bdbdbd', background: '#e0e0e0', paper: '#f5f5f5', text: '#333', shadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff' },
  'glass-theme': { primary: '#a18cd1', secondary: '#fbc2eb', background: 'rgba(255,255,255,0.1)', paper: 'rgba(255,255,255,0.3)', text: '#222', blur: '8px' },
  'retro-theme': { primary: '#ffec00', secondary: '#ff206e', background: '#22223b', paper: '#2a2a40', text: '#ffec00', font: 'Press Start 2P, monospace' },
  'cyberpunk-theme': { primary: '#ff00c8', secondary: '#00fff7', background: '#0f1021', paper: '#1a1b2f', text: '#ff00c8', glow: '0 0 8px #ff00c8, 0 0 16px #00fff7' },
  'matrix-theme': { primary: '#39ff14', secondary: '#0ff', background: '#0d0208', paper: '#1a1a1a', text: '#39ff14', font: 'Share Tech Mono, monospace' },
  'spacepunk-theme': { primary: '#f72585', secondary: '#7209b7', background: 'linear-gradient(135deg, #240046 0%, #3a0ca3 100%)', paper: 'rgba(58,12,163,0.7)', text: '#f72585', stars: true },
};

const SelfModifyingPortfolio = () => {
  const [currentFramework, setCurrentFramework] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const containerRef = useRef(null);
  const theme = useTheme();
  const [mutationLog, setMutationLog] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [matrixRain, setMatrixRain] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  const [manualTheme, setManualTheme] = useState(null);
  
  // Function to apply a new framework theme
  const applyFramework = (index) => {
    setIsGlitching(true);
    setShowConfetti(true);
    logMutation(frameworks[index].name);
    
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
    setTimeout(() => setShowConfetti(false), 1200);
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
  
  // Glitch text effect for framework name
  useEffect(() => {
    let active = true;
    const original = frameworks[currentFramework].name;
    let frame = 0;
    function glitch() {
      if (!active) return;
      let glitched = original.split('').map((char, i) => {
        if (Math.random() < 0.2) {
          return String.fromCharCode(33 + Math.floor(Math.random() * 94));
        }
        return char;
      }).join('');
      setGlitchText(glitched);
      frame++;
      if (frame < 8) setTimeout(glitch, 40);
      else setGlitchText(original);
    }
    glitch();
    return () => { active = false; };
  }, [currentFramework]);
  
  // Mutation log update
  const logMutation = (themeName) => {
    setMutationLog(logs => [
      { theme: themeName, time: new Date().toLocaleTimeString(), msg: `Switched to ${themeName}` },
      ...logs.slice(0, 7)
    ]);
  };
  
  // Chaos mode overlays
  const chaosOverlays = chaosMode ? (
    <>
      {/* Matrix rain overlay */}
      {frameworks[currentFramework].className === 'matrix-theme' && (
        <div className="matrix-rain-overlay" />
      )}
      {/* Scanlines */}
      <div className="scanlines-overlay" />
      {/* RGB split */}
      <div className="rgb-split-overlay" />
      {/* Static noise */}
      <div className="static-noise-overlay" />
    </>
  ) : null;
  
  // Theme switcher dropdown
  const handleManualTheme = (e) => {
    const idx = frameworks.findIndex(f => f.name === e.target.value);
    if (idx !== -1) applyFramework(idx);
    setManualTheme(e.target.value);
  };
  
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
        background: currentTheme.background,
        color: currentTheme.text,
        borderRadius: 2,
        overflow: 'hidden',
        fontFamily: currentFrameworkObj.font,
        boxShadow: currentTheme.shadow,
        backdropFilter: currentTheme.blur ? `blur(${currentTheme.blur})` : undefined,
        ...(chaosMode && { animation: 'chaosShake 0.2s infinite alternate' }),
      }}
      onMouseEnter={handleHover}
    >
      {/* Overlays for chaos/glitch/matrix */}
      {chaosOverlays}
      {/* Confetti/particle burst placeholder */}
      {showConfetti && <div className="confetti-burst-placeholder" />}
      {/* Theme switcher dropdown */}
      <Box sx={{ mb: 2, alignSelf: 'flex-end' }}>
        <select value={manualTheme || frameworks[currentFramework].name} onChange={handleManualTheme} style={{ fontSize: '1rem', borderRadius: 6, padding: '0.3rem 1rem' }}>
          {frameworks.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
        </select>
      </Box>
      {/* Animated framework name with glitch effect */}
      <motion.div
        key={glitchText}
        initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        style={{ filter: chaosMode ? 'url(#glitch)' : undefined }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            mb: 3,
            fontWeight: 'bold',
            color: currentTheme.primary,
            textAlign: 'center',
            textShadow: currentTheme.glow,
            fontFamily: currentFrameworkObj.font,
            letterSpacing: chaosMode ? '2px' : 'normal',
          }}
          className={chaosMode ? 'glitch-text' : ''}
        >
          {glitchText}
        </Typography>
      </motion.div>
      
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
      
      {/* Mutation log */}
      <Box sx={{ mt: 3, width: '100%', maxWidth: 400, alignSelf: 'flex-end', background: 'rgba(0,0,0,0.2)', borderRadius: 2, p: 2, fontSize: '0.95rem', color: '#fff', fontFamily: 'monospace', boxShadow: '0 2px 8px #0002' }}>
        <Typography variant="subtitle2" sx={{ color: currentTheme.secondary, mb: 1 }}>Mutation Log</Typography>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {mutationLog.map((log, i) => (
            <li key={i} style={{ marginBottom: 2 }}>{log.time} — {log.msg}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default SelfModifyingPortfolio; 