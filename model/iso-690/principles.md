---
title: ISO 690 Principles and Guidelines
description: The four principles and seven guidelines ISO 690:2021 establishes for creating accurate, useful bibliographic references, plus metadata sourcing rules.
---

# Principles and Guidelines

ISO 690 establishes that bibliographic references serve two fundamental purposes: **crediting** the creators of cited works, and enabling readers to **verify and locate** those works. These purposes apply to every kind of information resource.

From these purposes, the standard derives four principles and seven guidelines.

## The Four Principles

### Principle 1: Ensure Metadata Accuracy

Metadata must be accurate enough to credit the right creator and allow the reader to find the resource. Source metadata from the resource itself — title page, embedded metadata, cover — before turning to external sources.

When a resource has identifying features beyond the obvious (opus numbers for music, technical report series numbers), including them prevents confusion with similar works.

**Relaton's approach:** The model enforces accuracy through typed, structured fields rather than free text. A contributor has `surname`, `givenname`, and `role`. A date has a `type` and is stored in ISO 8601 format. This structure prevents the ambiguity that arises from free-form citation strings.

### Principle 2: Prioritize Identification and Retrieval

A reference should make it as easy as possible for a reader to identify the cited resource among all others and actually retrieve it. Persistent identifiers (DOIs, URNs, URIs) are not just helpful metadata — they are direct retrieval mechanisms. ISO 690 states that PIDs should be expressed as actionable hyperlinks (HTTP URIs), not opaque strings.

**Relaton's approach:** First-class support for typed identifiers (`docidentifier` with `type` and `scope`) and multiple URI types. The auto-fetch mechanism turns a simple PubID like `ISO 19115-1:2014` into a complete, machine-readable bibliographic record.

### Principle 3: Unify Reference Presentation

A consistent presentation format helps readers parse metadata quickly and helps authors apply references correctly.

**Relaton's approach:** [relaton-render](/software/relaton-render) provides configurable templates that ensure consistency within a given style while adapting to each SDO's conventions.

### Principle 4: Determine Appropriate Specificity

A reference should identify exactly what is being cited. If citing a journal article, the reference should point to the article, not just the journal. If citing a chapter, identify the chapter, not just the book.

**Relaton's approach:** Granular identification through component parts (extent fields for pages, sections, time ranges), locality stacks on relation types, and structured identifiers that decompose into part numbers and subparts.

## The Seven Guidelines

Beyond the four principles, ISO 690 §5 provides seven practical guidelines for constructing references.

### Guideline 1: Facilitate Location

Metadata elements should be selected to let the reader locate and retrieve the exact manifestation used. For component parts (an article within a journal), prioritize locatability of the host resource and provide the method for locating the component within the host.

### Guideline 2: Reflect the Content Used Accurately

The reference must reflect the correct edition or version. If a preprint was used instead of the published article, the reference applies to the preprint — the published content may differ significantly. For dynamic resources, include version identifiers, the usage date, and a link to an archived copy.

### Guideline 3: Reference Derivative Works Alongside the Original

Derivative works (translations, commentaries, adaptations, reviews) should make clear that the resource is derived from an original and should specify the original work. This is especially important for translations, where the translator is a subsidiary creator and the original title should be referenced.

### Guideline 4: Faithfully Reference the Manifestation

The same intellectual content may appear in multiple manifestations (print, electronic, audiobook). The reference should identify the specific manifestation used, since content can differ between formats. Digital preservation migrations can create new manifestations with subtle differences.

### Guideline 5: Consider Retrievability of Unpublished Resources

Unpublished personal communications, manuscripts, preprints, and ephemeral Internet resources may not be retrievable. ISO 690 provides guidance for citing such material but notes that organizations may have local policies restricting such references.

### Guideline 6: Adopt a Uniform Presentation Scheme

A uniform style, format, and punctuation scheme must be used for all references in a publication, regardless of the style guide. This applies even when mixing resource types — a book reference and a dataset reference in the same document should follow the same punctuation and ordering conventions.

### Guideline 7: Accurately Indicate Specification Level

The creator of the reference should determine the appropriate level of specificity — whether citing an entire resource, a specific component part, or a data element — based on the purposes of the citation.

## Sourcing Metadata

ISO 690 §6 specifies a hierarchy for sourcing metadata, ordered by reliability:

### Preferred: From the Cited Resource

1. **Title page or equivalent** — title screen, home page, disc label, map face
2. **Embedded or external metadata** — source code, landing page metadata
3. **Dedicated metadata descriptions** — verso of title page, file headers
4. **Cover or label permanently associated** — captions, microfiche headers, image file headers
5. **Container** — slipcase, clam-shell case
6. **Accompanying documentation** — explanatory leaflet, manual

### Fallback: External Sources

When the resource itself is insufficient, external sources may supplement:
- Bibliographic databases and data catalogues
- Research data landing pages
- ISNI, ORCID, VIAF, or ISSN databases for creator disambiguation
- Metadata from the host resource (for component parts)

Human-readable sources should be preferred over machine-readable ones when possible.

### Handling Conflicts

If metadata appears in different forms within the same resource, use the most prominent form unless it is obviously wrong (e.g., an incorrect disc label). If metadata differs across multiple cited resources, use the form most commonly used in the language of the publication.

---
