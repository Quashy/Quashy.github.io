<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{ placement: 'aside' | 'inline' }>()
const { page, frontmatter } = useData()
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const titleItem = ref<HTMLButtonElement | null>(null)
const linkItem = ref<HTMLButtonElement | null>(null)
const open = ref(false)
const opensUp = ref(false)
const activeItem = ref(0)
const busy = ref(false)
const copied = ref(false)
const error = ref('')
const announcement = ref('')
const menuId = `article-share-${props.placement}-menu`
const triggerId = `article-share-${props.placement}-trigger`
const errorId = `article-share-${props.placement}-error`
let feedbackTimer: ReturnType<typeof setTimeout> | undefined
let operation = 0

const isArticle = computed(() => {
  const path = page.value.relativePath.replace(/\\/g, '/')
  return /^\d{4}\/.+\.md$/.test(path)
    && !path.endsWith('/index.md')
    && !page.value.isNotFound
    && !!frontmatter.value.date
    && (!frontmatter.value.layout || frontmatter.value.layout === 'doc')
})

// 直接使用随 pageData 更新的 canonical，避免 SPA 切页时读到上一页的 DOM head。
const canonicalUrl = computed(() => {
  const head = frontmatter.value.head
  if (!Array.isArray(head)) return ''
  const entry = head.find((item) => Array.isArray(item)
    && item[0] === 'link' && item[1]?.rel === 'canonical')
  const href = entry?.[1]?.href
  if (typeof href !== 'string') return ''
  try {
    const url = new URL(href)
    if (!['https:', 'http:'].includes(url.protocol)
      || /^(localhost|127(?:\.\d+){3}|0\.0\.0\.0|\[::1\])$/i.test(url.hostname)
      || url.hostname.endsWith('.localhost')) return ''
    url.hash = ''
    url.search = ''
    return url.href
  } catch {
    return ''
  }
})

function clearFeedback() {
  clearTimeout(feedbackTimer)
  copied.value = false
  error.value = ''
  announcement.value = ''
}

function closeMenu(restoreFocus = false) {
  open.value = false
  if (restoreFocus) nextTick(() => trigger.value?.focus({ preventScroll: true }))
}

function focusItem(index: number) {
  activeItem.value = (index + 2) % 2
  const item = activeItem.value === 0 ? titleItem : linkItem
  nextTick(() => item.value?.focus({ preventScroll: true }))
}

function openMenu(index = 0) {
  clearFeedback()
  const rect = trigger.value?.getBoundingClientRect()
  opensUp.value = !!rect && window.innerHeight - rect.bottom < 112 && rect.top > 112
  open.value = true
  focusItem(index)
}

function toggleMenu() {
  if (open.value) closeMenu()
  else openMenu()
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    openMenu(event.key === 'ArrowUp' ? 1 : 0)
  }
}

function onMenuKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    focusItem(activeItem.value + (event.key === 'ArrowDown' ? 1 : -1))
  } else if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault()
    focusItem(event.key === 'Home' ? 0 : 1)
  } else if (event.key === 'Tab') {
    closeMenu()
  }
}

function onEscape(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !open.value) return
  event.preventDefault()
  event.stopPropagation()
  closeMenu(true)
}

function onPointerDown(event: PointerEvent) {
  if (event.target instanceof Node && !root.value?.contains(event.target)) closeMenu()
}

function onFocusOut(event: FocusEvent) {
  if (!(event.relatedTarget instanceof Node) || !root.value?.contains(event.relatedTarget)) closeMenu()
}

function onResize() {
  closeMenu()
}

async function copy(mode: 'title' | 'link') {
  if (busy.value) return
  clearFeedback()
  const request = ++operation
  busy.value = true
  try {
    const url = canonicalUrl.value
    const title = page.value.title.trim()
    if (!url || !title) throw new Error('Missing article metadata')
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
    await navigator.clipboard.writeText(mode === 'title' ? `${title}：${url}` : url)
    if (request !== operation) return
    closeMenu(true)
    copied.value = true
    announcement.value = mode === 'title' ? '已复制标题和链接' : '已复制链接'
    feedbackTimer = setTimeout(() => { copied.value = false }, 2000)
  } catch {
    if (request !== operation) return
    closeMenu(true)
    error.value = canonicalUrl.value
      ? '复制失败，请检查浏览器的剪贴板权限后重试。'
      : '未能读取正式文章链接，请刷新页面后重试。'
  } finally {
    if (request === operation) busy.value = false
  }
}

watch(() => page.value.relativePath, () => {
  operation++
  busy.value = false
  closeMenu()
  clearFeedback()
})

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  operation++
  clearTimeout(feedbackTimer)
  document.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div
    v-if="isArticle"
    ref="root"
    class="article-share"
    :class="`article-share--${placement}`"
    @keydown="onEscape"
    @focusout="onFocusOut"
  >
    <button
      :id="triggerId"
      ref="trigger"
      type="button"
      class="article-share-trigger"
      aria-haspopup="menu"
      :aria-label="copied ? '已复制文章分享信息' : '复制文章分享信息'"
      :aria-expanded="open"
      :aria-controls="open ? menuId : undefined"
      :aria-describedby="error ? errorId : undefined"
      :aria-busy="busy || undefined"
      @click="toggleMenu"
      @keydown="onTriggerKeydown"
    >
      <span>{{ copied ? '已复制' : '复制' }}</span>
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div
      v-if="open"
      :id="menuId"
      role="menu"
      :aria-labelledby="triggerId"
      class="article-share-menu"
      :class="{ 'opens-up': opensUp }"
      @keydown="onMenuKeydown"
    >
      <button
        ref="titleItem"
        type="button"
        role="menuitem"
        :tabindex="activeItem === 0 ? 0 : -1"
        :aria-disabled="busy || undefined"
        @focus="activeItem = 0"
        @click="copy('title')"
      >复制标题和链接</button>
      <button
        ref="linkItem"
        type="button"
        role="menuitem"
        :tabindex="activeItem === 1 ? 0 : -1"
        :aria-disabled="busy || undefined"
        @focus="activeItem = 1"
        @click="copy('link')"
      >仅复制链接</button>
    </div>

    <p v-if="error" :id="errorId" class="article-share-error" role="alert">{{ error }}</p>
    <span class="article-share-status" role="status" aria-live="polite" aria-atomic="true">{{ announcement }}</span>
  </div>
</template>

<style scoped>
.article-share {
  position: relative;
  color: var(--vp-c-text-2);
}

.article-share--aside {
  margin: 16px 0 0 17px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 10px;
}

.article-share--inline {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.article-share-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  line-height: 24px;
  color: var(--vp-c-text-2);
}

.article-share-trigger:hover {
  color: var(--vp-c-text-1);
}

.article-share-trigger:focus-visible,
.article-share-menu button:focus-visible {
  outline: auto;
  outline-offset: 3px;
}

.article-share-menu {
  position: absolute;
  z-index: 20;
  inset-inline-start: 0;
  top: calc(100% + 4px);
  min-width: 192px;
  max-width: calc(100vw - 48px);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 6px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
}

.article-share-menu.opens-up {
  top: auto;
  bottom: calc(100% + 4px);
}

.article-share--inline .article-share-menu {
  inset-inline-start: auto;
  inset-inline-end: 0;
}

.article-share-menu button {
  display: block;
  width: 100%;
  min-height: 32px;
  border-radius: 6px;
  padding: 4px 12px;
  text-align: start;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: var(--vp-c-text-1);
}

.article-share-menu button:hover,
.article-share-menu button:focus-visible {
  background: var(--vp-c-default-soft);
}

.article-share-menu button[aria-disabled="true"] {
  cursor: progress;
}

.article-share-error {
  margin-top: 6px;
  color: var(--vp-c-danger-1);
  font-size: 12px;
  line-height: 20px;
}

.article-share--inline .article-share-error {
  position: absolute;
  z-index: 1;
  top: 100%;
  right: 0;
  max-width: 280px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 6px 10px;
  background: var(--vp-c-bg-elv);
}

.article-share-status {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* 与 VPDoc 的右栏显示断点一致；显式关闭 aside 时，宽屏也保留标题上方入口。 */
@media (min-width: 1280px) {
  .VPDoc.has-aside .article-share--inline {
    display: none;
  }
}

@media (max-width: 767px) {
  .article-share-trigger,
  .article-share-menu button {
    min-height: 44px;
  }
}

@media print {
  .article-share {
    display: none !important;
  }
}
</style>
