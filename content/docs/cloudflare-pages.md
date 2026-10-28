---
title: Cloudflare Pages 部署指南
description: 將 OrigEssentials 網站部署至 Cloudflare Pages
---

# Cloudflare Pages 部署指南

## 前置設定

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 確認已啟用 **Pages** 服務
3. 取得 GitHub 倉庫存取權限

## 連接到 GitHub

1. 進入 Cloudflare Dashboard → **Pages**
2. 點擊 **Create a project** → **Connect to Git**
3. 選擇 `origessentials/origessentials` 倉庫
4. 選擇 `website` 目錄作為源頭

## 建置設定

在 Pages 專案設定中填寫：

| 設定項目 | 值 |
|----------|-----|
| 產出目錄 | `website/dist` |
| 建置命令 | `cd website && npm ci && npm run build` |
| 根目錄 | `.` |
| 環境變數 | 無（靜態網站不需要） |

## 自訂網域

1. 進入 Pages 專案 → **Custom domains**
2. 點擊 **Set up a custom domain**
3. 輸入您的網域（例：`origessentials.dev`）
4. 按照指示設定 DNS（CNAME 或 A 記錄）
5. HTTPS 由 Cloudflare 自動簽發

## 驗證部署

部署完成後：
1. 瀏覽器開啟 `https://your-domain.com`
2. 確認首頁正常載入
3. 檢查所有內部連結（文件、設置頁面）
4. 確認 `_redirects` 檔案存在以支援 SPA 路由

## 注意事項

- 免費方案每日 100 GB 頻寬，每月 500 次構建
- 建議開啟 **Pre-rendering** 以優化 SEO
- 可啟用 **Edge Cache TTL** 減少重複請求