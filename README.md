# CloudDocs - 基于 Cloudflare Workers 的在线文档系统

CloudDocs 是一个现代化的在线文档系统，使用 Cloudflare Workers、KV 存储和 Tailwind CSS 构建。它提供了快速、可靠且美观的文档展示平台。

## 特性

- 🚀 基于 Cloudflare Workers 的快速响应
- 💾 使用 KV 存储管理文档内容
- 🎨 使用 Tailwind CSS 构建的现代化界面
- 📱 完全响应式设计
- 🔍 支持 Markdown 格式
- 🌐 全球 CDN 加速

## 快速开始

1. 克隆项目：
```bash
git clone https://github.com/yourusername/cloudocs.git
cd cloudocs
```

2. 安装依赖：
```bash
npm install
```

3. 配置 Cloudflare Workers：
```bash
wrangler login
wrangler kv:namespace create "DOCS"
```

4. 更新 `wrangler.toml` 文件中的 KV 命名空间 ID

5. 本地开发：
```bash
npm run dev
```

6. 部署：
```bash
npm run deploy
```

## 项目结构

```
cloudocs/
├── src/
│   ├── worker/
│   │   └── index.js      # Cloudflare Worker 主文件
│   └── css/
│       └── input.css     # Tailwind CSS 输入文件
├── public/
│   └── css/
│       └── styles.css    # 编译后的 CSS 文件
├── docs/                 # Markdown 文档目录
├── package.json
├── tailwind.config.js
└── wrangler.toml
```

## 文档管理

所有文档都存储在 `docs` 目录下，使用 Markdown 格式编写。文档会自动从 KV 存储中读取并渲染。

### 添加新文档

1. 在 `docs` 目录下创建新的 `.md` 文件
2. 使用 Markdown 语法编写文档内容
3. 更新导航菜单
4. 提交更改并部署

## 自定义

### 主题定制

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

### 布局定制

主布局模板位于 `src/worker/index.js` 文件中，您可以根据需要修改 HTML 结构和样式。

## 贡献

欢迎提交 Pull Request 来改进项目。在提交之前，请确保：

1. 遵循现有的代码风格
2. 添加适当的测试
3. 更新文档
4. 确保所有功能正常工作

## 许可证

MIT 