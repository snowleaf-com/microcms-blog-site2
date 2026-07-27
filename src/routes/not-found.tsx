export function NotFoundPage() {
  return (
    <main class="w-[min(1100px,calc(100%-32px))] mx-auto py-3 pb-16">
      <section class="mb-4">
        <p class="m-0 text-sm text-[var(--color-muted)]">404</p>
        <h1 class="m-0 text-2xl font-semibold">ページが見つかりませんでした</h1>
        <p class="mt-2">
          URL が正しいか、公開ステータスを確認してください。下のリンクから一覧に戻れます。
        </p>
        <a href="/" class="text-[#2f6f49] border-b border-[#86b89c]">
          記事一覧へ
        </a>
      </section>
    </main>
  );
}
