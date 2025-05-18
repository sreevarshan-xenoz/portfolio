import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Divider,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import SelfModifyingPortfolio from '../components/SelfModifyingPortfolio';

const ExperimentalPortfolio = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('self-modifying');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              mb: 2, 
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              textAlign: 'center'
            }}
          >
            Experimental Portfolio Concepts
          </Typography>
          
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              mb: 6, 
              color: theme.palette.text.secondary,
              textAlign: 'center'
            }}
          >
            Exploring the future of portfolio design
          </Typography>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant={activeTab === 'self-modifying' ? 'contained' : 'outlined'} 
              onClick={() => setActiveTab('self-modifying')}
              sx={{ mx: 1 }}
            >
              Self-Modifying
            </Button>
            <Button 
              variant={activeTab === 'ai-collaborator' ? 'contained' : 'outlined'} 
              onClick={() => setActiveTab('ai-collaborator')}
              sx={{ mx: 1 }}
            >
              AI Collaborator
            </Button>
            <Button 
              variant={activeTab === 'data-driven' ? 'contained' : 'outlined'} 
              onClick={() => setActiveTab('data-driven')}
              sx={{ mx: 1 }}
            >
              Data-Driven
            </Button>
          </Box>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Divider sx={{ mb: 4 }} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          {activeTab === 'self-modifying' && (
            <Box>
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 'bold',
                  color: theme.palette.primary.main
                }}
              >
                The Self-Modifying Portfolio
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph
                sx={{ mb: 4, maxWidth: '800px' }}
              >
                A website that rewrites its own code in real time based on user behavior, trends, or cosmic radiation.
                Hover over the component below to see it transform between different CSS frameworks.
              </Typography>
              
              <SelfModifyingPortfolio />
            </Box>
          )}
          
          {activeTab === 'ai-collaborator' && (
            <Box>
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 'bold',
                  color: theme.palette.primary.main
                }}
              >
                The AI Collaborator Portfolio
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph
                sx={{ mb: 4, maxWidth: '800px' }}
              >
                A portfolio co-created by you and an AI art bot, where both contributions are indistinguishable.
                This concept is currently under development.
              </Typography>
              
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  backgroundColor: theme.palette.background.paper,
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Coming Soon
                </Typography>
                <Typography variant="body1">
                  The AI Collaborator Portfolio is currently being developed.
                  Check back soon to see this experimental concept in action!
                </Typography>
              </Paper>
            </Box>
          )}
          
          {activeTab === 'data-driven' && (
            <Box>
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 'bold',
                  color: theme.palette.primary.main
                }}
              >
                The Data-Driven Identity Portfolio
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph
                sx={{ mb: 4, maxWidth: '800px' }}
              >
                Your identity and projects shift based on live global data streams (e.g., stock markets, climate, or social media trends).
                This concept is currently under development.
              </Typography>
              
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  backgroundColor: theme.palette.background.paper,
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Coming Soon
                </Typography>
                <Typography variant="body1">
                  The Data-Driven Identity Portfolio is currently being developed.
                  Check back soon to see this experimental concept in action!
                </Typography>
              </Paper>
            </Box>
          )}
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              These experimental portfolio concepts are designed to push the boundaries of web design and user experience.
              They demonstrate how portfolios can evolve beyond static presentations to become dynamic, interactive experiences.
            </Typography>
          </Box>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default ExperimentalPortfolio; 