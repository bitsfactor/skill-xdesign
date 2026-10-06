#!/usr/bin/env node
// xdesign · measure — combine dscheck.json + optional browser metrics into a v2 scorecard.
// Usage: node measure.mjs <dscheck.json> [browser-metrics.json]
// browser metrics shape: { overflow:{w320:bool,w375:bool,w768:bool,w1280:bool},
//                          axe:{critical,serious,moderate,minor},
//                          a11y:{focus:bool,reducedMotion:bool,lang:bool,title:bool},
//                          fonts:{sizes:int}, uniqueColors:int }
import fs from 'node:fs';

const dsFile = process.argv[2];
if (!dsFile) { console.error('usage: node measure.mjs <dscheck.json> [browser-metrics.json]'); process.exit(2); }
const ds = JSON.parse(fs.readFileSync(dsFile, 'utf8'));
const b = process.argv[3] ? JSON.parse(fs.readFileSync(process.argv[3], 'utf8')) : {};
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

// token discipline: varRefs vs (rawColorsOutsideRoot + rawLengthProps)
const raws = (ds.rawColorsOutsideRoot || 0) + (ds.rawLengthProps || 0);
const token = clamp(ds.varRefs / (ds.varRefs + raws || 1), 0, 1);

// spacing
const grid = ds.spacingSamples ? 1 - (ds.offGridSpacing / ds.spacingSamples) : 1;
const spacing = clamp(grid, 0, 1);

// type
const uniqFs = (b.fonts && b.fonts.sizes) || 8;
let famScore = ds.fontFamilies.length <= 3 ? 1 : ds.fontFamilies.length <= 4 ? 0.8 : 0.6;
let fsScore = uniqFs <= 8 ? 1 : uniqFs <= 12 ? 0.85 : uniqFs <= 16 ? 0.7 : 0.5;
const type = clamp(famScore * fsScore * (ds.bannedFonts.length ? 0.7 : 1), 0, 1);

// css quality
const cssQ = clamp(1 - Math.min(0.4, (ds.important || 0) * 0.1) - Math.min(0.25, Math.max(0, (ds.bytes / 1024 - 120) / 400)), 0, 1);

// axe
let axe = 0.7; let axeW = null;
if (b.axe) { axeW = b.axe.critical * 4 + b.axe.serious * 2 + b.axe.moderate * 1 + b.axe.minor * 0.5; axe = clamp(1 / (1 + axeW / 12), 0, 1); }
else if (ds.bannedFonts.length >= 0) { axe = null; } // unknown

// robustness
let robust = 1; const ov = b.overflow || {};
if (ov.w320 || ov.w375 || ov.w768 || ov.w1280) robust = 0;
else if (b.a11y) { if (!b.a11y.focus) robust -= 0.15; if (!b.a11y.reducedMotion) robust -= 0.1; if (!b.a11y.lang) robust -= 0.2; if (!b.a11y.title) robust -= 0.2; }
robust = clamp(robust, 0, 1);

const axeForScore = axe == null ? token : axe;
const total = 10 * (0.28 * token + 0.14 * spacing + 0.12 * type + 0.12 * cssQ + 0.18 * axeForScore + 0.16 * robust);

const out = {
  file: ds.file,
  total: +total.toFixed(2),
  dims: { token: +token.toFixed(2), spacing: +spacing.toFixed(2), type: +type.toFixed(2), cssQ: +cssQ.toFixed(2), axe: axe == null ? 'na' : +axe.toFixed(2), robust: +robust.toFixed(2) },
  raw: { axeWeighted: axeW, rawColors: ds.rawColorsOutsideRoot, rawLengths: ds.rawLengthProps, offGrid: ds.offGridSpacing, important: ds.important, fonts: ds.fontFamilies, banned: ds.bannedFonts },
  gates: { ...ds.pass, noOverflow: !(ov.w320 || ov.w375 || ov.w768 || ov.w1280) },
};
console.log(JSON.stringify(out, null, 2));
