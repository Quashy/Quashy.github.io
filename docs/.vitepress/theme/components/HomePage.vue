<script setup lang="ts">
import SiteStats from './SiteStats.vue'

const workflowSteps = [
  { number: '01', label: '理解目标' },
  { number: '02', label: '识别约束' },
  { number: '03', label: '方案拆解' },
  { number: '04', label: '分步实现' },
  { number: '05', label: '测试验证' },
  { number: '06', label: '沉淀复用' },
] as const
</script>

<template>
  <main class="home-profile">
    <section class="home-hero" aria-labelledby="home-title">
      <div class="home-shell home-hero-layout">
        <div class="home-hero-copy">
          <p class="home-identity">
            <span>秦晖洋｜后端开发 × AI 工程化</span>
          </p>

          <h1 id="home-title">把复杂问题做<span class="home-title-highlight">正确</span>，再把解法<span class="home-title-highlight">沉淀</span>下来。</h1>

          <div class="home-intro">
            <p>
              我以后端开发为主，也关注 AI 在业务场景中的工程化应用与研发提效。面对约束复杂的问题，我会先理解业务目标、梳理关键约束，再拆解方案、分步实现，并用测试和数据验证结果。
            </p>
            <p>
              问题解决后，我会把过程沉淀为工具、代码和复盘，让同类问题下一次更快解决。
            </p>
          </div>

          <nav class="home-actions" aria-label="首页主要入口">
            <a
              class="home-action home-action-primary"
              href="/2026/handling-out-of-order-mq-messages"
            >
              <span>阅读 MQ 乱序复盘</span>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </a>

            <a
              class="home-action home-action-secondary"
              href="https://github.com/Quashy"
              target="_blank"
              rel="noreferrer"
            >
              <span>查看 GitHub</span>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
              <span class="home-sr-only">（在新标签页打开）</span>
            </a>
          </nav>
        </div>

        <section class="workflow" aria-labelledby="workflow-title">
          <header class="workflow-header">
            <p class="home-section-meta" aria-hidden="true">01 / PROCESS</p>
            <h2 id="workflow-title">我的工作方式</h2>
            <p>从问题进入，再把可复用的解法带回来。</p>
          </header>

          <div class="workflow-diagram">
            <svg
              class="workflow-path workflow-path-wide"
              viewBox="0 0 600 300"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <marker
                  id="workflow-arrow-wide"
                  viewBox="0 0 8 8"
                  refX="4"
                  refY="4"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto"
                >
                  <path class="workflow-marker-shape" d="M0 0 8 4 0 8Z" />
                </marker>
              </defs>

              <path class="workflow-track" d="M100 75H300" />
              <path class="workflow-track" d="M300 75H500" />
              <path class="workflow-track" d="M500 75V225" />
              <path class="workflow-track" d="M500 225H300" />
              <path class="workflow-track" d="M300 225H100" />
              <path class="workflow-track" d="M100 225H12V75H100" />

              <path
                class="workflow-flow"
                d="M100 75H200H300"
                marker-mid="url(#workflow-arrow-wide)"
              />
              <path
                class="workflow-flow"
                d="M300 75H400H500"
                marker-mid="url(#workflow-arrow-wide)"
              />
              <path
                class="workflow-flow"
                d="M500 75V150V225"
                marker-mid="url(#workflow-arrow-wide)"
              />
              <path
                class="workflow-flow"
                d="M500 225H400H300"
                marker-mid="url(#workflow-arrow-wide)"
              />
              <path
                class="workflow-flow"
                d="M300 225H200H100"
                marker-mid="url(#workflow-arrow-wide)"
              />
              <path class="workflow-flow" d="M100 225H12V75H100" />
              <path
                class="workflow-arrow-guide"
                d="M12 185V150V115"
                marker-mid="url(#workflow-arrow-wide)"
              />
            </svg>

            <svg
              class="workflow-path workflow-path-compact"
              viewBox="0 0 300 300"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <marker
                  id="workflow-arrow-compact"
                  viewBox="0 0 8 8"
                  refX="4"
                  refY="4"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto"
                >
                  <path class="workflow-marker-shape" d="M0 0 8 4 0 8Z" />
                </marker>
              </defs>

              <path class="workflow-track" d="M75 50H225" />
              <path class="workflow-track" d="M225 50V150" />
              <path class="workflow-track" d="M225 150H75" />
              <path class="workflow-track" d="M75 150V250" />
              <path class="workflow-track" d="M75 250H225" />
              <path
                class="workflow-track"
                d="M225 250H292V8H8V50H75"
              />

              <path
                class="workflow-flow"
                d="M75 50H150H225"
                marker-mid="url(#workflow-arrow-compact)"
              />
              <path
                class="workflow-flow"
                d="M225 50V100V150"
                marker-mid="url(#workflow-arrow-compact)"
              />
              <path
                class="workflow-flow"
                d="M225 150H150H75"
                marker-mid="url(#workflow-arrow-compact)"
              />
              <path
                class="workflow-flow"
                d="M75 150V200V250"
                marker-mid="url(#workflow-arrow-compact)"
              />
              <path
                class="workflow-flow"
                d="M75 250H150H225"
                marker-mid="url(#workflow-arrow-compact)"
              />
              <path class="workflow-flow" d="M225 250H292V8H8V50H75" />
              <path
                class="workflow-arrow-guide"
                d="M292 200V150V100"
                marker-mid="url(#workflow-arrow-compact)"
              />
            </svg>

            <ol class="workflow-steps" role="list">
              <li
                v-for="step in workflowSteps"
                :key="step.number"
                class="workflow-step"
              >
                <span class="workflow-step-number" aria-hidden="true">
                  {{ step.number }}
                </span>
                <span class="workflow-step-label">{{ step.label }}</span>
              </li>
            </ol>
          </div>
        </section>
      </div>
    </section>

    <section class="current-practice" aria-labelledby="current-practice-title">
      <div class="home-shell current-practice-layout">
        <p class="home-section-meta current-practice-index" aria-hidden="true">
          02 / CURRENT
        </p>

        <div class="current-practice-copy">
          <p class="current-practice-kicker">当前在做</p>
          <h2 id="current-practice-title">
            <span translate="no">知衍 KnowWeave</span>
            <span class="current-practice-former">（原 OpenWiki）</span>
          </h2>
          <p>
            ——一个仍在迭代的知识工程实践，串联文档摄入、知识组织、带引用问答与质量评估。
          </p>
        </div>

        <a
          class="current-practice-link"
          href="https://github.com/Quashy/OpenWiki"
          target="_blank"
          rel="noreferrer"
        >
          <span>查看知衍源码</span>
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
          <span class="home-sr-only">（在新标签页打开）</span>
        </a>
      </div>
    </section>

    <footer class="home-footer">
      <div class="home-shell">
        <SiteStats />
      </div>
    </footer>
  </main>
</template>

<style scoped>
.home-profile {
  --home-accent: #2457d6;
  --home-accent-hover: #1d47b5;
  --home-accent-soft: rgb(36 87 214 / 10%);
  --home-title-highlight: rgb(36 87 214 / 18%);
  --home-accent-on: #ffffff;
  --home-flow-track: rgb(36 87 214 / 28%);
  --home-flow-active: #2457d6;
  --home-grid-line: rgb(36 87 214 / 8%);
  --home-panel-shadow:
    0 0 0 1px rgb(23 32 51 / 8%),
    0 1px 2px rgb(23 32 51 / 5%),
    0 24px 64px rgb(23 32 51 / 9%);
  color: var(--vp-c-text-1);
  overflow: hidden;
}

:global(.dark .home-profile) {
  --home-accent: #8fb0ff;
  --home-accent-hover: #b3c8ff;
  --home-accent-soft: rgb(143 176 255 / 12%);
  --home-title-highlight: rgb(143 176 255 / 24%);
  --home-accent-on: #15171c;
  --home-flow-track: rgb(143 176 255 / 32%);
  --home-flow-active: #8fb0ff;
  --home-grid-line: rgb(143 176 255 / 8%);
  --home-panel-shadow: 0 0 0 1px rgb(255 255 255 / 10%);
}

.home-shell {
  width: min(100%, 1360px);
  margin-inline: auto;
  padding-inline: clamp(1.25rem, 5vw, 4rem);
}

.home-hero {
  display: flex;
  align-items: center;
  min-height: calc(100svh - var(--vp-nav-height));
  padding-block: clamp(5rem, 9vw, 8.5rem);
}

.home-hero-layout {
  display: grid;
  gap: clamp(4rem, 9vw, 7rem);
  align-items: center;
}

.home-hero-copy {
  min-width: 0;
}

.home-identity {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1.75rem;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.035em;
}

.home-identity::before {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 2px;
  background: var(--home-accent);
  box-shadow: 0 0 0 0.25rem var(--home-accent-soft);
  content: '';
}

.home-hero h1 {
  max-width: 10.5ch;
  margin: 0;
  color: var(--vp-c-text-1);
  font-family: 'Source Han Serif SC', 'Noto Serif CJK SC', 'Songti SC', STSong,
    serif;
  font-size: clamp(3rem, 7vw, 5.75rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.045em;
  text-wrap: balance;
}

.home-title-highlight {
  padding-inline: 0.03em;
  margin-inline: -0.03em;
  white-space: nowrap;
  border-radius: 0.08em;
  box-shadow: inset 0 -0.34em 0 var(--home-title-highlight);
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.home-intro {
  display: grid;
  gap: 0.75rem;
  max-width: 65ch;
  margin-top: 2rem;
  color: var(--vp-c-text-2);
  font-size: clamp(1rem, 1.3vw, 1.125rem);
  line-height: 1.75;
}

.home-intro p {
  margin: 0;
  text-wrap: pretty;
}

.home-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.25rem;
}

.home-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.6875rem 1.125rem;
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.35;
  text-decoration: none;
  touch-action: manipulation;
}

.home-action svg,
.current-practice-link svg {
  flex: none;
  margin-inline-start: 0.5rem;
}

.home-action-primary {
  color: var(--home-accent-on);
  background: var(--home-accent);
  box-shadow:
    0 1px 2px rgb(0 0 0 / 12%),
    0 8px 24px var(--home-accent-soft);
}

.home-action-primary:hover {
  color: var(--home-accent-on);
  background: var(--home-accent-hover);
}

.home-action-secondary {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  box-shadow: 0 0 0 1px var(--vp-c-divider);
}

.home-action-secondary:hover {
  color: var(--vp-c-text-1);
  box-shadow: 0 0 0 1px var(--vp-c-text-3);
}

.home-action:focus-visible,
.current-practice-link:focus-visible {
  outline: 2px solid var(--home-accent);
  outline-offset: 3px;
}

.home-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.workflow {
  min-width: 0;
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: 1.75rem;
  background-color: var(--vp-c-bg-soft);
  background-image:
    linear-gradient(var(--home-grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--home-grid-line) 1px, transparent 1px);
  background-size: 1.5rem 1.5rem;
  box-shadow: var(--home-panel-shadow);
}

.workflow-header {
  position: relative;
  z-index: 2;
}

.home-section-meta {
  margin: 0 0 0.625rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.08em;
}

.workflow-header h2 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-family: 'Source Han Serif SC', 'Noto Serif CJK SC', 'Songti SC', STSong,
    serif;
  font-size: clamp(1.625rem, 3vw, 2.25rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.workflow-header > p:last-child {
  margin: 0.625rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.9375rem;
  line-height: 1.6;
  text-wrap: pretty;
}

.workflow-diagram {
  position: relative;
  min-height: 28rem;
  margin-top: 1rem;
}

.workflow-path,
.workflow-steps {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.workflow-path {
  z-index: 0;
  color: var(--home-flow-active);
  overflow: visible;
  pointer-events: none;
}

.workflow-path .workflow-track,
.workflow-path .workflow-flow,
.workflow-path .workflow-arrow-guide {
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}

.workflow-path .workflow-track {
  stroke: var(--home-flow-track);
}

.workflow-path .workflow-flow {
  stroke: var(--home-flow-active);
  stroke-dasharray: 7 11;
}

.workflow-path .workflow-arrow-guide {
  stroke: transparent;
}

.workflow-path .workflow-marker-shape {
  fill: var(--home-flow-active);
  stroke: none;
}

.workflow-path-wide {
  display: none;
}

.workflow-path-compact {
  display: block;
}

.workflow-steps {
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.workflow-step {
  display: grid;
  align-content: center;
  justify-items: center;
  justify-self: center;
  align-self: center;
  gap: 0.375rem;
  width: min(100%, 7.25rem);
  min-height: 5.5rem;
  padding: 0.875rem 0.625rem;
  border-radius: 0.875rem;
  color: var(--vp-c-text-1);
  text-align: center;
  background: var(--vp-c-bg);
  box-shadow:
    0 0 0 1px var(--vp-c-divider),
    0 3px 12px rgb(0 0 0 / 4%);
}

.workflow-step:nth-child(1) {
  grid-column: 1;
  grid-row: 1;
}

.workflow-step:nth-child(2) {
  grid-column: 2;
  grid-row: 1;
}

.workflow-step:nth-child(3) {
  grid-column: 2;
  grid-row: 2;
}

.workflow-step:nth-child(4) {
  grid-column: 1;
  grid-row: 2;
}

.workflow-step:nth-child(5) {
  grid-column: 1;
  grid-row: 3;
}

.workflow-step:nth-child(6) {
  grid-column: 2;
  grid-row: 3;
}

.workflow-step-number {
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.08em;
}

.workflow-step-label {
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
}

.current-practice {
  padding-block: clamp(5rem, 10vw, 8rem);
  background: var(--vp-c-bg-soft);
}

.current-practice-layout {
  display: grid;
  gap: 2rem;
  align-items: end;
}

.current-practice-index {
  align-self: start;
  margin: 0;
}

.current-practice-kicker {
  margin: 0 0 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.06em;
}

.current-practice-copy h2 {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em;
  margin: 0;
  color: var(--vp-c-text-1);
  font-family: 'Source Han Serif SC', 'Noto Serif CJK SC', 'Songti SC', STSong,
    serif;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.current-practice-former {
  color: var(--vp-c-text-2);
  font-size: 0.55em;
  font-weight: 500;
  letter-spacing: 0;
}

.current-practice-copy > p:last-child {
  max-width: 52ch;
  margin: 1rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.7;
  text-wrap: pretty;
}

.current-practice-link {
  display: inline-flex;
  align-items: center;
  justify-self: start;
  min-height: 44px;
  color: var(--home-accent);
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.4;
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.3em;
  text-decoration-skip-ink: auto;
  touch-action: manipulation;
}

.current-practice-link:hover {
  color: var(--home-accent-hover);
}

.home-footer {
  padding-block: clamp(4.5rem, 9vw, 7rem);
}

@media (min-width: 48rem) {
  .workflow-diagram {
    min-height: 19.5rem;
    margin-top: 1.25rem;
  }

  .workflow-path-wide {
    display: block;
  }

  .workflow-path-compact {
    display: none;
  }

  .workflow-steps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }

  .workflow-step:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }

  .workflow-step:nth-child(2) {
    grid-column: 2;
    grid-row: 1;
  }

  .workflow-step:nth-child(3) {
    grid-column: 3;
    grid-row: 1;
  }

  .workflow-step:nth-child(4) {
    grid-column: 3;
    grid-row: 2;
  }

  .workflow-step:nth-child(5) {
    grid-column: 2;
    grid-row: 2;
  }

  .workflow-step:nth-child(6) {
    grid-column: 1;
    grid-row: 2;
  }
}

@media (min-width: 62rem) {
  .home-hero {
    padding-block: clamp(4rem, 6vw, 5.5rem);
  }

  .home-hero-layout {
    grid-template-columns: minmax(0, 1fr) minmax(29rem, 0.9fr);
    gap: clamp(3rem, 5vw, 4.5rem);
  }

  .workflow-diagram {
    min-height: 21.5rem;
  }

  .current-practice-layout {
    grid-template-columns: minmax(7rem, 0.22fr) minmax(0, 1fr) auto;
    gap: clamp(2rem, 5vw, 5rem);
  }

  .current-practice-link {
    justify-self: end;
  }
}

@media (max-width: 30rem) {
  .home-actions {
    display: grid;
  }

  .home-action {
    width: 100%;
  }

  .workflow {
    padding-inline: 1rem;
  }

  .workflow-step {
    width: min(100%, 6.5rem);
    min-height: 5rem;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .home-identity,
  .home-hero h1,
  .home-intro,
  .home-actions,
  .workflow {
    animation: home-enter 550ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .home-hero h1 {
    animation-delay: 80ms;
  }

  .home-intro,
  .workflow {
    animation-delay: 160ms;
  }

  .home-actions {
    animation-delay: 240ms;
  }

  .workflow-flow {
    animation: workflow-stream 1.15s linear 4;
  }

  .workflow:hover .workflow-flow {
    animation: workflow-stream-replay 900ms linear 2;
  }

  .home-action {
    transition-property: color, background-color, box-shadow, transform;
    transition-duration: 150ms;
    transition-timing-function: ease-out;
  }

  .current-practice-link {
    transition-property: color, text-decoration-color, transform;
    transition-duration: 150ms;
    transition-timing-function: ease-out;
  }

  .home-action svg,
  .current-practice-link svg {
    transition: transform 150ms ease-out;
  }

  .home-action-primary:is(:hover, :focus-visible) svg {
    transform: translateX(0.2rem);
  }

  .home-action-secondary:is(:hover, :focus-visible) svg,
  .current-practice-link:is(:hover, :focus-visible) svg {
    transform: translate(0.14rem, -0.14rem);
  }

  .home-action:active,
  .current-practice-link:active {
    transform: scale(0.96);
  }
}

@keyframes home-enter {
  from {
    opacity: 0;
    transform: translateY(0.75rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes workflow-stream {
  to {
    stroke-dashoffset: -18;
  }
}

@keyframes workflow-stream-replay {
  to {
    stroke-dashoffset: -18;
  }
}

@media (prefers-contrast: more) {
  .home-profile {
    --home-flow-track: #2457d6;
    --home-flow-active: #2457d6;
    --home-grid-line: rgb(36 87 214 / 18%);
  }

  :global(.dark .home-profile) {
    --home-flow-track: #b3c8ff;
    --home-flow-active: #b3c8ff;
    --home-grid-line: rgb(179 200 255 / 18%);
  }
}

@media (forced-colors: active) {
  .home-action:focus-visible,
  .current-practice-link:focus-visible {
    outline-color: Highlight;
  }

  .workflow-path .workflow-track,
  .workflow-path .workflow-flow {
    stroke: CanvasText;
  }

  .workflow-path .workflow-marker-shape {
    fill: CanvasText;
  }
}
</style>
