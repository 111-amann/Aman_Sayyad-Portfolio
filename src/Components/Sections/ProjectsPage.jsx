import { Link } from "react-router-dom";
import { useEffect } from "react";
import { projects } from "../../data/projectsData";
import ProjectCard from "../ProjectCard";

function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen flex justify-center items-center py-20"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </div>
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
          All Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsPage;
