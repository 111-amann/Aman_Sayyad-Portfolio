import React, { useState, useRef } from "react";
import RevealOnScroll from "../RevealOnScroll";
import emailjs from "emailjs-com";

function Contact() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState("idle"); // 'idle' | 'verifying' | 'submitting' | 'success' | 'error'
  const [statusFeedback, setStatusFeedback] = useState("");

  const isProcessing =
    submissionStatus === "verifying" || submissionStatus === "submitting";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate triggers if already verifying or submitting
    if (isProcessing) return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // 1. Basic validation check: all fields required
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setSubmissionStatus("error");
      setStatusFeedback("Please fill out all required fields.");
      return;
    }

    // 2. Client-side email format validation
    const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormatRegex.test(trimmedEmail)) {
      setSubmissionStatus("error");
      setStatusFeedback("Invalid email, please enter a valid email address.");
      return;
    }

    // 3. Email verification phase
    setSubmissionStatus("verifying");
    setStatusFeedback("");

    const verifyUrl =
      import.meta.env.VITE_VERIFY_EMAIL_URL || "/api/validate-email";

    let verificationResult;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(verifyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 400) {
          setSubmissionStatus("error");
          setStatusFeedback("Invalid email, please enter a valid email address.");
          return;
        }

        setSubmissionStatus("error");
        setStatusFeedback(
          "Email verification is temporarily unavailable. Please try again later."
        );
        return;
      }

      verificationResult = await response.json();
    } catch {
      setSubmissionStatus("error");
      setStatusFeedback(
        "Email verification is temporarily unavailable. Please try again later."
      );
      return;
    }

    // 4. Interpret Abstract API response fields
    if (verificationResult?.unavailable) {
      setSubmissionStatus("error");
      setStatusFeedback(
        "Email verification is temporarily unavailable. Please try again later."
      );
      return;
    }

    const {
      isValid,
      status,
      isFormatValid,
      isMxValid,
      isSmtpValid,
    } = verificationResult || {};

    // Explicitly invalid or undeliverable
    if (
      status === "undeliverable" ||
      isFormatValid === false ||
      isMxValid === false ||
      isSmtpValid === false
    ) {
      setSubmissionStatus("error");
      setStatusFeedback("Invalid email, please enter a valid email address.");
      return;
    }

    // Inconclusive status (e.g. risky, unknown, or not confirmed deliverable)
    if (status === "risky" || status === "unknown" || !isValid) {
      setSubmissionStatus("error");
      setStatusFeedback(
        "We could not verify this email address. Please double-check your email address for typos and try again."
      );
      return;
    }

    // 5. Validation succeeded -> Submit form via EmailJS
    setSubmissionStatus("submitting");

    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmissionStatus("error");
      setStatusFeedback(
        "Email service configuration is missing. Please reach out directly via LinkedIn."
      );
      return;
    }

    if (!formRef.current) {
      setSubmissionStatus("error");
      setStatusFeedback(
        "Unable to send message at this moment. Please check your connection or reach out directly via LinkedIn."
      );
      return;
    }

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );
      setSubmissionStatus("success");
      setStatusFeedback(
        "Thank you! Your message has been sent successfully. I'll get back to you shortly."
      );
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmissionStatus("error");
      setStatusFeedback(
        "Unable to send message at this moment. Please check your connection or reach out directly via LinkedIn."
      );
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 relative bg-[#090D16]/50">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          {/* Section Header */}
          <div className="mb-14 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>06 &bull; Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Start a Conversation
            </h2>
            <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Info & Channels (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-slate-300 text-base leading-relaxed">
                Whether you have an open software developer role, want to discuss
                a potential project, or simply want to connect—my inbox is always open.
              </p>

              {/* Status Indicator */}
              <div className="p-5 rounded-xl border border-slate-800 bg-[#111827]/90 flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg shrink-0 mt-0.5">
                  <i className="ri-checkbox-circle-line"></i>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    Current Availability
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Open to full-time Software Developer roles, frontend engineering positions, and select freelance opportunities.
                  </p>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Direct Profiles &amp; Networks
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="https://www.linkedin.com/in/aman-sayyad-5a8a322b0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-[#111827] hover:border-sky-400 hover:text-white text-slate-300 transition-colors"
                  >
                    <i className="ri-linkedin-box-fill text-sky-400 text-xl"></i>
                    <span className="text-xs font-mono">LinkedIn Profile</span>
                  </a>

                  <a
                    href="https://github.com/111-amann"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-[#111827] hover:border-sky-400 hover:text-white text-slate-300 transition-colors"
                  >
                    <i className="ri-github-fill text-slate-200 text-xl"></i>
                    <span className="text-xs font-mono">GitHub Repos</span>
                  </a>

                  <a
                    href="https://x.com/AmanSay35959827"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-[#111827] hover:border-sky-400 hover:text-white text-slate-300 transition-colors"
                  >
                    <i className="ri-twitter-x-line text-slate-200 text-lg"></i>
                    <span className="text-xs font-mono">Twitter / X</span>
                  </a>

                  <a
                    href="https://www.instagram.com/111_amann"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-[#111827] hover:border-sky-400 hover:text-white text-slate-300 transition-colors"
                  >
                    <i className="ri-instagram-line text-pink-400 text-xl"></i>
                    <span className="text-xs font-mono">Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#111827]/90 shadow-xl backdrop-blur-sm">
                <h3 className="text-lg font-display font-semibold text-white mb-1">
                  Send a Message
                </h3>
                <p className="text-xs text-slate-400 mb-6 font-mono">
                  Powered by EmailJS &bull; Delivered straight to my inbox
                </p>

                {/* Accessible Feedback Toast Banner */}
                {submissionStatus === "success" && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-start gap-3"
                  >
                    <i className="ri-checkbox-circle-fill text-lg shrink-0 mt-0.5"></i>
                    <div className="flex-1">
                      <p className="font-semibold">Message Dispatched</p>
                      <p className="text-xs text-emerald-400/90 mt-0.5">
                        {statusFeedback}
                      </p>
                    </div>
                  </div>
                )}

                {submissionStatus === "error" && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3"
                  >
                    <i className="ri-error-warning-fill text-lg shrink-0 mt-0.5"></i>
                    <div className="flex-1">
                      <p className="font-semibold">Transmission Notice</p>
                      <p className="text-xs text-rose-400/90 mt-0.5">
                        {statusFeedback}
                      </p>
                    </div>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono text-slate-300 mb-1.5"
                    >
                      Your Name <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Alex Morgan"
                      readOnly={isProcessing}
                      className="w-full px-4 py-3 rounded-lg bg-[#0B0F19] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors read-only:opacity-60 read-only:cursor-not-allowed"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono text-slate-300 mb-1.5"
                    >
                      Your Email Address <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="alex@company.com"
                      readOnly={isProcessing}
                      className="w-full px-4 py-3 rounded-lg bg-[#0B0F19] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors read-only:opacity-60 read-only:cursor-not-allowed"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono text-slate-300 mb-1.5"
                    >
                      Message Content <span className="text-sky-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Hi Aman, I'd like to discuss an opportunity..."
                      readOnly={isProcessing}
                      className="w-full px-4 py-3 rounded-lg bg-[#0B0F19] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors resize-y read-only:opacity-60 read-only:cursor-not-allowed"
                    />
                  </div>

                  {/* Submit Button with Loading State & Prevention of double submission */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg text-sm font-medium text-slate-950 bg-sky-400 hover:bg-sky-300 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 shadow-sm shadow-sky-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    {submissionStatus === "verifying" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                        <span>Verifying email...</span>
                      </>
                    ) : submissionStatus === "submitting" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <i className="ri-send-plane-fill text-base"></i>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default Contact;
