import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    relatedFinds: z.array(z.string()).default([]),
  }),
});

const finds = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    description: z.string(),
    specs: z.array(z.object({ label: z.string(), value: z.string() })),
    images: z.array(z.object({ src: z.string(), alt: z.string() })),
    tags: z.array(z.string()).default([]),
    relatedPosts: z.array(z.string()).default([]),
    relatedFinds: z.array(z.string()).default([]),
    hallOfFame: z.boolean().default(false),
    rank: z.number().optional(),
  }),
});

export const collections = { blog, finds };
