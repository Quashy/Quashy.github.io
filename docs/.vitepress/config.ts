import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { RssPlugin, RSSOptions } from 'vitepress-plugin-rss'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

// dayjs UTC 插件：将 Git lastUpdated 时间戳格式化为 ISO 8601（用于 article:modified_time）
dayjs.extend(utc)

/**
 * 站点常量（集中管理，避免散落多处）
 * - SITE_URL：站点根 URL，无尾斜杠，作为 canonical / og:url / og:image / sitemap 的基准
 * - DEFAULT_OG_IMAGE：站点默认分享图，无专属首图的文章与首页回退引用
 */
const SITE_URL = 'https://quashy.github.io'
const DEFAULT_OG_IMAGE = '/og.png'

/**
 * RSS 订阅源配置（vitepress-plugin-rss）
 * 构建时自动产出 feed.rss，供 RSS 阅读器订阅
 * 参考: https://www.npmjs.com/package/vitepress-plugin-rss
 */
const RSS: RSSOptions = {
  title: 'QinHuiYang 的博客',
  baseUrl: SITE_URL,
  description: '秦晖洋的个人技术博客',
  language: 'zh-cn',
  copyright: `Copyright © ${new Date().getFullYear()} 秦晖洋`,
  author: {
    name: '秦晖洋',
    link: 'https://github.com/Quashy',
  },
  image: SITE_URL + DEFAULT_OG_IMAGE,  // RSS 阅读器中显示的频道图标
  icon: true,     // 导航栏社交图标区显示 RSS 图标
  filename: 'feed.xml',  // .xml 后缀确保服务器返回 charset=utf-8，避免中文乱码
  ignoreHome: true,
  // filter 不限定年份：所有 /20\d{2}/ 目录下的文章自动收录，未来 2027/2028 无需改配置
  filter: (post) => !!post.url && /^\/\d{4}\//.test(post.url),

  /**
   * markdownOptions.style：向 RSS 内容注入基础样式
   * 用于补偿 RSS 阅读器缺失的 VitePress 主题样式（代码块、表格、图片自适应）
   */
  markdownOptions: {
    style: `
      /* RSS 代码块基础样式（Shiki CSS 变量已被 transform 清理，需提供回退配色） */
      pre {
        background: #1e1e1e;
        padding: 16px;
        border-radius: 6px;
        overflow-x: auto;
        color: #d4d4d4;
        line-height: 1.6;
      }
      pre code {
        color: #d4d4d4;
        background: none;
        font-family: 'Cascadia Code', 'Fira Code', Consolas, monospace;
        font-size: 14px;
      }
      /* RSS 表格样式 */
      table {
        border-collapse: collapse;
        width: 100%;
        margin: 16px 0;
      }
      th, td {
        border: 1px solid #d0d7de;
        padding: 8px 12px;
        text-align: left;
      }
      th {
        background: #f6f8fa;
        font-weight: 600;
      }
      /* RSS 图片自适应 */
      img {
        max-width: 100%;
        height: auto;
      }
    `,
  },

  /**
   * transform：后处理 RSS HTML 内容
   * 1. 清理 VitePress Shiki 语法高亮的 CSS 自定义属性（RSS 阅读器缺少这些变量）
   * 2. 修复相对路径图片 → 绝对路径（确保 RSS 阅读器可加载图片）
   */
  transform(html) {
    // 移除 Shiki CSS 变量（--shiki-light:* / --shiki-dark:*），回退到 <style> 中的基础颜色
    html = html.replace(/\s*--shiki-[a-z-]+:[^;]*;?/g, '')
    // 清理因移除 Shiki 变量而产生的空 style 属性
    html = html.replace(/\s+style="\s*"/g, '')
    // 修复相对路径图片：/xxx/01.png → https://quashy.github.io/xxx/01.png
    html = html.replace(/<img src="\/([^"]+)"/g, `<img src="${SITE_URL}/$1"`)
    return html
  },
}


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

  // ========== Head 元数据 ==========
  /**
   * head: 注入到 HTML <head> 的标签
   * 当前用于设置不蒜子统计请求的 Referrer-Policy
   */
  head: [
    /**
     * Referrer-Policy：强制跨源请求携带完整 URL（含 path）作为 Referer
     *
     * 背景：不蒜子后端仅凭 HTTP Referer 区分页面（忽略一切 URL 参数）。
     * GitHub Pages 默认不返回 Referrer-Policy 响应头，浏览器回落到默认策略
     * strict-origin-when-cross-origin —— 跨源请求只发送 origin（不含 path）。
     * 不蒜子是跨源服务（busuanzi.ibruce.info），因此永远拿不到页面路径，
     * 导致所有文章共用同一个 page_pv 计数器（阅读量跨文章显示相同）。
     *
     * no-referrer-when-downgrade：HTTPS→HTTPS（无降级）时发送完整 URL，
     * 不蒜子为 HTTPS 服务故可正常拿到页面路径；仅在降级到 HTTP 时才不发 Referer，
     * 隐私成本低于 unsafe-url，亦避免本站外链跳转时无差别暴露完整路径。
     */
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],

    /**
     * Google Search Console 站点所有权验证
     * 验证方式：HTML meta 标签（与下方 OG/Twitter meta 同构，版本管理随代码走）
     * 验证资源：https://quashy.github.io（网址前缀）
     */
    ['meta', { name: 'google-site-verification', content: 'DO7lsr3dPzD6lRE8guJbbmJt2OPx6YgyS1xzNInIQO8' }],

    /**
     * —— Open Graph 全站默认（社交分享卡片） ——
     * 按页面变化的 og:title / og:description / og:url / og:type / og:image
     * 由下方 transformPageData 钩子动态注入并覆盖。
     */
    ['meta', { property: 'og:site_name', content: 'QinHuiYang 的博客' }],
    // og:type 默认 article；首页由 transformPageData 改写为 website
    ['meta', { property: 'og:type', content: 'article' }],
    // OG locale 用下划线（zh_CN），区别于 lang 属性的横线（zh-CN）
    ['meta', { property: 'og:locale', content: 'zh_CN' }],

    /**
     * —— Twitter Card 全站默认 ——
     * summary_large_image：有专属首图的文章显示大图卡；
     * 无图篇与首页由 transformPageData 降级为 summary 小卡。
     */
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@Expired_Can' }],

    // RSS 自动发现：让 RSS 阅读器能自动识别订阅源
    ['link', { rel: 'alternate', type: 'application/rss+xml', href: '/feed.xml', title: 'RSS 订阅' }],
  ],

  // ========== Sitemap 站点地图 ==========
  /**
   * VitePress 内置 sitemap 生成（>= 1.0），构建时自动产出 /sitemap.xml
   * 参考: https://vitepress.dev/reference/site-config#sitemap
   *
   * - hostname：作为 sitemap 中所有 <loc> 绝对 URL 的基准（无尾斜杠）
   * - lastmodDateOnly：lastmod 只精确到日（YYYY-MM-DD），避免 Git 秒级提交抖动
   *
   * 未启用 cleanUrls，sitemap 自然产出 .html 后缀，与下方 canonical 拼接一致。
   */
  sitemap: {
    hostname: SITE_URL,
    lastmodDateOnly: true,
  },

  // ========== 动态 SEO 注入 ==========
  /**
   * transformPageData：按页面数据动态注入 SEO meta（SSR 阶段写入 HTML <head>）
   * 参考: https://vitepress.dev/reference/site-config#transformpagedata
   *
   * 设计取舍（单用 transformPageData 而非 transformHead，遵循 KISS）：
   * 它是「改页面数据」的上游钩子，能同时改 pageData.description 与 frontmatter.head；
   * 后者会被静态写入 dist/*.html 供爬虫读取。职责集中，避免双钩子同字段竞争。
   *
   * 注意：返回值是浅合并，必须展开 ...pageData.frontmatter 后再追加 head，
   * 否则会丢失原 title / outline 等字段。
   *
   * 数据来源：
   *   og:title        <- pageData.title（VitePress 已从 frontmatter title 或 H1 解析）
   *   og:description  <- frontmatter.description（回退站点 description）
   *   og:url/canonical<- 由 relativePath 计算（与 sitemap 同规则：index.md→/，其余→.html）
   *   og:type         <- 首页 website，其余 article
   *   og:image        <- frontmatter.ogImage（回退站点默认 /og.png）
   *   twitter:card    <- 有 ogImage 用 summary_large_image，否则降级 summary
   *   article:modified_time <- pageData.lastUpdated（毫秒时间戳，dayjs.utc 格式化）
   */
  transformPageData(pageData) {
    const fm = pageData.frontmatter || {}

    // 1. canonical / og:url（与 sitemap 内部 URL 规则对齐）
    const isHome = /(^|\/)index\.md$/.test(pageData.relativePath)
    const pageUrl = isHome
      ? '/'
      : '/' + pageData.relativePath.replace(/\.md$/, '.html')
    const canonical = SITE_URL + pageUrl

    // 2. title / description
    const title = pageData.title || ''
    const description = fm.description || ''

    // 3. og:image：有专属首图用之，否则回退站点默认图
    const ogImage = SITE_URL + (fm.ogImage || DEFAULT_OG_IMAGE)

    // 4. twitter:card：无专属图时降级为小卡
    const twitterCard = fm.ogImage ? 'summary_large_image' : 'summary'

    // 5. og:type：首页 website，其余 article
    const ogType = isHome ? 'website' : 'article'

    // 6. article:modified_time（lastUpdated 为毫秒时间戳；未 commit 的文章可能为 0，需守卫）
    const articleMeta: [string, Record<string, string>][] = []
    if (!isHome && typeof pageData.lastUpdated === 'number' && pageData.lastUpdated > 0) {
      articleMeta.push([
        'meta',
        { property: 'article:modified_time', content: dayjs.utc(pageData.lastUpdated).toISOString() },
      ])
    }

    // 7. 组装 frontmatter.head
    const head: [string, Record<string, string>][] = [
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:type', content: ogType }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { name: 'twitter:card', content: twitterCard }],
      ['link', { rel: 'canonical', href: canonical }],
      ...articleMeta,
    ]
    // description 为空时剔除 og:description，避免空字符串被社交平台渲染为「...」
    const headFiltered = description
      ? head
      : head.filter(
          ([tag, attrs]) => !(tag === 'meta' && (attrs as Record<string, string>).property === 'og:description'),
        )

    // 8. 浅合并：展开原 frontmatter 保留 title / outline 等，再注入 head
    return {
      description,
      frontmatter: {
        ...pageData.frontmatter,
        head: headFiltered,
      },
    }
  },

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
      { text: '文章', link: '/2026/from-quanpin-to-shuangpin' },
      { text: '并击', link: 'https://quashy.github.io/bingji-shuangpin/' }
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
          { text: '从全拼到双拼：我为什么做了「并击」', link: '/2026/from-quanpin-to-shuangpin' },
          { text: '如何参与开源项目', link: '/2026/how-to-contribute-to-open-source' },
          { text: '人生设计：探索你的现在', link: '/2026/designing-your-life' },
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
      { icon: 'github', link: 'https://github.com/Quashy' }
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
  },

  // ========== Markdown 渲染配置 ==========
  /**
   * markdown: VitePress 的 Markdown 渲染选项（与 themeConfig 同级，属于站点配置）
   * lineNumbers: 为所有代码块默认显示行号
   * 单个代码块可用 ```ts:no-line-numbers 临时关闭，或 ```ts:line-numbers 临时开启
   * 参考: https://vitepress.dev/reference/markdown#lines-numbers
   */
  markdown: {
    lineNumbers: true,
  },

  // ========== Vite 插件 ==========
  /**
   * vite.plugins: Vite 构建期插件
   * - RssPlugin: 构建时自动生成 feed.rss
   */
  vite: {
    plugins: [RssPlugin(RSS)],
  },

  // ========== Mermaid 配置 ==========
  /**
   * mermaid: Mermaid 图表渲染配置（亮色模式生效，暗色模式由插件自动切换）
   * 由 vitepress-plugin-mermaid 的 withMermaid 包装器读取
   * 参考: https://mermaid.js.org/config/schema-docs/config.html
   */
  mermaid: {
    // 在此添加 Mermaid 主题/样式等配置
  },
  }),
)
