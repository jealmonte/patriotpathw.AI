import React, { useState, forwardRef } from "react";
import { Typography, Box, TextField, Button, Alert } from "@mui/material";
import { createTheme, styled } from "@mui/system";
import BackgroundAnimation from "../BackgroundAnimation"; // Import the BackgroundAnimation component
import { motion } from 'framer-motion';

// Styled components
const Section = styled(Box)({
  minHeight: "80vh",
  padding: "80px 20px",
  background: "linear-gradient(to bottom, #0a0a0a, #1a3a2a)", // Gradient background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  position: "relative", // Ensure correct layering for background animation
  color: "#fff",
  scrollSnapAlign: "start", // Snap to the start of the section
});

const FormBox = styled(Box)({
  background: "rgba(0, 0, 0, 0.7)", // Dark transparent background for the form
  padding: "40px",
  borderRadius: "8px",
  maxWidth: "600px",
  width: "100%",
  zIndex: 1, // Ensure the form box stays on top of the background animation
});

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Contact = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending....");

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("message", formData.message);
    formPayload.append("access_key", "ac978316-9d52-448e-a33d-a43ca0e32175");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResult("An error occurred. Please try again.");
    }
    
    // Show success message for a short duration
    setTimeout(() => setResult(""), 3000);
  };

  return (
    <Section ref={ref}>
      <BackgroundAnimation />

      <FormBox component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delayChildren: 0.3, staggerChildren: 0.2 }}
        variants={fadeIn}>
        
        <Typography variant="h3" gutterBottom>
          Contact Us
        </Typography>

        {/* Success/Error message */}
        {result && (
          <Alert severity={result.includes("Successfully") ? "success" : "error"} sx={{ marginBottom: "20px" }}>
            {result}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#fff" } }} // Label color
            InputProps={{
              style: { color: "#fff" }, // Text color
              sx: {
                "& fieldset": {
                  borderColor: "#fff", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#FFCC33 !important", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFCC33", // Border color when focused
                },
              },
            }}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{
              style: { color: "#fff" },
              sx: {
                "& fieldset": {
                  borderColor: "#fff", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#FFCC33 !important", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFCC33", // Border color when focused
                },
              },
            }}
          />
          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{
              style: { color: "#fff" },
              sx: {
                "& fieldset": {
                  borderColor: "#fff", // Default border color
                },
                "& hover fieldset": {
                  borderColor:"#FFCC33 !important", // Border color on hover 
                },
                "& .Mui-focused fieldset": {
                  borderColor:"#FFCC33", // Border color when focused 
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop:"20px" }}
          >
             Submit 
          </Button>
         </form>
       </FormBox>
     </Section>
   );
})

Contact.displayName = "Contact";

export default Contact;