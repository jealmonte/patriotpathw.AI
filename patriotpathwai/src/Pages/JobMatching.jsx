import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Pagination,
} from "@mui/material";
import Sidebar from "../Components/Sidebar";
import { useLogoutFunction } from "@propelauth/react";

// Dark Theme Configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: { default: "#303030", paper: "#424242" },
    text: { primary: "#ffffff", secondary: "#b0bec5" },
  },
});

// Example Job Data Array (This would come from your API in a real-world scenario)
const jobData = [
  {
    id: 1,
    title: "Principal Associate, Information Security Office Consultant",
    company: "Capital One",
    description:
      "Lead security assessments and audits while supporting security compliance across Capital One's financial operations.",
    location: "McLean, VA",
  },
  {
    id: 2,
    title: "Summer Intern - Data Governance & Strategy",
    company: "Federal Reserve Board",
    description:
      "Assist in data governance strategy development, analyze financial datasets, and contribute to policymaking decisions.",
    location: "Washington, DC (On-site)",
  },
  {
    id: 3,
    title: "Reinforcement Learning Research Intern for Game AI",
    company: "SonyAI",
    description:
      "Conduct research on advanced AI techniques to improve reinforcement learning models in gaming environments.",
    location: "Massachusetts, United States (Remote)",
  },
  {
    id: 4,
    title: "Software Engineer Intern",
    company: "Google",
    description:
      "Work on cutting-edge software projects to enhance Google’s cloud computing platform.",
    location: "Mountain View, CA",
  },
  {
    id: 5,
    title: "Data Scientist Intern",
    company: "Meta",
    description:
      "Develop machine learning models and analyze user engagement data to improve platform features.",
    location: "Menlo Park, CA",
  },
];

const JobMatching = () => {
  const [activeFeature, setActiveFeature] = useState("Job Matching");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const jobsPerPage = 6; // Number of jobs per page
  const logout = useLogoutFunction();

  // Calculate the jobs to display based on current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobData.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSignOut = async () => {
    await logout(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex" height="100vh">
        {/* Sidebar Component */}
        <Sidebar
          activeFeature={activeFeature}
          setActiveFeature={setActiveFeature}
          handleSignOut={handleSignOut}
        />

        <Box flex={1} display="flex" flexDirection="column">
          {/* Header Section */}
          <Box bgcolor="background.paper" p={2}>
            <Typography variant="h5">Job Matching</Typography>
          </Box>

          {/* Job Cards Section */}
          <Box flex={1} p={2} overflow="auto">
            <Stack spacing={2}>
              {currentJobs.map((job) => (
                <Card
                  key={job.id}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    sx={{ display: "flex", flexDirection: "column", flex: 1 }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {job.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {job.company}
                      </Typography>
                      <Typography variant="body2" sx={{ marginTop: 1 }}>
                        {job.description}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ marginTop: 1 }}
                      >
                        Location: {job.location}
                      </Typography>
                    </CardContent>
                  </Box>
                  <Box pr={2}>
                    <Button variant="outlined" color="white">
                      Apply
                    </Button>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Box>

          {/* Pagination Section */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2}
            bgcolor="background.paper"
          >
            <Pagination
              count={Math.ceil(jobData.length / jobsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default JobMatching;
