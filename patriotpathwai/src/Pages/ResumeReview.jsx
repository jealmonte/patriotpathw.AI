import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Checkbox, FormControlLabel, LinearProgress, AppBar, Toolbar } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
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

function ResumeReview() {
  const location = useLocation();
  const [activeFeature, setActiveFeature] = useState('Resume Review');
  const [analysis, setAnalysis] = useState({});
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const latestId = location.state?.latestId;
        if (latestId) {
          const response = await axios.get(`http://127.0.0.1:8000/api/resume-data/${latestId}/`);
          const resumeData = response.data.resume_data;

          if (resumeData) {
            const { sections = [], entries = [] } = resumeData;
            const parsedSections = Array.isArray(sections) ? sections : [];
            const parsedEntries = Array.isArray(entries) ? entries : [];

            const analysisText = generateAnalysisText(parsedSections, parsedEntries);
            const parsedAnalysis = parseAnalysis(analysisText);
            setAnalysis(parsedAnalysis);
          } else {
            console.error("resume_data is undefined or empty.");
          }
        } else {
          console.error("No latest ID found in location state.");
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [location.state]);

  const generateAnalysisText = (sections, entries) => {
    let analysisText = 'Formatting Changes\n';
    analysisText += `Ensure consistent font size and style throughout.\n`;
    analysisText += `Use bullet points for clarity in experience sections.\n`;

    if (analysisText.split('\n').length - 1 < 5) {
      analysisText += `Adjust margins for better layout.\n`;
    }

    analysisText += 'Section Changes\n';
    sections.forEach((section, index) => {
      if (index < 5) {
        analysisText += `Ensure ${section.name} section is properly labeled.\n`;
      }
    });

    analysisText += 'Entry Changes\n';
    entries.forEach((entry, index) => {
      if (index < 5 && entry.jobTitle) {  // Ensure jobTitle is defined
        analysisText += `Improve clarity in line 2 of the experience '${entry.jobTitle}' entry.\n`;
      }
    });

    return analysisText;
  };

  const parseAnalysis = (analysisText) => {
    const sections = ['Formatting Changes', 'Section Changes', 'Entry Changes'];
    const parsedAnalysis = {};

    let currentSection = '';
    analysisText.split('\n').forEach(line => {
      if (sections.includes(line.trim())) {
        currentSection = line.trim();
        parsedAnalysis[currentSection] = [];
      } else if (currentSection && line.trim()) {
        parsedAnalysis[currentSection].push({ text: line.trim(), checked: false });
      }
    });

    return parsedAnalysis;
  };

  const handleCheckboxChange = (section, index) => {
    const updatedAnalysis = { ...analysis };
    updatedAnalysis[section][index].checked = !updatedAnalysis[section][index].checked;
    setAnalysis(updatedAnalysis);

    const totalItems = Object.values(updatedAnalysis).flat().length;
    const checkedItems = Object.values(updatedAnalysis).flat().filter(item => item.checked).length;
    setProgress((checkedItems / totalItems) * 100);
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex" height="100vh">
        <Sidebar 
          activeFeature={activeFeature} 
          setActiveFeature={setActiveFeature} 
        />
        <Box flex={1} display="flex" flexDirection="column">
          <AppBar position="static" sx={{ background: '#424242', boxShadow: 'none' }}>
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Resume Review
              </Typography>
            </Toolbar>
          </AppBar>

          <Box flex={1} p={3}>
            {Object.entries(analysis).map(([section, items]) => (
              <Box key={section} mb={3}>
                <Typography variant="h6" gutterBottom>{section}</Typography>
                {items.length === 0 ? (
                  <Typography variant="subtitle1" style={{ fontStyle: 'italic' }}>
                    No changes needed to be made, your {section.toLowerCase()} are up to your industry's standard.
                  </Typography>
                ) : (
                  <Box display="flex" flexDirection="column">
                    {items.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={item.checked}
                            onChange={() => handleCheckboxChange(section, index)}
                          />
                        }
                        label={item.text}  // Dashes removed here
                        sx={{ display: 'block' }}  // Ensure each checkbox is displayed vertically
                      />
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
          <Box p={3} bgcolor="background.paper">
            <Typography variant="subtitle1" align="left">Progress</Typography>
            <Typography variant="subtitle1" align="right">{`${Math.round(progress)}%`}</Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'lightgreen', '& .MuiLinearProgress-bar': { bgcolor: 'darkgreen' } }} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ResumeReview;
