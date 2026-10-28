<template>
  <RouterLink
    :to="to"
    class="block px-3 py-2 rounded-lg text-sm transition-colors"
    :class="active ? 'text-primary-400 bg-primary-500/10' : 'text-dark-500 hover:text-dark-200 hover:bg-dark-800/50'"
  >
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
  active?: boolean;
}>();
</script>