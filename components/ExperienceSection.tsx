import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import SplitHeading from "@/components/SplitHeading";
import { experience } from "@/data/experience";
import { education } from "@/data/education";

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="max-w-5xl mx-auto px-6 py-20" alt>
      <p className="text-xs uppercase tracking-[0.2em] text-warm-500 mb-4">03 —</p>
      <SplitHeading className="text-3xl md:text-4xl font-semibold mb-12">Experience</SplitHeading>
      <div className="relative">
        {/* Timeline bar — gradient from gold to surface */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold-500/40 to-surface-800" />

        <div className="space-y-10">
          {experience.map((job, i) => (
            <Link
              key={job.slug}
              href={`/experience/${job.slug}`}
              className="relative pl-8 block group"
            >
              {/* Timeline dot */}
              <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 transition-colors ${
                i === 0
                  ? "border-gold-400 bg-gold-400/20"
                  : "border-surface-700 bg-surface-900"
              }`} />

              <p className="font-mono text-sm text-warm-500 mb-1">
                {job.period}
              </p>
              <h3 className="text-xl font-semibold group-hover:text-gold-400 transition">
                {job.role}{" "}
                <span className="text-warm-400 font-normal group-hover:text-gold-400/70">
                  at {job.company}
                </span>
                <span className="text-warm-600 ml-2 opacity-0 group-hover:opacity-100 transition">
                  &rarr;
                </span>
              </h3>
              <p className="text-warm-400 mt-2">{job.content.find((b) => b.type === "text")?.value}</p>
            </Link>
          ))}
        </div>
      </div>
      {/* Education */}
      <p className="text-xs uppercase tracking-[0.2em] text-warm-500 mb-4 mt-20">04 —</p>
      <SplitHeading className="text-3xl md:text-4xl font-semibold mb-12">Education</SplitHeading>
      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold-500/40 to-surface-800" />

        <div className="space-y-10">
          {education.map((entry, i) => (
            <Link
              key={entry.slug}
              href={`/education/${entry.slug}`}
              className="relative pl-8 block group"
            >
              <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 transition-colors ${
                i === 0
                  ? "border-gold-400 bg-gold-400/20"
                  : "border-surface-700 bg-surface-900"
              }`} />

              <p className="font-mono text-sm text-warm-500 mb-1">
                {entry.period}
              </p>
              <h3 className="text-xl font-semibold group-hover:text-gold-400 transition">
                {entry.degree}{" "}
                <span className="text-warm-400 font-normal group-hover:text-gold-400/70">
                  at {entry.school}
                </span>
                <span className="text-warm-600 ml-2 opacity-0 group-hover:opacity-100 transition">
                  &rarr;
                </span>
              </h3>
              <p className="text-warm-400 mt-2">{entry.content.find((b) => b.type === "text")?.value}</p>
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
