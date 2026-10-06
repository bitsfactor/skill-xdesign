# Figure recipes (concrete) — the hero figure

One hero figure per page: **the product's mechanism, drawn**. Default grammar **hub-and-spoke** (transfers well). Avoid the two failure modes: too generic (grey placeholder) and too sparse/symmetric (a centered row of empty cards — reads as unfinished).

## A. hub-and-spoke (default) — `viewBox 640×400`
- **Columns**: source `x≈24` · hub center `x≈320` · leaves `x≈468`.
- **Source** (left): 1–2 stacked cards `w≈136 h≈80 rx=16`; each = eyebrow (mono 12–14, muted) + value (display ~20). Text centered.
- **Hub** (center, **FOCAL**): `w≈168 h≈104 rx=20`; fill = accent ~12% + accent stroke 2; title (display ~22–24) + subtitle (sans 15–16, muted) + one status dot (r=3, accent). Guarantee: hub is visibly the heaviest element.
- **Leaves** (right): 3–5 **identical** cards `w≈148 h≈40 rx=12`, vertical pitch ≈52; each = `dot(r=3) + name (16) + right-aligned value (mono 14)`. One value per leaf; no sub-lines. The active leaf's path + value are accent.
- **Connectors** (2 formulas): (1) source→hub = gentle Bézier (control offset ~40%), accent 2px. (2) hub→leaf fan = identical curvature each, order-preserving (top↔top) so lines never cross, muted 1.5px.
- **Balance**: fills ~85% of the canvas; leaves column height ≈ source column height.

## B. Other grammars (same discipline)
- **pipeline**: 3–4 equal stage cards in a row on one line, one accented (current); a step label above, one data value below each; content varies per stage.
- **split-contrast**: two equal halves (before/after) separated by a hairline; each carries a state + 2–3 real facts; the right/after side is accented.
- **metric panel**: one BIG accent number + a small inline chart (bars/sparkline, tokens) + 2–3 delta chips; the number is the focal.
- **list→detail**: a left index column (3–5 rows) + a right detail card (accent) for the selected row; link them with a marker + connector.
- **timeline**: single axis + 3–5 markers, current one larger + accent with a label pill; every marker carries a real label + value. (A bare timeline of empty cards is the classic "sparse" failure — add real data or use A.)

## C. Frame (wrap the figure)
Panel = subtle surface + 1px border + radius 16–20 + padding 16–28; optional faint glow behind.
- **Top bar** (hairline-bottom): left = short label of what the figure shows; right = ONE live status (mono, single accent dot).
- **Telemetry strip** (hairline-top): mono 11–12px, 3–5 **real** segments separated by `·`.
Use bars only when they carry real content.

## D. Bounded density
- Lower: no empty quadrant with edge ≥ 25% of the viewBox; each leaf has a real value; primary path clearly spans source→focal→target.
- Upper: ≤ ~14 in-figure `<text>` items; ONE header/status bar; exactly ONE strong element; no "12px low-contrast mono" filler — real data ≥13px or cut.
- If a fix for "too empty" adds chrome and the next look says "too dense", remove chrome — don't add more.

## E. Scale coupling (the recurring bug)
SVG coords are user units; the browser scales the SVG to its container. Make **rendered width ≈ viewBox width** (`scale ∈ [0.95,1.05]`), or set `svg_font_size = target_px / scale`. Verify the **rendered** `<text>` ≥ 13px in the browser — not from markup units.

## F. CJK
Headings: `line-break:strict; word-break:keep-all;`; `overflow-wrap:anywhere` only on non-CJK runs. Underlines via real `text-decoration` + `text-underline-offset`. In single-column layout, an `margin-inline:auto` item must have `width:100%` (+ max-width) or it collapses.
