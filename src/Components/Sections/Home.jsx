import React from "react";

function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex justify-center items-center relative"
    >
      <div className="text-center z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent leading-right">
          Hi, I'm Aman Sayyad
        </h1>
        <p className="text-grey-400 text-lg mb-8 max-w-lg mx-auto">I'm a full-stack developer who loves crafting clean, scalable web applications. My goal is to build solutions that offer both exceptional performance and delightful user experience.</p>
      </div>
    </section>
  );
}

export default Home;
