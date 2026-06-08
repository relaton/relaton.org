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
  layers: ArchitectureLayer[]
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

export interface ArchitectureLayer {
  number: string
  title: string
  desc: string
  link: string
  accentClass: string
}

export const homeData: HomeData = {
  hero: {
    titleLine1: 'The Premier',
    titleLine2: 'Bibliographic',
    titleLine3: 'Data Model',
    subtitle:
      'An interoperable, machine-readable data model for citations — created by the authors of ISO 690:2021, trusted by IETF, BIPM, OIML, and 25+ standards organizations.',
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
      title: 'Built on ISO 690',
      desc: 'Every ISO 690 data element maps to a Relaton entity. The model extends the standard for document stages, supplements, and amendment tracking.',
      icon: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.48 0 2.88.36 4.11.99"/></svg>',
      iconClass: 'icon-blue',
    },
    {
      title: 'Auto-Fetch by PubID',
      desc: 'Provide a publication identifier and Relaton retrieves structured metadata from 27+ SDO datasets — no manual citation maintenance.',
      icon: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      iconClass: 'icon-aqua',
    },
    {
      title: 'Render Any Style',
      desc: 'Generate formatted citations in ISO 690, APA, MLA, and custom styles via relaton-render — beyond what BibTeX or CSL can express.',
      icon: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
      iconClass: 'icon-green',
    },
  ],

  layers: [
    { number: '01', title: 'ISO 690', desc: 'The international standard for bibliographic references and citations — Relaton is its machine-readable implementation.', link: '/model/iso-690', accentClass: 'layer-standard' },
    { number: '02', title: 'Information Model', desc: 'BibliographicItem + 14 entities, 60+ relation types — a comprehensive data model covering all ISO 690 data elements.', link: '/model/overview', accentClass: 'layer-model' },
    { number: '03', title: 'Serializations', desc: 'YAML, XML, BibTeX, AsciiBib, and JSON-LD — the same data in five formats, suited to different workflows.', link: '/model/serializations', accentClass: 'layer-serial' },
    { number: '04', title: 'Auto-Fetch', desc: '27 flavor gems retrieve metadata from SDO datasets by publication identifier — no manual citation maintenance.', link: '/flavors/', accentClass: 'layer-fetch' },
    { number: '05', title: 'Rendering', desc: 'Formatted citations in ISO 690, APA, MLA, and custom styles — beyond what BibTeX or CSL can express.', link: '/specs/relaton-render', accentClass: 'layer-render' },
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
