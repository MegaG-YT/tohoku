#!/usr/bin/env bash
# Compresses public/images/ from _originals/ backup.
# Tiers:
#   A  max 2560px long edge, WebP q82      — heroes, backgrounds, landscape parallax
#   B  max 1920px long edge, WebP q82      — section content / photography
#   C  max 1200px long edge, WebP q85      — location cards
#   D  max 2000px long edge, WebP q85 -m 6 — flat / UI (maps, outlines)
#
# Usage:
#   scripts/compress-images.sh          — run conversion
#   scripts/compress-images.sh --dry    — preview tier assignment only

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/_image-originals-backup"
DST="$ROOT/public/images"
DRY=0
[[ "${1:-}" == "--dry" || "${1:-}" == "--dry-run" ]] && DRY=1

if [[ ! -d "$SRC" ]]; then
  echo "ERR: backup dir not found: $SRC" >&2
  exit 1
fi

# tier_for <basename-without-ext>
tier_for() {
  local name="$1"
  case "$name" in
    hero-*|landscape-layer-*|location-bg-texture|asset-value-map|lot-bg-*|landscape-greenery)
      echo A ;;
    access-*|smart-*|landscape-machinami|lot-bg-edited|hero-cityscape)
      echo B ;;
    outline-section-bg|location-map|lot-plan-*|lot-map-bg|landscape-lighting|landscape-privacy|landscape-building-layout|landscape-planting-caption)
      echo D ;;
    location-*)
      echo C ;;
    *)
      echo A ;;
  esac
}

tier_params() {
  case "$1" in
    A) echo "2560 82 4" ;;
    B) echo "1920 82 4" ;;
    C) echo "1200 85 4" ;;
    D) echo "2000 85 6" ;;
  esac
}

human() {
  local bytes=$1
  awk -v b="$bytes" 'BEGIN{
    split("B K M G",u);
    i=1; while(b>=1024 && i<4){b/=1024;i++}
    printf (i==1?"%d%s":"%.1f%s"), b, u[i]
  }'
}

total_before=0
total_after=0
skipped=0
converted=0

shopt -s nullglob
files=("$SRC"/*.png "$SRC"/*.jpg "$SRC"/*.jpeg "$SRC"/*.webp)

printf "%-48s %-4s %5s %11s %11s %8s\n" "FILE" "TIER" "EDGE" "BEFORE" "AFTER" "SAVE"
printf "%s\n" "------------------------------------------------------------------------------------------------"

for src in "${files[@]}"; do
  base=$(basename "$src")
  name="${base%.*}"
  tier=$(tier_for "$name")
  read -r edge q m <<<"$(tier_params "$tier")"
  out="$DST/${name}.webp"

  size_before=$(stat -f '%z' "$src")
  total_before=$((total_before + size_before))

  if [[ $DRY -eq 1 ]]; then
    printf "%-48s %-4s %5s %11s %11s %8s\n" "$base" "$tier" "$edge" "$(human "$size_before")" "-" "-"
    continue
  fi

  tmp=$(mktemp -t compressimg.XXXXXX).png
  # Downscale only when larger than target edge (the '>' operator).
  # Re-encode alpha as PNG intermediate so cwebp preserves transparency cleanly.
  magick "$src" -resize "${edge}x${edge}>" -strip "$tmp" 2>/dev/null
  cwebp -quiet -q "$q" -m "$m" -metadata none "$tmp" -o "$out"
  rm -f "$tmp"

  size_after=$(stat -f '%z' "$out")
  total_after=$((total_after + size_after))
  converted=$((converted + 1))

  save_pct=$(awk -v a="$size_before" -v b="$size_after" 'BEGIN{printf "%.0f%%", (1 - b/a) * 100}')
  printf "%-48s %-4s %5s %11s %11s %8s\n" "$base" "$tier" "$edge" "$(human "$size_before")" "$(human "$size_after")" "$save_pct"
done

echo
if [[ $DRY -eq 1 ]]; then
  echo "Dry run. Total source bytes: $(human "$total_before") across ${#files[@]} files."
else
  save_pct=$(awk -v a="$total_before" -v b="$total_after" 'BEGIN{printf "%.0f%%", (1 - b/a) * 100}')
  echo "Converted $converted files."
  echo "Before: $(human "$total_before")"
  echo "After:  $(human "$total_after")"
  echo "Saved:  $save_pct"
fi
