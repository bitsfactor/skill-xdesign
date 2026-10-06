# Figure recipes — the hero

One hero per page: **a picture of the product**. Default = a **literal object/scene** from the product's world, illustrated in SVG and carrying real data. Use a diagram (§B) only when the product is abstract.

## A. Object illustration (DEFAULT for physical / experiential products)
Pick the product's iconic object (see SKILL Phase 2), then build it from primitives in 2–4 layers: **base shape → shading → highlight → accent detail**.

### Worked example — a coffee subscription → "the bag with its label"
1. **Subject**: the coffee bag (the artifact the customer receives).
2. **Twist**: present it as a **specimen label** — the bag's label carries the batch facts.
3. **Layers** (viewBox ~`560×440`, object centered, fills ~85%):
   - bag body: rounded `path`/`rect` (w≈300 h≈360 rx≈16), fill `--surface-2`, 1px `--line`; a top fold line + a small zip/valve detail.
   - label card: rounded `rect` (w≈210 h≈240 rx≈12) in a parchment/contrast surface, slight shadow (one soft, not a stack).
   - label content (real data): brand + `LOT 026·03`; origin `耶加雪菲 · 班可`; rows `海拔 1,950–2,100m` / `烘焙日 2026.03.18` / `处理法 水洗·棚架日晒`; flavor chips `柑橘 · 白花 · 蜂蜜`.
   - accent: ONE seal/stamp (a small circle + the bean glyph) in the accent color.
4. **Texture/detail**: a bean icon (2 strokes), a stitch or foil line — small, product-specific.
5. Frame it (§C). Telemetry strip = 3–5 real facts.

### Other objects/moments to reach for
- sleep app → a phone glowing at night with a soft waveform + a crescent moon.
- bakery / food → the loaf or the box, steam wisps, a torn label.
- B2B audit SaaS → a stacked document with an accent seal + a checklist.
- hardware → the device at an angle, one edge catching light.
Rules: keep ONE accent; the object is the focal and heaviest; text on the object is real, ≥13px rendered.

## B. Diagrams (ONLY for abstract products: APIs, platforms, data)
If there is no physical object, pick a grammar — the same discipline as A (one accent, real values, fill the frame):
- **hub-and-spoke** (one focal among many): source≈24 · hub center≈320 · leaves≈468; hub focal card (accent ~12%); 3–5 identical leaf cards (pitch ≈52, each `dot + name + one value`); one accent path source→hub, thin order-preserving fan hub→leaf (no crossings).
- **pipeline**: 3–4 equal stage cards on a line, one accented; a step label above, one value below each.
- **split-contrast**: two equal halves (before/after) split by a hairline; the "after" side accented.
- **metric panel**: one BIG accent number + a small inline chart + 2–3 deltas.
- **list→detail**: a left index (3–5 rows) + a right detail card (accent) for the selected row.
- **timeline**: one axis + 3–5 markers, current one larger + accent; every marker has a real label + value.

## C. Frame (wrap any hero)
Panel = subtle surface + 1px border + radius 16–20 + padding 16–28; optional faint glow behind. **Top bar** (hairline-bottom): short label + ONE live status. **Telemetry strip** (hairline-top): mono 11–12px, 3–5 real segments. Use only when they carry real content.

## D. Bounded density
No empty quadrant ≥25%; each labeled element has a real value; ≤~14 in-figure `<text>` items; exactly ONE strong element; no "12px low-contrast mono" filler — real data ≥13px or cut.

## E. Scale coupling (the recurring bug)
Make **rendered width ≈ viewBox width** (`scale ∈ [0.95,1.05]`) or set `svg_font_size = target_px / scale`. Verify **rendered** hero `<text>` ≥13px in the browser.

## F. CJK
Headings `line-break:strict; word-break:keep-all;`; `overflow-wrap:anywhere` only on non-CJK runs; real `text-decoration` + `text-underline-offset`. Single-column `margin-inline:auto` items need `width:100%` (+ max-width).
