import { Hono } from 'hono';
import { cache } from 'hono/cache';
import { Layout } from './components/layout';
import {
  getBlogDetail,
  getBlogs,
  getTags,
  hasMicroCmsConfig
} from './lib/microcms';
import { highlightCodeInHtml } from './lib/shiki';
import { createTocAndHtml } from './lib/toc';
import { BlogDetailPage } from './routes/blog';
import { HomePage } from './routes/home';
import { NotFoundPage } from './routes/not-found';
import { TagPage } from './routes/tag';
import type { AppEnv } from './types';

const app = new Hono<AppEnv>();

/** 旧 Next.js の revalidate = 300 相当 */
const pageCache = cache({
  cacheName: 'snowleaf-pages-v1',
  cacheControl: 'public, max-age=300'
});

app.get('/api/health', (c) => {
  return c.json({
    ok: true,
    service: 'snowleaf',
    timestamp: new Date().toISOString(),
    microcms: {
      configured: hasMicroCmsConfig(c.env)
    }
  });
});

app.get('/', pageCache, async (c) => {
  const env = c.env;
  const [posts, tags] = await Promise.all([
    getBlogs(env, { limit: 12 }),
    getTags(env)
  ]);

  return c.html(
    <Layout tags={tags}>
      <HomePage
        posts={posts.contents}
        hasConfig={hasMicroCmsConfig(env)}
      />
    </Layout>
  );
});

app.get('/blog/:id', pageCache, async (c) => {
  const id = c.req.param('id');
  const env = c.env;
  const [article, tags] = await Promise.all([
    getBlogDetail(env, id),
    getTags(env)
  ]);

  if (!article) {
    return c.html(
      <Layout title="404 | SnowLeaf" tags={tags}>
        <NotFoundPage />
      </Layout>,
      404
    );
  }

  const highlightedContent = await highlightCodeInHtml(article.content);
  const { toc, html } = createTocAndHtml(highlightedContent);

  return c.html(
    <Layout
      title={`${article.title} | SnowLeaf`}
      description={article.excerpt ?? 'SnowLeaf 趣味ブログです。'}
      tags={tags}
      scripts={['/toc.js']}
    >
      <BlogDetailPage article={article} html={html} toc={toc} />
    </Layout>
  );
});

app.get('/tag/:id', pageCache, async (c) => {
  const id = c.req.param('id');
  const env = c.env;
  const [posts, tags] = await Promise.all([
    getBlogs(env, { tagId: id, limit: 12 }),
    getTags(env)
  ]);

  const currentTag = tags.find((tag) => tag.id === id);

  return c.html(
    <Layout
      title={`${currentTag?.name ?? 'Tag'} | SnowLeaf`}
      tags={tags}
    >
      <TagPage currentTag={currentTag} posts={posts.contents} />
    </Layout>
  );
});

app.notFound(async (c) => {
  const tags = await getTags(c.env);
  return c.html(
    <Layout title="404 | SnowLeaf" tags={tags}>
      <NotFoundPage />
    </Layout>,
    404
  );
});

export default app;
