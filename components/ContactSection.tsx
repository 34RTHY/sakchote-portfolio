"use client";

import { useRef, useState, useCallback } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import SocialIcon from "@/components/SocialIcon";
import CopyButton from "@/components/CopyButton";
import SplitHeading from "@/components/SplitHeading";
import MagneticButton from "@/components/MagneticButton";
import { socialLinks } from "@/data/social";

export default function ContactSection() {
  const emailLink = socialLinks.find((l) => l.icon === "email");
  const otherLinks = socialLinks.filter((l) => l.icon !== "email");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = formRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mlgwkpkr", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <SectionWrapper id="contact" className="max-w-5xl mx-auto px-6 pt-20 pb-32">
      <p className="text-xs uppercase tracking-[0.2em] text-warm-500 mb-4">05 —</p>
      <div className="relative">
        <div className="contact-glow" />
        <SplitHeading className="text-3xl md:text-4xl font-semibold mb-4 relative">Get in touch</SplitHeading>
      </div>
      <p className="text-warm-400 mb-12 max-w-lg">
        Have a project in mind, an internship opportunity, or just want to talk
        engineering? I&apos;d love to hear from you.
      </p>

      <div className="grid md:grid-cols-5 gap-12 md:gap-16">
        {/* ── Form card ── */}
        <div className="md:col-span-3">
          <div
            ref={formRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative rounded-2xl border border-surface-800 bg-surface-900/60 backdrop-blur-sm p-6 md:p-8 overflow-hidden"
          >
            {/* Cursor-tracking border glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
              style={{
                opacity: glowPos.opacity * 0.5,
                background: `radial-gradient(400px circle at ${glowPos.x}px ${glowPos.y}px, rgba(232, 200, 114, 0.1), transparent 60%)`,
              }}
            />

            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-gold-400/50 to-transparent" />
            <div className="absolute top-0 left-0 w-px h-16 bg-gradient-to-b from-gold-400/50 to-transparent" />

            {status === "sent" ? (
              <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 rounded-full border border-gold-400/30 flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-warm-100 font-medium text-lg mb-2">Message sent</p>
                <p className="text-warm-400 text-sm mb-6">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-gold-400 hover:text-gold-400/80 transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                {/* Honeypot */}
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focused === "name"
                          ? "top-1.5 text-[10px] tracking-wider uppercase text-gold-400"
                          : "top-4 text-sm text-warm-500"
                      }`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      onFocus={() => setFocused("name")}
                      onBlur={(e) => { if (!e.target.value) setFocused(null); }}
                      className="w-full bg-surface-950/80 border border-surface-800 rounded-lg px-4 pt-7 pb-2 text-sm text-warm-200 focus:border-gold-500/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focused === "email"
                          ? "top-1.5 text-[10px] tracking-wider uppercase text-gold-400"
                          : "top-4 text-sm text-warm-500"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      onFocus={() => setFocused("email")}
                      onBlur={(e) => { if (!e.target.value) setFocused(null); }}
                      className="w-full bg-surface-950/80 border border-surface-800 rounded-lg px-4 pt-7 pb-2 text-sm text-warm-200 focus:border-gold-500/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focused === "message"
                        ? "top-2 text-[10px] tracking-wider uppercase text-gold-400"
                        : "top-3.5 text-sm text-warm-500"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    onFocus={() => setFocused("message")}
                    onBlur={(e) => { if (!e.target.value) setFocused(null); }}
                    className="w-full bg-surface-950/80 border border-surface-800 rounded-lg px-4 pt-7 pb-3 text-sm text-warm-200 focus:border-gold-500/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative px-7 py-3 bg-gold-500 hover:bg-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-surface-950 rounded-lg font-medium transition-all text-sm overflow-hidden"
                  >
                    <span className={`inline-flex items-center gap-2 transition-transform duration-300 ${status === "sending" ? "translate-y-8 opacity-0" : ""}`}>
                      Send Message
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                      </svg>
                    </span>
                    {status === "sending" && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      </span>
                    )}
                  </button>
                  {status === "error" && (
                    <p className="text-sm text-red-400/80">Failed to send. Try emailing me directly.</p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ── Sidebar: direct contact ── */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <div className="space-y-8">
            {/* Email */}
            {emailLink && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-warm-500 mb-3">Email</p>
                <div className="flex items-center gap-1">
                  <MagneticButton
                    href={emailLink.href}
                    className="inline-flex items-center gap-2.5 text-warm-200 hover:text-gold-400 transition text-sm group"
                  >
                    <span className="w-9 h-9 rounded-lg border border-surface-800 group-hover:border-gold-500/40 flex items-center justify-center transition-colors">
                      <SocialIcon type="email" className="w-4 h-4" />
                    </span>
                    {emailLink.label}
                  </MagneticButton>
                  <CopyButton text={emailLink.label} />
                </div>
              </div>
            )}

            {/* Socials */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-warm-500 mb-3">Socials</p>
              <div className="space-y-2.5">
                {otherLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-warm-400 hover:text-gold-400 transition text-sm group"
                  >
                    <span className="w-9 h-9 rounded-lg border border-surface-800 group-hover:border-gold-500/40 flex items-center justify-center transition-colors">
                      <SocialIcon type={link.icon} className="w-4 h-4" />
                    </span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Availability indicator */}
          <div className="mt-10 md:mt-0">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-sm text-warm-400">Open to internship opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
