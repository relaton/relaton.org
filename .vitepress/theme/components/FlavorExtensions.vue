<template>
  <div class="flavor-extensions" v-if="data">
    <h2>Model Extensions</h2>

    <div class="ext-intro">
      <p>{{ data.description }}</p>
      <div v-if="data.inheritsFrom" class="ext-inheritance">
        Inherits from <span class="ext-inherits-label">{{ data.inheritsFrom }}</span>
        <span class="ext-badge">+ {{ data.extensions.length }} additional fields</span>
      </div>
      <div v-else class="ext-inheritance">
        Extends <a href="/model/">BibliographicItem</a> directly
        <span class="ext-badge">{{ data.extensions.length }} fields</span>
      </div>
    </div>

    <div class="ext-table-wrap">
      <table class="ext-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="field in data.extensions" :key="field.name">
            <td><code>{{ field.name }}</code></td>
            <td>
              <span class="type-tag">{{ field.type }}</span>
              <span v-if="field.required" class="required-tag">required</span>
            </td>
            <td>
              {{ field.description }}
              <div v-if="field.enum" class="enum-values">
                <code v-for="v in field.enum.slice(0, 6)" :key="v">{{ v }}</code>
                <span v-if="field.enum.length > 6" class="more-count">+{{ field.enum.length - 6 }} more</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="data.customClasses?.length" class="ext-classes">
      <h3>Custom Classes</h3>
      <div v-for="cls in data.customClasses" :key="cls.name" class="ext-class-card">
        <div class="ext-class-header">
          <code class="ext-class-name">{{ cls.name }}</code>
          <span class="ext-class-desc">{{ cls.description }}</span>
        </div>
        <table class="ext-table ext-table--inner">
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="field in cls.fields" :key="field.name">
              <td><code>{{ field.name }}</code></td>
              <td><span class="type-tag">{{ field.type }}</span></td>
              <td>
                {{ field.description }}
                <div v-if="field.enum" class="enum-values">
                  <code v-for="v in field.enum.slice(0, 6)" :key="v">{{ v }}</code>
                  <span v-if="field.enum.length > 6" class="more-count">+{{ field.enum.length - 6 }} more</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="data.example" class="ext-example">
      <h3>Example</h3>
      <p class="ext-example-desc">{{ data.example.description }}</p>
      <CodeFormatTabs
        :yaml="data.example.yaml"
        :json="data.example.json"
        :xml="data.example.xml"
        :asciibib="data.example.asciibib"
        :bib-span="data.example.bibSpans"
      />
    </div>

    <div class="ext-repo">
      <a :href="data.repoUrl" target="_blank" rel="noopener">
        View source on GitHub
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FlavorExtensionData } from '../../data/types'
import CodeFormatTabs from './CodeFormatTabs.vue'

defineProps<{
  data: FlavorExtensionData
}>()
</script>

<style scoped>
.flavor-extensions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}
.flavor-extensions h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
}
.flavor-extensions h3 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 12px;
  margin-top: 24px;
}

.ext-intro {
  margin-bottom: 24px;
}
.ext-intro p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}
.ext-inheritance {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-3);
  flex-wrap: wrap;
}
.ext-inheritance a {
  color: #1F6CF1;
  text-decoration: none;
  font-weight: 500;
}
.ext-inherits-label {
  color: #1F6CF1;
  font-weight: 500;
}
.ext-badge {
  background: var(--vp-c-brand-soft);
  color: #1F6CF1;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
}

.ext-table-wrap {
  overflow-x: auto;
}
.ext-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.ext-table th {
  text-align: left;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
}
.ext-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: top;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
.ext-table code {
  font-size: 12px;
  font-family: var(--vp-font-family-mono, monospace);
  background: var(--vp-c-bg-soft);
  padding: 1px 5px;
  border-radius: 4px;
}
.type-tag {
  font-size: 11px;
  font-family: var(--vp-font-family-mono, monospace);
  color: var(--vp-c-text-3);
}
.required-tag {
  font-size: 10px;
  font-weight: 600;
  color: #B45309;
  background: rgba(234,179,8,0.1);
  padding: 1px 5px;
  border-radius: 3px;
  margin-left: 4px;
}
.enum-values {
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.enum-values code {
  font-size: 11px;
}
.more-count {
  font-size: 11px;
  color: var(--vp-c-text-3);
}
.ext-table--inner {
  margin-top: 8px;
}

.ext-class-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 12px;
}
.ext-class-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.ext-class-name {
  font-size: 14px;
  font-weight: 600;
  font-family: var(--vp-font-family-mono, monospace);
  color: var(--vp-c-text-1);
}
.ext-class-desc {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.ext-example {
  margin-top: 24px;
}
.ext-example-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.ext-repo {
  margin-top: 16px;
}
.ext-repo a {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #1F6CF1;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
}
.ext-repo a:hover {
  text-decoration: underline;
}
</style>
