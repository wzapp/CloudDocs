import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { marked } from 'marked';
import { getPageTemplate } from './template';

const app = new Hono();

// 静态文件服务
app.get('/css/*', serveStatic({ root: './' }));

// 获取文档内容的辅助函数
async function getDocContent(c, filename) {
  try {
    const content = await c.env.DOCS.get(filename);
    if (!content) {
      console.error(`文档不存在: ${filename}`);
      return null;
    }
    return content;
  } catch (error) {
    console.error(`获取文档失败: ${filename}`, error);
    return null;
  }
}

// 首页路由
app.get('/', async (c) => {
  try {
    const content = await getDocContent(c, 'index.md');
    if (!content) {
      return c.text('文档不存在', 404);
    }
    const html = marked(content);
    const headers = {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };
    return new Response(getPageTemplate('在线文档', html, ''), { headers });
  } catch (error) {
    console.error('Error:', error);
    return c.text('服务器错误', 500);
  }
});

// 文档路由
app.get('/docs/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');
    const content = await getDocContent(c, `${slug}.md`);
    if (!content) {
      return c.text('文档不存在', 404);
    }
    const html = marked(content);
    const headers = {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };
    return new Response(getPageTemplate(`${slug} - 在线文档`, html, slug), { headers });
  } catch (error) {
    console.error('Error:', error);
    return c.text('服务器错误', 500);
  }
});

export default app; 