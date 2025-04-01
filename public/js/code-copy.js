/**
 * 代码块复制功能
 * 为代码块添加复制按钮，并实现复制功能
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('代码复制功能初始化');
  
  // 移除可能已存在的所有按钮
  document.querySelectorAll('.code-copy-button').forEach(btn => btn.remove());
  document.querySelectorAll('.code-block-wrapper').forEach(wrapper => {
    // 如果包装器只包含pre元素，就把pre元素提取出来
    const pre = wrapper.querySelector('pre');
    if (pre && wrapper.childNodes.length === 1) {
      wrapper.parentNode.insertBefore(pre, wrapper);
      wrapper.remove();
    }
  });
  
  // 查找所有代码块
  const codeBlocks = document.querySelectorAll('pre');
  console.log('找到代码块数量:', codeBlocks.length);
  
  // 为每个代码块添加复制按钮
  codeBlocks.forEach(function(preBlock, index) {
    console.log(`处理代码块 ${index+1}`);
    
    // 设置代码块样式
    preBlock.style.position = 'relative';
    preBlock.style.overflow = 'visible';
    
    // 创建复制按钮 - VuePress风格
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.setAttribute('aria-label', '复制代码');
    
    // 直接设置样式
    copyButton.style.position = 'absolute';
    copyButton.style.top = '8px';
    copyButton.style.right = '8px';
    copyButton.style.padding = '6px';
    copyButton.style.color = '#aaa';
    copyButton.style.background = 'rgba(220, 220, 220, 0.8)';
    copyButton.style.borderRadius = '4px 0 0 4px';
    copyButton.style.fontSize = '12px';
    copyButton.style.zIndex = '999';
    copyButton.style.opacity = '0';
    copyButton.style.transition = 'opacity 0.2s';
    
    copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
      </svg>
    `;
    
    // 将按钮直接添加到代码块
    preBlock.appendChild(copyButton);
    console.log(`添加了复制按钮到代码块 ${index+1}`);
    
    // 添加悬停事件
    preBlock.addEventListener('mouseenter', function() {
      console.log(`代码块 ${index+1} 鼠标进入`);
      copyButton.style.opacity = '1';
    });
    
    preBlock.addEventListener('mouseleave', function() {
      console.log(`代码块 ${index+1} 鼠标离开`);
      copyButton.style.opacity = '0';
    });
    
    // 添加点击事件监听器
    copyButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('复制按钮被点击');
      
      // 获取代码文本
      let code;
      const codeEl = preBlock.querySelector('code');
      if (codeEl) {
        code = codeEl.textContent;
      } else {
        code = preBlock.textContent;
      }
      
      // 使用现代 Clipboard API
      navigator.clipboard.writeText(code)
        .then(() => {
          console.log('复制成功');
          // 显示成功状态
          copyButton.style.color = '#10B981'; // 绿色
          
          // 更新图标为勾选标记
          copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          `;
          
          // 2秒后恢复原样
          setTimeout(() => {
            copyButton.style.color = '#aaa';
            copyButton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            `;
          }, 2000);
        })
        .catch(err => {
          console.error('复制失败:', err);
          copyButton.style.color = '#EF4444'; // 红色
        });
      
      return false;
    });
  });
  
  // 添加全局样式以确保复制按钮正确显示
  if (!document.getElementById('code-copy-styles')) {
    const style = document.createElement('style');
    style.id = 'code-copy-styles';
    style.textContent = `
      pre { position: relative !important; overflow: visible !important; }
      pre:hover .code-copy-button { opacity: 1 !important; }
      .code-copy-button:hover { color: #4B5563 !important; }
    `;
    document.head.appendChild(style);
    console.log('添加了全局样式');
  }
}); 