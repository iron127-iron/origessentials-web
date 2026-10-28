<template>
  <div>
    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 overflow-hidden">
      <!-- 背景裝飾 -->
      <div class="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-dark-950 to-dark-950 pointer-events-none" />
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm mb-8">
          <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          開源 · 免費 · 可擴充
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-50 mb-6 leading-tight">
          Minecraft 伺服器管理<br />
          <span class="text-primary-400">新時代</span>
        </h1>

        <p class="text-lg text-dark-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          OrigEssentials 是一套完整的 Minecraft 伺服器管理生態系統，
          整合遊戲內插件、Web 管理面板與多託管商支援，讓伺服器管理變得簡單高效。
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            to="/install"
            class="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-primary-600/20"
          >
            開始安裝
          </RouterLink>
          <a
            href="https://github.com/origessentials/origessentials"
            target="_blank"
            rel="noopener noreferrer"
            class="px-8 py-3 bg-dark-800 hover:bg-dark-700 text-dark-100 font-medium rounded-lg border border-dark-700 transition-all"
          >
            GitHub 原始碼
          </a>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-dark-50 text-center mb-12">主要功能</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon="server"
            title="伺服器管理"
            description="透過 Web 面板遠端管理 Minecraft 伺服器，支援啟動、停止、重啟及即時主控台操作。"
          />
          <FeatureCard
            icon="provider"
            title="多託管商支援"
            description="整合多家 Minecraft 託管商 API，第一版支援 Cafora Host，後續持續擴充。"
          />
          <FeatureCard
            icon="plugin"
            title="Minecraft 插件"
            description="Paper/Purpur 相容插件，支援配對連線、工作佇列及 UUID 綁定功能。"
          />
          <FeatureCard
            icon="security"
            title="安全可靠"
            description="AES-256-GCM 憑證加密、Argon2id 密碼雜湊、完整審計紀錄及 CSRF 防護。"
          />
          <FeatureCard
            icon="cloudflare"
            title="Cloudflare 部署"
            description="基於 Cloudflare Workers、D1、Pages 建置，充分利用免費方案額度。"
          />
          <FeatureCard
            icon="open-source"
            title="開源自由"
            description="MIT 授權，完整文件，歡迎社群貢獻與擴充。"
          />
        </div>
      </div>
    </section>

    <!-- Supported Versions -->
    <section class="py-16 bg-dark-900/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-dark-50 mb-6">技術架構</h2>
            <ul class="space-y-3 text-dark-300">
              <li class="flex items-start gap-3">
                <CheckIcon class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span><strong class="text-dark-100">Minecraft 版本：</strong>1.20.1 – 1.20.4（Paper / Purpur）</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckIcon class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span><strong class="text-dark-100">Java：</strong>JDK 17+（Temurin 25 LTS 已驗證）</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckIcon class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span><strong class="text-dark-100">後端：</strong>Cloudflare Workers + D1</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckIcon class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span><strong class="text-dark-100">網站：</strong>Vue 3 + Vite + Tailwind CSS</span>
              </li>
              <li class="flex items-start gap-3">
                <CheckIcon class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span><strong class="text-dark-100">部署：</strong>Cloudflare Pages / Workers</span>
              </li>
            </ul>
          </div>

          <div class="bg-dark-950 rounded-xl border border-dark-800 p-6 font-mono text-sm">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-3 h-3 rounded-full bg-red-500" />
              <div class="w-3 h-3 rounded-full bg-yellow-500" />
              <div class="w-3 h-3 rounded-full bg-green-500" />
              <span class="text-dark-500 ml-2">terminal</span>
            </div>
            <pre class="text-dark-300"><code><span class="text-primary-400">$</span> cd plugin
<span class="text-primary-400">$</span> ./gradlew build
<span class="text-dark-500"># 產出: build/libs/OrigEssentials-0.1.0-SNAPSHOT.jar</span>

<span class="text-primary-400">$</span> cd panel
<span class="text-primary-400">$</span> npm run build
<span class="text-dark-500"># 產出: dist/worker.js</span>

<span class="text-primary-400">$</span> cd website
<span class="text-primary-400">$</span> npm run build
<span class="text-dark-500"># 產出: dist/ → Cloudflare Pages</span></code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Hosting Providers Status -->
    <section class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-dark-50 text-center mb-4">託管商支援狀態</h2>
        <p class="text-dark-400 text-center mb-12 max-w-xl mx-auto">
          第一版優先整合 Cafora Host，其他供應商待 API 資料驗證後逐步支援。
        </p>

        <div class="max-w-3xl mx-auto space-y-3">
          <ProviderRow
            name="Cafora Host"
            slug="cafora-host"
            status="verified"
            api="Pterodactyl Client API"
            note="已驗證：伺服器清單、狀態、電源、主控台、檔案操作"
          />
          <ProviderRow
            name="超大咖"
            slug="chao-hua-jia"
            status="pending"
            api="待確認"
            note="等待 API 資料驗證"
          />
          <ProviderRow
            name="IceHost"
            slug="ice-host"
            status="pending"
            api="待確認"
            note="等待 API 資料驗證"
          />
          <ProviderRow
            name="鑽石託管"
            slug="diamond-hosting"
            status="pending"
            api="待確認"
            note="等待 API 資料驗證"
          />
          <ProviderRow
            name="Pterodactyl 相容模板"
            slug="pterodactyl"
            status="partial"
            api="Pterodactyl API v1"
            note="核心功能實作中，部分 API 端點待驗證"
          />
          <ProviderRow
            name="自訂託管商"
            slug="custom"
            status="supported"
            api="自訂 Adapter"
            note="提供 Adapter 開發文件與範例，可自行擴充"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-600/10 border-y border-primary-500/20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-dark-50 mb-4">準備好開始了嗎？</h2>
        <p class="text-dark-300 mb-8 text-lg">
          查看所有文件或立即從 GitHub 取得原始碼。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            to="/install"
            class="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-all"
          >
            安裝指南
          </RouterLink>
          <a
            href="https://github.com/origessentials/origessentials"
            target="_blank"
            rel="noopener noreferrer"
            class="px-8 py-3 bg-dark-800 hover:bg-dark-700 text-dark-100 font-medium rounded-lg border border-dark-700 transition-all"
          >
            GitHub 倉庫
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import FeatureCard from '@/components/home/FeatureCard.vue';
import ProviderRow from '@/components/home/ProviderRow.vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';
</script>