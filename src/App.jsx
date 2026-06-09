import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingScreen } from "./Components/LoadingScreen";
import "./index.css";

import Navbar from "./Components/Sections/Navbar";
import MobileMenu from "./Components/MobileMenu";
import Home from "./Components/Sections/Home";
import About from "./Components/Sections/About";
import Projects from "./Components/Sections/Projects";
import Contact from "./Components/Sections/Contact";
import ProjectsPage from "./Components/Sections/ProjectsPage";

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Home />
      <About />
      <Projects />
      <Contact />
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
        } bg-black text-grey-100`}
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
