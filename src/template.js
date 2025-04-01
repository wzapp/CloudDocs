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
  <!-- 预先加载主题脚本，避免闪烁 -->
  <script src="/js/theme.js"></script>
</head>
<body class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
  <!-- 顶部导航栏 -->
  <header class="sticky top-0 z-50 w-full backdrop-blur flex-none transition-colors duration-500 border-b border-gray-900/10 dark:border-gray-100/10 bg-white/95 dark:bg-gray-900/95 supports-backdrop-blur:bg-white/60 dark:supports-backdrop-blur:bg-gray-900/60 h-[60px]">
    <div class="max-w-8xl mx-auto h-full">
      <div class="flex items-center justify-between h-full px-4 lg:px-8">
        <!-- Logo -->
        <a class="flex items-center gap-2 transition-transform hover:scale-105" href="/">
          <svg class="w-8 h-8 text-primary-500 dark:text-primary-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">CloudDocs</span>
        </a>
        
        <!-- 中间搜索框 -->
        <div class="hidden md:flex items-center mx-6 lg:w-96">
          <div class="relative w-full">
            <input type="text" placeholder="搜索文档..." class="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
            <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
        
        <!-- 主导航 -->
        <div class="flex items-center space-x-4">
          <div class="hidden lg:flex items-center space-x-2">
            <a class="nav-link" href="/docs/getting-started">快速开始</a>
            <a class="nav-link" href="/docs/api">API 文档</a>
            <a class="nav-link" href="/docs/faq">常见问题</a>
          </div>
          
          <!-- 暗黑模式切换按钮 -->
          <button id="themeToggle" class="theme-toggle transition-transform duration-200" aria-label="切换主题">
            <!-- 太阳图标 (亮色模式时显示) -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 dark:hidden" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
            </svg>
            <!-- 月亮图标 (暗色模式时显示) -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hidden dark:block" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
          </button>
          
          <a class="hidden lg:inline-flex items-center justify-center h-8 px-4 text-sm font-medium text-white bg-primary-500 dark:bg-primary-600 rounded-lg shadow-sm hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors duration-200" href="https://github.com/wzapp/CloudDocs" target="_blank">
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
        
        <!-- 文档导航组 -->
        <div class="nav-group">
          <div class="nav-group-header ${currentPath.startsWith('/docs/') ? 'expanded' : ''}" data-group="docs">
            <span>文档导航</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="nav-group-content ${currentPath.startsWith('/docs/') ? 'expanded' : ''}" id="docsContent">
            <a href="/docs/getting-started" class="nav-group-item ${currentPath === '/docs/getting-started' ? 'active' : ''}">快速开始</a>
            <a href="/docs/api" class="nav-group-item ${currentPath === '/docs/api' ? 'active' : ''}">API 文档</a>
            <a href="/docs/deployment" class="nav-group-item ${currentPath === '/docs/deployment' ? 'active' : ''}">部署指南</a>
            <a href="/docs/faq" class="nav-group-item ${currentPath === '/docs/faq' ? 'active' : ''}">常见问题</a>
            <a href="/docs/github-upload" class="nav-group-item ${currentPath === '/docs/github-upload' ? 'active' : ''}">发布到github</a>
            <a href="/docs/update-log" class="nav-group-item ${currentPath === '/docs/update-log' ? 'active' : ''}">更新日志</a>
            <a href="/docs/test" class="nav-group-item ${currentPath === '/docs/test' ? 'active' : ''}">测试文档</a>
          </div>
        </div>

        <!-- 学习资料组 -->
        <div class="nav-group">
          <div class="nav-group-header ${currentPath.startsWith('/learn/') ? 'expanded' : ''}" data-group="learn">
            <span>学习资料</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="nav-group-content ${currentPath.startsWith('/learn/') ? 'expanded' : ''}" id="learnContent">
            <a href="/learn/tutorials" class="nav-group-item ${currentPath === '/learn/tutorials' ? 'active' : ''}">教程指南</a>
            <a href="/learn/examples" class="nav-group-item ${currentPath === '/learn/examples' ? 'active' : ''}">示例代码</a>
            <a href="/learn/best-practices" class="nav-group-item ${currentPath === '/learn/best-practices' ? 'active' : ''}">最佳实践</a>
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
      const currentPath = window.location.pathname; // 获取当前页面路径
      
      // 移动菜单相关
      const menuBtn = document.getElementById('menuBtn');
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('overlay');
      
      // 切换侧边栏显示/隐藏
      function toggleSidebar() {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
      }

      // 关闭侧边栏
      function closeSidebar() {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
      }

      // 菜单按钮点击事件
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebar();
      });

      // 遮罩层点击关闭侧边栏
      overlay.addEventListener('click', closeSidebar);

      // 窗口大小变化时处理侧边栏
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
          closeSidebar();
        }
      });

      // 导航组折叠/展开功能
      document.querySelectorAll('.nav-group-header').forEach(header => {
        const group = header.getAttribute('data-group');
        const content = document.getElementById(group + 'Content');
        
        // 根据当前路径初始化展开状态
        if (currentPath.startsWith('/' + group + '/')) {
          header.classList.add('expanded');
          content.classList.add('expanded');
          header.querySelector('svg').style.transform = 'rotate(0deg)';
        }

        // 点击标题切换展开状态
        header.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          // 切换展开状态
          const isExpanded = header.classList.toggle('expanded');
          content.classList.toggle('expanded');
          
          // 更新箭头方向
          const arrow = header.querySelector('svg');
          arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)';
        });
      });

      // 为所有二级导航链接添加点击事件
      document.querySelectorAll('.nav-group-content a').forEach(link => {
        // 设置当前活动链接
        const href = link.getAttribute('href');
        if (currentPath === href) {
          link.classList.add('active');
        }
        
        link.addEventListener('click', (e) => {
          // 关闭移动端侧边栏
          closeSidebar();
        });
      });
    });
  </script>
</body>
</html>`;
}

module.exports = { getPageTemplate }; 