import { Container, Grid, Typography, Box, Paper, Collapse } from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Print3Icon from '@mui/icons-material/Print';
import BrushIcon from '@mui/icons-material/Brush';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const skillCategories = [
  {
    title: 'Programming & Development',
    icon: <CodeIcon />,
    skills: [
      'Python (AI, automation, cybersecurity)',
      'C/C++ (system programming)',
      'JavaScript (web, dApp)',
      'Solidity (smart contracts)',
      'Rust (blockchain)',
      'Web3 (Solana, Agoric, Router)',
      'Shell Scripting (Zsh, Bash)'
    ]
  },
  {
    title: 'AI & Machine Learning',
    icon: <SmartToyIcon />,
    skills: [
      'AI Model Development',
      'Speech Recognition',
      'Computer Vision (OpenCV)',
      'Chatbot Development',
      'Neural Networks',
      'Natural Language Processing'
    ]
  },
  {
    title: 'Cybersecurity',
    icon: <SecurityIcon />,
    skills: [
      'Network Security',
      'Penetration Testing',
      'Cryptography',
      'Forensics',
      'Reverse Engineering',
      'IDS/IPS Bypassing'
    ]
  },
  {
    title: 'Blockchain & Web3',
    icon: <AccountTreeIcon />,
    skills: [
      'dApp Development',
      'Smart Contracts',
      'Decentralized Systems',
      'MindMesh Project',
      'Solana Development',
      'Web3 Integration'
    ]
  },
  {
    title: '3D Printing & Hardware',
    icon: <Print3Icon />,
    skills: [
      'Ender 3',
      'OctoPrint',
      'PrusaSlicer',
      'DIY Projects',
      'Embedded Systems',
      'IoT Integration'
    ]
  },
  {
    title: 'UI/UX & Design',
    icon: <BrushIcon />,
    skills: [
      'Futuristic UI Design',
      'Animation Effects',
      'Frontend Development',
      'Mobile App Design',
      'Custom OS Interface',
      'AI Core Visualization'
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function About() {
  return (
    <Container>
      <Box sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{ 
              mb: 4, 
              color: 'primary.main',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '2px',
                bottom: '-4px',
                left: 0,
                background: 'linear-gradient(90deg, #64ffda, transparent)',
              }
            }}
          >
            About Me
          </Typography>
        </motion.div>

        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Typography variant="body1" paragraph>
                  Hello! I'm SREE VARSHAN V, a multifaceted developer with expertise spanning AI, cybersecurity, 
                  blockchain, and system development. My journey began with a passion for creating innovative 
                  solutions that bridge the gap between cutting-edge technology and practical applications.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography variant="body1" paragraph>
                  From developing AI models and secure systems to crafting decentralized applications and 
                  custom operating systems, I thrive on challenges that push the boundaries of what's possible. 
                  My experience includes successful hackathon projects, custom OS development (Iris OS), and 
                  innovative solutions in AI and blockchain.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography variant="body1" paragraph sx={{ color: 'primary.main', mb: 4 }}>
                  Here's a comprehensive overview of my technical expertise:
                </Typography>
              </motion.div>

              <Grid container spacing={3}>
                {skillCategories.map((category, index) => (
                  <Grid item xs={12} sm={6} key={category.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          height: '100%',
                          backgroundColor: 'background.paper',
                          border: '1px solid',
                          borderColor: 'primary.main',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 0 20px rgba(100, 255, 218, 0.2)',
                            transform: 'translateY(-5px)',
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                          <Box sx={{ color: 'primary.main' }}>{category.icon}</Box>
                          <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            {category.title}
                          </Typography>
                        </Box>
                        <Box component="ul" sx={{ m: 0, pl: 2 }}>
                          {category.skills.map((skill) => (
                            <Typography
                              component="li"
                              key={skill}
                              variant="body2"
                              sx={{ mb: 1, color: 'text.secondary' }}
                            >
                              {skill}
                            </Typography>
                          ))}
                        </Box>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.02, rotate: 2 }}
            >
              <Box
                component="img"
                src="[Your profile picture URL]"
                alt="Profile"
                sx={{
                  width: '100%',
                  maxWidth: 400,
                  height: 'auto',
                  borderRadius: 2,
                  filter: 'grayscale(20%)',
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.5)',
                  border: '2px solid',
                  borderColor: 'primary.main',
                  '&:hover': {
                    filter: 'grayscale(0%)',
                    boxShadow: '0 20px 30px -15px rgba(0, 0, 0, 0.7)',
                    borderColor: 'secondary.main',
                  },
                }}
              />
              <Box sx={{ mt: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    <EmojiEventsIcon sx={{ color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ color: 'primary.main' }}>
                      Hackathon Experience
                    </Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Active participant in 24-hour hackathons focusing on AI, Web3, and cybersecurity projects.
                    Experienced in team collaboration and competitive coding challenges.
                  </Typography>
                </Paper>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default About; 