import type { FlavorExtensionData } from '../types'

export const bipm: FlavorExtensionData = {
  id: 'bipm',
  name: 'BIPM',
  description: 'BIPM extensions model SI Brochure metadata and the committee structure of the International Committee for Weights and Measures (CIPM) and its Consultative Committees.',
  repoUrl: 'https://github.com/relaton/relaton-bipm',
  extensions: [
    {
      name: 'doctype',
      type: 'DocumentType',
      description: 'BIPM document type',
      enum: ['brochure', 'mise-en-pratique', 'rapport', 'monographie', 'guide', 'meeting-report', 'technical-report', 'working-party-note', 'strategy', 'cipm-mra', 'resolutions'],
    },
    { name: 'si_aspect', type: 'string?', description: 'SI Brochure aspect code (e.g. kg_h, m_c, mol_NA, s_deltanu)' },
    { name: 'editorialgroup', type: 'EditorialGroup', description: 'Committees and workgroups' },
    { name: 'structuredidentifier', type: 'StructuredIdentifier', description: 'docnumber, part, appendix' },
    { name: 'comment_period', type: 'CommentPeriod?', description: 'Comment period with from/to dates' },
    { name: 'meeting_note', type: 'string?', description: 'Meeting note text' },
  ],
  customClasses: [
    {
      name: 'EditorialGroup',
      description: 'BIPM committee structure',
      fields: [
        { name: 'committee', type: 'Committee[]', description: 'Consultative committees with acronym' },
        { name: 'workgroup', type: 'WorkGroup[]', description: 'Working groups with acronym' },
      ],
    },
    {
      name: 'Committee',
      description: 'A BIPM consultative committee',
      fields: [
        { name: 'content', type: 'LocalizedString', description: 'Committee name' },
        { name: 'acronym', type: 'string', description: 'Committee acronym (e.g. CCL, CCU, CCM)' },
      ],
    },
    {
      name: 'WorkGroup',
      description: 'A BIPM working group',
      fields: [
        { name: 'content', type: 'LocalizedString', description: 'Group name' },
        { name: 'acronym', type: 'string', description: 'Group acronym (e.g. WG-MeP)' },
      ],
    },
  ],
  example: {
    description: 'SI Brochure, 9th edition — The International System of Units (SI)',
    yaml: `doctype: brochure
si_aspect: full
editorialgroup:
  committee:
    - content: Consultative Committee for Units
      acronym: CCU
structuredidentifier:
  docnumber: '9'`,
    json: `{
  "doctype": "brochure",
  "si_aspect": "full",
  "editorialgroup": {
    "committee": [
      { "content": "Consultative Committee for Units", "acronym": "CCU" }
    ]
  },
  "structuredidentifier": {
    "docnumber": "9"
  }
}`,
    xml: `<ext>
  <doctype>brochure</doctype>
  <si-aspect>full</si-aspect>
  <editorialgroup>
    <committee acronym="CCU">Consultative Committee for Units</committee>
  </editorialgroup>
  <structuredidentifier>
    <docnumber>9</docnumber>
  </structuredidentifier>
</ext>`,
    asciibib: `doctype:: brochure
si_aspect:: full
editorialgroup.committee[0].content:: Consultative Committee for Units
editorialgroup.committee[0].acronym:: CCU
structuredidentifier.docnumber:: 9`,
    bibSpans: `span:docid.BIPM[BIPM SI Brochure 9th ed.]
span:title[The International System of Units (SI)]
span:in_organization[International Bureau of Weights and Measures]
span:date.issued[2019]
span:type[standard]`,
  },
}
