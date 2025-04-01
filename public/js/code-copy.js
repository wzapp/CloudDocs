/**
 * 代码块复制功能
 * 为代码块添加复制按钮，并实现复制功能
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('代码复制功能初始化');
  
  // 查找所有代码块
  const codeBlocks = document.querySelectorAll('pre');
  console.log('找到代码块数量:', codeBlocks.length);
  
  // 为每个代码块添加复制按钮
  codeBlocks.forEach(function(preBlock, index) {
    // 创建包装容器
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    wrapper.style.position = 'relative'; // 强制设置相对定位
    
    // 将原始代码块插入到包装容器之前
    preBlock.parentNode.insertBefore(wrapper, preBlock);
    
    // 将代码块移动到包装容器中
    wrapper.appendChild(preBlock);
    
    // 创建复制按钮 - VuePress风格
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.setAttribute('aria-label', '复制代码');
    copyButton.style.position = 'absolute'; // 强制设置绝对定位
    copyButton.style.top = '0';
    copyButton.style.right = '0';
    copyButton.style.opacity = '0'; // 默认隐藏
    copyButton.style.zIndex = '999';
    
    copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
      </svg>
    `;
    
    // 将按钮添加到包装容器中
    wrapper.appendChild(copyButton);
    console.log(`添加了复制按钮到代码块 ${index+1}`);
    
    // 添加悬停事件，确保按钮显示
    wrapper.addEventListener('mouseenter', function() {
      copyButton.style.opacity = '1';
    });
    
    wrapper.addEventListener('mouseleave', function() {
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
          copyButton.classList.add('success');
          
          // 更新图标为勾选标记
          copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          `;
          
          // 2秒后恢复原样
          setTimeout(() => {
            copyButton.classList.remove('success');
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
        });
    });
  });
}); 