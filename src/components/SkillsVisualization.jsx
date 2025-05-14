import { useState } from 'react';
import { Box, Typography, Paper, useTheme, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillsVisualization = () => {
  const theme = useTheme();
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Skill categories and levels
  const skillsData = [
    { category: 'Programming', skills: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript/TypeScript', level: 85 },
      { name: 'C/C++', level: 70 },
      { name: 'Rust', level: 60 },
      { name: 'Go', level: 65 },
    ]},
    { category: 'Web Development', skills: [
      { name: 'React', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Next.js', level: 80 },
      { name: 'Express', level: 75 },
    ]},
    { category: 'Security', skills: [
      { name: 'Ethical Hacking', level: 85 },
      { name: 'Network Security', level: 80 },
      { name: 'Penetration Testing', level: 75 },
      { name: 'Security Analysis', level: 70 },
      { name: 'Cryptography', level: 65 },
    ]},
    { category: 'AI & ML', skills: [
      { name: 'Machine Learning', level: 80 },
      { name: 'Natural Language Processing', level: 75 },
      { name: 'Computer Vision', level: 70 },
      { name: 'Deep Learning', level: 75 },
      { name: 'Data Science', level: 70 },
    ]},
    { category: 'DevOps', skills: [
      { name: 'Docker', level: 80 },
      { name: 'Kubernetes', level: 70 },
      { name: 'CI/CD', level: 75 },
      { name: 'AWS/Cloud', level: 80 },
      { name: 'Linux', level: 90 },
    ]},
  ];

  // Radar chart data
  const chartData = {
    labels: ['Programming', 'Web Development', 'Security', 'AI & ML', 'DevOps'],
    datasets: [
      {
        label: 'Skills Proficiency',
        data: [90, 85, 80, 75, 80],
        backgroundColor: 'rgba(100, 255, 218, 0.2)',
        borderColor: '#64ffda',
        borderWidth: 2,
        pointBackgroundColor: '#64ffda',
        pointBorderColor: '#112240',
        pointHoverBackgroundColor: '#7928ca',
        pointHoverBorderColor: '#64ffda',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(137, 147, 180, 0.2)',
        },
        grid: {
          color: 'rgba(137, 147, 180, 0.2)',
        },
        pointLabels: {
          color: theme.palette.text.primary,
          font: {
            size: 14,
            family: theme.typography.fontFamily,
          },
        },
        ticks: {
          backdropColor: 'transparent',
          color: theme.palette.text.secondary,
          z: 100,
          font: {
            size: 10,
          },
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.primary.main,
        bodyColor: theme.palette.text.primary,
        borderColor: theme.palette.primary.main,
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            return `Proficiency: ${context.raw}%`;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      backgroundColor: 'rgba(100, 255, 218, 0.1)',
      transition: { duration: 0.3 }
    }
  };

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: { 
        duration: 1.2,
        ease: "easeOut" 
      }
    })
  };

  return (
    <Box component={motion.div} 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ mb: 8 }}
    >
      <Typography 
        variant="h4" 
        component="h2"
        sx={{ 
          mb: 4,
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
        Technical Skills
      </Typography>

      <Grid container spacing={4}>
        {/* Radar Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            component={motion.div}
            whileHover={{ 
              boxShadow: '0 10px 30px -15px rgba(100, 255, 218, 0.3)', 
              translateY: -5 
            }}
            sx={{
              p: 3,
              height: '400px',
              backgroundColor: 'rgba(17, 34, 64, 0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px',
              boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(100, 255, 218, 0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography 
              variant="h6" 
              component="h3" 
              align="center"
              sx={{ 
                mb: 2,
                color: '#64ffda'
              }}
            >
              Skills Proficiency Radar
            </Typography>
            <Box sx={{ height: '330px', position: 'relative' }}>
              <Radar data={chartData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Skills Lists */}
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{
              p: 3,
              backgroundColor: 'rgba(17, 34, 64, 0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px',
              boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(100, 255, 218, 0.1)',
              maxHeight: '400px',
              overflow: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
            }}
          >
            {skillsData.map((skillGroup, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography 
                  variant="h6" 
                  component="h3"
                  sx={{ 
                    mb: 2, 
                    color: '#64ffda',
                    borderBottom: '1px solid rgba(100, 255, 218, 0.3)',
                    pb: 0.5
                  }}
                >
                  {skillGroup.category}
                </Typography>
                <Box>
                  {skillGroup.skills.map((skill, i) => (
                    <Box 
                      component={motion.div}
                      key={i} 
                      variants={itemVariants}
                      whileHover="hover"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      sx={{ 
                        mb: 1.5,
                        p: 1,
                        borderRadius: '4px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body1">{skill.name}</Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: hoveredSkill === skill.name ? '#64ffda' : theme.palette.text.secondary
                          }}
                        >
                          {skill.level}%
                        </Typography>
                      </Box>
                      <Box 
                        sx={{ 
                          width: '100%', 
                          height: '6px', 
                          backgroundColor: 'rgba(137, 147, 180, 0.2)',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}
                      >
                        <Box 
                          component={motion.div}
                          variants={skillBarVariants}
                          custom={skill.level}
                          initial="hidden"
                          animate="visible"
                          sx={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #64ffda, #7928ca)',
                            borderRadius: '3px',
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SkillsVisualization; 