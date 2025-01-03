import {
  Typography,
  Box,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import BackgroundAnimation from "../BackgroundAnimation";
import React, { forwardRef } from "react";

// Styled components
const Section = styled(Box)({
  minHeight: "100vh",
  background:
    "linear-gradient(to bottom, #0a0a0a 0%, #2a2a2a 50%, #444444 100%)",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
  scrollSnapAlign: "start",
});

const FeatureBox = styled(motion.div)({
  background: "rgba(255, 255, 255, 0.1)",
  padding: "10px",
  borderRadius: "8px",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",

  // Default state
  "&:hover": {
    transform: "scale(1.05)", // Scale up on hover
    boxShadow: "0 0 15px rgba(33, 235, 134, 0.6)", // Neon glow effect
  },
  "&:hover::before": {
    content: '""',
    position: "absolute",
    top: "-2px",
    left: "-2px",
    right: "-2px",
    bottom: "-2px",
    borderRadius: "10px",
    boxShadow: "0 0 30px 5px rgba(33, 235, 134, 0.5)",
    zIndex: -1, // Ensure the glow stays behind the box
  },
});

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // Stagger each feature’s animation
    },
  },
};

const featureVariants = {
  hidden: { opacity: 0, y: -50 }, // Start above with opacity 0
  visible: { opacity: 1, y: 0 }, // Drop to original position
};

const Features = forwardRef((props, ref) => {
  const [containerRef, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <Section ref={ref}>
      <BackgroundAnimation />

      <Box>
        <Typography
          variant="h3"
          gutterBottom
          style={{
            color: "#FFCC33",
            fontWeight: "bold",
            fontSize: "4rem",
          }}
        >
          Our Features
        </Typography>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="stretch"
          style={{ zIndex: 1, padding: "10px 100px" }}
          ref={containerRef}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map(({ Icon, title, description }, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              style={{ display: "flex" }}
            >
              <FeatureBox
                variants={featureVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <ListItemIcon>
                  <Icon style={{ color: "#139F59", fontSize: 60 }} />
                </ListItemIcon>
                <ListItemText
                  primary={title}
                  primaryTypographyProps={{
                    style: { fontSize: "2.5rem", fontWeight: "bold" },
                  }}
                />
                <Typography
                  variant="body2"
                  style={{ marginTop: "10px", fontSize: "1.5rem", flexGrow: 1 }}
                >
                  {description}
                </Typography>
              </FeatureBox>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Section>
  );
});

Features.displayName = "Features";

export default Features;

// Feature data array
const features = [
  {
    Icon: SchoolIcon,
    title: "Career Coach",
    description:
      "Get personalized career advice and planning tools from our AI-powered coach to help you stay on track.",
  },
  {
    Icon: WorkIcon,
    title: "Job Matching",
    description:
      "Get AI-powered job matching based on your skills, experience, and preferences to find the perfect fit.",
  },
  {
    Icon: QuestionAnswerIcon,
    title: "Interview Prep",
    description:
      "Practice common interview questions and improve your skills with our intelligent preparation tools.",
  },
  {
    Icon: AttachMoneyIcon,
    title: "Offer Negotiation",
    description:
      "Receive expert advice and AI-driven suggestions on how to negotiate job offers to maximize your compensation package.",
  },
  {
    Icon: DescriptionIcon,
    title: "Resume Review",
    description:
      "Use our AI-powered resume analysis tool to receive detailed feedback and improve your resume for better job prospects.",
  },
  {
    Icon: UpcomingIcon,
    title: "More to Come!",
    description:
      "Stay tuned for more features and tools that will continue to enhance your career journey in the future.",
  },
];
