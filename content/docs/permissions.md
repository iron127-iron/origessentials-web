---
title: 權限系統
description: OrigEssentials 角色與權限設計
---

# 權限系統

## 預設角色

| 角色 | 權限範圍 | 說明 |
|------|----------|------|
| `owner` | 全域 | 擁有所有權限，不可替代 |
| `admin` | 全域 | 可管理帳號、角色、設定 |
| `server_admin` | 單一伺服器 | 可管理該伺服器的所有操作 |
| `console_operator` | 單一伺服器 | 可傳送主控台指令與查看日誌 |
| `file_admin` | 單一伺服器 | 可瀏覽、讀取、編輯、刪除檔案 |
| `backup_admin` | 單一伺服器 | 可建立與刪除備份 |
| `moderator` | 單一伺服器 | 可查看狀態與主控台 |
| `player` | 單一伺服器 | 僅可查看公開資訊 |
| `read_only` | 單一伺服器 | 完全唯讀 |

## 權限範圍

| 範圍 | 適用對象 | 說明 |
|------|----------|------|
| `global` | 所有伺服器 | 全域權限 |
| `group` | 伺服器群組 | 群組內所有伺服器 |
| `server` | 單一伺服器 | 指定伺服器 |

## 權限節點

### 檢視權限
- `server.view` — 查看伺服器狀態
- `server.resources.view` — 查看資源使用量

### 電源權限
- `server.power.start` — 啟動伺服器
- `server.power.stop` — 停止伺服器
- `server.power.restart` — 重新啟動

### 主控台權限
- `server.console.view` — 查看主控台輸出
- `server.console.send` — 傳送主控台指令

### 檔案權限
- `server.file.read` — 讀取檔案
- `server.file.write` — 編輯檔案
- `server.file.delete` — 刪除檔案
- `server.file.upload` — 上傳檔案
- `server.file.download` — 下載檔案

### 備份權限
- `server.backup.create` — 建立備份
- `server.backup.delete` — 刪除備份
- `server.backup.download` — 下載備份

### 管理權限
- `account.view` — 查看帳號
- `account.manage` — 管理帳號
- `role.manage` — 管理角色
- `provider.manage` — 管理託管商
- `audit.view` — 查看審計紀錄
- `settings.manage` — 管理系統設定

## 高風險操作

以下操作需二次確認：
- 停止/重新啟動伺服器
- 刪除檔案
- 刪除備份
- 變更 Owner
- 撤銷管理員權限
- 解除重要綁定

## 權限檢查流程

1. 提取 Session 中的 accountId
2. 查詢該帳號的所有 RoleAssignment
3. 對每個 Assignment 檢查對應 Role 的 Permission
4. 若任一權限匹配，授予訪問
5. 若無匹配且非 owner，拒絕訪問