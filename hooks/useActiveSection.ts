"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navSections } from "@/data/config";

const SECTIONS = navSections.map((s) => s.id);

export function useActiveSection() {
  const [active, setActive] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    // Only track sections on the homepage
    if (pathname !== "/") {
      setActive("");
      return;
    }

    const visibleSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
          } else {
            visibleSections.delete(entry.target.id);
          }
        }

        // Pick the first visible section in DOM order
        const topmost = SECTIONS.find((id) => visibleSections.has(id));
        if (topmost) setActive(topmost);
      },
      { rootMargin: "-20% 0px -35% 0px" }
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return active;
}
