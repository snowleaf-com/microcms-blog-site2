export type Comment = {
  id: number;
  blog_id: string;
  author: string;
  content: string;
  created_at: string;
  ip_hash?: string;
};

/** 同一 IP の投稿間隔（秒） */
export const COMMENT_COOLDOWN_SECONDS = 45;

export async function getCommentsByBlogId(
  db: D1Database,
  blogId: string
): Promise<Comment[]> {
  const result = await db
    .prepare(
      'SELECT id, blog_id, author, content, created_at FROM comments WHERE blog_id = ? ORDER BY created_at ASC'
    )
    .bind(blogId)
    .all<Comment>();

  return result.results ?? [];
}

export async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}

export async function isIpRateLimited(
  db: D1Database,
  ipHash: string,
  cooldownSeconds = COMMENT_COOLDOWN_SECONDS
): Promise<boolean> {
  if (!ipHash) {
    return false;
  }

  const row = await db
    .prepare(
      'SELECT created_at FROM comments WHERE ip_hash = ? ORDER BY created_at DESC LIMIT 1'
    )
    .bind(ipHash)
    .first<{ created_at: string }>();

  if (!row?.created_at) {
    return false;
  }

  const elapsedMs = Date.now() - new Date(row.created_at).getTime();
  return elapsedMs < cooldownSeconds * 1000;
}

export async function isDuplicateRecentContent(
  db: D1Database,
  blogId: string,
  content: string
): Promise<boolean> {
  const row = await db
    .prepare(
      'SELECT content FROM comments WHERE blog_id = ? ORDER BY created_at DESC LIMIT 1'
    )
    .bind(blogId)
    .first<{ content: string }>();

  if (!row?.content) {
    return false;
  }

  return row.content === content;
}

export async function createComment(
  db: D1Database,
  params: {
    blogId: string;
    author: string;
    content: string;
    ipHash?: string;
  }
): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      'INSERT INTO comments (blog_id, author, content, created_at, ip_hash) VALUES (?, ?, ?, ?, ?)'
    )
    .bind(
      params.blogId,
      params.author,
      params.content,
      now,
      params.ipHash ?? ''
    )
    .run();
}
