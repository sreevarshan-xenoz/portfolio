import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const InteractiveSkillChart = () => {
  const theme = useTheme();
  const { prefersReducedMotion } = useReducedMotion();
  const [activeSkill, setActiveSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const chartRef = useRef(null);
  
  // Skills data with percentages
  const skills = [
    { name: 'React', level: 90, color: '#61DAFB' },
    { name: 'Node.js', level: 85, color: '#6CC24A' },
    { name: 'Python', level: 88, color: '#FFD43B' },
    { name: 'DevOps', level: 75, color: '#FF6C6C' },
    { name: 'ML/AI', level: 80, color: '#7B68EE' },
    { name: 'UI/UX', level: 82, color: '#FF8E53' },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Draw the radar chart using SVG
  useEffect(() => {
    if (!chartRef.current) return;
    
    const svg = chartRef.current;
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Clear any existing elements
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // Chart dimensions
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Draw background circles
    for (let i = 1; i <= 4; i++) {
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", centerX);
      circle.setAttribute("cy", centerY);
      circle.setAttribute("r", radius * i / 4);
      circle.setAttribute("fill", "none");
      circle.setAttribute("stroke", theme.palette.divider);
      circle.setAttribute("stroke-width", "1");
      circle.setAttribute("stroke-dasharray", "2,2");
      svg.appendChild(circle);
    }
    
    // Calculate point positions
    const points = skills.map((skill, index) => {
      const angle = (index / skills.length) * Math.PI * 2 - Math.PI / 2;
      const skillRadius = (skill.level / 100) * radius;
      return {
        ...skill,
        x: centerX + Math.cos(angle) * skillRadius,
        y: centerY + Math.sin(angle) * skillRadius,
        labelX: centerX + Math.cos(angle) * (radius + 20),
        labelY: centerY + Math.sin(angle) * (radius + 20),
        angle
      };
    });
    
    // Draw axis lines
    points.forEach(point => {
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", centerX);
      line.setAttribute("y1", centerY);
      line.setAttribute("x2", centerX + Math.cos(point.angle) * radius);
      line.setAttribute("y2", centerY + Math.sin(point.angle) * radius);
      line.setAttribute("stroke", theme.palette.divider);
      line.setAttribute("stroke-width", "1");
      svg.appendChild(line);
    });
    
    // Draw the skill polygon
    const polygon = document.createElementNS(svgNS, "polygon");
    polygon.setAttribute("points", points.map(p => `${p.x},${p.y}`).join(" "));
    polygon.setAttribute("fill", `${theme.palette.primary.main}33`);
    polygon.setAttribute("stroke", theme.palette.primary.main);
    polygon.setAttribute("stroke-width", "2");
    polygon.setAttribute("stroke-linejoin", "round");
    svg.appendChild(polygon);
    
    // Draw the skill points
    points.forEach((point, index) => {
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", point.x);
      circle.setAttribute("cy", point.y);
      circle.setAttribute("r", "6");
      circle.setAttribute("fill", point.color);
      circle.setAttribute("stroke", "#fff");
      circle.setAttribute("stroke-width", "2");
      circle.setAttribute("data-index", index);
      circle.setAttribute("class", "skill-point");
      circle.style.cursor = "pointer";
      
      // Add event listeners
      circle.addEventListener("mouseenter", () => !isMobile && setActiveSkill(point.name));
      circle.addEventListener("mouseleave", () => !isMobile && setActiveSkill(null));
      circle.addEventListener("touchstart", (e) => {
        e.preventDefault();
        setActiveSkill(point.name);
      });
      circle.addEventListener("touchend", () => {
        setTimeout(() => setActiveSkill(null), 2000);
      });
      
      svg.appendChild(circle);
      
      // Add text labels
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", point.labelX);
      text.setAttribute("y", point.labelY);
      text.setAttribute("text-anchor", point.angle > Math.PI / 2 && point.angle < Math.PI * 3 / 2 ? "end" : "start");
      text.setAttribute("dominant-baseline", "central");
      text.setAttribute("fill", activeSkill === point.name ? point.color : theme.palette.text.secondary);
      text.setAttribute("font-size", "12");
      text.setAttribute("font-weight", activeSkill === point.name ? "bold" : "normal");
      text.textContent = point.name;
      svg.appendChild(text);
    });
    
  }, [skills, theme, activeSkill, isMobile]);

  const hintText = isMobile ? "Tap skills to see details" : "Hover over skills to see details";

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      sx={{
        width: '100%',
        maxWidth: '600px',
        height: '500px',
        mx: 'auto',
        mt: 4,
        mb: 6,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h5"
        component="h3"
        sx={{
          mb: 2,
          textAlign: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '3px',
            background: 'linear-gradient(90deg, #64ffda, #7928ca)',
            borderRadius: '2px',
          }
        }}
      >
        Skill Radar
      </Typography>
      
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, textAlign: 'center', fontStyle: 'italic', opacity: 0.7 }}
      >
        {hintText}
      </Typography>
      
      <Box
        component="svg"
        ref={chartRef}
        width="100%"
        height="350px"
        sx={{
          overflow: 'visible',
          mt: 2,
          filter: 'drop-shadow(0 0 10px rgba(100, 255, 218, 0.2))',
        }}
      />
      
      {activeSkill && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(10, 25, 47, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid',
            borderColor: 'primary.main',
            borderRadius: '8px',
            padding: '10px 16px',
            textAlign: 'center',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
            zIndex: 10,
          }}
        >
          <Typography variant="body1" color="primary.main" fontWeight="bold">
            {activeSkill}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {skills.find(s => s.name === activeSkill)?.level}% Proficiency
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default InteractiveSkillChart; 