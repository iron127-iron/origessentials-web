<template>
  <div class="rounded-xl border border-dark-800 p-6" :class="borderClass">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
        <svg class="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      </div>
      <div class="min-w-0">
        <div class="flex items-center gap-3 flex-wrap">
          <h3 class="text-lg font-semibold text-dark-100">{{ title }}</h3>
          <StatusBadge :status="status" />
        </div>
        <p class="text-dark-400 text-sm leading-relaxed mt-1">{{ api }}</p>
      </div>
    </div>

    <div class="mt-4 space-y-3 text-sm">
      <div v-if="base_url !== '—'" class="flex items-center gap-2">
        <span class="text-dark-500">API 端點:</span>
        <code class="text-primary-400 text-xs bg-dark-950 px-2 py-1 rounded break-all">{{ base_url }}</code>
      </div>
      <div>
        <span class="text-dark-500">支援功能:</span>
        <p class="text-dark-300 mt-1">{{ supported_features }}</p>
      </div>
      <div v-if="limitations !== '—'">
        <span class="text-dark-500">限制:</span>
        <p class="text-dark-400 mt-1">{{ limitations }}</p>
      </div>
      <p v-if="note" class="pt-3 border-t border-dark-800 text-xs text-dark-500 italic">
        {{ note }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import StatusBadge from './StatusBadge.vue';

const props = defineProps<{
  title: string;
  slug: string;
  status: 'verified' | 'partial' | 'pending' | 'supported';
  api: string;
  base_url: string;
  supported_features: string;
  limitations: string;
  note?: string;
}>();

const borderClass = computed(() => {
  const map: Record<string, string> = {
    verified: 'border-green-500/30',
    partial: 'border-yellow-500/30',
    pending: 'border-orange-500/30',
    supported: 'border-blue-500/30',
  };
  return map[props.status] || '';
});
</script>
