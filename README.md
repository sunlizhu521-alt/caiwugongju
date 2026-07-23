# 财务工具

独立部署在腾讯云的 React + Node.js + SQLite 项目。当前页面底稿来自采购跟单项目，后续按财务业务重新梳理页面、逻辑和数据。

## 本地运行

```bash
npm ci
npm test
npm run build
npm start
```

默认端口为 `4008`，访问路径为 `/caiwugongju/`。

## 腾讯云部署

```text
目录：/home/ubuntu/zhuge-ai-lab/caiwugongju
PM2：caiwugongju
端口：4008
```

服务器运行数据保存在 `data/`，备份保存在 `backups/`，两者不提交到 GitHub。

首次初始化管理员时，可通过服务器环境变量 `ADMIN_INITIAL_PASSWORD` 设置初始密码；未配置时服务仍会启动，但不会创建默认管理员。
