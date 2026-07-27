import { PostCard } from '../components/post-card';
import type { Blog, Tag } from '../types';

type TagPageProps = {
  currentTag?: Tag;
  posts: Blog[];
};

export function TagPage({ currentTag, posts }: TagPageProps) {
  return (
    <main class="mx-auto w-[min(1100px,calc(100%-32px))] py-6 pb-16 sm:py-8 md:pb-16">
      <section class="mb-4">
        <p class="m-0 text-sm text-[var(--color-muted)]">Tag</p>
        <h1 class="m-0 text-2xl font-semibold">{currentTag?.name ?? 'Tag'}</h1>
      </section>

      <p class="mb-4">
        <a href="/" class="text-[#2f6f49] border-b border-[#86b89c]">
          ← 記事一覧へ戻る
        </a>
      </p>

      <section class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div class="col-span-full border border-dashed border-[var(--color-line)] bg-[#fcfcfa] py-6 px-6 text-[var(--color-muted)] text-center">
            このタグの記事はまだありません。
          </div>
        )}
      </section>
    </main>
  );
}
