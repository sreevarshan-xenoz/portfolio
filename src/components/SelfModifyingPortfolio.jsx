import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
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
};

// About Section
function AboutSection({ theme, framework, layout }) {
  return (
    <Paper elevation={2} className={framework.paperClass} sx={{ mb: 3, p: 2, backgroundColor: theme.paper, color: theme.text, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: 64, height: 64, borderRadius: '50%', background: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: theme.background, fontWeight: 'bold' }}>
          S
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.primary, fontFamily: framework.font }}>Sreevarshan</Typography>
          <Typography variant="body2" sx={{ color: theme.text, opacity: 0.8 }}>
            Futuristic developer, AI/OS hacker, and creative technologist. I build wild, adaptive, and sentient web experiences.
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

// Projects Section
const demoProjects = [
  {
    title: 'IRIS OS',
    desc: 'Custom Linux OS with built-in AI voice assistant. Arch-based, hackable, and beautiful.',
    tech: ['Python', 'Arch Linux', 'LLMs', 'Hyprland'],
    github: 'https://github.com/sreevarshan-xenoz/iris-os',
    live: '#',
  },
  {
    title: 'AURA',
    desc: 'Smart home system with voice/gesture control and AI routines.',
    tech: ['IoT', 'React', 'Node.js', 'ML'],
    github: 'https://github.com/sreevarshan-xenoz/aura',
    live: '#',
  },
  {
    title: 'Student Job Finder',
    desc: 'Platform connecting students with jobs and internships. Skill-matching and campus focus.',
    tech: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/sreevarshan-xenoz/student-job-finder',
    live: '#',
  },
];
function ProjectsSection({ theme, framework, layout }) {
  return (
    <Paper elevation={2} className={framework.paperClass} sx={{ mb: 3, p: 2, backgroundColor: theme.paper, color: theme.text, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ color: theme.secondary, fontWeight: 'bold', mb: 2, fontFamily: framework.font }}>Projects</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {demoProjects.map((proj, i) => (
          <Box key={proj.title} sx={{ flex: '1 1 220px', minWidth: 200, maxWidth: 260, p: 2, borderRadius: 2, background: theme.background, color: theme.text, boxShadow: theme.shadow, mb: 1, fontFamily: framework.font }}>
            <Typography variant="subtitle1" sx={{ color: theme.primary, fontWeight: 'bold', mb: 1 }}>{proj.title}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{proj.desc}</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              {proj.tech.map(t => <Box key={t} sx={{ px: 1, py: 0.2, borderRadius: 1, background: theme.secondary, color: theme.background, fontSize: 12 }}>{t}</Box>)}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" href={proj.github} target="_blank" sx={{ color: theme.primary, fontWeight: 'bold', textTransform: 'none' }}>Code</Button>
              <Button size="small" href={proj.live} target="_blank" sx={{ color: theme.secondary, fontWeight: 'bold', textTransform: 'none' }}>Live</Button>
            </Box>
          </Box>
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
];
function SkillsSection({ theme, framework, layout }) {
  return (
    <Paper elevation={2} className={framework.paperClass} sx={{ mb: 3, p: 2, backgroundColor: theme.paper, color: theme.text, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ color: theme.secondary, fontWeight: 'bold', mb: 2, fontFamily: framework.font }}>Skills</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {demoSkills.map(skill => (
          <Box key={skill.name} sx={{ minWidth: 120, flex: '1 1 120px' }}>
            <Typography variant="body2" sx={{ color: skill.color, fontWeight: 'bold', fontFamily: framework.font }}>{skill.name}</Typography>
            <Box sx={{ height: 8, borderRadius: 4, background: theme.background, boxShadow: theme.shadow, overflow: 'hidden', mb: 1 }}>
              <motion.div initial={{ width: 0 }} animate={{ width: skill.level + '%' }} transition={{ duration: 1.2 }} style={{ height: '100%', background: skill.color }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

// Contact Section
function ContactSection({ theme, framework, layout }) {
  return (
    <Paper elevation={2} className={framework.paperClass} sx={{ mb: 3, p: 2, backgroundColor: theme.paper, color: theme.text, borderRadius: 2, textAlign: 'center' }}>
      <Typography variant="h6" sx={{ color: theme.secondary, fontWeight: 'bold', mb: 2, fontFamily: framework.font }}>Contact</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
        <Button href="mailto:sreevarshan@example.com" sx={{ color: theme.primary, fontWeight: 'bold', textTransform: 'none' }}>Email</Button>
        <Button href="https://github.com/sreevarshan-xenoz" target="_blank" sx={{ color: theme.secondary, fontWeight: 'bold', textTransform: 'none' }}>GitHub</Button>
        <Button href="https://linkedin.com/in/sreevarshan" target="_blank" sx={{ color: theme.primary, fontWeight: 'bold', textTransform: 'none' }}>LinkedIn</Button>
      </Box>
      <Typography variant="body2" sx={{ color: theme.text, opacity: 0.7 }}>Let's build something wild together!</Typography>
    </Paper>
  );
}

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
      className={`self-modifying-container ${currentFrameworkObj.className} ${isGlitching ? 'glitch-effect' : ''}`}
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
        background: theme.background,
        color: theme.text,
        borderRadius: 2,
        overflow: 'hidden',
        fontFamily: currentFrameworkObj.font,
        fontSize: layout.fontSize,
        fontWeight: layout.fontWeight,
        boxShadow: theme.shadow,
        backdropFilter: theme.blur ? `blur(${theme.blur})` : undefined,
        ...(chaosMode && { animation: 'chaosShake 0.2s infinite alternate' }),
      }}
      onMouseEnter={handleHover}
    >
      {/* Top controls bar: fullscreen left, theme switcher right */}
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, zIndex: 10 }}>
        <Button
          onClick={handleFullscreen}
          variant="outlined"
          size="small"
          sx={{ minWidth: 36, borderRadius: 2, p: 1, color: theme.primary, borderColor: theme.primary, background: 'rgba(0,0,0,0.15)' }}
        >
          {isFullscreen ? <FullscreenExitIcon fontSize="small" /> : <FullscreenIcon fontSize="small" />}
          <span style={{ marginLeft: 6, fontSize: 14 }}>{isFullscreen ? 'Exit Full Screen' : 'View Full Screen'}</span>
        </Button>
        <Box>
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
            color: theme.primary,
            textAlign: layout.align === 'center' ? 'center' : 'left',
            textShadow: theme.glow,
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
          backgroundColor: theme.paper,
          color: theme.text,
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
          backgroundColor: chaosMode ? theme.secondary : theme.primary,
          color: '#000',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: chaosMode ? theme.primary : theme.secondary,
          },
        }}
      >
        {chaosMode ? 'Disable Chaos Mode' : 'Enable Chaos Mode'}
      </Button>
      
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 2, 
          color: theme.text,
          opacity: 0.7,
        }}
      >
        Hover count: {hoverCount} | Last interaction: {Math.floor((Date.now() - lastInteraction) / 1000)}s ago
      </Typography>
    </Box>
  );
};

// SectionWrapper: applies hover animation and class
function SectionWrapper({ children, theme, framework, hover }) {
  return (
    <motion.div
      whileHover={hover.motion}
      className={hover.class}
      style={{ width: '100%' }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}

export default SelfModifyingPortfolio; 