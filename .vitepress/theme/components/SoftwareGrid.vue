<template>
  <div class="software-grid">
    <GridControls
      v-model:search="search"
      v-model:active-category="activeCategory"
      placeholder="Search gems…"
      aria-label="Search gems"
      :categories="categories"
    />

    <div class="grid">
      <a
        v-for="gem in filteredGems"
        :key="gem.id"
        :href="`/software/${gem.id}`"
        class="gem-card entry-card"
      >
        <div class="gem-header">
          <span class="gem-name">{{ gem.name }}</span>
          <span :class="['badge', `badge--${gem.category}`]">
            {{ gem.category }}
          </span>
        </div>
        <p class="gem-desc">{{ gem.description }}</p>
        <div class="gem-install">
          <code>gem install {{ gem.name }}</code>
        </div>
        <span class="gem-arrow">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 5l7 7-7 7"/></svg>
        </span>
      </a>
    </div>

    <p v-if="!filteredGems.length" class="empty-state">
      No gems match your search.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { gems } from '../../data/software'
import GridControls from './GridControls.vue'

const search = ref('')
const activeCategory = ref('all')

const categories = computed(() => {
  return [
    { label: 'All', value: 'all', count: gems.length },
    { label: 'Core', value: 'core', count: gems.filter(g => g.category === 'core').length },
    { label: 'Tools', value: 'tool', count: gems.filter(g => g.category === 'tool').length },
    { label: 'Flavors', value: 'flavor', count: gems.filter(g => g.category === 'flavor').length },
  ]
})

const filteredGems = computed(() => {
  const q = search.value.toLowerCase()
  return gems.filter(g => {
    const matchCat = activeCategory.value === 'all' || g.category === activeCategory.value
    const matchSearch = !q
      || g.name.toLowerCase().includes(q)
      || g.description.toLowerCase().includes(q)
      || g.displayName.toLowerCase().includes(q)
    return matchCat && matchSearch
  })
})
</script>

<style scoped>
.software-grid { margin-top: 8px; }

.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }

.gem-card {
  position: relative;
  display: flex; flex-direction: column;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  background: var(--vp-c-bg);
  transition: border-color 0.15s, background 0.15s;
}
.gem-card:hover { border-color: var(--c-brand-border); }

.gem-header {
  display: flex; justify-content: space-between;
  align-items: flex-start; margin-bottom: 8px;
}
.gem-name {
  font-size: 14px; font-weight: 600;
  font-family: var(--vp-font-family-mono, monospace);
  color: var(--vp-c-text-1);
}

.gem-desc {
  font-size: 13px; line-height: 1.5;
  color: var(--vp-c-text-2);
  flex: 1; margin-bottom: 12px;
}

.gem-install {
  background: var(--vp-c-bg-soft);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
}
.gem-install code { font-size: 12px; }

.gem-arrow {
  position: absolute; top: 20px; right: 16px;
  color: var(--vp-c-text-3);
  opacity: 0;
  transition: opacity 0.15s, transform 0.15s;
}
.gem-card:hover .gem-arrow {
  opacity: 1; transform: translateX(2px); color: var(--vp-c-brand-1);
}

.empty-state { text-align: center; color: var(--vp-c-text-3); padding: 48px 0; }

@media (max-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
