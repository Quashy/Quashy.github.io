import { nextTick, onMounted, onUnmounted } from 'vue'
import { getScrollOffset, onContentUpdated, useRouter } from 'vitepress'
import type Lenis from 'lenis'

const nativeScrollSelector = [
  '.VPLocalSearchBox', '.VPNavScreen', '.VPSidebar',
  '.VPLocalNavOutlineDropdown .items',
  '[data-lenis-prevent]',
].join(', ')

const anchorEase = (x: number) =>
  x < 0.5 ? 8 * x ** 4 : 1 - (-2 * x + 2) ** 4 / 2

/** 全局只保留一个滚动实例；页面动画随内容更新重新建立、随页面离开还原。 */
export function useSiteMotion() {
  const router = useRouter()
  let lenis: Lenis | undefined
  let LenisClass: typeof Lenis
  let gsap: typeof import('gsap')['gsap']
  let ScrollTrigger: typeof import('gsap/ScrollTrigger')['ScrollTrigger']
  let context: ReturnType<typeof gsap.context> | undefined
  let media: MediaQueryList
  let events: AbortController | undefined
  let contentObserver: MutationObserver | undefined
  let lockObserver: MutationObserver | undefined
  let resizeObserver: ResizeObserver | undefined
  let disposed = false
  let ready = false
  let printing = false
  let zoomOpen = false
  let pageFrame = 0
  let anchorFrame = 0
  let refreshFrame = 0
  let refreshTimer = 0
  let refreshScrollY: number | undefined
  let anchorRequest = 0
  let originalScrollOffset: string | undefined
  let blocks: HTMLElement[] = []
  const pending = new Set<HTMLElement>()
  const anchors = new Map<HTMLAnchorElement, string | null>()
  const focusTargets = new Map<HTMLElement, () => void>()
  let restoreRouterHook: (() => void) | undefined

  const motionAllowed = () => !media.matches && !printing
  const tick = (time: number) => lenis?.raf(time * 1000)

  function clearPage() {
    cancelAnimationFrame(pageFrame)
    cancelAnimationFrame(refreshFrame)
    clearTimeout(refreshTimer)
    refreshFrame = 0
    refreshTimer = 0
    refreshScrollY = undefined
    context?.revert()
    context = undefined
    blocks.forEach((block) => block.removeAttribute('data-motion-reveal'))
    blocks = []
    pending.clear()
    focusTargets.forEach((restore) => restore())
    anchorRequest++
  }

  function showBlocks(target: Node) {
    const affected = blocks.filter((block) =>
      pending.has(block) && (block.contains(target) || target.contains(block)),
    )
    if (!affected.length) return
    affected.forEach((block) => pending.delete(block))
    gsap.killTweensOf(affected)
    context?.add(() => gsap.set(affected, { clearProps: 'opacity,transform' }))
  }

  function setupReveals() {
    if (!motionAllowed()) return
    const article = document.querySelector('.VPDoc .vp-doc > div')
    blocks = article
      ? Array.from(article.children).filter((element): element is HTMLElement =>
          element instanceof HTMLElement &&
          !element.matches('script, style, link, template') &&
          element.getBoundingClientRect().height > 0,
        )
      : Array.from(document.querySelectorAll<HTMLElement>(
          '.home-profile .current-practice, .home-profile .home-footer',
        ))
    const offscreen = blocks.filter((block) =>
      block.getBoundingClientRect().top >= window.innerHeight,
    )
    if (!offscreen.length) return
    context = gsap.context(() => {
      offscreen.forEach((block) => {
        block.setAttribute('data-motion-reveal', '')
        pending.add(block)
      })
      gsap.set(offscreen, { opacity: 0, y: 16 })
      ScrollTrigger.batch(offscreen, {
        start: 'top 90%',
        once: true,
        interval: 0.06,
        onEnter(elements) {
          const batch = (elements as HTMLElement[]).filter((element) => pending.has(element))
          if (!batch.length) return
          // 异步回调中的动画也归入页面上下文，切页时可完整还原。
          context?.add(() => gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: batch.length > 1 ? Math.min(0.06, 0.18 / (batch.length - 1)) : 0,
            clearProps: 'opacity,transform',
            onComplete: () => { batch.forEach((element) => pending.delete(element)) },
          }))
        },
      })
    })
  }

  function anchorTarget(anchor: HTMLAnchorElement) {
    if (anchor.matches('.VPSkipLink, [download]')) return
    try {
      const url = new URL(anchor.href, location.href)
      if (url.origin !== location.origin || url.pathname !== location.pathname ||
          url.search !== location.search || !url.hash) return
      return document.getElementById(decodeURIComponent(url.hash.slice(1))) ?? undefined
    } catch {
      // 不接管无效编码或不存在的锚点，保留浏览器默认行为。
    }
  }

  function syncAnchors() {
    // 图片加载后的浏览器原生 fragment 定位也使用同一导航栏偏移。
    const rootStyle = document.documentElement.style
    originalScrollOffset ??= rootStyle.getPropertyValue('--site-scroll-offset')
    const offset = `${getScrollOffset()}px`
    if (rootStyle.getPropertyValue('--site-scroll-offset') !== offset) {
      rootStyle.setProperty('--site-scroll-offset', offset)
    }
    for (const [anchor, original] of anchors) {
      if (!anchor.isConnected || !anchorTarget(anchor)) {
        if (original === null) anchor.removeAttribute('target')
        else anchor.setAttribute('target', original)
        anchors.delete(anchor)
      }
    }
    document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((anchor) => {
      if (anchors.has(anchor) || anchor.hasAttribute('target') || !anchorTarget(anchor)) return
      anchors.set(anchor, null)
      // VitePress 1.x 会跳过有 target 的链接，避免两套滚动同时定位。
      anchor.setAttribute('target', '_self')
    })
  }

  function focusTarget(target: HTMLElement) {
    if (!target.hasAttribute('tabindex')) {
      const restore = () => {
        target.removeAttribute('tabindex')
        target.removeEventListener('blur', restore)
        focusTargets.delete(target)
      }
      focusTargets.set(target, restore)
      target.setAttribute('tabindex', '-1')
      target.addEventListener('blur', restore, { once: true })
    }
    target.focus({ preventScroll: true })
  }

  function onAnchorClick(event: MouseEvent) {
    if (event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
        !(event.target instanceof Element)) return
    const anchor = event.target.closest<HTMLAnchorElement>('a[href]')
    if (!anchor || !anchors.has(anchor)) return
    const target = anchorTarget(anchor)
    if (!target) return
    event.preventDefault()
    const url = new URL(anchor.href)
    if (url.hash !== location.hash) {
      const oldURL = location.href
      history.replaceState({ ...history.state, scrollPosition: window.scrollY }, '')
      history.pushState({}, '', url.href)
      window.dispatchEvent(new HashChangeEvent('hashchange', { oldURL, newURL: url.href }))
    }
    const request = ++anchorRequest
    // 让移动目录先完成关闭与布局更新，再计算导航栏偏移。
    nextTick(() => {
      if (disposed || request !== anchorRequest || !target.isConnected) return
      showBlocks(target)
      focusTarget(target)
      const padding = parseFloat(getComputedStyle(target).paddingTop) || 0
      const top = window.scrollY + target.getBoundingClientRect().top - getScrollOffset() + padding
      syncLock()
      if (lenis && !lenis.isStopped) {
        lenis.scrollTo(top, { duration: 1.2, lerp: 0, easing: anchorEase })
      } else {
        window.scrollTo({ top, behavior: 'instant' })
      }
    })
  }

  function syncLock() {
    if (!lenis) return
    const locked = zoomOpen || document.body.classList.contains('medium-zoom--opened') ||
      getComputedStyle(document.body).overflowY === 'hidden' ||
      getComputedStyle(document.documentElement).overflowY === 'hidden'
    if (locked) lenis.stop()
    else lenis.start()
  }

  function scheduleRefresh() {
    if (!ready || disposed || refreshFrame) return
    clearTimeout(refreshTimer)
    refreshFrame = requestAnimationFrame(() => {
      refreshFrame = 0
      // resize 会重置 Lenis 目标，refresh 会临时移动滚动位置；仅在停稳后测量。
      // native 状态可能在速度归零后保留，使用实际位置连续稳定来判断停稳。
      if (lenis?.isScrolling === 'smooth' || refreshScrollY !== window.scrollY) {
        refreshScrollY = window.scrollY
        refreshTimer = window.setTimeout(scheduleRefresh, 150)
        return
      }
      refreshScrollY = undefined
      syncAnchors()
      lenis?.resize()
      if (context) ScrollTrigger.refresh()
    })
  }

  function scheduleAnchorSync() {
    if (!ready || disposed || anchorFrame) return
    anchorFrame = requestAnimationFrame(() => {
      anchorFrame = 0
      syncAnchors()
    })
  }

  function schedulePage() {
    if (!ready || disposed) return
    clearPage()
    // VitePress 在 nextTick/RAF 中恢复 hash 或历史位置；之后再识别屏外元素。
    nextTick(() => {
      if (disposed) return
      cancelAnimationFrame(pageFrame)
      pageFrame = requestAnimationFrame(() => {
        pageFrame = requestAnimationFrame(() => {
          if (disposed) return
          lenis?.resize()
          lenis?.scrollTo(window.scrollY, { immediate: true, force: true })
          syncAnchors()
          setupReveals()
          syncLock()
        })
      })
    })
  }

  function destroyScroll() {
    gsap.ticker.remove(tick)
    lenis?.off('scroll', ScrollTrigger.update)
    lenis?.destroy()
    lenis = undefined
  }

  function updateMotion() {
    clearPage()
    destroyScroll()
    if (motionAllowed()) {
      lenis = new LenisClass({
        autoRaf: false,
        smoothWheel: true,
        lerp: 0.1,
        syncTouch: false,
        anchors: false,
        // 代码块、表格和图表仍由 Lenis 处理纵向滚轮；纯横向滚轮保持原生行为。
        prevent: (node) => node.matches(nativeScrollSelector),
      })
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      syncLock()
    }
    schedulePage()
  }

  onContentUpdated(schedulePage)

  onMounted(async () => {
    try {
      const [lenisModule, gsapModule, triggerModule] = await Promise.all([
        import('lenis'), import('gsap'), import('gsap/ScrollTrigger'),
      ])
      if (disposed) return
      LenisClass = lenisModule.default
      gsap = gsapModule.gsap
      ScrollTrigger = triggerModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)
      media = window.matchMedia('(prefers-reduced-motion: reduce)')
      events = new AbortController()
      const { signal } = events
      media.addEventListener('change', updateMotion, { signal })
      window.addEventListener('beforeprint', () => { printing = true; updateMotion() }, { signal })
      window.addEventListener('afterprint', () => { printing = false; updateMotion() }, { signal })
      document.addEventListener('click', onAnchorClick, { signal })
      document.addEventListener('focusin', (event) => {
        if (event.target instanceof Node) showBlocks(event.target)
      }, { signal })
      document.addEventListener('medium-zoom:open', (event) => {
        if (event.target instanceof Node) showBlocks(event.target)
        zoomOpen = true
        syncLock()
      }, { capture: true, signal })
      document.addEventListener('medium-zoom:closed', () => {
        zoomOpen = false
        syncLock()
      }, { capture: true, signal })
      document.addEventListener('load', (event) => {
        if (event.target instanceof HTMLImageElement && event.target.closest('.main')) scheduleRefresh()
      }, { capture: true, signal })
      window.addEventListener('resize', scheduleRefresh, { signal })

      const beforePageLoad = router.onBeforePageLoad
      const onBeforePageLoad = async (to: string) => {
        const result = await beforePageLoad?.(to)
        if (result === false) return false
        // 同一文档的 hash 前进后退保留入场状态，只清除旧滚动目标。
        if (new URL(to, location.href).pathname !== router.route.path) clearPage()
        else anchorRequest++
        // 不接管 VitePress 的原生路由位置恢复。
        lenis?.stop()
        lenis?.start()
        syncLock()
      }
      router.onBeforePageLoad = onBeforePageLoad
      restoreRouterHook = () => {
        if (router.onBeforePageLoad === onBeforePageLoad) router.onBeforePageLoad = beforePageLoad
      }

      const app = document.getElementById('app')!
      // 菜单和链接更新只需同步锚点；布局变化交给 ResizeObserver，避免滚动中反复测量整页。
      contentObserver = new MutationObserver(scheduleAnchorSync)
      contentObserver.observe(app, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] })
      lockObserver = new MutationObserver(syncLock)
      for (const element of [document.body, document.documentElement]) {
        lockObserver.observe(element, { attributes: true, attributeFilter: ['class', 'style'] })
      }
      resizeObserver = new ResizeObserver(scheduleRefresh)
      resizeObserver.observe(document.getElementById('VPContent') ?? app)
      ready = true
      updateMotion()
    } catch {
      // 动效为渐进增强；初始化失败时恢复所有内容与原生链接。
      cleanup()
    }
  })

  function cleanup() {
    ready = false
    events?.abort()
    contentObserver?.disconnect()
    lockObserver?.disconnect()
    resizeObserver?.disconnect()
    restoreRouterHook?.()
    cancelAnimationFrame(anchorFrame)
    cancelAnimationFrame(refreshFrame)
    clearPage()
    if (gsap) destroyScroll()
    for (const [anchor, original] of anchors) {
      if (original === null) anchor.removeAttribute('target')
      else anchor.setAttribute('target', original)
    }
    anchors.clear()
    if (originalScrollOffset !== undefined) {
      if (originalScrollOffset) document.documentElement.style.setProperty('--site-scroll-offset', originalScrollOffset)
      else document.documentElement.style.removeProperty('--site-scroll-offset')
    }
  }

  onUnmounted(() => {
    disposed = true
    cleanup()
  })
}
