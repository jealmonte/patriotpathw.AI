import { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import Sidebar from "../Components/Sidebar"; // Importing Sidebar component
import { useLogoutFunction } from "@propelauth/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Plus } from "lucide-react";
import BackgroundAnimation from "../Components/BackgroundAnimation";
import { SalaryProvider, useSalary } from "../Components/SalaryContext";
import zIndex from "@mui/material/styles/zIndex";
import styled from "styled-components";

const darkTheme = createTheme({
  palette: {
    success: { main: "#046A38" },
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    warning: { main: "#ff9800" },
    background: {
      default: "#1b1b1b", // Dark grey background
      paper: "#2a2a2a", // Slightly lighter grey for cards
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
  typography: {
    body1: {
      fontFamily: "Inter", // Replace with your desired font
    },
    body2: {
      fontFamily: "Inter", // Replace with your desired font
    },
    caption: {
      fontFamily: "Inter",
    },
    h1: {
      fontFamily: "Inter", // Replace with your desired font
    },
    h2: {
      fontFamily: "Inter", // Replace with your desired font
    },
    h3: {
      fontFamily: "Inter", // Replace with your desired font
    },
    h4: {
      fontFamily: "Inter", // Replace with your desired font
    },
    h5: {
      fontFamily: "Inter", // Replace with your desired font
    },
    h6: {
      fontFamily: "Inter", // Replace with your desired font
    },
    inherit: {
      fontFamily: "Inter",
    },
    overline: {
      fontFamily: "Inter",
    },
    subtitle1: {
      fontFamily: "Inter",
    },
    subtitle2: {
      fontFamily: "Inter",
    },
    string: {
      fontFamily: "Inter",
    },
  },
});

const StyledApplyButton = styled(Button)(({ theme }) => ({
  "--color": "#139F59",
  fontFamily: "Inter",
  paddingLeft: '7px',
  paddingRight: '7px',
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  width: "auto",
  maxHeight: "40px", 
  lineHeight: "2.5em",
  margin: "10px",
  position: "absolute",
  cursor: "pointer",
  overflow: "hidden",
  border: `2px solid var(--color)`,
  transition: "color 0.5s, border-color 0.5s, background-color 0.5s", 
  zIndex: 1,
  fontSize: "17px",
  borderRadius: "6px",
  fontWeight: 500,
  color: "var(--color)",
  textTransform: 'none',
  
  backgroundColor: "transparent !important",

  "&:before": {
    content: '""',
    position: "absolute",
    zIndex: -1,
    backgroundColor: "var(--color)",
    height: "150px",
    width: "200px",
    borderRadius: "50%",
    top: "100%",
    left: "100%",
    transition: "all 0.7s",
  },

  "&:hover": {
    color: "#fff !important",
    borderColor: "#139F59 !important",

    "&:before": {
      top: "-30px",
      left: "-30px",
    },
    
    // Ensure hover effect includes background change
    backgroundColor: "#139F59 !important", 
  },

  "&:active": {
    "&:before": {
      backgroundColor: "#139F59",
      transition: "background-color 0s",
    },
    
    // Maintain active state styling
    backgroundColor: "#139F59", 
  },

}));
const neonGlow = {
  boxShadow: "0 4px 30px rgba(33, 235, 134, 0.6)", // Neon green glow
};

const Dashboard = () => {
  const { salary } = useSalary();
  const [activeFeature, setActiveFeature] = useState("Resume Review");
  const logout = useLogoutFunction();

  const handleSignOut = async () => {
    await logout(true);
  };
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the respective feature page
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <BackgroundAnimation />
      <CssBaseline />
      <Box display="flex" height="100vh">
        <Sidebar
          activeFeature={activeFeature}
          setActiveFeature={setActiveFeature}
          handleSignOut={handleSignOut}
        />
        <Box flex={1} display="flex" flexDirection="column" p={3}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#21eb86", fontWeight: 700 }}
          >
            Dashboard
          </Typography>
          <Grid container spacing={5} sx={{ flexGrow: 1 }}>
            {/* Job Listings Card */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  background: "#2a2a2a",
                  "&:hover": neonGlow,
                  transition: "0.3s ease-in-out",
                }}
              >
                <CardContent>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center", 
                      justifyContent: "space-between", 
                      height: "100%",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Job Listings
                    </Typography>
                    <StyledApplyButton
                      style={{ zIndex: 4 }}
                      color="#fff !important"
                      onClick={()=>navigate('/job-matching')}
                    >
                      View More
                    </StyledApplyButton>
                  </Box>
                  <Divider sx={{ my: 2 }} />

                  {/* Software Engineer Button */}
                  <Button
                    fullWidth
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      color: "#ffffff",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#333333",
                      },
                    }}
                    onClick={() => {window.open("https://www.indeed.com/q-Software-Engineering-Internship-2025-Graduation-jobs.html?mna=&aceid=&gad_source=1&vjk=c3ad204106562ea0&advn=9091402361108976", "_blank")}}
                  >
                    <Box textAlign="left">
                      <Typography variant="subtitle1" fontWeight="bold">
                        Process Engineering Internship
                      </Typography>
                      <Typography>TTM Technologies - Remote</Typography>
                      <Typography>$30/hr</Typography>
                    </Box>
                  </Button>

                  <Divider sx={{ my: 1, borderColor: "#424242" }} />

                  {/* Data Analyst Button */}
                  <Button
                    fullWidth
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      color: "#ffffff",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#333333",
                      },
                    }}
                    onClick={() => {window.open("https://www.indeed.com/q-Software-Engineering-Internship-2025-Graduation-jobs.html?mna=&aceid=&gad_source=1&vjk=40810cfc9f61645c&advn=9943506443046871", "_blank")}}
                  >
                    <Box textAlign="left">
                      <Typography variant="subtitle1" fontWeight="bold">
                        Summer Associate Internship
                      </Typography>
                      <Typography>Navy Federal Credit Union - Vienna, VA</Typography>
                      <Typography>$26 - $46/hr</Typography>
                    </Box>
                  </Button>

                  <Divider sx={{ my: 1, borderColor: "#424242" }} />

                  {/* UX Designer Button */}
                  <Button
                    fullWidth
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      color: "#ffffff",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#333333",
                      },
                    }}
                    onClick={() => {window.open("https://www.indeed.com/q-Software-Engineering-Internship-2025-Graduation-jobs.html?mna=&aceid=&gad_source=1&vjk=b36a9d2ef5387c0b", "_blank")}}
                  >
                    <Box textAlign="left">
                      <Typography variant="subtitle1" fontWeight="bold">
                        Full Stack Software Engineer Intern
                      </Typography>
                      <Typography>Autodesk - San Francisco, CA</Typography>
                      <Typography>$47,840 - $162,240</Typography>
                    </Box>
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Resume Upload Card */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  background: "#2a2a2a",
                  "&:hover": neonGlow,
                  transition: "0.3s ease-in-out",
                }}
                onClick={() => handleNavigation("/uploadresume")}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Resume Upload
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box
                    border="1px dashed #21eb86"
                    p={4}
                    textAlign="center"
                    borderRadius={2}
                    height="250px"
                  >
                    <Typography variant="h6">
                      Upload your resume and use our AI analysis to elevate
                      your game. Get your resume past ATS and land an interview!
                    </Typography>
                    <IconButton
                      component="span"
                      sx={{
                        "& svg": {
                          color: "#424242",
                          transition: "color 0.5s",
                        },
                        "&:hover svg": {
                          color: "#c7c5c5",
                        },
                      }}
                    >
                      <Plus size={128} />
                    </IconButton>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ borderRadius: 2 }}
                    fullWidth
                  >
                    Upload Resume
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Interview Prep Card */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  background: "#2a2a2a",
                  "&:hover": neonGlow,
                  transition: "0.3s ease-in-out",
                }}
                onClick={() => handleNavigation("/interview-prep")}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Interview Prep
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          height: "150px",
                          fontSize: "24px", // Increase text size
                          fontWeight: "bold", // Make the text bold
                        }}
                      >
                        Behavioral Questions
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="warning"
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          height: "150px",
                          fontSize: "24px", // Increase text size
                          fontWeight: "bold", // Make the text bold
                        }}
                      >
                        Technical Questions
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Salary Analysis Card */}
            {/* Salary Analysis Card */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  background: "#21eb86",
                  color: "#fff",
                  "&:hover": {
                    boxShadow: "0px 8px 30px #21eb86",
                    transform: "scale(1.05)", // Enlarge on hover
                    transition: "transform 0.3s ease-in-out", // Smooth transition
                  },
                  transition: "0.3s ease-in-out",
                  zIndex: 1, // Higher z-index
                  position: "relative", // Set position to relative
                }}
                onClick={() => handleNavigation("/offer-negotiation")}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Salary Analysis
                  </Typography>
                  <Divider
                    sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.3)" }}
                  />
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Typography variant="h4">
                      AI-powered salary insights
                    </Typography>
                    <Typography variant="h1" fontWeight="bold" mt={2}>
                      ${salary !== null ? salary : "Loading..."}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Career Coach Card */}
            <Grid item xs={12}>
              <Card
                sx={{
                  height: "90%",
                  borderRadius: 3,
                  background: "#2a2a2a",
                  "&:hover": neonGlow,
                  transition: "0.3s ease-in-out",
                }}
                onClick={() => handleNavigation("/chatpage")}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Career Coach
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Ask your career question..."
                    sx={{ borderRadius: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
