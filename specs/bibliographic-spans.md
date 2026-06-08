---
title: Bibliographic Spans
description: The span:type[content] notation for encoding semantic bibliographic elements inline within Metanorma AsciiDoc bibliography entries.
---

# Bibliographic Spans

Bibliographic spans are a Metanorma-specific notation for encoding semantic bibliographic metadata directly within an AsciiDoc bibliography list item. They allow authors to annotate critical bibliographic information — creator names, titles, dates, identifiers — in a machine-readable way while maintaining human readability.

## Purpose

A typical pre-formatted reference is a single block of text:

```asciidoc
* [[[ref1,ISO 20483:2013]]], _Cereals and cereal products -- Determination of
  moisture content -- Reference method_
```

This is readable, but Metanorma cannot extract structured information from it — it doesn't know which part is the title, who the authors are, or what the document identifier is.

Bibliographic spans solve this by wrapping each piece of metadata in a typed macro: `span:type[content]`. The resulting entry is both human-readable and machine-parseable:

```asciidoc
* [[[ref1,1]]],
  span:surname[Wozniak], span:initials[S.],
  span:surname[Jobs], span:givenname[Steve],
  span:date.issued[1991].
  span:title[_Work_].
  span:pubplace[Geneva]:
  span:publisher[International Standardization Organization].
  span:type[inbook]
```

## Syntax

```
span:{span-type}[{content}]
```

- **span-type**: A dotted identifier indicating the kind of data (e.g., `surname`, `date.issued`, `docid.ISO`)
- **content**: The value, which may contain inline AsciiDoc formatting (italics, superscript, etc.)

Spans can appear in any order, separated by punctuation. Punctuation and formatting between spans are preserved for readability but are not processed by Metanorma — the rendering engine generates its own formatting based on the span data.

## Supported Span Types

### Creator Information

| Span | Description |
|---|---|
| `span:surname[text]` | Author surname. Must precede initials or given name for the same person |
| `span:initials[text]` | Author initials |
| `span:givenname[text]` | Author given (first) name |
| `span:fullname[text]` | Full name (surname parsed as last space-delimited word) |
| `span:organization[text]` | Corporate author |

After the first `surname` + `initials`/`givenname` pair, any subsequent `surname` begins a new contributor.

### Contributor Roles

Append a role to any creator span with a dot:

| Span | Description |
|---|---|
| `span:surname.editor[text]` | Editor surname |
| `span:initials.editor[text]` | Editor initials |
| `span:givenname.editor[text]` | Editor given name |
| `span:organization.distributor[text]` | Distributing organization |

Any role from Relaton's contributor role enumeration may be used: `author`, `editor`, `realizer`, `performer`, `translator`, `adapter`, `publisher`, `distributor`, `owner`, `authorizer`, `enabler`, `subject`.

### Containing Item Contributors

For in-book/in-proceedings/in-collection types, these spans identify the contributors of the *host* item:

| Span | Description |
|---|---|
| `span:in_surname[text]` | Host item author surname |
| `span:in_surname.editor[text]` | Host item editor surname |
| `span:in_initials.editor[text]` | Host item editor initials |
| `span:in_givenname.editor[text]` | Host item editor given name |
| `span:in_organization[text]` | Host item organization |

### Title and Description

| Span | Description |
|---|---|
| `span:title[text]` | Title of the cited resource |
| `span:in_title[text]` | Title of the containing resource |
| `span:series[text]` | Series title (for articles, the journal title) |
| `span:abstract[text]` | Abstract of the resource |
| `span:note[text]` | Generic note |
| `span:note.display[text]` | Note to be rendered with the entry |
| `span:note.display,editorial[text]` | Note with multiple types |

### Date

| Span | Description |
|---|---|
| `span:date[text]` | Date (untyped) |
| `span:date.issued[text]` | Issue date |
| `span:date.published[text]` | Publication date |
| `span:date.created[text]` | Creation date |
| `span:date.accessed[text]` | Last access date |

All dates use ISO 8601 format: `YYYY-MM-DD`.

### Identification

| Span | Description |
|---|---|
| `span:docid[text]` | Document identifier (untyped) |
| `span:docid.ISO[text]` | ISO identifier |
| `span:docid.IEC[text]` | IEC identifier |
| `span:docid.IETF[text]` | IETF identifier |
| `span:docid.DOI[text]` | DOI |
| `span:docid.ISBN[text]` | ISBN |
| `span:docid.ISSN[text]` | ISSN |

The identifier type corresponds to the SDO or identifier scheme. When used, the document identifier is set as both the display identifier and the lookup key for auto-fetching.

### Publication Details

| Span | Description |
|---|---|
| `span:publisher[text]` | Publisher name |
| `span:pubplace[text]` | Place of publication |
| `span:edition[text]` | Edition statement |
| `span:version[text]` | Version |

### Numeration

| Span | Description |
|---|---|
| `span:volume[text]` | Volume or volume range |
| `span:issue[text]` | Issue or issue range |
| `span:pages[text]` | Page or page range |

### URI and Access

| Span | Description |
|---|---|
| `span:uri[text]` | URI (untyped) |
| `span:uri.citation[text]` | Citation URI |

### Classification and Keywords

| Span | Description |
|---|---|
| `span:classification[text]` | Classification code |
| `span:classification.type[text]` | Classification of a specific type |
| `span:keyword[text]` | Keyword |

### Localization

| Span | Description |
|---|---|
| `span:language[text]` | Language code (ISO 639-2) |
| `span:script[text]` | Script code (ISO 15924) |
| `span:locale[text]` | Locale (IETF RFC 5646) |

### Document Type

| Span | Description |
|---|---|
| `span:type[text]` | Resource type from the Bibitem Types enumeration |

This field is **critical** when citing non-standard resources. The default type is `standard`, and most SDOs render standards with minimal metadata. If you are citing a `book`, `article`, `inbook`, or any other type, you must specify it — otherwise the rendering will be incorrect.

### Inline Images

An inline image included in the reference is interpreted as a depiction of the resource:

```asciidoc
span:title[Standard 123] image:thumbnail.jpg[]
```

## Important Rules

1. **Surname must come first** within each contributor. Use `span:surname[Fields], span:initials[W.C.]`, never the reverse. Rendering order is handled by the citation style.

2. **`span:fullname[]` has strict parsing** — the surname is the last space-delimited word. For compound surnames, use explicit `span:surname[]` instead.

3. **Multiple contributors** are separated by starting a new `surname` span after the previous one's `initials`/`givenname`.

4. **Punctuation between spans** is preserved for readability but replaced by Metanorma's rendering engine. The spans provide the data; the rendering provides the formatting.

5. **Bibliographic type must be specified** for non-standard resources using `span:type[]`. Without it, Metanorma assumes `standard` and may omit fields like author and publisher from the rendering.

## Complete Example

```asciidoc
* [[[A, B]]],
  span:surname[Wozniak], span:initials[S.],
  span:surname[Jobs], span:givenname[Steve], &
  span:surname[Hoover], span:initials[J.] span:givenname[Edgar].
  span:date.issued[1991].
  span:title[_Work_].
  In span:in_surname.editor[Gates], span:in_initials.editor[W. H] &
  span:in_organization[UNICEF],
  span:in_title[Collected Essays].
  _span:series[Bibliographers Anonymous]._
  span:docid.ISO[ISO 1234].
  span:pubplace[Geneva]:
  span:publisher[International Standardization Organization].
  span:uri.citation[http://www.example.com].
  vol. span:volume[5],
  pp. span:pages[2-21]
  span:type[inbook]
```

---

[Bibliographic spans in Metanorma](https://github.com/metanorma/metanorma-standoc) | [Relaton YAML spec](/specs/relaton-yaml) | [AsciiBib spec](/specs/asciibib)
