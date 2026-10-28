<template>
  <div class="py-12 lg:py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-dark-50 mb-8">安全政策</h1>
      <div class="doc-content prose prose-invert max-w-none">
        <p>
          OrigEssentials 將安全性視為核心設計原則。本文檔說明系統的安全架構、
          加密策略及已知限制，供開發者與使用者理解系統防護機制。
        </p>

        <h2>密碼儲存</h2>
        <p>所有帳號密碼使用 Argon2id 雜湊，參數設定如下：</p>
        <ul>
          <li>記憶體用量：64 MB</li>
          <li>迭代次數：2</li>
          <li>平行度：1</li>
          <li>雜湊長度：32 位元組</li>
        </ul>
        <p>禁止使用 MD5、SHA-1、單次 SHA-256 等不安全雜湊函數。</p>

        <h2>Session 安全</h2>
        <ul>
          <li>Cookie 設定：<code>HttpOnly</code>、<code>Secure</code>、<code>SameSite=Strict</code></li>
          <li>管理員閒置逾時：30 分鐘（可調整）</li>
          <li>最大 Session 存續時間：12 小時（可調整）</li>
          <li>密碼或 MFA 變更時自動撤銷所有 Session</li>
        </ul>

        <h2>憑證加密</h2>
        <p>託管商 API Key 使用 AES-256-GCM 加密後存入 D1：</p>
        <ul>
          <li>主加密金鑰儲存在 Cloudflare Workers Secrets（環境變數）</li>
          <li>每筆憑證使用 12 位元組隨機 IV</li>
          <li>金鑰版本管理：<code>keyVersion</code> 欄位支援未來輪替</li>
          <li>日誌中不得出現明文憑證或完整 Authorization Header</li>
        </ul>

        <h2>傳輸加密</h2>
        <ul>
          <li>所有外部連線強制 HTTPS，TLS 憑證驗證預設啟用</li>
          <li>Minecraft 插件與 Workers 之間的連線使用 Bearer Token 認證</li>
          <li>WebSocket 主控台串流使用 WSS（加密 WebSocket）</li>
        </ul>

        <h2>輸入驗證</h2>
        <ul>
          <li>所有 API 輸入經過伺服器端驗證</li>
          <li>SQL 查詢一律使用參數化語句，禁止字串串接</li>
          <li>檔案路徑嚴格的白名單檢查與路徑穿越防護</li>
          <li>檔案上傳限制型別、大小及擴展名</li>
        </ul>

        <h2>已知限制</h2>
        <ul>
          <li>Cloudflare Workers 作為 HTTPS 終止端，可讀取 TLS 內明文資料；端到端加密需額外實作</li>
          <li>免費方案 D1 容量有限（1 GB），高用量時需評估升級成本</li>
          <li>免費方案 Workers 執行時間限制（單請求 30 秒，日均 10 萬次）</li>
        </ul>

        <h2>漏洞回報</h2>
        <p>請透過 GitHub Security Advisories 回報，勿在公開 Issue 中披露。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>