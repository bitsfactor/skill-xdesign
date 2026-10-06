#!/usr/bin/env node
// xdesign · svgcheck — audit inline-SVG illustration quality.
// Usage: node svgcheck.mjs <file.html> [--json]
// Checks per SVG: viewBox, role/aria, labels; 4-grid adherence of geometric primitives;
// gradient/filter counts; icon sizes. Reports metrics + soft gates.
import fs from 'node:fs';

const file = process.argv[2];
if (!file) { console.error('usage: node svgcheck.mjs <file.html> [--json]'); process.exit(2); }
const html = fs.readFileSync(file, 'utf8');
const svgs = [...html.matchAll(/<svg[\s\S]*?<\/svg>/g)].map(m => m[0]);
const N = (s, re) => (s.match(re) || []).length;
const onGrid4 = (v) => { const n = Math.round(Math.abs(v)); return n === 0 || n % 4 === 0; };

const per = svgs.map((s, i) => {
  const viewBox = (s.match(/viewBox="([^"]+)"/) || [])[1] || null;
  const role = (s.match(/role="img"/) || []).length > 0;
  const aria = /aria-label(ledby)?="/.test(s) || /aria-hidden="true"/.test(s);
  const texts = N(s, /<text/g);
  const paths = N(s, /<path/g), rects = N(s, /<rect/g), circles = N(s, /<circle/g), lines = N(s, /<line/g), groups = N(s, /<g[ >]/g);
  const grads = N(s, /<linearGradient|<radialGradient/g), filters = N(s, /<filter/g), images = N(s, /<image/g);
  // grid adherence over rect/circle/line numeric coords
  let total = 0, ok = 0;
  for (const m of s.matchAll(/<(rect|circle|line)\b[^>]*>/g)) {
    for (const a of m[0].matchAll(/\b(x|y|width|height|cx|cy|r|x1|y1|x2|y2|rx|ry)="(-?\d*\.?\d+)"/g)) {
      total++; if (onGrid4(parseFloat(a[2]))) ok++;
    }
  }
  const grid = total ? ok / total : 1;
  const isIcon = viewBox && /^0 0 24 24$/.test(viewBox.trim());
  return { i, len: s.length, viewBox, role, aria, texts, paths, rects, circles, lines, groups, grads, filters, images, grid: +grid.toFixed(2), isIcon };
});

// hero = largest svg
const hero = per.slice().sort((a, b) => b.len - a.len)[0] || null;
const iconCount = per.filter(p => p.isIcon).length;
const report = {
  file, svgCount: svgs.length, icon24: iconCount,
  gradients: per.reduce((a, p) => a + p.grads, 0),
  filters: per.reduce((a, p) => a + p.filters, 0),
  rasterImages: per.reduce((a, p) => a + p.images, 0),
  hero: hero && { len: hero.len, viewBox: hero.viewBox, texts: hero.texts, paths: hero.paths, rects: hero.rects, circles: hero.circles, grid: hero.grid },
  pass: {
    heroHasViewBox: !!(hero && hero.viewBox),
    heroAccessible: !!(hero && hero.role && hero.aria),
    heroHasLabels: !!(hero && hero.texts >= 2),
    heroGridAligned: !!(hero && hero.grid >= 0.7),
    richIllustration: !!(hero && (hero.paths + hero.rects + hero.circles + hero.lines) >= 6),
    noRaster: per.reduce((a, p) => a + p.images, 0) === 0,
  },
};
console.log(JSON.stringify(report, null, 2));
