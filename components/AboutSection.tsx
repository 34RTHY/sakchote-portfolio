import SectionWrapper from "@/components/SectionWrapper";
import SplitHeading from "@/components/SplitHeading";
import { skillCategories } from "@/data/skills";
import { awards } from "@/data/awards";

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="max-w-5xl mx-auto px-6 pt-28 pb-20" alt>
      <p className="text-xs uppercase tracking-[0.2em] text-warm-500 mb-4">01 —</p>
      <SplitHeading className="text-3xl md:text-4xl font-semibold mb-12">About</SplitHeading>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-warm-300 leading-relaxed mb-4">
            I&apos;m a software engineer passionate about building reliable,
            scalable systems. I enjoy working across the full stack — from
            designing cloud-native infrastructure to crafting polished user
            interfaces.
          </p>
          <p className="text-warm-400 leading-relaxed">
            Currently focused on hybrid Kubernetes architectures that bridge
            local compute with public cloud, keeping costs low and control high.
          </p>
        </div>
        <div className="space-y-6">
          {skillCategories.map((category) => (
            <div key={category.name}>
              <h3 className="text-sm font-medium text-warm-500 mb-3">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 border border-surface-800 rounded text-sm text-warm-300 hover:border-gold-500/40 hover:text-warm-100 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Awards — hidden when empty */}
      {awards.length > 0 && (
        <div className="mt-16">
          <SplitHeading as="h3" className="text-2xl font-semibold mb-6">Awards</SplitHeading>
          <div className="space-y-4">
            {awards.map((award) => (
              <div key={award.title} className="flex items-start gap-3">
                <span className="text-gold-400 mt-1 shrink-0">-</span>
                <div>
                  <p className="text-warm-100 font-medium">{award.title}</p>
                  <p className="text-sm text-warm-500">
                    {award.event} — {award.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
