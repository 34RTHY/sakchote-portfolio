import { projects } from "@/data/projects";
import GridCanvas from "@/components/GridCanvas";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-svh flex flex-col">
      <GridCanvas />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 flex-1 flex flex-col justify-end pb-24 md:pb-32">
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
          Sakchote
          <br />
          <span className="text-emerald-400">Khemamrach</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-xl mb-8">
          Software engineer building hybrid cloud infrastructure and full-stack
          applications.
        </p>
        <div className="flex gap-4 mb-12">
          <a
            href="#projects"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition text-sm"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            className="px-6 py-3 border border-neutral-700 hover:border-neutral-500 rounded-lg font-medium transition text-sm"
          >
            Resume
          </a>
        </div>
        <div className="flex gap-8 text-sm text-neutral-500">
          <span>
            <span className="text-neutral-100 font-medium">{projects.length}</span>{" "}
            Projects
          </span>
          <span>K8s / Terraform / React</span>
          <span>Based in Thailand</span>
        </div>
      </div>
      <div className="relative z-10 section-divider" />
    </section>
  );
}
