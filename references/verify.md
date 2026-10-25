# Verify — page-level audit (no visual bugs, first principle)

**A build is not done until this audit returns zero high-severity bugs at 320/375/768/1280.** Token discipline governs value *sources*; it says nothing about geometry or visibility. Measure the rendered page.

## Bug classes (all must be zero except where noted)
**Hero SVG**
- text not fitting / not centred inside its node (H or V overflow)
- two nodes overlapping
- node coords off the 4px grid
- hero text rendering below 13px
- a connector not touching its node's edge
**Page**
- horizontal overflow at any width
- **invisible content**: any element with text (height > 20) at `opacity:0`, `visibility:hidden`, or `display:none` — the "blank section" bug (scroll-reveal is the usual cause; content must be visible at rest)
- **text overflow / clipping**: `scrollWidth > clientWidth + 1` on a text element, or `-webkit-line-clamp` cutting real content
- **targets**: interactive element smaller than 44×44px
- **sticky header**: an anchor target hidden under a sticky header (check `scroll-margin-top`)

## Snippet — run in the browser (Playwright `evaluate`), at each width
```js
() => {
  const bugs = [];
  const W = document.documentElement.clientWidth;
  if (document.documentElement.scrollWidth > W + 1) bugs.push('page H-overflow');
  // invisible content
  document.querySelectorAll('body *').forEach(el => {
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    if ((cs.opacity === '0' || cs.visibility === 'hidden') && (el.textContent || '').trim().length > 0 && r.height > 20)
      bugs.push('invisible: ' + (el.className || el.tagName));
    if (el.scrollWidth > el.clientWidth + 1 && cs.overflow !== 'visible' && el.children.length === 0 && (el.textContent || '').trim())
      bugs.push('text clipped: ' + (el.className || el.tagName));
  });
  // tap targets
  document.querySelectorAll('a,button,[role=button],input,summary').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44)) bugs.push('small target: ' + (el.className || el.tagName) + ` ${Math.round(r.width)}x${Math.round(r.height)}`);
  });
  // hero svg
  const svgs = [...document.querySelectorAll('svg')]; let hero = null, best = -1;
  for (const s of svgs) { const r = s.getBoundingClientRect(); if (r.width * r.height > best) { best = r.width * r.height; hero = s; } }
  if (hero) {
    const B = el => { const b = el.getBBox(); return { x: b.x, y: b.y, w: b.width, h: b.height }; };
    const rects = [...hero.querySelectorAll('rect')].map((r, i) => ({ i, ...B(r) }));
    const texts = [...hero.querySelectorAll('text')].map(t => ({ s: (t.textContent || '').trim().slice(0, 16), ...B(t) }));
    rects.forEach(r => { if ([r.x, r.y, r.w, r.h].some(v => Math.abs(v / 4 - Math.round(v / 4)) > 0.01)) bugs.push(`rect#${r.i} off-grid`); });
    rects.forEach(r => texts.forEach(t => {
      const cx = t.x + t.w / 2, cy = t.y + t.h / 2;
      if (cx > r.x && cx < r.x + r.w && cy > r.y && cy < r.y + r.h) {
        if (t.x < r.x + 4 || t.x + t.w > r.x + r.w - 4) bugs.push(`"${t.s}" H-overflow`);
        if (t.y < r.y + 4 || t.y + t.h > r.y + r.h - 4) bugs.push(`"${t.s}" V-overflow`);
      }
    }));
    for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i], b = rects[j];
      const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (ox > 2 && oy > 2) bugs.push(`rect#${i}~rect#${j} overlap`);
    }
    const sc = hero.getBoundingClientRect().width / hero.viewBox.baseVal.width;
    hero.querySelectorAll('text').forEach(t => { const px = parseFloat(getComputedStyle(t).fontSize) * sc; if (px < 12.9) bugs.push(`"${(t.textContent || '').trim().slice(0, 12)}" ${px.toFixed(1)}px`); });
  }
  return [...new Set(bugs)];
}
```

## Fix recipes
1. **Text overflows node** → enlarge node / shorten label / split lines; never shrink below 13px.
2. **Text above/below node** → centre on `rect.y + rect.h/2`; ensure `line-height × lines ≤ h − 2·padding`.
3. **Overlap** → re-layout on the grid (bigger pitch / move the column); don't nudge 1–2px.
4. **Off-grid** → snap `x/y/w/h` to multiples of 4.
5. **Invisible content** → remove `opacity:0` gating; content visible at rest (see `motion.md` reveal rule).
6. **H-overflow / clipped** → `min-width:0` on flex/grid items; `width:100%`/`max-width`; allow local scroll only as a last resort.
7. **Small target** → pad to ≥44×44.
8. **Anchor under sticky header** → `scroll-margin-top: calc(header + 12px)`.

## Loop
Audit → fix → audit. Compare the set of bugs, not just the count; only stop at `[]` on all four widths.

## Note — nested illustrations (avoid false positives)
Nodes nest: a phone body contains a screen, tiles, bars. **Containment is NOT an overlap.**
- Overlap check: skip any pair where one rect fully contains the other (`a.x<=b.x && a.y<=b.y && a.x+a.w>=b.x+b.w && a.y+a.h>=b.y+b.h`).
- Text-fit check: compare a text only against the **smallest containing rect whose height ≥ text height** — not against a big parent frame.
- Give text ≥3px horizontal / ≥2px vertical breathing room inside its own box; text that intentionally sits *outside* any rect (e.g., a floating label) is skipped.
Without these, the audit floods you with false positives and you chase ghosts.
