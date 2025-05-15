import { Box, Typography, useTheme } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const CodeTypeWriter = ({ title = "How I Code" }) => {
  const theme = useTheme();
  const { prefersReducedMotion } = useReducedMotion();
  const codeRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [visibleText, setVisibleText] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ line: 0, char: 0 });
  
  // Sample code to type out
  const codeLines = [
    "// Elegant solutions to complex problems",
    "import { creativity, passion } from 'core-values';",
    "import { ReactJS, NodeJS, Python } from 'technologies';",
    "",
    "function SreevarshanApproach() {",
    "  const [isInnovating, setIsInnovating] = useState(true);",
    "  const [coffeeLevel, setCoffeeLevel] = useState(100);",
    "",
    "  useEffect(() => {",
    "    // Always pushing my skills further",
    "    learnNewTechnologies();",
    "    optimizePerformance();",
    "    enhanceUserExperience();",
    "  }, []);",
    "",
    "  const solveComplexProblems = () => {",
    "    const steps = [",
    "      'Understand the challenge deeply',",
    "      'Research best practices & patterns',",
    "      'Design clean & efficient solution',",
    "      'Implement with scalability in mind',",
    "      'Test thoroughly & refactor',",
    "    ];",
    "",
    "    return steps.reduce((quality, step) => {",
    "      return quality * executeWithPrecision(step);",
    "    }, 1);",
    "  };",
    "",
    "  return (",
    "    <Project",
    "      quality=\"exceptional\"",
    "      delivered={onTime && underBudget}",
    "      maintenance=\"minimal\"",
    "    >",
    "      <Features modern resilient scalable />",
    "      <ClientFeedback extremely=\"satisfied\" />",
    "    </Project>",
    "  );",
    "}",
    "",
    "// Let's build something amazing together"
  ];
  
  // Initialize visible text with empty lines
  useEffect(() => {
    setVisibleText(codeLines.map(() => ""));
  }, []);
  
  // Function to start typing animation
  const startTyping = () => {
    if (isTyping) return;
    
    setIsTyping(true);
    setCurrentLineIndex(0);
    setCursorPosition({ line: 0, char: 0 });
    setVisibleText(codeLines.map(() => ""));
  };
  
  // Handle typing animation
  useEffect(() => {
    if (!isTyping || prefersReducedMotion) return;
    
    // If we've reached the end of all lines
    if (currentLineIndex >= codeLines.length) {
      setIsTyping(false);
      return;
    }
    
    const currentLine = codeLines[currentLineIndex];
    const visiblePart = visibleText[currentLineIndex];
    
    // If current line is fully typed
    if (visiblePart.length >= currentLine.length) {
      // Move to next line
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        if (currentLineIndex + 1 < codeLines.length) {
          setCursorPosition({ line: currentLineIndex + 1, char: 0 });
        }
      }, Math.random() * 200 + 50);
      
      return () => clearTimeout(timeout);
    }
    
    // Continue typing current line
    const typingSpeed = Math.random() * 50 + 20; // Random typing speed
    const timeout = setTimeout(() => {
      const newVisibleText = [...visibleText];
      const nextChar = currentLine.charAt(visiblePart.length);
      newVisibleText[currentLineIndex] = visiblePart + nextChar;
      setVisibleText(newVisibleText);
      setCursorPosition({ line: currentLineIndex, char: visiblePart.length + 1 });
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [isTyping, currentLineIndex, visibleText, prefersReducedMotion]);
  
  // Handle visibility change - start typing when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isTyping && !prefersReducedMotion) {
          startTyping();
        }
      },
      { threshold: 0.3 }
    );
    
    if (codeRef.current) {
      observer.observe(codeRef.current);
    }
    
    return () => {
      if (codeRef.current) {
        observer.unobserve(codeRef.current);
      }
    };
  }, [isTyping, prefersReducedMotion]);
  
  // For reduced motion, just show all code immediately
  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleText([...codeLines]);
      setIsTyping(false);
    }
  }, [prefersReducedMotion]);
  
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      sx={{
        width: '100%',
        maxWidth: '800px',
        mx: 'auto',
        my: 4,
      }}
    >
      <Typography
        variant="h4"
        component="h3"
        sx={{
          mb: 3,
          textAlign: 'center',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #64ffda 30%, #7928ca 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title}
      </Typography>
      
      <Box
        ref={codeRef}
        sx={{
          backgroundColor: 'rgba(10, 25, 47, 0.8)',
          borderRadius: '12px',
          padding: '20px',
          position: 'relative',
          fontFamily: 'monospace',
          fontSize: { xs: '12px', sm: '14px', md: '16px' },
          lineHeight: 1.6,
          border: '1px solid',
          borderColor: 'primary.main',
          boxShadow: '0 10px 30px rgba(100, 255, 218, 0.15)',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 15px 40px rgba(100, 255, 218, 0.25)',
            transform: 'translateY(-5px)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '40px',
            background: 'rgba(10, 25, 47, 0.95)',
            borderBottom: '1px solid rgba(100, 255, 218, 0.2)',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            backgroundImage: 'radial-gradient(circle, #ff5f56 6px, transparent 6px), radial-gradient(circle, #ffbd2e 6px, transparent 6px), radial-gradient(circle, #27c93f 6px, transparent 6px)',
            backgroundPosition: '20px center, 40px center, 60px center',
            backgroundSize: '16px 16px',
            backgroundRepeat: 'no-repeat',
          },
        }}
        onClick={startTyping}
      >
        <Box sx={{ 
          mt: 4.5, 
          px: 2, 
          maxHeight: { xs: '350px', sm: '400px', md: '450px' }, 
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(10, 25, 47, 0.3)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.main,
            borderRadius: '4px',
          },
        }}>
          {visibleText.map((line, index) => (
            <Box key={index} sx={{ 
              display: 'flex', 
              color: getCodeColor(line, index, theme),
              opacity: index <= currentLineIndex || prefersReducedMotion ? 1 : 0.3,
              transition: 'opacity 0.3s ease',
              minHeight: '24px',
            }}>
              <Typography
                variant="body2"
                component="span"
                sx={{
                  color: theme.palette.text.secondary,
                  width: '30px',
                  textAlign: 'right',
                  marginRight: '15px',
                  userSelect: 'none',
                  opacity: 0.6,
                }}
              >
                {index + 1}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                sx={{
                  fontFamily: 'monospace',
                  whiteSpace: 'pre',
                  position: 'relative',
                }}
              >
                {line}
                {isTyping && cursorPosition.line === index && (
                  <Box
                    component={motion.span}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    sx={{
                      position: 'absolute',
                      display: 'inline-block',
                      width: '3px',
                      height: '1.2em',
                      backgroundColor: '#64ffda',
                      marginLeft: '1px',
                      top: '2px',
                    }}
                  />
                )}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ 
          display: 'block',
          textAlign: 'center',
          mt: 2,
          fontStyle: 'italic'
        }}
      >
        {prefersReducedMotion ? "Reduced motion enabled" : "Click to restart typing animation"}
      </Typography>
    </Box>
  );
};

// Helper to color code syntax
const getCodeColor = (line, index, theme) => {
  // Keywords
  if (line.match(/import|from|function|const|let|var|return|export|default|if|else|for|while|switch|case|break|continue|try|catch|finally|new|this|typeof|instanceof|void|delete|in|of|do|with|useEffect|useState/g)) {
    return theme.palette.primary.main;
  }
  
  // Comments
  if (line.trim().startsWith('//')) {
    return theme.palette.text.secondary;
  }
  
  // Strings
  if (line.includes("'") || line.includes('"')) {
    return '#ff9664';
  }
  
  // JSX
  if (line.includes('<') && line.includes('>')) {
    return '#ff64b4';
  }
  
  // Functions
  if (line.includes('(') && line.includes(')')) {
    return '#64ffda';
  }
  
  // Objects/arrays
  if (line.includes('{') || line.includes('}') || line.includes('[') || line.includes(']')) {
    return '#7928ca';
  }
  
  return theme.palette.text.primary;
};

export default CodeTypeWriter; 