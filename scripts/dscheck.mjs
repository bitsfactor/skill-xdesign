#!/usr/bin/env node
// xdesign · dscheck — static design-system discipline checker (no deps).
// Usage: node dscheck.mjs <file.html> [--json] [--strict]
// Exit 0 normally; with --strict exits 1 if any gate fails.
import fs from 'node:fs';

const file = process.argv[2];
if (!file) { console.error('usage: node dscheck.mjs <file.html> [--json] [--strict]'); process.exit(2); }
const html = fs.readFileSync(file, 'utf8');

const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).join('\n');
const inline = [...html.matchAll(/\sstyle="([^"]*)"/gi)].map(m => m[1]).join(';\n');
const css = styles + '\n' + inline;

const tokenDecls = new Set([...css.matchAll(/--[\w-]+\s*:/g)].map(m => m[0].replace(/\s*:$/, '')));
const varRefs = (css.match(/var\(\s*--/g) || []).length;

const colorRe = /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(|\boklch\(|\blab\(/g;
const allColors = css.match(colorRe) || [];
const rootBlocks = [...css.matchAll(/:root\s*\{([\s\S]*?)\}/g)].map(m => m[1]).join('\n');
const rootColors = (rootBlocks.match(colorRe) || []).length;
const rawColorsOutsideRoot = Math.max(0, allColors.length - rootColors);

// raw lengths in layout/type props
const propRe = /\b(padding|padding-(?:top|right|bottom|left)|margin|margin-(?:top|right|bottom|left)|gap|row-gap|column-gap|border-radius|font-size)\s*:\s*([^;{}]+)/gi;
let rawLengthProps = 0, gridTotal = 0, offGrid = 0;
for (const m of css.matchAll(propRe)) {
  const val = m[2];
  for (const v of val.matchAll(/(-?\d*\.?\d+)(px|rem|em)\b/g)) {
    rawLengthProps++;
    let px = parseFloat(v[1]); if (v[2] === 'rem' || v[2] === 'em') px *= 16;
    // on-grid = multiple of 4, or the 2px micro value. Anything else is off-grid.
    const ipx = Math.round(px);
    if (ipx > 0) { gridTotal++; if (ipx % 4 !== 0 && ipx !== 2) offGrid++; }
  }
}

const important = (css.match(/!important/g) || []).length;
const fontFams = [...css.matchAll(/font-family\s*:\s*([^;{}]+)/gi)]
  .map(m => m[1].split(',')[0].replace(/["']/g, '').trim()).filter(Boolean);
const uniqFams = [...new Set(fontFams)];
const banned = uniqFams.filter(f => /^(Inter|Roboto|Arial|Space Grotesk|Helvetica|system-ui)$/i.test(f));

// hero composition: imagery (inline SVG) vs code/terminal
const totalSvg = (html.match(/<svg/g) || []).length;
const totalPre = (html.match(/<pre/g) || []).length;
const h1i = html.indexOf('<h1');
const heroWin = h1i >= 0 ? html.slice(Math.max(0, h1i - 600), h1i + 2600) : '';
const heroSvg = (heroWin.match(/<svg/g) || []).length;
const heroPre = (heroWin.match(/<pre/g) || []).length;

const report = {
  file,
  bytes: html.length,
  tokenDecls: tokenDecls.size,
  varRefs,
  rawColorsOutsideRoot,
  rawLengthProps,
  important,
  fontFamilies: uniqFams,
  bannedFonts: banned,
  spacingSamples: gridTotal,
  offGridSpacing: offGrid,
  totalSvg,
  totalPre,
  heroSvg,
  heroPre,
  pass: {
    noImportant: important === 0,
    fontsDisciplined: uniqFams.length <= 3 && banned.length === 0,
    tokensExist: tokenDecls.size > 0,
    tokenDominated: varRefs >= rawColorsOutsideRoot + rawLengthProps, // heuristic: refs ≥ raw usage
    spacingOnGrid: offGrid === 0,
    heroImagery: heroSvg >= 1 && heroPre === 0, // hero led by an illustration, NOT a code/terminal block
  },
};

console.log(JSON.stringify(report, null, 2));
if (process.argv.includes('--strict') && !Object.values(report.pass).every(Boolean)) process.exit(1);
