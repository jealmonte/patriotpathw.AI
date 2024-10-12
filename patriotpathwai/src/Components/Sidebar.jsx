import React from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { MessageCircle, BriefcaseIcon, UserCheck, FileText, DollarSign, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  { name: 'Career Coach', icon: MessageCircle, path: '/chatpage' },
  { name: 'Job Matching', icon: BriefcaseIcon, path: '/chatpage' },
  { name: 'Interview Prep', icon: UserCheck, path: '/chatpage' },
  { name: 'Offer Negotiation', icon: DollarSign, path: '/chatpage' },
  { name: 'Resume Review', icon: FileText, path: '/uploadresume' },
];

const Sidebar = ({ activeFeature, setActiveFeature, handleSignOut }) => {
  const navigate = useNavigate();

  const handleFeatureClick = (feature) => {
    setActiveFeature(feature.name);
    navigate(feature.path);
  };

  return (
    <Box width={240} bgcolor="background.paper" p={2} display="flex" flexDirection="column">
      <Typography variant="h5" letterSpacing={4} gutterBottom>
        PatriotPath
      </Typography>
      <List>
        {features.map((feature) => (
          <ListItem
            button
            key={feature.name}
            selected={activeFeature === feature.name}
            onClick={() => handleFeatureClick(feature)}
            sx={{ cursor: 'pointer', borderRadius: '10px' }}
          >
            <ListItemIcon>
              <feature.icon />
            </ListItemIcon>
            <ListItemText primary={feature.name} />
          </ListItem>
        ))}
      </List>
      <Button
        startIcon={<LogOut />}
        variant="contained"
        color="secondary"
        style={{ marginTop: "auto" }}
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </Box>
  );
};

export default Sidebar;