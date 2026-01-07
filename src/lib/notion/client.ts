import { Client } from "@notionhq/client";

// 환경 변수 가져오기
const NOTION_API_KEY = import.meta.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = import.meta.env.NOTION_DATABASE_ID;

// 클라이언트 초기화 (에러는 사용 시점에 던지거나 경고만 출력)
if (!NOTION_API_KEY && !import.meta.env.DEV) {
  console.error("CRITICAL: NOTION_API_KEY is missing. Requests will fail.");
}

if (!NOTION_DATABASE_ID && !import.meta.env.DEV) {
  console.error("CRITICAL: NOTION_DATABASE_ID is missing. Requests will fail.");
}

export const notion = new Client({
  auth: NOTION_API_KEY || "missing-key",
  notionVersion: "2025-09-03",
});

export const DATABASE_ID = NOTION_DATABASE_ID || "";
