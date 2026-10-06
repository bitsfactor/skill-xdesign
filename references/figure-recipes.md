# Figure recipes — the hero

One hero per page: **a picture of the product**. Default = a **literal object/scene** from the product's world, illustrated in SVG and carrying real data. Use a diagram (§B) only when the product is abstract.

## A. Object illustration (DEFAULT for physical / experiential products)
Pick the product's iconic object (see SKILL Phase 2), then build it from primitives in 2–4 layers: **base shape → shading → highlight → accent detail**.

### How to make an object look GOOD (the 5 techniques that separate "nice" from "flat")
1. **True silhouette + ONE defining feature.** Draw the object's real proportions (a bag is taller than wide, wider at the base, softly rounded). Then add one characteristic detail: a **crimped/zippered top** (a row of vertical stitch lines), a lid, a handle, a valve, a spout, a fold. This feature is what makes it read as *the object*.
2. **Material in 2–3 flat tones, one highlight.** Body tone, a slightly darker side/edge for volume, a lighter label/surface. **No gradients.** One soft highlight where the light hits.
3. **Ground it.** A soft **ellipse shadow** under the object (fill black, opacity ~0.08–0.15, blurred/soft), so it sits on a surface instead of floating.
4. **1–2 supporting props** from the product's own world, small + muted: a brew card peeking out, 2–3 coffee beans, a leaf, a tag on a string. These complete the scene without competing with the focal.
5. **Generous space, centered.** The object occupies ~40–55% of the figure width with real margins; do **not** fill the panel with boxes. One accent only.

### Worked example — a coffee subscription → "the bag with its label"
1. **Subject**: the coffee bag (the artifact the customer receives).
2. **Layers** (viewBox ~`640×440`):
   - **crimped top**: a darker band (h≈28) with ~10 thin vertical stitch lines.
   - **bag body**: rounded rect (w≈300 h≈330 rx≈18), one flat warm-brown tone; a subtle lighter highlight on the lit edge.
   - **label**: a centered rounded rect (w≈200 h≈150 rx≈8) in a cream surface; content centered with the display face: brand `Morrow` + `第 07 期 · 秋`, then bean line `耶加雪菲` / `日晒 · 200 g` — real data, ≤3 lines.
   - **props**: a **brew card** peeking out behind-right (a rotated rounded rect with 3 short lines); **3 coffee beans** at the base (small ellipse + a curved seam path).
   - **ground shadow**: a wide, soft ellipse under the bag (opacity ~0.12).
   - **accent**: ONE element only (e.g. the bean seam or a small seal).
3. Frame it (§C); telemetry strip = 3–5 real facts.

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
