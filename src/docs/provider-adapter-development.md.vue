<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: Provider Adapter 開發指南</p>
<p>description: 如何為新的 Minecraft 託管商開發 Adapter</p>
<p>---</p>
<h1>Provider Adapter 開發指南</h1>
<h2>Adapter 介面</h2>
<p>所有 Adapter 必須實作 <code>shared/src/providers/adapter.ts</code> 中定義的 <code>ProviderAdapter</code> 介面：</p>
<pre><code class="language-typescript">interface ProviderAdapter {
  info: ProviderAdapterInfo;

  testConnection(apiKey: string): Promise&lt;ConnectionTestResult&gt;;
  listServers(apiKey: string): Promise&lt;ServerListItem[]&gt;;
  getServerStatus(apiKey: string, serverExternalId: string): Promise&lt;...&gt;;
  powerAction(apiKey: string, serverExternalId: string, action: 'start' | 'stop' | 'restart'): Promise&lt;boolean&gt;;
  sendConsoleCommand(apiKey: string, serverExternalId: string, command: string): Promise&lt;{ executed: boolean }&gt;;
  getConsoleOutput(apiKey: string, serverExternalId: string, lines?: number): Promise&lt;string[]&gt;;
  connectConsoleStream(apiKey, serverExternalId, onMessage, onError): Promise&lt;() =&gt; void&gt;;
  listFiles(apiKey: string, serverExternalId: string, path: string): Promise&lt;FileListItem[]&gt;;
  readFile(apiKey: string, serverExternalId: string, path: string): Promise&lt;string&gt;;
  writeFile(apiKey: string, serverExternalId: string, path: string, content: string, overwrite?: boolean): Promise&lt;void&gt;;
  deleteFile(apiKey: string, serverExternalId: string, path: string): Promise&lt;void&gt;;
  uploadFile(apiKey: string, serverExternalId: string, path: string, content: string, encoding?: 'utf-8' | 'base64'): Promise&lt;void&gt;;
  downloadFile(apiKey: string, serverExternalId: string, path: string): Promise&lt;string&gt;;
  createBackup(apiKey: string, serverExternalId: string, name?: string): Promise&lt;{ id: string; name: string }&gt;;
  listBackups(apiKey: string, serverExternalId: string): Promise&lt;Array&lt;{ id: string; name: string; createdAt: string; size?: number }&gt;&gt;;
  deleteBackup(apiKey: string, serverExternalId: string, backupId: string): Promise&lt;void&gt;;
  getCapabilities(apiKey: string): Promise&lt;ProviderCapabilities&gt;;
}</code></pre>
<h2>能力回報格式</h2>
<p>每個能力必須獨立回報：</p>
<p>| 值 | 說明 |</p>
<p>|-----|------|</p>
<p>| <code>supported</code> | 已驗證支援 |</p>
<p>| <code>unsupported</code> | 明確不支援 |</p>
<p>| <code>permission_denied</code> | 需要更高權限 |</p>
<p>| <code>not_configured</code> | 尚未配置 |</p>
<p>| <code>temporarily_unavailable</code> | 暫時不可用 |</p>
<h2>開發步驟</h2>
<h3>1. 建立 Adapter 檔案</h3>
<pre><code class="language-typescript">// panel/src/worker/adapters/CustomAdapter.ts
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
}</code></pre>
<h3>2. 註冊 Adapter</h3>
<pre><code class="language-typescript">// panel/src/worker/adapters/index.ts
import { CaforaHostAdapter } from './CaforaHostAdapter';
import { CustomAdapter } from './CustomAdapter';

export const adapterRegistry: Record&lt;string, ProviderAdapter&gt; = {
  cafora_host: new CaforaHostAdapter(),
  custom: new CustomAdapter(),
};</code></pre>
<h3>3. 實作單元測試</h3>
<pre><code class="language-typescript">// panel/tests/adapters/CustomAdapter.test.ts
import { describe, it, expect } from 'vitest';
import { CustomAdapter } from '../../src/worker/adapters/CustomAdapter';

describe('CustomAdapter', () =&gt; {
  it('should test connection', async () =&gt; {
    const adapter = new CustomAdapter();
    const result = await adapter.testConnection('test-key');
    expect(result.success).toBe(true);
  });
});</code></pre>
<h2>注意事項</h2>
<p>1. <strong>不捏造 API</strong>：未驗證的端點不得宣稱支援</p>
<p>2. <strong>安全優先</strong>：所有憑證加密後存入 D1</p>
<p>3. <strong>錯誤具體</strong>：錯誤訊息需指出具體問題，不得洩漏秘密</p>
<ol>
<li><strong>速率限制</strong>：適度處理 429 響應，使用指數退避</li>
</ol>
  </div>
</template>
