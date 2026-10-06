#!/usr/bin/env node
// xdesign · drift — measure cross-page design-system drift against a canonical tokens file.
// Usage: node drift.mjs <canonical-css> <file.html | dir> [more...]
// For every canonical token name, checks each page's :root value matches (normalized).
// drift% = mismatches / (pages × canonicalTokens). Target < 5%.
import fs from 'node:fs';
import path from 'node:path';

const [canonFile, ...targets] = process.argv.slice(2);
if (!canonFile || !targets.length) { console.error('usage: node drift.mjs <canonical-css> <html|dir> ...'); process.exit(2); }

const norm = (s) => String(s).trim().toLowerCase().replace(/["']/g, '').replace(/\s+/g, '').replace(/0\.(\d)/g, '.$1').replace(/\),/g, ')');
const firstFamily = (s) => String(s).split(',')[0].replace(/["']/g, '').trim().toLowerCase();

const parseRoot = (css) => {
  const out = {};
  for (const m of css.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+)/g)) out[m[1]] = m[2].trim();
  return out;
};

const canon = parseRoot(fs.readFileSync(canonFile, 'utf8'));
const names = Object.keys(canon);

// collect html files
const files = [];
for (const t of targets) {
  const st = fs.statSync(t);
  if (st.isDirectory()) for (const f of fs.readdirSync(t)) if (/\.html?$/i.test(f)) files.push(path.join(t, f));
  else files.push(t);
}

const isFont = (n) => /font-(display|body|mono|sans|serif)$/.test(n);
let totalChecks = 0, totalMiss = 0;
const rows = [];
for (const file of files) {
  const css = [...fs.readFileSync(file, 'utf8').matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
  const root = parseRoot(css);
  let miss = 0; const bad = [];
  for (const n of names) {
    totalChecks++;
    if (!(n in root)) { miss++; bad.push(n + ':missing'); continue; }
    const a = isFont(n) ? firstFamily(canon[n]) : norm(canon[n]);
    const b = isFont(n) ? firstFamily(root[n]) : norm(root[n]);
    if (a !== b) { miss++; bad.push(n + ':' + root[n] + '≠' + canon[n]); }
  }
  totalMiss += miss;
  rows.push({ file: path.basename(file), driftPct: +(miss / names.length * 100).toFixed(1), bad });
}

rows.sort((a, b) => b.driftPct - a.driftPct);
for (const r of rows) console.log(r.file.padEnd(22) + (r.driftPct + '%').padStart(7) + (r.bad.length ? '  ' + r.bad.slice(0, 6).join(', ') : ''));
const overall = totalChecks ? +(totalMiss / totalChecks * 100).toFixed(2) : 0;
console.log('\ncanonical tokens: ' + names.length + '  ·  files: ' + files.length + '  ·  overall drift: ' + overall + '%  →  ' + (overall < 5 ? 'PASS (<5%)' : 'FAIL'));
