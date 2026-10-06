# Hero figure spec — the METHOD (analyze the product, then build the figure)

The figure is the hero's centerpiece. It is **not** "a diagram" — it is **this product's mechanism, drawn**. Two failure modes to avoid:
- **Too generic**: a grey placeholder (3 circles), or a shape that would fit any product.
- **Too sparse/symmetric**: a centered row or empty timeline. This reads as *unfinished*. Fill the frame with real content and give it ONE clear focal.
**Default grammar: hub-and-spoke** — it transfers well across domains (one focal thing served/selected among many). Use another grammar only when the mechanism's shape truly differs.

## 0. The analysis process (do this in order — write the answers, don't skip)
1. **Mechanism** — in ONE sentence, what does the product actually do? (the recurring action, not marketing).
2. **Roles** — list the concrete nouns the mechanism implies: the **focal thing**, its **source/trigger**, the **set it's chosen from**, a **number/value**, a **sequence**, a **place**…
3. **Grammar** — match the shape to a grammar (table below). When the mechanism is "one focal among many" or "one thing routes/serves/selects", use **hub-and-spoke**.
4. **Role-mapping** — map the product nouns onto the grammar's slots (source→hub→leaf, or stage→stage→stage, or metric+value…). Write the mapping down; every slot must be filled with a REAL noun/value from the brief.
5. **Frame content** — pick the frame's top status (a live state) and bottom telemetry (3–5 real facts: counts, dates, units).
6. **Instantiate** — lay out on a 4-grid using the recipe's proportions (below). Product nouns replace placeholders.
7. **Craft gates** — one accent; ≤2 text lines per node; fill ~85% of the canvas; no empty quadrant; focal clearly dominates; connectors don't cross; text ≥13px rendered. Then run the bounded-density check (§5).

## 1. Grammar library (with concrete construction recipes)
All: `viewBox` width ≈ rendered width (see §6 Scale coupling); 4px grid; tokens for color/font.

### A. hub-and-spoke (DEFAULT for "one focal among many")
- **3 columns on one horizontal axis.**
- **Source (left)**: 1–2 stacked cards, `w≈128–150`, `h≈76–84`, `rx≈14`; each = eyebrow (mono, small, muted) + value (display, larger). Both centered. `x≈24`.
- **Hub (center, FOCAL)**: one card `w≈150–184`, `h≈96–108`, `rx≈16–20`; fill = accent ~10–14% + accent stroke; title (display) + subtitle (sans, muted) + a status dot. Centered at the axis `cy`.
- **Leaves (right)**: 3–5 **identical** cards, `w≈150`, `h≈36–44`, `rx≈10–12`; vertical **pitch ≈ 54** (i.e. ~16 gap); each = `dot + name + one right-aligned value` (mono). No sub-lines.
- **Connectors (two formulas only)**: (1) one accent path source→hub (straight `H` or a single gentle Bézier). (2) a fan hub→each leaf: same curvature, evenly spaced, order-preserving so lines **never cross**; secondary paths thinner + muted (1–1.5px). Primary path 2–3px accent.
- **Balance**: the three columns together fill ~85% of the canvas width and height; source column and leaf column roughly equal visual weight, hub clearly the heaviest.

### B. pipeline (ordered stages)
3–4 equal stage cards in a row, connected by a single arrowed/segmented line; one stage accented (current). Above each stage a small step label (`01`, `02`…); below, one data value. Content must vary per stage (not repeats).

### C. split-contrast (before/after, with/without)
Two halves of equal weight separated by a hairline or gap; each half carries a labeled state + 2–3 real facts. The "after/right" gets the accent. Do not leave either half empty.

### D. metric panel (numbers/trend)
One BIG number (display, accent) + a small inline chart (bars/sparkline, tokens) + 2–3 delta chips. The number is the focal; the chart supports it. Fill the panel; don't float.

### E. list→detail (catalog with one opened)
A left index column (3–5 rows) + a right detail card (larger, accent) for the selected row. The selected row and the detail are visually linked (a marker + a connector).

### F. timeline (sequence over time)
A single axis with 3–5 markers; the current marker is larger + accent with a label pill. The markers carry **real labels + a value each**. ⚠️ A bare timeline of equal empty cards is the classic "sparse" failure — if you use it, add real per-node data and a clear focal, or choose grammar A instead.

## 2. Worked example — mapping a brief (the "good" pattern)
Brief shape: *a subscription that ships one seasonal product, chosen from a set, with an instruction card.*
1. Mechanism: "one product per season, chosen from origins, shipped with a brew card."
2. Roles: focal = the current item; source = plan + delivery; set = the origins; value = altitude/weight.
3. Grammar: **hub-and-spoke** (one focal among many).
4. Mapping: source = {订阅计划, 配送}; hub = 当季豆; leaf = {各产区 + 海拔}; telemetry = {豆·处理法·海拔·克数}.
5. Instantiate with recipe A; replace every placeholder with the brief's nouns.
→ This yields the "instrument panel" look. **Copy this process and discipline — not the nouns.** For a different product the roles and grammar change (see §1), but the process and craft gates are identical.

## 3. Nodes (general)
- Define **tiers**; every node in a tier shares identical size + padding. Internal padding h ≥ 16, v ≥ 10 (skew ≤ 4px); labels centered (`text-anchor:middle`, v-center ≈ `box_center + 0.35em`).
- Each meaningful node = a **label** (+ at most one short value/role). ≤ 2 lines.
- **Focal**: 1 (rarely 2) element larger + accent; everything else muted surface.

## 4. Density — BOUNDED (both directions)
Lower bound (don't be weak): (a) focal centroid within ~0.08 of figure center; (b) NO empty quadrant with edge ≥ 25% of the viewBox — fill with a real-data card, never decoration; (c) each leaf carries a real value; primary name contrast ≥ 7:1; (d) primary path clearly spans source→focal→target; (e) at 1440, figure:copy area ratio ≥ ~1.3.
Upper bound (don't be a debug panel): (f) ≤ ~14 in-figure `<text>` items; ONE header/status bar; (g) exactly ONE strong element; (h) no "12px low-contrast mono" filler — real data ≥13px or cut.
If a fix for "too empty" adds chrome and the next review says "too dense", you crossed the upper bound — **remove, don't add**.

## 5. Frame (what makes it read as "designed")
Panel = subtle surface + 1px border + radius ~16–20 + padding ~16–28; optional faint glow behind. Bars:
- **Top bar** (optional, hairline-bottom): left = short label of what the figure shows; right = ONE live status (mono, single accent dot).
- **Bottom telemetry strip** (optional, hairline-top): mono 11–12px, 3–5 **real** segments separated by `·`.
Use bars only when they carry real content; placeholders must be replaced. Apply the frame to the hero figure.

## 6. Scale coupling (CRITICAL)
SVG `font-size`/coords are user units; the browser scales the SVG to its container. Make **rendered width ≈ viewBox width** (scale ∈ [0.95, 1.05]) or compensate `svg_font_size = target_px / scale`. Always verify rendered hero `<text>` ≥ 13px in the browser, not from markup units.

## 7. CJK line breaking
Headings `line-break:strict; word-break:keep-all;`; `overflow-wrap:anywhere` only on non-CJK runs. Underlines via real `text-decoration` + `text-underline-offset`.

## 8. Layout rules (prevent the size oscillation)
1. A text-bearing hero SVG MUST be measured at 320/375/768/1080/1280: `scale ∈ [0.95,1.05]`, `<text>` ≥13px. If container < ~0.9× viewBox, switch to a **compact vertical SVG** (same tokens) via `display`.
2. In single-column layout, a `margin-inline:auto` grid/flex item **must get explicit `width:100%` (+ max-width)**.
3. Headline highlight: `display:inline-block` on the text; real `text-decoration` + `text-underline-offset ≥ .22em`, `text-decoration-skip-ink:none`.
4. CJK body: `line-break:strict; word-break:keep-all; text-wrap:pretty` + `<wbr>` at phrase boundaries.
5. Inline list separators attach to the item (`li::before` / `span+span::before`); never standalone `.sep` nodes.

## 9. Judge protocol note
Do NOT tune on a single model's 1–10 score (it oscillates). Decide keep/reject with the **battery** (`pairwise.mjs`: 3 judges × both orders) **pooled across all train briefs** — never on one brief.
