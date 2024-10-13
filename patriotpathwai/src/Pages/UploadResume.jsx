import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import Sidebar from '../Components/Sidebar'; // Importing Sidebar component
import { Plus } from 'lucide-react';
import { useLogoutFunction } from '@propelauth/react';
import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    success: {
      main: '#046A38',
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

function UploadResume() {
  const [activeFeature, setActiveFeature] = useState('Resume Review');
  const logout = useLogoutFunction();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  const handleSignOut = async () => {
    await logout(true);
  };

  const handleFileImport = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('resume', file);
  
      try {
        const response = await fetch('http://127.0.0.1:8000/api/upload-resume/', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error uploading resume:', response.status, errorText);
          return;
        }
  
        const data = await response.json();
        console.log('Uploaded and parsed data:', data); // Log the response data

        // Navigate to ResumeReview with the latest ID
        navigate('/resume-review', { state: { latestId: data.resume_data.id } });

      } catch (error) {
        console.error('Error uploading resume:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };
  

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex" height="100vh">
        <Sidebar 
          activeFeature={activeFeature} 
          setActiveFeature={setActiveFeature} 
          handleSignOut={handleSignOut}
        />
        <Box flex={1} display="flex" flexDirection="column">
          <Box bgcolor="#212121" p={2}>
            <Typography variant="h5">Upload Resume</Typography>
          </Box>
          <Box flex={1} display="flex" justifyContent="center" alignItems="center">
            <label htmlFor="file-import">
              <Box
                width={600}
                height={400}
                border='5px dashed #424242'
                borderRadius={10}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                {isUploading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <IconButton component="span">
                      <Plus size={128} color="#424242" />
                    </IconButton>
                    <Typography variant="h6" align="center">
                      Upload your resume
                    </Typography>
                  </>
                )}
                <input
                  id="file-import"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileImport}
                  accept=".txt,.pdf,.doc,.docx"
                />
              </Box>
            </label>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UploadResume;
