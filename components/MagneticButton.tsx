"use client";

import { useRef, useState, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  as?: "a" | "button";
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  className = "",
  href,
  as = "a",
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState("translate(0px, 0px)");

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTransform(`translate(${x * 0.15}px, ${y * 0.15}px)`);
  };

  const handleMouseLeave = () => {
    setTransform("translate(0px, 0px)");
  };

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ transform, transition: "transform 0.2s ease-out" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Tag>
  );
}
