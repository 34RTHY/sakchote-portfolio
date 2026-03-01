import SectionWrapper from "@/components/SectionWrapper";
import SocialIcon from "@/components/SocialIcon";
import CopyButton from "@/components/CopyButton";
import SplitHeading from "@/components/SplitHeading";
import MagneticButton from "@/components/MagneticButton";
import { socialLinks } from "@/data/social";

export default function ContactSection() {
  const emailLink = socialLinks.find((l) => l.icon === "email");
  const otherLinks = socialLinks.filter((l) => l.icon !== "email");

  return (
    <SectionWrapper id="contact" className="max-w-5xl mx-auto px-6 pt-20 pb-32">
      <p className="text-xs uppercase tracking-[0.2em] text-warm-500 mb-4">05 —</p>
      <div className="relative">
        <div className="contact-glow" />
        <SplitHeading className="text-3xl md:text-4xl font-semibold mb-4 relative">Get in touch</SplitHeading>
      </div>
      <p className="text-warm-400 mb-8 max-w-lg">
        Interested in working together or have a question? Drop me an email or
        find me on the platforms below.
      </p>

      {emailLink && (
        <div className="flex items-center gap-1 mb-10">
          <MagneticButton
            href={emailLink.href}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-surface-950 rounded-lg font-medium transition-colors text-sm"
          >
            <SocialIcon type="email" className="w-5 h-5" />
            {emailLink.label}
          </MagneticButton>
          <CopyButton text={emailLink.label} />
        </div>
      )}

      <div className="flex gap-6">
        {otherLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-warm-400 hover:text-gold-400 transition text-sm"
          >
            <SocialIcon type={link.icon} className="w-5 h-5" />
            {link.label}
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
