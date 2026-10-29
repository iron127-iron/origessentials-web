<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: Workers 部署指南</p>
<p>description: OrigEssentials Workers API 的建置與部署</p>
<p>---</p>
<h1>Workers 部署指南</h1>
<h2>技術架構</h2>
<ul>
<li><strong>平台</strong>：Cloudflare Workers</li>
</ul>
<ul>
<li><strong>資料庫</strong>：Cloudflare D1（SQLite）</li>
</ul>
<ul>
<li><strong>環境變數</strong>：Cloudflare Workers Secrets</li>
</ul>
<ul>
<li><strong>語言</strong>：TypeScript（ES2022 + WebAssembly）</li>
</ul>
<h2>本機開發</h2>
<pre><code class="language-bash">cd panel

# 安裝依賴
npm install

# 建立本地 D1 資料庫
npx wrangler d1 create origessentials-local --local

# 執行遷移
npm run db:migrate

# 啟動開發伺服器
npm run dev
# 預設：http://127.0.0.1:8787</code></pre>
<h2>生產部署</h2>
<h3>步驟一：編輯 wrangler.toml</h3>
<pre><code class="language-toml">name = "origessentials-panel"
main = "src/worker/index.ts"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[vars]
ENVIRONMENT = "production"

[[d1_databases]]
binding = "DB"
database_name = "origessentials"
database_id = "&lt;YOUR_D1_DATABASE_ID&gt;"
migrations_dir = "migrations"</code></pre>
<h3>步驟二：設定 Secrets</h3>
<pre><code class="language-bash"># 加密金鑰（32 位元組 Base64）
npx wrangler secret put ENCRYPTION_KEY

# JWT 簽發金鑰
npx wrangler secret put JWT_SECRET

# Cloudflare API Token（若需程式化操作）
npx wrangler secret put CF_API_TOKEN</code></pre>
<h3>步驟三：執行遷移</h3>
<pre><code class="language-bash">npx wrangler d1 migrations apply origessentials --env production</code></pre>
<h3>步驟四：部署</h3>
<pre><code class="language-bash">npx wrangler deploy</code></pre>
<h2>環境分離</h2>
<p>建議為不同環境建立獨立 Workers：</p>
<p>| 環境 | Worker 名稱 | 用途 |</p>
<p>|------|-------------|------|</p>
<p>| Development | <code>origessentials-dev</code> | 功能測試 |</p>
<p>| Staging | <code>origessentials-staging</code> | UAT 驗證 |</p>
<p>| Production | <code>origessentials-prod</code> | 正式服務 |</p>
<p>每個環境使用獨立 D1 資料庫與 Secrets。</p>
<h2>錯誤監控</h2>
<p>在 <code>wrangler.toml</code> 啟用 Observability：</p>
<pre><code class="language-toml">[observability]
enabled = true</code></pre>
<p>查看日誌：</p>
<pre><code class="language-bash">npx wrangler tail --service origessentials-prod</code></pre>
  </div>
</template>
