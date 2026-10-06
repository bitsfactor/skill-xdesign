# Style Exemplars — learn UI *style* from these

The numeric rubric rewards system/accessibility/robustness, but **style** has a north star too.
These three reference outputs were judged (by the operator) as "more correct UI". Bias new work toward them.
(Extracted from the real reference HTML; this is DNA, not pixels.)

## E1 · interface-design R1 — "Ink & Brass / 暖墨黄铜" (DEFAULT north-star for non-pixel)
- **Mood:** warm, literate, quiet-luxury. Dark, but *warm* — never cold gray.
- **Palette:** `bg #13100b` · `surface #1d1812` / `#262019` · text `#f4ecdb` (cream) · muted `#c3b8a3` · hairline `rgba(244,236,219,.10)` · **brass `#e0a63a` / `#f2c15c`** (single accent) · ok green `#86c16b` · **parchment `#f3ebd9`** for one inset "data/rate/receipt" surface.
- **Type:** display serif (`Fraunces`) + neutral sans body (`Instrument Sans`) + mono for data (`IBM Plex Mono`); CJK `Noto Serif SC` (headings) / `Noto Sans SC` (body).
- **Material:** **depth by borders, not shadows** (few box-shadows, few gradients). Soft radius scale 8/14/20/28.
- **Signature:** the product's own motif drawn literally (whatever the product actually does — a routing lattice, a ledger trace, a receipt, a waveform…). Tabular numerals for all data.
- **Learn:** warm temperature; one brass accent used sparingly; a parchment inset for data; restraint (this is what "correct UI" looks like — not loud).

## E2 · interface-design R2 — clean pixel (arcade, restrained)
- **Palette:** dark indigo `bg #0c0a1c` · grid `#131029` · panel `#141031` · ink `#ece8ff` · line `#392e6e` / `#5c4cb0` · **few neon accents** (`cyan #35e6cf`, `amber #ffcf3f`, `pink #ff5fa8`, `green #8bf06a`).
- **Type:** `Press Start 2P` + `DotGothic16` + `VT323`.
- **Material:** ~29 hard pixel shadows, chunky borders, pixel grid background.
- **Learn:** pixel can stay disciplined — a small accent set and strong borders read clean.

## E3 · huashu-design R2 — richer pixel (judged *best* pixel)
- **Palette:** dark indigo `ink #14122E` · `panel #211D50` / `#2B2669` · screen `#0C0F2E` · very-dark **outline `#07061A`** · line `#3A3488` · cream `#F4EEDC` · muted `#C3BFE8` · dim `#908AD6` · **gold `#FFC94A` / `#FFE38A` (primary)** + teal `#45D8C6`, coral `#FF7080`, violet `#A395FF`, green `#7BE495`.
- **Type:** `Press Start 2P` + `Pixelify Sans` + `VT323` + **`ZCOOL QingKe HuangYou` (CJK display — the differentiator)** + `Noto Sans SC` body.
- **Material:** ~25 hard shadows, 5 gradients, 5 keyframes (more life than E2).
- **Learn:** a **gold-led multi-hue** palette reads richer than cyan-led; use a **blocky CJK display face** for Chinese titles (do NOT let Chinese fall back to a plain sans).

## Style checklist (apply on every build)
1. Pick E1 as the default mood unless the brief says pixel/retro → then use **E3 > E2**.
2. One signature motif drawn from the product's world; one dominant accent (E1 brass / E3 gold).
3. Warm, not cold-gray, for non-pixel; border-led depth with minimal shadows/gradients.
4. For pixel: gold-led palette + `ZCOOL QingKe HuangYou` for CJK display + hard 1:1 shadows + crispEdges.
5. Data uses tabular numerals; at most one inset "surface-in-contrast" panel (E1 parchment).
6. Still obey every gate (tokens, grid, ≤3 families, overflow, axe).

> Style fidelity ultimately needs human eyes. This file encodes the *decisions* so the generator biases toward E1/E3; it is not auto-scored by `measure.mjs`.

## HERO RULE (highest priority — do not violate)
The **first screen's focal point must be a product-specific illustration/diagram drawn as inline SVG** — not a code block, not a terminal mockup, not a screenshot-of-code.
- ❌ Do NOT put a `POST /v1/…` code/terminal card as the hero's main visual. If the brief asks for an API sample, place it **below the hero** as a secondary module (or omit it from the first screen).
- ✅ The hero visual: one substantial, polished SVG that dramatizes **this** product's core mechanism, chosen via the archetype table in `svg-hero-spec.md` §0 (the exemplar's routing lattice is just ONE instantiation — do not copy its nouns to other products). It must be detailed and finished, not a grey placeholder of 3 circles.
- ✅ Use imagery generously: the exemplar used **~19 inline SVGs** across the page (icons, diagrams, motifs). Aim for a similar density; prefer SVG illustration/iconography over code blocks and over empty space.
- ✅ Balance the hero: illustration and copy should feel weighted; avoid a heavy card on one side and dead whitespace on the other.
- Measured by `dscheck.mjs` gate `heroImagery` (`heroSvg ≥ 1` and `heroPre === 0`).
