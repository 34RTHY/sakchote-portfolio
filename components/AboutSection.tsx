import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import SplitHeading from "@/components/SplitHeading";
import { skillCategories } from "@/data/skills";
import { awards } from "@/data/awards";
import { certifications } from "@/data/certifications";

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="max-w-5xl mx-auto px-6 pt-28 pb-20" alt>
      <p className="text-xs uppercase tracking-[0.2em] text-warm-500 mb-4">01 —</p>
      <SplitHeading className="text-3xl md:text-4xl font-semibold mb-12">About</SplitHeading>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-warm-300 leading-relaxed mb-4">
            I&apos;m a second-year Electrical Engineering student at Chulalongkorn
            University specializing in Communication Engineering — but most of my
            time goes into building software. From architecting an AI exam grading
            platform deployed at Chulalongkorn&apos;s Language Institute to
            co-authoring a peer-reviewed paper presented at IEEE TALE 2025 in
            Macau, I work at the intersection of backend systems, AI pipelines,
            and production infrastructure.
          </p>
          <p className="text-warm-400 leading-relaxed mb-4">
            I gravitate toward the hard parts of software engineering — escrow payment
            systems that can&apos;t fail, pipelines that need to be
            clinically accurate, Kubernetes clusters that span home servers and
            cloud edge nodes with zero open ports. I compete in hackathons and
            CTF competitions to sharpen these skills under pressure.
          </p>
          <p className="text-warm-400 leading-relaxed font-medium">
            Currently open to software engineering internship opportunities.
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
              <Link
                key={award.slug}
                href={`/awards/${award.slug}`}
                className="flex items-start gap-3 group"
              >
                <span className="text-gold-400 mt-1 shrink-0">-</span>
                <div className="flex-1">
                  <p className="text-warm-100 font-medium group-hover:text-gold-400 transition">
                    {award.title}
                  </p>
                  <p className="text-sm text-warm-500">
                    {award.event} &middot; {award.date} — {award.detail}
                  </p>
                </div>
                <span className="text-warm-600 group-hover:text-gold-400 transition mt-1 opacity-0 group-hover:opacity-100">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Certifications — hidden when empty */}
      {certifications.length > 0 && (
        <div className="mt-16">
          <SplitHeading as="h3" className="text-2xl font-semibold mb-6">Certifications</SplitHeading>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-start gap-3 border border-surface-800 rounded-lg px-4 py-3 hover:border-gold-500/40 transition-colors group"
              >
                {cert.image && (
                  <img src={cert.image} alt={cert.issuer} className="w-10 h-10 object-contain shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-warm-100 text-sm font-medium leading-tight">{cert.name}</p>
                  <p className="text-warm-500 text-xs mt-1">{cert.issuer} &middot; {cert.date}</p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gold-400 hover:text-gold-400/80 transition mt-1 inline-block"
                    >
                      Verify &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Easter egg */}
      <div className="mt-24 text-center">
        <Link
          href="/uses"
          className="text-sm text-warm-500 border border-surface-800 rounded-full px-5 py-2 hover:border-gold-500/40 hover:text-gold-400 transition-colors inline-block"
        >
          Want to know me more? &rarr;
        </Link>
      </div>
    </SectionWrapper>
  );
}
