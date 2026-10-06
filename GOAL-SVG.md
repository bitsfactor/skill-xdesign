# xdesign · SVG Quality Goal (self-scoring loop)

Root cause of past drift: no stable score → ad-hoc edits → "越改越丑". This file fixes that.

## Target (must hold on every hero illustration)
- **Objective score ≥ 9.0 / 10** (6 checks below), AND
- **Vision score ≥ 8.0 / 10** (VLM aesthetic, averaged over 2 prompts), AND
- Zero hard failures (no overlap, no crossing, minPad ≥ 10, grid ≥ 0.9, text ≥ 15px, role+aria).

Until both hold, keep iterating. Do not declare done on objective alone (that was the earlier mistake).

## Objective rubric (10 pts; `scripts/svgscore.mjs`)
1. **Grid lock** (2.0) — ≥90% of rect/circle/line coords divisible by 4.
2. **Legibility** (2.0) — hero `<text>` min rendered font-size ≥ 15px (and ≥ viewBoxW/45).
3. **Padding** (2.0) — min node padding ≥ 10 (H) and skew ≤ 4 (L≈R).
4. **No overlap** (1.5) — 0 overlapping text boxes inside the hero SVG.
5. **No crossing** (1.5) — 0 proper intersections among connector paths.
6. **Accessible & rich** (1.0) — `role="img"` + accessible name; ≥6 primitives; no raster; ≤2 gradients/filters.

## Vision rubric (10 pts; via `opencode run --file <png>` relay)
Prompt (fixed): "专业 UI 评审这张首屏图，给 1–10 分（构图/层级/留白/连线/配色/是否像专业产品级配图），并列出每个扣分点（≤5 条，具体到元素）。"
Averaged over 2 runs to reduce noise. Score < 8 → must act on the top issues.

## Loop (ratchet; only keep changes that raise the score)
1. measure objective (`svgscore.mjs` + browser metrics) and vision (relay) → record.
2. diagnose the lowest dimension / the vision's top issue.
3. edit ONLY the skill (`references/svg-illustration.md` / `templates/svg-kit.md` / scripts) — never the rubric.
4. regenerate the hero; re-measure.
5. keep if score ↑ and no hard failure regressed; else revert.
Stop when both targets hold on the hero set (B1 hero + at least 2 more briefs' heroes).

## Current baseline (B1_r1 hero)
| iter | objective | vision(avg) | hardFail | notes |
|---|---|---|---|---|
| start | 9.2 | 6.5 | yes (minPad 8) | code-block hero earlier; hatch under text; typos |
| +I/§J fixes | **10.0** | **7.0** | no | padding fixed, hatch/typos/dup-chip/button-rows fixed |
| +§K ref pattern | 7.6* | 7.0 | no | minimal 3-col routing (9 texts/6 paths/0 overlap/0 cross/grid 1.0); *rubric legibility mis-calibrated vs the reference's 11px eyebrow → to fix |
| +top-projects +deco/motion | 9.2* | 7.0 | no | 3-col + glow/dots/noise + draw-in/flow/pulse/hover; spacing per top-5; minPad 10, overlaps 0. Vision plateaued at 7.0. |
**Remaining (vision still <8):** subtitle gray contrast low; H1 gold underline overlaps glyph feet / misaligned with "接入"; right node cards too small + too much whitespace; connector lines too thin; a vertical scroll/gray line at the right edge; left-copy vs right-diagram top baseline misaligned.

## Rubric caveat (important)
A single VLM asked for an absolute 1–10 appears to **plateau around 7** for text-heavy product pages (it keeps surfacing new nits). Absolute scoring is noisy. **Recommended change:** switch the vision signal to a **pairwise comparison** vs the approved reference — "A vs B, which is the better hero? (A/B/tie)" — and target a **win-rate ≥ 70%** over e.g. 10 trials. That is far more stable than an absolute >=8 threshold.
