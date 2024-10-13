import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Grid, 
  TextField, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  createTheme,
  ThemeProvider,
  AppBar,
  Toolbar,
  CssBaseline
} from '@mui/material';
import { styled } from '@mui/system';
import { 
  MessageSquare, 
  Zap, 
  TrendingUp 
} from 'lucide-react';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import { useLogoutFunction } from '@propelauth/react';

const theme = createTheme({
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
    success: {
      main: "#046A38",
    },
    mode: 'dark',
    primary: {
      main: '#22c55e',
    },
    secondary: {
      main: '#a5f3fc',
    },
    background: {
      default: '#18181b',
      paper: '#27272a',
    },
    text: {
      primary: '#f4f4f5',
      secondary: '#CFFAFE',
    },
  },
});

// Styled components
const GradientCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(45deg, #24905f, #a6e890)`,
  boxShadow: '0px 0px 15px rgba(52, 230, 89, 0.7)',
  margin: '20px',
}));

function OfferNegotiation() {
  const [activeFeature, setActiveFeature] = useState('Offer Negotiation');
  const [systemContent, setSystemContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [salary, setSalary] = useState(() => {
    // Check sessionStorage for existing salary
    const savedSalary = sessionStorage.getItem('userSalary');
    return savedSalary ? parseInt(savedSalary, 10) : null; // Initialize with saved salary or null
  });

  const logout = useLogoutFunction();
  const handleSignOut = async () => {
    await logout(true);
    sessionStorage.removeItem('userSalary'); // Clear the salary on logout
  };

  // Function to generate a random salary
  const generateRandomSalary = () => {
    const min = 72000;
    const max = 86000;
    const randomSalary = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.floor(randomSalary / 100) * 100; // Round to nearest hundred
  };

  useEffect(() => {
    if (salary === null) {
      const newSalary = generateRandomSalary();
      setSalary(newSalary);
      sessionStorage.setItem('userSalary', newSalary); // Save the salary in sessionStorage
    }
  }, [salary]);

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

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: aiResponse },
      ]);

      setUserInput("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#18181b', color: '#f4f4f5' }}>
        <Sidebar
          activeFeature={activeFeature}
          setActiveFeature={setActiveFeature}
          handleSignOut={handleSignOut}
          sx={{ width: '240px' }}
        />

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <AppBar position="static" sx={{ background: '#212121', boxShadow: 'none' }}>
            <Toolbar>
              <Typography marginLeft="-10px" fontWeight="400" variant="h5" sx={{ flexGrow: 1 }}>
                Offer Negotiation AI
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container spacing={3} sx={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Grid item xs={12} md={5}>
              <GradientCard>
                <CardHeader
                  title={<Typography variant="h5" fontWeight="bold" color="#a5f3fc">Salary Analysis</Typography>}
                  subheader={<Typography color="#CFFAFE">AI-powered salary insights based on your profile</Typography>}
                />
                <CardContent>
                  <Box sx={{ height: 160, bgcolor: '#27272a', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#a5f3fc' }}>
                      ${salary}
                    </Typography>
                  </Box>
                </CardContent>
              </GradientCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <GradientCard>
                <CardHeader
                  title={<Typography variant="h5" fontWeight="bold" color="#a5f3fc">Negotiation Tactics</Typography>}
                  subheader={<Typography color="#CFFAFE">AI-suggested strategies for your negotiation</Typography>}
                />
                <CardContent sx={{ maxHeight: 200, overflow: 'auto' }}>
                  <List>
                    {[
                      { icon: <TrendingUp />, text: 'Highlight Your Value' },
                      { icon: <Zap />, text: 'Leverage Market Data' },
                      { icon: <MessageSquare />, text: 'Practice Responses' },
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ bgcolor: '#27272a', mb: 1, borderRadius: 1 }}>
                        <ListItemIcon sx={{ color: '#a5f3fc' }}>{item.icon}</ListItemIcon>
                        <ListItemText primaryTypographyProps={{ color: '#CFFAFE' }} primary={item.text} />
                        <Button size="small" variant="contained" color="#a5f3fc" sx={{ color: '#22c55e' }}>
                          Apply
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </GradientCard>
            </Grid>
            <Grid item xs={11}>
              <GradientCard>
                <CardHeader
                  title={<Typography variant="h5" fontWeight="bold" color="#a5f3fc">Negotiation Assistant</Typography>}
                  subheader={<Typography color="#CFFAFE">Get real-time negotiation advice</Typography>}
                />
                <CardContent>
                  <Box sx={{ height: 240, bgcolor: '#27272a', borderRadius: 1, p: 2, mb: 2, overflow: 'auto' }}>
                    <Typography color="#f4f4f5">
                      AI: How can I assist you with your offer negotiation today?
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Type your message here..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      sx={{ 
                        bgcolor: '#27272a',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#22c55e',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.light',
                          },
                        },
                      }}
                    />
                    <Button variant="contained" color="#22c55e" onClick={handleSendMessage}>
                      Send
                    </Button>
                  </Box>
                </CardContent>
              </GradientCard>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default OfferNegotiation;
