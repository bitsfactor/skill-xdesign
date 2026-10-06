# Figure recipes — illustrate the product's real objects

**Method**: draw the product's actual objects (bag, card, cup, beans, phone, document…) as **flat SVG** in a tight token palette, and use them **across sections** — hero = the main artifact, other sections = supporting artifacts. **No gradients**; definition comes from a **stroke in a darker shade**. One accent color.

## A. How to build any object (4 parts + props)
Size the `viewBox` so the object fills ~80% of the height; center it with generous margin.
1. **Ground shadow** — `<ellipse fill=ink opacity=.08>` under the object, so it sits.
2. **Body** — a filled `<path>`/`<rect>` in the object's tone **+ a 1–1.5px `<stroke>` in a darker shade of the same hue**. The stroke is the silhouette.
3. **ONE defining feature** (what makes it recognizable):
   - coffee bag → a **crimp band** (darker rect) + ~13 thin vertical **ridge lines** + 2 vertical **fold lines**.
   - cup → a tapered **body path** + a **handle arc** + 2 **steam curves**.
   - card → a rounded rect + small **chip squares** + thin **rule lines** + right-aligned mono values.
4. **Label / face** — a lighter rect carrying **real data**: a display-face brand + mono lines + a divider rule.
5. **Props (1–3)** — small repeated glyphs from the product's world, slightly rotated, e.g. a **bean**:
   `<g transform="translate(x y) rotate(θ)"><ellipse rx=15 ry=10/><path d="M-12 0 Q0 -7 12 0" fill=none stroke/></g>`
Theme everything with tokens, e.g. `.art__pouch{fill:var(--clay);stroke:var(--clay-deep)}`.

## B. Where to put them
- **Hero**: the **main artifact** (the bag / the device / the document).
- **A following section** (product/spec/feature): a **supporting artifact** (the brew card + cup / a phone screen / a form).
Keep identical style + palette so they read as one system; an illustration may sit on a soft tinted panel.

## C. Worked example — coffee subscription (viewBox 400×470 hero · 420×340 section)
- **Hero = the bag**: shadow(`cy 448`) → a brew card peeking behind (rotated −7°: rect 118×160 + chip circle + 4 rules) → pouch body path (w216 h270, rounded bottom) + 2 fold lines → crimp band (h34) + 13 ridges → label (136×150): `第 07 期 · 秋` / **Morrow** (display 30) / rule / `耶加雪菲` / `日晒 · 200 G` → 3 beans at the base.
- **Section = the brew card + cup**: shadow → card (208×256): mono title + rule + **4 rows** (chip 30×30 + mono value + rule) → cup (`translate(340 210)`: body path + handle arc + 2 steam) → 2 beans.
- **Palette (oklch, warm)**: paper `95.5% .022 92` · ink green `24% .052 152` · accent leaf-green `47% .13 140` · accent-2 clay `54% .14 46` · body clay `74% .055 58` · stroke clay-deep `50% .075 50`.
- **Type**: serif display (Noto Serif SC) · sans body (Noto Sans SC) · mono data (Geist Mono).

## D. Cross-domain artifacts (same 4 parts + props)
- sleep app → a **phone** (rounded rect + screen) glowing at night + a crescent + 3 wave lines.
- B2B audit SaaS → a **document stack** (2–3 offset rects) + an accent **seal** circle + a checklist row.
- food/bakery → the **box/loaf** + a torn label + 2–3 crumb dots.

## E. Diagrams (ONLY when the product has no physical object)
APIs/platforms: hub-and-spoke (focal hub + identical leaves + an accent path, no crossings) · pipeline · split-contrast · metric · list→detail · timeline. Same discipline: one accent, real values, fill the frame, ≤2 text lines per node.

## F. Density · frame · scale · CJK
- **Density**: no empty quadrant ≥25%; ≤~14 in-figure `<text>` items; exactly ONE strong element; no low-contrast 12px filler.
- **Frame** (optional): subtle panel + 1px border + radius; hairline top bar (label + one status) + a telemetry strip of 3–5 real facts.
- **Scale coupling**: make rendered width ≈ viewBox width (`scale ∈ [0.95,1.05]`); verify rendered hero `<text>` ≥13px.
- **CJK**: `line-break:strict; word-break:keep-all`; real `text-decoration` + `text-underline-offset`; single-column `margin-inline:auto` items need `width:100%`.
