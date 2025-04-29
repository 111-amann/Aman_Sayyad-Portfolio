import { useEffect, useState } from "react";
import { LoadingScreen } from "./Components/LoadingScreen";
import "./index.css";
import Navbar from "./Components/Sections/Navbar";
import MobileMenu from "./Components/MobileMenu";
import Home from "./Components/Sections/Home";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(!isLoaded)} />}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-black text-grey-100`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home /> 
      </div>
    </>
  );
}

export default App;
