export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages & Frameworks",
    skills: [
      "Python",
      "Go",
      "TypeScript",
      "SQL",
      "C/C++",
      "Java",
      "FastAPI",
      "Gin",
      "React",
      "Next.js",
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
      "Proxmox",
      "Nginx",
      "Traefik",
    ],
  },
  {
    name: "Cloud & Tools",
    skills: [
      "AWS",
      "GCP",
      "Cloudflare",
      "Tailscale",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Git",
      "GitFlow",
      "GitOps",
      "CI/CD",
      "GitHub Actions",
    ],
  },
  {
    name: "Security",
    skills: [
      "Secure API Design",
      "RBAC",
      "JWT / OAuth",
      "Burp Suite",
      "Wireshark",
      "Nmap",
      "Nikto",
    ],
  },
  {
    name: "AI & Machine Learning",
    skills: [
      "LLM Integration",
      "OpenAI API",
      "NLP",
      "Computer Vision",
      "CNNs",
      "NumPy",
    ],
  },
];
