import {
  ArticleTocAccordion,
  ArticleTocSidebar
} from '../components/article-toc';
import { CommentForm } from '../components/comment-form';
import { CommentList } from '../components/comment-list';
import { TagCard } from '../components/tag-card';
import type { Comment } from '../lib/comment';
import { formatDate } from '../lib/date';
import { microCmsImageUrl, microCmsSrcSet } from '../lib/image';
import type { Blog, TocItem } from '../types';

type BlogDetailPageProps = {
  article: Blog;
  html: string;
  toc: TocItem[];
  comments: Comment[];
  commentAuthor?: string;
  turnstileSiteKey?: string;
  commentError?: string;
  commentSuccess?: string;
};

const EYECATCH_SIZES =
  '(max-width: 920px) 100vw, min(780px, calc(100vw - 352px))';

export function BlogDetailPage({
  article,
  html,
  toc,
  comments,
  commentAuthor = '',
  turnstileSiteKey = '',
  commentError,
  commentSuccess
}: BlogDetailPageProps) {
  const eyecatch = article.eyecatch;
  const eyecatchSrc = eyecatch
    ? microCmsImageUrl(eyecatch.url, { width: 1200 })
    : undefined;
  const eyecatchSrcSet = eyecatch
    ? microCmsSrcSet(eyecatch.url, [640, 960, 1200])
    : undefined;

  return (
    <main class="l-main py-3 pb-8">
      <div class="article-layout grid grid-cols-1 gap-6 min-[921px]:grid-cols-[1fr_320px] content-start">
        <article class="article bg-(--color-paper) overflow-hidden">
          {eyecatch && eyecatchSrc ? (
            <figure class="media-frame m-0 aspect-[1200/630] w-full">
              <img
                src={eyecatchSrc}
                srcset={eyecatchSrcSet}
                sizes={EYECATCH_SIZES}
                width={eyecatch.width}
                height={eyecatch.height}
                alt={article.title}
                class="h-full w-full object-cover"
                fetchpriority="high"
                decoding="async"
              />
            </figure>
          ) : null}

          <div class="article-inner">
            <header class="article-header">
              <time class="article-pub-date block">
                {formatDate(article.publishedAt)}
              </time>
              <h1 class="article-title">{article.title}</h1>
              <div class="article-header__meta">
                <span class="text-(--color-muted)">
                  {article.author?.name ?? 'SnowLeaf管理者'}
                </span>
                {article.tags && article.tags.length > 0 ? (
                  <ul class="m-0 p-0 list-none flex flex-wrap gap-2 justify-end">
                    {article.tags.map((tag) => (
                      <li key={tag.id}>
                        <TagCard
                          name={tag.name}
                          href={`/tag/${tag.id}`}
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </header>

            <hr class="article-divider" />

            <ArticleTocAccordion toc={toc} />

            <section
              class="article-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <div id="comments" class="article-comments">
              {commentSuccess ? (
                <p class="comment-success">{commentSuccess}</p>
              ) : null}
              <CommentList comments={comments} />
              <CommentForm
                blogId={article.id}
                author={commentAuthor}
                siteKey={turnstileSiteKey}
                error={commentError}
              />
              {commentSuccess || commentError ? (
                <script
                  dangerouslySetInnerHTML={{
                    __html:
                      "document.getElementById('comments')?.scrollIntoView({behavior:'smooth',block:'start'})"
                  }}
                />
              ) : null}
            </div>
          </div>
        </article>

        <ArticleTocSidebar toc={toc} />
      </div>
    </main>
  );
}
