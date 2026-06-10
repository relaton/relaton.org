---
title: Citation guide for CIE standards
flavor: CIE
description: Cite CIE standards
---

## Introduction

The [International Commission on Illumination](https://cie.co.at) (CIE) is
the international standards body for light, lighting, and colour science.
CIE publications are widely referenced in lighting design, colorimetry,
and visual ergonomics.

## Relaton components

- [Relaton implementation](https://github.com/relaton/relaton-cie)
- [Relaton data](https://github.com/relaton/relaton-data-cie)

## Prefix

The prefix for CIE standards is `CIE`.

> `CIE 209:2014`

> `CIE 241:2020`

## Co-published standards

CIE co-publishes some standards with ISO. These use the `CIE ISO` prefix.

> `CIE ISO 11664-5:2016`

## Retrieval examples

```ruby
require 'relaton-cie'

item = RelatonCie::CieBibliography.get("CIE 209:2014")
item = RelatonCie::CieBibliography.get("CIE 241")
```

```
$ relaton fetch "CIE 209:2014" --format yaml
$ relaton fetch "CIE 241" --format xml
```
