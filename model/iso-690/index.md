---
title: ISO 690 Guidelines
description: ISO 690:2021 defines the international standard for bibliographic references and citations. Relaton implements its data model for machine-readable citations.
---

# ISO 690 Guidelines

::: info Get the standard
**[ISO 690:2021](https://www.iso.org/standard/73698.html)** — *Information and documentation — Guidelines for bibliographic references and citations to information resources*. Available from the ISO Store.
:::

**ISO 690:2021** is the international standard governing how bibliographic references should be structured. It covers every kind of citable resource — books, journal articles, patents, datasets, software, social media posts, audiovisual works, archival materials, maps, music, and more.

The standard makes an important declaration:

> This document does not specify a data model for machine-readable citations.

**Relaton fills this gap.** It provides the machine-readable information model that ISO 690 deliberately left unspecified.

## What ISO 690 Covers

The standard is organized into four major areas:

| Area | Clause | Content |
|---|---|---|
| **Principles** | §4 | Four principles governing all references |
| **Guidelines** | §5–6 | Seven guidelines for creating references; metadata sourcing |
| **Data Elements** | §7 | 14 categories of bibliographic metadata |
| **Resource Types** | §8 | Citation rules for 16 kinds of information resources |
| **Citation Systems** | Annex A | Five systems for linking in-text citations to references |
| **Persistent References** | Annex B | Making web citations durable |

## Key Terminology

ISO 690 defines precise terms that Relaton implements as model entities:

| Term | Definition | Relaton Entity |
|---|---|---|
| **Information resource** | Any work, manifestation, or item in physical or digital form that contributes to human knowledge | `BibliographicItem` |
| **Work** | A distinct intellectual or artistic creation | FRBR Work level |
| **Manifestation** | The physical embodiment of a work (print, digital, etc.) | Medium, format fields |
| **Component part** | An entity that forms part of a host document (article, chapter, track) | Citation / extent |
| **Continuing resource** | A resource issued over time with no predetermined conclusion | Serial handling |
| **Persistent identifier (PID)** | A unique identifier ensuring permanent access regardless of location | `docidentifier` |
| **Reference** | Data describing a resource sufficiently precise to identify and retrieve it | The entire model |

A single work may have multiple manifestations (print book, e-book, audiobook). ISO 690 requires that the reference identify the specific manifestation used, since content can differ between formats.

## The Gap ISO 690 Left

ISO 690 specifies *what* metadata belongs in a reference and *how* it should be presented for human readers. It deliberately does not specify:

- A formal data model with typed fields and validation rules
- A machine-actionable encoding of the 14 data elements
- A way to programmatically parse, compare, or transform references
- Inter-document relations beyond a handful of types

These are the problems Relaton solves.

## Relaton's Implementation

| ISO 690 Concept | Relaton Implementation |
|---|---|
| 4 principles | Reflected in the model design — accuracy through typed fields, retrieval through identifiers, uniformity through configurable renderers, specificity through structured component parts |
| 14 data elements | Each maps to one or more Relaton entities (Contributor, Title, Date, Series, etc.) |
| 16 resource types | Covered by the `BibItemType` enumeration, extended with BibTeX types |
| 5 citation systems | Supported by [relaton-render](/software/relaton-render) with configurable templates |
| 7 guidelines | Enforced by the model's structure — the model prevents inaccurate metadata by design |

## What Relaton Adds Beyond ISO 690

- **50+ typed document relations** — ISO 690 mentions translations and adaptations; Relaton defines a comprehensive FRBR-based taxonomy
- **Document lifecycle tracking** — publication stages, supplements, amendment tracking
- **Flavor-specific extensions** — each SDO adds organization-specific metadata through the `ext` block
- **Auto-fetch by publication identifier** — given a PubID, Relaton retrieves structured metadata from 27+ SDO datasets
- **18 date types** (vs. ISO 690's ~3) — published, accessed, created, implemented, obsoleted, confirmed, and more
- **12 contributor roles** (vs. ISO 690's ~4) — author, editor, realizer, performer, translator, adapter, publisher, distributor, owner, authorizer, enabler, subject
- **Multiple serialization formats** — YAML, XML, JSON, BibTeX, AsciiBib

## Explore the Companion Guide

- [Principles](/model/iso-690/principles) — The four principles and seven guidelines for creating accurate references
- [Resource Types](/model/iso-690/resource-types) — Citation guidelines for 16 kinds of information resources
- [Citation Systems](/model/iso-690/citation-systems) — Five methods for linking in-text citations to references

The 14 ISO 690 data elements are documented as individual model entities — see the sidebar under "Core Entities" and "Descriptive Elements".
