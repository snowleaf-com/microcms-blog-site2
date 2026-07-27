import type { TocItem } from '../types';

type ArticleTocProps = {
  toc: TocItem[];
};

export function ArticleToc({ toc }: ArticleTocProps) {
  if (toc.length === 0) {
    return null;
  }

  return (
    <aside
      id="article-toc"
      class="article-toc max-[920px]:static max-[920px]:right-auto max-[920px]:w-auto fixed z-[5] right-[max(16px,(100vw-1100px)/2)] w-[320px]"
      data-toc="true"
    >
      <nav
        class="border border-[var(--color-line)] bg-[var(--color-paper)] p-4"
        aria-label="目次"
      >
        <h2 class="m-0 mb-3 text-xs tracking-[0.06em] uppercase text-[var(--color-muted)]">
          目次
        </h2>
        <ol class="m-0 p-0 list-none grid gap-2 text-[13px] leading-snug">
          {toc.map((item, index) => (
            <li
              key={item.id}
              class={
                item.level === 3
                  ? 'pl-3 border-l border-[var(--color-line)] ml-1'
                  : ''
              }
            >
              <a
                href={`#${item.id}`}
                data-toc-link={item.id}
                class={`block py-0.5 border-l-2 border-transparent pl-2 -ml-px text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors${
                  index === 0
                    ? ' text-[var(--color-accent)] border-[var(--color-accent)] font-semibold'
                    : ''
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
