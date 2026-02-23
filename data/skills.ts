export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages & Frameworks",
    skills: [
      "TypeScript",
      "JavaScript",
      "Python",
      "SQL",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
    ],
  },
  {
    name: "Infrastructure",
    skills: [
      "Kubernetes",
      "Docker",
      "Terraform",
      "Ansible",
      "Linux",
      "Traefik",
    ],
  },
  {
    name: "Cloud & Tools",
    skills: [
      "AWS",
      "Cloudflare",
      "Tailscale",
      "PostgreSQL",
      "Redis",
      "Git",
      "CI/CD",
      "GitHub Actions",
    ],
  },
];
