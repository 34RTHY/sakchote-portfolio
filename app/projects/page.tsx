import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Hybrid Edge Kubernetes Cluster",
    description:
      "Bridged a local Proxmox hypervisor with an AWS VPS into a unified K3s cluster. Cloudflare Tunnel for zero-open-port ingress, Tailscale mesh networking, Terraform + Ansible automation.",
    tags: ["K3s", "Terraform", "Ansible", "Tailscale", "Cloudflare"],
    href: "https://github.com/34RTHY/Homelab_Setup",
  },
  {
    title: "Choudai",
    description:
      "E-commerce backend platform. Deployed on the home node of the hybrid cluster for data gravity and cost efficiency.",
    tags: ["TypeScript", "Node.js", "PostgreSQL", "Kubernetes"],
  },
  {
    title: "Caremate",
    description:
      "AI-powered assistant application. Runs alongside Choudai on the home node with GPU access for inference workloads.",
    tags: ["Python", "AI/ML", "Docker", "Kubernetes"],
  },
];

export default function Projects() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-10">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
