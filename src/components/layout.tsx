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
  pathname?: string;
};

export function Layout({
  title = 'SnowLeaf',
  description = 'SnowLeaf 趣味ブログです。',
  tags,
  children,
  scripts = [],
  preloads = [],
  pathname = '/'
}: LayoutProps) {
  const pageScripts = ['/media.js', '/nav.js', ...scripts];

  return (
    <>
      {html`<!DOCTYPE html>`}
      <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" sizes="any" />
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
            <noscript>
              <style>
                .media-frame img {
                  opacity: 1 !important;
                }
                .media-frame::before,
                .media-frame::after {
                  display: none !important;
                }
              </style>
            </noscript>
          `}
        </head>
        <body class="font-sans antialiased">
          <Header pathname={pathname} />
          {children}
          <Footer tags={tags} />
          {pageScripts.map((src) =>
            src.includes('challenges.cloudflare.com') ? (
              <script key={src} src={src} async defer />
            ) : (
              <script key={src} src={src} defer />
            )
          )}
        </body>
      </html>
    </>
  );
}
