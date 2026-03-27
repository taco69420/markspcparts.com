import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(_ctx: APIContext) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const index = posts.map(post => ({
    title: post.data.title,
    description: post.data.description ?? '',
    tags: post.data.tags,
    slug: post.slug,
    url: `/blog/${post.slug}`,
    date: post.data.date.toISOString(),
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
