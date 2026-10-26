import React from "react";
import RevealOnScroll from "../RevealOnScroll";

function Skills() {
  const skillDomains = [
    {
      category: "Frontend Architecture",
      icon: "ri-layout-line",
      skills: [
        "React",
        "JavaScript (ES6+)",
        "Redux Toolkit",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Bootstrap",
        "Responsive UI/UX",
      ],
    },
    {
      category: "Backend & Systems",
      icon: "ri-server-line",
      skills: [
        "Node.js",
        "Express.js",
        "RESTful APIs",
        "Java",
        "Authentication (Clerk / JWT)",
        "Webhook Pipelines",
      ],
    },
    {
      category: "Databases & Storage",
      icon: "ri-database-2-line",
      skills: [
        "MongoDB",
        "MySQL",
        "SQL",
        "Mongoose ODM",
        "LocalStorage Caching",
      ],
    },
    {
      category: "Tooling & Best Practices",
      icon: "ri-tools-line",
      skills: [
        "Git & GitHub",
        "Vite",
        "Postman",
        "Agile / Scrum",
        "Data Structures & Algorithms",
        "Monaco Editor",
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 relative bg-[#090D16]/50">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          {/* Section Header */}
          <div className="mb-14 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>04 &bull; Technical Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Technical Skills
            </h2>
            <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"></div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillDomains.map((domain) => (
              <div
                key={domain.category}
                className="p-6 rounded-xl border border-slate-800 bg-[#111827]/90 flex flex-col justify-between hover:border-slate-700 hover:bg-[#111827] transition-all transform hover:-translate-y-1 shadow-sm"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-xl mb-4">
                    <i className={domain.icon}></i>
                  </div>

                  <h3 className="text-base font-display font-bold text-white mb-4">
                    {domain.category}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {domain.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded text-xs font-mono text-slate-300 bg-[#0B0F19] border border-slate-800 hover:border-slate-700 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default Skills;
