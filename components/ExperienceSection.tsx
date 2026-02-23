import SectionWrapper from "@/components/SectionWrapper";
import { experience } from "@/data/experience";
import { education } from "@/data/education";

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="max-w-5xl mx-auto px-6 py-20" alt>
      <h2 className="font-heading text-3xl font-bold mb-12">Experience</h2>
      <div className="relative">
        {/* Timeline bar */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-neutral-800" />

        <div className="space-y-10">
          {experience.map((job, i) => (
            <div key={job.role + job.company} className="relative pl-8">
              {/* Timeline dot */}
              <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${
                i === 0
                  ? "border-emerald-400 bg-emerald-400/20"
                  : "border-neutral-700 bg-neutral-900"
              }`} />

              <p className="font-mono text-sm text-neutral-500 mb-1">
                {job.period}
              </p>
              <h3 className="text-xl font-semibold">
                {job.role}{" "}
                <span className="text-neutral-400 font-normal">
                  at {job.company}
                </span>
              </h3>
              <p className="text-neutral-400 mt-2">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Education */}
      <h2 className="font-heading text-3xl font-bold mb-12 mt-20">Education</h2>
      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-neutral-800" />

        <div className="space-y-10">
          {education.map((entry, i) => (
            <div key={entry.school + entry.degree} className="relative pl-8">
              <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${
                i === 0
                  ? "border-emerald-400 bg-emerald-400/20"
                  : "border-neutral-700 bg-neutral-900"
              }`} />

              <p className="font-mono text-sm text-neutral-500 mb-1">
                {entry.period}
              </p>
              <h3 className="text-xl font-semibold">
                {entry.degree}{" "}
                <span className="text-neutral-400 font-normal">
                  at {entry.school}
                </span>
              </h3>
              <p className="text-neutral-400 mt-2">{entry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
