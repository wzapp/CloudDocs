/**
 * 页面模板生成模块
 * 用于生成HTML页面的基本结构，包括导航栏、侧边栏和内容区域
 */

/**
 * 生成HTML页面的完整模板
 * @param {string} title - 页面标题
 * @param {string} content - 主要内容（HTML格式）
 * @param {string} currentPath - 当前页面路径，用于导航高亮
 * @returns {string} 完整的HTML页面内容
 */
function getPageTemplate(title, content, currentPath = '') {
  return `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link href="/css/styles.css" rel="stylesheet">
</head>
<body class="bg-gray-50 min-h-screen flex flex-col">
  <!-- 顶部导航栏 -->
  <header class="sticky top-0 z-50 bg-white border-b border-gray-200 h-16 flex items-center">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <div class="flex items-center">
        <button id="menuBtn" class="lg:hidden mr-4 text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <a href="/" class="text-blue-500 font-semibold text-xl">CloudDocs</a>
      </div>
      <div class="hidden lg:flex items-center space-x-6">
        <a href="/docs/getting-started" class="text-gray-600 hover:text-gray-900">快速开始</a>
        <a href="/docs/api" class="text-gray-600 hover:text-gray-900">API 文档</a>
        <a href="/docs/faq" class="text-gray-600 hover:text-gray-900">常见问题</a>
        <a href="https://github.com/wzapp/CloudDocs" target="_blank" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200">
          <span class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z" clip-rule="evenodd"></path>
            </svg>
            GitHub
          </span>
        </a>
      </div>
      <button class="lg:hidden text-gray-600 hover:text-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </header>

  <!-- 主要内容区域 -->
  <div class="flex-grow flex overflow-hidden">
    <!-- 侧边栏遮罩层 -->
    <div id="overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden lg:hidden"></div>

    <!-- 侧边导航栏 -->
    <aside id="sidebar" class="w-64 bg-white border-r border-gray-200 fixed inset-y-0 left-0 transform -translate-x-full lg:translate-x-0 lg:static lg:inset-auto z-50 transition duration-300 ease-in-out overflow-y-auto pt-16 lg:pt-0">
      <nav class="p-4 space-y-1">
        <a href="/" class="block px-4 py-2 rounded-md hover:bg-gray-100 ${currentPath === '/' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}">首页</a>
        
        <!-- 文档导航组 -->
        <div class="py-2">
          <div class="flex items-center justify-between px-4 py-2 cursor-pointer rounded-md hover:bg-gray-100 ${currentPath.startsWith('/docs/') ? 'text-blue-600' : 'text-gray-700'}" data-group="docs">
            <span class="font-medium">文档导航</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform transition-transform ${currentPath.startsWith('/docs/') ? '' : '-rotate-90'}" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-4 mt-1 space-y-1 ${currentPath.startsWith('/docs/') ? 'block' : 'hidden'}" id="docsContent">
            <a href="/docs/getting-started" class="block px-4 py-2 rounded-md hover:bg-gray-100 ${currentPath === '/docs/getting-started' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}">快速开始</a>
            <a href="/docs/api" class="block px-4 py-2 rounded-md hover:bg-gray-100 ${currentPath === '/docs/api' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}">API 文档</a>
            <a href="/docs/deployment" class="block px-4 py-2 rounded-md hover:bg-gray-100 ${currentPath === '/docs/deployment' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}">部署指南</a>
            <a href="/docs/faq" class="block px-4 py-2 rounded-md hover:bg-gray-100 ${currentPath === '/docs/faq' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}">常见问题</a>
            <a href="/docs/github-upload" class="block px-4 py-2 rounded-md hover:bg-gray-100 ${currentPath === '/docs/github-upload' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}">发布到GitHub</a>
            <a href="/docs/update-log" class="block px-4 py-2 rounded-md hover:bg-gray-100 ${currentPath === '/docs/update-log' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}">更新日志</a>
            <a href="/docs/test" class="block px-4 py-2 rounded-md hover:bg-gray-100 ${currentPath === '/docs/test' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}">测试文档</a>
          </div>
        </div>
        
        <!-- 学习资料组 -->
        <div class="py-2">
          <div class="flex items-center justify-between px-4 py-2 cursor-pointer rounded-md hover:bg-gray-100 ${currentPath.startsWith('/learn/') ? 'text-blue-600' : 'text-gray-700'}" data-group="learn">
            <span class="font-medium">学习资料</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform transition-transform ${currentPath.startsWith('/learn/') ? '' : '-rotate-90'}" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-4 mt-1 space-y-1 ${currentPath.startsWith('/learn/') ? 'block' : 'hidden'}" id="learnContent">
            <a href="/learn/tutorials" class="block px-4 py-2 rounded-md hover:bg-gray-100 ${currentPath === '/learn/tutorials' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}">教程指南</a>
            <a href="/learn/examples" class="block px-4 py-2 rounded-md hover:bg-gray-100 ${currentPath === '/learn/examples' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}">示例代码</a>
            <a href="/learn/best-practices" class="block px-4 py-2 rounded-md hover:bg-gray-100 ${currentPath === '/learn/best-practices' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}">最佳实践</a>
          </div>
        </div>
      </nav>
    </aside>

    <!-- 主内容区域 -->
    <main class="flex-1 overflow-auto p-4 lg:p-8">
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 lg:p-8">
        <div class="prose max-w-none">
          ${content}
        </div>
      </div>
    </main>
  </div>

  <!-- 页脚 -->
  <footer class="bg-white border-t border-gray-200 py-6 mt-auto">
    <div class="container mx-auto px-4 text-center text-gray-500 text-sm">
      <p>CloudDocs v2.0 | Powered by Cloudflare Workers</p>
      <p class="mt-2">© 2025 CloudDocs Team. All rights reserved.</p>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const currentPath = window.location.pathname;
      const menuBtn = document.getElementById('menuBtn');
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('overlay');
      
      // 切换侧边栏显示/隐藏
      function toggleSidebar() {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
        document.body.classList.toggle('overflow-hidden');
      }
      
      // 菜单按钮点击事件
      menuBtn.addEventListener('click', () => {
        toggleSidebar();
      });
      
      // 点击遮罩关闭侧边栏
      overlay.addEventListener('click', () => {
        toggleSidebar();
      });
      
      // 导航组折叠/展开功能
      document.querySelectorAll('[data-group]').forEach(header => {
        const group = header.getAttribute('data-group');
        const content = document.getElementById(group + 'Content');
        
        header.addEventListener('click', () => {
          const isHidden = content.classList.contains('hidden');
          content.classList.toggle('hidden', !isHidden);
          header.querySelector('svg').style.transform = isHidden ? 'rotate(0)' : 'rotate(-90deg)';
        });
      });
      
      // 窗口大小变化处理
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
          sidebar.classList.remove('-translate-x-full');
          overlay.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        } else {
          sidebar.classList.add('-translate-x-full');
        }
      });
    });
  </script>
</body>
</html>`;
}

module.exports = { getPageTemplate }; 