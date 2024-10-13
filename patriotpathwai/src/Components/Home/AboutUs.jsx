import { forwardRef } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import BackgroundAnimation from "../BackgroundAnimation";
import PropTypes from "prop-types";

// Styled components
const Section = styled(Box)({
  minHeight: "70vh",
  padding: "100px 50px",
  background: "linear-gradient(to bottom, #444444, #0a0a0a)", // Darker gradient
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
  scrollSnapAlign: "start",
});

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = forwardRef(({ scrollToSection, contactRef, ...props }, ref) => {
  return (
    <Section ref={ref}>
      <BackgroundAnimation />

      <Grid
        container
        spacing={6}
        justifyContent="center"
        alignItems="center"
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delayChildren: 0.3, staggerChildren: 0.2 }}
        variants={fadeIn}
        style={{ zIndex: 1,  }}
      >
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            gutterBottom
            style={{
              color: "#FFCC33",
              fontWeight: "bold",
              fontSize: "4rem",
              marginBottom: "20px",
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            style={{
              fontSize: "1.5rem",
              lineHeight: "2rem",
              marginBottom: "20px",
            }}
          >
            At PatriotPath, we are dedicated to empowering students and
            professionals to navigate their career journeys with confidence. Our
            innovative, AI-driven platform offers personalized career guidance
            tailored to your unique skills, experience, and aspirations.
          </Typography>
          <Typography
            variant="body1"
            style={{
              fontSize: "1.5rem",
              lineHeight: "2rem",
              marginBottom: "20px",
            }}
          >
            Whether you're just starting out or looking to make a career change,
            PatriotPath is here to help you reach your full potential. Our
            mission is to make career planning simple, intuitive, and accessible
            for everyone.
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              marginTop: "20px",
              fontWeight: 500,
              padding: "10px 20px",
            }}
            onClick={() => scrollToSection(contactRef)}
          >
            Contact Us
          </Button>
        </Grid>

        <Grid item xs={6} md={3}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <img
              src="https://pbs.twimg.com/profile_images/1828106241924624387/sDLsmmac_400x400.jpg"
              alt="PatriotPath Illustration"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </motion.div>
        </Grid>
      </Grid>
    </Section>
  );
});

AboutUs.propTypes = {
  scrollToSection: PropTypes.func.isRequired, // Ensures it's a function
  contactRef: PropTypes.object.isRequired, // Ensures it's a ref object
};

AboutUs.displayName = "AboutUs";

export default AboutUs;
