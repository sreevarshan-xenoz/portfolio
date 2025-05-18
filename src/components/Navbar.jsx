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
import { useThemeContext } from '../context/ThemeContext';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
  { name: 'My Fantasy World', path: '/my-world' },
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
  const { isDarkMode } = useThemeContext();

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
                      content: '"SREEVARSHAN"',
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
                      clipPath: 'inset(5% 0 35% 0)',
                    },
                    '80%': {
                      clipPath: 'inset(15% 0 10% 0)',
                    },
                    '100%': {
                      clipPath: 'inset(25% 0 15% 0)',
                    },
                  },
                  '@keyframes glitch-anim2': {
                    '0%': {
                      clipPath: 'inset(15% 0 10% 0)',
                    },
                    '20%': {
                      clipPath: 'inset(5% 0 35% 0)',
                    },
                    '40%': {
                      clipPath: 'inset(25% 0 15% 0)',
                    },
                    '60%': {
                      clipPath: 'inset(10% 0 15% 0)',
                    },
                    '80%': {
                      clipPath: 'inset(35% 0 5% 0)',
                    },
                    '100%': {
                      clipPath: 'inset(23% 0 20% 0)',
                    },
                  },
                }}
              >
                SREEVARSHAN
              </Typography>
            </motion.div>

            {isMobile ? (
              <>
                <MotionIconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  sx={{
                    color: 'primary.main',
                  }}
                >
                  <MenuIcon />
                </MotionIconButton>
                <Drawer
                  anchor="right"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  sx={{
                    '& .MuiDrawer-paper': {
                      width: '60%',
                      maxWidth: '300px',
                      backgroundColor: 'background.paper',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
                      padding: theme.spacing(3),
                    },
                  }}
                >
                  {drawer}
                </Drawer>
              </>
            ) : (
              <Box display="flex" alignItems="center">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    custom={index}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <MotionButton
                      component={RouterLink}
                      to={item.path}
                      sx={{
                        color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                        textTransform: 'none',
                        fontWeight: 'medium',
                        mx: 1,
                        display: 'block',
                        position: 'relative',
                        transition: 'color 0.3s ease',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: '0%',
                          height: '2px',
                          bottom: '0',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: 'primary.main',
                          transition: 'width 0.3s ease',
                          borderRadius: '2px',
                        },
                        '&:hover': {
                          backgroundColor: 'transparent',
                          '&::after': {
                            width: location.pathname === item.path ? '100%' : '50%',
                          }
                        },
                      }}
                    >
                      {item.name}
                    </MotionButton>
                  </motion.div>
                ))}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </motion.div>
    </AnimatePresence>
  );
}

export default Navbar; 