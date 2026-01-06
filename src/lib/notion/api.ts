import { notion, DATABASE_ID } from "./client";
import type { NotionBlock } from "../../types/notion";
import type { 
  QueryDatabaseResponse, 
  GetDatabaseResponse,
  ListBlockChildrenResponse
} from "@notionhq/client/build/src/api-endpoints";

export const getPageBySlug = async (slug: string): Promise<any> => {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "Slug",
        rich_text: { equals: slug },
      },
    }) as QueryDatabaseResponse;
    return response.results[0];
  } catch (error: any) {
    if (error.code === 'validation_error' && error.message.includes('multiple data sources')) {
       return null;
    }
    throw error;
  }
};

export const getBlocks = async (blockId: string): Promise<NotionBlock[]> => {
  const blocks: any[] = [];
  let cursor: string | undefined;

  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    }) as ListBlockChildrenResponse;
    
    blocks.push(...results);
    if (!next_cursor) break;
    cursor = next_cursor ?? undefined;
  }

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
    const children = childBlocks.find((x: any) => x.id === block.id)?.children;
    return children ? { ...block, children } : block;
  });
};

export const getDatabaseContents = async (): Promise<any[]> => {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [{ property: "Date", direction: "descending" }],
    }) as QueryDatabaseResponse;
    return response.results;
  } catch (error: any) {
    if (error.code === 'validation_error' && error.message.includes('multiple data sources')) {
       return [];
    }
    throw error;
  }
};

export const getDatabaseMetadata = async (): Promise<any> => {
  try {
    const response = await notion.databases.retrieve({
      database_id: DATABASE_ID,
    }) as GetDatabaseResponse;
    return response;
  } catch (error: any) {
    if (error.code === 'validation_error' && error.message.includes('multiple data sources')) {
       return { 
         title: [{ plain_text: "NotionGlaze" }],
         description: [{ plain_text: "A minimalist Notion-based blog" }],
         icon: { emoji: "📖" }
       };
    }
    return null;
  }
};
