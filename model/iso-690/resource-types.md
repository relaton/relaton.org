---
title: ISO 690 Resource Types
description: ISO 690:2021 defines citation guidelines for 16 categories of information resources, each with specific element requirements.
---

# Resource Types

ISO 690 provides specific citation guidelines for 16 categories of information resources. The 14 general data elements apply to all types; the resource-type guidelines refine, add to, or supersede them. Elements marked as required must always appear when applicable; all others are optional.

The monographs element table (below) serves as the master template — all other types reference it, noting which elements are added, removed, or changed.

## Master Element Table (Monographs)

| Element | Status |
|---|---|
| Creator(s) | Required |
| Creator identity identifiers (ORCID, ISNI) | Optional |
| Title | Required |
| Medium designation | Required if not print |
| Subsidiary titles | Optional |
| Edition and version | Required if not first edition |
| Subsidiary creator | Optional |
| Series title and number | Required if part of a series |
| Place and publisher | Required |
| Date of publication | Required |
| Rights metadata | Optional |
| Date of update/revision | Required if available, for online |
| Standard identifier (ISBN, etc.) | Required if available |
| Distributor or online host | Required for electronic, if available |
| Persistent identifier (DOI, etc.) | Required if available |
| Location and access (URI) | Required for online without PID |
| Physical location | Required if limited copies |
| Relationships | Required if available |
| Date of citation (access date) | Required for dynamic resources |
| Other information | Optional |

## 1. Monographs

Books, reports, theses, and other standalone publications.

Follows the master element table directly. Variations:

- **E-books:** Specify edition/carrier/file format. If page numbers are absent, in-text citations may use paragraph numbers or section/chapter combinations.
- **Audiobooks:** Include narrator if mentioned. Duration may be in ISO 8601 (`P2H13M`) or human-readable form (`133 min.`).
- **Multi-volume works:** Give extent and separate revisers per volume.

## 2. Component Parts of Monographs

Chapters, contributions, poems cited within a standalone publication.

Has a **split structure**: elements for the component part, then "In:", then elements for the host item.

| Component Part Elements | Status |
|---|---|
| Creator(s) of component | Required |
| Title of component | Required |
| Additional info for component | Optional |
| **"In:"** | Required separator |
| Creator(s) of host | Required if known |
| Title of host | Required |
| Medium, edition, series, production, date | As applicable |
| Page number range of component | Required |
| Online elements (PID, URI, access date) | As applicable |

Locality should follow hierarchical navigation: `Schedule 1, c 35, Part 1, Clause 7`.

## 3. Continuing Resources (Serials)

Journals, newspapers, annual reports — publications issued in successive parts without a predetermined conclusion.

Two sub-tables: one for citing an entire serial or issue, one for a component part within a serial.

**Entire serial/issue:** Title is the first element (no creator required). Numeration is required if not citing the serial in general. ISSN is the standard identifier.

**Component part within a serial:** Opens with creator and title of the component, then title of the host serial (key title or abbreviated key title). The "In:" connector is not needed for journal articles. Numeration and page range are required.

For newspaper articles, publishing date replaces volume and issue.

## 4. Programs and Applications

Software, apps, operating systems, games.

Key differences from monographs:
- **No standard identifier** element (there is no ISBN for programs)
- License and copyright are separate optional elements
- System requirements are optional
- File size is required for large files
- Version must enable identification of the exact version for reproducibility

Creator is the organization or system designer. If no version-specific PID, URL may be used.

## 5. Cartographic Materials

Maps, atlases, globes, and spatial data.

**Additional required elements:**
- **Map series designation** — coded identifier for map sheets
- **Subject/area** — geographical names using the cartographer's contemporary frame (not present-day equivalents)
- **Scale** — as ratio (`1:50,000`), or "Scale not shown"
- **Size** — height × width in mm between neat lines; diameter for globes

Optional elements include projection, prime meridian, reference systems, spectral characteristics.

**Title preference order:** overprinted title → title panel → embedded metadata → grid/border → elsewhere.

## 6. Audiovisual Resources

Films, television, broadcasts, video recordings.

Key differences:
- **Content, medium, and/or carrier** is required (not just medium)
- **Edition** is always required (not just when not first)
- **Date of restoration/revision** is a type-specific element
- **Playback requirements** is optional

If no single dominant creator exists, title comes first. Principal performers may be included. For broadcasts, include date/time and transmitting organization.

**Persistent identifiers for AV:** URI fragments may specify time segments: `https://doi.org/10.xxxx#t=00:01:30,00:03:45`.

## 7. Graphic Works

Photographs, prints, drawings, paintings, sculptures, installations.

Key differences:
- Medium designation is always required (not conditional)
- **Size** (height × width in mm) is required
- Physical location comes before place/publisher
- **Catalogue and catalogue number** is an optional element

If the work is in a museum, location and register number are essential. For destroyed or temporary works, include surrogate information.

Roles may use Latin abbreviations: *fecit* (creator), *pinxit* (painter), *sculpsit* (sculptor), *lith.* (lithographer).

## 8. Music

Musical scores, recordings, compositions.

Key differences:
- **Title must include opus or catalogue number** when available (e.g., "BWV 565")
- Media type is required when present
- ISMN is the standard identifier for printed music (preferred over ISBN)
- Composer is the creator; librettist/lyricist is the first subsidiary creator

Bar numbers should not be cited unless printed on the score itself.

## 9. Patents

Patent applications and granted patents.

**Significantly different element table:**

| Element | Status |
|---|---|
| Patent applicant(s) | Required |
| Patent application country (ISO 3166-1 or WIPO ST3) | Required |
| Title | Required |
| Subsidiary creator (inventor, if not applicant) | Optional |
| Date of application (`Appl:`) | Required if present |
| Date of issuance (`Iss:`) | Required if present |
| Patent number | Required if present |
| Location, relationships, other info | As applicable |

No place/publisher, no medium, no edition, no series, no ISBN.

## 10. Reports

Technical reports, government documents, institutional publications, standards.

Similar to serial component parts — may cite a report "In:" a host report series.

### Standards (a major sub-category)

- **Undated references** cover the latest edition with amendments
- **Dated references** cover only that specific edition
- **"(inclusive)"** notation means all published corrigenda/amendments are included
- Jointly published standards: one body as primary publisher, identifiers separated by `|`
- Dual-published standards: cite the one used, or both if access differs
- **Draft standards:** DIS and FDIS may be cited; WD and CD shall not
- Multi-part standards: use set notation in identifier (`ISO 8601-{1,2}`); blanket reference uses "(all parts)"
- Adopted/translated standards: cite the national adoption, not the original

## 11. Archival Materials

Fonds, collections, series, files, items within archives.

Key differences:
- **Name of fonds/collection** is required
- **Name and location of host archive** is required
- No series title, no edition, no standard identifier
- Medium designation is always required
- No page ranges

Titles are often vague ("Correspondence"), so additional elements are important. Personal and organizational authors should be included when possible.

## 12. Research Datasets

Data files, databases, and research data.

Key differences:
- Medium designation is always required
- **Persistent identifier is required** (not just "if available")
- **"Data used"** is required if the dataset was post-processed
- File size is required for big data
- Host archive is required if applicable
- License, provenance, and linked resources are optional

The specific version/file format used must be cited. If only a subset was used, specify it (ideally via a query URL). Investigators, data managers, and compilers should include name identifiers (ORCID, ISNI).

## 13. Web Resources

Websites, web pages, online documents.

Key differences:
- **Page title and website title are both required**
- Version is required if versions exist
- Place/publisher is optional (not required)
- Date of publication is optional
- **Archive location and date** are type-specific optional elements

If citing a dynamic page at a specific version, an archived copy must be referenced. If no archived copy exists, one should be created. URL shorteners shall not be used.

## 14. Social Media

Posts, threads, profiles, tweets, forum messages, blog posts.

Key differences:
- **Poster name + social media identity** is required: `TRUMP, Donald J. [Twitter: @realDonaldTrump]`
- **Service name** is required: `[Facebook page]`, `[Tweet]`, `[blog post]`
- **Date and time** are both required (ISO 8601)
- Date viewed is required
- No place/publisher, no edition, no standard identifier

Status updates/tweets should NOT be italicized; standalone items (videos, albums) SHOULD be. If no words, supply a title description in brackets.

When original content is reposted by someone else, distinguish poster from original creator: "Original tweet from:" as a relationship label.

## 15. Unpublished Works

Manuscripts, preprints, dissertations, personal communications, phone calls, presentations.

Key differences:
- **Resource type** is required (unique to this category)
- Date of creation replaces date of publication
- Service or host archive is required if applicable
- No publisher, no edition, no series, no standard identifier

Personal communications include letters, emails, Skype messages, and phone calls. Dissertations include the resource type designation and institutional repository. Preprints carry a note like "Manuscript submitted for publication."

## 16. Preprints

Non-peer-reviewed manuscripts posted to preprint servers.

Distinguished from the final published version. Requires creator, title, preprint server, date, and DOI or URL. The preprint and published versions may differ significantly — the reference must reflect which was actually used.

## Relaton's Coverage

Relaton's `BibitemType` enumeration provides complete coverage, combining ISO 690 types with BibTeX entry types:

`article`, `book`, `booklet`, `manual`, `proceedings`, `presentation`, `thesis`, `techReport`, `standard`, `unpublished`, `map`, `electronicResource`, `audiovisual`, `film`, `video`, `broadcast`, `graphicWork`, `music`, `patent`, `inBook`, `inCollection`, `inProceedings`, `journal`, `webResource`, `website`, `dataset`, `archival`, `software`, `socialMedia`, `alert`, `message`, `conversation`, `misc`

The resource type drives rendering decisions — what fields to display, in what order, and with what formatting.
