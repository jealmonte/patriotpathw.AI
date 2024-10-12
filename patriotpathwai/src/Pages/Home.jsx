import { Box } from "@mui/material";
import Main from "../Components/Home/Main";
import Features from "../Components/Home/Features";
import AboutUs from "../Components/Home/AboutUs";
import Contact from "../Components/Home/Contact";
import Header from "../Components/Home/Header";

function Home() {
  return (
    <Box>
      <Header />
      <Main />
      <Features />
      <AboutUs />
      <Contact />
    </Box>
  );
}

export default Home;