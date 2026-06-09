<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <div class="hero-pattern absolute inset-0" />
        <div class="grain-overlay absolute inset-0" />
        <div class="glow-orb hero-float-4" style="top:-20%;right:-10%;width:800px;height:800px;background:rgba(31,108,241,0.14);filter:blur(120px)" />
        <div class="glow-orb hero-float-5" style="bottom:-15%;left:-10%;width:600px;height:600px;background:rgba(33,193,151,0.12);filter:blur(100px)" />
        <div class="hero-float-1 absolute rounded-full" style="top:18%;right:15%;width:12px;height:12px;background:rgba(31,108,241,0.3)" />
        <div class="hero-float-2 absolute rounded-full" style="top:35%;right:8%;width:8px;height:8px;background:rgba(255,255,255,0.15)" />
        <div class="hero-float-4 absolute rounded-full border" style="top:22%;left:6%;width:60px;height:60px;border-color:rgba(31,108,241,0.08)" />
        <div class="hero-float-5 absolute rounded-full" style="top:65%;left:18%;width:8px;height:8px;background:rgba(33,193,151,0.25)" />
      </div>

      <div class="hero-inner relative z-10">
        <div class="hero-grid">
          <div class="hero-text page-enter">
            <div class="hero-symbol">
              <svg width="44" height="44" viewBox="0 0 351.24 351.66" fill="none">
                <path d="M276.31,242.07c-4.44,2.78-8.88,5.54-13.31,8.32c-24.96,15.62-49.91,31.25-74.9,46.83c-1.09,0.68-1.35,1.28-1.16,2.53c2.26,15.33-2.14,28.54-13.12,39.42c-7.38,7.31-16.42,11.41-26.79,12.32c-23.06,2.02-43.31-12.81-48.04-35.45c-2.97-14.23,0.47-27.08,9.77-38.3c0.63-0.76,0.68-1.2,0.16-2.03c-18.27-29.23-36.52-58.47-54.74-87.73c-0.45-0.72-0.9-0.94-1.73-0.8c-23.2,4.18-46.18-10.87-51.44-34.68c-5.32-24.06,10.58-48.68,34.73-53.38c14.55-2.83,27.47,0.68,38.74,10.3c0.09,0.08,0.19,0.14,0.4,0.3c0.32-0.2,0.69-0.41,1.05-0.64c29.19-18.27,58.38-36.55,87.58-54.81c0.71-0.45,0.96-0.87,0.81-1.72c-4.21-23.05,10.72-45.91,33.47-51.3c25.01-5.92,49.57,9.64,54.55,34.86c2.76,13.98-0.61,26.61-9.66,37.68c-0.33,0.4-0.67,0.79-1.03,1.22c3.53,5.65,7.04,11.27,10.54,16.89c14.9,23.89,29.8,47.78,44.69,71.69c0.5,0.8,0.96,1.17,1.98,0.98c21.29-3.76,42.25,8.46,49.67,28.91c9.37,25.82-6.6,54.21-33.54,59.31c-14.16,2.68-26.86-0.8-37.92-10.08C276.84,242.51,276.6,242.31,276.31,242.07z" fill="currentColor" opacity="0.16"/>
              </svg>
            </div>

            <h1 class="hero-title">
              {{ d.hero.titleLine1 }}<br/>
              <span class="hero-title-accent">{{ d.hero.titleLine2 }}</span><br/>
              {{ d.hero.titleLine3 }}
            </h1>
            <p class="hero-subtitle" v-html="d.hero.subtitle" />

            <div class="hero-actions">
              <a :href="d.hero.primaryAction.href" class="btn-primary">
                {{ d.hero.primaryAction.label }}
                <svg class="btn-icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 5l7 7-7 7"/></svg>
              </a>
              <a :href="d.hero.secondaryAction.href" class="btn-ghost">{{ d.hero.secondaryAction.label }}</a>
            </div>

            <div ref="statsRef" class="hero-stats">
              <span class="stat"><span class="stat-num">{{ orgsDisplay }}+</span> Organizations</span>
              <span class="stat"><span class="stat-num">{{ relsDisplay }}+</span> Relation Types</span>
              <span class="stat"><span class="stat-num">{{ gemsDisplay }}+</span> Libraries</span>
            </div>
          </div>

          <!-- Code Format Preview Panel -->
          <div class="hero-panel page-enter" style="animation-delay:0.1s">
            <div class="code-panel">
              <div class="code-panel-header">
                <div class="code-tabs">
                  <button
                    v-for="tab in d.codeTabs"
                    :key="tab.id"
                    :class="['code-tab', { active: activeTab === tab.id }]"
                    @click="activeTab = tab.id"
                  >{{ tab.label }}</button>
                </div>
                <button class="code-copy" @click="copyCode" title="Copy">
                  <template v-if="!codeCopied">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </template>
                  <span v-else class="code-copy-feedback">Copied!</span>
                </button>
              </div>
              <div class="code-body">
                <pre><code>{{ currentCode }}</code></pre>
              </div>
              <div class="code-panel-footer">
                <a href="/specs/relaton-yaml" class="code-panel-link">
                  View serialization specs
                  <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-fade" aria-hidden="true" />
      </div>
    </section>

    <!-- Architecture Layers -->
    <section class="section section--alt scroll-reveal">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Five Layers of Bibliographic Intelligence</h2>
          <p class="section-subtitle">Relaton spans from the ISO 690 standard through to formatted citations — a complete pipeline for machine-readable references.</p>
        </div>
        <div class="layers-row">
          <a v-for="layer in d.layers" :key="layer.number" :href="layer.link" class="layer-card entry-card">
            <div class="layer-accent" :class="layer.accentClass" />
            <div class="layer-body">
              <span class="layer-number">{{ layer.number }}</span>
              <h3 class="layer-title">{{ layer.title }}</h3>
              <p class="layer-desc">{{ layer.desc }}</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Supported Organizations -->
    <section class="section section--alt scroll-reveal">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ d.orgsSection.title }}</h2>
          <p class="section-subtitle">{{ d.orgsSection.subtitle }}</p>
        </div>
        <div class="org-marquee">
          <div class="org-marquee-track">
            <a v-for="flavor in orgLogos" :key="flavor.id" :href="`/flavors/${flavor.id}`" class="org-logo-card" :title="flavor.fullName">
              <img v-if="flavor.logo" :src="flavor.logo" :alt="flavor.label" class="org-logo-img" />
              <span v-else class="org-logo-placeholder">{{ flavor.label }}</span>
            </a>
            <a v-for="flavor in orgLogos" :key="'dup-' + flavor.id" :href="`/flavors/${flavor.id}`" class="org-logo-card" :title="flavor.fullName">
              <img v-if="flavor.logo" :src="flavor.logo" :alt="flavor.label" class="org-logo-img" aria-hidden="true" />
              <span v-else class="org-logo-placeholder" aria-hidden="true">{{ flavor.label }}</span>
            </a>
          </div>
        </div>
        <div class="section-cta">
          <a href="/flavors/" class="link-arrow">View all 28 flavors</a>
        </div>
      </div>
    </section>

    <!-- Software Ecosystem -->
    <section class="section scroll-reveal">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ d.ecosystemSection.title }}</h2>
          <p class="section-subtitle">{{ d.ecosystemSection.subtitle }}</p>
        </div>
        <div class="ecosystem-grid">
          <div v-for="ecat in d.ecosystem" :key="ecat.label" class="ecosystem-card card-lift">
            <div class="eco-accent" :class="ecat.accentClass" />
            <div class="eco-body">
              <span class="eco-count">{{ ecat.count }}</span>
              <h3 class="eco-label">{{ ecat.label }}</h3>
              <p class="eco-desc">{{ ecat.desc }}</p>
            </div>
          </div>
        </div>
        <div class="section-cta">
          <a href="/software/" class="link-arrow">View all software</a>
        </div>
      </div>
    </section>

    <!-- Latest Blog Posts -->
    <section class="section section--alt scroll-reveal" v-if="posts.length">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ d.blogSection.title }}</h2>
        </div>
        <div class="blog-grid">
          <a v-for="post in posts" :key="post.url" :href="post.url" class="blog-card card-lift">
            <div class="blog-card-inner">
              <time class="blog-card-date">{{ formatDate(post.date) }}</time>
              <h3 class="blog-card-title">{{ post.title }}</h3>
              <p class="blog-card-desc">{{ post.description }}</p>
              <span class="blog-card-link">Read more &rarr;</span>
            </div>
          </a>
        </div>
        <div class="section-cta">
          <a href="/blog/" class="link-arrow">View all posts</a>
        </div>
      </div>
    </section>

    <!-- Footer CTA -->
    <section class="cta-section scroll-reveal">
      <div class="cta-bg" aria-hidden="true">
        <div class="glow-orb" style="top:-40%;left:20%;width:600px;height:600px;background:rgba(33,193,151,0.08);filter:blur(100px);animation:glow-pulse 10s ease-in-out infinite" />
        <div class="glow-orb" style="bottom:-30%;right:10%;width:500px;height:500px;background:rgba(31,108,241,0.08);filter:blur(100px);animation:glow-pulse 12s ease-in-out infinite;animation-delay:-4s" />
      </div>
      <div class="container cta-content relative z-10">
        <h2>{{ d.ctaSection.title }}</h2>
        <div class="cta-actions">
          <a :href="d.ctaSection.primaryAction.href" class="btn-primary">
            {{ d.ctaSection.primaryAction.label }}
            <svg class="btn-icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 5l7 7-7 7"/></svg>
          </a>
          <a :href="d.ctaSection.secondaryAction.href" class="btn-ghost">{{ d.ctaSection.secondaryAction.label }}</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { data as posts } from '../../posts.data'
import { homeData as d } from '../../data/home'
import { flavors } from '../../data/flavors'

const orgLogos = computed(() => flavors.filter(f => f.category !== 'identifier'))

// Count-up animation
const statsRef = ref<HTMLElement>()
const orgsDisplay = ref(0)
const relsDisplay = ref(0)
const gemsDisplay = ref(0)

onMounted(() => {
  if (!statsRef.value) return
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    observer.disconnect()
    const { orgs, rels, gems } = d.stats
    const start = performance.now()
    const dur = 1400
    function tick(now: number) {
      const p = Math.min((now - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      orgsDisplay.value = Math.round(orgs * e)
      relsDisplay.value = Math.round(rels * e)
      gemsDisplay.value = Math.round(gems * e)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, { threshold: 0.3 })
  observer.observe(statsRef.value)

  // Scroll reveal
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          revealObserver.unobserve(e.target)
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el))
})

// Code format tabs
const activeTab = ref('yaml')
const currentCode = computed(() => d.codeExamples[activeTab.value] || '')

const codeCopied = ref(false)
let codeCopyTimer: ReturnType<typeof setTimeout>

async function copyCode() {
  await navigator.clipboard.writeText(currentCode.value)
  codeCopied.value = true
  clearTimeout(codeCopyTimer)
  codeCopyTimer = setTimeout(() => { codeCopied.value = false }, 1500)
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}
</script>

<style scoped>
.container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ── Hero ─────────────────────────────────────────────── */
.hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1C2126 0%, #152035 40%, #0E2A3A 70%, #0B1F2D 100%);
}
.dark .hero {
  background: linear-gradient(135deg, #0B0F13 0%, #0E1520 40%, #0A1822 70%, #070D14 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.hero-inner {
  position: relative;
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}
.hero-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 48px;
  align-items: center;
  padding: 80px 0 64px;
}
.hero-fade {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);
  height: 64px;
  background: linear-gradient(to bottom, transparent, var(--vp-c-bg));
  z-index: 10;
  pointer-events: none;
}

.hero-symbol {
  margin-bottom: 16px;
  color: #fff;
}
.dark .hero-symbol {
  color: #E8ECF0;
}
.hero-title {
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #fff;
}
.hero-title-accent {
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, #21C197 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-subtitle {
  margin-top: 16px;
  font-size: clamp(15px, 1.8vw, 18px);
  line-height: 1.65;
  color: rgba(255,255,255,0.55);
  max-width: 520px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 22px;
  border-radius: 10px;
  background: #fff;
  color: #1C2126;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
.btn-primary:hover {
  background: #F0F6FF;
  transform: translateY(-1px);
}
.btn-primary .btn-icon {
  transition: transform 0.15s;
}
.btn-primary:hover .btn-icon {
  transform: translateX(2px);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 11px 22px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.8);
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;
}
.btn-ghost:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.25);
}

.hero-stats {
  margin-top: 20px;
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: rgba(255,255,255,0.35);
}
.stat-num {
  color: #fff;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

/* ── Code Panel ───────────────────────────────────────── */
.code-panel {
  text-align: left;
  border-radius: 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(8px);
  overflow: hidden;
}

.code-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.code-tabs {
  display: flex;
  gap: 2px;
}

.code-tab {
  padding: 6px 14px;
  border: none;
  background: none;
  color: rgba(255,255,255,0.4);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s;
  font-family: inherit;
}
.code-tab:hover {
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.05);
}
.code-tab.active {
  color: #fff;
  background: rgba(31,108,241,0.2);
}

.code-copy {
  display: inline-flex;
  padding: 4px;
  border: none;
  background: none;
  color: rgba(255,255,255,0.3);
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.15s;
}
.code-copy:hover {
  color: rgba(255,255,255,0.7);
}
.code-copy-feedback {
  font-size: 11px;
  color: var(--c-success);
  font-weight: 600;
}

.code-body {
  padding: 16px 20px;
  max-height: 380px;
  overflow-y: auto;
}
.code-body pre {
  margin: 0;
}
.code-body code {
  font-size: 12.5px;
  line-height: 1.6;
  color: rgba(255,255,255,0.7);
  font-family: var(--vp-font-family-mono, monospace);
  white-space: pre;
}

.code-panel-footer {
  padding: 10px 16px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.code-panel-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: rgba(31,108,241,0.8);
  text-decoration: none;
  font-weight: 500;
}
.code-panel-link:hover {
  color: rgba(79,140,243,1);
}
.code-panel-link svg {
  transition: transform 0.15s;
}
.code-panel-link:hover svg {
  transform: translateX(2px);
}

/* ── Sections ─────────────────────────────────────────── */
.section {
  padding: 80px 0;
}
.section--alt {
  background: var(--vp-c-bg-soft);
}
.section-header {
  text-align: center;
  margin-bottom: 48px;
}
.section-title {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}
.section-subtitle {
  font-size: 16px;
  color: var(--vp-c-text-3);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
}
.section-cta {
  text-align: center;
  margin-top: 40px;
}
.link-arrow {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: gap 0.15s;
}
.link-arrow:hover {
  text-decoration: underline;
  gap: 8px;
}

/* ── Architecture Layers ─────────────────────────────── */
.layers-row {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 720px;
  margin: 0 auto;
}
.layer-card {
  display: flex;
  text-decoration: none;
  color: inherit;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0;
  overflow: hidden;
  transition: background 0.15s, border-color 0.15s;
}
.layer-card:first-child {
  border-radius: 12px 12px 0 0;
}
.layer-card:last-child {
  border-radius: 0 0 12px 12px;
}
.layer-card + .layer-card {
  border-top: none;
}
.layer-card:hover {
  background: var(--vp-c-bg-soft);
  border-color: rgba(31,108,241,0.3);
}
.layer-accent {
  width: 4px;
  flex-shrink: 0;
}
.layer-standard { background: linear-gradient(180deg, var(--vp-c-brand-1), #4D88F3); }
.layer-model { background: linear-gradient(180deg, #008A64, #21C197); }
.layer-serial { background: linear-gradient(180deg, #21C197, #34D399); }
.layer-fetch { background: linear-gradient(180deg, #4D88F3, #7EAAF5); }
.layer-render { background: linear-gradient(180deg, #6366F1, #818CF8); }
.layer-body {
  padding: 10px 20px;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 14px;
}
.layer-number {
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
  min-width: 24px;
  line-height: 1.5;
}
.layer-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  flex-shrink: 0;
  min-width: 120px;
  line-height: 1.5;
  margin: 0;
}
.layer-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  flex: 1;
}

/* ── Ecosystem ────────────────────────────────────────── */
.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.ecosystem-card {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  overflow: hidden;
  background: var(--vp-c-bg);
}
.eco-accent {
  height: 3px;
}
.accent-blue { background: linear-gradient(90deg, var(--vp-c-brand-1), #4D88F3); }
.accent-aqua { background: linear-gradient(90deg, #21C197, #34D399); }
.accent-green { background: linear-gradient(90deg, #008A64, #21C197); }

.eco-body {
  padding: 24px;
}
.eco-count {
  font-size: 32px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.eco-label {
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
  color: var(--vp-c-text-1);
}
.eco-desc {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}

/* ── Blog Grid ────────────────────────────────────────── */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.blog-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  text-decoration: none;
  color: inherit;
}
.blog-card-inner {
  padding: 24px;
}
.blog-card-date {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.blog-card-title {
  font-size: 17px;
  font-weight: 600;
  margin: 8px 0;
  color: var(--vp-c-text-1);
  transition: color 0.15s;
}
.blog-card:hover .blog-card-title {
  color: var(--vp-c-brand-1);
}
.blog-card-desc {
  font-size: 13px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blog-card-link {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

/* ── CTA Section ──────────────────────────────────────── */
.cta-section {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1C2126 0%, #152035 50%, #0E2A3A 100%);
  padding: 80px 0;
}
.dark .cta-section {
  background: linear-gradient(135deg, #0B0F13 0%, #0E1520 50%, #0A1822 100%);
}
.cta-bg {
  position: absolute;
  inset: 0;
}
.cta-content {
  text-align: center;
}
.cta-content h2 {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}
.cta-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.cta-actions .btn-primary {
  box-shadow: 0 4px 16px rgba(31,108,241,0.25);
}
.cta-actions .btn-ghost {
  border-color: rgba(255,255,255,0.2);
}

/* ── Responsive ───────────────────────────────────────── */
@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 56px 0 48px;
  }
}

@media (max-width: 768px) {
  .ecosystem-grid { grid-template-columns: 1fr; }
  .blog-grid { grid-template-columns: 1fr; }
  .hero { text-align: center; }
  .hero-subtitle { margin-left: auto; margin-right: auto; }
  .hero-actions { justify-content: center; }
  .hero-stats { justify-content: center; flex-wrap: wrap; }
  .section { padding: 56px 0; }
  .section-title { font-size: 24px; }
  .cta-content h2 { font-size: 24px; }
  .layer-body { flex-direction: column; align-items: flex-start; gap: 4px; }
  .layer-desc { font-size: 13px; }
  .code-body { max-height: 240px; }
  .hero-title { font-size: 28px; }
  .hero-subtitle { font-size: 14px; }
  .hero-grid { padding: 48px 0 40px; gap: 24px; }
  .hero-inner { padding: 0 16px; }
  .hero-fade { height: 40px; }
  .hero-symbol { display: none; }
  .btn-primary, .btn-ghost { font-size: 13px; padding: 10px 18px; }
}

@media (max-width: 480px) {
  .hero-title { font-size: 24px; }
  .hero-stats { gap: 8px; font-size: 12px; }
  .code-panel-header { padding: 6px 10px; }
  .code-tab { padding: 4px 10px; font-size: 11px; }
  .code-body { padding: 12px 14px; max-height: 200px; }
  .code-body code { font-size: 11px; line-height: 1.5; }
  .layer-title { min-width: 0; }
}

.org-marquee {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  margin: 0 -24px;
  padding: 16px 0;
}
.org-marquee-track {
  display: flex;
  gap: 16px;
  width: max-content;
  animation: marquee-scroll 40s linear infinite;
}
.org-marquee-track:hover { animation-play-state: paused; }
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.org-logo-card {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 64px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 12px 16px;
  transition: border-color 0.15s, box-shadow 0.15s;
  text-decoration: none;
}
.org-logo-card:hover {
  border-color: rgba(31, 108, 241, 0.3);
  box-shadow: 0 2px 8px rgba(31, 108, 241, 0.08);
}
.org-logo-img {
  max-width: 80px;
  max-height: 36px;
  object-fit: contain;
}
.org-logo-placeholder {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-align: center;
  line-height: 1.2;
}

@media (prefers-reduced-motion: reduce) {
  .org-marquee-track { animation: none; }
}
</style>
