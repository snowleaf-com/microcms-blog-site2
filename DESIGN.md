# SnowLeaf Design System

ブログ UI の見た目・インタラクションの単一ソース。実装は `styles/globals.css` の `@theme` とコンポーネントクラス。見本は `/design`。

## 方針

- ブランドは緑。紫・クリーム・新聞風レイアウトは使わない
- 角は基本スクエア寄り（過度な pill / 多層シャドウは避ける）
- カードは「操作の入れ物」以外では増やさない
- 色・ホバーはハードコードせずトークン経由

## カラー

| トークン | 値 | 用途 |
|---|---|---|
| `--color-bg` | `#f2f7f4` | ページ背景 |
| `--color-paper` | `#ffffff` | 記事・パネル白面 |
| `--color-paper-soft` | `#f7faf8` | コメント行など薄い面 |
| `--color-text` | `#1a2e22` | 本文 |
| `--color-muted` | `#6b7c72` | 補足文 |
| `--color-faint` | `#b1b1b1` | 日付など最弱 |
| `--color-line` | `#e0e5e1` | 罫線・入力枠 |
| `--color-line-strong` | `#e9e9e9` | タグ枠などやや濃い線 |
| `--color-accent` | `#208f4f` | ブランド・リンク強調・outline 枠 |
| `--color-accent-hover` | `#127a40` | solid ボタン hover |
| `--color-accent-soft` | `#edf7f1` | note / success 背景 |
| `--color-accent-soft-border` | `#c5e6d1` | soft 面の枠 |
| `--color-danger` | `#b42318` | エラー文字 |
| `--color-danger-soft` | `#fef2f2` | エラー背景 |
| `--color-on-accent` | `#ffffff` | 緑塗り上の文字 |

## エレベーション

| トークン | 用途 |
|---|---|
| `--shadow-card` | 記事・目次カード |

## 半径

| トークン | 値 | 用途 |
|---|---|---|
| `--radius-sm` | `0.5rem` | シェアボタンなど |
| `--radius-md` | `0.75rem` | Comment Policy など |

## タイポ

- フォント: `--font-sans`（Avenir / Hiragino 系、ネットワーク読込なし）
- 基準: `html` 16px（480px 以下は 14px）
- 本文行間: 1.6〜2.0（記事本文は長め）

## コンポーネント

### Outline ボタン `.sl-btn.sl-btn--outline`

- 通常: 緑枠・緑文字・白地
- hover: 緑塗り・白文字（`--color-accent`）
- 用途: ページネーション「前へ / 次へ」

### Solid ボタン `.sl-btn.sl-btn--solid`

- 通常: 緑塗り・白文字
- hover: `--color-accent-hover`
- 用途: コメント投稿

### Chip `.sl-chip`

- 通常: `--color-line-strong` 枠・本文色
- hover: accent 枠・accent 文字（塗りつぶさない）
- 用途: タグ

### Panel `.sl-panel`

- 白地・`--color-line` 枠・`--radius-md`
- 用途: Comment Policy

## やってはいけないこと

- コンポーネント色を `#208f4f` など直書きする
- outline と chip の hover 言語を混ぜる（chip を緑塗りにしない）
- SNS ブランド色（X / Facebook）以外で黒塗りボタンを増やす
