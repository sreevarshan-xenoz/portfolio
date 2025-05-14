import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Chip, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

const GitHubIntegration = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = 'sreevarshan-xenoz';

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        
        const data = await response.json();
        setRepos(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub repos:', err);
        setError('Could not load GitHub repositories. Please try again later.');
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { 
      y: -10, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)", 
      transition: { type: "spring", stiffness: 300 } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Check out my GitHub profile directly: 
          <Button 
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ml: 1 }}
          >
            @{username}
          </Button>
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="section" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 4,
          textAlign: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            background: 'linear-gradient(90deg, #64ffda, #7928ca)',
            borderRadius: '2px',
          }
        }}
      >
        GitHub Repositories
      </Typography>

      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Button
          variant="outlined"
          color="primary"
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            mb: 3,
            borderRadius: '8px',
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
              backgroundColor: 'rgba(100, 255, 218, 0.1)',
            }
          }}
        >
          View All Repositories
        </Button>
      </Box>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {loading ? (
            // Loading skeletons
            Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
                <Card sx={{ 
                  height: '100%',
                  backgroundColor: 'rgba(10, 25, 47, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(100, 255, 218, 0.1)'
                }}>
                  <CardContent>
                    <Skeleton variant="text" width="80%" height={30} sx={{ bgcolor: 'rgba(100, 255, 218, 0.1)' }} />
                    <Skeleton variant="text" width="100%" height={20} sx={{ bgcolor: 'rgba(100, 255, 218, 0.05)' }} />
                    <Skeleton variant="text" width="90%" height={20} sx={{ bgcolor: 'rgba(100, 255, 218, 0.05)' }} />
                    <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 2, bgcolor: 'rgba(100, 255, 218, 0.05)' }} />
                  </CardContent>
                  <CardActions>
                    <Skeleton variant="rectangular" width={100} height={36} sx={{ bgcolor: 'rgba(100, 255, 218, 0.1)' }} />
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            repos.map(repo => (
              <Grid item xs={12} sm={6} md={4} key={repo.id}>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    backgroundColor: 'rgba(10, 25, 47, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(100, 255, 218, 0.1)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'rgba(10, 25, 47, 0.9)',
                    }
                  }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3" gutterBottom 
                        sx={{ 
                          color: 'primary.main',
                          fontWeight: 'bold',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {repo.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '3em', overflow: 'hidden' }}>
                        {repo.description || 'No description provided'}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {repo.language && (
                          <Chip 
                            size="small"
                            label={repo.language}
                            sx={{ 
                              backgroundColor: repo.language === 'Python' ? '#306998' : 
                                             repo.language === 'JavaScript' ? '#f7df1e' : 
                                             repo.language === 'TypeScript' ? '#007acc' :
                                             repo.language === 'C' ? '#555555' :
                                             repo.language === 'Rust' ? '#dea584' :
                                             'rgba(100, 255, 218, 0.1)',
                              color: repo.language === 'JavaScript' ? '#000' : '#fff',
                              fontSize: '0.7rem'
                            }}
                          />
                        )}
                        {repo.topics && repo.topics.slice(0, 3).map(topic => (
                          <Chip 
                            key={topic}
                            size="small"
                            label={topic}
                            sx={{ fontSize: '0.7rem', backgroundColor: 'rgba(121, 40, 202, 0.2)' }}
                          />
                        ))}
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
                              ⭐
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {repo.stargazers_count}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
                              🍴
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {repo.forks_count}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          Updated: {new Date(repo.updated_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'rgba(100, 255, 218, 0.1)',
                          }
                        }}
                      >
                        View Repo
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))
          )}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default GitHubIntegration; 