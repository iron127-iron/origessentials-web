---
title: 插件安裝與設定
description: OrigEssentials Minecraft 插件安裝步驟與配置說明
---

# 插件安裝與設定

## 下載插件

從 [GitHub Releases](https://github.com/origessentials/origessentials/releases) 下載最新 JAR 檔，或自行建置：

```bash
cd plugin
./gradlew shadowJar
# 產出：build/libs/OrigEssentials-0.1.0-SNAPSHOT.jar
```

## 安裝步驟

1. 停止 Minecraft 伺服器
2. 複製 JAR 至 `plugins/` 目錄
3. 啟動伺服器（首次啟動會產生 `config.yml`）
4. 編輯 `plugins/OrigEssentials/config.yml`

## 設定檔說明

完整設定檔範例見 [plugin/src/main/resources/config.yml](../../../plugin/src/main/resources/config.yml)。

### 最小必要設定

```yaml
web-panel:
  enabled: true
  api-endpoint: "https://panel.example.com"
  server-id: "pterodactyl-server-123"
```

### 權限控制

```yaml
  security:
    allow-remote-actions: false   # 禁止遠端電源操作
    allow-file-management: false  # 禁止遠端檔案操作
```

## 權限節點

| 節點 | 說明 |
|------|------|
| `origessentials.command.orig` | 使用主指令 |
| `origessentials.command.origstatus` | 查看狀態 |
| `origessentials.command.origpair` | 執行配對 |
| `origessentials.command.origunpair` | 解除配對 |
| `origessentials.command.origdebug` | 除錯資訊 |
| `origessentials.command.origbind` | UUID 綁定 |
| `origessentials.unpair` | 管理員解除配對 |

建議搭配 LuckPerms 等權限插件分配節點。

## 指令列表

| 指令 | 說明 |
|------|------|
| `/orig` | 主指令，顯示幫助 |
| `/orig status` | 查看插件與連線狀態 |
| `/orig reload` | 重新載入設定 |
| `/orig pair <code>` | 配對 Web 面板 |
| `/orig unpair` | 解除配對 |
| `/orig debug` | 輸出診斷資訊 |
| `/orig bind <code>` | 綁定 Minecraft UUID |