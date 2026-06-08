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
}

export interface SoftwareGem {
  id: string
  name: string
  displayName: string
  repoUrl: string
  description: string
  category: 'core' | 'tool' | 'flavor'
  flavorId?: string
}

export interface BlogPost {
  title: string
  date: string
  authors: string[]
  description: string
  url: string
}
