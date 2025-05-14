import { useState, useRef, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Alert,
  Tooltip,
  useTheme,
  alpha,
  Divider,
  Chip,
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function Contact() {
  const theme = useTheme();
  const formRef = useRef(null);
  const controls = useAnimation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formStage, setFormStage] = useState(0); // 0: initial, 1: name entered, 2: email entered, 3: all completed

  useEffect(() => {
    // Evaluate form stage based on filled fields
    if (formData.message.trim()) {
      setFormStage(3);
    } else if (formData.email.trim()) {
      setFormStage(2);
    } else if (formData.name.trim()) {
      setFormStage(1);
    } else {
      setFormStage(0);
    }
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Animate form before submission
    await controls.start({
      scale: [1, 0.98, 1],
      transition: { duration: 0.4 }
    });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <GitHubIcon />,
      url: 'https://github.com/sreevarshan-xenoz',
      color: '#333',
      hoverColor: '#2ea44f',
    },
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon />,
      url: 'https://www.linkedin.com/in/sree-varshan-v-91ab382a2/',
      color: '#0077b5',
      hoverColor: '#0099e0',
    },
    {
      name: 'Twitter',
      icon: <TwitterIcon />,
      url: 'https://twitter.com/yourusername',
      color: '#1da1f2',
      hoverColor: '#0c7abf',
    },
    {
      name: 'Email',
      icon: <EmailIcon />,
      url: 'mailto:sreevarshan1511@gmail.com',
      color: theme.palette.primary.main,
      hoverColor: theme.palette.secondary.main,
    },
  ];

  // Generate particle background
  const generateParticles = () => {
    const particles = [];
    const colors = ['#64ffda', '#7928ca', '#ff64b4', '#64ff8d'];
    
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 8 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = Math.random() * 5;
      const duration = Math.random() * 20 + 10;
      const initialX = Math.random() * 100;
      const initialY = Math.random() * 100;
      
      particles.push(
        <Box
          key={i}
          component={motion.div}
          initial={{
            x: `${initialX}%`,
            y: `${initialY}%`,
            opacity: 0.1,
          }}
          animate={{
            x: [`${initialX}%`, `${initialX + (Math.random() * 10 - 5)}%`],
            y: [`${initialY}%`, `${initialY + (Math.random() * 10 - 5)}%`],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
          sx={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 10px ${color}`,
            filter: 'blur(1px)',
            zIndex: 0,
          }}
        />
      );
    }
    
    return particles;
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        textAlign: 'center',
        minHeight: '100vh',
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        pt: { xs: 8, sm: 10 },
        pb: { xs: 6, sm: 8 },
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Particle Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          overflow: 'hidden',
        }}
      >
        {generateParticles()}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(10, 25, 47, 0.7), rgba(10, 25, 47, 0.9))',
            backdropFilter: 'blur(80px)',
          }}
        />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1, mb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(45deg, #64ffda 30%, #7928ca 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            Get In Touch
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Divider 
              sx={{ 
                width: '100px', 
                borderColor: '#64ffda', 
                '&::before, &::after': {
                  borderColor: '#64ffda',
                }
              }}
            >
              <Chip 
                icon={<AutoAwesomeIcon />} 
                label="Let's Connect" 
                sx={{ 
                  background: 'linear-gradient(45deg, #64ffda33, #7928ca33)',
                  color: theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.main}`,
                }}
              />
            </Divider>
          </Box>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              mb: 6,
              lineHeight: 1.8,
            }}
          >
            I'm currently exploring new opportunities and collaborations. Whether you have a project in mind,
            job opportunity, or just want to say hello, I'd love to hear from you!
          </Typography>
        </motion.div>

        <Grid container spacing={5} alignItems="flex-start">
          {/* Contact Form Section */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper
                component={motion.form}
                ref={formRef}
                animate={controls}
                onSubmit={handleSubmit}
                sx={{
                  p: 4,
                  borderRadius: '16px',
                  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.default, 0.8)})`,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                  boxShadow: `0 10px 30px -15px ${alpha(theme.palette.common.black, 0.3)}`,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 20px 40px -20px ${alpha(theme.palette.common.black, 0.4)}`,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                  },
                }}
              >
                {/* Form Decorative Elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #64ffda, #7928ca)',
                  }}
                />
                <Box
                  component={motion.div}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  sx={{
                    position: 'absolute',
                    bottom: -100,
                    right: -100,
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(100, 255, 218, 0.15), transparent 70%)',
                    zIndex: 0,
                  }}
                />
                
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                    textAlign: 'left',
                  }}
                >
                  Send me a message
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      error={!!errors.name}
                      helperText={errors.name}
                      disabled={isSubmitting}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: alpha(theme.palette.primary.main, 0.2),
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: '2px',
                          },
                        },
                        '& label.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                        '& .MuiInputBase-input': {
                          position: 'relative',
                          transition: 'all 0.3s ease',
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email}
                      disabled={isSubmitting}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: alpha(theme.palette.primary.main, 0.2),
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: '2px',
                          },
                        },
                        '& label.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      multiline
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      error={!!errors.message}
                      helperText={errors.message}
                      disabled={isSubmitting}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: alpha(theme.palette.primary.main, 0.2),
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: '2px',
                          },
                        },
                        '& label.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      endIcon={
                        <motion.div
                          animate={
                            isSubmitting 
                              ? { rotate: 360 } 
                              : formStage === 3 
                                ? { x: [0, 5, 0] } 
                                : {}
                          }
                          transition={
                            isSubmitting 
                              ? { duration: 1, repeat: Infinity, ease: "linear" } 
                              : { duration: 1, repeat: Infinity, repeatType: "reverse" }
                          }
                        >
                          <SendIcon />
                        </motion.div>
                      }
                      sx={{
                        mt: 2,
                        py: 1.5,
                        px: 4,
                        borderRadius: '8px',
                        backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: '#0a192f',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '1rem',
                        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                        '&:hover': {
                          backgroundPosition: 'right center',
                          transform: 'translateY(-3px)',
                          boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                        },
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                    
                    {/* Form Stage Indicator */}
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                      {[0, 1, 2, 3].map((stage) => (
                        <Box
                          key={stage}
                          sx={{
                            width: 40,
                            height: 4,
                            mx: 0.5,
                            borderRadius: '2px',
                            backgroundColor: formStage >= stage 
                              ? theme.palette.primary.main 
                              : alpha(theme.palette.primary.main, 0.2),
                            transition: 'all 0.5s ease',
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>

          {/* Contact Info Section */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Paper
                sx={{
                  p: 4,
                  borderRadius: '16px',
                  height: '100%',
                  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.default, 0.8)})`,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                  boxShadow: `0 10px 30px -15px rgba(0, 0, 0, 0.3)`,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 20px 40px -20px rgba(0, 0, 0, 0.4)`,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                  },
                }}
              >
                {/* Info Card Decorative Elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #7928ca, #64ffda)',
                  }}
                />
                <Box
                  component={motion.div}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  sx={{
                    position: 'absolute',
                    top: -100,
                    left: -100,
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(121, 40, 202, 0.15), transparent 70%)',
                    zIndex: 0,
                  }}
                />
                
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                    textAlign: 'left',
                  }}
                >
                  Contact Information
                </Typography>
                
                <Box sx={{ mb: 4, textAlign: 'left' }}>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    I'm currently exploring new opportunities and would love to discuss how we can work together. 
                    Feel free to reach out through any of these channels!
                  </Typography>
                </Box>
                
                {/* Contact Details */}
                <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    >
                      <EmailIcon />
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        sreevarshan1511@gmail.com
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                        color: theme.palette.secondary.main,
                      }}
                    >
                      <LocationOnIcon />
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="body2" color="text.secondary">
                        Location
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        Chennai, Tamil Nadu, India
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    >
                      <CodeIcon />
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="body2" color="text.secondary">
                        GitHub
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        github.com/sreevarshan-xenoz
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                {/* Social Links */}
                <Box sx={{ mt: 'auto' }}>
                  <Typography variant="h6" sx={{ mb: 2, textAlign: 'left' }}>
                    Connect on Social Media
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    {socialLinks.map((link) => (
                      <Tooltip key={link.name} title={link.name} placement="top">
                        <IconButton
                          component={motion.a}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ 
                            scale: 1.15, 
                            y: -5,
                            boxShadow: `0 10px 25px -10px ${alpha(link.color, 0.7)}`,
                          }}
                          whileTap={{ scale: 0.9 }}
                          sx={{
                            color: link.color,
                            backgroundColor: alpha(link.color, 0.1),
                            width: 56,
                            height: 56,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: alpha(link.color, 0.2),
                            },
                          }}
                        >
                          {link.icon}
                        </IconButton>
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
      
      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Box sx={{ mt: 10, mb: 6, position: 'relative' }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 6,
              background: 'linear-gradient(45deg, #64ffda 30%, #7928ca 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
            }}
          >
            Frequently Asked Questions
          </Typography>
          
          <Grid container spacing={4}>
            {[
              {
                question: "What type of projects are you interested in?",
                answer: "I'm passionate about AI/ML, custom OS development, and innovative web/mobile applications. I'm particularly interested in projects involving cutting-edge technology that solves real-world problems."
              },
              {
                question: "Are you available for freelance work?",
                answer: "Yes, I'm open to freelance opportunities, especially those involving AI integration, custom Linux systems, or complex web applications that present interesting technical challenges."
              },
              {
                question: "What's your preferred tech stack?",
                answer: "My preferred stack includes Python for AI/ML, Arch Linux for OS development, and React/Node.js for web applications. However, I'm adaptable and enjoy learning new technologies as needed for specific projects."
              },
              {
                question: "How quickly do you respond to inquiries?",
                answer: "I typically respond to all inquiries within 24-48 hours. For urgent matters, please indicate this in your message subject and I'll prioritize accordingly."
              }
            ].map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  component={motion.div}
                  whileHover={{ 
                    y: -8,
                    boxShadow: `0 10px 30px -15px ${alpha(theme.palette.common.black, 0.4)}`,
                  }}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: '12px',
                    backgroundColor: alpha(theme.palette.background.paper, 0.6),
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.primary.main, 0.1),
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      fontWeight: 'medium',
                      color: theme.palette.primary.main,
                      textAlign: 'left'
                    }}
                  >
                    {faq.question}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ textAlign: 'left' }}
                  >
                    {faq.answer}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
      
      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ 
            width: '100%',
            backgroundColor: alpha(theme.palette.primary.main, 0.9),
            color: theme.palette.getContrastText(theme.palette.primary.main),
            '& .MuiAlert-icon': {
              color: theme.palette.getContrastText(theme.palette.primary.main),
            }
          }}
        >
          Message sent successfully! I'll get back to you soon.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Contact;