import type { FlavorExtensionData } from '../types'

export const _3gpp: FlavorExtensionData = {
  id: '3gpp',
  name: '3GPP',
  description: '3GPP has the most heavily extended flavor model, driven by the 3GPP release lifecycle — specifications move through freeze stages tied to specific meetings.',
  repoUrl: 'https://github.com/relaton/relaton-3gpp',
  extensions: [
    { name: 'doctype', type: 'enum', description: 'Document type', enum: ['TR', 'TS'] },
    { name: 'docsubtype', type: 'enum?', description: 'Sub-type', enum: ['spec', 'release'] },
    { name: 'radiotechnology', type: 'enum?', description: 'Radio technology generation', enum: ['2G', '3G', 'LTE', '5G'] },
    { name: 'common_ims_spec', type: 'boolean?', description: 'Whether this is a common IMS specification' },
    { name: 'release', type: 'Release?', description: 'Complex release lifecycle metadata' },
  ],
  customClasses: [
    {
      name: 'Release',
      description: '3GPP release lifecycle tracking',
      fields: [
        { name: 'version2g', type: 'string?', description: '2G version' },
        { name: 'version3g', type: 'string?', description: '3G version' },
        { name: 'defunct', type: 'boolean?', description: 'Whether the release is defunct' },
        { name: 'freeze_meeting', type: 'string?', description: 'Meeting at which the release was frozen' },
        { name: 'freeze_stage1_meeting', type: 'string?', description: 'Stage 1 freeze meeting' },
        { name: 'freeze_stage2_meeting', type: 'string?', description: 'Stage 2 freeze meeting' },
        { name: 'freeze_stage3_meeting', type: 'string?', description: 'Stage 3 freeze meeting' },
        { name: 'close_meeting', type: 'string?', description: 'Close meeting identifier' },
        { name: 'project_start', type: 'string?', description: 'Project start date' },
        { name: 'project_end', type: 'string?', description: 'Project end date' },
      ],
    },
  ],
  example: {
    description: '3GPP TS 23.502 — Procedures for the 5G System',
    yaml: `doctype: TS
radiotechnology: 5G
release:
  freeze_stage1_meeting: SP-180577
  freeze_stage2_meeting: SP-180577
  freeze_stage3_meeting: SP-180735
  project_start: '2017-12-20'`,
    json: `{
  "doctype": "TS",
  "radiotechnology": "5G",
  "release": {
    "freeze_stage1_meeting": "SP-180577",
    "freeze_stage2_meeting": "SP-180577",
    "freeze_stage3_meeting": "SP-180735",
    "project_start": "2017-12-20"
  }
}`,
    xml: `<ext>
  <doctype>TS</doctype>
  <radiotechnology>5G</radiotechnology>
  <release>
    <freeze-stage1-meeting>SP-180577</freeze-stage1-meeting>
    <freeze-stage2-meeting>SP-180577</freeze-stage2-meeting>
    <freeze-stage3-meeting>SP-180735</freeze-stage3-meeting>
    <project-start>2017-12-20</project-start>
  </release>
</ext>`,
    asciibib: `doctype:: TS
radiotechnology:: 5G
release.freeze_stage1_meeting:: SP-180577
release.freeze_stage2_meeting:: SP-180577
release.freeze_stage3_meeting:: SP-180735
release.project_start:: 2017-12-20`,
    bibSpans: `span:docid.3GPP[3GPP TS 23.502]
span:title[Procedures for the 5G System]
span:in_organization[3GPP]
span:date.issued[2023]
span:type[standard]`,
  },
}
