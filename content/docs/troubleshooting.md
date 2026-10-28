---
title: 疑難排解
description: OrigEssentials 常見問題與解決方案
---

# 疑難排解

## 插件問題

### 插件未載入

**症狀**：伺服器啟動時無 OrigEssentials 日誌

**檢查**：
1. Java 版本是否 ≥ 17
2. Paper/Purpur 版本是否 ≥ 1.20.1
3. JAR 檔是否完整（未損壞）
4. 目錄權限是否正確

```bash
java -version
# 應顯示 openjdk version "17.x.x" 或更新
```

### 配對失敗

**症狀**：`/orig pair` 回報錯誤

**可能原因**：
1. `api-endpoint` 錯誤
2. 網路不通
3. TLS 憑證問題
4. 配對碼已過期

**檢查**：
```bash
# 從伺服器測試連線
curl -v https://panel.example.com/api/v1/health
```

### 連線中斷

**症狀**：插件日誌顯示「連線已中斷」

**處理**：
1. 確認 Workers 是否正常運作
2. 檢查 API Key 是否過期
3. 執行 `/orig unpair` 後重新配對

## Workers 問題

### 健康檢查返回 500

```bash
curl https://api.origessentials.dev/api/v1/health
```

**可能原因**：
1. D1 資料庫未連線
2. Secrets 未設定

**檢查**：
```bash
npx wrangler d1 execute origessentials --command="SELECT 1"
```

### Migration 失敗

**症狀**：部署時提示 migration 錯誤

**處理**：
1. 確認 D1 資料庫已建立
2. 檢查 migration 檔案順序
3. 查看 Workers 日誌

```bash
npx wrangler tail
```

## 網站問題

### 頁面 404

**症狀**：部分路由返回 404

**處理**：
1. 確認 `_redirects` 檔案存在於 `dist/`
2. 檢查路由配置
3. 重新部署

```bash
cat website/dist/_redirects
# 應包含：/* /index.html 200
```

## 聯絡支援

- GitHub Issues：https://github.com/origessentials/origessentials/issues
- 安全漏洞：security@origessentials.dev