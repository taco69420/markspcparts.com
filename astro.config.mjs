import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://markspcparts.com',
  trailingSlash: 'never',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.includes('/search'),
      serialize(item) {
        item.lastmod = new Date().toISOString().split('T')[0];
        return item;
      },
    }),
  ],
});
