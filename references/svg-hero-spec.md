# Hero figure spec (refined sizes & spacing — use these numbers)

Derived from an A/B diagnosis: "take the OLD sizing/spacing + the NEW live-routing narrative."
Do NOT shrink labels to 9–11px; do NOT nest a panel inside the panel; do NOT duplicate the provider list.

## Canvas & frame
- Figure viewBox ≈ **640 × 400** (or 640×420); let the diagram fill **~85% of the panel height** (outer card padding ~**28px** top/bottom).
- Panel = one border + radius 16; **no nested inner panel**. Dot/noise pattern only as a faint background (≤6% opacity) or omitted.

## Nodes (use these sizes; all coords /4)
- **Provider / leaf card**: ~**120 × 44px**, radius 8, gap **12px**, even pitch. Label **13–14px** sans; status dot r=3 (6px); dot↔text gap 10px; horizontal padding **14px**.
- **Center gateway (focal)**: ~**168 × 80px**, padding **16–20px**; line1 `api.nimbus.dev` **mono 14px**; line2 name **13px @ 60% opacity**; line-height 1.5. **One** status indicator only (no duplicate ONLINE pill).
- **Source card**: ~**136 × 76px**, padding **16px**; line1 label **13px @ 55%**; line2 value **15px** sans; line-height 1.45.
- Same tier = identical size + identical padding. Labels centered (`text-anchor:middle`, vertical center = `box_center + 0.35em`).

## Connectors
- **Active path = 1.5px solid accent (gold)** with a **draw-in** (`stroke-dashoffset`), connecting gateway → the ONE active provider.
- **Other paths = 1px SOLID, 25–30% opacity** — *not dashed*.
- Fan: branch point **24px** off the gateway's right edge; cubic Bézier with **horizontal tangents**, control offset ~**40%**. No crossings.
- **Latency badge** on the active card: **11px mono**, height 18px, padding 2px 8px.

## Bottom status strip
- ONE line only: `200 OK · gpt-4o · 412ms · ¥0.0031 · 命中缓存` at **12px mono**, `border-top:1px`, padding-top 14px.
- **Delete** the separate "已接入 / Supported — …" line (it duplicates the provider cards).

## Tally of the fix
1 Pill, 2 node sizes (focal larger by one step), even 12px pitch, 44px cards, 13–15px labels, one active gold path + one badge, single status strip, no nested panel, no duplicate list.

## Scale coupling (CRITICAL — the recurring bug)
SVG `font-size`/coords are in **user units**; the browser scales the whole SVG to fit its container. If the figure column renders narrower than the viewBox, everything (including text) shrinks.
- **Rule**: make **rendered width ≈ viewBox width** (scale ∈ [0.95, 1.05]). Easiest: set the figure column width ≈ the viewBox width (e.g. viewBox 560 → column ~560px), or set `viewBox` width to the actual rendered aside width.
- If a mismatch is unavoidable: **compensate** — `svg_font_size = target_px / scale` where `scale = renderedWidth / viewBoxWidth`. Example: to render 14px with scale 0.75 → use ~18.7 user units.
- Always **verify rendered** computed font-size of hero `<text>` (target ≥13px) via the browser, not from the markup units.

## CJK line breaking
- Headings: `line-break: strict; word-break: keep-all;` so Chinese words never split mid-word; allow Latin/URL to wrap with `overflow-wrap: anywhere` **only** on non-CJK runs.
- Underlines: use real `text-decoration` + `text-underline-offset` (not a border that overlaps glyphs).

## Scale / layout rules (expert-encoded — prevent the oscillation)
1. A text-bearing hero SVG MUST be **measured at 320/375/768/1080/1280**: `scale = renderedWidth/viewBoxWidth ∈ [0.95, 1.05]` and `<text>` computed size **≥13px**. If the container is narrower than ~0.9× the viewBox, **do NOT keep shrinking the same SVG** — switch to a **compact vertical SVG** (same tokens/classes) via `display`.
2. In a single-column layout, a `margin-inline:auto` grid/flex item **must get explicit `width:100%` (+ max-width)** or it collapses to content-min width (the real cause of the size oscillation).
3. **Headline highlight**: `display:inline-block` wrapping only the text; real `text-decoration` + `text-underline-offset ≥ .22em`, `text-decoration-skip-ink:none`; never `display:block` (underline then spans the whole line).
4. **CJK body/lead**: `line-break:strict; word-break:keep-all; text-wrap:pretty`, plus `<wbr>` at phrase boundaries — break only at spaces/punctuation/`<wbr>`.
5. **Inline list separators** must be attached to the item (`li::before`, or `span + span::before`); container `display:flex; align-items:baseline`; never standalone `.sep` nodes (they orphan on wrap).
