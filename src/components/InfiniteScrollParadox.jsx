import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import '../styles/ExperimentalPortfolioEffects.css';

// Futuristic, anime-inspired unique project data
const futuristicProjects = [
  {
    id: 1,
    title: 'ChronoSync Engine',
    desc: 'A time-bending codebase that lets you rewind, fast-forward, and branch your project history in real time.',
    tech: ['TemporalJS', 'QuantumDB', 'React', 'WebGL'],
    portalColor: '#00fff7',
  },
  {
    id: 2,
    title: 'NeonVerse Gateway',
    desc: 'A portfolio that exists in multiple realities, with each scroll revealing a new universe of your work.',
    tech: ['Multiverse.js', 'AnimeCSS', 'Framer Motion'],
    portalColor: '#ff00c8',
  },
  {
    id: 3,
    title: 'HoloGrid Forge',
    desc: 'Projects are forged as holographic cards, floating in a 3D grid you can manipulate with gestures.',
    tech: ['Three.js', 'HoloUI', 'TensorFlow.js'],
    portalColor: '#39ff14',
  },
  {
    id: 4,
    title: 'Aether Drift Studio',
    desc: 'A creative suite where your portfolio drifts through clouds of data, morphing with your mood and music.',
    tech: ['AetherAPI', 'MoodML', 'Tone.js'],
    portalColor: '#a18cd1',
  },
  {
    id: 5,
    title: 'Quantum Canvas',
    desc: 'Every project is a quantum state—hover to collapse the wave and reveal its true form.',
    tech: ['Qubit.js', 'React', 'Anime.js'],
    portalColor: '#ffec00',
  },
  {
    id: 6,
    title: 'PulseLink Nexus',
    desc: 'A living network of projects, each node pulsing with real-time data and interactive effects.',
    tech: ['D3.js', 'WebSockets', 'NeonUI'],
    portalColor: '#64ffda',
  },
  {
    id: 7,
    title: 'Starlight Compiler',
    desc: 'Compile your achievements into constellations—connect the stars to unlock hidden features.',
    tech: ['StarMap.js', 'React', 'GSAP'],
    portalColor: '#ff206e',
  },
  {
    id: 8,
    title: 'ZeroPoint Uplink',
    desc: 'A zero-latency, zero-gravity interface where projects orbit a singularity of innovation.',
    tech: ['ZeroG.js', 'React', 'AnimeCSS'],
    portalColor: '#7928ca',
  },
];

const CARD_HEIGHT = 260; // px, including margin
const VISIBLE_CARDS = 5;

const GLYPHS = 'アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

function getRandomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

function getRandomColor() {
  const colors = ['#00fff7', '#ff00c8', '#39ff14', '#ffec00', '#64ffda', '#ff206e', '#a18cd1', '#7928ca'];
  return colors[Math.floor(Math.random() * colors.length)];
}

const PARTICLE_COUNT = 36;

const ParticleLayer = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate initial particles
    setParticles(
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 18 + Math.random() * 18,
        color: getRandomColor(),
        glyph: getRandomGlyph(),
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 4,
        opacity: 0.18 + Math.random() * 0.22,
        blur: Math.random() > 0.7 ? 2 : 0,
        rotate: Math.random() * 360,
      }))
    );
  }, []);

  return (
    <div className="infinite-scroll-particle-layer">
      {particles.map(p => (
        <motion.span
          key={p.id}
          className="infinite-scroll-particle"
          initial={{ y: `${p.y}%`, opacity: 0, rotate: p.rotate }}
          animate={{ y: ['-10%', '110%'], opacity: [0, p.opacity, 0.1], rotate: p.rotate + 60 }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
          style={{
            left: `${p.x}%`,
            fontSize: p.size,
            color: p.color,
            filter: `blur(${p.blur}px)`,
            opacity: p.opacity,
            position: 'absolute',
            pointerEvents: 'none',
            fontFamily: 'monospace',
            textShadow: `0 0 8px ${p.color}99, 0 0 24px ${p.color}33`,
            zIndex: 1,
            userSelect: 'none',
          }}
        >
          {p.glyph}
        </motion.span>
      ))}
    </div>
  );
};

const InfiniteScrollParadox = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const timelineRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Parallax background layers
  const parallaxY = useMotionValue(0);
  const bg1Y = useTransform(parallaxY, [0, 1], [0, -30]);
  const bg2Y = useTransform(parallaxY, [0, 1], [0, -60]);

  // Handle wheel scroll for seamless effect
  const handleWheel = (e) => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (e.deltaY > 0) {
      setScrollIndex((prev) => (prev + 1) % futuristicProjects.length);
    } else {
      setScrollIndex((prev) => (prev - 1 + futuristicProjects.length) % futuristicProjects.length);
    }
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Parallax effect on scroll
  useEffect(() => {
    const onScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const y = window.scrollY || window.pageYOffset;
        parallaxY.set((rect.top + y) / 1000);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [parallaxY]);

  // Get visible cards for seamless loop
  const getVisibleProjects = () => {
    const cards = [];
    for (let i = 0; i < VISIBLE_CARDS; i++) {
      const idx = (scrollIndex + i) % futuristicProjects.length;
      cards.push(futuristicProjects[idx]);
    }
    return cards;
  };

  return (
    <Box className="infinite-scroll-paradox-root" sx={{ py: 6, minHeight: '80vh', background: 'linear-gradient(120deg, #0f2027, #2c5364 80%)', position: 'relative', overflow: 'hidden' }}>
      {/* Particle/glyph background layer */}
      <ParticleLayer />
      {/* Parallax background layers */}
      <motion.div
        className="parallax-bg-layer bg1"
        style={{ y: bg1Y, background: 'radial-gradient(circle at 60% 40%, #00fff733 0%, transparent 80%)', position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
      />
      <motion.div
        className="parallax-bg-layer bg2"
        style={{ y: bg2Y, background: 'radial-gradient(circle at 30% 70%, #ff00c833 0%, transparent 80%)', position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
      />
      <Typography variant="h3" sx={{ mb: 3, color: '#00fff7', fontWeight: 'bold', textAlign: 'center', letterSpacing: 2, textShadow: '0 0 24px #00fff7aa', position: 'relative', zIndex: 2 }}>
        Infinite Scroll Paradox
      </Typography>
      <Typography variant="h6" sx={{ mb: 6, color: '#fff', textAlign: 'center', opacity: 0.8, position: 'relative', zIndex: 2 }}>
        A portfolio timeline that bends reality—scroll to reveal projects through animated portals, with parallax and anime-inspired effects.
      </Typography>
      <Box
        className="infinite-scroll-timeline"
        ref={timelineRef}
        sx={{ maxWidth: 900, mx: 'auto', position: 'relative', zIndex: 2, height: CARD_HEIGHT * VISIBLE_CARDS, overflow: 'hidden' }}
        onWheel={handleWheel}
      >
        {getVisibleProjects().map((proj, idx) => (
          <motion.div
            key={proj.id}
            className="infinite-scroll-project-card"
            initial={{ opacity: 0, scale: 0.8, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: idx * CARD_HEIGHT }}
            exit={{ opacity: 0, scale: 0.8, y: -80 }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
            style={{
              zIndex: VISIBLE_CARDS - idx,
              position: 'absolute',
              width: '100%',
              top: 0,
              left: 0,
              pointerEvents: idx === 2 ? 'auto' : 'none',
            }}
          >
            {/* Portal animation effect */}
            <motion.div
              className="portal-effect"
              initial={{ scale: 0.7, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1, filter: `blur(${Math.abs(idx - 2) * 2}px)` }}
              transition={{ duration: 0.7, type: 'spring' }}
              style={{ background: `radial-gradient(circle at 50% 50%, ${proj.portalColor}99 0%, transparent 80%)` }}
            />
            <Paper elevation={6} sx={{
              p: 3,
              mb: 6,
              borderRadius: 4,
              background: 'rgba(20,30,60,0.95)',
              boxShadow: `0 0 32px 4px ${proj.portalColor}33, 0 2px 24px #000a`,
              border: `2px solid ${proj.portalColor}`,
              position: 'relative',
              overflow: 'hidden',
              minHeight: 180,
              color: '#fff',
              fontFamily: 'Orbitron, monospace',
              transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)',
              filter: idx === 2 ? 'none' : 'blur(1.5px) grayscale(0.5)',
              opacity: idx === 2 ? 1 : 0.7,
              transform: idx === 2 ? 'scale(1.04)' : 'scale(0.96)',
            }}>
              <Typography variant="h5" sx={{ color: proj.portalColor, fontWeight: 'bold', mb: 1, textShadow: `0 0 12px ${proj.portalColor}cc` }}>{proj.title}</Typography>
              <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>{proj.desc}</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                {proj.tech.map(t => (
                  <Box key={t} sx={{ px: 1.5, py: 0.5, borderRadius: 2, fontSize: 13, background: `${proj.portalColor}22`, color: proj.portalColor, fontWeight: 600, letterSpacing: 1, boxShadow: `0 0 8px ${proj.portalColor}44` }}>{t}</Box>
                ))}
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>
      <Typography variant="body2" sx={{ mt: 8, color: '#00fff7', textAlign: 'center', opacity: 0.7, fontFamily: 'Orbitron, monospace', position: 'relative', zIndex: 2 }}>
        <span style={{ fontSize: 22, verticalAlign: 'middle' }}>∞</span> Scroll to see the future unfold <span style={{ fontSize: 22, verticalAlign: 'middle' }}>∞</span>
      </Typography>
    </Box>
  );
};

export default InfiniteScrollParadox; 