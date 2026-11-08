import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: "Mark's PC Parts",
    description: "Hardware writeups. What broke, what worked, what I'm running next.",
    site: context.site!,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<language>en-us</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate><atom:link href="https://markspcparts.com/rss.xml" rel="self" type="application/rss+xml"/>`,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
}
