const SWATCHES = [
  ['--color-bg', 'ページ背景'],
  ['--color-paper', '紙面'],
  ['--color-paper-soft', '薄い面'],
  ['--color-text', '本文'],
  ['--color-muted', '補足'],
  ['--color-faint', '日付'],
  ['--color-line', '罫線'],
  ['--color-line-strong', '強めの線'],
  ['--color-accent', 'アクセント'],
  ['--color-accent-hover', 'アクセント hover'],
  ['--color-accent-soft', 'ソフト緑'],
  ['--color-danger', '危険'],
  ['--color-danger-soft', '危険背景']
] as const;

export function DesignSystemPage() {
  return (
    <main class="l-main py-8 pb-16">
      <header class="mb-10">
        <p class="m-0 text-sm tracking-widest uppercase text-(--color-muted)">
          Internal
        </p>
        <h1 class="m-0 mt-2 text-3xl font-bold tracking-wide">
          SnowLeaf Design System
        </h1>
        <p class="mt-3 max-w-2xl text-(--color-muted) leading-relaxed">
          定義の正本は <code>DESIGN.md</code>。実装トークンは{' '}
          <code>styles/globals.css</code> の <code>@theme</code>。
        </p>
        <p class="mt-2">
          <a href="/" class="text-(--color-accent) underline">
            ← トップへ
          </a>
        </p>
      </header>

      <section class="mb-12">
        <h2 class="m-0 mb-4 text-xl font-bold">Color</h2>
        <ul class="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 md:grid-cols-4">
          {SWATCHES.map(([token, label]) => (
            <li
              key={token}
              class="overflow-hidden border border-(--color-line) bg-(--color-paper)"
            >
              <div
                class="h-16 border-b border-(--color-line)"
                style={{ background: `var(${token})` }}
              />
              <div class="p-3">
                <p class="m-0 text-sm font-semibold">{label}</p>
                <p class="m-0 mt-1 text-xs text-(--color-muted)">
                  <code>{token}</code>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section class="mb-12">
        <h2 class="m-0 mb-4 text-xl font-bold">Typography</h2>
        <div class="border border-(--color-line) bg-(--color-paper) p-6">
          <p class="m-0 text-3xl font-bold">見出しサンプル Heading</p>
          <p class="mt-3 m-0 leading-relaxed">
            本文サンプル。SnowLeaf
            は緑を基調にした趣味ブログのデザインシステムです。
          </p>
          <p class="mt-2 m-0 text-(--color-muted)">補足テキスト muted</p>
          <p class="mt-2 m-0 text-(--color-faint)">日付など faint</p>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="m-0 mb-4 text-xl font-bold">Buttons</h2>
        <div class="flex flex-wrap items-center gap-4">
          <a href="#outline" class="sl-btn sl-btn--outline">
            <span>前へ</span>
          </a>
          <a href="#outline" class="sl-btn sl-btn--outline">
            <span>次へ</span>
          </a>
          <button type="button" class="sl-btn sl-btn--solid">
            投稿する
          </button>
        </div>
        <p class="mt-3 m-0 text-sm text-(--color-muted)">
          outline = ページネーション / solid = コメント送信
        </p>
      </section>

      <section class="mb-12">
        <h2 class="m-0 mb-4 text-xl font-bold">Chip</h2>
        <div class="flex flex-wrap gap-2">
          <a href="#chip" class="sl-chip">
            すべて
          </a>
          <a href="#chip" class="sl-chip">
            ご飯
          </a>
          <a href="#chip" class="sl-chip">
            静岡市葵区
          </a>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="m-0 mb-4 text-xl font-bold">Panel</h2>
        <aside class="sl-panel max-w-xl">
          <p class="m-0 mb-2 font-bold">SnowLeaf Comment Policy</p>
          <p class="m-0 text-sm leading-relaxed text-(--color-muted)">
            パネルは白地＋細い枠。Comment Policy などで使用。
          </p>
        </aside>
      </section>

      <section>
        <h2 class="m-0 mb-4 text-xl font-bold">Pager preview</h2>
        <nav class="pager relative" aria-label="ページネーション見本">
          <span class="pager__counter">1 / 3</span>
          <a href="#pager" class="sl-btn sl-btn--outline pager__newer-link">
            <span class="box-link__icon" aria-hidden="true">
              ←
            </span>
            <span>前へ</span>
          </a>
          <a href="#pager" class="sl-btn sl-btn--outline pager__older-link">
            <span>次へ</span>
            <span class="box-link__icon" aria-hidden="true">
              →
            </span>
          </a>
        </nav>
      </section>
    </main>
  );
}
