# 既存サイト（microcms-blog-site）との差分一覧

## アーキテクチャ

| 項目 | Next.js（既存） | Hono（移行後） |
|------|-----------------|----------------|
| ランタイム | Node.js / 静的エクスポート (`output: 'export'`) | Cloudflare Workers |
| レンダリング | ビルド時 SSG | リクエスト時 SSR（microCMS から取得） |
| 静的配信 | `out/` 一式 | Workers Static Assets（`public/`） |
| ルーティング | App Router | Hono ルート |
| UI | React + Next.js | Hono JSX（React 非依存） |

## URL / 機能

| 項目 | 差分 |
|------|------|
| `/` `/blog/:id` `/tag/:id` | URL 構造は維持。動的に SSR |
| `/api/health` | **新規追加**（Hono） |
| `/api/preview` | **未移行**（README 記載のみで実装もなし。プレビュー機能は対象外） |
| `revalidate = 300` | なし。毎回 microCMS へ取得（将来 Cache API / KV で代替可能） |
| `generateStaticParams` | 不要（SSR のためビルド時パス生成なし） |
| `not-found` | Hono の `notFound` / 記事なし時に 404 HTML を返却 |

## 見た目・フロントエンド

| 項目 | 差分 |
|------|------|
| レイアウト / クラス名 | ほぼ同等（同一 Tailwind ユーティリティを踏襲） |
| フォント | `next/font`（自己ホスト）→ Google Fonts CDN（`M PLUS 1`） |
| 画像 | `next/image` → 素の `<img>`（最適化・lazy はブラウザ標準） |
| リンク | `next/link` → 素の `<a>`（クライアントサイド遷移なし） |
| アイコン | `lucide-react` → インライン SVG |
| 目次（TOC） | React Client Component → `public/toc.js`（Vanilla JS） |
| CSS | Next + PostCSS 実行時 → `npm run build:css` で `public/styles.css` を生成 |

## 依存・設定

| 項目 | 差分 |
|------|------|
| React / Next.js | **削除** |
| `wrangler.jsonc` | **新規**（Workers + Static Assets） |
| 環境変数 | `.env` / `.env.local` → ローカルは `.dev.vars`、本番は `wrangler secret` |
| `MICROCMS_PREVIEW_SECRET` | 未使用（プレビュー未実装のため） |

## 挙動上の注意点

1. **記事は常に最新**: SSG + 5分 ISR 相当だったものが、都度 SSR になる（キャッシュ未設定）
2. **フルページ遷移**: SPA 的なクライアント遷移はない
3. **フォント読み込み**: 初回表示で Google Fonts への外部リクエストが発生する
4. **画像**: microCMS の画像 URL はそのまま利用（Next Image のサイズ最適化なし）
5. **Shiki**: Workers 上でハイライト実行。言語パックによりコールドスタートやバンドルサイズが増える可能性あり
