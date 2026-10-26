import React, { useEffect } from "react";

function Navbar({ menuOpen, setMenuOpen }) {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const resumeUrl = `${import.meta.env.BASE_URL}AmanSayyadResume.pdf`;

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#090D16]/85 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Monogram */}
          <a
            href="#home"
            className="flex items-center space-x-2 font-mono text-lg font-semibold tracking-tight text-white hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded px-1"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            <span>
              aman<span className="text-sky-400">.sayyad</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300"
            aria-label="Main Navigation"
          >
            <a
              href="#about"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded px-2 py-1"
            >
              About
            </a>
            <a
              href="#experience"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded px-2 py-1"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded px-2 py-1"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded px-2 py-1"
            >
              Skills
            </a>
            <a
              href="#education"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded px-2 py-1"
            >
              Education
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded px-2 py-1"
            >
              Contact
            </a>

            {/* Resume Button */}
            <a
              href={resumeUrl}
              download="AmanSayyadResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-mono font-medium text-sky-300 bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 hover:border-sky-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Download Aman Sayyad Resume PDF"
            >
              <i className="ri-file-download-line text-sm"></i>
              <span>Resume</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href={resumeUrl}
              download="AmanSayyadResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono text-sky-300 bg-sky-500/10 border border-sky-500/30"
              aria-label="Download Resume"
            >
              <i className="ri-file-download-line"></i>
              <span>CV</span>
            </a>

            <button
              type="button"
              className="p-2 text-slate-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              <i
                className={`text-2xl ${
                  menuOpen ? "ri-close-line" : "ri-menu-line"
                }`}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
