---
title: Extensions Beyond ISO 690
description: Relaton extends the ISO 690 bibliographic standard with document lifecycle, typed relations, structured identifiers, and a flavor-specific extension mechanism.
---

# Extensions Beyond ISO 690

ISO 690 defines the conceptual framework for bibliographic references — what data elements exist and how they should be presented. But it deliberately does not specify a data model for machine-readable citations. Relaton fills that gap, and in doing so extends the model significantly beyond what ISO 690 requires.

This page documents every attribute and entity that Relaton adds beyond the ISO 690 standard.

## The Extension Architecture

Relaton's BibliographicItem has two kinds of fields:

1. **ISO 690 fields** — direct implementations of ISO 690 data elements (title, contributor, date, series, etc.)
2. **Relaton extensions** — fields needed for standards development that ISO 690 does not cover

The extensions fall into four categories: document lifecycle, inter-document relations, rights and metadata, and operational infrastructure.

## Document Lifecycle

ISO 690 has no concept of publication status — it assumes a reference points to a published resource. In standards development, documents move through stages: drafts, public reviews, approvals, withdrawals.

### Document Status

```
status:
  stage: draft-public
  substage: active
  iteration: 2
```

| Field | Values | Description |
|---|---|---|
| `stage` | `draft-internal`, `draft-wip`, `draft-prelim`, `draft-public`, `final`, `final-review` | Where the document is in its lifecycle |
| `substage` | `active`, `retired`, `withdrawn` | Whether the document is current |
| `iteration` | integer | Revision iteration within a stage |

### Validity Period

```
validity:
  begins: '2024-01-15'
  ends: '2029-01-15'
  revision: '2026-01-15'
```

Some standards have defined validity periods. This models when a document becomes effective, when it expires, and when it is scheduled for review.

### Version vs. Edition

ISO 690 has `edition`. Relaton adds `version` with richer semantics:

```
version:
  - type: draft
    content: '3'
    revision_date: '2024-06-01'
    draft: true
```

This captures draft numbers and revision dates — essential for tracking standards development.

## Inter-Document Relations

ISO 690 mentions that resources can be related to each other but provides no formal model for those relationships. Relaton defines **50+ typed relation types** based on the FRBR (Functional Requirements for Bibliographic Records) model.

### Complete Relation Type Taxonomy

| Category | Types |
|---|---|
| **Containment** | `includes` / `includedIn`, `hasPart` / `partOf` |
| **Consolidation** | `merges` / `mergedInto`, `splits` / `splitInto` |
| **FRBR Work level** | `instanceOf` / `hasInstance`, `exemplarOf` / `hasExemplar` |
| **FRBR Expression** | `manifestationOf` / `hasManifestation`, `reproductionOf` / `hasReproduction`, `reprintOf` / `hasReprint` |
| **FRBR Expression** | `expressionOf` / `hasExpression` |
| **Translation** | `translatedFrom` / `hasTranslation` |
| **Adaptation** | `arrangementOf` / `hasArrangement`, `abridgementOf` / `hasAbridgement`, `annotationOf` / `hasAnnotation`, `adaptedFrom` / `hasAdaptation` |
| **Draft lineage** | `draftOf` / `hasDraft`, `predecessorDraftOf` / `hasPredecessorDraft`, `successorDraftOf` / `hasSuccessorDraft` |
| **Edition** | `editionOf` / `hasEdition` |
| **Update** | `updates` / `updatedBy` |
| **Derivation** | `derivedFrom` / `derives` |
| **Description** | `describes` / `describedBy`, `catalogues` / `cataloguedBy` |
| **Succession** | `hasSuccessor` / `successorOf` |
| **Adoption** | `adoptedFrom` / `adoptedAs` |
| **Review** | `reviewOf` / `hasReview`, `commentaryOf` / `hasCommentary` |
| **Complement** | `hasComplement` / `complementOf` |
| **Obsolescence** | `obsoletes` / `obsoletedBy` |
| **Citation** | `cites` / `isCitedIn` |
| **Equivalence** | `identical`, `equivalent`, `nonequivalent`, `related` |

Each relation links to a `ReducedBibliographicItem` with locality stacks for specifying exact extents (pages, sections, volumes).

## Structured Identification

ISO 690 treats identifiers as opaque strings. Relaton decomposes them into machine-parseable structures.

### Document Identifiers

```
docidentifier:
  - id: ISO 19115-1:2014
    type: ISO
    primary: true
    scope: publisher
```

Each identifier has a `type` (ISO, IEC, DOI, ISSN, etc.), an optional `scope` (publisher, ISBN, etc.), and a `primary` flag.

### Structured Identifier

```
structuredidentifier:
  type: ISO
  agency:
    - ISO
    - TC 211
  docnumber: '19115'
  partnumber: '1'
  edition: '1'
  year: '2014'
  supplementtype: IS
  supplementnumber: '1'
  amendment: '2'
  corrigendum: '1'
```

This decomposes a publication identifier into its semantic components — agency, document number, part, supplement, amendment, corrigendum, year. This enables programmatic parsing and comparison of identifiers.

### Internal Document Number

`docnumber` provides a normalized, sort-friendly identifier distinct from the display identifier.

## Rights and Ownership

### Copyright

```
copyright:
  - from: '2014'
    to: '2024'
    owner:
      - organization:
          name:
            - content: International Organization for Standardization
              language: en
```

ISO 690 does not model copyright. Relaton tracks the copyright date range and owning organization.

### License

```
license:
  - CC-BY-SA-4.0
```

Explicit license identifiers — important for open standards.

## Metadata Extensions

### Keywords

```
keyword:
  - vocab:
      content: geographic information
    taxon:
      - content: GIS
    vocabid:
      - type: ISO
        code: '01.020'
        term: Terminology
```

ISO 690 has no keyword concept. Relaton models keywords with controlled vocabulary references, taxonomy terms, and vocabulary identifiers. This supports standards classification and search.

### Classification

```
classification:
  - id: '35.240.60'
    type: ICS
```

Typed classification codes (e.g., ICS codes) — reused from the DocumentIdentifier structure.

### Abstract

```
abstract:
  - content: >-
      This document specifies requirements...
    language: en
    script: Latn
```

ISO 690 does not include abstracts in references. Relaton adds them as localizable structured content.

## Extended Enumerations

### Date Types

ISO 690 defines ~3 date types (published, accessed, created). Relaton defines **16**:

| Type | Description |
|---|---|
| `published` | Publication date |
| `accessed` | Last access date |
| `created` | Creation date |
| `implemented` | Implementation date |
| `obsoleted` | Obsolescence date |
| `confirmed` | Confirmation date |
| `updated` | Update date |
| `corrected` | Correction date |
| `issued` | Issue date |
| `transmitted` | Transmission date |
| `copied` | Copy date |
| `unchanged` | Date marked as unchanged |
| `circulated` | Circulation date |
| `adapted` | Adaptation date |
| `vote-started` | Voting start date |
| `vote-ended` | Voting end date |
| `announced` | Announcement date |
| `stable-until` | Stability expiry date |

### Contributor Roles

ISO 690 defines ~4 roles (author, editor, publisher, translator). Relaton defines **11**:

| Role | Description |
|---|---|
| `author` | Primary author |
| `editor` | Editor |
| `realizer` | Realizer/producer |
| `performer` | Performer |
| `translator` | Translator |
| `adapter` | Adapter |
| `publisher` | Publisher |
| `distributor` | Distributor |
| `owner` | Rights owner |
| `authorizer` | Authorizing body |
| `enabler` | Enabler/facilitator |
| `subject` | Subject of the work |

### Resource Types (BibItemType)

ISO 690 defines 16 resource categories. Relaton defines **28+**, combining ISO 690 types with BibTeX entry types:

`article`, `book`, `booklet`, `manual`, `proceedings`, `presentation`, `thesis`, `techReport`, `standard`, `unpublished`, `map`, `electronicResource`, `audiovisual`, `film`, `video`, `broadcast`, `graphicWork`, `music`, `patent`, `inBook`, `inCollection`, `inProceedings`, `journal`, `webResource`, `website`, `dataset`, `archival`, `software`, `socialMedia`, `alert`, `message`, `conversation`, `misc`

## Physical and Digital Extensions

| Field | Description |
|---|---|
| `size` | Typed size values (e.g., pages, data size) — structured beyond ISO 690's flat extent |
| `price` | Price with currency code |
| `depiction` | Image depictions with dimensions, MIME type, alt text |
| `accesslocation` | Explicit access locations (physical or digital) |

## The Extension Block (`ext`)

All flavor-specific extensions live inside the `ext` element, providing a clean separation between the core model and SDO-specific data:

```
ext:
  schema_version: '1.0.0'
  doctype:
    abbreviation: IS
    content: international-standard
  subdoctype: specification
  flavor: iso
  ics:
    - code: '35.240.60'
      text: IT applications in transport and trade
  structuredidentifier:
    - type: ISO
      docnumber: '19115'
      partnumber: '1'
```

Each flavor gem defines its own `ext` structure. See [Flavor Model Extensions](/model/flavor-models) for per-flavor details.

## Formal Model Definitions

The Relaton model is formally defined in:

- **[relaton-models](https://github.com/relaton/relaton-models)** — 40+ entity definitions in LutaML, RelaxNG schemas, UML diagrams
- **[relaton-model-3gpp](https://github.com/relaton/relaton-model-3gpp)** — 3GPP-specific model extensions
- **[relaton-model-ieee](https://github.com/relaton/relaton-model-ieee)** — IEEE-specific model extensions
- **[relaton-model-w3c](https://github.com/relaton/relaton-model-w3c)** — W3C-specific model extensions

[View UML diagrams &rarr;](/model/diagrams) | [Flavor model extensions &rarr;](/model/flavor-models)
