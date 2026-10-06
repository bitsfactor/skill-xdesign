# SVG Kit — copy-paste primitives (4-grid, token-driven, accessible)

All coordinates divisible by 4. Colors/fonts via tokens. Icons 24×24. Decorative parts `aria-hidden`.

## Icon (24×24 outline, currentColor)
```html
<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
     stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
  <path d="M4 12h12M12 6l6 6-6 6"/>
</svg>
```

## Hero skeleton (640×400) — instantiate for the product
This is an **example shape only**. Replace every `‹…›` with the product's real nouns; pick the archetype from `svg-hero-spec.md` §0 (do not ship this verbs/labels as-is).
```html
<svg viewBox="0 0 640 400" role="img" aria-labelledby="hT hD" width="100%" height="auto">
  <title id="hT">‹product's one-line mechanism›</title><desc id="hD">‹what the figure shows›</desc>
  <defs>
    <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="var(--accent)" stop-opacity=".0"/>
      <stop offset="1" stop-color="var(--accent)" stop-opacity=".5"/>
    </linearGradient>
  </defs>

  <!-- source / stage node -->
  <g><rect x="24" y="176" width="120" height="48" rx="8" fill="var(--surface-2)" stroke="var(--line)"/>
     <text x="84" y="204" text-anchor="middle" font-family="var(--font-body)" font-size="13" fill="var(--text)">‹source›</text></g>

  <!-- focal node (accent) -->
  <g><rect x="256" y="168" width="128" height="64" rx="12" fill="var(--accent-soft)" stroke="var(--accent)"/>
     <text x="320" y="204" text-anchor="middle" font-family="var(--font-body)" font-size="14" fill="var(--text)">‹focal›</text></g>

  <!-- connectors: distinct ports, never through a node, no crossings -->
  <path d="M144 200 C 200 200 200 200 256 200" fill="none" stroke="var(--line-strong)" stroke-width="2"/>
  <path d="M384 200 C 440 200 440 96 496 96" fill="none" stroke="var(--line-strong)" stroke-width="2"/>
  <path d="M384 200 C 440 200 440 304 496 304" fill="none" stroke="var(--line-strong)" stroke-width="2"/>

  <!-- leaves / stages on grid -->
  <g><rect x="496" y="72" width="120" height="48" rx="8" fill="var(--surface)" stroke="var(--line)"/>
     <text x="556" y="100" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--text-muted)">‹leaf A›</text></g>
  <g><rect x="496" y="176" width="120" height="48" rx="8" fill="var(--surface)" stroke="var(--line)"/>
     <text x="556" y="204" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--text-muted)">‹leaf B›</text></g>
  <g><rect x="496" y="280" width="120" height="48" rx="8" fill="var(--surface)" stroke="var(--line)"/>
     <text x="556" y="308" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--text-muted)">‹leaf C›</text></g>
</svg>
```

## Connector draw-in (optional, reduced-motion safe)
```css
@media (prefers-reduced-motion: no-preference){
  .beam{stroke-dasharray:var(--len,240);stroke-dashoffset:var(--len,240);animation:draw .9s var(--ease-out) forwards}
  @keyframes draw{to{stroke-dashoffset:0}}
}
```

## Rules cheat-sheet
- Divisible by 4: x/y/width/height/rx/cx/cy/r and gaps.
- 1–2 focal nodes (accent), rest muted.
- labels inside canvas; connectors hit distinct ports; no overlap through nodes.
- meaningful svg: `role="img"` + `aria-label`/`aria-labelledby`; decorative: `aria-hidden`.
