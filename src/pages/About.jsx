import { useState, useEffect, useRef } from 'react';
import { Container, Box, Typography, Grid, Paper } from '@mui/material';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

// Import our new components
import SkillsVisualization from '../components/SkillsVisualization';
import InteractiveTimeline from '../components/InteractiveTimeline';

const About = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringTimeline, setIsHoveringTimeline] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  const canvasRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

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

        // Removing mouse attraction behavior
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
  }, []);

  const handleMouseMove = (e) => {
    // Simplified - no longer needed for particle effect
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  // 3D Card Effect
  const handleCardMouseMove = (e, cardId) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const cards = [
    {
      id: 'skills',
      title: 'Technical Expertise',
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      content: [
        'Ethical Hacking & Cybersecurity',
        'AI Development & Machine Learning',
        'Advanced Python Programming',
        'Operating System Architecture',
        'Real-time AI Interaction Design'
      ],
      color: '#64ffda'
    },
    {
      id: 'education',
      title: 'Current Focus',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      content: [
        'Advanced Python Development',
        'Operating System Architecture',
        'AI Interaction Systems',
        'Network Security',
        'Immersive Tech Design'
      ],
      color: '#7928ca'
    },
    {
      id: 'projects',
      title: 'Areas of Interest',
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      content: [
        'AI-Powered Systems',
        'Cybersecurity Tools',
        'Futuristic UI/UX Design',
        'Open Source Projects',
        'Hacker Setup Optimization'
      ],
      color: '#ff64b4'
    },
    {
      id: 'interests',
      title: 'Professional Goals',
      icon: <EmojiObjectsIcon sx={{ fontSize: 40 }} />,
      content: [
        'Innovating in AI Development',
        'Advancing Cybersecurity',
        'Creating Immersive Experiences',
        'Contributing to Open Source',
        'Building Secure Systems'
      ],
      color: '#64ff8d'
    }
  ];

  const timelineEvents = [
    { year: '2023', event: 'Started Advanced Python Development', icon: '🐍', color: '#64ffda' },
    { year: '2023', event: 'Exploring OS Architecture', icon: '💻', color: '#7928ca' },
    { year: '2024', event: 'AI Interaction Design Projects', icon: '🤖', color: '#ff64b4' },
    { year: '2024', event: 'Ethical Hacking Initiatives', icon: '🔒', color: '#64ff8d' },
    { year: '2024', event: 'Open Source Contributions', icon: '🌟', color: '#64ffda' },
  ];

  const timelineVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  const timelineIconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: "spring", stiffness: 500, damping: 30 } },
    hover: { scale: 1.2, rotate: 360, transition: { duration: 0.5 } }
  };

  // The ParticleNetwork component replaces the old ParticleEffect
  const ParticleNetwork = () => {
    return (
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
    );
  };

  // Update the background gradient to use a smoother, slower animation
  const BackgroundGradient = ({ mousePosition }) => (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(
          circle at ${mousePosition.x}px ${mousePosition.y}px,
          rgba(100, 255, 218, 0.1) 0%,
          rgba(10, 25, 47, 0.9) 70%
        )`,
        transition: 'background 0.8s ease', // Slower transition
        zIndex: -1,
        willChange: 'background',
      }}
    />
  );

  return (
    <Container 
      maxWidth={false}
      onMouseMove={handleMouseMove}
      sx={{ 
        minHeight: '100vh',
        pt: 15,
        pb: 8,
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '1400px',
      }}
    >
      <ParticleNetwork />
      <BackgroundGradient mousePosition={mousePosition} />

      {/* Animated Background Gradient */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography 
          variant="h2" 
          component="h1"
          sx={{ 
            mb: 4,
            background: 'linear-gradient(45deg, #64ffda 30%, #7928ca 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            fontWeight: 'bold',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '150px',
              height: '4px',
              background: 'linear-gradient(90deg, #64ffda, #7928ca)',
              borderRadius: '2px',
            }
          }}
        >
          About Me
        </Typography>

        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h5" 
            component="p" 
            align="center"
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              color: 'text.secondary',
              lineHeight: 1.6,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              position: 'relative',
              mb: 3,
            }}
          >
            I'm a developer with a passion for building innovative solutions at the intersection of 
            <Typography 
              component="span" 
              sx={{ 
                color: '#64ffda', 
                fontWeight: 'bold', 
                fontStyle: 'italic',
                display: 'inline-block'
              }}
            > AI </Typography>
            and 
            <Typography 
              component="span" 
              sx={{ 
                color: '#7928ca', 
                fontWeight: 'bold', 
                fontStyle: 'italic',
                display: 'inline-block'
              }}
            > security</Typography>. 
            My approach combines technical expertise with creative problem-solving, always seeking the perfect balance of functionality, performance, and user experience.
          </Typography>
        </Box>

        {/* Info Cards */}
        <Box ref={ref} sx={{ mb: 10 }}>
          <Grid container spacing={3}>
            {cards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={card.id}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                      }
                    }
                  }}
                  initial="hidden"
                  animate={controls}
                >
                  <Paper
                    elevation={0}
                    onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                    onMouseMove={(e) => handleCardMouseMove(e, card.id)}
                    onMouseLeave={handleCardMouseLeave}
                    sx={{
                      p: 3,
                      height: '100%',
                      backgroundColor: 'rgba(17, 34, 64, 0.7)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '8px',
                      boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(100, 255, 218, 0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      position: 'relative',
                      '&:hover': {
                        boxShadow: '0 20px 30px -15px rgba(0, 0, 0, 0.7)',
                        '&::before': {
                          opacity: 0.2,
                        }
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg, ${card.color}33 0%, transparent 100%)`,
                        opacity: 0.1,
                        transition: 'opacity 0.3s ease',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: card.color,
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: '-5px',
                            left: 0,
                            width: '40px',
                            height: '2px',
                            backgroundColor: card.color,
                            transition: 'width 0.3s ease',
                          },
                          '&:hover::after': {
                            width: '100%',
                          }
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Box 
                        sx={{ 
                          color: card.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(10, 25, 47, 0.7)',
                          boxShadow: `0 0 10px ${card.color}66`,
                        }}
                      >
                        {card.icon}
                      </Box>
                    </Box>
                    <AnimatePresence>
                      {selectedCard === card.id ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Box sx={{ mb: 2 }}>
                            {card.content.map((item, i) => (
                              <Box 
                                key={i} 
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'flex-start',
                                  mb: 1.5 
                                }}
                              >
                                <Box 
                                  component={motion.div}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                  sx={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: card.color,
                                    borderRadius: '50%',
                                    mr: 1.5,
                                    mt: 1
                                  }}
                                />
                                <Typography 
                                  variant="body2" 
                                  component={motion.p}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 + 0.1 }}
                                >
                                  {item}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            Click to explore my {card.title.toLowerCase()}
                          </Typography>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Skills Visualization Component */}
        <SkillsVisualization />

        {/* Interactive Timeline Component */}
        <InteractiveTimeline />

      </motion.div>
    </Container>
  );
};

export default About;