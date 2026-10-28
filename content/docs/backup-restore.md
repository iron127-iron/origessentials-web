---
title: 備份與還原
description: OrigEssentials 資料庫備份與遷移流程
---

# 備份與還原

## D1 備份

### 建立備份

```bash
# 列出目前備份
npx wrangler d1 backup list origessentials

# 建立新備份
npx wrangler d1 backup create origessentials
```

### 還原備份

```bash
# 查看可用備份
npx wrangler d1 backup list origessentials

# 還原至指定時間點
npx wrangler d1 backup restore origessentials --backup-id=<BACKUP_ID>
```

## 資料遷移

### 遷移前提

玩家帳號、UUID 綁定、角色權限及審計紀錄 **不依賴特定託管商**，遷移時這些資料不會遺失。

### 遷移流程

1. **備份現有 D1 資料庫**
   ```bash
   npx wrangler d1 backup create origessentials
   ```

2. **建立新 D1 資料庫**
   ```bash
   npx wrangler d1 create origessentials-new
   ```

3. **執行遷移**
   ```bash
   npx wrangler d1 execute origessentials-new --file=panel/migrations/001_initial.sql
   npx wrangler d1 execute origessentials-new --file=panel/migrations/002_seed_roles.sql
   npx wrangler d1 execute origessentials-new --file=panel/migrations/003_seed_settings.sql
   ```

4. **匯出舊資料**
   ```bash
   npx wrangler d1 result origessentials --command="SELECT * FROM accounts" --output=json
   ```

5. **匯入新資料庫**（需自行編寫轉換腳本）

6. **切換 Workers 指向新資料庫**
   編輯 `wrangler.toml` 中的 `database_id`

7. **驗證資料完整性**
   ```bash
   npx wrangler d1 execute origessentials-new --command="SELECT COUNT(*) FROM accounts"
   ```

## 注意事項

- 遷移期間建議暫停新資料寫入
- 遷移後需通知使用者重新登入（Session 無效）
- 舊 D1 資料庫保留至少 7 天以便回退
- 建議在 staging 環境先測試遷移流程