"use client";

import { useEffect, useRef, useState } from "react";

interface SplitHeadingProps {
  children: string;
  className?: string;
  as?: "h2" | "h3";
}

export default function SplitHeading({
  children,
  className = "",
  as: Tag = "h2",
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = children.split(" ");

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <span
            className="inline-block transition-all duration-500"
            style={{
              transform: visible ? "translateY(0)" : "translateY(100%)",
              opacity: visible ? 1 : 0,
              transitionDelay: `${i * 80}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
