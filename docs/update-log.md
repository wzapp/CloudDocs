# 更新日志

## 2025-05-15：增加暗黑模式支持

### 功能更新
1. **暗黑模式支持**：
   - 新增网站暗黑模式切换功能，提升用户阅读体验
   - 自动检测系统偏好设置，支持手动切换
   - 增加主题切换按钮，方便用户随时切换
   - 所有元素适配暗黑模式，提供良好的视觉体验

2. **暗黑模式界面优化**：
   - 精心设计的暗色配色方案，减少用眼疲劳
   - 优化代码块、表格、图片等元素在暗黑模式下的显示效果
   - 特别优化了阅读核心内容的对比度和可读性
   - 保持品牌色调的一致性和辨识度

3. **技术升级**：
   - 更新Tailwind CSS配置，启用"class"模式的暗黑模式策略
   - 为所有UI组件添加暗黑模式样式变体
   - 优化CSS构建流程，减小最终样式文件体积
   - 添加主题持久化存储，记住用户的主题偏好

### 技术实现
1. 在`tailwind.config.js`中：
   ```javascript
   module.exports = {
     darkMode: 'class',
     // 其他配置
     theme: {
       extend: {
         // 暗黑模式排版配置
         typography: {
           dark: {
             css: {
               color: '#e5e7eb',
               'h1, h2, h3, h4': {
                 color: '#f3f4f6',
               },
               // 其他暗黑模式文本样式
             },
           },
         },
       },
     },
   }
   ```

2. 主题切换JavaScript：
   ```javascript
   // 检查当前主题，如果是暗黑模式则添加dark类
   if (localStorage.theme === 'dark' || 
       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
     document.documentElement.classList.add('dark')
   } else {
     document.documentElement.classList.remove('dark')
   }
   
   // 主题切换事件监听
   themeToggle.addEventListener('click', () => {
     const isDark = document.documentElement.classList.toggle('dark');
     localStorage.theme = isDark ? 'dark' : 'light';
   });
   ```

### 新增和修改文件
- `tailwind.config.js`：更新暗黑模式配置
- `public/js/theme.js`：新增主题切换逻辑
- `src/css/input.css`：为所有组件添加暗黑模式样式
- `src/template.js`：更新HTML模板，添加暗黑模式切换按钮
- `src/index.js`：添加JS静态文件服务配置

### 使用体验改进
- 用户可以通过顶部菜单中的主题切换按钮切换亮/暗模式
- 网站会记住用户的主题偏好，下次访问时自动应用
- 首次访问时会根据用户的系统设置自动应用相应主题
- 所有内容在暗黑模式下更易于阅读，减少视觉疲劳

## 2025-05-01：CloudDocs v2.0 正式发布

我们很高兴地宣布 CloudDocs v2.0 正式发布！这是一次重大更新，带来了全面的用户体验优化和功能增强。详细发布说明请查看[v2.0版本说明](v2.0-release-notes.md)。

### 主要更新亮点

1. **导航系统重构**：多级导航支持、智能折叠、动态高亮
2. **性能优化**：页面加载速度提升、懒加载支持、缓存策略优化
3. **文档功能增强**：搜索功能增强、学习资料分区、版本控制
4. **界面设计升级**：视觉风格优化、响应式布局完善、无障碍设计

### 安装与升级

从 v1.x 升级到 v2.0 的步骤：

```bash
# 拉取最新代码
git pull origin v2.0

# 安装新依赖
npm install

# 部署更新
wrangler deploy
```

## 2025-04-15：优化导航系统和用户界面

### 功能更新
1. **导航菜单交互优化**：
   - 修改了左侧导航菜单的展开/折叠逻辑，提供更平滑的用户体验
   - 添加了视觉指示器（箭头动画），明确显示导航状态
   - 优化了移动端和桌面端的导航行为

2. **导航结构优化**：
   - 新增"学习资料"一级导航分类
   - 包含教程指南、示例代码和最佳实践等子项
   - 保持与文档导航一致的视觉风格

3. **二级导航样式升级**：
   - 为活动状态的导航项添加背景色和文本颜色变化
   - 改进悬停效果，提供更好的视觉反馈
   - 确保当前页面导航项突出显示，便于用户定位

4. **文档编码优化**：
   - 修复了文件的中文字符编码问题
   - 确保所有中文显示正常，避免乱码

### 技术实现
1. 在`src/template.js`中：
   ```javascript
   // 添加导航组折叠/展开功能
   document.querySelectorAll('.nav-group-header').forEach(header => {
     // 根据当前路径初始化展开状态
     if (currentPath.startsWith('/' + group + '/')) {
       header.classList.add('expanded');
       content.classList.add('expanded');
       header.querySelector('svg').style.transform = 'rotate(0deg)';
     }

     // 点击标题切换展开状态
     header.addEventListener('click', (e) => {
       // ...展开/折叠逻辑
     });
   });
   ```

2. 新增二级导航激活样式：
   ```css
   /* 激活状态样式 */
   .nav-group-item.active {
     background-color: rgba(14, 165, 233, 0.1);
     color: #0EA5E9;
     font-weight: 500;
   }

   .nav-group-item.active:hover {
     background-color: rgba(14, 165, 233, 0.15);
   }
   ```

### 新增和修改文件
- `upload-single-doc.js`：修复了编码问题，确保中文正常显示
- `src/template.js`：更新了导航菜单的HTML结构、CSS样式和JavaScript交互逻辑

### 使用体验改进
- 访问特定文档页面时，对应的导航分类会自动展开
- 当前页面的导航项会高亮显示
- 可通过点击一级分类标题展开/折叠子项
- 导航逻辑更加智能，能够根据当前页面路径自动适应

## 2025-04-01：修复KV文档上传BUG

### 问题描述
在使用Wrangler上传文档到Cloudflare KV存储时，发现使用`--binding=DOCS`参数的方法只能更新本地KV存储，而无法将文档实际上传到Cloudflare的远程KV存储。

### 原因分析
1. Wrangler命令行工具在使用`--binding`参数时，默认只操作本地KV存储，除非特别指定`--remote`标志。
2. 使用`--namespace-id`参数可以直接操作远程KV存储，更加可靠。

### 解决方案
1. 修改上传脚本，替换`--binding=DOCS`为`--namespace-id=<ID>`参数
2. 添加`--remote`标志确保操作的是远程KV存储
3. 在文件验证过程中也使用相同的参数设置
4. 创建单文件上传工具以简化特定文档的更新流程

### 具体修改
1. 在`upload-docs.js`中：
   ```javascript
   // 旧代码
   const uploadCommand = `wrangler kv key put --binding=DOCS "${fileName}" --path="${filePath}"`;
   
   // 新代码
   const namespaceId = 'bafaf13435d348f59e9aa2b8917ac339';
   const uploadCommand = `wrangler kv key put --namespace-id ${namespaceId} "${fileName}" --path="${filePath}" --remote`;
   ```

2. 在`list-docs.js`中：
   ```javascript
   // 旧代码
   const command = `wrangler kv key list --binding=DOCS`;
   
   // 新代码
   const namespaceId = 'bafaf13435d348f59e9aa2b8917ac339';
   const command = `wrangler kv key list --namespace-id=${namespaceId} --remote`;
   ```

3. 创建了新的`upload-single-doc.js`工具，提供交互式界面选择和上传单个文档。

### 上传流程
1. 使用修改后的脚本上传文档到KV存储
2. 运行`wrangler deploy`命令部署Worker应用
3. 验证文档是否已更新

### 注意事项
- 使用`--namespace-id`参数时不需要指定环境(`--env`)
- 上传后需要重新部署Worker才能让更改生效
- 命名空间ID可在`wrangler.toml`配置文件中找到 