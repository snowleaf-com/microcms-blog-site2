-- Comments on blog posts
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  blog_id TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_comments_blog_id ON comments(blog_id, created_at);
