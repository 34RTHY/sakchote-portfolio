import SectionWrapper from "@/components/SectionWrapper";
import SocialIcon from "@/components/SocialIcon";
import { socialLinks } from "@/data/social";

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="font-heading text-3xl font-bold mb-4">Get in touch</h2>
      <p className="text-neutral-400 mb-8">
        Interested in working together? Feel free to reach out.
      </p>
      <div className="flex gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
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
