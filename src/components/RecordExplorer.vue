<template>
  <div class="explorer">
    <div class="search-zone">
      <input
        v-model="query"
        type="search"
        class="search-input"
        placeholder="Search titles or identifiers — try “ISO 9001”, “ITU-T G.989”, “RFC 8446”"
        aria-label="Search the Relaton Index"
        @input="onQueryInput"
        @keyup.enter="searchNow"
      />
      <p v-if="searching" class="search-note">Searching…</p>
      <p v-else-if="query && !searching && results.length === 0" class="search-note">
        No documents match “{{ query }}”. Try a looser fragment or an identifier.
      </p>
      <ul v-if="results.length > 0" class="result-list">
        <li v-for="r in results" :key="r.key">
          <button
            type="button"
            class="result-row"
            :class="{ 'result-row--active': r.key === selectedKey }"
            @click="open(r.key)"
          >
            <span class="result-docid">{{ r.docid }}</span>
            <span v-if="r.title" class="result-title">{{ r.title }}</span>
            <span v-if="r.flavor" class="result-flavor">{{ r.flavor }}</span>
            <span v-if="r.year" class="result-year">{{ r.year }}</span>
          </button>
        </li>
      </ul>
    </div>

    <div v-if="record" class="record-zone">
      <section class="record-head">
        <h2 class="record-docid">{{ record.docid || record.key }}</h2>
        <p v-for="t in recordTitles" :key="t" class="record-title">{{ t }}</p>
        <dl class="record-meta">
          <div v-for="m in recordMeta" :key="m.label" class="meta-row">
            <dt>{{ m.label }}</dt>
            <dd>{{ m.value }}</dd>
          </div>
        </dl>
        <div class="record-links">
          <a v-if="recordUrl" :href="recordUrl" target="_blank" rel="noopener noreferrer">Get from the publisher ↗</a>
          <a href="https://api.relaton.org/api" target="_blank" rel="noopener noreferrer">API</a>
        </div>
      </section>

      <section class="cite-bar" aria-label="Citation styles">
        <div class="cite-styles">
          <button
            v-for="s in styles"
            :key="s"
            type="button"
            class="cite-pill"
            :class="{ 'cite-pill--active': s === style }"
            @click="style = s"
          >
            {{ s }}
          </button>
        </div>
        <div class="cite-output">
          <pre v-if="citation">{{ citation }}</pre>
          <button v-if="citation" type="button" class="copy-btn" @click="copyCitation">
            {{ copied ? "Copied ✓" : "Copy" }}
          </button>
        </div>
      </section>

      <section v-if="record" class="record-history">
        <div class="history-head">
          <h3>Record story</h3>
          <div class="view-switch">
            <button
              type="button"
              class="cite-pill"
              :class="{ 'cite-pill--active': view === 'timeline' }"
              @click="view = 'timeline'"
            >
              Timeline
            </button>
            <button
              type="button"
              class="cite-pill"
              :class="{ 'cite-pill--active': view === 'graph' }"
              @click="view = 'graph'"
            >
              Graph
            </button>
          </div>
        </div>
        <ol v-if="view === 'timeline' && timeline.length > 0" class="timeline">
          <li v-for="(e, i) in timeline" :key="i" class="timeline-row">
            <span class="timeline-year">{{ e.year ?? "—" }}</span>
            <span class="timeline-type">{{ e.type }}</span>
            <span class="timeline-target">
              <button v-if="e.direction !== 'self'" type="button" class="timeline-link" @click="open(e.key)">
                {{ e.docid || e.key }}
              </button>
              <template v-else>{{ e.docid || e.key }}</template>
              <span v-if="e.title" class="timeline-title">{{ e.title }}</span>
            </span>
          </li>
        </ol>
        <p v-else-if="view === 'timeline'" class="history-empty">
          No relation events stored for this document yet.
        </p>
        <RelationGraph v-else :doc-key="selectedKey!" @open="open" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import RelationGraph from "./RelationGraph.vue";

const API = "https://api.relaton.org/v3";

const styles = ["iso690", "chicago", "apa", "mla", "bibtex", "ris", "csl-json"] as const;

const query = ref("");
const searching = ref(false);
const results = ref<{ key: string; docid: string; title: string | null; flavor: string; year: number | null }[]>([]);
const selectedKey = ref<string | null>(null);
const record = ref<Record<string, unknown> | null>(null);
const timeline = ref<{ type: string; direction: string; key: string; docid: string | null; year: number | null; title: string | null }[]>([]);
const view = ref<"timeline" | "graph">("timeline");
const style = ref<(typeof styles)[number]>("iso690");
const citation = ref("");
const copied = ref(false);

let searchTimer: ReturnType<typeof setTimeout> | undefined;
let citationToken = 0;

interface SearchResult {
  key: string;
  docid?: string;
  title?: string | null;
  flavor?: string;
  year?: number | null;
}

interface CiteEnvelope {
  citation?: string;
}

async function searchNow() {
  const q = query.value.trim();
  if (!q) {
    results.value = [];
    return;
  }
  searching.value = true;
  try {
    const res = await fetch(`${API}/documents?q=${encodeURIComponent(q)}&limit=10`, {
      headers: { accept: "application/json" },
    });
    const body = (await res.json()) as { items?: SearchResult[] };
    results.value = (body.items ?? []).map((i) => ({
      key: i.key,
      docid: i.docid ?? i.key,
      title: i.title ?? null,
      flavor: i.flavor ?? "",
      year: i.year ?? null,
    }));
  } catch {
    results.value = [];
  } finally {
    searching.value = false;
  }
}

function onQueryInput() {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(searchNow, 300);
  syncUrl();
}

async function open(key: string) {
  selectedKey.value = key;
  record.value = null;
  timeline.value = [];
  citation.value = "";
  syncUrl();
  try {
    const [recRes, tlRes] = await Promise.all([
      fetch(`${API}/documents/${encodeURIComponent(key)}`, { headers: { accept: "application/json" } }),
      fetch(`${API}/documents/${encodeURIComponent(key)}/timeline`, { headers: { accept: "application/json" } }),
    ]);
    if (recRes.ok) record.value = (await recRes.json()) as Record<string, unknown>;
    if (tlRes.ok) {
      const body = (await tlRes.json()) as { events?: typeof timeline.value };
      timeline.value = body.events ?? [];
    }
    loadCitation();
  } catch {
    /* record panel stays empty on network failure */
  }
}

async function loadCitation() {
  const key = selectedKey.value;
  if (!key || !record.value) return;
  const token = ++citationalToken;
  try {
    const res = await fetch(`${API}/cite`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ key, style: style.value }),
    });
    const body = (await res.json()) as CiteEnvelope;
    if (token === citationalToken) citation.value = body.citation ?? "";
  } catch {
    if (token === citationalToken) citation.value = "";
  }
  copied.value = false;
}

async function copyCitation() {
  if (!citation.value) return;
  try {
    await navigator.clipboard.writeText(citation.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch {
    /* clipboard unavailable */
  }
}

function syncUrl() {
  const params = new URLSearchParams();
  if (query.value.trim()) params.set("q", query.value.trim());
  if (selectedKey.value) params.set("key", selectedKey.value);
  const qs = params.toString();
  history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
}

function textOf(v: unknown): string | null {
  if (typeof v === "string") return v;
  if (Array.isArray(v) && typeof v[0] === "string") return v[0];
  if (Array.isArray(v) && v[0] && typeof v[0] === "object" && "content" in (v[0] as object)) {
    return String((v[0] as { content: unknown }).content);
  }
  return null;
}

const recordTitles = computed(() => {
  const titles = record.value?.title;
  if (!Array.isArray(titles)) return [];
  return titles
    .map((t) => (t && typeof t === "object" ? textOf((t as { content?: unknown }).content) : textOf(t)))
    .filter((t): t is string => Boolean(t));
});

const recordMeta = computed(() => {
  const r = record.value ?? {};
  const rows: { label: string; value: string }[] = [];
  const docids = Array.isArray(r.docidentifier) ? r.docidentifier : [];
  const primary = docids.find((d) => d && typeof d === "object" && (d as { primary?: unknown }).primary === true);
  const docid = textOf(primary ? (primary as { content?: unknown }).content : null) ?? r.docid;
  if (typeof docid === "string" && docid) rows.push({ label: "Identifier", value: docid });
  if (typeof r.flavor === "string" && r.flavor) rows.push({ label: "Flavor", value: r.flavor });
  if (typeof r.doctype === "string" && r.doctype) rows.push({ label: "Type", value: r.doctype });
  if (typeof r.status === "string" && r.status) rows.push({ label: "Status", value: r.status });
  const dates = Array.isArray(r.date) ? r.date : [];
  const published = dates.find((d) => d && typeof d === "object" && (d as { type?: unknown }).type === "published");
  const on = published ? (published as { on?: unknown }).on : null;
  if (typeof on === "string" && on) rows.push({ label: "Published", value: on });
  if (typeof r.key === "string") rows.push({ label: "Corpus key", value: r.key });
  return rows;
});

const recordUrl = computed(() => {
  const links = record.value?.link;
  if (!Array.isArray(links)) return null;
  for (const l of links) {
    const url = l && typeof l === "object" ? (l as { content?: unknown; url?: unknown }).url ?? (l as { content?: unknown }).content : null;
    if (typeof url === "string" && url.startsWith("http")) return url;
  }
  return null;
});

onMounted(async () => {
  const params = new URLSearchParams(location.search);
  const key = params.get("key");
  const q = params.get("q");
  if (q) {
    query.value = q;
    await searchNow();
  }
  if (key) {
    query.value = query.value || key;
    await open(key);
  }
});
</script>

<style scoped>
.explorer {
  display: grid;
  gap: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.search-input:focus {
  outline: 2px solid var(--vp-c-brand-1, #1f6cf1);
  outline-offset: -1px;
}

.search-note {
  margin: 0.75rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.result-list {
  list-style: none;
  margin: 0.75rem 0 0;
  padding: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.result-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 0.75rem;
  width: 100%;
  padding: 0.6rem 0.9rem;
  border: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-align: left;
  cursor: pointer;
  font: inherit;
}
.result-list li:last-child .result-row {
  border-bottom: 0;
}
.result-row:hover {
  background: var(--vp-c-bg-soft);
}
.result-row--active {
  background: var(--vp-c-bg-soft);
}

.result-docid {
  font-weight: 600;
}
.result-title {
  color: var(--vp-c-text-2);
  flex: 1 1 12rem;
}
.result-flavor,
.result-year {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-mute);
  border-radius: 999px;
  padding: 0.1rem 0.55rem;
}

.record-head {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
}
.record-docid {
  margin: 0 0 0.35rem;
  font-size: 1.35rem;
}
.record-title {
  margin: 0.15rem 0;
  color: var(--vp-c-text-1);
}
.record-meta {
  margin: 1rem 0 0;
  display: grid;
  gap: 0.3rem;
}
.meta-row {
  display: flex;
  gap: 0.75rem;
}
.meta-row dt {
  min-width: 7rem;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}
.meta-row dd {
  margin: 0;
}
.record-links {
  margin-top: 1rem;
  display: flex;
  gap: 1.25rem;
}

.cite-bar {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem 1.25rem;
}
.cite-styles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.cite-pill {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 999px;
  padding: 0.25rem 0.8rem;
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}
.cite-pill--active {
  background: var(--vp-c-brand-soft, rgba(31, 108, 241, 0.14));
  border-color: var(--vp-c-brand-1, #1f6cf1);
}
.cite-output {
  position: relative;
  margin-top: 0.75rem;
}
.cite-output pre {
  margin: 0;
  padding: 0.9rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 0.85rem;
}
.copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 6px;
  padding: 0.25rem 0.7rem;
  font: inherit;
  font-size: 0.8rem;
  cursor: pointer;
}

.record-history h3 {
  margin: 0;
  font-size: 1.05rem;
}
.history-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}
.view-switch {
  display: flex;
  gap: 0.4rem;
}
.history-empty {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.35rem;
}
.timeline-row {
  display: flex;
  gap: 0.9rem;
  align-items: baseline;
  padding: 0.35rem 0;
  border-bottom: 1px dashed var(--vp-c-divider);
}
.timeline-row:last-child {
  border-bottom: 0;
}
.timeline-year {
  min-width: 3.2rem;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}
.timeline-type {
  min-width: 9rem;
  font-size: 0.85rem;
  color: var(--vp-c-brand-1, #1f6cf1);
}
.timeline-link {
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
}
.timeline-title {
  margin-left: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}
</style>
