import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import FlipCard3D from './FlipCard3D';
import CodeTypeWriter from './CodeTypeWriter';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import BrushIcon from '@mui/icons-material/Brush';
import LayersIcon from '@mui/icons-material/Layers';

const InteractiveElements = () => {
  const theme = useTheme();
  
  return (
    <Container 
      component={motion.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      sx={{ 
        py: 8,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: 2,
          position: 'relative',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #64ffda 30%, #7928ca 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
        }}
      >
        My Expertise
      </Typography>
      
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 8, maxWidth: '700px', mx: 'auto' }}
      >
        A glimpse into my technical skills and areas of expertise. Interact with the elements below to learn more.
      </Typography>
      
      {/* Interactive Code Sample */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        sx={{ 
          position: 'relative',
          mb: 14,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '5px',
            background: 'linear-gradient(90deg, #64ffda, #7928ca)',
            borderRadius: '4px',
            zIndex: 1,
          }
        }}
      >
        <CodeTypeWriter title="How I Code" />
      </Box>
      
      {/* Flip Cards Section */}
      <Typography
        variant="h4"
        component="h3"
        sx={{
          mt: 6,
          mb: 6,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            background: 'linear-gradient(90deg, #64ffda, #7928ca)',
            borderRadius: '2px',
          }
        }}
      >
        Areas of Expertise
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {/* Flip Card 1: Frontend */}
        <Grid item xs={12} sm={6} md={3}>
          <FlipCard3D
            title="Frontend"
            icon={<CodeIcon />}
            color="#64ffda"
            frontContent={
              <Box>
                <Box
                  component="img"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                  alt="React"
                  sx={{ width: '80px', mb: 2, filter: 'drop-shadow(0 0 10px rgba(100, 255, 218, 0.5))' }}
                />
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Modern UI development with React & MUI
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Click for details
                </Typography>
              </Box>
            }
            backContent={
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'left' }}>
                  Specialize in building responsive, high-performance user interfaces with modern frameworks and libraries:
                </Typography>
                <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
                  <li>React.js / Next.js</li>
                  <li>Framer Motion animations</li>
                  <li>Material UI / Tailwind CSS</li>
                  <li>Responsive & mobile-first design</li>
                  <li>TypeScript & JavaScript</li>
                  <li>State management (Redux, Context)</li>
                </ul>
              </Box>
            }
          />
        </Grid>
        
        {/* Flip Card 2: Backend */}
        <Grid item xs={12} sm={6} md={3}>
          <FlipCard3D
            title="Backend"
            icon={<StorageIcon />}
            color="#7928ca"
            frontContent={
              <Box>
                <Box
                  component="img"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                  alt="Node.js"
                  sx={{ width: '80px', mb: 2, filter: 'drop-shadow(0 0 10px rgba(121, 40, 202, 0.5))' }}
                />
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Robust API development & server architecture
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Click for details
                </Typography>
              </Box>
            }
            backContent={
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'left' }}>
                  Develop secure, scalable, and efficient backend systems:
                </Typography>
                <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
                  <li>Node.js / Express</li>
                  <li>RESTful API design</li>
                  <li>MongoDB / PostgreSQL</li>
                  <li>Authentication & authorization</li>
                  <li>Microservices architecture</li>
                  <li>AWS / Firebase deployment</li>
                </ul>
              </Box>
            }
          />
        </Grid>
        
        {/* Flip Card 3: Design */}
        <Grid item xs={12} sm={6} md={3}>
          <FlipCard3D
            title="Design"
            icon={<BrushIcon />}
            color="#ff64b4"
            frontContent={
              <Box>
                <Box
                  component="img"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
                  alt="Figma"
                  sx={{ width: '80px', mb: 2, filter: 'drop-shadow(0 0 10px rgba(255, 100, 180, 0.5))' }}
                />
                <Typography variant="body1" sx={{ mb: 2 }}>
                  UI/UX design with focus on user experience
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Click for details
                </Typography>
              </Box>
            }
            backContent={
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'left' }}>
                  Create visually stunning and user-friendly interfaces:
                </Typography>
                <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
                  <li>UI/UX design principles</li>
                  <li>Figma / Adobe XD</li>
                  <li>Design systems & components</li>
                  <li>Animation & micro-interactions</li>
                  <li>Accessibility optimization</li>
                  <li>User research & testing</li>
                </ul>
              </Box>
            }
          />
        </Grid>
        
        {/* Flip Card 4: DevOps */}
        <Grid item xs={12} sm={6} md={3}>
          <FlipCard3D
            title="DevOps"
            icon={<LayersIcon />}
            color="#64ff8d"
            frontContent={
              <Box>
                <Box
                  component="img"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
                  alt="Docker"
                  sx={{ width: '80px', mb: 2, filter: 'drop-shadow(0 0 10px rgba(100, 255, 141, 0.5))' }}
                />
                <Typography variant="body1" sx={{ mb: 2 }}>
                  CI/CD pipelines & container management
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Click for details
                </Typography>
              </Box>
            }
            backContent={
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'left' }}>
                  Implement DevOps best practices for efficient development:
                </Typography>
                <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
                  <li>Docker & containerization</li>
                  <li>CI/CD pipeline setup</li>
                  <li>AWS / Google Cloud / Azure</li>
                  <li>Monitoring & logging</li>
                  <li>Infrastructure as Code</li>
                  <li>Performance optimization</li>
                </ul>
              </Box>
            }
          />
        </Grid>
      </Grid>
      
    </Container>
  );
};

export default InteractiveElements; 