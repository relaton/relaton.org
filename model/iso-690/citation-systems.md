---
title: ISO 690 Citation Systems
description: The five citation systems defined by ISO 690:2021 for linking in-text citations to their bibliographic references, plus persistent reference strategies for web resources.
---

# Citation Systems and Persistent References

ISO 690 defines five citation systems — different methods for linking a mention in the text to its corresponding entry in the reference list. All five share the same reference list structure; they differ in how in-text citations are formatted and how the reference list is ordered.

## Reference List Ordering

Regardless of which citation system is used, ISO 690 defines rules for alphabetical reference lists:

1. A creator's own writings precede resources they cited or edited
2. Single-creator entries precede multi-creator entries beginning with the same name
3. Multiple entries by a single creator are ordered chronologically (earliest first)
4. Multi-creator entries with the same first creator follow single-creator entries
5. Corporate creators are alphabetized by the first significant word
6. Alternative orderings are allowed if applied consistently

Special cases allow title-first ordering (for classified lists), area-first ordering (for maps), or title-first ordering (for films and audiovisual materials).

---

## 1. Name-Date (Harvard) System

The most widely used system in the sciences and social sciences.

**In-text:** Creator surname + year in parentheses. When the name occurs naturally, only the year is parenthesized. Page numbers may follow the year.

```
(Crane 1972)
Crane (1972) argues that...
(Crane 1972, pp. 23–25)
```

Same creator + same year: distinguished by lowercase letters — `(Crane 1972a)`, `(Crane 1972b)`.

**Reference list:** Alphabetical by surname, year immediately following.

**Example reference list entry:**
```
CRANE, D., 1972. Invisible Colleges. Chicago: University of Chicago Press.
```

## 2. Numeric System

Common in engineering, physics, and standards documents.

**In-text:** A number (superscript, parentheses, or brackets) referring to the entry in order of first citation. Once assigned, a reference keeps its number throughout.

```
sciences [26]
Stieg [13, p. 556]
```

**Reference list:** Arranged in numerical order of first citation.

## 3. Named Tag System

Author-chosen alphanumeric labels serving as both citation markers and reference list keys.

**In-text:**
```
[INV]
[ISO44001]
[HISTNEEDS, p. 556]
```

All citations of the same resource use the identical tag throughout.

**Reference list:** Alphabetical by tag name.

This system is particularly natural for standards documents, where references are cited by their document identifier (e.g., `[ISO 19115-1:2014]`).

## 4. Running Notes (Footnote/Endnote) System

Used in the humanities and legal documents.

**In-text:** Superscript number referring to a footnote or endnote, numbered in order of appearance.

Notes may contain full references or short-form references ("Crane, op. cit., p. 23"). Multiple sources may be cited in a single note. Earlier-cited resources may be referenced by their note number.

The first note should explain all abbreviations used (ibid., op. cit., loc. cit., etc.).

Running notes typically do not use a separate reference list — all bibliographic details appear in the notes themselves.

## 5. Implied System

The document identifier itself serves as the citation, without additional markers.

**In-text:** The identifier appears directly in running text:

```
As specified in ISO 44001:2017...
A successful example can be found in IETF RFC 3113.
```

**Reference list:** Logical order by document identifier, optionally grouped by category. This system is common in standards, where publications are cited by their PubID.

**Exclusive implied list example:**
```
ISO 8601-1:2019, Data elements and interchange formats...
ISO 8601-2:2019, Data elements and interchange formats...
CC 18012, CalConnect...
IETF RFC 3339, Date and Time on the Internet...
NIST SP 800-90B, Recommendation for the Entropy Sources...
```

The implied system can be combined with other systems: implicit references may follow the other system's ordering, be grouped separately, or appear in a dedicated bibliography.

---

## Relaton's Support for All Five Systems

[relaton-render](/software/relaton-render) supports all five citation systems through configurable templates:

| Flavor | Primary System | Notes |
|---|---|---|
| ISO, IEC | Named tag / Implied | References cited by document identifier |
| IETF | Named tag / Implied | RFCs cited by number: `[RFC 8446]` |
| ITU | Named tag | Recommendations cited by identifier |
| NIST | Name-date / Numeric | Depends on NIST document series |
| BIPM | Numeric | Brochure references numbered sequentially |

The underlying Relaton data model is the same regardless of rendering — a single `BibliographicItem` can be rendered in any citation style.

---

## Persistent References to Web Resources

ISO 690 Annex B addresses a critical problem: **link rot** (the link returns 404) and **content drift** (the content has changed). URLs are not reliable long-term identifiers. The standard provides four strategies:

### 1. Persistent Identifier (PID) Systems

PIDs (DOI, Handle, ARK) provide registration and resolution services. They protect against link rot but may not protect against content drift — a DOI for a newspaper homepage resolves to the current (changed) content.

PIDs should always be used when available. However, if a specific version is needed, a web archive URI should be used instead.

### 2. Permanent Link Systems

Services like PURL and Perma.cc issue persistent URLs that redirect to the current location.

**URL shorteners (bit.ly, etc.) shall NOT be used** because they lack persistence, do not function in web archives, and have unknown support lifespans.

Permanent links may be used only if: the resource has one, the system is sustainable, and the reference also includes an archived copy and viewing date.

### 3. Web Citation Services

Archive a resource and provide an identifier. Example:

```
Available from: https://www.theguardian.com/...
Archived copy available from: WebCite [distributor],
  http://www.webcitation.org/5Kt3PxfFl
  [archived 2006-12-04T19:19:45Z] [viewed 2019-02-28].
```

References using web citation services should also contain the original URI for searching other archives if the service fails.

### 4. Web Archives

Services like the Internet Archive harvest and preserve web resources. Key guidance:

- An archived copy should be cited if: the resource is no longer available, the resource is dynamic, or there is a need to ensure no link rot or content drift
- Choose the copy that best fits the purpose (most liberal access, most sustainable)
- If no archived copy exists, **create one** — Internet Archive for free access, national web archives for legal deposit
- Internet Archive applies `robots.txt` bans retrospectively — a previously archived page may disappear
- Only the archival copy actually used should be cited, not copies from other archives
- If accuracy matters, specify relevant component parts separately (images may not be harvested simultaneously with text)

**Relaton's approach:** The model supports all four strategies through typed URIs (`uri.citation`, `uri.xml`) and date tracking (`date.accessed`). The auto-fetch mechanism resolves PIDs to retrieve structured metadata.

---
