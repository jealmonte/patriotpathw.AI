import React, { useState } from "react";
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
import Sidebar from "../Components/Sidebar"; // Importing Sidebar component
import { useLogoutFunction } from "@propelauth/react";

const theme = createTheme({
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
      paper: "#2c2c2c", // Paper with light background
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#b0bec5", // Grey text
    },
  },
});

const InterviewPrep = () => {
  const [activeFeature, setActiveFeature] = useState("Resume Review");
  const [questionType, setQuestionType] = useState(null); // Track selected question type
  const logout = useLogoutFunction();

  const handleSignOut = async () => {
    await logout(true);
  };

  // Behavioral Questions
  const behavioralQuestions = [
    "Tell me about a time you faced a challenge at work.",
    "How do you handle tight deadlines?",
    "Give an example of when you showed leadership.",
    "Describe a situation where you had to work with a difficult colleague.",
    "Tell me about a time you had to adapt to a major change.",
    "Describe a mistake you made and how you handled it.",
    "Give an example of a project you worked on as a team.",
    "How do you manage multiple tasks and priorities?",
    "Tell me about a time you disagreed with your manager and how you resolved it.",
  ];

  // Technical Questions
  const technicalQuestions = [
    "What is the time complexity of a binary search?",
    "Explain closures in JavaScript.",
    "How does React’s virtual DOM work?",
    "What is the difference between synchronous and asynchronous programming?",
    "How does garbage collection work in JavaScript?",
    "Explain HTTP vs. HTTPS.",
    "What are REST APIs?",
    "Describe event delegation in JavaScript.",
    "What is the difference between state and props in React?",
    "How do you optimize performance in a React application?",
  ];

  const renderQuestions = (questions) => (
    <List>
      {questions.map((question, index) => (
        <ListItem key={index} sx={{ padding: "12px 0" }}>
          <ListItemText
            primary={question}
            primaryTypographyProps={{ fontSize: "1.25rem" }} // Match with UI text size
          />
        </ListItem>
      ))}
    </List>
  );

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

          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            p={2}
            gap={3}
          >
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setQuestionType("behavioral")}
                sx={{
                  width: 280,
                  height: 60,
                  fontSize: "1.2rem",
                  "&:focus": { outline: "none" },
                  textTransform: "none",
                }}
              >
                Behavioral Questions
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setQuestionType("technical")}
                sx={{
                  width: 280,
                  height: 60,
                  fontSize: "1.2rem",
                  "&:focus": { outline: "none" },
                  textTransform: "none",
                }}
              >
                Technical Questions
              </Button>
            </Box>

            <Paper
              elevation={3}
              sx={{
                width: "50%",
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
              {questionType === "behavioral" &&
                renderQuestions(behavioralQuestions)}
              {questionType === "technical" &&
                renderQuestions(technicalQuestions)}
            </Paper>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default InterviewPrep;
