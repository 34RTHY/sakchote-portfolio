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
  layout.tsx            # Root layout, fonts, metadata
  page.tsx              # Homepage
  not-found.tsx         # Custom 404
  sitemap.ts            # Auto-generated sitemap
  robots.ts             # Robots.txt
  opengraph-image.tsx   # Dynamic OG image
  projects/[slug]/      # Project detail pages
components/
  Header.tsx            # Fixed nav with scroll detection
  HeroSection.tsx       # Hero with interactive grid canvas
  AboutSection.tsx      # Bio, skills, awards
  ProjectsSection.tsx   # Project cards grid
  ExperienceSection.tsx # Timeline layout
  ContactSection.tsx    # Social links + email CTA
  Footer.tsx
data/
  config.ts             # Site metadata (single source of truth)
  projects.ts           # Project entries
  skills.ts             # Skill categories
  experience.ts         # Work experience
  awards.ts             # Awards/achievements
  social.ts             # Social links
hooks/
  useActiveSection.ts   # Intersection Observer for nav highlighting
  useInView.ts          # Scroll-triggered animations
```

## Deployment

Built as a standalone Next.js app with Docker:

```bash
docker build -t sakchote-portfolio .
docker run -p 3000:3000 sakchote-portfolio
```

Deployed on a K3s cluster via Kubernetes manifest (`k8s/phase6-apps/portfolio.yaml`), with ingress through Cloudflare Tunnel + Traefik.

## License

MIT
