import { Hono } from 'hono';
import { marked } from 'marked';
import { serveStatic } from 'hono/cloudflare-workers';
import { getPageTemplate } from '../template';

const app = new Hono();

// 开发环境的文档内容
const devDocs = {
  'index.md': `# 欢迎使用在线文档系统

这是一个基于 Cloudflare Workers 和 Tailwind CSS 构建的现代化文档网站。

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
  <div class="feature-card">
    <div class="feature-icon">🚀</div>
    <h3 class="feature-title">基于 Cloudflare Workers 的快速响应</h3>
    <p class="feature-description">利用 Cloudflare 的全球边缘网络，实现毫秒级响应速度。</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">📦</div>
    <h3 class="feature-title">使用 KV 存储管理文档内容</h3>
    <p class="feature-description">高效的键值存储系统，确保文档内容的快速访问和更新。</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">🎨</div>
    <h3 class="feature-title">使用 Tailwind CSS 构建的现代化界面</h3>
    <p class="feature-description">优雅的设计和流畅的交互体验。</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">📱</div>
    <h3 class="feature-title">完全响应式设计</h3>
    <p class="feature-description">完美适配从手机到桌面的各种设备。</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">🔍</div>
    <h3 class="feature-title">支持 Markdown 格式</h3>
    <p class="feature-description">轻松编写和维护文档内容。</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">⚡</div>
    <h3 class="feature-title">实时更新</h3>
    <p class="feature-description">文档内容更新后立即生效，无需重新部署。</p>
  </div>
</div>

## 快速开始

请查看[快速开始](/docs/getting-started)指南来了解如何使用本系统。

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
  <a href="/docs/api" class="feature-card hover:no-underline">
    <div class="feature-icon">📚</div>
    <h3 class="feature-title">API 文档</h3>
    <p class="feature-description">了解系统 API 的详细使用方法。</p>
  </a>

  <a href="/docs/faq" class="feature-card hover:no-underline">
    <div class="feature-icon">❓</div>
    <h3 class="feature-title">常见问题</h3>
    <p class="feature-description">查看常见问题的解答和解决方案。</p>
  </a>

  <a href="/docs/deployment" class="feature-card hover:no-underline">
    <div class="feature-icon">🚀</div>
    <h3 class="feature-title">部署指南</h3>
    <p class="feature-description">学习如何部署和配置系统。</p>
  </a>
</div>

## 贡献指南

欢迎提交 Pull Request 来改进文档。在提交之前，请确保：

1. 遵循现有的文档风格
2. 更新目录结构
3. 测试所有链接
4. 确保内容准确无误`,
  
  'getting-started.md': `# 快速开始指南

本指南将帮助您快速设置和运行文档系统。

## 环境要求

- Node.js 16.0 或更高版本
- Cloudflare 账号
- Wrangler CLI 工具`,
  
  'api.md': `# API 文档

## 接口说明

### 获取文档

\`\`\`http
GET /docs/:slug
\`\`\`

### 参数

- \`slug\`: 文档标识符`,
  
  'faq.md': `# 常见问题

## 如何部署？

1. 克隆项目
2. 安装依赖
3. 配置 Cloudflare Workers
4. 部署项目`,

  'deployment.md': `# 部署指南

## 准备工作

1. 确保您已经安装了所有必要的工具
2. 配置好 Cloudflare 账号
3. 准备好您的文档内容

## 部署步骤

### 1. 配置 Cloudflare Workers

\`\`\`bash
wrangler login
wrangler kv:namespace create "DOCS"
\`\`\`

### 2. 更新配置

将生成的 KV 命名空间 ID 添加到 \`wrangler.toml\` 文件中：

\`\`\`toml
kv_namespaces = [
  { binding = "DOCS", id = "your-kv-namespace-id" }
]
\`\`\`

### 3. 部署文档

\`\`\`bash
wrangler kv:key put --binding=DOCS "index.md" --path=./docs/index.md
wrangler kv:key put --binding=DOCS "getting-started.md" --path=./docs/getting-started.md
# ... 其他文档
\`\`\`

### 4. 部署应用

\`\`\`bash
wrangler deploy
\`\`\`
`
};

// 静态文件服务
app.use('/css/*', serveStatic({ root: './' }));
app.use('/js/*', serveStatic({ root: './' }));

// 获取文档内容的辅助函数
async function getDocContent(c, key) {
  try {
    console.log('Fetching content for key:', key);
    const { value, metadata } = await c.env.DOCS.getWithMetadata(key);
    console.log('KV response:', { value: !!value, metadata });
    
    if (!value) {
      console.log('No value found for key:', key);
      // 如果 KV 访问失败或内容不存在，使用开发环境内容
      return devDocs[key] || null;
    }

    // 如果是base64编码，则解码
    if (metadata && metadata.encoding === 'base64') {
      console.log('Decoding base64 content');
      return Buffer.from(value, 'base64').toString('utf8');
    }

    return value;
  } catch (error) {
    console.error('Error getting doc content:', error);
    // 如果 KV 访问失败，使用开发环境内容
    return devDocs[key] || null;
  }
}

// 提取文档标题
function getDocTitle(content) {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1] : '在线文档';
}

// 首页路由
app.get('/', async (c) => {
  try {
    const content = await getDocContent(c, 'index.md');
    
    if (!content) {
      return c.text('文档不存在', 404);
    }
    
    const html = marked(content);
    const title = getDocTitle(content);
    const headers = {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    return new Response(getPageTemplate(title, html, '/'), { headers });
  } catch (error) {
    console.error('Error:', error);
    return c.text('服务器错误', 500);
  }
});

// 文档页面路由
app.get('/docs/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');
    const content = await getDocContent(c, `${slug}.md`);
    
    if (!content) {
      return c.text('文档不存在', 404);
    }
    
    const html = marked(content);
    const title = getDocTitle(content);
    const headers = {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    return new Response(getPageTemplate(title, html, `/docs/${slug}`), { headers });
  } catch (error) {
    console.error('Error:', error);
    return c.text('服务器错误', 500);
  }
});

export default app; 