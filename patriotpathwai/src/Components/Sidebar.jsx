import React from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { MessageCircle, BriefcaseIcon, UserCheck, FileText, DollarSign, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PPLogo from '../../Images/PP-Logo.png'; // Import your logo

const features = [
  { name: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { name: 'Career Coach', icon: MessageCircle, path: '/chatpage' },
  { name: 'Job Matching', icon: BriefcaseIcon, path: '/job-matching' },
  { name: 'Interview Prep', icon: UserCheck, path: '/interview-prep' },
  { name: 'Offer Negotiation', icon: DollarSign, path: '/offer-negotiation' },
  { name: 'Resume Review', icon: FileText, path: '/uploadresume' },
];

const Sidebar = ({ activeFeature, setActiveFeature, handleSignOut }) => {
  const navigate = useNavigate();

  const handleFeatureClick = (feature) => {
    setActiveFeature(feature.name);
    navigate(feature.path);
  };

  return (
    <Box 
      sx={{ width: 240 }} 
      bgcolor="rgba(0, 0, 0, 0.3)" 
      p={2} 
      display="flex" 
      flexDirection="column"
    >
      <img 
        src={PPLogo} 
        alt="PatriotPath Logo" 
        style={{ cursor: 'pointer', marginBottom: '16px' }} 
        onClick={() => handleFeatureClick(features[0])}
      />
      <List>
        {features.map((feature) => (
          <ListItem
            button
            key={feature.name}
            selected={activeFeature === feature.name}
            onClick={() => handleFeatureClick(feature)}
            sx={{
              cursor: 'pointer',
              borderRadius: '10px',
              marginBottom: 2,
              backgroundColor: '#046A38',
              height: 48,
              '&:hover': {
                backgroundColor: '#FFCC33',
              },
              '& .MuiListItemIcon-root': {
                color: 'white',
              },
            }}
          >
            <ListItemIcon>
              <feature.icon />
            </ListItemIcon>
            <ListItemText 
              primary={feature.name} 
              primaryTypographyProps={{ noWrap: true, color: 'white' }}
              sx={{ marginLeft: '-20px', fontFamily: "Inter"}}
            />
          </ListItem>
        ))}
      </List>
      <Button
        startIcon={<LogOut />}
        variant="contained"
        color="success"
        style={{ marginTop: "auto", fontFamily: "Inter"}}
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </Box>
  );
};

export default Sidebar;
