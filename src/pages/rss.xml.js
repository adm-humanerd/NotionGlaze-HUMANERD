import rss from '@astrojs/rss';
import { getDatabaseContents, mapPageProperties } from "../lib/notion";

export async function GET(context) {
  const allPagesRaw = await getDatabaseContents();
  const posts = allPagesRaw
    .map(mapPageProperties)
    .filter(p => p.slug && p.slug !== 'home');

  return rss({
    title: 'NotionGlaze Blog',
    description: 'Notion으로 만드는 나만의 웹사이트',
    site: context.site || 'https://notionglaze.com',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.publishedAt),
      description: post.title,
      link: `/post/${post.slug}`,
    })),
  });
}
