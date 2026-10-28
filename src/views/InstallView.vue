<template>
  <div class="py-12 lg:py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-dark-50 mb-8">安裝指南</h1>

      <div class="doc-content space-y-8">
        <section>
          <h2>前置需求</h2>
          <ul>
            <li><strong>Java 17+</strong>：Minecraft 插件編譯與執行環境</li>
            <li><strong>Node.js 20+</strong>：Workers 與網站建置工具</li>
            <li><strong>Cloudflare 帳號</strong>：免費方案即可，需有 Workers 與 D1 存取權</li>
            <li><strong>Git</strong>：版本控制與原始碼取得</li>
          </ul>
        </section>

        <section>
          <h2>步驟一：取得原始碼</h2>
          <pre><code>git clone https://github.com/origessentials/origessentials.git
cd origessentials</code></pre>
        </section>

        <section>
          <h2>步驟二：建立 Cloudflare D1 資料庫</h2>
          <pre><code># 建立 D1 資料庫（請先登入 Cloudflare）
npx wrangler d1 create origessentials

# 記錄回傳的 database_id，稍後用於設定</code></pre>
          <p class="text-sm text-dark-500 mt-2">
            請將產生的 database_id 記錄下來，之後會填入 wrangler.toml。
          </p>
        </section>

        <section>
          <h2>步驟三：執行資料庫遷移</h2>
          <pre><code># 建立 .env.local 檔案
cp panel/.env.example panel/.env.local
# 編輯 .env.local，填入 D1_DATABASE_ID 及其他必要值

# 執行遷移（本地測試）
cd panel
npm run db:migrate

# 生產環境遷移
npm run db:migrate:prod</code></pre>
        </section>

        <section>
          <h2>步驟四：設定 Secrets</h2>
          <pre><code># 產生 AES-256 加密金鑰（32 位元組 Base64）
node -e "console.log(btoa(Array.from(crypto.getRandomValues(new Uint8Array(32)), b => String.fromCharCode(b)).join('')))"

# 設定 Workers Secrets
npx wrangler secret put ENCRYPTION_KEY
npx wrangler secret put JWT_SECRET</code></pre>
          <p class="text-sm text-dark-500 mt-2">
            ENCRYPTION_KEY 用於加密託管商 API Key，JWT_SECRET 用於 Session Token 簽發。
            兩者都必須隨機產生且不得共用。
          </p>
        </section>

        <section>
          <h2>步驟五：部署 Workers</h2>
          <pre><code>cd panel
npm run deploy</code></pre>
          <p>部署後可透過以下端點測試健康檢查：</p>
          <pre><code>curl https://api.origessentials.dev/api/v1/health</code></pre>
        </section>

        <section>
          <h2>步驟六：建置與安裝插件</h2>
          <pre><code>cd ../plugin
./gradlew build

# 複製 JAR 到伺服器 plugins 目錄
cp build/libs/OrigEssentials-*.jar /path/to/server/plugins/</code></pre>
        </section>

        <section>
          <h2>步驟七：設定插件</h2>
          <p>編輯 <code>plugins/OrigEssentials/config.yml</code>：</p>
          <pre><code>web-panel:
  enabled: true
  api-endpoint: "https://api.origessentials.dev"
  api-base-path: "/api/v1"
  server-id: "your-server-external-id"
  pairing-key: ""
  api-key: ""</code></pre>
          <p class="text-sm text-dark-500 mt-2">
            server-id 為託管商提供的伺服器外部 ID。pairing-key 與 api-key 留空，
            後續透過配對流程自動取得。
          </p>
        </section>

        <section>
          <h2>步驟八：執行配對</h2>
          <ol>
            <li>在 Web 面板建立伺服器配對碼</li>
            <li>在 Minecraft 伺服器執行 <code>/orig pair &lt;配對碼&gt;</code></li>
            <li>系統自動完成憑證交換與保存</li>
          </ol>
        </section>

        <section>
          <h2>步驟九：部署網站</h2>
          <pre><code>cd ../../website
npm install
npm run build

# 部署至 Cloudflare Pages
npx wrangler pages deploy dist --project-name=origessentials-website</code></pre>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>