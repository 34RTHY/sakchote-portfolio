export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string[];
  stack: string[];
  role: string;
  timeline: string;
  links: { label: string; href: string }[];
  highlights: string[];
  featured?: boolean;
  image?: string;
  screenshots?: string[];
}

export const projects: Project[] = [
  {
    slug: "homelab-kubernetes",
    title: "Hybrid Edge Kubernetes Cluster",
    tagline:
      "Bridging a local Proxmox hypervisor with a public cloud VPS into a single K3s cluster — zero open inbound ports.",
    description: [
      "Designed and built a hybrid Kubernetes architecture that unifies a local Proxmox VM with an AWS EC2 instance into a single K3s cluster. All inter-node traffic routes over a Tailscale mesh VPN, and public ingress flows through a Cloudflare Tunnel — meaning neither node exposes any open inbound ports.",
      "The entire stack is automated with Terraform for provisioning, Ansible for OS hardening, and a single orchestration script that can stand up or tear down the full environment in minutes.",
    ],
    stack: [
      "K3s",
      "Terraform",
      "Ansible",
      "Tailscale",
      "Cloudflare Tunnel",
      "Traefik",
      "Docker",
      "Ubuntu",
    ],
    role: "Infrastructure Engineer",
    timeline: "2024 — Present",
    links: [
      { label: "GitHub", href: "https://github.com/34RTHY/Homelab_Setup" },
    ],
    highlights: [
      "Zero open inbound ports on either node — ingress via Cloudflare Tunnel only",
      "Cross-node pod networking over Tailscale mesh with ~36ms latency",
      "Single-script provisioning from bare metal to running workloads",
      "UFW default-deny firewall with Tailscale-only SSH access on cloud node",
      "Node labeling strategy: location=home for data-heavy workloads, location=cloud for edge routing",
    ],
    featured: true,
  },
  {
    slug: "choudai",
    title: "Choudai",
    tagline:
      "E-commerce backend platform deployed on the home node for data gravity and cost efficiency.",
    description: [
      "A full-featured e-commerce backend built with TypeScript and Node.js. Runs on the home node of the hybrid cluster where it has direct access to the PostgreSQL database — keeping data local for performance and cost reasons.",
      "Placeholder for additional project details. Replace with actual implementation notes, architecture decisions, and technical challenges.",
    ],
    stack: ["TypeScript", "Node.js", "PostgreSQL", "Kubernetes", "Docker"],
    role: "Full-Stack Engineer",
    timeline: "2024 — Present",
    links: [],
    highlights: [
      "Placeholder: API design and data modeling decisions",
      "Placeholder: Authentication and authorization approach",
      "Placeholder: Performance optimizations",
    ],
  },
  {
    slug: "caremate",
    title: "Caremate",
    tagline:
      "AI-powered assistant application with GPU inference on the home node.",
    description: [
      "An AI assistant application that runs alongside Choudai on the home node. Leverages local GPU access for inference workloads, keeping latency low and avoiding cloud GPU costs.",
      "Placeholder for additional project details. Replace with actual implementation notes, model choices, and technical challenges.",
    ],
    stack: ["Python", "AI/ML", "Docker", "Kubernetes"],
    role: "ML Engineer",
    timeline: "2024 — Present",
    links: [],
    highlights: [
      "Placeholder: Model selection and fine-tuning approach",
      "Placeholder: Inference optimization techniques",
      "Placeholder: Integration with cluster workloads",
    ],
  },
];
