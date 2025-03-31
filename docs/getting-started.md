# 快速开始指南

本指南将帮助您快速设置和运行文档系统。

## 环境要求

- Node.js 16.0 或更高版本
- Cloudflare 账号
- Wrangler CLI 工具

## 安装步骤

### 1. 安装 Wrangler CLI

```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare

```bash
wrangler login
```

### 3. 克隆项目

```bash
git clone https://github.com/yourusername/cloudocs.git
cd cloudocs
```

### 4. 安装依赖

```bash
npm install
```

### 5. 配置 KV 存储

```bash
wrangler kv:namespace create "DOCS"
```

### 6. 更新配置

将生成的 KV 命名空间 ID 添加到 `wrangler.toml` 文件中：

```toml
kv_namespaces = [
  { binding = "DOCS", id = "your-kv-namespace-id" }
]
```

### 7. 本地开发

```bash
npm run dev
```

### 8. 部署

```bash
npm run deploy
```

## 文档管理

### 添加新文档

1. 在 `docs` 目录下创建新的 Markdown 文件
2. 使用 Markdown 语法编写文档内容
3. 更新导航菜单
4. 提交更改并部署

### 文档格式

- 使用 Markdown 语法
- 保持一致的标题层级
- 添加适当的代码块和示例
- 包含必要的截图和图表

## 自定义主题

您可以通过修改 `tailwind.config.js` 文件来自定义网站主题：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // 自定义颜色
        }
      }
    }
  }
}
``` 