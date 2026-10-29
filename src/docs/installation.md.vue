<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: 安裝指南</p>
<p>description: OrigEssentials 完整安裝與部署流程</p>
<p>---</p>
<h1>安裝指南</h1>
<p>本文檔說明 OrigEssentials 的完整安裝流程，包含 D1 資料庫、Workers 部署、插件安裝及配對設定。</p>
<h2>前置需求</h2>
<ul>
<li><strong>Java 17+</strong>：Temurin 25 LTS 已驗證</li>
</ul>
<ul>
<li><strong>Node.js 20+</strong> / <strong>npm 10+</strong></li>
</ul>
<ul>
<li><strong>Git 2.30+</strong></li>
</ul>
<ul>
<li><strong>Cloudflare 帳號</strong>（免費方案可用）</li>
</ul>
<h2>步驟一：取得原始碼</h2>
<pre><code class="language-bash">git clone https://github.com/origessentials/origessentials.git
cd origessentials</code></pre>
<h2>步驟二：建立 D1 資料庫</h2>
<pre><code class="language-bash"># 進入 panel 目錄
cd panel

# 登入 Cloudflare（需安裝 wrangler CLI）
npx wrangler login

# 建立 D1 資料庫
npx wrangler d1 create origessentials

# 記錄回傳的 database_id</code></pre>
<h2>步驟三：設定環境變數</h2>
<pre><code class="language-bash"># 複製環境變數範例
cp .env.example .env.local

# 編輯 .env.local
# 填入以下欄位：
#   D1_DATABASE_ID  — 步驟二取得的 ID
#   ENCRYPTION_KEY  — AES-256 金鑰（32 位元組 Base64）
#   JWT_SECRET      — JWT 簽發金鑰（32 位元組 Base64）</code></pre>
<p><strong>產生 ENCRYPTION_KEY：</strong></p>
<pre><code class="language-bash">node -e "console.log(btoa(Array.from(crypto.getRandomValues(new Uint8Array(32)), b =&gt; String.fromCharCode(b)).join('')))"</code></pre>
<p><strong>產生 JWT_SECRET：</strong></p>
<pre><code class="language-bash">node -e "console.log(btoa(Array.from(crypto.getRandomValues(new Uint8Array(32)), b =&gt; String.fromCharCode(b)).join('')))"</code></pre>
<h2>步驟四：執行資料庫遷移</h2>
<pre><code class="language-bash"># 本地測試遷移（可選）
npm run db:migrate

# 生產環境遷移
npm run db:migrate:prod</code></pre>
<h2>步驟五：部署 Workers</h2>
<pre><code class="language-bash"># 建置
npm run build

# 部署（需在 wrangler.toml 中設定 account_id 與 database_id）
npm run deploy</code></pre>
<h2>步驟六：建置插件</h2>
<pre><code class="language-bash">cd ../plugin
./gradlew build
# 產出: build/libs/OrigEssentials-0.1.0-SNAPSHOT.jar</code></pre>
<h2>步驟七：安裝插件</h2>
<pre><code class="language-bash"># 複製至伺服器 plugins 目錄
cp build/libs/OrigEssentials-*.jar /path/to/server/plugins/

# 編輯設定檔
# 路徑: plugins/OrigEssentials/config.yml</code></pre>
<p>設定範例：</p>
<pre><code class="language-yaml">web-panel:
  enabled: true
  api-endpoint: "https://api.origessentials.dev"
  api-base-path: "/api/v1"
  server-id: "your-server-external-id"
  pairing-key: ""
  api-key: ""</code></pre>
<h2>步驟八：配對流程</h2>
<p>1. 登入 Web 面板</p>
<p>2. 進入「伺服器管理」→「新增配對碼」</p>
<p>3. 在 Minecraft 伺服器執行：</p>
<p>   ```</p>
<p>   /orig pair &lt;配對碼&gt;</p>
<p>   ```</p>
<p>4. 系統自動完成憑證交換</p>
<h2>步驟九：部署網站（可選）</h2>
<pre><code class="language-bash">cd ../website
npm install
npm run build

# 部署至 Cloudflare Pages
npx wrangler pages deploy dist --project-name=origessentials-website</code></pre>
<h2>常見問題</h2>
<p>| 問題 | 解決方法 |</p>
<p>|------|----------|</p>
<p>| D1 migration 失敗 | 確認 database_id 正確，首次執行需使用 <code>--local</code> 建立本地資料庫 |</p>
<p>| Workers 部署 401 | 確認 <code>wrangler login</code> 已授權，檢查 API Token 是否過期 |</p>
<p>| 插件無法載入 | 確認 Java 版本 ≥ 17，Paper/Purpur 版本 ≥ 1.20.1 |</p>
<p>| 配對失敗 | 確認 <code>api-endpoint</code> 正確且可從伺服器連線，檢查 CORS 設定 |</p>
  </div>
</template>
