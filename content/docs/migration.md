---
title: 資料遷移
description: 更換託管商時的資料遷移流程
---

# 資料遷移

## 遷移原則

更換託管商時，以下資料 **不會** 被刪除或變更：
- 玩家帳號
- Minecraft UUID 綁定
- 角色與權限
- 審計紀錄
- 既有託管商憑證（除非使用者明确要求刪除）

## 遷移流程

### 步驟一：備份現有資料

```bash
npx wrangler d1 backup create origessentials
```

### 步驟二：建立新託管商連線

1. 在面板中新增新的託管商（見[託管商設定](./hosting-providers.md)）
2. 測試連線並確認伺服器清單正確

### 步驟三：重新配對插件

```
/orig unpair
/orig pair <新配對碼>
```

### 步驟四：驗證資料完整性

```sql
-- 檢查帳號數量
SELECT COUNT(*) FROM accounts;

-- 檢查 UUID 綁定
SELECT COUNT(*) FROM minecraft_binds;

-- 檢查審計紀錄
SELECT COUNT(*) FROM audit_log;
```

### 步驟五：清理舊憑證（可選）

確認新連線正常運作後，可在面板中刪除舊託管商記錄。

## 注意事項

1. 遷移期間建議暫停新伺服器操作
2. 舊 D1 資料庫保留至少 7 天
3. 若更換託管商同時更換 D1 資料庫，需完整匯出/匯入