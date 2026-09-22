import { Hono } from 'hono';
import { cache } from 'hono/cache';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { Layout } from './components/layout';
import {
  getBlogDetail,
  getBlogs,
  getTags,
  hasMicroCmsConfig
} from './lib/microcms';
import { createComment, getCommentsByBlogId, hashIp, isDuplicateRecentContent, isIpRateLimited } from './lib/comment';
import { microCmsImageUrl, microCmsSrcSet } from './lib/image';
import {
  PAGE_SIZE,
  buildHomePager,
  buildTagPager,
  pageOffset,
  parsePageSlug,
  totalPages
} from './lib/pagination';
import { highlightCodeInHtml } from './lib/shiki';
import { createTocAndHtml } from './lib/toc';
import { verifyTurnstile } from './lib/turnstile';
import { BlogDetailPage } from './routes/blog';
import { HomePage } from './routes/home';
import { NotFoundPage } from './routes/not-found';
import { TagPage } from './routes/tag';
import type { AppEnv } from './types';

const app = new Hono<AppEnv>();

const AUTHOR_COOKIE = 'snowleaf-comment-author';
const SUCCESS_COOKIE = 'snowleaf-comment-success';

/** 旧 Next.js の revalidate = 300 相当（記事詳細はコメントのためキャッシュしない） */
const pageCache = cache({
  cacheName: 'snowleaf-pages-v2',
  cacheControl: 'public, max-age=300'
});

function commentErrorMessage(code?: string) {
  if (code === 'turnstile') {
    return '認証に失敗しました。もう一度お試しください。';
  }
  if (code === 'validation') {
    return '名前とコメントを正しく入力してください。';
  }
  if (code === 'rate') {
    return '投稿が少し早すぎます。しばらくしてから再度お試しください。';
  }
  if (code === 'duplicate') {
    return '直前と同じ内容のコメントは投稿できません。';
  }
  if (code === 'unavailable') {
    return 'コメント機能の準備中です。しばらくしてからお試しください。';
  }
  return '';
}

function getClientIp(c: { req: { header: (name: string) => string | undefined } }) {
  return (
    c.req.header('cf-connecting-ip') ||
    c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ||
    ''
  );
}

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
    getBlogs(env, { limit: PAGE_SIZE, offset: 0 }),
    getTags(env)
  ]);
  const pager = buildHomePager(1, posts.totalCount);

  return c.html(
    <Layout
      tags={tags}
      preloads={[
        {
          href: '/grass-bg.webp',
          as: 'image',
          type: 'image/webp',
          imageSrcSet: '/grass-bg-640.webp 640w, /grass-bg.webp 1024w',
          imageSizes: '(max-width: 1200px) calc(100vw - 32px), 1200px',
          fetchPriority: 'high'
        }
      ]}
    >
      <HomePage
        posts={posts.contents}
        hasConfig={hasMicroCmsConfig(env)}
        pager={pager}
        showPromo
      />
    </Layout>
  );
});

app.get('/:slug{page-[1-9]\\d*}', pageCache, async (c) => {
  const page = parsePageSlug(c.req.param('slug'));
  if (page == null || page === 1) {
    return c.redirect('/', 302);
  }

  const env = c.env;
  const [posts, tags] = await Promise.all([
    getBlogs(env, {
      limit: PAGE_SIZE,
      offset: pageOffset(page)
    }),
    getTags(env)
  ]);

  const pages = totalPages(posts.totalCount);
  if (pages === 0 || page > pages) {
    return c.html(
      <Layout title="404 | SnowLeaf" tags={tags}>
        <NotFoundPage />
      </Layout>,
      404
    );
  }

  const pager = buildHomePager(page, posts.totalCount);

  return c.html(
    <Layout title={`記事一覧 ${page}ページ目 | SnowLeaf`} tags={tags}>
      <HomePage
        posts={posts.contents}
        hasConfig={hasMicroCmsConfig(env)}
        pager={pager}
        showPromo={false}
      />
    </Layout>
  );
});

app.post('/blog/:id', async (c) => {
  const id = c.req.param('id');
  const formData = await c.req.formData();
  const author = String(formData.get('author') ?? '').trim();
  const content = String(formData.get('content') ?? '').trim();
  const turnstileToken = String(
    formData.get('cf-turnstile-response') ?? ''
  ).trim();

  if (!c.env.DB) {
    return c.redirect(`/blog/${id}?error=unavailable#comments`, 303);
  }

  const secret = c.env.TURNSTILE_SECRET_KEY ?? '';
  const siteKey = c.env.TURNSTILE_SITE_KEY ?? '';
  if (siteKey || secret) {
    const ok = await verifyTurnstile(turnstileToken, secret);
    if (!ok) {
      return c.redirect(`/blog/${id}?error=turnstile#comments`, 303);
    }
  }

  if (!author || !content || author.length > 50 || content.length > 1000) {
    return c.redirect(`/blog/${id}?error=validation#comments`, 303);
  }

  const ip = getClientIp(c);
  const ipHash = ip ? await hashIp(ip) : '';

  if (ipHash && (await isIpRateLimited(c.env.DB, ipHash))) {
    return c.redirect(`/blog/${id}?error=rate#comments`, 303);
  }

  if (await isDuplicateRecentContent(c.env.DB, id, content)) {
    return c.redirect(`/blog/${id}?error=duplicate#comments`, 303);
  }

  await createComment(c.env.DB, {
    blogId: id,
    author,
    content,
    ipHash
  });

  setCookie(c, AUTHOR_COOKIE, author, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    secure: true,
    sameSite: 'Lax'
  });
  setCookie(c, SUCCESS_COOKIE, 'コメントを投稿しました', {
    path: '/',
    maxAge: 10,
    httpOnly: true,
    secure: true,
    sameSite: 'Lax'
  });

  return c.redirect(`/blog/${id}#comments`, 303);
});

app.get('/blog/:id', async (c) => {
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
  const comments = env.DB
    ? await getCommentsByBlogId(env.DB, id)
    : [];

  const successMessage = getCookie(c, SUCCESS_COOKIE);
  if (successMessage) {
    deleteCookie(c, SUCCESS_COOKIE, { path: '/' });
  }

  // 共有エッジで他人の名前が漏れないよう、名前のサーバー差し込みはしない
  const commentAuthor = '';

  const eyecatchPreloads = article.eyecatch
    ? [
        {
          href: microCmsImageUrl(article.eyecatch.url, { width: 960 }),
          as: 'image' as const,
          imageSrcSet: microCmsSrcSet(article.eyecatch.url, [640, 960, 1200]),
          imageSizes:
            '(max-width: 920px) 100vw, min(780px, calc(100vw - 352px))',
          fetchPriority: 'high' as const
        }
      ]
    : [];

  const turnstileSiteKey = env.TURNSTILE_SITE_KEY ?? '';
  const scripts = turnstileSiteKey
    ? ['/toc.js', 'https://challenges.cloudflare.com/turnstile/v0/api.js']
    : ['/toc.js'];

  return c.html(
    <Layout
      title={`${article.title} | SnowLeaf`}
      description={article.excerpt ?? 'SnowLeaf 趣味ブログです。'}
      tags={tags}
      scripts={scripts}
      preloads={eyecatchPreloads}
    >
      <BlogDetailPage
        article={article}
        html={html}
        toc={toc}
        comments={comments}
        pageUrl={new URL(`/blog/${id}`, c.req.url).href}
        commentAuthor={commentAuthor}
        turnstileSiteKey={turnstileSiteKey}
        commentError={commentErrorMessage(c.req.query('error'))}
        commentSuccess={successMessage}
      />
    </Layout>
  );
});

app.get('/tag/:id/:slug{page-[1-9]\\d*}', pageCache, async (c) => {
  const id = c.req.param('id');
  const page = parsePageSlug(c.req.param('slug'));
  if (page == null || page === 1) {
    return c.redirect(`/tag/${id}`, 302);
  }

  const env = c.env;
  const [posts, tags] = await Promise.all([
    getBlogs(env, {
      tagId: id,
      limit: PAGE_SIZE,
      offset: pageOffset(page)
    }),
    getTags(env)
  ]);

  const currentTag = tags.find((tag) => tag.id === id);
  const pages = totalPages(posts.totalCount);
  if (pages === 0 || page > pages) {
    return c.html(
      <Layout title="404 | SnowLeaf" tags={tags}>
        <NotFoundPage />
      </Layout>,
      404
    );
  }

  const pager = buildTagPager(id, page, posts.totalCount);

  return c.html(
    <Layout
      title={`${currentTag?.name ?? 'Tag'} ${page}ページ目 | SnowLeaf`}
      tags={tags}
    >
      <TagPage currentTag={currentTag} posts={posts.contents} pager={pager} />
    </Layout>
  );
});

app.get('/tag/:id', pageCache, async (c) => {
  const id = c.req.param('id');
  const env = c.env;
  const [posts, tags] = await Promise.all([
    getBlogs(env, { tagId: id, limit: PAGE_SIZE, offset: 0 }),
    getTags(env)
  ]);

  const currentTag = tags.find((tag) => tag.id === id);
  const pager = buildTagPager(id, 1, posts.totalCount);

  return c.html(
    <Layout
      title={`${currentTag?.name ?? 'Tag'} | SnowLeaf`}
      tags={tags}
    >
      <TagPage currentTag={currentTag} posts={posts.contents} pager={pager} />
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
