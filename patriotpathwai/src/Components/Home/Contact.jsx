import React, { forwardRef, useState } from "react";
import { Typography, Box, TextField, Button, Alert } from "@mui/material";
import { styled } from "@mui/system";
import BackgroundAnimation from "../BackgroundAnimation"; // Import the BackgroundAnimation component

// Styled components
const Section = styled(Box)({
  minHeight: "80vh",
  padding: "80px 20px",
  background: "linear-gradient(to bottom, #0a0a0a, #1a3a2a)", // Replace with gradient background
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

const Contact = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false); // Track if form is submitted

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    console.log("Form Data Submitted:", formData);

    // Clear the form fields
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    // Show the success message
    setSubmitted(true);

    // Hide the message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Section ref={ref}>
      {/* Add the animated background */}
      <BackgroundAnimation />

      <FormBox>
        <Typography variant="h3" gutterBottom>
          Contact Us
        </Typography>

        {/* Success message */}
        {submitted && (
          <Alert severity="success" sx={{ marginBottom: "20px" }}>
            Your message has been sent successfully!
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
                "&:hover fieldset": {
                  borderColor: "#FFCC33 !important", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFCC33", // Border color when focused
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </form>
      </FormBox>
    </Section>
  );
});

Contact.displayName = "Contact";

export default Contact;
