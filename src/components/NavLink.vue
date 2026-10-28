<script setup lang="ts">
defineProps<{
  to: string;
  active?: boolean;
}>();
</script>

<template>
  <RouterLink
    :to="to"
    class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
    :class="active ? 'text-primary-400 bg-primary-500/10' : 'text-dark-400 hover:text-dark-100 hover:bg-dark-800'"
  >
    <slot />
  </RouterLink>
</template>