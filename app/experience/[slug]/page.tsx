import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { experience } from "@/data/experience";
import { siteConfig } from "@/data/config";
import DetailNav from "@/components/DetailNav";
import RelatedLinks from "@/components/RelatedLinks";
import ContentRenderer from "@/components/ContentRenderer";

export function generateStaticParams() {
  return experience.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = experience.find((e) => e.slug === slug);
  if (!entry) return {};
  return {
    title: `${entry.role} at ${entry.company} — ${siteConfig.name}`,
    description: entry.content.find((b) => b.type === "text")?.value,
  };
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params;
  const index = experience.findIndex((e) => e.slug === slug);
  if (index === -1) notFound();

  const entry = experience[index];
  const prev = index > 0 ? experience[index - 1] : null;
  const next = index < experience.length - 1 ? experience[index + 1] : null;

  return (
    <article className="max-w-5xl mx-auto px-6 pt-28 pb-20">
      <Link
        href="/#experience"
        className="text-sm text-warm-500 hover:text-gold-400 transition mb-8 inline-block"
      >
        &larr; Back to experience
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold mb-2">{entry.role}</h1>
      <p className="text-lg text-warm-400 mb-12">
        {entry.company} &middot; {entry.period}
      </p>

      {/* Hero image */}
      <div className="bg-surface-900 border border-surface-800 rounded-xl h-64 md:h-80 relative overflow-hidden flex items-center justify-center text-surface-700 mb-12">
        {entry.image ? (
          <Image
            src={entry.image}
            alt={`${entry.role} at ${entry.company}`}
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

      {/* Blog-style content + sidebar */}
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        <div className="md:col-span-2">
          <ContentRenderer content={entry.content} />
        </div>

        <aside className="space-y-6 text-sm">
          <div>
            <h3 className="text-warm-500 font-medium mb-1">Period</h3>
            <p className="text-warm-300">{entry.period}</p>
          </div>
          {entry.technologies.length > 0 && (
            <div>
              <h3 className="text-warm-500 font-medium mb-1">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {entry.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs text-warm-400 border border-surface-800 rounded px-2 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Highlights */}
      {entry.highlights.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Highlights</h2>
          <ul className="space-y-3">
            {entry.highlights.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-warm-300">
                <span className="text-gold-400 mt-0.5 shrink-0">-</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <RelatedLinks
        relatedProjects={entry.relatedProjects}
        relatedAwards={entry.relatedAwards}
      />

      <DetailNav
        prev={
          prev ? { slug: prev.slug, title: `${prev.role} at ${prev.company}` } : null
        }
        next={
          next ? { slug: next.slug, title: `${next.role} at ${next.company}` } : null
        }
        basePath="/experience"
      />
    </article>
  );
}
