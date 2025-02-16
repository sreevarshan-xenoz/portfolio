import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  useScrollTrigger,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navVariants = {
    hidden: { 
      y: -100, 
      opacity: 0,
      scale: 0.9,
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1,
      }
    },
    exit: { 
      y: -100, 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: -20,
      opacity: 0,
      scale: 0.8 
    },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      }
    }),
    hover: {
      scale: 1.05,
      y: -4,
      transition: {
        duration: 0.3,
        ease: "backOut"
      }
    },
    tap: {
      scale: 0.95,
      y: 2,
      transition: {
        duration: 0.1,
      }
    }
  };

  const logoVariants = {
    initial: { 
      scale: 0.8, 
      opacity: 0,
      x: -20,
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      }
    },
    hover: {
      scale: 1,
      transition: {
        duration: 0.3,
      }
    }
  };

  const drawer = (
    <List>
      <AnimatePresence>
        {navItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial="hidden"
            animate="visible"
            custom={index}
            variants={itemVariants}
          >
            <ListItem
              component={RouterLink}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          </motion.div>
        ))}
      </AnimatePresence>
    </List>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={navVariants}
      >
        <AppBar 
          position="fixed" 
          sx={{ 
            backgroundColor: trigger ? 'rgba(10, 25, 47, 0.85)' : 'transparent',
            boxShadow: trigger ? '0 10px 30px -10px rgba(0, 0, 0, 0.3)' : 'none',
            backdropFilter: trigger ? 'blur(10px)' : 'none',
            transition: 'all 0.4s ease',
            zIndex: 2000,
            position: 'relative',
          }}
        >
          <Toolbar>
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              style={{ flex: 1 }}
            >
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  textDecoration: 'none',
                  fontWeight: 700,
                  position: 'relative',
                  display: 'inline-block',
                  background: 'linear-gradient(45deg, #64ffda 30%, #7928ca 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  '&:hover': {
                    animation: 'glitch 2s infinite',
                    '&::before, &::after': {
                      content: '"Portfolio"',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      background: 'inherit',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      clipPath: 'inset(0)',
                    },
                    '&::before': {
                      left: '1px',
                      textShadow: '1px 0 #ff00ff88',
                      animation: 'glitch-anim 4s infinite linear alternate-reverse',
                    },
                    '&::after': {
                      left: '-1px',
                      textShadow: '-1px 0 #00ffff88',
                      animation: 'glitch-anim2 5s infinite linear alternate-reverse',
                    },
                  },
                  '@keyframes glitch': {
                    '0%, 100%': {
                      transform: 'translate(0)',
                      textShadow: '0 0 8px rgba(100, 255, 218, 0.3), 0 0 12px rgba(100, 255, 218, 0.2)',
                    },
                    '20%': {
                      transform: 'translate(-1px, 1px)',
                      textShadow: '0 0 8px rgba(255, 0, 255, 0.3), 0 0 12px rgba(255, 0, 255, 0.2)',
                    },
                    '40%': {
                      transform: 'translate(-1px, -1px)',
                      textShadow: '0 0 8px rgba(0, 255, 255, 0.3), 0 0 12px rgba(0, 255, 255, 0.2)',
                    },
                    '60%': {
                      transform: 'translate(1px, 1px)',
                      textShadow: '0 0 8px rgba(121, 40, 202, 0.3), 0 0 12px rgba(121, 40, 202, 0.2)',
                    },
                    '80%': {
                      transform: 'translate(1px, -1px)',
                      textShadow: '0 0 8px rgba(100, 255, 218, 0.3), 0 0 12px rgba(100, 255, 218, 0.2)',
                    }
                  },
                  '@keyframes glitch-anim': {
                    '0%': {
                      clipPath: 'inset(10% 0 15% 0)',
                    },
                    '20%': {
                      clipPath: 'inset(35% 0 5% 0)',
                    },
                    '40%': {
                      clipPath: 'inset(23% 0 20% 0)',
                    },
                    '60%': {
                      clipPath: 'inset(40% 0 3% 0)',
                    },
                    '80%': {
                      clipPath: 'inset(15% 0 30% 0)',
                    },
                    '100%': {
                      clipPath: 'inset(10% 0 35% 0)',
                    }
                  },
                  '@keyframes glitch-anim2': {
                    '0%': {
                      clipPath: 'inset(15% 0 30% 0)',
                    },
                    '20%': {
                      clipPath: 'inset(40% 0 3% 0)',
                    },
                    '40%': {
                      clipPath: 'inset(23% 0 20% 0)',
                    },
                    '60%': {
                      clipPath: 'inset(35% 0 5% 0)',
                    },
                    '80%': {
                      clipPath: 'inset(10% 0 15% 0)',
                    },
                    '100%': {
                      clipPath: 'inset(10% 0 35% 0)',
                    }
                  }
                }}
              >
                Portfolio
              </Typography>
            </motion.div>

            {isMobile ? (
              <MotionIconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 180,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                  }
                }}
                whileTap={{ 
                  scale: 0.9,
                  rotate: 0
                }}
                sx={{
                  '&:hover': {
                    background: 'rgba(100, 255, 218, 0.1)',
                  }
                }}
              >
                <MenuIcon />
              </MotionIconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {navItems.map((item, index) => (
                  <MotionButton
                    key={item.name}
                    component={RouterLink}
                    to={item.path}
                    variants={itemVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    sx={{
                      color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                      position: 'relative',
                      padding: '6px 12px',
                      '&:hover': {
                        color: 'primary.main',
                        background: 'transparent',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '2px',
                        bottom: 0,
                        left: 0,
                        background: 'linear-gradient(90deg, #64ffda, #7928ca)',
                        transform: location.pathname === item.path ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      },
                      '&:hover::before': {
                        transform: 'scaleX(1)',
                        animation: 'gradient 3s linear infinite',
                      },
                      '@keyframes gradient': {
                        '0%': {
                          backgroundPosition: '0% 50%',
                        },
                        '50%': {
                          backgroundPosition: '100% 50%',
                        },
                        '100%': {
                          backgroundPosition: '0% 50%',
                        },
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '120%',
                        height: '120%',
                        top: '-10%',
                        left: '-10%',
                        background: 'radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, rgba(121, 40, 202, 0.1) 100%)',
                        borderRadius: '8px',
                        opacity: 0,
                        transform: 'scale(0.8)',
                        transition: 'all 0.4s ease',
                      },
                      '&:hover::after': {
                        opacity: 1,
                        transform: 'scale(1)',
                      },
                    }}
                  >
                    <Box
                      component={motion.div}
                      initial={{ y: 0 }}
                      whileHover={{ 
                        y: [-2, 1, -1, 0],
                        transition: { 
                          duration: 0.6,
                          times: [0, 0.4, 0.7, 1],
                          ease: "easeOut"
                        }
                      }}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        zIndex: 1,
                      }}
                    >
                      {item.name}
                      {location.pathname === item.path && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ 
                            duration: 0.3,
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                          }}
                          style={{ 
                            color: '#64ffda', 
                            fontSize: '0.5rem', 
                            marginLeft: '2px',
                            filter: 'drop-shadow(0 0 2px #64ffda)'
                          }}
                        >
                          ●
                        </motion.span>
                      )}
                    </Box>
                  </MotionButton>
                ))}
              </Box>
            )}
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              backgroundColor: 'background.paper',
              backdropFilter: 'blur(10px)',
              zIndex: 2100,
            },
          }}
        >
          {drawer}
        </Drawer>
      </motion.div>
    </AnimatePresence>
  );
}

export default Navbar; 