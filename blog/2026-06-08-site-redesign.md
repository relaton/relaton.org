---
title: "Relaton.org redesigned — a comprehensive guide to bibliographic data modeling"
date: 2026-06-08
authors:
  - "Ronald Tse"
description: "The Relaton documentation site has been completely redesigned with new ISO 690 companion guides, flavor-specific model extension documentation, serialization examples in multiple formats, and restructured information architecture."
---

<BlogByline />

The Relaton project has long needed a proper documentation home — a place where standards developers, bibliographic data engineers, and anyone working with citations can understand not just *how* to use Relaton, but *why* it works the way it does.

The redesigned [relaton.org](https://www.relaton.org) addresses this with a restructured information architecture, entirely new documentation sections, and detailed technical references that were not available before.

## What's new

### ISO 690 companion guide

ISO 690:2021 is the international standard for bibliographic references and citations — the conceptual foundation that Relaton implements as a machine-readable data model. But ISO 690 itself does not define a data model. Understanding what the standard specifies and where Relaton fills the gaps was previously scattered across README files and GitHub issues.

The new site includes a complete [ISO 690 companion guide](/model/iso-690/) covering:

- **[Principles and guidelines](/model/iso-690/principles)** — the four principles (metadata accuracy, identification and retrieval, uniform presentation, appropriate specificity) and seven practical guidelines for creating references, plus metadata sourcing rules

- **[Resource types](/model/iso-690/resource-types)** — citation guidelines for all 16 ISO 690 resource categories (monographs, serials, patents, datasets, social media, audiovisual, music, archival materials, etc.), each with its specific element requirements
- **[Citation systems](/model/iso-690/citation-systems)** — all five citation systems (name-date, numeric, named tag, running notes, implied) with guidance on persistent web references

Each section maps ISO 690 concepts to their Relaton implementation, making it clear where the standard ends and Relaton begins.

### Flavor-specific model extension documentation

Relaton supports 27 standards organizations ("flavors") — ISO, IEC, IETF, ITU, NIST, BIPM, 3GPP, IEEE, W3C, and more. Each flavor extends the base BibliographicItem with its own domain-specific fields.

Previously, understanding what fields a particular flavor added required reading Ruby source code. Now, every flavor page on the site includes a **Model Extensions** section showing:

- Which fields the flavor adds (with types and descriptions)
- Custom classes (e.g., ITU's `EditorialGroup` with bureau, group, and period fields; 3GPP's `Release` with freeze stage tracking)
- Inheritance relationships (e.g., IEC inherits all ISO fields and adds its own)
- Concrete examples in **five serialization formats**: YAML, JSON, XML, AsciiBib, and bibliographic spans

The tabbed format examples make it easy to compare serializations side by side and choose the right format for your workflow.

### Bibliographic spans specification

[Bibliographic spans](/specs/bibliographic-spans) are a Metanorma-specific notation for encoding semantic bibliographic metadata inline within AsciiDoc documents using the `span:type[content]` syntax. This powerful mechanism was previously documented only in passing.

The new specification page documents all supported span types:

- Creator information (`span:surname`, `span:givenname`, `span:organization`) with role suffixes (`span:surname.editor`, `span:organization.distributor`)
- Titles and series (`span:title`, `span:in_title`, `span:series`)
- Dates (`span:date.issued`, `span:date.published`, `span:date.accessed`)
- Document identifiers (`span:docid.ISO`, `span:docid.DOI`, `span:docid.IEC`)
- Publication details, numeration, URIs, classification, localization
- Document type (`span:type`) — critical for non-standard resources

### Restructured model documentation

The model section has been completely reorganized. Instead of a flat list of 14+ entity pages, the documentation now follows a logical hierarchy:

- **Model overview** — architecture, ISO 690 entity mapping table
- **ISO 690 guidelines** — the conceptual foundation
- **Relaton model** — extensions and flavor-specific additions
- **Entity reference** — grouped by function (core entities like Contributor and Relations, descriptive elements like Title and Medium, identification and access)
- **Reference material** — serializations and UML diagrams

Every entity page now has a proper heading structure and consistent formatting.

### Software and flavor pages

The [software catalog](/software/) documents all 32 Relaton gems with installation instructions and descriptions. The [flavors section](/flavors/) provides a searchable, filterable grid of all 27 supported standards organizations with citation guide content where available.

## What remains the same

The core Relaton project — the data model, the gems, the auto-fetch infrastructure — hasn't changed. This is a documentation and information architecture redesign. All existing links to the relaton.org domain continue to work.

## What's next

We're continuing to expand the documentation. Upcoming additions include:

- Per-flavor citation guide content for all 27 organizations
- More serialization examples with edge cases
- Expanded software documentation with quick-start guides
- API documentation with interactive examples

If you have feedback on the new site, please open an issue at the [relaton.org repository](https://github.com/relaton/relaton.org).
