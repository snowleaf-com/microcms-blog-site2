import type { TocItem } from '../types';

type ArticleTocProps = {
  toc: TocItem[];
};

function TocList({ toc }: { toc: TocItem[] }) {
  return (
    <ol class="m-0 p-0 list-none">
      {toc.map((item, index) => (
        <li
          key={item.id}
          class={`toc__item${item.level === 3 ? ' toc__item--3' : ' toc__item--2'}`}
        >
          <a
            href={`#${item.id}`}
            data-toc-link={item.id}
            class={index === 0 ? 'is-active' : undefined}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

function TocTitle() {
  return (
    <h2 class="toc__title">
      <img
        src="/toc-books.svg"
        alt=""
        width={20}
        height={20}
        class="toc__icon"
        decoding="async"
      />
      <span>目次</span>
    </h2>
  );
}

/** PC: 右サイドバーの sticky 目次（記事列と同じ高さで止まり、末尾で一緒に流れる） */
export function ArticleTocSidebar({ toc }: ArticleTocProps) {
  if (toc.length === 0) {
    return null;
  }

  return (
    <div class="article-toc-rail max-[920px]:hidden">
      <aside
        id="article-toc"
        class="article-toc toc toc--sidebar"
        data-toc="true"
      >
        <TocTitle />
        <nav class="toc__list-wrap" aria-label="目次">
          <div class="toc__list">
            <TocList toc={toc} />
          </div>
        </nav>
      </aside>
    </div>
  );
}

/** スマホ: 本文先頭のアコーディオン目次（Open / Close） */
export function ArticleTocAccordion({ toc }: ArticleTocProps) {
  if (toc.length === 0) {
    return null;
  }

  return (
    <nav
      id="article-toc-mobile"
      class="toc toc--accordion min-[921px]:hidden"
      aria-label="目次"
      data-toc-accordion="true"
    >
      <TocTitle />
      <div class="toc__accordion" data-toc-panel style={{ height: '0px' }}>
        <div class="toc__list">
          <TocList toc={toc} />
        </div>
      </div>
      <button type="button" class="toc__toggle" data-toc-toggle>
        Open
      </button>
    </nav>
  );
}
