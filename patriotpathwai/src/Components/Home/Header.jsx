import { AppBar, Toolbar, Button } from "@mui/material";
import { createTheme, styled } from "@mui/system";
import PropTypes from "prop-types"; // for prop validation
import PPLogo from '../../../Images/PP-Logo.png'; // Adjust the path as necessary

const StyledAppBar = styled(AppBar)({
  background: "transparent",
  boxShadow: "none",
  zIndex: 3,
});

const handleLogin = () => {
  window.location.href = 'https://59746679014.propelauthtest.com/login';
};

const Header = ({ scrollToSection, mainRef, featuresRef, aboutRef, contactRef, onLogin, onSignup }) => (
  <StyledAppBar position="absolute">
    <Toolbar>
      <img 
        src={PPLogo} 
        alt="PatriotPath Logo" 
        style={{ height: '150px', cursor: 'pointer' }} // Logo height
      />
      <div style={{ flexGrow: 1 }} /> {/* This div helps with spacing */}
      <Button 
        color="inherit" 
        onClick={() => scrollToSection(featuresRef)} 
        sx={{ fontSize: '1.5rem', fontWeight: 'bold' }} // Enlarged font size
      >
        Features
      </Button>
      <Button 
        color="inherit" 
        onClick={() => scrollToSection(aboutRef)} 
        sx={{ fontSize: '1.5rem', fontWeight: 'bold' }} // Enlarged font size
      >
        About
      </Button>
      <Button 
        color="inherit" 
        onClick={() => scrollToSection(contactRef)} 
        sx={{ fontSize: '1.5rem', fontWeight: 'bold' }} // Enlarged font size
      >
        Contact
      </Button>
      <Button 
        color="inherit" 
        variant="outlined" 
        sx={{ ml: 2, fontSize: '1.5rem', fontWeight: 'bold' }} // Enlarged font size
        onClick={handleLogin}
      >
        Login
      </Button>
      <Button
        color="inherit"
        variant="outlined"
        sx={{ ml: 2, fontSize: '1.5rem', fontWeight: 'bold' }} // Enlarged font size
        onClick={onSignup}
      >
        Sign Up
      </Button>
    </Toolbar>
  </StyledAppBar>
);

// Prop Types validation
Header.propTypes = {
  scrollToSection: PropTypes.func.isRequired, // Expecting a function
  mainRef: PropTypes.object.isRequired, // Expecting a ref object
  featuresRef: PropTypes.object.isRequired, // Expecting a ref object
  aboutRef: PropTypes.object.isRequired, // Expecting a ref object
  contactRef: PropTypes.object.isRequired, // Expecting a ref object
};

export default Header;
