// The v3 surface (api.relaton.org): one document by canonical key with
// Accept-based negotiation, the collection with cursor paging, and the
// model-faithful GraphQL schema.
export const apiBase = 'https://api.relaton.org'
export const apiDocumentsBase = `${apiBase}/v3/documents`
export const apiFlavorsUrl = `${apiBase}/v3/flavors`
export const apiGraphqlUrl = `${apiBase}/graphql`

// Every example below is verified against the live index.
export const apiExamples = [
  'RFC 8446',
  'ISO 690:2021',
  'IEC 31010:2019',
  'ISO/IEC 31010',
  'GOST 1.0-2015',
  '3GPP TS 23.040:REL-19/19.0.0',
  'W3C REC-xml-entity-names-20230307',
]
