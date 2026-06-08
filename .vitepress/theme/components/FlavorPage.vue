<template>
  <div class="flavor-page" v-if="flavor">
    <div class="flavor-hero">
      <div class="flavor-hero-inner">
        <div class="flavor-hero-header">
          <img
            v-if="flavor.logo"
            :src="flavor.logo"
            :alt="flavor.label"
            class="flavor-logo"
          />
          <span v-else class="flavor-logo-placeholder">
            {{ flavor.label.charAt(0) }}
          </span>
          <span :class="['badge', `badge--${flavor.category}`]">
            {{ categoryLabel(flavor.category) }}
          </span>
        </div>
        <h1 class="flavor-title">{{ flavor.label }}</h1>
        <p class="flavor-fullname">{{ flavor.fullName }}</p>
        <div class="flavor-sources">
          <a
            v-for="src in flavor.sources"
            :key="src.label"
            :href="src.url"
            target="_blank"
            rel="noopener noreferrer"
            class="source-link"
          >
            {{ src.label }}
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>
      <div class="hero-glow hero-glow--1"></div>
      <div class="hero-glow hero-glow--2"></div>
    </div>

    <div v-if="content" class="flavor-content" v-html="content"></div>
    <div v-else class="flavor-empty">
      <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z"/></svg>
      <p>Citation guide content is not yet available for this organization.</p>
    </div>

    <div class="software-card">
      <div class="software-card-accent"></div>
      <div class="software-card-body">
        <div class="software-card-icon">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </div>
        <h3>Relaton Software</h3>
        <p class="software-desc">
          Use the <strong>{{ gemName }}</strong> gem to fetch bibliographic data.
        </p>
        <div class="install-cmd">
          <span class="install-prefix">$</span>
          <code>gem install {{ gemName }}</code>
          <button class="copy-btn" @click="copyInstall" title="Copy">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
        </div>
        <div class="software-links">
          <a :href="flavor.repoUrl" target="_blank" rel="noopener noreferrer" class="software-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
            GitHub
          </a>
          <a :href="rubygemsUrl" target="_blank" rel="noopener noreferrer" class="software-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6.5 1L1 5.5 3.5 15h9L15 5.5 9.5 1H6.5zM1 5.5l5.5 9m0-13.5L3.5 15M15 5.5l-5.5 9m0-13.5L12.5 15M1 5.5h14M3.5 15h9"/></svg>
            RubyGems
          </a>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flavor-not-found">
    <p>Flavor not found.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Flavor } from '../../data/types'
import { categoryLabel } from '../../data/categories'

const props = defineProps<{ flavor: Flavor; content?: string }>()

const gemName = computed(() => props.flavor?.gem || '')
const rubygemsUrl = computed(() => `https://rubygems.org/gems/${gemName.value}`)

async function copyInstall() {
  await navigator.clipboard.writeText(`gem install ${gemName.value}`)
}
</script>

<style scoped>
.flavor-page {
  max-width: 864px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

.flavor-hero {
  position: relative;
  overflow: hidden;
  padding: 48px 0 36px;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 40px;
}

.flavor-hero-inner {
  position: relative;
  z-index: 1;
}

.flavor-hero-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.flavor-logo {
  width: 52px;
  height: 52px;
  object-fit: contain;
  border-radius: 8px;
}

.flavor-logo-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  font-size: 22px;
  font-weight: 700;
  color: #1F6CF1;
  font-family: 'Outfit', sans-serif;
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.hero-glow--1 {
  width: 300px; height: 300px;
  top: -80px; right: -60px;
  background: radial-gradient(circle, rgba(31,108,241,0.06) 0%, transparent 70%);
}
.hero-glow--2 {
  width: 200px; height: 200px;
  bottom: -40px; left: -40px;
  background: radial-gradient(circle, rgba(33,193,151,0.05) 0%, transparent 70%);
}

.badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 3px 9px;
  border-radius: 4px;
}
.badge--international { background: rgba(31,108,241,0.08); color: #1F6CF1; }
.badge--regional { background: rgba(234,179,8,0.08); color: #B45309; }
.badge--national { background: rgba(33,193,151,0.08); color: #059669; }
.badge--industry { background: rgba(249,115,22,0.08); color: #EA580C; }
.badge--identifier { background: rgba(139,92,246,0.08); color: #7C3AED; }
.badge--other { background: rgba(107,114,128,0.08); color: #6B7280; }

.flavor-title {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.flavor-fullname {
  font-size: 17px;
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
  line-height: 1.5;
}

.flavor-sources {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.source-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: #1F6CF1;
  text-decoration: none;
  font-weight: 500;
  padding: 4px 10px;
  border: 1px solid rgba(31,108,241,0.2);
  border-radius: 6px;
  transition: all 0.15s;
}
.source-link:hover {
  background: rgba(31,108,241,0.06);
  border-color: rgba(31,108,241,0.4);
}
.source-link svg {
  flex-shrink: 0;
  opacity: 0.7;
}

.flavor-content {
  line-height: 1.7;
}
.flavor-content :deep(h2) {
  margin-top: 48px;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.01em;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.flavor-content :deep(h3) {
  margin-top: 32px;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 600;
}
.flavor-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 14px;
}
.flavor-content :deep(th),
.flavor-content :deep(td) {
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}
.flavor-content :deep(th) {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  font-size: 13px;
}
.flavor-content :deep(code) {
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.88em;
}
.flavor-content :deep(pre) {
  background: var(--vp-c-bg-soft);
  padding: 16px 20px;
  border-radius: 10px;
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
}
.flavor-content :deep(pre code) {
  background: none;
  padding: 0;
}
.flavor-content :deep(blockquote) {
  border-left: 3px solid #1F6CF1;
  padding-left: 16px;
  color: var(--vp-c-text-2);
  margin: 16px 0;
}

.flavor-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 64px 0;
  text-align: center;
  color: var(--vp-c-text-3);
}
.flavor-empty svg {
  opacity: 0.3;
}

.software-card {
  position: relative;
  margin-top: 56px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  transition: border-color 0.15s;
}
.software-card:hover {
  border-color: rgba(31,108,241,0.3);
}

.software-card-accent {
  height: 3px;
  background: linear-gradient(90deg, #1F6CF1, #21C197);
}

.software-card-body {
  padding: 24px;
}

.software-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(31,108,241,0.08);
  color: #1F6CF1;
  margin-bottom: 12px;
}

.software-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
}

.software-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.install-cmd {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--vp-c-bg);
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
  font-size: 14px;
}
.install-prefix {
  color: var(--vp-c-text-3);
  font-weight: 600;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 13px;
}
.install-cmd code {
  flex: 1;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 13px;
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  padding: 4px;
  border: none;
  background: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.15s;
}
.copy-btn:hover {
  color: #1F6CF1;
}

.software-links {
  display: flex;
  gap: 12px;
}

.software-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #1F6CF1;
  text-decoration: none;
  transition: opacity 0.15s;
}
.software-link:hover {
  opacity: 0.8;
}

.flavor-not-found {
  text-align: center;
  padding: 96px 0;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .flavor-title { font-size: 28px; }
  .flavor-hero { padding: 32px 0 24px; }
  .flavor-logo { width: 44px; height: 44px; }
  .flavor-logo-placeholder { width: 44px; height: 44px; font-size: 18px; }
}
</style>
