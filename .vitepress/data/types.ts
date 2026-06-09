export interface FlavorSource {
  url?: string
  label: string
}

export interface Flavor {
  id: string
  label: string
  fullName: string
  category: 'international' | 'regional' | 'national' | 'industry' | 'identifier' | 'other'
  gem: string
  citationGuide: boolean
  sources: FlavorSource[]
  repoUrl: string
  logo?: string
  logoVariant?: 'light'
}

export interface FlavorExtensionField {
  name: string
  type: string
  description: string
  required?: boolean
  enum?: string[]
}

export interface FlavorExtensionClass {
  name: string
  description: string
  fields: FlavorExtensionField[]
}

export interface FlavorExtensionData {
  id: string
  name: string
  description: string
  inheritsFrom?: string
  repoUrl: string
  extensions: FlavorExtensionField[]
  customClasses: FlavorExtensionClass[]
  example: {
    description: string
    yaml: string
    json: string
    xml: string
    asciibib: string
    bibSpans: string
  }
}

export interface SoftwareGem {
  id: string
  name: string
  displayName: string
  repoUrl: string
  description: string
  category: 'core' | 'tool' | 'flavor'
  flavorId?: string
  sampleDocId?: string
  quickStartOverride?: string
}

export interface BlogPost {
  title: string
  date: string
  authors: string[]
  description: string
  url: string
}
