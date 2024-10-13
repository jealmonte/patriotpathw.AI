import React, { useState } from "react";
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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FilterListIcon from '@mui/icons-material/FilterList';
import Sidebar from "../Components/Sidebar";
import { useLogoutFunction } from "@propelauth/react";
import JsonData from "../../../ScrapeData/dataset_indeed-scraper_2024-10-12_22-56-02-729.json";
import { styled } from "@mui/material";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: { default: "#303030", paper: "#424242" },
    text: { primary: "#ffffff", secondary: "#b0bec5" },
  },
});

const StyledApplyButton = styled(Button)(({ theme }) => ({
  "--color": "#139F59",
  fontFamily: "inherit",
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
  const jobsPerPage =4;
 
  const logout = useLogoutFunction();

  const [anchorEl, setAnchorEl] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({ minSalary:'', maxSalary:'', locationInput:'' });

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
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
  const currentJobs = filteredJobData.slice(indexOfFirstJob, indexOfLastJob);

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
          <Box bgcolor="background.paper" p={2} display="flex" alignItems="center">
            <Typography variant="h5">Job Matching</Typography>
            <IconButton aria-label="filter" sx={{ marginLeft:"auto" }} onClick={handleFilterClick}>
              <FilterListIcon fontSize="large" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
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
                    style={{ maxWidth:"100px", minWidth:"100px" }}
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
                    style={{ maxWidth:"100px", minWidth:"100px" }}
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

          <Box flex={1} p={2} overflow="auto">
            <Stack spacing={2}>
              {currentJobs.map((job) => (
                <Card key={job.id} sx={{ position:"relative", display:"flex", alignItems:"center", elevation: 3 }}>
                  <StyledApplyButton endIcon={<OpenInNewIcon />}>
                    Apply
                  </StyledApplyButton>
                  <Box sx={{ display:"flex", flexDirection:"column", flex :1 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {job.positionName}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {job.company}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ marginRight :1 }}>
                        Location:{job.location}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Salary:{job.salary}
                      </Typography>
                      <Typography variant="body2">
                        {cleanDescription(job.description)}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center" p={2} bgcolor="background.paper">
            <Pagination count={Math.ceil(filteredJobData.length / jobsPerPage)} page={currentPage} onChange={handlePageChange} color="primary"/>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default JobMatching;