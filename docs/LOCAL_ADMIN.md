# 管理画面が入力できないとき（ローカルで編集）

本番 Vercel の更新が遅れている場合、**PC上で管理画面**を開けます（入力欄が正常に動きます）。

## 手順

```powershell
cd c:\Users\yu\Desktop\antiLP\project-integration\carclean2026blog
npm install
npm run dev
```

ブラウザで開く: **http://localhost:4321/admin/index.html**  
（`/admin/` だけだと 404 になる場合があるため、上記 URL を使ってください）

1. GitHub でログイン（OAuth は本番 URL 経由のため、初回は本番と同じ認証フロー）
2. 記事を作成 → Publish
3. GitHub にコミットされる
4. 本番サイトへは GitHub Actions または手動 sync で反映

## 本番 Vercel を直す

Vercel ダッシュボード → `carclean2026blog` → **Deployments** → 最新 → **Redeploy**

再デプロイ後: https://carclean2026blog.vercel.app/admin/  
（`index.html` が新しいインライン設定を使い、壊れた config.yml を読みません）
