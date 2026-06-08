<template>
  <div class="api-demo">
    <div class="demo-form">
      <div class="form-row">
        <label for="ref-input" class="form-label">Reference</label>
        <input
          id="ref-input"
          v-model="reference"
          type="text"
          placeholder="e.g. ISO 690:2010"
          class="form-input"
          @keyup.enter="fetchData"
        />
      </div>
      <div class="form-row form-row--inline">
        <div class="form-group">
          <label for="year-input" class="form-label">Year (optional)</label>
          <input id="year-input" v-model="year" type="text" class="form-input form-input--short" />
        </div>
        <div class="form-checks">
          <label class="form-check">
            <input v-model="allParts" type="checkbox" /> All parts
          </label>
          <label class="form-check">
            <input v-model="keepYear" type="checkbox" /> Keep year
          </label>
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
import { apiBaseUrl, apiExamples } from '../../data/api'

const reference = ref('')
const year = ref('')
const allParts = ref(false)
const keepYear = ref(false)
const loading = ref(false)
const result = ref('')
const error = ref('')

const examples = apiExamples

const apiUrl = computed(() => {
  if (!result.value) return ''
  const params = new URLSearchParams()
  params.set('reference', reference.value)
  if (year.value) params.set('year', year.value)
  if (allParts.value) params.set('all_parts', 'true')
  if (keepYear.value) params.set('keep_year', 'true')
  return `${apiBaseUrl}?${params.toString()}`
})

async function fetchData() {
  if (!reference.value) return
  loading.value = true
  error.value = ''
  result.value = ''

  try {
    const params = new URLSearchParams()
    params.set('reference', reference.value)
    if (year.value) params.set('year', year.value)
    if (allParts.value) params.set('all_parts', 'true')
    if (keepYear.value) params.set('keep_year', 'true')

    const res = await fetch(`${apiBaseUrl}?${params.toString()}`, {
      signal: AbortSignal.timeout(10000),
    })

    if (res.status === 404) {
      error.value = 'No bibliographic data found for this reference.'
      return
    }
    if (!res.ok) {
      error.value = 'Server error. Please try again.'
      return
    }

    const text = await res.text()
    result.value = formatXml(text)
  } catch (e: unknown) {
    if (e instanceof DOMException && e.name === 'TimeoutError') {
      error.value = 'Request timed out. Please try again.'
    } else {
      error.value = 'Unable to reach the Relaton API.'
    }
  } finally {
    loading.value = false
  }
}

function formatXml(xml: string): string {
  let formatted = ''
  let indent = 0
  const tab = '  '
  xml.split(/>\s*</).forEach(node => {
    if (node.match(/^\/\w/)) indent--
    formatted += tab.repeat(Math.max(0, indent)) + '<' + node + '>\n'
    if (node.match(/^<?\w[^>]*[^/]/) && !node.startsWith('?')) indent++
  })
  return formatted.slice(1, -2)
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
.form-input--short {
  width: 120px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-checks {
  display: flex;
  gap: 16px;
}
.form-check {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  cursor: pointer;
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
