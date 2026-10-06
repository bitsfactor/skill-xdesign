# Hero figure spec — GENERAL method (derive the figure from the product)

**Rule 0 — no fixed template.** The hero figure must depict **this product's own subject/mechanism**, using the product's real nouns and values. Never reuse a diagram that was tuned for another brief. If your figure would work unchanged for a *different* product, it is either too generic (a grey placeholder) or too templated (a copied motif) — fix it.

## 0. Choose an archetype from the brief (do this before drawing)
State the archetype + the product nouns in one line, then instantiate.

| Subject shape (read the brief) | Archetype | Typical nouns |
|---|---|---|
| many things behind one facade / routing / aggregation | **hub-and-spoke** | entry → focal hub → leaves |
| ordered steps / import→transform→export / onboarding | **pipeline** (left→right) | stage1 → stage2 → stage3 |
| with vs without / old vs new / before-after | **split contrast** | state A │ state B |
| numbers, trends, distribution | **metric panel** | big figure + sparkline/bars + deltas |
| a catalogue with one item opened | **list → detail** | index column → focus card |
| sequence over time / roadmap / history | **timeline** | markers on an axis |
| places, coverage, routes | **map / locations** | region + pins/paths |
| layers, stack, depth | **layered stack** | stacked planes/slabs |

Selection cues: brief says "one key, many providers" or "gateway/aggregator" → hub-and-spoke; "subscription/renewal/policy lifecycle" → timeline/pipeline; "sleep/meditation" → a calm single-subject scene (metric + waveform); "data classification/audit" → pipeline + list→detail.
The archetype is a **starting grammar**, not a mandate: adapt counts and layout to the product.

## 1. Canvas & frame (general)
- Pick a `viewBox` whose width ≈ the rendered column width (see §5 Scale coupling). Prefer ~`640 × 400` or `600 × {360…470}`.
- Let the figure fill **~85% of the panel height**; outer card padding ~**24–28px**.
- Panel = one border + radius; **no nested panel**. Faint texture/dots ≤6% opacity or omitted.

## 2. Nodes (parametric — sizes come from the product, not a copied spec)
- Define **tiers**; every node in a tier shares **identical size + identical padding**.
- Internal padding **h ≥ 16, v ≥ 10** (skew ≤ 4px); label centered (`text-anchor:middle`, vertical center ≈ `box_center + 0.35em`).
- Each meaningful node = a **label** (+ at most one short value/role). Keep it to **≤ 2 lines**.
- **Focal**: 1 (rarely 2) element is larger + accent-tinted/–stroked; everything else is muted surface.
- Same tier = same size; if a label overflows, shorten the label or widen the node — never drop padding below 8.

## 3. Connectors (general)
- Orthogonal (H/V) or smooth Bézier; start/end at **distinct ports**; **never route through a node**; no crossings (order-preserving fan, or separate lanes).
- Emphasis by **weight + color**, not by noise: primary path slightly thicker + accent; secondary thinner + lower opacity. Use dashes only when the dash is *semantic*.
- Keep labels inside the canvas.

## 4. Density — BOUNDED (both directions)
Lower bound (don't be weak):
- (a) node-area-weighted focal centroid within ~0.08 of the figure center (don't shove everything to one edge);
- (b) no empty quadrant with edge ≥ 25% of the viewBox — fill with a **real-data** card, never decoration;
- (c) each leaf node carries a real value (not a placeholder); primary name contrast ≥ 7:1;
- (d) primary path clearly spans source → focal → target; secondary paths lighter;
- (e) at 1440, figure-card area / copy-block area ≥ ~1.3.

Upper bound (don't build a debug panel):
- (f) keep total in-figure `<text>` to **≤ ~14 items**; **one** header/status bar, not three stacked;
- (g) exactly **one** strong element (the highlighted path + its target + one value); everything else muted;
- (h) no "12px low-contrast mono" filler — either it is real data ≥13px or it is cut.
If a change fixes "too empty" by adding chrome and the next review says "too dense", you crossed the upper bound — **remove, don't add**.

## 5. Scale coupling (CRITICAL — the recurring bug)
SVG `font-size`/coords are in **user units**; the browser scales the whole SVG to fit its container. If the figure column renders narrower than the viewBox, everything (including text) shrinks.
- **Rule**: make **rendered width ≈ viewBox width** (scale ∈ [0.95, 1.05]). Easiest: set the figure column width ≈ the viewBox width, or set the `viewBox` width to the actual rendered width.
- If a mismatch is unavoidable: **compensate** — `svg_font_size = target_px / scale`, where `scale = renderedWidth / viewBoxWidth`.
- Always **verify the rendered** computed font-size of hero `<text>` (target ≥13px) in the browser, not from the markup units.

## 6. CJK line breaking
- Headings: `line-break: strict; word-break: keep-all;` so Chinese words never split mid-word; allow Latin/URL to wrap with `overflow-wrap: anywhere` **only** on non-CJK runs.
- Underlines: use real `text-decoration` + `text-underline-offset` (not a border that overlaps glyphs).

## 7. Layout rules (expert-encoded — prevent the size oscillation)
1. A text-bearing hero SVG MUST be **measured at 320/375/768/1080/1280**: `scale = renderedWidth/viewBoxWidth ∈ [0.95, 1.05]` and `<text>` computed size **≥13px**. If the container is narrower than ~0.9× the viewBox, **do NOT keep shrinking the same SVG** — switch to a **compact vertical SVG** (same tokens/classes) via `display`.
2. In a single-column layout, a `margin-inline:auto` grid/flex item **must get explicit `width:100%` (+ max-width)** or it collapses to content-min width (the real cause of the size oscillation).
3. **Headline highlight**: `display:inline-block` wrapping only the text; real `text-decoration` + `text-underline-offset ≥ .22em`, `text-decoration-skip-ink:none`; never `display:block` (underline then spans the whole line).
4. **CJK body/lead**: `line-break:strict; word-break:keep-all; text-wrap:pretty`, plus `<wbr>` at phrase boundaries — break only at spaces/punctuation/`<wbr>`.
5. **Inline list separators** must be attached to the item (`li::before`, or `span + span::before`); container `display:flex; align-items:baseline`; never standalone `.sep` nodes (they orphan on wrap).

## 8. Judge protocol note
Do NOT tune on a single model's 1–10 score (it oscillates). Decide keep/reject with the **battery** (`pairwise.mjs`: 3 judges × both orders) **pooled across all train briefs** per `docs/evaluation.md` — never on one brief.
