---
title: Secrets 管理指南
description: OrigEssentials 憑證與金鑰的安全管理
---

# Secrets 管理指南

## 敏感資料分類

| 類別 | 範例 | 儲存位置 |
|------|------|----------|
| 主加密金鑰 | `ENCRYPTION_KEY` | Workers Secrets |
| JWT 簽發金鑰 | `JWT_SECRET` | Workers Secrets |
| 託管商 API Key | `encrypted_api_key` | D1（AES-256-GCM 加密） |
| 密碼雜湊 | `password_hash` | D1（Argon2id） |
| MFA 密鑰 | `mfa_secret` | D1（AES-256-GCM 加密） |

## Workers Secrets 設定

### 新增 Secret

```bash
# 進入 panel 目錄
cd panel

# 設定加密金鑰
echo -n "your-32-byte-key-here" | npx wrangler secret put ENCRYPTION_KEY

# 設定 JWT 金鑰
echo -n "your-jwt-secret-here" | npx wrangler secret put JWT_SECRET
```

### 產生安全金鑰

```bash
# 32 位元組隨機金鑰（Base64 編碼）
node -e "console.log(btoa(Array.from(crypto.getRandomValues(new Uint8Array(32)), b => String.fromCharCode(b)).join('')))"

# 64 位元字元 JWT Secret（Hex 編碼）
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```

### 檢視與刪除

```bash
# 列出所有 Secrets
npx wrangler secret list

# 刪除 Secret
npx wrangler secret delete ENCRYPTION_KEY
```

## D1 加密欄位

託管商 API Key 在存入 D1 前經過加密：

```
明文 API Key
    │
    ▼
AES-256-GCM 加密（使用 ENCRYPTION_KEY）
    │
    ├── encrypted_api_key（密文，Base64）→ D1
    └── api_key_iv（IV，Base64）→ D1
```

解密時由 Workers 後端程式讀取 `ENCRYPTION_KEY`，動態解密，永不回傳明文給前端。

## 金鑰輪替

當需要輪替加密金鑰時：

1. 產生新金鑰並設定為 `ENCRYPTION_KEY_V2`
2. 解讀所有現有加密資料（使用舊金鑰）
3. 重新加密並更新至新金鑰版本
4. 更新 `key_version` 欄位
5. 確認所有資料解密正常後，移除舊金鑰

## 安全注意事項

- **禁止**將 Secrets 提交至 Git 倉庫
- **禁止**在日誌中輸出明文憑證
- **禁止**在前端 JavaScript 中暴露任何 Secret
- 定期輪替金鑰（建議每 90 天）
- 使用 `.env.local` 存放本地開發用 Secret，並加入 `.gitignore`