---
name: xdesign
description: 以「设计系统」为核心的前端/产品界面设计方法与执行框架。Use when building or redesigning web UI (pages, dashboards, marketing sites, components, settings, forms, empty states), when the user wants a coherent, systematic, low-bug design, when they ask to follow a design system / tokens / style guide, when generating a design-system artifact (system.md / design.md / tokens.css), when they want multiple distinct style directions proposed first, or when they explicitly invoke xdesign or a pixel/retro theme. Emphasizes systematic consistency, token discipline, accessibility, and layout robustness over one-off visual flair.
---

# xdesign

Build interfaces that are **systematic, accessible, and hard to break** — not just pretty.
xdesign is a design-system-first method: intent → memory (system.md) → tokens → build → **deterministic gates** → persist.
It fuses three proven approaches: craft & design-system memory (interface-design), enforced token discipline + gates (hallmark), and multi-direction + pixel aesthetics (huashu-design).

## Core principles (read first)
1. **Systematic by default.** A decision made once becomes a token and lives in `system.md`. New work *matches the system*; it does not reinvent it.
2. **No raw values, ever.** Every color, spacing, radius, font and size references a named token. If a value is needed that isn't a token, **lift it into the token block first**, then use it.
3. **Consistency beats novelty within a project.** Variety happens only when *choosing a direction* (Phase 2). After that, hold the line.
4. **Gates are law.** A build is not done until `references/gates.md` + the checker pass. Fix, don't ship.
5. **Intent must be systemic.** If you say "warm", then surfaces, text, borders, accents, type — all warm. No "it's common" justifications.

## Workflow (7 phases)

### 0 · Pre-flight scan (preserve before you invent)
Read the project first: framework, existing `system.md` / `design.md` / `tokens.css` / DTCG files, font stack, spacing scale, motion stance.
- If a system exists → **read it and defer to it**. Do not overwrite existing tokens.
- State findings briefly, then proceed.
Details: `references/system-memory.md`.

### 1 · Intent (who / task / feel)
Answer compactly: the actual person, the verb they must accomplish, and what it should *feel* like (in real words, not "modern"). If the brief is too vague, ask ONE concise question; otherwise state an assumption and proceed.
Details: `references/intent-and-craft.md`.

### 2 · Memory or Directions
- If `system.md` exists → the system is decided; skip to Phase 3.
- If not → propose **2–3 categorically different directions** (from `references/themes/catalog.md` or a custom theme), each with palette / type / layout sketch. Let the user pick (or pick the strongest if autonomous), then **write `system.md`**.
Details: `references/directions.md`, `references/themes/catalog.md`.

### 3 · Tokens (define the system)
Establish the token taxonomy: color (primitive → semantic → component), spacing (4/8 base), type scale (ratio), radius, elevation, motion.
Hard rule: keystone tokens are referenced by name everywhere downstream.
Details: `references/token-architecture.md`, templates: `templates/tokens.css`.

### 4 · Build
Apply craft: one focal point per view, type-ratio hierarchy (weight+color, not size alone), decided density, uneven spatial rhythm, 60/30/10 color, subtle layered elevation, optical sizing.
Use existing components/tokens before hand-rolling. Extract on second reuse.
Details: `references/intent-and-craft.md`.
**Pixel/retro briefs**: load `references/themes/pixel.md`.

### 5 · Gates + Checker (not done until green)
Run the deterministic checks and fix every failure:
- static: `node scripts/dscheck.mjs <file.html>` (raw values, off-grid spacing, font families, `!important`)
- layout/a11y: overflow at 320/375/768/1280 + axe-core (via the Playwright MCP), saved to a metrics JSON
- score: `node scripts/measure.mjs <dscheck.json> [browser-metrics.json]`
Details: `references/gates.md`.

### 6 · Persist
- Write/update `system.md` with newly decided patterns and decisions (record the *why*).
- Optionally emit a portable `design.md` (DTCG-flavored) and updated `tokens.css`.
Details: `references/system-memory.md`, templates: `templates/system.md`, `templates/design.md`.

## Reference index
- `references/intent-and-craft.md` — hierarchy, density, rhythm, layering, craft rules
- `references/token-architecture.md` — token taxonomy + the "no raw values" rule
- `references/system-memory.md` — system.md format, drift/consistency checks
- `references/gates.md` — deterministic gates + checker usage
- `references/directions.md` — propose 2–3 directions, then commit
- `references/study.md` — extract DNA from a URL/screenshot into design.md
- `references/themes/catalog.md` — starter theme catalog
- `references/themes/pixel.md` — pixel/8-bit mode (CJK-aware)
- `references/harness.md` — measurement pipeline (dscheck/browser/bench/measure) & improvement loop
- `references/style-exemplars.md` — style north-star: learn from interface-design (E1/E2) & huashu-design (E3)
- `references/svg-illustration.md` — how to draw high-quality hero SVG illustrations (geometry, primitives, anti-slop) + `templates/svg-kit.md`
- `references/svg-hero-spec.md` — **general hero-figure method**: pick an archetype from the product's own subject (hub-and-spoke / pipeline / split-contrast / metric / list→detail / timeline / map / stack), plus construction, scale-coupling and bounded-density rules
- `references/svg-decoration-motion.md` — decorative depth (glow/grain/volumetric) + motion (flow/draw-in/parallax) recipes + `templates/svg-motion-kit.md`
- `references/svg-top-projects.md` — hard rules distilled from the top-starred SVG/diagram projects (spacing, centering, z-order, hero checklist)

## Style north-star (read `references/style-exemplars.md`)
These bias the **visual style**, but the brief's world + Phase-2 intent decide the direction — E1 is a sensible default for non-pixel work, **not a mandate** (a coffee shop, a sleep app and a B2B SaaS should not all look identical). Whatever the direction:
- **Non-pixel (default → E1)** interface-design R1「Ink & Brass」: warm dark ground, one brass accent, border-led depth (few shadows/gradients), a single parchment inset data surface, serif+sans+mono roles, tabular numerals, a product-specific signature motif.
- **Pixel → E3** huashu-design R2: **gold-led** multi-hue palette, **`ZCOOL QingKe HuangYou` for Chinese display**, hard 1:1 shadows + crispEdges (E2 is the more restrained fallback).

## Non-goals
- Not for backend/non-UI work.
- Not for "just make it pop" with no system: if there is no system, build one first (Phase 2–3).
