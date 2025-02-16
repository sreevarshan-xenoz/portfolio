import { Box, Container, Typography, Button, useTheme, Grid, IconButton, Tooltip, Chip } from '@mui/material';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const scrollbarHide = {
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(10, 25, 47, 0.1)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(100, 255, 218, 0.3)',
    borderRadius: '4px',
    '&:hover': {
      background: 'rgba(100, 255, 218, 0.5)',
    },
  },
  scrollBehavior: 'smooth',
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const glowAnimation = {
  boxShadow: [
    "0 0 10px rgba(100, 255, 218, 0.2)",
    "0 0 20px rgba(100, 255, 218, 0.4)",
    "0 0 10px rgba(100, 255, 218, 0.2)",
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

function Home() {
  const theme = useTheme();
  const controls = useAnimation();
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    controls.start({
      opacity: [0.1, 0.3, 0.1],
      scale: [1, 1.1, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, [controls]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = '#64ffda';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

        // Particle attraction to mouse
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          this.x += dx * 0.02;
          this.y += dy * 0.02;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
        
        // Draw connections
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 255, 218, ${1 - distance/100})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    init();
    animate();

    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Generate dot positions
  const generateDots = () => {
    const dots = [];
    const colors = [
      { main: '#64ffda', glow: '#64ffda99' },
      { main: '#7928ca', glow: '#7928ca99' },
      { main: '#ff64b4', glow: '#ff64b499' },
      { main: '#64ff8d', glow: '#64ff8d99' },
      { main: '#ff9664', glow: '#ff966499' },
    ];

    for (let i = 0; i < 50; i++) {
      const color = colors[i % colors.length];
      const size = Math.random() * 3 + 2;
      const duration = Math.random() * 3 + 2;

      dots.push(
        <Box
          key={i}
          component={motion.div}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
          sx={{
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle at center, ${color.main}, ${color.main}cc)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 10px ${color.glow}`,
            willChange: 'transform, opacity',
          }}
        />
      );
    }
    return dots;
  };

  // Generate connecting lines
  const generateLines = () => {
    const lines = [];
    for (let i = 0; i < 15; i++) {
      const color = '#64ffda';
      lines.push(
        <Box
          key={`line-${i}`}
          component={motion.div}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            height: ['100px', '150px', '100px'],
          }}
          transition={{
            duration: Math.random() * 3 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
          sx={{
            position: 'absolute',
            width: '1px',
            background: `linear-gradient(to bottom, transparent, ${color}66, transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            willChange: 'transform, opacity',
          }}
        />
      );
    }
    return lines;
  };

  // Add this after the generateLines function
  const generateMeteors = () => {
    const meteors = [];
    const meteorCount = 8;

    for (let i = 0; i < meteorCount; i++) {
      const duration = Math.random() * 1.5 + 1;
      const delay = Math.random() * 4;
      const size = Math.random() * 150 + 100;
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;

      meteors.push(
        <Box
          key={`meteor-${i}`}
          component={motion.div}
          initial={{
            opacity: 0,
            x: `${startX}%`,
            y: `${startY}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            x: [`${startX}%`, `${startX - 100}%`],
            y: [`${startY}%`, `${startY + 100}%`],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: "linear",
          }}
          sx={{
            position: 'absolute',
            width: `${size}px`,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(100, 255, 218, 0), rgba(100, 255, 218, 0.8), rgba(100, 255, 218, 0))',
            transform: 'rotate(-45deg)',
            willChange: 'transform, opacity',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: '#64ffda',
              boxShadow: '0 0 15px #64ffda',
              left: 0,
              top: '-1px',
            },
          }}
        />
      );
    }

    // Add fewer purple meteors
    for (let i = 0; i < meteorCount/2; i++) {
      const duration = Math.random() * 1.5 + 1;
      const delay = Math.random() * 4;
      const size = Math.random() * 150 + 100;
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;

      meteors.push(
        <Box
          key={`meteor-purple-${i}`}
          component={motion.div}
          initial={{
            opacity: 0,
            x: `${startX}%`,
            y: `${startY}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            x: [`${startX}%`, `${startX - 100}%`],
            y: [`${startY}%`, `${startY + 100}%`],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: "linear",
          }}
          sx={{
            position: 'absolute',
            width: `${size}px`,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(121, 40, 202, 0), rgba(121, 40, 202, 0.8), rgba(121, 40, 202, 0))',
            transform: 'rotate(-45deg)',
            willChange: 'transform, opacity',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: '#7928ca',
              boxShadow: '0 0 15px #7928ca',
              left: 0,
              top: '-1px',
            },
          }}
        />
      );
    }

    return meteors;
  };

  // Add this helper function at the top with other animations
  const getRandomPosition = (index, totalCommands) => {
    // Divide the screen into a grid
    const gridSize = Math.ceil(Math.sqrt(totalCommands));
    const cellWidth = 100 / gridSize;
    const cellHeight = 100 / gridSize;

    // Get the grid position for this command
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    // Add some random offset within the cell
    const offsetX = Math.random() * (cellWidth * 0.5);
    const offsetY = Math.random() * (cellHeight * 0.5);

    return {
      x: col * cellWidth + offsetX,
      y: row * cellHeight + offsetY
    };
  };

  // Update the generateCommands function
  const generateCommands = () => {
    const commands = [
      'pacman -Syu',
      'systemctl start',
      'yay -S',
      'sudo nano',
      'neofetch',
      'cd ~/.config',
      'ls -la',
      'git push',
      'vim .bashrc',
      'makepkg -si',
      'journalctl -xe',
      'arch-chroot',
    ];

    return commands.map((command, index) => {
      const position = getRandomPosition(index, commands.length);
      
      return (
        <Box
          key={`command-${index}`}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            y: [0, -15, 0],
            x: [0, index % 2 === 0 ? 10 : -10, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
          sx={{
            position: 'absolute',
            left: `${position.x}%`,
            top: `${position.y}%`,
            color: index % 2 === 0 ? '#64ffdacc' : '#7928cacc',
            fontSize: '1.1rem',
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            zIndex: 10,
            textShadow: index % 2 === 0 
              ? '0 0 10px rgba(100, 255, 218, 0.8)'
              : '0 0 10px rgba(121, 40, 202, 0.8)',
            '&::before': {
              content: '"$"',
              marginRight: '8px',
              color: index % 2 === 0 ? '#64ffdaaa' : '#7928caaa',
            },
            '@keyframes moveRandomly': {
              '0%, 100%': {
                transform: 'translate(0, 0)',
              },
              '25%': {
                transform: 'translate(20px, -20px)',
              },
              '50%': {
                transform: 'translate(-20px, 20px)',
              },
              '75%': {
                transform: 'translate(20px, 20px)',
              },
            },
            animation: 'moveRandomly 20s infinite',
            animationDelay: `${index * -2}s`,
          }}
        >
          {command}
        </Box>
      );
    });
  };

  const ParticleNetwork = () => {
    return (
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
    );
  };

  const SkillShowcase = () => {
    const [activeSkill, setActiveSkill] = useState(null);
    const skills = [
      {
        name: 'Frontend Development',
        icon: '🎨',
        details: ['React', 'Next.js', 'Vue.js', 'CSS/SASS', 'Responsive Design'],
        color: '#64ffda'
      },
      {
        name: 'Backend Development',
        icon: '⚙️',
        details: ['Node.js', 'Express', 'Python', 'RESTful APIs', 'GraphQL'],
        color: '#7928ca'
      },
      {
        name: 'Database Management',
        icon: '🗄️',
        details: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'AWS'],
        color: '#ff64b4'
      },
      {
        name: 'DevOps & Tools',
        icon: '🛠️',
        details: ['Git', 'Docker', 'CI/CD', 'AWS', 'Linux'],
        color: '#64ff8d'
      }
    ];

    return (
      <Box
        component={motion.section}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        sx={{
          minHeight: '70vh',
          py: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 4,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, #64ffda, #7928ca)',
              borderRadius: '2px',
            }
          }}
        >
          Skills & Expertise
        </Typography>

        <Grid container spacing={3} sx={{ maxWidth: '1000px', mx: 'auto' }}>
          {skills.map((skill, index) => (
            <Grid item xs={12} sm={6} md={3} key={skill.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Box
                  onMouseEnter={() => setActiveSkill(skill.name)}
                  onMouseLeave={() => setActiveSkill(null)}
                  sx={{
                    p: 3,
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(10, 25, 47, 0.3)',
                    border: '1px solid',
                    borderColor: activeSkill === skill.name ? skill.color : 'transparent',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      backgroundColor: 'rgba(10, 25, 47, 0.5)',
                      boxShadow: `0 0 20px ${skill.color}33`,
                    }
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 2, fontSize: '2.5rem' }}>
                    {skill.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      color: activeSkill === skill.name ? skill.color : 'primary.main'
                    }}
                  >
                    {skill.name}
                  </Typography>
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: activeSkill === skill.name ? 1 : 0,
                      height: activeSkill === skill.name ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.details.map((detail, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          py: 0.5,
                          opacity: activeSkill === skill.name ? 1 : 0,
                          transform: `translateY(${activeSkill === skill.name ? 0 : '10px'})`,
                          transition: `all 0.3s ease ${i * 0.1}s`,
                        }}
                      >
                        {detail}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const TerminalSection = () => {
    const [commands, setCommands] = useState([
      { text: '$ neofetch', output: 'OS: Arch Linux x86_64\nKernel: 6.1.0-arch1\nShell: zsh 5.9\nWM: Hyprland\nTheme: Nord\nIcons: Papirus' },
      { text: '$ ls projects/', output: 'genesis-ai/  iris-os/  mindmesh/  blockchain-apps/' },
      { text: '$ cat skills.txt', output: 'AI/ML | Cybersecurity | Blockchain | System Development' },
      { text: '$ whoami', output: 'SREE VARSHAN V - Full Stack Developer & AI Enthusiast' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const availableCommands = {
      help: 'Available commands: help, clear, projects, skills, about, contact',
      clear: 'Clearing terminal...',
      projects: 'My Projects:\n• Genesis AI - Advanced AI Assistant\n• Iris OS - Custom Linux Distribution\n• MindMesh - Decentralized Knowledge Network\n• Cross-Chain Manager - Web3 Subscription System',
      skills: 'Technical Skills:\n• Languages: Python, JavaScript, C++, Rust\n• AI/ML: TensorFlow, PyTorch, OpenCV\n• Web3: Solana, Ethereum, Smart Contracts\n• DevOps: Docker, AWS, CI/CD',
      about: 'About Me:\nInnovative developer passionate about AI, cybersecurity, and blockchain.\nCreating solutions that push technological boundaries.',
      contact: 'Contact Info:\nEmail: your.email@example.com\nGitHub: github.com/yourusername\nLinkedIn: linkedin.com/in/yourusername'
    };

    const handleCommand = (cmd) => {
      const trimmedCmd = cmd.trim().toLowerCase();
      let output = '';

      if (trimmedCmd === 'clear') {
        setCommands([]);
        return;
      }

      if (availableCommands[trimmedCmd]) {
        output = availableCommands[trimmedCmd];
      } else if (trimmedCmd) {
        output = `Command not found: ${trimmedCmd}\nType 'help' for available commands.`;
      }

      const newCommand = { text: `$ ${cmd}`, output };
      setCommands(prev => [...prev, newCommand]);
      setCommandHistory(prev => [...prev, cmd]);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleCommand(inputValue);
        setInputValue('');
        setHistoryIndex(-1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[commandHistory.length - 1 - newIndex] || '');
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > -1) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInputValue(newIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - newIndex] || '');
        }
      }
    };

    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          mt: 8,
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(17, 34, 64, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid',
          borderColor: 'primary.main',
          fontFamily: 'monospace',
          maxWidth: '800px',
          mx: 'auto',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '24px',
            background: 'linear-gradient(90deg, #ff5f56, #ffbd2e, #27c93f)',
            backgroundSize: '100px 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '10px center',
            borderBottom: '1px solid rgba(100, 255, 218, 0.1)',
          }
        }}
      >
        <Box sx={{ mt: 3, maxHeight: '400px', overflowY: 'auto' }}>
          {commands.map((cmd, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#64ffda',
                  mb: 1,
                  mt: index === 0 ? 0 : 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  '&::before': {
                    content: '"→"',
                    color: '#7928ca',
                  }
                }}
              >
                {cmd.text}
              </Typography>
              {cmd.output && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    whiteSpace: 'pre-line',
                    pl: 3,
                    fontFamily: 'monospace',
                  }}
                >
                  {cmd.output}
                </Typography>
              )}
            </motion.div>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mt: 2,
            borderTop: '1px solid rgba(100, 255, 218, 0.1)',
            pt: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#7928ca',
            }}
          >
            →
          </Typography>
          <Box
            component="input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              background: 'transparent',
              border: 'none',
              color: '#64ffda',
              fontFamily: 'monospace',
              fontSize: '14px',
              width: '100%',
              outline: 'none',
              '&::placeholder': {
                color: 'rgba(100, 255, 218, 0.5)',
              }
            }}
            placeholder="Type 'help' for available commands..."
          />
        </Box>
      </Box>
    );
  };

  const TechCube = () => {
    const faces = [
      { bg: '#64ffda', content: 'React' },
      { bg: '#7928ca', content: 'Node.js' },
      { bg: '#ff64b4', content: 'Python' },
      { bg: '#64ff8d', content: 'AI/ML' },
      { bg: '#ff9664', content: 'Blockchain' },
      { bg: '#64b4ff', content: 'DevOps' },
    ];

    return (
      <Box
        sx={{
          perspective: '1000px',
          width: '200px',
          height: '200px',
          position: 'relative',
          mx: 'auto',
          mt: 8,
          transform: 'scale(0.8)',
          '&:hover .cube': {
            animation: 'none',
            transform: 'rotateX(-25deg) rotateY(45deg)',
          },
        }}
      >
        <Box
          className="cube"
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            animation: 'rotate 20s infinite linear',
            '@keyframes rotate': {
              '0%': {
                transform: 'rotateX(0deg) rotateY(0deg)',
              },
              '100%': {
                transform: 'rotateX(360deg) rotateY(360deg)',
              },
            },
          }}
        >
          {faces.map((face, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `${face.bg}22`,
                border: `2px solid ${face.bg}`,
                backdropFilter: 'blur(8px)',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: face.bg,
                textShadow: `0 0 10px ${face.bg}66`,
                transform: [
                  'rotateX(0deg) translateZ(100px)',
                  'rotateX(180deg) translateZ(100px)',
                  'rotateY(90deg) translateZ(100px)',
                  'rotateY(-90deg) translateZ(100px)',
                  'rotateX(90deg) translateZ(100px)',
                  'rotateX(-90deg) translateZ(100px)',
                ][index],
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: `${face.bg}44`,
                  transform: `${[
                    'rotateX(0deg) translateZ(120px)',
                    'rotateX(180deg) translateZ(120px)',
                    'rotateY(90deg) translateZ(120px)',
                    'rotateY(-90deg) translateZ(120px)',
                    'rotateX(90deg) translateZ(120px)',
                    'rotateX(-90deg) translateZ(120px)',
                  ][index]}`,
                },
              }}
            >
              {face.content}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        textAlign: 'center',
        minHeight: '100vh',
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        pt: { xs: 8, sm: 9 },
        overflowX: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Background Pattern Container */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: -1,
          opacity: 0.8,
          perspective: 1000,
          transformStyle: 'preserve-3d',
          pointerEvents: 'none',
        }}
      >
        <ParticleNetwork />
        {generateMeteors()}
        {generateLines()}
        {generateDots()}
        <Box
          component={motion.div}
          animate={{
            background: [
              'rgba(10, 25, 47, 0.85)',
              'rgba(10, 25, 47, 0.8)',
              'rgba(10, 25, 47, 0.85)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(60px)',
            background: 'rgba(10, 25, 47, 0.75)',
            willChange: 'background',
          }}
        />
        {generateCommands()}
      </Box>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        style={{
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div
            animate={controls}
            style={{
              position: 'absolute',
              right: '-20%',
              top: '20%',
              fontSize: '20rem',
              fontWeight: 'bold',
              color: 'rgba(100, 255, 218, 0.03)',
              zIndex: -1,
              userSelect: 'none',
              filter: 'blur(2px)',
            }}
          >
            &lt;/&gt;
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ x: 5 }}
            style={{
              willChange: 'transform',
            }}
          >
            <Typography
              variant="h6"
              component="h1"
              sx={{ 
                color: 'primary.main', 
                mb: 2,
                cursor: 'default',
                display: 'inline-block',
                position: 'relative',
                '&::before': {
                  content: '"<"',
                  color: 'primary.main',
                  opacity: 0.5,
                  position: 'absolute',
                  left: '-20px',
                  transition: 'all 0.3s ease',
                },
                '&::after': {
                  content: '"/>"',
                  color: 'primary.main',
                  opacity: 0.5,
                  position: 'absolute',
                  right: '-30px',
                  transition: 'all 0.3s ease',
                },
                '&:hover::before': {
                  left: '-25px',
                  opacity: 1,
                },
                '&:hover::after': {
                  right: '-35px',
                  opacity: 1,
                },
              }}
            >
              Hi, my name is
            </Typography>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            style={{ width: '100%', position: 'relative' }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                cursor: 'default',
                background: 'linear-gradient(45deg, #64ffda 30%, #7928ca 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                filter: 'drop-shadow(0 0 10px rgba(100, 255, 218, 0.2))',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '0%',
                  height: '4px',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(90deg, #64ffda, #7928ca)',
                  transition: 'width 0.4s ease',
                  borderRadius: '2px',
                },
                '&:hover::after': {
                  width: '100%',
                },
              }}
            >
              SREE VARSHAN V
            </Typography>
            <motion.div
              animate={floatingAnimation}
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                fontSize: '1.5rem',
                color: '#64ffda',
                opacity: 0.5,
              }}
            >
              ✨
            </motion.div>
            <motion.div
              animate={floatingAnimation}
              transition={{ delay: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '-10px',
                left: '-10px',
                fontSize: '1.5rem',
                color: '#7928ca',
                opacity: 0.5,
              }}
            >
              ⚡
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5 }}
            style={{ width: '100%' }}
          >
            <Typography
              variant="h3"
              component="h3"
              sx={{
                color: 'text.secondary',
                mb: 4,
                cursor: 'default',
                transition: 'color 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(45deg, #64ffda 30%, #7928ca 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                },
              }}
            >
              I build things for the web.
            </Typography>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ x: 10 }}
            style={{ maxWidth: '600px', width: '100%' }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 4,
                position: 'relative',
                borderLeft: '2px solid',
                borderRight: '2px solid',
                borderColor: 'primary.main',
                transition: 'all 0.3s ease',
                borderRadius: '4px',
                padding: '1.5rem',
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(10, 25, 47, 0.2)',
                textAlign: 'center',
                '&:hover': {
                  borderColor: 'secondary.main',
                  backgroundColor: 'rgba(10, 25, 47, 0.4)',
                  transform: 'scale(1.02)',
                },
              }}
            >
              I'm a software developer specializing in building exceptional digital experiences.
              Currently, I'm focused on building accessible, human-centered products.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              component={Link}
              to="/projects"
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1.1rem',
                py: 1.5,
                px: 4,
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid',
                transition: 'all 0.3s ease',
                background: 'rgba(100, 255, 218, 0.05)',
                backdropFilter: 'blur(5px)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, #64ffda1a, #7928ca1a)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.4s ease',
                },
                '&:hover': {
                  borderColor: 'secondary.main',
                  boxShadow: '0 0 20px rgba(100, 255, 218, 0.2)',
                  letterSpacing: '1px',
                },
                '&:hover::before': {
                  transform: 'translateX(0)',
                },
              }}
            >
              Check out my work
            </Button>
          </motion.div>
        </Box>

        {/* About Section */}
        <Box
          component={motion.section}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          sx={{
            minHeight: '100vh',
            py: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 4,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #64ffda, #7928ca)',
                borderRadius: '2px',
              }
            }}
          >
            About Me
          </Typography>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    textAlign: 'left',
                    mb: 2,
                    p: 2,
                    borderRadius: '8px',
                    backdropFilter: 'blur(5px)',
                    backgroundColor: 'rgba(10, 25, 47, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(10, 25, 47, 0.4)',
                    }
                  }}
                >
                  Hello! I'm a passionate software developer with a keen interest in building exceptional digital experiences. 
                  My journey in web development started with a curiosity about how things work on the internet, 
                  and that curiosity has driven me to continuously learn and grow in this ever-evolving field.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    textAlign: 'left',
                    p: 2,
                    borderRadius: '8px',
                    backdropFilter: 'blur(5px)',
                    backgroundColor: 'rgba(10, 25, 47, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(10, 25, 47, 0.4)',
                    }
                  }}
                >
                  I specialize in building modern web applications using cutting-edge technologies. 
                  My focus is on creating responsive, accessible, and user-friendly interfaces 
                  that provide exceptional user experiences.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Box
                  sx={{
                    p: 3,
                    borderRadius: '8px',
                    backdropFilter: 'blur(5px)',
                    backgroundColor: 'rgba(10, 25, 47, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(10, 25, 47, 0.4)',
                    }
                  }}
                >
                  <Typography variant="h6" color="primary.main" sx={{ mb: 2 }}>
                    Technologies I work with:
                  </Typography>
                  <Grid container spacing={2}>
                    {['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'Material-UI'].map((tech, index) => (
                      <Grid item xs={6} key={tech}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Tooltip title={`${tech} Projects`}>
                            <Box
                              component={motion.div}
                              whileHover={{
                                scale: 1.05,
                                y: -5,
                                boxShadow: `0 10px 20px -10px ${theme.palette.primary.main}`,
                              }}
                              sx={{
                                color: 'text.secondary',
                                p: 1,
                                borderRadius: '4px',
                                border: '1px solid',
                                borderColor: 'primary.main',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  background: 'linear-gradient(45deg, #64ffda1a, #7928ca1a)',
                                  transform: 'translateX(-100%)',
                                  transition: 'transform 0.4s ease',
                                },
                                '&:hover::before': {
                                  transform: 'translateX(0)',
                                }
                              }}
                            >
                              <Typography variant="body2">
                                {tech}
                              </Typography>
                            </Box>
                          </Tooltip>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Skills Progress Section */}
        <Box
          component={motion.section}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          sx={{
            py: 8,
            width: '100%',
            maxWidth: '1000px',
            mx: 'auto',
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 6,
              textAlign: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #64ffda, #7928ca)',
                borderRadius: '2px',
              }
            }}
          >
            Technical Proficiency
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {[
                { skill: 'Frontend Development', level: 90, color: '#64ffda' },
                { skill: 'Backend Development', level: 85, color: '#7928ca' },
                { skill: 'UI/UX Design', level: 80, color: '#ff64b4' },
                { skill: 'Database Management', level: 85, color: '#64ff8d' },
              ].map((item, index) => (
                <Box key={item.skill} sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography color="text.secondary">{item.skill}</Typography>
                    <Typography color={item.color}>{item.level}%</Typography>
                  </Box>
                  <Box
                    sx={{
                      height: '6px',
                      background: 'rgba(10, 25, 47, 0.4)',
                      borderRadius: '3px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${item.color}, ${item.color}99)`,
                        borderRadius: '3px',
                        position: 'absolute',
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Grid>

            <Grid item xs={12} md={6}>
              {[
                { skill: 'React & Next.js', level: 95, color: '#64ffda' },
                { skill: 'Node.js & Express', level: 88, color: '#7928ca' },
                { skill: 'TypeScript', level: 85, color: '#ff64b4' },
                { skill: 'DevOps & CI/CD', level: 82, color: '#64ff8d' },
              ].map((item, index) => (
                <Box key={item.skill} sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography color="text.secondary">{item.skill}</Typography>
                    <Typography color={item.color}>{item.level}%</Typography>
                  </Box>
                  <Box
                    sx={{
                      height: '6px',
                      background: 'rgba(10, 25, 47, 0.4)',
                      borderRadius: '3px',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '3px',
                      }
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${item.color}, ${item.color}99)`,
                        borderRadius: '3px',
                        position: 'absolute',
                        boxShadow: `0 0 10px ${item.color}66`,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>

          {/* Additional Skills */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h6" color="primary.main" sx={{ mb: 3, textAlign: 'center' }}>
              Additional Technologies & Tools
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
              }}
            >
              {[
                'Git', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 
                'GraphQL', 'Redux', 'Webpack', 'Jest', 'Cypress',
                'Sass', 'Tailwind', 'Firebase', 'Linux', 'Nginx'
              ].map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Chip
                    label={tool}
                    sx={{
                      bgcolor: 'rgba(10, 25, 47, 0.4)',
                      color: 'text.secondary',
                      border: '1px solid',
                      borderColor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'rgba(100, 255, 218, 0.1)',
                        borderColor: 'secondary.main',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  />
                </motion.div>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Replace Experience Section with Featured Projects */}
        <Box
          component={motion.section}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          sx={{
            minHeight: '100vh',
            py: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 4,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #64ffda, #7928ca)',
                borderRadius: '2px',
              }
            }}
          >
            Featured Projects
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: "Agoric AI",
                description: "An innovative hackathon project combining AI with Agoric's secure smart contract framework to enable trustless AI-based decision-making in Web3 applications.",
                tech: ["React", "Node.js", "Agoric SDK", "AI/ML"],
                image: "agoric-ai.png",
                color: '#64ffda'
              },
              {
                title: "Portfolio Website",
                description: "A modern, responsive portfolio website built with React and Material-UI, featuring smooth animations and interactive elements.",
                tech: ["React", "Material-UI", "Framer Motion", "Vite"],
                image: "portfolio.png",
                color: '#7928ca'
              }
            ].map((project, index) => (
              <Grid item xs={12} key={index}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      backgroundColor: 'rgba(10, 25, 47, 0.2)',
                      border: '1px solid',
                      borderColor: 'transparent',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: 3,
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        backgroundColor: 'rgba(10, 25, 47, 0.4)',
                        borderColor: project.color,
                        transform: 'translateY(-5px)',
                        boxShadow: `0 10px 30px -15px ${project.color}33`,
                        '& .project-overlay': {
                          opacity: 1,
                        }
                      }
                    }}
                  >
                    {/* Add interactive overlay */}
                    <motion.div
                      className="project-overlay"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(45deg, ${project.color}22, transparent)`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 2,
                        zIndex: 2,
                      }}
                    >
                      <Tooltip title="View Demo">
                        <IconButton
                          component={motion.button}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          sx={{
                            color: project.color,
                            border: `2px solid ${project.color}`,
                            backdropFilter: 'blur(5px)',
                            '&:hover': {
                              background: `${project.color}22`,
                            }
                          }}
                        >
                          🔗
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View Code">
                        <IconButton
                          component={motion.button}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          sx={{
                            color: project.color,
                            border: `2px solid ${project.color}`,
                            backdropFilter: 'blur(5px)',
                            '&:hover': {
                              background: `${project.color}22`,
                            }
                          }}
                        >
                          <span style={{ fontSize: '1.2rem' }}>{'</>'}</span>
                        </IconButton>
                      </Tooltip>
                    </motion.div>
                    <Box
                      sx={{
                        flex: 1,
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'rgba(100, 255, 218, 0.1)',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(45deg, ${project.color}33, transparent)`,
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },
                        '&:hover::before': {
                          opacity: 1,
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={project.image}
                        alt={project.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'grayscale(100%)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            filter: 'grayscale(0%)',
                            transform: 'scale(1.05)',
                          }
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'left' }}>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2,
                          color: project.color,
                          fontWeight: 'bold',
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                      >
                        {project.description}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1,
                          mb: 3,
                        }}
                      >
                        {project.tech.map((tech, i) => (
                          <Typography
                            key={i}
                            variant="caption"
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              borderRadius: '4px',
                              border: '1px solid',
                              borderColor: project.color,
                              color: project.color,
                              fontSize: '0.75rem',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: `${project.color}22`,
                              }
                            }}
                          >
                            {tech}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginTop: '2rem' }}
          >
            <Button
              component={Link}
              to="/projects"
              variant="outlined"
              color="primary"
              size="large"
              endIcon={<motion.span whileHover={{ x: 5 }}>→</motion.span>}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1.1rem',
                py: 1.5,
                px: 4,
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid',
                transition: 'all 0.3s ease',
                background: 'rgba(100, 255, 218, 0.05)',
                backdropFilter: 'blur(5px)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, #64ffda1a, #7928ca1a)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.4s ease',
                },
                '&:hover': {
                  borderColor: 'secondary.main',
                  boxShadow: '0 0 20px rgba(100, 255, 218, 0.2)',
                  letterSpacing: '1px',
                },
                '&:hover::before': {
                  transform: 'translateX(0)',
                },
              }}
            >
              View More Projects
            </Button>
          </motion.div>
        </Box>

        {/* Terminal Section */}
        <TerminalSection />

        {/* Tech Stack Cube */}
        <TechCube />

        {/* Skills Showcase */}
        <SkillShowcase />

        {/* Contact Section */}
        <Box
          component="section"
          sx={{
            minHeight: '60vh',
            py: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            position: 'relative',
          }}
        >
          {/* Section Title */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 2,
              position: 'relative',
              textAlign: 'center',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #64ffda, #7928ca)',
                borderRadius: '2px',
              }
            }}
          >
            Get In Touch
          </Typography>

          {/* Contact Card */}
          <Box
            sx={{
              maxWidth: '600px',
              width: '100%',
              textAlign: 'center',
              p: 6,
              borderRadius: '16px',
              background: 'rgba(10, 25, 47, 0.95)',
              border: '1px solid',
              borderColor: 'primary.main',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                transform: 'translateY(-5px)',
                borderColor: 'secondary.main',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
              }
            }}
          >
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
              I'll try my best to get back to you!
            </Typography>

            {/* Contact Button */}
            <Button
              variant="contained"
              size="large"
              href="mailto:your.email@example.com"
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '1.2rem',
                py: 2,
                px: 6,
                background: 'linear-gradient(45deg, #64ffda, #7928ca)',
                color: '#0a192f',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  background: 'linear-gradient(45deg, #7928ca, #64ffda)',
                  boxShadow: '0 6px 20px rgba(100, 255, 218, 0.3)',
                }
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
              }}>
                <Box
                  component="span"
                  sx={{
                    fontSize: '1.4rem',
                    animation: 'wave 1.5s ease-in-out infinite',
                    '@keyframes wave': {
                      '0%, 100%': {
                        transform: 'rotate(-10deg)',
                      },
                      '50%': {
                        transform: 'rotate(10deg)',
                      },
                    },
                  }}
                >
                  👋
                </Box>
                <span>Say Hello</span>
              </Box>
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
}

export default Home; 