---
title: Relaton YAML
description: Specification for encoding BibliographicItem as YAML objects
---

# Introduction

Relaton YAML is the primary serialization format for the Relaton Information Model. It provides a human-readable, human-writable representation of bibliographic items that can be used for interchange, configuration, and embedding in document authoring workflows.

Relaton YAML is used by:

- **Metanorma** for representing bibliographic entries in documents
- **relaton-cli** for import/export operations
- **Relaton flavor gems** for storing and retrieving bibliographic data

This specification defines the YAML encoding of the [Relaton BibliographicItem model](/model/), mapping the XML schema defined in [relaton-models](https://github.com/relaton/relaton-models) to YAML objects.

> [!NOTE]
> The full canonical reference for the Relaton YAML hash structure is maintained in the [relaton-bib documentation](https://github.com/relaton/relaton-bib/blob/master/docs/hash.adoc).

# Scope

This specification defines the YAML serialization of BibliographicItem objects as implemented by the Relaton library. It covers:

- The mapping rules from the Relaton XML schema to YAML
- The representation of all BibliographicItem attributes
- The handling of cardinality, nesting, and mixed content

This specification does not cover:

- Flavour-specific extensions (`bibdata/ext`), which are defined by individual flavor gems
- The XML or BibTeX serializations (see [Serializations](/model/serializations))
- Processing semantics (fetching, caching, rendering)

# Terms and definitions

## YAML serialization

representation of a BibliographicItem using YAML markup, following the rules defined in this specification

## content key

YAML key named `content` that holds the text content of an element that also carries XML attributes

## element cardinality

number of occurrences of a child element within its parent, as defined by the Relaton XML schema

## bibitem

YAML root object representing a single BibliographicItem

## bibdata

bibliographic item with flavour-specific extension data, used for standards document metadata

# Mapping principles

## General

The Relaton YAML serialization follows these principles:

Simplicity::
YAML structures should be intuitive and minimal. Unnecessary nesting is avoided.

Flexibility in cardinality::
Elements with cardinality of "many" can be represented as arrays, single hashes, or plain strings interchangeably.

Attribute transparency::
XML element attributes are promoted to YAML keys at the same level as content.

## XML attributes to YAML keys

When an XML element has both attributes and text content, the content is represented with a `content` key:

```xml
<title type="main">Geographic information</title>
```

```yaml
title:
  type: main
  content: Geographic information
```

## Cardinality flexibility

Elements with a cardinality of "many" can be represented as arrays, single hashes, or single strings:

```yaml
# Array of hashes
title:
  - type: main
    content: Geographic information
  - type: title-part
    content: Part 1

# Single hash
title:
  type: main
  content: Geographic information

# Array of strings
language:
  - en
  - fr

# Single string
language: en
```

## Reserved words

In YAML, `on` is a reserved word and cannot be used as a key. The key `value` is used as a synonym for `on` in date elements.

# Element reference

## Top-level attributes

A BibliographicItem in YAML is a mapping with the following top-level keys:

| Key | Type | Description |
|-----|------|-------------|
| `id` | string | Bibliographic item anchor, used to cross-reference within document |
| `fetched` | string (date) | Date record was created |
| `title` | array or hash | Titles with mandatory `type` and `content` |
| `type` | string | Document type (e.g. `standard`) |
| `docid` | array or hash | Document identifiers with `type` and `id` |
| `docnumber` | string | Document number |
| `edition` | string | Edition number |
| `language` | array or string | Languages (ISO 639 codes) |
| `script` | array or string | Scripts (ISO 15924 codes) |
| `version` | hash | Contains `revision_date` and `draft` |
| `biblionote` | array or hash | Notes with `type` and `content` |
| `docstatus` | hash | Document status with `stage`, `substage`, `iteration` |
| `date` | array or hash | Dates with `type` and `value`/`from`/`to` |
| `abstract` | array or hash | Abstracts with `content` and optional `language`, `script`, `format` |
| `contributor` | array | Contributors (organization or person with role) |
| `copyright` | hash | Copyright with `owner`, `from`, and optional `to` |
| `link` | array or hash | URIs with `type` and `content` |
| `relation` | array | Relations to other bibliographic items |
| `series` | array or hash | Series information |
| `medium` | hash | Medium with `form`, `size`, and `scale` |
| `place` | array or hash | Places of publication |
| `extent` | hash | Extent information with locality |
| `accesslocation` | array of strings | Access locations |
| `classification` | array or hash | Classification with `type` and `value` |
| `validity` | hash | Validity period with `begins`, `ends`, `revision` |
| `keyword` | array of strings or hashes | Keywords |
| `license` | string | License identifier |

## Title

Titles contain `type`, `content`, and optional `language`, `script`, and `format`:

```yaml
title:
  - type: main
    content: Geographic information
  - type: subtitle
    content: Geographic information subtitle
    language: en
    script: Latn
    format: text/plain
```

## Document identifiers

Document identifiers contain a mandatory `type` and `id`:

```yaml
docid:
  type: ISO
  id: TC211
```

## Date

Dates are an array with a mandatory `type`, and either a `value` or a `from`/`to` range:

```yaml
date:
  - type: issued
    value: '2014'
  - type: published
    from: '2014-04'
    to: '2014-05'
  - type: accessed
    value: '2015-05-20'
```

## Contributor

Contributors are an array of entity/role pairs, where entity is either `person` or `organization`:

```yaml
contributor:
  - organization:
      name: International Organization for Standardization
      url: www.iso.org
      abbreviation: ISO
    role:
      type: publisher
  - person:
      name:
        completename:
          content: A. Bierman
          language: en
    role: author
```

Organization attributes: `name`, `url`, `abbreviation`, `subdivision`, `contacts`, `identifiers`, `logo`.

Person name attributes: `abbreviation`, `surname`, `completename`, `initial`, `forename`, `additions`, `prefixes`.

## Copyright

Copyright consists of an `owner` (organization fields), a `from` date, and an optional `to` date:

```yaml
copyright:
  owner:
    name: International Organization for Standardization
    abbreviation: ISO
    url: www.iso.org
  from: '2014'
  to: '2020'
```

## Relation

Relations are an array of `type`, `bibitem`, `locality`, `source_locality`, and optional `description`:

```yaml
relation:
  - type: updates
    bibitem:
      formattedref: ISO 19115:2003
    locality:
      locality_stack:
        type: page
        reference_from: '7'
        reference_to: '10'
  - type: partOf
    bibitem:
      title:
        type: main
        content: Book title
```

## Series

Series contain a `title`, optional `type`, `place`, `organization`, `abbreviation`, `from`, `to`, `number`, and `partnumber`:

```yaml
series:
  - type: main
    title:
      type: original
      content: ISO/IEC FDIS 10118-3
    abbreviation:
      content: ABVR
    from: '2009-02-01'
    number: serie1234
    partnumber: part5678
```

# Complete example

The following is a complete Relaton YAML example demonstrating all supported fields:

```yaml
id: ISO/TC211
fetched: '2019-06-30'
title:
  - type: main
    content: Geographic information
  - type: subtitle
    content: Geographic information subtitle
    language: en
    script: Latn
    format: text/plain
type: standard
docid:
  type: ISO
  id: TC211
docnumber: '211'
edition: '1'
language:
  - en
  - fr
script:
  Latn
version:
  revision_date: '2019-04-01'
  draft: draft
biblionote:
  type: bibnote
  content: >
      Mark set a major league
      home run record in 1998.
docstatus:
  stage:
    value: '30'
    abbreviation: CD
  substage:
    value: '00'
  iteration: final
date:
  - type: issued
    value: '2014'
  - type: published
    from: '2014-04'
    to: '2014-05'
  - type: accessed
    value: '2015-05-20'
abstract:
  - content: >
      ISO 19115-1:2014 defines the schema required for ...
  - content: >
      L'ISO 19115-1:2014 définit le schéma requis pour ...
    language: fr
    script: Latn
    format: text/plain
contributor:
  - organization:
      name: International Organization for Standardization
      url: www.iso.org
      abbreviation: ISO
    role:
      type: publisher
  - person:
      name:
        completename:
          content: A. Bierman
          language: en
    role: author
copyright:
  owner:
    name: International Organization for Standardization
    abbreviation: ISO
    url: www.iso.org
  from: '2014'
  to: '2020'
link:
  - type: src
    content: https://www.iso.org/standard/53798.html
  - type: obp
    content: https://www.iso.org/obp/ui/#!iso:std:53798:en
relation:
  - type: updates
    bibitem:
      formattedref: ISO 19115:2003
    locality:
      locality_stack:
        type: page
        reference_from: '7'
        reference_to: '10'
series:
  - type: main
    title:
      type: original
      content: ISO/IEC FDIS 10118-3
    abbreviation:
      content: ABVR
    number: serie1234
    partnumber: part5678
medium:
  form: medium form
  size: medium size
  scale: medium scale
place:
  - bib place
  - city: Geneva
    region:
      - name: Region
    country:
      - iso: CH
        name: Switzerland
extent:
  locality:
    type: section
    reference_from: '7'
    reference_to: '10'
accesslocation:
  - accesslocation1
  - accesslocation2
classification:
  type: type
  value: value
validity:
  begins: '2010-10-10 12:21'
  ends: '2011-02-03 18:30'
  revision: '2011-03-04 09:00'
keyword:
  - Keyword
  - Key Word
license: License
```

[See this example in other formats &rarr;](/model/serializations)
