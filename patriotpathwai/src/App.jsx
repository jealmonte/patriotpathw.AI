import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import ChatPage from "./Pages/ChatPage";
import Questionnaire from "./Components/Questionaire";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none", // to remove the white outline after clicking a button across whole app
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box width="100vw" height="100vh" overflow="auto">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ChatPage" element={<ChatPage />} />
            <Route path="/SignUp/Questionaire" element={<Questionnaire />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
