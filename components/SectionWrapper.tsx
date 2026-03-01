"use client";

import { useEffect, useRef, useState } from "react";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  alt?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  alt = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={alt ? "section-alt" : ""}
    >
      <section
        id={id}
        className={className}
        {...(animate ? { "data-animate": "" } : {})}
      >
        {children}
      </section>
      <div className="section-divider" />
    </div>
  );
}
