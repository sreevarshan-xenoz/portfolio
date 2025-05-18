import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Divider,
  useTheme,
  Grid,
  Card,
  CardActionArea,
  CardContent
} from '@mui/material';
import { motion } from 'framer-motion';
import SelfModifyingPortfolio from '../components/SelfModifyingPortfolio';
import '../styles/ExperimentalPortfolioEffects.css';

// Theme-based card hover/active styles
const cardThemeStyles = {
  'self-modifying': {
    hover: { boxShadow: '0 0 24px 4px #64ffda55', borderColor: '#64ffda', scale: 1.04 },
    active: { borderColor: '#64ffda', boxShadow: '0 0 32px 8px #64ffda33', scale: 1.06 },
  },
  'ai-collaborator': {
    hover: { boxShadow: '0 0 24px 4px #7928ca55', borderColor: '#7928ca', rotate: 1, scale: 1.03 },
    active: { borderColor: '#7928ca', boxShadow: '0 0 32px 8px #7928ca33', rotate: 2, scale: 1.05 },
  },
  'data-driven': {
    hover: { boxShadow: '0 0 24px 4px #00d1b255', borderColor: '#00d1b2', scale: 1.04 },
    active: { borderColor: '#00d1b2', boxShadow: '0 0 32px 8px #00d1b233', scale: 1.06 },
  },
  'choose-career': {
    hover: { boxShadow: '0 0 24px 4px #ffec0055', borderColor: '#ffec00', scale: 1.04, rotate: -1 },
    active: { borderColor: '#ffec00', boxShadow: '0 0 32px 8px #ffec0033', scale: 1.07, rotate: -2 },
  },
  'data-vortex': {
    hover: { boxShadow: '0 0 24px 4px #39ff1455', borderColor: '#39ff14', scale: 1.04, rotate: 1 },
    active: { borderColor: '#39ff14', boxShadow: '0 0 32px 8px #39ff1433', scale: 1.08, rotate: 2 },
  },
  'glitch-ethicist': {
    hover: { boxShadow: '0 0 24px 4px #ff206e55', borderColor: '#ff206e', scale: 1.04, rotate: 1 },
    active: { borderColor: '#ff206e', boxShadow: '0 0 32px 8px #ff206e33', scale: 1.08, rotate: -2 },
  },
  'living-archive': {
    hover: { boxShadow: '0 0 24px 4px #a18cd155', borderColor: '#a18cd1', scale: 1.03 },
    active: { borderColor: '#a18cd1', boxShadow: '0 0 32px 8px #a18cd133', scale: 1.06 },
  },
  'infinite-scroll': {
    hover: { boxShadow: '0 0 24px 4px #00fff755', borderColor: '#00fff7', scale: 1.04, rotate: -1 },
    active: { borderColor: '#00fff7', boxShadow: '0 0 32px 8px #00fff733', scale: 1.08, rotate: 2 },
  },
  'rogue-algorithm': {
    hover: { boxShadow: '0 0 24px 4px #ff00c855', borderColor: '#ff00c8', scale: 1.04, rotate: 2 },
    active: { borderColor: '#ff00c8', boxShadow: '0 0 32px 8px #ff00c833', scale: 1.09, rotate: -2 },
  },
  'social-mirror': {
    hover: { boxShadow: '0 0 24px 4px #00d1b255', borderColor: '#00d1b2', scale: 1.04 },
    active: { borderColor: '#00d1b2', boxShadow: '0 0 32px 8px #00d1b233', scale: 1.06 },
  },
  'rogue-archive': {
    hover: { boxShadow: '0 0 24px 4px #ff386055', borderColor: '#ff3860', scale: 1.04, rotate: -1 },
    active: { borderColor: '#ff3860', boxShadow: '0 0 32px 8px #ff386033', scale: 1.08, rotate: 2 },
  },
  'sentient-404': {
    hover: { boxShadow: '0 0 24px 4px #ff64b455', borderColor: '#ff64b4', scale: 1.04 },
    active: { borderColor: '#ff64b4', boxShadow: '0 0 32px 8px #ff64b433', scale: 1.06 },
  },
  'burnout-simulator': {
    hover: { boxShadow: '0 0 24px 4px #f7258555', borderColor: '#f72585', scale: 1.04, rotate: 1 },
    active: { borderColor: '#f72585', boxShadow: '0 0 32px 8px #f7258533', scale: 1.08, rotate: -2 },
  },
  'zero-trust': {
    hover: { boxShadow: '0 0 24px 4px #ffec0055', borderColor: '#ffec00', scale: 1.04, rotate: -1 },
    active: { borderColor: '#ffec00', boxShadow: '0 0 32px 8px #ffec0033', scale: 1.08, rotate: 2 },
  },
};

// Data-driven experiments list
const experiments = [
  {
    key: 'self-modifying',
    title: 'The Self-Modifying Portfolio',
    description: 'A website that rewrites its own code in real time based on user behavior, trends, or cosmic radiation.',
    render: () => <SelfModifyingPortfolio />,
  },
  {
    key: 'ai-collaborator',
    title: 'The AI Collaborator Portfolio',
    description: 'A portfolio co-created by you and an AI art bot, where both contributions are indistinguishable.',
    render: () => <ComingSoon title="The AI Collaborator Portfolio" />,
  },
  {
    key: 'data-driven',
    title: 'The Data-Driven Identity Portfolio',
    description: 'Your identity and projects shift based on live global data streams (e.g., stock markets, climate, or social media trends).',
    render: () => <ComingSoon title="The Data-Driven Identity Portfolio" />,
  },
  // New experiments from user
  {
    key: 'choose-career',
    title: 'The Choose-Your-Own-Career Portfolio',
    description: 'A branching narrative where visitors roleplay as you, making career decisions that reshape your portfolio.',
    render: () => <ComingSoon title="The Choose-Your-Own-Career Portfolio" />,
  },
  {
    key: 'data-vortex',
    title: 'The Data Vortex Portfolio',
    description: 'Your projects are visualized as dynamic data streams swirling around a central black hole.',
    render: () => <ComingSoon title="The Data Vortex Portfolio" />,
  },
  {
    key: 'glitch-ethicist',
    title: 'The Glitch Ethicist Portfolio',
    description: 'A moral dilemma generator that challenges visitors to fix broken projects with ethical trade-offs.',
    render: () => <ComingSoon title="The Glitch Ethicist Portfolio" />,
  },
  {
    key: 'living-archive',
    title: 'The Living Archive Portfolio',
    description: 'A self-updating museum that curates your work like a historical artifact.',
    render: () => <ComingSoon title="The Living Archive Portfolio" />,
  },
  {
    key: 'infinite-scroll',
    title: 'The Infinite Scroll Paradox',
    description: 'A portfolio that breaks the scrollbar by blending projects into an endless, looping timeline.',
    render: () => <ComingSoon title="The Infinite Scroll Paradox" />,
  },
  {
    key: 'rogue-algorithm',
    title: 'The Rogue Algorithm Portfolio',
    description: 'A rogue AI has hijacked your portfolio, remixing your work into absurd new forms.',
    render: () => <ComingSoon title="The Rogue Algorithm Portfolio" />,
  },
  {
    key: 'social-mirror',
    title: 'The Social Mirror Portfolio',
    description: "Your portfolio reflects the visitor's digital identity, using public data (no tracking).",
    render: () => <ComingSoon title="The Social Mirror Portfolio" />,
  },
  {
    key: 'rogue-archive',
    title: 'The Rogue Archive Portfolio',
    description: 'A leaked file server where visitors snoop through unlisted projects, drafts, and deleted work.',
    render: () => <ComingSoon title="The Rogue Archive Portfolio" />,
  },
  {
    key: 'sentient-404',
    title: 'The Sentient 404 Portfolio',
    description: 'Every broken link leads to a self-aware error page that evolves over time.',
    render: () => <ComingSoon title="The Sentient 404 Portfolio" />,
  },
  {
    key: 'burnout-simulator',
    title: 'The Burnout Simulator Portfolio',
    description: 'A darkly humorous game where players experience the life of a creative professional.',
    render: () => <ComingSoon title="The Burnout Simulator Portfolio" />,
  },
  {
    key: 'zero-trust',
    title: 'The Zero-Trust Portfolio',
    description: 'Prove your worth by hacking your own portfolio.',
    render: () => <ComingSoon title="The Zero-Trust Portfolio" />,
  },
];

function ComingSoon({ title }) {
  const theme = useTheme();
  return (
    <Paper elevation={3} sx={{ p: 4, textAlign: 'center', backgroundColor: theme.palette.background.paper, minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1">
        This experiment is currently being developed.<br />Check back soon to see this concept in action!
      </Typography>
    </Paper>
  );
}

// Helper: get special hover effect for a card
function getCardHoverEffect(exp) {
  const key = exp.key.toLowerCase();
  const title = exp.title.toLowerCase();
  if (key.includes('glitch') || title.includes('glitch')) {
    return {
      motion: { scale: 1.05, rotate: [0, 1, -1, 0], transition: { repeat: Infinity, duration: 0.4, repeatType: 'reverse' } },
      className: 'glitch-hover',
    };
  }
  if (key.includes('matrix') || title.includes('matrix')) {
    return {
      motion: { scale: 1.04 },
      className: 'matrix-hover',
    };
  }
  if (key.includes('retro') || title.includes('retro')) {
    return {
      motion: { scale: 1.04 },
      className: 'retro-hover',
    };
  }
  if (key.includes('rogue')) {
    return {
      motion: { scale: 1.04, rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 0.5, repeatType: 'reverse' } },
      className: 'rogue-hover',
    };
  }
  if (key.includes('burnout')) {
    return {
      motion: { scale: 1.04, y: [0, -4, 0], transition: { repeat: Infinity, duration: 0.5, repeatType: 'reverse' } },
      className: 'burnout-hover',
    };
  }
  return { motion: cardThemeStyles[exp.key]?.hover || { scale: 1.03 }, className: '' };
}

const ExperimentalPortfolio = () => {
  const theme = useTheme();
  const [activeKey, setActiveKey] = useState(experiments[0].key);
  const [hoveredKey, setHoveredKey] = useState(null);
  const activeExperiment = experiments.find(e => e.key === activeKey);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
        <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.primary.main, textAlign: 'center' }}>
          Experimental Portfolio Concepts
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mb: 6, color: theme.palette.text.secondary, textAlign: 'center' }}>
          Exploring the future of portfolio design
        </Typography>
        <Divider sx={{ mb: 4 }} />
        {/* Experiments grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {experiments.map(exp => {
            const themeStyle = cardThemeStyles[exp.key] || {};
            const isActive = activeKey === exp.key;
            const isHovered = hoveredKey === exp.key;
            const { motion: hoverMotion, className } = getCardHoverEffect(exp);
            return (
              <Grid item xs={12} sm={6} md={4} key={exp.key}>
                <motion.div
                  whileHover={hoverMotion}
                  whileTap={themeStyle.active}
                  animate={isActive ? themeStyle.active : { scale: 1 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    elevation={isActive ? 8 : 2}
                    className={isHovered ? className : ''}
                    sx={{
                      border: isActive ? `2px solid ${themeStyle.active?.borderColor || theme.palette.primary.main}` : '2px solid transparent',
                      boxShadow: isActive ? themeStyle.active?.boxShadow : undefined,
                      transition: 'all 0.2s',
                      background: isActive ? 'rgba(100,255,218,0.04)' : theme.palette.background.paper,
                      cursor: 'pointer',
                      minHeight: 160,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'stretch',
                    }}
                    onMouseEnter={() => setHoveredKey(exp.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                  >
                    <CardActionArea onClick={() => setActiveKey(exp.key)} sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: isActive ? themeStyle.active?.borderColor || theme.palette.primary.main : theme.palette.secondary.main, mb: 1 }}>
                          {exp.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {exp.description.length > 100 ? exp.description.slice(0, 97) + '...' : exp.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
        {/* Selected experiment details */}
        <Box sx={{ mb: 3, textAlign: 'center', color: theme.palette.text.secondary, fontStyle: 'italic', fontSize: '1.1rem' }}>
          {activeExperiment.description}
        </Box>
        <Box sx={{ mt: 2 }}>{activeExperiment.render()}</Box>
      </motion.div>
    </Container>
  );
};

export default ExperimentalPortfolio; 