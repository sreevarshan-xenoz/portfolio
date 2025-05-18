import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import Obstacle from './Obstacle';

const GameWorld = ({ currentZone, currentObstacle, obstacles, gameZones }) => {
  const currentZoneData = gameZones[currentZone];
  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: currentZoneData.background,
        overflow: 'hidden',
      }}
    >
      {/* Background elements */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '20%',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent)',
        }}
      />
      
      {/* Zone name */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          padding: '8px 16px',
          backgroundColor: 'rgba(10, 25, 47, 0.7)',
          borderRadius: 2,
          color: 'white',
          fontWeight: 'bold',
          zIndex: 5,
        }}
      >
        {currentZoneData.name}
      </Box>
      
      {/* Obstacles */}
      {gameZones[currentZone].obstacles.map((obstacleId, index) => {
        const obstacleData = obstacles[obstacleId];
        const isCurrentObstacle = index === currentObstacle;
        
        return (
          <Obstacle
            key={obstacleId}
            obstacle={obstacleData}
            isActive={isCurrentObstacle}
          />
        );
      })}
      
      {/* Decorative elements based on zone */}
      {currentZone === 0 && (
        <>
          {/* UX Forest elements */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '20%',
              left: '10%',
              width: 40,
              height: 60,
              background: 'linear-gradient(to bottom, #2d5a3f, #1a472a)',
              borderRadius: '50% 50% 0 0',
              transform: 'rotate(-10deg)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '15%',
              left: '15%',
              width: 30,
              height: 50,
              background: 'linear-gradient(to bottom, #2d5a3f, #1a472a)',
              borderRadius: '50% 50% 0 0',
              transform: 'rotate(5deg)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '25%',
              left: '20%',
              width: 50,
              height: 70,
              background: 'linear-gradient(to bottom, #2d5a3f, #1a472a)',
              borderRadius: '50% 50% 0 0',
              transform: 'rotate(-5deg)',
            }}
          />
        </>
      )}
      
      {currentZone === 1 && (
        <>
          {/* Code Mountains elements */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '20%',
              left: '10%',
              width: 60,
              height: 100,
              background: 'linear-gradient(to bottom, #34495e, #2c3e50)',
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '20%',
              left: '25%',
              width: 80,
              height: 120,
              background: 'linear-gradient(to bottom, #34495e, #2c3e50)',
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '20%',
              left: '40%',
              width: 50,
              height: 90,
              background: 'linear-gradient(to bottom, #34495e, #2c3e50)',
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            }}
          />
        </>
      )}
      
      {currentZone === 2 && (
        <>
          {/* Writing River elements */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '20%',
              left: '10%',
              width: '80%',
              height: 40,
              background: 'linear-gradient(to right, #1e3c72, #2a5298)',
              borderRadius: '50%',
              opacity: 0.7,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '25%',
              left: '20%',
              width: 20,
              height: 20,
              background: 'white',
              borderRadius: '50%',
              opacity: 0.5,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '22%',
              left: '40%',
              width: 15,
              height: 15,
              background: 'white',
              borderRadius: '50%',
              opacity: 0.5,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '28%',
              left: '60%',
              width: 25,
              height: 25,
              background: 'white',
              borderRadius: '50%',
              opacity: 0.5,
            }}
          />
        </>
      )}
      
      {currentZone === 3 && (
        <>
          {/* Masterpiece Citadel elements */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 200,
              height: 150,
              background: 'linear-gradient(to bottom, #6a3eb8, #4b2e83)',
              clipPath: 'polygon(0% 100%, 20% 60%, 40% 80%, 60% 40%, 80% 60%, 100% 20%, 100% 100%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '35%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 100,
              height: 80,
              background: 'linear-gradient(to bottom, #6a3eb8, #4b2e83)',
              clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '45%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 40,
              height: 40,
              background: 'gold',
              borderRadius: '50%',
              boxShadow: '0 0 20px gold',
            }}
          />
        </>
      )}
    </Box>
  );
};

export default GameWorld; 