# Pixel / 8-bit Theme (CJK-aware)

Source: huashu-design pixel/retro mode. A first-class xdesign theme.

## When
Brief mentions: pixel, 8-bit, retro game, arcade, CRT, 像素风, 复古游戏机.

## Recipe
- **Fonts (Google Fonts)** — pixel faces for Latin/numerals, a legible CJK face for Chinese:
  - display/labels: `Press Start 2P`, `Silkscreen`, `Pixelify Sans`, `VT323`
  - CJK pixel/blocky: `ZCOOL QingKe HuangYou` (display), `DotGothic16` (dot-matrix body), fallback `Noto Sans SC` for readability.
  - Rule: Latin/numbers render in pixel faces; Chinese stays legible (never force a pixel face that lacks CJK glyphs without a fallback).
- **Palette** — a *limited* indexed palette (NES/PICO-8-like): 8–16 colors max, define as tokens.
- **Shape** — chunky borders (3–4px), **hard 1:1 offset shadows** (no blur), zero/near-zero radius, `image-rendering: pixelated`, `shape-rendering: crispEdges` on SVG.
- **Texture** — optional CRT: a *single* `repeating-linear-gradient` scanline layer + subtle vignette (keep it lightweight and behind content; provide reduced-motion/no-scanline fallback).
- **Icons** — hand-built pixel SVGs (rect grids), never emoji.
- **Motion** — quantized/steps() easing; press = translate + shadow shift (keep the pixel grid crisp). Respect `prefers-reduced-motion`.

## Proven palettes & type (learn from exemplars — prefer E3 over E2)
See `references/style-exemplars.md`. Defaults that were judged best:
- **Primary accent = gold** `#FFC94A` / `#FFE38A` (not cyan-led). Secondaries on a dark indigo ground: teal `#45D8C6`, coral `#FF7080`, violet `#A395FF`, green `#7BE495`.
- Grounds: `ink #14122E` · `panel #211D50` / `#2B2669` · screen `#0C0F2E` · very-dark outline `#07061A` · line `#3A3488`.
- Text: cream `#F4EEDC` · muted `#C3BFE8` · dim `#908AD6`.
- **CJK display face is mandatory and non-negotiable: `ZCOOL QingKe HuangYou`** for Chinese titles/headings (blocky, on-theme), with `Noto Sans SC` body fallback. Do NOT let Chinese render in a plain sans.
- Latin pixel faces: `Press Start 2P` + `Pixelify Sans` or `Silkscreen`; mono/terminal `VT323`.

## Non-negotiables (same as every theme)
- tokens only, no raw values; spacing on the grid; ≤3 meaningful font families (pixel faces + one CJK counts as the family budget — prefer 2 pixel + 1 CJK);
- no horizontal overflow at 320/375/768/1280;
- contrast ≥ 4.5:1 body (pixel palettes love to fail this — verify; adjust ink/paper rather than lowering the bar);
- axe: 0 critical/serious.

## Signature
Give the product one pixel motif drawn from its own world (e.g. a "key opens the model gate" circuit, a coin/press animation) — not generic game sprites.
