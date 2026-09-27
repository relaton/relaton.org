import type { FlavorExtensionData } from '../types'

export const nist: FlavorExtensionData = {
  id: 'nist',
  name: 'NIST',
  description: 'NIST extensions model the detailed publication lifecycle of NIST Special Publications, FIPS, and other NIST document series, including public comment periods.',
  repoUrl: 'https://github.com/relaton/relaton-nist',
  extensions: [
    { name: 'doctype', type: 'DocumentType', description: 'NIST document type' },
    { name: 'docstatus', type: 'DocumentStatus', description: 'Lifecycle stage, substage, and iteration' },
    { name: 'commentperiod', type: 'CommentPeriod?', description: 'Public comment period with from/to/extended dates' },
  ],
  customClasses: [
    {
      name: 'DocumentStatus',
      description: 'NIST publication lifecycle',
      fields: [
        { name: 'stage', type: 'enum', description: 'Publication stage', enum: ['draft-internal', 'draft-wip', 'draft-prelim', 'draft-public', 'final', 'final-review'] },
        { name: 'substage', type: 'enum?', description: 'Sub-status', enum: ['active', 'retired', 'withdrawn'] },
        { name: 'iteration', type: 'integer?', description: 'Revision iteration within a stage' },
      ],
    },
    {
      name: 'CommentPeriod',
      description: 'Public comment period',
      fields: [
        { name: 'from', type: 'Date', description: 'Comment period start' },
        { name: 'to', type: 'Date?', description: 'Comment period end' },
        { name: 'extended', type: 'Date?', description: 'Extended deadline' },
      ],
    },
  ],
  example: {
    description: 'NIST SP 800-188 — De-Identifying Government Datasets',
    yaml: `doctype: standard
docstatus:
  stage: final
  substage: active
commentperiod:
  from: '2023-06-15'
  to: '2023-09-15'`,
    json: `{
  "doctype": "standard",
  "docstatus": {
    "stage": "final",
    "substage": "active"
  },
  "commentperiod": {
    "from": "2023-06-15",
    "to": "2023-09-15"
  }
}`,
    xml: `<ext>
  <doctype>standard</doctype>
  <docstatus>
    <stage>final</stage>
    <substage>active</substage>
  </docstatus>
  <commentperiod>
    <from>2023-06-15</from>
    <to>2023-09-15</to>
  </commentperiod>
</ext>`,
    asciibib: `doctype:: standard
docstatus.stage:: final
docstatus.substage:: active
commentperiod.from:: 2023-06-15
commentperiod.to:: 2023-09-15`,
    bibSpans: `span:docid.NIST[NIST SP 800-188]
span:title[De-Identifying Government Datasets]
span:in_organization[National Institute of Standards and Technology]
span:date.issued[2023]
span:type[standard]`,
  },
}
