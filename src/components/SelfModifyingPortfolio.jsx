import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';
import '../styles/SelfModifyingPortfolio.css';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

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
  { name: 'Rainbow', className: 'rainbow-theme', buttonClass: 'rainbow-button', paperClass: 'rainbow-paper', font: 'Orbitron, Arial, sans-serif' },
  { name: 'Synthwave', className: 'synthwave-theme', buttonClass: 'synthwave-button', paperClass: 'synthwave-paper', font: 'Orbitron, Arial, sans-serif' },
  { name: 'Neon', className: 'neon-theme', buttonClass: 'neon-button', paperClass: 'neon-paper', font: 'Orbitron, Arial, sans-serif' },
];

// Theme variations
const themeVariations = {
  'mui-theme': {
    primary: '#64ffda',
    secondary: '#7928ca',
    background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
    paper: 'rgba(17, 34, 64, 0.8)',
    text: '#e6f1ff',
    gradient: 'linear-gradient(45deg, #64ffda, #7928ca)',
    glow: '0 0 10px rgba(100, 255, 218, 0.5)',
  },
  'tailwind-theme': {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    paper: 'rgba(51, 65, 85, 0.8)',
    text: '#f8fafc',
    gradient: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    glow: '0 0 10px rgba(59, 130, 246, 0.5)',
  },
  'bootstrap-theme': {
    primary: '#0d6efd',
    secondary: '#6f42c1',
    background: 'linear-gradient(135deg, #212529 0%, #343a40 100%)',
    paper: 'rgba(52, 58, 64, 0.8)',
    text: '#f8f9fa',
    gradient: 'linear-gradient(45deg, #0d6efd, #6f42c1)',
    glow: '0 0 10px rgba(13, 110, 253, 0.5)',
  },
  'chakra-theme': {
    primary: '#3182ce',
    secondary: '#805ad5',
    background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
    paper: 'rgba(45, 55, 72, 0.8)',
    text: '#f7fafc',
    gradient: 'linear-gradient(45deg, #3182ce, #805ad5)',
    glow: '0 0 10px rgba(49, 130, 206, 0.5)',
  },
  'ant-theme': { 
    primary: '#1890ff', 
    secondary: '#f5222d', 
    background: 'linear-gradient(135deg, #f0f2f5 0%, #e6f7ff 100%)', 
    paper: 'rgba(255, 255, 255, 0.9)', 
    text: '#001529',
    gradient: 'linear-gradient(45deg, #1890ff, #f5222d)',
    glow: '0 0 10px rgba(24, 144, 255, 0.5)',
  },
  'bulma-theme': { 
    primary: '#00d1b2', 
    secondary: '#ff3860', 
    background: 'linear-gradient(135deg, #f5f5f5 0%, #e6f7ff 100%)', 
    paper: 'rgba(255, 255, 255, 0.9)', 
    text: '#363636',
    gradient: 'linear-gradient(45deg, #00d1b2, #ff3860)',
    glow: '0 0 10px rgba(0, 209, 178, 0.5)',
  },
  'neumorph-theme': { 
    primary: '#e0e0e0', 
    secondary: '#bdbdbd', 
    background: 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)', 
    paper: 'rgba(245, 245, 245, 0.9)', 
    text: '#333', 
    shadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
    gradient: 'linear-gradient(45deg, #e0e0e0, #bdbdbd)',
    glow: '0 0 10px rgba(224, 224, 224, 0.5)',
  },
  'glass-theme': { 
    primary: '#a18cd1', 
    secondary: '#fbc2eb', 
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)', 
    paper: 'rgba(255,255,255,0.3)', 
    text: '#222', 
    blur: '8px',
    gradient: 'linear-gradient(45deg, #a18cd1, #fbc2eb)',
    glow: '0 0 15px rgba(161, 140, 209, 0.5)',
  },
  'retro-theme': { 
    primary: '#ffec00', 
    secondary: '#ff206e', 
    background: 'linear-gradient(135deg, #22223b 0%, #2a2a40 100%)', 
    paper: 'rgba(42, 42, 64, 0.9)', 
    text: '#ffec00', 
    font: 'Press Start 2P, monospace',
    gradient: 'linear-gradient(45deg, #ffec00, #ff206e)',
    glow: '0 0 10px rgba(255, 236, 0, 0.5)',
  },
  'cyberpunk-theme': { 
    primary: '#ff00c8', 
    secondary: '#00fff7', 
    background: 'linear-gradient(135deg, #0f1021 0%, #1a1b2f 100%)', 
    paper: 'rgba(26, 27, 47, 0.9)', 
    text: '#ff00c8', 
    glow: '0 0 8px #ff00c8, 0 0 16px #00fff7',
    gradient: 'linear-gradient(45deg, #ff00c8, #00fff7)',
  },
  'matrix-theme': { 
    primary: '#39ff14', 
    secondary: '#0ff', 
    background: 'linear-gradient(135deg, #0d0208 0%, #1a1a1a 100%)', 
    paper: 'rgba(26, 26, 26, 0.9)', 
    text: '#39ff14', 
    font: 'Share Tech Mono, monospace',
    gradient: 'linear-gradient(45deg, #39ff14, #0ff)',
    glow: '0 0 10px rgba(57, 255, 20, 0.5)',
  },
  'spacepunk-theme': { 
    primary: '#f72585', 
    secondary: '#7209b7', 
    background: 'linear-gradient(135deg, #240046 0%, #3a0ca3 100%)', 
    paper: 'rgba(58,12,163,0.7)', 
    text: '#f72585', 
    stars: true,
    gradient: 'linear-gradient(45deg, #f72585, #7209b7)',
    glow: '0 0 15px rgba(247, 37, 133, 0.5)',
  },
  'rainbow-theme': {
    primary: '#ff0000',
    secondary: '#00ff00',
    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
    paper: 'rgba(26, 26, 26, 0.8)',
    text: '#ffffff',
    gradient: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)',
    glow: '0 0 15px rgba(255, 0, 0, 0.5)',
    font: 'Orbitron, Arial, sans-serif',
  },
  'synthwave-theme': {
    primary: '#ff00ff',
    secondary: '#00ffff',
    background: 'linear-gradient(135deg, #2b213a 0%, #1a1a2e 100%)',
    paper: 'rgba(43, 33, 58, 0.8)',
    text: '#ffffff',
    gradient: 'linear-gradient(45deg, #ff00ff, #00ffff)',
    glow: '0 0 15px rgba(255, 0, 255, 0.5)',
    font: 'Orbitron, Arial, sans-serif',
  },
  'neon-theme': {
    primary: '#ff00ff',
    secondary: '#00ffff',
    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
    paper: 'rgba(26, 26, 26, 0.8)',
    text: '#ffffff',
    gradient: 'linear-gradient(45deg, #ff00ff, #00ffff)',
    glow: '0 0 20px rgba(255, 0, 255, 0.7)',
    font: 'Orbitron, Arial, sans-serif',
  },
};

// Layout and typography config per framework
const frameworkLayout = {
  'mui-theme':      { direction: 'column', align: 'center', gap: 3, fontSize: 18, fontWeight: 400, justify: 'center' },
  'tailwind-theme': { direction: 'row', align: 'flex-start', gap: 4, fontSize: 17, fontWeight: 500, justify: 'space-between' },
  'bootstrap-theme':{ direction: 'row', align: 'flex-start', gap: 2, fontSize: 16, fontWeight: 400, justify: 'flex-start' },
  'chakra-theme':   { direction: 'column', align: 'center', gap: 3, fontSize: 18, fontWeight: 500, justify: 'center' },
  'ant-theme':      { direction: 'row', align: 'flex-start', gap: 3, fontSize: 17, fontWeight: 500, justify: 'space-between' },
  'bulma-theme':    { direction: 'row', align: 'center', gap: 3, fontSize: 18, fontWeight: 600, justify: 'center' },
  'neumorph-theme': { direction: 'column', align: 'center', gap: 4, fontSize: 19, fontWeight: 400, justify: 'center' },
  'glass-theme':    { direction: 'column', align: 'center', gap: 4, fontSize: 18, fontWeight: 400, justify: 'center' },
  'retro-theme':    { direction: 'column', align: 'center', gap: 5, fontSize: 15, fontWeight: 700, justify: 'center' },
  'cyberpunk-theme':{ direction: 'row', align: 'center', gap: 3, fontSize: 20, fontWeight: 700, justify: 'space-between' },
  'matrix-theme':   { direction: 'column', align: 'flex-start', gap: 1, fontSize: 16, fontWeight: 400, justify: 'flex-start' },
  'spacepunk-theme':{ direction: 'row', align: 'center', gap: 4, fontSize: 19, fontWeight: 600, justify: 'space-between' },
  'rainbow-theme':  { direction: 'column', align: 'center', gap: 3, fontSize: 18, fontWeight: 600, justify: 'center' },
  'synthwave-theme':{ direction: 'row', align: 'center', gap: 3, fontSize: 18, fontWeight: 600, justify: 'space-between' },
  'neon-theme':     { direction: 'column', align: 'center', gap: 3, fontSize: 18, fontWeight: 600, justify: 'center' },
};

// Section layout and hover effect config per framework
const sectionLayout = {
  'mui-theme':      { arrangement: 'column', about: {}, projects: {}, skills: {}, contact: {} },
  'tailwind-theme': { arrangement: 'responsive-row', about: {}, projects: {}, skills: {}, contact: {} },
  'bootstrap-theme':{ arrangement: '2col', about: { gridArea: 'about' }, projects: { gridArea: 'projects' }, skills: { gridArea: 'skills' }, contact: { gridArea: 'contact' } },
  'chakra-theme':   { arrangement: 'column', about: {}, projects: {}, skills: {}, contact: {} },
  'ant-theme':      { arrangement: 'row', about: {}, projects: {}, skills: {}, contact: {} },
  'bulma-theme':    { arrangement: 'responsive-row', about: {}, projects: {}, skills: {}, contact: {} },
  'neumorph-theme': { arrangement: 'centered', about: {}, projects: {}, skills: {}, contact: {} },
  'glass-theme':    { arrangement: 'column', about: {}, projects: {}, skills: {}, contact: {} },
  'retro-theme':    { arrangement: 'centered', about: {}, projects: {}, skills: {}, contact: {} },
  'cyberpunk-theme':{ arrangement: 'row', about: {}, projects: {}, skills: {}, contact: {} },
  'matrix-theme':   { arrangement: 'column', about: {}, projects: {}, skills: {}, contact: {} },
  'spacepunk-theme':{ arrangement: 'row', about: {}, projects: {}, skills: {}, contact: {} },
  'rainbow-theme':  { arrangement: 'column', about: {}, projects: {}, skills: {}, contact: {} },
  'synthwave-theme':{ arrangement: 'row', about: {}, projects: {}, skills: {}, contact: {} },
  'neon-theme':     { arrangement: 'column', about: {}, projects: {}, skills: {}, contact: {} },
};

const sectionHover = {
  'mui-theme':      { class: 'mui-section-hover', motion: { scale: 1.03 } },
  'tailwind-theme': { class: 'tailwind-section-hover', motion: { scale: 1.04, y: -4 } },
  'bootstrap-theme':{ class: 'bootstrap-section-hover', motion: { scale: 1.05, boxShadow: '0 8px 32px #0d6efd33' } },
  'chakra-theme':   { class: 'chakra-section-hover', motion: { scale: 1.04, rotate: 1 } },
  'ant-theme':      { class: 'ant-section-hover', motion: { scale: 1.04, borderColor: '#1890ff' } },
  'bulma-theme':    { class: 'bulma-section-hover', motion: { scale: 1.04, y: -2 } },
  'neumorph-theme': { class: 'neumorph-section-hover', motion: { scale: 0.98, boxShadow: 'inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff' } },
  'glass-theme':    { class: 'glass-section-hover', motion: { scale: 1.03, filter: 'blur(1.5px)' } },
  'retro-theme':    { class: 'retro-section-hover', motion: { scale: 1.01, filter: 'contrast(1.2)' } },
  'cyberpunk-theme':{ class: 'cyberpunk-section-hover', motion: { scale: 1.05, boxShadow: '0 0 24px #ff00c8, 0 0 48px #00fff7' } },
  'matrix-theme':   { class: 'matrix-section-hover', motion: { scale: 1.02, filter: 'drop-shadow(0 0 8px #39ff14)' } },
  'spacepunk-theme':{ class: 'spacepunk-section-hover', motion: { scale: 1.04, rotate: 2 } },
  'rainbow-theme':  { class: 'rainbow-section-hover', motion: { scale: 1.03, boxShadow: '0 0 15px rgba(255, 0, 0, 0.5)' } },
  'synthwave-theme':{ class: 'synthwave-section-hover', motion: { scale: 1.03, boxShadow: '0 0 15px rgba(255, 0, 255, 0.5)' } },
  'neon-theme':     { class: 'neon-section-hover', motion: { scale: 1.03, boxShadow: '0 0 20px rgba(255, 0, 255, 0.7)' } },
};

// About Section
function AboutSection({ theme, framework, layout }) {
  // Create motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to parallax movement
  const avatarX = useTransform(mouseX, [-300, 300], [-10, 10]);
  const avatarY = useTransform(mouseY, [-300, 300], [-10, 10]);
  const nameX = useTransform(mouseX, [-300, 300], [-5, 5]);
  const nameY = useTransform(mouseY, [-300, 300], [-5, 5]);
  const bioX = useTransform(mouseX, [-300, 300], [-3, 3]);
  const bioY = useTransform(mouseY, [-300, 300], [-3, 3]);
  
  // Create spring animations for smoother movement
  const springAvatarX = useSpring(avatarX, { stiffness: 100, damping: 30 });
  const springAvatarY = useSpring(avatarY, { stiffness: 100, damping: 30 });
  const springNameX = useSpring(nameX, { stiffness: 80, damping: 30 });
  const springNameY = useSpring(nameY, { stiffness: 80, damping: 30 });
  const springBioX = useSpring(bioX, { stiffness: 60, damping: 30 });
  const springBioY = useSpring(bioY, { stiffness: 60, damping: 30 });
  
  // Handle mouse movement
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to center of card
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Reset on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  return (
    <Paper 
      elevation={2} 
      className={`${framework.paperClass} parallax-card about-card-hover about-parallax-container`} 
      sx={{ 
        mb: 3, 
        p: 2, 
        backgroundColor: theme.paper, 
        color: theme.text, 
        borderRadius: 2,
        backgroundImage: theme.gradient,
        boxShadow: theme.glow,
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static decorative elements */}
      <div className="about-decoration about-decoration-1" style={{ borderColor: theme.primary }} />
      <div className="about-decoration about-decoration-2" style={{ borderColor: theme.secondary }} />
      <div className="about-decoration about-decoration-3" style={{ background: `radial-gradient(circle, ${theme.primary} 0%, transparent 70%)` }} />
      
      {/* Static particles */}
      <div className="about-particle about-particle-1" style={{ '--primary-color': theme.primary }} />
      <div className="about-particle about-particle-2" style={{ '--secondary-color': theme.secondary }} />
      <div className="about-particle about-particle-3" style={{ '--primary-color': theme.primary }} />
      <div className="about-particle about-particle-4" style={{ '--secondary-color': theme.secondary }} />
      <div className="about-particle about-particle-5" style={{ '--primary-color': theme.primary }} />
      
      {/* Mouse follow highlight */}
      <motion.div
        className="about-mouse-follow"
        style={{
          x: useTransform(mouseX, [-300, 300], ['30%', '70%']),
          y: useTransform(mouseY, [-300, 300], ['30%', '70%']),
          '--primary-color': theme.primary
        }}
      />
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Avatar with parallax effect */}
        <motion.div
          className="about-avatar-parallax"
          style={{
            x: springAvatarX,
            y: springAvatarY,
            z: 30
          }}
        >
          <Box sx={{ 
            width: 64, 
            height: 64, 
            borderRadius: '50%', 
            background: theme.gradient, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: 36, 
            color: theme.background, 
            fontWeight: 'bold',
            boxShadow: theme.glow,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="about-avatar-glow" style={{ '--primary-color': theme.primary }} />
            <motion.span
              style={{
                position: 'relative',
                zIndex: 2
              }}
            >
              S
            </motion.span>
          </Box>
        </motion.div>
        
        <Box>
          {/* Name with parallax effect */}
          <motion.div
            className="about-name-parallax"
            style={{
              x: springNameX,
              y: springNameY,
              z: 20,
              '--primary-color': theme.primary
            }}
          >
            <Typography 
              variant="h5" 
              className="parallax-text"
              sx={{ 
                fontWeight: 'bold', 
                color: theme.primary, 
                fontFamily: framework.font,
                textShadow: theme.glow,
                position: 'relative',
                display: 'inline-block'
              }}
            >
              Sreevarshan
              <div className="about-name-underline" style={{ 
                '--primary-color': theme.primary,
                '--secondary-color': theme.secondary
              }} />
            </Typography>
          </motion.div>
          
          {/* Bio with parallax effect */}
          <motion.div
            className="about-bio-parallax"
            style={{
              x: springBioX,
              y: springBioY,
              z: 10
            }}
          >
            <Typography 
              variant="body2" 
              className="parallax-text"
              sx={{ 
                color: theme.text, 
                opacity: 0.8,
                position: 'relative'
              }}
            >
              Futuristic developer, AI/OS hacker, and creative technologist. I build wild, adaptive, and sentient web experiences.
            </Typography>
          </motion.div>
        </Box>
      </Box>
    </Paper>
  );
}

// Projects Section
const demoProjects = [
  { 
    title: 'Matrix Portfolio', 
    desc: 'A portfolio that fully immerses you in the Matrix with digital rain, terminal UI, and green code everywhere.', 
    tech: ['React', 'Framer Motion', 'CSS', 'Matrix Effects'], 
    github: 'https://github.com/yourusername/matrix-portfolio', 
    live: 'https://matrix-portfolio.example.com',
    image: 'https://source.unsplash.com/random/300x200/?matrix,code'
  },
  { 
    title: 'Self-Modifying Portfolio', 
    desc: 'A website that rewrites its own code in real time based on user behavior, trends, or cosmic radiation.', 
    tech: ['React', 'Framer Motion', 'CSS', 'Dynamic Themes'], 
    github: 'https://github.com/yourusername/self-modifying-portfolio', 
    live: 'https://self-modifying-portfolio.example.com',
    image: 'https://source.unsplash.com/random/300x200/?code,abstract'
  },
  { 
    title: 'AI Collaborator Portfolio', 
    desc: 'A portfolio co-created by you and an AI art bot, where both contributions are indistinguishable.', 
    tech: ['React', 'AI', 'Canvas', 'Generative Art'], 
    github: 'https://github.com/yourusername/ai-collaborator', 
    live: 'https://ai-collaborator.example.com',
    image: 'https://source.unsplash.com/random/300x200/?ai,art'
  },
  { 
    title: 'Data-Driven Identity', 
    desc: 'Your identity and projects shift based on live global data streams (stock markets, climate, social media).', 
    tech: ['React', 'D3.js', 'APIs', 'Data Visualization'], 
    github: 'https://github.com/yourusername/data-driven-identity', 
    live: 'https://data-driven-identity.example.com',
    image: 'https://source.unsplash.com/random/300x200/?data,visualization'
  }
];

function ProjectsSection({ theme, framework, layout }) {
  // Create motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to parallax movement
  const containerX = useTransform(mouseX, [-300, 300], [-5, 5]);
  const containerY = useTransform(mouseY, [-300, 300], [-5, 5]);
  
  // Create spring animations for smoother movement
  const springContainerX = useSpring(containerX, { stiffness: 50, damping: 30 });
  const springContainerY = useSpring(containerY, { stiffness: 50, damping: 30 });
  
  // Handle mouse movement
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to center of card
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Reset on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  return (
    <Paper 
      elevation={2} 
      className={`${framework.paperClass} parallax-card projects-parallax-container`} 
      sx={{ 
        mb: 3, 
        p: 2, 
        backgroundColor: theme.paper, 
        color: theme.text, 
        borderRadius: 2,
        backgroundImage: theme.gradient,
        boxShadow: theme.glow,
        transition: 'all 0.3s ease'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Typography variant="h6" sx={{ 
        color: theme.secondary, 
        fontWeight: 'bold', 
        mb: 2, 
        fontFamily: framework.font,
        textShadow: theme.glow
      }}>Projects</Typography>
      
      {/* Mouse follow highlight effect */}
      <motion.div 
        className="project-mouse-follow"
        style={{
          x: springContainerX,
          y: springContainerY
        }}
      />
      
      {/* Decorative elements */}
      <div className="project-decoration project-decoration-1" />
      <div className="project-decoration project-decoration-2" />
      
      {/* Particles */}
      <div className="project-particle project-particle-1" />
      <div className="project-particle project-particle-2" />
      <div className="project-particle project-particle-3" />
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {demoProjects.map((proj, i) => (
          <motion.div
            key={proj.title}
            className="project-card-parallax project-card-hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{
              flex: '1 1 220px',
              minWidth: 200,
              maxWidth: 260,
              padding: '16px',
              borderRadius: '8px',
              background: theme.background,
              color: theme.text,
              boxShadow: theme.shadow || theme.glow,
              marginBottom: '8px',
              fontFamily: framework.font,
              transformStyle: 'preserve-3d',
              transform: `translateZ(${i * 5}px)`
            }}
          >
            {/* Project image with hover effect */}
            <div className="project-image-container">
              <img 
                src={proj.image} 
                alt={proj.title} 
                className="project-image"
              />
              <div className="project-image-overlay" />
            </div>
            
            <Typography 
              variant="subtitle1" 
              className="project-title-parallax"
              sx={{ 
                color: theme.primary, 
                fontWeight: 'bold', 
                mb: 1,
                textShadow: theme.glow
              }}
            >
              {proj.title}
            </Typography>
            
            <Typography 
              variant="body2" 
              className="project-desc-parallax"
              sx={{ mb: 1, opacity: 0.8 }}
            >
              {proj.desc}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              {proj.tech.map(t => (
                <span 
                  key={t} 
                  className="project-tech-parallax project-tech-tag"
                >
                  {t}
                </span>
              ))}
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <a 
                href={proj.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
              >
                Code
              </a>
              <a 
                href={proj.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
              >
                Live
              </a>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Paper>
  );
}

// Skills Section
const demoSkills = [
  { name: 'JavaScript', color: '#f7df1e', level: 90 },
  { name: 'React', color: '#61dafb', level: 85 },
  { name: 'Python', color: '#3776ab', level: 80 },
  { name: 'AI/ML', color: '#7928ca', level: 75 },
  { name: 'Linux', color: '#64ffda', level: 80 },
  { name: 'Node.js', color: '#339933', level: 85 },
  { name: 'CSS/SCSS', color: '#cc6699', level: 90 },
  { name: 'TypeScript', color: '#3178c6', level: 75 },
];

function SkillsSection({ theme, framework, layout }) {
  // Create motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to parallax movement
  const containerX = useTransform(mouseX, [-300, 300], [-5, 5]);
  const containerY = useTransform(mouseY, [-300, 300], [-5, 5]);
  
  // Create spring animations for smoother movement
  const springContainerX = useSpring(containerX, { stiffness: 50, damping: 30 });
  const springContainerY = useSpring(containerY, { stiffness: 50, damping: 30 });
  
  // Handle mouse movement
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to center of card
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Reset on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  return (
    <Paper 
      elevation={2} 
      className={`${framework.paperClass} parallax-card skills-parallax-container`} 
      sx={{ 
        mb: 3, 
        p: 2, 
        backgroundColor: theme.paper, 
        color: theme.text, 
        borderRadius: 2,
        backgroundImage: theme.gradient,
        boxShadow: theme.glow,
        transition: 'all 0.3s ease'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Typography variant="h6" sx={{ 
        color: theme.secondary, 
        fontWeight: 'bold', 
        mb: 2, 
        fontFamily: framework.font,
        textShadow: theme.glow
      }}>Skills</Typography>
      
      {/* Mouse follow highlight effect */}
      <motion.div 
        className="skill-mouse-follow"
        style={{
          x: springContainerX,
          y: springContainerY
        }}
      />
      
      {/* Decorative elements */}
      <div className="skill-decoration skill-decoration-1" />
      <div className="skill-decoration skill-decoration-2" />
      
      {/* Particles */}
      <div className="skill-particle skill-particle-1" />
      <div className="skill-particle skill-particle-2" />
      <div className="skill-particle skill-particle-3" />
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {demoSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="skill-item-parallax skill-item-hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{
              flex: '1 1 200px',
              minWidth: 180,
              maxWidth: 240,
              padding: '12px',
              borderRadius: '8px',
              background: theme.background,
              color: theme.text,
              boxShadow: theme.shadow || theme.glow,
              fontFamily: framework.font,
              transformStyle: 'preserve-3d',
              transform: `translateZ(${index * 3}px)`
            }}
          >
            <Box sx={{ position: 'relative', mb: 1 }}>
              <Typography 
                variant="body2" 
                className="skill-name-parallax"
                sx={{ 
                  color: skill.color, 
                  fontWeight: 'bold', 
                  fontFamily: framework.font,
                  textShadow: theme.glow
                }}
              >
                {skill.name}
              </Typography>
              <span className="skill-level-indicator">{skill.level}%</span>
            </Box>
            
            <div className="skill-bar-container">
              <motion.div 
                className="skill-bar-fill"
                initial={{ width: 0 }} 
                animate={{ width: `${skill.level}%` }} 
                transition={{ duration: 1.2, delay: index * 0.1 }} 
                style={{ 
                  background: skill.color,
                  boxShadow: theme.glow
                }} 
              />
            </div>
          </motion.div>
        ))}
      </Box>
    </Paper>
  );
}

// Contact Section
function ContactSection({ theme, framework, layout }) {
  // Create motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to parallax movement
  const containerX = useTransform(mouseX, [-300, 300], [-5, 5]);
  const containerY = useTransform(mouseY, [-300, 300], [-5, 5]);
  
  // Create spring animations for smoother movement
  const springContainerX = useSpring(containerX, { stiffness: 50, damping: 30 });
  const springContainerY = useSpring(containerY, { stiffness: 50, damping: 30 });
  
  // Handle mouse movement
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to center of card
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Reset on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  return (
    <Paper 
      elevation={2} 
      className={`${framework.paperClass} parallax-card contact-parallax-container`} 
      sx={{ 
        mb: 3, 
        p: 2, 
        backgroundColor: theme.paper, 
        color: theme.text, 
        borderRadius: 2, 
        textAlign: 'center',
        backgroundImage: theme.gradient,
        boxShadow: theme.glow,
        transition: 'all 0.3s ease'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Typography variant="h6" sx={{ 
        color: theme.secondary, 
        fontWeight: 'bold', 
        mb: 2, 
        fontFamily: framework.font,
        textShadow: theme.glow
      }}>Contact</Typography>
      
      {/* Mouse follow highlight effect */}
      <motion.div 
        className="contact-mouse-follow"
        style={{
          x: springContainerX,
          y: springContainerY
        }}
      />
      
      {/* Decorative elements */}
      <div className="contact-decoration contact-decoration-1" />
      <div className="contact-decoration contact-decoration-2" />
      
      {/* Particles */}
      <div className="contact-particle contact-particle-1" />
      <div className="contact-particle contact-particle-2" />
      <div className="contact-particle contact-particle-3" />
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        <motion.div
          className="contact-item-parallax"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <a 
            href="mailto:your.email@example.com" 
            className="contact-link-parallax contact-button-hover"
            style={{ color: theme.primary, textShadow: theme.glow }}
          >
            Email
          </a>
        </motion.div>
        
        <motion.div
          className="contact-item-parallax"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-link-parallax contact-button-hover"
            style={{ color: theme.secondary, textShadow: theme.glow }}
          >
            GitHub
          </a>
        </motion.div>
        
        <motion.div
          className="contact-item-parallax"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <a 
            href="https://linkedin.com/in/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-link-parallax contact-button-hover"
            style={{ color: theme.primary, textShadow: theme.glow }}
          >
            LinkedIn
          </a>
        </motion.div>
      </Box>
      
      <motion.div
        className="contact-message-parallax"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{ opacity: 0.7 }}
      >
        <Typography variant="body2" sx={{ color: theme.text }}>
          Let's build something wild together!
        </Typography>
      </motion.div>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <motion.div
          className="contact-social-icon"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20Z" fill="currentColor"/>
            <path d="M12 6C8.686 6 6 8.686 6 12C6 15.314 8.686 18 12 18C15.314 18 18 15.314 18 12C18 8.686 15.314 6 12 6ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16Z" fill="currentColor"/>
          </svg>
        </motion.div>
        
        <motion.div
          className="contact-social-icon"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.1, rotate: -5 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20Z" fill="currentColor"/>
            <path d="M12 6C8.686 6 6 8.686 6 12C6 15.314 8.686 18 12 18C15.314 18 18 15.314 18 12C18 8.686 15.314 6 12 6ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16Z" fill="currentColor"/>
          </svg>
        </motion.div>
        
        <motion.div
          className="contact-social-icon"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20Z" fill="currentColor"/>
            <path d="M12 6C8.686 6 6 8.686 6 12C6 15.314 8.686 18 12 18C15.314 18 18 15.314 18 12C18 8.686 15.314 6 12 6ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16Z" fill="currentColor"/>
          </svg>
        </motion.div>
      </Box>
    </Paper>
  );
}

// ParallaxBackground component for creating depth effect
const ParallaxBackground = ({ theme, framework }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to parallax movement
  const backgroundX = useTransform(mouseX, [-500, 500], [-20, 20]);
  const backgroundY = useTransform(mouseY, [-500, 500], [-20, 20]);
  
  // Create spring animations for smoother movement
  const springX = useSpring(backgroundX, { stiffness: 50, damping: 30 });
  const springY = useSpring(backgroundY, { stiffness: 50, damping: 30 });
  
  // Handle mouse movement
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate mouse position relative to center of screen
    const x = clientX - innerWidth / 2;
    const y = clientY - innerHeight / 2;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Add and remove event listener
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Generate random particles for depth effect
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    depth: Math.random() * 0.5 + 0.5, // Depth factor (0.5-1.0)
    color: theme.primary,
    opacity: Math.random() * 0.5 + 0.1
  }));
  
  return (
    <motion.div 
      className="parallax-background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: -1,
        background: theme.background,
        x: springX,
        y: springY
      }}
    >
      {/* Background gradient */}
      <div 
        className="parallax-gradient"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.gradient,
          opacity: 0.7,
          filter: 'blur(60px)',
          transform: 'scale(1.5)',
          transformOrigin: 'center'
        }}
      />
      
      {/* Parallax particles */}
      {particles.map(particle => {
        // Calculate parallax movement based on depth
        const particleX = useTransform(mouseX, [-500, 500], [-20 * particle.depth, 20 * particle.depth]);
        const particleY = useTransform(mouseY, [-500, 500], [-20 * particle.depth, 20 * particle.depth]);
        
        // Create spring for smooth movement
        const springParticleX = useSpring(particleX, { stiffness: 50, damping: 30 });
        const springParticleY = useSpring(particleY, { stiffness: 50, damping: 30 });
        
        return (
          <motion.div
            key={particle.id}
            style={{
              position: 'absolute',
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: particle.color,
              opacity: particle.opacity,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              x: springParticleX,
              y: springParticleY,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              zIndex: Math.floor(particle.depth * 10)
            }}
          />
        );
      })}
    </motion.div>
  );
};

// ParallaxCard component for section cards with parallax effect
const ParallaxCard = ({ children, theme, framework, hover, depth = 0.2 }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to card rotation
  const rotateX = useTransform(mouseY, [-300, 300], [depth * 10, -depth * 10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-depth * 10, depth * 10]);
  
  // Create spring animations for smoother movement
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });
  
  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to center of card
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Reset on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      whileHover={hover.motion}
      className={hover.class}
      style={{ 
        width: '100%',
        perspective: 1000,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%'
        }}
      >
        {/* Card content with 3D effect */}
        <motion.div
          style={{
            transform: 'translateZ(20px)',
            width: '100%',
            height: '100%'
          }}
        >
          {children}
        </motion.div>
        
        {/* Card highlight/glow effect */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at ${useTransform(mouseX, [-300, 300], ['30%', '70%'])} ${useTransform(mouseY, [-300, 300], ['30%', '70%'])}, ${theme.primary}20, transparent 70%)`,
            opacity: 0.5,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const SelfModifyingPortfolio = () => {
  const [currentFramework, setCurrentFramework] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const containerRef = useRef(null);
  const theme = useTheme();
  const [showConfetti, setShowConfetti] = useState(false);
  const [matrixRain, setMatrixRain] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  const [manualTheme, setManualTheme] = useState(null);
  const currentFrameworkObj = frameworks[currentFramework];
  const layout = frameworkLayout[frameworks[currentFramework].className] || frameworkLayout['mui-theme'];
  const sectionCfg = sectionLayout[frameworks[currentFramework].className] || sectionLayout['mui-theme'];
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [colorCycle, setColorCycle] = useState(false);
  const colorCycleInterval = useRef(null);
  const [enableParallax, setEnableParallax] = useState(true);
  
  // Function to apply a new framework theme
  const applyFramework = (index) => {
    setIsGlitching(true);
    setShowConfetti(true);
    
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
  
  // Fullscreen logic
  const handleFullscreen = () => {
    const el = containerRef.current;
    if (!isFullscreen) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  };
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(!!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement));
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);
    document.addEventListener('MSFullscreenChange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      document.removeEventListener('mozfullscreenchange', onFullscreenChange);
      document.removeEventListener('MSFullscreenChange', onFullscreenChange);
    };
  }, []);
  
  // Add a function to cycle through themes automatically
  const toggleColorCycle = () => {
    if (colorCycle) {
      clearInterval(colorCycleInterval.current);
      setColorCycle(false);
    } else {
      setColorCycle(true);
      colorCycleInterval.current = setInterval(() => {
        setCurrentFramework((prev) => (prev + 1) % frameworks.length);
      }, 3000); // Change theme every 3 seconds
    }
  };
  
  // Clean up the interval when component unmounts
  useEffect(() => {
    return () => {
      if (colorCycleInterval.current) {
        clearInterval(colorCycleInterval.current);
      }
    };
  }, []);
  
  // Section arrangement logic
  let sections;
  if (sectionCfg.arrangement === '2col' && !isMobile) {
    sections = (
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: 3, gridTemplateAreas: `"about projects" "skills contact"` }}>
        <Box sx={{ gridArea: 'about' }}><SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><AboutSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper></Box>
        <Box sx={{ gridArea: 'projects' }}><SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><ProjectsSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper></Box>
        <Box sx={{ gridArea: 'skills' }}><SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><SkillsSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper></Box>
        <Box sx={{ gridArea: 'contact' }}><SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><ContactSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper></Box>
      </Box>
    );
  } else if (sectionCfg.arrangement === 'responsive-row' && !isMobile) {
    sections = (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, width: '100%' }}>
        <SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><AboutSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper>
        <SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><ProjectsSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper>
        <SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><SkillsSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper>
        <SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><ContactSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper>
      </Box>
    );
  } else if (sectionCfg.arrangement === 'centered') {
    sections = (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%' }}>
        <SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><AboutSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper>
        <SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><ProjectsSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper>
        <SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><SkillsSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper>
        <SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><ContactSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper>
      </Box>
    );
  } else {
    // Default: stacked column
    sections = (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
        <SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><AboutSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper>
        <SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><ProjectsSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper>
        <SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><SkillsSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper>
        <SectionWrapper theme={theme} framework={currentFrameworkObj} hover={sectionHover[currentFrameworkObj.className]}><ContactSection theme={theme} framework={currentFrameworkObj} layout={layout} /></SectionWrapper>
      </Box>
    );
  }
  
  return (
    <Box
      ref={containerRef}
      className={`self-modifying-container ${currentFrameworkObj.className} ${isGlitching ? 'glitch-effect' : ''} ${chaosMode ? 'chaos-mode' : ''}`}
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '400px',
        display: 'flex',
        flexDirection: layout.direction,
        alignItems: layout.align,
        justifyContent: layout.justify,
        gap: layout.gap,
        padding: 4,
        transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
        background: themeVariations[currentFrameworkObj.className].background,
        color: themeVariations[currentFrameworkObj.className].text,
        borderRadius: 2,
        overflow: 'hidden',
        fontFamily: currentFrameworkObj.font,
        fontSize: layout.fontSize,
        fontWeight: layout.fontWeight,
        boxShadow: themeVariations[currentFrameworkObj.className].glow,
        backdropFilter: themeVariations[currentFrameworkObj.className].blur ? `blur(${themeVariations[currentFrameworkObj.className].blur})` : undefined,
        ...(chaosMode && { animation: 'chaosShake 0.2s infinite alternate' }),
      }}
      onMouseEnter={handleHover}
    >
      {/* Parallax background */}
      {enableParallax && (
        <ParallaxBackground 
          theme={themeVariations[currentFrameworkObj.className]} 
          framework={currentFrameworkObj} 
        />
      )}
      
      {/* Top controls bar: fullscreen left, theme switcher right */}
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, zIndex: 10 }}>
        <Button
          onClick={handleFullscreen}
          variant="outlined"
          size="small"
          sx={{ minWidth: 36, borderRadius: 2, p: 1, color: themeVariations[currentFrameworkObj.className].primary, borderColor: themeVariations[currentFrameworkObj.className].primary, background: 'rgba(0,0,0,0.15)' }}
        >
          {isFullscreen ? <FullscreenExitIcon fontSize="small" /> : <FullscreenIcon fontSize="small" />}
          <span style={{ marginLeft: 6, fontSize: 14 }}>{isFullscreen ? 'Exit Full Screen' : 'View Full Screen'}</span>
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setEnableParallax(!enableParallax)}
            sx={{ 
              borderRadius: 2, 
              p: 1, 
              color: themeVariations[currentFrameworkObj.className].primary, 
              borderColor: themeVariations[currentFrameworkObj.className].primary, 
              background: 'rgba(0,0,0,0.15)',
              minWidth: 36
            }}
          >
            {enableParallax ? 'Disable Parallax' : 'Enable Parallax'}
          </Button>
          <select value={manualTheme || frameworks[currentFramework].name} onChange={handleManualTheme} style={{ fontSize: layout.fontSize, borderRadius: 6, padding: '0.3rem 1rem', fontFamily: currentFrameworkObj.font }}>
            {frameworks.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
          </select>
        </Box>
      </Box>
      {/* Overlays for chaos/glitch/matrix */}
      {chaosOverlays}
      {/* Confetti/particle burst placeholder */}
      {showConfetti && <div className="confetti-burst-placeholder" />}
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
            fontWeight: layout.fontWeight,
            color: themeVariations[currentFrameworkObj.className].primary,
            textAlign: layout.align === 'center' ? 'center' : 'left',
            textShadow: themeVariations[currentFrameworkObj.className].glow,
            fontFamily: currentFrameworkObj.font,
            letterSpacing: chaosMode ? '2px' : 'normal',
            fontSize: layout.fontSize + 8,
          }}
          className={chaosMode ? 'glitch-text' : ''}
        >
          {glitchText}
        </Typography>
      </motion.div>
      {/* --- Full Portfolio Sections --- */}
      {sections}
      
      <Paper
        elevation={3}
        className={currentFrameworkObj.paperClass}
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: themeVariations[currentFrameworkObj.className].paper,
          color: themeVariations[currentFrameworkObj.className].text,
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
          backgroundColor: chaosMode ? themeVariations[currentFrameworkObj.className].primary : themeVariations[currentFrameworkObj.className].secondary,
          color: '#000',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: chaosMode ? themeVariations[currentFrameworkObj.className].secondary : themeVariations[currentFrameworkObj.className].primary,
          },
        }}
      >
        {chaosMode ? 'Disable Chaos Mode' : 'Enable Chaos Mode'}
      </Button>
      
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 2, 
          color: themeVariations[currentFrameworkObj.className].text,
          opacity: 0.7,
        }}
      >
        Hover count: {hoverCount} | Last interaction: {Math.floor((Date.now() - lastInteraction) / 1000)}s ago
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 2 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold', 
          color: themeVariations[currentFrameworkObj.className].primary,
          fontFamily: currentFrameworkObj.font,
          textShadow: themeVariations[currentFrameworkObj.className].glow
        }}>
          {glitchText || 'Self-Modifying Portfolio'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            onClick={toggleColorCycle}
            sx={{
              backgroundColor: colorCycle ? themeVariations[currentFrameworkObj.className].secondary : themeVariations[currentFrameworkObj.className].primary,
              color: '#fff',
              '&:hover': {
                backgroundColor: themeVariations[currentFrameworkObj.className].secondary,
              },
              boxShadow: themeVariations[currentFrameworkObj.className].glow,
            }}
          >
            {colorCycle ? 'Stop Color Cycle' : 'Start Color Cycle'}
          </Button>
          <Button
            variant="contained"
            onClick={handleFullscreen}
            sx={{
              backgroundColor: themeVariations[currentFrameworkObj.className].primary,
              color: '#fff',
              '&:hover': {
                backgroundColor: themeVariations[currentFrameworkObj.className].secondary,
              },
              boxShadow: themeVariations[currentFrameworkObj.className].glow,
            }}
          >
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            {isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

// SectionWrapper: applies hover animation and class
function SectionWrapper({ children, theme, framework, hover }) {
  // Use different depth values for different sections to create layered effect
  const depthMap = {
    'about': 0.15,
    'projects': 0.25,
    'skills': 0.2,
    'contact': 0.1
  };
  
  // Determine which section this is based on the first child's type
  const sectionType = React.Children.toArray(children)[0]?.type?.name?.toLowerCase().replace('section', '') || 'about';
  const depth = depthMap[sectionType] || 0.2;
  
  return (
    <ParallaxCard theme={theme} framework={framework} hover={hover} depth={depth}>
      {children}
    </ParallaxCard>
  );
}

export default SelfModifyingPortfolio; 