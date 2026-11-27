<template>
  <div class="relgraph">
    <p v-if="loading" class="relgraph-note">Loading graph…</p>
    <p v-else-if="error" class="relgraph-note">{{ error }}</p>
    <p v-else-if="nodes.length === 0" class="relgraph-note">
      No relations stored for this document yet.
    </p>
    <template v-else>
      <svg :viewBox="`0 0 640 ${height}`" class="relgraph-svg" role="img" aria-label="Relation graph">
        <g v-for="e in edgeViews" :key="e.key">
          <line
            :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2"
            :class="['relgraph-edge', { 'relgraph-edge--dashed': e.dashed }]"
          />
          <text :x="e.mx" :y="e.my" class="relgraph-edge-label">{{ e.type }}</text>
        </g>
        <g
          v-for="n in nodeViews"
          :key="n.key"
          :class="{ 'relgraph-node--clickable': n.clickable }"
          @click="n.clickable && $emit('open', n.key)"
        >
          <circle :cx="n.x" :cy="n.y" :r="n.root ? 9 : 6" :class="['relgraph-dot', { 'relgraph-dot--root': n.root, 'relgraph-dot--external': n.external }]" />
          <text :x="n.x" :y="n.y + (n.root ? 22 : 18)" :text-anchor="n.anchor" :class="['relgraph-label', { 'relgraph-label--root': n.root }]">
            {{ n.label }}
          </text>
          <text v-if="n.sublabel" :x="n.x" :y="n.y + (n.root ? 36 : 31)" :text-anchor="n.anchor" class="relgraph-sublabel">
            {{ n.sublabel }}
          </text>
        </g>
      </svg>
      <p class="relgraph-note relgraph-note--legend">
        {{ nodes.length }} related documents · {{ externals.length }} external references ·
        click a node to open it
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps<{ docKey: string; depth?: number }>();
const emit = defineEmits<{ open: [key: string] }>();

const API = "https://api.relaton.org/v3";

interface GraphNode {
  key: string;
  docid?: string;
  title?: string | null;
  year?: number | null;
}
interface GraphEdge {
  from: string;
  type: string;
  to: string;
}
interface GraphResponse {
  nodes?: GraphNode[];
  edges?: GraphEdge[];
  external?: string[];
}

const loading = ref(false);
const error = ref("");
const nodes = ref<GraphNode[]>([]);
const edges = ref<GraphEdge[]>([]);
const externals = ref<string[]>([]);

const W = 640;
const CX = W / 2;
const CY = 170;
const RX = 235;
const RY = 118;
const height = 360;

const rootPos = { x: CX, y: CY };

function truncate(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

const positions = computed(() => {
  const map = new Map<string, { x: number; y: number; anchor: string }>();
  const regular = nodes.value;
  const ext = externals.value;
  const total = regular.length + ext.length;
  regular.forEach((n, i) => {
    const angle = (2 * Math.PI * i) / Math.max(total, 1) - Math.PI / 2;
    const x = CX + RX * Math.cos(angle);
    const y = CY + RY * Math.sin(angle);
    map.set(n.key, { x, y, anchor: x < CX - 20 ? "end" : x > CX + 20 ? "start" : "middle" });
  });
  ext.forEach((k, i) => {
    const angle = (2 * Math.PI * (regular.length + i)) / Math.max(total, 1) - Math.PI / 2;
    const x = CX + (RX + 42) * Math.cos(angle);
    const y = CY + (RY + 28) * Math.sin(angle);
    map.set(k, { x, y, anchor: x < CX - 20 ? "end" : x > CX + 20 ? "start" : "middle" });
  });
  map.set(props.docKey, { x: rootPos.x, y: rootPos.y, anchor: "middle" });
  return map;
});

const nodeViews = computed(() => {
  const views = [
    {
      key: props.docKey,
      x: rootPos.x,
      y: rootPos.y,
      anchor: "middle",
      root: true,
      external: false,
      clickable: false,
      label: truncate(props.docKey, 26),
      sublabel: null as string | null,
    },
  ];
  for (const n of nodes.value) {
    const p = positions.value.get(n.key)!;
    views.push({
      key: n.key,
      x: p.x,
      y: p.y,
      anchor: p.anchor,
      root: false,
      external: false,
      clickable: true,
      label: truncate(n.docid || n.key, 24),
      sublabel: n.year ? String(n.year) : null,
    });
  }
  for (const k of externals.value) {
    const p = positions.value.get(k)!;
    views.push({
      key: k,
      x: p.x,
      y: p.y,
      anchor: p.anchor,
      root: false,
      external: true,
      clickable: false,
      label: truncate(k, 24),
      sublabel: null,
    });
  }
  return views;
});

const edgeViews = computed(() => {
  const out: {
    key: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    mx: number;
    my: number;
    type: string;
    dashed: boolean;
  }[] = [];
  for (const e of edges.value) {
    const a = positions.value.get(e.from);
    const b = positions.value.get(e.to);
    if (!a || !b) continue;
    out.push({
      key: `${e.from}|${e.type}|${e.to}`,
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      mx: (a.x + b.x) / 2,
      my: (a.y + b.y) / 2 - 3,
      type: truncate(e.type, 14),
      dashed: externals.value.includes(e.to) || externals.value.includes(e.from),
    });
  }
  return out;
});

async function load(key: string) {
  loading.value = true;
  error.value = "";
  nodes.value = [];
  edges.value = [];
  externals.value = [];
  try {
    const res = await fetch(
      `${API}/documents/${encodeURIComponent(key)}/graph?depth=${props.depth ?? 1}`,
      { headers: { accept: "application/json" } },
    );
    if (!res.ok) throw new Error(`graph unavailable (HTTP ${res.status})`);
    const body = (await res.json()) as GraphResponse;
    nodes.value = (body.nodes ?? []).filter((n) => n.key !== key);
    edges.value = body.edges ?? [];
    externals.value = body.external ?? [];
  } catch (e) {
    error.value = e instanceof Error ? e.message : "graph unavailable";
  } finally {
    loading.value = false;
  }
}

watch(() => props.docKey, (k) => k && load(k), { immediate: true });
</script>

<style scoped>
.relgraph-svg {
  width: 100%;
  height: auto;
}
.relgraph-note {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
.relgraph-note--legend {
  margin-top: 0.25rem;
}
.relgraph-edge {
  stroke: var(--vp-c-divider);
  stroke-width: 1.2;
}
.relgraph-edge--dashed {
  stroke-dasharray: 4 3;
}
.relgraph-edge-label {
  fill: var(--vp-c-text-2);
  font-size: 9px;
  text-anchor: middle;
  paint-order: stroke;
  stroke: var(--vp-c-bg);
  stroke-width: 3px;
}
.relgraph-dot {
  fill: var(--vp-c-bg);
  stroke: var(--vp-c-brand-1, #1f6cf1);
  stroke-width: 1.6;
}
.relgraph-dot--root {
  fill: var(--vp-c-brand-1, #1f6cf1);
  stroke: var(--vp-c-brand-1, #1f6cf1);
}
.relgraph-dot--external {
  stroke-dasharray: 2 2;
  stroke: var(--vp-c-text-2);
}
.relgraph-node--clickable {
  cursor: pointer;
}
.relgraph-node--clickable:hover .relgraph-dot {
  stroke-width: 2.6;
}
.relgraph-label {
  fill: var(--vp-c-text-1);
  font-size: 10.5px;
}
.relgraph-label--root {
  font-weight: 600;
  font-size: 11.5px;
}
.relgraph-sublabel {
  fill: var(--vp-c-text-2);
  font-size: 9.5px;
}
</style>
