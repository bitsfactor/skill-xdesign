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

Copy the skill into your agent's skills directory:

```bash
# opencode (global)
git clone git@github.com:bitsfactor/skill-xdesign.git ~/.config/opencode/skills/xdesign

# Claude Code
git clone git@github.com:bitsfactor/skill-xdesign.git ~/.claude/skills/xdesign
```

Any agent that supports the `SKILL.md` + `references/` convention can use it. Otherwise, just point the model at `SKILL.md`.

## How it works

`SKILL.md` is the whole method:

1. **Analyze** the brief — user, task, feeling, core mechanism, the product's world.
2. **Ideate** the hero image — pick the product's iconic object and put real data on it.
3. **Plan** the page — a section-by-section outline with real copy and data, one figure per substance section.
4. **Build** — tokens → illustration → motion → craft → robustness → **verify**.

References:

| File | Contents |
|---|---|
| `references/tokens.md` | The token block and the non-negotiable rules (light theme by default) |
| `references/illustration.md` | How to draw good SVG objects, hero patterns by product type, figure type scale |
| `references/motion.md` | Five motion recipes, plus the "never hide content" rule |
| `references/verify.md` | The geometry audit — the definition of "no visual bugs" and how to fix each one |

## The audit

The core of the quality claim. Run it in the browser (Playwright `evaluate`) and fix until `bugs` is empty:

```js
// see references/verify.md for the full snippet
// flags: text overflowing its node, overlapping nodes, off-grid coords,
//        ragged tiers, hero text < 13px, page overflow, invisible content
```

Repeat at 320 / 375 / 768 / 1280.

## License

MIT
