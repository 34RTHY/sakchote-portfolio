import { socialLinks } from "@/data/social";
import { siteConfig } from "@/data/config";
import SocialIcon from "@/components/SocialIcon";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 py-8 px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-neutral-500">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.fullName}
        </p>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="text-neutral-500 hover:text-neutral-300 transition"
              aria-label={link.label}
            >
              <SocialIcon type={link.icon} className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
