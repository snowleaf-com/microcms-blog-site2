export type Comment = {
  id: number;
  blog_id: string;
  author: string;
  content: string;
  created_at: string;
};

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

export async function createComment(
  db: D1Database,
  params: { blogId: string; author: string; content: string }
): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      'INSERT INTO comments (blog_id, author, content, created_at) VALUES (?, ?, ?, ?)'
    )
    .bind(params.blogId, params.author, params.content, now)
    .run();
}
