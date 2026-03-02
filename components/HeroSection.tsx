"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/config";
import AnimatedTitle from "@/components/AnimatedTitle";
import MagneticButton from "@/components/MagneticButton";

function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-500 ${
        visible ? "opacity-60" : "opacity-0"
      }`}
    >
      <svg
        className="w-6 h-6 text-warm-400 scroll-indicator"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  );
}

export default function HeroSection() {
  const [firstName, lastName] = siteConfig.fullName.split(" ");
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const dotGridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = sectionRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.opacity = "1";
    glow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(232, 200, 114, 0.07), transparent 50%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const glow = glowRef.current;
    if (glow) glow.style.opacity = "0";
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY * 0.3;
      if (meshRef.current) meshRef.current.style.transform = `translateY(${y}px)`;
      if (dotGridRef.current) dotGridRef.current.style.transform = `translateY(${y * 0.5}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-svh flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background layers with parallax */}
      <div ref={meshRef} className="hero-gradient-mesh" />
      <div ref={dotGridRef} className="hero-dot-grid" />
      <div className="vignette" />

      {/* Cursor-tracking glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
        style={{ opacity: 0 }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 flex-1 flex flex-col justify-end pb-24 md:pb-32">
        <div className="relative">
          <div className="title-glow" />
          {/* Gold horizontal rule */}
          <div
            className="hero-stagger w-[120px] h-px mb-6"
            style={{
              background: "linear-gradient(to right, rgba(232, 200, 114, 0.6), transparent)",
              animationDelay: "0.6s",
            }}
          />
          <AnimatedTitle firstName={firstName} lastName={lastName} />
        </div>
        <p
          className="hero-stagger text-lg md:text-xl text-warm-400 max-w-xl mb-8"
          style={{ animationDelay: "1.4s" }}
        >
          {siteConfig.tagline}
        </p>
        <div
          className="hero-stagger flex gap-4 mb-12"
          style={{ animationDelay: "1.6s" }}
        >
          <MagneticButton
            href="/#projects"
            className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-surface-950 rounded-lg font-medium transition-colors text-sm inline-block"
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            href={siteConfig.resumePath}
            className="px-6 py-3 border border-surface-700 hover:border-warm-500 rounded-lg font-medium transition-colors text-sm inline-block"
          >
            Resume
          </MagneticButton>
        </div>
        <div
          className="hero-stagger flex gap-8 text-sm text-warm-500"
          style={{ animationDelay: "1.8s" }}
        >
          <span>
            <span className="text-warm-100 font-medium">{projects.length}</span>{" "}
            Projects
          </span>
          <span>{siteConfig.keywords}</span>
          <span>{siteConfig.location}</span>
        </div>
      </div>
      <ScrollIndicator />
      <div className="relative z-10 section-divider" />
    </section>
  );
}
