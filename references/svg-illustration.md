# SVG Illustration — the method (max-quality hero graphics)

Goal: every hero (and page) is carried by a **product-specific inline-SVG illustration**, and iconography is consistent.
Learned from: interface-design R1 (600×470 lattice built from rect/circle/path + `<text>`, `role=img`, **0 gradients / 0 filters / 0 shadows**), diagram-design (**every coord divisible by 4**, 1–2 focal nodes, hairlines, no shadows), Glyphic / fireworks-tech-graph (geometry-safe routing, distinct ports, labels inside canvas).

## A. Non-negotiable geometry rules (this is what makes it look hand-made, not AI-made)
1. Fixed `viewBox` (hero e.g. `0 0 600 470` or `0 0 640 400`); render with `width:100%;height:auto`.
2. **Every coordinate, width, height, radius and gap is divisible by 4.** (diagram-design's #1 rule.)
3. Nodes align to an explicit column/row grid; equal node sizes within a tier; consistent gutters (16/24/32).
4. Connectors: orthogonal (H/V) or smooth Bézier; start/end at **distinct ports**; never route **through** a node; keep **labels inside** the canvas; avoid overlapping edges (or use bridge hops).
5. Everything references design tokens (colors via `var()`, fonts via `var()`); no raw literals.

## B. Composition recipe (hero diagram)
1. **Story** — the product's core mechanism as one visual metaphor (e.g. "one key → gateway → many model vendors").
2. **Layout** — pick one: radial fan · left→right pipeline · hub-and-spoke · layered stack.
3. **Focus** — 1–2 focal elements get the accent + larger size; demote the rest to muted.
4. **Vocabulary** — hub card · leaf node card · connector path · port dot · label text · container frame · decorative grid. Build from `rect` / `circle` / `path` / `line` / `text` only.
5. **Depth, restrained** — 1px hairlines, one accent tint, subtle surface steps. **No drop shadow on every element. No rainbow gradients.**
6. **Label everything meaningful** — node name + role, as in-SVG `<text>` (crisp; uses font tokens).
7. **Motion, optional** — connector draw-in with `stroke-dasharray`/`stroke-dashoffset`; a single pulse traveling; must honor `prefers-reduced-motion`.

## C. Skin (from tokens)
- Node fill = `--surface`; focal = accent tint (`color-mix(in srgb, var(--accent) 12%, var(--surface))` or an `--accent-soft` token); stroke = `--line`; labels = `--text`/`--text-muted`.
- Icons: **24×24**, `stroke:currentColor`, `stroke-width:1.5–2`, `fill:none` (except an accent dot). Reuse across the page (like the reference's 18 icons).

## D. Accessibility
- Meaningful SVG: `role="img"` + `aria-label` (or `aria-labelledby` → first-child `<title>` + `<desc>`).
- Decorative icons: `aria-hidden="true"` + `focusable="false"`.
- Prefix any gradient/filter/clip IDs per SVG to avoid collisions when inlined.

## E. Anti-slop (auto-flagged by `svgcheck.mjs`)
- ❌ emoji, raster `<image>`, clipart, gradient-on-everything, shadow stacks, "3 grey circles" placeholder.
- ✅ grid-locked coords, equal spacing, baseline-aligned labels, 1–2 focal nodes.

## F. Validation
`node scripts/svgcheck.mjs <file.html>` → per-SVG audit: `viewBox`, `role`/`aria`, label count, **4-grid adherence** of geometric primitives, gradient/filter counts, icon sizes.

## G. Hero lattice skeleton (adapt per product)
```html
<svg viewBox="0 0 640 400" role="img" aria-labelledby="heroT heroD" width="100%" height="auto">
  <title id="heroT">一把钥匙经网关路由到多家模型</title>
  <desc id="heroD">左侧应用 → 中部网关 → 右侧多个模型节点</desc>
  <!-- frame / grid (optional), hub at x=256,y=176,w=128,h=48 -->
  <rect x="256" y="176" width="128" height="48" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>
  <text x="320" y="204" text-anchor="middle" font-family="var(--font-body)" fill="var(--text)">Nimbus 网关</text>
  <!-- leaves on a 4-grid (x=512, y=96/176/256 …), connectors from distinct ports, labels inside canvas -->
</svg>
```
See `templates/svg-kit.md` for copy-paste primitives.

## H. Legibility & routing (v2 — from vision review of real failures)
A diagram that can't be read at a glance has failed, even if the geometry is clean.
- **Text legibility**: hero label `font-size ≥ viewBoxWidth / 45` (≈14 for a 640-wide viewBox) and **≥ 13px rendered** on desktop. Do NOT cram: show the **name + one short role**; move tertiary detail (versions, prices, counts) to a **legend or outside the SVG**.
- **Node budget**: ≤ 5 leaf nodes per fan, or use a **2-column** leaf layout; equal vertical spacing (multiples of the gutter).
- **Non-crossing connectors**: order-preserving fan (top target ↔ top port, bottom ↔ bottom); **distinct ports**; if two edges would cross, **reorder targets** or route in separate lanes. No mid-section tangle.
- **One idea per illustration** — understandable at a glance, no legend hunting.
- **Hero evidence (optional but strong)**: pair the diagram with a compact code **chip** (a one-line `pip install …` / `POST /v1/…`) as secondary proof — but keep the diagram the focal point, not the code.

## I. Node padding & alignment (measured rule — output must pass)
Measured from real failures: labels were crammed to 1–5px and off-center. Enforce:
- **Node internal padding ≥ 16 horizontal, ≥ 10 vertical**, and **L ≈ R / T ≈ B** (skew ≤ 4px). Center the label (SVG `text-anchor:middle` + vertically centered).
- **Chip / pill**: padding ≥ 8 horizontal, ≥ 4 vertical.
- **Sub-rows** (e.g. capability rows): padding ≥ 8 on every side — never 2px.
- **Nested frames**: inset difference a **multiple of 4**, equal on all sides (e.g. 8 or 12).
- **Same tier = same size + same padding.** If a longer label overflows, shorten the label or widen the node — never let padding drop below 8.
- Auto-check: `browser.mjs` reports `svg.minPad`, `svg.padSkewMax`, `svg.cramped` (aim `minPad ≥ 8`, `padSkewMax ≤ 4`, `cramped = []`).

## J. Output hygiene (from vision review — feelings of "ugly" trace to these)
- **No decorative texture/hatch/pattern behind any text.** Legibility first; kill background patterns that sit under labels.
- **No duplicated content** between the hero and the next section (no repeated code chip, no repeated headline/CTA).
- **Capability/feature rows must NOT look like interactive buttons** (no button chrome/fill that implies click); use plain rows/lists.
- **Labels must be correct & unique** — no typos, no duplicated names; separate list items clearly (rows/delimiters), never concatenate model names with spaces.
- **Control vertical rhythm** — no large dead gap after the hero; hero → first section should be tight.
- **Type roles stay coherent** — display face + body face should read as one system, not two unrelated styles.
- These are scored by the VLM in `GOAL-SVG.md`; treat the VLM's TopIssues as the fix list.

## K. Reference hero pattern — "3-column routing" (the method that actually looks good)
The approved reference (interface-design R1, 600×470) is BEAUTIFUL because it is SIMPLE. Replicate this structure; it is a subtraction exercise.
- **One horizontal axis, three columns:**
  - Left = source card (eyebrow + value). Ref: `x=6 w=150 h=84 rx=15`, eyebrow 11px letterspacing 1.6 muted, value 14px ink, both `text-anchor=middle`.
  - Center = **the one focal gateway card** (accent fill @ ~9% + accent stroke). Ref: `x=206 w=180 h=104 rx=17`; title 11–13px + subtitle 13px + a 4px status dot.
  - Right = provider list: **identical cards**, Ref `w=154 h=38 rx=11`, vertical **pitch 54** (16px gap), each = `dot(r=3.2) + name(13px)`. Name only — no sub-lines.
- **Connectors — two formulas only:**
  - left: `M156 235 H206` (one straight line).
  - fan: `M386 235 C 414 235, 412 <YtargetCenter>, 440 <YtargetCenter>` — **same curvature**, one per target, evenly spaced → no crossings.
- **Text budget: ≤2 lines per node.** No capability sub-rows, no legends inside the card, no nested frames, no hatch/pattern, no SDK/key sub-boxes.
- **Palette:** 1 accent (focal only), everything else surface/ink/muted. Zero gradients/filters/shadows.
- **Primitives only**: path, rect, text, circle. Keep total shapes modest (~9–15 + one per provider).
- **Vibe:** a tidy instrument panel. If you're tempted to add another box or another text line, DON'T — delete instead.
- This is the default hero pattern for "one thing routes/serves many" products. Adapt counts (e.g. 5 providers), keep the discipline.

## L. Compose the diagram into a "figure frame" (this is what makes the whole thing look designed)
The approved reference is NOT a bare SVG — it is a framed panel. The SVG is the middle layer; the top and bottom bars (hairline-separated) are what read as a polished visual.
```
<div class="figure">            /* panel: subtle surface + 1px border + radius 16 + padding 16; optional faint glow behind */
  <div class="figure-top">      /* header bar: flex space-between; padding 2px 12px 12px; border-bottom 1px var(--line); margin-bottom 12 */
     <span class="ft-label">实时路由 / Live routing</span>
     <span class="ft-live">● ONLINE</span>   /* mono, green, gap 6, 11–12px */
  </div>
  <svg .../>                    /* the diagram (middle layer) */
  <div class="figure-foot">     /* telemetry strip: mono 11–12px; padding-top 12; border-top 1px var(--line); margin-top 12; segments separated by · */
     <span class="ok">● 200 OK</span> · gpt-4o · 412ms · ¥0.0031 · 命中缓存
  </div>
</div>
<div class="figure-cap">已接入 / Supported — OpenAI · Anthropic · Google · DeepSeek · Qwen</div>  /* optional caption strip below */
```
Rules:
- Top and bottom bars are **hairline-separated** (1px `--line`), same horizontal padding as the panel.
- Micro-type is **mono**; the top label is muted; a single live/status accent (green dot).
- Panel = subtle surface + 1px border + radius 16; put the glow/dots/noise (`svg-decoration-motion.md`) **behind the panel**, not just behind the SVG.
- Optional caption strip below with connected providers ("已接入 / Supported").
- **Apply this frame to every hero illustration** — a floating bare diagram looks unfinished; a framed instrument panel looks designed.
