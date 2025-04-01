/**
 * 单个文档上传工具
 * 提供交互式界面，允许用户选择并上传单个文档到Cloudflare KV存储
 * 使用--namespace-id参数直接操作远程KV存储
 */
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const readline = require('readline');  // Node.js内置模块，用于处理命令行交互

// 配置参数
const docsDir = './docs';            // 文档目录路径
const namespaceId = 'bafaf13435d348f59e9aa2b8917ac339'; // KV命名空间ID  

/**
 * 创建readline接口，用于命令行交互
 * 允许从stdin读取输入并输出到stdout
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
 * @returns {Promise<boolean>} 上传是否成功
 */
const uploadFile = async (filePath) => {
  try {
    // 获取完整文件名作为key
    const fileName = path.basename(filePath);

    // 构建上传命令 - 使用namespace-id参数和remote标志
    const uploadCommand = `wrangler kv key put --namespace-id ${namespaceId} "${fileName}" --path="${filePath}" --remote`;
    console.log(`准备上传文件: ${fileName}`);

    // 执行上传操作
    const result = await execPromise(uploadCommand);
    console.log(`上传结果: ${result}`);

    // 验证上传是否成功 - 通过获取刚上传的内容
    const verifyCommand = `wrangler kv key get --namespace-id ${namespaceId} "${fileName}" --remote`;
    const content = await execPromise(verifyCommand);
    console.log(`验证成功，内容长度: ${content.length}`);
    console.log(`文件 ${fileName} 上传成功！`);
    
    return true;
  } catch (error) {
    console.error('上传过程中发生错误:', error);
    return false;
  }
};

/**
 * 显示可用文件列表
 * 读取docs目录并展示所有Markdown文件
 * @returns {string[]} 可用的文件名数组
 */
const listAvailableFiles = () => {
  try {
    // 读取docs目录下的所有.md文件
    const files = fs.readdirSync(docsDir)
      .filter(file => file.endsWith('.md'));

    if (files.length === 0) {
      console.log('文档目录中没有找到任何.md文件');
      return [];
    }

    // 格式化输出可用文件列表
    console.log('\n可上传的文档列表:');
    console.log('==========================================');
    files.forEach((file, index) => {
      console.log(`  ${index + 1}. ${file}`);
    });
    console.log('==========================================');

    return files;
  } catch (error) {
    console.error('获取文档列表失败:', error);
    return [];
  }
};

/**
 * 主函数 - 程序入口点
 * 实现交互式文件选择和上传流程
 */
const main = async () => {
  try {
    console.log('单个文档上传工具');
    console.log('==========================================');

    // 获取并显示可用的文件列表
    const files = listAvailableFiles();
    if (files.length === 0) {
      rl.close();
      return;
    }

    // 提示用户选择要上传的文件
    rl.question('\n请输入要上传的文件编号或文件名: ', async (answer) => {
      let selectedFile = '';

      // 处理用户输入 - 可以是编号或文件名
      const fileIndex = parseInt(answer, 10);
      if (!isNaN(fileIndex) && fileIndex > 0 && fileIndex <= files.length) { 
        // 用户输入的是文件编号
        selectedFile = files[fileIndex - 1];
      } else {
        // 尝试将用户输入匹配为文件名
        if (files.includes(answer)) {
          selectedFile = answer;
        } else if (files.includes(`${answer}.md`)) {
          // 自动添加.md扩展名
          selectedFile = `${answer}.md`;
        } else {
          console.log('没有找到指定的文件，请检查文件名或编号是否正确。');
          rl.close();
          return;
        }
      }

      const filePath = path.join(docsDir, selectedFile);
      console.log(`您选择上传的文件是: ${selectedFile}`);

      // 确认上传操作
      rl.question('确认上传? (y/n): ', async (confirm) => {
        if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
          // 用户确认，执行上传
          const result = await uploadFile(filePath);
          if (result) {
            console.log('\n文件已成功上传到Cloudflare KV存储！');  
            console.log('不要忘记运行 wrangler deploy 命令以部署最新版本的Worker。');
          } else {
            console.log('\n文件上传失败，请检查错误信息并重试。');
          }
        } else {
          // 用户取消上传
          console.log('已取消上传操作。');
        }
        rl.close(); // 关闭readline接口
      });
    });
  } catch (error) {
    console.error('程序执行出错:', error);
    rl.close();
    process.exit(1); // 发生严重错误时退出程序
  }
};

// 运行主函数
main(); 