# SnowLeaf (Hono + Cloudflare Workers)

`microcms-blog-site`（Next.js）を Cloudflare Workers 上の Hono プロジェクトへ移行したブログです。

## セットアップ

1. 依存関係をインストール

```bash
npm install
```

2. 環境変数を設定

```bash
cp .dev.vars.example .dev.vars
```

`.dev.vars` を microCMS の設定に合わせて更新してください。

- `MICROCMS_SERVICE_DOMAIN`: サービスドメイン（`xxx` のみ）
- `MICROCMS_API_KEY`: API キー

3. ローカル起動

```bash
npm run dev
```

## デプロイ

```bash
# シークレット登録（初回）
npx wrangler secret put MICROCMS_API_KEY

# サービスドメインは wrangler.jsonc の vars、またはダッシュボードで設定
npm run deploy
```

## ページ構成

| パス | 説明 |
|------|------|
| `/` | 記事一覧 + おすすめバナー |
| `/blog/:id` | 記事詳細（Hono SSR） |
| `/tag/:id` | タグ別一覧（Hono SSR） |
| `/api/health` | ヘルスチェック API |

静的アセット（`/styles.css`, `/toc.js`, 画像）は Workers Static Assets で配信します。

## 技術構成

- Hono（JSX SSR）
- Cloudflare Workers + Static Assets
- microCMS
- Tailwind CSS v4（ビルド成果物を `public/styles.css` に出力）
- Shiki（記事内コードハイライト）

既存サイトとの差分は [MIGRATION_DIFF.md](./MIGRATION_DIFF.md) を参照してください。
