/**
 * 处理暗黑模式主题切换的脚本
 */

// 在页面加载前初始化主题
function initTheme() {
  if (localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    console.log('初始化为暗黑模式');
  } else {
    document.documentElement.classList.remove('dark');
    console.log('初始化为亮色模式');
  }
}

// 立即执行初始化，避免闪烁
initTheme();

// 等待文档加载完成后添加事件监听器
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  
  if (themeToggle) {
    console.log('找到主题切换按钮');
    
    // 给按钮添加明显的视觉反馈
    themeToggle.addEventListener('click', () => {
      // 添加点击动画
      themeToggle.classList.add('scale-95');
      setTimeout(() => {
        themeToggle.classList.remove('scale-95');
      }, 100);
      
      // 切换暗黑模式
      const isDark = document.documentElement.classList.toggle('dark');
      
      // 保存用户偏好
      localStorage.theme = isDark ? 'dark' : 'light';
      
      // 输出调试信息
      console.log('主题已切换为:', isDark ? '暗黑模式' : '亮色模式');
    });
  } else {
    console.error('找不到主题切换按钮 (#themeToggle)');
  }
});

// 监听系统偏好变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!('theme' in localStorage)) {
    if (e.matches) {
      document.documentElement.classList.add('dark');
      console.log('系统偏好已变更为暗黑模式');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('系统偏好已变更为亮色模式');
    }
  }
}); 