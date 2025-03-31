# 项目上传到 GitHub 指南

本文档提供了将本项目上传到 GitHub 的详细步骤。

## 1. 在 GitHub 上创建新仓库

1. 打开 GitHub 网站 (https://github.com)，确保已登录
2. 点击右上角的"+"图标，选择"New repository"
3. 填写仓库名称，建议使用"cloudocs"或其他有意义的名称
4. 可选：添加仓库描述，例如"基于 Cloudflare Workers 的在线文档系统"
5. 选择仓库可见性（公开或私有）
6. 不要选择"使用 README 初始化仓库"选项
7. 点击"Create repository"按钮创建仓库

## 2. 在本地项目中初始化 Git

1. 打开命令行工具，确保已定位到项目根目录
2. 初始化 Git 仓库：
   ```bash
   git init
   ```
3. 配置用户信息（如果尚未配置）：
   ```bash
   git config --global user.name "你的 GitHub 用户名"
   git config --global user.email "你的 GitHub 邮箱"
   ```

## 3. 创建 .gitignore 文件

在项目根目录创建 `.gitignore` 文件，排除不需要版本控制的文件：

```bash
node_modules
.wrangler
.env
.dev.vars
dist
.DS_Store
.log
*.log
```

## 4. 添加并提交文件

1. 添加所有文件到暂存区：
   ```bash
   git add .
   ```
2. 提交文件到本地仓库：
   ```bash
   git commit -m "初始化提交：在线文档系统"
   ```

## 5. 连接本地仓库与 GitHub 远程仓库

添加远程仓库地址（使用 GitHub 上仓库页面提供的 URL）：

```bash
git remote add origin https://github.com/你的用户名/仓库名称.git
```

或者如果使用 SSH：

```bash
git remote add origin git@github.com:你的用户名/仓库名称.git
```

## 6. 推送代码到 GitHub

推送代码到主分支：

```bash
git push -u origin main
```

如果本地分支是 master 而不是 main：

```bash
git push -u origin master
```

## 7. 验证上传结果

1. 刷新 GitHub 仓库页面，确认所有文件已成功上传
2. 检查仓库结构是否完整，所有需要的文件是否都存在

## 常见问题处理

- 如果 `git push` 失败并显示"拒绝合并不相关的历史"错误，可使用：
  ```bash
  git pull --allow-unrelated-histories origin main
  ```
  然后再次尝试推送

- 如果是大文件导致问题，可以考虑使用 Git LFS 或修改 .gitignore 排除大文件

- 如果需要处理冲突，请解决冲突后再次提交和推送

## 后续维护

完成初始上传后，您可以通过以下命令更新远程仓库：

```bash
git add .
git commit -m "更新说明"
git push
```
```

## 2. 将文档添加到项目的文档库中

创建文件后，需要将此文档上传到 KV 存储，以便在文档系统中显示：

1. 确保您已经将文件保存到 `docs/github-upload.md`

2. 使用 wrangler 命令上传文档：
   ```bash
   wrangler kv:key put --binding=DOCS "github-upload.md" --path=docs/github-upload.md
   ```

3. 验证文档是否成功上传：
   ```bash
   wrangler kv:key get --binding=DOCS "github-upload.md"
   ```

4. 在文档导航中添加此文档的链接（可以编辑 `src/template.js` 文件，在导航菜单中添加指向 `/docs/github-upload` 的链接）

完成这些步骤后，您就可以在文档系统中通过 `/docs/github-upload` 路径访问这篇新添加的文档了。