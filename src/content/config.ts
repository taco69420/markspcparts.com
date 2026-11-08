import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Optional search-friendly <title>/social title. The on-page H1 stays `title`.
    seoTitle: z.string().optional(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    description: z.string().optional(),
    // Optional explicit og:image path (must be raster — PNG/JPG; social sites don't render SVG).
    ogImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
