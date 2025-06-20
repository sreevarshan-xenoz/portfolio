import React, { useState, useRef } from 'react';
import { Box, Typography, Paper, Grid, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';

// Example entangled project pairs
const entangledPairs = [
  [
    {
      id: 'q1a',
      title: 'Qubit Visualizer',
      desc: 'Visualize quantum states and superpositions in real time.',
      color: '#00fff7',
      twinId: 'q1b',
    },
    {
      id: 'q1b',
      title: 'Entanglement Explorer',
      desc: 'Explore the mysteries of quantum entanglement with interactive demos.',
      color: '#ff00c8',
      twinId: 'q1a',
    },
  ],
  [
    {
      id: 'q2a',
      title: 'Wave Collapse Simulator',
      desc: 'Collapse the wave function and reveal hidden project states.',
      color: '#39ff14',
      twinId: 'q2b',
    },
    {
      id: 'q2b',
      title: 'Particle/Wave Duality',
      desc: 'Switch between particle and wave views of your portfolio.',
      color: '#ffec00',
      twinId: 'q2a',
    },
  ],
  [
    {
      id: 'q3a',
      title: 'Quantum Code Editor',
      desc: 'Edit code that exists in multiple states until observed.',
      color: '#a18cd1',
      twinId: 'q3b',
    },
    {
      id: 'q3b',
      title: 'Superposition Sandbox',
      desc: 'Projects exist in all possible forms—until you choose one.',
      color: '#64ffda',
      twinId: 'q3a',
    },
  ],
];

// Quantum particle background (with more organic movement)
const QUANTUM_PARTICLES = 24;
const QuantumParticleLayer = () => (
  <div className="quantum-particle-layer">
    {Array.from({ length: QUANTUM_PARTICLES }).map((_, i) => {
      const duration = 8 + Math.random() * 10;
      const delay = Math.random() * 4;
      const x1 = Math.random() * 100;
      const y1 = Math.random() * 100;
      const x2 = Math.random() * 100;
      const y2 = Math.random() * 100;
      return (
        <motion.span
          key={i}
          className="quantum-particle"
          initial={{ x: `${x1}%`, y: `${y1}%`, opacity: 0 }}
          animate={{
            x: [`${x1}%`, `${x2}%`, `${x1}%`],
            y: [`${y1}%`, `${y2}%`, `${y1}%`],
            opacity: [0.18, 0.32, 0.18],
          }}
          transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontSize: 16 + Math.random() * 18,
            color: ['#00fff7', '#ff00c8', '#39ff14', '#ffec00', '#a18cd1', '#64ffda'][i % 6],
            filter: 'blur(1px)',
            left: 0, top: 0, position: 'absolute', pointerEvents: 'none',
            userSelect: 'none', fontFamily: 'monospace',
            zIndex: 1,
          }}
        >
          {['ψ', 'Φ', 'λ', 'Ω', 'Σ', 'Δ', '∑', 'π', 'μ', 'ν'][i % 10]}
        </motion.span>
      );
    })}
  </div>
);

// Entanglement lines SVG (interactive)
const EntanglementLines = ({ pairs, activePairIdx }) => (
  <svg className="entanglement-lines-svg" width="100%" height="100%" style={{ position: 'absolute', left: 0, top: 0, zIndex: 2, pointerEvents: 'none' }}>
    {pairs.map((pair, idx) => (
      <line
        key={idx}
        x1="25%" x2="75%"
        y1={`${18 + idx * 32}%`} y2={`${18 + idx * 32}%`}
        stroke={pair[0].color}
        strokeWidth={activePairIdx === idx ? 10 : 4}
        opacity={activePairIdx === idx ? 1 : 0.7}
        className={activePairIdx === idx ? 'entanglement-line entanglement-line-active' : 'entanglement-line'}
      />
    ))}
  </svg>
);

const QuantumEntangledPortfolio = () => {
  const [entangledState, setEntangledState] = useState({});
  const [shimmered, setShimmered] = useState({});
  const [activePairIdx, setActivePairIdx] = useState(null);
  const [activeTwinId, setActiveTwinId] = useState(null);
  const gridRef = useRef(null);

  // Handler: when a project is hovered/clicked, update its twin and trigger shimmer
  const handleEntangle = (pairIdx, projIdx) => {
    setEntangledState(prev => {
      const twinIdx = projIdx === 0 ? 1 : 0;
      const pair = entangledPairs[pairIdx];
      const twin = pair[twinIdx];
      const proj = pair[projIdx];
      return {
        ...prev,
        [twin.id]: {
          color: proj.color,
          desc: `Entangled: ${proj.title}`,
        },
      };
    });
    setShimmered(prev => ({ ...prev, [entangledPairs[pairIdx][projIdx].id]: true }));
    setTimeout(() => setShimmered(prev => ({ ...prev, [entangledPairs[pairIdx][projIdx].id]: false })), 700);
    setActivePairIdx(pairIdx);
    setActiveTwinId(entangledPairs[pairIdx][projIdx].twinId);
  };

  // Handler: clear highlight on mouse leave
  const handleMouseLeave = () => {
    setActivePairIdx(null);
    setActiveTwinId(null);
  };

  return (
    <Box sx={{ py: 6, minHeight: '80vh', background: 'linear-gradient(120deg, #0f2027, #2c5364 80%)', position: 'relative', overflow: 'hidden' }}>
      <QuantumParticleLayer />
      <EntanglementLines pairs={entangledPairs} activePairIdx={activePairIdx} />
      <Typography variant="h3" sx={{ mb: 3, color: '#00fff7', fontWeight: 'bold', textAlign: 'center', letterSpacing: 2, textShadow: '0 0 24px #00fff7aa', position: 'relative', zIndex: 3 }}>
        Quantum Entanglement Portfolio
      </Typography>
      <Typography variant="h6" sx={{ mb: 6, color: '#fff', textAlign: 'center', opacity: 0.8, position: 'relative', zIndex: 3 }}>
        Projects are linked in pairs — viewing one alters the presentation of its twin. Interact to see quantum entanglement in action!
      </Typography>
      <Grid container spacing={6} justifyContent="center" sx={{ position: 'relative', zIndex: 3 }} ref={gridRef}>
        {entangledPairs.map((pair, pairIdx) => (
          <Grid item xs={12} md={10} key={pairIdx} sx={{ position: 'relative' }}>
            <Grid container spacing={4} justifyContent="center">
              {pair.map((proj, projIdx) => {
                const twinState = entangledState[proj.id] || {};
                const isTwinHighlighted = activeTwinId === proj.id;
                const twinName = pair[projIdx === 0 ? 1 : 0].title;
                return (
                  <Grid item xs={12} sm={6} key={proj.id} sx={{ position: 'relative' }}>
                    <Tooltip title={`Entangled with: ${twinName}`} arrow placement="top">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 60 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover={{
                          scale: 1.08,
                          boxShadow: `0 0 32px 12px ${twinState.color || proj.color}cc`,
                          rotateY: 8,
                          y: -8,
                        }}
                        onHoverStart={() => handleEntangle(pairIdx, projIdx)}
                        onHoverEnd={handleMouseLeave}
                        onClick={() => handleEntangle(pairIdx, projIdx)}
                        style={{ cursor: 'pointer', position: 'relative', perspective: 800 }}
                      >
                        <Paper elevation={6} sx={{
                          p: 4,
                          borderRadius: 4,
                          background: 'rgba(20,30,60,0.95)',
                          boxShadow: `0 0 32px 4px ${(twinState.color || proj.color)}33, 0 2px 24px #000a` + (isTwinHighlighted ? `, 0 0 32px 8px ${twinState.color || proj.color}` : ''),
                          border: `2px solid ${twinState.color || proj.color}`,
                          color: '#fff',
                          fontFamily: 'Orbitron, monospace',
                          minHeight: 180,
                          position: 'relative',
                          transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                          overflow: 'hidden',
                          outline: isTwinHighlighted ? `3px solid ${twinState.color || proj.color}` : 'none',
                          outlineOffset: isTwinHighlighted ? '2px' : '0',
                        }}>
                          {/* Quantum shimmer/collapse effect */}
                          {shimmered[proj.id] && <div className="quantum-shimmer" />}
                          {/* Quantum ripple effect on hover */}
                          <span className="quantum-ripple" />
                          <Typography variant="h5" sx={{ color: twinState.color || proj.color, fontWeight: 'bold', mb: 1, textShadow: `0 0 12px ${(twinState.color || proj.color)}cc` }}>{proj.title}</Typography>
                          <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>{twinState.desc || proj.desc}</Typography>
                        </Paper>
                      </motion.div>
                    </Tooltip>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuantumEntangledPortfolio; 