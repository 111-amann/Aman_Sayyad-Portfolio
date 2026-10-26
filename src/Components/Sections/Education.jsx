import React from "react";
import RevealOnScroll from "../RevealOnScroll";

function Education() {
  const academics = [
    {
      degree: "MCA (Master of Computer Applications)",
      institution: "Sanjivani University, Kopargaon",
      period: "2025 – 2027",
      metric: "CGPA: 8.41",
      status: "In Progress",
      coursework:
        "Data Structures, Agile Methodologies, Operating Systems, Computer Networks.",
    },
    {
      degree: "BSc in Computer Science",
      institution:
        "Shri SaiBaba Senior College, Shirdi (Savitribai Phule Pune University)",
      period: "2021 – 2024",
      metric: "CGPA: 8.49",
      status: "Graduated",
      coursework:
        "Object-Oriented Programming, Database Systems, Web Technologies, Software Engineering.",
    },
    {
      degree: "MERN Stack Professional Course",
      institution: "The Kiran Academy, Pune",
      period: "Jun 2024 – Dec 2024",
      metric: "6 Months Intensive",
      status: "Completed",
      coursework:
        "HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, RESTful Architecture.",
    },
  ];

  const leadership = [
    {
      role: "Google Student Ambassador",
      organization: "Sanjivani University",
      period: "Jun 2025 – Dec 2025",
      description:
        "Represented Sanjivani University, organizing technical workshops, developer awareness sessions, and helping peers adopt Google technologies.",
      icon: "ri-google-fill",
    },
    {
      role: "Ohayou Japan Festival 2025 Coordinator",
      organization: "Cultural & Academic Committee",
      period: "2025",
      description:
        "Coordinated cultural exchange activities, technical workshops, and event logistics while facilitating student and international guest engagement.",
      icon: "ri-community-line",
    },
    {
      role: "Mission Exploit CTF Volunteer",
      organization: "Department of Cyber Security",
      period: "2025",
      description:
        "Supported the Department of Cyber Security in organizing a collegiate Capture The Flag (CTF) competition, assisting with event workflows and participant management.",
      icon: "ri-shield-keyhole-line",
    },
  ];

  return (
    <section id="education" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          {/* Section Header */}
          <div className="mb-14 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>05 &bull; Academic &amp; Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Education &amp; Leadership
            </h2>
            <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Academic Credentials (Left 6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-sm font-mono text-slate-300 font-semibold mb-2">
                <i className="ri-graduation-cap-line text-sky-400 text-lg"></i>
                <span>Academic Degrees &amp; Training</span>
              </div>

              {academics.map((item) => (
                <div
                  key={item.degree}
                  className="p-6 rounded-xl border border-slate-800 bg-[#111827]/90 hover:border-slate-700 transition-all shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="text-base font-display font-bold text-white">
                      {item.degree}
                    </h3>
                    <span className="text-xs font-mono text-sky-400 font-medium">
                      {item.metric}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-medium mb-1">
                    {item.institution}
                  </p>

                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-3">
                    <span>{item.period}</span>
                    <span>&bull;</span>
                    <span className="text-slate-400">{item.status}</span>
                  </div>

                  <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-3 leading-relaxed">
                    <strong className="text-slate-300 font-medium">Coursework:</strong> {item.coursework}
                  </p>
                </div>
              ))}
            </div>

            {/* Leadership & Activities (Right 6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-sm font-mono text-slate-300 font-semibold mb-2">
                <i className="ri-team-line text-sky-400 text-lg"></i>
                <span>Leadership &amp; Campus Activities</span>
              </div>

              {leadership.map((item) => (
                <div
                  key={item.role}
                  className="p-6 rounded-xl border border-slate-800 bg-[#111827]/90 hover:border-slate-700 transition-all shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-base">
                          <i className={item.icon}></i>
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-display font-bold text-white">
                            {item.role}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {item.organization}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-slate-400 shrink-0">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default Education;
