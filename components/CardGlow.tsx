"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";

interface CardGlowProps {
  children: ReactNode;
  className?: string;
  href: string;
}

export default function CardGlow({ children, className = "", href }: CardGlowProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlowStyle({
      opacity: 1,
      background: `radial-gradient(400px circle at ${x}px ${y}px, rgba(232, 200, 114, 0.06), transparent 60%)`,
    });
  };

  const handleMouseLeave = () => {
    setGlowStyle({ opacity: 0 });
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        style={glowStyle}
      />
      {children}
    </Link>
  );
}
