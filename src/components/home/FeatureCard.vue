<template>
  <div class="bg-dark-900/50 rounded-xl border border-dark-800 p-6 hover:border-primary-500/30 transition-all">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" :class="iconClass">
        <component :is="iconComponent" class="w-6 h-6" />
      </div>
      <div>
        <h3 class="text-lg font-semibold text-dark-100 mb-1">{{ title }}</h3>
        <p class="text-dark-400 text-sm leading-relaxed">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ServerIcon from '@/components/icons/ServerIcon.vue';
import ProviderIcon from '@/components/icons/ProviderIcon.vue';
import PluginIcon from '@/components/icons/PluginIcon.vue';
import SecurityIcon from '@/components/icons/SecurityIcon.vue';
import CloudflareIcon from '@/components/icons/CloudflareIcon.vue';
import OpenSourceIcon from '@/components/icons/OpenSourceIcon.vue';

const props = defineProps<{
  icon: string;
  title: string;
  description: string;
}>();

const iconMap: Record<string, any> = {
  server: ServerIcon,
  provider: ProviderIcon,
  plugin: PluginIcon,
  security: SecurityIcon,
  cloudflare: CloudflareIcon,
  'open-source': OpenSourceIcon,
};

const iconClass = computed(() => {
  const classes: Record<string, string> = {
    server: 'bg-blue-500/10 text-blue-400',
    provider: 'bg-purple-500/10 text-purple-400',
    plugin: 'bg-green-500/10 text-green-400',
    security: 'bg-red-500/10 text-red-400',
    cloudflare: 'bg-orange-500/10 text-orange-400',
    'open-source': 'bg-yellow-500/10 text-yellow-400',
  };
  return classes[props.icon] || 'bg-dark-800 text-dark-400';
});

const iconComponent = computed(() => iconMap[props.icon] || ServerIcon);
</script>