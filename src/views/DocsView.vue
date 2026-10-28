<template>
  <div class="py-12 lg:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <aside class="lg:col-span-1">
          <div class="sticky top-24 space-y-1">
            <SidebarLink to="/docs/installation" :active="activeDoc === 'installation'">安裝指南</SidebarLink>
            <SidebarLink to="/docs/architecture" :active="activeDoc === 'architecture'">架構說明</SidebarLink>
            <SidebarLink to="/docs/plugin-installation" :active="activeDoc === 'plugin-installation'">插件安裝</SidebarLink>
            <SidebarLink to="/docs/plugin-configuration" :active="activeDoc === 'plugin-configuration'">插件設定</SidebarLink>
            <SidebarLink to="/docs/plugin-connection" :active="activeDoc === 'plugin-connection'">插件連線</SidebarLink>
            <SidebarLink to="/docs/cloudflare-pages" :active="activeDoc === 'cloudflare-pages'">Cloudflare Pages</SidebarLink>
            <SidebarLink to="/docs/workers-setup" :active="activeDoc === 'workers-setup'">Workers 設定</SidebarLink>
            <SidebarLink to="/docs/d1-database" :active="activeDoc === 'd1-database'">D1 資料庫</SidebarLink>
            <SidebarLink to="/docs/secrets-setup" :active="activeDoc === 'secrets-setup'">Secrets 管理</SidebarLink>
            <SidebarLink to="/docs/hosting-providers" :active="activeDoc === 'hosting-providers'">託管商支援</SidebarLink>
            <SidebarLink to="/docs/caforahost-api" :active="activeDoc === 'caforahost-api'">Cafora Host API</SidebarLink>
            <SidebarLink to="/docs/provider-adapter-development" :active="activeDoc === 'provider-adapter-development'">Adapter 開發</SidebarLink>
            <SidebarLink to="/docs/permissions" :active="activeDoc === 'permissions'">權限系統</SidebarLink>
            <SidebarLink to="/docs/security" :active="activeDoc === 'security'">安全政策</SidebarLink>
            <SidebarLink to="/docs/backup-restore" :active="activeDoc === 'backup-restore'">備份與還原</SidebarLink>
            <SidebarLink to="/docs/migration" :active="activeDoc === 'migration'">資料遷移</SidebarLink>
            <SidebarLink to="/docs/troubleshooting" :active="activeDoc === 'troubleshooting'">疑難排解</SidebarLink>
            <SidebarLink to="/docs/contributing" :active="activeDoc === 'contributing'">貢獻指南</SidebarLink>
          </div>
        </aside>

        <!-- Content -->
        <main class="lg:col-span-3 doc-content min-h-[60vh]">
          <component :is="currentDocComponent" v-if="currentDocComponent" />
          <div v-else class="text-dark-400 py-12 text-center">
            請從左側選單選擇文件頁面。
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SidebarLink from '@/components/docs/SidebarLink.vue';

const route = useRoute();
const activeDoc = computed(() => route.params.page as string || 'installation');

// 動態載入文檔組件
const docComponents: Record<string, any> = {
  'installation': () => import('@/docs/installation.md.vue' as any),
  'architecture': () => import('@/docs/architecture.md.vue' as any),
  'plugin-installation': () => import('@/docs/plugin-installation.md.vue' as any),
  'plugin-configuration': () => import('@/docs/plugin-configuration.md.vue' as any),
  'plugin-connection': () => import('@/docs/plugin-connection.md.vue' as any),
  'cloudflare-pages': () => import('@/docs/cloudflare-pages.md.vue' as any),
  'workers-setup': () => import('@/docs/workers-setup.md.vue' as any),
  'd1-database': () => import('@/docs/d1-database.md.vue' as any),
  'secrets-setup': () => import('@/docs/secrets-setup.md.vue' as any),
  'hosting-providers': () => import('@/docs/hosting-providers.md.vue' as any),
  'caforahost-api': () => import('@/docs/caforahost-api.md.vue' as any),
  'provider-adapter-development': () => import('@/docs/provider-adapter-development.md.vue' as any),
  'permissions': () => import('@/docs/permissions.md.vue' as any),
  'security': () => import('@/docs/security-doc.md.vue' as any),
  'backup-restore': () => import('@/docs/backup-restore.md.vue' as any),
  'migration': () => import('@/docs/migration.md.vue' as any),
  'troubleshooting': () => import('@/docs/troubleshooting.md.vue' as any),
  'contributing': () => import('@/docs/contributing.md.vue' as any),
};

const currentDocComponent = computed(() => {
  const key = activeDoc.value;
  return docComponents[key] || null;
});
</script>