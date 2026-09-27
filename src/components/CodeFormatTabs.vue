<template>
  <div class="code-format-tabs">
    <div class="code-tabs-header">
      <div class="code-tabs-bar">
        <button
          v-for="tab in visibleTabs"
          :key="tab.id"
          :class="['code-tab', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >{{ tab.label }}</button>
      </div>
      <button class="code-copy" @click="copyCode" title="Copy">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      </button>
    </div>
    <div class="code-body">
      <pre><code>{{ currentCode }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  yaml: string
  json: string
  xml: string
  asciibib: string
  bibSpan: string
}>()

const allTabs = [
  { id: 'yaml', label: 'YAML' },
  { id: 'json', label: 'JSON' },
  { id: 'xml', label: 'XML' },
  { id: 'asciibib', label: 'AsciiBib' },
  { id: 'bibspan', label: 'Bib Spans' },
]

const visibleTabs = computed(() =>
  allTabs.filter(t => {
    switch (t.id) {
      case 'yaml': return !!props.yaml
      case 'json': return !!props.json
      case 'xml': return !!props.xml
      case 'asciibib': return !!props.asciibib
      case 'bibspan': return !!props.bibSpan
      default: return false
    }
  })
)

const activeTab = ref('yaml')

const currentCode = computed(() => {
  switch (activeTab.value) {
    case 'yaml': return props.yaml
    case 'json': return props.json
    case 'xml': return props.xml
    case 'asciibib': return props.asciibib
    case 'bibspan': return props.bibSpan
    default: return props.yaml
  }
})

async function copyCode() {
  await navigator.clipboard.writeText(currentCode.value)
}
</script>

<style scoped>
.code-format-tabs {
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  margin: 16px 0;
}
.code-tabs-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}
.code-tabs-bar {
  display: flex;
  gap: 2px;
  overflow-x: auto;
}
.code-tab {
  padding: 8px 14px;
  border: none;
  background: none;
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s;
  font-family: inherit;
  white-space: nowrap;
}
.code-tab:hover {
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
}
.code-tab.active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.code-copy {
  display: inline-flex;
  padding: 4px;
  border: none;
  background: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.15s;
  flex-shrink: 0;
}
.code-copy:hover {
  color: var(--vp-c-text-1);
}
.code-body {
  padding: 16px 20px;
  max-height: 400px;
  overflow-y: auto;
}
.code-body pre {
  margin: 0;
}
.code-body code {
  font-size: 12.5px;
  line-height: 1.6;
  font-family: var(--vp-font-family-mono, monospace);
  white-space: pre;
  color: var(--vp-c-text-1);
}
</style>
