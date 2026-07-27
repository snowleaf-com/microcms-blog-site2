import { createClient } from 'microcms-js-sdk';
import type { Blog, BlogListResponse, Tag } from '../types';

function normalizeServiceDomain(value?: string) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim().replace(/\/+$/, '');

  if (/^[a-z0-9-]+$/i.test(trimmed)) {
    return trimmed;
  }

  const match = trimmed.match(
    /^(?:https?:\/\/)?([a-z0-9-]+)\.microcms\.io$/i
  );
  if (match) {
    return match[1];
  }

  return undefined;
}

export type MicroCmsEnv = {
  MICROCMS_SERVICE_DOMAIN?: string;
  MICROCMS_API_KEY?: string;
};

function createMicroCmsClient(env: MicroCmsEnv) {
  const serviceDomain = normalizeServiceDomain(env.MICROCMS_SERVICE_DOMAIN);
  const apiKey = env.MICROCMS_API_KEY;

  if (!serviceDomain || !apiKey) {
    return null;
  }

  return createClient({ serviceDomain, apiKey });
}

export function hasMicroCmsConfig(env: MicroCmsEnv) {
  return Boolean(createMicroCmsClient(env));
}

function logMicroCmsError(action: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[microCMS] ${action} failed: ${message}`);
}

export async function getBlogs(
  env: MicroCmsEnv,
  params?: {
    q?: string;
    tagId?: string;
    limit?: number;
    offset?: number;
  }
) {
  const client = createMicroCmsClient(env);
  if (!client) {
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 10
    } satisfies BlogListResponse;
  }

  const filters = params?.tagId
    ? `tag[equals]${params.tagId}`
    : undefined;

  try {
    return await client.getList<Blog>({
      endpoint: 'blogs',
      queries: {
        limit: params?.limit ?? 10,
        offset: params?.offset ?? 0,
        q: params?.q,
        filters,
        orders: '-publishedAt'
      }
    });
  } catch (error) {
    logMicroCmsError('getBlogs', error);
    return {
      contents: [],
      totalCount: 0,
      offset: params?.offset ?? 0,
      limit: params?.limit ?? 10
    } satisfies BlogListResponse;
  }
}

export async function getBlogDetail(
  env: MicroCmsEnv,
  contentId: string,
  draftKey?: string
) {
  const client = createMicroCmsClient(env);
  if (!client) {
    return null;
  }

  try {
    return await client.getListDetail<Blog>({
      endpoint: 'blogs',
      contentId,
      queries: draftKey ? { draftKey } : undefined
    });
  } catch {
    return null;
  }
}

export async function getTags(env: MicroCmsEnv) {
  const client = createMicroCmsClient(env);
  if (!client) {
    return [] as Tag[];
  }

  try {
    const data = await client.getList<Tag>({
      endpoint: 'tags',
      queries: {
        limit: 100,
        orders: 'name'
      }
    });

    return data.contents;
  } catch (error) {
    logMicroCmsError('getTags', error);
    return [] as Tag[];
  }
}
