import React from "react";
import RevealOnScroll from "../RevealOnScroll";

function About() {
  const frontendSkills = [
    "React",
    "Javascript",
    "HTML",
    "CSS",
    "TailwindCSS",
    "Bootstrap",
  ];
  const backendSkills = ["Node.js", "Express.js", "MongoDB", "Redux"];

  return (
    <section
      id="about"
      className="min-h-screen flex justify-center items-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            About Me
          </h2>

          <div className="rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all">
            <p className="text-grey-300 mb-6">
              Pssionate developer with expertise in building scalable web
              applications and creating innovative solutions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59, 130, 246, 0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Education + Courses + Volunteering */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Education */}
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">🏫 Education</h3>
              <ul className="list-disc list-inside text-grey-300 space-y-2">
                <li>
                  <strong>BSC in Computer Science</strong> - Savitribai Phule
                  Pune University. <br /> GPA: 8.49 &nbsp; (2021 - 2024)
                </li>
                <li>
                  <strong>MCA</strong> - Sanjivani University. <br /> (2025 -
                  2027)
                </li>
                <li>
                  Relevant Coursework: Data Structures, Machine Learning, Agile
                  Methodologies, Web Development, Operating Systems, Computer
                  Networks.
                </li>
              </ul>
            </div>

            {/* Courses */}
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">📙 Courses</h3>
              <ul className="list-disc list-inside text-grey-300 space-y-2">
                <li>
                  <strong>MERN Stack</strong> - Kiran Academy Pune.
                  <br /> (Jun 2024 - Dec 2024)
                </li>
                <li>
                  Relevant Coursework: HTML, CSS, Javascript, React, NodeJS,
                  ExpressJS, MongoDB.
                </li>
              </ul>
            </div>

            {/* Volunteering */}
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 transition-all md:col-span-2">
              <h3 className="text-xl font-bold mb-4">🤝 Volunteering</h3>
              <ul className="list-disc list-inside text-grey-300 space-y-2">
                <li>
                  <strong>Google Student Ambassador</strong> <br />
                  Represented Sanjivani University, organizing workshops,
                  awareness sessions, and helping students adopt Google tools.
                  (2025 - Present)
                </li>
                <li>
                  <strong>Training & Placement Coordinator</strong> - MCA
                  Department <br />
                  Coordinating placement activities, bridging between students
                  and companies, and guiding peers for career readiness.
                  (2025 - Present)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}

export default About;
