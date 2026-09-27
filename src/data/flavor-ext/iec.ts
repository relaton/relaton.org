import type { FlavorExtensionData } from '../types'

export const iec: FlavorExtensionData = {
  id: 'iec',
  name: 'IEC',
  description: 'IEC inherits all ISO extensions and adds IEC-specific metadata for functional area classification, dual-logo processing flags, and committee administration.',
  inheritsFrom: 'IsoBibliographicItem (ISO)',
  repoUrl: 'https://github.com/relaton/relaton-iec',
  extensions: [
    {
      name: 'function',
      type: 'enum?',
      description: 'Functional area',
      enum: ['emc', 'safety', 'environment', 'quality-assurance'],
    },
    { name: 'accessibility_color_inside', type: 'boolean?', description: 'Whether the document contains color content' },
    { name: 'cen_processing', type: 'boolean?', description: 'Whether CEN processing applies' },
    { name: 'price_code', type: 'string?', description: 'IEC pricing code' },
    { name: 'secretary', type: 'string?', description: 'Committee secretary' },
    { name: 'interest_to_committees', type: 'string?', description: 'Other committees with interest' },
    { name: 'horizontal', type: 'boolean?', description: 'Whether this is a horizontal standard' },
  ],
  customClasses: [],
  example: {
    description: 'IEC 61131-3:2013 — Programmable controllers — Part 3: Programming languages',
    yaml: `doctype: international-standard
function: emc
accessibility_color_inside: true
cen_processing: false
horizontal: false
editorialgroup:
  technical_committee:
    - name: Programmable controllers
      type: TC
      number: 65
  secretariat: SEK`,
    json: `{
  "doctype": "international-standard",
  "function": "emc",
  "accessibility_color_inside": true,
  "cen_processing": false,
  "horizontal": false,
  "editorialgroup": {
    "technical_committee": [
      { "name": "Programmable controllers", "type": "TC", "number": 65 }
    ],
    "secretariat": "SEK"
  }
}`,
    xml: `<ext>
  <doctype abbreviation="IS">international-standard</doctype>
  <function>emc</function>
  <accessibility-color-inside>true</accessibility-color-inside>
  <cen-processing>false</cen-processing>
  <horizontal>false</horizontal>
  <editorialgroup>
    <technical-committee type="TC" number="65">
      Programmable controllers
    </technical-committee>
  </editorialgroup>
</ext>`,
    asciibib: `doctype:: international-standard
function:: emc
accessibility_color_inside:: true
cen_processing:: false
horizontal:: false
editorialgroup.technical_committee[0].name:: Programmable controllers
editorialgroup.technical_committee[0].type:: TC
editorialgroup.technical_committee[0].number:: 65`,
    bibSpans: `span:docid.IEC[IEC 61131-3:2013]
span:title[Programmable controllers -- Part 3: Programming languages]
span:in_organization[International Electrotechnical Commission]
span:date.issued[2013]
span:type[standard]`,
  },
}
