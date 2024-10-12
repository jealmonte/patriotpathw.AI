import { Typography, Box, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import BackgroundAnimation from "../BackgroundAnimation"; // Import the BackgroundAnimation component

// Styled components
const Section = styled(Box)({
  minHeight: "100vh",
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

const Contact = () => {
  return (
    <Section>
      {/* Add the animated background */}
      <BackgroundAnimation />

      <FormBox>
        <Typography variant="h3" gutterBottom>
          Contact Us
        </Typography>
        <TextField
          label="Your Name"
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
                borderColor: "#FFCC33 !important", // Border color on hover, set !important to avoid being overridden
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FFCC33", // Border color when focused
              },
            },
          }}
        />
        <TextField
          label="Your Email"
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
          label="Your Message"
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
        <Button variant="contained" color="primary" sx={{ marginTop: "20px" }}>
          Submit
        </Button>
      </FormBox>
    </Section>
  );
};

Contact.displayName = "Contact";

export default Contact;
