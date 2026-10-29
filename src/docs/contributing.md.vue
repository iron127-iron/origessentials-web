<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: 貢獻指南</p>
<p>description: 如何參與 OrigEssentials 開發</p>
<p>---</p>
<h1>貢獻指南</h1>
<h2>開發環境</h2>
<pre><code class="language-bash"># 複製環境變數
cp panel/.env.example panel/.env.local
cp website/.env.example website/.env.local

# 安裝依賴
npm install  # 在各子專案執行</code></pre>
<h2>程式碼風格</h2>
<h3>Java</h3>
<ul>
<li>Google Java Style Guide</li>
</ul>
<ul>
<li><code>./gradlew spotlessApply</code> 自動格式化</li>
</ul>
<h3>TypeScript</h3>
<ul>
<li>ESLint + Prettier</li>
</ul>
<ul>
<li><code>npm run format</code> 自動修復</li>
</ul>
<h2>提交規範</h2>
<p>使用 Conventional Commits：</p>
<pre><code class="language-text">feat(panel): 新增角色權限管理
fix(plugin): 修復配對碼重複問題
docs: 更新 Cafora Host 文件
chore: 升級依賴版本
test: 新增 API 測試</code></pre>
<h2>Pull Request 流程</h2>
<p>1. Fork 倉庫</p>
<p>2. 建立功能分支：<code>git checkout -b feature/your-feature</code></p>
<p>3. 提交變更</p>
<p>4. 推送並建立 PR</p>
<p>5. 通過 CI 檢查</p>
<h2>測試要求</h2>
<p>所有新功能必須包含測試：</p>
<pre><code class="language-bash">cd plugin &amp;&amp; ./gradlew test
cd panel &amp;&amp; npm run test
cd website &amp;&amp; npm run build</code></pre>
  </div>
</template>
