const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const docsDir = './docs';
const namespaceId = 'bafaf13435d348f59e9aa2b8917ac339';

// 读取docs目录下的所有.md文件
fs.readdir(docsDir, (err, files) => {
  if (err) {
    console.error('读取目录失败:', err);
    return;
  }

  // 过滤出.md文件
  const mdFiles = files.filter(file => file.endsWith('.md'));

  // 逐个上传文件
  mdFiles.forEach(file => {
    const filePath = path.join(docsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 使用wrangler命令上传文件内容到远程KV
    const command = `wrangler kv key put --binding=DOCS "${file}" --path="${filePath}" --remote`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`上传 ${file} 失败:`, error);
        return;
      }
      console.log(`成功上传 ${file}`);
      console.log(stdout);

      // 验证上传的内容
      exec(`wrangler kv key get --binding=DOCS "${file}" --remote`, (error, stdout, stderr) => {
        if (error) {
          console.error(`验证 ${file} 失败:`, error);
          return;
        }
        console.log(`验证 ${file} 成功，内容：`, stdout);
      });
    });
  });
}); 