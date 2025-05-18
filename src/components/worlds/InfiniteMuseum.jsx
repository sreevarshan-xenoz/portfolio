import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, IconButton, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import anime from 'animejs';

const paintings = [
  {
    id: 1,
    title: 'Project Aurora',
    description: 'A vibrant web app for real-time data visualization.',
    image: '/assets/painting1.jpg',
  },
  {
    id: 2,
    title: 'Neural Canvas',
    description: 'AI-powered art generator with custom styles.',
    image: '/assets/painting2.jpg',
  },
  {
    id: 3,
    title: 'Portfolio Redesign',
    description: 'A minimalist, responsive portfolio site.',
    image: '/assets/painting3.jpg',
  },
];

const InfiniteMuseum = ({ onClose }) => {
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [showNote, setShowNote] = useState(false);
  const [hoverTimer, setHoverTimer] = useState(null);
  const paintingsRef = useRef([]);
  const noteRef = useRef(null);
  const modalRef = useRef(null);

  // Animate paintings in on mount
  useEffect(() => {
    anime({
      targets: paintingsRef.current,
      opacity: [0, 1],
      translateY: [40, 0],
      scale: [0.8, 1],
      delay: anime.stagger(150),
      duration: 900,
      easing: 'easeOutExpo',
    });
  }, []);

  // Animate painting zoom on select
  useEffect(() => {
    if (selectedPainting && modalRef.current) {
      anime({
        targets: modalRef.current,
        scale: [0.7, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutBack',
      });
    }
  }, [selectedPainting]);

  // Animate curator's note
  useEffect(() => {
    if (showNote && noteRef.current) {
      anime({
        targets: noteRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutCubic',
      });
    }
  }, [showNote]);

  // Handle painting hover for curator's note
  const handlePaintingHover = (id) => {
    const timer = setTimeout(() => {
      setShowNote(true);
    }, 3000);
    setHoverTimer(timer);
  };
  const handlePaintingLeave = () => {
    clearTimeout(hoverTimer);
    setShowNote(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Minimalist Gallery Background */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onClose}
            sx={{ color: 'white' }}
          >
            Back to Hub
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            The Infinite Museum
          </Typography>
          <Box />
        </Box>

        {/* Gallery Hallway (placeholder for endless effect) */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 6,
            minHeight: '60vh',
            position: 'relative',
          }}
        >
          {paintings.map((painting, idx) => (
            <Box
              key={painting.id}
              ref={el => paintingsRef.current[idx] = el}
              sx={{
                width: 220,
                height: 320,
                background: '#222',
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                border: selectedPainting === painting.id ? '3px solid #64ffda' : '2px solid #444',
                transition: 'border 0.3s',
              }}
              onClick={() => setSelectedPainting(painting.id)}
              onMouseEnter={() => handlePaintingHover(painting.id)}
              onMouseLeave={handlePaintingLeave}
            >
              <Box
                sx={{
                  width: '90%',
                  height: '70%',
                  background: `url(${painting.image}) center/cover no-repeat`,
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                {painting.title}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Painting Modal */}
        <AnimatePresence>
          {selectedPainting && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
              }}
            >
              <Box
                ref={modalRef}
                sx={{
                  background: '#232526',
                  borderRadius: 3,
                  p: 4,
                  minWidth: 340,
                  maxWidth: 400,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" sx={{ mb: 2 }}>
                  {paintings.find(p => p.id === selectedPainting)?.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {paintings.find(p => p.id === selectedPainting)?.description}
                </Typography>
                <Button variant="contained" onClick={() => setSelectedPainting(null)}>
                  Close
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Curator's Note */}
        <AnimatePresence>
          {showNote && (
            <motion.div
              ref={noteRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{
                position: 'fixed',
                bottom: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#333',
                color: '#fff',
                borderRadius: 8,
                padding: '16px 32px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                zIndex: 1200,
              }}
            >
              <Typography variant="body2">
                Curator's Note: "Every project here has a story. Thanks for taking a closer look!"
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default InfiniteMuseum; 