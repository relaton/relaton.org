import type { FlavorExtensionData } from '../types'

export const ieee: FlavorExtensionData = {
  id: 'ieee',
  name: 'IEEE',
  description: 'IEEE extensions capture committee structure and decompose IEEE publication identifiers into their semantic components, supporting precise parsing and comparison.',
  repoUrl: 'https://github.com/relaton/relaton-ieee',
  extensions: [
    { name: 'doctype', type: 'enum', description: 'IEEE document type', enum: ['standard', 'recommended-practice', 'guide', 'standard-with-redline', ' amendment', 'corrigendum', 'redline'] },
    { name: 'committee', type: 'Committee[]', description: 'IEEE committees associated with the document' },
    { name: 'structuredidentifier', type: 'StructuredIdentifier', description: 'Decomposed IEEE PubID: number, publisher, stage, part, status, approval, edition, draft, revision, corrigendum, amendment, redline, year, month' },
    { name: 'extends', type: 'string?', description: 'Document that this document extends' },
  ],
  customClasses: [
    {
      name: 'Committee',
      description: 'An IEEE committee',
      fields: [
        { name: 'type', type: 'enum', description: 'Committee type', enum: ['sponsoring', 'balloting', 'review'] },
        { name: 'name', type: 'string', description: 'Committee name' },
        { name: 'chair', type: 'string?', description: 'Chairperson of the committee' },
      ],
    },
  ],
  example: {
    description: 'IEEE 802.3-2018 — Ethernet',
    yaml: `doctype: standard
committee:
  - type: sponsoring
    name: LAN/MAN Standards Committee
structuredidentifier:
  number: '802.3'
  year: '2018'
  type: IEEE`,
    json: `{
  "doctype": "standard",
  "committee": [
    { "type": "sponsoring", "name": "LAN/MAN Standards Committee" }
  ],
  "structuredidentifier": {
    "number": "802.3",
    "year": "2018",
    "type": "IEEE"
  }
}`,
    xml: `<ext>
  <doctype>standard</doctype>
  <committee type="sponsoring">
    <name>LAN/MAN Standards Committee</name>
  </committee>
  <structuredidentifier type="IEEE">
    <number>802.3</number>
    <year>2018</year>
  </structuredidentifier>
</ext>`,
    asciibib: `doctype:: standard
committee[0].type:: sponsoring
committee[0].name:: LAN/MAN Standards Committee
structuredidentifier.number:: 802.3
structuredidentifier.year:: 2018
structuredidentifier.type:: IEEE`,
    bibSpans: `span:docid.IEEE[IEEE 802.3-2018]
span:title[Ethernet]
span:in_organization[Institute of Electrical and Electronics Engineers]
span:date.issued[2018]
span:type[standard]`,
  },
}
