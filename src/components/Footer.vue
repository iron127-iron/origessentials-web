<template>
  <footer class="border-t border-dark-800 bg-dark-950 py-12 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- 專案資訊 -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xs">O</span>
            </div>
            <span class="font-semibold text-dark-100">OrigEssentials</span>
          </div>
          <p class="text-sm text-dark-500 leading-relaxed">
            開源 Minecraft 伺服器管理生態系統。
          </p>
        </div>

        <!-- 快速連結 -->
        <div>
          <h4 class="font-medium text-dark-200 mb-3">快速連結</h4>
          <ul class="space-y-2 text-sm">
            <li><RouterLink to="/docs" class="text-dark-500 hover:text-dark-200 transition-colors">文件中心</RouterLink></li>
            <li><RouterLink to="/providers" class="text-dark-500 hover:text-dark-200 transition-colors">支援狀態</RouterLink></li>
            <li><RouterLink to="/install" class="text-dark-500 hover:text-dark-200 transition-colors">安裝指南</RouterLink></li>
            <li><RouterLink to="/security" class="text-dark-500 hover:text-dark-200 transition-colors">安全政策</RouterLink></li>
          </ul>
        </div>

        <!-- 開發資源 -->
        <div>
          <h4 class="font-medium text-dark-200 mb-3">開發資源</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="https://github.com/origessentials/origessentials" target="_blank" rel="noopener" class="text-dark-500 hover:text-dark-200 transition-colors">
                GitHub 原始碼
              </a>
            </li>
            <li>
              <a href="https://github.com/origessentials/origessentials/issues" target="_blank" rel="noopener" class="text-dark-500 hover:text-dark-200 transition-colors">
                問題回報
              </a>
            </li>
            <li>
              <a href="https://github.com/origessentials/origessentials/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener" class="text-dark-500 hover:text-dark-200 transition-colors">
                貢獻指南
              </a>
            </li>
            <li>
              <a href="https://github.com/origessentials/origessentials/blob/main/SECURITY.md" target="_blank" rel="noopener" class="text-dark-500 hover:text-dark-200 transition-colors">
                安全漏洞回報
              </a>
            </li>
          </ul>
        </div>

        <!-- 授權資訊 -->
        <div>
          <h4 class="font-medium text-dark-200 mb-3">授權</h4>
          <p class="text-sm text-dark-500 mb-2">
            MIT License
          </p>
          <p class="text-sm text-dark-600">
            Copyright © 2026 OrigEssentials Contributors
          </p>
        </div>
      </div>

      <div class="border-t border-dark-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-sm text-dark-600">
          本專案與 Mojang AB 或 Microsoft 無關。
        </p>
        <p class="text-sm text-dark-700">
          版本 v0.1.0-SNAPSHOT
        </p>
      </div>
    </div>
  </footer>
</template>