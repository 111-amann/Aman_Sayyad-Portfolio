import React from "react";
import RevealOnScroll from "../RevealOnScroll";

function About() {
  const highlights = [
    {
      icon: "ri-code-box-line",
      title: "Full-Stack Development",
      description:
        "Building end-to-end web applications with modern React on the frontend and scalable Node.js/Express APIs with MongoDB on the backend.",
    },
    {
      icon: "ri-layout-masonry-line",
      title: "Modern UI Architecture",
      description:
        "Translating complex user workflows into clean, accessible, and responsive user interfaces with modular components and Tailwind CSS.",
    },
    {
      icon: "ri-git-branch-line",
      title: "Industry Collaboration",
      description:
        "Hands-on internship experience at GBTech contributing to enterprise audit tooling, financial recalculation modules, and structured codebases.",
    },
    {
      icon: "ri-graduation-cap-line",
      title: "Continuous Academic Growth",
      description:
        "Pursuing Master of Computer Applications (MCA) with a strong foundation in Data Structures, Computer Networks, and Agile Methodologies.",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          {/* Section Header */}
          <div className="mb-14 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>01 &bull; Background &amp; Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              About Me
            </h2>
            <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"></div>
          </div>

          {/* Narrative & Highlights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Story Paragraphs */}
            <div className="lg:col-span-6 space-y-5 text-slate-300 leading-relaxed">
              <p>
                I am a passionate <strong className="text-white">Software Developer</strong> who
                thrives on turning ambitious ideas into polished, high-performance web products.
                My journey began with deep curiosity about how distributed systems and responsive user
                interfaces interact to solve everyday challenges.
              </p>
              <p>
                With hands-on experience in the <strong className="text-sky-300">MERN stack</strong> and
                real-world internship work at <strong className="text-white">GBTech</strong>, I focus
                on writing clean, maintainable, and well-structured code. Whether architecting real-time
                collaborative tools like <span className="text-white font-medium">Talent IQ</span> or
                optimizing frontend state in enterprise dashboards, I prioritize user experience, performance,
                and maintainability.
              </p>
              <p>
                I am currently pursuing my <strong className="text-white">MCA at Sanjivani University</strong>,
                having graduated with an 8.49 CGPA in BSc Computer Science. Beyond coding, I actively participate
                in campus tech leadership as a <strong className="text-slate-200">Google Student Ambassador</strong> and
                collaborate with fellow developers on open-source initiatives.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl border border-slate-800 bg-[#111827]/80 hover:border-slate-700 hover:bg-[#111827] transition-all transform hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-xl mb-4">
                    <i className={item.icon}></i>
                  </div>
                  <h3 className="text-base font-display font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default About;
