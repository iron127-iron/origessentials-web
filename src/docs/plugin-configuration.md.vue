<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: 插件設定</p>
<p>description: OrigEssentials 插件完整設定選項說明</p>
<p>---</p>
<h1>插件設定</h1>
<h2>config.yml 完整說明</h2>
<pre><code class="language-yaml"># ── Web 面板連線設定 ──────────────────────────
web-panel:
  # 是否啟用 Web 面板連線
  # false: 完全停用所有連線、輪詢、遠端操作
  # true:  啟用所有功能（需填寫下方設定）
  enabled: false

  # Web 面板 API 基礎位址
  # 範例: https://panel.example.com
  api-endpoint: ""

  # API 路徑前綴
  api-base-path: "/api/v1"

  # 伺服器外部識別碼（由託管商提供）
  server-id: ""

  # 配對金鑰（配對成功後自動產生，勿手動填寫）
  pairing-key: ""

  # API Key（由 Web 面板配對流程發放，勿手動填寫）
  api-key: ""

  # 連線參數
  connection:
    # 輪詢間隔（秒）
    poll-interval: 10
    # 請求超時（毫秒）
    timeout: 10000
    # 是否自動重連
    auto-reconnect: true
    # 最大重連嘗試次數（-1 = 無限）
    max-reconnect-attempts: -1
    # 重連退避基底（秒）
    reconnect-backoff-base: 5

  # 安全設定
  security:
    # 是否允許遠端電源操作（啟動/停止/重啟）
    allow-remote-actions: false
    # 是否允許讀取玩家資料
    allow-player-data-read: false
    # 是否允許檔案管理
    allow-file-management: false
    # TLS 憑證驗證（false 僅用於除錯）
    verify-tls: true

# ── 日誌設定 ─────────────────────────────────
logging:
  level: INFO  # TRACE, DEBUG, INFO, WARN, ERROR
  file-enabled: true
  file-path: "logs/origessentials.log"
  max-file-size-mb: 10
  max-files: 5

# ── 功能開關 ────────────────────────────────
features:
  uuid-binding: true
  operation-logging: true
  notifications: true

# ── 效能設定 ────────────────────────────────
performance:
  max-connections: 10
  dns-cache-ttl: 60
  response-buffer-size: 8192</code></pre>
<h2>停用 Web 面板</h2>
<pre><code class="language-yaml">web-panel:
  enabled: false</code></pre>
<p>停用後：</p>
<ul>
<li>不建立任何 HTTP 連線</li>
</ul>
<ul>
<li>不執行定期輪詢</li>
</ul>
<ul>
<li>不接受遠端操作指令</li>
</ul>
<ul>
<li>插件基本遊戲功能正常運作</li>
</ul>
<h2>重要提醒</h2>
<p>1. <strong>禁止</strong>在 config.yml 中填寫真實 API Key（配對後自動填入）</p>
<p>2. <strong>禁止</strong>在生產環境將 <code>verify-tls</code> 設為 <code>false</code></p>
<ol>
<li><strong>禁止</strong>在 Git 倉庫提交含真實憑證的設定檔</li>
</ol>
  </div>
</template>
