export interface SocialLink {
  label: string;
  href: string;
  icon: "email" | "github" | "linkedin" | "line";
}

export const socialLinks: SocialLink[] = [
  {
    label: "Sakchote.khemmarach@email.com",
    href: "mailto:Sakchote.khemmarach@email.com",
    icon: "email",
  },
  {
    label: "GitHub",
    href: "https://github.com/34RTHY",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sakchote-khemmarach",
    icon: "linkedin",
  },
  {
    label: "Line",
    href: "https://line.me/ti/p/~sakchote2549",
    icon: "line",
  },
];
