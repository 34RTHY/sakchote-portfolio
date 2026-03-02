import Link from "next/link";
import ProjectsGrid from "@/components/ProjectsGrid";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/config";

export const metadata = {
  title: `Projects — ${siteConfig.name}`,
  description: "All projects by Sakchote Khemmarach.",
};

export default function ProjectsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">
      <Link
        href="/#projects"
        className="text-sm text-warm-500 hover:text-gold-400 transition mb-8 inline-block"
      >
        &larr; Back to home
      </Link>

      <h1 className="text-3xl md:text-4xl font-semibold mb-12">All Projects</h1>

      <ProjectsGrid projects={projects} />
    </main>
  );
}
