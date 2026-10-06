#!/usr/bin/env node
// xdesign · svgscore — objective SVG illustration score (0–10) from svgcheck + browser metrics.
// Usage: node svgscore.mjs <svgcheck.json> [browser-metrics.json]
// browser metrics needs: { svg:{ minPad, padSkewMax, overlaps:[], crossings }, fonts:{sizes} } (see browser.mjs)
import fs from 'node:fs';
const sc = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const b = process.argv[3] ? JSON.parse(fs.readFileSync(process.argv[3], 'utf8')) : {};
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

const hero = sc.hero || {};
const sv = b.svg || {};
const grid = hero.grid ?? 0;
const minPad = sv.minPad ?? 0;
const skew = sv.padSkewMax ?? 99;
const overlaps = (sv.overlaps || []).length;
const crossings = sv.crossings ?? null;
const minFs = (sv.heroMinFontPx ?? null); // from browser if provided, else unknown
const rich = (hero.paths || 0) + (hero.rects || 0) + (hero.circles || 0) + (hero.lines || 0) >= 6;

const s = {};
s.grid = clamp(grid / 0.9, 0, 1) * 2.0;
s.legibility = minFs == null ? 1.0 : clamp((minFs - 10) / 5, 0, 1) * 2.0; // ≥15px full
s.padding = (minPad >= 10 && skew <= 4) ? 2.0 : (minPad >= 8 ? 1.2 : 0.4);
s.overlap = overlaps === 0 ? 1.5 : 0;
s.crossing = crossings == null ? 0.9 : (crossings === 0 ? 1.5 : clamp(1.5 - crossings * 0.5, 0, 1.5));
s.rich = (sc.pass && sc.pass.heroAccessible && sc.pass.noRaster && rich) ? 1.0 : 0.4;

const total = Object.values(s).reduce((a, v) => a + v, 0);
const report = {
  total: +total.toFixed(2),
  parts: Object.fromEntries(Object.entries(s).map(([k, v]) => [k, +v.toFixed(2)])),
  inputs: { grid, minPad, skew, overlaps, crossings, minFs, rich },
  hardFail: overlaps > 0 || (crossings != null && crossings > 0) || minPad < 10 || grid < 0.9,
};
console.log(JSON.stringify(report, null, 2));
