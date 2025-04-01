/**
 * 文档批量上传工具
 * 将docs目录下的所有Markdown文件上传到Cloudflare KV存储
 * 使用--namespace-id参数直接操作远程KV存储
 */
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 配置参数
const docsDir = './docs';            // 文档目录路径
const maxRetries = 3;                // 上传失败时的最大重试次数
const retryDelay = 2000;             // 重试间隔时间(毫秒)
const namespaceId = 'bafaf13435d348f59e9aa2b8917ac339'; // KV命名空间ID

/**
 * 延迟函数 - 用于实现重试间隔
 * @param {number} ms - 延迟时间(毫秒)
 * @returns {Promise} 延迟完成后解析的Promise
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 执行命令行命令的Promise包装函数
 * @param {string} command - 要执行的命令
 * @returns {Promise<string>} 命令执行结果
 */
const execPromise = (command) => {
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
 * 上传单个文件到KV存储
 * @param {string} filePath - 文件路径
 * @param {number} retryCount - 当前重试次数
 * @returns {Promise<string>} 成功时返回文件内容
 */
const uploadFile = async (filePath, retryCount = 0) => {
  try {
    // 获取完整文件名作为key
    const fileName = path.basename(filePath);
    
    // 使用namespace-id参数直接操作远程KV存储
    const uploadCommand = `wrangler kv key put --namespace-id ${namespaceId} "${fileName}" --path="${filePath}" --remote`;
    console.log(`准备上传文件: ${fileName}`);
    
    try {
      // 执行上传命令
      const result = await execPromise(uploadCommand);
      console.log(`上传结果: ${result}`);
      
      // 验证上传是否成功 - 通过获取刚上传的内容
      const verifyCommand = `wrangler kv key get --namespace-id ${namespaceId} "${fileName}" --remote`;
      try {
        const content = await execPromise(verifyCommand);
        console.log(`验证成功，内容长度: ${content.length}`);
        return content;
      } catch (verifyError) {
        console.error(`验证失败: ${verifyError}`);
        throw verifyError;
      }
    } catch (uploadError) {
      // 处理上传失败 - 实现重试逻辑
      if (retryCount < maxRetries) {
        console.log(`上传 ${fileName} 失败，${retryDelay/1000}秒后重试...`);
        await delay(retryDelay);
        return uploadFile(filePath, retryCount + 1); // 递归调用自身进行重试
      } else {
        throw uploadError; // 超过最大重试次数，抛出错误
      }
    }
  } catch (error) {
    console.error('上传过程中发生错误:', error);
    throw error;
  }
};

/**
 * 主函数 - 程序入口点
 * 读取文档目录中的所有Markdown文件并上传
 */
const main = async () => {
  try {
    // 获取所有.md文件的完整路径
    const files = fs.readdirSync(docsDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(docsDir, file));
    
    console.log(`找到 ${files.length} 个Markdown文件`);
    
    // 逐个上传文件
    for (const filePath of files) {
      try {
        await uploadFile(filePath);
        const fileName = path.basename(filePath);
        console.log(`成功处理文件: ${fileName}`);
      } catch (error) {
        const fileName = path.basename(filePath);
        console.error(`上传 ${fileName} 最终失败:`, error);
        // 继续处理下一个文件，而不是中断整个过程
      }
    }
    
    console.log('所有文件上传完成！');
  } catch (error) {
    console.error('程序执行出错:', error);
    process.exit(1); // 发生严重错误时退出程序
  }
};

// 运行主函数
main(); 