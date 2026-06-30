#!/usr/bin/env bash
#
# Optimize explainer slide images: downscale to a max long-edge and recompress,
# preserving each file's format and name (so explainers-data.json keeps working).
#
# NOTE: Delivery format (AVIF/WebP) is handled automatically by next/image at
# serve time. This script only shrinks the SOURCE files so the image optimizer
# is fast, the first paint is quicker, and the repo stays lean.
#
# Usage:
#   scripts/optimize-explainer-images.sh <path...> [options]
#
# Options:
#   --write         Apply changes in place. Default is a DRY-RUN that touches
#                   nothing and just reports the savings.
#   --max <px>      Max long-edge in pixels (default: 1600).
#   --quality <n>   JPEG quality, 1-100 (default: 82).
#   --png8          Quantize PNGs to a 256-color palette. Much smaller for flat
#                   diagrams/screenshots; slight risk of banding on gradients.
#
# Examples:
#   # Preview what would change to the existing library (no files touched):
#   scripts/optimize-explainer-images.sh public/decoding-bitcoin/static/explainers/images
#
#   # Optimize a folder of brand-new photos, in place:
#   scripts/optimize-explainer-images.sh ~/Desktop/new-slides --write
#
# Requires: ImageMagick (brew install imagemagick). macOS `stat` is assumed.

set -uo pipefail

MAX=1600
QUALITY=82
WRITE=0
PNG8=0
PATHS=()

while [ $# -gt 0 ]; do
    case "$1" in
        --write) WRITE=1; shift ;;
        --max) MAX="$2"; shift 2 ;;
        --quality) QUALITY="$2"; shift 2 ;;
        --png8) PNG8=1; shift ;;
        -h|--help) sed -n '2,30p' "$0"; exit 0 ;;
        -*) echo "Unknown option: $1" >&2; exit 1 ;;
        *) PATHS+=("$1"); shift ;;
    esac
done

if [ ${#PATHS[@]} -eq 0 ]; then
    echo "Error: provide at least one file or directory." >&2
    sed -n '11,18p' "$0" >&2
    exit 1
fi

if command -v magick >/dev/null 2>&1; then
    IM="magick"
elif command -v convert >/dev/null 2>&1; then
    IM="convert"
else
    echo "Error: ImageMagick not found. Run: brew install imagemagick" >&2
    exit 1
fi

human() {
    awk -v b="$1" 'BEGIN{ split("B KB MB GB",u," "); i=1; while(b>=1024 && i<4){b/=1024;i++} printf "%.1f%s", b, u[i] }'
}
fsize() { stat -f%z "$1"; }

# Collect target files
FILES=()
for p in "${PATHS[@]}"; do
    if [ -d "$p" ]; then
        while IFS= read -r f; do FILES+=("$f"); done < <(
            find "$p" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \)
        )
    elif [ -f "$p" ]; then
        FILES+=("$p")
    else
        echo "Warning: not found, skipping: $p" >&2
    fi
done

if [ ${#FILES[@]} -eq 0 ]; then
    echo "No PNG/JPG images found."
    exit 0
fi

if [ $WRITE -eq 1 ]; then MODE="WRITE (in place)"; else MODE="DRY-RUN (no files changed)"; fi
echo "Mode:    $MODE"
echo "Settings: max ${MAX}px | jpeg q${QUALITY}$([ $PNG8 -eq 1 ] && echo ' | png8 palette')"
echo "Files:   ${#FILES[@]}"
echo
printf '%-46s %9s %9s %6s\n' "FILE" "BEFORE" "AFTER" "SAVED"
printf '%.0s-' $(seq 1 75); echo

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

total_before=0
total_after=0
skipped=0

for f in "${FILES[@]}"; do
    ext="${f##*.}"
    lext="$(echo "$ext" | tr '[:upper:]' '[:lower:]')"
    out="$tmp/opt.$ext"

    case "$lext" in
        jpg|jpeg)
            "$IM" "$f" -strip -resize "${MAX}x${MAX}>" -interlace JPEG \
                -sampling-factor 4:2:0 -quality "$QUALITY" "$out" 2>/dev/null
            ;;
        png)
            if [ $PNG8 -eq 1 ]; then
                "$IM" "$f" -strip -resize "${MAX}x${MAX}>" -colors 256 \
                    -define png:compression-level=9 "$out" 2>/dev/null
            else
                "$IM" "$f" -strip -resize "${MAX}x${MAX}>" \
                    -define png:compression-level=9 \
                    -define png:compression-filter=5 "$out" 2>/dev/null
            fi
            ;;
        *) continue ;;
    esac

    if [ ! -s "$out" ]; then
        printf '%-46s %9s\n' "$(basename "$f")" "! skip (encode failed)"
        skipped=$((skipped + 1))
        continue
    fi

    before=$(fsize "$f")
    after=$(fsize "$out")

    # Never let "optimization" make a file bigger — keep the original instead.
    if [ "$after" -ge "$before" ]; then
        after=$before
        apply=0
    else
        apply=1
    fi

    total_before=$((total_before + before))
    total_after=$((total_after + after))
    pct=$(awk -v b="$before" -v a="$after" 'BEGIN{ if(b>0) printf "%d%%", (b-a)*100/b; else printf "0%%" }')
    label="$(basename "$(dirname "$f")")/$(basename "$f")"
    printf '%-46s %9s %9s %6s\n' "$label" "$(human "$before")" "$(human "$after")" "$pct"

    if [ $WRITE -eq 1 ] && [ "$apply" -eq 1 ]; then
        cp "$out" "$f"
    fi
done

printf '%.0s-' $(seq 1 75); echo
saved=$((total_before - total_after))
pct=$(awk -v b="$total_before" -v s="$saved" 'BEGIN{ if(b>0) printf "%d%%", s*100/b; else printf "0%%" }')
printf '%-46s %9s %9s %6s\n' "TOTAL" "$(human "$total_before")" "$(human "$total_after")" "$pct"
[ "$skipped" -gt 0 ] && echo "Skipped (encode failed): $skipped"
echo
if [ $WRITE -eq 0 ]; then
    echo "Dry-run only. Re-run with --write to apply these changes."
else
    echo "Done. Originals overwritten in place (revert via git if needed)."
fi
