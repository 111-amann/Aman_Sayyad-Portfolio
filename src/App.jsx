import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingScreen } from "./Components/LoadingScreen";
import "./index.css";

import Navbar from "./Components/Sections/Navbar";
import MobileMenu from "./Components/MobileMenu";
import Home from "./Components/Sections/Home";
import About from "./Components/Sections/About";
import Experience from "./Components/Sections/Experience";
import Projects from "./Components/Sections/Projects";
import Skills from "./Components/Sections/Skills";
import Education from "./Components/Sections/Education";
import Contact from "./Components/Sections/Contact";
import Footer from "./Components/Sections/Footer";
import ProjectsPage from "./Components/Sections/ProjectsPage";

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Home />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-[#090D16] text-[#F3F4F6] selection:bg-sky-500/20 selection:text-white`}
      >
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
