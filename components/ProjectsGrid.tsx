"use client";

import { useState, useMemo } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.categories.forEach((c) => set.add(c)));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.categories.includes(activeCategory));
  }, [projects, activeCategory]);

  // Group: featured first, then rest
  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <>
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          const count = cat === "All"
            ? projects.length
            : projects.filter((p) => p.categories.includes(cat)).length;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm px-4 py-2 rounded-lg border transition-colors ${
                isActive
                  ? "border-gold-500/50 bg-gold-500/10 text-gold-400"
                  : "border-surface-800 text-warm-500 hover:border-surface-700 hover:text-warm-300"
              }`}
            >
              {cat}
              <span className={`ml-1.5 text-xs ${isActive ? "text-gold-400/60" : "text-warm-600"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Project grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} featured />
        ))}
        {rest.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-warm-500 text-center py-12">No projects match this filter.</p>
      )}
    </>
  );
}
