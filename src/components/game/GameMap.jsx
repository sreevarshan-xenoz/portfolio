import { Box, Typography, Paper, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const GameMap = ({ isVisible, onClose, gameZones, currentZone, unlockedProjects }) => {
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 800,
        zIndex: 20,
        pointerEvents: 'auto',
      }}
    >
      <Paper
        sx={{
          p: 3,
          backgroundColor: 'rgba(10, 25, 47, 0.9)',
          color: 'white',
          border: '1px solid #64ffda',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ color: '#64ffda' }}>
            Game Map
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: 'white',
              '&:hover': { color: '#64ffda' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 400,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          {/* Map background with grid */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          
          {/* Zone markers */}
          {gameZones.map((zone, index) => {
            const isCompleted = unlockedProjects.includes(zone.projectId);
            const isCurrent = zone.id === currentZone;
            
            // Calculate position based on index
            const x = 20 + (index * 25);
            const y = 50 + (index % 2 === 0 ? 0 : 150);
            
            return (
              <Box
                key={zone.id}
                sx={{
                  position: 'absolute',
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Zone icon */}
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: isCompleted ? 'rgba(100, 255, 218, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    border: `2px solid ${isCurrent ? '#64ffda' : isCompleted ? 'rgba(100, 255, 218, 0.5)' : 'rgba(255, 255, 255, 0.3)'}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  {isCurrent ? (
                    <LocationOnIcon sx={{ color: '#64ffda', fontSize: 30 }} />
                  ) : isCompleted ? (
                    <CheckCircleIcon sx={{ color: '#64ffda', fontSize: 30 }} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 30 }} />
                  )}
                </Box>
                
                {/* Zone name */}
                <Typography
                  variant="body2"
                  sx={{
                    color: isCurrent ? '#64ffda' : isCompleted ? 'rgba(100, 255, 218, 0.8)' : 'rgba(255, 255, 255, 0.7)',
                    fontWeight: isCurrent ? 'bold' : 'normal',
                    textAlign: 'center',
                    maxWidth: 100,
                  }}
                >
                  {zone.name}
                </Typography>
              </Box>
            );
          })}
          
          {/* Connection lines between zones */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            {gameZones.map((zone, index) => {
              if (index === gameZones.length - 1) return null;
              
              const x1 = 20 + (index * 25);
              const y1 = 50 + (index % 2 === 0 ? 0 : 150);
              
              const x2 = 20 + ((index + 1) * 25);
              const y2 = 50 + ((index + 1) % 2 === 0 ? 0 : 150);
              
              const isNextZoneUnlocked = unlockedProjects.includes(gameZones[index + 1].projectId);
              
              return (
                <line
                  key={`line-${index}`}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke={isNextZoneUnlocked ? '#64ffda' : 'rgba(255, 255, 255, 0.3)'}
                  strokeWidth={2}
                  strokeDasharray={isNextZoneUnlocked ? 'none' : '5,5'}
                />
              );
            })}
          </svg>
        </Box>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
            Complete challenges in each zone to unlock new areas and projects.
            <br />
            Your current location is marked with a location icon.
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default GameMap; 