import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import rehypeOptimizeImages from './src/lib/rehype-optimize-images.mjs';
import rehypeTableHeaders from './src/lib/rehype-table-headers.mjs';
import { computeNoindexTags } from './src/lib/noindex-tags.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, 'src/content/blog');

// Per-post lastmod for the sitemap: updatedDate if set, else the publish date.
// Read straight from frontmatter rather than importing astro:content, since
// this file runs as plain Node before the content layer is available.
function frontmatterDate(field, frontmatter) {
  const match = frontmatter.match(new RegExp(`^${field}:\\s*"?(\\d{4}-\\d{2}-\\d{2})`, 'm'));
  return match?.[1];
}

const postLastmod = new Map();
const tagToSlugs = new Map();
for (const file of fs.readdirSync(blogDir)) {
  if (!file.endsWith('.md')) continue;
  const frontmatter = fs.readFileSync(path.join(blogDir, file), 'utf-8').split('---')[1] ?? '';
  const slug = file.replace(/\.md$/, '');
  postLastmod.set(slug, frontmatterDate('updatedDate', frontmatter) ?? frontmatterDate('date', frontmatter));

  const tagLine = frontmatter.match(/^tags:\s*\[(.*?)\]/m)?.[1] ?? '';
  for (const rawTag of tagLine.split(',')) {
    const tag = rawTag.trim().replace(/^["']|["']$/g, '');
    if (!tag) continue;
    if (!tagToSlugs.has(tag)) tagToSlugs.set(tag, []);
    tagToSlugs.get(tag).push(slug);
  }
}
const noindexTags = computeNoindexTags(tagToSlugs);

export default defineConfig({
  site: 'https://markspcparts.com',
  trailingSlash: 'always',
  markdown: {
    rehypePlugins: [rehypeOptimizeImages, rehypeTableHeaders],
  },
  redirects: {
    '/finds': '/blog/',
    '/hall-of-fame': '/blog/',
    '/finds/rog-rampage-v-extreme': '/blog/rog-rampage-v-extreme-revival/',
    '/finds/z10pe-d16': '/blog/asus-z10pe-d16-dual-socket-flip/',
    '/finds/radeon-pro-v340l': '/blog/radeon-pro-v340l-teardown-repaste/',
    '/finds/z9pe-d8-ws': '/blog/dual-socket-ai-lab/',
    '/finds/xeon-silver-4114': '/blog/xeon-silver-4114-wall-art/',
    '/finds/corsair-xm2-waterblock': '/blog/corsair-xm2-nvme-waterblock-build/',
    '/finds/rog-dominus-extreme': '/blog/dominus-extreme-resurrection/',
    '/finds/vega-56-strix': '/blog/vega-56-strix-hbm/',
    '/finds/vega-64-lc': '/blog/vega-64-lc-powercolor/',
    '/finds/xeon-w-3175x': '/blog/xeon-w-3175x-270-dollar-monster/',
    '/finds/cudimm-9000-400': '/blog/cudimm-9000-400/',
    '/finds/ddr2-ecc-wall-art': '/blog/ddr2-wall-art/',
    '/finds/titan-rtx': '/blog/titan-rtx-500-dollar-score/',
    '/finds/micron-64gb-ddr4-ecc': '/blog/asus-z10pe-d16-dual-socket-flip/',
    '/finds/noctua-nh-d9dx-i4-3u': '/blog/asus-z10pe-d16-dual-socket-flip/',
    '/inventory': '/blog/',
    '/inventory/rog-dominus-extreme': '/blog/dominus-extreme-resurrection/',
    '/inventory/xeon-w-3175x': '/blog/xeon-w-3175x-270-dollar-monster/',
    '/inventory/titan-rtx': '/blog/titan-rtx-500-dollar-score/',
    '/inventory/z10pe-d16': '/blog/asus-z10pe-d16-dual-socket-flip/',
    '/inventory/micron-64gb-ddr4-ecc': '/blog/asus-z10pe-d16-dual-socket-flip/',
    '/inventory/noctua-nh-d9dx-i4-3u': '/blog/asus-z10pe-d16-dual-socket-flip/',
  },
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        if (page.includes('/search') || page.includes('/inventory')) return false;
        const tagMatch = page.match(/\/blog\/tag\/([^/]+)\/$/);
        return !(tagMatch && noindexTags.has(decodeURIComponent(tagMatch[1])));
      },
      serialize(item) {
        const match = item.url.match(/\/blog\/([a-z0-9-]+)\/$/);
        const lastmod = match && postLastmod.get(match[1]);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
});
