import { codeToHtml } from 'shiki';

const CODE_BLOCK_REGEX =
  /<pre(?:\s[^>]*)?>\s*<code(\s+[^>]*)?>([\s\S]*?)<\/code>\s*<\/pre>/gi;

function getLanguageFromClass(attrs: string): string {
  const langMatch = attrs.match(/\b(?:language|lang)-([a-z0-9+-]+)/i);
  return langMatch ? langMatch[1].toLowerCase() : 'plaintext';
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

/**
 * HTML文字列内の <pre><code> ブロックを Shiki でシンタックスハイライトしたHTMLに変換する
 */
export async function highlightCodeInHtml(html: string): Promise<string> {
  const matches = [...html.matchAll(CODE_BLOCK_REGEX)];

  if (matches.length === 0) {
    return html;
  }

  let result = html;
  for (const match of matches) {
    const fullBlock = match[0];
    const codeAttrs = match[1] ?? '';
    const codeContent = match[2];
    const lang = codeAttrs ? getLanguageFromClass(codeAttrs) : 'plaintext';
    const code = decodeHtmlEntities(codeContent.trimEnd());

    try {
      const highlighted = await codeToHtml(code, {
        lang: lang === 'plaintext' ? 'text' : lang,
        theme: 'github-dark'
      });

      const wrapped = `<div class="shiki-code-block overflow-x-auto rounded-lg my-4">${highlighted}</div>`;
      result = result.replace(fullBlock, wrapped);
    } catch (error) {
      console.error('[shiki] highlight failed:', error);
    }
  }

  return result;
}
