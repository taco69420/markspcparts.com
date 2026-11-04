// One-time maintenance script: resize oversized source photos in public/images
// down to sane display dimensions and generate a WebP sibling for each.
// Run with: node scripts/optimize-images.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '..', 'public', 'images');

const MAX_WIDTH = 1600; // hero/largest display size on the site; inline images are constrained by CSS to ~1000px but share this source
const JPEG_QUALITY = 82;
const WEBP_QUALITY = 78;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) files.push(full);
  }
  return files;
}

const files = walk(imagesDir);
let totalBefore = 0;
let totalAfter = 0;
const report = [];

for (const file of files) {
  const before = fs.statSync(file).size;
  totalBefore += before;

  const image = sharp(file);
  const metadata = await image.metadata();
  const needsResize = metadata.width && metadata.width > MAX_WIDTH;

  const pipeline = needsResize ? image.resize({ width: MAX_WIDTH }) : image;
  const ext = path.extname(file).toLowerCase();
  const isPng = ext === '.png';

  const jpegBuffer = isPng
    ? await pipeline.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()
    : await pipeline.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
  const webpBuffer = await pipeline.clone().webp({ quality: WEBP_QUALITY }).toBuffer();

  // Write to a temp path and rename over the original — writing in place while
  // sharp still holds the source file open causes EBUSY/UNKNOWN on Windows+OneDrive.
  const targetPath = isPng ? file.replace(/\.png$/i, '.jpg') : file;
  if (jpegBuffer.length < before) {
    const tmpPath = targetPath + '.tmp';
    fs.writeFileSync(tmpPath, jpegBuffer);
    fs.renameSync(tmpPath, targetPath);
    if (isPng) fs.unlinkSync(file);
  }

  const webpPath = file.replace(/\.(jpe?g|png)$/i, '.webp');
  const webpTmpPath = webpPath + '.tmp';
  fs.writeFileSync(webpTmpPath, webpBuffer);
  fs.renameSync(webpTmpPath, webpPath);

  const after = fs.statSync(targetPath).size;
  totalAfter += after;
  report.push({ file: path.relative(imagesDir, file), before, after, resized: needsResize, origWidth: metadata.width });
}

report.sort((a, b) => b.before - a.before);
for (const r of report) {
  console.log(
    `${r.file.padEnd(55)} ${(r.before / 1024 / 1024).toFixed(2)}MB -> ${(r.after / 1024 / 1024).toFixed(2)}MB` +
    (r.resized ? ` (resized from ${r.origWidth}px)` : '')
  );
}
console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`);
