import React from "react";
import RevealOnScroll from "../RevealOnScroll";

function Home() {
  const resumeUrl = `${import.meta.env.BASE_URL}AmanSayyadResume.pdf`;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Subtle background architectural grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"
      ></div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and Narrative */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Software Developer &bull; Available for Roles</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.1] mb-6">
                Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">
                  scalable web apps
                </span>{" "}
                with precision.
              </h1>

              {/* Professional Subtitle */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                Hi, I'm <strong className="text-white font-semibold">Aman Sayyad</strong>.
                A software developer with a strong frontend and MERN-stack background.
                Currently completing my MCA, I design and build production-ready applications
                focusing on clean architecture, responsive performance, and reliable user experiences.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
                <a
                  href="#projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all transform hover:-translate-y-0.5 shadow-sm shadow-sky-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <span>Explore Projects</span>
                  <i className="ri-arrow-down-line text-base"></i>
                </a>

                <a
                  href={resumeUrl}
                  download="AmanSayyadResume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-mono font-medium text-slate-200 bg-slate-900/80 border border-slate-700/80 hover:border-sky-400 hover:text-white transition-all transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  aria-label="Download Aman Sayyad Resume"
                >
                  <i className="ri-file-download-line text-base text-sky-400"></i>
                  <span>Download Resume</span>
                </a>

                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <span>Contact Me &rarr;</span>
                </a>
              </div>

              {/* Social / Profiles */}
              <div className="flex items-center gap-4 text-slate-400 text-sm font-mono">
                <span className="text-xs uppercase tracking-wider text-slate-400">Profiles:</span>
                <a
                  href="https://github.com/111-amann"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors p-1"
                  aria-label="GitHub Profile"
                >
                  <i className="ri-github-fill text-xl"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/aman-sayyad-5a8a322b0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors p-1"
                  aria-label="LinkedIn Profile"
                >
                  <i className="ri-linkedin-box-fill text-xl"></i>
                </a>
                <a
                  href="https://x.com/AmanSay35959827"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors p-1"
                  aria-label="Twitter/X Profile"
                >
                  <i className="ri-twitter-x-line text-lg"></i>
                </a>
              </div>
            </div>

            {/* Right Column: Architectural Terminal / Code Card */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-xl border border-slate-800 bg-[#111827]/90 shadow-2xl p-5 sm:p-6 backdrop-blur-sm transition-all hover:border-slate-700">
                {/* Terminal Window Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    developer.config.ts
                  </span>
                  <div className="w-12"></div>
                </div>

                {/* Code Content */}
                <pre className="font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                  <code>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-sky-300">engineer</span> = &#123;
                    {"\n"}  name: <span className="text-emerald-300">"Aman Sayyad"</span>,
                    {"\n"}  role: <span className="text-emerald-300">"Software Developer"</span>,
                    {"\n"}  internship: &#123;
                    {"\n"}    company: <span className="text-emerald-300">"GBTech"</span>,
                    {"\n"}    status: <span className="text-emerald-300">"Ongoing"</span>,
                    {"\n"}    focus: <span className="text-emerald-300">"Audit UI & Systems"</span>,
                    {"\n"}  &#125;,
                    {"\n"}  coreStack: [
                    {"\n"}    <span className="text-amber-300">"React"</span>,{" "}
                    <span className="text-amber-300">"Node.js"</span>,{" "}
                    <span className="text-amber-300">"Express"</span>,
                    {"\n"}    <span className="text-amber-300">"MongoDB"</span>,{" "}
                    <span className="text-amber-300">"TailwindCSS"</span>
                    {"\n"}  ],
                    {"\n"}  education: <span className="text-emerald-300">"MCA @ Sanjivani Univ"</span>,
                    {"\n"}&#125;;
                  </code>
                </pre>

                {/* Active Footnote */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                    <span>Ready for build deployment</span>
                  </div>
                  <span className="text-slate-400">UTF-8</span>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default Home;
