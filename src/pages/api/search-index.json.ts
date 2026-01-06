import { getDatabaseContents, mapPageProperties } from "../../lib/notion";
import type { NotionPage } from "../../types/notion";

export const GET = async () => {
  const allPagesRaw = await getDatabaseContents();
  const allPages: NotionPage[] = allPagesRaw.map(mapPageProperties);

  const searchIndex = allPages.map((page) => {
    return {
      title: page.title,
      slug: page.slug,
      tags: page.tags
    };
  });

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
