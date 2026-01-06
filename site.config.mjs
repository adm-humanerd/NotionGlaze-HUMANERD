// site.config.mjs
export default {
  site: {
    title: "NotionGlaze",
    description: "Notion에서 작성하고 자동으로 발행되는 블로그입니다.",
    homeButtonText: "블로그 탐색하기",
    recentPostsTitle: "Recent Stories",
    viewAllPostsText: "View all posts →",
    archiveTitle: "Insight Archive",
    readArticleText: "Read Article",
    defaultPostDescription: "클릭하여 내용을 확인하세요.",
  },
  notion: {
    databaseId: process.env.NOTION_DATABASE_ID,
    propertyMap: {
      title: ["Title", "Name"],
      slug: "Slug",
      tags: "Tags",
      date: "Date",
      description: "Description",
    }
  },
  design: {
    font: "Inter",
    contentWidth: "900px", // Notion 표준 너비
    borderRadius: "12px",
    primaryColor: "#ec4899", // 기본 핑크색
  }
}
