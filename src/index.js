/**
 * 主应用入口文件
 * 基于Hono框架构建的Cloudflare Worker应用
 * 用于提供文档网站的主要功能和路由处理
 */
import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { marked } from 'marked'; // 用于将Markdown转换为HTML
import { getPageTemplate } from './template';

// 创建Hono应用实例
const app = new Hono();

/**
 * 静态文件服务配置
 * 处理CSS等静态资源的请求
 */
app.get('/css/*', serveStatic({ root: './' }));

/**
 * 添加JS文件的静态文件服务配置
 */
app.get('/js/*', serveStatic({ root: './' }));

/**
 * 从KV存储获取文档内容的辅助函数
 * @param {object} c - Hono上下文对象，包含环境变量和绑定
 * @param {string} filename - 要获取的文档文件名
 * @returns {string|null} 文档内容或null（如果文档不存在）
 */
async function getDocContent(c, filename) {
  try {
    // 使用KV绑定获取文档内容
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

/**
 * 首页路由处理
 * 读取并渲染index.md作为网站首页
 */
app.get('/', async (c) => {
  try {
    // 获取首页文档内容
    const content = await getDocContent(c, 'index.md');
    if (!content) {
      return c.text('文档不存在', 404);
    }
    // 将Markdown转换为HTML
    const html = marked(content);
    // 设置响应头，禁用缓存以确保内容始终为最新
    const headers = {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };
    // 使用模板渲染页面并返回响应
    return new Response(getPageTemplate('在线文档', html, ''), { headers });
  } catch (error) {
    console.error('Error:', error);
    return c.text('服务器错误', 500);
  }
});

/**
 * 文档页面路由处理
 * 处理/docs/:slug格式的URL，读取对应的Markdown文件并渲染
 */
app.get('/docs/:slug', async (c) => {
  try {
    // 从URL参数中获取文档标识符
    const slug = c.req.param('slug');
    // 获取对应的文档内容
    const content = await getDocContent(c, `${slug}.md`);
    if (!content) {
      return c.text('文档不存在', 404);
    }
    // 将Markdown转换为HTML
    const html = marked(content);
    // 设置响应头，禁用缓存
    const headers = {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };
    // 使用模板渲染页面，传入当前路径用于导航高亮
    return new Response(getPageTemplate(`${slug} - 在线文档`, html, slug), { headers });
  } catch (error) {
    console.error('Error:', error);
    return c.text('服务器错误', 500);
  }
});

// 导出应用实例，供Cloudflare Worker使用
export default app; 