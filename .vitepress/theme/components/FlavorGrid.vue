<template>
  <div class="flavor-grid">
    <GridControls
      v-model:search="search"
      v-model:active-category="activeCategory"
      placeholder="Search organizations…"
      aria-label="Search organizations"
      :categories="categories"
    />

    <div class="grid">
      <a
        v-for="flavor in filteredFlavors"
        :key="flavor.id"
        :href="`/flavors/${flavor.id}`"
        class="flavor-card entry-card"
      >
        <div class="flavor-card-top">
          <img
            v-if="flavor.logo"
            :src="flavor.logo"
            :alt="flavor.label"
            :class="['flavor-logo', { 'flavor-logo-light': flavor.logoVariant === 'light' }]"
            loading="lazy"
          />
          <span v-else class="flavor-logo-placeholder">
            {{ flavor.label.charAt(0) }}
          </span>
          <span :class="['badge', `badge--${flavor.category}`]">
            {{ categoryLabel(flavor.category) }}
          </span>
        </div>
        <span class="flavor-label">{{ flavor.label }}</span>
        <span class="flavor-fullname">{{ flavor.fullName }}</span>
        <span class="flavor-arrow">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 5l7 7-7 7"/></svg>
        </span>
      </a>
    </div>

    <p v-if="!filteredFlavors.length" class="empty-state">
      No organizations match your search.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { flavors } from '../../data/flavors'
import { categoryLabel } from '../../data/categories'
import GridControls from './GridControls.vue'

const search = ref('')
const activeCategory = ref('all')

const categories = computed(() => {
  const cats = [
    { label: 'All', value: 'all', count: flavors.length },
    { label: 'International', value: 'international', count: flavors.filter(f => f.category === 'international').length },
    { label: 'Regional', value: 'regional', count: flavors.filter(f => f.category === 'regional').length },
    { label: 'National', value: 'national', count: flavors.filter(f => f.category === 'national').length },
    { label: 'Industry', value: 'industry', count: flavors.filter(f => f.category === 'industry').length },
    { label: 'Identifiers', value: 'identifier', count: flavors.filter(f => f.category === 'identifier').length },
    { label: 'Other', value: 'other', count: flavors.filter(f => f.category === 'other').length },
  ]
  return cats.filter(c => c.value === 'all' || c.count > 0)
})

const filteredFlavors = computed(() => {
  const q = search.value.toLowerCase()
  return flavors.filter(f => {
    const matchCat = activeCategory.value === 'all' || f.category === activeCategory.value
    const matchSearch = !q
      || f.label.toLowerCase().includes(q)
      || f.fullName.toLowerCase().includes(q)
      || f.id.toLowerCase().includes(q)
    return matchCat && matchSearch
  })
})
</script>

<style scoped>
.flavor-grid {
  margin-top: 8px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.flavor-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  background: var(--vp-c-bg);
  transition: border-color 0.15s, background 0.15s;
}
.flavor-card:hover {
  border-color: var(--c-brand-border);
}

.flavor-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.flavor-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 6px;
}

.flavor-logo-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  font-family: 'Outfit', sans-serif;
}

.flavor-label {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--vp-c-text-1);
}
.flavor-fullname {
  font-size: 12px;
  color: var(--vp-c-text-3);
  line-height: 1.4;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.flavor-arrow {
  position: absolute;
  top: 20px;
  right: 16px;
  color: var(--vp-c-text-3);
  opacity: 0;
  transition: opacity 0.15s, transform 0.15s;
}
.flavor-card:hover .flavor-arrow {
  opacity: 1;
  transform: translateX(2px);
  color: var(--vp-c-brand-1);
}

.empty-state {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 48px 0;
}

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
