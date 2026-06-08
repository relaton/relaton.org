const categoryMap: Record<string, string> = {
  international: 'International',
  regional: 'Regional',
  national: 'National',
  industry: 'Industry',
  identifier: 'Identifier',
  other: 'Other',
}

export function categoryLabel(cat: string): string {
  return categoryMap[cat] || cat
}
