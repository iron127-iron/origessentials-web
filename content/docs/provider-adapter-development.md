---
title: Provider Adapter 開發指南
description: 如何為新的 Minecraft 託管商開發 Adapter
---

# Provider Adapter 開發指南

## Adapter 介面

所有 Adapter 必須實作 `shared/src/providers/adapter.ts` 中定義的 `ProviderAdapter` 介面：

```typescript
interface ProviderAdapter {
  info: ProviderAdapterInfo;

  testConnection(apiKey: string): Promise<ConnectionTestResult>;
  listServers(apiKey: string): Promise<ServerListItem[]>;
  getServerStatus(apiKey: string, serverExternalId: string): Promise<...>;
  powerAction(apiKey: string, serverExternalId: string, action: 'start' | 'stop' | 'restart'): Promise<boolean>;
  sendConsoleCommand(apiKey: string, serverExternalId: string, command: string): Promise<{ executed: boolean }>;
  getConsoleOutput(apiKey: string, serverExternalId: string, lines?: number): Promise<string[]>;
  connectConsoleStream(apiKey, serverExternalId, onMessage, onError): Promise<() => void>;
  listFiles(apiKey: string, serverExternalId: string, path: string): Promise<FileListItem[]>;
  readFile(apiKey: string, serverExternalId: string, path: string): Promise<string>;
  writeFile(apiKey: string, serverExternalId: string, path: string, content: string, overwrite?: boolean): Promise<void>;
  deleteFile(apiKey: string, serverExternalId: string, path: string): Promise<void>;
  uploadFile(apiKey: string, serverExternalId: string, path: string, content: string, encoding?: 'utf-8' | 'base64'): Promise<void>;
  downloadFile(apiKey: string, serverExternalId: string, path: string): Promise<string>;
  createBackup(apiKey: string, serverExternalId: string, name?: string): Promise<{ id: string; name: string }>;
  listBackups(apiKey: string, serverExternalId: string): Promise<Array<{ id: string; name: string; createdAt: string; size?: number }>>;
  deleteBackup(apiKey: string, serverExternalId: string, backupId: string): Promise<void>;
  getCapabilities(apiKey: string): Promise<ProviderCapabilities>;
}
```

## 能力回報格式

每個能力必須獨立回報：

| 值 | 說明 |
|-----|------|
| `supported` | 已驗證支援 |
| `unsupported` | 明確不支援 |
| `permission_denied` | 需要更高權限 |
| `not_configured` | 尚未配置 |
| `temporarily_unavailable` | 暫時不可用 |

## 開發步驟

### 1. 建立 Adapter 檔案

```typescript
// panel/src/worker/adapters/CustomAdapter.ts
import type { ProviderAdapter, ... } from '@origessentials/shared';

export class CustomAdapter implements ProviderAdapter {
  info: ProviderAdapterInfo = {
    id: 'custom',
    name: 'Custom Hosting',
    baseUrl: '',
    authMethod: 'api_key',
  };

  async testConnection(apiKey: string) {
    // 實作連線測試
  }

  // ... 實作其他方法
}
```

### 2. 註冊 Adapter

```typescript
// panel/src/worker/adapters/index.ts
import { CaforaHostAdapter } from './CaforaHostAdapter';
import { CustomAdapter } from './CustomAdapter';

export const adapterRegistry: Record<string, ProviderAdapter> = {
  cafora_host: new CaforaHostAdapter(),
  custom: new CustomAdapter(),
};
```

### 3. 實作單元測試

```typescript
// panel/tests/adapters/CustomAdapter.test.ts
import { describe, it, expect } from 'vitest';
import { CustomAdapter } from '../../src/worker/adapters/CustomAdapter';

describe('CustomAdapter', () => {
  it('should test connection', async () => {
    const adapter = new CustomAdapter();
    const result = await adapter.testConnection('test-key');
    expect(result.success).toBe(true);
  });
});
```

## 注意事項

1. **不捏造 API**：未驗證的端點不得宣稱支援
2. **安全優先**：所有憑證加密後存入 D1
3. **錯誤具體**：錯誤訊息需指出具體問題，不得洩漏秘密
4. **速率限制**：適度處理 429 響應，使用指數退避