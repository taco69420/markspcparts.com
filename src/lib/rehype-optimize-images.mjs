// Rehype plugin: for every <img> rendered from post markdown, set real
// width/height (so the browser can reserve layout space), mark the first
// image in a post eager and the rest lazy, and wrap in <picture> with a
// WebP <source> when a sibling .webp file exists next to the original.
import { visit } from 'unist-util-visit';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', '..', 'public');

const metaCache = new Map();

async function getMeta(resolvedPath) {
  if (metaCache.has(resolvedPath)) return metaCache.get(resolvedPath);
  const meta = await sharp(resolvedPath).metadata().catch(() => null);
  metaCache.set(resolvedPath, meta);
  return meta;
}

export default function rehypeOptimizeImages() {
  return async (tree) => {
    const targets = [];
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'img' && parent && typeof index === 'number') {
        targets.push({ node, index, parent });
      }
    });

    let isFirst = true;
    for (const { node, index, parent } of targets) {
      const src = node.properties?.src;
      if (typeof src !== 'string' || !src.startsWith('/images/')) continue;

      const resolvedPath = path.join(publicDir, src);
      const meta = await getMeta(resolvedPath);
      if (meta?.width && meta?.height) {
        node.properties.width = meta.width;
        node.properties.height = meta.height;
      }
      node.properties.loading = isFirst ? 'eager' : 'lazy';
      node.properties.decoding = 'async';
      isFirst = false;

      const isRaster = /\.(jpe?g|png)$/i.test(src);
      const webpPath = resolvedPath.replace(/\.(jpe?g|png)$/i, '.webp');
      if (isRaster && fs.existsSync(webpPath)) {
        const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
        parent.children[index] = {
          type: 'element',
          tagName: 'picture',
          properties: {},
          children: [
            { type: 'element', tagName: 'source', properties: { srcset: webpSrc, type: 'image/webp' }, children: [] },
            node,
          ],
        };
      }
    }
  };
}
