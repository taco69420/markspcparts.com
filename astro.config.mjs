import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://markspcparts.com',
  trailingSlash: 'never',
  redirects: {
    '/inventory': '/finds',
    '/inventory/rog-dominus-extreme': '/finds/rog-dominus-extreme',
    '/inventory/xeon-w-3175x': '/finds/xeon-w-3175x',
    '/inventory/titan-rtx': '/finds/titan-rtx',
    '/inventory/z10pe-d16': '/finds/z10pe-d16',
    '/inventory/micron-64gb-ddr4-ecc': '/finds/micron-64gb-ddr4-ecc',
    '/inventory/noctua-nh-d9dx-i4-3u': '/finds/noctua-nh-d9dx-i4-3u',
  },
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.includes('/search') && !page.includes('/inventory'),
      serialize(item) {
        item.lastmod = new Date().toISOString().split('T')[0];
        return item;
      },
    }),
  ],
});
