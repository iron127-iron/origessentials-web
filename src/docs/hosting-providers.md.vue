<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: 託管商支援</p>
<p>description: OrigEssentials 支援的 Minecraft 託管商與設定方式</p>
<p>---</p>
<h1>託管商支援</h1>
<h2>支援清單</h2>
<p>| 託管商 | 狀態 | API | 備註 |</p>
<p>|--------|------|-----|------|</p>
<p>| Cafora Host | ✅ 已驗證 | Pterodactyl Client API | 完整功能支援 |</p>
<p>| 超大咖 | ⏳ 等待驗證 | 待確認 | 需 API 文件 |</p>
<p>| IceHost | ⏳ 等待驗證 | 待確認 | 需 API 文件 |</p>
<p>| 鑽石託管 | ⏳ 等待驗證 | 待確認 | 需 API 文件 |</p>
<p>| Pterodactyl 相容 | 🟡 部分支援 | Pterodactyl API v1 | 框架已實作 |</p>
<p>| 自訂託管商 | ✅ 支援 | 自訂 Adapter | 需自行實作 |</p>
<h2>Cafora Host 設定</h2>
<p>Cafora Host 使用 Pterodactyl Client API，需以下資訊：</p>
<p>1. <strong>API 位址</strong>：<code>https://panel.caforahost.com/api/client</code></p>
<p>2. <strong>API Key</strong>：在 Cafora Host 控制面板中建立</p>
<h3>在面板中新增 Cafora Host</h3>
<p>1. 進入「伺服器管理」→「新增託管商」</p>
<p>2. 選擇「Cafora Host」模板</p>
<p>3. 輸入 API 位址與 API Key</p>
<p>4. 點擊「測試連線」</p>
<p>5. 驗證通過後選擇要管理的伺服器</p>
<p>6. 完成設定</p>
<h2>自訂託管商</h2>
<p>若您的託管商使用非 Pterodactyl API，可自訂 Adapter：</p>
<p>1. 參考 <a href="./provider-adapter-development.md" target="_blank" rel="noopener">Adapter 開發指南</a></p>
<p>2. 實作 <code>ProviderAdapter</code> 介面</p>
<p>3. 註冊至系統</p>
<h2>不支援的功能</h2>
<p>某些託管商可能不提供以下功能：</p>
<ul>
<li>WebSocket 即時主控台</li>
</ul>
<ul>
<li>檔案上傳/下載</li>
</ul>
<ul>
<li>API Key 管理</li>
</ul>
<p>請依據實際 API 能力顯示支援狀態，不虛構功能。</p>
  </div>
</template>
