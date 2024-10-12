import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Typography, TextField, IconButton } from '@mui/material';
import Sidebar from '../Components/Sidebar'; // Importing Sidebar component
import { MessageCircle, Send, Paperclip } from 'lucide-react';
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

function ChatPage() {
  const [activeFeature, setActiveFeature] = useState('Career Coach');
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
            <Typography variant="h5">{activeFeature}</Typography>
          </Box>
          <Container component="main" flex={1} py={2}>
            <Box bgcolor="background.paper" borderRadius={1} p={3} mb={2} mt={4}>
              <Box
                width={64}
                height={64}
                bgcolor="primary.main"
                borderRadius="50%"
                mx="auto"
                mb={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <MessageCircle size={32} />
              </Box>
              <Typography variant="h6" align="center">
                Where careers begin
              </Typography>
              <Typography variant="body2" align="center" color="textSecondary">
                Get personalized career advice and guidance.
              </Typography>
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
              {[
                "Explore Opportunities",
                "Skill Development",
                "Career Path Planning",
              ].map((text) => (
                <Box
                  bgcolor="background.paper"
                  borderRadius={1}
                  p={2}
                  key={text}
                >
                  <Typography variant="subtitle1">{text}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Description about {text.toLowerCase()}.
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>

          {/* Footer Box */}
          <Box bgcolor="background.paper" p={2} mt="auto">
            <Box display="flex" alignItems="center">
              <TextField
                placeholder="Type your message here..."
                fullWidth
                variant="outlined"
                InputProps={{
                  style: { backgroundColor: "#424242", borderRadius: "20px" },
                }}
              />
              <label htmlFor="file-import">
                <IconButton component="span">
                  <Paperclip />
                  <input
                    id="file-import"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileImport}
                  />
                </IconButton>
              </label>
              <IconButton color="primary">
                <Send />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ChatPage;