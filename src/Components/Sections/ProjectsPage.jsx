import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projects, projectCategories } from "../../data/projectsData";
import ProjectCard from "../ProjectCard";
import Navbar from "./Navbar";
import MobileMenu from "../MobileMenu";
import Footer from "./Footer";

function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#090D16] text-[#F3F4F6] flex flex-col justify-between">
      {/* Site-wide Navigation */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Main Content Area */}
      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back to Home Link & Quick Info */}
          <div className="flex items-center justify-between pb-6 mb-10 border-b border-slate-800/80">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm font-mono text-sky-400 hover:text-sky-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded px-2 py-1"
            >
              <i className="ri-arrow-left-line transition-transform duration-200 group-hover:-translate-x-1"></i>
              <span>Back to Home</span>
            </Link>

            <span className="text-xs font-mono text-slate-400">
              Showing {filteredProjects.length} of {projects.length} verified projects
            </span>
          </div>

          {/* Page Heading & Category Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>03 &bull; Full Portfolio Archive</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                All Projects
              </h1>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Explore my work, experiments, and applications.
              </p>
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

          {/* Responsive All Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id || project.title} project={project} />
            ))}
          </div>
        </div>
      </main>

      {/* Site-wide Footer */}
      <Footer />
    </div>
  );
}

export default ProjectsPage;
