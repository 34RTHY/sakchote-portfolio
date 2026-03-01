import type { ContentBlock } from "./content";

export interface Award {
  slug: string;
  title: string;
  event: string;
  date: string;
  detail: string;
  image?: string;
  content: ContentBlock[];
  relatedProjects?: string[];
  relatedExperience?: string[];
}

export const awards: Award[] = [
  {
    slug: "ieee-tale-macau-2025",
    title: "Paper Presentation & Student Travel Grant — IEEE TALE 2025",
    event: "IEEE TALE",
    date: "2025",
    detail: "Adaptive Prompt-Based AES: A Teacher-AI Collaborative System for Improving Essay Scoring Accuracy over Time",
    content: [
      { type: "text", value: "Co-authored and presented a peer-reviewed paper at the IEEE International Conference on Teaching, Assessment, and Learning for Engineering (TALE) 2025. The paper, titled \"Adaptive Prompt-Based AES: A Teacher-AI Collaborative System for Improving Essay Scoring Accuracy over Time,\" introduces a novel framework for Automated Essay Scoring (AES) where human assessors and AI collaborate in grading student essays." },
      { type: "text", value: "The core idea is an adaptive prompting approach — rather than relying on fixed few-shot examples or zero-shot rubric instructions, the system continuously expands its retrieval pool with newly teacher-graded essays. For each ungraded essay, semantically similar previously-graded examples are dynamically retrieved and provided as context to the LLM, allowing the system to improve its scoring alignment over time, much like a human grader refines their rubric interpretation through experience." },
      { type: "text", value: "Simulations across seven diverse essay tasks from the ASAP 2.0 dataset showed that adaptive prompting progressively improved scoring agreement with human raters as the retrieval database grew. A pilot deployment with real instructors demonstrated a 39% reduction in manual grading workload while maintaining only a 10% discrepancy rate between human and AI scores." },
      { type: "text", value: "This research directly informed the architecture of the CULI platform — the adaptive retrieval pipeline, the teacher-AI co-evaluation workflow, and the vector similarity infrastructure were all designed and validated through the experiments described in this paper." },
      { type: "text", value: "Co-authored with Kasidech Aewsrisakul, Norasetha Somboon, Asst. Prof. Dr. Chulaporn Kongkeo (CULI), and Asst. Prof. Dr. Dittaya Wanvarie (Faculty of Science, Chulalongkorn University). Received an IEEE Student Award Travel Grant to present this work at the conference." },
      { type: "gallery", title: "Presentation & Award", images: [
        { src: "/awards/ieee-tale-macau-2025/presentation-podium.jpg", caption: "Presenting at IEEE TALE 2025" },
        { src: "/awards/ieee-tale-macau-2025/presentation-closeup.jpg" },
        { src: "/awards/ieee-tale-macau-2025/presentation-slides.jpg" },
        { src: "/awards/ieee-tale-macau-2025/presentation-wide.jpg" },
        { src: "/awards/ieee-tale-macau-2025/travel-grant-ceremony.jpg", caption: "Student Travel Grant award" },
        { src: "/awards/ieee-tale-macau-2025/travel-grant-certificate.jpg", caption: "Certificate" },
      ]},
      { type: "attachments", title: "Publication", items: [
        { label: "IEEE Xplore — DOI: 10.1109/TALE66047.2025.11346459", href: "https://doi.org/10.1109/TALE66047.2025.11346459", kind: "paper" },
      ]},
    ],
    image: "/awards/ieee-tale-macau-2025/cover.jpg",
    relatedProjects: ["ezzay-platform"],
    relatedExperience: ["ezzay-platform"],
  },
  {
    slug: "ai-thailand-hackathon-2024",
    title: "1st Runner Up — AI Thailand Hackathon 2024 EP2",
    event: "NECTEC",
    date: "Nov 2024",
    detail: "AI for Thai API on Shelf",
    content: [
      { type: "text", value: "Competed as Team Outlier in the AI Thailand Hackathon 2024 — AI for Thai API on Shelf, held at Sirindhorn Science Home. Out of 28 teams in the final round, our team placed 1st Runner Up with a 36-hour build." },
      { type: "text", value: "We developed an application that automates exam creation from uploaded course materials. Educators upload a PDF — lecture notes, textbooks, or syllabi — and the system generates structured exam questions in minutes, a process that traditionally takes weeks of manual work. The application leveraged the AI for Thai API for Thai-language NLP processing." },
      { type: "text", value: "Beyond generation, the system implemented an Elo-based adaptive difficulty mechanism inspired by competitive chess ratings. As students answer questions, their proficiency rating adjusts dynamically — the system selects harder or easier questions to match their level, keeping assessments in the zone of productive challenge. Questions were also classified across Bloom's Taxonomy levels (Remember, Understand, Apply, Analyze, Evaluate, Create), allowing educators to ensure their exams tested higher-order thinking rather than just recall." },
      { type: "text", value: "This project became an early exploration into AI-assisted education workflows, and the ideas around automated assessment directly influenced the later development of the CULI platform." },
      { type: "gallery", images: [
        { src: "/awards/ai-thailand-hackathon-2024/examee-product.jpg" },
        { src: "/awards/ai-thailand-hackathon-2024/award-ceremony.jpg" },
        { src: "/awards/ai-thailand-hackathon-2024/award-photo.jpg" },
      ]},
      { type: "attachments", title: "Resources", items: [
        { label: "Presentation Slides", href: "/awards/ai-thailand-hackathon-2024/presentation-slides.pdf", kind: "slides" },
        { label: "The Story Thailand — AI Thailand Hackathon 2024", href: "https://www.thestorythailand.com/ai-thailand-hackathon-2024-2/", kind: "website" },
      ]},
    ],
    image: "/awards/ai-thailand-hackathon-2024/award-ceremony.jpg",
    relatedProjects: ["ezzay-platform"],
    relatedExperience: ["ezzay-platform"],
  },
  {
    slug: "cyber-top-talent-2025",
    title: "Top 10 Finalist — Thailand Cyber Top Talent 2025 Senior Qualifier",
    event: "NCSA",
    date: "Aug 2025",
    detail: "National cybersecurity competition",
    content: [
      { type: "text", value: "Qualified as a Top 10 Finalist in the Thailand Cyber Top Talent 2025 Senior Qualifier, a national-scale cybersecurity competition organized by the National Cyber Security Agency (NCSA). The competition drew significantly more participants and featured harder challenges compared to the NCSA CTF Boot Camp, serving as Thailand's premier pathway for identifying top cybersecurity talent." },
      { type: "text", value: "My primary focus areas were web exploitation and cryptography — identifying and exploiting vulnerabilities in web applications, and breaking cryptographic implementations to recover flags. The qualifier tested depth of knowledge under time pressure across a broad range of real-world attack scenarios." },
    ],
    image: "/awards/cyber-top-talent-2025/cover.png",
  },
  {
    slug: "ncsa-ctf-bootcamp-2024",
    title: "1st Runner Up — NCSA CTF Boot Camp 2024",
    event: "NCSA",
    date: "Sep 2024",
    detail: "Capture the Flag competition",
    content: [
      { type: "text", value: "Competed in the NCSA CTF Boot Camp 2024, a national Capture the Flag cybersecurity competition organized by Thailand's National Cyber Security Agency (NCSA). The competition covered six tracks: Web Application, Digital Forensics, Pwnable & Reverse Engineering, Network Security, Mobile Security, and Programming." },
      { type: "text", value: "Our team placed 1st Runner Up across all categories, demonstrating breadth across offensive security disciplines — from exploiting web vulnerabilities and binary exploitation to forensic analysis and network traffic inspection." },
      { type: "gallery", images: [
        { src: "/awards/ncsa-ctf-bootcamp-2024/award-ceremony.jpg" },
        { src: "/awards/ncsa-ctf-bootcamp-2024/medal-ceremony.jpg" },
      ]},
    ],
    image: "/awards/ncsa-ctf-bootcamp-2024/award-ceremony.jpg",
  },
  {
    slug: "medchic-hackathon-2024",
    title: "2nd Runner Up — MEDCHIC Health Data Hackathon 2024",
    event: "Chiang Mai University",
    date: "Mar 2024",
    detail: "Healthcare data innovation",
    content: [
      { type: "text", value: "Competed in the MEDCHIC Health Data Hackathon 2024, a 36-hour coding marathon focused on kidney disease solutions, organized by ITSC and MEDCHIC at Chiang Mai University. Our team placed 2nd Runner Up." },
      { type: "text", value: "The challenge required working with real clinical data from the MIMIC-IV database hosted on PhysioNet — a credentialed-access dataset that required completing CITI ethics training, obtaining credentialed researcher status, and signing a Data Use Agreement committing to strict patient de-identification and secure handling practices before any data could be accessed." },
      { type: "text", value: "We built a 50-class classification model for kidney disease diagnosis, achieving 95% top-5 accuracy. The model processed structured clinical data — lab results, patient demographics, and medical history — to predict specific kidney disease subtypes, enabling earlier and more precise diagnosis pathways. We also developed a RAG-based question answering system that let clinicians query medical knowledge about kidney diseases in natural language, grounding responses in verified clinical literature to reduce hallucination risk." },
      { type: "gallery", images: [
        { src: "/awards/medchic-hackathon-2024/award-ceremony.jpg" },
        { src: "/awards/medchic-hackathon-2024/trophy.jpg" },
      ]},
    ],
    image: "/awards/medchic-hackathon-2024/award-ceremony.jpg",
    relatedProjects: ["caremate"],
  },
  {
    slug: "spu-ai-prompt-hackathon-2024",
    title: "2nd Runner Up — SPU AI Prompt Mini Hackathon 2024",
    event: "Sripatum University",
    date: "Jan 2024",
    detail: "AI prompt engineering competition",
    content: [
      { type: "text", value: "Competed in the SPU AI Prompt Mini Hackathon 2024 at Sripatum University. Despite the competition's focus on prompt engineering and LLM-based approaches, our team took a contrarian strategy — instead of relying on LLMs for semantic analysis, we built a logistic classification model that outperformed prompt-based solutions on the evaluation criteria." },
      { type: "text", value: "The approach demonstrated that traditional ML methods with proper feature engineering can still beat LLM-driven solutions in structured classification tasks, especially when interpretability, speed, and cost efficiency matter more than generative flexibility. Our team placed 2nd Runner Up." },
      { type: "gallery", images: [
        { src: "/awards/spu-ai-prompt-hackathon-2024/trophy.jpg" },
        { src: "/awards/spu-ai-prompt-hackathon-2024/award-ceremony.jpg" },
      ]},
    ],
    image: "/awards/spu-ai-prompt-hackathon-2024/trophy.jpg",
  },
  {
    slug: "grabspark-2024",
    title: "Finalist — GrabSpark 2024 Case Competition",
    event: "Grab",
    date: "Nov 2024",
    detail: "Business case competition",
    content: [
      { type: "text", value: "Competed as Team BossBaby Consulting in the GrabSpark 2024 Case Competition, tackling the strategic question of how Grab Thailand can sustain its market leadership and achieve next S-curve growth over the next 3–5 years." },
      { type: "text", value: "Our strategy centered on two pillars. First, expanding into untapped verticals: GrabHome — an on-demand home services marketplace for housekeeping, gardening, and handyman services leveraging Grab's existing user base, mapping technology, and GrabFinance for provider equipment financing — and GrabHealth — a telemedicine layer built on top of Grab's existing pharmacy network under GrabMart, positioning Grab as the first super-app in Thailand to offer e-prescription consultation and delivery. We also proposed enhancements to GrabFood Dine Out with off-peak filling strategies, collaborative dining experiences, and interactive menus to drive the conversion rate from 27% to 35%." },
      { type: "text", value: "Second, strengthening retention and lifetime value through GrabGPT — a personalized AI chatbot powered by RAG that leverages each user's historical data to provide contextual recommendations across all Grab services — and GrabQuest — a gamified loyalty program with a tiered ranking system (Bronze through Emerald), cross-service quests, GreenPoints for eco-friendly behavior, and quarterly resets to sustain engagement." },
      { type: "text", value: "The proposal projected 12B THB incremental revenue by Year 5 (+4.4%), 35% home cleaning market share, 9% e-prescription penetration, 617K incremental GrabUnlimited subscribers, and 9.5M incremental transactions through GrabQuest — supported by a phased 5-year implementation roadmap." },
      { type: "gallery", images: [
        { src: "/awards/grabspark-2024/team-photo.jpg" },
        { src: "/awards/grabspark-2024/presentation.jpg", caption: "Presenting to Grab judges" },
      ]},
      { type: "attachments", title: "Resources", items: [
        { label: "Presentation Slides", href: "/awards/grabspark-2024/presentation-slides.pdf", kind: "slides" },
      ]},
    ],
    image: "/awards/grabspark-2024/team-photo.jpg",
  },
  {
    slug: "yumepro-2025",
    title: "Finalist — YumePro Thailand 2025",
    event: "YumePro",
    date: "Feb 2025",
    detail: "AI-powered workforce optimization ecosystem",
    content: [
      { type: "text", value: "Competed as Team Outliers in YumePro Thailand 2025, a national innovation competition. Our team developed Nightingale — an AI-powered workforce optimization ecosystem built around smartwatch-based health monitoring and predictive analytics." },
      { type: "text", value: "Nightingale addresses a critical gap in workplace wellness: most corporate health programs are reactive and generic, relying on annual check-ups and one-size-fits-all initiatives. Our solution flips this by continuously collecting real-time biometric data — heart rate, heart rate variability, sleep quality, activity levels, SpO2, and skin temperature — through employees' smartwatches, then applying AI-driven analytics to surface actionable workforce health insights before problems escalate." },
      { type: "text", value: "The platform operates on two layers. For employees, a mobile companion app delivers personalized health goals, sleep and stress trend analysis, and gamified wellness engagement through team challenges, leaderboards, and achievement milestones — turning health improvement into a social, competitive experience rather than a compliance checkbox. For employers, an HR dashboard aggregates anonymized workforce-level metrics — department stress indices, fatigue risk scores, productivity correlations — enabling data-driven decisions about workload distribution, scheduling, and wellness program ROI." },
      { type: "text", value: "Privacy was a core architectural constraint. All data flowing to the employer dashboard is aggregated and anonymized by design, with the system built to comply with GDPR, HIPAA, and Thailand's PDPA. Individual biometric data never leaves the employee's personal scope — employers only see population-level trends, never individual health records." },
      { type: "text", value: "The business model combines a one-time setup fee with recurring per-employee subscriptions, offering tiered plans that scale from basic health monitoring to advanced predictive analytics with custom integrations. The platform also extends the smartwatch beyond health — incorporating contactless payment, employee identification, and access control into a single wearable device." },
    ],
    image: "/awards/yumepro-2025/cover.png",
  },
];
