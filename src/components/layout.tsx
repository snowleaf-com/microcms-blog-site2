import { html } from 'hono/html';
import type { Child } from 'hono/jsx';
import { Footer } from './footer';
import { Header } from './header';
import type { Tag } from '../types';

type Preload = {
  href: string;
  as: 'image' | 'font' | 'style' | 'script';
  type?: string;
  imageSrcSet?: string;
  imageSizes?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
};

type LayoutProps = {
  title?: string;
  description?: string;
  tags: Tag[];
  children: Child;
  scripts?: string[];
  preloads?: Preload[];
};

export function Layout({
  title = 'SnowLeaf',
  description = 'SnowLeaf 趣味ブログです。',
  tags,
  children,
  scripts = [],
  preloads = []
}: LayoutProps) {
  return (
    <>
      {html`<!DOCTYPE html>`}
      <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
          <meta name="description" content={description} />
          {preloads.map((preload) => (
            <link
              key={`${preload.as}:${preload.href}`}
              rel="preload"
              href={preload.href}
              as={preload.as}
              {...(preload.type ? { type: preload.type } : {})}
              {...(preload.imageSrcSet
                ? { imagesrcset: preload.imageSrcSet }
                : {})}
              {...(preload.imageSizes
                ? { imagesizes: preload.imageSizes }
                : {})}
              {...(preload.fetchPriority
                ? { fetchpriority: preload.fetchPriority }
                : {})}
            />
          ))}
          <link rel="stylesheet" href="/styles.css" />
          {html`
            <link
              rel="preload"
              href="/fonts.css"
              as="style"
              onload="this.onload=null;this.rel='stylesheet'"
            />
            <noscript
              ><link rel="stylesheet" href="/fonts.css"
            /></noscript>
          `}
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
    </>
  );
}
