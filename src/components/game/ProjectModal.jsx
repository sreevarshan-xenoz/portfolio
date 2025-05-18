import { Box, Typography, Paper, Button, Chip, IconButton, Link } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StorageIcon from '@mui/icons-material/Storage';

const ProjectModal = ({ isVisible, onClose, project }) => {
  if (!isVisible || !project) return null;
  
  // Map skill categories to icons
  const getSkillIcon = (skill) => {
    switch (skill.toLowerCase()) {
      case 'react':
      case 'javascript':
      case 'typescript':
      case 'html':
      case 'css':
        return <CodeIcon fontSize="small" />;
      case 'ui/ux':
      case 'design':
      case 'figma':
        return <BrushIcon fontSize="small" />;
      case 'algorithm':
      case 'problem solving':
        return <PsychologyIcon fontSize="small" />;
      case 'database':
      case 'api':
        return <StorageIcon fontSize="small" />;
      default:
        return <CodeIcon fontSize="small" />;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 800,
        zIndex: 20,
        pointerEvents: 'auto',
      }}
    >
      <Paper
        sx={{
          p: 3,
          backgroundColor: 'rgba(10, 25, 47, 0.9)',
          color: 'white',
          border: '1px solid #64ffda',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h4" sx={{ color: '#64ffda' }}>
            {project.name}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: 'white',
              '&:hover': { color: '#64ffda' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
          {/* Project Image */}
          <Box
            sx={{
              width: { xs: '100%', md: '40%' },
              height: 250,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 1,
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={project.image}
              alt={project.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
          
          {/* Project Details */}
          <Box sx={{ width: { xs: '100%', md: '60%' } }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#64ffda' }}>
              Project Description
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {project.description}
            </Typography>
            
            <Typography variant="h6" sx={{ mb: 2, color: '#64ffda' }}>
              Skills Used
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {project.skills.map((skill) => (
                <Chip
                  key={skill}
                  icon={getSkillIcon(skill)}
                  label={skill}
                  sx={{
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                    color: '#64ffda',
                    border: '1px solid #64ffda',
                  }}
                />
              ))}
            </Box>
            
            {project.link && (
              <Button
                variant="contained"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<LaunchIcon />}
                sx={{
                  backgroundColor: '#64ffda',
                  color: '#0a192f',
                  '&:hover': {
                    backgroundColor: '#4cd8b2',
                  },
                }}
              >
                View Project
              </Button>
            )}
          </Box>
        </Box>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Congratulations! You've unlocked this project by completing the challenges in this zone.
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default ProjectModal; 