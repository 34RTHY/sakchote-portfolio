import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectNavProps {
  prev: Project | null;
  next: Project | null;
}

export default function ProjectNav({ prev, next }: ProjectNavProps) {
  return (
    <div className="flex justify-between items-center border-t border-surface-800 pt-8 mt-16">
      {prev ? (
        <Link
          href={`/projects/${prev.slug}`}
          className="text-sm text-warm-400 hover:text-gold-400 transition"
        >
          &larr; {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="text-sm text-warm-400 hover:text-gold-400 transition"
        >
          {next.title} &rarr;
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
