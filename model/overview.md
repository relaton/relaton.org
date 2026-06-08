---
title: Overview & ISO 690
description: The Relaton Information Model is the machine-readable implementation of ISO 690 for bibliographic references
---

# The Relaton Information Model

The Relaton Information Model is a comprehensive data model for bibliographic references and citations. It is based on **ISO 690:2021** — the international standard for bibliographic references and citations to information resources — and extends it to meet the specific needs of standards development organizations.

## ISO 690 Relationship

ISO 690 defines the conceptual framework for bibliographic references. Relaton provides the concrete information model implementation:

- Every ISO 690 concept has a corresponding Relaton entity
- Every ISO 690 data element has a defined field in the Relaton model
- The model extends ISO 690 for standards-specific needs: document stages, supplements, amendment tracking, and more

### ISO 690 Areas to Relaton Entities

| ISO 690 Area | Relaton Entity | Description |
|---|---|---|
| Title | [Title](/model/title) | Title types, scripts, and formatting |
| Creator | [Contributor](/model/contributor) | Person, Organization, Affiliation |
| Edition | [Edition](/model/edition) | Edition and versioning |
| Material Designation | [Medium](/model/medium) | Content/carrier/size |
| Production | [Production](/model/production) | Place, publisher, dates |
| Publication Place | [Location](/model/location) | Access locations, URIs |
| Publisher | [Production](/model/production) | Publisher within production |
| Date | [Production](/model/production) | Date within production |
| Series | [Series](/model/series) | Series membership |
| Numeration | [Numeration](/model/numeration) | Extent, pagination, size |
| Identifiers | [Identifiers](/model/identifiers) | Document identifiers and scopes |
| Relations | [Relations](/model/relations) | 60+ document relation types |
| Additional Info | [Additional Info](/model/additional-info) | Keywords, classification, tags |
| Resource Type | [Bibitem Types](/model/bibtype) | ISO 690 + BibTeX union types |

## Architecture

The model is organized around the **BibliographicItem** — the central entity that represents any citable document. A BibliographicItem contains:

- **Titles** — in multiple scripts and languages
- **Contributors** — persons, organizations, and their roles
- **Identifiers** — document IDs, DOIs, ISBNs, URIs
- **Production information** — publisher, place, dates
- **Relations** — links to other documents (replaces, amends, etc.)
- **Classification** — document type, keywords, subjects
- **Content details** — edition, medium, series, numeration

## Key Concepts

### Flavors

Relaton uses a "flavor" architecture where each standards organization has a dedicated gem that retrieves and formats bibliographic data specific to that organization. There are 27 flavors covering international, regional, national, and identifier bodies.

[View all flavors &rarr;](/flavors/)

### Serialization Formats

The model supports multiple serialization formats:

- **Relaton YAML** — primary serialization format
- **Relaton XML** — XML serialization based on ISO 690
- **BibTeX** — for integration with LaTeX workflows
- **AsciiBib** — for embedding in AsciiDoc documents
- **JSON-LD** — for linked data applications

### Document Relation Types

The model defines 60+ relation types between documents, including:

- `replaces` / `replacedBy`
- `amends` / `amendedBy`
- `corrigends` / `corrigendedBy`
- `hasPart` / `partOf`
- `complements` / `complementOf`
- `obsoletes` / `obsoletedBy`
- `updates` / `updatedBy`
- `derives` / `derivedFrom`

[View all relation types &rarr;](/model/relations)

## UML Diagrams

Formal UML diagrams of the Relaton data model are available from the [relaton-models repository](https://github.com/relaton/relaton-models).

[View UML diagrams &rarr;](/model/diagrams)
