import SectionWrapper from "@/components/SectionWrapper";
import ProjectCard from "@/components/ProjectCard";
import SplitHeading from "@/components/SplitHeading";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <SectionWrapper id="projects" className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-warm-500 mb-4">02 —</p>
      <SplitHeading className="text-3xl md:text-4xl font-semibold mb-12">Projects</SplitHeading>
      <div className="grid md:grid-cols-2 gap-6">
        {featured && <ProjectCard project={featured} featured />}
        {rest.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
