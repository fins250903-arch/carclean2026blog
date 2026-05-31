# ブログ編集（Decap CMS）— WordPress に近い操作

Pages CMS の代わりに **Decap CMS**（無料・オープンソース）を使います。

| 機能 | 対応 |
|------|------|
| 日付 | 公開日フィールド |
| タイトル SEO | **32文字目安の残り文字カウンター**付き |
| スラッグ | 英字のみ入力 → `2026-05-31-xxx` 形式を自動表示 |
| 画像 | 本文へ貼り付け／ドラッグ。未設定時 **1枚目をサムネイルに自動設定** |
| SAVE → 公開 | GitHub にコミット → 本番リポジトリへ自動同期 → Vercel 再デプロイ |

## 編集画面 URL

**https://carclean2026blog.vercel.app/admin/**

（`/admin` は本番サイトへリダイレクトしません）

## 初回セットアップ（1回だけ）

### 1. GitHub OAuth App

1. GitHub → Settings → Developer settings → OAuth Apps → New
2. Application name: `carclean2026blog-cms`
3. Homepage URL: `https://carclean2026blog.vercel.app`
4. Callback URL: `https://carclean2026blog.vercel.app/api/callback`
5. Client ID / Client Secret を控える

### 2. Vercel 環境変数（carclean2026blog プロジェクト）

| 変数名 | 値 |
|--------|-----|
| `GITHUB_CLIENT_ID` | OAuth App の Client ID |
| `GITHUB_CLIENT_SECRET` | OAuth App の Client Secret |

設定後、プロジェクトを **Redeploy** してください。

### 3. 本番サイト自動同期用 GitHub Secret

リポジトリ `fins250903-arch/carclean2026blog` の Settings → Secrets → Actions:

| Secret名 | 値 |
|----------|-----|
| `BLOG_SYNC_TOKEN` | `repo` 権限付き Personal Access Token（`carclean0511` へ push 可能なもの） |

記事を保存すると `.github/workflows/sync-blog-to-production.yml` が  
`fins250903-arch/carclean0511`（本番 `carinteriorcleaning.jp`）へブログをコピーし、Vercel が再ビルドします。

## 記事の書き方

1. **公開日** を選ぶ  
2. **タイトル** を入力（緑＝余裕、黄＝残り8文字以下、赤＝32文字超過）  
3. **URL用スラッグ** に英字のみ（例: `saitama4tontruck`）  
4. **カテゴリー** で地域（`saitama` 等）と `jisseki` を選択  
5. **本文** に文章と画像（貼り付け可）  
6. **Publish** → 数分後に https://carinteriorcleaning.jp/blog/ に反映  

サムネイル画像フィールドが空のとき、本文の最初の画像ファイル名が自動で `coverImage` になります。

## Pages CMS について

`.pages.yml`（Pages CMS）は **スラッグ誤保存・SEOカウンターなし** などの理由で非推奨です。  
今後は **Decap CMS（/admin）** のみを使ってください。

## ローカルで試す（任意）

```bash
npm install
npx decap-server
npm run dev
```

別ターミナルで `http://localhost:4321/admin/` を開きます（認証は decap-server 経由）。
