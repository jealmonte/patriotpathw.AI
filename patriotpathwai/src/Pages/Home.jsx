import React, {useRef} from "react";
import { Box } from "@mui/material";
import Main from "../Components/Home/Main";
import Features from "../Components/Home/Features";
import AboutUs from "../Components/Home/AboutUs";
import Contact from "../Components/Home/Contact";
import Header from "../Components/Home/Header";

function Home() {
  const mainRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{
      height: '100vh',
      overflowY: 'scroll',
      scrollSnapType: 'y mandatory'
    }}>
      <Header scrollToSection={scrollToSection} mainRef={mainRef} featuresRef={featuresRef} aboutRef={aboutRef} contactRef={contactRef}/>
      <Main ref={mainRef} sx={{ scrollSnapAlign: 'start', height: '100vh' }}/>
      <Features ref={featuresRef} sx={{ scrollSnapAlign: 'start', height: '100vh' }}/>
      <AboutUs ref={aboutRef} sx={{ scrollSnapAlign: 'start', height: '100vh' }}/>
      <Contact ref={contactRef} sx={{ scrollSnapAlign: 'start', height: '100vh' }}/>
    </Box>
  );
}

export default Home;