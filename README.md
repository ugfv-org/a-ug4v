# a-ug4v

`a.ug4v.com` 用の静的 Astro サイトです。MDX でページ本文を管理し、共通レイアウト、ナビゲーション、ヒーロー、グローバル CSS で Neon-Ether Dark のデザインシステムを適用しています。

## Requirements

- Node.js
- pnpm `10.28.0`

## Setup

```sh
pnpm install
```

## Development

```sh
pnpm dev
```

Astro の開発サーバーを起動します。ページ編集後は `/`, `/about/`, `/guidelines/`, `/terms/` など、変更したルートをブラウザで確認してください。

## Build

```sh
pnpm build
```

`astro build` のあとに `scripts/generate-og-images.mjs` を実行し、`dist/` と OG 画像を生成します。`dist/` は生成物なので手動編集しません。

## Preview

```sh
pnpm preview
```

本番ビルドをローカルで確認します。

## Deploy

```sh
pnpm deploy
```

`pnpm build` 後、`wrangler deploy` で Cloudflare Workers Assets に配信します。設定は `wrangler.jsonc`、canonical site は `astro.config.mjs` の `https://a.ug4v.com` です。

## Project Structure

- `src/pages/*.mdx`: ルートページ
- `src/components/*.astro`: 再利用 UI
- `src/layouts/BaseLayout.astro`: HTML メタ情報、共通ナビ、フッター
- `src/styles/global.css`: デザイントークンと全体スタイル
- `src/utils/budoux.mjs`: 日本語改行制御用の remark/Budoux ユーティリティ
- `public/assets/brand/`: 公開ブランドアセット
- `scripts/generate-og-images.mjs`: OG 画像生成

## Design System

デザイン仕様は `DESIGN.md` にまとめています。色、角丸、フォント、余白などのトークンは `src/styles/global.css` に集約し、ページ固有の MDX では既存のクラスやコンポーネントを優先して使います。

## Editing Notes

- MDX frontmatter の `title` と `description` は OGP と `<title>` に使われます。
- 新しい公開アセットは `public/assets/brand/` など `public/` 配下に置きます。
- ページ追加時は `src/pages/<slug>.mdx` を作成し、必要に応じて `Navigation.astro` のリンクを更新します。
- 検証は最低限 `pnpm build` を通してください。
