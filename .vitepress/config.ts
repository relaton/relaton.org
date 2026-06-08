import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Relaton',
  description: 'The premier bibliographic data model for standards and technical documents',
  lang: 'en-US',

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap', rel: 'stylesheet' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#1F6CF0' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Relaton' }],
  ],

  themeConfig: {
    logo: { src: '/logo-light.svg', alt: 'Relaton' },
    siteTitle: 'Relaton',

    nav: [
      {
        text: 'Model',
        items: [
          { text: 'Overview & ISO 690', link: '/model/overview' },
          { text: 'Contributor', link: '/model/contributor' },
          { text: 'Relations', link: '/model/relations' },
          { text: 'UML Diagrams', link: '/model/diagrams' },
        ],
      },
      { text: 'Flavors', link: '/flavors/' },
      {
        text: 'Specs',
        items: [
          { text: 'Relaton YAML', link: '/specs/relaton-yaml' },
          { text: 'Relaton Render', link: '/specs/relaton-render' },
          { text: 'Relaton CLI', link: '/specs/relaton-cli' },
          { text: 'Relaton Ruby', link: '/specs/relaton-ruby' },
          { text: 'AsciiBib', link: '/specs/asciibib' },
        ],
      },
      { text: 'Software', link: '/software/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'API', link: '/api/' },
      { text: 'About', link: '/about' },
    ],

    sidebar: {
      '/model/': [
        { text: 'Overview & ISO 690', link: '/model/overview' },
        {
          text: 'Entities',
          items: [
            { text: 'Bibitem Types', link: '/model/bibtype' },
            { text: 'Citation', link: '/model/citation' },
            { text: 'Contributor', link: '/model/contributor' },
            { text: 'Relations', link: '/model/relations' },
            { text: 'Title', link: '/model/title' },
            { text: 'Edition', link: '/model/edition' },
            { text: 'Production', link: '/model/production' },
            { text: 'Location', link: '/model/location' },
            { text: 'Medium', link: '/model/medium' },
            { text: 'Series', link: '/model/series' },
            { text: 'Identifiers', link: '/model/identifiers' },
            { text: 'Numeration', link: '/model/numeration' },
            { text: 'Additional Info', link: '/model/additional-info' },
            { text: 'Specific Categories', link: '/model/specific-cats' },
          ],
        },
        { text: 'UML Diagrams', link: '/model/diagrams' },
      ],
      '/specs/': [
        { text: 'Relaton YAML', link: '/specs/relaton-yaml' },
        { text: 'Relaton Render', link: '/specs/relaton-render' },
        { text: 'Relaton CLI', link: '/specs/relaton-cli' },
        { text: 'Relaton Ruby', link: '/specs/relaton-ruby' },
        { text: 'AsciiBib', link: '/specs/asciibib' },
      ],
    },

    footer: {
      message: 'An open source project of <a href="https://www.ribose.com">Ribose</a>',
      copyright: `Copyright © ${new Date().getFullYear()} Ribose Group Inc.`,
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

  srcExclude: ['TODO.refactor/**', 'flavors/content/**'],
})
