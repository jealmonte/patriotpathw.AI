import {
  Typography,
  Box,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import SchoolIcon from "@mui/icons-material/School"; // Career Coach
import WorkIcon from "@mui/icons-material/Work"; // Job Matching
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"; // Interview Prep
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Offer Negotiation
import DescriptionIcon from "@mui/icons-material/Description"; // Resume Review
import UpcomingIcon from "@mui/icons-material/Upcoming"; // More to Come
import { motion } from "framer-motion"; // For animations
import { useInView } from "react-intersection-observer"; // For scroll-triggered animations
import BackgroundAnimation from "../BackgroundAnimation"; // Import the reusable background animation component

// Styled components
const Section = styled(Box)({
  minHeight: "100vh",
  padding: "100px 50px",
  background:
    "linear-gradient(to bottom, #0a0a0a 0%, #2a2a2a 50%, #444444 100%)", // Gradient from black to gray
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
  scrollSnapAlign: "start", // Snap to the start of the section
});

const FeatureBox = styled(motion.div)({
  background: "rgba(255, 255, 255, 0.1)", // Slight transparent background
  padding: "50px", // Increased padding for larger boxes
  borderRadius: "8px",
  margin: "20px 0",
  minHeight: "250px", // Increased minimum height for bigger boxes
  zIndex: 1, // Ensure the feature boxes are above the background animation
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
});

// Define animation variants for framer-motion
const fadeInSlide = {
  hidden: { opacity: 0, x: -100 }, // Start from the left with no opacity
  visible: { opacity: 1, x: 0 }, // Slide in with full opacity
};

const contentFadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Features = () => {
  // Create scroll triggers for each feature, trigger animation multiple times
  const [careerRef, inViewCareer] = useInView({ triggerOnce: false });
  const [jobRef, inViewJob] = useInView({ triggerOnce: false });
  const [interviewRef, inViewInterview] = useInView({ triggerOnce: false });
  const [offerRef, inViewOffer] = useInView({ triggerOnce: false });
  const [resumeRef, inViewResume] = useInView({ triggerOnce: false });
  const [futureRef, inViewFuture] = useInView({ triggerOnce: false });

  const boxTransitionDuration = 0.5; // Duration of the box slide animation

  return (
    <Section>
      {/* Add the animated background */}
      <BackgroundAnimation />

      <Box>
        <Typography
          variant="h3"
          gutterBottom
          style={{
            color: "#FFCC33", // Use one of your brand colors
            fontWeight: "bold",
            marginBottom: "50px",
            fontSize: "4rem",
          }}
        >
          Our Features
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          style={{ zIndex: 1 }}
        >
          {/* Career Coach Feature */}
          <Grid item xs={12} sm={6} md={4}>
            <FeatureBox
              ref={careerRef}
              variants={fadeInSlide}
              initial="hidden"
              animate={inViewCareer ? "visible" : "hidden"}
              transition={{ duration: boxTransitionDuration }}
            >
              <motion.div
                variants={contentFadeIn}
                initial="hidden"
                animate={inViewCareer ? "visible" : "hidden"}
                transition={{ delay: boxTransitionDuration }} // Start fade-in after the box finishes sliding in
              >
                <ListItemIcon>
                  <SchoolIcon style={{ color: "#139F59", fontSize: 60 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Career Coach"
                  primaryTypographyProps={{
                    style: {
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  style={{ marginTop: "10px", fontSize: "1.5rem" }}
                >
                  Get personalized career advice and planning tools from our
                  AI-powered coach to help you stay on track.
                </Typography>
              </motion.div>
            </FeatureBox>
          </Grid>

          {/* Job Matching Feature */}
          <Grid item xs={12} sm={6} md={4}>
            <FeatureBox
              ref={jobRef}
              variants={fadeInSlide}
              initial="hidden"
              animate={inViewJob ? "visible" : "hidden"}
              transition={{ duration: boxTransitionDuration }}
            >
              <motion.div
                variants={contentFadeIn}
                initial="hidden"
                animate={inViewJob ? "visible" : "hidden"}
                transition={{ delay: boxTransitionDuration }} // Fade in after box animation finishes
              >
                <ListItemIcon>
                  <WorkIcon style={{ color: "#139F59", fontSize: 60 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Job Matching"
                  primaryTypographyProps={{
                    style: {
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  style={{ marginTop: "10px", fontSize: "1.5rem" }}
                >
                  Get AI-powered job matching based on your skills, experience,
                  and preferences to find the perfect fit.
                </Typography>
              </motion.div>
            </FeatureBox>
          </Grid>

          {/* Interview Preparation Feature */}
          <Grid item xs={12} sm={6} md={4}>
            <FeatureBox
              ref={interviewRef}
              variants={fadeInSlide}
              initial="hidden"
              animate={inViewInterview ? "visible" : "hidden"}
              transition={{ duration: boxTransitionDuration }}
            >
              <motion.div
                variants={contentFadeIn}
                initial="hidden"
                animate={inViewInterview ? "visible" : "hidden"}
                transition={{ delay: boxTransitionDuration }} // Fade in after box animation finishes
              >
                <ListItemIcon>
                  <QuestionAnswerIcon
                    style={{ color: "#139F59", fontSize: 60 }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Interview Prep"
                  primaryTypographyProps={{
                    style: {
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  style={{ marginTop: "10px", fontSize: "1.5rem" }}
                >
                  Practice common interview questions and improve your skills
                  with our intelligent preparation tools.
                </Typography>
              </motion.div>
            </FeatureBox>
          </Grid>

          {/* Offer Negotiation Feature */}
          <Grid item xs={12} sm={6} md={4}>
            <FeatureBox
              ref={offerRef}
              variants={fadeInSlide}
              initial="hidden"
              animate={inViewOffer ? "visible" : "hidden"}
              transition={{ duration: boxTransitionDuration }}
            >
              <motion.div
                variants={contentFadeIn}
                initial="hidden"
                animate={inViewOffer ? "visible" : "hidden"}
                transition={{ delay: boxTransitionDuration }} // Fade in after box animation finishes
              >
                <ListItemIcon>
                  <AttachMoneyIcon style={{ color: "#139F59", fontSize: 60 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Offer Negotiation"
                  primaryTypographyProps={{
                    style: {
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  style={{ marginTop: "10px", fontSize: "1.5rem" }}
                >
                  Receive expert advice and AI-driven suggestions on how to
                  negotiate job offers to maximize your compensation package.
                </Typography>
              </motion.div>
            </FeatureBox>
          </Grid>

          {/* Resume Review Feature */}
          <Grid item xs={12} sm={6} md={4}>
            <FeatureBox
              ref={resumeRef}
              variants={fadeInSlide}
              initial="hidden"
              animate={inViewResume ? "visible" : "hidden"}
              transition={{ duration: boxTransitionDuration }}
            >
              <motion.div
                variants={contentFadeIn}
                initial="hidden"
                animate={inViewResume ? "visible" : "hidden"}
                transition={{ delay: boxTransitionDuration }}
              >
                <ListItemIcon>
                  <DescriptionIcon style={{ color: "#139F59", fontSize: 60 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Resume Review"
                  primaryTypographyProps={{
                    style: {
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  style={{ marginTop: "10px", fontSize: "1.5rem" }}
                >
                  Use our AI-powered resume analysis tool to receive detailed
                  feedback and improve your resume for better job prospects.
                </Typography>
              </motion.div>
            </FeatureBox>
          </Grid>

          {/* Future Features */}
          <Grid item xs={12} sm={6} md={4}>
            <FeatureBox
              ref={futureRef}
              variants={fadeInSlide}
              initial="hidden"
              animate={inViewFuture ? "visible" : "hidden"}
              transition={{ duration: boxTransitionDuration }}
            >
              <motion.div
                variants={contentFadeIn}
                initial="hidden"
                animate={inViewFuture ? "visible" : "hidden"}
                transition={{ delay: boxTransitionDuration }}
              >
                <ListItemIcon>
                  <UpcomingIcon style={{ color: "#FFCC33", fontSize: 60 }} />
                </ListItemIcon>
                <ListItemText
                  primary="More to Come!"
                  primaryTypographyProps={{
                    style: {
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  style={{ marginTop: "10px", fontSize: "1.5rem" }}
                >
                  Stay tuned for more features and tools that will continue to
                  enhance your career journey.
                </Typography>
              </motion.div>
            </FeatureBox>
          </Grid>
        </Grid>
      </Box>
    </Section>
  );
};

Features.displayName = "Features";

export default Features;