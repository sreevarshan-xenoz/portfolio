import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, Grid, useMediaQuery, useTheme, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RedPillIcon from '@mui/icons-material/RadioButtonChecked';
import BluePillIcon from '@mui/icons-material/RadioButtonUnchecked';
import BugReportIcon from '@mui/icons-material/BugReport';
import CodeIcon from '@mui/icons-material/Code';

// --- Layout mapping for each card ---
const cardLayouts = {
  about: 'column',
  projects: 'grid',
  skills: 'row',
  contact: 'column-reverse',
};

// Update green color for rain, borders, text, and glows
const SOFT_GREEN = '#66ff99';
const RAIN_COLORS = [SOFT_GREEN, '#00bfff', '#ff2052'];

// Matrix rain effect (canvas, scoped to parent container, now RGB)
function MatrixRainBackground({ parentRef }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (!canvas || !parent) return;
    let width = parent.offsetWidth;
    let height = parent.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    const fontSize = 18;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    const speed = 0.4;
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const colors = RAIN_COLORS;
    let animationFrame;
    function draw() {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillText(text, i * fontSize, Math.floor(drops[i]) * fontSize);
        if (Math.floor(drops[i]) * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed;
      }
      animationFrame = requestAnimationFrame(draw);
    }
    draw();
    function handleResize() {
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [parentRef]);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7,
      }}
    />
  );
}

// Mini Matrix rain for cards (now RGB)
function MiniMatrixRainBackground({ parentRef }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (!canvas || !parent) return;
    let width = parent.offsetWidth;
    let height = parent.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    const speed = 0.3;
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const colors = RAIN_COLORS;
    let animationFrame;
    function draw() {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillText(text, i * fontSize, Math.floor(drops[i]) * fontSize);
        if (Math.floor(drops[i]) * fontSize > height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i] += speed;
      }
      animationFrame = requestAnimationFrame(draw);
    }
    draw();
    function handleResize() {
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [parentRef]);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.8,
      }}
    />
  );
}

// Glitch text animation
function GlitchText({ text }) {
  const [display, setDisplay] = React.useState('');
  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i) + (i < text.length ? '_': ''));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <span style={{
      color: '#39ff14',
      fontFamily: 'monospace',
      textShadow: '0 0 8px #39ff14, 0 0 2px #fff',
      letterSpacing: 2,
      fontSize: 32,
      userSelect: 'none',
    }}>{display}</span>
  );
}

// Matrix section card with hover/glitch and mini rain - now responsive
function MatrixSectionCard({ title, children, onHover, onLeave, glitch, focus }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  function handleEnter() {
    setHovered(true);
    if (window.matrixSounds) {
      window.matrixSounds.playGlitch();
    }
    if (onHover) onHover();
  }
  
  function handleExit() {
    setHovered(false);
    if (onLeave) onLeave();
  }
  
  return (
    <Box
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleExit}
      sx={{
        background: 'rgba(0,0,0,0.85)',
        border: glitch ? `2px solid ${SOFT_GREEN}` : `1.5px solid ${SOFT_GREEN}`,
        boxShadow: glitch ? `0 0 24px 4px ${SOFT_GREEN}80, 0 0 8px #fff2` : `0 0 12px 2px ${SOFT_GREEN}40`,
        borderRadius: 2,
        p: isMobile ? 2 : 3,
        m: isMobile ? 0.5 : 1,
        minWidth: isMobile ? 'auto' : 260,
        minHeight: isMobile ? 160 : 180,
        fontFamily: 'monospace',
        color: SOFT_GREEN,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.18s cubic-bezier(.4,2,.6,1)',
        filter: glitch ? `contrast(1.5) brightness(1.2) drop-shadow(0 0 8px ${SOFT_GREEN})` : 'none',
        transform: glitch ? 'scale(1.04) skewX(-2deg)' : 'none',
        cursor: 'pointer',
        zIndex: 2,
        ...(focus && {
          border: `2px solid ${SOFT_GREEN}`,
          boxShadow: `0 0 24px 4px ${SOFT_GREEN}80, 0 0 8px #fff2`,
          transform: 'scale(1.04) skewX(-2deg)',
        }),
      }}
      className={glitch ? 'matrix-glitch' : ''}
    >
      {/* Mini Matrix rain on hover */}
      {hovered && <MiniMatrixRainBackground parentRef={cardRef} />}
      <Typography variant="h5" sx={{ 
        mb: 2, 
        fontFamily: 'monospace', 
        textShadow: `0 0 8px ${SOFT_GREEN}`, 
        position: 'relative', 
        zIndex: 2,
        fontSize: isMobile ? '1.2rem' : '1.5rem'
      }}>{title}</Typography>
      <Box sx={{ position: 'relative', zIndex: 2 }}>{children}</Box>
      {/* Glitch scanline overlay */}
      {glitch && <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `repeating-linear-gradient(transparent, ${SOFT_GREEN}22 2px, transparent 4px)`, zIndex: 3, mixBlendMode: 'screen' }} />}
    </Box>
  );
}

// Matrix text decode animation (characters scramble into readable text)
function MatrixDecodeText({ text, delay = 0, duration = 1.5, className = '' }) {
  const [decodedText, setDecodedText] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  useEffect(() => {
    let timeoutId;
    let intervalId;
    
    // Start decoding after delay
    timeoutId = setTimeout(() => {
      setIsDecoding(true);
      let iterations = 0;
      const maxIterations = Math.floor(duration * 10);
      const finalText = text;
      
      intervalId = setInterval(() => {
        iterations++;
        
        // Calculate how much of the text should be decoded
        const progress = iterations / maxIterations;
        const decodedLength = Math.floor(finalText.length * progress);
        
        // Create text with decoded part + random chars
        let result = '';
        for (let i = 0; i < finalText.length; i++) {
          if (i < decodedLength) {
            result += finalText[i];
          } else {
            // For spaces, keep them as spaces
            if (finalText[i] === ' ') {
              result += ' ';
            } else {
              result += chars[Math.floor(Math.random() * chars.length)];
            }
          }
        }
        
        setDecodedText(result);
        
        // End decoding
        if (iterations >= maxIterations) {
          clearInterval(intervalId);
          setDecodedText(finalText);
          setIsDecoding(false);
        }
      }, 50);
    }, delay * 1000);
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, duration]);
  
  return (
    <span className={className} style={{ fontFamily: 'monospace' }}>
      {decodedText || text}
    </span>
  );
}

// --- Matrix Portfolio Data (from Self-Modifying Portfolio) ---
const about = {
  name: 'Sreevarshan',
  avatar: 'https://avatars.githubusercontent.com/u/67462139?v=4',
  bio: 'Futuristic developer, AI/OS hacker, and creative technologist. I build wild, adaptive, and sentient web experiences. I thrive in hackathons, chaos, and caffeine. Currently building "Iris" — a custom Arch Linux-based OS with integrated offline/online AI. I bend systems to my will, and I don\'t believe in limits.'
};
const projects = [
  {
    name: 'IRIS OS',
    desc: 'Custom Linux OS with built-in AI voice assistant. Arch-based, hackable, and beautiful.',
    tech: ['Python', 'Arch Linux', 'LLMs', 'Hyprland'],
    github: 'https://github.com/sreevarshan-xenoz/iris-os',
    live: '#',
  },
  {
    name: 'AURA',
    desc: 'Smart home system with voice/gesture control and AI routines.',
    tech: ['IoT', 'React', 'Node.js', 'ML'],
    github: 'https://github.com/sreevarshan-xenoz/aura',
    live: '#',
  },
  {
    name: 'Student Job Finder',
    desc: 'Platform connecting students with jobs and internships. Skill-matching and campus focus.',
    tech: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/sreevarshan-xenoz/student-job-finder',
    live: '#',
  },
];
const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'AI/ML', level: 75 },
  { name: 'Linux', level: 80 },
  { name: 'Ethical Hacking', level: 70 },
  { name: 'C', level: 65 },
  { name: 'Rust', level: 60 },
];
const contact = {
  email: 'sreevarshan@example.com',
  github: 'https://github.com/sreevarshan-xenoz',
  linkedIn: 'https://linkedin.com/in/sreevarshan',
};

// --- Matrix Easter Eggs ---
function MatrixEasterEggs({ onColorChange }) {
  const [konamiCode, setKonamiCode] = useState([]);
  const [showRabbit, setShowRabbit] = useState(false);
  const [hackMode, setHackMode] = useState(false);
  const [pillTaken, setPillTaken] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Konami code sequence: ↑↑↓↓←→←→BA
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  // Handle keydown for Konami code
  useEffect(() => {
    function handleKeyDown(e) {
      const newCode = [...konamiCode, e.key];
      setKonamiCode(newCode.slice(-10)); // Keep last 10 keys
      
      // Check if sequence matches
      if (newCode.slice(-10).join(',') === konamiSequence.join(',')) {
        triggerKonamiEffect();
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiCode]);
  
  // Trigger Konami code effect
  function triggerKonamiEffect() {
    // Create a glitch effect across the screen
    const glitchEffect = document.createElement('div');
    glitchEffect.style.position = 'fixed';
    glitchEffect.style.top = '0';
    glitchEffect.style.left = '0';
    glitchEffect.style.width = '100vw';
    glitchEffect.style.height = '100vh';
    glitchEffect.style.background = 'rgba(0,0,0,0.7)';
    glitchEffect.style.zIndex = '9999';
    glitchEffect.style.pointerEvents = 'none';
    glitchEffect.style.animation = 'matrix-glitch-anim 0.5s linear';
    document.body.appendChild(glitchEffect);
    
    // Play a sound if available
    if (window.matrixSounds) {
      window.matrixSounds.playGlitch();
    }
    
    // Remove after animation
    setTimeout(() => {
      document.body.removeChild(glitchEffect);
    }, 500);
  }
  
  // Toggle hack mode
  function toggleHackMode() {
    setHackMode(!hackMode);
    if (!hackMode) {
      // Change to red/blue color scheme
      onColorChange('#ff2052', '#00bfff');
    } else {
      // Reset to original colors
      onColorChange(SOFT_GREEN, '#00bfff');
    }
  }
  
  // Take the red pill
  function takeRedPill() {
    setPillTaken(true);
    
    // Create a full-screen effect
    const pillEffect = document.createElement('div');
    pillEffect.style.position = 'fixed';
    pillEffect.style.top = '0';
    pillEffect.style.left = '0';
    pillEffect.style.width = '100vw';
    pillEffect.style.height = '100vh';
    pillEffect.style.background = 'rgba(255,32,82,0.8)';
    pillEffect.style.zIndex = '9999';
    pillEffect.style.pointerEvents = 'none';
    pillEffect.style.transition = 'all 1s ease-in-out';
    document.body.appendChild(pillEffect);
    
    // Animate
    setTimeout(() => {
      pillEffect.style.transform = 'scale(1.5)';
      pillEffect.style.opacity = '0';
    }, 100);
    
    // Remove after animation
    setTimeout(() => {
      document.body.removeChild(pillEffect);
    }, 1000);
    
    // Show the rabbit message
    setShowRabbit(true);
    setTimeout(() => setShowRabbit(false), 5000);
  }
  
  return (
    <>
      {/* Red Pill Button */}
      <Tooltip title="Take the red pill">
        <IconButton 
          onClick={takeRedPill}
          sx={{ 
            position: 'fixed', 
            top: isMobile ? 10 : 20, 
            right: isMobile ? 10 : 20, 
            zIndex: 100,
            color: '#ff2052',
            '&:hover': {
              color: '#ff4080',
              transform: 'scale(1.2)',
            },
            transition: 'all 0.3s ease'
          }}
        >
          <RedPillIcon />
        </IconButton>
      </Tooltip>
      
      {/* Hack Mode Button */}
      <Tooltip title="Hack the system">
        <IconButton 
          onClick={toggleHackMode}
          sx={{ 
            position: 'fixed', 
            top: isMobile ? 10 : 20, 
            right: isMobile ? 60 : 80, 
            zIndex: 100,
            color: hackMode ? '#ff2052' : SOFT_GREEN,
            '&:hover': {
              color: hackMode ? '#ff4080' : '#99ffbb',
              transform: 'scale(1.2)',
            },
            transition: 'all 0.3s ease'
          }}
        >
          <BugReportIcon />
        </IconButton>
      </Tooltip>
      
      {/* Hidden "Follow the white rabbit" message */}
      <AnimatePresence>
        {showRabbit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(0,0,0,0.9)',
              border: '2px solid #ff2052',
              padding: '20px',
              borderRadius: '5px',
              zIndex: 1000,
              textAlign: 'center',
              maxWidth: '80%',
              boxShadow: '0 0 20px #ff2052',
            }}
          >
            <Typography variant="h6" sx={{ color: '#ff2052', fontFamily: 'monospace', mb: 1 }}>
              Follow the white rabbit...
            </Typography>
            <Typography variant="body2" sx={{ color: '#ff2052', fontFamily: 'monospace' }}>
              You've taken the red pill. Now you can see how deep the rabbit hole goes.
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hidden Konami code hint */}
      <Box 
        sx={{ 
          position: 'fixed', 
          bottom: isMobile ? 60 : 80, 
          right: 10, 
          opacity: 0.1,
          zIndex: 100,
          '&:hover': {
            opacity: 0.5,
          },
          transition: 'opacity 0.3s ease'
        }}
      >
        <CodeIcon sx={{ color: SOFT_GREEN }} />
      </Box>
    </>
  );
}

// --- Matrix Portfolio Section Cards ---

function MatrixAboutCard(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <>
      <Typography variant="subtitle2" sx={{ color: '#39ff14', opacity: 0.8, mb: 1 }}>Who am I?</Typography>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: isMobile ? 1 : 2, 
        mb: 2,
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        <Box component="img" src={about.avatar} alt="avatar" sx={{ 
          width: isMobile ? 48 : 56, 
          height: isMobile ? 48 : 56, 
          borderRadius: '50%', 
          border: '2px solid #39ff14', 
          boxShadow: '0 0 12px #39ff14' 
        }} />
        <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
          <Typography variant="h6" sx={{ 
            color: '#39ff14', 
            fontFamily: 'monospace', 
            fontWeight: 'bold',
            fontSize: isMobile ? '1rem' : '1.25rem'
          }}>{about.name}</Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ 
        color: '#39ff14', 
        opacity: 0.85,
        fontSize: isMobile ? '0.8rem' : '0.875rem',
        lineHeight: isMobile ? 1.4 : 1.6
      }}>{about.bio}</Typography>
    </>
  );
}

function MatrixProjectsCard({ focus }) {
  const [visible, setVisible] = useState(false);
  
  // Trigger animation when component mounts or when focused
  useEffect(() => {
    setVisible(true);
  }, []);
  
  useEffect(() => {
    if (focus) {
      setVisible(false);
      setTimeout(() => setVisible(true), 100);
    }
  }, [focus]);
  
  return (
    <>
      <Typography variant="subtitle2" sx={{ color: SOFT_GREEN, opacity: 0.8, mb: 1 }}>
        <MatrixDecodeText text="Featured Projects" delay={0.1} duration={1} />
      </Typography>
      <AnimatePresence>
        {visible && projects.map((p, index) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (index * 0.15), duration: 0.5 }}
          >
            <Box sx={{ mb: 2, borderBottom: `1px dashed ${SOFT_GREEN}40`, pb: 1 }}>
              <Typography variant="subtitle1" sx={{ color: SOFT_GREEN, fontWeight: 'bold', textShadow: `0 0 4px ${SOFT_GREEN}` }}>
                <MatrixDecodeText text={p.name} delay={0.3 + (index * 0.15)} duration={1} />
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                <MatrixDecodeText text={p.desc} delay={0.5 + (index * 0.15)} duration={1.5} />
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 0.5 }}>
                {p.tech.map((t, techIndex) => (
                  <Box 
                    key={t} 
                    sx={{ 
                      px: 1, py: 0.2, borderRadius: 1, 
                      border: `1px solid ${SOFT_GREEN}`, 
                      color: SOFT_GREEN, 
                      fontSize: 12, 
                      background: 'rgba(102,255,153,0.08)' 
                    }}
                  >
                    <MatrixDecodeText text={t} delay={0.7 + (index * 0.15) + (techIndex * 0.05)} duration={0.8} />
                  </Box>
                ))}
              </Box>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + (index * 0.15), duration: 0.5 }}
              >
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: SOFT_GREEN, textDecoration: 'underline', fontSize: 13 }}>Code</a>
                  <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ color: SOFT_GREEN, textDecoration: 'underline', fontSize: 13 }}>Live</a>
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}

function MatrixSkillsCard(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <>
      <Typography variant="subtitle2" sx={{ color: '#39ff14', opacity: 0.8, mb: 1 }}>Skills & Tech Stack</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 0.5 : 1 }}>
        {skills.map(skill => (
          <Box key={skill.name} sx={{ mb: isMobile ? 0.5 : 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0.5 : 1 }}>
              <Typography variant="body2" sx={{ 
                color: '#39ff14', 
                minWidth: isMobile ? 70 : 90,
                fontSize: isMobile ? '0.7rem' : '0.875rem'
              }}>{skill.name}</Typography>
              <Box sx={{ 
                flex: 1, 
                height: isMobile ? 5 : 7, 
                background: '#111', 
                borderRadius: 2, 
                overflow: 'hidden', 
                boxShadow: '0 0 4px #39ff14' 
              }}>
                <Box sx={{ width: `${skill.level}%`, height: '100%', background: 'linear-gradient(90deg, #39ff14, #0f0)', boxShadow: '0 0 8px #39ff14' }} />
              </Box>
              <Typography variant="caption" sx={{ 
                color: '#39ff14', 
                opacity: 0.7, 
                ml: 1,
                fontSize: isMobile ? '0.6rem' : '0.75rem'
              }}>{skill.level}%</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

function MatrixContactCard(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <>
      <Typography variant="subtitle2" sx={{ color: '#39ff14', opacity: 0.8, mb: 1 }}>Contact & Links</Typography>
      <Typography variant="body2" sx={{ 
        mb: 1,
        fontSize: isMobile ? '0.8rem' : '0.875rem'
      }}>Email: <a href={`mailto:${contact.email}`} style={{ color: '#39ff14', textDecoration: 'underline' }}>{contact.email}</a></Typography>
      <Typography variant="body2" sx={{ 
        mb: 1,
        fontSize: isMobile ? '0.8rem' : '0.875rem'
      }}>GitHub: <a href={contact.github} target="_blank" rel="noopener noreferrer" style={{ color: '#39ff14', textDecoration: 'underline' }}>sreevarshan-xenoz</a></Typography>
      <Typography variant="body2" sx={{ 
        mb: 1,
        fontSize: isMobile ? '0.8rem' : '0.875rem'
      }}>LinkedIn: <a href={contact.linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: '#39ff14', textDecoration: 'underline' }}>sreevarshan</a></Typography>
      <Typography variant="body2" sx={{ 
        color: '#39ff14', 
        opacity: 0.7, 
        mt: 2,
        fontSize: isMobile ? '0.8rem' : '0.875rem'
      }}>Let's build something wild together in the Matrix.</Typography>
    </>
  );
}

// --- Matrix Terminal Component ---
function MatrixTerminal({ onCommand }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [output, setOutput] = useState([]);
  const inputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Command handler
  function handleCommand(cmd) {
    const command = cmd.trim().toLowerCase();
    let out = '';
    if (command === 'about') out = 'Focusing About section...';
    else if (command === 'projects') out = 'Focusing Projects section...';
    else if (command === 'skills') out = 'Focusing Skills section...';
    else if (command === 'contact') out = 'Focusing Contact section...';
    else if (command === 'help') out = 'Available: about, projects, skills, contact, help, clear';
    else if (command === 'clear') {
      setOutput([]);
      return;
    } else out = 'Unknown command. Type help.';
    setOutput(o => [...o, `$ ${cmd}`, out]);
    if (['about','projects','skills','contact'].includes(command)) {
      onCommand(command);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (input.trim()) {
        if (window.matrixSounds) {
          window.matrixSounds.playTyping();
        }
        setHistory(h => [...h, input]);
        handleCommand(input);
        setInput('');
      }
    }
  }

  return (
    <Box sx={{
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      background: 'rgba(0,0,0,0.92)',
      color: SOFT_GREEN,
      fontFamily: 'monospace',
      fontSize: isMobile ? 14 : 16,
      p: isMobile ? 1 : 2,
      zIndex: 10,
      borderTop: `2px solid ${SOFT_GREEN}`,
      boxShadow: `0 -2px 16px ${SOFT_GREEN}40`,
      userSelect: 'none',
    }}>
      {/* On mobile, show fewer lines */}
      {output.slice(-(isMobile ? 3 : 6)).map((line, i) => (
        <Box key={i} sx={{ 
          whiteSpace: 'pre', 
          color: SOFT_GREEN, 
          fontFamily: 'monospace',
          fontSize: isMobile ? 14 : 16,
          lineHeight: isMobile ? 1.2 : 1.5
        }}>{line}</Box>
      ))}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box component="span" sx={{ color: SOFT_GREEN, mr: 1 }}>$</Box>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: SOFT_GREEN,
            fontFamily: 'monospace',
            fontSize: isMobile ? 14 : 16,
            width: isMobile ? '80vw' : '60vw',
          }}
          autoFocus
        />
        <Box component="span" sx={{
          width: isMobile ? 8 : 10, 
          height: isMobile ? 16 : 20, 
          ml: 0.5, 
          display: 'inline-block',
          background: SOFT_GREEN, 
          opacity: 0.7,
          animation: 'matrix-blink 1s steps(1) infinite',
        }} />
      </Box>
      <style>{`
        @keyframes matrix-blink { 0%, 50% { opacity: 0.7; } 51%, 100% { opacity: 0; } }
      `}</style>
    </Box>
  );
}

// --- Matrix Sound Effects ---
function MatrixSounds() {
  // Small base64 encoded sounds for quick loading
  const glitchSoundBase64 = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAABQAAAQgANTU1NTU1NTU1NTU1NTU1VVVVVVVVVVVVVVVVVVWqqqqqqqqqqqqqqqqqqqr///////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAX/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/jOMAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/4zjAAAANIAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxAAAAAJwAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
  const typingSoundBase64 = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAQgAICAgICAgICAgICAgICBAQEBAQEBAQEBAQEBAQGBgYGBgYGBgYGBgYGBgYP///////////////wAAAABMYXZjNTguMTMAAAAAAAAAAAAAAAAkAv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/jOMAAAALsAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/4zjAAAAC7AAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxAAAAAJwAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';

  // Preload sounds
  useEffect(() => {
    const glitchSound = new Audio(glitchSoundBase64);
    const typingSound = new Audio(typingSoundBase64);
    
    // Preload by setting volume to 0 and playing
    glitchSound.volume = 0;
    typingSound.volume = 0;
    
    const preloadSounds = async () => {
      try {
        await glitchSound.play();
        await typingSound.play();
        // Reset volume after preloading
        glitchSound.pause();
        typingSound.pause();
        glitchSound.currentTime = 0;
        typingSound.currentTime = 0;
        glitchSound.volume = 0.2;
        typingSound.volume = 0.1;
      } catch (error) {
        console.log('Sound preloading requires user interaction first');
      }
    };
    
    preloadSounds();
    
    // Expose sounds to window for other components to use
    window.matrixSounds = {
      playGlitch: () => {
        glitchSound.currentTime = 0;
        glitchSound.play().catch(e => console.log('Sound play error:', e));
      },
      playTyping: () => {
        typingSound.currentTime = 0;
        typingSound.play().catch(e => console.log('Sound play error:', e));
      }
    };
    
    return () => {
      // Cleanup
      delete window.matrixSounds;
    };
  }, []);
  
  return null; // This component doesn't render anything
}

export default function MatrixPortfolio() {
  const navigate = useNavigate();
  const [glitch, setGlitch] = useState(false);
  const [layout, setLayout] = useState('grid');
  const containerRef = useRef(null);
  const [focusSection, setFocusSection] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [rainColors, setRainColors] = useState(RAIN_COLORS);

  // New: track which card is hovered
  function handleHover(cardKey) {
    setGlitch(true);
    // On mobile, don't change layout as much to avoid jarring changes
    if (!isMobile) {
      setLayout(cardLayouts[cardKey] || 'grid');
    } else {
      // On mobile, only use simpler layouts
      setLayout(cardKey === 'projects' ? 'column' : 'grid');
    }
    setTimeout(() => setGlitch(false), 350);
  }
  
  function handleLeave() {
    setGlitch(false);
  }

  // Terminal command handler
  function handleTerminalCommand(cmd) {
    setFocusSection(cmd);
    setTimeout(() => setFocusSection(null), 1200);
  }
  
  // Handle color change from easter eggs
  function handleColorChange(primaryColor, secondaryColor) {
    setRainColors([primaryColor, secondaryColor, '#ff2052']);
  }

  return (
    <Box ref={containerRef} sx={{
      minHeight: '100vh',
      width: '100vw',
      background: 'black',
      color: '#39ff14',
      fontFamily: 'monospace',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
      boxShadow: glitch ? '0 0 80px #39ff14' : '0 0 40px #39ff1440',
      filter: glitch ? 'contrast(1.3) brightness(1.1) blur(1px)' : 'none',
    }}>
      <MatrixRainBackground parentRef={containerRef} />
      <MatrixSounds />
      <MatrixEasterEggs onColorChange={handleColorChange} />
      <Box sx={{ position: 'relative', zIndex: 2, pt: isMobile ? 4 : 8, pb: isMobile ? 10 : 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <GlitchText text={isMobile ? "Matrix Portfolio" : "Welcome to the True Matrix Portfolio"} />
        </Box>
        <Grid
          container
          spacing={isMobile ? 1 : 3}
          direction={
            isMobile ? 'column' : (
              layout === 'grid' ? 'row'
              : layout === 'row' ? 'row'
              : layout === 'column' ? 'column'
              : layout === 'column-reverse' ? 'column-reverse'
              : 'row'
            )
          }
          alignItems="stretch"
          justifyContent="center"
          sx={{ transition: 'all 0.4s cubic-bezier(.4,2,.6,1)', zIndex: 2 }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <MatrixSectionCard title="About Me" onHover={() => handleHover('about')} onLeave={handleLeave} glitch={glitch} focus={focusSection === 'about'}>
              <MatrixAboutCard />
            </MatrixSectionCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MatrixSectionCard title="Projects" onHover={() => handleHover('projects')} onLeave={handleLeave} glitch={glitch} focus={focusSection === 'projects'}>
              <MatrixProjectsCard focus={focusSection === 'projects'} />
            </MatrixSectionCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MatrixSectionCard title="Skills" onHover={() => handleHover('skills')} onLeave={handleLeave} glitch={glitch} focus={focusSection === 'skills'}>
              <MatrixSkillsCard />
            </MatrixSectionCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MatrixSectionCard title="Contact" onHover={() => handleHover('contact')} onLeave={handleLeave} glitch={glitch} focus={focusSection === 'contact'}>
              <MatrixContactCard />
            </MatrixSectionCard>
          </Grid>
        </Grid>
      </Box>
      <MatrixTerminal onCommand={handleTerminalCommand} />
      {/* Glitch CSS animation - optimize for mobile */}
      <style>{`
        .matrix-glitch {
          animation: matrix-glitch-anim 0.3s linear;
          filter: drop-shadow(0 0 8px #39ff14) drop-shadow(-2px 0 4px #00bfff) drop-shadow(2px 0 4px #ff2052);
        }
        .matrix-glitch * {
          text-shadow:
            0 0 8px #39ff14,
            -2px 0 4px #00bfff,
            2px 0 4px #ff2052;
        }
        @keyframes matrix-glitch-anim {
          0% {
            filter: none;
            transform: none;
          }
          20% {
            filter: drop-shadow(0 0 8px #39ff14) drop-shadow(-2px 0 4px #00bfff) drop-shadow(2px 0 4px #ff2052) blur(1px) contrast(1.5);
            transform: translateX(-2px) skewX(-2deg);
          }
          40% {
            filter: drop-shadow(0 0 12px #39ff14) drop-shadow(-4px 0 8px #00bfff) drop-shadow(4px 0 8px #ff2052) blur(2px) contrast(2);
            transform: translateX(2px) skewX(2deg);
          }
          60% {
            filter: drop-shadow(0 0 8px #39ff14) drop-shadow(-2px 0 4px #00bfff) drop-shadow(2px 0 4px #ff2052) blur(1px) contrast(1.5);
            transform: translateX(-1px) skewX(-1deg);
          }
          80% {
            filter: drop-shadow(0 0 6px #39ff14) drop-shadow(-1px 0 2px #00bfff) drop-shadow(2px 0 2px #ff2052) blur(0.5px) contrast(1.2);
            transform: translateX(1px) skewX(1deg);
          }
          100% {
            filter: none;
            transform: none;
          }
        }
        
        /* Media query for mobile devices */
        @media (max-width: 600px) {
          .matrix-glitch {
            animation-duration: 0.2s; /* Faster animation on mobile */
          }
          .matrix-glitch * {
            text-shadow:
              0 0 4px #39ff14,
              -1px 0 2px #00bfff,
              1px 0 2px #ff2052;
          }
        }
      `}</style>
    </Box>
  );
} 