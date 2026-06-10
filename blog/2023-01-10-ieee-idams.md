---
title: "Support for IEEE IDAMS bibliographic data through the ieee-idams gem"
date: 2023-01-10
authors:
  - "Ronald Tse"
description: "Relaton now supports parsing IEEE IDAMS Exchange Format bibliographic data through the new ieee-idams Ruby gem."
---

<BlogByline />

## Introduction

The [Institute of Electrical and Electronics Engineers (IEEE)](https://www.ieee.org)
is the world's largest technical professional organization, producing over 200
standards and thousands of journal articles and conference papers each year.

IEEE publishes its bibliographic metadata in the **IEEE IDAMS Exchange Format**,
an XML-based format defined by a Document Type Definition (DTD) maintained by
IEEE Publishing Technology. This format is the authoritative source of
bibliographic data for all IEEE standards, journals, conferences, and books.

Relaton now supports this format through the
[**ieee-idams**](https://github.com/relaton/ieee-idams) gem, a Ruby library
that parses IEEE IDAMS Exchange data and maps it to the Relaton bibliographic
model.

## The IEEE IDAMS Exchange Format

The IDAMS Exchange Format is an XML schema that covers the full range of IEEE
publications, including:

- **Standards** — IEEE standards and amendments, with information on status,
  modification, sponsorship, and ICS codes.
- **Journal articles** — articles in IEEE journals, with volume, issue, and
  page number information.
- **Conference papers** — papers presented at IEEE conferences, including
  conference metadata.
- **Books** — IEEE-published books, including chapter-level metadata.
- **Multimedia** — audiovisual content published by IEEE.

The format has been refined over many years, with the current version
(Version 4.1, December 2022) incorporating significant enhancements.

## DTD enhancements in December 2022

In November 2022, Shirley Wisk of IEEE Publishing Technology announced a
new version of the IDAMS DTD, to be released in mid December 2022. The
enhancements included:

### Article model enhancements

1. **Updated Article Suppression element** — added an `Expression of Concern`
   attribute, allowing IEEE to formally mark articles that have been the subject
   of concerns.

2. **Article Sharing and Policy elements** — new elements for managing article
   sharing and associated policies, enabling support for open access mandates
   and repository deposit requirements.

3. **Article Supplement Badge attributes** — new attributes for badges including
   *Dataset-Replicated*, *Dataset-Reproducible*, *Code-Reproducible*, and
   *Code-Replicated*, reflecting the growing importance of reproducible research.

4. **Associated Article attributes** — new attributes for *Provenance-Paper*
   and *Multi-Part* relationships, along with a comment element, improving
   the tracking of article provenance and multi-part works.

### Book model enhancements

5. **Book Free-to-Read elements** — new elements and attributes for managing
   free-to-read access periods for books, with attributes for specific use
   type, start and end dates, and promotion type.

6. **Chapter Free-to-Read elements** — corresponding elements for chapters
   within books, enabling granular access control at the chapter level.

## The ieee-idams gem

The `ieee-idams` gem implements a comprehensive object model that maps every
element of the IDAMS XML format to Ruby objects. The library covers all
elements of the exchange format:

**Publication-level:**
- `Publication`, `PublicationInfo`, `PubModel`
- `PublicationAcronym`, `StandardBundle`, `StandardPackageSet`
- `PubSponsor`, `PubSponsoringCommitteeSet`, `PubTopicalBrowseSet`

**Article-level:**
- `Article`, `ArticleInfo`, `ArticleAbstract`
- `ArticleCopyright`, `ArticleDate`, `ArticleFilename`, `ArticlePageNums`

**Book/Volume-level:**
- `Volume`, `VolumeInfo`, `VolumeInfoIssue`, `VolumeNoteGroup`

**Contributor and identification:**
- `Author`, `AuthorGroup`, `Affiliation`, `AffiliationGroup`,
  `AffiliationAddress`, `Address`
- `Publisher`, `Copyright`, `CopyrightGroup`
- `Isbn`, `ProductNumber`

**Subject and content:**
- `IcsCodes`, `IcsCodeTerm`, `Keyword`, `KeywordSet`
- `ConfGroup`, `Multimedia`, `MultimediaComponent`, `MultimediaCompressed`

### Usage

The gem can be used directly in Ruby code:

```ruby
require 'ieee-idams'

# Parse a single publication record
record = Ieee::Idams::Publication.from_xml(
  File.read("publication.xml")
)
```

The parsed object can then be used within the Relaton ecosystem to generate
bibliographic records in any supported format.

## Why this matters

The ieee-idams gem provides Relaton users with access to the authoritative
bibliographic source for all IEEE publications. With this gem, you can:

1. **Look up IEEE standards** using their IEEE standard numbers.
2. **Generate accurate citations** for journal articles and conference papers.
3. **Access comprehensive metadata** including sponsorship, ICS codes, and
   publication history.

## Conclusion

The addition of IEEE IDAMS support through the `ieee-idams` gem brings the
IEEE corpus into the Relaton ecosystem, providing users with reliable,
standardized bibliographic data for all IEEE publications.

We encourage users to explore the gem, contribute to its development,
and provide feedback to help improve this resource for the community.

The gem is open source under the BSD 2-Clause license and is available on
[GitHub](https://github.com/relaton/ieee-idams).
