import React from "react";
import RevealOnScroll from "../RevealOnScroll";

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
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition">
              <h3 className="text-xl font-bold mb-2">Popcornhub</h3>
              <p className="text-grey-400 mb-4">
                A responsive movie streaming web app built with React and Redux
                Toolkit. It uses the TMDB API to fetch movie data and features
                infinite scrolling, video playback, category filtering, and
                Axios integration. Styled with Tailwind CSS.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "React",
                  "Redux",
                  "TMDB API",
                  "Axios",
                  "TailwindCSS",
                  "React Player",
                  "React Infinite Scroll",
                ].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-right items-center my-4 gap-3">
                <span className="text-blue-400 hover:text-blue-300 transition-colors">
                  View Project →
                </span>
                <a
                  target="_blank"
                  href="https://github.com/111-amann/Popcornhub-React-Major-Project"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <i className="ri-github-fill text-white"></i>
                </a>
                <a
                  target="_blank"
                  href="https://popcornhub-self.vercel.app/"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  🚀
                </a>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition">
              <h3 className="text-xl font-bold mb-2">Refokus</h3>
              <p className="text-grey-400 mb-4">
                A visually engaging clone of the Refokus website built using
                React, Locomotive Scroll, and Framer Motion. Focused on smooth
                scroll effects, modern animations, and responsive design.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "React",
                  "Framer Motion",
                  "Locomotive Scroll",
                  "React Icons",
                  "TailwindCSS",
                ].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-right items-center my-4 gap-3">
                <span className="text-blue-400 hover:text-blue-300 transition-colors">
                  View Project →
                </span>
                <a
                  target="_blank"
                  href="https://github.com/111-amann/Refokus-Clone"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <i class="ri-github-fill text-white"></i>
                </a>
                <a
                  target="_blank"
                  href="https://111-amann.github.io/Refokus-Clone/"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  🚀
                </a>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition">
              <h3 className="text-xl font-bold mb-2">Obys Agency</h3>
              <p className="text-grey-400 mb-4">
                A creative portfolio-style website replicating the Obys agency
                site. Built using HTML, CSS, JavaScript, and GSAP for smooth
                animations and transitions. Emphasizes a modern, interactive
                layout with creative motion effects.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Javascript",
                  "GSAP",
                  "ScrollTrigger",
                  "Locomotive Scroll",
                  "HTML",
                  "CSS",
                  "Remix Icon",
                ].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-right items-center my-4 gap-3">
                <span className="text-blue-400 hover:text-blue-300 transition-colors">
                  View Project →
                </span>
                <a
                  target="_blank"
                  href="https://github.com/111-amann/Obys-Agency-Clone"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <i class="ri-github-fill text-white"></i>
                </a>
                <a
                  target="_blank"
                  href="https://111-amann.github.io/Obys-Agency-Clone/"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  🚀
                </a>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition">
              <h3 className="text-xl font-bold mb-2">Weather App</h3>
              <p className="text-grey-400 mb-4">
                A simple and user-friendly weather app built with HTML, CSS, and
                JavaScript using the OpenWeather API. Displays real-time weather
                info based on user input.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["HTML", "CSS", "Javascript", "OpenWeather API"].map(
                  (tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.1)] transition-all"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>

              <div className="flex justify-right items-center my-4 gap-3">
                <span className="text-blue-400 hover:text-blue-300 transition-colors">
                  View Project →
                </span>
                <a
                  target="_blank"
                  href="https://github.com/111-amann/Weather-App"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <i class="ri-github-fill text-white"></i>
                </a>
                <a
                  target="_blank"
                  href="https://111-amann.github.io/Weather-App/"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  🚀
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}

export default Projects;
