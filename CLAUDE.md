# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

基于 [VitePress](https://vitepress.dev/zh/) 搭建的个人技术博客（秦晖洋），部署于 GitHub Pages（`Quashy.github.io`）。站点语言为 `zh-CN`。

## 常用命令

```bash
pnpm install          # 安装依赖（必须使用 pnpm，版本 ^11.7.0）
pnpm docs:dev         # 开发模式启动本地服务器（支持热更新）
pnpm docs:build       # 构建生产产物到 docs/.vitepress/dist
pnpm docs:preview     # 本地预览构建产物
```

无测试套件、无 lint 脚本。验证变更的方式：本地运行 `pnpm docs:dev` 或 `pnpm docs:build` 后 `pnpm docs:preview`。

## 架构

### 内容与配置分离

- `docs/` 为内容根目录，其中 `.vitepress/` 存放配置与主题，其余子目录按年份存放博文。
- `docs/index.md` — 首页（使用 VitePress `home` layout + frontmatter 配置 hero/features）。
- `docs/{year}/` — 按年份分目录组织文章（当前仅有 `2026/`）。新增文章时需在 `docs/.vitepress/config.ts` 的 `sidebar` 中登记，并在必要时更新 `nav`。
- Markdown 文件可通过 frontmatter 控制行为（如 `outline: deep`、`layout: home`）。

### VitePress 配置（`docs/.vitepress/config.ts`）

集中管理站点元信息、顶部导航（`nav`）、侧边栏（`sidebar`）、本地搜索、社交链接、大纲级别等。配置文件内含较完整的中文注释，修改前应先阅读以理解各字段含义。

### 主题自定义（`docs/.vitepress/theme/`）

- `index.ts` — 继承默认主题，通过 `Layout` 插槽扩展页面结构。
- `style.css` — 通过覆盖 VitePress CSS 变量（`--vp-c-*`、`--vp-button-*`、`--vp-home-hero-*` 等）实现主题配色，不修改组件结构。

### 部署（`.github/workflows/deploy.yml`）

- 触发条件：推送至 `master` 分支，或手动 `workflow_dispatch`。
- 运行环境：Ubuntu + Node 22 + pnpm 11。
- 流程：`pnpm install` → `pnpm run docs:build` → 上传 `docs/.vitepress/dist` 至 GitHub Pages。
- 本地构建产物目录与 CI 一致，均为 `docs/.vitepress/dist`（已加入 `.gitignore`）。

## 约定

- **包管理器固定为 pnpm**：`package.json` 通过 `devEngines.packageManager` 锁定 pnpm ^11.7.0；CI 也使用 pnpm 11。请勿改用 npm/yarn，避免 lockfile 冲突。
- **注释语言**：现有配置与文档注释均为简体中文，新增注释请保持一致。
- **文章发布流程**：以仓库根目录 `AGENTS.md` 的「新文章发布协议」为准。文章正文、侧边栏、顶部「文章」、首页「浏览文章」和 README 文章列表必须同步更新，再推送至 `master` 触发自动部署。
- **构建产物与缓存**：`docs/.vitepress/dist` 和 `docs/.vitepress/cache` 已被 `.gitignore` 忽略，无需手动清理。
- **`.claude` 目录**已被 `.gitignore` 忽略。

## 内容迁移工作流（Obsidian → VitePress）

博文源稿存放于 Obsidian 笔记库（如 `D:\QuashyFlies\Obsidian笔记\实习\<标题>.md`），发布时需转换为 VitePress 兼容格式。以下为可复用的迁移步骤，供后续发布新文章时参照：

### 1. 图片资源处理

- Obsidian 默认图片名为 `Pasted image <时间戳>.png`（含空格），存放在笔记同级的 `img/` 目录。
- **复制而非移动**源文件到 `docs/public/<文章 slug>/` 子目录，保留 Obsidian 原件。
- **语义化重命名**：按文章中出现顺序重命名为 `01.png`、`02.png`…，避免空格与无意义命名，便于长期维护。
- 源路径含空格时，`cp` 命令需用双引号包裹：`cp "源路径" "目标路径"`。
- 若同一张图在源文中重复出现，迁移时**删除冗余引用**，仅保留首次出现处。

### 2. Markdown 内容转换

- **Frontmatter**：添加 `title: <博客标题>` 与 `outline: deep`，并在正文保留与标题一致的 `#` 一级标题，延续现有文章结构。
- **标题层级**：源稿常用 `###`（h3）作为章节标题，迁移时**提升为 `##`（h2）**，以匹配 `config.ts` 中 `outline: { level: [2, 3] }` 配置，让右侧目录正常展示。
- **图片路径改写**：`![](img/Pasted image *.png)` → `![描述性 alt 文本](/<slug>/NN.png)`，使用根路径引用并补充有意义的 alt。
- 保留原文的文字内容、列表、引用块、分隔线 `---`、外部链接等结构。

### 3. 站点配置登记

发布新文章需同步更新四个发现入口，所有入口使用同一文章路由：

- `docs/.vitepress/config.ts` 的 `sidebar`：在对应年份分组 `items` 中登记新文章。
- `docs/.vitepress/config.ts` 的 `nav`：若「文章」入口需指向最新文章则更新。
- `docs/index.md` 的 `hero.actions`：「浏览文章」按钮 `link` 指向新文章。
- `README.md` 的文章列表：在顶部新增发布日期、标题和完整线上链接。

### 4. 验证与提交

- 运行 `pnpm docs:build` 确认无报错（图片路径错误、frontmatter 语法错误均会在此暴露）。
- 可选 `pnpm docs:dev` 人工复核：图片加载、链接跳转、右侧目录、本地搜索。
- 文章 slug 使用英文短横线命名（如 `opencode-go-ccw`）；正文文件为 `docs/{year}/YYYY-MM-DD-<slug>.md`，日期与 frontmatter `date` 一致。`docs/public/<slug>/` 与公开路由仍只使用 slug，构建时由 `rewrites` 移除正文文件的日期前缀。
