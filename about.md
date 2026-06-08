---
layout: doc
title: About Relaton
description: The premier bibliographic data model for standards and technical documents
---

<div class="about-page">

<div class="about-hero">
<h1>About Relaton</h1>
<p class="about-subtitle">The machine-readable information model for bibliographic references, built on ISO&nbsp;690</p>
</div>

## The Name

**Relaton** derives from the Latin root *relat-* (to carry back, to relate) and the Greek-flavored scientific suffix *-on* (denoting a fundamental unit or entity). A Relaton is thus the elementary unit of bibliographic relation — the atomic particle of scholarly connectivity.

## The Logo

The Relaton logo features interconnecting circles, representing that bibliographic information is not merely about expressing a work and its metadata, but about the rich web of relationships between them. Standards cite other standards; documents amend, replace, and derive from one another. Relaton exists to model these connections with precision and completeness.

## What Relaton Does

Relaton is a **unified, interoperable, machine-readable information model** for bibliographic references and citations. It is the concrete implementation of **ISO&nbsp;690:2021** — the international standard for bibliographic references and citations to information resources — translated into a structured data model that machines can process, validate, and exchange.

ISO&nbsp;690 itself notes that it "does not specify a data model for machine‑readable citations." Relaton fills that gap — designed by the same team that authored **ISO&nbsp;690:2021**, the standard's current edition. Relaton is not merely compliant with ISO&nbsp;690; it is its definitive machine-readable expression, built by the standard's creators.

### The Layered Architecture

Relaton spans five distinct layers:

| Layer | Description |
|---|---|
| **ISO&nbsp;690** | The international standard defining the conceptual framework for bibliographic references |
| **Information Model** | Relaton's BibliographicItem with 14&nbsp;entities, 60+&nbsp;relation types, and 28+&nbsp;organization flavors |
| **Serializations** | YAML, XML, BibTeX, AsciiBib, and JSON-LD interchange formats |
| **Auto-Fetch** | Flavor gems that retrieve metadata from 27+ SDO datasets by publication identifier alone |
| **Rendering** | Formatted citations in ISO&nbsp;690, APA, MLA, and custom styles via relaton-render |

[Explore the model &rarr;](/model/overview)

## The Problem We Solve

Before Relaton, each standards organization had its own bibliographic data format, identifier scheme, and citation conventions. This made it impossible to:

- Cross-reference documents from different organizations
- Build tools that work across the standards ecosystem
- Maintain consistent citation quality in standards authoring
- Create machine-readable bibliographic databases

Relaton solves this by providing **one unified model** that maps to all major standards organizations — and by automating the fetching of bibliographic data so that users need only provide a publication identifier.

### Beyond BibTeX

Relaton is significantly more expressive than traditional solutions like BibTeX. Where BibTeX offers a flat key-value structure with ~40 fields, Relaton's model implements the full depth of ISO&nbsp;690:

- **Hierarchical localities** — volume, issue, page ranges, and discontinuous extents (e.g. "pp. 1, 5")
- **Typed relations** — 60+ semantic relations between documents (replaces, amends, derives, hasPart, etc.)
- **Multi-script titles** — titles in multiple languages and writing systems
- **Contributor roles** — author, editor, publisher, affiliations, and organizational hierarchy
- **Document lifecycle** — publication stages, supplements, amendment tracking

## Auto-Fetch by Publication Identifier

Relaton's flavor architecture enables **automatic retrieval** of bibliographic metadata. Given only a publication identifier (e.g. `ISO 19115-1:2014` or `RFC 8446`), Relaton:

1. Routes the identifier to the correct SDO-specific processor (flavor gem)
2. Queries the organization's dataset
3. Returns a fully structured BibliographicItem

This eliminates the need to manually maintain bibliographic citations. The system maintains indexed datasets covering all 27+ supported organizations.

[View supported organizations &rarr;](/flavors/)

## Who Uses Relaton

Key adopters of Relaton:

- **IETF** (Internet Engineering Task Force) — bibliographic data for RFCs and Internet-Drafts
- **BIPM** (International Bureau of Weights and Measures) — SI Brochure and Metrologia references
- **OIML** (International Organization of Legal Metrology) — via Relaton-BIPM
- **Metanorma** — the standards authoring platform uses Relaton for all bibliographic processing
- **Ribose** — open source platform for standards development

## The Ecosystem

| Component | Purpose | Link |
|---|---|---|
| relaton-bib | Core BibliographicItem model | [GitHub](https://github.com/relaton/relaton-bib) |
| relaton | Cache management and gateway | [GitHub](https://github.com/metanorma/relaton) |
| relaton-cli | Command-line interface | [GitHub](https://github.com/relaton/relaton-cli) |
| relaton-render | Reference formatting (ISO 690 styles) | [GitHub](https://github.com/metanorma/relaton-render) |
| 29 flavor gems | SDO-specific data retrieval | [Software](/software/) |
| relaton-models | UML model definitions and schemas | [GitHub](https://github.com/relaton/relaton-models) |

## Open Source

Relaton is fully open source (MIT license), developed by [Ribose](https://www.ribose.com). Contributions are welcome.

The code lives across multiple repositories in the [Relaton GitHub organization](https://github.com/relaton).

## History

- Initial release as part of the Metanorma ecosystem
- Separation into standalone gem architecture
- Addition of flavor gems (ISO, IEC, IETF, IEEE, ITU, NIST, BIPM, etc.)
- Integration with IETF for RFC bibliographic data
- Integration with BIPM for SI Brochure and Metrologia references
- Addition of DOI (Crossref) and ISBN (OpenLibrary) support
- Formalization of relaton-models with UML and RelaxNG schemas
- Continued expansion of supported organizations (CCSDS, IANA, XSF, etc.)

</div>
