import type { FlavorExtensionData } from '../types'

export const w3c: FlavorExtensionData = {
  id: 'w3c',
  name: 'W3C',
  description: 'W3C extensions model the deliverable type taxonomy, editor attribution, and the recommendation track maturity levels unique to W3C specifications.',
  repoUrl: 'https://github.com/relaton/relaton-w3c',
  extensions: [
    { name: 'doctype', type: 'enum', description: 'W3C deliverable type', enum: ['recommendation', 'candidate-recommendation', 'working-draft', 'note', 'group-note', 'candidate-recommendation-draft', 'candidate-note', 'discontinued-note', 'draft-note', 'registry', 'rescinded-recommendation', 'superseded-recommendation'] },
    { name: 'docstatus', type: 'DocumentStatus?', description: 'W3C maturity stage and progression' },
  ],
  customClasses: [
    {
      name: 'DocumentStatus',
      description: 'W3C recommendation track status',
      fields: [
        { name: 'stage', type: 'enum', description: 'Maturity level', enum: ['working-draft', 'candidate-recommendation', 'proposed-recommendation', 'recommendation'] },
        { name: 'track', type: 'enum?', description: 'Rec track or note track', enum: ['recommendation-track', 'note-track', 'registry-track'] },
      ],
    },
  ],
  example: {
    description: 'W3C Recommendation — Web Content Accessibility Guidelines (WCAG) 2.2',
    yaml: `doctype: recommendation
docstatus:
  stage: recommendation
  track: recommendation-track`,
    json: `{
  "doctype": "recommendation",
  "docstatus": {
    "stage": "recommendation",
    "track": "recommendation-track"
  }
}`,
    xml: `<ext>
  <doctype>recommendation</doctype>
  <docstatus>
    <stage>recommendation</stage>
    <track>recommendation-track</track>
  </docstatus>
</ext>`,
    asciibib: `doctype:: recommendation
docstatus.stage:: recommendation
docstatus.track:: recommendation-track`,
    bibSpans: `span:docid.W3C[W3C WCAG 2.2]
span:title[Web Content Accessibility Guidelines (WCAG) 2.2]
span:in_organization[World Wide Web Consortium]
span:date.issued[2023]
span:type[standard]`,
  },
}
