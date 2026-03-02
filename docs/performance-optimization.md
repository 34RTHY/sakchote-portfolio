# Portfolio Performance Optimization & View Transitions

## Overview

A systematic performance overhaul that addressed every layer of the rendering and delivery pipeline — from eliminating unnecessary React re-renders to implementing CDN edge caching. Also added smooth page transitions using the View Transitions API.

| Metric | Before | After |
|---|---|---|
| Source image payload | 47 MB (raw PNGs up to 4000px) | 25 MB (JPG q95, max 1600px) |
| First-load image time (uncached) | 8–10 seconds | ~670ms per image |
| Repeat visitor image time | ~670ms | 5–15ms (Cloudflare edge cache) |
| Mouse move re-renders | 60fps React reconciliation | Zero re-renders (ref-based DOM writes) |
| Page transitions | Instant cut (no animation) | Smooth morph via View Transitions API |
| Font payload | ~200KB (all weights) | ~80KB (4 weights) |
| Next.js image variants per image | 8 widths (640–3840px) | 4 widths (256, 640, 1080, 1920) |

---

## Part 1: React Performance Fixes

### 1A. Re-enable Next.js Image Optimization

The single biggest Lighthouse fix. The app had `images: { unoptimized: true }` which served raw source images to every visitor — multi-megabyte PNGs at 4000px wide.

```ts
// next.config.ts — REMOVED
images: {
  unoptimized: true,
}
```

With this removed, Next.js automatically:
- Converts images to WebP (30-50% smaller than JPEG)
- Resizes to the requested width on-demand via `sharp`
- Caches resized variants in `.next/cache/images/`
- Serves with proper `Cache-Control` headers

### 1B. Ref-based Cursor Glow

**The problem:** `useState` + `onMouseMove` triggers React reconciliation on every mouse move event (~60 times per second). Each state update causes a virtual DOM diff and potential re-render of the component tree.

**The fix:** Use `useRef` to write directly to `element.style`, bypassing React entirely.

```tsx
// BEFORE — triggers re-render every mouse move
const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({ opacity: 0 });
const handleMouseMove = (e: React.MouseEvent) => {
  setGlowStyle({
    opacity: 1,
    background: `radial-gradient(400px circle at ${x}px ${y}px, ...)`,
  });
};

// AFTER — zero re-renders, direct DOM mutation
const glowRef = useRef<HTMLDivElement>(null);
const handleMouseMove = useCallback((e: React.MouseEvent) => {
  const glow = glowRef.current;
  if (!glow) return;
  glow.style.opacity = "1";
  glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, ...)`;
}, []);
```

Applied to three components:
- `CardGlow.tsx` — hover glow on project cards
- `HeroSection.tsx` — full-section cursor-tracking glow + parallax scroll
- `ContactSection.tsx` — form card border glow

**Why this matters:** React's reconciliation is designed for UI state changes, not 60fps visual effects. Writing directly to the DOM for purely visual, non-state-dependent animations is a well-known React performance pattern. The cursor position doesn't affect the component tree — it only moves a CSS gradient.

### 1C. Ref-based Parallax

Same pattern applied to scroll-driven parallax:

```tsx
// BEFORE — re-renders entire component on every scroll tick
const [parallaxY, setParallaxY] = useState(0);
useEffect(() => {
  const onScroll = () => setParallaxY(window.scrollY * 0.3);
}, []);

// AFTER — direct transform update, zero re-renders
const meshRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  const onScroll = () => {
    const y = window.scrollY * 0.3;
    if (meshRef.current) meshRef.current.style.transform = `translateY(${y}px)`;
  };
}, []);
```

### 1D–1F. Smaller Fixes

- **Deleted `hooks/useInView.ts`** — unused IntersectionObserver hook (dead code)
- **Restricted DM Sans font weights** to `["400", "500", "600", "700"]` — reduced font payload from ~200KB to ~80KB
- **Converted Header `<a>` to `<Link>`** — enables client-side navigation (required for View Transitions to work)

---

## Part 2: View Transitions

### How It Works

Next.js 15 with `experimental: { viewTransition: true }` wraps client-side navigations in `document.startViewTransition()`. By assigning matching `view-transition-name` values to elements on both pages, the browser morphs them smoothly during navigation — interpolating position, size, and opacity automatically.

### Implementation

#### Shared transition names on project cards:
```tsx
// ProjectCard.tsx
<div style={{ viewTransitionName: `project-img-${project.slug}` }}>  {/* image */}
<h3 style={{ viewTransitionName: `project-title-${project.slug}` }}> {/* title */}
```

#### Matching names on project detail page:
```tsx
// app/projects/[slug]/page.tsx
<div style={{ viewTransitionName: `project-img-${slug}` }}>  {/* hero image */}
<h1 style={{ viewTransitionName: `project-title-${slug}` }}>  {/* page title */}
```

When the slug matches, the browser morphs the card image into the hero image and the card title into the page title — smooth position and size interpolation with no JavaScript animation code.

#### CSS rules for non-shared elements:
```css
::view-transition-old(root) {
  animation: 0.2s ease-out both fade-out;
}
::view-transition-new(root) {
  animation: 0.3s ease-in 0.1s both fade-in;
}
```

#### Excluding the grain overlay:
```tsx
<div className="grain-overlay" style={{ filter: "url(#grain)", viewTransitionName: "none" }} />
```

The film grain SVG overlay covers the entire viewport at `z-index: 9999`. Without `viewTransitionName: "none"`, it participates in the transition and causes visual artifacts.

**Browser support:** Chrome/Edge 111+, Safari 18.2+ get full morphing. Firefox gracefully falls back to instant navigation (no error, no animation).

---

## Part 3: Source Image Optimization

### The Discovery

| Metric | Value |
|---|---|
| Total source images | 47 MB |
| Largest image | `presentation-slides.jpg` at 4000x2667, 3.8 MB |
| Images with transparency (need PNG) | 2 out of 53 |
| Opaque PNGs that could be JPG | 33 files |

### First Attempt: Quality 82 (Too Aggressive)

```bash
find . -type f -name "*.jpg" -exec mogrify -resize '1600x1600>' -quality 82 -strip {} \;
```

Result: 47 MB → 17 MB. But images were **visibly blurry** on the live site.

**Root cause:** Double compression. Source at q82 → Next.js sharp re-compresses to WebP at q75. Two lossy compression passes compound quality loss significantly.

### Final Approach: Quality 95

```bash
# Restore originals from git history
git checkout cc61883 -- public/projects/ public/awards/

# Resize and compress at q95
find . -type f -name "*.jpg" -exec mogrify -resize '1600x1600>' -quality 95 -strip {} \;

# Convert opaque PNGs to JPG at q95 (checked transparency first)
find . -name "*.png" -exec sh -c 'magick "$1" -quality 95 -strip "${1%.png}.jpg" && rm "$1"' _ {} \;
```

Result: 47 MB → 25 MB. Sharp on Retina displays even after Next.js re-compression.

**Key insight:** When an image passes through multiple compression stages, the source must be higher quality than you'd normally use. q82 is fine for final output but not for an intermediate format that will be re-compressed.

### Transparency Check

Before batch-converting PNGs, verified which ones actually need alpha:

```bash
find . -name "*.png" -exec sh -c '
  if identify -format "%[channels]" "$1" | grep -q "a"; then echo "ALPHA: $1"
  else echo "OPAQUE: $1"; fi
' _ {} \;
```

Only 2 of 35 PNGs had transparency (`architecture.png`, `admincourt-roadshow.png`). The other 33 were screenshots saved as PNG unnecessarily.

---

## Part 4: CDN Edge Caching

### The Problem

The image delivery path traverses: Browser → Cloudflare → Cloudflare Tunnel → VPS → Tailscale → Proxmox → pod → sharp → back the whole way. Irreducible ~670ms round-trip latency. With 20 images loading simultaneously and sharp processing them single-threaded, the queue caused 8-10 second first loads.

### The Solution

Configure Cloudflare to cache `/_next/image` responses at its 300+ global edge servers.

```
First request:  Browser → Cloudflare (MISS) → Origin (670ms) → Cloudflare stores copy
Second request: Browser → Cloudflare (HIT, 5-15ms) → done
```

#### Step 1: Origin cache headers
```ts
// next.config.ts
images: {
  minimumCacheTTL: 2592000, // 30 days
}
```

#### Step 2: Cloudflare Cache Rule

| Setting | Value |
|---|---|
| When | URI Path starts with `/_next/image` |
| Cache eligibility | Eligible for cache |
| Edge TTL | Respect origin Cache-Control header |

Without this rule, Cloudflare treats `/_next/image?url=...&w=...&q=...` as a dynamic API endpoint (`cf-cache-status: DYNAMIC`) and never caches it.

#### Step 3: Reduce image breakpoints
```ts
images: {
  deviceSizes: [640, 1080, 1920],  // was [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  imageSizes: [256],                // was [16, 32, 48, 64, 96, 128, 256, 384]
}
```

Each width variant is a separate Cloudflare cache entry. Phone (`w=640`) and desktop (`w=828`) were getting separate cache misses. By reducing breakpoints, devices converge on shared cache entries.

---

## Part 5: UX Bug Fixes

### Navbar Highlight Sticking on Detail Pages

**Problem:** Navigate to `/experience/ezzay-platform`, click a nav link — "Experience" highlight stays active even on the new page.

**Cause:** `useActiveSection` used `IntersectionObserver` on homepage section IDs. On detail pages, those sections don't exist in the DOM, so the observer never fires and the stale state persists.

**Fix:** Route-aware observer that resets on non-homepage routes:
```tsx
const pathname = usePathname();
useEffect(() => {
  if (pathname !== "/") { setActive(""); return; }
  // ... observer setup
}, [pathname]);
```

### Navbar Always Highlighting "Projects"

**Problem:** Scrolling through the homepage, "Projects" stays highlighted regardless of visible section.

**Cause:** Observer fired for every intersecting section, but only the last one won. Projects is the tallest section, so it often fired last.

**Fix:** Track all visible sections in a Set, pick the topmost in DOM order:
```tsx
const visibleSections = new Set<string>();
if (entry.isIntersecting) visibleSections.add(entry.target.id);
else visibleSections.delete(entry.target.id);
const topmost = SECTIONS.find((id) => visibleSections.has(id));
```

### Awards Back Link

Changed from `/#about` to `/#awards` with a dedicated `id="awards"` anchor on the awards container (with `scroll-mt-24` for fixed header offset).

---

## Problems Encountered & Lessons

### 1. Double Compression Causes Blurriness

**Lesson:** When images pass through multiple lossy stages (source → sharp → WebP), keep intermediates at q95+. Only compress aggressively at the final output.

### 2. Missing `sizes` Prop Causes 3840px Requests

Without `sizes`, Next.js assumes images display at 100% viewport width and generates variants up to 3840px — wasting bandwidth and sharp CPU time.

**However**, setting `sizes` too aggressively caused blurriness on Retina displays. We ultimately reverted `sizes` and solved the performance issue at the CDN layer instead. The takeaway: `sizes` is about bandwidth, CDN caching is about latency. Choose the right tool for the problem.

### 3. Different Devices = Different Cache Entries

Each `w=` query parameter is a unique cache key. Reducing `deviceSizes` from 8 to 3 breakpoints means devices converge on shared cache entries faster, warming the CDN cache with fewer total requests.

## Files Modified

| File | Changes |
|---|---|
| `next.config.ts` | Removed `unoptimized`, added `minimumCacheTTL`, `deviceSizes`, `imageSizes` |
| `app/layout.tsx` | Restricted DM Sans weights, excluded grain from view transitions |
| `app/globals.css` | Added `::view-transition` CSS rules |
| `components/HeroSection.tsx` | Ref-based cursor glow + parallax |
| `components/ContactSection.tsx` | Ref-based cursor glow |
| `components/CardGlow.tsx` | Ref-based cursor glow |
| `components/Header.tsx` | Converted `<a>` → `<Link>`, removed "Uses" from nav |
| `components/ProjectCard.tsx` | Added `viewTransitionName` to image + title |
| `app/projects/[slug]/page.tsx` | Matching `viewTransitionName` on hero + h1 |
| `hooks/useActiveSection.ts` | Route-aware observer, topmost-section detection |
| `hooks/useInView.ts` | Deleted (dead code) |
| `components/AboutSection.tsx` | Added `id="awards"` anchor |
| `app/awards/[slug]/page.tsx` | Back link → `/#awards` |
| `data/projects.ts` | `.png` → `.jpg` references |
| `data/awards.ts` | `.png` → `.jpg` references |
| `public/projects/**` | Source images re-compressed q95 JPG, max 1600px |
| `public/awards/**` | Source images re-compressed q95 JPG, max 1600px |
