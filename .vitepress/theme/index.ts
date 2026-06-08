import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

import HomePage from './components/HomePage.vue'
import FlavorPage from './components/FlavorPage.vue'
import FlavorGrid from './components/FlavorGrid.vue'
import SoftwarePage from './components/SoftwarePage.vue'
import SoftwareGrid from './components/SoftwareGrid.vue'
import BlogIndex from './components/BlogIndex.vue'
import BlogByline from './components/BlogByline.vue'
import ModelDiagram from './components/ModelDiagram.vue'
import ApiDemo from './components/ApiDemo.vue'
import SiteFooter from './components/SiteFooter.vue'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('FlavorPage', FlavorPage)
    app.component('FlavorGrid', FlavorGrid)
    app.component('SoftwarePage', SoftwarePage)
    app.component('SoftwareGrid', SoftwareGrid)
    app.component('BlogIndex', BlogIndex)
    app.component('BlogByline', BlogByline)
    app.component('ModelDiagram', ModelDiagram)
    app.component('ApiDemo', ApiDemo)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(SiteFooter),
    })
  },
} satisfies Theme
