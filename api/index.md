---
layout: page
outline: false
title: Relaton API
---

<div class="page-header">
<h1>Relaton API</h1>
<p class="page-subtitle">Fetch structured bibliographic data for standards documents via HTTP.</p>
</div>

## About the API

The Relaton API provides HTTP access to the same bibliographic data that the Ruby gems fetch locally. Given a publication identifier (e.g., `ISO 690:2010`, `RFC 8446`), it returns a structured XML record with complete metadata — title, contributors, dates, identifiers, relations, and flavor-specific extensions.

The API is read-only and requires no authentication.

## Endpoint

```
GET https://api.relaton.org/api/v1/bibliography
```

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `q` | string (required) | The publication identifier to look up (e.g., `ISO 690:2010`, `RFC 8446`, `ITU-T G.989.2`) |
| `all_parts` | boolean | If `true`, fetches all parts of a multi-part standard (default: `false`) |
| `keep_year` | boolean | If `true`, keeps the year in the identifier even when a newer edition exists (default: `false`) |

## Response Format

The API returns Relaton XML — a structured bibliographic record following the [Relaton XML schema](/model/serializations). Example response for `ISO 690:2010`:

```xml
<bibitem type="standard" id="ISO690-2010">
  <title>Information and documentation — Guidelines for
    bibliographic references and citations to information resources</title>
  <docidentifier type="ISO">ISO 690:2010</docidentifier>
  <date type="published">
    <on>2010</on>
  </date>
  <contributor>
    <role type="publisher"/>
    <organization>
      <name>International Organization for Standardization</name>
    </organization>
  </contributor>
  <edition>2</edition>
</bibitem>
```

## Supported Organizations

The API supports all 28 Relaton flavors — 26 standards organizations plus DOI and ISBN identifier systems:

ISO, IEC, IETF, ITU (T/D/R), NIST, BIPM, 3GPP, IEEE, W3C, CalConnect, OGC, IHO, OASIS, CIE, OMG, UN, GB, DOI, ISBN, ISSN, OGC, XSF, IEV, and more.

For the full list with data sources, see the [Flavors page](/flavors/).

## Rate Limits

The API is provided as a public service for standards development. Please use responsibly — cache results locally when possible, and avoid bulk queries in tight loops.

## Try It

Enter a publication identifier below to see the response:

<ApiDemo />
