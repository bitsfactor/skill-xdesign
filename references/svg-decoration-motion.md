# SVG Decoration & Motion — tasteful depth + animation

Sources: llamapress "Textured Section Backgrounds", Smashing "Magical SVG techniques", daniel.do "noisy SVGs", ink-graph `animations.md`, diagram-design `animation.md`, svg-animation.com parallax hero, tgmarinho volumetric hero.
Principle: **decoration is felt, not seen** (opacity is the whole game); **motion explains, never decorates-and-distracts**, and always respects `prefers-reduced-motion`.

## A. Decoration — the "premium dark hero" recipe (3 stacked layers)
On a dark section (`bg` token), stack behind content:
1. **Radial glow** at top: `background: radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 45%)`.
2. **Fading dot grid**: `radial-gradient(circle, color-mix(in srgb, var(--text) 22%, transparent) 1px, transparent 1px)` at `background-size:24px 24px` + **mask fade** to bottom. Opacity ~20%.
3. **Noise grain 3–5%**: inline SVG `feTurbulence` data-URI, `mix-blend-soft-light`, `opacity:.05`.
- **Opacity is the whole game**: noise 2–5% on dark; dot/line patterns keep color ≤10%. *If you notice the texture, halve the opacity.*
- Always ship `-webkit-mask-image` with `mask-image` (else fade silently disappears on Safari).
- Texture **only the hero** (one mid-page break max). Textured-everywhere = demo page.
- **Text needs a landing zone**: never put small text directly on a busy pattern — mask-clear the center or put a glass panel behind.

## B. Decoration — volumetric light & grainy gradients
- **Volumetric beam:** stack **5 radial-gradient blooms** at slightly different offsets/sizes + one `feTurbulence`+`feDisplacementMap` layer. Displacement `scale≈14` (NOT 180 — high scale = coffee-stain blotches), `feGaussianBlur stdDeviation=.8`. White/neutral light, at most a sliver of accent at the tail.
- **Grainy gradient:** `feTurbulence type=fractalNoise baseFrequency=".8" numOctaves="2"` → `feColorMatrix saturate 0` → blend under the gradient at 8–12%.

## C. Motion — primitives (copy-paste in `templates/svg-motion-kit.md`)
- **Connector flow** (data moving): `stroke-dasharray:8 4; animation: flow 2s linear infinite; @keyframes flow{to{stroke-dashoffset:-24}}`.
- **Draw-in** (route appears): duplicate path `pathLength="1"` + `stroke-dasharray:1; stroke-dashoffset:1` → animate to 0, `800ms` staggered.
- **Entrance**: opacity + small `translateY(8–14px)`; **opacity-only for SVG-positioned groups** (CSS transform overrides SVG `transform`; if you must move, use `transform-box:fill-box; transform-origin:center`).
- **Pulse** on a status dot (subtle `box-shadow`/`r`), **hover glow** (`filter: drop-shadow`), **hover lift** (`translateY(-3px)` on the inner shape only).
- **Layered parallax drift** (hero): bg/mid/fg groups move at different speeds/distances — bg 1.2s/−28px, mid .95s/−18px, fg .75s/−10px, all `cubic-bezier(.2,.8,.2,1)`, one-time.

## D. Motion rules (non-negotiable)
- One mode per figure: **none | reveal | step | loop** (default none; only `loop` repeats; `reveal` runs once and ends complete).
- Nothing flashes/luminance-changes > 3×/s. No bounce/shake/parallax-jitter/indefinite blink. Total autoplay ≤ 8s.
- 160–600ms transitions, 400–1200ms holds; don't animate `viewBox`/layout/connector routes/semantic text.
- **Static-first**: the complete frame must exist without motion; `prefers-reduced-motion: reduce` → disable/short-circuit and show the complete frame (`animation-duration:.001ms`).
- Decorative layers `aria-hidden="true"`.

## E. Checker targets
`svgcheck.mjs` reports `hasMotion`, `reducedMotionSafe`, `gradients`, `filters`; `browser.mjs` verifies reduced-motion disables animation. Aim: hero has ≥1 subtle motion (flow or draw-in) + ≥1 decoration layer (glow/grain), with `reducedMotionSafe = true`.
