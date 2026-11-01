<template>
  <div class="api-demo">
    <div class="demo-form">
      <div class="form-row">
        <label for="ref-input" class="form-label">Document key</label>
        <input
          id="ref-input"
          v-model="reference"
          type="text"
          placeholder="e.g. RFC 8446"
          class="form-input"
          @keyup.enter="fetchData"
        />
      </div>
      <div class="form-row form-row--inline">
        <div class="form-group">
          <span class="form-label">Format</span>
          <div class="format-switch">
            <button
              v-for="f in formats"
              :key="f.id"
              type="button"
              :class="['format-pill', { 'format-pill--active': format === f.id }]"
              @click="format = f.id"
            >
              {{ f.label }}
            </button>
          </div>
        </div>
      </div>
      <button class="fetch-btn" :disabled="loading || !reference" @click="fetchData">
        {{ loading ? 'Fetching...' : 'Fetch' }}
      </button>
    </div>

    <div class="quick-examples">
      <span class="examples-label">Try:</span>
      <button
        v-for="ex in examples"
        :key="ex"
        class="example-pill"
        @click="reference = ex"
      >
        {{ ex }}
      </button>
    </div>

    <div v-if="error" class="result-error">
      {{ error }}
    </div>

    <div v-if="result" class="result-block">
      <div class="result-header">
        <span>Response</span>
        <button class="copy-btn" @click="copyResult">Copy</button>
      </div>
      <pre class="result-pre"><code>{{ result }}</code></pre>
    </div>

    <div v-if="apiUrl" class="api-url">
      <span class="api-url-label">API Endpoint:</span>
      <code class="api-url-value">{{ apiUrl }}</code>
      <button class="copy-btn copy-btn--small" @click="copyUrl">Copy</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { apiDocumentsBase, apiExamples } from '../data/api'

const reference = ref('')
const format = ref<'json' | 'xml' | 'yaml'>('json')
const loading = ref(false)
const result = ref('')
const error = ref('')

const formats = [
  { id: 'json', label: 'JSON' },
  { id: 'xml', label: 'XML' },
  { id: 'yaml', label: 'YAML' },
] as const

const acceptOf = {
  json: 'application/json',
  xml: 'application/relaton+xml',
  yaml: 'application/yaml',
} as const

const examples = apiExamples

const apiUrl = computed(() => {
  if (!result.value) return ''
  return `${apiDocumentsBase}/${encodeURIComponent(reference.value.trim())}`
})

async function fetchData() {
  const key = reference.value.trim()
  if (!key) return
  loading.value = true
  error.value = ''
  result.value = ''

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 30000)

    const res = await fetch(`${apiDocumentsBase}/${encodeURIComponent(key)}`, {
      headers: { Accept: acceptOf[format.value] },
      signal: controller.signal,
    })
    clearTimeout(timer)

    if (res.status === 404) {
      error.value = 'No bibliographic data found for this key.'
      return
    }
    if (res.status === 406) {
      error.value = 'No XML serialization is stored for this document — try JSON or YAML.'
      return
    }
    if (!res.ok) {
      error.value = `Server returned ${res.status} ${res.statusText}.`
      return
    }

    const text = await res.text()
    result.value =
      format.value === 'json' ? JSON.stringify(JSON.parse(text), null, 2)
      : format.value === 'xml' ? formatXml(text)
      : text
  } catch (e: unknown) {
    console.error('API fetch error:', e)
    if (e instanceof DOMException && e.name === 'AbortError') {
      error.value = 'Request timed out. Please try again.'
    } else if (e instanceof TypeError) {
      error.value = `Network error: ${e.message}`
    } else {
      error.value = e instanceof Error ? e.message : 'Unknown error.'
    }
  } finally {
    loading.value = false
  }
}

function formatXml(xml: string): string {
  const doc = new DOMParser().parseFromString(xml, 'application/xml')
  const errorNode = doc.querySelector('parsererror')
  if (errorNode) return xml

  const ser = new XMLSerializer()
  const indent = (str: string) => {
    const lines = str.replace(/></g, '>\n<').split('\n')
    let level = 0
    return lines.map(line => {
      if (line.match(/^<\/\w/)) level--
      const padded = '  '.repeat(Math.max(0, level)) + line
      if (line.match(/^<\w[^>]*[^/]>$/) && !line.match(/^<\w[^>]*\/>$/)) level++
      return padded
    }).join('\n')
  }

  return indent(ser.serializeToString(doc.documentElement))
}

async function copyResult() {
  await navigator.clipboard.writeText(result.value)
}

async function copyUrl() {
  if (apiUrl.value) await navigator.clipboard.writeText(apiUrl.value)
}
</script>

<style scoped>
.api-demo {
  max-width: 768px;
  margin: 0 auto;
}

.demo-form {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
}

.form-row {
  margin-bottom: 16px;
}
.form-row--inline {
  display: flex;
  gap: 24px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--vp-c-text-2);
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: border-color 0.2s;
}
.form-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}
.form-group {
  display: flex;
  flex-direction: column;
}

.format-switch {
  display: inline-flex;
  gap: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 3px;
}

.format-pill {
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.format-pill:hover {
  color: var(--vp-c-text-1);
}
.format-pill--active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-text-1);
}

.fetch-btn {
  padding: 10px 32px;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: inherit;
}
.fetch-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}
.fetch-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quick-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 24px;
}
.examples-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-3);
}
.example-pill {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  font-size: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
  font-family: monospace;
}
.example-pill:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.result-error {
  padding: 16px;
  border: 1px solid #f87171;
  border-radius: 8px;
  background: rgba(248,113,113,0.08);
  color: #dc2626;
  margin-bottom: 16px;
}

.result-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.result-pre {
  padding: 16px;
  overflow-x: auto;
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  max-height: 480px;
  overflow-y: auto;
}
.result-pre code {
  font-family: monospace;
}

.copy-btn {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}
.copy-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.copy-btn--small {
  font-size: 11px;
  padding: 2px 8px;
}

.api-url {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 13px;
}
.api-url-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.api-url-value {
  font-family: monospace;
  word-break: break-all;
}
</style>
