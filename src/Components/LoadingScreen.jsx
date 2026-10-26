import React, { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "aman.sayyad ~ init";

  useEffect(() => {
    // If user prefers reduced motion, bypass immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 45);

    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        clearInterval(interval);
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 bg-[#090D16] text-gray-100 flex flex-col items-center justify-center select-none"
    >
      <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-3 tracking-widest uppercase">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Environment Loading</span>
      </div>

      <div className="mb-6 text-2xl md:text-3xl font-mono font-medium text-slate-200">
        <span className="text-sky-400">&gt; </span>
        {text}
        <span className="animate-blink ml-1 text-sky-400">_</span>
      </div>

      <div className="relative rounded-full w-52 h-1 bg-slate-800/80 overflow-hidden">
        <div className="w-[45%] h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full animate-loading-bar"></div>
      </div>

      <button
        onClick={onComplete}
        className="mt-8 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors focus:outline-none focus:underline"
        aria-label="Skip intro animation"
      >
        [Click or press Esc to skip]
      </button>
    </div>
  );
};

export default LoadingScreen;
