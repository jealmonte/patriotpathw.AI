import React, { useState, useRef, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import Sidebar from "../Components/Sidebar";
import { useLogoutFunction } from "@propelauth/react";
import { TypeAnimation } from 'react-type-animation';
import styled from "styled-components";
import axios from "axios"; 

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
    mode: "dark",
    primary: {
      main: "#4caf50", // Consistent green (similar to other UI sections)
    },
    secondary: {
      main: "#8bc34a", // Secondary light green
    },
    success: { main: "#046A38"},
    background: {
      default: "#1b1b1b", // Black background
      paper: "#212121", // Paper with light background
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#b0bec5", // Grey text
    },
  },
});

const GradientBackground = styled(Box)({
  background: "linear-gradient(to bottom, #1a3a2a, #0a0a0a)",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
  scrollSnapAlign: "start", // Snap to the start of the section
});

const GridOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
  `,
  backgroundSize: "50px 50px",
  opacity: 1,
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to bottom, rgba(26, 42, 58, 0) 0%, rgba(10, 10, 10, 0.8) 100%)",
    pointerEvents: "none",
  },
});

const AnimatedDots = styled("canvas")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
});

const InterviewPrep = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();

        particle.y -= particle.speed;

        if (particle.y + particle.radius < 0) {
          particle.y = canvas.height + particle.radius;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  const [activeFeature, setActiveFeature] = useState("Resume Review");
  const [questionType, setQuestionType] = useState(null);
  const [systemContent, setSystemContent] = useState("");
  const [generatedQuestion, setGeneratedQuestion] = useState("");
  const [userText, setUserText] = useState("");
  const logout = useLogoutFunction();

  const handleSignOut = async () => {
    await logout(true);
  };

  const handleQuestionTypeClick = (type) => {
    setQuestionType(type);
  
    let newSystemContent = "";
    let newUserText = "";
  
    switch (type) {
      case "behavioral":
        newSystemContent = "You are helping a person with their behavioral interviews... (JUST AS ME THE QUESTION STRAIGHT AWAY)";
        newUserText = "Ask me a behavioral interview question";
        break;
      case "technical":
        newSystemContent = "You are helping a person with their technical interviews... (JUST AS ME THE QUESTION STRAIGHT AWAY NO MORE THAN 3 SENTENCES)";
        newUserText = "Ask me a technical interview question related to software engineering";
        break;
      default:
        newSystemContent = "You are helping a person with their interviews... (JUST AS ME THE QUESTION STRAIGHT AWAY)";
        newUserText = "Ask me a general interview question";
    }
  
    setSystemContent(newSystemContent);
    setUserText(newUserText);
  
    fetchAIResponse(newSystemContent, newUserText);
  };
  
  const fetchAIResponse = async (systemContent, userText) => {
    const apiKey = import.meta.env.VITE_LAW_PER_API_KEY;
  
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
            { role: "user", content: userText }
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
        const fullResponse = data.choices[0].message.content.trim();
        
        // Split the response at the first occurrence of '**'
        const splitResponse = fullResponse.split('**');
        
        // Check if there are parts after splitting
        if (splitResponse.length > 1) {
          // Join everything after the first '**'
          const cleanedQuestion = splitResponse.slice(1).join('**').trim();
          setGeneratedQuestion(cleanedQuestion);
        } else {
          // If no '**' is found, use the full response
          setGeneratedQuestion(fullResponse);
        }
      } else {
        console.error("Error response data:", data);
        throw new Error("Failed to fetch AI response");
      }
    } catch (error) {
      console.error("Error message:", error.message);
      setGeneratedQuestion("Sorry, I am unable to process your request at the moment.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" height="100vh">
        <Sidebar
          activeFeature={activeFeature}
          setActiveFeature={setActiveFeature}
          handleSignOut={handleSignOut}
        />
        <Box flex={1} display="flex" flexDirection="column">
          <Box bgcolor="#212121" p={2} boxShadow={1}>
            <Typography variant="h5" color="text.primary">
              Interview Preparation
            </Typography>
          </Box>
          <GradientBackground>
            <GridOverlay />
            <AnimatedDots ref={canvasRef} />
            <Box
              flex={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              p={1}
              gap={3}
            >
              <Typography variant="h1" color="#ffffff !important" align="center">
                Ace Your Interview
              </Typography>
              <Typography variant="h3" color="#dedede !important" align="center">
                Tailored Questions for Success
              </Typography>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleQuestionTypeClick("behavioral")}
                  sx={{
                    width: 280,
                    height: 60,
                    fontSize: "1.2rem",
                    textTransform: "none",
                    backgroundColor: "#50d900",
                    border: "none",
                    fontFamily: "inherit",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "0.4s",
                    zIndex: "2",
                    "&:hover": {
                      boxShadow: "7px 5px 56px -14px #50d900",
                      backgroundColor: "#30a813",
                    },
                    "&:active": {
                      transform: "scale(0.97)",
                      boxShadow: "7px 5px 56px -10px #50d900",
                    },
                    "&:focus": { outline: "none" },
                  }}
                >
                  Technical Questions
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleQuestionTypeClick("behavioral")}
                  sx={{
                    width: 280,
                    height: 60,
                    fontSize: "1.2rem",
                    textTransform: "none",
                    backgroundColor: "#50d900",
                    border: "none",
                    fontFamily: "inherit",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "0.4s",
                    zIndex: "2",
                    "&:hover": {
                      boxShadow: "7px 5px 56px -14px #50d900",
                      backgroundColor: "#30a813",
                    },
                    "&:active": {
                      transform: "scale(0.97)",
                      boxShadow: "7px 5px 56px -10px #50d900",
                    },
                    "&:focus": { outline: "none" },
                  }}
                >
                  Behavioral Questions
                </Button>
              </Box>

              <Paper
                elevation={3}
                sx={{
                  width: "60%",
                  padding: 3,
                  borderRadius: "12px",
                  backgroundColor: "background.paper",
                }}
              >
                {!questionType && (
                  <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                  >
                    Please select a question type to begin.
                  </Typography>
                )}
                {generatedQuestion && (
                  <Typography variant="h6" align="center" color="text.primary">
                    <TypeAnimation
                      sequence={[
                        generatedQuestion, // The text to type out
                        1000,
                      ]}
                    />
                  </Typography>
                )}
              </Paper>
            </Box>
          </GradientBackground>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default InterviewPrep;