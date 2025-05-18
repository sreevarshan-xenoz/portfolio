import { Box, Typography, IconButton, Button, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import MapIcon from '@mui/icons-material/Map';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const GameUI = ({
  gameStarted,
  isPaused,
  currentZone,
  unlockedProjects,
  playerAccessories,
  showQuestLog,
  showInventory,
  showMap,
  showTutorial,
  onTogglePause,
  onResetGame,
  onExitGame,
  onToggleQuestLog,
  onToggleInventory,
  onToggleMap,
  onToggleTutorial,
  gameZones,
}) => {
  // Get current zone data
  const currentZoneData = gameZones.find(zone => zone.id === currentZone);
  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {/* Top UI Bar */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          backgroundColor: 'rgba(10, 25, 47, 0.7)',
          backdropFilter: 'blur(5px)',
          borderBottom: '1px solid #64ffda',
        }}
      >
        {/* Zone Info */}
        <Box>
          <Typography variant="h6" sx={{ color: '#64ffda' }}>
            {currentZoneData?.name || 'Loading...'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
            {currentZoneData?.description || ''}
          </Typography>
        </Box>
        
        {/* Game Controls */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Quest Log">
            <IconButton
              onClick={onToggleQuestLog}
              sx={{
                color: showQuestLog ? '#64ffda' : 'white',
                pointerEvents: 'auto',
                '&:hover': { color: '#64ffda' },
              }}
            >
              <MenuBookIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Inventory">
            <IconButton
              onClick={onToggleInventory}
              sx={{
                color: showInventory ? '#64ffda' : 'white',
                pointerEvents: 'auto',
                '&:hover': { color: '#64ffda' },
              }}
            >
              <InventoryIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Map">
            <IconButton
              onClick={onToggleMap}
              sx={{
                color: showMap ? '#64ffda' : 'white',
                pointerEvents: 'auto',
                '&:hover': { color: '#64ffda' },
              }}
            >
              <MapIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Tutorial">
            <IconButton
              onClick={onToggleTutorial}
              sx={{
                color: showTutorial ? '#64ffda' : 'white',
                pointerEvents: 'auto',
                '&:hover': { color: '#64ffda' },
              }}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={isPaused ? "Resume" : "Pause"}>
            <IconButton
              onClick={onTogglePause}
              sx={{
                color: 'white',
                pointerEvents: 'auto',
                '&:hover': { color: '#64ffda' },
              }}
            >
              {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Reset Game">
            <IconButton
              onClick={onResetGame}
              sx={{
                color: 'white',
                pointerEvents: 'auto',
                '&:hover': { color: '#64ffda' },
              }}
            >
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Exit Game">
            <IconButton
              onClick={onExitGame}
              sx={{
                color: 'white',
                pointerEvents: 'auto',
                '&:hover': { color: '#64ffda' },
              }}
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Bottom UI Bar */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          backgroundColor: 'rgba(10, 25, 47, 0.7)',
          backdropFilter: 'blur(5px)',
          borderTop: '1px solid #64ffda',
        }}
      >
        {/* Progress */}
        <Box>
          <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
            Projects Unlocked: {unlockedProjects.length}/{gameZones.length}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
            Accessories: {playerAccessories.length}
          </Typography>
        </Box>
        
        {/* Controls Help */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              ←
            </Box>
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
              Move Left
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              →
            </Box>
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
              Move Right
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              ↑
            </Box>
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
              Jump
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              ESC
            </Box>
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
              Pause
            </Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Pause Overlay */}
      {isPaused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(10, 25, 47, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 15,
          }}
        >
          <Typography variant="h3" sx={{ color: '#64ffda', mb: 4 }}>
            Game Paused
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={onTogglePause}
              sx={{
                backgroundColor: '#64ffda',
                color: '#0a192f',
                '&:hover': {
                  backgroundColor: '#4cd8b2',
                },
              }}
            >
              Resume
            </Button>
            
            <Button
              variant="outlined"
              onClick={onResetGame}
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: '#64ffda',
                  color: '#64ffda',
                },
              }}
            >
              Reset Game
            </Button>
            
            <Button
              variant="outlined"
              onClick={onExitGame}
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: '#64ffda',
                  color: '#64ffda',
                },
              }}
            >
              Exit Game
            </Button>
          </Box>
        </motion.div>
      )}
    </Box>
  );
};

export default GameUI; 