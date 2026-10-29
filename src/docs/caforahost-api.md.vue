<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: Cafora Host API</p>
<p>description: Cafora Host Pterodactyl Client API 整合說明</p>
<p>---</p>
<h1>Cafora Host API</h1>
<h2>官方文件</h2>
<p>Cafora Host 使用 Pterodactyl 原生 Client API：</p>
<p><strong>https://pterodactyl.io/api/client/</strong></p>
<h2>API 基礎資訊</h2>
<p>| 項目 | 值 |</p>
<p>|------|-----|</p>
<p>| 基礎位址 | <code>https://panel.caforahost.com/api/client</code> |</p>
<p>| 認證方式 | Bearer Token（API Key） |</p>
<p>| 內容類型 | application/json |</p>
<h2>已驗證端點</h2>
<h3>伺服器清單</h3>
<pre><code class="language-text">GET /server</code></pre>
<p>回應範例：</p>
<pre><code class="language-json">{
  "object": "list",
  "data": [
    {
      "attributes": {
        "identifier": "abc123",
        "name": "My Server",
        "status": "running",
        "limits": {
          "cpu": 0,
          "memory": 2048,
          "disk": 10240
        },
        "feature_limits": {}
      }
    }
  ]
}</code></pre>
<h3>伺服器狀態</h3>
<pre><code class="language-text">GET /server/info</code></pre>
<h3>電源操作</h3>
<pre><code class="language-text">POST /server/power
Body: { "signal": "start" | "stop" | "restart" }</code></pre>
<h3>主控台</h3>
<pre><code class="language-text">GET /server/logs?filter=&amp;count=100</code></pre>
<h3>檔案操作</h3>
<pre><code class="language-text">GET  /server/files/list?file=/
GET  /server/files/read?file=/path/to/file
PUT  /server/files/write?file=/path/to/file
POST /server/files/create-directory?path=/new/dir
DELETE /server/files?file=/path/to/delete</code></pre>
<h2>速率限制</h2>
<p>Pterodactyl Client API 預設無嚴格的速率限制，但建議：</p>
<ul>
<li>輪詢間隔 ≥ 10 秒</li>
</ul>
<ul>
<li>避免並行超過 5 個請求</li>
</ul>
<ul>
<li>遇到 429 時指數退避重試</li>
</ul>
<h2>錯誤處理</h2>
<p>| HTTP 狀態 | 說明 | 處理 |</p>
<p>|-----------|------|------|</p>
<p>| 401 | API Key 無效 | 重新產生 API Key |</p>
<p>| 403 | 無權限存取 | 確認帳號權限 |</p>
<p>| 404 | 伺服器不存在 | 檢查 Server Identifier |</p>
<p>| 429 | 請求頻繁 | 等待後重試 |</p>
<p>| 503 | 服務暫 unavailable | 稍後重試 |</p>
<h2>注意事項</h2>
<ul>
<li>Cafora Host 不提供一般使用者的 Application API 管理員功能</li>
</ul>
<ul>
<li>API Key 權限跟隨建立者的帳號權限</li>
</ul>
<ul>
<li>所有操作皆為唯讀，除非明確擁有權限</li>
</ul>
  </div>
</template>
