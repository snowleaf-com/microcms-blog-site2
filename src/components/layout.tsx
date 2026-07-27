import type { Child } from 'hono/jsx';
import { Footer } from './footer';
import { Header } from './header';
import type { Tag } from '../types';

type LayoutProps = {
  title?: string;
  description?: string;
  tags: Tag[];
  children: Child;
  scripts?: string[];
};

export function Layout({
  title = 'SnowLeaf',
  description = 'SnowLeaf 趣味ブログです。',
  tags,
  children,
  scripts = []
}: LayoutProps) {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+1:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="font-sans antialiased">
        <Header />
        {children}
        <Footer tags={tags} />
        {scripts.map((src) => (
          <script key={src} src={src} defer />
        ))}
      </body>
    </html>
  );
}
