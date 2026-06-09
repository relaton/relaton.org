import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Relaton',
  description: 'The premier bibliographic data model for standards and technical documents',
  lang: 'en-US',
  ignoreDeadLinks: false,

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap', rel: 'stylesheet' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#1F6CF1' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Relaton' }],
  ],

  themeConfig: {
    logo: { src: '/logo-light.svg', alt: 'Relaton' },
    siteTitle: 'Relaton',

    nav: [
      { text: 'Get Started', link: '/get-started' },
      {
        text: 'Model',
        items: [
          { text: 'The Relaton Model', link: '/model/' },
          { text: 'ISO 690 Guidelines', link: '/model/iso-690/' },
          { text: 'Serializations', link: '/model/serializations' },
          { text: 'UML Diagrams', link: '/model/diagrams' },
        ],
      },
      { text: 'Flavors', link: '/flavors/' },
      {
        text: 'Specs',
        items: [
          { text: 'Relaton YAML', link: '/specs/relaton-yaml' },
          { text: 'AsciiBib', link: '/specs/asciibib' },
          { text: 'Bibliographic Spans', link: '/specs/bibliographic-spans' },
        ],
      },
      { text: 'Software', link: '/software/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'API', link: '/api/' },
      { text: 'About', link: '/about' },
    ],

    sidebar: {
      '/model/': [
        { text: 'Model Overview', link: '/model/' },
        {
          text: 'ISO 690 Guidelines',
          items: [
            { text: 'Overview', link: '/model/iso-690/' },
            { text: 'Principles', link: '/model/iso-690/principles' },
            { text: 'Resource Types', link: '/model/iso-690/resource-types' },
            { text: 'Citation Systems', link: '/model/iso-690/citation-systems' },
          ],
        },
        {
          text: 'Relaton Model',
          items: [
            { text: 'Extensions Beyond ISO 690', link: '/model/extensions' },
            { text: 'Flavor Extensions', link: '/model/flavor-models' },
          ],
        },
        {
          text: 'Core Entities',
          items: [
            { text: 'Contributor', link: '/model/contributor' },
            { text: 'Relations', link: '/model/relations' },
            { text: 'Production', link: '/model/production' },
            { text: 'Citation', link: '/model/citation' },
          ],
        },
        {
          text: 'Descriptive Elements',
          items: [
            { text: 'Title', link: '/model/title' },
            { text: 'Edition', link: '/model/edition' },
            { text: 'Medium', link: '/model/medium' },
            { text: 'Series', link: '/model/series' },
            { text: 'Numeration', link: '/model/numeration' },
          ],
        },
        {
          text: 'Identification & Access',
          items: [
            { text: 'Bibitem Types', link: '/model/bibtype' },
            { text: 'Identifiers', link: '/model/identifiers' },
            { text: 'Location', link: '/model/location' },
            { text: 'Additional Info', link: '/model/additional-info' },
          ],
        },
        { text: 'Serializations', link: '/model/serializations' },
        { text: 'UML Diagrams', link: '/model/diagrams' },
      ],
      '/specs/': [
        { text: 'Relaton YAML', link: '/specs/relaton-yaml' },
        { text: 'AsciiBib', link: '/specs/asciibib' },
        { text: 'Bibliographic Spans', link: '/specs/bibliographic-spans' },
      ],
    },

    search: {
      provider: 'local',
    },

    outline: { level: [2, 3], label: 'On this page' },
    lastUpdated: { text: 'Updated at' },
  },

  sitemap: {
    hostname: 'https://relaton.org',
  },

  srcExclude: ['TODO.refactor/**', 'flavors/content/**', 'software/content/**'],
})
