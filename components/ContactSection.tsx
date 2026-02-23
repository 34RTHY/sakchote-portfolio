import SectionWrapper from "@/components/SectionWrapper";
import SocialIcon from "@/components/SocialIcon";
import CopyButton from "@/components/CopyButton";
import { socialLinks } from "@/data/social";

export default function ContactSection() {
  const emailLink = socialLinks.find((l) => l.icon === "email");
  const otherLinks = socialLinks.filter((l) => l.icon !== "email");

  return (
    <SectionWrapper id="contact" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="font-heading text-3xl font-bold mb-4">Get in touch</h2>
      <p className="text-neutral-400 mb-8 max-w-lg">
        Interested in working together or have a question? Drop me an email or
        find me on the platforms below.
      </p>

      {emailLink && (
        <div className="flex items-center gap-1 mb-10">
          <a
            href={emailLink.href}
            className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition text-sm"
          >
            <SocialIcon type="email" className="w-5 h-5" />
            {emailLink.label}
          </a>
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
            className="flex items-center gap-2 text-neutral-400 hover:text-emerald-400 transition text-sm"
          >
            <SocialIcon type={link.icon} className="w-5 h-5" />
            {link.label}
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
