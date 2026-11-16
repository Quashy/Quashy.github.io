<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import type { PixelDaylightSwitchAPI } from 'pixel-daylight-switch-gsvegetable'

type Runtime = Pick<PixelDaylightSwitchAPI, 'mount' | 'unmount'>

const { isDark } = useData()
const root = ref<HTMLElement | null>(null)
const fallback = ref<HTMLButtonElement | null>(null)
const ready = ref(false)
const title = computed(() => isDark.value ? '切换到浅色模式' : '切换到深色模式')
let runtime: Runtime | undefined
let night = false
let disposed = false
let targetNight = false
let transition: ReturnType<Document['startViewTransition']> | undefined

function changeTheme(value: boolean) {
  if (value === targetNight && value === isDark.value) return
  targetNight = value
  transition?.skipTransition()
  if (value === isDark.value) return

  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isDark.value = value
    return
  }

  transition = document.startViewTransition(async () => {
    // 连续操作时以最新目标为准，跳过的过渡回调也不会恢复旧主题。
    isDark.value = targetNight
    await nextTick()
  })
  void transition.ready.catch(() => {})
}

function clearScene() {
  ready.value = false
  if (!root.value) return
  runtime?.unmount(root.value)
  root.value.replaceChildren()
  root.value.removeAttribute('data-ld-part')
}

function mountScene() {
  const element = root.value
  if (!element || !runtime) return
  const hadFocus = element.contains(document.activeElement) || document.activeElement === fallback.value

  clearScene()
  night = isDark.value
  element.dataset.ldPart = 'toggle-daylight'
  element.dataset.startNight = String(night)
  ready.value = !!runtime.mount(element)
  if (!ready.value) clearScene()

  if (hadFocus) {
    nextTick(() => {
      const button = ready.value ? root.value?.querySelector('button') : fallback.value
      button?.focus({ preventScroll: true })
    })
  }
}

function onChange(event: Event) {
  if (!ready.value) return
  night = (event as CustomEvent<{ night: boolean }>).detail.night
  changeTheme(night)
}

watch(isDark, (value) => {
  // 当前操作实例保留动画；上游没有 setter，仅重挂载来自外部的主题变化。
  if (ready.value && value !== night) mountScene()
})

onMounted(async () => {
  try {
    // 运行时子路径没有类型声明；主入口类型用于约束浏览器 API。
    // @ts-expect-error 上游仅为主入口提供类型声明。
    await import('pixel-daylight-switch-gsvegetable/app.js')
    if (disposed) return
    runtime = (window as Window & { PixelDaylightSwitch: Runtime }).PixelDaylightSwitch
    // 导入完成后再添加挂载标记，避免运行时自动扫描抢先初始化。
    mountScene()
  } catch {
    // 加载或初始化失败时保留普通主题按钮。
    clearScene()
  }
})

onBeforeUnmount(() => {
  disposed = true
  transition?.skipTransition()
  clearScene()
})
</script>

<template>
  <div class="VPSwitchAppearance pixel-daylight-switch" :title="title">
    <div
      ref="root"
      class="pixel-daylight-scene"
      :class="{ 'is-ready': ready }"
      data-weather="snow"
      data-label="深色模式"
      @daylight:target="onChange"
      @daylight:change="onChange"
    />
    <button
      v-if="!ready"
      ref="fallback"
      class="theme-fallback"
      type="button"
      role="switch"
      aria-label="深色模式"
      :aria-checked="isDark"
      @click="changeTheme(!isDark)"
    >
      <span :class="isDark ? 'vpi-moon' : 'vpi-sun'" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
.pixel-daylight-switch {
  position: relative;
  flex-shrink: 0;
  width: 40px;
  height: 22px;
  view-transition-name: theme-switch;
}

.pixel-daylight-switch .pixel-daylight-scene {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  aspect-ratio: 1.6439;
  visibility: hidden;
  transform: translate(-50%, -50%);
}

.pixel-daylight-switch .is-ready {
  visibility: visible;
}

/* 缩小画面后仍保留触控区域，不占用额外布局空间。 */
.pixel-daylight-scene :deep(.hit) {
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  transform: translate(-50%, -50%);
}

.theme-fallback {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  min-height: 22px;
  border: 1px solid var(--vp-input-border-color);
  border-radius: 999px;
  background: var(--vp-input-switch-bg-color);
  color: var(--vp-c-text-1);
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.theme-fallback::before {
  position: absolute;
  inset: -11px -2px;
  content: '';
}

.theme-fallback span {
  width: 12px;
  height: 12px;
}

.theme-fallback:focus-visible,
.pixel-daylight-scene :deep(.hit:focus-visible) {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

@media (forced-colors: active) {
  .theme-fallback:focus-visible,
  .pixel-daylight-scene :deep(.hit:focus-visible) {
    outline-color: Highlight;
  }
}
</style>
