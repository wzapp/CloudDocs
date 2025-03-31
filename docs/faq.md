# 常见问题

## 基本问题

### 这个文档系统是什么？

这是一个基于 Cloudflare Workers 和 KV 存储构建的现代化文档系统，使用 Tailwind CSS 提供美观的界面。

### 如何开始使用？

请查看[快速开始](/docs/getting-started)指南，了解如何设置和使用本系统。

## 部署相关

### 如何部署到自己的域名？

1. 在 `wrangler.toml` 中配置您的域名：
```toml
[[routes]]
pattern = "your-domain.com"
custom_domain = true
```

2. 在 Cloudflare 中添加域名并配置 DNS 记录
3. 运行 `wrangler deploy` 部署

### 如何更新已部署的文档？

使用以下命令更新文档：
```bash
wrangler kv key put --namespace-id YOUR_NAMESPACE_ID "doc-name.md" --path ./docs/doc-name.md
```

## 开发相关

### 如何在本地开发？

运行以下命令启动开发服务器：
```bash
npm run dev
```

### 如何添加新的文档？

1. 在 `docs` 目录下创建新的 Markdown 文件
2. 使用 `wrangler kv key put` 命令上传文档
3. 在导航菜单中添加链接
4. 重新部署应用

### 支持哪些 Markdown 特性？

- 标准 Markdown 语法
- 代码高亮
- 表格
- 任务列表
- 链接和图片
- 数学公式（计划中）

## 故障排除

### 文档无法访问

1. 检查域名 DNS 配置
2. 确认文档已正确上传到 KV 存储
3. 检查 Worker 运行状态

### 样式显示异常

1. 确保 CSS 文件已正确构建
2. 检查浏览器控制台是否有错误
3. 尝试清除浏览器缓存 