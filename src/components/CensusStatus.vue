<template>
  <div class="status-view">
    <p class="status-updated">
      <span v-if="loading">Reading the index…</span>
      <span v-else-if="error">{{ error }}</span>
      <span v-else>
        {{ totalRecords.toLocaleString() }} records across {{ flavors.length }} flavors ·
        freshest ingest {{ newest }} (UTC)
      </span>
    </p>

    <div v-if="!loading && !error" class="status-table-wrap">
      <table class="status-table">
        <thead>
          <tr>
            <th scope="col">Flavor</th>
            <th scope="col" class="num">Records</th>
            <th scope="col" class="num">Last ingest (UTC)</th>
            <th scope="col" class="num">Freshness</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="f in sorted" :key="f.flavor">
            <td>
              <span class="flavor-name">{{ f.flavor }}</span>
              <a v-if="f.repo" :href="`https://github.com/${f.repo}`" class="repo-link" target="_blank" rel="noopener noreferrer">{{ f.repo }}</a>
            </td>
            <td class="num">{{ (f.doc_count ?? 0).toLocaleString() }}</td>
            <td class="num">{{ f.indexed_at ? day(f.indexed_at) : "—" }}</td>
            <td class="num">
              <span class="fresh-dot" :class="freshClass(f)"></span>
              {{ freshLabel(f) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="status-note">
      Per-flavor bulk snapshots with checksums live at
      <a href="https://data.relaton.org/manifest.json">data.relaton.org/manifest.json</a>.
      The API itself is at <a href="https://api.relaton.org/api">api.relaton.org</a>.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

interface FlavorRow {
  flavor: string;
  repo: string;
  indexed_at: string | null;
  doc_count: number | null;
}

const API = "https://api.relaton.org/v3/flavors";
const loading = ref(true);
const error = ref("");
const flavors = ref<FlavorRow[]>([]);

const totalRecords = computed(() => flavors.value.reduce((n, f) => n + (f.doc_count ?? 0), 0));
const newest = computed(() => {
  const dates = flavors.value.map((f) => f.indexed_at).filter((d): d is string => Boolean(d));
  return dates.length ? day(dates.slice().sort().at(-1)!) : "—";
});

function day(ts: string): string {
  return ts.slice(0, 10);
}

function ageDays(f: FlavorRow): number | null {
  if (!f.indexed_at) return null;
  return Math.floor((Date.now() - new Date(f.indexed_at).getTime()) / 86_400_000);
}

function freshClass(f: FlavorRow): string {
  const age = ageDays(f);
  if (age === null) return "fresh-stale";
  if (age <= 2) return "fresh-ok";
  if (age <= 7) return "fresh-warn";
  return "fresh-stale";
}

function freshLabel(f: FlavorRow): string {
  const age = ageDays(f);
  if (age === null) return "unknown";
  if (age <= 2) return "fresh";
  if (age <= 7) return `${age}d`;
  return `${age}d old`;
}

const sorted = computed(() =>
  flavors.value.slice().sort((a, b) => (b.doc_count ?? 0) - (a.doc_count ?? 0)),
);

onMounted(async () => {
  try {
    const res = await fetch(API, { headers: { accept: "application/json" } });
    const body = (await res.json()) as { flavors?: FlavorRow[] };
    flavors.value = body.flavors ?? [];
  } catch {
    error.value = "The flavor index is unreachable right now.";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.status-view {
  display: grid;
  gap: 1.25rem;
}
.status-updated {
  margin: 0;
  color: var(--vp-c-text-2);
}
.status-table-wrap {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow-x: auto;
}
.status-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}
.status-table th,
.status-table td {
  padding: 0.55rem 0.9rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}
.status-table thead th {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-weight: 600;
}
.status-table tbody tr:last-child td {
  border-bottom: 0;
}
.num {
  text-align: right !important;
  font-variant-numeric: tabular-nums;
}
.flavor-name {
  font-weight: 600;
  margin-right: 0.6rem;
}
.repo-link {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
.fresh-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  margin-right: 0.4rem;
  background: var(--vp-c-text-2);
}
.fresh-ok {
  background: #21c197;
}
.fresh-warn {
  background: #d9a514;
}
.fresh-stale {
  background: var(--vp-c-text-2);
}
.status-note {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
}
</style>
