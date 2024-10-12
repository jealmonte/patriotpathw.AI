import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, IconButton } from '@mui/material';
import Sidebar from '../Components/Sidebar'; // Importing Sidebar component
import { Plus } from 'lucide-react';
import { useLogoutFunction } from '@propelauth/react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
});

const JobMatching = () => {
  const [activeFeature, setActiveFeature] = useState('Resume Review');
  const logout = useLogoutFunction();
  const handleSignOut = async () => {
    await logout(true);
  };

  const handleFileImport = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Imported file:', file.name);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex" height="100vh">
        {/* Using the Sidebar component */}
        <Sidebar 
          activeFeature={activeFeature} 
          setActiveFeature={setActiveFeature} 
          handleSignOut={handleSignOut}
        />

        {/* Main Content */}
        <Box flex={1} display="flex" flexDirection="column">
          <Box bgcolor="background.paper" p={2}>
            <Typography variant="h5">Job Matching</Typography>
          </Box>
          <Box flex={1} display="flex" justifyContent="center" alignItems="center">
            
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default JobMatching;