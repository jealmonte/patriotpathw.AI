import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Typography, TextField, IconButton } from '@mui/material';
import Sidebar from '../Components/Sidebar'; // Importing Sidebar component
import { MessageCircle, Send, Paperclip } from 'lucide-react';
import { useLogoutFunction } from '@propelauth/react';
import { TypeAnimation } from 'react-type-animation';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    success: {
      main: '#046A38'
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

// Define ButtonGrid component
const ButtonGrid = () => {
  const handleButtonClick = (text) => {
    console.log(`Button clicked: ${text}`);
    // Add your button click logic here
  };

  <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
  {[
    { title: "Explore Opportunities", text: "Discover your dream career" },
    { title: "Skill Development", text: "Develop new technical skills" },
    { title: "Career Path Planning", text: "Plan your road map to success" },
  ].map((item) => (
    <Box
      bgcolor="background.paper"
      borderRadius={1}
      p={2}
      key={item.title} // Use item.title as the key
      onClick={() => handleButtonClick(item.title)}
      sx={{ cursor: 'pointer' }}
    >
      <Typography variant="subtitle1">{item.title}</Typography>
      <Typography variant="body2" color="textSecondary">
        {item.text}
      </Typography>
    </Box>
  ))}
</Box>
};

function ChatPage() {
  const [activeFeature, setActiveFeature] = useState('Career Coach');
  const [systemContent, setSystemContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

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

  const fetchAIResponse = async (userInput) => {
    const apiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY; // Ensure this is set in your .env file
    const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT; // Your Azure endpoint

  switch (activeFeature) {
    case 'Career Coach':
      setSystemContent("You are a career advisor mostly geared toward giving advice around technology roles. Be direct and concise and don't speak more then you need to make amount 3 sentences");
      break;
    case 'Interview Prep':
      setSystemContent("You are helping a person with there interviews, if they ask for behavioral questions givem them a behaviorla question like tell me what is your greatest strength, if they asked for more of a technical question depending on the job they give you give me a technical question for that role");
      break;
    case 'Offer Negotiation':
      setSystemContent("You are a career development advisor and a client has come to you asking for advice on a job offer negotiation, you job is to tell them what they should ask for in their counter offer this can be things such as increased cash componesation, increased stock grants(if applicable), more pay time off, and/or remote/hybrid work schdule. Give them pointers one where they could increase their job offer not all the things mentioned have to be increased. Be concise and to the point never respond more than 4 to 5 sentences");
      break;
    default:
     setSystemContent("You are a career advisor mostly geared toward giving advice around technology roles. Do the best you can to give concise career advice");
  }
  
    try {
      const response = await axios.post(
        `${endpoint}`,
        {
          messages: [
            { role: "system", content: systemContent},
            { role: "user", content: userInput }
          ],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey,
          },
        }
      );
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      return 'Sorry, I am unable to process your request at the moment.';
    }
  };

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: userInput }
      ]);
      
      const aiResponse = await fetchAIResponse(userInput);

      // Add AI response to messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: aiResponse }
      ]);

      setUserInput('');
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
            <Typography variant="h5">{activeFeature}</Typography>
          </Box>

          {/* Chat Area */}
          <Container
            component="main"
            flex={1}
            py={2}
            sx={{ marginTop: "20px" }}
          >
            {messages.length === 0 ? (
              <>
                <Box
                  sx={{
                    borderRadius: "25px",
                    background: "#212121",
                    boxShadow:
                      "15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60)",
                    p: 3,
                    mb: 4.5,
                    mt: 4,
                  }}
                >
                  <Box
                    width={64}
                    height={64}
                    bgcolor="#006633"
                    borderRadius="50%"
                    mx="auto"
                    mb={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <MessageCircle size={32} />
                  </Box>
                  <Typography variant="h5" align="center">
                    Where careers begin
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="textSecondary"
                  >
                    Get personalized career advice and guidance.
                  </Typography>
                </Box>

                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={3}
                >
                  {[
                    {
                      title: "Explore Opportunities",
                      text: "Discover your dream career path",
                    },
                    {
                      title: "Skill Development",
                      text: "Develop new and current technical skills",
                    },
                    {
                      title: "Career Path Planning",
                      text: "Plan your road map to career success",
                    },
                  ].map((text) => (
                    <Box
                      sx={{
                        borderRadius: "30px",
                        background: "#212121",
                        boxShadow:
                          "15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60)",
                        p: 2,
                      }}
                      key={text}
                    >
                      <Typography variant="subtitle1" color="#FFC300">
                        {text.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {text.text}.
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </>
            ) : (
              messages.map((msg, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={
                    msg.sender === "user" ? "flex-end" : "flex-start"
                  }
                  mb={2}
                >
                  <Box
                    bgcolor={msg.sender === "user" ? "#FFCC33" : "#006633"}
                    borderRadius={1}
                    p={2}
                    maxWidth="60%"
                  >
                    <Typography variant="body1">
                      {msg.sender === "ai" && index === messages.length - 1 ? (
                        <TypeAnimation
                          sequence={[msg.text]}
                          speed={50}
                          wrapper="span"
                          cursor
                        />
                      ) : (
                        msg.text
                      )}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Container>

          {/* Footer Box */}
          <Box bgcolor="#212121" p={2} mt="auto">
            <Box display="flex" alignItems="center">
              <TextField
                placeholder="Type your message here..."
                fullWidth
                variant="outlined"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                InputProps={{
                  style: { backgroundColor: "#292929", borderRadius: "20px" },
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <label htmlFor="file-import">
                <IconButton
                  component="span"
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                >
                  <Paperclip />
                  <input
                    id="file-import"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileImport}
                  />
                </IconButton>
              </label>
              <IconButton
                color="#006633"
                style={{
                  backgroundColor: "#006633",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onClick={handleSendMessage}
              >
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