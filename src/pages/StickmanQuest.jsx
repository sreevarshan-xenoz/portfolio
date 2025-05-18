import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, useTheme, Paper, Grid, IconButton, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import MapIcon from '@mui/icons-material/Map';
import { gsap } from 'gsap';

// Game components will be imported here
import StickmanCharacter from '../components/game/StickmanCharacter';
import GameWorld from '../components/game/GameWorld';
import Obstacle from '../components/game/Obstacle';
import GameUI from '../components/game/GameUI';
import QuestLog from '../components/game/QuestLog';
import Inventory from '../components/game/Inventory';
import GameMap from '../components/game/GameMap';

// Game assets
import { gameZones, obstacles, projects } from '../data/gameData';

const StickmanQuest = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const gameContainerRef = useRef(null);
  
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [currentZone, setCurrentZone] = useState(0);
  const [currentObstacle, setCurrentObstacle] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 300 });
  const [playerVelocity, setPlayerVelocity] = useState({ x: 0, y: 0 });
  const [playerAccessories, setPlayerAccessories] = useState([]);
  const [unlockedProjects, setUnlockedProjects] = useState([]);
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  
  // Game loop
  useEffect(() => {
    if (!gameStarted || gamePaused || gameOver) return;
    
    const gameLoop = setInterval(() => {
      // Update player position based on velocity
      setPlayerPosition(prev => ({
        x: prev.x + playerVelocity.x,
        y: prev.y + playerVelocity.y
      }));
      
      // Apply gravity
      setPlayerVelocity(prev => ({
        x: prev.x * 0.9, // Friction
        y: prev.y + 0.5 // Gravity
      }));
      
      // Check for collisions with obstacles
      checkCollisions();
      
      // Check if player has completed the current obstacle
      checkObstacleCompletion();
    }, 16); // ~60fps
    
    return () => clearInterval(gameLoop);
  }, [gameStarted, gamePaused, gameOver, playerPosition, playerVelocity, currentZone, currentObstacle]);
  
  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gamePaused || gameOver) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          setPlayerVelocity(prev => ({ ...prev, x: -5 }));
          break;
        case 'ArrowRight':
          setPlayerVelocity(prev => ({ ...prev, x: 5 }));
          break;
        case 'ArrowUp':
        case ' ':
          // Jump
          setPlayerVelocity(prev => ({ ...prev, y: -10 }));
          break;
        case 'Escape':
          setGamePaused(prev => !prev);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gamePaused, gameOver]);
  
  // Check for collisions with obstacles
  const checkCollisions = () => {
    const currentObstacleData = obstacles[gameZones[currentZone].obstacles[currentObstacle]];
    
    // Simple collision detection
    if (
      playerPosition.x + 20 > currentObstacleData.position.x &&
      playerPosition.x < currentObstacleData.position.x + currentObstacleData.width &&
      playerPosition.y + 40 > currentObstacleData.position.y &&
      playerPosition.y < currentObstacleData.position.y + currentObstacleData.height
    ) {
      // Collision detected
      handleCollision();
    }
  };
  
  // Handle collision with obstacle
  const handleCollision = () => {
    // Different behavior based on obstacle type
    const currentObstacleData = obstacles[gameZones[currentZone].obstacles[currentObstacle]];
    
    switch(currentObstacleData.type) {
      case 'platform':
        // Land on platform
        setPlayerPosition(prev => ({
          x: prev.x,
          y: currentObstacleData.position.y - 40
        }));
        setPlayerVelocity(prev => ({ ...prev, y: 0 }));
        break;
      case 'spike':
        // Game over
        setGameOver(true);
        break;
      case 'moving':
        // Move with the platform
        setPlayerPosition(prev => ({
          x: prev.x + currentObstacleData.speed,
          y: prev.y
        }));
        break;
      default:
        break;
    }
  };
  
  // Check if player has completed the current obstacle
  const checkObstacleCompletion = () => {
    const currentObstacleData = obstacles[gameZones[currentZone].obstacles[currentObstacle]];
    
    // Check if player has reached the end of the obstacle
    if (
      playerPosition.x > currentObstacleData.position.x + currentObstacleData.width + 50
    ) {
      // Move to next obstacle
      if (currentObstacle < gameZones[currentZone].obstacles.length - 1) {
        setCurrentObstacle(prev => prev + 1);
        // Reset player position for next obstacle
        setPlayerPosition({ x: 50, y: 300 });
      } else {
        // Zone completed
        completeZone();
      }
    }
  };
  
  // Complete the current zone
  const completeZone = () => {
    // Unlock the project associated with this zone
    const projectId = gameZones[currentZone].projectId;
    setUnlockedProjects(prev => [...prev, projectId]);
    
    // Move to next zone or end game
    if (currentZone < gameZones.length - 1) {
      setCurrentZone(prev => prev + 1);
      setCurrentObstacle(0);
      setPlayerPosition({ x: 50, y: 300 });
    } else {
      // Game completed
      setGameOver(true);
    }
  };
  
  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setShowTutorial(false);
  };
  
  // Reset the game
  const resetGame = () => {
    setGameStarted(false);
    setCurrentZone(0);
    setCurrentObstacle(0);
    setPlayerPosition({ x: 50, y: 300 });
    setPlayerVelocity({ x: 0, y: 0 });
    setGameOver(false);
  };
  
  // Return to portfolio
  const returnToPortfolio = () => {
    navigate('/');
  };
  
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
            The Stickman's Quest
          </Typography>
          
          <Box>
            <Tooltip title="Quest Log">
              <IconButton onClick={() => setShowQuestLog(!showQuestLog)} sx={{ color: 'white' }}>
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Inventory">
              <IconButton onClick={() => setShowInventory(!showInventory)} sx={{ color: 'white' }}>
                <InventoryIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Map">
              <IconButton onClick={() => setShowMap(!showMap)} sx={{ color: 'white' }}>
                <MapIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        {/* Game Container */}
        <Box
          ref={gameContainerRef}
          sx={{
            position: 'relative',
            width: '100%',
            height: '70vh',
            backgroundColor: 'rgba(17, 34, 64, 0.7)',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(100, 255, 218, 0.1)',
          }}
        >
          {!gameStarted ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                p: 4,
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h3" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
                  The Stickman's Quest
                </Typography>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', maxWidth: 600 }}>
                  Solve challenges to unlock my portfolio projects. Each obstacle you overcome reveals a piece of my work.
                </Typography>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={startGame}
                  sx={{
                    backgroundColor: '#64ffda',
                    color: '#0a192f',
                    '&:hover': {
                      backgroundColor: '#4cd8b2',
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'bold',
                  }}
                >
                  Start Quest
                </Button>
              </motion.div>
            </Box>
          ) : (
            <>
              {/* Game World */}
              <GameWorld
                currentZone={currentZone}
                currentObstacle={currentObstacle}
                obstacles={obstacles}
                gameZones={gameZones}
              />
              
              {/* Player Character */}
              <StickmanCharacter
                position={playerPosition}
                accessories={playerAccessories}
              />
              
              {/* Game UI */}
              <GameUI
                currentZone={currentZone}
                currentObstacle={currentObstacle}
                gameZones={gameZones}
                obstacles={obstacles}
                unlockedProjects={unlockedProjects}
                projects={projects}
                gamePaused={gamePaused}
                setGamePaused={setGamePaused}
                gameOver={gameOver}
                resetGame={resetGame}
              />
              
              {/* Quest Log */}
              <AnimatePresence>
                {showQuestLog && (
                  <QuestLog
                    currentZone={currentZone}
                    currentObstacle={currentObstacle}
                    gameZones={gameZones}
                    obstacles={obstacles}
                    unlockedProjects={unlockedProjects}
                    projects={projects}
                    onClose={() => setShowQuestLog(false)}
                  />
                )}
              </AnimatePresence>
              
              {/* Inventory */}
              <AnimatePresence>
                {showInventory && (
                  <Inventory
                    accessories={playerAccessories}
                    onClose={() => setShowInventory(false)}
                  />
                )}
              </AnimatePresence>
              
              {/* Map */}
              <AnimatePresence>
                {showMap && (
                  <GameMap
                    currentZone={currentZone}
                    gameZones={gameZones}
                    unlockedProjects={unlockedProjects}
                    onClose={() => setShowMap(false)}
                  />
                )}
              </AnimatePresence>
              
              {/* Tutorial */}
              <AnimatePresence>
                {showTutorial && (
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(10, 25, 47, 0.9)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 4,
                      zIndex: 10,
                    }}
                  >
                    <Typography variant="h5" component="h3" sx={{ mb: 3, textAlign: 'center' }}>
                      How to Play
                    </Typography>
                    
                    <Box sx={{ mb: 4, maxWidth: 600 }}>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        • Use <strong>Arrow Keys</strong> to move and jump
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        • Press <strong>Space</strong> to jump
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        • Press <strong>Escape</strong> to pause the game
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        • Complete obstacles to unlock projects
                      </Typography>
                      <Typography variant="body1">
                        • Collect accessories to help you overcome challenges
                      </Typography>
                    </Box>
                    
                    <Button
                      variant="contained"
                      onClick={() => setShowTutorial(false)}
                      sx={{
                        backgroundColor: '#64ffda',
                        color: '#0a192f',
                        '&:hover': {
                          backgroundColor: '#4cd8b2',
                        },
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 'bold',
                      }}
                    >
                      Got it!
                    </Button>
                  </Box>
                )}
              </AnimatePresence>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default StickmanQuest; 