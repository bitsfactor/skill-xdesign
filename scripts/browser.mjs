#!/usr/bin/env node
// xdesign · browser checks — horizontal overflow (320/375/768/1280) + axe-core + a11y flags.
// Produces the `browser-metrics.json` shape consumed by measure.mjs.
// Usage: node browser.mjs <file.html> [--out metrics.json]
// Requires Playwright:  npm i -D playwright && npx playwright install chromium
// If Playwright is missing, exits 0 with a notice (you can instead drive the Playwright MCP).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const file = process.argv[2];
if (!file) { console.error('usage: node browser.mjs <file.html> [--out metrics.json]'); process.exit(2); }
const outIdx = process.argv.indexOf('--out');
const outFile = outIdx > -1 ? process.argv[outIdx + 1] : file.replace(/\.html?$/i, '.metrics.json');

let chromium;
try { ({ chromium } = await import('playwright')); }
catch {
  console.error('[browser.mjs] playwright not installed — skipping browser checks.');
  console.error('  install: npm i -D playwright && npx playwright install chromium');
  console.error('  (or run overflow/axe via the Playwright MCP and write the JSON yourself)');
  process.exit(0);
}

const AXE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js';
const WIDTHS = [320, 375, 768, 1280];

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(pathToFileURL(path.resolve(file)).href, { waitUntil: 'load', timeout: 30000 });
  await page.evaluate(() => (document.fonts ? document.fonts.ready : true)).catch(() => {});

  // overflow across widths
  const overflow = {};
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.waitForTimeout(150);
    overflow['w' + w] = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  }
  await page.setViewportSize({ width: 1280, height: 900 });

  // a11y flags + font-size/color counts (from CSS text)
  const extra = await page.evaluate(() => {
    const css = [...document.querySelectorAll('style')].map((s) => s.textContent).join('\n');
    const fsz = new Set();
    for (const el of document.querySelectorAll('h1,h2,h3,p,a,button,span,td,li,div')) {
      const v = parseFloat(getComputedStyle(el).fontSize);
      if (v > 0) fsz.add(Math.round(v));
    }
    const colors = new Set((css.match(/#[0-9a-fA-F]{3,8}\b|\brgba?\([^)]*\)|\boklch\([^)]*\)/g) || []).map((x) => x.toLowerCase()));
    return {
      fonts: { sizes: fsz.size },
      uniqueColors: colors.size,
      a11y: {
        focus: /:focus-visible|:focus\b/.test(css),
        reducedMotion: /prefers-reduced-motion/.test(css),
        lang: !!document.documentElement.getAttribute('lang'),
        title: !!document.title,
      },
      svg: (() => {
        const svgs = [...document.querySelectorAll('svg')];
        if (!svgs.length) return { heroTextBoxes: 0, overlaps: [], minPad: null, padSkewMax: 0, cramped: [] };
        const big = svgs.slice().sort((a, b) => { const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect(); return ra.width * ra.height - rb.width * rb.height; }).pop();
        const items = [];
        for (const t of big.querySelectorAll('text')) { const r = t.getBoundingClientRect(); if (r.width > 0 && r.height > 0) items.push({ txt: t.textContent.trim().slice(0, 16), x: r.x, y: r.y, w: r.width, h: r.height }); }
        const overlaps = [];
        for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
          const a = items[i], c = items[j];
          const ix = Math.max(0, Math.min(a.x + a.w, c.x + c.w) - Math.max(a.x, c.x));
          const iy = Math.max(0, Math.min(a.y + a.h, c.y + c.h) - Math.max(a.y, c.y));
          if (ix * iy > 0.25 * Math.min(a.w * a.h, c.w * c.h)) overlaps.push(a.txt + ' × ' + c.txt);
        }
        // node padding: single-label boxes → smallest padding + L/R skew + cramped list
        let minPad = Infinity, padSkewMax = 0; const cramped = [];
        for (const rect of big.querySelectorAll('rect')) {
          const rb = rect.getBoundingClientRect();
          if (rb.width < 60 || rb.height < 24) continue;
          const inside = items.filter((t) => { const cx = t.x + t.w / 2, cy = t.y + t.h / 2; return cx > rb.x && cx < rb.x + rb.width && cy > rb.y && cy < rb.y + rb.height; });
          if (inside.length !== 1) continue;
          const t = inside[0];
          const padL = t.x - rb.x, padR = rb.x + rb.width - (t.x + t.w), padT = t.y - rb.y, padB = rb.y + rb.height - (t.y + t.h);
          const m = Math.min(padL, padR, padT, padB);
          minPad = Math.min(minPad, m); padSkewMax = Math.max(padSkewMax, Math.abs(padL - padR));
          if (m < 8) cramped.push(t.txt + ' pad=' + Math.round(m));
        }
        return { heroTextBoxes: items.length, overlaps, minPad: Number.isFinite(minPad) ? Math.round(minPad) : null, padSkewMax: Math.round(padSkewMax), cramped };
      })(),
    };
  });

  // axe
  let axe = null;
  try {
    await page.addScriptTag({ url: AXE_URL });
    axe = await page.evaluate(async () => {
      if (!window.axe) return null;
      const r = await window.axe.run(document, { resultTypes: ['violations'] });
      const c = { critical: 0, serious: 0, moderate: 0, minor: 0 };
      for (const v of r.violations) c[v.impact || 'minor'] += (v.nodes ? v.nodes.length : 1);
      return c;
    });
  } catch { axe = null; }

  const report = { file, overflow, axe, ...extra };
  fs.writeFileSync(outFile, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
