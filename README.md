# sakchote-portfolio

Personal portfolio site for [sakchote.com](https://sakchote.com).

## Tech Stack

- **Next.js 15** (App Router, standalone output)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/
  layout.tsx              # Root layout, fonts, metadata
  page.tsx                # Homepage
  not-found.tsx           # Custom 404
  sitemap.ts              # Auto-generated sitemap
  robots.ts               # Robots.txt
  opengraph-image.tsx     # Dynamic OG image
  projects/[slug]/        # Project detail pages
  awards/[slug]/          # Award detail pages
  experience/[slug]/      # Experience detail pages
  education/[slug]/       # Education detail pages
components/
  Header.tsx              # Fixed nav with scroll detection
  HeroSection.tsx         # Hero with interactive grid canvas
  AboutSection.tsx        # Bio, skills, awards
  ProjectsSection.tsx     # Project cards grid
  ExperienceSection.tsx   # Timeline layout
  ContactSection.tsx      # Social links + email CTA
  DetailNav.tsx           # Generic prev/next navigation
  ContentRenderer.tsx     # Renders blog-style content blocks
  RelatedLinks.tsx        # Cross-section links
  Footer.tsx
data/
  config.ts               # Site metadata (single source of truth)
  content.ts              # ContentBlock type definition
  projects.ts             # Project entries
  skills.ts               # Skill categories
  experience.ts           # Work experience
  education.ts            # Education entries
  awards.ts               # Awards/achievements
  social.ts               # Social links
hooks/
  useActiveSection.ts     # Intersection Observer for nav highlighting
  useInView.ts            # Scroll-triggered animations
```

## Content Guide

All content is managed through TypeScript files in `data/`. Each section (awards, experience, education) uses the same **content block** system for detail pages.

### Images

Place images in the `public/` directory. Reference them with paths relative to `public/`:

```
public/
  images/
    awards/
      hackathon-team.jpg
      hackathon-demo.gif
    experience/
      ezzay-hero.jpg
      ezzay-architecture.png
    education/
      chula-campus.jpg
```

These are referenced as `/images/awards/hackathon-team.jpg` in data files.

Supported formats: `.jpg`, `.png`, `.gif`, `.webp`, `.avif`, `.svg`.

### Content Blocks

Detail pages use a `content: ContentBlock[]` array that supports four block types, which can be mixed in any order:

#### Text Block

A paragraph of text.

```ts
{ type: "text", value: "Your paragraph content here." }
```

#### Image Block

A single image, full-width with an optional caption. Use for diagrams, screenshots, or key photos that need context.

```ts
{ type: "image", src: "/images/experience/architecture.png", caption: "System architecture overview" }
```

#### Gallery Block

A grid of images (2-3 columns) with an optional title. Use for grouping related photos — team pictures, event photos, certificates, etc.

```ts
{
  type: "gallery",
  title: "Team & Event Photos",
  images: [
    { src: "/images/awards/team.jpg", caption: "The team" },
    { src: "/images/awards/ceremony.jpg", caption: "Award ceremony" },
    { src: "/images/awards/certificate.jpg" },
  ],
}
```

#### Attachments Block

A list of linked resources — slides, papers, repos, videos, etc. Each item opens in a new tab with a color-coded icon.

```ts
{
  type: "attachments",
  title: "Resources",
  items: [
    { label: "Presentation Slides", href: "https://docs.google.com/presentation/d/...", kind: "slides" },
    { label: "Published Paper (IEEE)", href: "https://ieeexplore.ieee.org/...", kind: "paper" },
    { label: "Source Code", href: "https://github.com/...", kind: "github" },
    { label: "Demo Video", href: "https://youtube.com/...", kind: "video" },
    { label: "Live Site", href: "https://example.com", kind: "website" },
    { label: "Technical Report (PDF)", href: "/files/report.pdf", kind: "pdf" },
    { label: "Dataset", href: "/files/data.zip", kind: "file" },
  ],
}
```

Available `kind` values: `slides`, `paper`, `github`, `video`, `website`, `pdf`, `file`.

For local files (PDFs, etc.), place them in `public/files/` and reference as `/files/report.pdf`.

### Hero Image

Each entry has an optional `image` field for the hero banner at the top of the detail page (separate from content blocks):

```ts
image: "/images/experience/ezzay-hero.jpg",
```

If omitted, a placeholder icon is shown.

### Full Example — Experience Entry

```ts
{
  slug: "ezzay-platform",
  role: "Backend Developer (Lead)",
  company: "Ezzay Platform",
  period: "Aug 2024 — Present",
  image: "/images/experience/ezzay-hero.jpg",
  content: [
    { type: "text", value: "Architected and deployed the backend infrastructure for an AI-powered exam grading platform..." },
    { type: "image", src: "/images/experience/ezzay-architecture.png", caption: "System architecture" },
    { type: "text", value: "Engineered a high-performance REST API using FastAPI..." },
    { type: "image", src: "/images/experience/ezzay-grading.gif", caption: "Grading pipeline in action" },
    { type: "text", value: "Presented research findings at IEEE TALE 2025 in China." },
    {
      type: "attachments",
      title: "Resources",
      items: [
        { label: "IEEE TALE 2025 Paper", href: "https://ieeexplore.ieee.org/...", kind: "paper" },
        { label: "Presentation Slides", href: "https://docs.google.com/...", kind: "slides" },
        { label: "Source Code", href: "https://github.com/...", kind: "github" },
      ],
    },
    {
      type: "gallery",
      title: "Conference & Team",
      images: [
        { src: "/images/experience/ieee-presentation.jpg", caption: "Presenting at IEEE" },
        { src: "/images/experience/team-photo.jpg", caption: "The team" },
        { src: "/images/experience/award.jpg", caption: "Best paper award" },
      ],
    },
  ],
  highlights: [
    "Reduced manual evaluation time by 50%",
    "Presented at IEEE TALE 2025",
  ],
  technologies: ["FastAPI", "Python", "PostgreSQL", "Docker"],
  relatedProjects: [],
  relatedAwards: ["ai-thailand-hackathon-2024"],
}
```

### Full Example — Award Entry

```ts
{
  slug: "ai-thailand-hackathon-2024",
  title: "1st Runner Up — AI Thailand Hackathon 2024 EP2",
  event: "NECTEC",
  date: "Nov 2024",
  detail: "AI for Thai API on Shelf",
  image: "/images/awards/hackathon-hero.jpg",
  content: [
    { type: "text", value: "Built an AI-powered solution using the AI for Thai API..." },
    { type: "image", src: "/images/awards/hackathon-demo.gif", caption: "Live demo" },
    { type: "text", value: "Our team developed a novel approach to..." },
    {
      type: "gallery",
      title: "Event Photos",
      images: [
        { src: "/images/awards/hackathon-team.jpg", caption: "Team photo" },
        { src: "/images/awards/hackathon-stage.jpg", caption: "On stage" },
      ],
    },
  ],
  relatedExperience: ["ezzay-platform"],
}
```

### Full Example — Education Entry

```ts
{
  slug: "chulalongkorn-ee",
  degree: "B.Eng. Electrical Engineering",
  school: "Chulalongkorn University",
  period: "2024 — Present",
  image: "/images/education/chula-campus.jpg",
  content: [
    { type: "text", value: "Second-year undergraduate focused on systems engineering..." },
    { type: "image", src: "/images/education/lab-project.jpg", caption: "Embedded systems lab" },
    { type: "text", value: "Building infrastructure and full-stack projects alongside coursework." },
  ],
  highlights: [
    "Dean's List 2024",
    "Embedded Systems Lab project lead",
  ],
  relatedProjects: ["homelab-kubernetes"],
}
```

### Cross-Section Links

Entries can reference each other by slug. This renders a "Related" section on the detail page with clickable links:

| Field | Available On | Links To |
|---|---|---|
| `relatedProjects` | awards, experience, education | `/projects/{slug}` |
| `relatedAwards` | experience, projects | `/awards/{slug}` |
| `relatedExperience` | awards, projects | `/experience/{slug}` |

Example: The Ezzay Platform experience page links to the AI Thailand Hackathon award, and vice versa.

## Deployment

### Docker

The app uses a multi-stage Dockerfile with standalone output for minimal image size.

**Build and run locally:**

```bash
docker build -t sakchote-portfolio .
docker run -p 3000:3000 sakchote-portfolio
```

Open [http://localhost:3000](http://localhost:3000).

**Dockerfile stages:**

1. **deps** — installs `node_modules` via `npm ci`
2. **builder** — copies source and runs `npm run build`
3. **runner** — copies only the standalone output + static files, runs as non-root `nextjs` user

The final image contains only `server.js`, `.next/static`, and `public/` — no `node_modules` or source code.

### CI/CD — GitHub Actions

On every push to `main`, the workflow at `.github/workflows/build-push.yml` automatically:

1. Builds the Docker image
2. Pushes to GitHub Container Registry (`ghcr.io/34rthy/sakchote-portfolio`)
3. Tags with both `latest` and the commit SHA

**Required secret:** `GHCR_PAT` — a GitHub Personal Access Token with `write:packages` scope, configured in the repo's Settings > Secrets.

### Kubernetes

The app is deployed on a K3s cluster using the manifest at `k8s/portfolio.yaml`.

**Resources created:**

| Resource | Name | Namespace |
|---|---|---|
| Deployment | `portfolio` | `apps` |
| Service | `portfolio` | `apps` |
| IngressRoute (Traefik) | `portfolio` | `apps` |

**Deploy or update:**

```bash
kubectl apply -f k8s/portfolio.yaml
```

**Key configuration:**

- Image: `ghcr.io/34rthy/sakchote-portfolio:latest` with `imagePullPolicy: Always`
- Node selector: `location: home` (runs on the home node, not cloud)
- Resource limits: 200m CPU / 256Mi memory
- Health checks: liveness and readiness probes on `/` port 3000
- Ingress: Traefik IngressRoute matching `Host(\`sakchote.com\`)` on the `web` entrypoint

**Force a rolling restart** (to pull the latest image after a new push):

```bash
kubectl rollout restart deployment/portfolio -n apps
```

**Check status:**

```bash
kubectl get pods -n apps -l app=portfolio
kubectl logs -n apps -l app=portfolio --tail=50
```

### Infrastructure Overview

```
GitHub Push → GitHub Actions → Build Image → Push to GHCR
                                                  ↓
                                        K3s pulls latest image
                                                  ↓
                          Cloudflare Tunnel → Traefik → portfolio:3000
                                                  ↓
                                          sakchote.com
```

## License

MIT
