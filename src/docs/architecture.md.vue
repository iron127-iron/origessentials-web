<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: 架構說明</p>
<p>description: OrigEssentials 技術架構與設計原則</p>
<p>---</p>
<h1>架構說明</h1>
<h2>整體架構</h2>
<p>OrigEssentials 採用 Monorepo 架構，三個主要子專案可獨立開發、建置與部署：</p>
<pre><code class="language-text">┌─────────────────────────────────────────────────────┐
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
└─────────────────────────────────────────────────────┘</code></pre>
<h2>通訊模型</h2>
<h3>插件 → Workers（主動輪詢）</h3>
<p>插件定期發送 HTTPS 請求至 Workers API，不需開放入站連接埠：</p>
<pre><code class="language-text">插件 ──POST /jobs/poll──► Workers ──► D1
                            │
                            ├──► Adapter ──► 託管商 API
                            │
                            └──► 回報結果 ──► 插件</code></pre>
<h3>Web 面板 → Workers</h3>
<p>SPA 直接呼叫 Workers REST API，所有請求經 JWT Session 認證。</p>
<h3>Workers → 託管商 API</h3>
<p>Adapter 模式，每個託管商實作獨立 Adapter 類別，統一介面：</p>
<pre><code class="language-text">Workers ──► PterodactylAdapter ──► Cafora Host API
          ├──► CustomAdapter ────► 自訂 API
          └──► ...</code></pre>
<h2>資料流向</h2>
<h3>配對流程</h3>
<pre><code class="language-text">管理員 ──► 面板建立配對碼 ──► D1
                │
玩家 ──► /orig pair ──► 插件 ──► POST /pairings ──► Workers
                                                │
                                          驗證配對碼
                                                │
                                          發放憑證 ──► 插件</code></pre>
<h3>UUID 綁定流程</h3>
<pre><code class="language-text">玩家 ──► 面板申請綁定碼 ──► D1 產生一次性碼
                │
玩家 ──► /orig bind &lt;碼&gt; ──► 插件 ──► POST /bind/verify ──► Workers
                                                    │
                                              驗證碼 + UUID
                                                    │
                                              儲存綁定 ──► D1</code></pre>
<h2>安全設計</h2>
<h3>層級防禦</h3>
<p>| 層級 | 技術 | 說明 |</p>
<p>|------|------|------|</p>
<p>| 傳輸層 | TLS 1.2+ | 所有外部連線強制 HTTPS |</p>
<p>| 應用層 | AES-256-GCM | 託管商憑證加密儲存 |</p>
<p>| 認證層 | JWT + Session | HttpOnly Cookie + CSRF Token |</p>
<p>| 授權層 | 伺服器端檢查 | 預設拒絕，白名單授權 |</p>
<p>| 審計層 | 不可篡改日誌 | 所有敏感操作記錄 |</p>
<h3>金鑰管理</h3>
<pre><code class="language-text">Cloudflare Workers Secrets
    │
    ├── ENCRYPTION_KEY ──► AES-256-GCM ──► D1 (encrypted_api_key)
    │
    └── JWT_SECRET ────► HMAC-SHA256 ──► Session Token</code></pre>
<h2>擴充性設計</h2>
<h3>Provider Adapter 系統</h3>
<p>每個託管商實作 <code>ProviderAdapter</code> 介面，核心邏輯與具體 API 分離：</p>
<pre><code class="language-typescript">interface ProviderAdapter {
  info: ProviderAdapterInfo;
  testConnection(apiKey): Promise&lt;ConnectionTestResult&gt;;
  listServers(apiKey): Promise&lt;ServerListItem[]&gt;;
  getServerStatus(apiKey, serverId): Promise&lt;...&gt;;
  // ... 其他方法
}</code></pre>
<p>新增託管商只需實作此介面，不需修改核心邏輯。</p>
<h3>資料隔離</h3>
<ul>
<li>玩家帳號、UUID 綁定、角色權限 <strong>獨立於託管商</strong></li>
</ul>
<ul>
<li>更換託管商不影響玩家資料</li>
</ul>
<ul>
<li>審計紀錄永久保留，不因遷移刪除</li>
</ul>
  </div>
</template>
