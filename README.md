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

### 自動デプロイ（推奨）

`main` への push / マージで GitHub Actions（`.github/workflows/deploy.yml`）が動き、Cloudflare Workers へ自動デプロイします。

事前にリポジトリの Secrets へ次を設定してください。

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

※ microCMS の Secret（`MICROCMS_*`）は Workers 側に別途載せておく必要があります（下記の手動デプロイ、または `wrangler secret`）。

### 手動デプロイ

`.dev.vars` に本番と同じ値を入れてから:

```bash
npm run deploy
```

（内部で `wrangler deploy --secrets-file .dev.vars` を実行し、microCMS の Secret を同時に載せます）

Secret だけ後から更新する場合:

```bash
npx wrangler secret bulk .dev.vars
# または
npx wrangler deploy --secrets-file .dev.vars
```

> `wrangler secret put` だけだと、名前は付くのに実行時は空、という状態になることがあります。このプロジェクトでは `--secrets-file` を使ってください。

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
