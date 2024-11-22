import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Select, MenuItem, TextField, Stack, Chip, Slider } from '@mui/material';
import { CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled as muiStyled } from '@mui/material/styles';

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

  const VisuallyHiddenInput = muiStyled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
  
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

  const GradientBackground = styled(Box)({
    background: 'linear-gradient(to bottom, #1a3a2a, #0a0a0a)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  });

  const AnimatedDots = styled('canvas')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  });

  const GridOverlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    opacity: 1,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, rgba(26, 42, 58, 0) 0%, rgba(10, 10, 10, 0.8) 100%)',
      pointerEvents: 'none',
    },
  });

  const Questionnaire = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
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
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
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

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [major, setMajor] = useState('');
    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');
    const [experiences, setExperiences] = useState([]);
    const [currentExperience, setCurrentExperience] = useState('');
    const [yearsOfExperienceInput, setYearsOfExperienceInput] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState(null);
    const [comfortLevel, setComfortLevel] = useState(3);
    const [loading, setLoading] = useState(false);
    const [career, setCareer] = useState('');
    const [careerOptions, setCareerOptions] = useState([]);
    const [interests, setInterests] = useState([]);
    const [currentInterest, setCurrentInterest] = useState('');
    const [workStyle, setWorkStyle] = useState('');
    const [resume, setResume] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState('');

    const getCareerSuggestions = async (userData) => {
      const apiKey = import.meta.env.VITE_LAW_PER_API_KEY;
      
      const systemContent = "You are a career advisor. Based on the user's profile, return ONLY a JSON array of exactly three career paths. Format: [\"Career 1\", \"Career 2\", \"Career 3\"]. No additional text or explanation.";
      
      const userPrompt = `Based on this profile, suggest three specific career paths:
        - Education: ${userData.major}
        - Technical Skills: ${userData.skills.join(', ')}
        - Years of Experience: ${userData.yearsOfExperience}
        - Math Comfort Level: ${userData.comfortLevel}`;
    
      try {
        const options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-sonar-large-128k-chat",
            messages: [
              { role: "system", content: systemContent },
              { role: "user", content: userPrompt },
            ],
            max_tokens: 100,
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
            frequency_penalty: 1,
          }),
        };
    
        const response = await fetch("https://api.perplexity.ai/chat/completions", options);
        const data = await response.json();
    
        if (response.ok) {
          try {
            // Clean the response content and attempt to parse it
            const cleanContent = data.choices[0].message.content
              .replace(/```json\s*/g, '')
              .replace(/```\s*/g, '')
              .trim();
            
            const suggestions = JSON.parse(cleanContent);
            
            // Ensure we have an array of exactly three strings
            if (Array.isArray(suggestions) && suggestions.length > 0) {
              return suggestions.slice(0, 3);
            } else {
              throw new Error("Invalid response format");
            }
          } catch (parseError) {
            console.error("Error parsing response:", parseError);
            return ["Software Engineer", "Data Analyst", "Product Manager"];
          }
        } else {
          throw new Error("Failed to fetch career suggestions");
        }
      } catch (error) {
        console.error("Error getting career suggestions:", error);
        return ["Software Engineer", "Data Analyst", "Product Manager"];
      }
    };

    const extractResumeText = async (file) => {
      try {
        const formData = new FormData();
        formData.append('resume', file);
        
        // You'll need to create this endpoint in your backend
        const response = await fetch('http://127.0.0.1:8000/api/upload-resume/', {
          method: 'POST',
          body: formData
        });
        
        const data = await response.text();
        return data;
      } catch (error) {
        console.error('Error extracting resume text:', error);
        return '';
      }
    };

    const handleFileUpload = (event) => {
      setResume(event.target.files[0]);
    };

    const handleSliderChange = (event, newValue) => {
        setComfortLevel(newValue);
      };

    const addSkill = () => {
        if (currentSkill.trim() !== '') {
          setSkills([...skills, currentSkill.trim()]);
          setCurrentSkill('');
        }
      };
    
      const removeSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
      };
    
      const addExperience = () => {
        if (currentExperience.trim() !== '') {
          setExperiences([...experiences, currentExperience.trim()]);
          setCurrentExperience('');
        }
      };
    
      const removeExperience = (index) => {
        setExperiences(experiences.filter((_, i) => i !== index));
      };

      const navigate = useNavigate();
    
      const handleNextQuestion = async () => {
    if (currentQuestion < questions.length - 2) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion === questions.length - 2) {
      setLoading(true);
      const userData = {
        major,
        skills,
        interests,
        workStyle,
        yearsOfExperience,
        comfortLevel,
        resume: resume ? resume.name : null
      };

      try {
        const suggestions = await getCareerSuggestions(userData);
        setCareerOptions(suggestions);
      } catch (error) {
        console.error('Error getting career suggestions:', error);
        setCareerOptions(['Software Engineer', 'Data Analyst', 'Product Manager']);
      } finally {
        setLoading(false);
        setCurrentQuestion(currentQuestion + 1);
      }
    } else {
      if (selectedCareer) {
        navigate('/Dashboard');
      }
    }
  };
  
      const addyearsExperience = () => {
          if (yearsOfExperienceInput.trim() !== '') {
            setYearsOfExperience(yearsOfExperienceInput.trim());
            setYearsOfExperienceInput('');
          }
        };
      
        const removeyearsExperience = () => {
          setYearsOfExperience(null); 
        };
    
      const isNextDisabled = () => {
        if (currentQuestion === 0) return !major;
        if (currentQuestion === 1) return skills.length === 0;
        if (currentQuestion === 2) return experiences.length === 0;
        return false;
      };
    
      const handleCareerClick = (career) => {
        setCareer(career);
        setSelectedCareer(career);
        console.log(career);
      };


      const questions = [
        {
          title: "What is/was your field of study?",
          component: (
            <Select value={major} onChange={(e) => setMajor(e.target.value)} fullWidth>
              {[
                'Computer Science',
                'Engineering',
                'Business',
                'Arts',
                'Sciences',
                'Mathematics',
                'Healthcare',
                'Social Sciences',
                'Education',
                'Other'
              ].map((m) => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          )
        },
      {
        title: "What technical skills do you have?",
        component: (
          <>
            <TextField
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              fullWidth
              placeholder="Type a skill and press Enter"
            />
            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => removeSkill(index)}
                />
              ))}
            </Stack>
          </>
        ),
      },
      {
        title: "What are your interests and hobbies?",
        component: (
          <>
            <TextField
              value={currentInterest}
              onChange={(e) => setCurrentInterest(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (currentInterest.trim()) {
                    setInterests([...interests, currentInterest.trim()]);
                    setCurrentInterest('');
                  }
                }
              }}
              fullWidth
              placeholder="Type an interest and press Enter"
            />
            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
              {interests.map((interest, index) => (
                <Chip
                  key={index}
                  label={interest}
                  onDelete={() => setInterests(interests.filter((_, i) => i !== index))}
                />
              ))}
            </Stack>
          </>
        )
      },
      {
        title: "What are your experiences?",
        component: (
          <>
            <TextField
              value={currentExperience}
              onChange={(e) => setCurrentExperience(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addExperience();
                }
              }}
              fullWidth
              placeholder="Input the title of your experiences"
            />
            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
              {experiences.map((experience, index) => (
                <Chip
                  key={index}
                  label={experience}
                  onDelete={() => removeExperience(index)}
                />
              ))}
            </Stack>
          </>
        ),
      },
      {
        title:
          "How many years of experience do you have in your desired field?",
        component: (
          <>
            <TextField
              value={yearsOfExperienceInput}
              onChange={(e) => setYearsOfExperienceInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addyearsExperience();
                }
              }}
              fullWidth
              placeholder="Enter your years of experience"
            />
            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
              {yearsOfExperience && (
                <Chip
                  label={yearsOfExperience}
                  onDelete={removeyearsExperience}
                />
              )}
            </Stack>
          </>
        ),
      },
      {
        title:
          "How comfortable are you with complex mathematical and statistical concepts?",
        component: (
            <>
            <Box style={{paddingTop: "25px", paddingLeft: "10px", paddingRight: "10px"}}>
            <Slider
              aria-labelledby="math-comfort-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={5}
            />
            </Box>
          </>
        ),
      },
      {
        title:
          "How comfortable are you with continuous learning and adapting to new technologies and methodologies?",
        component: (
            <>
            <Box style={{paddingTop: "25px", paddingLeft: "10px", paddingRight: "10px"}}>
            <Slider
              aria-labelledby="math-comfort-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={5}
            />
            </Box>
          </>
        ),
      },
      {
        title:
          "How comfortable are you with public speaking and presenting information to groups?",
        component: (
            <>
            <Box style={{paddingTop: "25px", paddingLeft: "10px", paddingRight: "10px"}}>
            <Slider
              aria-labelledby="math-comfort-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={5}
            />
            </Box>
          </>
        ),
      },
      {
        title: "Upload your resume (Optional)",
        component: (
          <>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
            >
              Upload Resume (PDF)
              <VisuallyHiddenInput
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
              />
            </Button>
            {resume && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Uploaded: {resume.name}
              </Typography>
            )}
          </>
        )
      },
      {
        title:
          "Results",
        component: (
            <>
            {loading ? (
        <>
        <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Typography variant="h6" gutterBottom>
            Compiling results...
          </Typography>
          <CircularProgress />
        </Box>
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Choose your career path:
          </Typography>
          <Stack direction="column" spacing={2}>
            {careerOptions.map((career) => (
              <Button
                key={career}
                variant="contained"
                onClick={() => handleCareerClick(career)}
              >
                {career}
              </Button>
            ))}
          </Stack>
        </>
      )}
          </>
        ),
      },
    ];
  
    return (
      <ThemeProvider theme={theme}>
        <GradientBackground sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <GridOverlay/>
        <AnimatedDots ref={canvasRef} />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <CardBorder sx={{ position: 'absolute', width: '320px', height: '433px' }} />
          <Card sx={{ maxWidth: 317, minWidth: 317, width: '100%', minHeight: 430, maxHeight: 430, m: 2, position: 'relative' }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                {questions[currentQuestion].title}
              </Typography>
              {questions[currentQuestion].component}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  endIcon={currentQuestion < questions.length - 1 ? <ChevronRightIcon /> : null}
                  onClick={handleNextQuestion}
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'Submit'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
        </GradientBackground>
      </ThemeProvider>
    );
  };

export default Questionnaire;