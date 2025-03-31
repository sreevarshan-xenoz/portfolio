import { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Paper } from '@mui/material';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const About = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringTimeline, setIsHoveringTimeline] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
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
      title: 'Technical Skills',
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      content: [
        'Web Development (React, Node.js)',
        'Programming (Python, JavaScript)',
        'Database Management',
        'UI/UX Design',
        'Version Control (Git)'
      ],
      color: '#64ffda'
    },
    {
      id: 'education',
      title: 'Academic Journey',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      content: [
        'Computer Science Student',
        'Data Structures & Algorithms',
        'Web Development Courses',
        'Online Certifications',
        'Academic Projects'
      ],
      color: '#7928ca'
    },
    {
      id: 'projects',
      title: 'Project Portfolio',
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      content: [
        'Personal Portfolio Website',
        'E-commerce Platform',
        'Social Media Dashboard',
        'Weather App',
        'Task Management System'
      ],
      color: '#ff64b4'
    },
    {
      id: 'interests',
      title: 'Learning Goals',
      icon: <EmojiObjectsIcon sx={{ fontSize: 40 }} />,
      content: [
        'Advanced Frontend Development',
        'Backend Architecture',
        'Cloud Computing',
        'Mobile App Development',
        'Open Source Contribution'
      ],
      color: '#64ff8d'
    }
  ];

  const timelineEvents = [
    { year: '2023', event: 'Started Learning Web Development', icon: '🚀', color: '#64ffda' },
    { year: '2023', event: 'First React Project Completion', icon: '⚛️', color: '#7928ca' },
    { year: '2024', event: 'Portfolio Website Launch', icon: '🎨', color: '#ff64b4' },
    { year: '2024', event: 'Hackathon Participation', icon: '💻', color: '#64ff8d' },
    { year: '2024', event: 'Learning Advanced Development', icon: '🎯', color: '#64ffda' },
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

  // Enhanced floating particles effect
  const ParticleEffect = () => {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 6 + 2;
          const colors = ['#64ffda', '#7928ca', '#ff64b4', '#64ff8d'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                willChange: 'transform',
                filter: 'blur(1px)',
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0, 0.6, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.5, 1],
              }}
              whileHover={{
                scale: 2,
                opacity: 0.8,
              }}
            />
          );
        })}
      </Box>
    );
  };

  // Update the background gradient to use a simpler animation
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
          rgba(100, 255, 218, 0.15) 0%,
          rgba(10, 25, 47, 0.8) 50%
        )`,
        transition: 'background 0.3s ease',
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
      <ParticleEffect />
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
          About My Journey
        </Typography>
      </motion.div>

      {/* Interactive Cards Grid */}
      <Grid container spacing={4} sx={{ mb: 8 }} ref={ref}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={card.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.2 }
                }
              }}
            >
              <Paper
                component={motion.div}
                onMouseMove={(e) => handleCardMouseMove(e, card.id)}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                sx={{
                  p: 3,
                  height: '100%',
                  cursor: 'pointer',
                  background: 'rgba(10, 25, 47, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: selectedCard === card.id ? card.color : 'transparent',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  transformStyle: 'preserve-3d',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, ${card.color}, transparent)`,
                    transform: selectedCard === card.id ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                      rgba(255, 255, 255, 0.1) 0%, 
                      transparent 50%)`,
                    opacity: selectedCard === card.id ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }
                }}
              >
                <Box 
                  sx={{ 
                    textAlign: 'center', 
                    mb: 2,
                    transform: 'translateZ(20px)',
                  }}
                >
                  <motion.div
                    animate={{ 
                      rotate: selectedCard === card.id ? [0, 360] : 0,
                      scale: selectedCard === card.id ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ color: card.color }}
                  >
                    {card.icon}
                  </motion.div>
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    textAlign: 'center',
                    transform: 'translateZ(20px)',
                    color: card.color,
                  }}
                >
                  {card.title}
                </Typography>
                <AnimatePresence>
                  {selectedCard === card.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      {card.content.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              py: 0.5,
                              color: 'text.secondary',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              '&::before': {
                                content: '"▹"',
                                color: card.color,
                                marginRight: '8px',
                              },
                              '&:hover': {
                                color: card.color,
                                transform: 'translateX(10px)',
                                transition: 'all 0.3s ease',
                              }
                            }}
                          >
                            {item}
                          </Typography>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Interactive Timeline */}
      <Box
        onMouseEnter={() => setIsHoveringTimeline(true)}
        onMouseLeave={() => setIsHoveringTimeline(false)}
        sx={{
          position: 'relative',
          py: 8,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            width: '2px',
            height: '100%',
            background: 'linear-gradient(180deg, #64ffda, #7928ca)',
            transform: 'translateX(-50%)',
          }
        }}
      >
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              transition: { delay: index * 0.2 }
            }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                position: 'relative',
                mb: 4,
              }}
            >
              <Paper
                component={motion.div}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 4px 20px ${event.color}40`,
                }}
                sx={{
                  p: 3,
                  width: '40%',
                  position: 'relative',
                  background: 'rgba(10, 25, 47, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${event.color}40`,
                  [index % 2 === 0 ? 'mr' : 'ml']: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(10, 25, 47, 0.9)',
                    borderColor: event.color,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    [index % 2 === 0 ? 'right' : 'left']: '-15px',
                    width: '30px',
                    height: '2px',
                    background: event.color,
                    transform: 'translateY(-50%)',
                  }
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      fontSize: '2rem',
                      filter: `drop-shadow(0 0 8px ${event.color}80)`,
                      color: event.color,
                    }}
                  >
                    {event.icon}
                  </Typography>
                </motion.div>
                <Box>
                  <Typography variant="h6" color="primary.main" sx={{ mb: 1 }}>
                    {event.year}
                  </Typography>
                  <Typography variant="body1">
                    {event.event}
                  </Typography>
                </Box>
              </Paper>
              <motion.div
                animate={{
                  scale: isHoveringTimeline ? 1.2 : 1,
                  backgroundColor: isHoveringTimeline ? '#64ffda' : '#0a192f',
                  boxShadow: isHoveringTimeline ? `0 0 20px ${event.color}80` : 'none',
                }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: `2px solid ${event.color}`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </Box>
          </motion.div>
        ))}
      </Box>
    </Container>
  );
};

export default About;