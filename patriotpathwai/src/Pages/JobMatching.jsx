import { useState } from "react";
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
  List,
  ListItem,
  ListItemText,
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

// Example Job Data Array (Formatted with Lists for Descriptions)
const jobData = [
  {
    id: 1,
    title: "Principal Associate, Information Security Office Consultant",
    company: "Capital One",
    description: {
      basicQualifications: [
        "High School Diploma, GED or equivalent certification",
        "At least 3 years of experience working in cybersecurity or information technology",
        "At least 1 year of experience providing guidance and oversight of Security concepts",
      ],
      preferredQualifications: [
        "Bachelor’s Degree",
        "3+ years of experience in securing a public cloud environment (e.g. AWS, GCP, Azure)",
        "Experience building software utilizing public cloud (e.g. AWS, GCP, Azure)",
        "Familiarity with Cloud patch management practices such as system rehydration and image management",
        "Experience utilizing Agile methodologies",
        "Experience with Software Security Architecture",
        "Experience with Application Security",
        "Experience with Threat Modeling",
        "Experience with Penetration Testing and/or Vulnerability Management",
        "Experience with integrating SaaS products into an Enterprise Environment",
        "Experience with securing Container services",
        "Financial services industry experience",
        "Professional certifications such as AWS Certified Solutions Architect and Certified Information Systems Security Professional (CISSP)",
        "Experience in Offensive and/or Defensive Security techniques",
        "Experience in a regulated environment",
      ],
    },
    location: "McLean, VA",
  },
  {
    id: 2,
    title: "Principal Associate, Information Security Office Consultant",
    company: "Capital One",
    description: {
      basicQualifications: [
        "High School Diploma, GED or equivalent certification",
        "At least 3 years of experience working in cybersecurity or information technology",
        "At least 1 year of experience providing guidance and oversight of Security concepts",
      ],
      preferredQualifications: [
        "Bachelor’s Degree",
        "3+ years of experience in securing a public cloud environment (e.g. AWS, GCP, Azure)",
        "Experience building software utilizing public cloud (e.g. AWS, GCP, Azure)",
        "Familiarity with Cloud patch management practices such as system rehydration and image management",
        "Experience utilizing Agile methodologies",
        "Experience with Software Security Architecture",
        "Experience with Application Security",
        "Experience with Threat Modeling",
        "Experience with Penetration Testing and/or Vulnerability Management",
        "Experience with integrating SaaS products into an Enterprise Environment",
        "Experience with securing Container services",
        "Financial services industry experience",
        "Professional certifications such as AWS Certified Solutions Architect and Certified Information Systems Security Professional (CISSP)",
        "Experience in Offensive and/or Defensive Security techniques",
        "Experience in a regulated environment",
      ],
    },
    location: "McLean, VA",
  },
  {
    id: 3,
    title: "Principal Associate, Information Security Office Consultant",
    company: "Capital One",
    description: {
      basicQualifications: [
        "High School Diploma, GED or equivalent certification",
        "At least 3 years of experience working in cybersecurity or information technology",
        "At least 1 year of experience providing guidance and oversight of Security concepts",
      ],
      preferredQualifications: [
        "Bachelor’s Degree",
        "3+ years of experience in securing a public cloud environment (e.g. AWS, GCP, Azure)",
        "Experience building software utilizing public cloud (e.g. AWS, GCP, Azure)",
        "Familiarity with Cloud patch management practices such as system rehydration and image management",
        "Experience utilizing Agile methodologies",
        "Experience with Software Security Architecture",
        "Experience with Application Security",
        "Experience with Threat Modeling",
        "Experience with Penetration Testing and/or Vulnerability Management",
        "Experience with integrating SaaS products into an Enterprise Environment",
        "Experience with securing Container services",
        "Financial services industry experience",
        "Professional certifications such as AWS Certified Solutions Architect and Certified Information Systems Security Professional (CISSP)",
        "Experience in Offensive and/or Defensive Security techniques",
        "Experience in a regulated environment",
      ],
    },
    location: "McLean, VA",
  },
  {
    id: 4,
    title: "Principal Associate, Information Security Office Consultant",
    company: "Capital One",
    description: {
      basicQualifications: [
        "High School Diploma, GED or equivalent certification",
        "At least 3 years of experience working in cybersecurity or information technology",
        "At least 1 year of experience providing guidance and oversight of Security concepts",
      ],
      preferredQualifications: [
        "Bachelor’s Degree",
        "3+ years of experience in securing a public cloud environment (e.g. AWS, GCP, Azure)",
        "Experience building software utilizing public cloud (e.g. AWS, GCP, Azure)",
        "Familiarity with Cloud patch management practices such as system rehydration and image management",
        "Experience utilizing Agile methodologies",
        "Experience with Software Security Architecture",
        "Experience with Application Security",
        "Experience with Threat Modeling",
        "Experience with Penetration Testing and/or Vulnerability Management",
        "Experience with integrating SaaS products into an Enterprise Environment",
        "Experience with securing Container services",
        "Financial services industry experience",
        "Professional certifications such as AWS Certified Solutions Architect and Certified Information Systems Security Professional (CISSP)",
        "Experience in Offensive and/or Defensive Security techniques",
        "Experience in a regulated environment",
      ],
    },
    location: "McLean, VA",
  },
  {
    id: 5,
    title: "Principal Associate, Information Security Office Consultant",
    company: "Capital One",
    description: {
      basicQualifications: [
        "High School Diploma, GED or equivalent certification",
        "At least 3 years of experience working in cybersecurity or information technology",
        "At least 1 year of experience providing guidance and oversight of Security concepts",
      ],
      preferredQualifications: [
        "Bachelor’s Degree",
        "3+ years of experience in securing a public cloud environment (e.g. AWS, GCP, Azure)",
        "Experience building software utilizing public cloud (e.g. AWS, GCP, Azure)",
        "Familiarity with Cloud patch management practices such as system rehydration and image management",
        "Experience utilizing Agile methodologies",
        "Experience with Software Security Architecture",
        "Experience with Application Security",
        "Experience with Threat Modeling",
        "Experience with Penetration Testing and/or Vulnerability Management",
        "Experience with integrating SaaS products into an Enterprise Environment",
        "Experience with securing Container services",
        "Financial services industry experience",
        "Professional certifications such as AWS Certified Solutions Architect and Certified Information Systems Security Professional (CISSP)",
        "Experience in Offensive and/or Defensive Security techniques",
        "Experience in a regulated environment",
      ],
    },
    location: "McLean, VA",
  },
  {
    id: 6,
    title: "Principal Associate, Information Security Office Consultant",
    company: "Capital One",
    description: {
      basicQualifications: [
        "High School Diploma, GED or equivalent certification",
        "At least 3 years of experience working in cybersecurity or information technology",
        "At least 1 year of experience providing guidance and oversight of Security concepts",
      ],
      preferredQualifications: [
        "Bachelor’s Degree",
        "3+ years of experience in securing a public cloud environment (e.g. AWS, GCP, Azure)",
        "Experience building software utilizing public cloud (e.g. AWS, GCP, Azure)",
        "Familiarity with Cloud patch management practices such as system rehydration and image management",
        "Experience utilizing Agile methodologies",
        "Experience with Software Security Architecture",
        "Experience with Application Security",
        "Experience with Threat Modeling",
        "Experience with Penetration Testing and/or Vulnerability Management",
        "Experience with integrating SaaS products into an Enterprise Environment",
        "Experience with securing Container services",
        "Financial services industry experience",
        "Professional certifications such as AWS Certified Solutions Architect and Certified Information Systems Security Professional (CISSP)",
        "Experience in Offensive and/or Defensive Security techniques",
        "Experience in a regulated environment",
      ],
    },
    location: "McLean, VA",
  },
  // Other job entries here...
];

// Render Bullet Points Function
const renderBulletPoints = (items) => (
  <List dense>
    {items.map((item, index) => (
      <ListItem key={index} disablePadding>
        <ListItemText primary={`• ${item}`} />
      </ListItem>
    ))}
  </List>
);

const JobMatching = () => {
  const [activeFeature, setActiveFeature] = useState("Job Matching");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const jobsPerPage = 3; // Number of jobs per page
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

                      {/* Basic Qualifications */}
                      <Typography variant="subtitle2" sx={{ marginTop: 2 }}>
                        Basic Qualifications:
                      </Typography>
                      {renderBulletPoints(job.description.basicQualifications)}

                      {/* Preferred Qualifications */}
                      <Typography variant="subtitle2" sx={{ marginTop: 2 }}>
                        Preferred Qualifications:
                      </Typography>
                      {renderBulletPoints(
                        job.description.preferredQualifications
                      )}

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ marginTop: 2 }}
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
