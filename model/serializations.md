---
title: Serializations
description: Relaton BibliographicItem rendered in YAML, XML, BibTeX, AsciiBib, and JSON-LD
---

# Serializations

The Relaton Information Model supports five serialization formats, each suited to different workflows. Below, the same BibliographicItem — ISO&nbsp;690:2010 — is shown in each format.

## Format Comparison

| Format | Use Case | File Extension |
|---|---|---|
| **Relaton YAML** | Primary interchange; human-readable, editable | `.yaml` |
| **Relaton XML** | Canonical serialization; schema-validatable | `.xml` |
| **BibTeX** | Integration with LaTeX workflows | `.bib` |
| **AsciiBib** | Embedding in AsciiDoc documents | `.rxl` |
| **JSON-LD** | Linked data and web API applications | `.jsonld` |

## Relaton YAML

The primary serialization format. Relaton YAML is used in Metanorma documents and by relaton-cli for import/export.

```yaml
id: ISO 690:2010
title:
  - content: Information and documentation
    language: en
    script: Latn
  - content: Guidelines for bibliographic references and citations to information resources
    language: en
    script: Latn
type: standard
docid:
  id: ISO 690:2010
  type: ISO
date:
  - type: published
    value: '2010'
contributor:
  - organization:
      name: International Organization for Standardization
    role:
      - publisher
edition: "2"
```

[Relaton YAML spec &rarr;](/specs/relaton-yaml)

## Relaton XML

The canonical serialization, used for schema validation and as the interchange format between Relaton gems.

```xml
<bibitem type="standard" id="ISO690-2010">
  <title>Information and documentation
    -- Guidelines for bibliographic references
    and citations to information resources</title>
  <docidentifier type="ISO">ISO 690:2010</docidentifier>
  <date type="published">
    <on>2010</on>
  </date>
  <contributor>
    <role type="publisher"/>
    <organization>
      <name>International Organization
        for Standardization</name>
    </organization>
  </contributor>
  <edition>2</edition>
</bibitem>
```

## BibTeX

For integration with LaTeX and traditional bibliography management tools.

```bibtex
@standard{ISO690_2010,
  type = {standard},
  title = {Information and documentation
    -- Guidelines for bibliographic references
    and citations to information resources},
  number = {ISO 690:2010},
  year = {2010},
  edition = {2},
  publisher = {International Organization
    for Standardization}
}
```

## AsciiBib

A line-oriented format designed for embedding bibliographic entries directly in AsciiDoc documents. Each field is a key-value pair on its own line, using brackets for nested attributes.

```asciidoc
id:: ISO 690:2010
title:: Information and documentation
  -- Guidelines for bibliographic references
  and citations to information resources
type:: standard
docid[number]:: ISO 690:2010
docid[type]:: ISO
date[published]:: 2010
contributor[role=publisher]::
contributor.organization.name::
  International Organization
  for Standardization
edition:: 2
```

[AsciiBib spec &rarr;](/specs/asciibib)

## JSON-LD

For linked data applications and web APIs. Provides JSON-native access to all model fields with semantic linking.

```json
{
  "@context": "https://relaton.org/context.jsonld",
  "id": "ISO 690:2010",
  "type": "standard",
  "title": [
    {
      "content": "Information and documentation -- Guidelines for bibliographic references and citations to information resources",
      "language": "en",
      "script": "Latn"
    }
  ],
  "docid": [
    {
      "id": "ISO 690:2010",
      "type": "ISO"
    }
  ],
  "date": [
    {
      "type": "published",
      "value": "2010"
    }
  ],
  "contributor": [
    {
      "organization": {
        "name": "International Organization for Standardization"
      },
      "role": ["publisher"]
    }
  ],
  "edition": "2"
}
```

## Converting Between Formats

The `relaton-cli` gem provides conversion commands:

```bash
# YAML to XML
relaton yaml2xml references.yaml

# XML to YAML
relaton xml2yaml references.xml

# Fetch and convert
relaton fetch "ISO 690:2010" --format yaml
relaton fetch "ISO 690:2010" --format xml
relaton fetch "ISO 690:2010" --format bibtex
```

[CLI reference &rarr;](/software/relaton-cli)
