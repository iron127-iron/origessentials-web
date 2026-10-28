---
title: 貢獻指南
description: 如何參與 OrigEssentials 開發
---

# 貢獻指南

## 開發環境

```bash
# 複製環境變數
cp panel/.env.example panel/.env.local
cp website/.env.example website/.env.local

# 安裝依賴
npm install  # 在各子專案執行
```

## 程式碼風格

### Java
- Google Java Style Guide
- `./gradlew spotlessApply` 自動格式化

### TypeScript
- ESLint + Prettier
- `npm run format` 自動修復

## 提交規範

使用 Conventional Commits：
```
feat(panel): 新增角色權限管理
fix(plugin): 修復配對碼重複問題
docs: 更新 Cafora Host 文件
chore: 升級依賴版本
test: 新增 API 測試
```

## Pull Request 流程

1. Fork 倉庫
2. 建立功能分支：`git checkout -b feature/your-feature`
3. 提交變更
4. 推送並建立 PR
5. 通過 CI 檢查

## 測試要求

所有新功能必須包含測試：
```bash
cd plugin && ./gradlew test
cd panel && npm run test
cd website && npm run build
```