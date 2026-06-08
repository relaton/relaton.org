---
title: The Relaton Information Model
description: A machine-readable information model for bibliographic references, implementing ISO 690:2021
---

# The Relaton Information Model

The Relaton Information Model is a comprehensive data model for bibliographic references and citations. It is the machine-readable implementation of **ISO 690:2021**, extending the standard to meet the specific needs of standards development organizations and the broader scholarly ecosystem.

## Architecture

The model is organized around the **BibliographicItem** — the central entity that represents any citable document. A BibliographicItem contains:

- **Titles** — in multiple scripts and languages
- **Contributors** — persons, organizations, and their roles
- **Identifiers** — document IDs, DOIs, ISBNs, URIs
- **Production information** — publisher, place, dates
- **Relations** — links to other documents (replaces, amends, etc.)
- **Classification** — document type, keywords, subjects
- **Content details** — edition, medium, series, numeration

## Start Here

[ISO 690 Guidelines](/model/iso-690/) — the principles, data elements, resource types, and citation systems that Relaton implements

[Extensions Beyond ISO 690](/model/extensions) — document lifecycle, 50+ relation types, structured identifiers, and what Relaton adds

[Flavor Extensions](/model/flavor-models) — per-SDO model extensions (ISO, IEC, IETF, ITU, NIST, BIPM, 3GPP, IEEE, W3C)

## ISO 690 Entity Mapping

ISO 690 defines 14 data element categories. Each maps to a Relaton entity:

| ISO 690 Area | Relaton Entity | Description |
|---|---|---|
| Title | [Title](/model/title) | Title types, scripts, and formatting |
| Creator | [Contributor](/model/contributor) | Person, Organization, Affiliation |
| Edition | [Edition](/model/edition) | Edition and versioning |
| Material Designation | [Medium](/model/medium) | Content/carrier/size |
| Production | [Production](/model/production) | Place, publisher, dates |
| Publication Place | [Location](/model/location) | Access locations, URIs |
| Series | [Series](/model/series) | Series membership |
| Numeration | [Numeration](/model/numeration) | Extent, pagination, size |
| Identifiers | [Identifiers](/model/identifiers) | Document identifiers and scopes |
| Relations | [Relations](/model/relations) | 60+ document relation types |
| Additional Info | [Additional Info](/model/additional-info) | Keywords, classification, tags |
| Resource Type | [Bibitem Types](/model/bibtype) | ISO 690 + BibTeX union types |

## Reference

[Serializations](/model/serializations) — YAML, XML, BibTeX, AsciiBib, JSON-LD with side-by-side examples

[UML Diagrams](/model/diagrams) — formal UML diagrams of the Relaton data model
