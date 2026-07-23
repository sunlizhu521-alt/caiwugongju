# 财务工具

独立部署在腾讯云的 Node.js 项目。

## 本地运行

```bash
npm ci
npm test
npm start
```

默认端口为 `4008`。

## 腾讯云部署

```text
目录：/home/ubuntu/zhuge-ai-lab/caiwugongju
PM2：caiwugongju
端口：4008
```

服务器运行数据保存在 `data/`，备份保存在 `backups/`，两者不提交到 GitHub。
