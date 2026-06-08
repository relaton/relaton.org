---
title: Flavor Model Extensions
description: Each Relaton flavor extends the base BibliographicItem with organization-specific model fields for standards metadata
---

# Flavor Model Extensions

Relaton's flavor architecture means each standards organization has a dedicated gem with its own model extensions. These extensions add domain-specific fields to the base `BibliographicItem` — capturing metadata that is unique to each organization's publishing workflow.

## Inheritance Hierarchy

Flavor models inherit from the base `BibliographicItem` (defined in [relaton-bib](https://github.com/relaton/relaton-bib)) and add their own fields:

```
BibliographicItem (relaton-bib)
  │
  ├── IsoBibliographicItem (relaton-iso-bib)
  │     └── IecBibliographicItem (relaton-iec)
  │
  ├── IetfBibliographicItem (relaton-ietf)
  ├── ItuBibliographicItem (relaton-itu)
  ├── NistBibliographicItem (relaton-nist)
  ├── BipmBibliographicItem (relaton-bipm)
  ├── BibliographicItem (relaton-3gpp)
  └── IeeeBibliographicItem (relaton-ieee)
```

Note: IEC inherits from ISO (gaining all ISO-specific fields plus its own), while all other flavors inherit directly from the base model.

## ISO

**Gem:** [relaton-iso-bib](https://github.com/relaton/relaton-iso-bib)
**Inherits from:** `BibliographicItem`

ISO extensions capture the organizational structure of ISO standards development and the compound title structure used across ISO documents.

| Field | Type | Description |
|---|---|---|
| `doctype` | enum | Document type: `standard`, `international-standard`, `technical-specification`, `technical-report`, `publicly-available-specification`, `international-workshop-agreement`, `guide` |
| `editorialgroup` | `EditorialGroup` | ISO committee structure (see below) |
| `ics` | `Array<Ics>` | International Classification for Standards codes |
| `structuredidentifier` | `StructuredIdentifier` | Machine-parseable ISO identifier (see below) |

**EditorialGroup** — tracks which ISO committee is responsible:

```
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
```

Each committee level (`technical_committee`, `subcommittee`, `workgroup`) has `name`, `type`, and `number`.

**StructuredIdentifier** — decomposes ISO identifiers:

```
structuredidentifier:
  project_number: 'ISO 19115-1'
  tc_document_number: 'ISO/TC 211'
  part: '1'
  subpart: '2'
  type: ISO
```

**ISO Title Types** — ISO uses a three-part title convention (`title-intro -- title-main -- title-part`). Relaton models each component:

- `title-intro` — e.g., "Geographic information"
- `title-main` — e.g., "Metadata"
- `title-part` — e.g., "Fundamentals"

## IEC

**Gem:** [relaton-iec](https://github.com/relaton/relaton-iec)
**Inherits from:** `IsoBibliographicItem` (layered on ISO)

IEC inherits all ISO extensions and adds IEC-specific metadata:

| Field | Type | Description |
|---|---|---|
| `function` | enum | Functional area: `emc`, `safety`, `environment`, `quality-assurance` |
| `updates_document_type` | enum | Type of document being updated |
| `accessibility_color_inside` | boolean | Whether the document contains color content |
| `cen_processing` | boolean | Whether CEN processing applies (for dual-logo standards) |
| `price_code` | string | IEC pricing code |
| `secretary` | string | Committee secretary |
| `interest_to_committees` | string | Other committees with interest in this document |
| `horizontal` | boolean | Whether this is a horizontal standard |

**Additional document types** beyond ISO: `industry-technical-agreement`, `system-reference-deliverable`
**Document subtypes:** `specification`, `method-of-test`, `vocabulary`, `code-of-practice`

## IETF

**Gem:** [relaton-ietf](https://github.com/relaton/relaton-ietf)
**Inherits from:** `BibliographicItem`

IETF has the lightest extension — only two fields beyond the base model:

| Field | Type | Description |
|---|---|---|
| `doctype` | enum | `rfc`, `internet-draft`, `draft-standard`, `bcp`, `std`, `fyi`, `info`, `exp` |
| `keyword` | `Array<String>` | Keyword strings from the RFC metadata |

The IETF data model is simple because RFC metadata is well-structured and standardized through the [RFC Series](https://www.rfc-editor.org/) and [bib.ietf.org](https://bib.ietf.org).

## ITU

**Gem:** [relaton-itu](https://github.com/relaton/relaton-itu)
**Inherits from:** `BibliographicItem`

ITU extensions model the three-sector structure (ITU-T, ITU-R, ITU-D) and the rich document type taxonomy of ITU Recommendations.

| Field | Type | Description |
|---|---|---|
| `doctype` | `DocumentType` | ITU document type with `type` and `abbreviation` (see below) |
| `editorialgroup` | `EditorialGroup` | ITU-specific committee structure with bureau |
| `structuredidentifier` | `StructuredIdentifier` | ITU-specific: `bureau`, `docnumber`, `annexid` |

**Document types:** `recommendation`, `recommendation-supplement`, `recommendation-amendment`, `recommendation-corrigendum`, `recommendation-errata`, `recommendation-annex`, `focus-group`, `implementers-guide`, `technical-paper`, `technical-report`, `joint-itu-iso-iec`, `resolution`, `service-publication`, `handbook`, `question`, `contribution`

**EditorialGroup** — includes the ITU bureau:

```
editorialgroup:
  bureau: T              # T = Telecommunication, D = Development, R = Radiocommunication
  group:
    name: Study Group 17
    type: study-group
    acronym: SG17
    period:
      start: '2022'
      finish: '2025'
```

## NIST

**Gem:** [relaton-nist](https://github.com/relaton/relaton-nist)
**Inherits from:** `BibliographicItem`

NIST extensions model the detailed publication lifecycle of NIST Special Publications, FIPS, and other NIST document series.

| Field | Type | Description |
|---|---|---|
| `doctype` | `DocumentType` | NIST document type |
| `docstatus` | `DocumentStatus` | NIST-specific lifecycle stages (see below) |
| `commentperiod` | `CommentPeriod` | Public comment period with dates |

**Document lifecycle stages:**

| Stage | Substage | Description |
|---|---|---|
| `draft-internal` | — | Internal working draft |
| `draft-wip` | — | Work-in-progress draft |
| `draft-prelim` | — | Preliminary public draft |
| `draft-public` | `active` | Public draft, accepting comments |
| `draft-public` | `retired` | Public draft, comment period closed |
| `final` | `active` | Published and current |
| `final` | `retired` | Published but retired |
| `final` | `withdrawn` | Withdrawn from publication |
| `final-review` | `active` | Under periodic review |

Each stage also carries an `iteration` number.

**CommentPeriod:**

```
commentperiod:
  from: '2024-01-15'
  to: '2024-04-15'
  extended: '2024-06-01'    # optional extension
```

**NIST series** include: SP (Special Publication), FIPS (Federal Information Processing Standards), IR (Interagency Report), TN (Technical Note), HB (Handbook), CSWP (Cybersecurity White Paper), NCSTAR (National Construction Safety Team), NSRDS (National Standard Reference Data Series).

## BIPM

**Gem:** [relaton-bipm](https://github.com/relaton/relaton-bipm)
**Inherits from:** `BibliographicItem`

BIPM extensions model SI Brochure metadata and the committee structure of the International Committee for Weights and Measures (CIPM) and its Consultative Committees.

| Field | Type | Description |
|---|---|---|
| `doctype` | `DocumentType` | BIPM document type (see below) |
| `si_aspect` | string | SI Brochure aspect code |
| `editorialgroup` | `EditorialGroup` | Committees and workgroups |
| `structuredidentifier` | `StructuredIdentifier` | `docnumber`, `part`, `appendix` |
| `comment_period` | `CommentPeriod` | Comment period with dates |
| `meeting_note` | string | Meeting note text |

**Document types:** `brochure`, `mise-en-pratique`, `rapport`, `monographie`, `guide`, `meeting-report`, `technical-report`, `working-party-note`, `strategy`, `cipm-mra`, `resolutions`

**SI aspect codes** — identify which part of the SI Brochure is affected:
`full`, `m_c`, `kg_h`, `s_deltanu`, `A_e`, `K_k`, `mol_NA`, `cd_Kcd`, and compound codes like `kg_h_c_deltanu`. These correspond to the seven base SI units and their redefinitions.

**Committee structure:**

```
editorialgroup:
  committee:
    - content: Consultative Committee for Length
      acronym: CCL
  workgroup:
    - content: Working Group on the Mise en Pratique
      acronym: WG-MeP
```

Committee acronyms are validated against a controlled vocabulary.

## 3GPP

**Gem:** [relaton-3gpp](https://github.com/relaton/relaton-3gpp)
**Inherits from:** `BibliographicItem`

3GPP has the most heavily extended flavor model, driven by the 3GPP release lifecycle — specifications move through freeze stages tied to specific meetings.

| Field | Type | Description |
|---|---|---|
| `doctype` | enum | `TR` (Technical Report), `TS` (Technical Specification) |
| `docsubtype` | enum | `spec`, `release` |
| `radiotechnology` | enum | `2G`, `3G`, `LTE`, `5G` |
| `common_ims_spec` | boolean | Whether this is a common IMS specification |
| `release` | `Release` | Complex release metadata (see below) |

**Release object** — models the 3GPP release lifecycle:

| Field | Description |
|---|---|
| `version2g` | 2G version identifier |
| `version3g` | 3G version identifier |
| `defunct` | Whether this release is defunct |
| `wpm_code_2g` | WPM code for 2G |
| `wpm_code_3g` | WPM code for 3G |
| `freeze_meeting` | Meeting at which the release was frozen |
| `freeze_stage1_meeting` | Stage 1 freeze meeting |
| `freeze_stage2_meeting` | Stage 2 freeze meeting |
| `freeze_stage3_meeting` | Stage 3 freeze meeting |
| `close_meeting` | Meeting at which the release was closed |
| `project_start` | Project start date |
| `project_end` | Project end date |

## IEEE

**Gem:** [relaton-ieee](https://github.com/relaton/relaton-ieee)
**Inherits from:** `BibliographicItem`

IEEE extensions capture committee structure and decompose IEEE publication identifiers into their semantic components.

| Field | Type | Description |
|---|---|---|
| `committee` | `Array<Committee>` | IEEE committees associated with the document |

**Committee:**

| Field | Description |
|---|---|
| `type` | Committee type (e.g., sponsoring, balloting) |
| `name` | Committee name |
| `chair` | Chairperson of the committee |

**IEEE Publication Identifier** — IEEE's PubId system decomposes identifiers into semantic parts: `number`, `publisher`, `stage`, `part`, `status`, `approval`, `edition`, `draft`, `revision`, `corrigendum`, `amendment`, `redline`, `year`, `month`. This supports precise parsing and comparison of IEEE document references.

## Formal Model Definitions

Three flavors have dedicated formal model repositories with UML diagrams and schema definitions:

| Flavor | Repository | Content |
|---|---|---|
| Base model | [relaton-models](https://github.com/relaton/relaton-models) | 40+ entities, 10 UML diagrams, RelaxNG schemas |
| 3GPP | [relaton-model-3gpp](https://github.com/relaton/relaton-model-3gpp) | 23 model files, UML diagram |
| IEEE | [relaton-model-ieee](https://github.com/relaton/relaton-model-ieee) | 24 model files, UML diagram |
| W3C | [relaton-model-w3c](https://github.com/relaton/relaton-model-w3c) | 3 model files, UML diagram |

All use the same extension pattern: a flavor-specific class (e.g., `IeeeBibliographicItem`) inherits from the core `BibliographicItem` and adds domain-specific attributes.

[View UML diagrams &rarr;](/model/diagrams) | [Extensions beyond ISO 690 &rarr;](/model/extensions)
