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
      main: "#aeea00", // Lime Green / Yellow Green
    },
    secondary: {
      main: "#8bc34a", // Light Green
    },
    background: {
      default: "#1b1b1b", // Black background
      paper: "#2c2c2c", // Slightly lighter for paper
    },
    text: {
      primary: "#ffffff",
      secondary: "#cfcfcf",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: "bold",
      fontSize: "1.5rem", // Increased button text size
    },
  },
});

const InterviewPrep = () => {
  const [activeFeature, setActiveFeature] = useState("Resume Review");
  const [questionType, setQuestionType] = useState(null); // State to track selected question type
  const logout = useLogoutFunction();

  const handleSignOut = async () => {
    await logout(true);
  };

  // Behavioral interview questions
  const behavioralQuestions = [
    "Tell me about a time you faced a challenge at work.",
    "How do you handle tight deadlines?",
    "Give an example of when you showed leadership.",
    "Describe a situation where you had to work with a difficult colleague.",
    "Tell me about a time you had to adapt to a major change.",
    "Can you describe a time you made a mistake and how you handled it?",
    "Give an example of a project where you worked as part of a team.",
    "How do you manage multiple tasks and priorities?",
    "Tell me about a time you disagreed with your manager and how you handled it.",
  ];

  // Technical interview questions
  const technicalQuestions = [
    "What is the time complexity of a binary search?",
    "Explain the concept of closures in JavaScript.",
    "How does React’s virtual DOM work?",
    "What is the difference between synchronous and asynchronous programming?",
    "How does garbage collection work in JavaScript?",
    "Can you explain the differences between HTTP and HTTPS?",
    "What is the role of REST APIs in web development?",
    "Describe how event delegation works in JavaScript.",
    "What is the difference between React’s state and props?",
    "Explain how you would optimize the performance of a React application.",
  ];

  const renderQuestions = (questions) => (
    <List>
      {questions.map((question, index) => (
        <ListItem key={index} sx={{ padding: "16px 0" }}>
          <ListItemText
            primary={question}
            primaryTypographyProps={{ fontSize: "1.5rem" }} // Larger font size for questions
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
          <Box bgcolor="background.paper" p={3} boxShadow={1}>
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
            p={3}
            gap={4}
          >
            <Box display="flex" gap={3}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setQuestionType("behavioral")}
                sx={{
                  width: 340,
                  height: 70,
                  fontSize: "25px",
                  "&:focus": { outline: "none" },
                }}
              >
                Behavioral Questions
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => setQuestionType("technical")}
                sx={{
                  width: 340,
                  height: 70,
                  fontSize: "25px",
                  "&:focus": { outline: "none" },
                }}
              >
                Technical Questions
              </Button>
            </Box>

            <Paper
              elevation={4}
              sx={{
                width: "70%",
                padding: 4,
                borderRadius: 2,
                backgroundColor: "background.paper",
              }}
            >
              {!questionType && (
                <Typography
                  variant="body1"
                  align="center"
                  color="text.secondary"
                  fontSize="1.5rem"
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
