import { PostCard } from '../components/post-card';
import type { Blog, Tag } from '../types';

type TagPageProps = {
  currentTag?: Tag;
  posts: Blog[];
};

export function TagPage({ currentTag, posts }: TagPageProps) {
  return (
    <main class="l-main py-3 pb-8">
      <section class="mb-4">
        <p class="m-0 text-sm text-(--color-muted)">Tag</p>
        <h1 class="m-0 text-2xl font-semibold">{currentTag?.name ?? 'Tag'}</h1>
      </section>

      <p class="mb-4">
        <a href="/" class="text-[#2f6f49] border-b border-[#86b89c]">
          ← 記事一覧へ戻る
        </a>
      </p>

      <section class="article-list mt-5">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div class="col-span-full border border-dashed border-(--color-line) bg-[#fcfcfa] py-6 px-6 text-(--color-muted) text-center">
            このタグの記事はまだありません。
          </div>
        )}
      </section>
    </main>
  );
}
