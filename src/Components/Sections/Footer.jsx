import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  const resumeUrl = `${import.meta.env.BASE_URL}AmanSayyadResume.pdf`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-800 bg-[#090D16] text-slate-400 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <a
            href="#home"
            className="font-mono text-base font-semibold text-white hover:text-sky-400 transition-colors"
          >
            aman<span className="text-sky-400">.sayyad</span>
          </a>
          <p className="text-xs text-slate-400">
            &copy; {currentYear} Aman Sayyad. All rights reserved.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#experience" className="hover:text-white transition-colors">
            Experience
          </a>
          <a href="#projects" className="hover:text-white transition-colors">
            Projects
          </a>
          <a href="#skills" className="hover:text-white transition-colors">
            Skills
          </a>
          <a href="#education" className="hover:text-white transition-colors">
            Education
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
          <a
            href={resumeUrl}
            download="AmanSayyadResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 transition-colors"
          >
            Resume (PDF)
          </a>
        </div>

        {/* Right: Back to Top */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 bg-[#111827] transition-all"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <i className="ri-arrow-up-line text-sm"></i>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
