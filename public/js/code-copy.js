/**
 * 代码块复制功能
 * 为代码块添加复制按钮，并实现复制功能
 */

document.addEventListener('DOMContentLoaded', function() {
  // 查找所有代码块
  const codeBlocks = document.querySelectorAll('pre');
  
  // 为每个代码块添加复制按钮
  codeBlocks.forEach(function(preBlock) {
    // 创建代码块容器
    const codeBlockContainer = document.createElement('div');
    codeBlockContainer.className = 'code-block-container';
    
    // 将代码块插入到新容器之前
    preBlock.parentNode.insertBefore(codeBlockContainer, preBlock);
    
    // 将代码块移动到容器中
    codeBlockContainer.appendChild(preBlock);
    
    // 创建复制按钮
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.setAttribute('aria-label', '复制代码');
    copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      </svg>
      <span>复制代码</span>
      <span class="code-copy-tooltip">复制</span>
    `;
    
    // 将按钮添加到代码块容器的前面，但在容器内
    codeBlockContainer.insertBefore(copyButton, preBlock);
    
    // 添加点击事件监听器
    copyButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // 获取代码文本
      let code;
      const codeEl = preBlock.querySelector('code');
      if (codeEl) {
        code = codeEl.textContent;
      } else {
        code = preBlock.textContent;
      }
      
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
      
      return false;
    });
  });
  
  // 显示成功提示
  function showSuccess(button) {
    button.classList.add('success');
    const textSpan = button.querySelector('span:not(.code-copy-tooltip)');
    if (textSpan) {
      textSpan.textContent = '已复制';
    }
    
    // 更新图标为成功图标
    button.querySelector('svg').outerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
    
    // 2秒后恢复原状
    setTimeout(() => {
      button.classList.remove('success');
      if (textSpan) {
        textSpan.textContent = '复制代码';
      }
      button.querySelector('svg').outerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>
      `;
    }, 2000);
  }
  
  // 显示错误提示
  function showError(button) {
    button.classList.add('error');
    const textSpan = button.querySelector('span:not(.code-copy-tooltip)');
    if (textSpan) {
      textSpan.textContent = '复制失败';
    }
    
    // 更新图标为错误图标
    button.querySelector('svg').outerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
    
    // 2秒后恢复原状
    setTimeout(() => {
      button.classList.remove('error');
      if (textSpan) {
        textSpan.textContent = '复制代码';
      }
      button.querySelector('svg').outerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>
      `;
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