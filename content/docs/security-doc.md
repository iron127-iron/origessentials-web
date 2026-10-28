---
title: 安全政策
description: OrigEssentials 安全設計與防護機制完整說明
---

# 安全政策

## 密碼儲存

使用 Argon2id 雜湊，禁止明文或可逆儲存：
- 記憶體：64 MB
- 迭代：2
- 平行度：1
- 雜湊長度：32 bytes
- 禁止 MD5、SHA-1、單次 SHA-256

## Session 安全

| 項目 | 設定 |
|------|------|
| Cookie 屬性 | HttpOnly, Secure, SameSite=Strict |
| 管理員閒置逾時 | 30 分鐘 |
| 最大 Session 生命週期 | 12 小時 |
| Session 撤銷 | 密碼/MFA 變更時自動撤銷 |

## 憑證加密

```
明文 API Key
    │
    ▼
AES-256-GCM 加密（Workers Secrets ENCRYPTION_KEY）
    │
    ├── encrypted_api_key（密文 Base64）→ D1
    └── api_key_iv（IV Base64）→ D1
```

- 主金鑰儲存在 Cloudflare Workers Secrets
- 每筆憑證使用 12 位元組隨機 IV
- 金鑰版本管理（key_version）支援輪替
- 日誌不得記錄明文憑證

## 傳輸加密

| 連線類型 | 協議 | 驗證 |
|----------|------|------|
| 網頁 ↔ Workers | HTTPS | TLS 1.2+ |
| 插件 ↔ Workers | HTTPS | TLS 驗證預設啟用 |
| WebSocket | WSS | 握手認證 |

## 輸入驗證

- 所有 API 輸入伺服器端驗證
- SQL 參數化查詢，禁止字串串接
- 檔案路徑白名單 + 穿越防護
- 檔案上傳限制型別、大小、擴展名

## 已知限制

1. **TLS 終止**：Cloudflare Workers 可讀取 HTTPS 終止後的明文，端到端加密需額外實作
2. **免費方案限制**：D1 1 GB 容量，Workers 單請求 30 秒，日均 10 萬次
3. **MFA 為可選**：玩家帳號 MFA 為選用功能，非強制

## 漏洞回報

透過 GitHub Security Advisories 回報，勿在公開 Issue 披露。

**聯絡：** security@origessentials.dev