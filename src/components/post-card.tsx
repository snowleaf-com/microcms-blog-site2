import { formatDate } from '../lib/date';
import type { Blog } from '../types';
import { TagCard } from './tag-card';

type PostCardProps = {
  post: Blog;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article class="border border-[var(--color-line)] bg-[var(--color-paper)] overflow-hidden grid align-content-start">
      {post.eyecatch ? (
        <a
          href={`/blog/${post.id}`}
          class="block border-b border-[var(--color-line)]"
        >
          <img
            src={post.eyecatch.url}
            width={post.eyecatch.width}
            height={post.eyecatch.height}
            alt={post.title}
            class="block w-full h-[180px] object-cover"
            loading="lazy"
          />
        </a>
      ) : null}
      <div class="px-4 py-4">
        <div class="text-sm text-[var(--color-muted)] mb-2">
          <time>{formatDate(post.publishedAt)}</time>
          <span class="mx-1.5">　</span>
          <span>{post.author?.name ?? 'SnowLeaf管理者'}</span>
        </div>
        <h2 class="text-lg font-bold leading-tight m-0 mb-2">
          <a href={`/blog/${post.id}`} class="text-inherit">
            {post.title}
          </a>
        </h2>
        <div class="flex flex-wrap gap-2">
          {post.tag ? (
            <TagCard name={post.tag.name} href={`/tag/${post.tag.id}`} />
          ) : null}
        </div>
      </div>
    </article>
  );
}
