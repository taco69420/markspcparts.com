// Decides which tag archive pages are too thin to be worth indexing.
// A tag is noindexed when it has 1–2 posts, or when it lists exactly the same
// posts as another tag (the alphabetically first tag of a duplicate group stays indexed).
// Used by both the tag page (robots meta) and astro.config.mjs (sitemap filter).
export function computeNoindexTags(tagToSlugs) {
  const noindex = new Set();
  const seenSets = new Map();
  for (const tag of [...tagToSlugs.keys()].sort()) {
    const slugs = [...tagToSlugs.get(tag)].sort();
    if (slugs.length <= 2) {
      noindex.add(tag);
      continue;
    }
    const key = slugs.join('|');
    if (seenSets.has(key)) noindex.add(tag);
    else seenSets.set(key, tag);
  }
  return noindex;
}
