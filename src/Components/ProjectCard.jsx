import React from "react";

function ProjectCard({ project }) {
  return (
    <article className="group h-full flex flex-col justify-between p-6 rounded-xl border border-slate-800/90 bg-[#111827]/90 hover:border-slate-700 hover:bg-[#111827] transition-all duration-200 transform hover:-translate-y-1 shadow-sm hover:shadow-lg hover:shadow-black/40">
      <div>
        {/* Top Header: Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-medium text-sky-400 bg-sky-500/10 border border-sky-500/20">
            {project.category || "Project"}
          </span>

          {project.featured && (
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Featured
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Technology Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs font-mono text-slate-300 bg-slate-800/90 border border-slate-700/60"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-950 bg-sky-400 hover:bg-sky-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label={`View live demo for ${project.title}`}
          >
            <span>Live Demo</span>
            <i className="ri-external-link-line text-sm"></i>
          </a>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label={`View source code for ${project.title} on GitHub`}
          >
            <i className="ri-github-line text-sm"></i>
            <span>Code</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;