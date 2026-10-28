---
title: D1 資料庫指南
description: OrigEssentials D1 資料庫結構與管理
---

# D1 資料庫指南

## 資料庫結構

OrigEssentials 使用 Cloudflare D1（基于 SQLite）儲存所有資料：

| 資料表 | 用途 |
|--------|------|
| `accounts` | 管理員與玩家帳號 |
| `roles` | 角色定義 |
| `permissions` | 角色權限分配 |
| `role_assignments` | 帳號-角色-範圍綁定 |
| `sessions` | 登入 Session |
| `providers` | 託管商憑證（加密儲存） |
| `servers` | 伺服器基本資訊 |
| `server_credentials` | 配對憑證 |
| `pairing_codes` | 一次性配對碼 |
| `minecraft_binds` | Minecraft UUID 綁定 |
| `audit_log` | 操作審計紀錄 |
| `notifications` | 通知訊息 |
| `system_settings` | 系統設定 |

## Migration 管理

所有資料結構變更通過 SQL Migration 檔案管理：

```
migrations/
├── 001_initial.sql      # 基礎表結構
├── 002_seed_roles.sql   # 預設角色與權限
└── 003_seed_settings.sql # 系統預設設定
```

### 執行遷移

```bash
# 本地開發
npm run db:migrate

# 生產環境
npm run db:migrate:prod
```

### 新增 Migration

```sql
-- migrations/004_add_example.sql
ALTER TABLE accounts ADD COLUMN last_login_at TEXT;
CREATE INDEX IF NOT EXISTS idx_accounts_last_login ON accounts(last_login_at);
```

## 備份與還原

### 建立備份

```bash
npx wrangler d1 backup create origessentials
```

### 列出備份

```bash
npx wrangler d1 backup list origessentials
```

### 還原備份

```bash
npx wrangler d1 backup restore <BACKUP_ID>
```

## 查詢範例

### 查詢所有帳號

```sql
SELECT id, email, username, role_id, is_active, created_at
FROM accounts
ORDER BY created_at DESC;
```

### 查詢伺服器清單（含託管商）

```sql
SELECT s.id, s.name, s.status, p.name as provider_name
FROM servers s
JOIN providers p ON s.provider_id = p.id
ORDER BY s.name;
```

### 查詢審計紀錄

```sql
SELECT actor_id, action, target_type, created_at
FROM audit_log
WHERE created_at > datetime('now', '-7 days')
ORDER BY created_at DESC
LIMIT 100;
```