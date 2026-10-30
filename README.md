# xdesign

A design **method** for AI coding agents, packaged as an Agent Skill. It makes generated web pages **content-rich, token-consistent, and free of visual bugs** — instead of the usual "hero + three icon cards" slop.

Use it when building or redesigning a landing page, dashboard, component, or hero illustration.

## Why

Prompting a model with no method gives you a page that looks fine at a glance and falls apart up close: text overflowing its card, ragged spacing, sections that never render, and that unmistakable "AI dark theme".

xdesign fixes this with four principles, in priority order:

0. **No visual bugs** — geometry is *measured*, not eyeballed. A build isn't done until the audit returns 0 bugs at 320/375/768/1280.
1. **Strict token backbone** — every value is a token; spacing, type and color are quantized. This is what kills alignment, spacing and font drift.
2. **Plan content & structure before building** — section by section, with real copy and real data. Thin pages come from skipping this.
3. **A literal, illustration-rich page** — draw the product's own objects (a coffee bag, a phone screen), one per section; default to a light theme.

## Install

```bash
git clone git@github.com:bitsfactor/skill-xdesign.git
cd skill-xdesign
./install.sh          # symlink into ~/.config/opencode/skills/xdesign and ~/.claude/skills/xdesign
# ./install.sh copy   # or copy the files instead
```

`install.sh` installs into every agent skills dir that exists. Any agent that reads `SKILL.md` + `references/` can use it; otherwise point the model at `SKILL.md`.

## How it works

`SKILL.md` is the whole method:

1. **Analyze** the brief — user, task, feeling, core mechanism, the product's world.
2. **Ideate** the hero image — pick the product's iconic object and put real data on it.
3. **Plan** the page — a section-by-section outline with real copy and data, one figure per substance section.
4. **Build** — tokens → illustration → motion → craft → robustness → **verify**.

References:

| File | Contents |
|---|---|
| `references/tokens.md` | Token block + rules (light theme by default) |
| `references/content-plan.md` | Section templates by product type + density floor |
| `references/illustration.md` | How to draw good SVG objects, hero patterns, figure type scale |
| `references/taste.md` | Light-first directions, anti-"AI" rules, rhythm |
| `references/motion.md` | Motion recipes + the "never hide content" rule |
| `references/verify.md` | The page-level audit — the definition of "no visual bugs" |
| `references/self-review.md` | Generate → screenshot → grade → fix loop |

## The audit

The core of the quality claim. Run it in the browser (Playwright `evaluate`) and fix until `bugs` is empty:

```js
// see references/verify.md for the full snippet
// flags: text overflowing its node, overlapping nodes, off-grid coords,
//        ragged tiers, hero text < 13px, page overflow, invisible content
```

Repeat at 320 / 375 / 768 / 1280.

## Benchmark

Same brief, same model, one run per arm; only difference is whether the skill is supplied.

- **Generator**: `deepseek-v4.1-flash` (both arms)
- **Judge**: `gemini-4-argon`, blind pair comparison on 1440×900 hero screenshots, each pair judged in **both orders** (A/B and B/A)
- **Briefs**: B1 API gateway · L2 coffee subscription · L4 compliance SaaS (train set; hold-out untouched)
- **Harness**: `examples/briefs.md` — one run per arm, judge blind, both orders

| Brief | Judge (2 orders) | xdesign audit bugs¹ | no-skill audit bugs¹ |
|---|---|---|---|
| B1 · Nimbus | **2–0 xdesign** | 0 / 0 / 0 / 0 | 13 / 12 / 13 / 15 |
| L2 · Morrow | **2–0 xdesign** | 0 / 0 / 0 / 0 | 3 / 3 / 3 / 4 |
| L4 · Ledgerline | **2–0 xdesign** | 0 / 0 / 0 / 0 | 17 / 17 / 17 / 10 |

¹ bugs at 320 / 375 / 768 / 1280 from `references/verify.md`. The no-skill pages mainly fail on touch targets and, for L4, scroll-reveal sections that stay invisible — the exact failure the audit exists to catch.

Caveat: three briefs, one generation per arm, one model judge. This is evidence, not a proof.

## Repo layout

```
SKILL.md              the method
references/           tokens · content-plan · illustration · taste · motion · verify · self-review
install.sh            installs into ~/.config/opencode/skills and ~/.claude/skills
examples/             a worked sample page + the brief set used for evaluation
```

## License

MIT
