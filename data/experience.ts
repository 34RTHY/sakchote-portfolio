import type { ContentBlock } from "./content";

export interface ExperienceEntry {
  slug: string;
  role: string;
  company: string;
  period: string;
  content: ContentBlock[];
  highlights: string[];
  technologies: string[];
  image?: string;
  relatedProjects?: string[];
  relatedAwards?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    slug: "ezzay-platform",
    role: "Backend Developer (Lead)",
    company: "Ezzay Platform",
    period: "Aug 2024 — Present",
    content: [
      { type: "text", value: "Architected and deployed the backend infrastructure for an AI-powered exam grading platform at Chulalongkorn University Language Institute (CULI), reducing manual evaluation time by 50%." },
      { type: "text", value: "Presented system architecture and research findings at the IEEE TALE 2025 conference in Macau. Also demonstrated the platform at the \"AI for Smart Admincourt\" roadshow at the Administrative Court of Thailand." },
      { type: "text", value: "Engineered a high-performance REST API using FastAPI with async background jobs for batch-grading. Integrated GPT-4 for handwriting OCR and rubric-based scoring, backed by PostgreSQL with vector search." },
      { type: "text", value: "Containerized the stack with Docker, deployed secure file storage via AWS S3, and managed infrastructure with Terraform. Built CI/CD pipelines via GitHub Actions with automated pytest routines." },
    ],
    highlights: [
      "Reduced manual evaluation time by 50%",
      "Presented at IEEE TALE 2025 in China",
      "Async background job processing for batch-grading",
      "GPT-4 integration for handwriting OCR and rubric-based scoring",
      "PostgreSQL with vector search for semantic matching",
    ],
    technologies: [
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Docker",
      "AWS S3",
      "Terraform",
      "GitHub Actions",
      "GPT-4",
    ],
    relatedProjects: ["ezzay-platform"],
    relatedAwards: ["ai-thailand-hackathon-2024"],
  },
];
