<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: 疑難排解</p>
<p>description: OrigEssentials 常見問題與解決方案</p>
<p>---</p>
<h1>疑難排解</h1>
<h2>插件問題</h2>
<h3>插件未載入</h3>
<p><strong>症狀</strong>：伺服器啟動時無 OrigEssentials 日誌</p>
<p><strong>檢查</strong>：</p>
<p>1. Java 版本是否 ≥ 17</p>
<p>2. Paper/Purpur 版本是否 ≥ 1.20.1</p>
<p>3. JAR 檔是否完整（未損壞）</p>
<p>4. 目錄權限是否正確</p>
<pre><code class="language-bash">java -version
# 應顯示 openjdk version "17.x.x" 或更新</code></pre>
<h3>配對失敗</h3>
<p><strong>症狀</strong>：<code>/orig pair</code> 回報錯誤</p>
<p><strong>可能原因</strong>：</p>
<p>1. <code>api-endpoint</code> 錯誤</p>
<p>2. 網路不通</p>
<p>3. TLS 憑證問題</p>
<p>4. 配對碼已過期</p>
<p><strong>檢查</strong>：</p>
<pre><code class="language-bash"># 從伺服器測試連線
curl -v https://panel.example.com/api/v1/health</code></pre>
<h3>連線中斷</h3>
<p><strong>症狀</strong>：插件日誌顯示「連線已中斷」</p>
<p><strong>處理</strong>：</p>
<p>1. 確認 Workers 是否正常運作</p>
<p>2. 檢查 API Key 是否過期</p>
<p>3. 執行 <code>/orig unpair</code> 後重新配對</p>
<h2>Workers 問題</h2>
<h3>健康檢查返回 500</h3>
<pre><code class="language-bash">curl https://api.origessentials.dev/api/v1/health</code></pre>
<p><strong>可能原因</strong>：</p>
<p>1. D1 資料庫未連線</p>
<p>2. Secrets 未設定</p>
<p><strong>檢查</strong>：</p>
<pre><code class="language-bash">npx wrangler d1 execute origessentials --command="SELECT 1"</code></pre>
<h3>Migration 失敗</h3>
<p><strong>症狀</strong>：部署時提示 migration 錯誤</p>
<p><strong>處理</strong>：</p>
<p>1. 確認 D1 資料庫已建立</p>
<p>2. 檢查 migration 檔案順序</p>
<p>3. 查看 Workers 日誌</p>
<pre><code class="language-bash">npx wrangler tail</code></pre>
<h2>網站問題</h2>
<h3>頁面 404</h3>
<p><strong>症狀</strong>：部分路由返回 404</p>
<p><strong>處理</strong>：</p>
<p>1. 確認 <code>_redirects</code> 檔案存在於 <code>dist/</code></p>
<p>2. 檢查路由配置</p>
<p>3. 重新部署</p>
<pre><code class="language-bash">cat website/dist/_redirects
# 應包含：/* /index.html 200</code></pre>
<h2>聯絡支援</h2>
<ul>
<li>GitHub Issues：https://github.com/origessentials/origessentials/issues</li>
</ul>
<ul>
<li>安全漏洞：security@origessentials.dev</li>
</ul>
  </div>
</template>
