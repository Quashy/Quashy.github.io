# AGENTS.md

本文件为在本仓库中工作的 AI 编码工具与维护者提供统一约束，适用于整个仓库。用户在当前任务中的明确要求优先于本文件；若子目录以后出现更具体的 `AGENTS.md`，则以离目标文件最近的规则为准。

## 项目概览

- 这是秦晖洋的个人技术博客，使用 VitePress 1.x 构建，站点语言为简体中文。
- 线上地址为 <https://quashy.github.io/>，代码仓库为 <https://github.com/Quashy/Quashy.github.io>。
- 包管理器固定为 pnpm 11，Node.js 版本不得低于 22。
- `master` 分支的每次推送都会触发 GitHub Actions，并将静态产物部署到 GitHub Pages。
- 站点没有自建后端；主题中的阅读量和访问量由不蒜子提供。

## 目录与职责

| 路径 | 职责 |
| --- | --- |
| `docs/index.md` | 博客首页，以及「浏览文章」入口 |
| `docs/{year}/YYYY-MM-DD-<slug>.md` | 按年份保存的文章正文，文件名日期前缀用于 IDE 排序 |
| `docs/public/<slug>/` | 文章本地图片等静态资源 |
| `docs/.vitepress/config.ts` | 顶部导航、侧边栏、搜索和站点元信息 |
| `docs/.vitepress/theme/` | 自定义样式、图片缩放和不蒜子统计逻辑 |
| `README.md` | 仓库说明及按发布时间倒序排列的文章列表 |
| `.github/workflows/deploy.yml` | GitHub Pages 构建与部署流程 |
| `CLAUDE.md` | 面向 Claude Code 的补充说明，不得与本文件冲突 |

不要手工修改或提交 `node_modules/`、`docs/.vitepress/cache/`、`docs/.vitepress/dist/` 等可再生成内容。

## 常用命令

```bash
pnpm install
pnpm docs:dev
pnpm docs:build
pnpm docs:preview
```

- 依赖安装和变更只使用 pnpm，并同步维护 `pnpm-lock.yaml`。
- 本仓库目前没有有效的测试或 Lint 脚本，`pnpm test` 会固定失败，不要把它当成验证命令。
- 文档、配置或主题代码发生变化后，至少运行一次 `pnpm docs:build`。

## 通用改动原则

- 先阅读相关文件和 `git status`，保留用户已有的未提交或未跟踪文件。
- 改动应保持单一目的；不要顺手重构无关代码、升级依赖或批量格式化。
- 注释、提交说明和用户可见文案使用简体中文。
- 中文正文使用全角标点和中文引号「」，代码、路径、命令及标识符使用反引号。
- 沿用相邻文件的格式，不为当前需求引入额外框架、组件或自动化依赖。
- 未经用户明确要求，不执行提交、推送、变基、重置或发布。

## 文章内容约定

- 文件名使用 `YYYY-MM-DD-<slug>.md`，其中日期必须与 frontmatter `date` 的日期部分一致，slug 使用英文小写短横线，例如 `2026-07-19-from-quanpin-to-shuangpin.md`。
- `docs/.vitepress/config.ts` 的 `rewrites` 会在构建路由中移除日期前缀；导航、侧边栏、README 和站内链接始终使用不含日期前缀的稳定公开路由，例如 `/2026/from-quanpin-to-shuangpin`。
- 文章至少包含 `date`、`title` 和 `outline: deep` frontmatter，并在正文保留与标题一致的一级标题。`date` 格式为 `YYYY-MM-DD HH:mm`（北京时间），供 RSS 订阅源生成准确的发布时间。
- 正文章节以二级标题为主，需要细分时使用三级标题，使右侧目录能够正确生成。
- 图片复制到 `docs/public/<slug>/`，使用 `01.png`、`02.png` 等稳定文件名；保留源文件，不执行移动或删除。
- Markdown 中使用根路径引用图片，例如 `![说明](/<slug>/01.png)`，并提供有意义的替代文本。
- 引用外部资料时提供原始链接，提炼观点，不大段复制原文。

## 新文章发布协议

发布一篇新文章是一项原子操作。文章正文与下面四个发现入口必须在同一批改动中完成；任何一项缺失，都视为发布尚未完成。

1. 新增 `docs/{year}/YYYY-MM-DD-<slug>.md`，并补齐其本地资源。
2. 在 `docs/.vitepress/config.ts` 对应年份的 `sidebar.items` 顶部登记文章。
3. 将 `docs/.vitepress/config.ts` 顶部导航「文章」的 `link` 更新为新文章路由。
4. 将 `docs/index.md` 首页「浏览文章」按钮的 `link` 更新为同一路由。
5. 在 `README.md` 的文章列表顶部新增日期、标题和完整线上链接。

统一先确定以下五个值，再复制到所有入口，避免手工重复拼写时产生漂移：

```text
发布日期：<YYYY-MM-DD HH:mm>（北京时间，与 README 文章列表中的日期保持一致）
文章标题：<title>
源文件名：<YYYY-MM-DD>-<slug>.md（日期与发布日期一致）
文章路由：/<year>/<slug>
线上链接：https://quashy.github.io/<year>/<slug>
```

### 最新文章判断

- 「最新」以确认发布的日期为准，不以文件修改时间、Git 状态或文件名排序推断。
- 侧边栏和 README 的文章按发布时间倒序排列，新文章应放在对应列表顶部。
- 只修改旧文章时，不要改动「文章」导航、首页「浏览文章」或列表顺序。
- 草稿、未跟踪文件和尚未决定发布的文章不得提前加入任何入口。
- 如果用户没有明确发布日期，使用实际发布当天的日期；无法判断时先向用户确认。

### 发布前机械检查

将示例变量替换为本次文章，再执行检查：

```powershell
$articleSlug = "from-quanpin-to-shuangpin"
$articleDate = "2026-07-19"
$articleRoute = "/2026/$articleSlug"

Test-Path -LiteralPath "docs/2026/$articleDate-$articleSlug.md"
rg -n --fixed-strings "$articleRoute" "docs/.vitepress/config.ts" "docs/index.md" "README.md"
pnpm docs:build
Test-Path -LiteralPath "docs/.vitepress/dist/2026/$articleSlug.html"
git diff --check
git status --short
```

路由搜索的预期结果为：

- `docs/.vitepress/config.ts` 出现两次：顶部导航一次、侧边栏一次。
- `docs/index.md` 出现一次：首页「浏览文章」按钮。
- `README.md` 出现一次：完整线上链接中包含相同路由。

如果结果数量不符，先修正入口，再继续提交。不要为了让检查通过而把同一路由写入无关位置。

## 主题与不蒜子统计

- `docs/.vitepress/theme/composables/useBusuanzi.ts` 是不蒜子请求的唯一加载入口，同时负责首次加载和 SPA 路由切换。
- 不要在 `config.ts` 的 `head` 中再次注入 `busuanzi.pure` 浏览器脚本；CDN 上的 npm 产物可能采用 CommonJS，并在浏览器中触发 `module is not defined`。
- 保留用于区分文章路径的 Referrer Policy；改动统计逻辑后检查首页直达、文章直达和站内跳转三种场景。
- JSONP 临时脚本和回调必须在成功、失败或超时后清理，不能在页面中持续累积。

## 验证标准

### 文章或配置变更

1. 运行 `pnpm docs:build`，确认 Markdown、frontmatter、图片和本地搜索索引均能生成。
2. 人工检查桌面和窄屏、浅色和深色模式下的标题、目录、图片及链接。
3. 从首页点击「浏览文章」，从顶部导航点击「文章」，确认两者都打开最新文章。
4. 检查侧边栏首项与 README 首行是否为同一篇文章。

### 主题代码或缺陷修复

1. 先确认可复现现象，再进行聚焦修改。
2. 运行 `pnpm docs:build`。
3. 使用本地站点验证首次加载、刷新、前进后退和站内路由切换。
4. 检查浏览器控制台，不得新增错误或警告。

### 所有改动

- 运行 `git diff --check`。
- 检查 `git status --short` 和完整 diff，确认没有构建产物、缓存、密钥、调试输出或无关文件。
- 工作区存在其他改动时，使用明确文件列表暂存，禁止使用 `git add -A` 或 `git add .` 将其混入提交。

## Git 与部署

- 提交保持单一目的。缺陷修复与发布流程文档等独立变更应拆分提交。
- 提交信息使用带 emoji 的 Conventional Commits，例如：
  - `🐛 fix(theme): 修复不蒜子首次加载报错`
  - `📝 docs(blog): 发布《文章标题》`
  - `📝 docs(blog): 规范文章发布流程`
- 推送 `master` 会立即触发线上部署；执行 `git commit` 和 `git push` 前必须再次确认用户授权与准确文件范围。
- 不使用 `git reset --hard`、强制推送或其他会丢失历史的操作。
- 推送后等待 GitHub Actions 成功，再在线检查首页入口、顶部导航、文章页面、图片和外链。失败时读取工作流日志，不要直接编辑构建产物。

## 完成定义

只有同时满足以下条件，才可以宣称一篇新文章已经发布：

- 文章和本地资源已纳入预期改动。
- 侧边栏、顶部「文章」、首页「浏览文章」和 README 已指向同一最新文章。
- 生产构建成功，Git diff 仅包含本次任务相关文件。
- 用户已明确授权提交和推送，提交记录边界清晰。
- GitHub Actions 部署成功，线上页面和各入口已实际验证。

## 参考项目

本文件的结构参考了 [OpenAI Codex 的 AGENTS.md](https://github.com/openai/codex/blob/main/AGENTS.md) 与 [Vercel AI SDK 的 AGENTS.md](https://github.com/vercel/ai/blob/main/AGENTS.md)，并按本博客的内容发布和 GitHub Pages 部署方式进行了收敛。
