import { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Slider, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const Obstacle = ({ obstacle, isActive }) => {
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [draggedItems, setDraggedItems] = useState([]);
  
  // Handle challenge completion
  const handleChallengeComplete = () => {
    setChallengeCompleted(true);
    setShowChallenge(false);
  };
  
  // Handle multiple choice answer
  const handleMultipleChoice = (option) => {
    setSelectedOption(option);
    
    if (option === obstacle.challenge.correctAnswer) {
      handleChallengeComplete();
    }
  };
  
  // Handle slider value change
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    
    if (Math.abs(newValue - obstacle.challenge.correctValue) < 10) {
      handleChallengeComplete();
    }
  };
  
  // Handle text input
  const handleTextInput = (event) => {
    setUserAnswer(event.target.value);
    
    if (event.target.value.length >= obstacle.challenge.minLength) {
      handleChallengeComplete();
    }
  };
  
  // Handle drag and drop
  const handleDragStart = (item) => {
    if (!draggedItems.includes(item)) {
      setDraggedItems([...draggedItems, item]);
    }
  };
  
  const handleDragEnd = () => {
    // Check if all items are in the correct order
    const isCorrect = draggedItems.every((item, index) => {
      return item.correctPosition === index;
    });
    
    if (isCorrect) {
      handleChallengeComplete();
    }
  };
  
  // Render different challenge types
  const renderChallenge = () => {
    switch (obstacle.challenge.type) {
      case 'multiple-choice':
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">{obstacle.challenge.question}</FormLabel>
            <RadioGroup
              value={selectedOption}
              onChange={(e) => handleMultipleChoice(e.target.value)}
            >
              {obstacle.challenge.options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  control={<Radio />}
                  label={option.text}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
        
      case 'slider':
        return (
          <Box sx={{ width: '100%', px: 2 }}>
            <Typography id="slider-label" gutterBottom>
              {obstacle.challenge.question}
            </Typography>
            <Slider
              value={sliderValue}
              onChange={handleSliderChange}
              aria-labelledby="slider-label"
              min={obstacle.challenge.min}
              max={obstacle.challenge.max}
              valueLabelDisplay="auto"
            />
          </Box>
        );
        
      case 'text-input':
        return (
          <Box sx={{ width: '100%' }}>
            <Typography gutterBottom>{obstacle.challenge.question}</Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={userAnswer}
              onChange={handleTextInput}
              placeholder="Type your answer here..."
              variant="outlined"
            />
          </Box>
        );
        
      case 'drag-drop':
        return (
          <Box sx={{ width: '100%' }}>
            <Typography gutterBottom>Arrange the items in the correct order:</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                minHeight: 200,
                p: 2,
                border: '1px dashed #64ffda',
                borderRadius: 1,
              }}
            >
              {obstacle.challenge.elements.map((item) => (
                <motion.div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  onDragEnd={handleDragEnd}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: draggedItems.includes(item) ? '#64ffda' : 'rgba(100, 255, 218, 0.2)',
                    color: '#0a192f',
                    borderRadius: 4,
                    cursor: 'grab',
                    userSelect: 'none',
                  }}
                >
                  {item.text}
                </motion.div>
              ))}
            </Box>
          </Box>
        );
        
      case 'code-editor':
        return (
          <Box sx={{ width: '100%' }}>
            <Typography gutterBottom>{obstacle.challenge.task}</Typography>
            <Paper
              sx={{
                p: 2,
                backgroundColor: '#0a192f',
                color: '#64ffda',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                overflow: 'auto',
                maxHeight: 200,
              }}
            >
              {obstacle.challenge.code}
            </Paper>
            <Button
              variant="contained"
              onClick={handleChallengeComplete}
              sx={{
                mt: 2,
                backgroundColor: '#64ffda',
                color: '#0a192f',
                '&:hover': {
                  backgroundColor: '#4cd8b2',
                },
              }}
            >
              Submit Solution
            </Button>
          </Box>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <>
      {/* Obstacle visual */}
      <motion.div
        style={{
          position: 'absolute',
          left: obstacle.position.x,
          top: obstacle.position.y,
          width: obstacle.width,
          height: obstacle.height,
          backgroundColor: obstacle.color,
          borderRadius: obstacle.type === 'spike' ? '50% 50% 0 0' : 4,
          cursor: isActive ? 'pointer' : 'default',
          opacity: isActive ? 1 : 0.5,
          zIndex: 5,
        }}
        whileHover={isActive ? { scale: 1.05 } : {}}
        onClick={() => isActive && setShowChallenge(true)}
      />
      
      {/* Challenge modal */}
      <AnimatePresence>
        {showChallenge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: 600,
              zIndex: 20,
            }}
          >
            <Paper
              sx={{
                p: 4,
                backgroundColor: 'rgba(10, 25, 47, 0.9)',
                color: 'white',
                border: '1px solid #64ffda',
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                {obstacle.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {obstacle.description}
              </Typography>
              
              {renderChallenge()}
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => setShowChallenge(false)}
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: '#64ffda',
                      color: '#64ffda',
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Challenge completed indicator */}
      {challengeCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            left: obstacle.position.x + obstacle.width / 2,
            top: obstacle.position.y - 30,
            zIndex: 6,
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              backgroundColor: '#64ffda',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#0a192f',
              fontWeight: 'bold',
            }}
          >
            ✓
          </Box>
        </motion.div>
      )}
    </>
  );
};

export default Obstacle; 