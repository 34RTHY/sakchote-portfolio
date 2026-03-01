import Link from "next/link";
import { projects } from "@/data/projects";
import { awards } from "@/data/awards";
import { experience } from "@/data/experience";
import { education } from "@/data/education";

interface RelatedLinksProps {
  relatedProjects?: string[];
  relatedAwards?: string[];
  relatedExperience?: string[];
  relatedEducation?: string[];
}

export default function RelatedLinks({
  relatedProjects,
  relatedAwards,
  relatedExperience,
  relatedEducation,
}: RelatedLinksProps) {
  const linkedProjects = relatedProjects
    ?.map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);
  const linkedAwards = relatedAwards
    ?.map((slug) => awards.find((a) => a.slug === slug))
    .filter(Boolean);
  const linkedExperience = relatedExperience
    ?.map((slug) => experience.find((e) => e.slug === slug))
    .filter(Boolean);
  const linkedEducation = relatedEducation
    ?.map((slug) => education.find((e) => e.slug === slug))
    .filter(Boolean);

  const hasAny =
    (linkedProjects?.length ?? 0) +
      (linkedAwards?.length ?? 0) +
      (linkedExperience?.length ?? 0) +
      (linkedEducation?.length ?? 0) >
    0;

  if (!hasAny) return null;

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-semibold mb-6">Related</h2>
      <div className="space-y-3">
        {linkedProjects?.map((p) => (
          <Link
            key={p!.slug}
            href={`/projects/${p!.slug}`}
            className="flex items-center gap-3 text-warm-300 hover:text-gold-400 transition group"
          >
            <span className="text-warm-500 text-xs uppercase tracking-wider w-20 shrink-0">
              Project
            </span>
            <span className="group-hover:underline">{p!.title}</span>
            <span className="text-warm-600 ml-auto">&rarr;</span>
          </Link>
        ))}
        {linkedAwards?.map((a) => (
          <Link
            key={a!.slug}
            href={`/awards/${a!.slug}`}
            className="flex items-center gap-3 text-warm-300 hover:text-gold-400 transition group"
          >
            <span className="text-warm-500 text-xs uppercase tracking-wider w-20 shrink-0">
              Award
            </span>
            <span className="group-hover:underline">{a!.title}</span>
            <span className="text-warm-600 ml-auto">&rarr;</span>
          </Link>
        ))}
        {linkedExperience?.map((e) => (
          <Link
            key={e!.slug}
            href={`/experience/${e!.slug}`}
            className="flex items-center gap-3 text-warm-300 hover:text-gold-400 transition group"
          >
            <span className="text-warm-500 text-xs uppercase tracking-wider w-20 shrink-0">
              Work
            </span>
            <span className="group-hover:underline">
              {e!.role} at {e!.company}
            </span>
            <span className="text-warm-600 ml-auto">&rarr;</span>
          </Link>
        ))}
        {linkedEducation?.map((e) => (
          <Link
            key={e!.slug}
            href={`/education/${e!.slug}`}
            className="flex items-center gap-3 text-warm-300 hover:text-gold-400 transition group"
          >
            <span className="text-warm-500 text-xs uppercase tracking-wider w-20 shrink-0">
              Education
            </span>
            <span className="group-hover:underline">
              {e!.degree} at {e!.school}
            </span>
            <span className="text-warm-600 ml-auto">&rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
