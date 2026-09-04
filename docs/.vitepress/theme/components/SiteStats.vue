<template>
  <section class="site-stats" aria-labelledby="site-stats-title">
    <div class="site-stats-intro">
      <p class="site-stats-meta" aria-hidden="true">03 / READING LOG</p>
      <h2 id="site-stats-title">本站足迹</h2>
      <p>每一次阅读，都是这份长期记录的一部分。</p>
    </div>

    <dl class="site-stats-list">
      <div class="site-stats-item">
        <dt>独立访客</dt>
        <dd>
          <span
            id="busuanzi_container_site_uv"
            class="site-stats-value"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span class="site-stats-sr-only">独立访客：</span>
            <!-- 占位符 --：脚本未就绪时显示，加载成功后被覆盖 -->
            <span id="busuanzi_value_site_uv">--</span>
            <span class="site-stats-unit">UV</span>
          </span>
        </dd>
      </div>

      <div class="site-stats-item">
        <dt>累计访问</dt>
        <dd>
          <span
            id="busuanzi_container_site_pv"
            class="site-stats-value"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span class="site-stats-sr-only">累计访问：</span>
            <span id="busuanzi_value_site_pv">--</span>
            <span class="site-stats-unit">PV</span>
          </span>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.site-stats [id^='busuanzi_container_'] {
  display: inline-flex !important;
}

.site-stats {
  display: grid;
  gap: clamp(2.5rem, 7vw, 6rem);
  align-items: end;
}

.site-stats-intro {
  max-width: 36rem;
}

.site-stats-meta {
  margin: 0 0 0.625rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.08em;
}

.site-stats h2 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-family: 'Source Han Serif SC', 'Noto Serif CJK SC', 'Songti SC', STSong,
    serif;
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.035em;
}

.site-stats-intro > p:last-child {
  margin: 0.75rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.site-stats-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  min-width: 0;
  margin: 0;
}

.site-stats-item {
  min-width: 0;
  padding-inline: clamp(1rem, 3vw, 2rem);
}

.site-stats-item:first-child {
  padding-inline-start: 0;
  border-inline-end: 1px solid var(--vp-c-divider);
}

.site-stats-item:last-child {
  padding-inline-end: 0;
}

.site-stats-item dt {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;
}

.site-stats-item dd {
  margin: 0.4rem 0 0;
}

.site-stats-value {
  align-items: baseline;
  gap: 0.35rem;
  color: var(--vp-c-text-1);
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 650;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.site-stats-unit {
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
}

.site-stats-sr-only {
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

@media (max-width: 30rem) {
  .site-stats-item {
    padding-inline: 0.75rem;
  }

  .site-stats-item:first-child {
    padding-inline-start: 0;
  }

  .site-stats-item:last-child {
    padding-inline-end: 0;
  }

  .site-stats-value {
    gap: 0.25rem;
    font-size: clamp(1.125rem, 5.5vw, 1.375rem);
  }
}

@media (min-width: 48rem) {
  .site-stats {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .site-stats-list {
    min-width: min(100%, 25rem);
  }
}
</style>
