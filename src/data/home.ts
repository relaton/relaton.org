import { flavors } from './flavors'
import { gems } from './software'

const flavorCount = flavors.length
const orgCount = flavors.filter(f => f.category !== 'identifier').length
const identifierCount = flavorCount - orgCount
const gemCount = gems.length
const flavorGemCount = gems.filter(g => g.category === 'flavor').length

export interface HeroSection {
  titleLine1: string
  titleLine2: string
  titleLine3: string
  subtitle: string
  primaryAction: { label: string; href: string }
  secondaryAction: { label: string; href: string }
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

export interface SectionHeader {
  title: string
  subtitle?: string
}

export interface HomeData {
  hero: HeroSection
  codeTabs: CodeFormatTab[]
  codeExamples: Record<string, string>
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

export const counts = { flavorCount, orgCount, identifierCount, gemCount, flavorGemCount }

export const homeData: HomeData = {
  hero: {
    titleLine1: 'The Premier',
    titleLine2: 'Bibliographic',
    titleLine3: 'Data Model',
    subtitle:
      `An interoperable, machine-readable data model for citations — created by the authors of ISO 690:2021, trusted by IETF, BIPM, OIML, and ${orgCount} standards organizations.`,
    primaryAction: { label: 'Explore the Model', href: '/model/' },
    secondaryAction: { label: 'Get Started', href: '/get-started/' },
  },

  codeTabs: [
    { id: 'yaml', label: 'YAML' },
    { id: 'xml', label: 'XML' },
    { id: 'bibtex', label: 'BibTeX' },
    { id: 'asciibib', label: 'AsciiBib' },
  ],

  codeExamples: {
    yaml: `id: ISO 690:2021
title:
  - content: Information and documentation
    language: en
    script: Latn
  - content: Guidelines for bibliographic
    language: en
    script: Latn
type: standard
docid:
  id: ISO 690:2021
  type: ISO
date:
  - type: published
    value: '2021'
contributor:
  - organization:
      name: International Organization
        for Standardization
    role:
      - publisher
edition: "3"`,

    xml: `<bibitem type="standard" id="ISO690-2021">
  <title>Information and documentation
    -- Guidelines for bibliographic
    references and citations</title>
  <docidentifier type="ISO">
    ISO 690:2021</docidentifier>
  <date type="published">
    <on>2021</on>
  </date>
  <contributor>
    <role type="publisher"/>
    <organization>
      <name>International Organization
        for Standardization</name>
    </organization>
  </contributor>
  <edition>3</edition>
</bibitem>`,

    bibtex: `@standard{ISO690_2021,
  type = {standard},
  title = {Information and documentation
    -- Guidelines for bibliographic
    references and citations},
  number = {ISO 690:2021},
  year = {2021},
  edition = {3},
  publisher = {International Organization
    for Standardization}
}`,

    asciibib: `id:: ISO 690:2021
title:: Information and documentation
  -- Guidelines for bibliographic
  references and citations
type:: standard
docid[number]:: ISO 690:2021
docid[type]:: ISO
date[published]:: 2021
contributor[role=publisher]::
contributor.organization.name::
  International Organization
  for Standardization
edition:: 3`,
  },

  layers: [
    { number: '01', title: 'ISO 690', desc: 'The international standard for bibliographic references and citations — Relaton is its machine-readable implementation.', link: '/model/iso-690/', accentClass: 'layer-standard' },
    { number: '02', title: 'Information Model', desc: 'BibliographicItem + 14 entities, 60+ relation types — a comprehensive data model covering all ISO 690 data elements.', link: '/model/', accentClass: 'layer-model' },
    { number: '03', title: 'Serializations', desc: 'YAML, XML, BibTeX, AsciiBib, and JSON-LD — the same data in five formats, suited to different workflows.', link: '/model/serializations', accentClass: 'layer-serial' },
    { number: '04', title: 'Auto-Fetch', desc: `${flavorGemCount} flavor gems retrieve metadata from SDO datasets by publication identifier — no manual citation maintenance.`, link: '/flavors/', accentClass: 'layer-fetch' },
    { number: '05', title: 'Rendering', desc: 'Formatted citations in ISO 690, APA, MLA, and custom styles — beyond what BibTeX or CSL can express.', link: '/specs/relaton-render', accentClass: 'layer-render' },
  ],

  orgsSection: {
    title: 'Supported Standards Organizations',
    subtitle: `${orgCount} organizations and ${identifierCount} identifier systems across international, regional, national, and industry bodies.`,
  },

  ecosystemSection: {
    title: 'Software Ecosystem',
    subtitle: `${gemCount} Ruby gems covering core libraries, CLI tools, and ${flavorGemCount} flavor-specific data retrievers.`,
  },

  ecosystem: [
    { label: 'Core Libraries', count: String(gems.filter(g => g.category === 'core').length), desc: 'relaton and relaton-bib — the foundation', accentClass: 'accent-blue' },
    { label: 'CLI Tools', count: String(gems.filter(g => g.category === 'tool').length), desc: 'relaton-cli and relaton-render — fetch, convert, cite', accentClass: 'accent-aqua' },
    { label: 'Flavor Gems', count: String(flavorGemCount), desc: 'One per standards organization', accentClass: 'accent-green' },
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
