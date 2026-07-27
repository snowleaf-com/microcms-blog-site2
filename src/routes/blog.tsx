import { ArticleToc } from '../components/article-toc';
import { TagCard } from '../components/tag-card';
import { formatDate } from '../lib/date';
import type { Blog, TocItem } from '../types';

type BlogDetailPageProps = {
  article: Blog;
  html: string;
  toc: TocItem[];
};

export function BlogDetailPage({ article, html, toc }: BlogDetailPageProps) {
  return (
    <main class="w-[min(1100px,calc(100%-32px))] mx-auto py-3 pb-16">
      <div class="article-layout grid grid-cols-1 gap-6 min-[921px]:grid-cols-[1fr_320px] content-start">
        <article class="article border border-[var(--color-line)] bg-[var(--color-paper)] overflow-hidden">
          {article.eyecatch ? (
            <figure class="w-full aspect-[1200/630] relative bg-[var(--color-muted)] m-0">
              <img
                src={article.eyecatch.url}
                width={article.eyecatch.width}
                height={article.eyecatch.height}
                alt={article.title}
                class="object-cover w-full h-full"
              />
            </figure>
          ) : null}

          <div class="article-inner px-4 py-6 md:px-8 md:py-10">
            <header class="article-header">
              <time class="article-pub-date block text-sm text-[var(--color-muted)]">
                {formatDate(article.publishedAt)}
              </time>
              <h1 class="article-title mt-2 mb-4 font-bold text-[clamp(1.35rem,6vw,1.75rem)] leading-tight min-[761px]:text-[clamp(1.5rem,3.5vw,2.25rem)]">
                {article.title}
              </h1>
              <div class="flex flex-wrap items-center justify-between gap-3">
                <span class="text-[var(--color-muted)]">
                  {article.author?.name ?? 'SnowLeaf管理者'}
                </span>
                {article.tag ? (
                  <ul class="m-0 p-0 list-none flex flex-wrap gap-2 justify-end">
                    <li>
                      <TagCard
                        name={article.tag.name}
                        href={`/tag/${article.tag.id}`}
                      />
                    </li>
                  </ul>
                ) : null}
              </div>
            </header>

            <section
              class="article-content mt-8 leading-[1.9]"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </article>

        <ArticleToc toc={toc} />
      </div>
    </main>
  );
}
