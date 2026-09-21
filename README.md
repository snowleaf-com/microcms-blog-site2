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

リポジトリの **Settings → Secrets and variables → Actions** に次を登録してください（デプロイ時に Workers Secrets へ同期されます）。

| Secret 名 | 用途 |
|-----------|------|
| `CLOUDFLARE_API_TOKEN` | デプロイ用 |
| `CLOUDFLARE_ACCOUNT_ID` | デプロイ用 |
| `MICROCMS_SERVICE_DOMAIN` | microCMS |
| `MICROCMS_API_KEY` | microCMS |
| `TURNSTILE_SITE_KEY` | コメント用（任意） |
| `TURNSTILE_SECRET_KEY` | コメント用（任意） |

値を変えたあとは、`main` に何か push / 再実行すれば本番に反映されます。  
`wrangler secret put` を個別に叩く必要はありません。

D1 データベース `snowleaf-db` は `wrangler.jsonc` の `d1_databases` で紐づいています。

ローカル用マイグレーション:

```bash
npx wrangler d1 migrations apply snowleaf-db --local   # ローカル
npx wrangler d1 migrations apply snowleaf-db --remote  # 手動で本番に当てる場合
```

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
