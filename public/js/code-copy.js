/**
 * 代码块复制功能
 * 为代码块添加复制按钮，并实现复制功能
 */

document.addEventListener('DOMContentLoaded', function() {
  // 查找所有代码块
  const codeBlocks = document.querySelectorAll('pre > code');
  
  // 为每个代码块添加复制按钮
  codeBlocks.forEach(function(codeBlock) {
    // 获取父元素pre
    const preBlock = codeBlock.parentElement;
    
    // 创建相对定位容器
    preBlock.style.position = 'relative';
    
    // 创建复制按钮
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.setAttribute('aria-label', '复制代码');
    copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
      </svg>
      <span class="code-copy-tooltip">复制代码</span>
    `;
    
    // 将按钮添加到pre元素中
    preBlock.appendChild(copyButton);
    
    // 添加点击事件监听器
    copyButton.addEventListener('click', function() {
      // 获取代码文本
      const code = codeBlock.textContent;
      
      // 使用现代 Clipboard API (如果可用)
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(code)
          .then(() => showSuccess(copyButton))
          .catch((err) => {
            console.error('复制失败：', err);
            showError(copyButton);
          });
      } else {
        // 回退方法
        fallbackCopyTextToClipboard(code, copyButton);
      }
    });
  });
  
  // 显示成功提示
  function showSuccess(button) {
    button.classList.add('success');
    const tooltip = button.querySelector('.code-copy-tooltip');
    tooltip.textContent = '已复制!';
    
    // 2秒后恢复原状
    setTimeout(() => {
      button.classList.remove('success');
      tooltip.textContent = '复制代码';
    }, 2000);
  }
  
  // 显示错误提示
  function showError(button) {
    button.classList.add('error');
    const tooltip = button.querySelector('.code-copy-tooltip');
    tooltip.textContent = '复制失败';
    
    // 2秒后恢复原状
    setTimeout(() => {
      button.classList.remove('error');
      tooltip.textContent = '复制代码';
    }, 2000);
  }
  
  // 回退复制方法
  function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // 使文本域不可见
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showSuccess(button);
      } else {
        showError(button);
      }
    } catch (err) {
      console.error('复制失败：', err);
      showError(button);
    }
    
    document.body.removeChild(textArea);
  }
}); 