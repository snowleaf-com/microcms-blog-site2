import { PostCard } from '../components/post-card';
import type { Blog } from '../types';

type HomePageProps = {
  posts: Blog[];
  hasConfig: boolean;
};

function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-6 w-6 shrink-0 text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)] sm:h-7 sm:w-7"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function HomePage({ posts, hasConfig }: HomePageProps) {
  return (
    <main class="mx-auto w-[min(1100px,calc(100%-32px))] py-6 pb-16 sm:py-8 md:pb-16">
      {!hasConfig ? (
        <p class="my-4 border border-dashed border-[#73b78f] bg-[#edf7f1] text-[#225136] py-2.5 px-3">
          設定エラーです。
        </p>
      ) : null}

      <section class="mb-6 sm:mb-8" aria-label="おすすめ">
        <a
          href="https://garden.snow-leaf.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative block overflow-hidden border border-[var(--color-line)] transition hover:border-[var(--color-accent)] sm:min-h-[140px]"
        >
          <picture>
            <source
              type="image/webp"
              srcset="/grass-bg-640.webp 640w, /grass-bg.webp 1024w"
              sizes="(max-width: 1100px) calc(100vw - 32px), 1100px"
            />
            <img
              src="/grass-bg.jpg"
              alt=""
              width={1024}
              height={680}
              class="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-90"
              fetchpriority="high"
              decoding="async"
            />
          </picture>
          <span
            class="absolute inset-0"
            style={{ backgroundColor: 'rgba(20, 45, 28, 0.42)' }}
          />
          <span class="relative z-10 flex min-h-[140px] items-center justify-between gap-2 p-5 sm:p-6 md:p-7">
            <span class="min-w-0 flex-1">
              <span class="text-sm font-medium uppercase tracking-wider text-[#b8e8b0]">
                おすすめツール
              </span>
              <h2 class="mt-1.5 text-lg font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] sm:text-xl">
                芝生の希釈計算サイト
              </h2>
              <p class="mt-1 text-sm text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
                芝生・農薬・ガーデニングの計算を簡単に
              </p>
            </span>
            <ChevronRight />
          </span>
        </a>
      </section>

      <section
        id="latest"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
      >
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div class="col-span-full border border-dashed border-[var(--color-line)] bg-[#fcfcfa] py-8 px-6 text-center text-[var(--color-muted)] sm:py-10">
            該当する記事がありません。
          </div>
        )}
      </section>
    </main>
  );
}
