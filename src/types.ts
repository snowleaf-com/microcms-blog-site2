export type MicroCmsImage = {
  url: string;
  width: number;
  height: number;
};

export type Tag = {
  id: string;
  name: string;
};

export type Author = {
  id: string;
  name: string;
  bio?: string;
  avatar?: MicroCmsImage;
};

export type Blog = {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  eyecatch?: MicroCmsImage;
  tags?: Tag[];
  author?: Author;
  publishedAt?: string;
  updatedAt?: string;
};

export type BlogListResponse = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type Bindings = {
  ASSETS: Fetcher;
  DB: D1Database;
  MICROCMS_SERVICE_DOMAIN: string;
  MICROCMS_API_KEY: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
};

export type AppEnv = {
  Bindings: Bindings;
};
