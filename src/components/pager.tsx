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
        <a class="box-link pager__newer-link" href={newerHref}>
          <span class="box-link__icon" aria-hidden="true">
            ←
          </span>
          <span>Newer</span>
        </a>
      ) : null}
      {olderHref ? (
        <a class="box-link pager__older-link" href={olderHref}>
          <span>Older</span>
          <span class="box-link__icon" aria-hidden="true">
            →
          </span>
        </a>
      ) : null}
    </nav>
  );
}
