import type { FlavorExtensionData } from '../types'

export const itu: FlavorExtensionData = {
  id: 'itu',
  name: 'ITU',
  description: 'ITU extensions model the three-sector structure (ITU-T, ITU-R, ITU-D) and the rich document type taxonomy of ITU Recommendations.',
  repoUrl: 'https://github.com/relaton/relaton-itu',
  extensions: [
    {
      name: 'doctype',
      type: 'DocumentType',
      description: 'ITU document type with type and abbreviation',
    },
    { name: 'editorialgroup', type: 'EditorialGroup', description: 'ITU-specific committee structure with bureau (T/D/R), group/subgroup/workgroup' },
    { name: 'structuredidentifier', type: 'StructuredIdentifier', description: 'ITU-specific: bureau, docnumber, annexid' },
  ],
  customClasses: [
    {
      name: 'DocumentType',
      description: 'ITU document type enumeration',
      fields: [
        { name: 'type', type: 'enum', description: 'Document type', enum: ['recommendation', 'recommendation-supplement', 'resolution', 'service-publication', 'handbook', 'question', 'contribution', 'technical-paper', 'technical-report', 'implementers-guide', 'focus-group', 'joint-itu-iso-iec'] },
        { name: 'abbreviation', type: 'string?', description: 'Short form (e.g. Rec, Suppl, Res)' },
      ],
    },
    {
      name: 'EditorialGroup',
      description: 'ITU committee structure with bureau',
      fields: [
        { name: 'bureau', type: 'enum', description: 'ITU bureau', enum: ['T', 'D', 'R'] },
        { name: 'group', type: 'ItuGroup?', description: 'Study group with name, type, acronym, period' },
        { name: 'subgroup', type: 'ItuGroup?', description: 'Sub-group' },
        { name: 'workgroup', type: 'ItuGroup?', description: 'Working party' },
      ],
    },
    {
      name: 'ItuGroup',
      description: 'An ITU committee entity',
      fields: [
        { name: 'name', type: 'string', description: 'Group name' },
        { name: 'type', type: 'enum', description: 'Group type', enum: ['tsag', 'study-group', 'work-group'] },
        { name: 'acronym', type: 'string?', description: 'Short identifier (e.g. SG17)' },
        { name: 'period', type: 'Period?', description: 'Mandate period with start/finish years' },
      ],
    },
  ],
  example: {
    description: 'ITU-T G.989.2 — 40-Gigabit-capable Passive Optical Network (NG-PON2)',
    yaml: `doctype:
  type: recommendation
  abbreviation: Rec
editorialgroup:
  bureau: T
  group:
    name: Study Group 15
    type: study-group
    acronym: SG15
    period:
      start: '2022'
      finish: '2025'
structuredidentifier:
  bureau: T
  docnumber: G.989.2`,
    json: `{
  "doctype": {
    "type": "recommendation",
    "abbreviation": "Rec"
  },
  "editorialgroup": {
    "bureau": "T",
    "group": {
      "name": "Study Group 15",
      "type": "study-group",
      "acronym": "SG15",
      "period": { "start": "2022", "finish": "2025" }
    }
  },
  "structuredidentifier": {
    "bureau": "T",
    "docnumber": "G.989.2"
  }
}`,
    xml: `<ext>
  <doctype abbreviation="Rec">recommendation</doctype>
  <editorialgroup>
    <bureau>T</bureau>
    <group type="study-group" acronym="SG15">
      Study Group 15
    </group>
  </editorialgroup>
  <structuredidentifier>
    <bureau>T</bureau>
    <docnumber>G.989.2</docnumber>
  </structuredidentifier>
</ext>`,
    asciibib: `doctype.type:: recommendation
doctype.abbreviation:: Rec
editorialgroup.bureau:: T
editorialgroup.group.name:: Study Group 15
editorialgroup.group.type:: study-group
editorialgroup.group.acronym:: SG15
structuredidentifier.bureau:: T
structuredidentifier.docnumber:: G.989.2`,
    bibSpans: `span:docid.ITU[ITU-T G.989.2]
span:title[40-Gigabit-capable Passive Optical Network 2 (NG-PON2)]
span:in_organization[International Telecommunication Union]
span:date.issued[2014]
span:type[standard]`,
  },
}
