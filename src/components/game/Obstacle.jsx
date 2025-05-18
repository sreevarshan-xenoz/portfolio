import React, { useState } from 'react';
import { Box, Typography, Button, Modal, TextField, Slider, FormControl, RadioGroup, FormControlLabel, Radio, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';

const Obstacle = ({ obstacle, isActive }) => {
  const [showChallenge, setShowChallenge] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedOption, setSelectedOption] = useState('');
  const [dragItems, setDragItems] = useState([]);
  const [code, setCode] = useState('');
  
  // Handle different challenge types
  const handleMultipleChoice = (option) => {
    setSelectedOption(option);
    if (option === obstacle.correctAnswer) {
      setCompleted(true);
      obstacle.completed = true;
    }
  };
  
  const handleSlider = (event, newValue) => {
    setSliderValue(newValue);
    if (newValue === obstacle.correctAnswer) {
      setCompleted(true);
      obstacle.completed = true;
    }
  };
  
  const handleTextInput = (event) => {
    setUserInput(event.target.value);
    if (event.target.value.toLowerCase() === obstacle.correctAnswer.toLowerCase()) {
      setCompleted(true);
      obstacle.completed = true;
    }
  };
  
  const handleDragDrop = (item) => {
    setDragItems([...dragItems, item]);
    if (dragItems.length + 1 === obstacle.correctAnswer.length) {
      const isCorrect = [...dragItems, item].every((item, index) => 
        item === obstacle.correctAnswer[index]
      );
      if (isCorrect) {
        setCompleted(true);
        obstacle.completed = true;
      }
    }
  };
  
  const handleCodeSubmit = () => {
    // Simple code validation
    if (code.includes(obstacle.correctAnswer)) {
      setCompleted(true);
      obstacle.completed = true;
    }
  };
  
  // Render different challenge types
  const renderChallenge = () => {
    switch (obstacle.type) {
      case 'multiple-choice':
        return (
          <FormControl component="fieldset">
            <Typography variant="h6" gutterBottom>
              {obstacle.question}
            </Typography>
            <RadioGroup value={selectedOption} onChange={(e) => handleMultipleChoice(e.target.value)}>
              {obstacle.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      
      case 'slider':
        return (
          <Box sx={{ width: '100%', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {obstacle.question}
            </Typography>
            <Slider
              value={sliderValue}
              onChange={handleSlider}
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
            <Typography variant="body2" color="text.secondary">
              Current value: {sliderValue}
            </Typography>
          </Box>
        );
      
      case 'text-input':
        return (
          <Box sx={{ width: '100%', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {obstacle.question}
            </Typography>
            <TextField
              fullWidth
              value={userInput}
              onChange={handleTextInput}
              placeholder="Type your answer here..."
              variant="outlined"
            />
          </Box>
        );
      
      case 'drag-drop':
        return (
          <Box sx={{ width: '100%', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {obstacle.question}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              {obstacle.options.map((option, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    backgroundColor: dragItems.includes(option) ? '#e0e0e0' : 'white',
                  }}
                  onClick={() => handleDragDrop(option)}
                >
                  {option}
                </Paper>
              ))}
            </Box>
            <Box sx={{ minHeight: 100, border: '1px dashed #ccc', p: 2 }}>
              {dragItems.map((item, index) => (
                <Paper key={index} sx={{ p: 1, m: 0.5, display: 'inline-block' }}>
                  {item}
                </Paper>
              ))}
            </Box>
          </Box>
        );
      
      case 'code-editor':
        return (
          <Box sx={{ width: '100%', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {obstacle.question}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              variant="outlined"
              sx={{ fontFamily: 'monospace', mb: 2 }}
            />
            <Button variant="contained" onClick={handleCodeSubmit}>
              Submit Code
            </Button>
          </Box>
        );
      
      default:
        return (
          <Typography variant="body1">
            Unknown challenge type
          </Typography>
        );
    }
  };
  
  return (
    <>
      {/* 3D Obstacle */}
      <Box
        component={motion.div}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isActive ? 1.1 : 1,
          opacity: 1,
          y: isActive ? -10 : 0,
        }}
        transition={{ duration: 0.3 }}
        onClick={() => setShowChallenge(true)}
        sx={{
          position: 'absolute',
          left: `${obstacle.position.x}%`,
          bottom: `${obstacle.position.z}%`,
          width: '40px',
          height: '40px',
          transform: 'translateZ(20px)',
          cursor: 'pointer',
          zIndex: 3,
        }}
      >
        {/* Obstacle base */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: completed ? '#2ecc71' : '#e74c3c',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            transform: 'translateZ(0)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          {obstacle.icon || '🚧'}
        </Box>
        
        {/* Obstacle top */}
        <Box
          sx={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '20px',
            height: '20px',
            backgroundColor: completed ? '#27ae60' : '#c0392b',
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        />
      </Box>
      
      {/* Challenge Modal */}
      <Modal
        open={showChallenge}
        onClose={() => setShowChallenge(false)}
        aria-labelledby="challenge-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '80%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Button
            onClick={() => setShowChallenge(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </Button>
          
          {renderChallenge()}
          
          {completed && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: '#2ecc71',
                color: 'white',
                borderRadius: 1,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6">Challenge Completed!</Typography>
              <Typography variant="body2">
                {obstacle.completionMessage || 'You have successfully completed this challenge!'}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Obstacle; 