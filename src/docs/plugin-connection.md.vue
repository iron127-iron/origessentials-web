<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: 插件連線</p>
<p>description: OrigEssentials 插件與 Web 面板的配對與連線機制</p>
<p>---</p>
<h1>插件連線</h1>
<h2>配對流程</h2>
<p>配對是插件與 Web 面板建立安全連線的唯一方式。配對碼為一次性、短效憑證。</p>
<h3>步驟一：建立配對碼</h3>
<p>1. 登入 Web 面板</p>
<p>2. 進入「伺服器管理」→「新增配對」</p>
<p>3. 系統產生 8 位元配對碼（有效期 5 分鐘）</p>
<h3>步驟二：執行配對</h3>
<p>在 Minecraft 伺服器中執行：</p>
<pre><code class="language-text">/orig pair &lt;配對碼&gt;</code></pre>
<h3>步驟三：完成連線</h3>
<p>系統自動完成以下動作：</p>
<p>1. 插件發送配對請求至 <code>POST /api/v1/pairings</code></p>
<p>2. 後端驗證配對碼（驗證後立即失效）</p>
<p>3. 後端發放專屬伺服器的 API Key</p>
<p>4. 插件儲存 API Key 至 config.yml</p>
<p>5. Web 面板顯示「已配對」</p>
<h2>連線維護</h2>
<h3>輪詢工作佇列</h3>
<p>插件每 10 秒（預設）輪詢待執行工作：</p>
<pre><code class="language-text">POST /api/v1/servers/{serverId}/jobs/poll</code></pre>
<p>收到工作後執行並回報：</p>
<pre><code class="language-text">POST /api/v1/servers/{serverId}/jobs/{jobId}/result</code></pre>
<h3>心跳</h3>
<p>每 30 秒發送心跳維持連線：</p>
<pre><code class="language-text">POST /api/v1/servers/{serverId}/heartbeat</code></pre>
<h2>解除配對</h2>
<pre><code class="language-text">/orig unpair</code></pre>
<p>解除後：</p>
<ul>
<li>清除 config.yml 中的 API Key</li>
</ul>
<ul>
<li>後端撤銷對應憑證</li>
</ul>
<ul>
<li>插件停止所有連線</li>
</ul>
<h2>常見錯誤</h2>
<p>| 錯誤 | 原因 | 處理 |</p>
<p>|------|------|------|</p>
<p>| 配對碼無效 | 已過期或已被使用 | 重新生成配對碼 |</p>
<p>| 伺服器已配對 | 未先解除配對 | 執行 <code>/orig unpair</code> |</p>
<p>| API 不可達 | 位址錯誤或網路問題 | 檢查 <code>api-endpoint</code> |</p>
<p>| TLS 驗證失敗 | 憑證問題 | 檢查 <code>verify-tls</code> 與位址 |</p>
  </div>
</template>
