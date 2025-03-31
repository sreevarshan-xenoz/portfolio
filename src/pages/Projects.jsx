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
    image: 'https://placehold.co/600x400/1a1a1a/64ffda?text=Genesis+AI',
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
    image: 'https://placehold.co/600x400/1a1a1a/64ffda?text=Iris+OS',
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
    image: 'https://placehold.co/600x400/1a1a1a/64ffda?text=MindMesh',
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
    image: 'https://placehold.co/600x400/1a1a1a/64ffda?text=Cross+Chain',
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
    image: 'https://placehold.co/600x400/1a1a1a/64ffda?text=Agoric+AI',
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

const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const ParticleEffect = () => {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: isHovered ? 0.8 : 0,
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isHovered ? 'scale(1.1)' : 'scale(0.95)',
        }}
      >
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 4 + 2;
          const colors = ['#64ffda', '#7928ca', '#ff64b4', '#64ff8d'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                willChange: 'transform',
                filter: 'blur(1px)',
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.8, 0.4, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <Card
      component={motion.div}
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={(e) => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
        handleMouseMove(e);
      }}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        background: isHovered
          ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(100, 255, 218, 0.15), transparent 50%)`
          : 'background.paper',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        boxShadow: isHovered ? '0 20px 30px -10px rgba(0,0,0,0.3)' : 'none',
        transformStyle: 'preserve-3d',
      }}
    >
      <ParticleEffect />
      <CardMedia
        component="img"
        height="200"
        image={project.image || 'https://placehold.co/600x400/1a1a1a/64ffda?text=Project'}
        alt={project.title}
        sx={{
          objectFit: 'cover',
          filter: 'brightness(0.8)',
          transition: 'filter 0.3s ease-in-out',
          '&:hover': {
            filter: 'brightness(1)',
          },
        }}
      />
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {project.technologies.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(100, 255, 218, 0.2)',
                },
              }}
            />
          ))}
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: 'pre-line', mb: 2 }}
          >
            {project.longDescription}
          </Typography>
        </Collapse>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box>
          <IconButton
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <LaunchIcon />
          </IconButton>
        </Box>
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

function Projects() {
  return (
    <Container sx={{ py: { xs: 8, sm: 12 } }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 6,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #64ffda 30%, #7928ca 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Featured Projects
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
}

export default Projects;