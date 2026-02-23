import SectionWrapper from "@/components/SectionWrapper";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <SectionWrapper id="projects" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="font-heading text-3xl font-bold mb-12">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {featured && <ProjectCard project={featured} featured />}
        {rest.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
