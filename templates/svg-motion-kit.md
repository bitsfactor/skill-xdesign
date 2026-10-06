# SVG Motion & Decoration Kit — copy-paste (reduced-motion safe)

## Noise grain (inline SVG data URI) + soft-light layer
```css
.hero{position:relative;overflow:hidden;background:var(--bg)}
.hero-glow,.hero-dots,.hero-noise{position:absolute;inset:0;pointer-events:none}
.hero-glow{background:radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 45%)}
.hero-dots{
  opacity:.20; background-image:radial-gradient(circle, color-mix(in srgb, var(--text) 22%, transparent) 1px, transparent 1px);
  background-size:24px 24px; -webkit-mask-image:linear-gradient(to bottom,#000,transparent 80%); mask-image:linear-gradient(to bottom,#000,transparent 80%);
}
.hero-noise{opacity:.05;mix-blend-mode:soft-light;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
@media (prefers-reduced-motion: reduce){ .hero-glow,.hero-dots{animation:none} }
```

## Connector flow (dash) + draw-in
```css
.flow{stroke-dasharray:8 4;animation:flow var(--flow,2s) linear infinite}
@keyframes flow{to{stroke-dashoffset:-24}}
.draw{stroke-dasharray:1;stroke-dashoffset:1;animation:draw .9s var(--ease-out) forwards}
@keyframes draw{to{stroke-dashoffset:0}}
.flow,.draw{fill:none}
@media (prefers-reduced-motion: reduce){ .flow{animation:none;stroke-dasharray:none} .draw{animation:none;stroke-dashoffset:0} }
```

## Entrance (opacity-first; safe for SVG groups)
```css
.enter{opacity:0;animation:enter .5s var(--ease-out) forwards}
.enter-2{animation-delay:.12s}.enter-3{animation-delay:.24s}.enter-4{animation-delay:.36s}
@keyframes enter{from{opacity:0}to{opacity:1}}
/* If you MUST move an SVG group, use fill-box so CSS transform doesn't clobber SVG transform: */
.layer{transform-box:fill-box;transform-origin:center}
@media (prefers-reduced-motion: reduce){ .enter{animation:none;opacity:1} }
```

## Status pulse + hover glow
```css
.dot{animation:pulse 3.2s var(--ease-in-out) infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
.card rect{transition:filter .25s ease}
.card:hover rect{filter:drop-shadow(0 0 8px color-mix(in srgb, var(--accent) 40%, transparent))}
@media (prefers-reduced-motion: reduce){ .dot{animation:none} .card rect{transition:none} }
```

## Layered parallax entrance (hero)
```css
.px{transform-box:fill-box;transform-origin:center;opacity:0;animation-fill-mode:forwards}
.px-back{animation:pxBack 1.2s cubic-bezier(.2,.8,.2,1) .05s forwards}
.px-mid{animation:pxMid .95s cubic-bezier(.2,.8,.2,1) .15s forwards}
.px-front{animation:pxFront .75s cubic-bezier(.2,.8,.2,1) .22s forwards}
@keyframes pxBack{from{opacity:0;transform:translate(-28px,18px) scale(.985)}to{opacity:1;transform:none}}
@keyframes pxMid{from{opacity:0;transform:translate(-18px,12px) scale(.99)}to{opacity:1;transform:none}}
@keyframes pxFront{from{opacity:0;transform:translate(-10px,8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){ .px{animation:none;opacity:1;transform:none} }
```

## Rules
- ≤2 simultaneous motion types; ≤8s total; no >3Hz flashing.
- One accent, ONE focal. Decoration stays behind content (`pointer-events:none`, `aria-hidden`).
- Reduced-motion shows the **complete** static frame.
