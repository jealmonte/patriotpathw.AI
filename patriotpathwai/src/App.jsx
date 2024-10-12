import React, { useState } from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import './App.css'
import Home from './Home';
import { Box } from '@mui/material';

function App() {

  return (
    <Box width="100vw" height="100vh" overflow='auto'>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </Router>
    </Box>
  );
}

export default App
