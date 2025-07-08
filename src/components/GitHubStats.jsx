import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Chip, 
  Skeleton, 
  Button,
  LinearProgress,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  GitHub as GitHubIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Link as LinkIcon,
  Star as StarIcon,
  Visibility as EyeIcon,
  ForkRight as ForkIcon,
  Code as CodeIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

const GitHubStats = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [topLanguages, setTopLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = 'sreevarshan-xenoz';

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch profile data
        const profileResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!profileResponse.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileResponse.json();
        setProfile(profileData);

        // Fetch repositories for stats
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposResponse.json();

        // Calculate stats
        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
        const totalWatchers = reposData.reduce((sum, repo) => sum + repo.watchers_count, 0);
        const publicRepos = reposData.length;
        const totalSize = reposData.reduce((sum, repo) => sum + (repo.size || 0), 0);

        // Calculate top languages
        const languageStats = {};
        reposData.forEach(repo => {
          if (repo.language) {
            languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
          }
        });

        const sortedLanguages = Object.entries(languageStats)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([language, count]) => ({
            language,
            count,
            percentage: Math.round((count / publicRepos) * 100)
          }));

        setTopLanguages(sortedLanguages);
        setStats({
          totalStars,
          totalForks,
          totalWatchers,
          publicRepos,
          totalSize: Math.round(totalSize / 1024) // Convert to MB
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError('Could not load GitHub data. Please try again later.');
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  const StatCard = ({ title, value, icon, color = '#64ffda', subtitle = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
    >
      <Card sx={{ 
        height: '100%',
        backgroundColor: 'rgba(10, 25, 47, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(100, 255, 218, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: color,
          backgroundColor: 'rgba(10, 25, 47, 0.9)',
        }
      }}>
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 2,
            color: color
          }}>
            {icon}
          </Box>
          <Typography variant="h4" component="div" sx={{ 
            fontWeight: 'bold',
            color: color,
            mb: 1
          }}>
            {value}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  const LanguageCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card sx={{ 
        backgroundColor: 'rgba(10, 25, 47, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(100, 255, 218, 0.1)',
      }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, color: 'primary.main' }}>
            Top Languages
          </Typography>
          {topLanguages.map((lang, index) => (
            <Box key={lang.language} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {lang.language}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {lang.percentage}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={lang.percentage}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(90deg, #64ffda, #7928ca)`,
                    borderRadius: 4,
                  }
                }}
              />
            </Box>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Button 
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          sx={{ mt: 2 }}
        >
          View GitHub Profile
        </Button>
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
        GitHub Profile & Stats
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
              <Card sx={{ 
                height: '200px',
                backgroundColor: 'rgba(10, 25, 47, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(100, 255, 218, 0.1)'
              }}>
                <CardContent>
                  <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: 'rgba(100, 255, 218, 0.1)' }} />
                  <Skeleton variant="text" width="60%" height={40} sx={{ bgcolor: 'rgba(100, 255, 218, 0.1)' }} />
                  <Skeleton variant="text" width="40%" height={20} sx={{ bgcolor: 'rgba(100, 255, 218, 0.05)' }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          {/* Profile Section */}
          {profile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card sx={{ 
                mb: 4,
                backgroundColor: 'rgba(10, 25, 47, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(100, 255, 218, 0.1)',
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
                      <Avatar
                        src={profile.avatar_url}
                        alt={profile.name || profile.login}
                        sx={{ 
                          width: 120, 
                          height: 120, 
                          mx: 'auto',
                          border: '3px solid #64ffda',
                          boxShadow: '0 0 20px rgba(100, 255, 218, 0.3)'
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Typography variant="h4" sx={{ mb: 2, color: 'primary.main' }}>
                        {profile.name || profile.login}
                      </Typography>
                      {profile.bio && (
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                          {profile.bio}
                        </Typography>
                      )}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                        {profile.location && (
                          <Chip
                            icon={<LocationIcon />}
                            label={profile.location}
                            size="small"
                            sx={{ backgroundColor: 'rgba(100, 255, 218, 0.1)' }}
                          />
                        )}
                        {profile.company && (
                          <Chip
                            icon={<BusinessIcon />}
                            label={profile.company}
                            size="small"
                            sx={{ backgroundColor: 'rgba(121, 40, 202, 0.1)' }}
                          />
                        )}
                        {profile.blog && (
                          <Chip
                            icon={<LinkIcon />}
                            label="Blog"
                            size="small"
                            component="a"
                            href={profile.blog}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ backgroundColor: 'rgba(100, 255, 218, 0.1)' }}
                          />
                        )}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>{profile.followers}</strong> followers
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>{profile.following}</strong> following
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Member since {new Date(profile.created_at).getFullYear()}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Stats Grid */}
          {stats && (
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total Stars"
                  value={stats.totalStars}
                  icon={<StarIcon sx={{ fontSize: 40 }} />}
                  color="#f7df1e"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total Forks"
                  value={stats.totalForks}
                  icon={<ForkIcon sx={{ fontSize: 40 }} />}
                  color="#64ffda"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Public Repos"
                  value={stats.publicRepos}
                  icon={<CodeIcon sx={{ fontSize: 40 }} />}
                  color="#7928ca"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total Size"
                  value={`${stats.totalSize} MB`}
                  icon={<GitHubIcon sx={{ fontSize: 40 }} />}
                  color="#39ff14"
                />
              </Grid>
            </Grid>
          )}

          {/* Top Languages */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <LanguageCard />
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card sx={{ 
                  height: '100%',
                  backgroundColor: 'rgba(10, 25, 47, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(100, 255, 218, 0.1)',
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 3, color: 'primary.main' }}>
                      GitHub Stats Card
                    </Typography>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <img
                        src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true&bg_color=0a192f&text_color=64ffda&icon_color=64ffda&title_color=64ffda`}
                        alt="GitHub Stats"
                        style={{ 
                          width: '100%', 
                          maxWidth: '400px',
                          borderRadius: '8px'
                        }}
                      />
                    </Box>
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                      <Button
                        variant="outlined"
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<GitHubIcon />}
                        sx={{ 
                          borderRadius: '8px',
                          borderWidth: '2px',
                          '&:hover': {
                            borderWidth: '2px',
                            backgroundColor: 'rgba(100, 255, 218, 0.1)',
                          }
                        }}
                      >
                        View Full Profile
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default GitHubStats; 