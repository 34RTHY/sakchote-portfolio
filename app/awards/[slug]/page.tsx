import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { awards } from "@/data/awards";
import { siteConfig } from "@/data/config";
import DetailNav from "@/components/DetailNav";
import RelatedLinks from "@/components/RelatedLinks";
import ContentRenderer from "@/components/ContentRenderer";

export function generateStaticParams() {
  return awards.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const award = awards.find((a) => a.slug === slug);
  if (!award) return {};
  return {
    title: `${award.title} — ${siteConfig.name}`,
    description: award.detail,
  };
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AwardPage({ params }: Props) {
  const { slug } = await params;
  const index = awards.findIndex((a) => a.slug === slug);
  if (index === -1) notFound();

  const award = awards[index];
  const prev = index > 0 ? awards[index - 1] : null;
  const next = index < awards.length - 1 ? awards[index + 1] : null;

  return (
    <article className="max-w-5xl mx-auto px-6 pt-28 pb-20">
      <Link
        href="/#awards"
        className="text-sm text-warm-500 hover:text-gold-400 transition mb-8 inline-block"
      >
        &larr; Back to awards
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">{award.title}</h1>

      <div className="flex items-center gap-3 text-warm-400 mb-12">
        <span>{award.event}</span>
        <span className="text-surface-700">/</span>
        <span>{award.date}</span>
      </div>

      {/* Hero image */}
      <div className="bg-surface-900 border border-surface-800 rounded-xl h-64 md:h-80 relative overflow-hidden flex items-center justify-center text-surface-700 mb-12">
        {award.image ? (
          <Image
            src={award.image}
            alt={award.title}
            fill
            sizes="(max-width: 768px) 100vw, 1800px"
            className="object-cover"
            priority
          />
        ) : (
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
          </svg>
        )}
      </div>

      {/* Blog-style content */}
      <div className="mb-16">
        <ContentRenderer content={award.content} />
      </div>

      <RelatedLinks
        relatedProjects={award.relatedProjects}
        relatedExperience={award.relatedExperience}
      />

      <DetailNav
        prev={prev ? { slug: prev.slug, title: prev.title } : null}
        next={next ? { slug: next.slug, title: next.title } : null}
        basePath="/awards"
      />
    </article>
  );
}
