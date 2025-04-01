/**
 * 文档列表查询工具
 * 用于从Cloudflare KV存储中获取并展示所有已上传的文档信息
 * 使用--namespace-id参数直接查询远程KV存储
 */
const { exec } = require('child_process');

// KV存储配置
const namespaceId = 'bafaf13435d348f59e9aa2b8917ac339'; // KV命名空间ID

/**
 * 执行命令行命令的Promise包装函数
 * @param {string} command - 要执行的命令
 * @returns {Promise<string>} 命令执行结果
 */
const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    console.log(`执行命令: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('命令执行错误:', error);
        console.error('错误输出:', stderr);
        reject(error);
        return;
      }
      console.log('命令执行成功！');
      resolve(stdout);
    });
  });
};

/**
 * 主函数 - 程序入口点
 * 获取并展示所有KV存储中的文档
 */
const main = async () => {
  try {
    console.log('正在获取所有文档列表...');
    
    // 构建列表命令 - 使用namespace-id参数和remote标志
    const command = `wrangler kv key list --namespace-id=${namespaceId} --remote`;
    const result = await execCommand(command);
    
    console.log('所有已上传的文档:');
    
    // 解析JSON响应并以表格形式展示
    try {
      const keys = JSON.parse(result);
      if (Array.isArray(keys) && keys.length > 0) {
        // 格式化输出为表格形式
        console.log('\n文档列表:');
        console.log('==========================================');
        console.log('  文档Key\t\t\t最后更新时间');
        console.log('==========================================');
        keys.forEach(item => {
          // 处理过期时间显示逻辑
          let timeInfo = "永不过期";
          if (item.expiration) {
            // 将UNIX时间戳转换为可读格式
            const date = new Date(item.expiration * 1000);
            timeInfo = date.toLocaleString();
          }
          console.log(`  ${item.name}\t\t${timeInfo}`);
        });
        console.log('==========================================');
        console.log(`总计: ${keys.length} 个文档`);
      } else {
        console.log('没有找到任何文档。');
      }
    } catch (e) {
      // 处理JSON解析错误
      console.error('无法解析返回结果:', e);
      console.log('原始返回结果:', result);
    }
  } catch (error) {
    console.error('获取文档列表失败:', error);
    process.exit(1); // 发生错误时退出程序
  }
};

// 运行主函数
main(); 