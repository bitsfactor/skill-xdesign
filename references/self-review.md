# Self-review — generate → look → fix (run it until clean)

Never ship the first draft. After generating, **look at your own result in the browser and fix it.** Two rounds is usually enough; stop when no high-severity issue remains.

## Loop
1. Open the page at **1440** and **375** (and 768 if the layout has a 2-col breakpoint).
2. Screenshot the **hero** and the **full page**.
3. Grade with the rubric below (be harsh; a stranger will judge this).
4. Fix every **High**; then re-screenshot and re-grade. Max 2 rounds — then stop and note what remains.

## Rubric (score each 0–2; 0 = fail)
**A. Content (high)** — ≥3 substance sections; each has a claim + real copy + a number; no section is "icon + one line"; no duplicated content.
**B. Visibility & geometry (high)** — the audit (`verify.md`) returns `[]`; every section is visible in a full-page screenshot; nothing overflows or overlaps; no text clipped.
**C. Hierarchy & type (high)** — one clear focal per section; the headline is the largest thing; body is comfortable; ≤3 families; figure text is small-refined; no wall of same-size text.
**D. Figure quality (high)** — it is a literal product object/screen (not a chart); it has a real silhouette + one defining detail + a ground shadow + props; it carries real data; it reads at a glance.
**E. Taste (med)** — light, restrained palette; generous whitespace; consistent spacing rhythm; one accent; no "AI dark + neon", no gradient soup, no 3-cards-3-icons cliché.
**F. Motion (med)** — one meaningful loop that shows the mechanism; subtle; reduced-motion safe; nothing hidden.

## The most common failures → the fix
- **Page looks thin / empty gaps** → you skipped sections; add the substance sections from `content-plan.md`, each with a figure.
- **Everything same size** → establish a type scale; make the headline clearly bigger; mute secondary text.
- **Figure is a diagram where a product exists** → draw the real object/screen (`illustration.md`).
- **Figure looks crude** → fix proportions, add the defining detail, ground shadow, 1–2 props; shrink figure text.
- **Sections invisible in the screenshot** → you gated content on scroll; make content visible at rest (`motion.md`).
- **"AI" feeling** → switch to a light warm palette, remove gradients/glows, reduce accent saturation, add whitespace.

## Ship condition
All **High** = 2, no **High** = 0/1, audit `[]`. If you cannot get a **High** to 2 after two rounds, stop and report the specific blocker rather than shipping silently.
