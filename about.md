---
layout: page
title: About Relaton
description: The premier bibliographic data model for standards and technical documents
---

<div class="about-page">

<div class="about-hero">
<h1>About Relaton</h1>
<p class="about-subtitle">The premier bibliographic data model for standards and technical documents</p>
</div>

## Mission

Relaton provides a **unified, interoperable, machine-readable data model** for bibliographic references and citations. Based on ISO 690 (the international standard for bibliographic references), Relaton extends the model to address the specific needs of standards development organizations — enabling consistent citation and referencing across the entire standards ecosystem.

## The Problem We Solve

Before Relaton, each standards organization had its own bibliographic data format, identifier scheme, and citation conventions. This made it impossible to:

- Cross-reference documents from different organizations
- Build tools that work across the standards ecosystem
- Maintain consistent citation quality in standards authoring
- Create machine-readable bibliographic databases

Relaton solves this by providing **one unified model** that maps to all major standards organizations.

## ISO 690: The Foundation

ISO 690:2021 ("Information and documentation — Guidelines for bibliographic references and citations to information resources") defines the international standard for how bibliographic references should be structured.

Relaton is the information model implementation of ISO 690:

- Every ISO 690 concept has a corresponding Relaton entity
- Every ISO 690 data element has a defined field in the Relaton model
- The model is extended for standards-specific needs (document stages, supplements, amendment tracking)

[Explore the model &rarr;](/model/overview)

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

## Supported Organizations

Relaton supports 27 standards organizations across international, regional, national, and identifier bodies.

[View all supported organizations &rarr;](/flavors/)

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

<style>
.about-page {
  max-width: 864px;
  margin: 0 auto;
  padding: 0 24px 64px;
}
.about-hero {
  text-align: center;
  padding: 48px 0 32px;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 40px;
}
.about-hero h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
}
.about-subtitle {
  font-size: 18px;
  color: var(--vp-c-text-2);
}
</style>
