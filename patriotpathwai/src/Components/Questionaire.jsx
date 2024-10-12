import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Button, 
  Box 
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const questions = [
    {
        'title': 'Question 1',
        'paragraph': 'How important is working directly with people to you?',
        'options': ['1', '2', '3', '4', '5'],
    },
    {
        'title': 'Question 2',
        'paragraph': 'How comfortable are you with complex mathematical and statistical concepts?',
        'options': ['1', '2', '3', '4', '5'],
    },
    {
        'title': 'Question 3',
        'paragraph': 'How much do you value creativity in your work?',
        'options': ['1', '2', '3', '4', '5'],
    },
    {
        'title': 'Question 4',
        'paragraph': 'How important is it for you to work in a field with clear, established guidelines and protocols?',
        'options': ['1', '2', '3', '4', '5'],
    },
    {
        'title': 'Question 5',
        'paragraph': 'How comfortable are you with continuous learning and adapting to new technologies and methodologies?',
        'options': ['1', '2', '3', '4', '5'],
    },
    {
        'title': 'Question 6',
        'paragraph': 'How much do you value autonomy and independence in your work?',
        'options': ['1', '2', '3', '4', '5'],
    },
    {
        'title': 'Question 7',
        'paragraph': "How important is it for you to see tangible, immediate results from your work?",
        "options": ["1", "2", "3", "4", "5"],
    },
    {
        "title": "Question 8",
        "paragraph": "How comfortable are you with public speaking and presenting information to groups?",
        "options": ["1", "2", "3", "4", "5"],
    },
    {
        "title": "Question 9",
        "paragraph": "How important is working in healthcare to you?",
        "options": ["1", "2", "3", "4", "5"],
    },
    {
        "title": "Question 10",
        "paragraph": "How much do you value working in technology?",
        "options": ["1", "2", "3", "4", "5"],
    },
    {
        "title": "Question 11",
        "paragraph": "How important is working in education to you?",
        "options": ["1", "2", "3", "4", "5"],
    },
    {
        "title": "Question 12",
        "paragraph": "How much do you value working with financial data and analysis?",
        "options": ["1", "2", "3", "4", "5"],
    },
    {
        "title": "Question 13",
        "paragraph": "How important is creativity and design in your work?",
        "options": ["1", "2", "3", "4", "5"],
    },
    {
        "title": "Question 14",
        "paragraph": "How much do you value working as a consultant to businesses?",
        "options": ["1", "2", "3", "4", "5"],
    },
    {
        "title": "Question 15",
        "paragraph":" How important is conducting academic research to you?",
        "options": ["1","2","3","4","5"],
     },
];

const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: 'hsl(139, 100%, 38%)',
      },
      background: {
        default: 'hsl(240, 15%, 9%)',
        paper: 'hsl(240, 15%, 9%)',
      },
      text: {
        primary: 'hsl(0, 0%, 100%)',
        secondary: 'hsl(0, 0%, 83%)',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: `
              radial-gradient(at 88% 40%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
              radial-gradient(at 49% 30%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
              radial-gradient(at 14% 26%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
              radial-gradient(at 0% 64%, hsla(139, 100%, 38%, 1) 0px, transparent 85%), 
              radial-gradient(at 41% 94%, hsla(139, 100%, 38%, .5) 0px, transparent 85%), 
              radial-gradient(at 100% 99%, hsla(139, 100%, 38%, .2) 0px, transparent 85%)
            `,
            boxShadow: '0px -16px 24px 0px rgba(255, 255, 255, 0.25) inset',
            borderRadius: '1rem',
            borderWidth: '6px',
            position: 'relative',
            overflow: 'hidden',
          },
        },
      },
    },
  });
  
  const CardBorder = styled('div')({
    position: 'absolute',
    background: 'transparent',
    borderRadius: '1rem',
    zIndex: -1,
    overflow: 'hidden', 
    '&::before': {
       content: '""',
       position: 'absolute',
       top: '50%',
       left: '50%',
       width: '200%',
       height: '10rem',
       backgroundImage: `
         linear-gradient(
           to right,
           hsla(139,100%,38%,0)   ,
           #006633,
           #139F59,
           hsla(139,100%,38%,.5)
         )
       `,
       animation: 'rotate 8s linear infinite',
       transformOrigin: '0% center', 
     },
    '@keyframes rotate': {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
  });

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionClick = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion]: option,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const question = questions[currentQuestion];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <CardBorder sx={{ position: 'absolute', width: '320px', height: '418px' }} />
        <Card sx={{ maxWidth: 317, minWidith: 317, width: '100%', minHeight: 416, maxHeight: 416, m: 2, position: 'relative' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {question.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {question.paragraph}
            </Typography>
            <List>
              {question.options.map((option, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleOptionClick(option)}
                  style={{ borderRadius: '10px' }}
                >
                  <ListItemIcon>
                    {selectedOptions[currentQuestion] === option ? (
                      <CheckCircleOutlineIcon color="primary" style={{ cursor: 'pointer' }} />
                    ) : (
                      <RadioButtonUncheckedIcon style={{ cursor: 'pointer' }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={option} />
                </ListItem>
              ))}
            </List>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
              {selectedOptions[currentQuestion] && currentQuestion < questions.length - 1 && (
                <Button
                  variant="contained"
                  endIcon={<ChevronRightIcon />}
                  onClick={handleNextQuestion}
                >
                  Next Question
                </Button>
              )}
              {currentQuestion === questions.length - 1 && selectedOptions[currentQuestion] && (
                <Button variant="contained">Submit Answers</Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default Questionnaire;