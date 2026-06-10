---
title: Citation guide for ETSI publications
flavor: ETSI
description: Cite ETSI Standards
---

## Introduction

The [European Telecommunications Standards Institute](https://www.etsi.org)
(ETSI) produces globally-applicable standards for Information and Communications
Technologies (ICT), including fixed, mobile, radio, broadcast, internet, and
aeronautical technologies.

## Relaton components

- [Relaton implementation](https://github.com/relaton/relaton-etsi)
- [Relaton data](https://github.com/relaton/relaton-data-etsi)
- [Information model](https://github.com/relaton/relaton-model-etsi)

## Document types

ETSI publishes the following document types:

- `EN` — European Standard
- `ES` — ETSI Standard
- `EG` — ETSI Guide
- `TS` — Technical Specification
- `GS` — Group Specification
- `GR` — Group Report
- `TR` — Technical Report
- `ETR` — ETSI Technical Report
- `GTS` — GSM Technical Specification
- `SR` — Special Report
- `TCRTR` — Technical Committee Reference Technical Report
- `TBR` — Technical Basis for Regulation
- `ETS` — European Telecommunication Standard
- `I-ETS` — Interim European Telecommunication Standard
- `NET` — Norme Européenne de Télécommunication

## Prefix

The prefix for ETSI standards is `ETSI` followed by the document type
abbreviation.

> `ETSI GS ZSM 012 V1.1.1`

> `ETSI EN 300 220-1 V3.1.1`

> `ETSI TS 102 361-1 V1.12.1`

## Retrieval examples

```ruby
require 'relaton-etsi'

item = RelatonEtsi::Bibliography.get("ETSI GS ZSM 012 V1.1.1")
item = RelatonEtsi::Bibliography.get("ETSI EN 300 220-1 V3.1.1")
```

```
$ relaton fetch "ETSI GS ZSM 012 V1.1.1" --format yaml
$ relaton fetch "ETSI EN 300 220-1 V3.1.1" --format xml
```
