import React, { useEffect } from "react";

function MobileMenu({ menuOpen, setMenuOpen }) {
  const resumeUrl = `${import.meta.env.BASE_URL}AmanSayyadResume.pdf`;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, setMenuOpen]);

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Education", href: "/#education" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className={`fixed inset-0 z-50 bg-[#090D16]/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col justify-between p-6 ${
        menuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Top Header inside Menu */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <a
          href="/#home"
          onClick={() => setMenuOpen(false)}
          className="font-mono text-lg font-semibold text-white"
        >
          aman<span className="text-sky-400">.sayyad</span>
        </a>
        <button
          onClick={() => setMenuOpen(false)}
          className="p-2 text-slate-300 hover:text-white text-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
          aria-label="Close menu"
        >
          <i className="ri-close-line"></i>
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col space-y-4 py-8">
        {navLinks.map((link, idx) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-display font-medium text-slate-200 hover:text-sky-400 transition-all duration-300 transform ${
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${idx * 40}ms` }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Footer / Resume in Menu */}
      <div className="pt-6 border-t border-slate-800 flex flex-col gap-4">
        <a
          href={resumeUrl}
          download="AmanSayyadResume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-mono font-medium text-sky-300 bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20"
        >
          <i className="ri-file-download-line text-lg"></i>
          <span>Download Resume (PDF)</span>
        </a>

        <div className="flex justify-center items-center gap-6 text-slate-400 text-xl pt-2">
          <a
            href="https://github.com/111-amann"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <i className="ri-github-fill"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/aman-sayyad-5a8a322b0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn Profile"
          >
            <i className="ri-linkedin-box-fill"></i>
          </a>
          <a
            href="https://x.com/AmanSay35959827"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="Twitter Profile"
          >
            <i className="ri-twitter-x-line"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
