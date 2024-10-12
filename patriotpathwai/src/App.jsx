import React, { useState } from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home';
import ChatPage from './Pages/ChatPage';
import { Box } from '@mui/material';

function App() {

  return (
    <Box width="100vw" height="100vh" overflow='auto'>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ChatPage" element={<ChatPage />} />
          </Routes>
      </Router>
    </Box>
  );
}

export default App
