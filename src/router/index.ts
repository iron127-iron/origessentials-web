import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import DocsView from '@/views/DocsView.vue';
import ProvidersView from '@/views/ProvidersView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/docs', name: 'docs', component: DocsView },
    { path: '/docs/:page', name: 'doc-page', component: DocsView },
    { path: '/providers', name: 'providers', component: ProvidersView },
    { path: '/install', name: 'install', component: () => import('@/views/InstallView.vue') },
    { path: '/security', name: 'security', component: () => import('@/views/SecurityView.vue') },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;