import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { useLogoutFunction } from '@propelauth/react';
import { TypeAnimation } from 'react-type-animation';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  typography: {
    body1: {
      fontFamily: 
      'Inter', // Replace with your desired font
    },
    body2: {
      fontFamily: 
      'Inter', // Replace with your desired font
    },
    caption: {
      fontFamily: 
      'Inter',
    },
    h1: {
      fontFamily: 
      'Inter', // Replace with your desired font
    },
    h2: {
      fontFamily: 
      'Inter', // Replace with your desired font
    },
    h3: {fontFamily: 
      'Inter', // Replace with your desired font
    },
    h4: {fontFamily: 
      'Inter', // Replace with your desired font
    },
    h5: {fontFamily: 
      'Inter', // Replace with your desired font
    },
    h6: {fontFamily: 
      'Inter', // Replace with your desired font
    },
    inherit: {
      fontFamily: 'Inter',
    },
    overline: {
      fontFamily: 'Inter',
    },
    subtitle1: {
      fontFamily: 'Inter',
    },
    subtitle2: {
      fontFamily: 'Inter',
    },
    string: {
      fontFamily: 'Inter',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    success: {
      main: '#046A38',
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

function OfferNegotiation() {
  const [activeFeature, setActiveFeature] = useState('Offer Negotiation');
  const [systemContent, setSystemContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const logout = useLogoutFunction();
  const handleSignOut = async () => {
    await logout(true);
  };

  const fetchAIResponse = async (userInput) => {
    const apiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY; // Ensure this is set in your .env file
    const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT; // Your Azure endpoint

    switch (activeFeature) {
      case "Career Coach":
        setSystemContent(
          "You are a career advisor mostly geared toward giving advice around technology roles. Be direct and concise and don't speak more then you need to. AT MOST 3 short concise sentences"
        );
        break;
      case "Interview Prep":
        setSystemContent(
          "You are helping a person with there interviews, if they ask for behavioral questions givem them a behaviorla question like tell me what is your greatest strength, if they asked for more of a technical question depending on the job they give you give me a technical question for that role. AT MOST 3 short concise sentences"
        );
        break;
      case "Offer Negotiation":
        setSystemContent(
          "You are a career development advisor and a client has come to you asking for advice on a job offer negotiation, you job is to tell them what they should ask for in their counter offer this can be things such as increased cash componesation, increased stock grants(if applicable), more pay time off, and/or remote/hybrid work schdule. Give them pointers one where they could increase their job offer not all the things mentioned have to be increased. AT MOST 3 short concise sentences"
        );
        break;
      default:
        setSystemContent(
          "You are a career advisor mostly geared toward giving advice around technology roles. Do the best you can to give concise career advice"
        );
    }

    try {
      const response = await axios.post(
        `${endpoint}`,
        {
          messages: [
            { role: "system", content: systemContent },
            { role: "user", content: userInput },
          ],
          max_tokens: 50,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      return "Sorry, I am unable to process your request at the moment.";
    }
  };

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: userInput },
      ]);

      const aiResponse = await fetchAIResponse(userInput);

      // Add AI response to messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: aiResponse },
      ]);

      setUserInput("");
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
            <Typography variant="h5">Offer Negotiation AI</Typography>
          </Box>

          <Container component="main" flex={1} py={2} sx={{ marginTop: '20px', overflowY: 'auto', paddingBottom: '30px' }}>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={3}>
              <Card sx={{
              borderRadius: '10px',
              background: 'linear-gradient(45deg, #24905f, #a6e890)', // Change gradient colors to green-yellow
              boxShadow: '0px 0px 15px rgba(52, 230, 89, 0.7)',
            }}>
              <CardContent>
                <Typography variant="h6" color="white">Salary Analysis</Typography>
                <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.7)">AI-powered salary insights</Typography>
                <Typography variant="h4" color="white" mt={1}>$75,000</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              borderRadius: '10px',
              background: 'linear-gradient(45deg, #24905f, #a6e890)', // Change gradient colors to green-yellow
              boxShadow: '0px 0px 15px rgba(52, 230, 89, 0.7)',
            }}>
              <CardContent>
                <Typography variant="h6" color="white">Negotiation Assistant</Typography>
                <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.7)">Get real-time negotiation advice</Typography>
                {/* Add chat component here */}
              </CardContent>
            </Card>
            </Box>
          </Container>

          {/* Footer Box */}
          <Box bgcolor="#212121" p={2} mt="auto">
            {/* Add footer content here */}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default OfferNegotiation;