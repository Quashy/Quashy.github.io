# 秦晖洋的个人博客

基于 [VitePress](https://vitepress.dev/zh/) 搭建的个人博客。

🌐 站点地址：<https://quashy.github.io/>

## 文章列表

| 日期 | 标题 |
|------|------|
| 2026-08-18 | [一次登录，到底发生了什么：从 Session 到 SSO、OAuth 2.0、OIDC 与 SAML](https://quashy.github.io/2026/understanding-sso-auth-protocols) |
| 2026-07-19 | [从全拼到双拼：我为什么做了「并击」](https://quashy.github.io/2026/from-quanpin-to-shuangpin) |
| 2026-07-16 | [如何参与开源项目](https://quashy.github.io/2026/how-to-contribute-to-open-source) |
| 2026-07-14 | [人生设计：探索你的现在](https://quashy.github.io/2026/designing-your-life) |
| 2026-06-30 | [OpenCode GO 接入 CC Switch 指南](https://quashy.github.io/2026/opencode-go-ccw) |

## 工程结构

```
personalspace
├─ .github              # GitHub 配置
│  └─ workflows         # 自动构建部署配置
├─ docs                 # 博客内容
│   ├─ .vitepress
│   │  ├─ config.ts     # VitePress 配置
│   │  ├─ cache         # 缓存文件，可忽略提交
│   │  ├─ dist          # 构建产物
│   │  └─ theme         # 样式和主题
│   ├─ index.md         # 博客首页
│   ├─ 2026             # 按年份存放博文
│   └─ public           # 静态资源（图片等）
├─ .gitignore           # Git 提交忽略配置
├─ AGENTS.md            # AI 工具协作与文章发布规范
├─ package.json         # Node.js 配置
├─ pnpm-lock.yaml       # 依赖锁定版本号
├─ pnpm-workspace.yaml  # pnpm 工作空间配置
└─ README.md            # 工程说明
```

## 工程开发

新增文章时，文章正文、侧边栏、顶部「文章」、首页「浏览文章」和本页文章列表必须同步更新；完整流程见 [`AGENTS.md`](./AGENTS.md)。

```bash
# 安装依赖
pnpm install

# 开发模式启动
pnpm docs:dev

# 手动构建
pnpm docs:build

# 预览构建成果
pnpm docs:preview
```

## Ref
- vitepress 安装 图片放大、访客统计、Mermaid 等插件：[https://vitepress.yiov.top/](https://vitepress.yiov.top/)
