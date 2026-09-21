import { formatDate } from '../lib/date';
import { microCmsImageUrl, microCmsSrcSet } from '../lib/image';
import type { Blog } from '../types';
import { TagCard } from './tag-card';

type PostCardProps = {
  post: Blog;
};

export function PostCard({ post }: PostCardProps) {
  const eyecatch = post.eyecatch;
  const href = `/blog/${post.id}`;

  return (
    <article class="post-card bg-(--color-paper) overflow-hidden flex flex-col h-full">
      <a href={href} class="post-card__link text-inherit no-underline flex flex-col flex-1">
        {eyecatch ? (
          <figure class="media-frame post-card__photo relative m-0 mb-5 overflow-hidden">
            <img
              src={microCmsImageUrl(eyecatch.url, { width: 640 })}
              srcset={microCmsSrcSet(eyecatch.url, [320, 480, 640])}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
              width={eyecatch.width}
              height={eyecatch.height}
              alt=""
              class="block absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
        ) : null}

        <div class="px-6">
          <div class="text-sm text-(--color-muted) mb-2 tracking-wide">
            <time>{formatDate(post.publishedAt)}</time>
            <span class="mx-1.5">　</span>
            <span>{post.author?.name ?? 'SnowLeaf管理者'}</span>
          </div>
          <h2 class="post-card__title text-lg font-bold leading-tight m-0 mb-5">
            {post.title}
          </h2>
        </div>
      </a>

      <div class="px-6 pb-5 mt-auto flex flex-wrap gap-2">
        {post.tags?.map((tag) => (
          <TagCard key={tag.id} name={tag.name} href={`/tag/${tag.id}`} />
        ))}
      </div>
    </article>
  );
}
