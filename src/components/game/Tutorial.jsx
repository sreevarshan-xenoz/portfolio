import { useState } from 'react';
import { Box, Typography, Paper, Button, Stepper, Step, StepLabel, StepContent } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Tutorial = ({ isVisible, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      label: 'Welcome to The Stickman\'s Quest',
      description: 'In this interactive portfolio game, you\'ll navigate through different zones, each representing a skill or project. Complete challenges to unlock projects and customize your stickman character.',
    },
    {
      label: 'Controls',
      description: 'Use the arrow keys to move your stickman: Left and Right to move horizontally, Up to jump. Press ESC to pause the game.',
    },
    {
      label: 'Challenges',
      description: 'Each zone contains obstacles with challenges. Click on an obstacle to start a challenge. Complete the challenge to progress through the zone.',
    },
    {
      label: 'Projects',
      description: 'Completing all challenges in a zone unlocks a project. View your unlocked projects in the Quest Log.',
    },
    {
      label: 'Accessories',
      description: 'Collect accessories by completing special challenges. These can be equipped to customize your stickman character.',
    },
    {
      label: 'UI Elements',
      description: 'Use the UI buttons to access the Quest Log, Inventory, and Map. The Quest Log shows your progress, the Inventory displays collected accessories, and the Map shows the game world.',
    },
    {
      label: 'Ready to Begin',
      description: 'You\'re now ready to start your adventure! Click the Start button to begin your journey through the portfolio.',
    },
  ];
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleReset = () => {
    setActiveStep(0);
  };
  
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
        maxWidth: 600,
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
            Tutorial
          </Typography>
          <CloseIcon
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              '&:hover': { color: '#64ffda' },
            }}
          />
        </Box>
        
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 3 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconProps={{
                  sx: {
                    color: '#64ffda',
                    '& .MuiStepIcon-text': {
                      fill: '#0a192f',
                    },
                  },
                }}
              >
                <Typography variant="subtitle1" sx={{ color: '#64ffda' }}>
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {step.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        mr: 1,
                        backgroundColor: '#64ffda',
                        color: '#0a192f',
                        '&:hover': {
                          backgroundColor: '#4cd8b2',
                        },
                      }}
                      endIcon={<KeyboardArrowRightIcon />}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{
                        color: 'white',
                        '&:hover': {
                          color: '#64ffda',
                        },
                      }}
                      startIcon={<KeyboardArrowLeftIcon />}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        
        {activeStep === steps.length && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#64ffda', mb: 2 }}>
              All steps completed - you're ready to begin!
            </Typography>
            <Button
              variant="contained"
              onClick={handleReset}
              sx={{
                backgroundColor: '#64ffda',
                color: '#0a192f',
                '&:hover': {
                  backgroundColor: '#4cd8b2',
                },
              }}
            >
              Restart Tutorial
            </Button>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};

export default Tutorial; 