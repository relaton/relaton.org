---
title: Relaton Render
description: Define and use bibliographic reference styles in Relaton.

feature_with_priority: 8

external_links:
  - url: https://github.com/relaton/relaton-render
---

# Relaton Render

<div v-pre>

## Introduction

Relaton Render (`relaton-render`) is a Ruby gem that transforms Relaton objects
(which represent bibliographic items) into string reference renderings.

Relaton Render allows you to:

- define bibliographic reference styles
- render bibliographic and citation references using an existing bibliographic reference style
- localize bibliographic reference styles in multiple languages

> [!NOTE]
> Formatted references are embedded within Metanorma documents as `<formattedref>` elements.

## Purpose

Relaton objects represent bibliographic items in a structured format. In order
to render these items in a human-readable format, a rendering process is needed
to convert the structured data into a formatted reference.

There exists many types of bibliographic citation formats, each with its own
rules and conventions.

Given that the Relaton models implement the defined bibliographic models of the
ISO 690 standard, Relaton Render is naturally able to render
bibliographic items according to the ISO 690 bibliographic styles, as well as bibliographic styles that follow the bibliographic style definition framework described in ISO 690.

> [!NOTE]
> Most well-defined citation styles, such as APA and MLA, can be defined
> within the meta-bibliographic framework of ISO 690.

Relaton Render goes beyond commonly used citation rendering libraries and
citation specification languages, such as CSL (Citation Style Language),
CSL-derivatives like CSL-JSON, or Zotero, in that they are unable to handle the
comprehensive data elements and metadata supported by ISO 690.

The ISO 690 is superior in expressibility to typical styles with some key
differences:

- ISO 690 uses a data model that is a strict superset of typical citation
languages, including:
  - richness in representable data elements
  - types of citable information resources
- ISO 690 citation references are expressive yet consistent:
  - applies deterministic citation rules for every type of supported information
resource
  - provides the ability to round-trip human-readable citations into their
machine-readable counterparts in a lossless manner.

> [!NOTE]
> [Metanorma](https://www.metanorma.org) is a standards publication system
> that embeds Relaton data inside its documents to serve as both metadata and
> references. Relaton Render provides Metanorma with the ability to render these
> references in a human-readable format in the Metanorma presentation XML layer
> under `bibitem/formattedref`, and can contain formatting (e.g. `<em>` for
> italics, `<strong>` for boldface.)


## Data flow

Here's how Relaton Render works:

```
+----------------+     +-----------------+     +-----------------+
|                |     |                 |     |                 |
|  Relaton Data  |     | Relaton Render  |     |   Formatted     |
|  Model         +---->| Templates       +---->|   String        |
|                |     | (Liquid)        |     |   Reference     |
|                |     |                 |     |                 |
+----------------+     +-----------------+     +-----------------+
```


## Bibliographic style

A bibliographic style defines how citation and reference information should be
formatted when displayed in a document.

> [!NOTE]
> The ISO 690 default style renders these information resource types as follows:
> - Books: "Smith, J.; Jones, M. *Introduction to Programming*. Academic Press, 2023."
> - Magazine articles: "Johnson, R.; Williams, K. Analysis of Modern Protocols. *Journal of Computing* 15(2): 45-67, 2023."

> [!NOTE]
> The APA style renders these information resource types as follows:
> - Books: "Smith, J., & Jones, M. (2023). *Introduction to Programming*. Academic Press."
> - Magazine articles: "Johnson, R., & Williams, K. (2023). Analysis of Modern Protocols. *Journal of Computing*, 15(2), 45-67."

In Relaton, a style is implemented as a set of rendering templates that define
how different types of bibliographic resources should be formatted.

A style is realized in Relaton Render using a YAML configuration file that
specifies the template for each bibliographic resource type. The templates
define the exact formatting for different types of bibliographic resources (like
books, articles, standards, etc.).

Each information resource template is implemented as a Liquid template that uses
data fields provided by the Relaton bibliographic object to render the formatted
reference.

```
                      Bibliographic Style (YAML)
                                 |
                                 |
+=============================================================+
| Liquid Templates               |                              |
|                                |                              |
|                +---------------+---------------+            |
|                |               |               |            |
|            Monograph         Series         Events            |
|                |               |                              |
|      +--------+--------+       |                              |
|      |        |        |       |                              |
|    Book     Manual  Standard   |                              |
|  Template  Template Template   |                              |
|                                |                              |
|                        +-------+-------+                     |
|                        |               |                     |
|                      Journal        Newspaper                  |
|                      Template       Template                   |
+=============================================================+
```

## Functionality

The bibliographic style used is configured by a YAML template, which is
documented here.

Relaton-Render incorporates internationalization, and localises strings as appropriate.

> [!NOTE]
> Relaton Render applies language-specific formatting, for example:
> - Edition ordinals (e.g., "1st", "2nd", "3rd" in English)
> - Standard abbreviations (e.g., "Ed.", "Vol.", "pp.")
> - Common terms (e.g., "accessed", "viewed")
> - Grammatical inflections (e.g., "Ed." vs "Eds." for singular/plural)
> All formatting is done according to the target language's conventions.

Relaton Render provides default internationalization YAML files and
bibiliographic reference format YAML files. Users can override these templates
with their own custom configurations. For instance, different Metanorma flavours
provide their own YAML templates to overrides.

Relaton-Render also supports author-date citation, and it generates any necessary disambiguation
letters on dates (e.g. *Jones 1996a* and *Jones 1996b*.)


## YAML bibliographic configuration

### General

A YAML configuration file defines the templates for a bibliographic style.

Every key in the YAML file points to a specific template that is used (or re-used)
within the bibliographic style.

If you are creating a new bibliographic style, you may wish to define new
templates by providing all the necessary keys in the YAML file. If a key is not
provided, the same key from the default template (ISO 690) will be used.

There are several categories of keys to be defined in the YAML file:

- Language and script
- Component templates
- Information resource type templates
- Information resource collection templates

Syntax:

```yaml
# Language and script of this style <1>
language: # ...
script: # ...

# Component templates <2>
nametemplate: # ...
authorcitetemplate: # ...
extenttemplate: # ...
sizetemplate: # ...

# Information resource type templates <3>
template: # ...
  book: # ...
  # ...

# Information resource collection templates <4>
seriestemplate: # ...
journaltemplate: # ...
```

- <1> Language and script code of this bibliographic style.
- <2> Templates for formatting contributor names, extent, and size information.
- <3> Main templates for different types of bibliographic items.
- <4> Templates for formatting series and journal information.

Specifically:

`language`: Language code for localization
`script`: Script code for text rendering

`nametemplate`: Template for formatting contributor names in full bibliographic entries
`authorcitetemplate`: Template for formatting contributor names in citations
`extenttemplate`: Template for formatting extent information (e.g., pages, volumes)
`sizetemplate`: Template for formatting size information

`template`: Main templates for different types of bibliographic items

`seriestemplate`: Template for formatting series information
`journaltemplate`: Template for formatting journal series information

Each of these keys will be described in detail below.


### Localization expressions

#### General

Localization formats are used to define how different elements of a citation are
formatted in different languages.

| Key | Mandatory | See section |
|-----|-----------|-------------|
| `language` | Yes | [Language and script](#language-and-script) |
| `script` | Yes | [Language and script](#language-and-script) |
| `edition_number` | No | [Edition number format](#edition-number-format) |
| `edition` | No | [Edition number expression](#edition-number-expression) |
| `date` | No | [Date formats](#date-formats) |
| `labels` | No | [Field labels](#field-labels) |

> [!NOTE]
> The non-mandatory fields are already set by the default
> internationalization files, and they are overridden using YAML keys.


#### Fields

##### Language and script

The `language` and `script` keys define the language and script code for the
bibliographic style.

These keys are mandatory.

Syntax:

```yaml
language: {language-code} <1>
script: {script-code} <2>
```

- <1> Language code for localization
- <2> Script code for text rendering

Where:

`language`: Language code for localization from ISO 639 (ISO 639-2{B}, ISO 639-3, ISO 639-5).
`script`: Script code for text rendering from ISO 15924.

> [!NOTE]
> ```yaml
> language: en
> script: Latn
> ```


##### Edition number format

The `edition_number` key defines the template for rendering ordinal edition numbers.

This key is optional. If missing, the raw number is given.

Syntax:

```yaml
edition_number: {ordinal-rule} <1>
```

- <1> Ordinal rule from Twitter CLDR for rendering ordinal numbers

Where:

`ordinal-rule`: Rule-based number format from
[Twitter CLDR](https://github.com/twitter/twitter-cldr-rb) for the target language

> [!NOTE]
> The following example shows how to define the ordinal rule for English.
> ```yaml
> edition_number: ["OrdinalRules", "digits-ordinal"]
> ```
> For English, this generates "4th" from the number 4 using
> the Twitter CLDR method of:
> ```ruby
> 4.localize(:en).to_rbnf_s("OrdinalRules", "digits-ordinal")
> ```


##### Edition number expression

The `edition` key defines the localized expression template for editions.

This key is optional. If missing, the default setting is applied for that language.

Syntax:

```yaml
edition: {template} <1>
```

- <1> Template with % placeholder for edition number

Where:

`template`: String template containing % where the edition number should be inserted

> [!NOTE]
> ```yaml
> edition: "% ed."
> ```
> With `edition` set to `4` (representing the "4th edition"), this renders as "4th ed."


##### Date formats

The `date` key defines the default date format and additional date format
variations.

This key is optional. If missing, the default setting is applied for that
language.

The contents of the `date` key is identical to that of [Date format labels](#date-format-labels).

Syntax:

```yaml
date:
  default: {format} <1>
  month_year: {format} <2>
  day_month_year: {format} <3>
  date_time: {format} <4>
```

- <1> Default date format
- <2> Format for month and year
- <3> Format for day, month and year
- <4> Format for date and time

Where:

`format`: See [Date format labels](#date-format-labels)

> [!NOTE]
> ```yaml
> date:
>   default: to_long_s
>   month_year: to_long_s
>   day_month_year: to_long_s
>   date_time: to_long_s
> ```


### Component templates

#### Reference contributor name templates (`nametemplate`)

##### General

The top-level `nametemplate` key defines how contributor names are formatted in
full reference entries.

Three distinct keys need to be provided: one for a single contributor (`one:`),
one for two contributors (`two:`), one for three or more (`more:`).

Optionally one for "et al." (`etal:`). The number of contributors for which "et
al." starts being used is indicated by `etal_count`.

These are the acceptable keys under `nametemplate`:

`one`: Template for formatting a single contributor name

`two`: Template for formatting two contributor names

`more`: Template for formatting contributor names from `2..m` (where `m` can be
a fixed number)

`etal`: (optional) Template for formatting more contributor names from a fixed
`m..n`, corresponding to usage of "et al.". (where `m` is a fixed number)

`etal_count`: (optional, when `etal` is set) The number limit of contributors
`m` when the `etal` template is used over the `more` template.

Each sub-key should contain a Liquid template that formats the contributor names
according to the bibliographic style.

Syntax:

```yaml
nametemplate:
  one: # ...
  two: # ...
  more: # ...
  etal: # (optional)
  etal_count: # (optional)
  etal_display: # (optional)
```

> [!NOTE]
> ```yaml
> nametemplate:
>   one: "{% if nonpersonal[0] %}{{ nonpersonal[0] }}{% else %}{{ surname[0] }}, {{ given[0] }} {{ middle[0] | slice : 0 }}{% endif %}",
>   two: "{% if nonpersonal[0] %}{{ nonpersonal[0] }}{% else %}{{ surname[0] }}, {{ given[0] }} {{ middle[0] | slice : 0 }}{% endif %} &amp; {% if nonpersonal[1] %}{{ nonpersonal[1] }}{% else %}{{ given[1] }} {{ middle[1] | slice : 0 }} {{ surname[1] }}{% endif %}",
>   more: "{% if nonpersonal[0] %}{{ nonpersonal[0] }}{% else %}{{ surname[0] }}, {{ given[0] }} {{ middle[0] | slice : 0 }}{% endif %}, {% if nonpersonal[1] %}{{ nonpersonal[1] }}{% else %}{{ given[1] }} {{ middle[1] | slice : 0 }} {{ surname[1] }}{% endif %} &amp; {% if nonpersonal[2] %}{{ nonpersonal[2] }}{% else %}{{ given[2] }} {{ middle[2] | slice : 0 }} {{ surname[2] }}{% endif %}",
>   etal: "{% if nonpersonal[0] %}{{ nonpersonal[0] }}{% else %}{{ surname[0] }}, {{ given[0] }} {{ middle[0] | slice : 0 }}{% endif %}, {% if nonpersonal[1] %}{{ nonpersonal[1] }}{% else %}{{ given[1] }} {{ middle[1] | slice : 0 }} {{ surname[1] }}{% endif %} <em>et al.</em>",
>   etal_count: 6
> ```


##### Fields

The following fields are available for use in the `nametemplate`.

###### Person contributor surnames

Field: `surname[0]`
Description: Surname of the first person contributor, or complete name if
surname is not provided. (default for name)
Model path: `1`
Value type: String

> [!NOTE]
> `"Jones"`

Field: `surname[1]`
Description: Surname of the second person contributor
Model path: `1`
Value type: String

> [!NOTE]
> `"Smith"`

Field: `surname[2]`
Description: Surname of the third person contributor
Model path: `1`
Value type: String

> [!NOTE]
> `"Johnson"`

###### Person contributor initials

The `formatted-initials` field is presumed to contain full stops, and so do the
surrogates of that field realized by using individual forenames' `initial`
attributes, or the forename initials.

Initials are presumed to be delimited by a full stop followed by space or an alphabetic character.

If the full stops are to be stripped, as is often required by bibliographic
styles, such processing needs to be done within the template through Liquid
value manipulation.

Bibliographic styles also govern whether initials are separated by space.
Relaton Render treats the "full stop", not "space", as the delimiter between
initials.

> [!NOTE]
> "*D. X.*" is two initials, as is "*D.X.*".
> But "*M.-J.*" is a single initial, and so is "*de S.*"


Field: `initials[0]`
Description: Formatted initials of the first person contributor. If not supplied, the first letter of each given name is used instead.
Model path: `1`
Value type: String[]

> [!NOTE]
> `["J","A"]`

Field: `initials[1]`
Description: Formatted initials of the second person contributor
Model path: `1`
Value type: String

> [!NOTE]
> `["M","L"]`

###### Person contributor forenames

Field: `given[0]`
Description: First forename of the first person contributor. If not supplied, initials are used instead.
Model path: `1`
Value type: String

> [!NOTE]
> `"John"`

Field: `given[1]`
Description: First forename of the second person contributor. If not supplied, initials are used instead.
Model path: `contributor[1].name.forename[0]`
Value type: String

> [!NOTE]
> `"Mary"`

###### middle[0]

Field: `middle[0]`
Description: Forenames of the first person contributor except the first forename
Model path: `1`
Value type: String[]

> [!NOTE]
> `["Clarence", "Peter"]`

###### middle[1]

Field: `middle[1]`
Description: Forenames of the second person contributor except the first forename
Model path: `1`
Value type: String[]

> [!NOTE]
> `["Louise", "Helen"]`

###### Corporate/organizational contributor names

Field: `nonpersonal[0]`
Description: Name of the first corporate/organizational contributor
Model path: `1`
Value type: String[]

> [!NOTE]
> `"Acme Inc."`

Field: `nonpersonal[1]`
Description: Name of the second corporate/organizational contributor
Model path: `1`
Value type: String[]

> [!NOTE]
> `"United Nations"`


##### Single contributor name

The sub-key `one` defines how a single contributor name is formatted.

Only the following fields are available for use in the `one` sub-key:

| Field | Cardinality | Description | Example value |
|-------|-------------|-------------|--------------|
| `nonpersonal` | 0..1 (when `surname[0]` is not provided) | Corporate/organizational authors | `["World Health Organization"]` |
| `surname` | 0..1 (when `nonpersonal[0]` is not provided) | Author family name | `["Smith"]` |
| `given` | 0..1 | Full given name | `["John"]` |
| `initials` | 0..1 | Initial array | `[["J","A"]]` |
| `middle` | 0..1 | Middle name | `["Alexander"]` |


Syntax:

```yaml
nametemplate:
  one: >-
    ...
```

> [!NOTE]
> This example shows how a single contributor name is formatted in Liquid
> with whitespaces trimmed.
> ```yaml
> nametemplate:
>   one: >-
>     {%- if nonpersonal[0] -%}
>       {{ nonpersonal[0] }}
>     {%- else -%}
>       {{surname[0] | upcase }} ,_
>       {%- if given[0] -%}
>         {{given[0]}} {{middle[0]}}
>       {%- else -%}
>         {{initials[0] | join: ' '}}.
>       {%- endif -%}
>     {%- endif -%}
> ```
> Possible sample outputs of this template would be:
> - "World Health Organization" if the contributor is a corporate author (`nonpersonal[0]` is provided)
> - "Smith, John Alexander" if the contributor is an individual author with given names provided (`given[0]`, `middle[0]` are provided)
> - "Smith, J. A." if the contributor is an individual author with only initials (`given[0]` not provided)

##### Two contributor names

The sub-key `two` defines how two contributor names are formatted.

The following fields are available for use in the `two` sub-key:

| Field | Cardinality | Description | Example value |
|-------|-------------|-------------|--------------|
| `nonpersonal` | 0 or 2 (when `surname[0]` is not provided) | Corporate/organizational authors | `["World Health Organization", "United Nations"]` |
| `surname` | 0 or 2 (when `nonpersonal[0]` is not provided) | Author family name | `["Smith", "Jones"]` |
| `given` | 0..2 | Full given name | `["John", "Mary"]` |
| `initials` | 0..2 | Initial array | `[["J","A"], ["M","L"]]` |
| `middle` | 0..2 | Middle name | `["Alexander", "Louise"]` |

Syntax:

```yaml
nametemplate:
  two: >-
    ...
```

> [!NOTE]
> This example shows how two contributor names are formatted in Liquid
> with whitespaces trimmed.
> ```yaml
> nametemplate:
>   two: >-
>     {%- if nonpersonal[0] -%}
>       {{ nonpersonal[0] }}
>     {%- else -%}
>       {{surname[0] | upcase }} ,_
>       {%- if given[0] -%}
>         {{given[0]}} {{middle[0]}}
>       {%- else -%}
>         {{initials[0] | join: ' '}}.
>       {%- endif -%}
>     {%- endif -%}
>     {{ labels['author_and'] }}
>     {%- if nonpersonal[1] -%}
>       {{ nonpersonal[1] }}
>     {%- else -%}
>       {%- if given[1] -%}
>         {{given[1]}} {{middle[1]}}
>       {%- else -%}
>         {{initials[1] | join: ' '}}.
>       {%- endif -%}
>     {%- endif -%}
> ```
> Possible sample outputs of this template would be:
> - "World Health Organization and United Nations" if the contributors are corporate authors (`nonpersonal[0]`, `nonpersonal[1]` are provided)
> - "Smith, John Alexander and Jones, Mary Louise" if the contributors are individual authors with given names provided (`given[0]`, `middle[0]`, `given[1]`, `middle[1]` are provided)
> - "Smith, J. A. and Jones, M. L." if the contributors are individual authors with only initials (`given[0]`, `given[1]` not provided)
> - "Smith, J. A. and United Nations" if the first contributor is an individual author and the second is a corporate author (`given[0]` not provided, `nonpersonal[1]` is provided)
> - "World Health Organization and Jones, M. L." if the first contributor is a corporate author and the second is an individual author (`nonpersonal[0]` is provided, `given[1]` not provided)

##### More than two contributor names

The sub-key `more` defines how more than two contributor names are formatted.

The template for the `(name)[0]` entries is repeated for all additional authors
above 2 and before the final author.

The following fields are available for use in the `more` sub-key:

| Field | Cardinality | Description | Example value |
|-------|-------------|-------------|--------------|
| `nonpersonal` | 0..n (when `surname[0]` is not provided) | Corporate/organizational authors | `["World Health Organization", "United Nations", "European Union"]` |
| `surname` | 0..n (when `nonpersonal[0]` is not provided) | Author family name | `["Smith", "Jones", "Brown"]` |
| `given` | 0..n | Full given name | `["John", "Mary", "David"]` |
| `initials` | 0..n | Initial array | `[["J","A"], ["M","L"], ["D","P"]]` |
| `middle` | 0..n | Middle name | `["Alexander", "Louise", "Peter"]` |

Syntax:

```yaml
nametemplate:
  more: >-
    ...
```

> [!NOTE]
> This example shows how more than two contributor names are formatted in Liquid
> with whitespaces trimmed.
> ```yaml
> nametemplate:
>   more: >-
>     {%- if nonpersonal[0] -%}
>       {{ nonpersonal[0] }}
>     {%- else -%}
>       {{surname[0] | upcase }} ,_
>       {%- if given[0] -%}
>         {{given[0]}} {{middle[0]}}
>       {%- else -%}
>         {{initials[0] | join: ' '}}.
>       {%- endif -%}
>     {%- endif -%}
>     , {{ labels['author_and'] }}
>     {%- if nonpersonal[1] -%}
>       {{ nonpersonal[1] }}
>     {%- else -%}
>       {%- if given[1] -%}
>         {{given[1]}} {{middle[1]}}
>       {%- else -%}
>         {{initials[1] | join: ' '}}.
>       {%- endif -%}
>     {%- endif -%}
>     , {{ labels['author_and'] }}
>     {%- if nonpersonal[2] -%}
>       {{ nonpersonal[2] }}
>     {%- else -%}
>       {%- if given[2] -%}
>         {{given[2]}} {{middle[2]}}
>       {%- else -%}
>         {{initials[2] | join: ' '}}.
>       {%- endif -%}
>     {%- endif -%}
> ```
> Possible sample outputs of this template would be:
> - "World Health Organization, United Nations, and European Union" if the contributors are corporate authors (`nonpersonal[0]`, `nonpersonal[1]`, `nonpersonal[2]` are provided)
> - "Smith, John Alexander, Jones, Mary Louise, and Brown, David Peter" if the contributors are individual authors with given names provided (`given[0]`, `middle[0]`, `given[1]`, `middle[1]`, `given[2]`, `middle[2]` are provided)
> - "Smith, J. A., Jones, M. L., and Brown, D. P." if the contributors are individual authors with only initials (`given[0]`, `given[1]`, `given[2]` not provided)
> - "Smith, J. A., United Nations, and European Union" if the first two contributors are individual authors and the third is a corporate author (`given[0]`, `given[1]` not provided, `nonpersonal[2]` is provided)
> - "World Health Organization, Jones, M. L., and Brown, D. P." if the first contributor is a corporate author and the second and third are individual authors (`nonpersonal[0]` is provided, `given[1]`, `given[2]` not provided)


##### "Et al" template

The *et al.* template is an optional template for condensing more than `m`
contributor names into a rendered string.

Usage of the `etal` template is optional.

The behavior of *et al.* can be specified using these additional keys:

`etal_count`: the number of authors to trigger *et al.* in bibliographic
rendering.

`etal_display`: (optional) how many authors to show if using *et al.* in
bibliography. If no value is provided, it is the same as `etal_count`.

Syntax:

```yaml
nametemplate:
  etal: >-
    ...
  etal_count: ...  # mandatory when using etal
  etal_display: ... # optional when using etal
```

Sample template for `etal`

> [!NOTE]
> ```
> nametemplate:
>   etal: >-
>     {%- if nonpersonal[0] -%}
>       {{ nonpersonal[0] }}
>     {%- else -%}
>       {{ surname[0] }}, {{ given[0] }} {{ middle[0] | slice : 0 }}
>     {%- endif -%},
>     {%- if nonpersonal[1] -%}
>       {{ nonpersonal[1] }}
>     {%- else -%}
>       {{ given[1] }} {{ middle[1] | slice : 0 }} {{ surname[1] }}
>     {%- endif -%}
>     <em>et al.</em>
>   etal_count: 6
> ```
> This template will render the first two authors, followed by *et al.* if there
> are more than 6 authors. Such as:
> - "Smith, J. A., Jones, M. L., et al." if there are more than 6 authors
> - "Acme Inc., United Nations, et al." if there are more than 6 corporate authors

> [!NOTE]
> The Chicago Manual of Style behavior of:
> ____
> For more than ten authors (not shown here), list the first seven in the reference list, followed by et al.
> ____
> is realized with `etal_count: 10`, `etal_display: 7`.


#### Citation contributor name templates (`authorcitetemplate`)

##### General

The top-level `authorcitetemplate` key defines how author names are formatted in
citations, which are typically simpler than full reference entries.

> [!NOTE]
> Author-date citations can look like "(Smith 2020)".

It is a subclass of the `nametemplate` ([Nametemplate](#nametemplate)), configured for
rendering author names for author-date citations.

> [!NOTE]
> Citation names are often shorter than full reference entries, often
> showing only surnames.

Three distinct keys need to be provided: one for a single contributor (`one:`),
one for two contributors (`two:`), one for three or more (`more:`).

Optionally one for "et al." (`etal:`). The number of contributors for which "et
al." starts being used is indicated by `etal_count`.

These are the acceptable keys under `authorcitetemplate`:

`one`: Template for formatting a single contributor name

`two`: Template for formatting two contributor names

`more`: Template for formatting contributor names from `2..m` (where `m` can be
a fixed number)

`etal`: (optional) Template for formatting more contributor names from a fixed
`m..n`, corresponding to usage of "et al.". (where `m` is a fixed number)

`etal_count`: (optional, when `etal` is set) The number limit of contributors
`m` when the `etal` template is used over the `more` template.

> [!NOTE]
> The behaviour of *et al.* in `authorcitetemplate` is specified the same
> way as for `nametemplate`.

Each sub-key should contain a Liquid template that formats the contributor names
according to the bibliographic style.

Syntax:

```yaml
authorcitetemplate:
  one: # ...
  two: # ...
  more: # ...
  etal: # (optional)
  etal_count: # (optional)
  etal_display: # (optional)
```

> [!NOTE]
> ```yaml
> authorcitetemplate:
>   one: "{% if nonpersonal[0] %}{{ nonpersonal[0] }}{% else %}{{surname[0] }}{% endif %}"
>   two: "{% if nonpersonal[0] %}{{ nonpersonal[0] }}{% else %}{{surname[0] }}{% endif %} {{ labels['author_and'] }} {% if nonpersonal[1] %}{{ nonpersonal[1] }}{% else %}{{surname[1] }}{% endif %}"
>   more: "{% if nonpersonal[0] %}{{ nonpersonal[0] }}{% else %}{{surname[0] }}{% endif %}, {% if nonpersonal[1] %}{{ nonpersonal[1] }}{% else %}{{surname[1] }}{% endif %} {{ labels['author_and'] }} {% if nonpersonal[2] %}{{ nonpersonal[2] }}{% else %}{{surname[2] }}{% endif %}"
> ```

##### Fields

The fields available for use in the `authorcitetemplate` context is identical
to those for `nametemplate`. See [Nametemplate fields](#nametemplate-fields) for details.


##### Single author name

The sub-key `one` defines how a single author name is formatted in citations.

Only the following fields are available for use in the `one` sub-key:

| Field | Cardinality | Description | Example value |
|-------|-------------|-------------|--------------|
| `nonpersonal` | 0..1 (when `surname[0]` is not provided) | Corporate/organizational authors | `["World Health Organization"]` |
| `surname` | 0..1 (when `nonpersonal[0]` is not provided) | Author family name | `["Smith"]` |
| `given` | 0..1 | Full given name | `["John"]` |
| `initials` | 0..1 | Initial array | `[["J","A"]]` |
| `middle` | 0..1 | Middle name | `["Alexander"]` |

Syntax:

```yaml
authorcitetemplate:
  one: >-
    ...
```

> [!NOTE]
> This example shows how a single author name is formatted in Liquid
> with whitespaces trimmed.
> ```yaml
> authorcitetemplate:
>   one: "{% if nonpersonal[0] %}{{ nonpersonal[0] }}{% else %}{{ surname[0] }}{% endif %}"
> ```
> Possible sample outputs of this template would be:
> - "World Health Organization" if the author is a corporate author (`nonpersonal[0]` is provided)
> - "Smith" if the author is an individual author (`surname[0]` is provided)

##### Two author names

The sub-key `two` defines how two author names are formatted in citations.

The following fields are available for use in the `two` sub-key:

| Field | Cardinality | Description | Example value |
|-------|-------------|-------------|--------------|
| `nonpersonal` | 0 or 2 (when `surname[0]` is not provided) | Corporate/organizational authors | `["World Health Organization", "United Nations"]` |
| `surname` | 0 or 2 (when `nonpersonal[0]` is not provided) | Author family name | `["Smith", "Jones"]` |
| `given` | 0..2 | Full given name | `["John", "Mary"]` |
| `initials` | 0..2 | Initial array | `[["J","A"], ["M","L"]]` |
| `middle` | 0..2 | Middle name | `["Alexander", "Louise"]` |

Syntax:

```yaml
authorcitetemplate:
  two: >-
    ...
```

> [!NOTE]
> This example shows how two author names are formatted in Liquid with whitespaces trimmed.
> ```yaml
> authorcitetemplate:
>   two: >-
>     {%- if nonpersonal[0] -%}
>       {{ nonpersonal[0] }}
>     {%- else -%}
>       {{ surname[0] }}
>     {%- endif -%}
>     {{ labels['author_and'] }}
>     {%- if nonpersonal[1] -%}
>       {{ nonpersonal[1] }}
>     {%- else -%}
>       {{ surname[1] }}
>     {%- endif -%}
> ```
> Possible sample outputs of this template would be:
> - "World Health Organization and United Nations" if the authors are corporate authors (`nonpersonal[0]`, `nonpersonal[1]` are provided)
> - "Smith and Jones" if the authors are individual authors (`surname[0]`, `surname[1]` are provided)

##### More than two author names

The sub-key `more` defines how more than two author names are formatted in citations.

The following fields are available for use in the `more` sub-key:

| Field | Cardinality | Description | Example value |
|-------|-------------|-------------|--------------|
| `nonpersonal` | 0..n (when `surname[0]` is not provided) | Corporate/organizational authors | `["World Health Organization", "United Nations", "European Union"]` |
| `surname` | 0..n (when `nonpersonal[0]` is not provided) | Author family name | `["Smith", "Jones", "Brown"]` |
| `given` | 0..n | Full given name | `["John", "Mary", "David"]` |
| `initials` | 0..n | Initial array | `[["J","A"], ["M","L"], ["D","P"]]` |
| `middle` | 0..n | Middle name | `["Alexander", "Louise", "Peter"]` |

Syntax:

```yaml
authorcitetemplate:
  more: >-
    ...
```

> [!NOTE]
> This example shows how more than two author names are formatted in Liquid with whitespaces trimmed.
> ```yaml
> authorcitetemplate:
>   more: >-
>     {%- if nonpersonal[0] -%}
>       {{ nonpersonal[0] }}
>     {%- else -%}
>       {{surname[0] }}
>     {%- endif -%},
>     {%- if nonpersonal[1] -%}
>       {{ nonpersonal[1] }}
>     {%- else -%}
>       {{surname[1] }}
>     {%- endif -%}
>     {{ labels['author_and'] }}
>     {%- if nonpersonal[2] -%}
>       {{ nonpersonal[2] }}
>     {%- else -%}
>       {{surname[2] }}
>     {%- endif -%}
> ```
> Possible sample outputs of this template would be:
> - "World Health Organization, United Nations, and European Union" if the authors are corporate authors (`nonpersonal[0]`, `nonpersonal[1]`, `nonpersonal[2]` are provided)
> - "Smith, Jones, and Brown" if the authors are individual authors (`surname[0]`, `surname[1]`, `surname[2]` are provided)

##### "Et al" template

The *et al.* template is an optional template for condensing more than `m`
contributor names into a rendered string when used in citations.

Usage of the `etal` template is optional.

The behavior of *et al.* can be specified using these additional keys:

`etal_count`: the number of authors to trigger *et al.* in citation rendering.

`etal_display`: (optional) how many authors to show if using *et al.* in
citations. If no value is provided, it is the same as `etal_count`.

Syntax:

```yaml
authorcitetemplate:
  etal: >-
    ...
  etal_count: ...  # mandatory when using etal
  etal_display: ... # optional when using etal
```

Sample template for `etal`

> [!NOTE]
> ```
> authorcitetemplate:
>   etal: >-
>     {%- if nonpersonal[0] -%}
>       {{ nonpersonal[0] }}
>     {%- else -%}
>       {{ surname[0] }}
>     {%- endif -%},
>     {%- if nonpersonal[1] -%}
>       {{ nonpersonal[1] }}
>     {%- else -%}
>       {{ surname[1] }}
>     {%- endif -%}
>     <em>et al.</em>
>   etal_count: 3
> ```
> This template will render the first two authors, followed by *et al.* if there
> are more than 3 authors. Such as:
> - "Smith, Jones, et al." if there are more than 3 authors
> - "Acme Inc., United Nations, et al." if there are more than 3 corporate authors

> [!NOTE]
> The APA Style behavior of:
> ____
> For a work with three or more authors, include only the first author's name plus "et al." in every citation.
> ____
> is realized with `etal_count: 3`, `etal_display: 1`.


#### Extent templates (`extenttemplate`)

##### General

The extent templates defines how extent information (pages, volumes) is
formatted for different types of information resources.

The extent templates key `extenttemplate` accepts a separate template
for each bibliographic item type, with the type name as the key.

All supported information resource types can have their own extent template, as
different types of bibliographic items may have different ways of expressing
extent.

> [!NOTE]
> The extent of a book chapter may be expressed as *pp. 9–20*, while the extent of
> an article may be expressed as just *9–20*.

For those information resource types where no specific template is supplied, the
template given for `misc` is used as the default.

Syntax:

```yaml
extenttemplate:
  article: # (optional) <1>
  book: # (optional)
  misc:  # (required) <2>
```

- <1> Extent templates for all information resource types are optional.
- <2> The `misc` extent template is mandatory.

The template draws on the defined types of locality of extents; the most common
of these is `volume`, `issue` (within volume; "number" for journals), and
`page`. Locality types are the fields used in the Liquid templates.

> [!NOTE]
> ```
> extenttemplate:
>   article: "{{ volume_raw }}|({{ issue_raw }}) : {{ page_raw }}"
>   misc: "{{ volume }}, {{ page }}"
> ```

The number of the volume, issue/number, or page, without accompanying labels, is given in `volume_raw`, `issue_raw`, and `page_raw`.
So `{{volume}}` is by default defined to include the locality type label *Vol.* (or its internationalised equivalent);
`volume_raw` contains just the number.

The internationalization files define a singular and a plural version of the
locality types, under `labels['extent']`.

- The plural label is always used if the extent is a range (with a `<from>` and `<to>`).
- The singular label is used if the extent is not a range (*pp. 2–4* vs. *p. 3*).
- The internationalization files include a slot where the number or number range is inserted, indicated by %, since this varies by language. (For instance, English has `pp. %`, whereas Chinese has `第%页`.)

Default setting for English extent templates for ISO 690

> [!NOTE]
> ```yaml
> extenttemplate:
>   book: "{{ volume }}, {{ page }}"
>   booklet: book
>   proceedings: book
>   journal: book
>   standard: book
>   techreport: book
>   inbook: "{{ volume }}: {{ page }}"
>   article: "{{ volume }} {{issue}} , {{ page }}, {{ duration }}"
>   misc: "{{ volume }} {{issue}} , {{ page }}, {{ duration }}"
> ```

##### Fields for locality objects

###### General

The extent is made up of a single locality object, conjointed locality objects,
or a locality stack (a hierarchical structure of localities).

Each locality indication is represented as a Relaton Locality object.

The fields available in extent templates come from the Relaton bibliographic
object's `locality` attribute, which contains a list of `Locality` objects. Each
locality object provides fields that can be used in the templates.

All Locality fields are available in `{name}` and `{name}_raw` format:

`{name}`: provides the original value applied with a localized label for the extent type (e.g. *Vol.* for volume in English,
*_vol._* in French,
*_т._* in Russian).

> [!NOTE]
> `volume` is the string `"Vol. 3"`.

`{name}_raw`: provides only the original value.

> [!NOTE]
> `volume_raw` is the numeric value `3`.


| Field | Model path | See section |
|-------|------------|-------------|
| `chapter` | `extent.locality[type='chapter']` | [Chapter](#chapter) |
| `duration` | `extent.locality[type='time']` | [Duration](#duration) |
| `issue` | `extent.locality[type='issue']` | [Issue](#issue) |
| `page` | `extent.locality[type='page']` | [Page](#page) |
| `paragraph` | `extent.locality[type='paragraph']` | [Paragraph](#paragraph) |
| `volume` | `extent.locality[type='volume']` | [Volume](#volume) |

> [!NOTE]
> The `{name}_raw` fields are omitted from the table above for convenience.

> [!NOTE]
> The fields are identical to the supported types of the `Locality` object.

> [!NOTE]
> ```yaml
> extenttemplate:
>   article: "{{ volume_raw }}|({{ issue_raw }}) : {{ page_raw }}"
>   misc: "{{ volume }}, {{ page }}"
> ```

###### Chapter

Field: `chapter`
Description: Chapter number
Model path: `extent.locality[type='chapter']`
Value type: String

> [!NOTE]
> `"Chapter 3"`

Field: `chapter_raw`
Description: Raw chapter number without label
Model path: `extent.locality[type='chapter']`
Value type: String

> [!NOTE]
> `3`


###### Issue

Field: `issue`
Description: Issue or number within volume
Model path: `extent.locality[type='issue']`
Value type: String

> [!NOTE]
> `"Issue 4"`

Field: `issue_raw`
Description: Raw issue number without label
Model path: `extent.locality[type='issue']`
Value type: String

> [!NOTE]
> `4`

###### Paragraph

Field: `paragraph`
Description: Paragraph number
Model path: `extent.locality[type='paragraph']`
Value type: String

> [!NOTE]
> `"Para 12"`

Field: `paragraph_raw`
Description: Raw paragraph number without label
Model path: `extent.locality[type='paragraph']`
Value type: String

> [!NOTE]
> `12`

###### Page

Field: `page`
Description: Page number or range with label
Model path: `extent.locality[type='page']`
Value type: String

> [!NOTE]
> `"pp. 45-67"`

Field: `page_raw`
Description: Raw page number or range without label
Model path: `extent.locality[type='page']`
Value type: String

> [!NOTE]
> `"45-67"`

###### Volume

Field: `volume`
Description: Volume number
Model path: `extent.locality[type='volume']`
Value type: String

> [!NOTE]
> `"Vol. 3"`

Field: `volume_raw`
Description: Volume number
Model path: `extent.locality[type='volume']`
Value type: String

> [!NOTE]
> `3`





#### Size template (`sizetemplate`)

##### General

The size template defines how size information (number of pages, volumes) is
formatted for different types of information resources.

The size of a bibliographic item is distinct from the extent:

- the size is how large the item is (e.g. "how many pages are in the book?")

- the extent is how much of the host item the item covers (e.g. "which pages of
the book are in the current chapter?")

They can be displayed quite differently from extent. For example, while extent
pages is given in English as *pp. 9–20* or *p. 3*, size pages is given as *3
pp.*.

For those types where none is supplied, the template given for `misc` is used as
the default.

##### Fields for locality objects

###### General

Similar to [Extent locality fields](#extent-locality-fields), the "size" of an information resource is
made up of one or more locality indications, with each locality indication
represented as a Relaton Locality object.

The template draws on the defined types of locality of extents, which are each
represented by a Relaton Locality object. Each locality object provides fields
that can be used in the templates.

All Locality fields are available in `{name}` and `{name}_raw` format,
see [Extent locality fields](#extent-locality-fields) for details.


| Field | Model path | See section |
|-------|------------|-------------|
| `data` | `medium.size[type='data']` | [Data size](#data-size) |
| `duration` | `medium.size[type='time']` | [Duration](#duration-1) |
| `volume` | `medium.size[type='volume']` | [Volume](#volume-1) |
| `issue` | `medium.size[type='issue']` | [Issue](#issue-1) |
| `page` | `medium.size[type='page']` | [Page](#page-1) |

> [!NOTE]
> The `{name}_raw` fields are omitted from the table above for convenience.

> [!NOTE]
> ```yaml
> sizetemplate:
>   dataset: "{{ data }}"
>   electronic resource: dataset
>   webresource: dataset
>   misc: "{{ volume }}, {{ issue }}, {{ page }}, {{ data }}, {{ duration }}"
> ```


For internationalization of labels, the following rules apply:

- Pluralization:
  - A singular and a plural version of the locality types, under `labels['size']`
    are defined in the internationalization files.
  - If the extent is a range, the plural label is used (with a `from` and `to`).
  - The label is singular only if the value is `1`, else it is plural (*1 p.*, *2 pp.*)
- Number ranges:
  - The internationalization files include a slot where the number or number range
    is inserted, since this varies by language.
  - The number of volumes or pages, without accompanying labels, is given in `volume_raw` and `page_raw`.
- Multiple localities of the same type are joined by the `+` symbol.

> [!NOTE]
> The size of a book may be expressed as *Vol. 3, pp. 9–20*, while the size of a
> *xlii + 76 pp.*

> [!NOTE]
> ```yaml
> size:
>   page:
>     sg: "% p."
>     pl: "% pp."
>   volume:
>     sg: "% vol."
>     pl: "% vols."
>   issue:
>     sg: "% no."
>     pl: "% nos."
> ```


###### Data size

Field: `data`
Description: The size of data, with unit included in value
Model path: `medium.size[type='data']`
Value type: String

> [!NOTE]
> `"3.2 GB"`

Field: `data_raw`
Description: The size of data, without unit
Model path: `medium.size[type='data']`
Value type: String

> [!NOTE]
> `"3.2"`


###### Duration

Field: `duration`
Description: The time duration expressed in ISO 8601-1 format
Model path: `medium.size[type='time']`
Value type: String

> [!NOTE]
> `"PT2H30M"` (2 hours 30 minutes)


###### Volume

Field: `volume`
Description: The number of volumes, formatted with internationalized label
Model path: `medium.size[type='volume']`
Value type: String

> [!NOTE]
> `"3 vols."`

Field: `volume_raw`
Description: The number of volumes, without label
Model path: `medium.size[type='volume']`
Value type: String

> [!NOTE]
> `"3"`


###### Issue

Field: `issue`
Description: The number of issues, formatted with internationalized label
Model path: `medium.size[type='issue']`
Value type: String

> [!NOTE]
> `"12 nos."`

Field: `issue_raw`
Description: The number of issues, without label
Model path: `medium.size[type='issue']`
Value type: String

> [!NOTE]
> `"12"`


###### Page

Field: `page`
Description: The number of pages, formatted with internationalized label
Model path: `medium.size[type='page']`
Value type: String

> [!NOTE]
> `"456 pp."`

Field: `page_raw`
Description: The number of pages, without label
Model path: `medium.size[type='page']`
Value type: String

> [!NOTE]
> `"456"`


### Information resource templates

#### Template re-use

A template can be re-used by other information resource types by specifying the
name of the template as a string.

This is useful for cases where multiple information resource types share the
same formatting rules.

Syntax:

```yaml
template:
  book: # ...
  booklet: book <1>
  # ...
```

- <1> The `booklet` information resource type uses the same template as `book`.

> [!NOTE]
> ```yaml
> template:
>   book: # ...
>   booklet: book
>   misc: # ...
>   map: misc
>   audiovisual: misc
> ```

#### Data fields

Data fields are exposed in a template definition context for accessing data
elements from the Relaton bibliographic object being rendered.

Each `template` points to a string value in the
[Liquid language](https://shopify.github.io/liquid/) syntax.

The following fields are exposed to the Liquid context from the Relaton
bibliographic item.

> [!NOTE]
> A Liquid "context" is the evaluation environment of a Liquid template.
> The fields below are exposed directly at their attributable names in the template
> as Liquid variables. For example, the value of the Liquid variable `title`
> will be the Relaton object's `title` attribute.


| Field | Model path | Multiple | Host | See section |
|-------|------------|----------|------|-------------|
| `title` | `title` | No | No | [Title field](#title-field) |
| `edition` | `edition` | No | Yes | [Edition field](#edition-field) |
| `edition_raw` | `edition` | No | Yes | [Edition raw field](#edition-raw-field) |
| `edition_num` | `edition[number]` | No | Yes | [Edition number field](#edition-number-field) |
| `medium` | `medium` | No | Yes | [Medium field](#medium-field) |
| `place` | `place` | No | Yes | [Place field](#place-field) |
| `publisher` | `contributor[role.type='publisher'].organization.name` | No | Yes | [Publisher field](#publisher-field) |
| `distributor` | `contributor[role.type='distributor'].organization.name` | No | Yes | [Distributor field](#distributor-field) |
| `authorizer` | `contributor[role.type='authorizer'].organization.name` or `contributor[role.type='publisher'].organization.name` | No | Yes | [Authorizer field](#authorizer-field) |
| `authoritative_identifier` | `docidentifier[type!='metanorma' && type!='ordinal' && type!='ISBN' && type!='ISSN' && type!='DOI']` | Yes | No | [Authoritative identifier field](#authoritative-identifier-field) |
| `other_identifier` | `docidentifier[type='ISBN' or type='ISSN' or type='DOI']` | Yes | No | [Other identifier field](#other-identifier-field) |
| `doi` | `docidentifier[type='DOI']` | Yes | No | [DOI field](#doi-field) |
| `status` | `status` | No | No | [Status field](#status-field) |
| `uri` | `uri[type='citation' or type='uri' or type='src' or exists]` | No | No | [URI field](#uri-field) |
| `access_location` | `accessLocation` | No | Yes | [Access location field](#access-location-field) |
| `extent` | `extent` | Yes | No | [Extent field](#extent-field) |
| `creatornames` | `contributor[role.type='author' or role.type='performer' or role.type='adapter' or role.type='translator' or role.type='editor' or role.type='distributor' or role.type='authorizer']` | Yes | No | [Creator names field](#creator-names-field) |
| `authorcite` | `contributor[role.type='author' or role.type='performer' or role.type='adapter' or role.type='translator' or role.type='editor' or role.type='distributor' or role.type='authorizer']` | Yes | No | [Author citation field](#author-citation-field) |
| `role` | `contributor[role.description or role.type]` | No | No | [Role field](#role-field) |
| `date` | `date[type='issued' or type='circulated']` | No | Yes | [Date field](#date-field) |
| `date_updated` | `date[type='updated']` | No | Yes | [Date updated field](#date-updated-field) |
| `date_accessed` | `date[type='accessed']` | No | Yes | [Date accessed field](#date-accessed-field) |
| `host_creatornames` | `relation[type='includedIn']` or `bibitem.contributor[role.type='author']` | No | Yes | [Host item creator names](#host-item-creator-names) |
| `host_title` | `relation[type='includedIn']` or `bibitem.title` | Yes | Yes | [Host item creator names](#host-item-creator-names) |
| `host_role` | `relation[type='includedIn']` or `bibitem.contributor[role.description]` | No | Yes | [Host item role](#host-item-role) |
| `type` | `type` | No | No | [Type](#type) |
| `home_standard` | N/A | No | No | [Home standard indicator](#home-standard-indicator) |
| `series` | `series[type='main' or !type or exists]` | No | Yes | [Series field](#series-field) |
| `labels` | N/A` | No | No | [Localization labels](#localization-labels-from-internationlization-files) |


> [!NOTE]
> The table indicates the source of the field values using the
> [LutaML Instance Path syntax](https://github.com/lutaml/lutaml-path) as applied to
> the Relaton BibliographicItem object.

> [!NOTE]
> The "Host" column indicates if the field content may come from the "host
> item". In citing an information resource located within a host item, it is
> common to render elements from the host item instead of the item itself. Hence a
> number of fields can be populated either by the bibliographic item itself, or by
> the host item containing it. For example, in a paper included in an edited
> volume, the `edition` field will be given for the edited volume, rather than for
> the paper.

> [!NOTE]
> The "host item" is located at path `relation[type='includedIn'].bibitem`.


##### Title field

Value type: String.

Description: The primary title of the bibliographic item.
If multiple titles exist, prioritizes matches by language.


##### Edition field

Value type: Numeric or String.

Description:
The edition number or text.

If a numeric value is provided in the Relaton object, the value is the
internationalized rendering of ordinal "nth edition", as set in
`edition_numbering`. (e.g., "2nd edition").

Otherwise, the raw textual content is given.


##### Edition raw field

Value type: String.

Description:
The raw edition text.


##### Edition number field

Value type: Numeric.

Description:
The edition number.


##### Medium field

Value type: String.

Description:
The medium or format of the item.

##### Place field

Value type: String.

Description:
The place of publication.

##### Publisher field

Value type: String.

Description:
The name of the publishing organization.

##### Distributor field

Value type: String.

Description:
The name of the distributing organization.

##### Authorizer field

Value type: String.

Description:
The authorizing organization, falling back to publisher if no explicit authorizer exists.

##### Authoritative identifier field

Value type: String.

Description:
Primary document identifiers excluding Metanorma, ordinal, ISBN, ISSN and DOI types.

##### Other identifier field

Value type: String[].

Description:
Secondary identifiers including ISBN, ISSN and DOI. By default prefixed with type and colon.


##### DOI field

Value type: String[].

Description:
The DOI identifier without the `doi:` prefix.

##### Status field

Value type: String.

Description:
The status or stage of the document. Rendering varies by document type.

> [!NOTE]
> In Metanorma, the "status" field is typically rendered differently for
> different flavors.


##### URI field

Value type: String.

Description:
Citation or source URI, excluding DOI (as a DOI is rarely the source of a resource).

Prioritizes language match if multiple exist.

##### Access location field

Value type: String.

Description:
Physical or electronic location where the item can be accessed.

##### Extent field

Value type: String.

Description:
The extent of the item (e.g., pages, volumes). Renders with standard abbreviations.

> [!NOTE]
> This encompasses `pp`, `vols`, `-` (en-dash ranges), and supports multiple locations.

##### Creator names field

Value type: String.

Description:
Creator names formatted according to the [Nametemplate](#nametemplate) each. The joining template
from internationalization configuration is used to join multiple names.

Includes authors, performers, adapters, translators, editors, distributors and authorizers.


##### Author citation field

Value type: String.

Description:
Creator names formatted according to the [Authorcitetemplate](#citation-contributor-name-templates-authorcitetemplate) for citations.
The `authorcitetemplate` is applied to each name, and the joining template from
internationalization is applied to multiple names.

##### Role field

Value type: String.

Description:
The role description or type of the contributors.

##### Date field

Value type: String.

Description:
The publication or circulation date. By default truncated to year only.

##### Date updated field

Value type: String.

Description:
The date the item was last updated.

##### Date accessed field

Value type: String.

Description:
The date the item was accessed. Not added by default if not explicitly supplied.


##### Host item creator names

Value type: String.

Description:
Creator names of the "host item" of the bibliographic item.

Format follows that of "creatornames" ([Creator names field](#creator-names-field)).


##### Host item creator names

Value type: String.

Description:
Title of the "host item" of the bibliographic item.

Format follows that of "title" ([Title field](#title-field)).

##### Host item role

Value type: String.

Description:
Role of the "host item" of the bibliographic item.

Format follows that of "role" ([Role field](#role-field)).


##### Type

Value type: String.

Description:
Type of the bibliographic item.


##### Home standard indicator

Value type: Boolean.

Description:
Indicates whether the document represented by the current bibliographic item
is considered a "home standard" in the document that is citing it.

A "home standard" is a document that is published by the same organization or a
closely affiliated organization that is publishing the document containing it.

> [!NOTE]
> This field is only relevant for usage of Relaton Render inside Metanorma.

> [!NOTE]
> In some standards bodies, citations of standards from the same
> organization or affiliates may omit the publisher's identifier prefix in
> publication identifiers. For example, when cited in a NIST document, documents
> with a full publication identifier of "NIST SP 800-53r5" or "NIST FIPS 100" will
> be cited as "SP 800-53r5" and "FIPS 100" respectively.



##### Series field

Value type: String.

Description:
Series information formatted according to the [Seriestemplate](#seriestemplate).


#### Information resource types

Each type of information resource has a corresponding template that defines how
the citation is formatted. There is one template provided for each of the
bibliographic types recognised by Relaton (`bibitem.type`), and a default
template.

The default `misc` template is used when no specific template is provided for a
particular type. It is mandatory to provide a `misc` template.

Relaton Render is developed to support the ISO 690 citation system, which
defines a set of information resource types and a language for creating citation
styles.

Relaton Render supports most information resource types defined by ISO 690,
though not all.

Information resource types supported by Relaton Render

| Information resource type | Code | ISO 690 support | Relaton Render support |
|---------------------------|------|-----------------|------------------------|
| Article | `article` | Yes | Yes |
| Book | `book` | Yes | Yes |
| Booklet | `booklet` | Yes | Yes |
| Manual | `manual` | Yes | Yes |
| Proceedings | `proceedings` | Yes | Yes |
| Presentation | `presentation` | Yes | Yes |
| Thesis | `thesis` | Yes | Yes |
| Technical report | `techreport` | Yes | Yes |
| Standard | `standard` | Yes | Yes |
| Unpublished work | `unpublished` | Yes | Yes |
| Electronic resource | `electronic_resource` | Yes | Yes |
| Book part | `inbook` | Yes | Yes |
| Collection part | `incollection` | Yes | Yes |
| Proceedings part | `inproceedings` | Yes | Yes |
| Journal | `journal` | Yes | Yes |
| Website | `website` | Yes | Yes |
| Web resource | `webresource` | Yes | Yes |
| Dataset | `dataset` | Yes | Yes |
| Miscellaneous | `misc` | Yes | Yes |
| Map | `map` | Yes | No |
| Audiovisual | `audiovisual` | Yes | No |
| Film | `film` | Yes | No |
| Video | `video` | Yes | No |
| Broadcast | `broadcast` | Yes | No |
| Software | `software` | Yes | No |
| Graphic work | `graphic_work` | Yes | No |
| Music | `music` | Yes | No |
| Performance | `performance` | Yes | No |
| Patent | `patent` | Yes | No |
| Archival material | `archival` | Yes | No |
| Social media | `social_media` | Yes | No |
| Alert | `alert` | Yes | No |
| Message | `message` | Yes | No |
| Conversation | `conversation` | Yes | No |
| Collection | `collection` | Yes | No |

> [!NOTE]
> In the Metanorma usage of Relaton Render, not all information resource
> types are used, but there are exemplars for all of these given on this site,
> following the human-readable style used in ISO 690. These can be overridden by
> supplying corresponding paramerers in the call to initialize `Relaton::Render`.


### General

The main templates for different types of bibliographic items, defining the complete citation format.

Example:
```yaml
template:
  book: "{{ creatornames }} ({{role}}) . {{labels['qq-open']}}{{ title }}{{labels['qq-close']}} [{{medium}}] . {{ edition | capitalize_first }}."
  article: "{{ creatornames }} ({{role}}) . {{labels['q-open']}}{{ title }}{{labels['q-close']}}. {{ series }} [{{medium}}]"
```


## Composite information resource templates

### Series template (`seriestemplate`)

#### General

A series is a monograph series, a collection of information resources published
in a sequence under the same title. Series information is commonly included in
bibliographic references to both provide context and allow location of the item
being cited.

The `seriestemplate` defines how series information is formatted in
bibliographic references, including series titles, abbreviations and numbering.

Syntax:

```yaml
seriestemplate: >-
  ...
```

Sample template for a series citation style

> [!NOTE]
> ```yaml
> seriestemplate: >-
>   {% if series_formatted %}
>     {{ series_formatted }}
>   {% else %}
>     {% if series_abbr %}
>       {{ series_abbr }}
>     {% else %}
>       {{ series_title }}
>     {% endif %}
>     ({{ series_run }})
>     {{ series_num }}|({{ series_partnumber }})
>   {% endif %}
> ```

#### Fields

The following fields are available for use in the `seriestemplate` (and
`journaltemplate`).

| Field | Model path | Multiple | Host | See section |
|-------|------------|----------|------|-------------|
| `series_title` | `series[type='main' or !type or exists].title` | No | Yes | [Series title](#series-title) |
| `series_abbr` | `series[type='main' or !type or exists].abbreviation` | No | Yes | [Series abbreviation](#series-abbreviation) |
| `series_num` | `series[type='main' or !type or exists].number` | No | Yes | [Series number](#series-number) |
| `series_partnumber` | `series[type='main' or !type or exists].partnumber` | No | Yes | [Series part number](#series-part-number) |
| `series_run` | `series[type='main' or !type or exists].run` | No | Yes | [Series run](#series-run) |
| `series_place` | `series[type='main' or !type or exists].place` | No | Yes | [Series place](#series-place) |
| `series_organization` | `series[type='main' or !type or exists].organization` | No | Yes | [Series organization](#series-organization) |
| `series_dates` | `series[type='main' or !type or exists].from` `series[type='main' or !type or exists].to` | No | Yes | [Series dates](#series-dates) |

The following fields are available for use in the `seriestemplate`:

##### Series title

Field: `series_title`
Description: Full title of the series
Model path: `series[type='main' or !type or exists].title`
Value type: String

> [!NOTE]
> `"Studies in Post-Modernism"`

##### Series abbreviation

Field: `series_abbr`
Description: Abbreviated series title
Model path: `series[type='main' or !type or exists].abbreviation`
Value type: String

> [!NOTE]
> `"SPM"`

##### Series number

Field: `series_num`
Description: Series number or volume
Model path: `series[type='main' or !type or exists].number`
Value type: String

> [!NOTE]
> `"30"`

##### Series part number

Field: `series_partnumber`
Description: Part or issue number within the series
Model path: `series[type='main' or !type or exists].partnumber`
Value type: String

> [!NOTE]
> `"4"`

##### Series run

Field: `series_run`
Description: Series run indicator (e.g. "3rd series")
Model path: `series[type='main' or !type or exists].run`
Value type: String

> [!NOTE]
> `"3rd series"`

##### Series place

Field: `series_place`
Description: Place of publication for series
Model path: `series[type='main' or !type or exists].place`
Value type: String

> [!NOTE]
> `"London"`

##### Series organization

Field: `series_organization`
Description: Organization responsible for series
Model path: `series[type='main' or !type or exists].organization`
Value type: String

> [!NOTE]
> `"Institute of Modern Studies"`

##### Series dates

Field: `series_dates`
Description: Start and end dates of series run
Model path: `series[type='main' or !type or exists].from` `series[type='main' or !type or exists].to`
Value type: String

> [!NOTE]
> `"2010-2020"`


### Journal template (`journaltemplate`)

#### General

The `journaltemplate` defines how journal series information like volume and
issue numbers is formatted in a bibliographic style.

Syntax:

```yaml
seriestemplate: >-
  ...
```

Sample template for a journal citation style

> [!NOTE]
> ```yaml
> journaltemplate: >-
>   <em>
>     {%- if series_abbr -%}
>       {{ series_abbr }}
>     {%- else -%}
>       {{ series_title }}
>     {%- endif -%}
>   </em>
>   ({{ series_run }})
>   {{ labels['volume'] }}_{{ series_num }}
>   {{ labels['part'] }}_{{ series_partnumber }}
> ```
> Renders as:
> ____
> _Journal Title_ (Series Run) Vol. 123 Part 4
> ____


The template uses the same fields as `seriestemplate` but requires special
handling of formatting, particularly italicization of journal titles.

While similar to `seriestemplate`, journals are typically formatted differently
from monograph series due to established citation conventions.


Common bibliographic rendering of a journal that omits explicit labels

> [!NOTE]
> ```liquid
> <em>
>   {%- if series_abbr -%}
>     {{ series_abbr }}
>   {%- else -%}
>     {{ series_title }}
>   {%- endif -%}
> </em>
> {{ series_num }}|({{ series_partnumber }})
> ```
> Renders as:
> ____
> _J. Am. Chem. Soc._ 103(1)
> ____


ISO 690 rendering of a journal that provides explicit labels for volume and part

> [!NOTE]
> The recommended practice in ISO 690:2021 is to give explicit volume labels.
> ```liquid
> <em>
>   {%- if series_abbr -%}
>     {{ series_abbr }}
>   {%- else -%}
>     {{ series_title }}
>   {%- endif -%}
> </em>
> {{ labels['volume'] }}_{{series_num}}
> {{ labels['part'] }}_{{series_partnumber}}
> ```
> Renders as:
> ____
> _J. Am. Chem. Soc._ Vol. 103 Part 1
> ____


#### Fields

The template uses the same fields as [Seriestemplate fields](#seriestemplate-fields).
Please refer to that section for details on the fields available for use in the
`journaltemplate`.


## Working with Liquid in Relaton Render templates

### Templating rules


### Liquid filters

#### General

The Relaton Render Liquid templates allows usage of common filters defined in
Liquid, including `upcase`.

In the Relaton Render templates context, the following additional filters are
also available.

#### Capitalize first (`capitalize_first`)

`capitalize_first` capitalises only the first word in a string, and does not
lowercase other words in the string.

> [!NOTE]
> "third edition" becomes "Third edition", but "3. Aufl." does not become "3. aufl."

### Template processing rules

#### General

Relaton Render uses additional template processing rules that are addition to
normal Liquid syntax in order to facilitate bibliographic rendering.

A Relaton Render template is a string that contains:

- plain text, which is rendered as is;
- content fields, which are rendered using corresponding values from the Relaton
bibliographic object.


#### Plain text

Plain text, including textual characters and punctuation, is rendered as is.

Plain text is is space-delimited, it is inserted regardless of preceding
content.


#### Content fields

##### General

A content field is defined as a string that contains a single Liquid rendering
expression (`{{ }}`), flanked by characters, but without any white space
characters in text (unless explicitly indicated).

White space characters within Liquid syntax are excluded from delimitation rules.
i.e. space within Liquid delimiters, such as `{% %}` and `{{ }}`, is ignored.

> [!NOTE]
> `Vol.` is not a content field.
> `Vol. {{ volume }}` is treated as a single content field.

Within a template, content fields are delimited by white space characters.

> [!NOTE]
> `<em>{{ title }}</em> [{{medium}}]` is treated as two separate content fields.

When multiple content fields are rendered, they are joined by a single white
space character.

> [!NOTE]
> `<em>{{ title }}</em> [{{medium}}]` renders as for instance, "Title [Book]".

> [!NOTE]
> In the expression `({{date}}) .`, the full stop is rendered regardless of
> whether or not the `date` is present.
> On the other hand, in the expression of `{{date}}.`, if `date` is empty, the
> full stop will not be rendered.

Space characters between punctuation and before punctuation is automatically
removed.

> [!NOTE]
> The expression `({{date}}) .` can be rendered as "(2021)."

Space characters within fields are globally converted to underscores. For that
reason, any filter operations in Liquid need to refer to underscore instead of
space.

> [!NOTE]
> ```liquid
> {{ creatornames }} ({{date}}) . <em>{{ title }}</em> [{{medium}}] ,_{{ edition }}_{{ labels['edition'] }} .
> ```
> Can be rendered as:
> - "Smith, J. A. (2021). *Studies in Biology* 1st ed."



##### Attaching content with white spaces to a content field

To attach content with white space to a content field, use an underscore (`_`).
An underscore is treated as space, attaching any immediately congruent text
to the preceding or following Liquid expression.

> [!NOTE]
> The expression `,_{{ edition }}_{{ labels['edition'] }}` is treated as a single
> content field.
> An example rendering of the content field could be: "1st ed."

To render the underscore character itself, it must be escaped by a backslash (`\`).

> [!NOTE]
> The content field expression of `<span_class="std\_note">` will lead to a
> rendering of `<span class="std_note">`.


##### Joining content fields without spaces

By default, content fields are joined by a single white space character.

To join content fields without spaces, use the `|` character between
the content fields.

> [!NOTE]
> `{{ title }}{{ medium }}` are two content fields that will be rendered with no
> space separation.

##### Empty content fields are omitted

If the Liquid rendering expression in a content field gives an empty result, the
content field is considered "empty" and the whole content field is omitted from
the rendered output.

This means that the surrounding text and punctuation in the content field
(text characters adjacent to the empty Liquid expression) are also omitted.

> [!NOTE]
> In the `[{{medium}}]` content field, it contains a Liquid expression
> `{{medium}}` and enclosing square brackets. If the value of `medium` is empty,
> both the brackets and the Liquid expression will not be rendered.

> [!NOTE]
> In the expression `,_{{ edition }}_{{ labels['edition'] }}`, if `edition` is
> missing, the entire content field is not rendered.
> This means that not only the internal Liquid expression not being rendered, but
> the preceding "comma, space" is omitted as well as the following edition label.
> i.e. it renders "1st ed.", but will not render " ed.".




## Localization labels from internationlization files

Relaton Render accepts a set of language-specific labels for
internationalization of commonly used word labels in citation formats.

These labels are defined in the internationalization files and exposed to the
rendering template context inside the `labels` field as a map
to support the implementation of localized citation formats.

> [!NOTE]
> The text labels of "edition", "In", "At", "Vol", are commonly used in citation
> formats in different languages.

Value type: map.

The following keys are given in the respective languages.

> [!NOTE]
> ```yaml
> in: in
> at: at
> and: and
> author_and: and
> updated: updated
> viewed: viewed
> version: version
> also_pub_as: "Also published as: "
> no_date: n.d.
> no_place: n.p.
> date_formats:
>   month_year: yMMMM
>   day_month_year: to_long_s
>   date_time: to_long_s
> ordinal_keys: []
> OrdinalRules: digits-ordinal
> edition: edition
> edition_ordinal: "{{ var1 | ordinal_num: '', '' }} edition"
> draft: "draft %"
> editor:
>   sg: ed.
>   pl: eds.
> qq-open: <em>
> qq-close: </em>
> q-open:
> q-close:
> stage:
>   valid: Valid
>   withdrawn: Withdrawn
> extent:
>   page:
>     sg: "p. %"
>     pl: "pp. %"
>   volume:
>     sg: "vol. %"
>     pl: "vols. %"
>   issue:
>     sg: "no. %"
>     pl: "nos. %"
> size:
>   page:
>     sg: "% p."
>     pl: "% pp."
>   volume:
>     sg: "% vol."
>     pl: "% vols."
>   issue:
>     sg: "% no."
>     pl: "% nos."
> ```

### Fields

#### Document localization labels (`in`, `at`)

`in`: Used for showing containment relationships in series and journal references.

> [!NOTE]
> ```yaml
> in: in
> ```

> [!NOTE]
> ```liquid
> {{ labels['in'] | capitalize }}: {{ host_creatornames }} {{ labels['qq-open'] }}{{host_title}}{{ labels['qq-close'] }}
> ```
> Renders as:
> - "In: Smith, J. A. *Studies in Biology*"

`at`: Used to indicate location of an information resource, whether physical or electronic.

> [!NOTE]
> ```yaml
> at: at
> ```

> [!NOTE]
> ```liquid
> {{ labels['at'] | capitalize }}:_{{ access_location }}
> ```
> Renders as:
> - "At: https://example.com"
> - "At: Harvard Archives"

#### Conjunction labels (`and`, `author_and`)

`and`: Used to join multiple localities or elements in a citation.

> [!NOTE]
> ```yaml
> and: and
> ```

> [!NOTE]
> ```liquid
> {{ page }} {{ labels['and'] }} {{ volume }}
> ```
> Renders as:
> - "pp. 23-45 and Vol. 2"

`author_and`: Used specifically for joining author names in the contributors list.

> [!NOTE]
> ```yaml
> author_and: and
> ```

> [!NOTE]
> ```liquid
> {{ surname[0] }}, {{ given[0] }} {{ labels['author_and'] }} {{ surname[1] }}, {{ given[1] }}
> ```
> Renders as:
> - "Smith, John and Jones, Mary"

#### Date labels (`updated`, `viewed`, `no_date`)

`updated`: Indicates when an information resource was last updated.

> [!NOTE]
> ```yaml
> updated: updated
> ```

> [!NOTE]
> ```liquid
> {{ labels['updated'] | capitalize }}:_{{ date_updated }}
> ```
> Renders as:
> - "Updated: 2023-06-01"

`viewed`: Shows when an online resource was last accessed.

> [!NOTE]
> ```yaml
> viewed: viewed
> ```

> [!NOTE]
> ```liquid
> [{{ labels['viewed'] }}:_{{ date_accessed }}]
> ```
> Renders as:
> - "[Viewed: 2023-07-15]"

`no_date`: Used when no date is available.

> [!NOTE]
> ```yaml
> no_date: n.d.
> ```

> [!NOTE]
> ```liquid
> {% if date %}{{ date }}{% else %}{{ labels['no_date'] }}{% endif %}
> ```
> Renders as:
> - "[n.d.]"

#### Location labels (`no_place`)

`no_place`: Used when no place of publication is available.

> [!NOTE]
> ```yaml
> no_place: n.p.
> ```

> [!NOTE]
> ```liquid
> {% if place %}{{ place }}{% else %}{{ labels['no_place'] }}{% endif %}
> ```
> Renders as:
> - "[n.p.]"

#### Version labels (`version`)

`version`: Used for indicating version numbers, particularly in software citations.

> [!NOTE]
> ```yaml
> version: version
> ```

> [!NOTE]
> ```liquid
> {{ labels['version'] | capitalize }}_{{ edition_raw }}
> ```
> Renders as:
> - "Version 2.1"

#### Publication labels (`also_pub_as`)

`also_pub_as`: Used to indicate alternative publications of the same work.

> [!NOTE]
> ```yaml
> also_pub_as: "Also published as: "
> ```

> [!NOTE]
> ```liquid
> {{ labels['also_pub_as'] }}{{ host_title }}
> ```
> Renders as:
> - "Also published as: Conference proceedings"

#### Editorial labels (`editor`, `edition`)

`editor`: Provides singular and plural forms for editor attribution.

The following sub-keys are supported:

`sg`: Singular form of editor label (e.g., "ed.")
`pl`: Plural form of editor label (e.g., "eds.")

> [!NOTE]
> ```yaml
> editor:
>   sg: ed.
>   pl: eds.
> ```

> [!NOTE]
> ```liquid
> {% if contributors.size == 1 %}
>   {{ surname[0] }}, {{ given[0] }} ({{ labels['editor'].sg }})
> {% else %}
>   {{ surname[0] }}, {{ given[0] }} {{ labels['author_and'] }} {{ surname[1] }}, {{ given[1] }} ({{ labels['editor'].pl }})
> {% endif %}
> ```
> Renders as:
> - "Smith, J. (ed.)"
> - "Smith, J. and Jones, M. (eds.)"

`edition`: Used for edition statements.

> [!NOTE]
> ```yaml
> edition: edition
> ```

> [!NOTE]
> ```liquid
> {{ labels['edition'] | case_up }} {{ edition_num }}
> ```
> Renders as:
> - "Edition 2"

`edition_ordinal`: Used for ordinal edition statements.

> [!NOTE]
> ```yaml
> edition_ordinal: "{{ var1 | ordinal_num: '', '' }} edition"
> ```

> [!NOTE]
> ```liquid
> {{ edition_num | ordinal_num: '', '' }} {{ labels['edition'] }}
> ```
> Renders as:
> - "2nd edition"


#### Draft label (`draft`)

`draft`: Used for draft version statements.

> [!NOTE]
> ```yaml
> draft: "draft %"
> ```

> [!NOTE]
> ```liquid
> {{ labels['draft'] | replace: '%', '3' }}
> ```
> Renders as:
> - "draft 3"

#### Status labels (`stage`)

`stage`: Provides status indicators for documents.
The following sub-keys are supported:

`valid`: Label used to indicate a valid status (e.g., "Valid")
`withdrawn`: Label used to indicate a withdrawn status (e.g., "Withdrawn")

> [!NOTE]
> ```yaml
> stage:
>   valid: Valid
>   withdrawn: Withdrawn
> ```

> [!NOTE]
> ```liquid
> Status: {{ labels['stage'].valid }}
> Status: {{ labels['stage'].withdrawn }}
> ```
> Renders as:
> - "Status: Valid"
> - "Status: Withdrawn"

#### Extent and size labels (`extent`, `size`)

`extent`: Provides formatted labels for extent indicators.
The following sub-keys are supported:

`page`:
`sg`: Format for single page (e.g., "p. %")
`pl`: Format for multiple pages (e.g., "pp. %")

`volume`:
`sg`: Format for single volume (e.g., "vol. %")
`pl`: Format for multiple volumes (e.g., "vols. %")

`issue`:
`sg`: Format for single issue (e.g., "no. %")
`pl`: Format for multiple issues (e.g., "nos. %")

> [!NOTE]
> ```yaml
> extent:
>   page:
>     sg: "p. %"
>     pl: "pp. %"
>   volume:
>     sg: "vol. %"
>     pl: "vols. %"
>   issue:
>     sg: "no. %"
>     pl: "nos. %"
> ```

> [!NOTE]
> ```liquid
> {% assign pg = labels['extent'].page %}
> {% if page contains '-' %}{{ pg.pl | replace: '%', page }}{% else %}{{ pg.sg | replace: '%', page }}{% endif %}
> ```
> Renders as:
> - "p. 45"
> - "pp. 23-45"
> - "vol. 3"

`size`: Provides formatted labels for size indicators.
The following sub-keys are supported:

`page`:
`sg`: Format for single page (e.g., "% p.")
`pl`: Format for multiple pages (e.g., "% pp.")

`volume`:
`sg`: Format for single volume (e.g., "% vol.")
`pl`: Format for multiple volumes (e.g., "% vols.")

`issue`:
`sg`: Format for single issue (e.g., "% no.")
`pl`: Format for multiple issues (e.g., "% nos.")

> [!NOTE]
> ```yaml
> size:
>   page:
>     sg: "% p."
>     pl: "% pp."
>   volume:
>     sg: "% vol."
>     pl: "% vols."
>   issue:
>     sg: "% no."
>     pl: "% nos."
> ```

> [!NOTE]
> ```liquid
> {% assign pg = labels['size'].page %}
> {% if page contains '-' or page > 1 %}{{ page }}{{ pg.pl }}{% else %}{{ page }}{{ pg.sg }}{% endif %}
> ```
> Renders as:
> - "234 pp."
> - "2 vols."


#### Quotation marks (`qq-open`, `qq-close`, `q-open`, `q-close`)

Primary and secondary quotation marks are defined in labels, and subject to
internationalization.

Primary quotation marks:
Open: `{{ labels['qq-open'] }}`
Close: `{{ labels['qq-close'] }}`

Secondary quotation marks:
Open: `{{ labels['q-open'] }}`
Close: `{{ labels['q-close'] }}`

| Script name | ISO 15924 code | `qq-open`, `qq-close` | `q-open`, `q-close` |
|-------------|----------------|----------------------|--------------------|
| Latin | `Latn` | `<em>`, `</em>` | _None_ |
| Cyrillic | `Cyrl` | `<em>`, `</em>` | _None_ |
| Traditional Chinese | `Hant` | `《`, `》` | `〈`, `〉` |
| Simplified Chinese | `Hans` | `「`, `」` | `『`, `』` |
| Japanese | `Jpan` | `「`, `」` | `『`, `』` |
| Korean | `Kore` | `"`, `"` | `'`, `'` |

> [!NOTE]
> The `<em>` formatting in Relaton Render comes from BasicText (Metanorma)
> XML tags.

If these are used, they need not to be space-delimited from what they quote.

> [!NOTE]
> ```liquid
> {{ labels['qq-open'] }}{{ title }}{{ labels['qq-close'] }}
> ```
> This renders the `title` field enclosed in the primary quotation marks defined
> for that locale, for instance:
> - In Latin script: "<em>Introduction to Programming</em>"
> - In Traditional Chinese: "《程序設計概論》"
> - In Japanese: "「プログラミング入門」"

#### Ordinal labels (`ordinal_keys`, `OrdinalRules`)

`ordinal_keys`: A list of keys that are used to determine which fields should be
rendered as ordinal numbers.

`OrdinalRules`: A string that defines the rules for rendering ordinal numbers.

> [!NOTE]
> ```yaml
> ordinal_keys: []
> OrdinalRules: digits-ordinal
> ```

> [!NOTE]
> ```liquid
> {{ edition_num | ordinal_num: '', '' }}
> ```
> This renders the `edition_num` field as an ordinal number, for instance:
> - "1st"
> - "2nd"
> - "3rd"

#### Date format labels (`date_formats`)

`date_formats`: A map of date formats used in the citation style.

Syntax:

```yaml
date:
  default: {format} <1>
  month_year: {format} <2>
  day_month_year: {format} <3>
  date_time: {format} <4>
```

- <1> Default date format
- <2> Format for month and year
- <3> Format for day, month and year
- <4> Format for date and time

Where:

`format`: One of the date format values as listed below.

`to_full_s`: Full date format with day, month, and year
`to_long_s`: Long format with month and year
`to_medium_s`: Medium format with month and day
`to_short_s`: Short format with month and day
`{valid-format-string}`: Custom date format string

> [!NOTE]
> ```yaml
> date_formats:
>   month_year: yMMMM
>   day_month_year: to_long_s
>   date_time: to_long_s
> ```

> [!NOTE]
> ```liquid
> {{ date }}
> ```
> This renders the `date` field according to the date format defined in the
> `date_formats` map, for instance:
> - "June 2023"
> - "June 1, 2023"
> - "June 1, 2023 12:00:00"


## Information resource templates

Relaton Render uses a set of templates to define the citation format for
different types of information resources.

Each template is defined as a string that contains Liquid rendering expressions
and plain text, which are rendered as is or replaced with corresponding values
from the Relaton bibliographic object.

Syntax:

```yaml
template:
  article: # ... <1>
  book: # ...
  misc: # (required) <2>
```

- <1> The template for an information resource type.
- <2> The template for a miscellaneous information resource. This is used
as the default template for all information resources that do not have a
specific template defined.

> [!NOTE]
> ```yaml
> template:
>   book: "{{ creatornames }} ({{role]]) . {{labels['qq-open']}}{{ title }}{{labels['qq-close']}} [{{medium}}] . {{ edition | capitalize_first }}."
>   article: "{{ creatornames }} ({{role]]) . {{labels['q-open']}}{{ title }}{{labels['q-close']}}. {{ series }} [{{medium}}]"
> ```

> [!NOTE]
> ```yaml
> template:
>   book: "{{ creatornames }} ({{role]]) . {{labels['qq-open']}}{{ title }}{{labels['qq-close']}} [{{medium}}] . {{ edition | capitalize_first }}. ({{ series }}.] {% if place %}{{place}}{%else%}{{ labels['no_place']}}{%endif%}: {{publisher}}. {{date}}. {{ labels['updated'] | capitalize }}:_{{date_updated}}. {{ authoritative_identifier | join: '. ' }}. {{ other_identifier | join: '. ' }}. {{ uri }}. {{ labels['at'] | capitalize}}:_{{ access_location }}. [{{ labels['viewed'] }}:_{{date_accessed}}]. {{size}}. {{extent}}."
>     # TODO: omitted: author ids, subsidiary titles, subsidiary creators, rights metadata, distributor, item attributes, relationships
>   booklet: book
>   manual: book
>   proceedings: book
>   inbook: "{{ creatornames }} ({{role]]) . {{labels['q-open']}}{{ title }}{{labels['q-close']}} . {{ labels['in'] | capitalize }}: {{ host_creatornames}} ({{ host_role]]) : {{labels['qq-open']}}{{host_title}}{{labels['qq-close']}} [{{medium}}] . {{ edition | capitalize_first }}. ({{ series }}.] {% if place %}{{place}}{%else%}{{ labels['no_place']}}{%endif%}: {{publisher}}. {{date}}. {{size}}. {{extent}}. {{ labels['updated'] | capitalize }}:_{{date_updated}}. {{ authoritative_identifier | join: '. ' }}. {{ other_identifier | join: '. ' }}. {{ uri }}. {{ labels['at'] | capitalize}}:_{{ access_location }}. [{{ labels['viewed'] }}:_{{date_accessed}}]."
>   inproceedings: inbook
>   incollection: inbook
>     # TODO: omitted: author ids, additional info for component part, subsidiary titles of host resource, rights metadata, distributor, relationships
>   journal: "{{labels['qq-open']}}{{ title}}{{labels['qq-close']}} [{{medium}}] . {{ edition | capitalize_first }}. {{place}}: {{publisher}}. {{date}}. {{size}}. {{extent}}. {{ authoritative_identifier | join: '. ' }}. {{ other_identifier | join: '. ' }}. {{ uri }}. {{ labels['at'] | capitalize}}:_{{ access_location }}. [{{ labels['viewed'] }}:_{{date_accessed}}]."
>     # TODO subsidiary titles, rights metadata, item attributes, relationships
>   article: "{{ creatornames }} ({{role]]) . {{labels['q-open']}}{{ title }}{{labels['q-close']}}. {{ series }} [{{medium}}] . {{ edition | capitalize_first }}. {{size}}. {{ extent }}. {{place}}: {{publisher}}. {{date}}. {{ labels['updated'] | capitalize }}:_{{date_updated}}. {{ authoritative_identifier | join: '. ' }}. {{ other_identifier | join: '. ' }}. {{ uri }}. {{ labels['at'] | capitalize}}:_{{ access_location }}. [{{ labels['viewed'] }}:_{{date_accessed}}]."
>     # TODO: omitted: author ids, subsidiary titles, rights metadata, distributor, item attributes, relationships; newspapers
>   software: "{{ creatornames }} ({{ role]]) . {{labels['qq-open']}}{{ title }}{{labels['qq-close']}} . {{ labels['version'] | capitalize }}_{{ edition_raw }}. {{medium | capitalize}}. {{place}}: {{publisher}}. {{date}}. {{ labels['updated'] | capitalize }}:_{{date_updated}}. {{ authoritative_identifier | join: '. ' }}. {{ other_identifier | join: '. ' }}. {{ uri }}. {{size}}. {{ extent}}. [{{ labels['viewed'] }}:_{{date_accessed}}]. "
>     # TODO: omitted: author ids, subsidiary titles, subsidiary creators, copyright, license, distributor, system requirements, relationships
>   electronic resource:  software
>   standard: "{{ creatornames }} ({{ role]]) . {{ authoritative_identifier | join: '|' }}: {{labels['qq-open']}}{{ title }}{{labels['qq-close']}} . {{ medium | capitalize }}. {{ edition | capitalize_first }}. {{ place }}: {{ publisher }}. {{date}}. {{size}}. {{ extent }}. {{ other_identifier | join: '. ' }}. {{ uri }}. {{ labels['at'] | capitalize}}:_{{ access_location }}. [{{ labels['viewed'] }}:_{{date_accessed}}]."
>     # TODO: omitted: author ids, subsidiary titles, rights metadata, distributor, persistent identifier, item attributes, relationships
>   techreport: standard
>   dataset: "{{ creatornames }} ({{ role }}) . {{labels['qq-open']}}{{ title }}{{labels['qq-close']}} . {{ labels['version'] | capitalize }}_{{ edition_raw }}. {{medium | capitalize }}. {{ labels['in'] | capitalize }}:_{{series}}. {{date}}. {{ labels['updated'] | capitalize }}:_{{date_updated}}. {{ authoritative_identifier | join: '. ' }}. {{ other_identifier | join: '. ' }}. {{ uri }}. {{ size }}. {{ extent}}. [{{ labels['viewed'] }}:_{{date_accessed}}]. "
>     # TODO: omitted: author ids, system requirements, host archive, copyright, license, data source, distributor, usage instructions, relationships, provenance
>   website: "{{ creatornames }} ({{ role }}) . {{labels['qq-open']}}{{ title }}{{labels['qq-close']}} . {{ labels['version'] | capitalize }}_{{ edition_raw }}. {{medium | capitalize }}. {{ place }}: {{ publisher }}. {{date}}. {{ labels['updated'] | capitalize }}:_{{date_updated}}. {{ authoritative_identifier | join: '. ' }}. {{ other_identifier | join: '. ' }}. {{ uri }}. [{{ labels['viewed'] }}:_{{date_accessed}}]. "
>     # TODO: omitted: author ids, page title, system requirements, subsidiary creator, rights metadata, distributor, persistent identifier, archive location, archive date and time, relationships
>   webresource: website
>     # TODO: component part
>   unpublished: "{{ creatornames }} ({{ role }}) . {{labels['qq-open']}}{{ title }}{{labels['qq-close']}} . {{ medium | capitalize }}. {{ date }}. {{ labels['at'] | capitalize}}:_{{ access_location }}.  {{ authoritative_identifier | join: '. ' }}. {{ other_identifier | join: '. ' }}. {{ uri }}. [{{ labels['viewed'] }}:_{{date_accessed}}]."
>     # TODO: omitted: author ids, subsidiary titles, subsidiary creators, host archive, item attributes, relationships
>   presentation: unpublished
>   thesis: "{{ creatornames }} ({{ role }}) . {{labels['qq-open']}}{{ title }}{{labels['qq-close']}} . {{ medium | capitalize }}. {{ place }}: {{ publisher }}. {{ date }}. {{ labels['at'] | capitalize}}:_{{ access_location }}. {{ authoritative_identifier | join: '. ' }}. {{ other_identifier | join: '. ' }}. {{ uri }}. [{{ labels['viewed'] }}:_{{date_accessed}}]."
>   misc:  "{{ creatornames }} ({{ role }}) . {{labels['qq-open']}}{{ title }}{{labels['qq-close']}} . {{ date }}. {{ uri }}."
>   # following are # unsupported types:
>   map: misc
>   audiovisual: misc
>   film: misc
>   video: misc
>   broadcast: misc
>   graphic_work: misc
>   music: misc
>   performance: misc
>   patent: misc
>   archival: misc
>   social_media: misc
>   alert: misc
>   message: misc
>   conversation: misc
>   internal: misc
> ```
</div>
