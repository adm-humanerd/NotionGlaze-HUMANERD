import { Client } from "@notionhq/client";

const NOTION_API_KEY = import.meta.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = import.meta.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY) {
  if (import.meta.env.DEV) {
    console.warn("NOTION_API_KEY is missing from environment variables. Notion features will not work.");
  } else {
    throw new Error("NOTION_API_KEY is missing from environment variables");
  }
}

if (!NOTION_DATABASE_ID) {
  if (import.meta.env.DEV) {
    console.warn("NOTION_DATABASE_ID is missing from environment variables. Notion features will not work.");
  } else {
    throw new Error("NOTION_DATABASE_ID is missing from environment variables");
  }
}

export const notion = new Client({ 
  auth: NOTION_API_KEY,
});

export const DATABASE_ID = NOTION_DATABASE_ID;
