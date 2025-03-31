# 部署指南

## 准备工作

1. 确保您已经安装了所有必要的工具
2. 配置好 Cloudflare Workers
3. 准备好您的文档内容

## 部署步骤

### 1. 配置 Cloudflare Workers

```bash
wrangler login
wrangler kv:namespace create "DOCS"
```

### 2. 更新配置

将生成的 KV 命名空间 ID 添加到 `wrangler.toml` 文件中：

```toml
kv_namespaces = [
  { binding = "DOCS", id = "your-kv-namespace-id" }
]
```

### 3. 部署文档

```bash
wrangler kv:key put --binding=DOCS "index.md" --path=./docs/index.md
wrangler kv:key put --binding=DOCS "getting-started.md" --path=./docs/getting-started.md
# ... 其他文档
```

### 4. 部署应用

```bash
wrangler deploy
``` 