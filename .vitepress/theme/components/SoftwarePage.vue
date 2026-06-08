<template>
  <div class="software-page" v-if="gem">
    <div class="sp-hero">
      <div class="sp-hero-inner">
        <div class="sp-hero-row">
          <div>
            <span :class="['badge', `badge--${gem.category}`]">
              {{ gem.category }}
            </span>
            <h1 class="sp-title">{{ gem.displayName }}</h1>
            <p class="sp-desc">{{ gem.description }}</p>
          </div>
          <div class="sp-hero-actions">
            <a :href="gem.repoUrl" target="_blank" rel="noopener noreferrer" class="sp-action-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
              GitHub
            </a>
            <a :href="rubygemsUrl" target="_blank" rel="noopener noreferrer" class="sp-action-btn sp-action-btn--outline">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6.5 1L1 5.5 3.5 15h9L15 5.5 9.5 1H6.5z"/></svg>
              RubyGems
            </a>
          </div>
        </div>
      </div>
      <div class="sp-hero-glow"></div>
    </div>

    <section class="sp-section">
      <h2 class="sp-section-title">Installation</h2>
      <div class="sp-code-block">
        <span class="sp-code-prompt">$</span>
        <code>gem install {{ gem.name }}</code>
        <button class="sp-copy" @click="copy(`gem install ${gem.name}`)" title="Copy">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
      </div>
    </section>

    <section class="sp-section">
      <h2 class="sp-section-title">Quick Start</h2>
      <div class="sp-code-block sp-code-block--multiline">
        <button class="sp-copy sp-copy--corner" @click="copy(quickStartCode)" title="Copy">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
        <pre><code>{{ quickStartCode }}</code></pre>
      </div>
    </section>

    <section class="sp-section">
      <h2 class="sp-section-title">Links</h2>
      <div class="sp-link-grid">
        <a :href="gem.repoUrl" target="_blank" rel="noopener noreferrer" class="sp-link-card entry-card">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
          <div>
            <span class="sp-link-card-label">GitHub Repository</span>
            <span class="sp-link-card-sub">Source code and issues</span>
          </div>
        </a>
        <a :href="rubygemsUrl" target="_blank" rel="noopener noreferrer" class="sp-link-card entry-card">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M6.5 1L1 5.5 3.5 15h9L15 5.5 9.5 1H6.5zM1 5.5l5.5 9m0-13.5L3.5 15M15 5.5l-5.5 9m0-13.5L12.5 15M1 5.5h14M3.5 15h9"/></svg>
          <div>
            <span class="sp-link-card-label">RubyGems</span>
            <span class="sp-link-card-sub">Package registry</span>
          </div>
        </a>
      </div>
    </section>

    <section v-if="relatedFlavor" class="sp-section">
      <h2 class="sp-section-title">Related</h2>
      <a :href="`/flavors/${relatedFlavor.id}`" class="sp-related-card entry-card">
        <div class="sp-related-accent"></div>
        <div class="sp-related-body">
          <span class="sp-related-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </span>
          <span>View {{ relatedFlavor.label }} citation guide</span>
          <svg class="sp-related-arrow" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 5l7 7-7 7"/></svg>
        </div>
      </a>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SoftwareGem } from '../../data/types'
import { flavors } from '../../data/flavors'

const props = defineProps<{ gem: SoftwareGem }>()

const rubygemsUrl = computed(() => `https://rubygems.org/gems/${props.gem?.name}`)

const relatedFlavor = computed(() => {
  if (!props.gem?.flavorId) return null
  return flavors.find(f => f.id === props.gem.flavorId) || null
})

const quickStartCode = computed(() => {
  const name = props.gem?.name || 'relaton'
  const module = name.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('')
  return `require '${name}'

# Fetch a bibliographic item
bib = ${module}::Bibliography.get("ISO 690:2010")
puts bib.to_xml`
})

async function copy(text: string) {
  await navigator.clipboard.writeText(text)
}
</script>

<style scoped>
.software-page {
  max-width: 864px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

.sp-hero {
  position: relative;
  overflow: hidden;
  padding: 48px 0 36px;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 40px;
}

.sp-hero-inner { position: relative; z-index: 1; }

.sp-hero-glow {
  position: absolute;
  width: 350px; height: 350px;
  top: -100px; right: -80px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(31,108,241,0.05) 0%, transparent 70%);
  pointer-events: none;
}

.sp-hero-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
}

.sp-hero-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  padding-top: 4px;
}

.sp-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.15s;
  background: #1F6CF1;
  color: #fff;
}
.sp-action-btn:hover { background: #1560D8; }
.sp-action-btn--outline {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}
.sp-action-btn--outline:hover {
  border-color: rgba(31,108,241,0.4);
  color: #1F6CF1;
  background: rgba(31,108,241,0.04);
}

.badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 3px 9px;
  border-radius: 4px;
  margin-bottom: 12px;
}
.badge--core { background: rgba(31,108,241,0.08); color: #1F6CF1; }
.badge--tool { background: rgba(33,193,151,0.08); color: #059669; }
.badge--flavor { background: rgba(107,114,128,0.08); color: #6B7280; }

.sp-title {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  font-family: var(--vp-font-family-mono, monospace);
}

.sp-desc {
  font-size: 17px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.sp-section { margin-bottom: 40px; }

.sp-section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}

.sp-code-block {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--vp-c-bg-soft);
  padding: 14px 18px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}
.sp-code-block--multiline {
  flex-direction: column;
  align-items: stretch;
}
.sp-code-block--multiline pre {
  margin: 0;
}
.sp-code-block code {
  font-size: 14px;
  font-family: var(--vp-font-family-mono, monospace);
}
.sp-code-prompt {
  color: var(--vp-c-text-3);
  font-weight: 600;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 13px;
}

.sp-copy {
  display: inline-flex;
  align-items: center;
  padding: 4px;
  border: none;
  background: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.15s;
  margin-left: auto;
  flex-shrink: 0;
}
.sp-copy:hover { color: #1F6CF1; }
.sp-copy--corner {
  position: absolute;
  top: 12px;
  right: 12px;
}

.sp-link-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.sp-link-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  background: var(--vp-c-bg);
  transition: border-color 0.15s;
}
.sp-link-card svg {
  flex-shrink: 0;
  color: #1F6CF1;
}
.sp-link-card:hover {
  border-color: rgba(31,108,241,0.3);
}

.sp-link-card-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
}
.sp-link-card-sub {
  display: block;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 2px;
}

.sp-related-card {
  position: relative;
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  background: var(--vp-c-bg);
  transition: border-color 0.15s;
}
.sp-related-card:hover {
  border-color: rgba(31,108,241,0.3);
}

.sp-related-accent {
  height: 3px;
  background: linear-gradient(90deg, #21C197, #1F6CF1);
}

.sp-related-body {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 500;
}

.sp-related-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(33,193,151,0.08);
  color: #059669;
  flex-shrink: 0;
}

.sp-related-arrow {
  margin-left: auto;
  color: var(--vp-c-text-3);
  transition: transform 0.15s, color 0.15s;
}
.sp-related-card:hover .sp-related-arrow {
  transform: translateX(3px);
  color: #1F6CF1;
}

@media (max-width: 640px) {
  .sp-title { font-size: 28px; }
  .sp-hero { padding: 32px 0 24px; }
  .sp-hero-row { flex-direction: column; }
  .sp-hero-actions { width: 100%; }
  .sp-action-btn { flex: 1; justify-content: center; }
  .sp-link-grid { grid-template-columns: 1fr; }
}
</style>
