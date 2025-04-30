import React, { useState } from "react";
import RevealOnScroll from "../RevealOnScroll";
import emailjs from "emailjs-com";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then((result) => {
        alert("Message Sent!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => alert("Oops! Something went wrong. Please try again."));
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex justify-center items-center"
    >
      <RevealOnScroll>
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
          Get In Touch
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative md:w-lg w-xs">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
              placeholder="Name..."
            />
          </div>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
              placeholder="Your Message..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow[0_0_15px_rgba(59,130,246,0.4)]"
          >
            Send Message
          </button>
        </form>
        <div className="mt-5 flex justify-center gap-3">
          <a
            href="https://github.com/111-amann"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-github-fill text-lg"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/aman-sayyad-5a8a322b0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-linkedin-box-fill text-lg"></i>
          </a>
          <a
            href="https://www.instagram.com/111_amann"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-instagram-line text-lg"></i>
          </a>
          <a
            href="https://x.com/AmanSay35959827"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-twitter-x-line text-lg"></i>
          </a>
        </div>
      </RevealOnScroll>
    </section>
  );
}

export default Contact;
