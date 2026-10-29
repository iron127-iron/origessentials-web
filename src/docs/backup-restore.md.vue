<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: 備份與還原</p>
<p>description: OrigEssentials 資料庫備份與遷移流程</p>
<p>---</p>
<h1>備份與還原</h1>
<h2>D1 備份</h2>
<h3>建立備份</h3>
<pre><code class="language-bash"># 列出目前備份
npx wrangler d1 backup list origessentials

# 建立新備份
npx wrangler d1 backup create origessentials</code></pre>
<h3>還原備份</h3>
<pre><code class="language-bash"># 查看可用備份
npx wrangler d1 backup list origessentials

# 還原至指定時間點
npx wrangler d1 backup restore origessentials --backup-id=&lt;BACKUP_ID&gt;</code></pre>
<h2>資料遷移</h2>
<h3>遷移前提</h3>
<p>玩家帳號、UUID 綁定、角色權限及審計紀錄 <strong>不依賴特定託管商</strong>，遷移時這些資料不會遺失。</p>
<h3>遷移流程</h3>
<p>1. <strong>備份現有 D1 資料庫</strong></p>
<p>   ```bash</p>
<p>   npx wrangler d1 backup create origessentials</p>
<p>   ```</p>
<p>2. <strong>建立新 D1 資料庫</strong></p>
<p>   ```bash</p>
<p>   npx wrangler d1 create origessentials-new</p>
<p>   ```</p>
<p>3. <strong>執行遷移</strong></p>
<p>   ```bash</p>
<p>   npx wrangler d1 execute origessentials-new --file=panel/migrations/001_initial.sql</p>
<p>   npx wrangler d1 execute origessentials-new --file=panel/migrations/002_seed_roles.sql</p>
<p>   npx wrangler d1 execute origessentials-new --file=panel/migrations/003_seed_settings.sql</p>
<p>   ```</p>
<p>4. <strong>匯出舊資料</strong></p>
<p>   ```bash</p>
<p>   npx wrangler d1 result origessentials --command="SELECT * FROM accounts" --output=json</p>
<p>   ```</p>
<p>5. <strong>匯入新資料庫</strong>（需自行編寫轉換腳本）</p>
<p>6. <strong>切換 Workers 指向新資料庫</strong></p>
<p>   編輯 <code>wrangler.toml</code> 中的 <code>database_id</code></p>
<p>7. <strong>驗證資料完整性</strong></p>
<p>   ```bash</p>
<p>   npx wrangler d1 execute origessentials-new --command="SELECT COUNT(*) FROM accounts"</p>
<p>   ```</p>
<h2>注意事項</h2>
<ul>
<li>遷移期間建議暫停新資料寫入</li>
</ul>
<ul>
<li>遷移後需通知使用者重新登入（Session 無效）</li>
</ul>
<ul>
<li>舊 D1 資料庫保留至少 7 天以便回退</li>
</ul>
<ul>
<li>建議在 staging 環境先測試遷移流程</li>
</ul>
  </div>
</template>
