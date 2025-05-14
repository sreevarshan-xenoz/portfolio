import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper, useTheme, Grid, Chip, Button, IconButton } from '@mui/material';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Icons
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';

const InteractiveTimeline = () => {
  const theme = useTheme();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: false, amount: 0.1 });

  // Timeline data - customize this with your actual events
  const timelineEvents = [
    {
      id: 1,
      type: 'education',
      title: 'Computer Science Degree',
      organization: 'University Tech',
      date: '2018 - 2022',
      description: 'Specialized in Artificial Intelligence and Cybersecurity. Completed projects on neural networks and penetration testing frameworks.',
      skills: ['Python', 'Machine Learning', 'Network Security', 'Algorithms'],
      icon: <SchoolIcon />,
      color: '#64ffda'
    },
    {
      id: 2,
      type: 'work',
      title: 'Software Developer Intern',
      organization: 'Tech Innovations Inc.',
      date: '2020 - 2021',
      description: 'Developed full-stack applications using React and Node.js. Implemented authentication systems and worked on improving application security.',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      icon: <WorkIcon />,
      color: '#7928ca'
    },
    {
      id: 3,
      type: 'project',
      title: 'Open Source Contribution',
      organization: 'GitHub Community',
      date: '2021',
      description: 'Contributed to major open source projects focusing on security tools and privacy enhancements. Fixed critical vulnerabilities and added new features.',
      skills: ['Open Source', 'Git', 'C++', 'Security'],
      icon: <CodeIcon />,
      color: '#ff64b4'
    },
    {
      id: 4,
      type: 'work',
      title: 'Security Analyst',
      organization: 'CyberShield Corp',
      date: '2022 - 2023',
      description: 'Conducted penetration testing and vulnerability assessments. Created automated security scanning tools and incident response protocols.',
      skills: ['Penetration Testing', 'Vulnerability Assessment', 'Security Automation'],
      icon: <WorkIcon />,
      color: '#7928ca'
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Hackathon Winner',
      organization: 'Global Tech Summit',
      date: '2023',
      description: 'First place in a 48-hour hackathon developing an AI-powered security solution that detects and prevents phishing attempts in real-time.',
      skills: ['AI', 'Security', 'Rapid Prototyping', 'Presentation'],
      icon: <EmojiEventsIcon />,
      color: '#64ff8d'
    },
    {
      id: 6,
      type: 'work',
      title: 'AI Developer',
      organization: 'Future Tech Labs',
      date: '2023 - Present',
      description: 'Working on cutting-edge AI technologies for security applications. Developing machine learning models to detect anomalies in network traffic and user behavior.',
      skills: ['AI', 'Machine Learning', 'Python', 'Cybersecurity'],
      icon: <WorkIcon />,
      color: '#7928ca'
    },
  ];

  // Filters for timeline events
  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'education', label: 'Education' },
    { id: 'work', label: 'Work' },
    { id: 'project', label: 'Projects' },
    { id: 'achievement', label: 'Achievements' }
  ];

  // Filter the timeline events based on the active filter
  const filteredEvents = activeFilter === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.type === activeFilter);

  // Display only first 3 events when not expanded
  const displayedEvents = isExpanded 
    ? filteredEvents 
    : filteredEvents.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
    hover: {
      scale: 1.03,
      rotateX: 5,
      z: 20,
      boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.5)',
      transition: { duration: 0.3 }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: { 
      scaleY: 1,
      transition: { 
        duration: 1.8,
        ease: "easeOut"
      }
    }
  };

  const connectorVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { 
      scaleX: 1,
      transition: { 
        duration: 0.7,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  const getIconByType = (type) => {
    switch(type) {
      case 'education': return <SchoolIcon sx={{ fontSize: 30 }} />;
      case 'work': return <WorkIcon sx={{ fontSize: 30 }} />;
      case 'project': return <CodeIcon sx={{ fontSize: 30 }} />;
      case 'achievement': return <EmojiEventsIcon sx={{ fontSize: 30 }} />;
      default: return <WorkIcon sx={{ fontSize: 30 }} />;
    }
  };

  const getEventDetailColor = (event) => {
    return event?.color || '#64ffda';
  };

  const DetailSection = ({ event }) => (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 20, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -20, rotateX: -10 }}
      transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
      sx={{
        p: 3,
        mt: 2,
        mb: 4,
        backgroundColor: 'rgba(17, 34, 64, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        boxShadow: '0 15px 35px -15px rgba(0, 0, 0, 0.7)',
        border: `1px solid ${getEventDetailColor(event)}`,
        position: 'relative',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(45deg, ${getEventDetailColor(event)}10, transparent)`,
          opacity: 0.5,
        }
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 0, 
          left: '30px', 
          width: '2px', 
          height: '20px', 
          background: `linear-gradient(to top, ${getEventDetailColor(event)}, transparent)`,
          transform: 'translateY(-100%)'
        }} 
      />
      
      <Typography 
        variant="h5" 
        sx={{ 
          color: getEventDetailColor(event), 
          mb: 1,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: -5,
            width: '40px',
            height: '2px',
            backgroundColor: getEventDetailColor(event),
          }
        }}
      >
        {event?.title}
      </Typography>
      
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        <Box 
          component="span" 
          sx={{ 
            mr: 1, 
            color: getEventDetailColor(event),
            fontWeight: 'bold'
          }}
        >
          {event?.organization}
        </Box> 
        • {event?.date}
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
        {event?.description}
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {event?.skills.map((skill, index) => (
          <Chip 
            key={index} 
            label={skill} 
            size="small"
            sx={{ 
              backgroundColor: 'rgba(100, 255, 218, 0.1)',
              color: theme.palette.text.primary,
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(100, 255, 218, 0.2)',
                boxShadow: `0 0 10px ${getEventDetailColor(event)}40`,
              }
            }}
          />
        ))}
      </Box>
    </Paper>
  );

  return (
    <Box 
      ref={timelineRef}
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ 
        perspective: '1000px',
      }}
      sx={{ 
        mb: 8,
        scrollMarginTop: '100px',
      }}
    >
      <Typography 
        variant="h4" 
        component="h2"
        sx={{ 
          mb: 5,
          background: 'linear-gradient(45deg, #64ffda 30%, #7928ca 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          position: 'relative',
          textAlign: 'center',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '3px',
            background: 'linear-gradient(90deg, #64ffda, #7928ca)',
            borderRadius: '2px',
          }
        }}
      >
        Experience Timeline
      </Typography>

      {/* Filters */}
      <Box 
        component={motion.div}
        variants={filterVariants}
        sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 1,
          mb: 4,
        }}
      >
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "contained" : "outlined"}
            size="small"
            onClick={() => setActiveFilter(filter.id)}
            startIcon={filter.id !== 'all' ? getIconByType(filter.id) : <FilterListIcon />}
            sx={{
              borderRadius: '20px',
              px: 2,
              py: 0.5,
              backgroundColor: activeFilter === filter.id ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
              borderColor: 'rgba(100, 255, 218, 0.3)',
              color: activeFilter === filter.id ? '#64ffda' : 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(100, 255, 218, 0.15)',
                borderColor: '#64ffda',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {filter.label}
          </Button>
        ))}
      </Box>

      {/* Main timeline container */}
      <Box sx={{ position: 'relative', mt: 6, transformStyle: 'preserve-3d' }}>
        {/* Center line */}
        <Box 
          component={motion.div}
          variants={lineVariants}
          sx={{ 
            position: 'absolute',
            left: { xs: '20px', md: '50%' },
            transform: { xs: 'none', md: 'translateX(-50%)' },
            width: '4px',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(100, 255, 218, 0.5), rgba(100, 255, 218, 0.1))',
            zIndex: 0,
            boxShadow: '0 0 15px rgba(100, 255, 218, 0.2)',
            borderRadius: '4px',
          }}
        />

        {/* Timeline events */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {displayedEvents.map((event, index) => (
            <Box 
              key={event.id} 
              sx={{ 
                mb: 4,
                transformStyle: 'preserve-3d',
              }}
            >
              <Grid container>
                {/* For medium screens and up, alternate left and right */}
                <Grid 
                  item 
                  xs={12} 
                  md={6} 
                  sx={{ 
                    display: 'flex',
                    flexDirection: { xs: 'row', md: index % 2 === 0 ? 'row-reverse' : 'row' },
                    alignItems: 'flex-start',
                    justifyContent: { xs: 'flex-start', md: 'flex-end' },
                    position: 'relative',
                    pl: { xs: 5, md: 0 },
                    pr: { xs: 0, md: index % 2 === 0 ? 0 : 4 },
                    mb: { xs: 0, md: 0 },
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Timeline connector (for desktop view) */}
                  {index % 2 === 0 && (
                    <Box 
                      component={motion.div}
                      variants={connectorVariants}
                      sx={{ 
                        position: 'absolute',
                        right: 0,
                        top: '26px',
                        height: '4px',
                        width: '40px',
                        background: `linear-gradient(to left, ${event.color}, rgba(100, 255, 218, 0.1))`,
                        display: { xs: 'none', md: 'block' },
                        zIndex: 3,
                      }}
                    />
                  )}

                  {/* Timeline event card */}
                  <Paper
                    component={motion.div}
                    variants={timelineItemVariants}
                    whileHover="hover"
                    onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                    onMouseEnter={() => setHoveredEvent(event.id)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    sx={{
                      p: 3,
                      width: '100%',
                      maxWidth: { xs: '100%', md: '90%' },
                      backgroundColor: 'rgba(17, 34, 64, 0.7)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.5)',
                      border: `1px solid ${hoveredEvent === event.id ? event.color : 'rgba(100, 255, 218, 0.1)'}`,
                      borderLeft: `5px solid ${event.color}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      transform: hoveredEvent === event.id ? 'translateZ(10px)' : 'translateZ(0)',
                      position: 'relative',
                      ml: { xs: 0, md: index % 2 === 0 ? 4 : 0 },
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(45deg, ${event.color}10, transparent)`,
                        opacity: hoveredEvent === event.id ? 0.5 : 0,
                        transition: 'opacity 0.3s ease',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography 
                        variant="overline" 
                        sx={{ 
                          color: event.color,
                          fontWeight: 'bold',
                          letterSpacing: 1,
                        }}
                      >
                        {event.date}
                      </Typography>
                    </Box>
                    
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: event.color, 
                        mb: 0.5,
                        textShadow: hoveredEvent === event.id ? `0 0 10px ${event.color}40` : 'none',
                      }}
                    >
                      {event.title}
                    </Typography>
                    
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      {event.organization}
                    </Typography>
                    
                    <Box 
                      sx={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 1,
                      }}
                    >
                      <Chip 
                        label={event.type.charAt(0).toUpperCase() + event.type.slice(1)} 
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(100, 255, 218, 0.1)',
                          color: theme.palette.text.primary,
                          borderRadius: '4px',
                        }}
                      />
                      
                      <IconButton
                        size="small"
                        sx={{ 
                          color: selectedEvent === event.id ? event.color : theme.palette.text.secondary,
                          transition: 'all 0.3s ease',
                          p: 0.5,
                        }}
                      >
                        <motion.div 
                          animate={{ 
                            rotate: selectedEvent === event.id ? 90 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowForwardIcon fontSize="small" />
                        </motion.div>
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>

                {/* For desktop view, the circle in the middle */}
                <Grid 
                  item 
                  xs={0} 
                  md={0}
                  sx={{ 
                    display: { xs: 'none', md: 'flex' },
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Box 
                    component={motion.div}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.2, boxShadow: `0 0 20px ${event.color}` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(17, 34, 64, 0.8)',
                      backdropFilter: 'blur(5px)',
                      border: `3px solid ${event.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: event.color,
                      zIndex: 2,
                      boxShadow: `0 0 10px ${event.color}80`,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      {getIconByType(event.type)}
                    </motion.div>
                  </Box>
                </Grid>

                {/* Mobile view only - icon */}
                <Box 
                  component={motion.div}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2, boxShadow: `0 0 15px ${event.color}` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  sx={{
                    position: 'absolute',
                    left: '20px',
                    top: '15px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(17, 34, 64, 0.8)',
                    border: `2px solid ${event.color}`,
                    display: { xs: 'flex', md: 'none' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: event.color,
                    zIndex: 2,
                    transform: 'translateX(-50%)',
                    boxShadow: `0 0 10px ${event.color}60`,
                  }}
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    {getIconByType(event.type)}
                  </motion.div>
                </Box>

                {/* For right side items - desktop view */}
                <Grid 
                  item 
                  xs={0} 
                  md={6}
                  sx={{ 
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    position: 'relative',
                    pl: index % 2 === 0 ? 4 : 0,
                  }}
                >
                  {/* Timeline connector (for desktop view) */}
                  {index % 2 !== 0 && (
                    <Box 
                      component={motion.div}
                      variants={connectorVariants}
                      sx={{ 
                        position: 'absolute',
                        left: 0,
                        top: '26px',
                        height: '4px',
                        width: '40px',
                        background: `linear-gradient(to right, ${event.color}, rgba(100, 255, 218, 0.1))`,
                        display: { xs: 'none', md: 'block' },
                        zIndex: 3,
                      }}
                    />
                  )}
                  
                  {/* This grid item is empty for left-side events */}
                  {index % 2 !== 0 && (<Box />)}
                </Grid>
              </Grid>

              {/* Detail section that appears when an event is clicked */}
              <AnimatePresence>
                {selectedEvent === event.id && (
                  <Box 
                    sx={{ 
                      px: { xs: 2, md: 8 },
                      mt: { xs: 2, md: 0 }
                    }}
                  >
                    <DetailSection event={event} />
                  </Box>
                )}
              </AnimatePresence>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Show more/less button */}
      {filteredEvents.length > 3 && (
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsExpanded(!isExpanded)}
            endIcon={isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            sx={{
              borderRadius: '20px',
              px: 3,
              py: 1,
              borderColor: 'rgba(100, 255, 218, 0.3)',
              color: '#64ffda',
              '&:hover': {
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
                borderColor: '#64ffda',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default InteractiveTimeline; 