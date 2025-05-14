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
  Tabs,
  Tab,
  Tooltip,
  Paper,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState, useRef, useEffect } from 'react';

// Enhanced projects array with categories and additional metadata
const projects = [
  {
    title: 'Iris-1 AI',
    description: 'A full-fledged voice-controlled desktop AI assistant with face recognition, offline/online capabilities, and a modular skills system.',
    longDescription: `• Hybrid assistant: Works online for factual responses and offline for system control
• Advanced capabilities: Speech recognition, face recognition, and custom wake words
• Modular design: Extensible skills system for easy functionality expansion
• Multi-mode operation: Desktop, headless, and remote access via API
• Personalized responses: Adapts to user preferences and interaction history
• Cross-platform compatibility: Core functionality works on Linux, macOS, and Windows`,
    image: '/project images/iris.png',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'NLP', 'WebRTC', 'FastAPI'],
    githubLink: 'https://github.com/sreevarshan-xenoz/iris-1-ai',
    liveLink: '#',
    featured: true,
    color: '#64ffda',
    category: 'AI/ML',
    status: 'Active',
    year: 2023,
    videoDemo: true
  },
  {
    title: 'AURA Smart Home',
    description: 'Modern smart home control system with voice and gesture recognition. Seamlessly integrates with various smart devices.',
    longDescription: `• Comprehensive smart home system with voice and gesture control
• Sleek dashboard for monitoring and controlling connected devices
• Automated routines based on time, location, and user behavior
• Integration with popular smart home standards and devices
• Energy efficiency optimization through machine learning
• Mobile app for remote access and control
• Multi-user support with personalized preferences`,
    image: '/project images/aura.png',
    technologies: ['IoT', 'React', 'Node.js', 'Machine Learning', 'WebSockets', 'MQTT'],
    githubLink: 'https://github.com/sreevarshan-xenoz/aura-smart-home',
    liveLink: '#',
    featured: true,
    color: '#7928ca',
    category: 'IoT',
    status: 'Active',
    year: 2023,
    videoDemo: true
  },
  {
    title: 'DocApp',
    description: 'Telehealth platform with AI-assisted diagnostics. Connects patients with healthcare providers for virtual consultations.',
    longDescription: `• Telehealth platform for virtual medical consultations
• AI-assisted pre-screening and symptom checking
• Secure video conferencing with end-to-end encryption
• Digital prescription management and pharmacy integration
• Medical record access and management for patients
• Insurance verification and billing integration
• Personalized health recommendations and follow-ups`,
    image: '/project images/doc app.png',
    technologies: ['React Native', 'Firebase', 'TensorFlow', 'WebRTC', 'HIPAA Compliance', 'Redux'],
    githubLink: 'https://github.com/sreevarshan-xenoz/docapp',
    liveLink: '#',
    featured: true,
    color: '#ff64b4',
    category: 'Web Apps',
    status: 'Completed',
    year: 2022,
    videoDemo: true
  },
  {
    title: 'ECHOLINK - Real-Time Chat',
    description: 'A peer-to-peer encrypted chat system built using Socket.IO with room support, live status indicators, and end-to-end encryption.',
    longDescription: `• Real-time messaging with Socket.IO backend
• End-to-end encryption for secure communications
• Room-based chat system with private/public options
• Live status indicators and typing notifications
• Message history with local encryption
• File sharing capabilities with progress tracking
• Responsive design works on desktop and mobile devices
• Offline capability with message queuing`,
    image: '/project images/echolink.png',
    technologies: ['Node.js', 'Socket.IO', 'React', 'Encryption', 'MongoDB', 'Express'],
    githubLink: 'https://github.com/sreevarshan-xenoz/echolink',
    liveLink: '#',
    featured: true,
    color: '#64b4ff',
    category: 'Web Apps',
    status: 'Completed',
    year: 2022,
    videoDemo: false
  },
  {
    title: 'SwiftPick',
    description: 'An e-commerce product recommendation system that uses machine learning to suggest personalized items based on user preferences.',
    longDescription: `• Advanced product recommendation engine for e-commerce
• Collaborative filtering algorithm for personalized suggestions
• Content-based recommendation for similar product discovery
• User preference analysis and behavior tracking
• A/B testing framework for recommendation optimization
• Easy integration with popular e-commerce platforms
• Analytics dashboard for conversion tracking
• Mobile-optimized interface for on-the-go shopping`,
    image: '/project images/swiftpick.png',
    technologies: ['Python', 'React', 'TensorFlow', 'AWS', 'Redis', 'GraphQL'],
    githubLink: 'https://github.com/sreevarshan-xenoz/swiftpick',
    liveLink: '#',
    color: '#FFB400',
    category: 'AI/ML',
    status: 'Active',
    year: 2021,
    videoDemo: false
  },
  {
    title: 'Student Job Finder',
    description: 'A platform connecting students with part-time job opportunities, internships, and campus work-study positions.',
    longDescription: `• Specialized job platform for college and university students
• Location-based job searches for campus and nearby opportunities
• Skill matching algorithm to connect students with relevant positions
• Schedule compatibility features for balancing work and classes
• Application tracking and status updates
• Employer profiles and reviews from past student employees
• Resume builder with academic achievement integration
• Mobile app for on-the-go job searching and applications`,
    image: '/project images/student job finder.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Google Maps API', 'Redux'],
    githubLink: 'https://github.com/sreevarshan-xenoz/student-job-finder',
    liveLink: '#',
    color: '#4BC0C0',
    category: 'Web Apps',
    status: 'Completed',
    year: 2021,
    videoDemo: false
  },
  {
    title: 'NixOS-Hyprland',
    description: 'Personalized Linux setup with Hyprland window manager and comprehensive dotfiles, optimized for developer productivity and aesthetics.',
    longDescription: `• Custom NixOS configuration with declarative package management
• Hyprland window manager with advanced animations and tiling
• Performance-optimized for development workflows
• Integrated with Iris-1 AI for voice control capabilities
• Beautiful UI with custom animations and transparency effects
• Extensive keyboard shortcuts for mouseless operation
• Modular configuration system for easy component swapping`,
    image: '/project images/template.png',
    technologies: ['NixOS', 'Hyprland', 'Lua', 'Shell', 'Nix', 'Linux'],
    githubLink: 'https://github.com/sreevarshan-xenoz/nixos-hyprland',
    liveLink: '#',
    featured: true,
    color: '#7928ca',
    category: 'Operating Systems',
    status: 'Active',
    year: 2023,
    videoDemo: true
  },
  {
    title: 'Cross-Chain Subscription Manager',
    description: 'A decentralized application built on Solana and Router Protocol that revolutionizes subscription management across multiple blockchain networks.',
    longDescription: `• Cross-chain subscription payments using Router Protocol
• Solana-based smart contracts for efficient transaction processing
• Automated recurring payment system with flexible scheduling
• User-friendly dashboard for subscription management
• Secure wallet integration with multiple authentication options
• Transaction history and analytics for subscribers and providers
• Low-fee structure compared to traditional payment processors`,
    image: '/project images/template.png',
    technologies: ['Solana', 'Router Protocol', 'React', 'Web3.js', 'Rust', 'TypeScript'],
    githubLink: 'https://github.com/sreevarshan-xenoz/cross-chain-subscription',
    liveLink: '#',
    featured: true,
    color: '#ff64b4',
    category: 'Web Apps',
    status: 'Completed',
    year: 2022,
    videoDemo: true
  },
  {
    title: 'A-U-R-A 2.0',
    description: 'An emotional AI framework focused on sentiment-aware human interaction, capable of recognizing and responding to emotional cues.',
    longDescription: `• Sentiment analysis using advanced NLP techniques
• Emotional response generation based on detected sentiment
• Multi-modal input processing (text, voice, facial expressions)
• Adaptive personality that evolves based on interactions
• Integration capabilities with other AI assistants
• Conversation memory with emotional context preservation
• Privacy-focused design with local processing options`,
    image: '/project images/template.png',
    technologies: ['Python', 'PyTorch', 'NLTK', 'Emotion Recognition', 'FastAPI', 'React'],
    githubLink: 'https://github.com/sreevarshan-xenoz/aura-2',
    liveLink: '#',
    color: '#7928ca',
    category: 'AI/ML',
    status: 'In Progress',
    year: 2022,
    videoDemo: false
  },
  {
    title: 'Avante.nvim',
    description: 'A custom Neovim configuration focused on developer productivity, with intelligent code completion, integrated debugging, and beautiful UI.',
    longDescription: `• Custom Neovim configuration with LSP integration
• Intelligent code completion with context awareness
• Integrated debugging tools for multiple languages
• Git integration with diff visualization
• Distraction-free coding environment with focus mode
• Custom keyboard shortcuts for efficient navigation
• Theme system with light/dark mode and accent colors
• Optimized startup time with lazy plugin loading`,
    image: '/project images/template.png',
    technologies: ['Lua', 'Neovim', 'LSP', 'Python', 'JavaScript', 'Rust'],
    githubLink: 'https://github.com/sreevarshan-xenoz/avante.nvim',
    liveLink: '#',
    color: '#64ff8d',
    category: 'Developer Tools',
    status: 'Active',
    year: 2023,
    videoDemo: true
  },
  {
    title: 'Gophish Remastered',
    description: 'A reworked phishing simulation platform for security testing, with enhanced templates, analytics, and reporting capabilities.',
    longDescription: `• Enhanced phishing simulation platform for security awareness
• Customizable email templates with dynamic content
• Advanced analytics and reporting dashboard
• User tracking with detailed engagement metrics
• Integration with popular email providers
• Multi-campaign management for large organizations
• Compliance-focused reporting for security audits
• Educational resources for targeted employees`,
    image: '/project images/template.png',
    technologies: ['Go', 'JavaScript', 'HTML/CSS', 'PostgreSQL', 'RESTful APIs', 'Docker'],
    githubLink: 'https://github.com/sreevarshan-xenoz/gophish-remastered',
    liveLink: '#',
    color: '#ff9664',
    category: 'Security',
    status: 'Completed',
    year: 2021,
    videoDemo: false
  },
  {
    title: 'Text-to-3D',
    description: 'An NLP to 3D object pipeline prototype using prompt-based 3D shape generation, leveraging deep learning to create models from text descriptions.',
    longDescription: `• Advanced natural language processing for 3D shape interpretation
• Neural network-based 3D model generation from text descriptions
• Real-time preview of generated 3D objects
• Model optimization for various 3D printing formats
• Style transfer capabilities for aesthetic customization
• Supports multiple output formats (OBJ, STL, GLTF)
• API for integration with design applications
• Progressive generation showing the creation process`,
    image: '/project images/template.png',
    technologies: ['Python', 'PyTorch3D', 'CLIP', 'WebGL', 'Three.js', 'CUDA'],
    githubLink: 'https://github.com/sreevarshan-xenoz/text-to-3d',
    liveLink: '#',
    color: '#64ffda',
    category: 'AI/ML',
    status: 'Experimental',
    year: 2022,
    videoDemo: true
  },
  {
    title: 'Finance Tracker',
    description: 'A comprehensive budget management tool with real-time expense visualization, budget planning, and financial insights.',
    longDescription: `• Detailed expense tracking with categorization
• Budget planning with goal setting capabilities
• Data visualization for spending patterns
• Recurring transaction management
• Import functionality from bank statements
• Export options for financial reporting
• Multi-device sync via cloud storage
• Secure encryption for sensitive financial data`,
    image: '/project images/template.png',
    technologies: ['React', 'Firebase', 'D3.js', 'Material-UI', 'Progressive Web App', 'IndexedDB'],
    githubLink: 'https://github.com/sreevarshan-xenoz/finance-tracker',
    liveLink: '#',
    color: '#3ad29f',
    category: 'Web Apps',
    status: 'Completed',
    year: 2021,
    videoDemo: false
  },
  {
    title: 'Quicknet-1',
    description: 'A full-stack boilerplate with login/auth system and fast deployment configuration, designed to accelerate web application development.',
    longDescription: `• Pre-configured authentication system with multiple providers
• Database models and migrations ready for customization
• Frontend templates with responsive design
• API structure with documentation
• Testing framework and example tests
• CI/CD pipeline configuration
• Containerized deployment setup
• Comprehensive documentation for developers`,
    image: '/project images/template.png',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Authentication', 'Docker', 'TypeScript'],
    githubLink: 'https://github.com/sreevarshan-xenoz/quicknet-1',
    liveLink: '#',
    color: '#5d8cff',
    category: 'Developer Tools',
    status: 'Active',
    year: 2022,
    videoDemo: false
  },
  {
    title: 'Void Linux Overlay',
    description: 'An experimental Linux distribution overlay with deep integration of AI assistants, designed for advanced users and developers.',
    longDescription: `• Custom Linux system based on Void Linux
• Deep AI assistant integration at system level
• Optimized for development workflows
• Advanced security features and hardening
• Package management system with AI suggestions
• Custom desktop environment with minimalist design
• Automated system maintenance and updates
• Integration with developer tools and workflows`,
    image: '/project images/template.png',
    technologies: ['Linux', 'Shell', 'Python', 'C', 'AI Integration', 'System Design'],
    githubLink: 'https://github.com/sreevarshan-xenoz/void-linux-overlay',
    liveLink: '#',
    color: '#19c37d',
    category: 'Operating Systems',
    status: 'Experimental',
    year: 2023,
    videoDemo: false
  },
  {
    title: 'Doc App',
    description: 'A doctor consultation and health record app designed for clinics, enabling remote consultations and secure medical record management.',
    longDescription: `• Online appointment scheduling system
• Video consultation capabilities
• Secure patient health record storage
• Prescription management and tracking
• Medical document sharing with encryption
• Notification system for appointments and medications
• Payment processing for consultations
• HIPAA-compliant security measures`,
    image: 'https://placehold.co/600x400/1a1a1a/64ffda?text=Doc+App',
    technologies: ['React Native', 'Firebase', 'WebRTC', 'Express', 'MongoDB', 'Stripe'],
    githubLink: 'https://github.com/sreevarshan-xenoz/doc-app',
    liveLink: '#',
    color: '#ff6496',
    category: 'Mobile Apps',
    status: 'Completed',
    year: 2021,
    videoDemo: false
  },
  {
    title: 'System Prompts for AI Tools',
    description: 'A centralized repository documenting prompt engineering techniques for Large Language Models, with examples and best practices.',
    longDescription: `• Comprehensive collection of effective LLM prompts
• Categorized by use case and model type
• Performance analysis of different prompt structures
• Chain-of-thought and few-shot learning examples
• Templates for common tasks (coding, writing, analysis)
• Model-specific optimization techniques
• Community contributions and peer review
• Regular updates with new prompt engineering research`,
    image: 'https://placehold.co/600x400/1a1a1a/64ffda?text=System+Prompts',
    technologies: ['Markdown', 'GPT', 'Claude', 'LLaMA', 'Jupyter Notebook', 'Python'],
    githubLink: 'https://github.com/sreevarshan-xenoz/system-prompts',
    liveLink: '#',
    color: '#ffb264',
    category: 'AI/ML',
    status: 'Active',
    year: 2023,
    videoDemo: false
  },
  {
    title: 'SwiftPick Shuttle System',
    description: 'An efficient campus shuttle request system with real-time route prediction, designed to optimize transportation logistics.',
    longDescription: `• Real-time shuttle tracking and ETA calculation
• Intelligent route optimization based on demand
• User request system with pickup/dropoff locations
• Driver mobile application with navigation
• Analytics dashboard for transportation department
• Capacity management and peak time predictions
• Integration with campus events calendar
• Energy usage and sustainability metrics`,
    image: 'https://placehold.co/600x400/1a1a1a/64ffda?text=SwiftPick',
    technologies: ['Flutter', 'Google Maps API', 'Firebase', 'Node.js', 'Machine Learning', 'MongoDB'],
    githubLink: 'https://github.com/sreevarshan-xenoz/swiftpick',
    liveLink: '#',
    color: '#64caff',
    category: 'Mobile Apps',
    status: 'Completed',
    year: 2022,
    videoDemo: true
  },
  {
    title: 'Multiple Window 3D Scene',
    description: 'A 3D simulation viewer with multi-window rendering capabilities, allowing for distributed visualization across multiple displays.',
    longDescription: `• Synchronized 3D rendering across multiple windows
• Different perspective views from the same 3D scene
• Cross-window interaction and object manipulation
• Performance optimization for multi-display setups
• Support for various 3D model formats
• Physics simulation capabilities
• Customizable lighting and environmental effects
• Screen layout management for complex setups`,
    image: 'https://placehold.co/600x400/1a1a1a/64ffda?text=3D+Scene',
    technologies: ['WebGL', 'Three.js', 'JavaScript', 'HTML5', 'CSS3', 'Socket.IO'],
    githubLink: 'https://github.com/sreevarshan-xenoz/multi-window-3d',
    liveLink: '#',
    color: '#c864ff',
    category: 'Graphics',
    status: 'Experimental',
    year: 2023,
    videoDemo: true
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

// Animated floating text tech bubbles to add visual interest
const FloatingTechBubbles = () => {
  const availableTechs = [...new Set(projects.flatMap(project => project.technologies))];
  const selectedTechs = availableTechs.sort(() => 0.5 - Math.random()).slice(0, 10);
  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.5,
      }}
    >
      {selectedTechs.map((tech, index) => {
        const size = Math.random() * 30 + 70;
        const delay = Math.random() * 5;
        const duration = Math.random() * 15 + 15;
        const xPos = Math.random() * 100;

        return (
          <Box
            key={`${tech}-${index}`}
            component={motion.div}
            initial={{ y: '100%', x: `${xPos}%`, opacity: 0 }}
            animate={{ 
              y: '-100%', 
              opacity: [0, 0.7, 0],
              rotate: [0, Math.random() * 360],
            }}
            transition={{ 
              duration,
              repeat: Infinity, 
              delay,
              ease: 'linear',
            }}
            sx={{
              position: 'absolute',
              fontSize: `${size / 10}rem`,
              color: 'rgba(100, 255, 218, 0.1)',
              fontFamily: 'monospace',
              whiteSpace: 'nowrap',
              fontWeight: 'bold',
            }}
          >
            {tech}
          </Box>
        );
      })}
    </Box>
  );
};

const ProjectCard = ({ project }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 15;
    const tiltY = (centerX - x) / 15;

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
      ref={cardRef}
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
        backgroundColor: theme.palette.background.paper,
        background: isHovered
          ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${alpha(project.color, 0.2)}, transparent 70%)`
          : theme.palette.background.paper,
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        boxShadow: isHovered 
          ? `0 20px 30px -10px ${alpha(project.color, 0.3)}`
          : '0 10px 30px -15px rgba(0,0,0,0.2)',
        transformStyle: 'preserve-3d',
        borderRadius: '16px',
        border: '1px solid',
        borderColor: isHovered ? project.color : 'transparent',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ParticleEffect />
      
      {/* Top Image Section */}
      <Box 
        sx={{ 
          position: 'relative',
          height: '200px',
        }}
      >
        {/* Status badge */}
        <Chip
          label={project.status}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            backgroundColor: alpha(project.color, 0.3),
            color: project.color,
            border: `1px solid ${project.color}`,
            backdropFilter: 'blur(5px)',
            fontWeight: 'bold',
            fontSize: '0.7rem',
            px: 1
          }}
        />
        
        {/* Featured badge */}
        {project.featured && (
          <Box
            component={motion.div}
            animate={{
              rotate: [0, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              zIndex: 10,
              color: '#FFD700',
              fontSize: '24px',
              filter: 'drop-shadow(0 0 3px rgba(255, 215, 0, 0.7))',
            }}
          >
            ⭐
          </Box>
        )}
        
        {/* Video Demo badge */}
        {project.videoDemo && (
          <Box
            component={motion.div}
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            sx={{
              position: 'absolute',
              top: 16,
              left: project.featured ? 50 : 16,
              zIndex: 10,
              color: '#ff5252',
              fontSize: '24px',
              filter: 'drop-shadow(0 0 3px rgba(255, 82, 82, 0.7))',
            }}
          >
            📹
          </Box>
        )}
        
        <CardMedia
          component="img"
          height="200"
          image={project.image || 'https://placehold.co/600x400/1a1a1a/64ffda?text=Project'}
          alt={project.title}
          sx={{
            objectFit: 'cover',
            filter: 'brightness(0.8) grayscale(30%)',
            transition: 'all 0.5s ease-in-out',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        
        {/* Overlay Gradient */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(to bottom, transparent 50%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
            pointerEvents: 'none',
          }}
        />
        
        {/* Year tag */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            backgroundColor: alpha(project.color, 0.8),
            color: '#000',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            padding: '2px 8px',
            borderRadius: '4px',
            zIndex: 5,
          }}
        >
          {project.year}
        </Box>
      </Box>
      
      {/* Content Section (Grows to fill space) */}
      <Box sx={{ 
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      }}>
        {/* Static Content (Always visible) */}
        <Box sx={{ p: 3, opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s ease' }}>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{
              fontWeight: 'bold',
              color: project.color,
              mb: 1,
            }}
          >
            {project.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            {project.description}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1,
            mt: 'auto',
          }}>
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                className="tech-chip"
                sx={{
                  backgroundColor: alpha(project.color, 0.1),
                  color: project.color,
                  border: `1px solid ${alpha(project.color, 0.3)}`,
                  fontSize: '0.7rem',
                }}
              />
            ))}
            {project.technologies.length > 3 && (
              <Tooltip 
                title={project.technologies.slice(3).join(', ')}
                placement="top"
              >
                <Chip
                  label={`+${project.technologies.length - 3}`}
                  size="small"
                  className="tech-chip"
                  sx={{
                    backgroundColor: alpha(project.color, 0.05),
                    color: theme.palette.text.secondary,
                    border: `1px solid ${alpha(project.color, 0.1)}`,
                    cursor: 'pointer',
                    fontSize: '0.7rem',
                  }}
                />
              </Tooltip>
            )}
          </Box>
        </Box>
        
        {/* Hover Content (Appears on hover, fully covers static content) */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.background.paper,
            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
            opacity: isHovered ? 1 : 0,
            transition: 'transform 0.4s ease, opacity 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            p: 3,
          }}
        >
          <Typography 
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${project.color}, white)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            {project.title}
          </Typography>
          
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              mb: 2,
              px: 0.5,
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: alpha(theme.palette.background.default, 0.1),
              },
              '&::-webkit-scrollbar-thumb': {
                background: project.color,
                borderRadius: '4px',
              },
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ 
                whiteSpace: 'pre-line',
                mb: 2,
              }}
            >
              {project.longDescription}
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 0.5, 
              }}
            >
              {project.technologies.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  sx={{
                    backgroundColor: alpha(project.color, 0.1),
                    color: project.color,
                    border: `1px solid ${alpha(project.color, 0.3)}`,
                    fontSize: '0.65rem',
                    height: '20px',
                    mb: 0.5,
                  }}
                />
              ))}
            </Box>
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 'auto',
              pt: 1,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Button
              variant="outlined"
              size="small"
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHubIcon fontSize="small" />}
              sx={{
                borderColor: project.color,
                color: project.color,
                '&:hover': {
                  borderColor: project.color,
                  backgroundColor: alpha(project.color, 0.1),
                }
              }}
            >
              View Code
            </Button>
            
            <Button
              variant="contained"
              size="small"
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: project.color,
                color: theme.palette.getContrastText(project.color),
                '&:hover': {
                  backgroundColor: alpha(project.color, 0.9),
                }
              }}
            >
              Live Demo
            </Button>
          </Box>
        </Box>
      </Box>
      
      {/* Footer - Category and year */}
      <Box sx={{ 
        py: 1.5,
        px: 2,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        zIndex: 5,
      }}>
        <Typography
          variant="caption"
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: '4px',
            backgroundColor: alpha(project.color, 0.1),
            color: project.color,
            fontWeight: 'medium',
          }}
        >
          {project.category}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            component={motion.button}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': { color: project.color },
            }}
            onClick={() => setExpanded(!expanded)}
          >
            <ExpandMoreIcon 
              fontSize="small" 
              sx={{ 
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s'
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

function Projects() {
  const theme = useTheme();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [currentTab, setCurrentTab] = useState(0);
  
  const categories = ['All', 'AI/ML', 'Operating Systems', 'Hardware', 'Web Apps'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'alphabetical', label: 'A-Z' },
  ];
  
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setFilter(categories[newValue]);
  };
  
  const filteredProjects = projects
    .filter(project => {
      const matchesFilter = filter === 'All' || project.category === filter;
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return b.year - a.year;
        case 'oldest':
          return a.year - b.year;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  
  const pageVariants = {
    initial: { opacity: 0 },
    in: { 
      opacity: 1,
      transition: { duration: 0.6, when: "beforeChildren" }
    },
    out: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <Container 
      component={motion.div}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      sx={{ 
        py: { xs: 8, sm: 12 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      <FloatingTechBubbles />
      
      {/* Header Section */}
      <Box
        sx={{
          mb: 8,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              textAlign: 'center',
              mb: 2,
              background: 'linear-gradient(45deg, #64ffda 30%, #7928ca 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}
          >
            Project Gallery
          </Typography>
          
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
            }}
          >
            A collection of my personal projects, hackathon entries, and open-source contributions.
          </Typography>
        </motion.div>
        
        {/* Filter Controls */}
        <Paper
          elevation={0}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          sx={{ 
            p: 2, 
            borderRadius: '16px',
            backgroundImage: 'none',
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Tabs 
              value={currentTab} 
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.palette.primary.main,
                  height: '3px',
                  borderRadius: '3px',
                },
                '& .MuiTab-root': {
                  fontWeight: 'medium',
                  textTransform: 'none',
                  minWidth: 'unset',
                  borderRadius: '8px',
                  mx: 0.5,
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                  },
                },
              }}
            >
              {categories.map((category) => (
                <Tab 
                  key={category} 
                  label={category} 
                  sx={{ 
                    fontWeight: filter === category ? 'bold' : 'normal',
                  }}
                />
              ))}
            </Tabs>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              justifyContent: 'space-between', 
              alignItems: 'center',
              gap: 2,
            }}
          >
            {/* Search Box */}
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                backgroundColor: alpha(theme.palette.background.default, 0.5),
                borderRadius: '8px',
                px: 2,
                py: 1,
                flex: { xs: '1 1 100%', sm: '1 1 auto' },
                maxWidth: { xs: '100%', sm: '300px' },
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <Box
                component="input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects, tech..."
                sx={{
                  background: 'transparent',
                  border: 'none',
                  color: 'text.primary',
                  fontSize: '0.875rem',
                  width: '100%',
                  outline: 'none',
                  '&::placeholder': {
                    color: 'text.secondary',
                    opacity: 0.7,
                  }
                }}
              />
            </Box>
            
            {/* Sort Options */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FilterListIcon sx={{ color: 'text.secondary' }} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                {sortOptions.map((option) => (
                  <Chip 
                    key={option.value}
                    label={option.label}
                    onClick={() => setSortBy(option.value)}
                    sx={{
                      backgroundColor: sortBy === option.value 
                        ? alpha(theme.palette.primary.main, 0.2)
                        : alpha(theme.palette.background.default, 0.5),
                      color: sortBy === option.value
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                      border: '1px solid',
                      borderColor: sortBy === option.value
                        ? theme.palette.primary.main
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      
      {/* Results Summary */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="body2" 
          color="text.secondary"
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {filteredProjects.length === 0 ? (
            "No projects found matching your criteria. Try adjusting your filters."
          ) : filteredProjects.length === 1 ? (
            "Found 1 project"
          ) : (
            `Showing ${filteredProjects.length} projects${filter !== 'All' ? ` in ${filter}` : ''}${searchTerm ? ` matching "${searchTerm}"` : ''}`
          )}
        </Typography>
      </Box>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <Grid 
          container 
          spacing={4}
          component={motion.div}
          key={`${filter}-${searchTerm}-${sortBy}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ position: 'relative', zIndex: 2 }}
        >
          {filteredProjects.length === 0 ? (
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: '3rem', color: 'text.secondary', opacity: 0.5 }} />
                <Typography variant="h6" color="text.secondary">
                  No projects found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search or filters
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={() => {
                    setFilter('All');
                    setSearchTerm('');
                    setCurrentTab(0);
                  }}
                  sx={{ mt: 2 }}
                >
                  Clear Filters
                </Button>
              </Box>
            </Grid>
          ) : (
            filteredProjects.map((project, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={project.title}
                component={motion.div}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </Grid>
            ))
          )}
        </Grid>
      </AnimatePresence>
    </Container>
  );
}

export default Projects;