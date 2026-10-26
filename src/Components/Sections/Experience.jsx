import React from "react";
import RevealOnScroll from "../RevealOnScroll";

function Experience() {
  const internshipDetails = {
    company: "GBTech",
    location: "Mumbai, India",
    role: "Software Developer Intern",
    period: "August 2026 – January 2027",
    status: "Ongoing",
    description:
      "Contributing to enterprise software solutions with a primary focus on frontend development, internal auditor tools, and financial workflow automation.",
    deliverables: [
      {
        project: "Audit Automation Platform UI",
        summary:
          "Developed responsive and intuitive user interfaces tailored for internal auditors, facilitating structured audit flows and financial reconciliation tasks.",
        stack: ["React", "JavaScript", "Tailwind CSS", "REST APIs"],
      },
      {
        project: "Prepaid Expense Recalculator Module",
        summary:
          "Engineered calculation modules to replace manual spreadsheet-based reconciliation, automating calculation routines and ensuring traceable audit history.",
        stack: ["React", "State Management", "Financial UI", "Data Validation"],
      },
      {
        project: "HR Management Application",
        summary:
          "Collaborated on frontend and full-stack application enhancements, working with component design and API integrations.",
        stack: ["React", "TypeScript", "Express", "MySQL"],
      },
    ],
  };

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 relative bg-[#090D16]/50">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          {/* Section Header */}
          <div className="mb-14 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>02 &bull; Professional History</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Internship Experience
            </h2>
            <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"></div>
          </div>

          {/* Main Experience Card */}
          <div className="rounded-2xl border border-slate-800 bg-[#111827]/90 p-6 sm:p-8 backdrop-blur-sm shadow-xl transition-all hover:border-slate-700">
            {/* Top Bar with Company, Role, Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                    {internshipDetails.company}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {internshipDetails.status}
                  </span>
                </div>
                <p className="text-base font-medium text-sky-400">
                  {internshipDetails.role}
                </p>
              </div>

              <div className="text-left sm:text-right font-mono text-xs sm:text-sm text-slate-400">
                <p className="text-slate-300 font-medium">{internshipDetails.period}</p>
                <p className="flex items-center sm:justify-end gap-1 mt-0.5 text-slate-400">
                  <i className="ri-map-pin-line"></i>
                  <span>{internshipDetails.location}</span>
                </p>
              </div>
            </div>

            {/* Overview Statement */}
            <p className="text-sm sm:text-base text-slate-300 py-6 leading-relaxed border-b border-slate-800/80">
              {internshipDetails.description}
            </p>

            {/* Key Deliverables & Modules */}
            <div className="pt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-5">
                Key Contributions &amp; Modules:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {internshipDetails.deliverables.map((item) => (
                  <div
                    key={item.project}
                    className="p-5 rounded-xl border border-slate-800/90 bg-[#0B0F19] flex flex-col justify-between hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-terminal-window-line text-sky-400 text-lg"></i>
                        <h5 className="text-sm font-semibold font-display text-white">
                          {item.project}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-300 bg-slate-800/80 border border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default Experience;
