---
name: xdesign
description: A repeatable method (Analyze → Ideate → Draw) for designing web pages/UI and their hero image, so the result is concrete, systematic, and robust — better than prompting the model with no method. Use when building or redesigning any page, landing page, dashboard, component, or hero illustration/diagram. The output of this skill is the PROCESS below.
---

# xdesign — design by method, not by vibes

The hero is **a picture of the product**, not a flow-chart. For a physical/experiential product the hero must be a **literal illustration of an object or a moment from the product's world** (a coffee bag, a cup, a phone at night). Use an abstract diagram **only** when the product itself is abstract (an API, a platform with no physical referent).

## Phase 1 · Analyze the brief
Write these, briefly:
1. **Who / task / feel** — the real user; the verb they must accomplish; the feeling (real words, not "modern").
2. **Core mechanism** — ONE sentence: what the product actually does.
3. **The product's world** — list 3–6 concrete things from the product's real world: physical objects, the moment of use, the artifact it produces. (coffee → 咖啡袋、滤杯、手冲、冲煮卡、清晨的杯子。sleep app → 床、波形、月亮、耳机的光。B2B audit → 文档、印章、清单。)
4. **Must communicate (≤3)** — the three things the first screen must land.
5. **Constraints** — brand, must-keep, platform, language (default Chinese primary).
If the brief is vague: ask ONE question, or state an assumption and proceed.

## Phase 2 · Ideate the hero image (step by step)
1. **Candidate subjects** — from the world list, pick 2–3 things that could carry the hero as a **literal image** (an object or a scene) — NOT a chart.
2. **Choose** the most evocative **and** most drawable one. Prefer the product's **iconic object** (e.g., 咖啡袋 + 它的标签).
3. **Give it a twist** that adds meaning (the bag presented as a specimen label; the cup as a sunrise; the phone glowing at 2am).
4. **Put REAL data on it** — origin, altitude, roast date, price, count, the user's name… The object carries the facts.
5. **Write the concept as a picture** in one paragraph. If you can't picture it, it isn't a concept yet.
6. **Direction** — palette + 2–3 type faces from the product's world; write them as tokens. Hold one direction.
Only if the product is genuinely abstract (an API gateway, a data platform) use a **diagram** grammar instead — see `references/figure-recipes.md` §B.

## Phase 3 · Draw (constraints & techniques)
**Illustrate the object with SVG** — shapes first (`rect`/`circle`/`path`/`text`), then 2–4 layers for material and light (base → shading → highlight → accent). Keep a limited palette (one accent). Add product-specific detail (a stitch line, a lid, a steam wisp).
**Composition** — the object is the focal and is the heaviest element; sit it in a framed panel (subtle surface + 1px border + radius; optional hairline top bar [label + one live status] + a telemetry strip of 3–5 real facts). Fill ~85%; no empty quadrant; hero text ≥13px **rendered**.
**Craft rules** — 4px grid; hierarchy by weight + color (not size alone); ≤3 fonts in roles (display/body/mono); every value a token (`var()`); text contrast ≥4.5:1; `role="img"` + `aria-labelledby`; decorative bits `aria-hidden`; optional motion that respects `prefers-reduced-motion`.
**Robustness** — no horizontal overflow at 320/375/768/1280; touch targets ≥44px; working mobile nav; anchors not hidden behind a sticky header.
**Anti-slop** — no emoji / raster / clipart; no gradient-on-everything; no "3 grey circles" placeholder; **no box-and-line diagram standing in for a physical product**; no decorative texture behind text.

## Self-check (before "done")
- [ ] Phase 1 answered; the hero is a **literal image of the product's world**, carrying real data.
- [ ] It's a picture, not a flowchart (unless the product is abstract).
- [ ] One focal; one accent; rendered hero text ≥13px; `scale = renderedWidth/viewBoxWidth ∈ [0.95,1.05]` at 320/375/768/1280.
- [ ] No overflow 320–1280; contrast ≥4.5; reduced-motion; mobile nav works.
- [ ] No raw values (all tokens); ≤3 fonts; no `!important`.

## Non-goals
Backend/non-UI work; "just make it pop" with no brief.
