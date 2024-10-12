import React from 'react';
import { AuthProvider, useAuthInfo, useRedirectFunctions } from '@propelauth/react';
import { Box } from '@mui/material';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import ChatPage from './Pages/ChatPage';
import UploadResume from './Pages/UploadResume';
import { Box } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Questionnaire from './Components/Questionaire.jsx';

function App() {
  return (
    <Box width="100vw" height="100vh" overflow='auto'>
      <AuthProvider authUrl="https://59746679014.propelauthtest.com">
        <AppRoutes />
      </AuthProvider>
    </Box>
  );
}

function AppRoutes() {
  const { redirectToSignupPage, redirectToLoginPage } = useRedirectFunctions();

  const handleSignup = () => {
    redirectToSignupPage({
      postSignupRedirectUrl: 'http://localhost:5173/SignUp/Questionnaire'
    });
  };

  const handleLogin = () => {
    redirectToLoginPage({
      postLoginRedirectUrl: '/chatpage'
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home onSignup={handleSignup} onLogin={handleLogin} />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/SignUp/Questionnaire" element={<Questionnaire />} />
        <Route path="/uploadresume" element={<UploadResume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;