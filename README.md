# website/ — OrigEssentials 官方網站

## 架構概覽

- **框架**：Vue 3 + Vite
- **樣式**：Tailwind CSS（深色主題）
- **路由**：Vue Router（SPA）
- **部署**：Cloudflare Pages

## 本機開發

```bash
cd website

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
# 存取：http://localhost:5173
```

## 建置與部署

```bash
# 建置
npm run build
# 產出：dist/

# 本地預覽
npm run preview

# 部署至 Cloudflare Pages
npx wrangler pages deploy dist --project-name=origessentials-website
```

## 目錄結構

```
website/
├── src/
│   ├── main.ts                 # 進入點
│   ├── App.vue                 # 根組件
│   ├── router/
│   │   └── index.ts            # 路由定義
│   ├── styles/
│   │   └── main.css            # 全域樣式
│   ├── components/
│   │   ├── NavBar.vue          # 導航列
│   │   ├── Footer.vue          # 頁尾
│   │   ├── NavLink.vue         # 導航連結
│   │   ├── home/
│   │   │   ├── FeatureCard.vue
│   │   │   └── ProviderRow.vue
│   │   ├── providers/
│   │   │   ├── StatusCard.vue
│   │   │   └── StatusBadge.vue
│   │   ├── docs/
│   │   │   └── SidebarLink.vue
│   │   └── icons/              # SVG 圖示
│   └── views/
│       ├── HomeView.vue        # 首頁
│       ├── DocsView.vue        # 文件中心
│       ├── ProvidersView.vue   # 託管商狀態
│       ├── InstallView.vue     # 安裝指南
│       └── SecurityView.vue    # 安全政策
├── content/docs/               # Markdown 文件原始檔
├── public/                     # 靜態資源
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## Cloudflare Pages 建立

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 進入 **Pages** → **Create a project** → **Connect to Git**
3. 選擇倉庫 `origessentials/origessentials`
4. 設定：
   - 產出目錄：`website/dist`
   - 建置命令：`cd website && npm ci && npm run build`
   - 根目錄：`.`
5. 點擊 **Save and Deploy**

## 自訂網域

1. Pages 專案 → **Custom domains**
2. 輸入網域（例：`origessentials.dev`）
3. 設定 DNS（CNAME 或 A 記錄）
4. HTTPS 自動啟用

## 文件新增

新增文件步驟：

1. 在 `content/docs/` 建立 `.md` 檔案
2. 在 `views/DocsView.vue` 的 `docComponents` 加入對應組件載入
3. 在 `SidebarLink.vue` 加入導航連結

## 環境設定

網站為靜態部署，無需環境變數。若需整合外部服務（如分析），可透過 `import.meta.env` 設定。

## 測試與建置

```bash
# Lint
npm run lint

# 型別檢查
npx tsc --noEmit

# 完整建置
npm run build
```