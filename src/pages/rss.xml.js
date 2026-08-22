import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  const publishedPosts = posts
    .filter(p => !p.data.draft)
    .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());

  return rss({
    title: 'Robyn Mackenzie — Notes & Thoughts',
    description: 'Designer and user researcher driven by a belief that better services build a better world.',
    site: context.site || 'https://robynmackenzie.com',
    items: publishedPosts.map(post => ({
      title: post.data.title,
      pubDate: new Date(post.data.pubDate),
      description: post.data.description,
      link: `/posts/${post.id}/`,
    })),
    customData: `<language>en-gb</language>`,
  });
}
