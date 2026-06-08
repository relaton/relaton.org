---
layout: page
outline: false
---

<FlavorPage :flavor="flavorData" :content="renderedContent" />

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'
import MarkdownIt from 'markdown-it'
import { flavors } from '../.vitepress/data/flavors'
import type { Flavor } from '../.vitepress/data/types'

const { page } = useData()
const flavorId = (page.value.params?.flavor as string) || ''
const flavorData: Flavor | undefined = flavors.find(f => f.id === flavorId)

const rawContent = ref('')
const md = new MarkdownIt({ html: true, linkify: true, typographer: true })

const renderedContent = computed(() => {
  if (!rawContent.value) return ''
  const html = md.render(rawContent.value)
  return html
})

onMounted(async () => {
  if (!flavorId) return
  try {
    const res = await fetch(`/flavors/content/${flavorId}.md`)
    if (res.ok) {
      const text = await res.text()
      rawContent.value = text.replace(/^---[\s\S]*?---\n*/, '')
    }
  } catch {
    rawContent.value = ''
  }
})
</script>
