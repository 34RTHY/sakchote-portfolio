import type { ContentBlock } from "./content";

export interface EducationEntry {
  slug: string;
  degree: string;
  school: string;
  period: string;
  content: ContentBlock[];
  highlights: string[];
  image?: string;
  relatedProjects?: string[];
}

export const education: EducationEntry[] = [
  {
    slug: "chulalongkorn-ee",
    degree: "B.Eng. Electrical Engineering (Communication Engineering)",
    school: "Chulalongkorn University",
    period: "2024 — Present",
    content: [
      { type: "text", value: "Pursuing a Bachelor of Engineering in Electrical Engineering with a focus on Communication Engineering at Chulalongkorn University — Thailand's oldest and most prestigious university. The program combines rigorous foundations in signal processing, electromagnetic theory, and digital communications with hands-on laboratory work in modern telecommunications systems." },
      { type: "text", value: "Beyond the core curriculum, I've channeled the engineering mindset into software — building production systems, competing in hackathons, and publishing research at IEEE. The intersection of communication systems and software engineering drives my work: understanding how data moves at the physical layer informs how I architect systems at the application layer, from network protocols to distributed infrastructure." },
    ],
    highlights: [
      "Co-authored and presented a peer-reviewed paper at IEEE TALE 2025 with Student Travel Grant",
      "Top 10 Finalist — Thailand Cyber Top Talent 2025 (national cybersecurity competition)",
      "1st Runner Up — AI Thailand Hackathon 2024 and NCSA CTF Boot Camp 2024",
      "Built and deployed a hybrid Kubernetes cluster spanning on-premises and cloud infrastructure",
      "Lead backend developer on CULI — an AI exam grading platform serving Chulalongkorn University",
    ],
    relatedProjects: ["homelab-kubernetes", "ezzay-platform"],
  },
];
