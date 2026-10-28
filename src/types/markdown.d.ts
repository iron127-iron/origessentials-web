// md2vue 輸出目錄型別聲明
declare module '*.md.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

