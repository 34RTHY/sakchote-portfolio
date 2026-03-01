"use client";

import Image from "next/image";
import CardGlow from "@/components/CardGlow";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured }: ProjectCardProps) {
  return (
    <CardGlow
      href={`/projects/${project.slug}`}
      className={`group block border border-surface-800 rounded-xl hover:border-surface-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-gold-500/5 transition-all duration-200 overflow-hidden ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Image or placeholder */}
      <div
        className={`bg-surface-900 relative flex items-center justify-center text-surface-700 ${
          featured ? "h-48 md:h-56" : "h-40"
        }`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
          </svg>
        )}
      </div>

      <div className="p-6 bg-surface-900/80 backdrop-blur-sm border-t border-surface-800 group-hover:border-gold-500/20 transition-colors">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-gold-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-warm-400 text-sm mb-4 line-clamp-2">
          {project.tagline}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-warm-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </CardGlow>
  );
}
