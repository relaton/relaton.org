import type { FlavorExtensionData } from '../types'

export const iso: FlavorExtensionData = {
  id: 'iso',
  name: 'ISO',
  description: 'ISO extensions capture the organizational structure of ISO standards development, committee tracking, ICS classification, and the compound title structure used across ISO documents.',
  repoUrl: 'https://github.com/relaton/relaton-iso-bib',
  extensions: [
    {
      name: 'doctype',
      type: 'enum',
      description: 'ISO document type',
      enum: ['international-standard', 'technical-specification', 'technical-report', 'publicly-available-specification', 'international-workshop-agreement', 'guide'],
    },
    {
      name: 'editorialgroup',
      type: 'EditorialGroup',
      description: 'Committee structure: technical_committee, subcommittee, workgroup (each with name/type/number), plus secretariat',
    },
    {
      name: 'ics',
      type: 'ICS[]',
      description: 'International Classification for Standards codes (code, field, group, subgroup)',
    },
    {
      name: 'structuredidentifier',
      type: 'StructuredIdentifier',
      description: 'Machine-parseable identifier: project_number, tc_document_number, part, subpart, type',
    },
  ],
  customClasses: [
    {
      name: 'EditorialGroup',
      description: 'ISO committee structure',
      fields: [
        { name: 'technical_committee', type: 'IsoSubgroup[]', description: 'Technical committee with name, type, number' },
        { name: 'subcommittee', type: 'IsoSubgroup[]', description: 'Subcommittee with name, type, number' },
        { name: 'workgroup', type: 'IsoSubgroup[]', description: 'Working group with name, type, number' },
        { name: 'secretariat', type: 'string?', description: 'Secretariat organization' },
      ],
    },
    {
      name: 'IsoSubgroup',
      description: 'A committee or working group',
      fields: [
        { name: 'name', type: 'string', description: 'Name of the group' },
        { name: 'type', type: 'string', description: 'Type: TC, SC, WG' },
        { name: 'number', type: 'integer', description: 'Committee number' },
      ],
    },
    {
      name: 'ICS',
      description: 'International Classification for Standards',
      fields: [
        { name: 'code', type: 'string', description: 'ICS code (e.g. 35.240.60)' },
        { name: 'text', type: 'string', description: 'Description of the field' },
      ],
    },
  ],
  example: {
    description: 'ISO 19115-1:2014 — Geographic information — Metadata',
    yaml: `doctype: international-standard
editorialgroup:
  technical_committee:
    - name: Geographic information/Geomatics
      type: TC
      number: 211
  subcommittee:
    - name: Geographic information services
      type: SC
      number: 1
  secretariat: ANSI
ics:
  - code: 35.240.60
    text: IT applications in transport and trade
structuredidentifier:
  project_number: 'ISO 19115-1'
  tc_document_number: 'ISO/TC 211'
  part: '1'
  type: ISO`,
    json: `{
  "doctype": "international-standard",
  "editorialgroup": {
    "technical_committee": [
      { "name": "Geographic information/Geomatics", "type": "TC", "number": 211 }
    ],
    "subcommittee": [
      { "name": "Geographic information services", "type": "SC", "number": 1 }
    ],
    "secretariat": "ANSI"
  },
  "ics": [
    { "code": "35.240.60", "text": "IT applications in transport and trade" }
  ],
  "structuredidentifier": {
    "project_number": "ISO 19115-1",
    "tc_document_number": "ISO/TC 211",
    "part": "1",
    "type": "ISO"
  }
}`,
    xml: `<ext>
  <doctype abbreviation="IS">international-standard</doctype>
  <editorialgroup>
    <technical-committee type="TC" number="211">
      Geographic information/Geomatics
    </technical-committee>
    <subcommittee type="SC" number="1">
      Geographic information services
    </subcommittee>
    <secretariat>ANSI</secretariat>
  </editorialgroup>
  <ics>
    <code>35.240.60</code>
    <text>IT applications in transport and trade</text>
  </ics>
  <structuredidentifier type="ISO">
    <project-number>ISO 19115-1</project-number>
    <tc-document-number>ISO/TC 211</tc-document-number>
    <part>1</part>
  </structuredidentifier>
</ext>`,
    asciibib: `doctype:: international-standard
editorialgroup.technical_committee[0].name:: Geographic information/Geomatics
editorialgroup.technical_committee[0].type:: TC
editorialgroup.technical_committee[0].number:: 211
editorialgroup.secretariat:: ANSI
ics[0].code:: 35.240.60
ics[0].text:: IT applications in transport and trade
structuredidentifier[0].project_number:: ISO 19115-1
structuredidentifier[0].part:: 1
structuredidentifier[0].type:: ISO`,
    bibSpans: `span:docid.ISO[ISO 19115-1:2014]
span:title[Geographic information -- Metadata -- Part 1: Fundamentals]
span:in_organization[International Organization for Standardization]
span:date.issued[2014]
span:type[standard]
span:series[ISO/TC 211]`,
  },
}
