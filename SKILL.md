---
name: xdesign
description: A repeatable method (Analyze → Ideate → Plan → Build) for designing web pages/UI and their hero image, built on a strict design-token backbone so the result is content-rich, aligned, and bug-free — better than prompting the model with no method. Use when building or redesigning any page, landing page, dashboard, component, or illustration.
---

# xdesign — design by method, not by vibes

Four principles, in order:
0. **NO VISUAL BUGS** — first principle. Geometry must be correct (text fits its node, nothing overlaps, 4-grid, no page overflow, hero text ≥13px). A build is **not done** until the geometry audit (`references/verify.md`) returns 0 bugs at 320/375/768/1280.
1. **A strict token backbone** — every value is a token (`references/tokens.md`).
2. **Design content & structure BEFORE building** — a page is planned section-by-section, with REAL copy and data. Skipping this is the #1 cause of thin pages.
3. **A literal, illustration-rich page** — drawn objects from the product's world, one per section where it fits; **default LIGHT theme**.

## Phase 1 · Analyze the brief
1. **Who / task / feel** · 2. **Core mechanism** (one sentence) · 3. **The product's world** (3–6 concrete objects/artifacts: coffee → 袋/滤杯/冲煮卡/豆; sleep app → 手机/波形/月亮/耳机; audit → 文档/印章/清单) · 4. **Must communicate (≤3)** · 5. **Constraints** (brand, language; default Chinese primary).

## Phase 2 · Ideate the hero image
Pick 2–3 candidate subjects from the world → choose the most evocative + drawable (the product's **iconic object**) → give it a twist → put **real data** on it → write the concept as a picture in one paragraph.

## Phase 3 · Plan the page — CONTENT & STRUCTURE (mandatory, before any CSS)
**A thin page is the #1 failure. Write this outline first, then build top→bottom.**
1. **Sections (top→bottom)** — for EACH write: its *job* · a *headline* · **1–3 sentences of REAL body copy** · the **real data** it shows. A strong landing page is usually:
   `nav · hero · 2–4 substance sections · social proof (numbers + quotes + press) · a mid-page CTA band · footer`.
   NOT "hero + 3 icon features". If a section is just an icon + one line, it's too thin — give it a claim, detail, and a value.
2. **An illustration per section** — decide which sections carry **their own figure** (`references/illustration.md`): for an app, a **different screen mockup per section** (report · mixer · breathing · stories); for a physical product, the object + a detail/label card; for abstract, a console panel.
3. **Rhythm** — alternate wide/narrow and plain/tinted bands so the page has a pulse (don't stack identical sections).

## Phase 4 · Build
**0 · Tokens** — write the `:root` block first; no raw values outside it (`references/tokens.md`).
**1 · Illustrate** the objects (`references/illustration.md`): each = ground-shadow · body (fill + darker stroke) · ONE defining feature · a label with real data · props. Hero pattern by type: **app → a device mockup of the REAL screen**; **physical → object + a tilted card + a status tag + props**; **abstract → a light console**. Figure text **small & refined (10–15px)**.
**2 · Motion** (`references/motion.md`): beat · travel · dash · sweep · sheet; ≤2 loops per figure; under `prefers-reduced-motion`.
**3 · Craft** — 4px grid; hierarchy by weight+color; ≤3 fonts; contrast ≥4.5; `role="img"`+`aria-labelledby`; decorative `aria-hidden`.
**4 · Robustness** — no horizontal overflow 320/375/768/1280; touch ≥44px; working mobile nav; anchors clear of a sticky header.
**5 · Anti-slop** — no emoji/raster/clipart; no gradient-on-everything; no "3 grey circles"; no box-and-line diagram for a physical product; no texture behind text.
**6 · VERIFY (mandatory)** — run the audit in `references/verify.md` at 320/375/768/1280; fix every bug; repeat until 0.

## Self-check
- [ ] **Geometry audit returns 0 bugs at 320/375/768/1280** (incl. no invisible content — every section shows in a full-page screenshot).
- [ ] **Section outline written;** page = hero + 2–4 substance sections + proof + CTA + footer, each with REAL copy and (where fitting) its own illustration.
- [ ] Token backbone exists; no raw hex/px outside `:root`; spacing from the scale; ≤3 fonts.
- [ ] Hero is a literal image with real data (not a flowchart); figure text small; light theme unless the product is dark.

## Non-goals
Backend/non-UI work; "just make it pop" with no brief.
