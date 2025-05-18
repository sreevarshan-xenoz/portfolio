import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, IconButton, Tooltip, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate } from 'react-router-dom';
import { gameZones, projects, accessories } from '../data/gameData';
import TimeMachine from '../components/worlds/TimeMachine';
import InfiniteMuseum from '../components/worlds/InfiniteMuseum';

const MyWorld = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  // World state
  const [currentWorld, setCurrentWorld] = useState(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  
  // World definitions
  const worlds = [
    {
      id: 'time-machine',
      name: 'The Time Machine Workshop',
      description: 'Travel through time to explore projects from different eras',
      icon: '⚙️',
      color: '#8B4513',
      gradient: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
      component: TimeMachine,
    },
    {
      id: 'infinite-museum',
      name: 'The Infinite Museum',
      description: 'Explore an endless gallery of projects and case studies',
      icon: '🖼️',
      color: '#2C3E50',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
      component: InfiniteMuseum,
    },
    {
      id: 'space-station',
      name: 'The Space Station Portfolio',
      description: 'Dock at different modules to explore skills and projects',
      icon: '🚀',
      color: '#1A237E',
      gradient: 'linear-gradient(135deg, #1A237E 0%, #3949AB 100%)',
    },
    {
      id: 'labyrinth',
      name: 'The Labyrinth of Solutions',
      description: 'Navigate through challenges and their solutions',
      icon: '🏰',
      color: '#4A148C',
      gradient: 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)',
    },
    {
      id: 'forest',
      name: 'The Growing Forest',
      description: 'Watch your projects grow and bloom in this interactive forest',
      icon: '🌳',
      color: '#1B5E20',
      gradient: 'linear-gradient(135deg, #1B5E20 0%, #388E3C 100%)',
    },
    {
      id: 'workshop',
      name: 'The Steampunk Workshop',
      description: 'Explore tools and processes in this inventor\'s lab',
      icon: '🔧',
      color: '#795548',
      gradient: 'linear-gradient(135deg, #795548 0%, #A1887F 100%)',
    },
    {
      id: 'arcade',
      name: 'The Retro Arcade Cabinet',
      description: 'Play games to unlock projects and skills',
      icon: '🎮',
      color: '#E91E63',
      gradient: 'linear-gradient(135deg, #E91E63 0%, #F48FB1 100%)',
    },
    {
      id: 'library',
      name: 'The Living Library',
      description: 'Pull books from shelves to explore case studies',
      icon: '📚',
      color: '#3E2723',
      gradient: 'linear-gradient(135deg, #3E2723 0%, #5D4037 100%)',
    },
    {
      id: 'circus',
      name: 'The Circus of Skills',
      description: 'Watch performers showcase your abilities',
      icon: '🎪',
      color: '#C2185B',
      gradient: 'linear-gradient(135deg, #C2185B 0%, #E91E63 100%)',
    },
    {
      id: 'cyberpunk',
      name: 'The Cyberpunk Cityscape',
      description: 'Explore a neon-lit city of projects and clients',
      icon: '🌆',
      color: '#311B92',
      gradient: 'linear-gradient(135deg, #311B92 0%, #673AB7 100%)',
    },
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Return to portfolio
  const returnToPortfolio = () => {
    navigate('/');
  };
  
  // Enter a world
  const enterWorld = (world) => {
    setCurrentWorld(world);
  };
  
  // Exit current world
  const exitWorld = () => {
    setCurrentWorld(null);
  };
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background particles */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.3,
        }}
      >
        {/* Particle effect will be added here */}
      </Box>
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={returnToPortfolio}
            sx={{ color: 'white' }}
          >
            Back to Portfolio
          </Button>
          
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            My Fantasy World
          </Typography>
          
          <Box>
            <Tooltip title="Map">
              <IconButton onClick={() => setShowMap(!showMap)} sx={{ color: 'white' }}>
                <MapIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Inventory">
              <IconButton onClick={() => setShowInventory(!showInventory)} sx={{ color: 'white' }}>
                <InventoryIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        {/* World Grid or Current World */}
        <AnimatePresence mode="wait">
          {currentWorld ? (
            <motion.div
              key={currentWorld.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {currentWorld.component && (
                <currentWorld.component onClose={exitWorld} />
              )}
            </motion.div>
          ) : (
            <Box
              ref={containerRef}
              component={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
                gap: 3,
                p: 2,
              }}
            >
              {worlds.map((world) => (
                <motion.div
                  key={world.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Box
                    onClick={() => enterWorld(world)}
                    sx={{
                      background: world.gradient,
                      borderRadius: 2,
                      p: 3,
                      height: '100%',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    <Typography variant="h1" sx={{ mb: 2, fontSize: '3rem' }}>
                      {world.icon}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                      {world.name}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {world.description}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default MyWorld; 