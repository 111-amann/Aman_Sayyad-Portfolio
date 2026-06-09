function ProjectCard({ project }) {
  return (
    <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
      <h3 className="text-xl font-bold mb-2">
        {project.title}
      </h3>

      <p className="text-grey-400 mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <span className="text-blue-400 hover:text-blue-300 transition-colors">
          View Project →
        </span>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href={project.github}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          <i className="ri-github-fill text-white"></i>
        </a>

        {project.live && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={project.live}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            🚀
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;