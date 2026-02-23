"use client";

import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
  { href: "/resume.pdf", label: "Resume" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow ${
        scrolled
          ? "bg-neutral-950/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="font-heading text-xl font-bold tracking-tight text-neutral-100"
        >
          Sakchote
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 text-sm">
          {links.map(({ href, label }) => {
            const isActive = href.startsWith("#") && active === href.slice(1);
            return (
              <a
                key={href}
                href={href}
                className={`nav-link transition ${
                  isActive ? "text-emerald-400 active" : "text-neutral-400 hover:text-neutral-100"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-neutral-300 transition-transform ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-neutral-300 transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-neutral-300 transition-transform ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-neutral-400 hover:text-neutral-100 transition text-sm"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
