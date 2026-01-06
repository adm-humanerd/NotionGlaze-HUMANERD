import type { NotionPage } from "../../types/notion";
import config from "../../../site.config.mjs";

export const mapPageProperties = (page: any): NotionPage => {
  const p = page.properties;
  const map = config.notion.propertyMap;

  // Title 매핑 (배열 지원)
  const titleKeys = Array.isArray(map.title) ? map.title : [map.title];
  let title = "Untitled";
  for (const key of titleKeys) {
    if (p[key]?.title?.[0]?.plain_text) {
      title = p[key].title[0].plain_text;
      break;
    }
  }

  return {
    id: page.id,
    title,
    slug: p[map.slug]?.rich_text?.[0]?.plain_text || "",
    tags: p[map.tags]?.multi_select?.map((t: any) => t.name) || [],
    publishedAt: p[map.date]?.date?.start || page.created_time,
    cover: page.cover?.external?.url || page.cover?.file?.url || null,
    description: p[map.description]?.rich_text?.[0]?.plain_text || "",
  };
};
