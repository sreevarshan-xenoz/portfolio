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
    const speed = 0.4; // SLOWER
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

// Mini Matrix rain for cards
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
    const speed = 0.3; // SLOWER
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let animationFrame;
    function draw() {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = fontSize + 'px monospace';
      ctx.fillStyle = '#39ff14';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
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

// Matrix section card with hover/glitch and mini rain
function MatrixSectionCard({ title, children, onHover, onLeave, glitch }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  function handleEnter() {
    setHovered(true);
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
      {/* Mini Matrix rain on hover */}
      {hovered && <MiniMatrixRainBackground parentRef={cardRef} />}
      <Typography variant="h5" sx={{ mb: 2, fontFamily: 'monospace', textShadow: '0 0 8px #39ff14', position: 'relative', zIndex: 2 }}>{title}</Typography>
      <Box sx={{ position: 'relative', zIndex: 2 }}>{children}</Box>
      {/* Glitch scanline overlay */}
      {glitch && <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(transparent, #39ff1422 2px, transparent 4px)', zIndex: 3, mixBlendMode: 'screen' }} />}
    </Box>
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

// --- Matrix Portfolio Section Cards ---

function MatrixAboutCard(props) {
  return (
    <>
      <Typography variant="subtitle2" sx={{ color: '#39ff14', opacity: 0.8, mb: 1 }}>Who am I?</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box component="img" src={about.avatar} alt="avatar" sx={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid #39ff14', boxShadow: '0 0 12px #39ff14' }} />
        <Box>
          <Typography variant="h6" sx={{ color: '#39ff14', fontFamily: 'monospace', fontWeight: 'bold' }}>{about.name}</Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: '#39ff14', opacity: 0.85 }}>{about.bio}</Typography>
    </>
  );
}

function MatrixProjectsCard(props) {
  return (
    <>
      <Typography variant="subtitle2" sx={{ color: '#39ff14', opacity: 0.8, mb: 1 }}>Featured Projects</Typography>
      {projects.map((p) => (
        <Box key={p.name} sx={{ mb: 2, borderBottom: '1px dashed #39ff1440', pb: 1 }}>
          <Typography variant="subtitle1" sx={{ color: '#39ff14', fontWeight: 'bold', textShadow: '0 0 4px #39ff14' }}>{p.name}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>{p.desc}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 0.5 }}>
            {p.tech.map(t => <Box key={t} sx={{ px: 1, py: 0.2, borderRadius: 1, border: '1px solid #39ff14', color: '#39ff14', fontSize: 12, background: 'rgba(57,255,20,0.08)' }}>{t}</Box>)}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: '#39ff14', textDecoration: 'underline', fontSize: 13 }}>Code</a>
            <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ color: '#39ff14', textDecoration: 'underline', fontSize: 13 }}>Live</a>
          </Box>
        </Box>
      ))}
    </>
  );
}

function MatrixSkillsCard(props) {
  return (
    <>
      <Typography variant="subtitle2" sx={{ color: '#39ff14', opacity: 0.8, mb: 1 }}>Skills & Tech Stack</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {skills.map(skill => (
          <Box key={skill.name} sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#39ff14', minWidth: 90 }}>{skill.name}</Typography>
              <Box sx={{ flex: 1, height: 7, background: '#111', borderRadius: 2, overflow: 'hidden', boxShadow: '0 0 4px #39ff14' }}>
                <Box sx={{ width: `${skill.level}%`, height: '100%', background: 'linear-gradient(90deg, #39ff14, #0f0)', boxShadow: '0 0 8px #39ff14' }} />
              </Box>
              <Typography variant="caption" sx={{ color: '#39ff14', opacity: 0.7, ml: 1 }}>{skill.level}%</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

function MatrixContactCard(props) {
  return (
    <>
      <Typography variant="subtitle2" sx={{ color: '#39ff14', opacity: 0.8, mb: 1 }}>Contact & Links</Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>Email: <a href={`mailto:${contact.email}`} style={{ color: '#39ff14', textDecoration: 'underline' }}>{contact.email}</a></Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>GitHub: <a href={contact.github} target="_blank" rel="noopener noreferrer" style={{ color: '#39ff14', textDecoration: 'underline' }}>sreevarshan-xenoz</a></Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>LinkedIn: <a href={contact.linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: '#39ff14', textDecoration: 'underline' }}>sreevarshan</a></Typography>
      <Typography variant="body2" sx={{ color: '#39ff14', opacity: 0.7, mt: 2 }}>Let's build something wild together in the Matrix.</Typography>
    </>
  );
}

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
              <MatrixAboutCard />
            </MatrixSectionCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MatrixSectionCard title="Projects" onHover={handleHover} onLeave={handleLeave} glitch={glitch}>
              <MatrixProjectsCard />
            </MatrixSectionCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MatrixSectionCard title="Skills" onHover={handleHover} onLeave={handleLeave} glitch={glitch}>
              <MatrixSkillsCard />
            </MatrixSectionCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MatrixSectionCard title="Contact" onHover={handleHover} onLeave={handleLeave} glitch={glitch}>
              <MatrixContactCard />
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