<template>
  <div class="blog-byline">
    <div class="byline-inner">
      <div v-if="authors.length" class="byline-authors">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        {{ authors.join(', ') }}
      </div>
      <div class="byline-date">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        {{ formattedDate }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

const authors = computed(() => frontmatter.value.authors || [])

const formattedDate = computed(() => {
  const date = frontmatter.value.date
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
})
</script>

<style scoped>
.blog-byline {
  padding: 16px 0;
  margin-bottom: 32px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.byline-inner {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.byline-authors,
.byline-date {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.byline-authors svg,
.byline-date svg {
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}
.byline-authors {
  font-weight: 500;
}
.byline-date {
  color: var(--vp-c-text-3);
  font-size: 13px;
}
</style>
