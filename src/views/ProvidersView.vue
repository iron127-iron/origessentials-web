<template>
  <div class="py-12 lg:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-dark-50 mb-8">託管商支援狀態</h1>

      <div class="space-y-6 max-w-4xl">
        <StatusCard
          title="Cafora Host"
          slug="cafora-host"
          status="verified"
          api="Pterodactyl Client API"
          base_url="https://panel.caforahost.com/api/client"
          supported_features="伺服器清單、狀態、電源操作、主控台、檔案管理、WebSocket 串流"
          limitations="不提供一般使用者 Application API 管理員功能"
          note="第一個已確認支援的託管商，API 已依官方文件驗證。"
        />

        <StatusCard
          title="超大咖"
          slug="chao-hua-jia"
          status="pending"
          api="待確認"
          base_url="—"
          supported_features="—"
          limitations="尚未驗證 API"
          note="需要取得官方 API 文件後方能開始整合。"
        />

        <StatusCard
          title="IceHost"
          slug="ice-host"
          status="pending"
          api="待確認"
          base_url="—"
          supported_features="—"
          limitations="尚未驗證 API"
          note="需要取得官方 API 文件後方能開始整合。"
        />

        <StatusCard
          title="鑽石託管"
          slug="diamond-hosting"
          status="pending"
          api="待確認"
          base_url="—"
          supported_features="—"
          limitations="尚未驗證 API"
          note="需要取得官方 API 文件後方能開始整合。"
        />

        <StatusCard
          title="Pterodactyl 相容模板"
          slug="pterodactyl"
          status="partial"
          api="Pterodactyl API v1 (pterodactyl.io/api/client/)"
          base_url="依託管商設定"
          supported_features="核心 API 框架已實作，部分端點需依供應商部署條件驗證"
          limitations="不同供應商可能有不同的 API 啟用狀態與權限限制"
          note="Adapter 框架已完成，可依實際 API 文件逐步擴充端點支援。"
        />

        <StatusCard
          title="自訂託管商"
          slug="custom"
          status="supported"
          api="自訂 Adapter（需自行實作）"
          base_url="—"
          supported_features="提供 Adapter 介面、開發文件與範例"
          limitations="需自行編寫 Adapter 程式碼"
          note="詳見《Provider Adapter 開發指南》。"
        />
      </div>

      <div class="mt-12 p-6 bg-dark-900 rounded-xl border border-dark-800">
        <h3 class="text-lg font-semibold text-dark-100 mb-3">狀態說明</h3>
        <div class="space-y-2 text-sm text-dark-400">
          <div class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-green-500" />
            <span><strong class="text-dark-200">已驗證（Verified）</strong>：API 已依官方文件驗證，功能可正常使用。</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-yellow-500" />
            <span><strong class="text-dark-200">部分支援（Partial）</strong>：核心框架已實作，部分功能待驗證。</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-orange-500" />
            <span><strong class="text-dark-200">等待驗證（Pending）</strong>：尚未取得 API 文件，暫不支持。</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-blue-500" />
            <span><strong class="text-dark-200">支援（Supported）</strong>：框架已就緒，需自行實作 Adapter。</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatusCard from '@/components/providers/StatusCard.vue';
</script>