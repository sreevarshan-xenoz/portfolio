import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Matrix rain effect (canvas, scoped to parent container)
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
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let animationFrame;
    function draw() {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = fontSize + 'px monospace';
      ctx.fillStyle = '#39ff14';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
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

// Matrix section card with hover/glitch
function MatrixSectionCard({ title, children, onHover, onLeave, glitch }) {
  return (
    <Box
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      sx={{
        background: 'rgba(0,0,0,0.85)',
        border: glitch ? '2px solid #39ff14' : '1.5px solid #39ff14',
        boxShadow: glitch ? '0 0 24px 4px #39ff14, 0 0 8px #fff' : '0 0 12px 2px #39ff1440',
        borderRadius: 2,
        p: 3,
        m: 1,
        minWidth: 260,
        minHeight: 180,
        fontFamily: 'monospace',
        color: '#39ff14',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.18s cubic-bezier(.4,2,.6,1)',
        filter: glitch ? 'contrast(1.5) brightness(1.2) drop-shadow(0 0 8px #39ff14)' : 'none',
        transform: glitch ? 'scale(1.04) skewX(-2deg)' : 'none',
        cursor: 'pointer',
        zIndex: 2,
      }}
      className={glitch ? 'matrix-glitch' : ''}
    >
      <Typography variant="h5" sx={{ mb: 2, fontFamily: 'monospace', textShadow: '0 0 8px #39ff14' }}>{title}</Typography>
      {children}
      {/* Glitch scanline overlay */}
      {glitch && <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(transparent, #39ff1422 2px, transparent 4px)', zIndex: 3, mixBlendMode: 'screen' }} />}
    </Box>
  );
}

const about = {
  name: 'Neo',
  bio: 'I am the One. I bend code and reality. Welcome to my Matrix.',
  avatar: 'https://i.imgur.com/0y0y0y0.png',
};
const projects = [
  { name: 'Red Pill App', desc: 'Choose your reality. React, Node.js, WebGL.', link: '#' },
  { name: 'Sentinel Tracker', desc: 'Real-time AI defense grid. Python, TensorFlow.', link: '#' },
];
const skills = ['Hacking', 'Bullet Time', 'Kung Fu', 'Code Bending'];
const contact = { email: 'neo@matrix.com', github: 'https://github.com/neo', linkedIn: 'https://linkedin.com/in/neo' };

export default function MatrixPortfolio() {
  const navigate = useNavigate();
  const [glitch, setGlitch] = useState(false);
  const [layout, setLayout] = useState('grid'); // 'grid' or 'column'
  const containerRef = useRef(null);

  // When any card is hovered, trigger glitch and morph layout
  function handleHover() {
    setGlitch(true);
    setLayout(l => (l === 'grid' ? 'column' : 'grid'));
    setTimeout(() => setGlitch(false), 350);
  }
  function handleLeave() {
    setGlitch(false);
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
      <Box sx={{ position: 'relative', zIndex: 2, pt: 8, pb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <GlitchText text="Welcome to the True Matrix Portfolio" />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button
            variant="outlined"
            sx={{ color: '#39ff14', borderColor: '#39ff14', fontFamily: 'monospace', '&:hover': { background: '#39ff1420', borderColor: '#39ff14' } }}
            onClick={() => navigate('/experimental')}
          >
            Back to Experiments
          </Button>
        </Box>
        <Grid
          container
          spacing={3}
          direction={layout === 'grid' ? 'row' : 'column'}
          alignItems="stretch"
          justifyContent="center"
          sx={{ transition: 'all 0.4s cubic-bezier(.4,2,.6,1)', zIndex: 2 }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <MatrixSectionCard title="About Me" onHover={handleHover} onLeave={handleLeave} glitch={glitch}>
              <Typography variant="body1" sx={{ mb: 1 }}>{about.bio}</Typography>
              <Typography variant="body2" sx={{ color: '#39ff14', opacity: 0.7 }}>Alias: {about.name}</Typography>
            </MatrixSectionCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MatrixSectionCard title="Projects" onHover={handleHover} onLeave={handleLeave} glitch={glitch}>
              {projects.map(p => (
                <Box key={p.name} sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: '#39ff14', textShadow: '0 0 4px #39ff14' }}>{p.name}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>{p.desc}</Typography>
                </Box>
              ))}
            </MatrixSectionCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MatrixSectionCard title="Skills" onHover={handleHover} onLeave={handleLeave} glitch={glitch}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skills.map(skill => (
                  <Box key={skill} sx={{ px: 2, py: 0.5, border: '1px solid #39ff14', borderRadius: 1, m: 0.5, fontSize: 15, background: 'rgba(57,255,20,0.08)', textShadow: '0 0 4px #39ff14' }}>{skill}</Box>
                ))}
              </Box>
            </MatrixSectionCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MatrixSectionCard title="Contact" onHover={handleHover} onLeave={handleLeave} glitch={glitch}>
              <Typography variant="body2" sx={{ mb: 1 }}>Email: <a href={`mailto:${contact.email}`} style={{ color: '#39ff14', textDecoration: 'underline' }}>{contact.email}</a></Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>GitHub: <a href={contact.github} target="_blank" rel="noopener noreferrer" style={{ color: '#39ff14', textDecoration: 'underline' }}>neo</a></Typography>
              <Typography variant="body2">LinkedIn: <a href={contact.linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: '#39ff14', textDecoration: 'underline' }}>neo</a></Typography>
            </MatrixSectionCard>
          </Grid>
        </Grid>
      </Box>
      {/* Glitch CSS animation */}
      <style>{`
        .matrix-glitch {
          animation: matrix-glitch-anim 0.3s linear;
        }
        @keyframes matrix-glitch-anim {
          0% { filter: none; transform: none; }
          20% { filter: blur(1px) contrast(1.5); transform: translateX(-2px) skewX(-2deg); }
          40% { filter: blur(2px) contrast(2); transform: translateX(2px) skewX(2deg); }
          60% { filter: blur(1px) contrast(1.5); transform: translateX(-1px) skewX(-1deg); }
          80% { filter: blur(0.5px) contrast(1.2); transform: translateX(1px) skewX(1deg); }
          100% { filter: none; transform: none; }
        }
      `}</style>
    </Box>
  );
} 