// Renders SVG diagrams to 1200x630 PNGs (dark bg, contained) for og:image — social
// platforms don't render SVG. Usage: node scripts/make-og-pngs.mjs
import sharp from 'sharp';
const jobs = [
  'public/images/posts/dominus-extreme-phase-shedding/shed-vs-full',
  'public/images/posts/dominus-dimm2/pcie-lane-diagram',
  'public/images/posts/lga3647-mounting/mounting-diagram',
];
for (const base of jobs) {
  const svg = await sharp(`${base}.svg`, { density: 200 }).resize({ height: 630, width: 1200, fit: 'contain', background: '#0f0f0f' }).png().toFile(`${base}-og.png`);
  console.log(base, svg.width, svg.height);
}
