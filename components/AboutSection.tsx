import SectionWrapper from "@/components/SectionWrapper";
import { skillCategories } from "@/data/skills";

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="max-w-5xl mx-auto px-6 py-20" alt>
      <h2 className="font-heading text-3xl font-bold mb-12">About</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-neutral-300 leading-relaxed mb-4">
            I&apos;m a software engineer passionate about building reliable,
            scalable systems. I enjoy working across the full stack — from
            designing cloud-native infrastructure to crafting polished user
            interfaces.
          </p>
          <p className="text-neutral-400 leading-relaxed">
            Currently focused on hybrid Kubernetes architectures that bridge
            local compute with public cloud, keeping costs low and control high.
          </p>
        </div>
        <div className="space-y-6">
          {skillCategories.map((category) => (
            <div key={category.name}>
              <h3 className="text-sm font-medium text-neutral-500 mb-3">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 border border-neutral-800 rounded text-sm text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div className="mt-16">
        <h3 className="font-heading text-2xl font-bold mb-6">Awards</h3>
        <div className="space-y-4">
          {[
            {
              title: "Placeholder Hackathon — 1st Place",
              event: "Event Name 2024",
              detail: "Brief description of the project and what you built.",
            },
            {
              title: "Placeholder Hackathon — Winner",
              event: "Event Name 2023",
              detail: "Brief description of the project and what you built.",
            },
          ].map((award) => (
            <div key={award.title} className="flex items-start gap-3">
              <span className="text-emerald-400 mt-1 shrink-0">-</span>
              <div>
                <p className="text-neutral-200 font-medium">{award.title}</p>
                <p className="text-sm text-neutral-500">
                  {award.event} — {award.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
