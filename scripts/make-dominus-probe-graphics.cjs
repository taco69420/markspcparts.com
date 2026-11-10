// Generates the four SVG graphics (+ a PNG og:image) for the Dominus probe-point post
// from src/data/dominus-probe-voltages.csv. Run: node scripts/make-dominus-probe-graphics.cjs
const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');
const sharp = createRequire(path.join(__dirname, '..', 'package.json'))('sharp');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public', 'images', 'posts', 'dominus-probe-points');
fs.mkdirSync(outDir, { recursive: true });

// ---- data ----
const rows = fs.readFileSync(path.join(root, 'src', 'data', 'dominus-probe-voltages.csv'), 'utf8')
  .trim().split(/\r?\n/).slice(1).map(l => {
    const [pad, name, mi, ml, hi, hl] = l.split(',');
    const num = v => (/^\d+(\.\d+)?$/.test(v) ? parseFloat(v) : null);
    return { pad: +pad, name, mi: num(mi), ml: num(ml), hi: num(hi), hl: num(hl), miRaw: mi, hiRaw: hi, hasSensor: num(hi) !== null };
  });
// ASUS manual order (Probelt table, manual p.1-33): GND then these 13
const ORDER = ['GND', 'VIN', 'VSA', 'IO', 'DRAM_ABC', 'DRAM_DEF', 'COREA', 'COREB', 'CACHE0', 'IO_A_DEF', 'IO_D_DEF', 'SFR', 'IO_A_ABC', 'IO_D_ABC'];
if (rows.map(r => r.name).join() !== ORDER.slice(1).join()) throw new Error('CSV order != ASUS manual order');

// ---- house style ----
const BG = '#0f0f0f', GREEN = '#4ade80', RED = '#f87171', AMBER = '#e8a96a', G1 = '#999', G2 = '#ccc', WHITE = '#f1f1f1';
const open = '<svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, -apple-system, sans-serif">';
const bg = `<rect width="900" height="520" fill="${BG}"/>`;
const wm = '<text x="892" y="513" text-anchor="end" font-size="12" fill="#fff" opacity="0.55">markspcparts.com</text>';
const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.size || 13}" fill="${o.fill || G2}"${o.anchor ? ` text-anchor="${o.anchor}"` : ''}${o.weight ? ` font-weight="${o.weight}"` : ''}${o.rot ? ` transform="rotate(${o.rot} ${x} ${y})"` : ''}>${s}</text>`;
const mono = 'font-family="ui-monospace, Consolas, monospace"';
const save = (name, body) => fs.writeFileSync(path.join(outDir, name), `${open}${bg}${body}${wm}</svg>\n`);
const v3 = v => v.toFixed(3);

// ================= (a) table: 13 pads, HWiNFO idle =================
{
  let b = T(40, 36, '13 probe pads: what HWiNFO shows at idle', { size: 20, fill: WHITE, weight: 600 });
  b += T(40, 58, 'Pads 2–14 (pad 1 is GND, the black-probe reference). 8 of 13 have no software sensor — highlighted.', { size: 13, fill: G1 });
  b += T(50, 90, 'PAD', { size: 11, fill: G1 }) + T(110, 90, 'NAME', { size: 11, fill: G1 }) + T(440, 90, 'HWiNFO IDLE', { size: 11, fill: G1, anchor: 'end' });
  const y0 = 98, rh = 29;
  rows.forEach((r, i) => {
    const y = y0 + i * rh;
    if (r.hasSensor) {
      b += `<rect x="40" y="${y}" width="420" height="${rh - 3}" rx="6" fill="#161616" stroke="#2a2a2a"/>`;
      b += T(50, y + 19, r.pad, { size: 13, fill: G1 }) + T(110, y + 19, r.name, { size: 14, fill: G2 });
      b += `<text x="440" y="${y + 19}" font-size="14" fill="${GREEN}" text-anchor="end" ${mono}>${v3(r.hi)} V</text>`;
    } else {
      b += `<rect x="40" y="${y}" width="420" height="${rh - 3}" rx="6" fill="${AMBER}" fill-opacity="0.14" stroke="${AMBER}" stroke-width="1.5"/>`;
      b += T(50, y + 19, r.pad, { size: 13, fill: AMBER }) + T(110, y + 19, r.name, { size: 14, fill: WHITE, weight: 600 });
      b += T(440, y + 19, 'not exposed', { size: 14, fill: AMBER, anchor: 'end', weight: 600 });
    }
  });
  // side summary
  b += `<rect x="500" y="98" width="360" height="150" rx="10" fill="#161616" stroke="#2a2a2a"/>`;
  b += T(520, 128, '5 pads have a HWiNFO row', { size: 15, fill: GREEN, weight: 600 });
  b += T(520, 150, 'VIN, VSA, IO, DRAM_ABC, DRAM_DEF', { size: 12, fill: G2 });
  b += T(520, 186, '8 pads: no sensor row', { size: 15, fill: AMBER, weight: 600 });
  b += T(520, 208, 'COREA, COREB, CACHE0, IO_A_DEF,', { size: 12, fill: G2 });
  b += T(520, 226, 'IO_D_DEF, SFR, IO_A_ABC, IO_D_ABC', { size: 12, fill: G2 });
  b += T(500, 274, 'HWiNFO values: idle screenshot, probed Nov 8.', { size: 12, fill: G1 });
  b += T(500, 292, '"Not exposed" = I couldn’t find a row for it', { size: 12, fill: G1 });
  b += T(500, 310, 'in HWiNFO, not a claim the rail doesn’t exist.', { size: 12, fill: G1 });
  save('pads-hwinfo-idle-table.svg', b);
}

// ================= (b) meter vs HWiNFO, 5 rails, idle + load =================
{
  const rails = rows.filter(r => r.hasSensor);
  const pb = 440, sc = 160, x0 = 80, gw = 160; // 160 px per volt, 0..2 V
  let b = T(40, 36, 'Multimeter vs HWiNFO — the 5 rails that have a sensor', { size: 20, fill: WHITE, weight: 600 });
  b += T(40, 58, 'Idle and load, volts. Bars start at 0 V, so small gaps look small — read the labels.', { size: 13, fill: G1 });
  b += `<rect x="40" y="74" width="12" height="12" rx="2" fill="${GREEN}"/>` + T(58, 85, 'multimeter', { size: 12 });
  b += `<rect x="140" y="74" width="12" height="12" rx="2" fill="${AMBER}"/>` + T(158, 85, 'HWiNFO', { size: 12 });
  [0, 0.5, 1, 1.5, 2].forEach(v => {
    const y = pb - v * sc;
    b += `<line x1="${x0}" x2="880" y1="${y}" y2="${y}" stroke="#262626"/>` + T(x0 - 8, y + 4, v.toFixed(1), { size: 11, fill: G1, anchor: 'end' });
  });
  rails.forEach((r, g) => {
    const gx = x0 + g * gw;
    const bars = [[8, r.mi, GREEN], [38, r.hi, AMBER], [88, r.ml, GREEN], [118, r.hl, AMBER]];
    bars.forEach(([ox, val, col]) => {
      const h = val * sc, x = gx + ox;
      b += `<rect x="${x}" y="${pb - h}" width="28" height="${h}" rx="3" fill="${col}"/>`;
      b += T(x + 18, pb - h - 5, v3(val), { size: 11, fill: G2, rot: -90 });
    });
    b += T(gx + 36, pb + 17, 'idle', { size: 11, fill: G1, anchor: 'middle' }) + T(gx + 116, pb + 17, 'load', { size: 11, fill: G1, anchor: 'middle' });
    b += T(gx + 76, pb + 38, r.name, { size: 14, fill: WHITE, anchor: 'middle', weight: 600 });
    if (r.name === 'VIN') b += `<rect x="${gx + 82}" y="96" width="68" height="${pb - 96 + 4}" rx="6" fill="none" stroke="${RED}" stroke-dasharray="4 3"/>`;
  });
  const vin = rows.find(r => r.name === 'VIN');
  b += T(40, 497, `VIN under load: meter ${v3(vin.ml)} V vs HWiNFO ${v3(vin.hl)} V (${Math.round((vin.ml - vin.hl) * 1000)} mV apart). Cause unknown.`, { size: 12, fill: RED });
  save('meter-vs-hwinfo.svg', b);
}

// ================= (c) load - idle (mV), ±10 mV band, COREA callout =================
{
  const list = rows.filter(r => r.name !== 'COREA');
  const xv = v => 140 + (v + 50) * 2; // -50..+200 mV -> x 140..640
  const y0 = 92, rh = 30;
  let b = T(40, 36, 'Load minus idle, in millivolts', { size: 20, fill: WHITE, weight: 600 });
  b += T(40, 58, 'Multimeter bars; hollow diamonds = HWiNFO on the 5 rails that have a sensor. Shaded band = ±10 mV.', { size: 13, fill: G1 });
  b += `<rect x="${xv(-10)}" y="${y0 - 8}" width="${xv(10) - xv(-10)}" height="${list.length * rh + 6}" fill="${GREEN}" fill-opacity="0.12"/>`;
  [-50, 0, 50, 100, 150, 200].forEach(v => {
    b += `<line x1="${xv(v)}" x2="${xv(v)}" y1="${y0 - 8}" y2="${y0 + list.length * rh - 2}" stroke="${v === 0 ? '#555' : '#222'}"/>` + T(xv(v), y0 + list.length * rh + 16, v, { size: 11, fill: G1, anchor: 'middle' });
  });
  b += T(xv(75), y0 + list.length * rh + 32, 'mV (load − idle)', { size: 11, fill: G1, anchor: 'middle' });
  list.forEach((r, i) => {
    const y = y0 + i * rh, d = Math.round((r.ml - r.mi) * 1000);
    const out = Math.abs(d) > 10, col = out ? RED : GREEN;
    b += T(130, y + 14, `${r.pad} ${r.name}`, { size: 13, fill: G2, anchor: 'end' });
    const x1 = xv(0), x2 = xv(d);
    b += `<rect x="${Math.min(x1, x2)}" y="${y + 3}" width="${Math.max(Math.abs(x2 - x1), 2)}" height="15" rx="3" fill="${col}"/>`;
    let right = Math.max(x1, x2), label = `${d > 0 ? '+' : d < 0 ? '−' : '±'}${Math.abs(d)} mV`;
    if (r.hasSensor) {
      const h = Math.round((r.hl - r.hi) * 1000), hx = xv(h);
      b += `<path d="M${hx} ${y + 4} l6 6.5 l-6 6.5 l-6 -6.5 z" fill="${BG}" stroke="${AMBER}" stroke-width="2"/>`;
      right = Math.max(right, hx + 6);
      label += `  (HWiNFO ${h > 0 ? '+' : h < 0 ? '−' : '±'}${Math.abs(h)})`;
    }
    b += T(right + 8, y + 15, label, { size: 12, fill: out ? RED : G2 });
  });
  // COREA callout
  const ca = rows.find(r => r.name === 'COREA');
  b += `<rect x="700" y="84" width="185" height="200" rx="10" fill="#161616" stroke="${AMBER}" stroke-width="1.5"/>`;
  b += T(716, 112, 'COREA', { size: 16, fill: AMBER, weight: 600 }) + T(716, 130, 'excluded from this chart', { size: 12, fill: G1 });
  b += T(716, 160, 'idle', { size: 12, fill: G1 }) + T(716, 182, 'wandering', { size: 15, fill: WHITE }) + T(716, 202, '0.20–0.81 V', { size: 17, fill: WHITE, weight: 600 });
  b += T(716, 232, 'load', { size: 12, fill: G1 }) + T(716, 256, `${v3(ca.ml)} V`, { size: 17, fill: GREEN, weight: 600 });
  b += T(716, 276, 'idle retested, same behavior', { size: 11, fill: G1 });
  b += T(700, 310, 'No single idle value, so', { size: 12, fill: G1 }) + T(700, 328, 'there is no honest delta.', { size: 12, fill: G1 });
  b += T(40, 504, 'Idle probed Nov 8, load Nov 9 — different days. ±10 mV is roughly the meter’s tolerance here (about ±7–11 mV).', { size: 12, fill: G1 });
  save('load-minus-idle.svg', b);
}

// ================= (d) pad diagram =================
let padSvgBody;
{
  const sensor = new Set(rows.filter(r => r.hasSensor).map(r => r.name));
  const UNKNOWN = new Set(['COREA', 'COREB']);
  const note = {
    GND: 'black probe reference',
    COREA: 'ASUS label only — I don’t know what it feeds',
    COREB: 'reads close to the BIOS Core Voltage readout (read in different states)',
    IO_A_DEF: 'label only', IO_D_DEF: 'label only',
    IO_A_ABC: 'label only', IO_D_ABC: 'label only',
    SFR: 'label only',
  };
  const cls = n => n === 'VIN' ? ['dis', AMBER, 'has a software sensor, but it disagrees under load'] : n === 'GND' ? ['ref', WHITE, 'reference (GND)'] : UNKNOWN.has(n) ? ['unk', G1, 'unknown'] : sensor.has(n) ? ['ok', GREEN, 'measured · matches a software sensor'] : ['nos', AMBER, 'measured · no software sensor'];
  let b = T(40, 34, 'ROG Dominus Extreme probe header — in the order ASUS prints it', { size: 20, fill: WHITE, weight: 600 });
  b += T(40, 54, 'GND plus 13 pads, numbered top to bottom as in the ASUS manual diagram. Labels are ASUS’s; I add nothing to them.', { size: 12, fill: G1 });
  b += `<rect x="40" y="68" width="48" height="${14 * 29 - 2}" rx="8" fill="#161616" stroke="#2a2a2a"/>`;
  ORDER.forEach((n, i) => {
    const y = 84 + i * 29, [k, col, status] = cls(n);
    const dash = k === 'unk' ? ' stroke-dasharray="3 2"' : '';
    b += `<circle cx="64" cy="${y + 8}" r="11" fill="${k === 'ref' ? 'none' : col}" fill-opacity="${k === 'unk' ? 0.15 : 1}" stroke="${col}" stroke-width="1.5"${dash}/>`;
    b += T(64, y + 12.5, i + 1, { size: 11, fill: k === 'ref' || k === 'unk' ? col : '#0f0f0f', anchor: 'middle', weight: 700 });
    b += T(110, y + 13, n, { size: 15, fill: col, weight: 600 });
    b += T(250, y + 13, status, { size: 12, fill: G2 });
    if (note[n]) b += T(490, y + 13, note[n], { size: 11, fill: G1 });
  });
  const ly = 497;
  [[GREEN, 'measured, matches a software sensor', 0], [AMBER, 'measured, no software sensor (or it disagrees: VIN)', 255], [G1, 'unknown', 640]].forEach(([c, t, dx]) => {
    b += `<circle cx="${52 + dx}" cy="${ly}" r="6" fill="${c}"${c === G1 ? ' fill-opacity="0.15" stroke="#999" stroke-dasharray="3 2"' : ''}/>` + T(64 + dx, ly + 4, t, { size: 12 });
  });
  save('pad-diagram.svg', b);
  padSvgBody = b;
}

// og:image (raster) from the pad diagram
(async () => {
  const svg = fs.readFileSync(path.join(outDir, 'pad-diagram.svg'));
  await sharp(svg, { density: 192 }).resize({ width: 1200 }).png({ compressionLevel: 9 }).toFile(path.join(outDir, 'pad-diagram-og.png'));
  const m = await sharp(path.join(outDir, 'pad-diagram-og.png')).metadata();
  console.log('og png', m.width + 'x' + m.height);
  for (const f of ['pads-hwinfo-idle-table.svg', 'meter-vs-hwinfo.svg', 'load-minus-idle.svg', 'pad-diagram.svg']) console.log(f, fs.statSync(path.join(outDir, f)).size + ' B');
  // preview rasters for my own legibility check (kept in scratch, not the repo)
})();
