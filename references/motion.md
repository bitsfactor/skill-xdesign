# Motion — animate the mechanism (learned from interface-design)

Subtle, purposeful, looping signals that show the product *working*. Everything must be disabled under `prefers-reduced-motion`.

## The 5 recipes (reuse these)
1. **beat** — a live status dot breathes: `opacity 1↔.45`, 2.4s ease-in-out infinite.
   `@keyframes beat{0%,100%{opacity:1}50%{opacity:.45}}`
2. **travel** — a packet moves along a connector (a request in flight): a small chip riding the line, `left:-4%→100%` with fade at the ends, 2.2s linear infinite; stagger copies with `animation-delay:1.1s`.
   `@keyframes travel{from{left:-4%;opacity:0}12%{opacity:1}88%{opacity:1}to{left:100%;opacity:0}}`
3. **dash** — flow on an SVG connector (marching dashes): `stroke-dasharray:5 7` + `animation:dash 1.3s linear infinite`; `@keyframes dash{to{stroke-dashoffset:-24}}`.
4. **sweep** — a highlight sweeps across a metric bar: a gradient overlay, `translateX(-100%)→220%`, 2.4s ease-in-out infinite.
5. **sheet** — an entrance for menus/popovers: `opacity 0→1, translateY(-6px) scale(.98)→none`, **.22s `cubic-bezier(.23,1,.32,1)`**.
Plus: section reveals `translateY(10px)+opacity→none`, staggered via a `--i` index × ~80ms; hovers .15–.2s.

## Rules
- Animate the **mechanism** (a request travels, data flows), NOT decoration for its own sake.
- **One or two loops per figure, max.** Subtle (opacity/translate); never spin, bounce, or shake.
- Durations: entrances ~120–420ms (ease-out); loops 1.3–2.4s (linear/ease-in-out).
- **Always** add: `@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}`.

## Reveal rule — NEVER hide content at rest (the "blank page" bug)
Do not gate real content on JS/scroll. A full-page screenshot (or a no-JS visitor) must show everything.
- Content is **visible by default**. A scroll reveal may only be a *progressive enhancement*: animate `transform` (and at most fade from ≥0.001 opacity), and add the `.in` class to **all** reveal elements on load (not only on scroll), with a `@media (scripting: none){.reveal{opacity:1}}` fallback.
- Simplest safe option: **skip opacity-0 reveals entirely**; just animate the hero, or animate `translateY` on already-opaque elements.
- The geometry audit flags any text element with `opacity:0` at rest — treat that as a bug.
