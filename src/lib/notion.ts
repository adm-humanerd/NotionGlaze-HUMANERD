import { Client } from "@notionhq/client";

const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });
const DATABASE_ID = import.meta.env.NOTION_DATABASE_ID;

export const getPageBySlug = async (slug: string) => {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: "Slug",
      rich_text: { equals: slug },
    },
  });
  return response.results[0];
};

export const getBlocks = async (blockId: string) => {
  const blocks = [];
  let cursor;

  while (true) {
    const { results, next_cursor }: any = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });
    
    blocks.push(...results);
    if (!next_cursor) break;
    cursor = next_cursor;
  }

  // Recursive fetch for children
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );

  return blocks.map((block) => {
    const children = childBlocks.find((x) => x.id === block.id)?.children;
    return children ? { ...block, children } : block;
  });
};

export const getDatabaseContents = async () => {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    sorts: [{ property: "Date", direction: "descending" }],
  });
  return response.results;
};

// Helper to extract properties cleanly
export const mapPageProperties = (page: any) => {
  const p = page.properties;
  return {
    id: page.id,
    title: p.Title?.title?.[0]?.plain_text || p.Name?.title?.[0]?.plain_text || "Untitled",
    slug: p.Slug?.rich_text?.[0]?.plain_text || "",
    tags: p.Tags?.multi_select?.map((t: any) => t.name) || [],
    publishedAt: p.Date?.date?.start || page.created_time,
    cover: page.cover?.external?.url || page.cover?.file?.url || null,
  };
};
