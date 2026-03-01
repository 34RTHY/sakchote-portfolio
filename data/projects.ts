import type { ContentBlock } from "./content";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  status?: string;
  description: string[];
  content?: ContentBlock[];
  stack: string[];
  role: string;
  timeline: string;
  links: { label: string; href: string }[];
  highlights: string[];
  featured?: boolean;
  image?: string;
  screenshots?: string[];
  relatedExperience?: string[];
  relatedAwards?: string[];
}

export const projects: Project[] = [
  {
    slug: "ezzay-platform",
    title: "CULI — AI Exam Grading Platform",
    tagline:
      "An enterprise-grade platform that automates language proficiency exam evaluation for Chulalongkorn University using OCR, GPT-based scoring, and vector similarity search.",
    description: [
      "CULI was built to solve a real bottleneck in academic assessment: manually grading hundreds of handwritten language proficiency exams is slow, inconsistent, and exhausting for instructors. This platform automates the entire pipeline — from scanning exam papers to delivering scored reports with detailed rubric-level feedback.",
    ],
    content: [
      // --- The Problem ---
      { type: "heading", value: "The Problem" },
      { type: "text", value: "Every semester, Chulalongkorn University's language institute processes thousands of handwritten proficiency exams. Instructors grade each one manually against a multi-dimensional rubric — a process that takes weeks, introduces inconsistency between graders, and burns out teaching staff. A single batch of 1000 exams could take a team of four instructors over two weeks to grade, with inter-rater reliability averaging below 70%." },
      { type: "text", value: "CULI was built to eliminate that bottleneck. The platform automates the entire pipeline — from scanning exam papers to delivering scored reports with rubric-level feedback — reducing grading time from weeks to hours while maintaining consistency that human teams struggle to achieve." },

      // --- Pipeline Architecture ---
      { type: "heading", value: "Pipeline Architecture" },
      { type: "text", value: "The grading pipeline is a five-stage async workflow. When instructors upload exam PDFs, each page is extracted as an image via PyMuPDF and pushed through an image preprocessing pipeline: normalization, grayscale conversion, Otsu's binary thresholding, and morphological operations to remove red pen annotations that would confuse the OCR model. Processed images are stored in AWS S3 with a content-addressed naming scheme to avoid re-processing duplicates." },
      { type: "text", value: "From there, GPT-4o's vision capabilities extract handwritten text from the preprocessed images. A separate GPT model then evaluates the extracted text against the configured rubric, scoring across four dimensions — Task Completion, Organization, Style & Language Expression, and Structural Variety & Accuracy — each on a 0–2.5 scale. The model also generates a natural-language justification for every sub-score, referencing specific passages from the student's writing." },

      // --- Dashboard ---
      { type: "heading", value: "Dashboard & Project Management" },
      { type: "text", value: "The dashboard aggregates real-time metrics across the system — total exam count, processing status breakdown (pending, processing, processed, failed), completion rate, average score, and a score distribution histogram. All statistics are computed from materialized database views that refresh on a configurable interval, keeping dashboard queries fast even as the exam count scales into the thousands." },
      { type: "image", src: "/projects/ezzay-platform/cover.png", caption: "Dashboard — real-time statistics, score distribution, and processing status" },

      { type: "text", value: "The platform organizes work into Projects — each one maps to a specific course section and grading rubric. Instructors create a project, bind it to a Task (the rubric configuration), and bulk-upload exam PDFs. The system splits multi-page PDFs, queues each page for processing, and tracks status at both the project and individual exam level." },
      { type: "image", src: "/projects/ezzay-platform/projects.png", caption: "Projects — each project groups exams by course, section, and grading rubric" },
      { type: "image", src: "/projects/ezzay-platform/inside_project.png", caption: "Project detail — exam list with processing status and score overview" },

      // --- Exam Grading Detail ---
      { type: "heading", value: "Exam Grading in Detail" },
      { type: "text", value: "Each graded exam surfaces five tabs of data. The Details tab shows the scanned image alongside metadata — exam ID, page number, processing status, total score, and timestamps. Instructors can trigger re-evaluation (useful after rubric adjustments), export individual results as PDF or CSV, or manually override scores when the AI's judgment needs correction." },
      { type: "image", src: "/projects/ezzay-platform/project_exam_details.png", caption: "Exam detail — scanned image with metadata, status, and total score" },

      { type: "text", value: "The Scores tab provides a rubric-level breakdown with visual progress indicators for each dimension. This design lets instructors spot patterns at a glance — if a cohort consistently scores low on Organization but high on Task Completion, it signals a teaching gap rather than a grading error." },
      { type: "image", src: "/projects/ezzay-platform/score_dist.png", caption: "Score breakdown — four rubric dimensions with visual progress indicators" },

      // --- OCR & Text Processing ---
      { type: "heading", value: "OCR & Text Processing" },
      { type: "text", value: "The Student tab shows metadata extracted directly from the exam sheet — student ID, section, seat number, and exam room — all read from the student's handwriting. This eliminates manual data entry and links each graded result back to the student record automatically." },
      { type: "image", src: "/projects/ezzay-platform/student_info.png", caption: "Student information — OCR-extracted metadata from handwritten exam sheets" },

      { type: "text", value: "The Text tab exposes the raw OCR output alongside an AI-cleaned version. This transparency serves two purposes: instructors can verify OCR accuracy on difficult handwriting, and the improved text shows exactly what the grading model evaluated — closing the loop on any scoring questions." },
      { type: "image", src: "/projects/ezzay-platform/text.png", caption: "Text — raw OCR extraction alongside the AI-improved version" },

      // --- AI Feedback & Few-Shot Learning ---
      { type: "heading", value: "AI Feedback & Few-Shot Learning" },
      { type: "text", value: "The Feedback tab makes the AI's reasoning fully transparent. Each exam gets an overall comment summarizing strengths and areas for improvement, followed by a criterion-by-criterion justification — explaining exactly how the model arrived at each sub-score with direct references to the student's writing. This isn't a black-box score; instructors can audit the reasoning and override when they disagree." },
      { type: "image", src: "/projects/ezzay-platform/feedback.png", caption: "Feedback — AI-generated comment and per-criterion scoring justification" },

      { type: "text", value: "To improve grading consistency over time, every graded exam is embedded into a 1536-dimensional vector using OpenAI's text-embedding model and stored in PostgreSQL via pgvector with an HNSW index. When grading a new exam, the system retrieves the three most semantically similar previously-graded exams and includes them as few-shot examples in the prompt. This grounds the model's scoring in established precedent rather than relying solely on rubric instructions — effectively building institutional memory into the grading pipeline." },

      // --- Rubric Configuration ---
      { type: "heading", value: "Rubric Configuration" },
      { type: "text", value: "Tasks are the core configuration that shape grading behavior. Each task encapsulates course metadata, detailed rubric criteria with scoring bands, example evaluations for model calibration, and the original exam instructions. Different tasks produce different scoring behaviors — a writing proficiency exam grades differently from a reading comprehension test, and the Task abstraction makes this configurable without code changes." },
      { type: "image", src: "/projects/ezzay-platform/task.png", caption: "Tasks — rubric configuration that drives AI evaluation behavior" },

      // --- Infrastructure & Auth ---
      { type: "heading", value: "Access Control & Administration" },
      { type: "text", value: "Authentication uses JWT with role-based access control. Administrators manage user accounts and system-level settings, while teachers are scoped to their own projects and exams. Token refresh is handled via HTTP-only cookies with sliding expiration to balance security with session persistence." },
      { type: "image", src: "/projects/ezzay-platform/users.png", caption: "User management — admin-only account registration and role assignment" },
      { type: "image", src: "/projects/ezzay-platform/settings.png", caption: "Settings — profile, notifications, and email preferences" },

      // --- Backend & Deployment ---
      { type: "heading", value: "Backend & Deployment" },
      { type: "text", value: "All heavy processing — PDF extraction, image preprocessing, OCR, and AI grading — runs as async background jobs with configurable batch sizes, retry logic with exponential backoff, and token-bucket rate limiting to stay within OpenAI API quotas. The job queue supports partial failure recovery: if a batch of 50 exams fails at exam #37, the system resumes from #37 on retry rather than reprocessing the entire batch." },
      { type: "text", value: "The REST API is built with FastAPI using a layered architecture — routers, services, and repositories with dependency injection. The frontend uses React 19, Vite, TypeScript, and Tailwind CSS, with TanStack Query for server state management, Zustand for client state, and Zod for runtime schema validation at API boundaries." },
      { type: "text", value: "The full stack is containerized with Docker Compose and reverse-proxied through Nginx. Infrastructure is provisioned on AWS Lightsail via Terraform, with CI/CD through GitHub Actions running pytest and Vitest test suites on every push." },

      // --- Research & Publication ---
      { type: "heading", value: "Research & Publication" },
      { type: "text", value: "This project grew out of a research question: can AI grade essays as reliably as human assessors — and can it get better over time? The team co-authored a paper titled \"Adaptive Prompt-Based AES: A Teacher-AI Collaborative System for Improving Essay Scoring Accuracy over Time,\" which was presented at IEEE TALE (Teaching, Assessment, and Learning for Engineering) 2025. The paper proposes an adaptive prompting framework where the system continuously learns from teacher-graded essays, dynamically retrieving semantically similar examples to improve scoring alignment as more data accumulates." },
      { type: "text", value: "A pilot deployment with real instructors showed a 39% reduction in manual grading workload while keeping the human-AI score discrepancy to just 10%. The CULI platform is the production implementation of the methodology validated in this research — bridging the gap between academic findings and real-world deployment at institutional scale." },
      { type: "text", value: "The platform was also presented at the \"AI for Smart Admincourt\" event at the Administrative Court of Thailand in May 2025. The Ezzay research team — alongside Asst. Prof. Dr. Chulaporn Kongkeo and Asst. Prof. Dr. Dittaya Wanvarie — demonstrated the system's approach to AI-assisted essay evaluation in a roadshow, marking CULI's first step in applying AI innovation to language assessment at an institutional level." },
      { type: "image", src: "/projects/ezzay-platform/admincourt-roadshow.png", caption: "Ezzay team presenting at the AI for Smart Admincourt roadshow, Administrative Court of Thailand" },
      { type: "attachments", title: "Publications & Coverage", items: [
        { label: "IEEE Xplore — DOI: 10.1109/TALE66047.2025.11346459", href: "https://doi.org/10.1109/TALE66047.2025.11346459", kind: "paper" },
        { label: "CULI News — AI for Smart Admincourt Roadshow", href: "https://www.culi.chula.ac.th/th/language-institute-news/view/187", kind: "website" },
      ]},
    ],
    stack: [
      "FastAPI",
      "Python",
      "React",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "OpenAI API",
      "AWS S3",
      "Docker",
      "Nginx",
      "Terraform",
      "GitHub Actions",
    ],
    role: "Backend Developer (Lead)",
    timeline: "2024 — Present",
    links: [],
    highlights: [
      "End-to-end automated grading pipeline: PDF upload → OCR → AI scoring → report generation",
      "GPT-powered OCR with image preprocessing (grayscale, thresholding, noise reduction)",
      "Rubric-based scoring across four dimensions with detailed justification feedback",
      "Few-shot learning via pgvector semantic similarity search (1536-dim embeddings, HNSW index)",
      "Async background job processing with retry logic, exponential backoff, and rate limiting",
      "JWT authentication with role-based access control (admin/teacher)",
      "PDF and CSV report generation for individual exams and full project batches",
      "React 19 frontend with TanStack Query, Zustand, and Zod validation",
      "Containerized deployment with Docker Compose, Nginx reverse proxy, and Terraform IaC",
      "CI/CD pipeline with GitHub Actions and automated test suites (pytest + Vitest)",
      "Research presented at IEEE TALE 2025 in Macau — validated few-shot grading methodology",
    ],
    image: "/projects/ezzay-platform/cover.png",
    featured: true,
    relatedExperience: ["ezzay-platform"],
    relatedAwards: ["ieee-tale-macau-2025", "ai-thailand-hackathon-2024"],
  },
  {
    slug: "homelab-kubernetes",
    title: "Hybrid Edge Kubernetes Cluster",
    tagline:
      "A production-grade K3s cluster spanning a local Proxmox hypervisor and an AWS EC2 edge node, connected over a zero-trust Tailscale mesh with no open inbound ports.",
    description: [
      "A hybrid Kubernetes architecture that splits responsibilities between a local Proxmox VM for compute-heavy workloads and an AWS EC2 instance that acts purely as a lightweight public edge — with zero open inbound ports on either node.",
    ],
    content: [
      { type: "heading", value: "The Problem" },
      { type: "text", value: "Self-hosting is appealing — free compute, full control, no recurring cloud bills. But serving public traffic from a home network traditionally means exposing your IP, opening firewall ports, and accepting the security risks that come with it. Dynamic IPs, ISP-level NAT, and residential network limitations add further complexity. This project solves all of these constraints with a hybrid architecture that keeps every port closed while still serving production traffic to the internet." },

      { type: "heading", value: "Hybrid Architecture" },
      { type: "text", value: "The cluster spans two nodes with distinct roles. The home node is a Proxmox VM (4 vCPU, 8GB RAM) running the K3s server and all application workloads — this is where the actual compute happens, for free. The cloud node is a lightweight AWS EC2 instance that serves purely as a public edge — it runs Traefik as the L7 ingress controller, pinned via Kubernetes node selectors, and forwards all traffic to the home node over an encrypted tunnel. The result: public-facing services with home-server economics." },
      { type: "image", src: "/projects/homelab-kubernetes/architecture.png", caption: "Architecture — hybrid cluster spanning Proxmox (home) and AWS EC2 (edge) over Tailscale mesh" },

      { type: "heading", value: "Zero-Trust Networking" },
      { type: "text", value: "All inter-node communication flows through a Tailscale mesh VPN, creating a zero-trust overlay network where every connection is mutually authenticated and encrypted. Neither node has any open inbound ports — public traffic enters exclusively through a Cloudflare Tunnel, which handles DDoS protection, WAF, and SSL termination before traffic ever touches the cluster. Flannel is configured to route pod-to-pod traffic over the Tailscale interface, so cross-node pod networking works seamlessly over the encrypted tunnel." },

      { type: "heading", value: "Infrastructure as Code" },
      { type: "text", value: "The infrastructure layer is fully codified. Terraform provisions both the Proxmox VM and the AWS EC2 instance with its VPC, security groups, and SSH key pairs. Ansible handles OS hardening across both nodes — configuring UFW with default-deny policies, disabling password-based SSH, enabling unattended security upgrades, and locking down SSH access to Tailscale IPs only after the mesh is established." },
      { type: "text", value: "The entire setup is orchestrated by a single idempotent script that executes six sequential phases: Terraform provisioning, Ansible hardening, Tailscale mesh establishment, K3s cluster creation, ingress configuration, and application deployment via ArgoCD. Each phase can be resumed independently, and the script includes health checks to verify the state of each layer before proceeding." },

      { type: "heading", value: "GitOps & Application Delivery" },
      { type: "text", value: "ArgoCD manages application deployments using a GitOps workflow — pushing changes to a repository automatically triggers synchronization across the cluster. The platform currently hosts this portfolio site, a time-tracking service (Wakapi), and several backend applications. Every deployment is declarative, version-controlled, and automatically reconciled against the desired state defined in Git." },
      { type: "text", value: "The cluster has maintained 99.9% uptime since deployment and currently serves this portfolio site to production traffic. The infrastructure is designed to scale — as new projects and services come online, they deploy through the same GitOps pipeline with zero manual intervention." },
    ],
    stack: [
      "K3s",
      "Terraform",
      "Ansible",
      "Tailscale",
      "Cloudflare Tunnel",
      "Traefik",
      "ArgoCD",
      "Docker",
      "Proxmox",
      "AWS EC2",
      "Ubuntu",
    ],
    role: "Infrastructure Engineer",
    timeline: "2024 — Present",
    links: [
      { label: "GitHub (Private)", href: "https://github.com/34RTHY/Homelab_Setup" },
    ],
    highlights: [
      "Zero open inbound ports — all public ingress flows through Cloudflare Tunnel",
      "Zero-trust networking via Tailscale mesh with encrypted pod-to-pod traffic across nodes",
      "Full infrastructure-as-code with Terraform (Proxmox + AWS) and Ansible (OS hardening)",
      "Single idempotent script orchestrates all six provisioning phases with resume support",
      "Node labeling separates concerns: compute-heavy workloads stay local, edge routing runs in the cloud",
      "GitOps application delivery with ArgoCD for automated, declarative deployments",
      "UFW default-deny firewalls with SSH locked to Tailscale IPs after bootstrap",
    ],
    image: "/projects/homelab-kubernetes/cover.png",
    featured: true,
  },
  {
    slug: "choudai",
    title: "Choudai",
    tagline:
      "A Mercari-style C2C marketplace for Thai secondhand goods — built on Go, clean architecture, and a custom escrow system to eliminate transaction fraud.",
    status: "In Active Development",
    description: [
      "Choudai is a consumer-to-consumer e-commerce platform designed as a \"Mercari for Thailand\" — a dedicated, trust-first marketplace for buying and selling secondhand goods domestically, with a competitive edge in curating quality secondhand products imported from Japan.",
    ],
    content: [
      { type: "heading", value: "The Problem" },
      { type: "text", value: "Peer-to-peer trading in Thailand is largely unstructured — scattered across social media groups, general classifieds, and chat-based negotiations with no buyer protection. Transaction fraud is rampant: sellers disappear after receiving payment, buyers dispute deliveries, and there's no neutral party to mediate. Choudai was built to solve this trust deficit with a purpose-built marketplace that makes C2C trading safe by default." },

      { type: "heading", value: "Platform & Market Position" },
      { type: "text", value: "The platform serves two markets simultaneously. First, the broad domestic secondhand market — everyday items traded between Thai consumers. Second, a curated vertical of secondhand goods imported from Japan, which are highly valued locally for their affordability and excellent condition. This Japanese-import angle gives Choudai a differentiated positioning that generic marketplaces can't replicate." },

      { type: "heading", value: "Escrow-First Trust Model" },
      { type: "text", value: "The backbone of the platform is a custom escrow payment system. When a buyer purchases an item, their payment is held securely by the platform — not forwarded to the seller. Funds are only released once the buyer confirms delivery and verifies the item matches its listing. This eliminates the most common fraud vectors in C2C trading: non-delivery, item misrepresentation, and payment disputes." },
      { type: "text", value: "User verification adds another trust layer. All accounts require phone verification to establish baseline legitimacy, and a customer identity system supports Thai National ID verification with PDPA consent tracking — ensuring compliance with Thailand's data protection regulations while keeping bad actors off the platform." },

      { type: "heading", value: "Core Features" },
      { type: "text", value: "Sellers create detailed product listings with structured metadata, while buyers navigate inventory through robust search and filtering. An integrated contextual chat system links conversations directly to specific product listings — negotiations happen in-context without needing external messaging apps, and the transaction history is preserved for dispute resolution." },

      { type: "heading", value: "Backend Architecture" },
      { type: "text", value: "The backend follows strict Clean Architecture with clearly separated layers: domain entities and repository interfaces at the core, usecases encapsulating business logic, and HTTP controllers at the delivery boundary. Dependencies flow inward — the domain layer has zero knowledge of frameworks, databases, or transport protocols. This makes the business logic independently testable and the entire system adaptable to infrastructure changes without touching core logic." },
      { type: "text", value: "The API is built with Go and the Gin framework, chosen for its raw throughput and efficient goroutine-based concurrency — critical for a marketplace handling concurrent transactions. PostgreSQL serves as the primary datastore with SQLC for type-safe, compile-time-verified database queries — no ORM magic, just SQL that maps cleanly to Go structs. Redis handles session caching and high-velocity data like popular listing retrieval." },
      { type: "text", value: "Authentication uses Auth0 with the PKCE flow for the mobile frontend and RS256 JWT validation on the backend. The API validates tokens against Auth0's JWKS endpoint with response caching, checks issuer and audience claims, and extracts custom scopes for fine-grained authorization. All protected routes sit behind JWT middleware with consistent error responses." },

      { type: "heading", value: "12-Factor App Compliance" },
      { type: "text", value: "The backend is designed around the 12-Factor App methodology. Configuration is externalized through environment variables with Viper handling hierarchical config loading — defaults, .env files for local development, and environment variable overrides in production. The application ships as a statically-linked binary in a minimal Alpine Docker image with multi-stage builds, debug symbols stripped, and API documentation bundled. Graceful shutdown handles SIGINT/SIGTERM with request draining and a 5-second timeout." },

      { type: "heading", value: "Frontend" },
      { type: "text", value: "The mobile frontend is built with React Native and Expo SDK 54, targeting iOS, Android, and web from a single codebase. The UI uses React Native Paper (Material Design) with file-based routing via Expo Router, Reanimated for fluid animations, and Storybook for component-driven development." },
    ],
    stack: ["Go", "Gin", "PostgreSQL", "Redis", "Auth0", "Docker", "React Native", "Expo"],
    role: "Backend Engineer",
    timeline: "2024 — Present",
    links: [],
    highlights: [
      "Custom escrow payment system eliminating peer-to-peer transaction fraud",
      "Clean Architecture with strict layer separation and dependency inversion",
      "12-Factor App methodology — externalized config, stateless processes, graceful shutdown",
      "Auth0 PKCE authentication with RS256 JWT validation and scope-based authorization",
      "Type-safe database layer with SQLC — compile-time-verified SQL, no ORM",
      "Thai National ID verification with PDPA consent tracking",
      "Contextual chat linked to product listings for in-context negotiation",
      "React Native + Expo cross-platform mobile frontend with Storybook",
      "Multi-stage Docker builds with stripped binaries on Alpine",
      "Git Flow branching strategy with semantic versioning",
    ],
    image: "/projects/choudai/cover.png",
  },
  {
    slug: "resume-generator",
    title: "AI Resume Generator",
    tagline:
      "An AI-powered resume optimization platform that generates targeted resume variations, evaluates them through six specialized AI agents, and compiles publication-ready PDFs via LaTeX.",
    description: [
      "A full-stack platform that transforms the resume writing process from guesswork into a data-driven workflow — analyzing target companies, rewriting content to match specific roles, and scoring results through multiple evaluation perspectives.",
    ],
    content: [
      { type: "heading", value: "The Problem" },
      { type: "text", value: "Writing a resume that lands interviews isn't about listing experience — it's about framing that experience to match what a specific company and role demands. Most job seekers send the same generic resume everywhere, missing critical keywords, misjudging tone, and failing ATS filters before a human ever reads it. Tailoring a resume manually for every application is effective but unsustainably time-consuming." },

      { type: "heading", value: "How It Works" },
      { type: "text", value: "Users start with a base resume containing their complete work history, skills, and projects. When targeting a specific position, they provide company and job details — or let the system scrape and research the company automatically via Tavily web search. The platform then analyzes the gap between the candidate's profile and the target role, and generates a tailored resume variation using GPT-4o with structured outputs via the Instructor framework." },
      { type: "image", src: "/projects/resume-generator/dashboard.png", caption: "Dashboard — overview of resumes, recent activity, and quick actions" },
      { type: "text", value: "The AI rewriting engine operates with strict constraints: it preserves all factual data — titles, dates, company names — while enhancing descriptions with power verbs, quantified impact metrics, and STAR-method framing. It injects relevant keywords from the job description and adapts tone based on detected company archetype: Enterprise/FinTech gets a 'Balanced Tech Lead' voice emphasizing reliability and governance, AI/Big Tech gets a 'Bold Innovator' tone highlighting research and vision, Startups get direct impact-driven language, and Creative companies get user-centric storytelling." },
      { type: "image", src: "/projects/resume-generator/global-profile.png", caption: "Global profile — base resume data shared across all variations" },
      { type: "image", src: "/projects/resume-generator/profile-detail.png", caption: "Profile detail — editing work experience, skills, and projects" },
      { type: "image", src: "/projects/resume-generator/create-profile.png", caption: "Creating a new resume profile" },

      { type: "heading", value: "Resume Generation & Variations" },
      { type: "text", value: "Each base resume can spawn multiple targeted variations — one per company or role. The platform tracks all generated versions with snapshots, letting users compare how the same experience is framed differently for different audiences." },
      { type: "image", src: "/projects/resume-generator/generated-variations.png", caption: "Generated variations — multiple tailored versions from a single base resume" },
      { type: "image", src: "/projects/resume-generator/resume-detail.png", caption: "Viewing a specific resume variation with section-by-section content" },
      { type: "image", src: "/projects/resume-generator/pdf-preview.png", caption: "Live PDF preview — LaTeX-compiled resume ready for download" },
      { type: "image", src: "/projects/resume-generator/archived-resumes.png", caption: "Archived resumes — version history and past variations" },

      { type: "heading", value: "Six-Agent Evaluation System" },
      { type: "text", value: "Every generated resume is evaluated by six specialized AI agents, each examining the document from a different professional perspective. An ATS Scanner checks keyword density and format compatibility. A Hiring Manager evaluates role fit and career trajectory. A Senior Engineer peer-reviews technical credibility. A Recruiter assesses first-impression quality. An HR Specialist checks for consistency and red flags. And a Visual Recruiter uses GPT-4o's vision capabilities to perform a 6-second visual scan of the rendered PDF — evaluating layout hierarchy, typography, and visual balance the way a real recruiter would." },
      { type: "image", src: "/projects/resume-generator/ai-evaluation.png", caption: "AI evaluation — six agents scoring the resume from different perspectives" },
      { type: "text", value: "Each agent produces a scored assessment with specific positives, negatives, and actionable suggestions. The resume is only marked 'ready' when all six agents score above 85. Users can then apply AI-powered fixes — either conservative edits that preserve the original structure or aggressive rewrites — and re-evaluate iteratively until every perspective is satisfied." },
      { type: "image", src: "/projects/resume-generator/evaluation-results.png", caption: "Evaluation results — per-agent scores with detailed feedback" },
      { type: "image", src: "/projects/resume-generator/improvement-suggestions.png", caption: "AI-powered improvement suggestions with actionable fixes" },

      { type: "heading", value: "LaTeX PDF Generation" },
      { type: "text", value: "Resumes compile to publication-quality PDFs through a dedicated LaTeX service. The template engine supports eight typeface families, custom section ordering and naming, clickable hyperlinks, and automatic date formatting. Users can also drop into a CodeMirror editor to customize the LaTeX source directly. The compilation service runs in a separate Docker container to isolate the TeX runtime from the main application." },

      { type: "heading", value: "Application Tracking & Analytics" },
      { type: "text", value: "Beyond resume generation, the platform tracks job applications through a pipeline — Draft, Applied, Interviewing, Accepted, Rejected — with metadata for salary ranges, interview rounds, and contact persons. An analytics dashboard visualizes application statistics, pipeline funnels, activity heatmaps, and cumulative API cost tracking across OpenAI and Tavily usage." },
      { type: "image", src: "/projects/resume-generator/application-board.png", caption: "Application board — tracking job applications and their status" },
      { type: "image", src: "/projects/resume-generator/kanban-pipeline.png", caption: "Kanban pipeline — drag-and-drop application stage management" },
      { type: "image", src: "/projects/resume-generator/application-detail.png", caption: "Application detail — salary, interview rounds, contacts, and notes" },

      { type: "heading", value: "Structured AI Outputs" },
      { type: "text", value: "A core technical decision was rejecting the common pattern of asking an LLM for free-form text and parsing the result with regex. Instead, every AI interaction uses the Instructor framework — a library that wraps OpenAI's function calling API with Zod schema validation. Each expected output shape is defined as a Zod schema at compile time, and Instructor guarantees the LLM response conforms to that schema or retries. This means the resume generation endpoint returns a fully typed ResumeData object, not a string that might contain a JSON blob." },
      { type: "text", value: "The evaluation system takes this further with six independent agent calls, each bound to its own output schema — score (0–100), status enum, positives array, negatives array, and suggestions array. The Visual Recruiter agent uses GPT-4o's multimodal capabilities: the resume is first compiled to PDF, rendered as a 150 DPI PNG, and sent as an image input alongside the text prompt, allowing the model to evaluate visual hierarchy and layout in addition to content." },

      { type: "heading", value: "LaTeX Compilation Pipeline" },
      { type: "text", value: "PDF generation runs through a dedicated Node.js/Express microservice that wraps pdflatex. The main application generates LaTeX source from structured resume data using a template engine with placeholder substitution (<<key>> syntax), LaTeX special character escaping, and conditional section rendering based on visibility toggles. The generated .tex file is sent to the compilation service, which writes it to a temporary directory, runs pdflatex, and streams the resulting PDF binary back." },
      { type: "text", value: "The template system supports eight font families via the psnfss package, dynamic section ordering through a configurable structure prompt, custom section titles, automatic date formatting (ISO to human-readable), and nested bullet point generation from delimited strings. Hyperlinks for email, phone, LinkedIn, and GitHub are embedded as clickable \\href elements. The service runs in its own Docker container with a full TeX Live installation, isolating the ~2GB TeX runtime from the lean application image." },

      { type: "heading", value: "Document Parsing & Import" },
      { type: "text", value: "Users can bootstrap their profile by uploading an existing resume in PDF, DOCX, or plain text format. The system extracts raw text using pdf-parse for PDFs and mammoth for Word documents, normalizes whitespace, and then passes the extracted text through GPT-4o with a structured schema to parse it into the application's ResumeData format — automatically populating work experience, education, skills, and projects from an unstructured document." },

      { type: "heading", value: "Architecture & Infrastructure" },
      { type: "text", value: "The full stack runs on Next.js 16 with TypeScript, using Prisma as the ORM against PostgreSQL. The database schema models resumes, resume sections (experience, education, skills, projects, awards, custom sections), variations with JSON snapshots, evaluations with per-agent scores, and API usage tracking for cost analytics. SWR handles client-side data fetching with automatic revalidation." },
      { type: "text", value: "The frontend uses Tailwind CSS for styling, Framer Motion for animations, Radix UI primitives for accessible components, Recharts for analytics visualizations, @dnd-kit for drag-and-drop in the kanban board, and CodeMirror for the LaTeX editor. State management uses React Context providers — one for resume data with auto-save tracking, and one for the application pipeline." },
      { type: "text", value: "The entire platform is containerized with Docker Compose across three services: the Next.js application, PostgreSQL 15 on Alpine, and the LaTeX compilation service. The application image uses multi-stage builds to separate the build environment from the production runtime. Prisma migrations run automatically on container startup." },

      { type: "heading", value: "Proving the System" },
      { type: "text", value: "This isn't a theoretical tool — I'm actively using it to land my own internships. Every application I send goes through the full pipeline: company research, targeted generation, six-agent evaluation, iterative fixes, and LaTeX compilation. The system is its own proof of concept — if the resumes it produces get me interviews, the methodology works. That process is currently underway." },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "OpenAI GPT-4o",
      "LaTeX",
      "Docker",
      "Tailwind CSS",
      "Framer Motion",
    ],
    role: "Full-Stack Developer",
    timeline: "2024 — Present",
    links: [],
    image: "/projects/resume-generator/dashboard.png",
    highlights: [
      "Six specialized AI evaluation agents scoring resumes from ATS, hiring manager, engineer, recruiter, HR, and visual perspectives",
      "GPT-4o with Instructor + Zod for guaranteed structured outputs — no fragile parsing",
      "Company archetype detection adapting resume tone (Enterprise, Big Tech, Startup, Creative)",
      "LaTeX PDF compilation service with 8 typefaces, custom sections, and clickable hyperlinks",
      "Multimodal visual evaluation using GPT-4o vision on rendered PDF screenshots",
      "Application tracking pipeline with analytics dashboard and API cost monitoring",
      "Resume variation management with version snapshots and evaluation history",
      "Tavily web search integration for automated company research",
      "Dockerized three-service architecture (Next.js + PostgreSQL + LaTeX compiler)",
    ],
  },
  {
    slug: "caremate",
    title: "CareMate",
    tagline:
      "An AI-powered clinical decision support system that automates medical coding, symptom analysis, and differential diagnosis — built on DBRX, LlamaIndex, and a RAG pipeline backed by MongoDB.",
    description: [
      "CareMate was built to streamline three of the most time-consuming tasks in clinical practice: looking up medical codes, analyzing patient symptoms, and generating differential diagnoses.",
    ],
    content: [
      { type: "heading", value: "The Problem" },
      { type: "text", value: "Healthcare professionals spend a disproportionate amount of time on administrative and diagnostic overhead. Manually searching for the correct ICD-11, CPT, or HCPCS codes from clinical reports is tedious and error-prone. Symptom triage relies heavily on individual clinician experience, and differential diagnosis — the process of narrowing down possible conditions from a set of symptoms — requires cross-referencing vast medical knowledge under time pressure. CareMate automates all three workflows through a single AI-powered platform." },

      { type: "heading", value: "Medical Code Suggestion" },
      { type: "text", value: "The first module eliminates manual code lookup entirely. Clinicians input a clinical report or diagnosis description, and the system analyzes the text to suggest the most relevant standardized codes across three coding systems: ICD-11 (International Classification of Diseases) for diagnosis classification, CPT (Current Procedural Terminology) for procedure billing, and HCPCS (Healthcare Common Procedure Coding System) for services and equipment. The system returns precise code suggestions in seconds, reducing coding errors and accelerating the billing workflow." },

      { type: "heading", value: "Symptom Analysis" },
      { type: "text", value: "The symptom analysis module empowers both patients and clinicians to make informed decisions. Users describe their symptoms in natural language, and CareMate leverages its medical knowledge base to suggest potential conditions, recommend next steps, and flag urgency indicators. The system is designed as a decision-support tool — augmenting clinical judgment rather than replacing it — helping clinicians prioritize investigations and patients understand when to seek immediate care." },

      { type: "heading", value: "Differential Diagnosis" },
      { type: "text", value: "The differential diagnosis engine is the most technically complex module. It accepts structured patient input — age, medical history, symptom details with timeline, and additional context like family history and lifestyle factors. The system compares this data against a comprehensive medical database, producing a prioritized list of candidate conditions ranked by likelihood. Each suggestion is cross-referenced for accuracy, enabling clinicians to systematically rule out conditions and converge on the correct diagnosis faster." },
      { type: "image", src: "/projects/caremate/differential-diagnosis.png", caption: "Differential diagnosis — structured patient input with medical history, symptoms, and timeline" },

      { type: "heading", value: "RAG Pipeline Architecture" },
      { type: "text", value: "CareMate runs two specialized RAG (Retrieval-Augmented Generation) pipelines, each optimized for its domain. The symptom evaluation pipeline ingests medical disease and diagnosis documents through semantic chunking, embeds them using OpenAI's text-embedding-3-small model, and stores the vectors in a MongoDB-backed vector database. At query time, the patient's input is transformed using HyDE (Hypothetical Document Embedding) — the system first generates a hypothetical ideal document that would answer the query, then embeds that document to retrieve more semantically relevant evidence than a raw query embedding would produce." },
      { type: "text", value: "The medical codes pipeline follows a similar architecture but uses sentence-level splitting instead of semantic chunking, optimized for the structured, codified nature of ICD-11, CPT, and HCPCS documentation. Both pipelines pass retrieved evidence through a DBRX Reranker with Long Context Reorder — re-scoring and reordering retrieved chunks by relevance before concatenating them with the original query for final generation by DBRX via Together.ai." },
      { type: "image", src: "/projects/caremate/rag-architecture.png", caption: "RAG architecture — evidence-based symptom evaluation pipeline with HyDE, vector retrieval, and DBRX reranking" },

      { type: "heading", value: "Pipeline Optimization with TruLens" },
      { type: "text", value: "Rather than guessing which RAG configuration works best, we systematically optimized the pipeline using TruLens — an evaluation framework that scores every response across three metrics: Answer Relevance (does the output address the query?), Context Relevance (are the retrieved documents actually useful?), and Groundedness (is the response factually supported by the retrieved context?). These metrics enabled data-driven hyperparameter tuning across the entire retrieval stack." },
      { type: "text", value: "The optimization sweep tested multiple configurations across three pipeline components. For query transformation: HyDE, Step Decompose, Retry Query, FLARE Instruct, and no transformation. For reranking: Colbert Rerank, RankGPT Rerank, Cohere Rerank, ms-marco-MiniLM, and mMiniLM. For prompt compression: LongLLMLingua versus no compression. Each combination was evaluated against the TruLens metrics to identify the optimal pipeline configuration for clinical accuracy." },
      { type: "image", src: "/projects/caremate/trulens-optimization.png", caption: "TruLens hyperparameter tuning — sweep across query transforms, rerankers, and prompt compression" },

      { type: "heading", value: "Frontend & Deployment" },
      { type: "text", value: "The frontend is built with Streamlit, providing a lightweight web interface that clinicians can access from any device — whether in a hospital ward or a remote clinic. The application is designed for immediate usability with no installation required, prioritizing speed and accessibility over visual complexity." },
      { type: "text", value: "The optimized RAG pipeline achieved high groundedness scores across TruLens evaluations, confirming that responses were consistently anchored in retrieved medical literature rather than hallucinated. The project also served as the foundation for the team's 2nd Runner Up finish at the MEDCHIC Health Data Hackathon 2024, where the same retrieval and classification techniques were applied to kidney disease diagnosis from the MIMIC-IV clinical dataset." },
    ],
    stack: ["Python", "DBRX", "LlamaIndex", "MongoDB", "Together.ai", "OpenAI Embeddings", "TruLens", "Streamlit"],
    role: "Backend / ML Engineer",
    timeline: "2024",
    links: [],
    highlights: [
      "Automated medical code suggestion across ICD-11, CPT, and HCPCS coding systems",
      "Differential diagnosis engine with prioritized candidate conditions from structured patient input",
      "Two specialized RAG pipelines — semantic chunking for symptoms, sentence splitting for medical codes",
      "HyDE (Hypothetical Document Embedding) for improved query-to-document semantic matching",
      "DBRX Reranker with Long Context Reorder for post-retrieval relevance optimization",
      "TruLens pipeline evaluation — Answer Relevance, Context Relevance, and Groundedness scoring",
      "Hyperparameter sweep across query transforms (HyDE, FLARE Instruct), rerankers (Colbert, RankGPT, Cohere), and prompt compression (LongLLMLingua)",
      "text-embedding-3-small for vector embeddings stored in MongoDB",
      "DBRX via Together.ai for low-latency clinical inference",
    ],
    image: "/projects/caremate/cover.png",
  },
];
