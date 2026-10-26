import React, { useState } from "react";
import RevealOnScroll from "../RevealOnScroll";
import { projects, projectCategories } from "../../data/projectsData";
import ProjectCard from "../ProjectCard";

function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>03 &bull; Engineering Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Featured Projects &amp; Explorer
              </h2>
              <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"></div>
            </div>

            {/* Category Filter Buttons */}
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap items-center gap-2"
            >
              {projectCategories.map((cat) => {
                const count =
                  cat === "All"
                    ? projects.length
                    : projects.filter((p) => p.category === cat).length;
                const isActive = activeCategory === cat;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      isActive
                        ? "bg-sky-400 text-slate-950 font-semibold shadow-sm shadow-sky-500/20"
                        : "bg-[#111827] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-slate-950/20 text-slate-950"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>

          {/* Explorer Footnote */}
          <div className="mt-12 text-center text-xs font-mono text-slate-400">
            <span>Showing {filteredProjects.length} of {projects.length} verified projects</span>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default Projects;
