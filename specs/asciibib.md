---
title: AsciiBib
description: AsciiBib syntax for encoding Relaton bibliographic entries in AsciiDoc.
---

AsciiBib is a syntax for encoding Relaton bibliographic entries in AsciiDoc. It provides two approaches for representing the nested structure of Relaton records: nested definition lists and path-style definition lists.

## Nested Definition List Syntax

### Purpose

This AsciiBib syntax utilizes a definition list of element name and element contents,
with nested definition lists for nested structures.

If a nested definition is given for an element, the element itself has a
blank definition.

### Basic attributes

As with the [Relaton YAML representation](/specs/relaton-yaml),
if an element in Relaton XML has attributes,
the content of the element is represented in YAML with a `content` key:

```xml
<title type="main">Geographic information</title>
```

```asciidoc
title::
type::: main
content::: Geographic information
```


### Element arrays

Similar to the [Relaton YAML representation](/specs/relaton-yaml),
repeating elements in an object can be realised as ordered or unordered lists.

```asciidoc
language::
. en
. fr
```

EXAMPLE:

```asciidoc
[[ISO-19115-1]]
[%bibitem]
== {blank}
docid::
type::: ISO
id::: 19115-1
language::
. en
. fr
```

AsciiBib also supports representing repeating elements
by repeating the key for that entry. This will almost always be more
straightforward to use in AsciiDoc:

```asciidoc
language:: en
language:: fr
```

EXAMPLE:

```asciidoc
[[ISO-19115-1]]
[%bibitem]
== {blank}
docid::
type::: ISO
id::: 19115-1
language:: en
language:: fr
```

### Hierarchical attributes

Each Relaton entry in a bibliography is represented in Metanorma AsciiDoc
through a subclause with option attribute `[%bibitem]`. Any title given to the
subclause is treated as the title for the bibliographic entry, with language `en`,
script `Latn`, format `text/plain`, and type `main`.

So the following is a very simple reference in Metanorma AsciiDoc:

```asciidoc
[%bibitem]
== {blank}
id:: iso19115-3
docid::
type::: ISO
id::: 19115-3
docid::
type::: ISO
id::: TC211
type:: standard
```


### Empty title

A title in the heading will be automatically treated as the English title with type `main`.

In the case where the bibliographic item is non-English, or not a `main` title (e.g. it only has an abbreviated or subtitle),
you should encode the title using attributes.

Here, the subclause title should be left as `{blank}`, and the desired title should be given in the
content body:

```asciidoc
[%bibitem]
== {blank}
id:: iso19115-3
title::
language::: fr
script::: Latn
format::: text/plain
type::: main
content::: Information géographique
```

Note the use of `content` as a key to represent the contents under the `title` tag.


### Anchors

The anchor crossreference for the bibliographic entry may be encoded as either the
`id` entry in the definition list, or as the normal AsciiDoc anchor on the
subclause, which takes priority:

```asciidoc
[[ISO-19115-3]]
[%bibitem]
== {blank}
docid::
type::: ISO
id::: 19115-3
type:: standard
```



### Nesting limitations and workarounds

AsciiBib relies on basic AsciiDoc syntax, and is therefore subject
to its limitations.

AsciiDoc does not recognise definition lists more than four levels
deep. If deeper nesting is needed, you will need to attach a new definition
list with a list continuation, with the definition list depth reset back to one:

```asciidoc
[[ISO-19115-3]]
[%bibitem]
== {blank}
docid::
type::: ISO
id::: 19115-3
type:: standard
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

(This is very awkward, and [AsciiBib path syntax](#path-style-definition-lists) provides a workaround.)


The most heavily nested parts of a Relaton entry are the contributors,
series, and relations.

Each of these can be marked up as subclauses within the entry, with the clause
titles `contributor`, `series`, and `relation`. Each subclause contains
a new definition list, with its definition list reset to zero depth;
the subclauses can be repeated for multiple instances of the same subentity.

### Metanorma-specific information

In Metanorma,
AsciiBib citations can be combined with other AsciiDoc citations in the
same Metanorma document. However, AsciiDoc citations **MUST** precede AsciiBib citations.

Each AsciiBib citations constitutes a subclause of its own,
and Metanorma will (unsuccessfully) attempt to incorporate any trailing material
in the subclause, including AsciiDoc citations, into the current AsciiBib
citation.

The following is Metanorma AsciiDoc markup corresponding to the YAML
given in [Relaton YAML representation](/specs/relaton-yaml):


```asciidoc
[[ISO-19115-3]]
[%bibitem]
== {blank}
title::
type::: main
content::: Geographic information
title::
type::: subtitle
content::: Metadata
title::
type::: parttitle
content::: Part 3: XML schema implementation for fundamental concepts
type:: standard
docid::
type::: ISO
id::: 19115-3
edition:: 1
language:: en
script:: Latn
version::
revision_date::: 2019-04-01
draft::: draft
biblionote::
type::: bibnote
content:::
+
--
Paper format is not available for this standard. Only PDF.
--
docstatus::
stage::: 90
substage::: 90.92
iteration::: iteration
date::
type::: issued
value::: 2016
date::
type::: published
from::: 2016-06
to::: 2016-08
date::
type::: accessed
value::: 2015-05-20
abstract::
content:::
+
--
ISO/TS 19115-3:2016 defines an integrated XML implementation of ISO 19115‑1, ISO 19115‑2, and concepts from ISO/TS 19139 by defining the following artefacts ...
--
copyright::
owner:::
name:::: International Organization for Standardization
abbreviation:::: ISO
url:::: www.iso.org
from::: 2016
to::: 2020
link::
type::: src
content::: https://www.iso.org/standard/32579.html
link::
type::: obp
content::: https://www.iso.org/obp/ui/#iso:std:iso:ts:19115:-3:ed-1:v1:en


=== Contributor

organization::
name::: International Organization for Standardization
url::: www.iso.org
abbreviation::: ISO
role::
type::: publisher
description::: Publisher role

=== Contributor
person::
name:::
completename::::
+
--
content:: A. Bierman
language:: en
--
affiliation:::
organization::::
+
--
name:: ISO
abbreviation:: ISO
identifier::
type::: uri
id::: www.iso.org
--
description:::: Affiliation description
contact:::
street:::: 8 Street St
city:::: City
postcode:::: 123456
country:::: Country
state:::: State
contact:::
type:::: phone
value:::: +1 800-000-0000
role:: author

=== Contributor
organization::
name::: IETF
abbreviation::: IETF
identifier:::
type:::: uri
id:::: www.ietf.org
role:: publisher

=== Contributor
person::
name:::
language:::: en
initial:::: A.
surname:::: Bierman
affiliation:::
+
--
organization::
name::: IETF
abbreviation::: IETF
description::
content::: Affiliation description
language::: en
script::: Latn
--
identifier:::
type:::: uri
id:::: www.person.com
role:: author

=== Relation
type:: updates
bibitem::
formattedref::: ISO 19115:2003
bib_locality:::
type:::: page
reference_from:::: 7
reference_to:::: 10

=== Relation
type:: updates
bibitem::
type::: standard
formattedref::: ISO 19115:2003/Cor 1:2006

=== Series
type:: main
title::
type::: original
content::: ISO/IEC FDIS 10118-3
language::: en
script::: Latn
format::: text/plain
place:: Serie's place
organization:: Serie's organization
abbreviation::
content::: ABVR
language::: en
script::: Latn
from:: 2009-02-01
to:: 2010-12-20
number:: serie1234
partnumber:: part5678

=== Series
type:: alt
formattedref::
content::: serieref
language::: en
script::: Latn
```

## Path Style Definition Lists

### Purpose

The AsciiBib "path-style definition list" syntax allows you to
represent:

- the nested structure of Relaton records in a simple, one-level definition list; and
- to use the key for each key-value pair to represent the hierarchical nesting of entries,
as a dot-delimited path of keys.

This is similar to how JSON data is often accessed.

This syntax utilizes the structure of [Relaton YAML representation](/specs/relaton-yaml).

> [!NOTE]
> The [AsciiBib nested list syntax](#nested-definition-list-syntax) requires
> frequent breakouts into open blocks, to deal with limitations of AsciiDoc.



### Basic entry

```asciidoc
[%bibitem]
== {blank}
id:: iso19115
docid.type:: ISO
docid.id:: 19115-1
```

Is equivalent to the [AsciiBib nested list syntax](#nested-definition-list-syntax) of:

```asciidoc
[%bibitem]
== {blank}
id:: iso19115
docid::
  type::: ISO
  id::: 19115-1
```


### Element arrays

Whenever part of the key is repeated between entries, the entries are assumed to attach to the same parent. If an array of objects is needed, a blank entry is required for the key of each repeating element.

For example,

```asciidoc
[%bibitem]
== {blank}
id:: iso19115
docid::
docid.type:: ISO
docid.id:: 19115-1
docid::
docid.type:: ISO
docid.id:: TC211
```

Is equivalent to the [AsciiBib nested list syntax](#nested-definition-list-syntax) of:

```asciidoc
[%bibitem]
== {blank}
id:: iso19115
docid::
  type::: ISO
  id::: 19115-1
docid::
  type::: ISO
  id::: TC211
```

Embedded elements can also repeat.

```asciidoc
[%bibitem]
...
contributor.person.contact::
contributor.person.contact.phone:: 223322
contributor.person.contact.type:: mobile
contributor.person.contact::
contributor.person.contact.phone:: 332233
contributor.person.contact.type:: work
```

Is equivalent to the [AsciiBib nested list syntax](#nested-definition-list-syntax) of:

```asciidoc
[%bibitem]
...
=== Contributor
person::
  contact:::
    phone:::: 223322
    type:::: mobile
  contact:::
    phone:::: 332233
    type:::: work
```


### Metanorma-specific information

The following is Metanorma AsciiDoc markup corresponding to the YAML
given above, using path style syntax instead of nested definition list syntax:

```asciidoc
[[ISO-19115-1]]
[%bibitem]
== {blank}
id:: ISO/TC211
fetched:: 2019-06-30
title::
title.type:: main
title.content:: Geographic information
title::
title.type:: subtitle
title.content:: Metadata
title::
title.type:: parttitle
title.content:: Part 1: Fundamentals
title.language:: en
title.script:: Latn
title.format:: text/plain
type:: standard
docid.type:: ISO
docid.id:: ISO19115-1
docnumber:: 19115-1
edition.content:: 1
language:: en
language:: fr
script:: Latn
version.revision_date:: 2019-04-01
version.draft:: draft
biblionote.type:: bibnote
biblionote.content::
+
--
Paper format is not available for this standard. Only PDF and EPUB.
--
docstatus.stage:: 90
docstatus.substage:: 90.93
docstatus.iteration:: iteration
date::
date.type:: issued
date.value:: 2014
date::
date.type:: published
date.from:: 2014-04
date.to:: 2014-05
date::
date.type:: accessed
date.value:: 2015-05-20
abstract::
abstract.content::
+
--
ISO 19115-1:2014 defines the schema required for describing geographic information and services by means of metadata. It provides information ...
--
abstract::
abstract.content::
+
--
L'ISO 19115-1:2014 définit le schéma requis pour décrire des informations géographiques et des services au moyen de métadonnées. Elle fournit des informations ...
--
abstract.language:: fr
abstract.script:: Latn
abstract.format:: text/plain
copyright.owner.name:: International Organization for Standardization
copyright.owner.abbreviation:: ISO
copyright.owner.url:: www.iso.org
copyright.from:: 2014
copyright.to:: 2020
link::
link.type:: src
link.content:: https://www.iso.org/standard/53798.html
link::
link.type:: obp
link.content:: https://www.iso.org/obp/ui/#!iso:std:53798:en
link::
link.type:: rss
link.content:: https://www.iso.org/contents/data/standard/05/37/53798.detail.rss
medium::
medium.form:: medium form
medium.size:: medium size
medium.scale:: medium scale
place:: bib place
extent.locality.type:: section
extent.locality.reference_from:: 7
accesslocation:: accesslocation1
accesslocation:: accesslocation2
classification.type:: type
classification.value:: value
validity.begins:: 2010-10-10 12:21
validity.ends:: 2011-02-03 18:30
contributor::
contributor.organization.name:: International Organization for Standardization
contributor.organization.url:: www.iso.org
contributor.organization.abbreviation:: ISO
contributor.organization.subdivision:: division
contributor.role.type:: publisher
contributor.role.description:: Publisher role
contributor::
contributor.person.name.completename.content:: A. Bierman
contributor.person.name.completename.language:: en
contributor.person.affiliation.organization.name:: IETF
contributor.person.affiliation.organization.abbreviation:: IETF
contributor.person.affiliation.organization.identifier.type:: uri
contributor.person.affiliation.organization.identifier.id:: www.ietf.org
contributor.person.affiliation.description:: Affiliation description
contributor.person.address.street:: 8 Street St
contributor.person.address.city:: City
contributor.person.address.postcode:: 123456
contributor.person.address.country:: Country
contributor.person.address.state:: State
contributor.person.contact.phone:: 223322
contributor.person.contact.type:: mobile
contributor.role:: author
contributor::
contributor.organization.name:: IETF
contributor.organization.abbreviation:: IETF
contributor.organization.identifier.type:: uri
contributor.organization.identifier.id:: www.ietf.org
contributor.role:: publisher
contributor::
contributor.person.name.language:: en
contributor.person.name.initial:: A.
contributor.person.name.surname:: Bierman
contributor.person.affiliation.organization.name:: IETF
contributor.person.affiliation.organization.abbreviation:: IETF
contributor.person.affiliation.description.content:: Affiliation description
contributor.person.affiliation.description.language:: en
contributor.person.affiliation.description.script:: Latn
contributor.person.identifier.type:: uri
contributor.person.identifier.id:: www.person.com
contributor.role:: author
relation::
relation.type:: updates
relation.bibitem.formattedref:: ISO 19115:2003
relation.bibitem.bib_locality.type:: page
relation.bibitem.bib_locality.reference_from:: 7
relation.bibitem.bib_locality.reference_to:: 10
relation::
relation.type:: updates
relation.bibitem.type:: standard
relation.bibitem.formattedref:: ISO 19115:2003/Cor 1:2006
series::
series.type:: main
series.title.type:: original
series.title.content:: ISO/IEC FDIS 10118-3
series.title.language:: en
series.title.script:: Latn
series.title.format:: text/plain
series.place:: Serie's place
series.organization:: Serie's organization
series.abbreviation.content:: ABVR
series.abbreviation.language:: en
series.abbreviation.script:: Latn
series.from:: 2009-02-01
series.to:: 2010-12-20
series.number:: serie1234
series.partnumber:: part5678
series::
series.type:: alt
series.formattedref.content:: serieref
series.formattedref.language:: en
series.formattedref.script:: Latn
keyword:: Keyword
keyword:: Key Word
```
