import React from "react";
import RevealOnScroll from "../RevealOnScroll";

function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex justify-center items-center relative"
    >
      <RevealOnScroll>
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-right">
            Hi, I'm Aman Sayyad
          </h1>
          <p className="text-grey-400 text-lg mb-8 max-w-2xl mx-auto">
            I'm a full-stack developer who enjoys building scalable,
            user-focused web applications. Currently pursuing an MCA, I
            specialize in turning ideas into efficient, end-to-end solutions
            with modern web technologies. I'm passionate about continuous
            learning and solving real-world problems through software.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#projects"
              className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.4)]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.2)] hover:bg-blue-500/10"
            >
              Contact Me
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}

export default Home;
