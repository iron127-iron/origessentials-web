<template>
  <div class="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
        <svg class="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-dark-100 mb-1">{{ title }}</h3>
        <p class="text-dark-400 text-sm leading-relaxed">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
  description: string;
}>();
</script>