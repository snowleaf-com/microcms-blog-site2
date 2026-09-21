-- Rate-limit / abuse checks by IP hash
ALTER TABLE comments ADD COLUMN ip_hash TEXT NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_comments_ip_hash_created
  ON comments(ip_hash, created_at);
