# Illustration system — from a theme to an illustration-rich page

## 0. The idea
A good page is **one visual world**, and it is **illustration-rich**: a big hand-drawn SVG in the hero, a medium one in the next section, and small line glyphs/motifs throughout — all drawn from the theme's own objects and colors. One lonely diagram in a corner is not it.

## A. From theme → page (the page layer)
1. **Theme → world**: from the brief, write the theme's **materials, objects, colors, and ONE motif**.
   (coffee → kraft/clay brown + cream paper + green ink; objects: bag, brew card, cup, beans; motif: the bean seam.)
2. **Pick 3–5 artifacts** to illustrate: the **main** one + 2–4 **supporting** ones.
3. **Assign artifacts to sections, big → small** (the rhythm that reads as "designed"):
   - **Hero**: headline + lede + CTA + the **main artifact** (largest SVG, ~half the hero).
   - **Section 2** (diptych; art one side, a spec list the other): a **supporting artifact**.
   - **Section 3** (features): 3 short columns, each with a **small line-icon** from the world.
   - **Section 4** (proof): a pull-quote; optional tiny motif.
   - **Footer**: a short sign-off.
4. **One palette + 3 type roles**: paper/ink + ≤2 accents; display (serif) / body (sans) / mono (data). Everything tokenized.
5. **Repeat ONE motif** (the bean, a stitch, a wave) across the SVGs and icons, so the page reads as one world.

## B. How to draw a good SVG (the SVG layer)
Build from primitives only (`rect`/`circle`/`path`/`line`/`text`), **flat**, and **themeable via tokens**.
1. **Silhouette first** — the shape must read as the object even in a solid tone. Body = a filled path/rect **+ a 1–1.5px stroke in a darker shade of the same hue**.
2. **ONE defining detail** — the feature that names the object: bag → crimp band + ridge lines; cup → handle arc + steam; phone → screen + notch; doc → a torn corner.
3. **Flat tones for depth — NO gradients**: 2–3 tones from the palette (body, a darker feature, a lighter label). A single highlight, if any.
4. **Ground it** — a soft shadow ellipse under the object (opacity ~.08).
5. **Props / motifs** — 1–3 small repeated glyphs (beans, crumbs), slightly rotated.
6. **Real content on it** — a label with a display-face brand + mono values (real data), a divider rule.
7. **Grid + margins** — coordinates on a 4px grid; object ~80% of the height, centered, generous margin.
8. **Restraint** — no gradients, no shadow stacks, no clipart, no emoji, no raster, no texture behind text.
9. **Theme it** — `.art__pouch{fill:var(--clay);stroke:var(--clay-deep)}` so tokens drive all color.

## C. Reusable part library (compose these everywhere)
- **bean**: `<g transform="translate(x y) rotate(θ)"><ellipse rx="15" ry="10"/><path d="M-12 0 Q0 -7 12 0" fill="none" stroke/></g>`
- **cup**: body path (tapered) + handle arc + 2 steam curves.
- **card / label**: rounded rect + chip squares + rule rows + right-aligned mono values.
- **bag**: crimp band (darker) + ridge lines + 2 fold lines + body path + a label rect.
- **document**: 2–3 offset rects + chip lines; **seal**: circle + inner ring + a glyph.
- **line icon** (for features): 24×24, `stroke:currentColor`, stroke-width 1.5–2, no fill, drawn from the same world.
Each section composes a few of these — this is how you get *more* SVG without noise.

## D. Cross-domain artifacts (same recipe)
- sleep app → phone (rounded rect + screen glow) + crescent + 3 wave lines.
- B2B audit SaaS → document stack + accent seal + checklist row.
- bakery/food → box or loaf + a torn label + 2–3 crumb dots.

## B2. Hero patterns — what to draw (by product type)
- **App / software** → a **device or window mockup showing the app's REAL screen** (real data: a score, a chart, rows) **+ 1–2 floating chips**. (A sleep app = a phone with the sleep report.)
- **Physical product** → the object **+ a secondary card** (a tilted label / recipe card overlapping it) **+ a small status tag** + 2–3 scattered props + ground shadow.
- **Abstract (API / platform)** → a **console / diagram with real data** — and keep it **light + refined** (see §E), not a neon "AI" dark UI.
Richer reads better: object + secondary card + tag + props, generous whitespace, ONE accent.

## B3. Figure type scale — small and refined (秀气)
Text INSIDE the figure must be **small and precise**, never big. Big display type belongs to the page headline.
- labels / eyebrows / pills **10–12px** · node names **12.5–14px** · values **13–15px** · figure brand **≤ 22px** · hairlines 1px · tabular numerals for data.
- Prefer **more small, well-spaced lines** over a few big ones. Figure text must never dominate.

## E. Diagrams (ONLY when the product has no physical object)
hub-and-spoke (focal hub + identical leaves + one accent path, no crossings) · pipeline · split-contrast · metric · list→detail · timeline. Same discipline: one accent, real values, fill the frame, ≤2 text lines per node.

## F. Density · frame · scale · CJK
- **Density (both ways)**: don't leave an empty quadrant ≥25% or a floating lone SVG; but keep ≤~14 in-figure `<text>` items and exactly ONE strong element. Real data ≥13px, or cut it.
- **Frame** (optional): subtle panel + 1px border + radius; hairline top bar (label + one status) + a telemetry strip of 3–5 real facts.
- **Scale coupling**: rendered width ≈ viewBox width (`scale ∈ [0.95,1.05]`); verify rendered hero `<text>` ≥13px.
- **CJK**: `line-break:strict; word-break:keep-all`; real `text-decoration` + `text-underline-offset`; single-column `margin-inline:auto` items need `width:100%`.
