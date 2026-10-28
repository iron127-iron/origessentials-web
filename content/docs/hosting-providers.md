---
title: 託管商支援
description: OrigEssentials 支援的 Minecraft 託管商與設定方式
---

# 託管商支援

## 支援清單

| 託管商 | 狀態 | API | 備註 |
|--------|------|-----|------|
| Cafora Host | ✅ 已驗證 | Pterodactyl Client API | 完整功能支援 |
| 超大咖 | ⏳ 等待驗證 | 待確認 | 需 API 文件 |
| IceHost | ⏳ 等待驗證 | 待確認 | 需 API 文件 |
| 鑽石託管 | ⏳ 等待驗證 | 待確認 | 需 API 文件 |
| Pterodactyl 相容 | 🟡 部分支援 | Pterodactyl API v1 | 框架已實作 |
| 自訂託管商 | ✅ 支援 | 自訂 Adapter | 需自行實作 |

## Cafora Host 設定

Cafora Host 使用 Pterodactyl Client API，需以下資訊：

1. **API 位址**：`https://panel.caforahost.com/api/client`
2. **API Key**：在 Cafora Host 控制面板中建立

### 在面板中新增 Cafora Host

1. 進入「伺服器管理」→「新增託管商」
2. 選擇「Cafora Host」模板
3. 輸入 API 位址與 API Key
4. 點擊「測試連線」
5. 驗證通過後選擇要管理的伺服器
6. 完成設定

## 自訂託管商

若您的託管商使用非 Pterodactyl API，可自訂 Adapter：

1. 參考 [Adapter 開發指南](./provider-adapter-development.md)
2. 實作 `ProviderAdapter` 介面
3. 註冊至系統

## 不支援的功能

某些託管商可能不提供以下功能：
- WebSocket 即時主控台
- 檔案上傳/下載
- API Key 管理

請依據實際 API 能力顯示支援狀態，不虛構功能。