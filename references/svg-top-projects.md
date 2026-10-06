# SVG lessons from the top-starred projects

Studied (by stars): `Cocoon-AI/architecture-diagram-generator` (7.4k), `imxv/Pretty-mermaid-skills` (1.5k), `bybit-exchange/svg-diagram` (605), `bentossell/visualise` (486), `lazypay/Archscribe` (356); plus design top: `ui-ux-pro-max` (133k), `taste-skill` (92k), `hallmark` (30k).

## 1. Canvas, margins, centering (bybit `svg-diagram`)
- **viewBox width = 680** (visualise) is a safe convention for a hero/diagram column; margins **20–25px**.
- **Center on the CONTENT center, not the viewBox center.** `content_center = (leftmost+rightmost)/2`. Recenter cheaply with one wrapper `<g transform="translate(dx,0)">` where `dx=(rightPad−leftPad)/2`.
- `title y = margin + font_size × 0.75`; `viewBox height = content_bottom + margin`.
- **Visual balance**: left/right halves carry similar weight.

## 2. Spacing numbers (bybit + architecture-generator)
- Sibling/adjacent boxes: **≥ 25px** (25–30 recommended).
- Text ↔ line clearance: **10–20px**.
- Vertical gap between stacked components: **≥ 40px**; put inline connectors (buses) **inside the gap**, never overlapping.
- Group/container inner padding: **15–20px**; dashed grouping boxes share `stroke-dasharray:6,4`, `rx:8–12`, same fill/padding, group title 11px.
- Box sizes: same-row boxes differ **≤ 60px**; same-column boxes share a center line; outer box = content + padding×2.
- **Legend OUTSIDE the diagram**, ≥ 20px below the lowest element (expand viewBox height).

## 3. Z-order & translucency (architecture-generator)
- Draw **connectors early** (right after background) so boxes paint over their ends.
- For **translucent** box fills, draw an **opaque base rect first**, then the translucent styled rect, so arrows don't show through the fill.

## 4. Typography
- Dense technical diagrams: a small ramp (e.g. 12 / 9 / 8 / 7px), names > sublabels > annotations; mono only for technical content (ports/URLs), sans for human names (share-with-diagram rule from diagram-design).
- Hero-scale: node name ≥ 14px, eyebrow 11px is acceptable (reference uses it); never below 11px.

## 5. Content organization
- **Every node = one idea; every connector = information.** The schematic is done when nothing can be removed (diagram-design).
- **1–2 focal nodes** (accent), rest neutral/muted. A rainbow of per-node colors is the #1 AI tell.
- Semantic color is a **table** (type → fill+stroke), used consistently — but keep it to 2–3 colors in a hero, not 6.
- **Get it right on the first pass**: self-walk the checklist before showing output.

## 6. First-screen (hero) checklist — adapt of the above for a marketing hero
1. viewBox width 600–680; margins ≥ 20; content centered on content-center; left/right balanced.
2. One horizontal axis, ≤3 columns; ≤5 leaf cards; identical leaf size; even pitch.
3. ≤2 text lines per node; name ≥14px; no sub-rows/capability lists inside the diagram.
4. One accent (focal only); neutral cards; single color for status dots.
5. Connectors: one straight + N same-curvature Béziers; `fill:none`; no crossings; 10–20px from labels.
6. Legend (if any) below the SVG, never inside.
7. Decoration/ motion per `svg-decoration-motion.md` (glow + grain + flow/draw-in), reduced-motion safe.
