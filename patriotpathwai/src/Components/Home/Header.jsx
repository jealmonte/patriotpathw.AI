import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import PropTypes from "prop-types"; // for prop validation

const StyledAppBar = styled(AppBar)({
  background: "transparent",
  boxShadow: "none",
  zIndex: 3,
});

const Header = ({scrollToSection, mainRef, featuresRef, aboutRef, contactRef}) => (
  <StyledAppBar position="absolute">
    <Toolbar>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, cursor: "pointer" }}
      >
        PatriotPath
      </Typography>
      <Button color="inherit" onClick={() => scrollToSection(featuresRef)}>
        Features
      </Button>
      <Button color="inherit" onClick={() => scrollToSection(aboutRef)}>
        About
      </Button>
      <Button color="inherit" onClick={() => scrollToSection(contactRef)}>
        Contact
      </Button>
      <Button color="inherit" variant="outlined" sx={{ ml: 2 }}>
        Login
      </Button>
      <Button
        color="inherit"
        variant="outlined"
        sx={{ ml: 2 }}
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