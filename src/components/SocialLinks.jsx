import { Box, IconButton, Tooltip, Link } from '@mui/material';
import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

// SVG Icons
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const CodepenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
    <line x1="12" y1="22" x2="12" y2="15.5"></line>
    <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
    <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
    <line x1="12" y1="2" x2="12" y2="8.5"></line>
  </svg>
);

const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8.1C18 8.1 16.5 6.8 15 6.5C15 6.5 14.8 6.8 14.6 7.1C13.2 6.8 11.8 6.8 10.4 7.1C10.2 6.8 10 6.5 10 6.5C8.5 6.8 7 8.1 7 8.1C5.5 10.4 5 12.7 5.1 15C6.7 16.2 8.3 17 9.9 17C9.9 17 10.3 16.5 10.6 16C9.8 15.8 9 15.4 8.4 14.9C8.6 14.7 8.9 14.5 9 14.5C11.2 15.5 13.6 15.5 15.9 14.5C16.1 14.5 16.3 14.7 16.5 14.9C15.9 15.4 15.1 15.8 14.3 16C14.6 16.5 15 17 15 17C16.6 17 18.2 16.2 19.8 15C19.9 12.7 19.4 10.4 18 8.1ZM9.7 13.8C9 13.8 8.4 13.1 8.4 12.3C8.4 11.5 9 10.9 9.7 10.9C10.4 10.9 11 11.5 11 12.3C11 13.1 10.4 13.8 9.7 13.8ZM15.3 13.8C14.6 13.8 14 13.1 14 12.3C14 11.5 14.6 10.9 15.3 10.9C16 10.9 16.6 11.5 16.6 12.3C16.6 13.1 16 13.8 15.3 13.8Z"/>
  </svg>
);

const SocialLinks = ({ vertical = false, showText = false, animate = true }) => {
  const { prefersReducedMotion, transition } = useReducedMotion();
  
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/sreevarshan-xenoz', 
      icon: <GitHubIcon />,
      color: '#64ffda'
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com', // Replace with actual Twitter URL
      icon: <TwitterIcon />,
      color: '#1DA1F2'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com', // Replace with actual LinkedIn URL
      icon: <LinkedInIcon />,
      color: '#0A66C2'
    },
    { 
      name: 'CodePen', 
      url: 'https://codepen.io', // Replace with actual CodePen URL 
      icon: <CodepenIcon />,
      color: '#7928ca'
    },
    { 
      name: 'Discord', 
      url: 'https://discord.com', // Replace with actual Discord URL
      icon: <DiscordIcon />,
      color: '#5865F2'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      y: -5, 
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <Box
      component={motion.div}
      initial={animate && !prefersReducedMotion ? "hidden" : "visible"}
      animate="visible"
      variants={containerVariants}
      sx={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
        my: 3
      }}
    >
      {socialLinks.map((link) => (
        <motion.div
          key={link.name}
          variants={itemVariants}
          whileHover={!prefersReducedMotion ? "hover" : undefined}
          whileTap={!prefersReducedMotion ? "tap" : undefined}
        >
          <Tooltip title={link.name} placement="top">
            <IconButton
              component={Link}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              sx={{
                p: showText ? 1 : 1.5,
                color: 'text.primary',
                borderRadius: '50%',
                backdropFilter: 'blur(5px)',
                bgcolor: 'rgba(10, 25, 47, 0.5)',
                border: '1px solid',
                borderColor: 'transparent',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  color: link.color,
                  borderColor: link.color,
                  bgcolor: 'rgba(10, 25, 47, 0.7)',
                  '&::after': {
                    transform: 'scale(2)',
                    opacity: 0
                  }
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  background: `radial-gradient(circle, ${link.color}22 0%, transparent 70%)`,
                  opacity: 0,
                  transform: 'scale(0)',
                  transition: 'all 0.5s ease'
                }
              }}
            >
              {link.icon}
              {showText && (
                <Box
                  component="span"
                  sx={{
                    ml: 1,
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}
                >
                  {link.name}
                </Box>
              )}
            </IconButton>
          </Tooltip>
        </motion.div>
      ))}
    </Box>
  );
};

export default SocialLinks; 