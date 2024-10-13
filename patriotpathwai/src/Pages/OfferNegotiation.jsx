import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { useLogoutFunction } from '@propelauth/react';
import { TypeAnimation } from 'react-type-animation';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
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
    const apiKey = import.meta.env.VITE_LAW_PER_API_KEY; // Ensure this is set in your .env file
  
    let systemContent = "";
    switch (activeFeature) {
      case "Career Coach":
        systemContent = "You are a career advisor mostly geared toward giving advice around technology roles. Be direct and concise and don't speak more than you need to. AT MOST 3 short concise sentences.";
        break;
      case "Interview Prep":
        systemContent = "You are helping a person with their interviews. If they ask for behavioral questions, give them a behavioral question like 'Tell me what is your greatest strength'. If they ask for more of a technical question depending on the job they give you, give me a technical question for that role. AT MOST 3 short concise sentences.";
        break;
      case "Offer Negotiation":
        systemContent = "You are a career development advisor and a client has come to you asking for advice on a job offer negotiation. Your job is to tell them what they should ask for in their counter offer. This can be things such as increased cash compensation, increased stock grants (if applicable), more paid time off, and/or remote/hybrid work schedule. Give them pointers on where they could increase their job offer; not all the things mentioned have to be increased. AT MOST 3 short concise sentences.";
        break;
      default:
        systemContent = "You are a career advisor mostly geared toward giving advice around technology roles. Do the best you can to give concise career advice.";
    }
  
    try {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "llama-3.1-sonar-small-128k-online",
          messages: [
            { role: "system", content: systemContent },
            { role: "user", content: userInput }
          ],
          max_tokens: 150,
          temperature: 0.7,
          top_p: 0.9,
          return_citations: true,
          search_domain_filter: ["perplexity.ai"],
          return_images: false,
          return_related_questions: false,
          search_recency_filter: "month",
          top_k: 0,
          stream: false,
          presence_penalty: 0,
          frequency_penalty: 1
        })
      };
  
      const response = await fetch('https://api.perplexity.ai/chat/completions', options);
      const data = await response.json();
  
      if (response.ok) {
        return data.choices[0].message.content.trim();
      } else {
        console.error("Error response data:", data);
        throw new Error("Failed to fetch AI response");
      }
    } catch (error) {
      console.error("Error message:", error.message);
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