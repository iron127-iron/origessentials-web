---
title: 安裝指南
description: OrigEssentials 完整安裝與部署流程
---

# 安裝指南

本文檔說明 OrigEssentials 的完整安裝流程，包含 D1 資料庫、Workers 部署、插件安裝及配對設定。

## 前置需求

- **Java 17+**：Temurin 25 LTS 已驗證
- **Node.js 20+** / **npm 10+**
- **Git 2.30+**
- **Cloudflare 帳號**（免費方案可用）

## 步驟一：取得原始碼

```bash
git clone https://github.com/origessentials/origessentials.git
cd origessentials
```

## 步驟二：建立 D1 資料庫

```bash
# 進入 panel 目錄
cd panel

# 登入 Cloudflare（需安裝 wrangler CLI）
npx wrangler login

# 建立 D1 資料庫
npx wrangler d1 create origessentials

# 記錄回傳的 database_id
```

## 步驟三：設定環境變數

```bash
# 複製環境變數範例
cp .env.example .env.local

# 編輯 .env.local
# 填入以下欄位：
#   D1_DATABASE_ID  — 步驟二取得的 ID
#   ENCRYPTION_KEY  — AES-256 金鑰（32 位元組 Base64）
#   JWT_SECRET      — JWT 簽發金鑰（32 位元組 Base64）
```

**產生 ENCRYPTION_KEY：**
```bash
node -e "console.log(btoa(Array.from(crypto.getRandomValues(new Uint8Array(32)), b => String.fromCharCode(b)).join('')))"
```

**產生 JWT_SECRET：**
```bash
node -e "console.log(btoa(Array.from(crypto.getRandomValues(new Uint8Array(32)), b => String.fromCharCode(b)).join('')))"
```

## 步驟四：執行資料庫遷移

```bash
# 本地測試遷移（可選）
npm run db:migrate

# 生產環境遷移
npm run db:migrate:prod
```

## 步驟五：部署 Workers

```bash
# 建置
npm run build

# 部署（需在 wrangler.toml 中設定 account_id 與 database_id）
npm run deploy
```

## 步驟六：建置插件

```bash
cd ../plugin
./gradlew build
# 產出: build/libs/OrigEssentials-0.1.0-SNAPSHOT.jar
```

## 步驟七：安裝插件

```bash
# 複製至伺服器 plugins 目錄
cp build/libs/OrigEssentials-*.jar /path/to/server/plugins/

# 編輯設定檔
# 路徑: plugins/OrigEssentials/config.yml
```

設定範例：
```yaml
web-panel:
  enabled: true
  api-endpoint: "https://api.origessentials.dev"
  api-base-path: "/api/v1"
  server-id: "your-server-external-id"
  pairing-key: ""
  api-key: ""
```

## 步驟八：配對流程

1. 登入 Web 面板
2. 進入「伺服器管理」→「新增配對碼」
3. 在 Minecraft 伺服器執行：
   ```
   /orig pair <配對碼>
   ```
4. 系統自動完成憑證交換

## 步驟九：部署網站（可選）

```bash
cd ../website
npm install
npm run build

# 部署至 Cloudflare Pages
npx wrangler pages deploy dist --project-name=origessentials-website
```

## 常見問題

| 問題 | 解決方法 |
|------|----------|
| D1 migration 失敗 | 確認 database_id 正確，首次執行需使用 `--local` 建立本地資料庫 |
| Workers 部署 401 | 確認 `wrangler login` 已授權，檢查 API Token 是否過期 |
| 插件無法載入 | 確認 Java 版本 ≥ 17，Paper/Purpur 版本 ≥ 1.20.1 |
| 配對失敗 | 確認 `api-endpoint` 正確且可從伺服器連線，檢查 CORS 設定 |