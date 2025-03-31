function getPageTemplate(title, content, currentPath = '') {
  return `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link href="/css/styles.css" rel="stylesheet">
</head>
<body class="bg-gradient-to-br from-gray-50 to-gray-100">
  <!-- 顶部导航栏 -->
  <header class="sticky top-0 z-50 w-full backdrop-blur flex-none transition-colors duration-500 border-b border-gray-900/10 bg-white/95 supports-backdrop-blur:bg-white/60 h-[60px]">
    <div class="max-w-8xl mx-auto h-full">
      <div class="flex items-center justify-between h-full px-4 lg:px-8">
        <!-- Logo -->
        <a class="flex items-center gap-2 transition-transform hover:scale-105" href="/">
          <svg class="w-8 h-8 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">CloudDocs</span>
        </a>
        
        <!-- 中间搜索框 -->
        <div class="hidden md:flex items-center mx-6 lg:w-96">
          <div class="relative w-full">
            <input type="text" placeholder="搜索文档..." class="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
            <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
        
        <!-- 主导航 -->
        <div class="flex items-center space-x-4">
          <div class="hidden lg:flex items-center">
            <a class="nav-link" href="/docs/getting-started">快速开始</a>
            <a class="nav-link" href="/docs/api">API 文档</a>
            <a class="nav-link" href="/docs/faq">常见问题</a>
          </div>
          <a class="hidden lg:inline-flex items-center justify-center h-8 px-4 text-sm font-medium text-white bg-primary-500 rounded-lg shadow-sm hover:bg-primary-600 transition-colors duration-200" href="https://github.com/your-repo" target="_blank">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
            </svg>
            GitHub
          </a>
          
          <!-- 移动端菜单按钮 -->
          <button id="menuBtn" class="header-mobile-menu lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>

  <div class="relative min-h-screen">
    <!-- 遮罩层 -->
    <div id="overlay" class="sidebar-overlay"></div>

    <!-- 侧边栏 -->
    <aside id="sidebar" class="doc-sidebar">
      <nav class="space-y-2">
        <a href="/" class="nav-group-item ${currentPath === '/' ? 'active' : ''}">首页</a>
        
        <div class="nav-group">
          <div class="nav-group-header ${currentPath.includes('/docs/') ? 'expanded' : ''}" id="docNavToggle">
            <span>文档导航</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="nav-group-content ${currentPath.includes('/docs/') ? 'expanded' : ''}" id="docNavContent">
            <a href="/docs/getting-started" class="nav-group-item ${currentPath === '/docs/getting-started' ? 'active' : ''}">快速开始</a>
            <a href="/docs/api" class="nav-group-item ${currentPath === '/docs/api' ? 'active' : ''}">API 文档</a>
            <a href="/docs/deployment" class="nav-group-item ${currentPath === '/docs/deployment' ? 'active' : ''}">部署指南</a>
            <a href="/docs/faq" class="nav-group-item ${currentPath === '/docs/faq' ? 'active' : ''}">常见问题</a>
            <a href="/docs/github-upload" class="nav-group-item ${currentPath === '/docs/github-upload' ? 'active' : ''}">发布到github</a>
          </div>
        </div>
      </nav>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <div class="doc-container">
        <div class="doc-content">
          ${content}
        </div>
      </div>
    </main>
  </div>

  <script>
    // 初始化导航和菜单
    document.addEventListener('DOMContentLoaded', function() {
      // 移动菜单相关
      const menuBtn = document.getElementById('menuBtn');
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('overlay');
      
      function toggleSidebar() {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
      }

      function closeSidebar() {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
      }

      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebar();
      });

      overlay.addEventListener('click', closeSidebar);

      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
          closeSidebar();
        }
      });

      sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 1024) {
            closeSidebar();
          }
        });
      });

      // 折叠导航相关
      const navToggle = document.getElementById('docNavToggle');
      const navContent = document.getElementById('docNavContent');

      navToggle.addEventListener('click', function() {
        this.classList.toggle('expanded');
        navContent.classList.toggle('expanded');
      });
    });
  </script>
</body>
</html>`;
}

module.exports = { getPageTemplate }; 