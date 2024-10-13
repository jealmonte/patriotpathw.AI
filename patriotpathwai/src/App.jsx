import React from "react";
import {
  AuthProvider,
  useAuthInfo,
  useRedirectFunctions,
} from "@propelauth/react";
import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import ChatPage from "./Pages/ChatPage";
import UploadResume from "./Pages/UploadResume";
import Questionnaire from "./Components/Questionaire.jsx";
import JobMatching from "./Pages/JobMatching";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InterviewPrep from "./Pages/InterviewPrep.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box width="100vw" height="100vh" overflow="auto">
        <AuthProvider authUrl="https://59746679014.propelauthtest.com">
          <AppRoutes />
        </AuthProvider>
      </Box>
    </ThemeProvider>
  );
}

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none", // to remove the white outline after clicking a button across whole app
          },
        },
      },
    },
  },
});

function AppRoutes() {
  const { redirectToSignupPage, redirectToLoginPage } = useRedirectFunctions();

  const handleSignup = () => {
    redirectToSignupPage({
      postSignupRedirectUrl: "http://localhost:5173/SignUp/Questionnaire",
    });
  };

  const handleLogin = () => {
    redirectToLoginPage({
      postLoginRedirectUrl: "/chatpage",
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home onSignup={handleSignup} onLogin={handleLogin} />}
        />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/SignUp/Questionnaire" element={<Questionnaire />} />
        <Route path="/uploadresume" element={<UploadResume />} />
        <Route path="/job-matching" element={<JobMatching />} />
        <Route path="/interview-prep" element={<InterviewPrep />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
