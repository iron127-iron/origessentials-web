---
title: Cafora Host API
description: Cafora Host Pterodactyl Client API 整合說明
---

# Cafora Host API

## 官方文件

Cafora Host 使用 Pterodactyl 原生 Client API：
**https://pterodactyl.io/api/client/**

## API 基礎資訊

| 項目 | 值 |
|------|-----|
| 基礎位址 | `https://panel.caforahost.com/api/client` |
| 認證方式 | Bearer Token（API Key） |
| 內容類型 | application/json |

## 已驗證端點

### 伺服器清單

```
GET /server
```

回應範例：
```json
{
  "object": "list",
  "data": [
    {
      "attributes": {
        "identifier": "abc123",
        "name": "My Server",
        "status": "running",
        "limits": {
          "cpu": 0,
          "memory": 2048,
          "disk": 10240
        },
        "feature_limits": {}
      }
    }
  ]
}
```

### 伺服器狀態

```
GET /server/info
```

### 電源操作

```
POST /server/power
Body: { "signal": "start" | "stop" | "restart" }
```

### 主控台

```
GET /server/logs?filter=&count=100
```

### 檔案操作

```
GET  /server/files/list?file=/
GET  /server/files/read?file=/path/to/file
PUT  /server/files/write?file=/path/to/file
POST /server/files/create-directory?path=/new/dir
DELETE /server/files?file=/path/to/delete
```

## 速率限制

Pterodactyl Client API 預設無嚴格的速率限制，但建議：
- 輪詢間隔 ≥ 10 秒
- 避免並行超過 5 個請求
- 遇到 429 時指數退避重試

## 錯誤處理

| HTTP 狀態 | 說明 | 處理 |
|-----------|------|------|
| 401 | API Key 無效 | 重新產生 API Key |
| 403 | 無權限存取 | 確認帳號權限 |
| 404 | 伺服器不存在 | 檢查 Server Identifier |
| 429 | 請求頻繁 | 等待後重試 |
| 503 | 服務暫 unavailable | 稍後重試 |

## 注意事項

- Cafora Host 不提供一般使用者的 Application API 管理員功能
- API Key 權限跟隨建立者的帳號權限
- 所有操作皆為唯讀，除非明確擁有權限