# Gates & Checker

Source: hallmark slop-test gates + responsive hard gates; Project Wallace code-quality; axe-core.

A build is **not done** until every gate passes. Fix, don't ship.

## Hard gates (fail = not done)
1. **No horizontal overflow** at 320 / 375 / 768 / 1280 px. `html, body { overflow-x: clip }` (never `hidden`).
2. **No raw values** bypassing tokens (colors / lengths / font-family / font-size). Everything references a named token.
3. **Spacing on the grid** — all spacing values are multiples of the base (4 or 8px).
4. **Font discipline** — ≤ 3 font families; no Inter/Roboto/Arial/Space Grotesk/system-ui as the applied face.
5. **No `!important`.** Solve with structure/specificity.
6. **Accessibility floor** — `lang`, `<title>`, one `<h1>`, visible `:focus-visible`, `prefers-reduced-motion` handled, semantic landmarks; axe-core: **0 critical / 0 serious** violations.
7. **No two-line clickable text** — buttons, primary nav links, CTAs stay single-line.
8. **Image-bearing grid tracks** use `minmax(0, 1fr)` (never bare `1fr`).
9. **Long words wrap** — display headers use `overflow-wrap: anywhere; min-width: 0`.
10. **306/contrast** — body text ≥ 4.5:1; large text ≥ 3:1.
11. **Hero imagery** — the first screen is led by a product-specific **inline-SVG illustration/diagram**, NOT a code/terminal block. `dscheck` gate `heroImagery`: `heroSvg ≥ 1` and `heroPre === 0`. Code samples go below the fold. Use imagery generously (icons/diagrams); avoid empty space and grey placeholder graphics.
12. **SVG quality** — hero SVG has `viewBox` + `role="img"` + accessible name; **all geometric coords divisible by 4**; ≥6 primitives (not a placeholder); labels via in-SVG `<text>`; no raster `<image>`; restrained gradients/filters; 24×24 icons. Check with `node scripts/svgcheck.mjs <file.html>` (`heroGridAligned`, `heroAccessible`, `richIllustration`, `noRaster`). Method: `references/svg-illustration.md`.

## How to run
- Static discipline:
  `node scripts/dscheck.mjs <file.html>` → JSON (raw values, off-grid, fonts, !important, hero composition)
- SVG quality:
  `node scripts/svgcheck.mjs <file.html>` → JSON (viewBox, role/aria, 4-grid adherence, primitives, no raster)
- Layout + a11y (via the Playwright MCP):
  - set viewport 1280×900 → screenshot + `documentElement.scrollWidth > clientWidth` check
  - set viewport 390×800 → same; repeat 375 / 768
  - inject axe-core (`https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js`) → `axe.run(document,{resultTypes:['violations']})`
  - save `{ overflow:{...}, axe:{critical,serious,moderate,minor} }` to a metrics JSON
- Score:
  `node scripts/measure.mjs <dscheck.json> [browser-metrics.json]`

## Scoring (v2, 0–10)
`score = 10 × (0.28·token + 0.14·spacing + 0.12·type + 0.12·cssQ + 0.18·axe + 0.16·robust)`
- token = var() refs ÷ (refs + raw colors + raw lengths)
- spacing = on-grid fraction × scale-convergence
- type = f(font-family count, font-size count) − banned penalty
- cssQ = 1 − !important penalty − size penalty
- axe = 1/(1 + (crit×4+serious×2+mod×1+min×0.5)/12)
- robust = 0 if any overflow, else 1 minus missing focus/reduced-motion/lang/title

Target: **≥ 9.0**, all hard gates green.
