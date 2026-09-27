<template>
  <div class="model-diagram">
    <div v-if="src" class="diagram-wrap">
      <img :src="src" :alt="alt || 'UML Diagram'" class="diagram-img" />
    </div>
    <p v-else class="diagram-empty">No diagram available.</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ src?: string; alt?: string }>()
</script>

<style scoped>
.model-diagram {
  margin: 24px 0;
}

.diagram-wrap {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  overflow-x: auto;
  position: relative;
}
.diagram-wrap::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10%;
  bottom: 10%;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: linear-gradient(180deg, var(--vp-c-brand-1), var(--c-accent));
  opacity: 0.4;
}

.diagram-img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}

.diagram-empty {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 48px 0;
}
</style>
