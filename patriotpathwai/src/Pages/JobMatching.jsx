import React, { useState, useRef, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Pagination,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FilterListIcon from '@mui/icons-material/FilterList';
import Sidebar from "../Components/Sidebar";
import { useLogoutFunction } from "@propelauth/react";
import JsonData from "../../../ScrapeData/dataset_indeed-scraper_2024-10-13_08-19-59-071.json";
import { styled } from "@mui/material";
import { keyframes } from '@emotion/react';


const darkTheme = createTheme({
  typography: {
    body1: {
      fontFamily: 
      'Inter', // Replace with your desired font
    },
    body2: {
      fontFamily: 
      'Inter', // Replace with your desired font
    },
    caption: {
      fontFamily: 
      'Inter',
    },
    h1: {
      fontFamily: 
      'Inter', // Replace with your desired font
    },
    h2: {
      fontFamily: 
      'Inter', // Replace with your desired font
    },
    h3: {fontFamily: 
      'Inter', // Replace with your desired font
    },
    h4: {fontFamily: 
      'Inter', // Replace with your desired font
    },
    h5: {fontFamily: 
      'Inter', // Replace with your desired font
    },
    h6: {fontFamily: 
      'Inter', // Replace with your desired font
    },
    inherit: {
      fontFamily: 'Inter',
    },
    overline: {
      fontFamily: 'Inter',
    },
    subtitle1: {
      fontFamily: 'Inter',
    },
    subtitle2: {
      fontFamily: 'Inter',
    },
    string: {
      fontFamily: 'Inter',
    },
  },
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    success: { main: "#046A38"},
    secondary: { main: "#f48fb1" },
    background: { default: "#303030", paper: "#1b1b1b" },
    text: { primary: "#ffffff", secondary: "#b0bec5" },
  },
});

const moveGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const StyledCard = styled(Card)`
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 1rem;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    z-index: -1;
    background: linear-gradient(
      45deg,
      #13b37f,
      #FFCC33,
      #13b37f,
      #FFCC33
    );
    background-size: 400% 400%;
    animation: ${moveGradient} 12s linear infinite;
  }

  & > * {
    z-index: 2;
  }
`;

const StyledCardContent = styled(CardContent)({
  backgroundColor: '#212121', // card-info color
  borderRadius: '1rem',
});

const StyledTypography = styled(Typography)({
  fontWeight: 'light', // title font weight
  letterSpacing: '0.2em', // title letter spacing
});

const GradientBackground = styled(Box)({
  background: "linear-gradient(to bottom, #1a3a2a, #0a0a0a)",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
  scrollSnapAlign: "start", // Snap to the start of the section
});

const GridOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
  `,
  backgroundSize: "50px 50px",
  opacity: 1,
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to bottom, rgba(26, 42, 58, 0) 0%, rgba(10, 10, 10, 0.8) 100%)",
    pointerEvents: "none",
  },
});

const AnimatedDots = styled("canvas")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
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
  top: 15,
  right: 15,
  cursor: "pointer",
  overflow: "hidden",
  border: `2px solid var(--color)`,
  transition: "color 0.5s, border-color 0.5s",
  zIndex: 1,
  fontSize: "17px",
  borderRadius: "6px",
  fontWeight: 500,
  color: "var(--color)",
  textTransform: 'none',
  backgroundColor: "transparent",

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
  },

  "&:active": {
    "&:before": {
      backgroundColor: "#139F59",
      transition: "background-color 0s",
    },
  },
}));

const jobData = JsonData.filter(
  (job) =>
    job.positionName &&
    job.company &&
    job.location &&
    job.salary &&
    job.url &&
    job.description
);

const JobMatching = () => {
  const [activeFeature, setActiveFeature] = useState("Job Matching");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;
 
  const logout = useLogoutFunction();

  const [anchorEl, setAnchorEl] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({ minSalary:'', maxSalary:'', locationInput:'' });

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const generateSuitabilityScores = (jobs) => {
    let scores = [];
    let currentScore = 96; 
  
    for (let i = 0; i < jobs.length; i++) {
      scores.push(currentScore);
      const decrement = Math.random() * 10;
      currentScore -= decrement;
      if (currentScore < 25) currentScore = 25;
    }
  
    return scores;
  };

  const [applicationStatus, setApplicationStatus] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);

  const handleApplyClick = (jobId) => {
    setCurrentJobId(jobId);
    window.open(jobData.find((job) => job.id === jobId).url, "_blank");
    setDialogOpen(true);
  };

  const handleDialogClose = (applied) => {
    if (applied) {
      setApplicationStatus((prev) => ({ ...prev, [currentJobId]: "Applied" }));
    } else {
      setApplicationStatus((prev) => ({ ...prev, [currentJobId]: "Viewed" }));
    }
    setDialogOpen(false);
    setCurrentJobId(null);
  };

  const handleSalaryInputChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria((prev) => ({ ...prev, [name]:value }));
  };

  const handleLocationInputChange = (event) => {
    setFilterCriteria((prev) => ({ ...prev, locationInput:event.target.value }));
  };

  // Function to parse salary string
  const parseSalary = (salaryString) => {
    return parseInt(salaryString.replace(/[^0-9]/g, ''));
  };

  // Apply filters to job data
  const filteredJobData = jobData.filter((job) => {
    const jobSalary = parseSalary(job.salary);
    const minSalaryValid = filterCriteria.minSalary === '' || jobSalary >= parseInt(filterCriteria.minSalary);
    const maxSalaryValid = filterCriteria.maxSalary === '' || jobSalary <= parseInt(filterCriteria.maxSalary);
    const locationValid = filterCriteria.locationInput === '' || job.location.toLowerCase().includes(filterCriteria.locationInput.toLowerCase());

    return minSalaryValid && maxSalaryValid && locationValid;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const suitabilityScores = generateSuitabilityScores(filteredJobData);

  const scoredJobData = filteredJobData.map((job, index) => ({
    ...job,
    suitabilityScore: suitabilityScores[index]
  }));

  const currentJobs = scoredJobData.slice(indexOfFirstJob, indexOfLastJob);
  const cleanDescription = (description) => {
    const sentences = description.split('. ');
    const summary = sentences.slice(0,3).join('. ') + '...';
    return summary;
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSignOut = async () => {
    await logout(true);
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
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
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
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


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex" height="100vh">
        <Sidebar
          activeFeature={activeFeature}
          setActiveFeature={setActiveFeature}
          handleSignOut={handleSignOut}
        />

        <Box flex={1} display="flex" flexDirection="column">
          <Box
            bgcolor="#212121"
            p={2}
            display="flex"
            alignItems="center"
            style={{ maxHeight: "64px" }}
          >
            <Typography variant="h5">Job Matching</Typography>
            <IconButton
              aria-label="filter"
              sx={{ marginLeft: "auto" }}
              onClick={handleFilterClick}
            >
              <FilterListIcon fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleFilterClose}
            >
              <MenuItem>
                <Box display="flex" alignItems="center" gap={1}>
                  <TextField
                    label="Min Salary"
                    variant="outlined"
                    size="small"
                    name="minSalary"
                    value={filterCriteria.minSalary}
                    onChange={handleSalaryInputChange}
                    type="number"
                    style={{ maxWidth: "100px", minWidth: "100px" }}
                  />
                  <Typography variant="h6">-</Typography>
                  <TextField
                    label="Max Salary"
                    variant="outlined"
                    size="small"
                    name="maxSalary"
                    value={filterCriteria.maxSalary}
                    onChange={handleSalaryInputChange}
                    type="number"
                    style={{ maxWidth: "100px", minWidth: "100px" }}
                  />
                </Box>
              </MenuItem>
              <MenuItem>
                <TextField
                  label="Location"
                  variant="outlined"
                  size="small"
                  value={filterCriteria.locationInput}
                  onChange={handleLocationInputChange}
                />
              </MenuItem>
            </Menu>
          </Box>

          <Box flex={1} overflow="auto">
            <GradientBackground>
              <GridOverlay />
              <AnimatedDots ref={canvasRef} />
              <Stack spacing={8} mt={1} m={2} overflow="hidden">
                {currentJobs.map((job) => (
                  <StyledCard key={job.id}>
                    <StyledApplyButton
                      style={{zIndex:3}}
                      variant="contained"
                      endIcon={<OpenInNewIcon />}
                      onClick={() => handleApplyClick(job.id)}
                      disabled={applicationStatus[job.id] === "Applied"}
                    >
                      {applicationStatus[job.id] === "Applied"
                        ? "Applied"
                        : applicationStatus[job.id] === "Viewed"
                        ? "Viewed"
                        : "Apply"}
                    </StyledApplyButton>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", flex: 1 }}
                    >
                      <Dialog
                        open={dialogOpen}
                        onClose={() => handleDialogClose(false)}
                      >
                        <DialogTitle>Application Status</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Did you successfully apply for this job?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => handleDialogClose(false)}
                            color="primary"
                          >
                            No
                          </Button>
                          <Button
                            onClick={() => handleDialogClose(true)}
                            color="primary"
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <StyledCardContent>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <StyledTypography
                            variant="h6"
                            fontWeight="bold"
                            color="#a6e890 !important"
                          >
                            {job.positionName}:
                          </StyledTypography>
                          <Typography
                            variant="h7"
                            color="textSecondary"
                            sx={{ fontStyle: "italic", marginLeft: 1 }} // Add margin for spacing
                          >
                            Compatibility Score:{" "}
                            {Math.round(job.suitabilityScore)}%
                          </Typography>
                        </Box>
                        <Typography variant="subtitle1" color="textSecondary">
                          {job.company}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ marginRight: 1 }}
                        >
                          Location:{job.location}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Salary:{job.salary}
                        </Typography>
                        <Typography variant="body2" color="textPrimary">
                          {cleanDescription(job.description)}
                        </Typography>
                      </StyledCardContent>
                    </Box>
                  </StyledCard>
                ))}
              </Stack>
            </GradientBackground>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2}
            bgcolor="#0a0a0a"
          >
            <Pagination
              count={Math.ceil(filteredJobData.length / jobsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  backgroundColor: "transparent",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default JobMatching;