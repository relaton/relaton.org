---
title: "NIST CyberSecurity White Paper PubID scheme change and mapping"
date: 2023-08-23
authors:
  - "Ronald Tse"
description: "With the adoption of the latest NIST PubID 1.0 scheme, the NIST Library has retroactively applied the scheme to CSWPs. This post provides the mapping."
---

<BlogByline />

## General

NIST has now officially adopted the
[NIST PubID 1.0 scheme](https://www.nist.gov/system/files/documents/2022/04/01/PubID_Syntax_NIST_TechPubs.pdf),
which describes a clever publication identifier across all NIST Technical Publications.

More background information on the NIST PubID can be found on this
[Metanorma blog post](https://www.metanorma.org/blog/2022-01-09-nist-pubid/).

NIST Cyber Security White Papers (CSWP) are cybersecurity-related documents that
represent latest research or a consensus-based expert topic. A number of
important publications, such as the NIST Cyber Security Framework,
the NIST Privacy Framework, are all published as CSWPs.

In the past, CSWP PubIDs utilize the date string `ddmmyyyy` as their unique
identifier. This usage is also reflect in the PubID 1.0 document itself.

Very recently, the NIST Research Library decided that CSWPs are to be
represented with a sequential number for each publication, possibly in response
to some CSWPs having been published on the same date.

> **Previous NIST CSWP PubID scheme conflicted when publication dates are identical**
>
> The "NIST Privacy Framework" (old PubID "NIST CSWP 01162020") and
> "Case Studies in Cyber Supply Chain Risk Management: Observations from Industry"
> (old PubID "NIST CSWP 02042020-2") were both published on the same day, leading
> to a non-unique PubID.

As a result, the old CSWP PubIDs have been replaced with a new assignment.
Since the assignment was a manual one, an old-to-new mapping becomes necessary.

> **NIST Cyber Security Framework 1.0 was `NIST CSWP 02122014` now `NIST CSWP 4`**
>
> The NIST Cyber Security Framework 1.0 originally had the PubID "NIST CSWP 02122014",
> and is now been assigned "NIST CSWP 4".

> **NIST Privacy Framework was `NIST CSWP 01162020` now `NIST CSWP 10`**
>
> The NIST Privacy Framework originally had the PubID "NIST CSWP 01162020",
> and is now been assigned "NIST CSWP 10".

## CSWP PubID mapping: old to new

Relaton users who have been citing or referencing CSWPs using the previous
CSWP PubID syntax will somewhat be in confusion when learning about the change
of their CSWP's PubID -- how will I know what the new CSWP PubID is, since
the IDs are sequentially assigned manually?

Here comes the rescue!

[James Foti](https://www.nist.gov/people/james-foti) of the NIST ITL Cyber
Security Division is one of the authors of the NIST PubID 1.0 scheme.
He has graciously provided a mapping table for those who have cited the old
CSWP PubIDs to the new CSWP PubIDs.

When using the latest versions of Relaton, please utilize the new PubID to
refer to CSWP documents.

Thank you Jim!

| PubID (old PubID) | Stage | Status | Date | New DOI (old DOI) | Title |
|---|---|---|---|---|---|
| NIST CSWP 1 *(was: NIST CSWP 02122014)* | Final | Published | 2/12/2014 | [10.6028/NIST.CSWP.1](https://doi.org/10.6028/NIST.CSWP.1) *(was: [10.6028/NIST.CSWP.02122014](https://doi.org/10.6028/NIST.CSWP.02122014))* | Framework for Improving Critical Infrastructure Cybersecurity, Version 1.0 |
| NIST CSWP 2 *(was: NIST CSWP 02192014)* | Final | Published | 2/19/2014 | [10.6028/NIST.CSWP.2](https://doi.org/10.6028/NIST.CSWP.2) *(was: [10.6028/NIST.CSWP.02192014](https://doi.org/10.6028/NIST.CSWP.02192014))* | Summary of NIST SP 800-53, Revision 4: Security and Privacy Controls for Federal Information Systems and Organizations |
| NIST CSWP 3 *(was: NIST CSWP 06032014)* | Final | Withdrawn | 6/3/2014 | [10.6028/NIST.CSWP.3](https://doi.org/10.6028/NIST.CSWP.3) *(was: [10.6028/NIST.CSWP.06032014](https://doi.org/10.6028/NIST.CSWP.06032014))* | Supplemental Guidance on Ongoing Authorization: Transitioning to Near Real-Time Risk Management |
| NIST CSWP 4 *(was: NIST CSWP 04212016)* | Final | Published | 4/21/2016 | [10.6028/NIST.CSWP.4](https://doi.org/10.6028/NIST.CSWP.4) *(was: [10.6028/NIST.CSWP.04212016](https://doi.org/10.6028/NIST.CSWP.04212016))* | Best Practices for Privileged User PIV Authentication |
| NIST CSWP 5 *(was: NIST CSWP 01262018)* | Final | Published | 1/26/2018 | [10.6028/NIST.CSWP.5](https://doi.org/10.6028/NIST.CSWP.5) *(was: [10.6028/NIST.CSWP.01262018](https://doi.org/10.6028/NIST.CSWP.01262018))* | Security Considerations for Code Signing |
| NIST CSWP 6 *(was: NIST CSWP 04162018)* | Final | Published | 4/16/2018 | [10.6028/NIST.CSWP.6](https://doi.org/10.6028/NIST.CSWP.6) *(was: [10.6028/NIST.CSWP.04162018](https://doi.org/10.6028/NIST.CSWP.04162018))* | Framework for Improving Critical Infrastructure Cybersecurity, Version 1.1 |
| NIST CSWP 7 *(was: NIST CSWP 09102018)* | Final | Published | 9/10/2018 | [10.6028/NIST.CSWP.7](https://doi.org/10.6028/NIST.CSWP.7) *(was: [10.6028/NIST.CSWP.09102018](https://doi.org/10.6028/NIST.CSWP.09102018))* | Transitioning to the Security Content Automation Protocol (SCAP) Version 2 |
| NIST CSWP 8 *(was: NIST CSWP 04222019)* | Final | Published | 4/22/2019 | [10.6028/NIST.CSWP.8](https://doi.org/10.6028/NIST.CSWP.8) *(was: [10.6028/NIST.CSWP.04222019](https://doi.org/10.6028/NIST.CSWP.04222019))* | BowTie - A deep learning feedforward neural network for sentiment analysis |
| NIST CSWP 9 ipd *(was: NIST CSWP 07092019-draft)* | IPD | Withdrawn | 7/9/2019 | [10.6028/NIST.CSWP.9.ipd](https://doi.org/10.6028/NIST.CSWP.9.ipd) *(was: [10.6028/NIST.CSWP.07092019-draft](https://doi.org/10.6028/NIST.CSWP.07092019-draft))* | A Taxonomic Approach to Understanding Emerging Blockchain Identity Management Systems |
| NIST CSWP 9 *(was: NIST CSWP 01142020)* | Final | Published | 1/14/2020 | [10.6028/NIST.CSWP.9](https://doi.org/10.6028/NIST.CSWP.9) *(was: [10.6028/NIST.CSWP.01142020](https://doi.org/10.6028/NIST.CSWP.01142020))* | A Taxonomic Approach to Understanding Emerging Blockchain Identity Management Systems |
| NIST CSWP 10 *(was: NIST CSWP 01162020)* | Final | Published | 1/16/2020 | [10.6028/NIST.CSWP.10](https://doi.org/10.6028/NIST.CSWP.10) *(was: [10.6028/NIST.CSWP.01162020](https://doi.org/10.6028/NIST.CSWP.01162020))* | NIST Privacy Framework: A Tool for Improving Privacy Through Enterprise Risk Management, Version 1.0 |
| NIST CSWP 11 *(was: NIST CSWP 02042020-1)* | Final | Published | 2/4/2020 | [10.6028/NIST.CSWP.11](https://doi.org/10.6028/NIST.CSWP.11) *(was: [10.6028/NIST.CSWP.02042020-1](https://doi.org/10.6028/NIST.CSWP.02042020-1))* | Case Studies in Cyber Supply Chain Risk Management: Summary of Findings and Recommendations |
| NIST CSWP 11A *(was: NIST CSWP 02042020-2)* | Final | Published | 2/4/2020 | [10.6028/NIST.CSWP.11A](https://doi.org/10.6028/NIST.CSWP.11A) *(was: [10.6028/NIST.CSWP.02042020-2](https://doi.org/10.6028/NIST.CSWP.02042020-2))* | Case Studies in Cyber Supply Chain Risk Management: Anonymous Consumer Electronics Company |
| NIST CSWP 11B *(was: NIST CSWP 02042020-3)* | Final | Published | 2/4/2020 | [10.6028/NIST.CSWP.11B](https://doi.org/10.6028/NIST.CSWP.11B) *(was: [10.6028/NIST.CSWP.02042020-3](https://doi.org/10.6028/NIST.CSWP.02042020-3))* | Case Studies in Cyber Supply Chain Risk Management: Anonymous Consumer Goods Company |
| NIST CSWP 11C *(was: NIST CSWP 02042020-4)* | Final | Published | 2/4/2020 | [10.6028/NIST.CSWP.11C](https://doi.org/10.6028/NIST.CSWP.11C) *(was: [10.6028/NIST.CSWP.02042020-4](https://doi.org/10.6028/NIST.CSWP.02042020-4))* | Case Studies in Cyber Supply Chain Risk Management: Anonymous Renewable Energy Company |
| NIST CSWP 11D *(was: NIST CSWP 02042020-5)* | Final | Published | 2/4/2020 | [10.6028/NIST.CSWP.11D](https://doi.org/10.6028/NIST.CSWP.11D) *(was: [10.6028/NIST.CSWP.02042020-5](https://doi.org/10.6028/NIST.CSWP.02042020-5))* | Case Studies in Cyber Supply Chain Risk Management: Mayo Clinic |
| NIST CSWP 11E *(was: NIST CSWP 02042020-6)* | Final | Published | 2/4/2020 | [10.6028/NIST.CSWP.11E](https://doi.org/10.6028/NIST.CSWP.11E) *(was: [10.6028/NIST.CSWP.02042020-6](https://doi.org/10.6028/NIST.CSWP.02042020-6))* | Case Studies in Cyber Supply Chain Risk Management: Palo Alto Networks, Inc. |
| NIST CSWP 11F *(was: NIST CSWP 02042020-7)* | Final | Published | 2/4/2020 | [10.6028/NIST.CSWP.11F](https://doi.org/10.6028/NIST.CSWP.11F) *(was: [10.6028/NIST.CSWP.02042020-7](https://doi.org/10.6028/NIST.CSWP.02042020-7))* | Case Studies in Cyber Supply Chain Risk Management: Seagate Technology |
| NIST CSWP 12 ipd *(was: NIST CSWP 04012020-draft)* | IPD | Withdrawn | 4/1/2020 | [10.6028/NIST.CSWP.12.ipd](https://doi.org/10.6028/NIST.CSWP.12.ipd) *(was: [10.6028/NIST.CSWP.04012020-draft](https://doi.org/10.6028/NIST.CSWP.04012020-draft))* | Methodology for Characterizing Network Behavior of Internet of Things Devices |
| NIST CSWP 13 *(was: NIST CSWP 04232020)* | Final | Withdrawn | 4/23/2020 | [10.6028/NIST.CSWP.13](https://doi.org/10.6028/NIST.CSWP.13) *(was: [10.6028/NIST.CSWP.04232020](https://doi.org/10.6028/NIST.CSWP.04232020))* | Mitigating the Risk of Software Vulnerabilities by Adopting a Secure Software Development Framework (SSDF) |
| NIST CSWP 14 ipd *(was: NIST CSWP 04282020-draft)* | IPD | Withdrawn | 4/28/2020 | [10.6028/NIST.CSWP.14.ipd](https://doi.org/10.6028/NIST.CSWP.14.ipd) *(was: [10.6028/NIST.CSWP.04282020-draft](https://doi.org/10.6028/NIST.CSWP.04282020-draft))* | Hardware-Enabled Security for Server Platforms: Enabling a Layered Approach to Platform Security for Cloud and Edge Computing Use Cases |
| NIST CSWP 15 ipd *(was: NIST CSWP 05262020-draft)* | IPD | Withdrawn | 5/26/2020 | [10.6028/NIST.CSWP.15.ipd](https://doi.org/10.6028/NIST.CSWP.15.ipd) *(was: [10.6028/NIST.CSWP.05262020-draft](https://doi.org/10.6028/NIST.CSWP.05262020-draft))* | Getting Ready for Post-Quantum Cryptography: Explore Challenges Associated with Adoption and Use of Post-Quantum Cryptographic Algorithms |
| NIST CSWP 16 ipd *(was: NIST CSWP 09082020-draft)* | IPD | Published | 9/8/2020 | [10.6028/NIST.CSWP.16.ipd](https://doi.org/10.6028/NIST.CSWP.16.ipd) *(was: [10.6028/NIST.CSWP.09082020-draft](https://doi.org/10.6028/NIST.CSWP.09082020-draft))* | Trusted Internet of Things (IoT) Device Network-Layer Onboarding and Lifecycle Management |
| NIST CSWP 17 ipd *(was: NIST CSWP 10012020-draft)* | IPD | Published | 10/1/2020 | [10.6028/NIST.CSWP.17.ipd](https://doi.org/10.6028/NIST.CSWP.17.ipd) *(was: [10.6028/NIST.CSWP.10012020-draft](https://doi.org/10.6028/NIST.CSWP.10012020-draft))* | Securing Data Integrity Against Ransomware Attacks: Using the NIST Cybersecurity Framework and NIST Cybersecurity Practice Guides |
| NIST CSWP 15 *(was: NIST CSWP 04282021)* | Final | Published | 4/28/2021 | [10.6028/NIST.CSWP.15](https://doi.org/10.6028/NIST.CSWP.15) *(was: [10.6028/NIST.CSWP.04282021](https://doi.org/10.6028/NIST.CSWP.04282021))* | Getting Ready for Post-Quantum Cryptography: Exploring Challenges Associated with Adopting and Using Post-Quantum Cryptographic Algorithms |
| NIST CSWP 18 ipd *(was: NIST CSWP 05142021-draft)* | IPD | Published | 5/14/2021 | [10.6028/NIST.CSWP.18.ipd](https://doi.org/10.6028/NIST.CSWP.18.ipd) *(was: [10.6028/NIST.CSWP.05142021-draft](https://doi.org/10.6028/NIST.CSWP.05142021-draft))* | Establishing Confidence in IoT Device Security: How do we get there? |
| NIST CSWP 19 ipd *(was: NIST CSWP 06222021-draft)* | IPD | Published | 6/22/2021 | [10.6028/NIST.CSWP.19.ipd](https://doi.org/10.6028/NIST.CSWP.19.ipd) *(was: [10.6028/NIST.CSWP.06222021-draft](https://doi.org/10.6028/NIST.CSWP.06222021-draft))* | Combinatorial Coverage Difference Measurement |
| NIST CSWP 20 ipd *(was: NIST CSWP 08042021-draft)* | IPD | Published | 8/4/2021 | [10.6028/NIST.CSWP.20.ipd](https://doi.org/10.6028/NIST.CSWP.20.ipd) *(was: [10.6028/NIST.CSWP.08042021-draft](https://doi.org/10.6028/NIST.CSWP.08042021-draft))* | Planning for a Zero Trust Architecture: A Starting Guide for Administrators |
| NIST CSWP 21 *(was: NIST CSWP 09292021)* | Final | Published | 9/29/2021 | [10.6028/NIST.CSWP.21](https://doi.org/10.6028/NIST.CSWP.21) *(was: [10.6028/NIST.CSWP.09292021](https://doi.org/10.6028/NIST.CSWP.09292021))* | Benefits of an Updated Mapping between the NIST Cybersecurity Framework and the NERC Critical Infrastructure Protection Standards |
| NIST CSWP 22 ipd *(was: NIST CSWP 12062021-draft)* | IPD | Published | 12/6/2021 | [10.6028/NIST.CSWP.22.ipd](https://doi.org/10.6028/NIST.CSWP.22.ipd) *(was: [10.6028/NIST.CSWP.12062021-draft](https://doi.org/10.6028/NIST.CSWP.12062021-draft))* | Combination Frequency Differencing |
| NIST CSWP 23 *(was: NIST CSWP 02042022-1)* | Final | Published | 2/4/2022 | [10.6028/NIST.CSWP.23](https://doi.org/10.6028/NIST.CSWP.23) *(was: [10.6028/NIST.CSWP.02042022-1](https://doi.org/10.6028/NIST.CSWP.02042022-1))* | Recommended Criteria for Cybersecurity Labeling of Consumer Software |
| NIST CSWP 24 *(was: NIST CSWP 02042022-2)* | Final | Published | 2/4/2022 | [10.6028/NIST.CSWP.24](https://doi.org/10.6028/NIST.CSWP.24) *(was: [10.6028/NIST.CSWP.02042022-2](https://doi.org/10.6028/NIST.CSWP.02042022-2))* | Recommended Criteria for Cybersecurity Labeling for Consumer Internet of Things (IoT) Products |

## Conclusion

The recent change in NIST CSWP PubID references highlights the strong need
in PubID stability, and the importance of getting PubIDs defined correctly
early on.

Changing the PubID scheme at the authoritative source is never an easy task and
similarly creates challenges for users.

It is important for the organization that changes PubIDs to provide some
mapping from the old PubID to the new PubID so that users can understand how
the references changed.
