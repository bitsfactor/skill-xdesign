#!/usr/bin/env node
// xdesign · pairwise — judge A/B pairs across 3 models × both orders; Wilson CI + pooled bootstrap.
// Usage: node pairwise.mjs <manifest.json> [--dry]
// manifest.json:
// {
//   "judges": ["develop/claude-sonnet-5-5","develop/claude-opus-5-5","develop/gemini-3.1-pro-preview"],
//   "pairs": [ { "brief":"B1", "a":"/abs/xdesign.png", "b":"/abs/opponent.png" }, ... ],  // a = xdesign, b = opponent
//   "budget": 400
// }
// Verdict per judge order: "Better: A|B|tie". A judge ticket = win/lose only if both orders agree, else tie.
// Aggregate: >=2 win => win, >=2 lose => lose, else tie (0.5).
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const file = process.argv[2];
if (!file) { console.error('usage: node pairwise.mjs <manifest.json> [--dry]'); process.exit(2); }
const man = JSON.parse(fs.readFileSync(file, 'utf8'));
const JUDGES = man.judges || ['develop/claude-sonnet-5-5', 'develop/claude-opus-5-5', 'develop/gemini-3.1-pro-preview'];
const BUDGET = man.budget || 1e9;
const DRY = process.argv.includes('--dry');
const PROMPT = 'A 与 B 是同一产品的两个网页首屏截图（A、B 顺序无关）。只输出一行，不要解释：Better: A 或 B 或 tie';

let calls = 0;
function ask(orderA, orderB) {
  if (calls >= BUDGET) throw new Error('budget exceeded');
  calls++;
  if (DRY) return 'tie';
  const out = execFileSync('opencode', ['run', PROMPT, '--model', JUDGES[0], '--file', orderA, '--file', orderB], { encoding: 'utf8', timeout: 180000 });
  const m = out.match(/Better:\s*(A|B|tie)/i);
  return m ? m[1].toLowerCase() : 'tie';
}

// one judge ticket for a pair (a=xdesign, b=opponent)
function ticket(judge, a, b) {
  // order 1: A=a(xdesign), B=b(opp)
  const v1 = judgeCall(judge, a, b); // 'A'|'B'|'tie'
  // order 2: A=b(opp), B=a(xdesign)  -> xdesign wins if 'B'
  const v2 = judgeCall(judge, b, a);
  const w1 = v1 === 'a' ? 1 : v1 === 'b' ? 0 : null;   // 1 = xdesign won
  const w2 = v2 === 'b' ? 1 : v2 === 'a' ? 0 : null;
  if (w1 != null && w2 != null && w1 === w2) return w1; // 1 win, 0 lose
  return 'tie';
}
function judgeCall(judge, orderA, orderB) {
  if (calls >= BUDGET) throw new Error('budget exceeded');
  calls++;
  if (DRY) return 'tie';
  const out = execFileSync('opencode', ['run', PROMPT, '--model', judge, '--file', orderA, '--file', orderB], { encoding: 'utf8', timeout: 180000 });
  const m = out.match(/Better:\s*(A|B|tie)/i);
  return m ? m[1].toLowerCase() : 'tie';
}

function wilson(k, n) { // k = wins+0.5*ties (float ok)
  if (!n) return [0, 0];
  const p = k / n, z = 1.96, z2 = z * z;
  const denom = 1 + z2 / n;
  const center = (p + z2 / (2 * n)) / denom;
  const half = (z * Math.sqrt((p * (1 - p) / n) + z2 / (4 * n * n))) / denom;
  return [Math.max(0, center - half), Math.min(1, center + half)];
}

// run
const byBrief = {};
for (const p of man.pairs) {
  byBrief[p.brief] = byBrief[p.brief] || [];
  const votes = [];
  for (const j of JUDGES) votes.push(ticket(j, p.a, p.b));
  const win = votes.filter(v => v === 1).length, lose = votes.filter(v => v === 0).length;
  const result = win >= 2 ? 1 : lose >= 2 ? 0 : 'tie';
  byBrief[p.brief].push(result);
}

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

// clustered bootstrap over briefs for pooled CI
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

console.log(JSON.stringify(summary, null, 2));
const P = summary.pooled; const surpass = (P.bootstrapCI ? P.bootstrapCI[0] : P.wilsonCI[0]) > 0.5 && briefs.every(b => summary.briefs[b].winrate > 0.5);
console.log(`\npooled winrate ${P.winrate}  ·  ${surpass ? 'SURPASS' : 'not-yet'}  ·  judge calls ${calls}/${BUDGET}`);
