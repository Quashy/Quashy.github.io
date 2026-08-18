// https://vitepress.dev/guide/custom-theme
import { h, nextTick } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom'
import './style.css'
import SiteStats from './components/SiteStats.vue'
import PageView from './components/PageView.vue'
import { triggerBusuanzi } from './composables/useBusuanzi'

/**
 * 初始化 medium-zoom 图片缩放
 * 选择器 '.main img' 覆盖文章正文中所有图片（含 VitePress 内容容器与首页 hero 区），
 * 背景色使用 VitePress CSS 变量以跟随暗/亮模式
 * 注意：先 detach 已有实例，避免 SPA 路由切换时重复绑定同一图片
 */
let zoom: ReturnType<typeof mediumZoom> | null = null
const initZoom = () => {
  if (zoom) zoom.detach()
  zoom = mediumZoom('.main img', {
    background: 'var(--vp-c-bg)',
    margin: 0, // 图片撑满视口，不留边缘空隙
  })
}

/**
 * 为侧边栏文章链接补充原生悬浮提示。
 * 链接文本仍完整保留在 DOM 中，CSS 只负责单行省略，避免影响可访问名称。
 */
const initSidebarTooltips = () => {
  const links = document.querySelectorAll<HTMLAnchorElement>('.VPSidebarItem a.VPLink')
  links.forEach((link) => {
    const text = link.querySelector<HTMLElement>('.text')
    const label = text?.textContent?.trim()
    if (text && label && text.scrollWidth > text.clientWidth) {
      link.title = label
    } else {
      link.removeAttribute('title')
    }
  })
}

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 首页 features 下方：站点级总访客 UV / 总访问量 PV
      'home-features-after': () => h(SiteStats),
      // 文章正文底部：本文阅读量（组件内部按路径判断是否渲染）
      'doc-after': () => h(PageView),
    })
  },
  enhanceApp({ app, router, siteData }) {
    if (typeof window !== 'undefined') {
      // 延迟 200ms，确保首屏文章图片与侧边栏均已渲染。
      setTimeout(() => {
        initZoom()
        initSidebarTooltips()
      }, 200)

      // 首屏与 SPA 路由切换后触发不蒜子统计 + 为新页面图片注册缩放
      // onAfterRouteChange 为 VitePress 1.x 推荐钩子（onAfterRouteChanged 已废弃）
      router.onAfterRouteChange = () => {
        // nextTick 等 Vue 完成 DOM 更新后再执行：从文章页跳回首页时，SiteStats 组件
        // （home-features-after 插槽）此时才挂载，busuanzi_value_site_uv/pv 的 span 才存在于
        // DOM。若在 span 挂载前请求并回填，首页 UV/PV 会停在占位符 --。
        // 同一 nextTick 内一并注册图片缩放，detach 旧实例防重复绑定。
        nextTick(() => {
          triggerBusuanzi()
          initZoom()
          initSidebarTooltips()
        })
      }
    }
  }
} satisfies Theme
