import { Box, Typography, Paper, Grid, Card, CardContent, CardMedia, Tooltip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';

const Inventory = ({ isVisible, onClose, playerAccessories, accessories }) => {
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        top: 80,
        right: 20,
        width: 300,
        maxHeight: 'calc(100% - 100px)',
        zIndex: 20,
        pointerEvents: 'auto',
      }}
    >
      <Paper
        sx={{
          p: 2,
          backgroundColor: 'rgba(10, 25, 47, 0.9)',
          color: 'white',
          border: '1px solid #64ffda',
          maxHeight: '100%',
          overflow: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#64ffda' }}>
            Inventory
          </Typography>
          <CloseIcon
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              '&:hover': { color: '#64ffda' },
            }}
          />
        </Box>
        
        {playerAccessories.length === 0 ? (
          <Box
            sx={{
              p: 3,
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 1,
            }}
          >
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Your inventory is empty. Complete challenges to collect accessories!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {playerAccessories.map((accessoryId) => {
              const accessory = accessories.find((a) => a.id === accessoryId);
              
              if (!accessory) return null;
              
              return (
                <Grid item xs={6} key={accessory.id}>
                  <Card
                    sx={{
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      border: '1px solid #64ffda',
                      height: '100%',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="100"
                      image={accessory.image}
                      alt={accessory.name}
                      sx={{ objectFit: 'contain', p: 1 }}
                    />
                    <CardContent sx={{ p: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#64ffda' }}>
                          {accessory.name}
                        </Typography>
                        <Tooltip title={accessory.description}>
                          <IconButton size="small" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {accessory.effect}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Paper>
    </motion.div>
  );
};

export default Inventory; 