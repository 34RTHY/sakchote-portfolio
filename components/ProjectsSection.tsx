import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import ProjectCard from "@/components/ProjectCard";
import SplitHeading from "@/components/SplitHeading";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const moreCount = projects.length - featured.length;

  return (
    <SectionWrapper id="projects" className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-warm-500 mb-4">02 —</p>
      <SplitHeading className="text-3xl md:text-4xl font-semibold mb-12">Projects</SplitHeading>
      <div className="grid md:grid-cols-2 gap-6">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} featured />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm font-medium text-surface-950 bg-gold-500 hover:bg-gold-400 rounded-lg px-6 py-3 transition-colors"
        >
          View all projects
          {moreCount > 0 && (
            <span className="bg-surface-950/20 rounded-full px-2 py-0.5 text-xs">
              +{moreCount}
            </span>
          )}
          <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
        </Link>
      </div>
    </SectionWrapper>
  );
}
