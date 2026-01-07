import { notion, DATABASE_ID } from "./client";
import type { NotionBlock } from "../../types/notion";
import type {
  GetDatabaseResponse,
  ListBlockChildrenResponse
} from "@notionhq/client/build/src/api-endpoints";

// QueryDatabaseResponse has been replaced or moved in v5.x when using dataSources.
// We'll use any or appropriate replacement types if available in the SDK.

/**
 * database_id를 기반으로 첫 번째 data_source_id를 조회합니다.
 */
export const getFirstDataSourceId = async (databaseId: string): Promise<string | null> => {
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    }) as any;

    if (response.data_sources && response.data_sources.length > 0) {
      return response.data_sources[0].id;
    }
    return null;
  } catch (error) {
    console.error(`Error discovering data source for database ${databaseId}:`, error);
    return null;
  }
};

let cachedDefaultDataSourceId: string | null = null;

export const getDefaultDataSourceId = async (): Promise<string> => {
  if (cachedDefaultDataSourceId) return cachedDefaultDataSourceId;

  if (!DATABASE_ID) {
    throw new Error("NOTION_DATABASE_ID is empty. Check your environment variables.");
  }

  const id = await getFirstDataSourceId(DATABASE_ID);
  if (!id) {
    throw new Error(`Could not find a valid data source for database ID: ${DATABASE_ID}. Verify that the database exists and the integration has access.`);
  }
  cachedDefaultDataSourceId = id;
  return id;
};

export const getPageBySlug = async (slug: string): Promise<any> => {
  try {
    const dataSourceId = await getDefaultDataSourceId();
    const response = await (notion as any).dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Slug",
        rich_text: { equals: slug },
      },
    });
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
      .filter((block) => block.has_children || block.type === 'child_database')
      .map(async (block) => {
        if (block.type === 'child_database') {
          // 인라인 데이터베이스 대응
          const dataSourceId = await getFirstDataSourceId(block.id);
          if (dataSourceId) {
            const dsResponse = await (notion as any).dataSources.query({
              data_source_id: dataSourceId,
            });
            return {
              id: block.id,
              children: dsResponse.results.map((page: any) => ({
                id: page.id,
                type: 'database_page',
                page: page
              })),
            };
          }
        }

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
    const dataSourceId = await getDefaultDataSourceId();
    const response = await (notion as any).dataSources.query({
      data_source_id: dataSourceId,
      sorts: [{ property: "Date", direction: "descending" }],
    });
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
    }) as any;
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

