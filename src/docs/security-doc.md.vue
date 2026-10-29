<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: 安全政策</p>
<p>description: OrigEssentials 安全設計與防護機制完整說明</p>
<p>---</p>
<h1>安全政策</h1>
<h2>密碼儲存</h2>
<p>使用 Argon2id 雜湊，禁止明文或可逆儲存：</p>
<ul>
<li>記憶體：64 MB</li>
</ul>
<ul>
<li>迭代：2</li>
</ul>
<ul>
<li>平行度：1</li>
</ul>
<ul>
<li>雜湊長度：32 bytes</li>
</ul>
<ul>
<li>禁止 MD5、SHA-1、單次 SHA-256</li>
</ul>
<h2>Session 安全</h2>
<p>| 項目 | 設定 |</p>
<p>|------|------|</p>
<p>| Cookie 屬性 | HttpOnly, Secure, SameSite=Strict |</p>
<p>| 管理員閒置逾時 | 30 分鐘 |</p>
<p>| 最大 Session 生命週期 | 12 小時 |</p>
<p>| Session 撤銷 | 密碼/MFA 變更時自動撤銷 |</p>
<h2>憑證加密</h2>
<pre><code class="language-text">明文 API Key
    │
    ▼
AES-256-GCM 加密（Workers Secrets ENCRYPTION_KEY）
    │
    ├── encrypted_api_key（密文 Base64）→ D1
    └── api_key_iv（IV Base64）→ D1</code></pre>
<ul>
<li>主金鑰儲存在 Cloudflare Workers Secrets</li>
</ul>
<ul>
<li>每筆憑證使用 12 位元組隨機 IV</li>
</ul>
<ul>
<li>金鑰版本管理（key_version）支援輪替</li>
</ul>
<ul>
<li>日誌不得記錄明文憑證</li>
</ul>
<h2>傳輸加密</h2>
<p>| 連線類型 | 協議 | 驗證 |</p>
<p>|----------|------|------|</p>
<p>| 網頁 ↔ Workers | HTTPS | TLS 1.2+ |</p>
<p>| 插件 ↔ Workers | HTTPS | TLS 驗證預設啟用 |</p>
<p>| WebSocket | WSS | 握手認證 |</p>
<h2>輸入驗證</h2>
<ul>
<li>所有 API 輸入伺服器端驗證</li>
</ul>
<ul>
<li>SQL 參數化查詢，禁止字串串接</li>
</ul>
<ul>
<li>檔案路徑白名單 + 穿越防護</li>
</ul>
<ul>
<li>檔案上傳限制型別、大小、擴展名</li>
</ul>
<h2>已知限制</h2>
<p>1. <strong>TLS 終止</strong>：Cloudflare Workers 可讀取 HTTPS 終止後的明文，端到端加密需額外實作</p>
<p>2. <strong>免費方案限制</strong>：D1 1 GB 容量，Workers 單請求 30 秒，日均 10 萬次</p>
<p>3. <strong>MFA 為可選</strong>：玩家帳號 MFA 為選用功能，非強制</p>
<h2>漏洞回報</h2>
<p>透過 GitHub Security Advisories 回報，勿在公開 Issue 披露。</p>
<p><strong>聯絡：</strong> security@origessentials.dev</p>
  </div>
</template>
