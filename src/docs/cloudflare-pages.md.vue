<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: Cloudflare Pages 部署指南</p>
<p>description: 將 OrigEssentials 網站部署至 Cloudflare Pages</p>
<p>---</p>
<h1>Cloudflare Pages 部署指南</h1>
<h2>前置設定</h2>
<p>1. 登入 <a href="https://dash.cloudflare.com" target="_blank" rel="noopener">Cloudflare Dashboard</a></p>
<p>2. 確認已啟用 <strong>Pages</strong> 服務</p>
<p>3. 取得 GitHub 倉庫存取權限</p>
<h2>連接到 GitHub</h2>
<p>1. 進入 Cloudflare Dashboard → <strong>Pages</strong></p>
<p>2. 點擊 <strong>Create a project</strong> → <strong>Connect to Git</strong></p>
<p>3. 選擇 <code>origessentials/origessentials</code> 倉庫</p>
<p>4. 選擇 <code>website</code> 目錄作為源頭</p>
<h2>建置設定</h2>
<p>在 Pages 專案設定中填寫：</p>
<p>| 設定項目 | 值 |</p>
<p>|----------|-----|</p>
<p>| 產出目錄 | <code>website/dist</code> |</p>
<p>| 建置命令 | <code>cd website &amp;&amp; npm ci &amp;&amp; npm run build</code> |</p>
<p>| 根目錄 | <code>.</code> |</p>
<p>| 環境變數 | 無（靜態網站不需要） |</p>
<h2>自訂網域</h2>
<p>1. 進入 Pages 專案 → <strong>Custom domains</strong></p>
<p>2. 點擊 <strong>Set up a custom domain</strong></p>
<p>3. 輸入您的網域（例：<code>origessentials.dev</code>）</p>
<p>4. 按照指示設定 DNS（CNAME 或 A 記錄）</p>
<p>5. HTTPS 由 Cloudflare 自動簽發</p>
<h2>驗證部署</h2>
<p>部署完成後：</p>
<p>1. 瀏覽器開啟 <code>https://your-domain.com</code></p>
<p>2. 確認首頁正常載入</p>
<p>3. 檢查所有內部連結（文件、設置頁面）</p>
<p>4. 確認 <code>_redirects</code> 檔案存在以支援 SPA 路由</p>
<h2>注意事項</h2>
<ul>
<li>免費方案每日 100 GB 頻寬，每月 500 次構建</li>
</ul>
<ul>
<li>建議開啟 <strong>Pre-rendering</strong> 以優化 SEO</li>
</ul>
<ul>
<li>可啟用 <strong>Edge Cache TTL</strong> 減少重複請求</li>
</ul>
  </div>
</template>
