# 更新日志

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