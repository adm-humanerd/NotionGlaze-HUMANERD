// site.config.mjs
export default {
  notion: {
    databaseId: process.env.NOTION_DATABASE_ID,
  },
  design: {
    font: "Inter",
    contentWidth: "900px", // Notion 표준 너비
    borderRadius: "12px",
    primaryColor: "#ec4899", // 기본 핑크색
  }
}
