<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: 權限系統</p>
<p>description: OrigEssentials 角色與權限設計</p>
<p>---</p>
<h1>權限系統</h1>
<h2>預設角色</h2>
<p>| 角色 | 權限範圍 | 說明 |</p>
<p>|------|----------|------|</p>
<p>| <code>owner</code> | 全域 | 擁有所有權限，不可替代 |</p>
<p>| <code>admin</code> | 全域 | 可管理帳號、角色、設定 |</p>
<p>| <code>server_admin</code> | 單一伺服器 | 可管理該伺服器的所有操作 |</p>
<p>| <code>console_operator</code> | 單一伺服器 | 可傳送主控台指令與查看日誌 |</p>
<p>| <code>file_admin</code> | 單一伺服器 | 可瀏覽、讀取、編輯、刪除檔案 |</p>
<p>| <code>backup_admin</code> | 單一伺服器 | 可建立與刪除備份 |</p>
<p>| <code>moderator</code> | 單一伺服器 | 可查看狀態與主控台 |</p>
<p>| <code>player</code> | 單一伺服器 | 僅可查看公開資訊 |</p>
<p>| <code>read_only</code> | 單一伺服器 | 完全唯讀 |</p>
<h2>權限範圍</h2>
<p>| 範圍 | 適用對象 | 說明 |</p>
<p>|------|----------|------|</p>
<p>| <code>global</code> | 所有伺服器 | 全域權限 |</p>
<p>| <code>group</code> | 伺服器群組 | 群組內所有伺服器 |</p>
<p>| <code>server</code> | 單一伺服器 | 指定伺服器 |</p>
<h2>權限節點</h2>
<h3>檢視權限</h3>
<ul>
<li><code>server.view</code> — 查看伺服器狀態</li>
</ul>
<ul>
<li><code>server.resources.view</code> — 查看資源使用量</li>
</ul>
<h3>電源權限</h3>
<ul>
<li><code>server.power.start</code> — 啟動伺服器</li>
</ul>
<ul>
<li><code>server.power.stop</code> — 停止伺服器</li>
</ul>
<ul>
<li><code>server.power.restart</code> — 重新啟動</li>
</ul>
<h3>主控台權限</h3>
<ul>
<li><code>server.console.view</code> — 查看主控台輸出</li>
</ul>
<ul>
<li><code>server.console.send</code> — 傳送主控台指令</li>
</ul>
<h3>檔案權限</h3>
<ul>
<li><code>server.file.read</code> — 讀取檔案</li>
</ul>
<ul>
<li><code>server.file.write</code> — 編輯檔案</li>
</ul>
<ul>
<li><code>server.file.delete</code> — 刪除檔案</li>
</ul>
<ul>
<li><code>server.file.upload</code> — 上傳檔案</li>
</ul>
<ul>
<li><code>server.file.download</code> — 下載檔案</li>
</ul>
<h3>備份權限</h3>
<ul>
<li><code>server.backup.create</code> — 建立備份</li>
</ul>
<ul>
<li><code>server.backup.delete</code> — 刪除備份</li>
</ul>
<ul>
<li><code>server.backup.download</code> — 下載備份</li>
</ul>
<h3>管理權限</h3>
<ul>
<li><code>account.view</code> — 查看帳號</li>
</ul>
<ul>
<li><code>account.manage</code> — 管理帳號</li>
</ul>
<ul>
<li><code>role.manage</code> — 管理角色</li>
</ul>
<ul>
<li><code>provider.manage</code> — 管理託管商</li>
</ul>
<ul>
<li><code>audit.view</code> — 查看審計紀錄</li>
</ul>
<ul>
<li><code>settings.manage</code> — 管理系統設定</li>
</ul>
<h2>高風險操作</h2>
<p>以下操作需二次確認：</p>
<ul>
<li>停止/重新啟動伺服器</li>
</ul>
<ul>
<li>刪除檔案</li>
</ul>
<ul>
<li>刪除備份</li>
</ul>
<ul>
<li>變更 Owner</li>
</ul>
<ul>
<li>撤銷管理員權限</li>
</ul>
<ul>
<li>解除重要綁定</li>
</ul>
<h2>權限檢查流程</h2>
<p>1. 提取 Session 中的 accountId</p>
<p>2. 查詢該帳號的所有 RoleAssignment</p>
<p>3. 對每個 Assignment 檢查對應 Role 的 Permission</p>
<p>4. 若任一權限匹配，授予訪問</p>
<ol>
<li>若無匹配且非 owner，拒絕訪問</li>
</ol>
  </div>
</template>
