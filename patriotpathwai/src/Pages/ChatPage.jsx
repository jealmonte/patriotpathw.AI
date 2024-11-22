import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import Sidebar from "../Components/Sidebar"; // Importing Sidebar component
import { MessageCircle, Send, Paperclip } from "lucide-react";
import { useLogoutFunction } from "@propelauth/react";
import { TypeAnimation } from "react-type-animation";
import BackgroundAnimation from "../Components/BackgroundAnimation";
import { styled } from "@mui/system";


const darkTheme = createTheme({
  typography: {
    body1: {
      fontFamily: "Inter", // Replace with your desired font
    },
    body2: {
      fontFamily: "Inter", // Replace with your desired font
    },
    caption: {
      fontFamily: "Inter",
    },
    h1: {
      fontFamily: "Inter", // Replace with your desired font
    },
    h2: {
      fontFamily: "Inter", // Replace with your desired font
    },
    h3: {
      fontFamily: "Inter", // Replace with your desired font
    },
    h4: {
      fontFamily: "Inter", // Replace with your desired font
    },
    h5: {
      fontFamily: "Inter", // Replace with your desired font
    },
    h6: {
      fontFamily: "Inter", // Replace with your desired font
    },
    inherit: {
      fontFamily: "Inter",
    },
    overline: {
      fontFamily: "Inter",
    },
    subtitle1: {
      fontFamily: "Inter",
    },
    subtitle2: {
      fontFamily: "Inter",
    },
    string: {
      fontFamily: "Inter",
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    success: {
      main: "#046A38",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#303030",
      paper: "#424242",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
});

const GradientBackground = styled(Box)({
  background: "linear-gradient(to bottom, #a5f3fc, #0a0a0a)",
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
        sx={{ cursor: "pointer" }}
      >
        <Typography variant="subtitle1">{item.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {item.text}
        </Typography>
      </Box>
    ))}
  </Box>;
};

function ChatPage() {
  const [activeFeature, setActiveFeature] = useState("Career Coach");
  const [systemContent, setSystemContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const logout = useLogoutFunction();
  const handleSignOut = async () => {
    await logout(true);
  };

  const handleFileImport = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Imported file:", file.name);
    }
  };

  const fetchAIResponse = async (userInput) => {
    const apiKey = import.meta.env.VITE_LAW_PER_API_KEY;

    let systemContent = "";
    switch (activeFeature) {
      case "Career Coach":
        systemContent =
          "You are a career advisor mostly geared toward giving advice around technology roles. Be direct and concise and don't speak more than you need to. AT MOST 3 short concise sentences.";
        break;
      case "Interview Prep":
        systemContent =
          "You are helping a person with their interviews. If they ask for behavioral questions, give them a behavioral question like 'Tell me what is your greatest strength'. If they ask for more of a technical question depending on the job they give you, give me a technical question for that role. AT MOST 3 short concise sentences.";
        break;
      case "Offer Negotiation":
        systemContent =
          "You are a career development advisor and a client has come to you asking for advice on a job offer negotiation. Your job is to tell them what they should ask for in their counter offer. This can be things such as increased cash compensation, increased stock grants (if applicable), more paid time off, and/or remote/hybrid work schedule. Give them pointers on where they could increase their job offer; not all the things mentioned have to be increased. AT MOST 3 short concise sentences.";
        break;
      default:
        systemContent =
          "You are a career advisor mostly geared toward giving advice around technology roles. Do the best you can to give concise career advice.";
    }

    try {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-sonar-large-128k-chat",
          messages: [
            { role: "system", content: systemContent },
            { role: "user", content: userInput },
          ],
          max_tokens: 70,
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
          frequency_penalty: 1,
        }),
      };

      const response = await fetch(
        "https://api.perplexity.ai/chat/completions",
        options
      );
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

  const handleSendMessage = async (message) => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: message },
      ]);
  
      const aiResponse = await fetchAIResponse(message);
  
      // Add AI response to messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: aiResponse },
      ]);
  
      setUserInput(""); // This line may be unnecessary if you're not using userInput here
    }
  };

  return (
    <GradientBackground>
      <Box zIndex={100000}>
        <ThemeProvider theme={darkTheme}>
          <BackgroundAnimation />
          <CssBaseline />
          <Box display="flex" height="100vh">
            <Sidebar
              activeFeature={activeFeature}
              setActiveFeature={setActiveFeature}
              handleSignOut={handleSignOut}
            />

            <Box flex={1} display="flex" flexDirection="column">
              <Box bgcolor="rgba(0, 0, 0, 0.3)" p={2}>
                <Typography variant="h5">{activeFeature}</Typography>
              </Box>

              {/* Chat Area */}
              <Container
                component="main"
                flex={1}
                py={2}
                sx={{
                  marginTop: "20px",
                  overflowY: "auto",
                  paddingBottom: "30px",
                }}
              >
                {messages.length === 0 ? (
                  <>
                    <Box
                      sx={{
                        borderRadius: "25px",
                        background: "#212121",
                        boxShadow:
                          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
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
                      message: "Give me a step by step guide on exploring my dream career path in technology",
                    },
                    {
                      title: "Skill Development",
                      text: "Develop new and current technical skills",
                      message: "Give me resources for leveling up my technical skills",
                    },
                    {
                      title: "Career Path Planning",
                      text: "Plan your road map to career success",
                      message: "Give me a step by step guide on how I can plan my career as a student in college.",
                    },
                    {
                      title: "Career Transition",
                      text: "Rethinking your goals",
                      message: "Give me a step by step guide on exploring my dream career path in technology",
                    },
                    {
                      title: "Continuing Education",
                      text: "Pros and cons of higher Education",
                      message: "Give me the pros and cons of continuing higher education after a Bachelor's degree",
                    },
                    {
                      title: "Networking Questions",
                      text: "What to ask to build connnections",
                      message: "Give me a list of questions to ask people when trying to network and make connections"
                    },
                  ].map((item, index) => (
                    <Button
                      key={index} // Assign key here to the Button element
                      sx={{
                        borderRadius: "30px",
                        background: "#212121",
                        boxShadow:
                          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                        p: 2,
                        mb: 3,
                        display: "flex",
                        flexDirection: "column", // Ensure text is stacked vertically
                        alignItems: "flex-start", // Align text to the left
                        textTransform: "none", // Prevent uppercase transformation
                        "&:focus": {
                          outline: "none", // Disable focus outline when the button is focused
                        },
                      }}
                      onClick={() => handleSendMessage(item.message)}
                    >
                      <Typography variant="subtitle1" color="#ffee8c">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.text}.
                      </Typography>
                    </Button>
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
                    bgcolor={msg.sender === "user" ? "#c29a21" : "#006633"}
                    borderRadius={1}
                    p={2}
                    maxWidth="60%"
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
                    }}
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
              <Box bgcolor="rgba(0, 0, 0, 0.3)" p={2} mt="auto">
                <Box display="flex" alignItems="center">
                  <TextField
                    placeholder="Type your message here..."
                    fullWidth
                    variant="outlined"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    InputProps={{
                      style: {
                        backgroundColor: "#292929",
                        borderRadius: "20px",
                      },
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
      </Box>
    </GradientBackground>
  );
}

export default ChatPage;
