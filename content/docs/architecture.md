---
title: 架構說明
description: OrigEssentials 技術架構與設計原則
---

# 架構說明

## 整體架構

OrigEssentials 採用 Monorepo 架構，三個主要子專案可獨立開發、建置與部署：

```
┌─────────────────────────────────────────────────────┐
│                  GitHub Monorepo                     │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │  plugin  │  │  panel   │  │ website  │          │
│  │ (Java)   │  │(Workers) │  │ (Static) │          │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘          │
│       │             │             │                 │
│       └─────────────┼─────────────┘                 │
│                     │                               │
│              ┌──────▼──────┐                        │
│              │  shared/    │                        │
│              │ (TypeScript)│                        │
│              └──────┬──────┘                        │
│                     │                               │
│              ┌──────▼──────┐                        │
│              │  Cloudflare  │                        │
│              │  D1 / KV    │                        │
│              └─────────────┘                        │
└─────────────────────────────────────────────────────┘
```

## 通訊模型

### 插件 → Workers（主動輪詢）

插件定期發送 HTTPS 請求至 Workers API，不需開放入站連接埠：

```
插件 ──POST /jobs/poll──► Workers ──► D1
                            │
                            ├──► Adapter ──► 託管商 API
                            │
                            └──► 回報結果 ──► 插件
```

### Web 面板 → Workers

SPA 直接呼叫 Workers REST API，所有請求經 JWT Session 認證。

### Workers → 託管商 API

Adapter 模式，每個託管商實作獨立 Adapter 類別，統一介面：

```
Workers ──► PterodactylAdapter ──► Cafora Host API
          ├──► CustomAdapter ────► 自訂 API
          └──► ...
```

## 資料流向

### 配對流程

```
管理員 ──► 面板建立配對碼 ──► D1
                │
玩家 ──► /orig pair ──► 插件 ──► POST /pairings ──► Workers
                                                │
                                          驗證配對碼
                                                │
                                          發放憑證 ──► 插件
```

### UUID 綁定流程

```
玩家 ──► 面板申請綁定碼 ──► D1 產生一次性碼
                │
玩家 ──► /orig bind <碼> ──► 插件 ──► POST /bind/verify ──► Workers
                                                    │
                                              驗證碼 + UUID
                                                    │
                                              儲存綁定 ──► D1
```

## 安全設計

### 層級防禦

| 層級 | 技術 | 說明 |
|------|------|------|
| 傳輸層 | TLS 1.2+ | 所有外部連線強制 HTTPS |
| 應用層 | AES-256-GCM | 託管商憑證加密儲存 |
| 認證層 | JWT + Session | HttpOnly Cookie + CSRF Token |
| 授權層 | 伺服器端檢查 | 預設拒絕，白名單授權 |
| 審計層 | 不可篡改日誌 | 所有敏感操作記錄 |

### 金鑰管理

```
Cloudflare Workers Secrets
    │
    ├── ENCRYPTION_KEY ──► AES-256-GCM ──► D1 (encrypted_api_key)
    │
    └── JWT_SECRET ────► HMAC-SHA256 ──► Session Token
```

## 擴充性設計

### Provider Adapter 系統

每個託管商實作 `ProviderAdapter` 介面，核心邏輯與具體 API 分離：

```typescript
interface ProviderAdapter {
  info: ProviderAdapterInfo;
  testConnection(apiKey): Promise<ConnectionTestResult>;
  listServers(apiKey): Promise<ServerListItem[]>;
  getServerStatus(apiKey, serverId): Promise<...>;
  // ... 其他方法
}
```

新增託管商只需實作此介面，不需修改核心邏輯。

### 資料隔離

- 玩家帳號、UUID 綁定、角色權限 **獨立於託管商**
- 更換託管商不影響玩家資料
- 審計紀錄永久保留，不因遷移刪除