# LIMME 柠美（GitHub 可用版本）

这是一个可直接部署到 GitHub Pages 的静态前端原型项目。

## 项目结构

- `index.html`：页面结构
- `styles.css`：样式文件
- `app.js`：交互逻辑（页面切换、弹窗、消息提示）

## 本地预览

直接双击 `index.html` 即可打开，或使用任意静态服务器启动。

## 部署到 GitHub Pages

1. 新建一个 GitHub 仓库（例如 `limme-demo`）。
2. 将本目录文件全部上传到仓库根目录。
3. 打开仓库设置：`Settings -> Pages`。
4. 在 `Build and deployment` 中选择：
   - Source: `Deploy from a branch`
   - Branch: `main` / `root`
5. 保存后等待 1-3 分钟，访问生成的页面链接。

## 一键上传（已内置脚本）

- 双击运行：`双击运行-一键上传.bat`
- 或在 PowerShell 执行：`.\一键上传到GitHub.ps1`
- 脚本会自动执行：`git init`、`add`、`commit`、`push`
- 首次会提示输入仓库地址，例如：`https://github.com/你的用户名/limme-demo.git`

## 社媒分享 Logo（微信/朋友圈/社媒）

- 已在 `index.html` 配置 `og:*` 和 `twitter:*` 元信息
- 请把你的 Logo 图放到：`assets/share-logo.jpg`
- 当前分享图地址：`https://hochiminhshikun102-sys.github.io/lime/assets/share-logo.jpg`
- 微信有缓存，更新图片后可在微信里重新发送一次链接或等待缓存刷新

## 已修复的问题

- 补齐原代码中的 `switchPage` 缺失问题（避免点击底部导航报错）。
- 移除大量内联 `onclick`，改为统一事件绑定，更适合维护。
- 拆分 HTML/CSS/JS，方便后续协作与 GitHub 版本管理。
