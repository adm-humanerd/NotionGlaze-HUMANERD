import type { NotionPage } from "../../types/notion";

export const mapPageProperties = (page: any): NotionPage => {
  const p = page.properties;
  return {
    id: page.id,
    title: p.Title?.title?.[0]?.plain_text || p.Name?.title?.[0]?.plain_text || "Untitled",
    slug: p.Slug?.rich_text?.[0]?.plain_text || "",
    tags: p.Tags?.multi_select?.map((t: any) => t.name) || [],
    publishedAt: p.Date?.date?.start || page.created_time,
    cover: page.cover?.external?.url || page.cover?.file?.url || null,
    description: p.Description?.rich_text?.[0]?.plain_text || "",
  };
};
