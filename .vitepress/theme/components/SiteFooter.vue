<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="/logo-light.svg" alt="Relaton" class="footer-logo-img" />
            <span class="footer-name">Relaton</span>
          </div>
          <p class="footer-tagline">The machine-readable bibliographic data model, based on ISO&nbsp;690:2021.</p>
          <div class="footer-social">
            <a href="https://github.com/relaton" target="_blank" rel="noopener noreferrer" title="GitHub" class="footer-social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.09.682-.218.682-.484 0-.236-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .269.18.579.688.481C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">Model</h4>
          <a href="/model/">The Relaton Model</a>
          <a href="/model/iso-690/">ISO 690 Foundation</a>
          <a href="/model/serializations">Serializations</a>
          <a href="/model/extensions">Extensions</a>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">Resources</h4>
          <a href="/flavors/">Flavors</a>
          <a href="/software/">Software</a>
          <a href="/specs/relaton-yaml">Relaton YAML</a>
          <a href="/api/">API Demo</a>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">Project</h4>
          <a href="/blog/">Blog</a>
          <a href="/about">About</a>
          <a href="https://github.com/relaton" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.ribose.com" target="_blank" rel="noopener noreferrer">Ribose</a>
        </div>
      </div>

      <div class="footer-bottom">
        <span>An open source project by <a href="https://www.ribose.com" target="_blank" rel="noopener noreferrer">Ribose</a></span>
        <span class="footer-divider" aria-hidden="true">&middot;</span>
        <span>Copyright &copy; {{ year }} Ribose Group Inc.</span>
        <span class="footer-divider" aria-hidden="true">&middot;</span>
        <span>Licensed under <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT</a></span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
}
.footer-inner {
  max-width: 1152px;
  margin: 0 auto;
  padding: 48px 24px 32px;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--vp-c-text-1);
}
.footer-logo-img {
  width: 28px;
  height: 28px;
}
.footer-name {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.footer-tagline {
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-3);
  max-width: 280px;
}
.footer-social {
  display: flex;
  gap: 8px;
}
.footer-social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: var(--vp-c-text-3);
  transition: color 0.15s, background 0.15s;
}
.footer-social-link:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
}
.footer-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.footer-heading {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin: 0 0 4px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.footer-col a {
  font-size: 14px;
  color: var(--vp-c-text-3);
  text-decoration: none;
  transition: color 0.15s;
  line-height: 1.8;
}
.footer-col a:hover {
  color: var(--vp-c-text-1);
}
.footer-bottom {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
  color: var(--vp-c-text-3);
}
.footer-bottom a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.15s;
}
.footer-bottom a:hover {
  color: var(--vp-c-text-1);
}
.footer-divider {
  margin: 0 8px;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .footer-brand {
    grid-column: 1 / -1;
  }
}
@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
