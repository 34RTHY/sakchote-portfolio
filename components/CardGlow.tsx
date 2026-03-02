"use client";

import { useRef, useCallback, type ReactNode } from "react";
import Link from "next/link";

interface CardGlowProps {
  children: ReactNode;
  className?: string;
  href: string;
}

export default function CardGlow({ children, className = "", href }: CardGlowProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.opacity = "1";
    glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(232, 200, 114, 0.06), transparent 60%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const glow = glowRef.current;
    if (glow) glow.style.opacity = "0";
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      {children}
    </Link>
  );
}
