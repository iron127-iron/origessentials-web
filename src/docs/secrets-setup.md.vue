<template>
  <div class="doc-content prose prose-invert max-w-none">
    <p>---</p>
<p>title: Secrets 管理指南</p>
<p>description: OrigEssentials 憑證與金鑰的安全管理</p>
<p>---</p>
<h1>Secrets 管理指南</h1>
<h2>敏感資料分類</h2>
<p>| 類別 | 範例 | 儲存位置 |</p>
<p>|------|------|----------|</p>
<p>| 主加密金鑰 | <code>ENCRYPTION_KEY</code> | Workers Secrets |</p>
<p>| JWT 簽發金鑰 | <code>JWT_SECRET</code> | Workers Secrets |</p>
<p>| 託管商 API Key | <code>encrypted_api_key</code> | D1（AES-256-GCM 加密） |</p>
<p>| 密碼雜湊 | <code>password_hash</code> | D1（Argon2id） |</p>
<p>| MFA 密鑰 | <code>mfa_secret</code> | D1（AES-256-GCM 加密） |</p>
<h2>Workers Secrets 設定</h2>
<h3>新增 Secret</h3>
<pre><code class="language-bash"># 進入 panel 目錄
cd panel

# 設定加密金鑰
echo -n "your-32-byte-key-here" | npx wrangler secret put ENCRYPTION_KEY

# 設定 JWT 金鑰
echo -n "your-jwt-secret-here" | npx wrangler secret put JWT_SECRET</code></pre>
<h3>產生安全金鑰</h3>
<pre><code class="language-bash"># 32 位元組隨機金鑰（Base64 編碼）
node -e "console.log(btoa(Array.from(crypto.getRandomValues(new Uint8Array(32)), b =&gt; String.fromCharCode(b)).join('')))"

# 64 位元字元 JWT Secret（Hex 編碼）
node -e "console.log(crypto.randomBytes(32).toString('hex'))"</code></pre>
<h3>檢視與刪除</h3>
<pre><code class="language-bash"># 列出所有 Secrets
npx wrangler secret list

# 刪除 Secret
npx wrangler secret delete ENCRYPTION_KEY</code></pre>
<h2>D1 加密欄位</h2>
<p>託管商 API Key 在存入 D1 前經過加密：</p>
<pre><code class="language-text">明文 API Key
    │
    ▼
AES-256-GCM 加密（使用 ENCRYPTION_KEY）
    │
    ├── encrypted_api_key（密文，Base64）→ D1
    └── api_key_iv（IV，Base64）→ D1</code></pre>
<p>解密時由 Workers 後端程式讀取 <code>ENCRYPTION_KEY</code>，動態解密，永不回傳明文給前端。</p>
<h2>金鑰輪替</h2>
<p>當需要輪替加密金鑰時：</p>
<p>1. 產生新金鑰並設定為 <code>ENCRYPTION_KEY_V2</code></p>
<p>2. 解讀所有現有加密資料（使用舊金鑰）</p>
<p>3. 重新加密並更新至新金鑰版本</p>
<p>4. 更新 <code>key_version</code> 欄位</p>
<p>5. 確認所有資料解密正常後，移除舊金鑰</p>
<h2>安全注意事項</h2>
<ul>
<li><strong>禁止</strong>將 Secrets 提交至 Git 倉庫</li>
</ul>
<ul>
<li><strong>禁止</strong>在日誌中輸出明文憑證</li>
</ul>
<ul>
<li><strong>禁止</strong>在前端 JavaScript 中暴露任何 Secret</li>
</ul>
<ul>
<li>定期輪替金鑰（建議每 90 天）</li>
</ul>
<ul>
<li>使用 <code>.env.local</code> 存放本地開發用 Secret，並加入 <code>.gitignore</code></li>
</ul>
  </div>
</template>
