"use client";

import { useState, useEffect } from "react";

export default function AnimatedTitle({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl tracking-tight mb-4">
      <span
        className={`block ${mounted ? "mask-reveal" : ""}`}
        style={{ opacity: mounted ? undefined : 0 }}
      >
        {firstName}
      </span>
      <span
        className={`block text-gold-400 ${mounted ? "mask-reveal-alt" : ""}`}
        style={{
          opacity: mounted ? undefined : 0,
          animationDelay: mounted ? "0.3s" : undefined,
        }}
      >
        {lastName}
      </span>
    </h1>
  );
}
