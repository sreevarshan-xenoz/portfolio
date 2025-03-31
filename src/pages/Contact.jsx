import { useState } from 'react';
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
} from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
    },
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon />,
      url: 'https://www.linkedin.com/in/sree-varshan-v-91ab382a2/',
    },
    {
      name: 'Twitter',
      icon: <TwitterIcon />,
      url: 'https://twitter.com/yourusername',
    },
    {
      name: 'Email',
      icon: <EmailIcon />,
      url: 'mailto:your.email@example.com',
    },
  ];

  return (
    <Container
      sx={{
        pt: { xs: 8, sm: 9 },
        zIndex: 1,
      }}
    >
      <Box sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 4, color: 'primary.main' }}
          >
            Get In Touch
          </Typography>
        </motion.div>

        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Paper
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  p: 4,
                  backgroundColor: 'background.paper',
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      error={!!errors.name}
                      helperText={errors.name}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      error={!!errors.message}
                      helperText={errors.message}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={isSubmitting}
                      sx={{
                        mt: 2,
                        textTransform: 'none',
                        position: 'relative',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          transition: 'transform 0.2s',
                        },
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Let's connect
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  I'm always interested in hearing about new projects and
                  opportunities. Feel free to reach out through the form or connect
                  with me on social media.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                {socialLinks.map((link) => (
                  <IconButton
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'primary.main',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px) scale(1.15)',
                        color: link.name === 'GitHub' ? '#333' :
                               link.name === 'LinkedIn' ? '#0077b5' :
                               link.name === 'Twitter' ? '#1da1f2' :
                               'primary.main',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    {link.icon}
                  </IconButton>
                ))}
              </Box>
              <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <Alert
                  onClose={() => setShowSuccess(false)}
                  severity="success"
                  sx={{ width: '100%' }}
                >
                  Message sent successfully!
                </Alert>
              </Snackbar>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Contact;