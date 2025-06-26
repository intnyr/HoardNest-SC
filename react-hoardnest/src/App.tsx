import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const hoardnestTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4e542e",
    },
  },
});

const App: React.FC = () => {
  return (
  <ThemeProvider theme={hoardnestTheme}>
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </ThemeProvider>        
  );
};

export default App;
