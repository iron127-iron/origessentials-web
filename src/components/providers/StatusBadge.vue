<template>
  <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" :class="badgeClass">
    <span class="w-1.5 h-1.5 rounded-full" :class="dotClass" />
    {{ label }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  status: 'verified' | 'partial' | 'pending' | 'supported';
}>();

const labels: Record<string, string> = {
  verified: '已驗證',
  partial: '部分支援',
  pending: '等待驗證',
  supported: '支援（需自訂）',
};

const badgeClass: Record<string, string> = {
  verified: 'bg-green-500/10 text-green-400 border border-green-500/20',
  partial: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  pending: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  supported: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
};

const dotClass: Record<string, string> = {
  verified: 'bg-green-400',
  partial: 'bg-yellow-400',
  pending: 'bg-orange-400',
  supported: 'bg-blue-400',
};

const label = computed(() => labels[props.status]);
</script>