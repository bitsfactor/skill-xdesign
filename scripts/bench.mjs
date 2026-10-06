#!/usr/bin/env node
// xdesign · bench — score every .html in a directory (dscheck + optional browser metrics) → scorecard.
// Usage: node bench.mjs <dir> [--out scorecard.json]
// For each page it runs dscheck.mjs and measure.mjs; if a sibling "<name>.metrics.json"
// exists (from browser.mjs or the Playwright MCP) it is included.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = process.argv[2];
if (!dir) { console.error('usage: node bench.mjs <dir> [--out scorecard.json]'); process.exit(2); }
const outIdx = process.argv.indexOf('--out');
const outFile = outIdx > -1 ? process.argv[outIdx + 1] : path.join(dir, 'scorecard.json');

const files = fs.readdirSync(dir).filter((f) => /\.html?$/i.test(f)).sort();
if (!files.length) { console.error('no .html files in ' + dir); process.exit(1); }

const run = (script, args) => {
  try { return execFileSync('node', [path.join(here, script), ...args], { encoding: 'utf8' }); }
  catch (e) { return e.stdout || ''; }
};

const rows = [];
for (const f of files) {
  const fp = path.join(dir, f);
  const dsJson = run('dscheck.mjs', [fp, '--json']);
  let ds; try { ds = JSON.parse(dsJson); } catch { rows.push({ file: f, error: 'dscheck failed' }); continue; }

  const tmp = path.join(os.tmpdir(), 'xdesign-ds-' + f + '.json');
  fs.writeFileSync(tmp, JSON.stringify(ds));

  const mfile = fp.replace(/\.html?$/i, '.metrics.json');
  const args = [tmp];
  if (fs.existsSync(mfile)) args.push(mfile);
  const mJson = run('measure.mjs', args);
  fs.unlinkSync(tmp);

  let m; try { m = JSON.parse(mJson); } catch { rows.push({ file: f, error: 'measure failed' }); continue; }
  rows.push({ file: f, total: m.total, dims: m.dims, gates: m.gates, raw: m.raw });
}

rows.sort((a, b) => (b.total ?? -1) - (a.total ?? -1));

// print table
const pad = (s, n) => String(s).padEnd(n).slice(0, n);
console.log('\n' + pad('file', 34) + pad('total', 7) + pad('token', 7) + pad('spacing', 8) + pad('type', 6) + pad('cssQ', 6) + pad('axe', 6) + pad('robust', 7) + 'gates');
console.log('-'.repeat(96));
for (const r of rows) {
  if (r.error) { console.log(pad(r.file, 34) + r.error); continue; }
  const g = r.gates || {};
  const gatesOk = ['noImportant', 'fontsDisciplined', 'tokenDominated', 'spacingOnGrid', 'noOverflow'].every((k) => g[k] !== false);
  console.log(
    pad(r.file, 34) + pad(r.total, 7) + pad(r.dims.token, 7) + pad(r.dims.spacing, 8) + pad(r.dims.type, 6) +
    pad(r.dims.cssQ, 6) + pad(r.dims.axe, 6) + pad(r.dims.robust, 7) + (gatesOk ? 'PASS' : 'FAIL ' + Object.entries(g).filter(([, v]) => v === false).map(([k]) => k).join(',')),
  );
}

const avg = rows.filter((r) => !r.error).reduce((a, r) => a + (r.total || 0), 0) / (rows.filter((r) => !r.error).length || 1);
const summary = { dir, count: rows.length, average: +avg.toFixed(2), rows };
fs.writeFileSync(outFile, JSON.stringify(summary, null, 2));
console.log('\naverage: ' + avg.toFixed(2) + '  →  ' + outFile);
