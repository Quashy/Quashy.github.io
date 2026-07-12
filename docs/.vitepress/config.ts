import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

/**
 * VitePress 站点配置文件
 * 参考文档: https://vitepress.dev/reference/site-config
 */
export default withMermaid(
  defineConfig({
  // ========== 站点基本信息 ==========
  /** 页面语言，影响搜索分词、时间格式等 */
  lang: "zh-CN",
  /** 站点标题，显示在浏览器标签页和导航栏左侧 */
  title: "QinHuiYang 的博客",
  /** 站点描述，用于 SEO 元标签 */
  description: "秦晖洋的个人技术博客",

  /** 开启最后更新时间（基于 Git 提交记录） */
  lastUpdated: true,

  // ========== 第三方脚本注入 ==========
  /**
   * head: 注入到 HTML <head> 的标签
   * 当前用于不蒜子访客统计，脚本异步加载后会自动填充页面中
   * id="busuanzi_value_*" 的 span 文本（纯前端注入，无后端依赖）
   */
  head: [
    // 不蒜子脚本已从 ibruce.info 下线，改用 npm CDN 分发（API 端点相同，功能等价）
    ['script', { async: '', src: 'https://cdn.jsdelivr.net/npm/busuanzi.pure.js/busuanzi.pure.min.js' }]
  ],

  // ========== 主题配置 ==========
  themeConfig: {
    // 参考文档: https://vitepress.dev/reference/default-theme-config

    // ========== 顶部导航栏 ==========
    /**
     * nav: 顶部导航链接
     * - text: 显示的文本
     * - link: 点击后跳转的路径（'/' 为首页，'/xxx' 对应 docs/xxx.md）
     * - activeMatch: 可选，用于高亮当前页面的正则匹配
     */
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/2026/opencode-go-ccw' }
    ],

    // ========== 左侧边栏 ==========
    /**
     * sidebar: 侧边栏导航
     * 支持分组结构:
     *   - text: 分组标题（可折叠）
     *   - collapsed: 是否默认折叠，可选
     *   - items: 该分组下的页面列表
     * 也可以传 false 来禁用侧边栏
     *
     * 高级用法: 可以传入一个对象，为不同路径配置不同的侧边栏
     * sidebar: { '/guide/': guideSidebar, '/reference/': refSidebar }
     */
    sidebar: [
      {
        text: '2026',
        collapsed: true,
        items: [
          { text: 'OpenCode GO 接入 CC Switch 指南', link: '/2026/opencode-go-ccw' }
        ]
      },
    ],

    // ========== 社交链接 ==========
    /**
     * socialLinks: 导航栏右侧的社交图标
     * - icon: 图标类型，内置支持 'github' | 'twitter' | 'discord' | 等
     * - link: 跳转链接
     * - ariaLabel: 可选，无障碍标签
     */
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ExpiredCannedX' }
    ],

    // ========== 本地搜索 ==========
    search: {
      provider: 'local',
      options: {
        // 多语言搜索（支持中文分词）
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索' },
              modal: { noResultsText: '没有找到结果' }
            }
          }
        }
      }
    },

    // ========== 最后更新时间 ==========
    /** 在文章底部显示 Git 最后提交时间 */
    lastUpdated: { text: '最后更新于' },

    // ========== 右侧目录 ==========
    /** 只显示 h2 和 h3 标题 */
    outline: { level: [2, 3] },

    // ========== 更多可用配置项 ==========
    // logo: '/logo.svg',              // 导航栏 logo 图片路径
    // footer: { message: '...', copyright: '...' },  // 页脚
    // editLink: { pattern: '...' },   // "编辑此页"链接
  }
  }),
  {
    // Mermaid 配置（亮色模式生效，暗色模式由插件自动切换）
    mermaid: {
      // 参考: https://mermaid.js.org/config/schema-docs/config.html
    },
  }
)
