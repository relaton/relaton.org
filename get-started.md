---
title: Getting Started
description: Install Relaton and fetch your first bibliographic record in under two minutes.
---

# Getting Started

Relaton is a Ruby gem ecosystem for fetching, storing, and rendering bibliographic data about standards documents. This guide walks you through installation and your first lookup.

## Prerequisites

- **Ruby 3.0+** — check with `ruby -v`
- **Bundler** (recommended) — `gem install bundler`

## Install

Install the core gem:

```bash
gem install relaton
```

Or add to your Gemfile:

```ruby
gem 'relaton'
```

## Your First Lookup

Fetch a bibliographic record by its publication identifier:

```ruby
require 'relaton'

bib = Relaton::Bibliography.get "ISO 690:2010"
puts bib.to_xml
```

Relaton recognizes the `ISO 690:2010` identifier, routes the query to the ISO flavor gem, and returns a structured `BibliographicItem` with full metadata — title, dates, contributors, identifiers, relations, and more.

## Fetch from Other Organizations

Relaton supports 26 standards organizations and 2 identifier systems. Use the same API:

```ruby
# IETF RFC
rfc = Relaton::Bibliography.get "RFC 8446"

# ITU Recommendation
itu = Relaton::Bibliography.get "ITU-T G.989.2"

# NIST Special Publication
nist = Relaton::Bibliography.get "NIST SP 800-188"

# DOI lookup
doi = Relaton::Bibliography.get "doi:10.1145/3448147"

# ISBN lookup
isbn = Relaton::Bibliography.get "ISBN 978-0-12-064481-0"
```

Each lookup returns a `BibliographicItem` with the same data model, regardless of source organization.

## Serialize to Different Formats

```ruby
bib = Relaton::Bibliography.get "ISO 690:2010"

# YAML (default)
puts bib.to_hash.to_yaml

# Relaton XML
puts bib.to_xml

# BibTeX
puts bib.to_bibtex

# AsciiBib
puts bib.to_asciibib
```

See [Serializations](/model/serializations) for format details.

## Use the CLI

The `relaton-cli` gem provides command-line access:

```bash
gem install relaton-cli

# Fetch and output in different formats
relaton fetch "ISO 690:2010" --format yaml
relaton fetch "ISO 690:2010" --format xml
relaton fetch "ISO 690:2010" --format bibtex

# Fetch and save to file
relaton fetch "ISO 690:2010" -o iso690.yaml
```

## Render Citations

The `relaton-render` gem formats bibliographic items for display:

```ruby
require 'relaton-render'

bib = Relaton::Bibliography.get "ISO 690:2010"
renderer = Relaton::Render::Iso::General.new
puts renderer.render(bib)
```

Each flavor provides its own rendering template that follows the organization's citation style.

## Data Model

Every `BibliographicItem` follows the same structure, derived from [ISO 690](/model/iso-690/):

- **Titles** — in multiple scripts and languages
- **Contributors** — persons and organizations with typed roles
- **Dates** — published, accessed, created, and more
- **Identifiers** — document IDs, DOIs, ISBNs, URIs
- **Relations** — replaces, amends, updates, derives, and 60+ more
- **Extensions** — flavor-specific fields per SDO

See the [full model documentation](/model/) for details on every entity.

## Flavor Gems

For direct access to a specific SDO's dataset, install the flavor gem:

```bash
gem install relaton-iso     # ISO
gem install relaton-iec     # IEC
gem install relaton-ietf    # IETF
gem install relaton-itu     # ITU
gem install relaton-nist    # NIST
gem install relaton-bipm    # BIPM
gem install relaton-3gpp    # 3GPP
```

See [all 33 gems](/software/) in the software catalog.

## What's Next

- [Model overview](/model/) — understand the BibliographicItem structure
- [ISO 690 guidelines](/model/iso-690/) — the bibliographic standard behind Relaton
- [Flavor extensions](/model/flavor-models) — per-organization model fields
- [Serializations](/model/serializations) — YAML, XML, BibTeX, AsciiBib, JSON-LD
