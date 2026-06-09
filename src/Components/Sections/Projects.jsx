import React from "react";
import RevealOnScroll from "../RevealOnScroll";
import { Link } from "react-router-dom";
import { projects } from "../../data/projectsData";
import ProjectCard from "../ProjectCard";

function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex justify-center items-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 4).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>

          {/* more projects on new page */}
          <div className="flex justify-center mt-10">
            <Link
              to="/projects"
              className="px-6 py-3 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition"
            >
              View More Projects →
            </Link>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}

export default Projects;
