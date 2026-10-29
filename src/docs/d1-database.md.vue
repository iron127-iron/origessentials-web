<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: D1 資料庫指南</p>
<p>description: OrigEssentials D1 資料庫結構與管理</p>
<p>---</p>
<h1>D1 資料庫指南</h1>
<h2>資料庫結構</h2>
<p>OrigEssentials 使用 Cloudflare D1（基于 SQLite）儲存所有資料：</p>
<p>| 資料表 | 用途 |</p>
<p>|--------|------|</p>
<p>| <code>accounts</code> | 管理員與玩家帳號 |</p>
<p>| <code>roles</code> | 角色定義 |</p>
<p>| <code>permissions</code> | 角色權限分配 |</p>
<p>| <code>role_assignments</code> | 帳號-角色-範圍綁定 |</p>
<p>| <code>sessions</code> | 登入 Session |</p>
<p>| <code>providers</code> | 託管商憑證（加密儲存） |</p>
<p>| <code>servers</code> | 伺服器基本資訊 |</p>
<p>| <code>server_credentials</code> | 配對憑證 |</p>
<p>| <code>pairing_codes</code> | 一次性配對碼 |</p>
<p>| <code>minecraft_binds</code> | Minecraft UUID 綁定 |</p>
<p>| <code>audit_log</code> | 操作審計紀錄 |</p>
<p>| <code>notifications</code> | 通知訊息 |</p>
<p>| <code>system_settings</code> | 系統設定 |</p>
<h2>Migration 管理</h2>
<p>所有資料結構變更通過 SQL Migration 檔案管理：</p>
<pre><code class="language-text">migrations/
├── 001_initial.sql      # 基礎表結構
├── 002_seed_roles.sql   # 預設角色與權限
└── 003_seed_settings.sql # 系統預設設定</code></pre>
<h3>執行遷移</h3>
<pre><code class="language-bash"># 本地開發
npm run db:migrate

# 生產環境
npm run db:migrate:prod</code></pre>
<h3>新增 Migration</h3>
<pre><code class="language-sql">-- migrations/004_add_example.sql
ALTER TABLE accounts ADD COLUMN last_login_at TEXT;
CREATE INDEX IF NOT EXISTS idx_accounts_last_login ON accounts(last_login_at);</code></pre>
<h2>備份與還原</h2>
<h3>建立備份</h3>
<pre><code class="language-bash">npx wrangler d1 backup create origessentials</code></pre>
<h3>列出備份</h3>
<pre><code class="language-bash">npx wrangler d1 backup list origessentials</code></pre>
<h3>還原備份</h3>
<pre><code class="language-bash">npx wrangler d1 backup restore &lt;BACKUP_ID&gt;</code></pre>
<h2>查詢範例</h2>
<h3>查詢所有帳號</h3>
<pre><code class="language-sql">SELECT id, email, username, role_id, is_active, created_at
FROM accounts
ORDER BY created_at DESC;</code></pre>
<h3>查詢伺服器清單（含託管商）</h3>
<pre><code class="language-sql">SELECT s.id, s.name, s.status, p.name as provider_name
FROM servers s
JOIN providers p ON s.provider_id = p.id
ORDER BY s.name;</code></pre>
<h3>查詢審計紀錄</h3>
<pre><code class="language-sql">SELECT actor_id, action, target_type, created_at
FROM audit_log
WHERE created_at &gt; datetime('now', '-7 days')
ORDER BY created_at DESC
LIMIT 100;</code></pre>
  </div>
</template>
