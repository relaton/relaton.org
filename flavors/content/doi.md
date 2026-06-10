---
title: Citation guide for Digital Object Identifiers (DOI)
flavor: Digital Object Identifiers (DOI)
description: Cite standard metadata from CrossRef.org using DOI identifiers
---

## Introduction

The [DOI System](https://www.doi.org) provides persistent identifiers for
digital content. The Relaton DOI flavor resolves DOI identifiers to structured
bibliographic metadata via the [CrossRef API](https://www.crossref.org).

## Relaton components

- [Relaton implementation](https://github.com/relaton/relaton-doi)

## Prefix

To cite a document use a DOI prefixed with `doi:`.

> `doi:10.6028/nist.ir.8245`

> `doi:10.1109/5.771073`

The `relaton-doi` gem makes requests to the CrossRef API. It may take a few
seconds to retrieve metadata.
