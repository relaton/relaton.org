---
layout: ../../layouts/Docs.astro
title: Citation Styles
description: How to write CitationStyle definitions — the data packs that drive Relaton's plain-text citation rendering.
---

# Writing CitationStyle definitions

A CitationStyle is a **data pack**: one YAML file that fully describes how
Relaton renders citations and references in a given style. The rendering
engine (`relaton-render`) holds no styles of its own — it is a generic
evaluator of packs — so defining a style means authoring a pack, never
writing rendering code.

This guide walks through authoring a pack properly. The complete,
normative authoring specification — including the template grammar and
the delta merge semantics — is
[docs/citation-style-pack.adoc](https://github.com/relaton/relaton-render/blob/main/docs/citation-style-pack.adoc)
in the `relaton-render` repository.

## The laws

1. **Models are ISO 690.** The Relaton bibitem is the single data
   substrate for every style. There are no APA models or Chicago models —
   a style never changes what data is stored, only how it presents.
2. **A style is one encapsulated pack.** Name forms, locale strings,
   templates, per-resource-type patterns: everything the style knows
   lives in the file.
3. **The field vocabulary is a superset of CSL-JSON**, extended with the
   standards-specific concepts CSL lacks (designations, typed stages,
   home-document splits, bilingual forms).
4. **Engines hold zero styles.** Canonical packs (`author-date`, `apa`,
   `chicago`, `mla`, `ieee-sa`, `lncs`, JIS) ship beside the engine as
   data; your pack is consumed the same way.
5. **No Liquid, no code.** Templates use a declarative chunk grammar.
   Packs are data: they validate and render identically in Ruby,
   `relaton-ts`, and the CF Workers API.

## Where packs live

| Source | Example |
|---|---|
| Engine canonical styles | `author-date`, `apa`, `chicago`, `mla`, `ieee-sa`, `lncs`, `jis-en`, `jis-ja` — referenced by name |
| Flavor packs | each Metanorma flavor ships its own instance (`iso-style.yml`, `itu-style.yml`, …) wired through its `bibrenderer` |
| Any YAML path | every API and CLI entry point accepts a path, so a custom pack needs no release |

## Pack anatomy

A pack is one YAML document. The skeleton, with real fragments from the
shipped [`mla` pack](https://github.com/relaton/relaton-render/blob/main/lib/relaton/render/iso690/styles/mla.yml):

```yaml
name: "MLA (9th edition) Works Cited"
family: mla
scheme:
  system: name-date
  nameForm:
    initials: false          # full given names, MLA style
    invertedAll: false       # only the first author inverts
    listStyle: serial        # the serial comma at every gap
    etalCount: 3             # three or more authors…
    etalDisplay: 1           # …collapse to the first plus "et al."
  locale:
    "in": "in"
    labels:
      "and": "and"
      oxford_comma: ","
templates:
  titleOpen: "\""
  titleClose: "\""
  citation: "{{surname}}"    # MLA's in-text cite carries the author alone
  reference: "{{creator}}. {{title}}. {{edition}}. {{series}}. {{production}}, {{date}}. {{extent}}."
  name: "{{surname}}, {{givenNames}}"
perType:
  - type: monograph
    title: "<em>{{title}}</em>"
    template: "{{creator}}. {{title}}. {{edition}}. {{production}}, {{date}}. {{extent}}."
sortKey:
  - attribute: creator
  - attribute: date
```

The four sections do the work:

- **`scheme`** — the citation system (`name-date`, `numeric`,
  `designation`) and the name form. The name form carries every knob of
  creator presentation: initials and their punctuation, inversion,
  capitalization, editor markers, the list join style (`serial` puts the
  oxford comma at every gap, including between two names), and the
  et-al truncation thresholds for the bibliography and the in-text cite.
- **`locale`** — the style's strings: connectives (`and`, `in`), labels
  (`et al.` is the `others` label, roman by default — a pack wanting
  emphasis sets it with its own markup), punctuation, edition ordinals,
  extent units.
- **`templates`** — chunk strings: `{{slot}}` fields and literal text.
  The evaluator swallows a literal when it separates two absent fields,
  pairs parenthetical groups and drops them whole, collapses stacked
  separators, and applies the style's terminator — so you write the
  style as it reads when everything is present, and absent elements
  take their punctuation with them.
- **`perType`** — one pattern per resource kind (`monograph`, `report`,
  `continuing`, `component_part`, …). A pattern is not a reordered book
  template: it carries its own title/series slot forms (italics for
  self-contained works, quotation marks for parts), its own `short`
  cite, and its own fallbacks. Standards-producing styles split one kind
  two ways with `home: true` — a designation-led pattern for the home
  document, a full form for everything else.

Slots resolve to the ISO 690 model presentations: `creator`, `title`,
`edition`, `series`, `production` (the place/publisher group), `date`,
`extent`, `identifier`, `size`, `access`, and the name fields
(`surname`, `givenNames`). Flavor-specific presentation rules (ITU
identifiers, NIST series publishers, IEEE access slots) are
engine-registered and selected from the pack as named rules — never
flavor Ruby.

## The authoring workflow

1. **Declare the pack.** Start from the closest canonical style
   (`extends: <pack>` for a delta, or a self-contained instance for a
   genuinely new style). Deltas merge per type key and per label; the
   base's other patterns survive.
2. **Load it.** Every entry point accepts a path, so the pack is
   testable before it ships anywhere:

   ```ruby
   require "relaton/render"
   model = Relaton::Bib::Item.from_xml(xml)

   Relaton::Render::Iso690::Renderer.render(model, style: "path/to/my-style.yml")
   # => "Author, First. <em>Title</em>. Publisher, 2026."
   Relaton::Render::Iso690::Renderer.citation(model, style: "path/to/my-style.yml")
   # => "Author"
   ```

   Unknown keys fail at load — the pack cannot silently mis-render.
3. **Pin the manual's forms.** Each canonical pack carries conformance
   examples derived from its owning manual (MLA's from the MLA Handbook,
   IEEE-SA's from the Standards Style Manual, Chicago's from CMOS), in
   `spec/iso690/canonical_styles_spec.rb`. A new pack adds its own: one
   example per declared pattern, expected string first.
4. **Join the corpus.** The shared
   [citation-testsuite](https://github.com/relaton/citation-testsuite)
   renders the same records in every house style — add your family to
   the goldens and both executors (Ruby and `relaton-ts`) render the
   matrix on CI.
5. **Ship.** Canonical packs ship beside the engine in
   `relaton-render/lib/relaton/render/iso690/styles/`; flavor packs ship
   in the flavor gem; a personal pack ships nowhere — a path is enough.

## Using a style

From Ruby:

```ruby
Relaton::Render::Iso690::Renderer.render(item, style: "chicago")
Relaton::Render::Iso690::Renderer.citation(item, style: "mla")
```

From the CLI:

```sh
relaton convert my-item.xml -f citation --style mla
```

From Metanorma: each flavor's `bibrenderer` already names its pack, and
the compile-level `relatonrenderconfig` accepts a style path — a
document or deployment can swap styles without code.

## Reference

- The complete authoring specification (pack format, template grammar,
  delta merge semantics, the promotion backlog):
  [citation-style-pack.adoc](https://github.com/relaton/relaton-render/blob/main/docs/citation-style-pack.adoc)
- Shipped packs:
  [relaton-render/lib/relaton/render/iso690/styles/](https://github.com/relaton/relaton-render/tree/main/lib/relaton/render/iso690/styles)
- The corpus:
  [relaton/citation-testsuite](https://github.com/relaton/citation-testsuite)
