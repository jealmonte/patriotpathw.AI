import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion"; // Animation library
import BackgroundAnimation from "../BackgroundAnimation"; // Import Background Animation

// Styled component for section layout
const Section = styled(Box)({
  minHeight: "100vh",
  padding: "100px 50px",
  background: "linear-gradient(to bottom, #444444, #0a0a0a)", // Gradient background
  position: "relative", // Important to position the background animation properly
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
  scrollSnapAlign: "start", // Snap to the start of the section
});

// Fade-in animation for content
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <Section>
      {/* Add the animated background */}
      <BackgroundAnimation />

      {/* Content Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }} // Animation triggers once when in view
        transition={{ duration: 0.8 }}
        variants={fadeIn}
        style={{ zIndex: 1 }} // Ensure content stays above the background animation
      >
        <Typography
          variant="h3"
          gutterBottom
          style={{ color: "#FFCC33", fontWeight: "bold", fontSize: "4rem" }}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          maxWidth="800px"
          margin="0 auto"
          style={{ fontSize: "1.5rem", lineHeight: "1.8rem" }}
        >
          At PatriotPath, we are dedicated to empowering students and
          professionals to navigate their career journeys with confidence. Our
          innovative, AI-driven platform offers personalized career guidance
          tailored to your unique skills, experience, and aspirations. Whether
          you're just starting out or looking to make a career change,
          PatriotPath is here to help you reach your full potential. Our mission
          is to make career planning simple, intuitive, and accessible for
          everyone.
        </Typography>
      </motion.div>
    </Section>
  );
};

AboutUs.displayName = "AboutUs";

export default AboutUs;
