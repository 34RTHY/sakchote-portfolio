#!/bin/bash
# Warms Cloudflare CDN cache by requesting all pages and images
# at each responsive breakpoint (640, 1080, 1920).
#
# Usage:
#   ./scripts/warm-cdn.sh              # default: https://sakchote.com
#   ./scripts/warm-cdn.sh https://staging.sakchote.com

DOMAIN="${1:-https://sakchote.com}"
WIDTHS=(640 1080 1920)
QUALITY=75
TOTAL=0
HITS=0
ERRORS=0

green='\033[0;32m'
red='\033[0;31m'
dim='\033[2m'
reset='\033[0m'

# ── Pages ──────────────────────────────────────────────────────────
PAGES=(
  "/"
  "/projects"
  "/uses"
  # Projects
  "/projects/ezzay-platform"
  "/projects/homelab-kubernetes"
  "/projects/choudai"
  "/projects/resume-generator"
  "/projects/caremate"
  "/projects/portfolio"
  # Awards
  "/awards/ieee-tale-macau-2025"
  "/awards/ai-thailand-hackathon-2024"
  "/awards/cyber-top-talent-2025"
  "/awards/ncsa-ctf-bootcamp-2024"
  "/awards/medchic-hackathon-2024"
  "/awards/spu-ai-prompt-hackathon-2024"
  "/awards/grabspark-2024"
  "/awards/yumepro-2025"
  # Experience
  "/experience/ezzay-platform"
  # Education
  "/education/chulalongkorn-ee"
)

# ── Images (every image in public/) ───────────────────────────────
IMAGES=(
  # Awards
  "/awards/ai-thailand-hackathon-2024/award-ceremony.jpg"
  "/awards/ai-thailand-hackathon-2024/award-photo.jpg"
  "/awards/ai-thailand-hackathon-2024/examee-product.jpg"
  "/awards/cyber-top-talent-2025/cover.jpg"
  "/awards/grabspark-2024/presentation.jpg"
  "/awards/grabspark-2024/team-photo.jpg"
  "/awards/ieee-tale-macau-2025/cover.jpg"
  "/awards/ieee-tale-macau-2025/presentation-closeup.jpg"
  "/awards/ieee-tale-macau-2025/presentation-podium.jpg"
  "/awards/ieee-tale-macau-2025/presentation-slides.jpg"
  "/awards/ieee-tale-macau-2025/presentation-wide.jpg"
  "/awards/ieee-tale-macau-2025/travel-grant-ceremony.jpg"
  "/awards/ieee-tale-macau-2025/travel-grant-certificate.jpg"
  "/awards/medchic-hackathon-2024/award-ceremony.jpg"
  "/awards/medchic-hackathon-2024/trophy.jpg"
  "/awards/medchic-hackathon-2024/team-photo.webp"
  "/awards/ncsa-ctf-bootcamp-2024/award-ceremony.jpg"
  "/awards/ncsa-ctf-bootcamp-2024/medal-ceremony.jpg"
  "/awards/spu-ai-prompt-hackathon-2024/award-ceremony.jpg"
  "/awards/spu-ai-prompt-hackathon-2024/trophy.jpg"
  "/awards/yumepro-2025/cover.jpg"
  "/awards/yumepro-2025/team-photo.webp"
  # Projects
  "/projects/caremate/cover.jpg"
  "/projects/caremate/differential-diagnosis.jpg"
  "/projects/caremate/rag-architecture.jpg"
  "/projects/caremate/trulens-optimization.jpg"
  "/projects/choudai/cover.jpg"
  "/projects/ezzay-platform/admincourt-roadshow.png"
  "/projects/ezzay-platform/cover.jpg"
  "/projects/ezzay-platform/feedback.jpg"
  "/projects/ezzay-platform/inside_project.jpg"
  "/projects/ezzay-platform/project_exam_details.jpg"
  "/projects/ezzay-platform/projects.jpg"
  "/projects/ezzay-platform/score_dist.jpg"
  "/projects/ezzay-platform/settings.jpg"
  "/projects/ezzay-platform/student_info.jpg"
  "/projects/ezzay-platform/task.jpg"
  "/projects/ezzay-platform/text.jpg"
  "/projects/ezzay-platform/users.jpg"
  "/projects/homelab-kubernetes/architecture.png"
  "/projects/homelab-kubernetes/cover.jpg"
  "/projects/resume-generator/ai-evaluation.jpg"
  "/projects/resume-generator/application-board.jpg"
  "/projects/resume-generator/application-detail.jpg"
  "/projects/resume-generator/archived-resumes.jpg"
  "/projects/resume-generator/create-profile.jpg"
  "/projects/resume-generator/dashboard.jpg"
  "/projects/resume-generator/evaluation-results.jpg"
  "/projects/resume-generator/generated-variations.jpg"
  "/projects/resume-generator/global-profile.jpg"
  "/projects/resume-generator/improvement-suggestions.jpg"
  "/projects/resume-generator/kanban-pipeline.jpg"
  "/projects/resume-generator/pdf-preview.jpg"
  "/projects/resume-generator/profile-detail.jpg"
  "/projects/resume-generator/resume-detail.jpg"
  "/projects/portfolio/cdn1.jpg"
  "/projects/portfolio/cdn2.jpg"
  "/projects/portfolio/cover.jpg"
)

warm_url() {
  local url="$1"
  local label="$2"
  TOTAL=$((TOTAL + 1))

  status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "$url")

  if [[ "$status" == "200" ]]; then
    HITS=$((HITS + 1))
    printf "  ${green}%s${reset} %s\n" "$status" "$label"
  else
    ERRORS=$((ERRORS + 1))
    printf "  ${red}%s${reset} %s\n" "$status" "$label"
  fi
}

echo ""
echo "=== CDN Cache Warmup ==="
echo "Domain: $DOMAIN"
echo ""

# ── Warm pages ─────────────────────────────────────────────────────
echo "── Pages (${#PAGES[@]} requests) ──"
for page in "${PAGES[@]}"; do
  warm_url "${DOMAIN}${page}" "$page"
done

# ── Warm images at each breakpoint ─────────────────────────────────
# Next.js serves optimized images via /_next/image?url=<encoded>&w=<width>&q=<quality>
echo ""
echo "── Images (${#IMAGES[@]} images x ${#WIDTHS[@]} widths = $(( ${#IMAGES[@]} * ${#WIDTHS[@]} )) requests) ──"
for img in "${IMAGES[@]}"; do
  for w in "${WIDTHS[@]}"; do
    encoded=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$img'))")
    url="${DOMAIN}/_next/image?url=${encoded}&w=${w}&q=${QUALITY}"
    warm_url "$url" "${dim}${w}px${reset} $img"
  done
done

# ── Summary ────────────────────────────────────────────────────────
echo ""
echo "=== Summary ==="
printf "Total:  %d\n" "$TOTAL"
printf "${green}OK:     %d${reset}\n" "$HITS"
if [[ $ERRORS -gt 0 ]]; then
  printf "${red}Errors: %d${reset}\n" "$ERRORS"
fi
echo ""
