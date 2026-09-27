<template>
  <div class="grid-controls">
    <div class="search-wrap">
      <svg class="search-icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input
        v-model="search"
        type="text"
        :placeholder="placeholder"
        :aria-label="ariaLabel"
        class="search-input"
      />
    </div>
    <div class="filter-tabs">
      <button
        v-for="cat in categories"
        :key="cat.value"
        :class="['tab', { active: activeCategory === cat.value }]"
        @click="activeCategory = cat.value"
      >
        {{ cat.label }}
        <span v-if="cat.count" class="tab-count">{{ cat.count }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FilterCategory {
  label: string
  value: string
  count?: number
}

defineProps<{
  placeholder: string
  ariaLabel: string
  categories: FilterCategory[]
}>()

const search = defineModel<string>('search', { default: '' })
const activeCategory = defineModel<string>('activeCategory', { default: 'all' })
</script>

<style scoped>
.grid-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
}

.search-wrap {
  position: relative;
  flex-shrink: 0;
}
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-3);
  pointer-events: none;
}
.search-input {
  width: 260px;
  padding: 9px 14px 9px 36px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  font-size: 13px;
  font-family: inherit;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.filter-tabs {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}
.tab:hover {
  border-color: var(--c-brand-border-strong);
  color: var(--vp-c-brand-1);
}
.tab.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}
.tab-count {
  font-size: 10px;
  font-weight: 600;
  opacity: 0.6;
}
.tab.active .tab-count {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .grid-controls { flex-direction: column; align-items: stretch; }
  .search-input { width: 100%; }
}
</style>
