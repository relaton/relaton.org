import type { FlavorExtensionData } from '../types'

export const ietf: FlavorExtensionData = {
  id: 'ietf',
  name: 'IETF',
  description: 'IETF has the lightest extension model — only two fields beyond the base model — because RFC metadata is well-structured and standardized through the RFC Series and bib.ietf.org.',
  repoUrl: 'https://github.com/relaton/relaton-ietf',
  extensions: [
    {
      name: 'doctype',
      type: 'enum?',
      description: 'IETF document type',
      enum: ['rfc', 'internet-draft', 'draft-standard', 'bcp', 'std', 'fyi', 'info', 'exp'],
    },
    { name: 'keyword', type: 'string[]', description: 'Keyword strings from RFC metadata' },
  ],
  customClasses: [],
  example: {
    description: 'RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3',
    yaml: `doctype: rfc
keyword:
  - TLS
  - security
  - transport layer`,
    json: `{
  "doctype": "rfc",
  "keyword": ["TLS", "security", "transport layer"]
}`,
    xml: `<ext>
  <doctype>rfc</doctype>
  <keyword>TLS</keyword>
  <keyword>security</keyword>
  <keyword>transport layer</keyword>
</ext>`,
    asciibib: `doctype:: rfc
keyword[0]:: TLS
keyword[1]:: security
keyword[2]:: transport layer`,
    bibSpans: `span:docid.IETF[RFC 8446]
span:title[The Transport Layer Security (TLS) Protocol Version 1.3]
span:in_organization[Internet Engineering Task Force]
span:date.issued[2018]
span:type[standard]
span:keyword[TLS]
span:keyword[security]
span:keyword[transport layer]`,
  },
}
