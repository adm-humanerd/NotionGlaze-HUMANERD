import { getDatabaseContents, mapPageProperties, getBlocks } from "../../lib/notion";

export async function GET() {
  const allPagesRaw = await getDatabaseContents();
  
  const searchItems = await Promise.all(allPagesRaw.map(async (pageRaw: any) => {
    const page = mapPageProperties(pageRaw);
    // 검색용 설명을 위해 첫 번째 문단을 가져옵니다. (선택 사항, 성능을 위해 생략 가능)
    // const blocks = await getBlocks(pageRaw.id);
    // const description = blocks.find((b: any) => b.type === 'paragraph')?.paragraph?.rich_text?.[0]?.plain_text || "";
    
    return {
      title: page.title,
      slug: page.slug,
      tags: page.tags || [],
      description: "", // 성능을 위해 빈 값으로 두거나 요약 속성을 따로 쓰길 권장
    };
  }));

  return new Response(JSON.stringify(searchItems), {
    headers: { "Content-Type": "application/json" }
  });
}
