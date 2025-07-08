import { Box, Container, Typography, useTheme, Grid, Card, CardContent, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import GitHubStats from '../components/GitHubStats';
import GitHubContributions from '../components/GitHubContributions';
import GitHubIntegration from '../components/GitHubIntegration';
import useReducedMotion from '../hooks/useReducedMotion';

const GitHub = () => {
  const theme = useTheme();
  const { prefersReducedMotion, animate } = useReducedMotion();
  const containerRef = useRef(null);

  // Particle background effect
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = '#64ffda';
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 30; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    if (containerRef.current) {
      containerRef.current.appendChild(canvas);
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '-1';
    }

    resizeCanvas();
    init();
    animate();

    const handleResize = () => {
      resizeCanvas();
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a192f 0%, #112240 50%, #0a192f 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  mb: 3,
                  background: 'linear-gradient(45deg, #64ffda, #7928ca)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  textAlign: 'center',
                }}
              >
                GitHub Portfolio
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  mb: 4,
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                }}
              >
                Explore my GitHub journey, contributions, and open-source projects. 
                From code commits to community engagement, discover the full scope of my development work.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                variant="outlined"
                size="large"
                href="https://github.com/sreevarshan-xenoz"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: '12px',
                  borderWidth: '2px',
                  fontSize: '1.1rem',
                  py: 1.5,
                  px: 4,
                  textTransform: 'none',
                  '&:hover': {
                    borderWidth: '2px',
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                View Full GitHub Profile
              </Button>
            </motion.div>
          </Box>

          {/* Quick Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card sx={{
              mb: 6,
              backgroundColor: 'rgba(10, 25, 47, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(100, 255, 218, 0.1)',
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', textAlign: 'center' }}>
                  Quick Overview
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: '#64ffda', fontWeight: 'bold' }}>
                        150+
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Total Commits
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: '#f7df1e', fontWeight: 'bold' }}>
                        45+
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Pull Requests
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: '#7928ca', fontWeight: 'bold' }}>
                        25+
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Issues Reported
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: '#39ff14', fontWeight: 'bold' }}>
                        30+
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        PR Reviews
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>

          {/* GitHub Profile & Stats */}
          <GitHubStats />

          {/* GitHub Contributions & Activity */}
          <GitHubContributions />

          {/* GitHub Repositories */}
          <GitHubIntegration />

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
              <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
                Let's Collaborate!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
                Interested in contributing to open-source projects or collaborating on new ideas? 
                I'm always open to new opportunities and exciting projects.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  href="https://github.com/sreevarshan-xenoz"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    py: 1.5,
                    px: 4,
                    background: 'linear-gradient(45deg, #64ffda, #7928ca)',
                    color: '#0a192f',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #7928ca, #64ffda)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Follow on GitHub
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="/contact"
                  sx={{
                    borderRadius: '12px',
                    borderWidth: '2px',
                    fontSize: '1.1rem',
                    py: 1.5,
                    px: 4,
                    textTransform: 'none',
                    '&:hover': {
                      borderWidth: '2px',
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Get In Touch
                </Button>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default GitHub; 