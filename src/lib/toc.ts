import type { TocItem } from '../types';

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

export function createTocAndHtml(content: string) {
  const toc: TocItem[] = [];
  let index = 0;

  const html = content
    .replace(
      /<h([23])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
      (_match, levelRaw: string, innerHtml: string) => {
        const level = Number(levelRaw) as 2 | 3;
        const text = stripHtml(innerHtml);
        if (!text) {
          return _match;
        }

        index += 1;
        const id = `section-${index}`;
        toc.push({ id, text, level });

        return `<h${level} id="${id}">${innerHtml}</h${level}>`;
      }
    )
    .replace(/<table\b/gi, '<div class="table-scroll"><table')
    .replace(/<\/table>/gi, '</table></div>');

  return { toc, html };
}
