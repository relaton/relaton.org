---
layout: doc
sidebar: false
outline: false
title: Relaton API
---

<div class="page-header">
<h1>Relaton API</h1>
<p class="page-subtitle">Fetch structured bibliographic data for standards documents via HTTP.</p>
</div>

::: warning Early Access
The Relaton API is in early access. Some queries may return errors or incomplete results. Feedback welcome at the [GitHub repository](https://github.com/relaton/api.relaton.org).
:::

## About the API

The Relaton API provides HTTP access to the same bibliographic data that the Ruby gems fetch locally. Given a publication identifier (e.g., `RFC 8446`, `ISO 690:2021`), it returns a structured XML record with complete metadata — title, contributors, dates, identifiers, relations, and flavor-specific extensions.

The API is read-only and requires no authentication.

## Endpoint

```
GET https://api.relaton.org/api/v1/document
```

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `code` | string (required) | The publication identifier to look up (e.g., `RFC 8446`, `ISO 690:2021`, `ITU-T G.989.2`) |
| `year` | string | Year of publication (e.g., `2010`) |
| `all_parts` | boolean | If `true`, fetches all parts of a multi-part standard (default: `false`) |
| `keep_year` | boolean | If `true`, keeps the year in the identifier even when a newer edition exists (default: `false`) |

## Response Format

The API returns Relaton XML — a structured bibliographic record following the [Relaton XML schema](/model/serializations). Example response for `RFC 8446`:

```xml
<bibdata type="standard">
  <title format="text/plain" language="en" script="Latn">
    The Transport Layer Security (TLS) Protocol Version 1.3
  </title>
  <docidentifier type="IETF">RFC 8446</docidentifier>
  <docidentifier type="DOI">10.17487/RFC8446</docidentifier>
  <date type="published">
    <on>2018-08</on>
  </date>
  <contributor>
    <role type="author"/>
    <person>
      <name>
        <completename language="en">E. Rescorla</completename>
      </name>
      <affiliation>
        <organization>
          <name>Internet Engineering Task Force</name>
        </organization>
      </affiliation>
    </person>
  </contributor>
</bibdata>
```

## Supported Organizations

The API supports all 28 Relaton flavors — 26 standards organizations plus DOI and ISBN identifier systems:

ISO, IEC, IETF, ITU (T/D/R), NIST, BIPM, 3GPP, IEEE, W3C, CalConnect, OGC, IHO, OASIS, CIE, OMG, UN, GB, CCSDS, IANA, XSF, IEV, DOI, ISBN, and more.

For the full list with data sources, see the [Flavors page](/flavors/).

## Rate Limits

The API is provided as a public service for standards development. Please use responsibly — cache results locally when possible, and avoid bulk queries in tight loops.

## Try It

Enter a publication identifier below to see the response:

<ApiDemo />
