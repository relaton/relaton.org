---
title: AsciiBib
description: Specification for encoding Relaton bibliographic entries in AsciiDoc
---

# Introduction

AsciiBib is a syntax for encoding Relaton bibliographic entries in AsciiDoc. It enables the representation of structured bibliographic data within AsciiDoc documents, particularly for use with [Metanorma](https://www.metanorma.org).

AsciiBib provides two syntax approaches:

- **Nested definition list syntax** — uses AsciiDoc definition lists with nested levels to mirror the YAML structure
- **Path-style definition list syntax** — uses dot-delimited key paths for a flat, single-level representation

Both syntaxes produce identical Relaton data and are fully interoperable with the [Relaton YAML representation](/specs/relaton-yaml).

# Scope

This specification defines the AsciiBib encoding of Relaton BibliographicItem objects within AsciiDoc documents. It covers:

- The nested definition list syntax
- The path-style definition list syntax
- The mapping from Relaton YAML to AsciiDoc markup
- Metanorma-specific integration details

This specification does not cover:

- The Relaton data model itself (see the [model overview](/model/overview))
- The Relaton YAML serialization (see [Relaton YAML](/specs/relaton-yaml))
- Other AsciiDoc citation mechanisms

# Terms and definitions

## AsciiBib entry

subclause in an AsciiDoc document marked with the `[%bibitem]` option attribute, containing bibliographic metadata in definition list format

## nested definition list syntax

AsciiBib syntax using hierarchical definition lists to represent the nested structure of Relaton records

## path-style definition list syntax

AsciiBib syntax using dot-delimited key paths in a single-level definition list, similar to JSON path notation

## definition list depth

number of colon suffixes on a key, indicating nesting level (e.g. `key::` is depth 1, `key:::` is depth 2)

# General rules

## Content key convention

As with the [Relaton YAML representation](/specs/relaton-yaml), if an element in Relaton XML has attributes, the content of the element is represented with a `content` key:

```xml
<title type="main">Geographic information</title>
```

```asciidoc
title::
type::: main
content::: Geographic information
```

## Element arrays

Repeating elements can be represented as ordered or unordered lists:

```asciidoc
language::
. en
. fr
```

Alternatively, repeating elements can be represented by repeating the key:

```asciidoc
language:: en
language:: fr
```

## Bibliographic item boundaries

Each Relaton entry is represented as an AsciiDoc subclause with the `[%bibitem]` option attribute. The subclause title is treated as the entry title (language `en`, script `Latn`, format `text/plain`, type `main`):

```asciidoc
[%bibitem]
== {blank}
docid::
type::: ISO
id::: 19115-3
type:: standard
```

## Anchors

The cross-reference anchor can be specified as either an AsciiDoc anchor on the subclause or as an `id` entry. The AsciiDoc anchor takes priority:

```asciidoc
[[ISO-19115-3]]
[%bibitem]
== {blank}
docid::
type::: ISO
id::: 19115-3
type:: standard
```

## Empty title

If the bibliographic item has a non-English title or a non-`main` title type, leave the subclause title as `{blank}` and specify the title in the content body:

```asciidoc
[%bibitem]
== {blank}
title::
language::: fr
script::: Latn
type::: main
content::: Information géographique
```

# Nested definition list syntax

## Purpose

This syntax uses AsciiDoc definition lists with nested levels to mirror the hierarchical structure of Relaton YAML. Each level of nesting is indicated by an additional colon suffix on the key.

If a nested definition is given for an element, the element itself has a blank definition.

## Nesting limitations

AsciiDoc does not recognize definition lists more than four levels deep. When deeper nesting is needed, use a list continuation (`+`) followed by an open block (`--`):

```asciidoc
contributor::
role::: author
person:::
name::::
+
--
completename::
language::: en
content::: Fred
--
```

The [path-style syntax](#path-style-definition-list-syntax) avoids this limitation entirely.

## Heavy nesting workarounds

The most heavily nested parts of a Relaton entry are contributors, series, and relations. Each can be marked up as a subclause within the entry (using `=== Contributor`, `=== Series`, `=== Relation`), which resets the definition list depth:

```asciidoc
=== Contributor
organization::
name::: International Organization for Standardization
role::
type::: publisher

=== Contributor
person::
name:::
completename::::
+
--
content:: A. Bierman
language:: en
--
role:: author
```

# Path-style definition list syntax

## Purpose

The path-style syntax represents nested Relaton records in a flat, single-level definition list using dot-delimited key paths. This is similar to how JSON data is accessed with dot notation.

> [!NOTE]
> The path-style syntax avoids the nesting limitations of the [nested definition list syntax](#nested-definition-list-syntax) and does not require breakouts into open blocks.

## Key path notation

Each key in the definition list represents the full path to the value, using dots to separate nested keys:

```asciidoc
[%bibitem]
== {blank}
id:: iso19115
docid.type:: ISO
docid.id:: 19115-1
```

This is equivalent to the nested syntax:

```asciidoc
[%bibitem]
== {blank}
id:: iso19115
docid::
  type::: ISO
  id::: 19115-1
```

## Element arrays in path syntax

When part of the key path is repeated between entries, the entries attach to the same parent. For arrays of objects, a blank entry marks each new element:

```asciidoc
docid::
docid.type:: ISO
docid.id:: 19115-1
docid::
docid.type:: ISO
docid.id:: TC211
```

Embedded elements can also repeat:

```asciidoc
contributor.person.contact::
contributor.person.contact.phone:: 223322
contributor.person.contact.type:: mobile
contributor.person.contact::
contributor.person.contact.phone:: 332233
contributor.person.contact.type:: work
```

# Complete examples

## Nested definition list example

The following Metanorma AsciiDoc markup corresponds to the YAML in the [Relaton YAML representation](/specs/relaton-yaml):

```asciidoc
[[ISO-19115-3]]
[%bibitem]
== {blank}
title::
type::: main
content::: Geographic information
type:: standard
docid::
type::: ISO
id::: 19115-3
edition:: 1
language:: en
script:: Latn
date::
type::: issued
value::: 2016
copyright::
owner:::
name:::: International Organization for Standardization
abbreviation:::: ISO
from::: 2016
to::: 2020
link::
type::: src
content::: https://www.iso.org/standard/32579.html

=== Contributor
organization::
name::: International Organization for Standardization
role::
type::: publisher

=== Contributor
person::
name:::
completename::::
+
--
content:: A. Bierman
language:: en
--
role:: author

=== Relation
type:: updates
bibitem::
formattedref::: ISO 19115:2003

=== Series
type:: main
title::
type::: original
content::: ISO/IEC FDIS 10118-3
number:: serie1234
partnumber:: part5678
```

## Path-style definition list example

The same bibliographic entry using path-style syntax:

```asciidoc
[[ISO-19115-1]]
[%bibitem]
== {blank}
id:: ISO/TC211
fetched:: 2019-06-30
title::
title.type:: main
title.content:: Geographic information
type:: standard
docid.type:: ISO
docid.id:: ISO19115-1
edition.content:: 1
language:: en
language:: fr
docstatus.stage:: 90
docstatus.substage:: 90.93
date::
date.type:: issued
date.value:: 2014
date::
date.type:: published
date.from:: 2014-04
date.to:: 2014-05
copyright.owner.name:: International Organization for Standardization
copyright.owner.abbreviation:: ISO
copyright.from:: 2014
copyright.to:: 2020
link::
link.type:: src
link.content:: https://www.iso.org/standard/53798.html
contributor::
contributor.organization.name:: International Organization for Standardization
contributor.role.type:: publisher
contributor::
contributor.person.name.completename.content:: A. Bierman
contributor.person.name.completename.language:: en
contributor.role:: author
relation::
relation.type:: updates
relation.bibitem.formattedref:: ISO 19115:2003
series::
series.type:: main
series.title.type:: original
series.title.content:: ISO/IEC FDIS 10118-3
keyword:: Keyword
keyword:: Key Word
```

# Metanorma integration

In Metanorma, AsciiBib citations can be combined with other AsciiDoc citations in the same document. However, AsciiDoc citations **must** precede AsciiBib citations, because each AsciiBib citation constitutes a subclause that will attempt to incorporate trailing content.

[See this example in other formats &rarr;](/model/serializations)
