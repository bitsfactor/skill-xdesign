---
name: xdesign
description: A repeatable 3-phase method (Analyze → Ideate → Draw) for designing web pages/UI and their hero figure, so the result is systematic, accessible, and robust. Use when building or redesigning a page, dashboard, landing page, component, or an SVG hero/diagram. The output of this skill is the PROCESS below.
---

# xdesign — design by method, not by vibes

A page made with this method should beat the same model prompting with no method. Three phases; do not skip 1–2.

## Phase 1 · Analyze the brief
Write these, briefly:
1. **Who / task / feel** — the real user; the verb they must accomplish; the feeling (real words, not "modern").
2. **Core mechanism** — ONE sentence: what the product actually does (the recurring action, not marketing).
3. **Must communicate (≤3)** — the three things the first screen must land.
4. **Constraints** — brand, must-keep, platform, language (default Chinese primary).
If the brief is vague: ask ONE question, or state an assumption and proceed.

## Phase 2 · Ideate the concept (step by step)
1. **Roles** — list the concrete nouns the mechanism implies: the focal thing, its source/trigger, the set it comes from, a number/value, a sequence, a place.
2. **Figure grammar** — pick ONE (default **hub-and-spoke**):
   hub-and-spoke (one focal among many) · pipeline (ordered stages) · split-contrast (before/after) · metric panel (numbers/trend) · list→detail (a catalogue) · timeline (over time).
3. **Map** — assign the product's REAL nouns/values to the grammar's slots (source→hub→leaf, stage→stage…). Every slot filled with a real noun.
4. **Focal** — choose the ONE element that gets the accent; everything else is muted.
5. **Concept in words first** — write one paragraph describing the figure as a picture ("a plan card feeds a focal bean card, which fans out to four origins with altitudes…"). If the words aren't clear, the SVG won't be.
6. **Direction** — choose a palette + 2–3 type faces from the brief's world; write them as tokens. Hold one direction.

## Phase 3 · Draw (constraints & techniques)
**Layout** — 4px grid; one focal point per view; hierarchy by weight + color (not size alone); decided density; 60/30/10; consistent radii/space tokens.
**Hero figure** — exact construction in `references/figure-recipes.md`. Essentials: one accent; focal clearly the heaviest; ≤2 text lines per node; each leaf carries a real value; fill ~85% of the frame; no empty quadrant; connectors never cross; hero text ≥13px **rendered**; wrap it in a frame (subtle panel + hairline top bar [label + one live status] + telemetry strip [3–5 real facts]).
**SVG** — rect/circle/path/text only; coords on the 4-grid; colors/fonts via tokens (`var()`); `role="img"` + `aria-labelledby`; decorative → `aria-hidden`; optional draw-in motion that respects `prefers-reduced-motion`.
**Type / color** — ≤3 families in roles (display / body / mono); every value a token; text contrast ≥ 4.5:1.
**Robustness** — no horizontal overflow at 320/375/768/1280; touch targets ≥ 44px; a working mobile nav; reduced-motion honored; anchors not hidden behind a sticky header.
**Anti-slop** — no emoji / raster / clipart in the hero; no gradient-on-everything; no "3 grey circles" placeholder; no duplicated content; no decorative texture behind text.

## Self-check (before "done")
- [ ] Phase 1 answered in writing; the figure depicts the core mechanism with the product's own nouns.
- [ ] One focal; one accent; each leaf has a real value; ≤2 lines per node.
- [ ] Rendered hero text ≥13px; `scale = renderedWidth/viewBoxWidth ∈ [0.95, 1.05]` at 320/375/768/1280.
- [ ] No overflow at 320/375/768/1280; contrast ≥4.5; reduced-motion; mobile nav works.
- [ ] No raw values (all via tokens); ≤3 font families; no `!important`.

## Non-goals
Backend/non-UI work; or "just make it pop" with no brief/system.
