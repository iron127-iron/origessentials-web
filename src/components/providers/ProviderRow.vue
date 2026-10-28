<template>
  <div class="bg-dark-900/50 rounded-xl border p-5" :class="borderClass">
    <div class="flex items-start justify-between mb-3">
      <div>
        <h3 class="font-semibold text-dark-100">{{ name }}</h3>
        <p class="text-sm text-dark-500 mt-0.5">{{ api }}</p>
      </div>
      <StatusBadge :status="status" />
    </div>
    <div class="space-y-2 text-sm">
      <div v-if="base_url !== '—'" class="flex items-center gap-2">
        <span class="text-dark-500">API:</span>
        <code class="text-primary-400 text-xs bg-dark-950 px-2 py-1 rounded">{{ base_url }}</code>
      </div>
      <div>
        <span class="text-dark-500">支援功能:</span>
        <p class="text-dark-300 mt-1">{{ supported_features }}</p>
      </div>
      <div v-if="limitations !== '—'">
        <span class="text-dark-500">限制:</span>
        <p class="text-dark-400 mt-1">{{ limitations }}</p>
      </div>
    </div>
    <p v-if="note" class="mt-4 pt-3 border-t border-dark-800 text-xs text-dark-500 italic">
      {{ note }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import StatusBadge from './StatusBadge.vue';

const props = defineProps<{
  name: string;
  slug: string;
  status: 'verified' | 'partial' | 'pending' | 'supported';
  api: string;
  base_url: string;
  supported_features: string;
  limitations: string;
  note: string;
}>();

const borderClass = computed(() => {
  const map: Record<string, string> = {
    verified: 'border-green-500/30',
    partial: 'border-yellow-500/30',
    pending: 'border-orange-500/30',
    supported: 'border-blue-500/30',
  };
  return map[props.status];
});
</script>