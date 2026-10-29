<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: 資料遷移</p>
<p>description: 更換託管商時的資料遷移流程</p>
<p>---</p>
<h1>資料遷移</h1>
<h2>遷移原則</h2>
<p>更換託管商時，以下資料 <strong>不會</strong> 被刪除或變更：</p>
<ul>
<li>玩家帳號</li>
</ul>
<ul>
<li>Minecraft UUID 綁定</li>
</ul>
<ul>
<li>角色與權限</li>
</ul>
<ul>
<li>審計紀錄</li>
</ul>
<ul>
<li>既有託管商憑證（除非使用者明确要求刪除）</li>
</ul>
<h2>遷移流程</h2>
<h3>步驟一：備份現有資料</h3>
<pre><code class="language-bash">npx wrangler d1 backup create origessentials</code></pre>
<h3>步驟二：建立新託管商連線</h3>
<p>1. 在面板中新增新的託管商（見<a href="./hosting-providers.md" target="_blank" rel="noopener">託管商設定</a>）</p>
<p>2. 測試連線並確認伺服器清單正確</p>
<h3>步驟三：重新配對插件</h3>
<pre><code class="language-text">/orig unpair
/orig pair &lt;新配對碼&gt;</code></pre>
<h3>步驟四：驗證資料完整性</h3>
<pre><code class="language-sql">-- 檢查帳號數量
SELECT COUNT(*) FROM accounts;

-- 檢查 UUID 綁定
SELECT COUNT(*) FROM minecraft_binds;

-- 檢查審計紀錄
SELECT COUNT(*) FROM audit_log;</code></pre>
<h3>步驟五：清理舊憑證（可選）</h3>
<p>確認新連線正常運作後，可在面板中刪除舊託管商記錄。</p>
<h2>注意事項</h2>
<p>1. 遷移期間建議暫停新伺服器操作</p>
<p>2. 舊 D1 資料庫保留至少 7 天</p>
<ol>
<li>若更換託管商同時更換 D1 資料庫，需完整匯出/匯入</li>
</ol>
  </div>
</template>
