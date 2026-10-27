import React from "react";
import { Link } from "react-router-dom";
import RevealOnScroll from "../RevealOnScroll";
import { projects } from "../../data/projectsData";
import ProjectCard from "../ProjectCard";

// The 3 premier showcase projects displayed on the home page:
// 1. Talent IQ — Collaborative full-stack coding platform with Monaco editor & live video
// 2. Popcornhub — Modern streaming frontend with Redux Toolkit & TMDB API integration
// 3. Refokus — Advanced animation & interaction design clone with Framer Motion & Locomotive Scroll
const FEATURED_HOME_PROJECT_IDS = ["talentiq", "popcornhub", "refokus"];

function Projects() {
  const homeProjects = FEATURED_HOME_PROJECT_IDS.map((id) =>
    projects.find((p) => p.id === id)
  ).filter(Boolean);

  // Fallback to first 3 projects if IDs ever change
  const displayProjects =
    homeProjects.length === 3 ? homeProjects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          {/* Section Header */}
          <div className="mb-12 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>03 &bull; Featured Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Featured Projects
            </h2>
            <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"></div>
            <p className="text-slate-400 text-sm mt-3 max-w-xl">
              A curated selection of full-stack platforms and modern web applications.
            </p>
          </div>

          {/* 3 Featured Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <ProjectCard key={project.id || project.title} project={project} />
            ))}
          </div>

          {/* View More Projects Action Button */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-mono font-medium text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm shadow-sky-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <span>View More Projects</span>
              <i className="ri-arrow-right-line text-base transition-transform duration-200 group-hover:translate-x-1"></i>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default Projects;
