export interface HeroSection {
  titleLine1: string
  titleLine2: string
  titleLine3: string
  subtitle: string
  primaryAction: { label: string; href: string }
  secondaryAction: { label: string; href: string }
}

export interface Feature {
  title: string
  desc: string
  icon: string
  iconClass: string
}

export interface IsoMapping {
  iso: string
  relaton: string
  link: string
}

export interface EcosystemCategory {
  label: string
  count: string
  desc: string
  accentClass: string
}

export interface CodeFormatTab {
  id: string
  label: string
}

export interface StatTarget {
  orgs: number
  rels: number
  gems: number
}

export interface SectionHeader {
  title: string
  subtitle?: string
}

export interface HomeData {
  hero: HeroSection
  stats: StatTarget
  codeTabs: CodeFormatTab[]
  codeExamples: Record<string, string>
  features: Feature[]
  isoMappingSection: SectionHeader
  isoMappings: IsoMapping[]
  orgsSection: SectionHeader
  ecosystemSection: SectionHeader
  ecosystem: EcosystemCategory[]
  blogSection: SectionHeader
  ctaSection: {
    title: string
    primaryAction: { label: string; href: string }
    secondaryAction: { label: string; href: string }
  }
}

export const homeData: HomeData = {
  hero: {
    titleLine1: 'The Premier',
    titleLine2: 'Bibliographic',
    titleLine3: 'Data Model',
    subtitle:
      'An interoperable, machine-readable data model for citations — based on ISO 690, trusted by IETF, BIPM, OIML, and 25+ standards organizations.',
    primaryAction: { label: 'Explore the Model', href: '/model/overview' },
    secondaryAction: { label: 'Get Started', href: '/software/' },
  },

  stats: { orgs: 25, rels: 60, gems: 30 },

  codeTabs: [
    { id: 'yaml', label: 'YAML' },
    { id: 'xml', label: 'XML' },
    { id: 'bibtex', label: 'BibTeX' },
    { id: 'asciibib', label: 'AsciiBib' },
  ],

  codeExamples: {
    yaml: `id: ISO 690:2010
title:
  - content: Information and documentation
    language: en
    script: Latn
  - content: Guidelines for bibliographic
    language: en
    script: Latn
type: standard
docid:
  id: ISO 690:2010
  type: ISO
date:
  - type: published
    value: '2010'
contributor:
  - organization:
      name: International Organization
        for Standardization
    role:
      - publisher
edition: "2"`,

    xml: `<bibitem type="standard" id="ISO690-2010">
  <title>Information and documentation
    -- Guidelines for bibliographic
    references and citations</title>
  <docidentifier type="ISO">
    ISO 690:2010</docidentifier>
  <date type="published">
    <on>2010</on>
  </date>
  <contributor>
    <role type="publisher"/>
    <organization>
      <name>International Organization
        for Standardization</name>
    </organization>
  </contributor>
  <edition>2</edition>
</bibitem>`,

    bibtex: `@standard{ISO690_2010,
  type = {standard},
  title = {Information and documentation
    -- Guidelines for bibliographic
    references and citations},
  number = {ISO 690:2010},
  year = {2010},
  edition = {2},
  publisher = {International Organization
    for Standardization}
}`,

    asciibib: `id:: ISO 690:2010
title:: Information and documentation
  -- Guidelines for bibliographic
  references and citations
type:: standard
docid[number]:: ISO 690:2010
docid[type]:: ISO
date[published]:: 2010
contributor[role=publisher]::
contributor.organization.name::
  International Organization
  for Standardization
edition:: 2`,
  },

  features: [
    {
      title: 'Standards Compliant',
      desc: 'Full ISO 690 coverage with extensions for document stages, supplements, and amendment tracking.',
      icon: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.48 0 2.88.36 4.11.99"/></svg>',
      iconClass: 'icon-blue',
    },
    {
      title: 'Machine Readable',
      desc: 'XML, YAML, BibTeX, and AsciiBib serializations. Every data element is structured for programmatic access.',
      icon: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      iconClass: 'icon-aqua',
    },
    {
      title: 'Extensible by Design',
      desc: 'Flavor-specific extensions for each SDO. Add new organizations without changing the core model.',
      icon: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
      iconClass: 'icon-green',
    },
  ],

  isoMappingSection: {
    title: 'Built on ISO 690',
    subtitle:
      'Every ISO 690 concept maps directly to a Relaton entity. The model is the information model implementation of the international standard for bibliographic references.',
  },

  isoMappings: [
    { iso: 'Title', relaton: 'Title', link: '/model/title' },
    { iso: 'Creator', relaton: 'Contributor', link: '/model/contributor' },
    { iso: 'Edition', relaton: 'Edition', link: '/model/edition' },
    { iso: 'Production', relaton: 'Production', link: '/model/production' },
    { iso: 'Location', relaton: 'Location', link: '/model/location' },
    { iso: 'Medium', relaton: 'Medium', link: '/model/medium' },
    { iso: 'Series', relaton: 'Series', link: '/model/series' },
    { iso: 'Identifiers', relaton: 'Identifiers', link: '/model/identifiers' },
    { iso: 'Numeration', relaton: 'Numeration', link: '/model/numeration' },
    { iso: 'Relations', relaton: 'Relations', link: '/model/relations' },
    { iso: 'Additional Info', relaton: 'Additional Info', link: '/model/additional-info' },
  ],

  orgsSection: {
    title: 'Supported Standards Organizations',
    subtitle: '28 organizations across international, regional, national, and identifier bodies.',
  },

  ecosystemSection: {
    title: 'Software Ecosystem',
    subtitle: '32 Ruby gems covering core libraries, CLI tools, and 29 flavor-specific data retrievers.',
  },

  ecosystem: [
    { label: 'Core Libraries', count: '2', desc: 'relaton and relaton-bib — the foundation', accentClass: 'accent-blue' },
    { label: 'CLI Tools', count: '1', desc: 'relaton-cli — build, fetch, convert', accentClass: 'accent-aqua' },
    { label: 'Flavor Gems', count: '29', desc: 'One per standards organization', accentClass: 'accent-green' },
  ],

  blogSection: {
    title: 'Latest News',
  },

  ctaSection: {
    title: 'Start citing standards with Relaton',
    primaryAction: { label: 'View Software', href: '/software/' },
    secondaryAction: { label: 'Try the API', href: '/api/' },
  },
}
