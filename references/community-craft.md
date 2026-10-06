# Community & OSS craft (from X threads + top OSS skills)

Sources: X @Voxyz_ai (parallel per-angle review), X @kvnkld (10 polish rules), X @Flomerboy (Anthropic designer tips), OSS: `svg-creator-skill` (render→verify→fix), `frontend-craft` (composition hard rules), `whuxxie/web-design-skill` (anti-cliché, oklch, placeholder philosophy), `claude-design-skill` (advisor mode, asset protocol), `frontend-design-flow` (router + registry), Anthropic frontend-aesthetics cookbook.

## 1. Process
- **Parallel per-angle review** (validate): one agent per angle — anti-slop / detail (spacing·contrast·hover·cursor) / typography POV / responsive+focus+reduced-motion. Merge, render in a real browser, check screenshots, fix, re-pass.
- **Render → verify → fix loop**: the generator must **actually look at its own rendered PNG** and iterate (2–8× depending on complexity) — not one-shot.
- **Advisor mode**: vague brief → propose **3 differentiated directions** first, let the user pick, then commit.
- **Isolate when iterating**: change ONE dimension per round (e.g. "only tune the shadow stack").

## 2. Motion (from the 10 rules)
- **Ban the default `ease`/`ease-in-out`.** Keep a house easing set as tokens and reuse everywhere.
- **Entrances blur in**: opacity + small up-shift + a tiny blur that clears (not a plain fade).
- **Layered shadows**: hairline (contact) + tight + wide soft ambient — never a single flat blur.
- **Tactile press**: active state shifts/scales a touch; feedback is felt.
- **State-driven**: a control is a system — idle / hover / pressed / loading / disabled / success.
- **Give numbers, not adjectives**: "280ms cubic-bezier(.22,1,.36,1)", not "smooth".

## 3. Composition hard rules (frontend-craft)
- Full-bleed hero with **one dominant visual anchor**; **one headline, one CTA, one visual** — no stat strips / pill clusters in the hero.
- No generic SaaS card grid as the hero; no dashboard-card mosaic on product pages.
- **2–3 purposeful motions per page**, not ornament everywhere.
- Pre-build model: **visual thesis → content plan → interaction thesis**, then build.

## 4. Anti-slop & assets
- oklch color derivation (perceptually uniform) over random hex.
- **Placeholder philosophy**: honest `[icon]` / `[image]` markers instead of hand-rolled fakes.
- **Icons**: use a real library (Phosphor / Tabler / Heroicons / Lucide), one family, uniform strokeWidth — **do not hand-roll icon paths**.
- **Images**: if an image-gen tool exists, generate section assets; else leave **labeled placeholders** and list them. **Never build fake product screenshots out of divs.**
- Real brand marks for logo walls: Simple Icons.
- Note: a **product-specific illustration/diagram (a "figure") is legitimate**; hand-rolling *icons* and *fake screenshots* is not.

## 5. Systems & memory
- **DESIGN.md** (Google Stitch format: YAML tokens + rationale) + `@DESIGN.md` in agent memory for cross-session consistency.
- Token discipline: "**use only these tokens, no one-off values**" (kills ~80% of the slop look).
- **Know when to slow down and handcraft** (new icons, spot illustrations, naming).

## How xdesign adopts (actionable)
1. Add the **render→verify→fix** loop as a first-class step (uses vision via subprocess/MCP).
2. Motion kit: house easing tokens, **blur-in entrances**, **3-layer shadows**, tactile press, full state set.
3. Hero composition: enforce "one headline / one CTA / one visual anchor"; ban stat/pill clusters in hero.
4. Icon policy: vendored inline MIT icons (Tabler/Heroicons subset) or placeholders — no hand-rolled icon paths.
5. Asset policy: labeled placeholders when no real image; no div fake screenshots.
6. Advisor mode: 3 directions on vague briefs.
7. Ship **with/without-skill side-by-side** demos (this is the "作品对比").
