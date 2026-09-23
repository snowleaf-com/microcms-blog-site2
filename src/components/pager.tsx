import type { PagerLinks } from '../lib/pagination';

type PagerProps = {
  pager: PagerLinks;
};

export function Pager({ pager }: PagerProps) {
  const { currentPage, totalPages, newerHref, olderHref } = pager;

  return (
    <nav class="pager" aria-label="ページネーション">
      <span class="pager__counter">
        {currentPage} / {totalPages}
      </span>
      {newerHref ? (
        <a class="sl-btn sl-btn--outline pager__newer-link" href={newerHref}>
          <span class="box-link__icon" aria-hidden="true">
            ←
          </span>
          <span>前へ</span>
        </a>
      ) : null}
      {olderHref ? (
        <a class="sl-btn sl-btn--outline pager__older-link" href={olderHref}>
          <span>次へ</span>
          <span class="box-link__icon" aria-hidden="true">
            →
          </span>
        </a>
      ) : null}
    </nav>
  );
}
