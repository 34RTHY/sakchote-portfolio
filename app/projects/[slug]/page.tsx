import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/config";
import ProjectNav from "@/components/ProjectNav";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${siteConfig.name}`,
    description: project.tagline,
  };
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <article className="max-w-5xl mx-auto px-6 pt-28 pb-20">
      <Link
        href="/#projects"
        className="text-sm text-warm-500 hover:text-gold-400 transition mb-8 inline-block"
      >
        &larr; Back to projects
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {project.title}
      </h1>
      <p className="text-lg text-warm-400 mb-8">{project.tagline}</p>

      {/* Hero image */}
      <div className="bg-surface-900 border border-surface-800 rounded-xl h-64 md:h-80 relative overflow-hidden flex items-center justify-center text-surface-700 mb-12">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
          </svg>
        )}
      </div>

      {/* Two-column: overview + sidebar */}
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        <div className="md:col-span-2 space-y-4">
          {project.description.map((para, i) => (
            <p key={i} className="text-warm-300 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        <aside className="space-y-6 text-sm">
          <div>
            <h3 className="text-warm-500 font-medium mb-1">Role</h3>
            <p className="text-warm-300">{project.role}</p>
          </div>
          <div>
            <h3 className="text-warm-500 font-medium mb-1">Timeline</h3>
            <p className="text-warm-300">{project.timeline}</p>
          </div>
          <div>
            <h3 className="text-warm-500 font-medium mb-1">Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs text-warm-400 border border-surface-800 rounded px-2 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          {project.links.length > 0 && (
            <div>
              <h3 className="text-warm-500 font-medium mb-1">Links</h3>
              <div className="space-y-1">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gold-400 hover:text-gold-400/80 transition"
                  >
                    {link.label} &rarr;
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Screenshot gallery */}
      {project.screenshots && project.screenshots.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Screenshots</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.screenshots.map((src, i) => (
              <div
                key={i}
                className="bg-surface-900 border border-surface-800 rounded-lg h-48 relative overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical highlights */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Technical Highlights
        </h2>
        <ul className="space-y-3">
          {project.highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-warm-300">
              <span className="text-gold-400 mt-0.5 shrink-0">-</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <ProjectNav prev={prev} next={next} />
    </article>
  );
}
