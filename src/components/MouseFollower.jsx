import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BRAND_COLORS = [
  '#64ffda', // green
  '#7928ca', // purple
  '#39ff14', // neon green
  '#f7df1e', // yellow
];

const TERMINAL_COMMANDS = [
  'ls', 'cd', 'cat', 'sudo', 'echo', 'pwd', 'whoami', 'touch', 'nano', 'vim',
  'clear', 'exit', 'rm', 'cp', 'mv', 'mkdir', 'rmdir', 'grep', 'chmod', 'chown',
  'curl', 'wget', 'ping', 'top', 'htop', 'ps', 'kill', 'ssh', 'git', 'npm',
  'yarn', 'python', 'node', 'npx', 'code', 'open', 'man', 'history', 'find',
  'df', 'du', 'ifconfig', 'uname', 'date', 'cal', 'tree', 'scp', 'tar', 'zip',
  'unzip', 'alias', 'export', 'env', 'printenv', 'head', 'tail', 'less', 'more',
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const PARTICLE_LIFETIME = 600; // ms
const PARTICLE_COUNT = 1;
const TRAIL_DISTANCE = 32; // px, how far the dot must move before spawning a word

const DOT_SIZE = 32; // px
const DOT_RADIUS = DOT_SIZE / 2;

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const particleId = useRef(0);
  const lastBurstPos = useRef({ x: 0, y: 0 });
  const lastDotPos = useRef({ x: 0, y: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Trailing logic: spawn a word only after the dot has moved a minimum distance
  useEffect(() => {
    const { x, y } = mousePosition;
    const { x: lx, y: ly } = lastBurstPos.current;
    const dx = x - lx;
    const dy = y - ly;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > TRAIL_DISTANCE) {
      // Spawn a word at a random position within the dot's radius
      const now = Date.now();
      const angle = randomBetween(0, 2 * Math.PI);
      const wordDist = randomBetween(0, DOT_RADIUS - 8); // keep inside dot, minus half word size
      const newParticle = {
        id: particleId.current++,
        x: lx,
        y: ly,
        angle,
        dist: wordDist,
        color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
        command: TERMINAL_COMMANDS[Math.floor(Math.random() * TERMINAL_COMMANDS.length)],
        created: now,
      };
      setParticles((prev) => [...prev, newParticle]);
      lastBurstPos.current = { x, y };
    }
  }, [mousePosition]);

  // Remove old particles
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setParticles((prev) => prev.filter((p) => now - p.created < PARTICLE_LIFETIME));
    }, 80);
    return () => clearInterval(interval);
  }, [particles]);

  return (
    <>
      {/* Main glowing cursor dot (bigger, reduced glow) */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #64ffda 50%, #222 100%)',
          boxShadow: '0 0 8px 2px #64ffda33',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'screen',
        }}
        animate={{
          x: mousePosition.x - DOT_RADIUS,
          y: mousePosition.y - DOT_RADIUS,
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 0.7 : 0.1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      />

      {/* Terminal command blip inside the dot */}
      <AnimatePresence>
        {particles.map((p) => {
          // Place the word at a random position within the dot's radius
          const angle = p.angle;
          const dist = p.dist;
          const px = p.x + Math.cos(angle) * dist;
          const py = p.y + Math.sin(angle) * dist;
          return (
            <motion.div
              key={p.id}
              initial={{
                x: px,
                y: py,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: px,
                y: py,
                scale: 1,
                opacity: 0,
                color: p.color,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: PARTICLE_LIFETIME / 1000,
                ease: 'easeOut',
              }}
              style={{
                position: 'fixed',
                fontSize: 13,
                fontFamily: 'Fira Mono, monospace',
                fontWeight: 600,
                color: p.color,
                pointerEvents: 'none',
                zIndex: 9998,
                userSelect: 'none',
                textShadow: '0 1px 2px #111, 0 0 2px #000',
                mixBlendMode: 'screen',
                whiteSpace: 'nowrap',
                opacity: 0.7,
              }}
            >
              {p.command}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </>
  );
};

export default MouseFollower; 