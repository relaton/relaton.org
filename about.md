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

**Relaton** is a compound of two ancient roots:

- The Latin ***relat-*** — the stem of *referre*, meaning "to carry back, to bring back, to relate." This is the same root that gives us *reference*, *relation*, and *relate*. Every bibliographic citation is an act of *relatio* — carrying a reader back to the original source.
- The Greek-flavored scientific suffix ***-on*** — used across the sciences to denote a fundamental, indivisible unit or entity. The *electr-on* is the elementary particle of charge; the *phot-on* is the quantum of light. A *Relat-on* is thus the elementary unit of bibliographic relation — the atomic particle of scholarly connectivity.

Together, the name captures the essence of the project: that bibliographic data is not a flat list of metadata fields, but a web of **relationships** between works. Standards cite other standards; documents amend, replace, derive from, and supersede one another. Each such link is a Relaton — and Relaton the project models them all with precision and completeness.

## The Logo

<div class="logo-showcase">
  <div class="logo-card logo-card-light">
    <img src="/logo-light.svg" alt="Relaton logo" class="logo-display" />
    <span class="logo-card-label">Light background</span>
  </div>
  <div class="logo-card logo-card-dark">
    <img src="/logo-dark.svg" alt="Relaton logo" class="logo-display" />
    <span class="logo-card-label">Dark background</span>
  </div>
</div>

The Relaton logo depicts a **network of four interconnected nodes**, each radiating connections to the others through branching paths. This is not arbitrary decoration — it is a direct visual representation of what Relaton models:

- **The nodes** represent bibliographic entities — standards, papers, datasets, any citable work. Four are shown, but the network extends infinitely in every direction, just as the body of scholarly and technical literature grows without bound.
- **The connecting paths** represent the 60+ typed relations that Relaton defines between documents: *replaces*, *amends*, *derives from*, *has part*, *obsoletes*, *updates*, and many more. The paths branch and overlap because real-world bibliographic relationships are not one-to-one — a single standard may simultaneously reference, replace, and subsume multiple other works.
- **The central square** formed where paths intersect represents the Relaton model itself — the structured, machine-readable framework through which all these relationships are expressed and traversed.
- **The symmetry** of the pattern reflects the model's design principle: every relation has a defined inverse, every connection is bidirectional, and the model treats all bibliographic entities with equal rigor regardless of their source organization.

### The Color

The logo's blue (**#1F6CF0**) is a deliberate choice. Blue is the color of **trust, authority, and permanence** — the same qualities that define the international standards Relaton serves. It is the color of the ISO wordmark, of academic institutions, and of the hyperlinks that connect the web of knowledge. In the context of bibliographic data, blue signifies reliability: when a machine reads a Relaton record, it can trust that every relation, every identifier, every metadata element has been structured with the precision that standards demand.

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
| **Auto-Fetch** | Flavor gems that retrieve metadata from 28+ SDO datasets by publication identifier alone |
| **Rendering** | Formatted citations in ISO&nbsp;690, APA, MLA, and custom styles via relaton-render |

[Explore the model &rarr;](/model/)

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

This eliminates the need to manually maintain bibliographic citations. The system maintains indexed datasets covering all 28 supported organizations.

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
