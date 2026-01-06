export interface NotionPage {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  publishedAt: string;
  cover: string | null;
  description?: string;
}

export interface NotionBlock {
  id: string;
  type: string;
  has_children: boolean;
  children?: NotionBlock[];
  [key: string]: any;
}

export interface NotionDatabaseMetadata {
  title: string;
  description: string;
  icon: string | null;
  emoji: string | null;
}
