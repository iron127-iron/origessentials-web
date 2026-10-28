---
title: 插件連線
description: OrigEssentials 插件與 Web 面板的配對與連線機制
---

# 插件連線

## 配對流程

配對是插件與 Web 面板建立安全連線的唯一方式。配對碼為一次性、短效憑證。

### 步驟一：建立配對碼

1. 登入 Web 面板
2. 進入「伺服器管理」→「新增配對」
3. 系統產生 8 位元配對碼（有效期 5 分鐘）

### 步驟二：執行配對

在 Minecraft 伺服器中執行：

```
/orig pair <配對碼>
```

### 步驟三：完成連線

系統自動完成以下動作：
1. 插件發送配對請求至 `POST /api/v1/pairings`
2. 後端驗證配對碼（驗證後立即失效）
3. 後端發放專屬伺服器的 API Key
4. 插件儲存 API Key 至 config.yml
5. Web 面板顯示「已配對」

## 連線維護

### 輪詢工作佇列

插件每 10 秒（預設）輪詢待執行工作：

```
POST /api/v1/servers/{serverId}/jobs/poll
```

收到工作後執行並回報：

```
POST /api/v1/servers/{serverId}/jobs/{jobId}/result
```

### 心跳

每 30 秒發送心跳維持連線：

```
POST /api/v1/servers/{serverId}/heartbeat
```

## 解除配對

```
/orig unpair
```

解除後：
- 清除 config.yml 中的 API Key
- 後端撤銷對應憑證
- 插件停止所有連線

## 常見錯誤

| 錯誤 | 原因 | 處理 |
|------|------|------|
| 配對碼無效 | 已過期或已被使用 | 重新生成配對碼 |
| 伺服器已配對 | 未先解除配對 | 執行 `/orig unpair` |
| API 不可達 | 位址錯誤或網路問題 | 檢查 `api-endpoint` |
| TLS 驗證失敗 | 憑證問題 | 檢查 `verify-tls` 與位址 |