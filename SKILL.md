---
name: xdesign
description: A repeatable method (Analyze → Ideate → Draw) for designing web pages/UI and their hero image, built on a strict design-token backbone so the result is systematic, aligned, and bug-free — better than prompting the model with no method. Use when building or redesigning any page, landing page, dashboard, component, or illustration. The output of this skill is the PROCESS below.
---

# xdesign — design by method, not by vibes

Three things carry xdesign, **in this order**:
0. **NO VISUAL BUGS — our first principle.** Geometry must be correct: every `<text>` fits its node and is centered, nothing overlaps, same-tier nodes are equal with even gaps, everything sits on the 4px grid, no page overflow, hero text ≥13px. **A build is not done until the geometry audit (`references/verify.md`) returns 0 bugs at 320/375/768/1280.** Token discipline is necessary but NOT sufficient — it governs *where values come from*, not *whether the geometry is right*.
1. **A strict token backbone** — every value is a token; spacing/type/color quantized. (`references/tokens.md`)
2. **A literal, illustration-rich hero** — a drawn object from the product's world, not a flow-chart. (`references/illustration.md`)

## Phase 1 · Analyze the brief
1. **Who / task / feel** — the real user; the verb they must accomplish; the feeling (real words, not "modern").
2. **Core mechanism** — ONE sentence: what the product actually does.
3. **The product's world** — 3–6 concrete things: physical objects, the moment of use, the artifact it produces. (coffee → 咖啡袋、滤杯、冲煮卡、清晨的杯子; sleep app → 床、波形、月亮; B2B audit → 文档、印章、清单.)
4. **Must communicate (≤3)** — the three things the first screen must land.
5. **Constraints** — brand, must-keep, platform, language (default Chinese primary).
If the brief is vague: ask ONE question, or state an assumption and proceed.

## Phase 2 · Ideate the hero image (step by step)
1. **Candidate subjects** — from the world list, pick 2–3 that could carry the hero as a **literal image** (an object/scene), NEVER a chart.
2. **Choose** the most evocative **and** most drawable; prefer the product's **iconic object** (e.g. 咖啡袋 + 标签).
3. **A twist** that adds meaning (the bag as a specimen label; the cup as a sunrise; the phone glowing at 2am).
4. **Put REAL data on it** (origin, altitude, date, price, count…) — the object carries the facts.
5. **Write the concept as a picture** in one paragraph. If you can't picture it, it isn't a concept yet.
6. **Plan the artifacts across sections** — hero = the main object; a following section = a supporting object; features = small line-icons. (Page rhythm + SVG craft: `references/illustration.md`.)
Only for a genuinely abstract product (API, platform) use a **diagram** grammar instead (`references/illustration.md` §E).

## Phase 3 · Draw
**0 · Tokens & normalization (our backbone — do this FIRST).** Write the token block at `:root` (colors primitive→semantic, one space scale, one radius scale, a fixed type-step set, ≤3 font families in roles, ≤2 shadows, one easing). **No raw value outside `:root`.** Full spec + the copy-paste block: **`references/tokens.md`**. Do not proceed until the block exists.
**1 · Illustrate the product's objects with flat SVG** (`references/illustration.md`). Each object = **4 parts + props**: ground-shadow ellipse · body (filled path/rect **+ a darker stroke** = silhouette) · ONE defining feature (bag: crimp band + ridges; cup: handle + steam; card: chips + rule rows) · a lighter label with **real data**; plus 1–3 prop glyphs. **No gradients.** Use them across sections (hero = main artifact).
**2 · Compose** — the object is the focal and heaviest element; optional frame (panel + hairline top bar + a telemetry strip of real facts); fill ~85%; no empty quadrant; hero text ≥13px **rendered**.
**3 · Craft rules** — 4px grid; hierarchy by weight + color; ≤3 fonts in roles; every value a token (`var()`); text contrast ≥4.5:1; `role="img"` + `aria-labelledby`; decorative → `aria-hidden`; motion respects `prefers-reduced-motion`.
**4 · Robustness** — no horizontal overflow at 320/375/768/1280; touch targets ≥44px; working mobile nav; anchors not hidden behind a sticky header.
**5 · Anti-slop** — no emoji / raster / clipart; no gradient-on-everything; no "3 grey circles" placeholder; no box-and-line diagram for a physical product; no decorative texture behind text.
**6 · VERIFY — mandatory, not optional.** Run the geometry-audit snippet in **`references/verify.md`** in the browser at 320/375/768/1280 and **fix every reported bug; repeat until 0.** A build with any visual bug is a failed build.

## Self-check (before "done")
- [ ] **Geometry audit (`references/verify.md`) returns 0 bugs at 320/375/768/1280.**
- [ ] Token backbone exists; no raw hex/px outside `:root` (except `0`, `1px`, `100%`, `auto`); spacing from the scale; ≤3 fonts from the steps.
- [ ] Phase 1 answered; the hero is a **literal image of the product's world**, carrying real data (not a flowchart).
- [ ] One focal; one accent; rendered hero text ≥13px; `scale = renderedWidth/viewBoxWidth ∈ [0.95,1.05]` at 320/375/768/1280.
- [ ] No overflow 320–1280; body contrast ≥4.5; reduced-motion; mobile nav works; no `!important`.

## Non-goals
Backend/non-UI work; "just make it pop" with no brief.
