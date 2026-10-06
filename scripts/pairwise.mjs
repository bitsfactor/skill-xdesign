#!/usr/bin/env node
// xdesign · pairwise — judge A/B pairs across 3 models × both orders; Wilson CI + pooled bootstrap.
// Usage: node pairwise.mjs <manifest.json> [--dry]
// manifest.json:
// {
//   "judges": ["develop-anthropic/claude-sonnet-5-5","develop-anthropic/claude-opus-5-5","develop/gemini-3.1-pro-preview"],
//   "pairs": [ { "brief":"B1", "a":"/abs/xdesign.png", "b":"/abs/opponent.png" }, ... ],  // a = xdesign, b = opponent
//   "budget": 400,
//   "concurrency": 4
// }
// Verdict per judge order: "Better: A|B|tie". A judge ticket = win/lose only if both orders agree, else tie.
// Aggregate: >=2 win => win, >=2 lose => lose, else tie (0.5).
// Robustness: runs judge calls concurrently, caches each verdict to <manifest>.judgecache.json
// (resume across killed runs), and writes the summary to <manifest>.results.json incrementally.
import fs from 'node:fs';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';

const file = process.argv[2];
if (!file) { console.error('usage: node pairwise.mjs <manifest.json> [--dry]'); process.exit(2); }
const man = JSON.parse(fs.readFileSync(file, 'utf8'));
const JUDGES = man.judges || ['develop-anthropic/claude-sonnet-5-5', 'develop-anthropic/claude-opus-5-5', 'develop/gemini-3.1-pro-preview'];
const BUDGET = man.budget || 1e9;
const CONC = +(process.env.PW_CONC || man.concurrency || 4);            // concurrent judge tickets (each ticket = 2 calls)
const CALL_TIMEOUT = +(process.env.PW_CALL_TIMEOUT || man.callTimeout || 150000);
const DRY = process.argv.includes('--dry');
const PROMPT = 'A 与 B 是同一产品的两个网页首屏截图（A、B 顺序无关）。只输出一行，不要解释：Better: A 或 B 或 tie';

const cachePath = file.replace(/\.json$/, '') + '.judgecache.json';
const resultsPath = file.replace(/\.json$/, '') + '.results.json';
let cache = {};
try { cache = JSON.parse(fs.readFileSync(cachePath, 'utf8')); } catch {}
let calls = 0;
const saveCache = () => { try { fs.writeFileSync(cachePath, JSON.stringify(cache)); } catch {} };

const keyOf = (judge, a, b) => crypto.createHash('sha1').update(`${judge}|${a}|${b}`).digest('hex');

function judgeCall(judge, orderA, orderB) {
  const k = keyOf(judge, orderA, orderB);
  if (cache[k] !== undefined) return Promise.resolve(cache[k]);
  if (DRY) return Promise.resolve('tie');
  if (calls >= BUDGET) return Promise.reject(new Error('budget exceeded'));
  calls++;
  return new Promise((resolve) => {
    // NOTE: opencode run blocks if its stdin is an open pipe, so we spawn and end stdin immediately.
    const child = spawn('opencode', ['run', PROMPT, '--model', judge, '--file', orderA, '--file', orderB],
      { stdio: ['pipe', 'pipe', 'pipe'] });
    let out = '';
    const timer = setTimeout(() => { try { child.kill('SIGKILL'); } catch {} }, CALL_TIMEOUT);
    child.stdout.on('data', d => { out += d; });
    child.stderr.on('data', () => {});
    child.stdin.end();
    const done = () => {
      clearTimeout(timer);
      const m = out.match(/Better:\s*(A|B|tie)/i);
      const v = m ? m[1].toLowerCase() : 'tie';
      cache[k] = v; saveCache();
      process.stderr.write(`[pairwise] ${judge.split('/').pop()} ${orderA.split('/').pop()} vs ${orderB.split('/').pop()} -> ${v} (call ${calls})\n`);
      resolve(v);
    };
    child.on('error', done);
    child.on('close', done);
  });
}

// one judge ticket for a pair (a=xdesign, b=opponent): both orders must agree, else tie
async function ticket(judge, a, b) {
  const v1 = await judgeCall(judge, a, b); // order 1: A=a(xdesign), B=b(opp)
  const v2 = await judgeCall(judge, b, a); // order 2: A=b(opp), B=a(xdesign)
  const w1 = v1 === 'a' ? 1 : v1 === 'b' ? 0 : null;
  const w2 = v2 === 'b' ? 1 : v2 === 'a' ? 0 : null;
  if (w1 != null && w2 != null && w1 === w2) return w1;
  return 'tie';
}

async function pool(items, worker, conc) {
  const out = new Array(items.length);
  let i = 0;
  const runners = Array.from({ length: Math.max(1, Math.min(conc, items.length)) }, async () => {
    while (i < items.length) { const idx = i++; out[idx] = await worker(items[idx], idx); }
  });
  await Promise.all(runners);
  return out;
}

function wilson(k, n) {
  if (!n) return [0, 0];
  const p = k / n, z = 1.96, z2 = z * z;
  const denom = 1 + z2 / n;
  const center = (p + z2 / (2 * n)) / denom;
  const half = (z * Math.sqrt((p * (1 - p) / n) + z2 / (4 * n * n))) / denom;
  return [Math.max(0, center - half), Math.min(1, center + half)];
}

function summarize(byBrief) {
  const briefs = Object.keys(byBrief);
  const summary = { judges: JUDGES, pairs: man.pairs.length, judgeCalls: calls, briefs: {} };
  let pooledK = 0, pooledN = 0;
  for (const b of briefs) {
    const rs = byBrief[b]; const n = rs.length;
    const wins = rs.filter(r => r === 1).length, loses = rs.filter(r => r === 0).length, ties = rs.filter(r => r === 'tie').length;
    const k = wins + 0.5 * ties; const [lo, hi] = wilson(k, n);
    summary.briefs[b] = { n, wins, loses, ties, winrate: +(k / n).toFixed(3), ci: [+lo.toFixed(3), +hi.toFixed(3)] };
    pooledK += k; pooledN += n;
  }
  summary.pooled = { n: pooledN, winrate: +(pooledK / pooledN).toFixed(3), wilsonCI: wilson(pooledK, pooledN).map(x => +x.toFixed(3)) };
  if (briefs.length >= 2 && !DRY) {
    const iters = 2000, samples = [];
    for (let it = 0; it < iters; it++) {
      let k = 0, n = 0;
      for (let i = 0; i < briefs.length; i++) {
        const b = briefs[Math.floor(Math.random() * briefs.length)];
        for (const r of byBrief[b]) { n++; k += r === 1 ? 1 : r === 'tie' ? 0.5 : 0; }
      }
      samples.push(k / n);
    }
    samples.sort((x, y) => x - y);
    summary.pooled.bootstrapCI = [+samples[Math.floor(iters * 0.025)].toFixed(3), +samples[Math.floor(iters * 0.975)].toFixed(3)];
  }
  return summary;
}

// build tasks: one per (pair, judge)
const tasks = [];
for (const p of man.pairs) for (const j of JUDGES) tasks.push({ p, j });
const verdicts = await pool(tasks, async ({ p, j }) => ({ brief: p.brief, v: await ticket(j, p.a, p.b) }), CONC);

const byBrief = {};
for (const { brief, v } of verdicts) { byBrief[brief] = byBrief[brief] || []; byBrief[brief].push(v); }
// collapse each pair to a single aggregated result: win/lose if >=2 judge tickets, else tie
const aggByBrief = {};
{ let idx = 0;
  for (const p of man.pairs) {
    aggByBrief[p.brief] = aggByBrief[p.brief] || [];
    const rs = [];
    for (let k = 0; k < JUDGES.length; k++) rs.push(verdicts[idx++].v);
    const win = rs.filter(v => v === 1).length, lose = rs.filter(v => v === 0).length;
    aggByBrief[p.brief].push(win >= 2 ? 1 : lose >= 2 ? 0 : 'tie');
  }
}

const summary = summarize(aggByBrief);
try { fs.writeFileSync(resultsPath, JSON.stringify(summary, null, 2)); } catch {}
console.log(JSON.stringify(summary, null, 2));
const P = summary.pooled;
const surpass = (P.bootstrapCI ? P.bootstrapCI[0] : P.wilsonCI[0]) > 0.5 && Object.keys(summary.briefs).every(b => summary.briefs[b].winrate > 0.5);
console.log(`\npooled winrate ${P.winrate}  ·  ${surpass ? 'SURPASS' : 'not-yet'}  ·  judge calls ${calls}/${BUDGET}`);
console.error(`[pairwise] wrote ${resultsPath}`);
