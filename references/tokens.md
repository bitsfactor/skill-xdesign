# Tokens & normalization — xdesign's backbone

**One rule matters more than all others: everything references a token; no raw values outside `:root`.** This is what makes our pages align on the first try and eliminates misalignment, overlap, spacing and font bugs.

## The token block (define this FIRST, before any component)
```css
:root{
  /* color: primitives -> semantic (use YOUR palette; keep the layering) */
  --ink-900:#141210; --ink-800:#1c1916; --ink-700:#26221d;
  --cream-100:#f4ecdb; --cream-300:#c3b8a3; --cream-500:#8f836f;
  --clay-400:#b98a5e; --clay-600:#7a5230; --leaf-500:#7ea86a;
  --bg:var(--ink-900); --surface:var(--ink-800); --surface-2:var(--ink-700);
  --text:var(--cream-100); --text-muted:var(--cream-300); --text-dim:var(--cream-500);
  --border:rgba(244,236,219,.10); --border-strong:rgba(244,236,219,.22);
  --accent:var(--clay-400); --accent-ink:#141210; --ok:var(--leaf-500);

  /* space — ONE scale, 4px base */
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-5:24px; --space-6:32px; --space-7:48px; --space-8:64px; --space-9:96px;

  /* radius — one scale */
  --radius-sm:8px; --radius-md:14px; --radius-lg:20px; --radius-pill:999px;

  /* type — a FIXED set of steps + roles */
  --text-xs:12px; --text-sm:14px; --text-base:16px; --text-lg:18px;
  --text-xl:22px; --text-2xl:28px; --text-3xl:38px; --text-4xl:52px;
  --leading-tight:1.12; --leading-body:1.6;
  --font-display:'Noto Serif SC',Georgia,serif;
  --font-body:'Noto Sans SC',system-ui,sans-serif;
  --font-mono:'Geist Mono',ui-monospace,monospace;

  /* elevation + motion — one or two of each */
  --shadow-1:0 1px 2px rgba(0,0,0,.35);
  --shadow-2:0 24px 56px rgba(0,0,0,.42);
  --dur:.2s; --ease:cubic-bezier(.2,.7,.2,1);
}
```

## Rules (non-negotiable)
1. **No raw values outside `:root`.** Every `color` / `background` / `border-color` / `padding` / `margin` / `gap` / `font-size` / `border-radius` uses a token. Need a new value? **Add it to the block first**, then use it.
2. **Spacing only from the scale.** No arbitrary `margin:7px`. A 4px base is why everything lines up.
3. **≤3 font families**, in roles (display / body / mono); sizes only from the fixed steps → no font drift.
4. **One radius scale, ≤2 shadows, one easing.**
5. **Semantic names in components** (`var(--surface)`, not `var(--ink-800)`).
6. **Contrast from the palette**: body text ≥ 4.5:1, large text ≥ 3:1. Choose the pair once, reuse it.
7. **States are tokens too**: hover/active/focus/disabled use `--accent`/`--accent-ink`/`--focus`, never ad-hoc colors.

## Why it buys us correctness
Because spacing, type and color are **quantized and named**, elements align on the first try and never drift → **no misalignment, no overlap, no spacing bugs, no font drift**. That is xdesign's core advantage — keep it strict; it is not optional.

## Quick self-check
- [ ] Every style value is a token (grep the file for `px`/`#`/`rgb(` **outside** `:root` — should be none, except `0`, `1px` hairlines, `100%`, `auto`).
- [ ] Spacing values ∈ the scale; font sizes ∈ the steps; families ≤ 3.
- [ ] Body contrast ≥ 4.5:1.
