import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  Chip,
  IconButton,
  Collapse,
} from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

const projects = [
  {
    title: 'Genesis - AI Assistant',
    description: 'An advanced AI-powered digital assistant inspired by Jarvis, featuring both online and offline capabilities. Genesis combines cutting-edge AI with a stunning futuristic interface.',
    longDescription: `• Hybrid functionality: Works online for factual responses and offline for casual conversation
• Advanced features: Speech recognition, face recognition, and customizable wake words
• Stunning UI: Futuristic design with neon animations and holographic effects
• Personal database: Stores and recalls user interactions and preferences
• Real-time processing: Handles complex queries and system controls efficiently`,
    image: null,
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'React', 'SQLite', 'WebGL'],
    githubLink: '#',
    liveLink: '#',
    featured: true,
  },
  {
    title: 'Iris OS',
    description: 'A custom Arch Linux-based operating system with deep AI integration, voice control, and advanced security features. Iris OS represents the future of human-computer interaction.',
    longDescription: `• Custom Linux distribution built on Arch Linux
• Integrated AI assistant responding to "Iris" wake word
• Biometric security with face recognition login
• Extensive UI/UX customization with Hyprland window manager
• Voice-triggered system controls and automation
• Seamless integration with Genesis AI assistant`,
    image: null,
    technologies: ['Arch Linux', 'Python', 'C++', 'Shell', 'AI', 'Hyprland'],
    githubLink: '#',
    liveLink: '#',
    featured: true,
  },
  {
    title: 'MindMesh',
    description: 'A revolutionary decentralized knowledge network that combines blockchain technology with AI to create a secure, efficient platform for knowledge sharing and monetization.',
    longDescription: `• Web3-based knowledge sharing platform
• Personal AI model training and deployment
• Blockchain-powered transparency and security
• Multi-domain skill training (coding, medicine, etc.)
• Token-based incentive system
• Cross-chain compatibility`,
    image: null,
    technologies: ['Solana', 'Rust', 'React', 'TensorFlow', 'Web3'],
    githubLink: '#',
    liveLink: '#',
    featured: true,
  },
  {
    title: 'Cross-Chain Subscription Manager',
    description: 'A hackathon-winning dApp that revolutionizes subscription management across multiple blockchain networks, enabling automated crypto-based payments.',
    longDescription: `• Multi-chain subscription management
• Built on Solana, Agoric, and Router protocols
• Automated crypto payment processing
• Smart contract-based subscription logic
• Cross-chain interoperability
• User-friendly dashboard`,
    image: null,
    technologies: ['Solana', 'Agoric', 'Router Protocol', 'React', 'Web3.js'],
    githubLink: '#',
    liveLink: '#',
    featured: true,
  },
  {
    title: 'Agoric AI',
    description: "An innovative hackathon project combining AI with Agoric's secure smart contract framework to enable trustless AI-based decision-making in Web3 applications.",
    longDescription: `• AI-powered smart contract automation
• Secure smart contract framework integration
• Trustless decision-making system
• Machine learning model integration
• Real-time contract execution
• Advanced security features`,
    image: null,
    technologies: ['Agoric', 'JavaScript', 'AI', 'Smart Contracts'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Smart Home Automation Suite',
    description: 'A collection of DIY home automation projects including a motorized projector screen, mobile-controlled Arch Linux system, and custom 3D printed solutions.',
    longDescription: `• Automated projector screen using recycled car parts
• Mobile assistant for remote Arch Linux control
• Custom 3D printing solutions (Ender 3, OctoPrint)
• Voice-activated controls
• IoT integration
• Energy-efficient design`,
    image: 'https://placehold.co/600x400/1a1a1a/64ffda?text=Smart+Home',
    technologies: ['IoT', '3D Printing', 'Python', 'Arch Linux', 'Arduino'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Cybersecurity Toolkit',
    description: 'A comprehensive suite of ethical hacking and security tools for network analysis, penetration testing, and system hardening.',
    longDescription: `• Network scanning and Wi-Fi security tools
• MITM attack prevention and detection
• Firewall bypassing techniques
• Packet sniffing capabilities
• Network forensics tools
• Security assessment framework`,
    image: 'https://placehold.co/600x400/1a1a1a/64ffda?text=Security+Tools',
    technologies: ['Python', 'C++', 'Network Security', 'Wireshark', 'Linux'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'AI Wake Word System',
    description: 'A sophisticated wake-word detection system allowing dynamic wake word changes and seamless integration with various AI assistants.',
    longDescription: `• Custom wake-word detection engine
• Dynamic wake word modification
• Low latency response time
• Multiple wake word support
• Noise cancellation
• Energy-efficient processing`,
    image: 'https://placehold.co/600x400/1a1a1a/64ffda?text=Wake+Word+AI',
    technologies: ['Python', 'TensorFlow', 'Signal Processing', 'C++'],
    githubLink: '#',
    liveLink: '#',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translateY(0)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px -15px rgba(100, 255, 218, 0.2)',
          '& .MuiCardContent-root': {
            background: 'linear-gradient(180deg, rgba(17, 34, 64, 0.8) 0%, rgba(10, 25, 47, 1) 100%)',
          },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #64ffda, #7928ca)',
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.3s ease',
        },
        '&:hover::before': {
          transform: 'scaleX(1)',
        },
      }}
    >
      {project.image ? (
        <CardMedia
          component="img"
          height="200"
          image={project.image}
          alt={project.title}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
      ) : (
        <Box
          sx={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(45deg, #0a192f, #112240)`,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(45deg, rgba(100, 255, 218, 0.1), rgba(121, 40, 202, 0.1))`,
              animation: 'gradient 5s ease infinite',
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: 'primary.main',
              opacity: 0.5,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textAlign: 'center',
              padding: 2,
            }}
          >
            {project.title}
          </Typography>
        </Box>
      )}
      <CardContent sx={{
        flexGrow: 1,
        transition: 'background 0.3s ease-in-out',
        background: 'transparent',
      }}>
        <Typography gutterBottom variant="h5" component="h3" sx={{ color: 'primary.main' }}>
          {project.title}
          {project.featured && (
            <Chip
              label="Featured"
              size="small"
              sx={{
                ml: 1,
                backgroundColor: 'primary.main',
                color: 'background.default',
                fontSize: '0.7rem',
              }}
            />
          )}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          paragraph
        >
          {project.description}
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography
            variant="body2"
            color="text.secondary"
            paragraph
            sx={{ whiteSpace: 'pre-line' }}
          >
            {project.longDescription}
          </Typography>
        </Collapse>
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {project.technologies.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                backgroundColor: 'background.default',
                color: 'primary.main',
                borderColor: 'primary.main',
                border: '1px solid',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'background.default',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(100, 255, 218, 0.2)',
                },
              }}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Button
            size="small"
            startIcon={<GitHubIcon />}
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Code
          </Button>
          <Button
            size="small"
            startIcon={<LaunchIcon />}
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Demo
          </Button>
        </Box>
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
            color: 'primary.main',
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

function Projects() {
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
              },
            }}
          >
            Featured Projects
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={6} key={project.title}>
                <motion.div variants={itemVariants}>
                  <ProjectCard project={project} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Container>
  );
}

export default Projects;