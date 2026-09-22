export const PAGE_SIZE = 12;

/** `/page-2` のような slug からページ番号を取る */
export function parsePageSlug(slug: string | undefined): number | null {
  if (!slug) {
    return null;
  }
  const match = slug.match(/^page-([1-9]\d*)$/);
  if (!match) {
    return null;
  }
  return Number(match[1]);
}

export function totalPages(totalCount: number, limit = PAGE_SIZE): number {
  if (totalCount <= 0) {
    return 0;
  }
  return Math.ceil(totalCount / limit);
}

export function pageOffset(page: number, limit = PAGE_SIZE): number {
  return (page - 1) * limit;
}

export function homePageHref(page: number): string {
  return page <= 1 ? '/' : `/page-${page}`;
}

export function tagPageHref(tagId: string, page: number): string {
  return page <= 1 ? `/tag/${tagId}` : `/tag/${tagId}/page-${page}`;
}

export type PagerLinks = {
  currentPage: number;
  totalPages: number;
  newerHref?: string;
  olderHref?: string;
};

export function buildHomePager(
  currentPage: number,
  totalCount: number,
  limit = PAGE_SIZE
): PagerLinks | null {
  const pages = totalPages(totalCount, limit);
  if (pages <= 0) {
    return null;
  }

  return {
    currentPage,
    totalPages: pages,
    newerHref:
      currentPage > 1 ? homePageHref(currentPage - 1) : undefined,
    olderHref:
      currentPage < pages ? homePageHref(currentPage + 1) : undefined
  };
}

export function buildTagPager(
  tagId: string,
  currentPage: number,
  totalCount: number,
  limit = PAGE_SIZE
): PagerLinks | null {
  const pages = totalPages(totalCount, limit);
  if (pages <= 0) {
    return null;
  }

  return {
    currentPage,
    totalPages: pages,
    newerHref:
      currentPage > 1 ? tagPageHref(tagId, currentPage - 1) : undefined,
    olderHref:
      currentPage < pages ? tagPageHref(tagId, currentPage + 1) : undefined
  };
}
