import React from 'react';
import { AuthProvider } from '@propelauth/react';
import Home from './Pages/Home.jsx';
import ChatPage from './Pages/ChatPage';
import { Box } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Box width="100vw" height="100vh" overflow='auto'>
    <AuthProvider authUrl="https://59746679014.propelauthtest.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatpage" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </Box>
  );
}

export default App;