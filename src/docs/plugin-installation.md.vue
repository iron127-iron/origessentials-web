<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: 插件安裝與設定</p>
<p>description: OrigEssentials Minecraft 插件安裝步驟與配置說明</p>
<p>---</p>
<h1>插件安裝與設定</h1>
<h2>下載插件</h2>
<p>從 <a href="https://github.com/origessentials/origessentials/releases" target="_blank" rel="noopener">GitHub Releases</a> 下載最新 JAR 檔，或自行建置：</p>
<pre><code class="language-bash">cd plugin
./gradlew shadowJar
# 產出：build/libs/OrigEssentials-0.1.0-SNAPSHOT.jar</code></pre>
<h2>安裝步驟</h2>
<p>1. 停止 Minecraft 伺服器</p>
<p>2. 複製 JAR 至 <code>plugins/</code> 目錄</p>
<p>3. 啟動伺服器（首次啟動會產生 <code>config.yml</code>）</p>
<p>4. 編輯 <code>plugins/OrigEssentials/config.yml</code></p>
<h2>設定檔說明</h2>
<p>完整設定檔範例見 <a href="../../../plugin/src/main/resources/config.yml" target="_blank" rel="noopener">plugin/src/main/resources/config.yml</a>。</p>
<h3>最小必要設定</h3>
<pre><code class="language-yaml">web-panel:
  enabled: true
  api-endpoint: "https://panel.example.com"
  server-id: "pterodactyl-server-123"</code></pre>
<h3>權限控制</h3>
<pre><code class="language-yaml">  security:
    allow-remote-actions: false   # 禁止遠端電源操作
    allow-file-management: false  # 禁止遠端檔案操作</code></pre>
<h2>權限節點</h2>
<p>| 節點 | 說明 |</p>
<p>|------|------|</p>
<p>| <code>origessentials.command.orig</code> | 使用主指令 |</p>
<p>| <code>origessentials.command.origstatus</code> | 查看狀態 |</p>
<p>| <code>origessentials.command.origpair</code> | 執行配對 |</p>
<p>| <code>origessentials.command.origunpair</code> | 解除配對 |</p>
<p>| <code>origessentials.command.origdebug</code> | 除錯資訊 |</p>
<p>| <code>origessentials.command.origbind</code> | UUID 綁定 |</p>
<p>| <code>origessentials.unpair</code> | 管理員解除配對 |</p>
<p>建議搭配 LuckPerms 等權限插件分配節點。</p>
<h2>指令列表</h2>
<p>| 指令 | 說明 |</p>
<p>|------|------|</p>
<p>| <code>/orig</code> | 主指令，顯示幫助 |</p>
<p>| <code>/orig status</code> | 查看插件與連線狀態 |</p>
<p>| <code>/orig reload</code> | 重新載入設定 |</p>
<p>| <code>/orig pair &lt;code&gt;</code> | 配對 Web 面板 |</p>
<p>| <code>/orig unpair</code> | 解除配對 |</p>
<p>| <code>/orig debug</code> | 輸出診斷資訊 |</p>
<p>| <code>/orig bind &lt;code&gt;</code> | 綁定 Minecraft UUID |</p>
  </div>
</template>
