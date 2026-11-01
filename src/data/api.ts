// The v3 surface (api.relaton.org): one document by canonical key with
// Accept-based negotiation, the collection with cursor paging, and the
// model-faithful GraphQL schema.
export const apiBase = 'https://api.relaton.org'
export const apiDocumentsBase = `${apiBase}/v3/documents`
export const apiFlavorsUrl = `${apiBase}/v3/flavors`
export const apiGraphqlUrl = `${apiBase}/graphql`

// Every example below is verified against the live v3 index
// (GET /v3/documents/{key} → 200). Regenerate from /v3/flavors when
// more flavors land in storage v2.
export const apiExamples = [
  'RFC 8446',
  'GOST 1.0-2015',
  'W3C REC-xml-entity-names-20230307',
  'JIS A 0001:1999',
  'XEP 0001',
  'OIML B 10-1:2004',
  'CC 11001:2024',
  'NIST SP 800-53r5',
]
