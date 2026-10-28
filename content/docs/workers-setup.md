---
title: Workers 部署指南
description: OrigEssentials Workers API 的建置與部署
---

# Workers 部署指南

## 技術架構

- **平台**：Cloudflare Workers
- **資料庫**：Cloudflare D1（SQLite）
- **環境變數**：Cloudflare Workers Secrets
- **語言**：TypeScript（ES2022 + WebAssembly）

## 本機開發

```bash
cd panel

# 安裝依賴
npm install

# 建立本地 D1 資料庫
npx wrangler d1 create origessentials-local --local

# 執行遷移
npm run db:migrate

# 啟動開發伺服器
npm run dev
# 預設：http://127.0.0.1:8787
```

## 生產部署

### 步驟一：編輯 wrangler.toml

```toml
name = "origessentials-panel"
main = "src/worker/index.ts"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[vars]
ENVIRONMENT = "production"

[[d1_databases]]
binding = "DB"
database_name = "origessentials"
database_id = "<YOUR_D1_DATABASE_ID>"
migrations_dir = "migrations"
```

### 步驟二：設定 Secrets

```bash
# 加密金鑰（32 位元組 Base64）
npx wrangler secret put ENCRYPTION_KEY

# JWT 簽發金鑰
npx wrangler secret put JWT_SECRET

# Cloudflare API Token（若需程式化操作）
npx wrangler secret put CF_API_TOKEN
```

### 步驟三：執行遷移

```bash
npx wrangler d1 migrations apply origessentials --env production
```

### 步驟四：部署

```bash
npx wrangler deploy
```

## 環境分離

建議為不同環境建立獨立 Workers：

| 環境 | Worker 名稱 | 用途 |
|------|-------------|------|
| Development | `origessentials-dev` | 功能測試 |
| Staging | `origessentials-staging` | UAT 驗證 |
| Production | `origessentials-prod` | 正式服務 |

每個環境使用獨立 D1 資料庫與 Secrets。

## 錯誤監控

在 `wrangler.toml` 啟用 Observability：

```toml
[observability]
enabled = true
```

查看日誌：
```bash
npx wrangler tail --service origessentials-prod
```