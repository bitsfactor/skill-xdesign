# Harness: measure & improve

How to run the xdesign measurement pipeline and (optionally) a self-improvement loop.

## 1. One page
```bash
# static discipline (no deps)
node scripts/dscheck.mjs page.html                       # human JSON
node scripts/dscheck.mjs page.html --strict              # exit 1 if a gate fails

# browser checks → page.metrics.json  (needs: npm i -D playwright && npx playwright install chromium)
node scripts/browser.mjs page.html

# score (v2)
node scripts/measure.mjs page.dscheck.json page.metrics.json
```
If Playwright is unavailable, run overflow + axe via the **Playwright MCP** and write the same
`{ overflow, axe:{critical,serious,moderate,minor}, a11y:{focus,reducedMotion,lang,title}, fonts:{sizes} }`
JSON yourself, then pass it to `measure.mjs`.

## 2. A whole benchmark folder
```bash
# prepare: generate N result pages into bench/ (one per brief/run)
node scripts/bench.mjs bench/            # runs dscheck + measure for every .html, prints a table
# → bench/scorecard.json  { average, rows:[{file,total,dims,gates}] }
```

## 3. What "good" looks like
- `total ≥ 9.0`, all hard gates PASS (see `references/gates.md`).
- No horizontal overflow at 320/375/768/1280.
- axe: 0 critical / 0 serious.
- No raw colors/lengths outside tokens; spacing on the 4px grid; ≤ 3 font families.

## 4. Improvement loop (manual or scripted)
Per iteration: **measure → diagnose the lowest dimension / most frequent failed rule → edit only the skill
(references / gates / templates / scripts) → re-measure → keep if total improves and no gate regressed → else revert.**
- KEEP the benchmark and `measure.mjs` FIXED (never edit the test to win).
- Separate a **hold-out** brief set; validate every few iterations.
- Take **3 runs per brief** and compare means (variance ≤ 0.3).

## 5. Optional: drive the loop with a goal mechanism
opencode has no built-in `/goal` yet (community goal plugins exist; core PR in progress).
You can either install a goal plugin, or run the external driver:
```bash
# while ! -f STOP; do opencode run --continue --auto --agent build "/x-iterate"; done
```
Keep hard bounds: max iterations, no-progress stop, token budget, and deny dangerous bash.
