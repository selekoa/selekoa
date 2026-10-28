# Frontier safety frameworks compared across developers and editions

Candidate research pack outside application data. Machine-prepared and machine-audited; not editorially accepted; no human review. Prepared 2026-10-15. Scope and method: [scope.md](scope.md). Audit: [audit.md](audit.md). Quote checks: [verification.json](verification.json). Generated from `pack.json` by `tools.mjs render`; do not edit by hand.

## Overview

This pack sets 22 editions of 7 frontier safety frameworks from 6 developers against 8 comparison dimensions (18 facets). Each of the 396 cells holds either verbatim quotations from that edition with their locations (348 cells), a recorded search that found no such passage (41), or a note that the facet does not apply (7).

How to read it:

- Every filled cell is a verbatim quote from the edition named in its column, with a locator.
- "Not found" records the sections inspected and search terms; it is not proof of absence and not a claim that a provision was deleted.
- Categories are normalised; wording is not. A cell records what the edition states, not whether it was implemented, complied with or effective.
- No ranking or scoring of developers.
- Facet labels are Selekoa’s categories. They are worded so that they fit every edition; the wording inside quotation marks is always the edition’s own. A shared category does not mean that two developers’ provisions are equivalent.
- "Not found" means not found within the recorded scope and search terms, shown under each table. It is not a statement that the developer has no such practice.

### Editions covered

| Developer       | Framework                                             | Edition               | Date                 | Edition document                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------- | ----------------------------------------------------- | --------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anthropic       | Responsible Scaling Policy                            | v1.0                  | effective 2023-09-19 | [publisher address](https://www-cdn.anthropic.com/1adf000c8f675958c2ee23805d91aaade1cd4613/responsible-scaling-policy.pdf) · [archived](https://web.archive.org/web/20230919161730/https://www-files.anthropic.com/production/files/responsible-scaling-policy-1.0.pdf)                                                                                                                           |
| Anthropic       | Responsible Scaling Policy                            | v2.0                  | effective 2024-10-15 | [publisher address](https://www-cdn.anthropic.com/616dee633636e5bd309cb73aed8622e80fe47839.pdf) · [archived](https://web.archive.org/web/20241022154907/https://assets.anthropic.com/m/24a47b00f10301cd/original/Anthropic-Responsible-Scaling-Policy-2024-10-15.pdf)                                                                                                                             |
| Anthropic       | Responsible Scaling Policy                            | v2.1                  | effective 2025-03-31 | [publisher address](https://www-cdn.anthropic.com/17310f6d70ae5627f55313ed067afc1a762a4068.pdf) · [archived](https://web.archive.org/web/20250402134435/https://www-cdn.anthropic.com/17310f6d70ae5627f55313ed067afc1a762a4068.pdf)                                                                                                                                                               |
| Anthropic       | Responsible Scaling Policy                            | v2.2                  | effective 2025-05-14 | [publisher address](https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf) · [archived](https://web.archive.org/web/20250514223759/https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf)                                                                                                                                                               |
| Anthropic       | Responsible Scaling Policy                            | v3.0                  | effective 2026-02-24 | [publisher address](https://anthropic.com/responsible-scaling-policy/rsp-v3-0) · [archived](https://web.archive.org/web/20260224203046/https://www.anthropic.com/responsible-scaling-policy/rsp-v3-0)                                                                                                                                                                                             |
| Anthropic       | Responsible Scaling Policy                            | v3.1                  | effective 2026-04-02 | [publisher address](https://www-cdn.anthropic.com/files/4zrzovbb/website/bf04581e4f329735fd90634f6a1962c13c0bd351.pdf) · [archived](https://web.archive.org/web/20260407193305/https://www-cdn.anthropic.com/files/4zrzovbb/website/bf04581e4f329735fd90634f6a1962c13c0bd351.pdf)                                                                                                                 |
| Anthropic       | Responsible Scaling Policy                            | v3.2                  | effective 2026-04-29 | [publisher address](https://cdn.sanity.io/files/4zrzovbb/website/28c6241900d90410628a8a2003a5572faae4365a.pdf) · [archived](https://web.archive.org/web/20260505141510/https://cdn.sanity.io/files/4zrzovbb/website/28c6241900d90410628a8a2003a5572faae4365a.pdf)                                                                                                                                 |
| Anthropic       | Responsible Scaling Policy                            | v3.3                  | effective 2026-05-26 | [publisher address](https://cdn.sanity.io/files/4zrzovbb/website/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf) · [archived](https://web.archive.org/web/20260528170023/https://cdn.sanity.io/files/4zrzovbb/website/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf)                                                                                                                                 |
| Anthropic       | Responsible Scaling Policy                            | v3.4                  | effective 2026-07-08 | [publisher address](https://cdn.sanity.io/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf) · [archived](https://web.archive.org/web/20260710234036/https://cdn.sanity.io/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf)                                                                                                                                 |
| Google DeepMind | Frontier Safety Framework                             | v1.0                  | published 2024-05-17 | [publisher address](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/introducing-the-frontier-safety-framework/fsf-technical-report.pdf) · [archived](https://web.archive.org/web/20240517140902/https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/introducing-the-frontier-safety-framework/fsf-technical-report.pdf)                                               |
| Google DeepMind | Frontier Safety Framework                             | v2.0                  | published 2025-02-04 | [publisher address](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/updating-the-frontier-safety-framework/Frontier%20Safety%20Framework%202.0.pdf) · [archived](https://web.archive.org/web/20250205011727/https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/updating-the-frontier-safety-framework/Frontier%20Safety%20Framework%202.0.pdf)                       |
| Google DeepMind | Frontier Safety Framework                             | v3.0                  | published 2025-09-22 | [publisher address](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf) · [archived](https://web.archive.org/web/20250922134959/https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf)                             |
| Google DeepMind | Frontier Safety Framework                             | v3.1                  | published 2026-04-17 | [publisher address](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf) · [archived](https://web.archive.org/web/20260423021420/https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf)                         |
| OpenAI          | Preparedness Framework                                | Beta                  | published 2023-12-18 | [publisher address](https://cdn.openai.com/openai-preparedness-framework-beta.pdf) · [archived](https://web.archive.org/web/20231218195930/https://cdn.openai.com/openai-preparedness-framework-beta.pdf)                                                                                                                                                                                         |
| OpenAI          | Preparedness Framework                                | Version 2             | published 2025-04-15 | [publisher address](https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf) · [archived](https://web.archive.org/web/20250415191354/https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf)                                                                                                                         |
| OpenAI          | Frontier Governance Framework                         | May 2026 edition      | published 2026-05-28 | [publisher address](https://cdn.openai.com/pdf/e37d949b-8c9f-4d76-b99e-4272f4631a7e/openai-frontier-governance-framework.pdf) · [archived](https://web.archive.org/web/20260529171758/https://cdn.openai.com/pdf/e37d949b-8c9f-4d76-b99e-4272f4631a7e/openai-frontier-governance-framework.pdf)                                                                                                   |
| xAI             | Frontier Artificial Intelligence Framework            | December 2025 edition | revised 2025-12-30   | [publisher address](https://data.x.ai/2025-12-31-xai-frontier-artificial-intelligence-framework.pdf) · [archived](https://web.archive.org/web/20260102171656/https://data.x.ai/2025-12-31-xai-frontier-artificial-intelligence-framework.pdf)                                                                                                                                                     |
| xAI             | Frontier Artificial Intelligence Framework            | June 2026 edition     | effective 2026-06-30 | [publisher address](https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf) · [archived](https://web.archive.org/web/20260716003429/https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf)                                                                                                       |
| Meta            | Frontier AI Framework / Advanced AI Scaling Framework | v1.1                  | published 2025-02-03 | [publisher address](https://ai.meta.com/static-resource/meta-frontier-ai-framework/)                                                                                                                                                                                                                                                                                                              |
| Meta            | Frontier AI Framework / Advanced AI Scaling Framework | v2.0                  | published 2026-04-08 | [publisher address](https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2) · [archived](https://web.archive.org/web/20260408163104/https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2)                                                                                                                                                                 |
| Microsoft       | Frontier Governance Framework                         | Feb 2025 (Version 1)  | published 2025-02    | [publisher address](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/Microsoft-Frontier-Governance-Framework.pdf) · [archived](https://web.archive.org/web/20250226161803/https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/Microsoft-Frontier-Governance-Framework.pdf) |
| Microsoft       | Frontier Governance Framework                         | Feb 2026              | revised 2026-02      | [publisher address](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/Frontier-Governance-Framework-Feb-2026.pdf) · [archived](https://web.archive.org/web/20260424000716/https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/Frontier-Governance-Framework-Feb-2026.pdf)               |

### Latest edition of each framework, at a glance

S = stated (quoted below), S~ = stated, partly: the edition has what the criterion asks for only in a weaker form than its words (see the mapping note), NF = not found within the recorded search, – = not applicable.

| Facet                                                        | Anthropic · RSP · v3.4 | Google DeepMind · FSF · v3.1 | OpenAI · Preparedness · Version 2 | OpenAI · FGF · May 2026 edition | xAI · FAIF · June 2026 edition | Meta · AASF · v2 | Microsoft · FGF · Feb 2026 |
| ------------------------------------------------------------ | ---------------------- | ---------------------------- | --------------------------------- | ------------------------------- | ------------------------------ | ---------------- | -------------------------- |
| D1 Chemical, biological, radiological or nuclear weapons     | S                      | S                            | S                                 | S                               | S                              | S                | S                          |
| D1 Cyber operations                                          | NF                     | S                            | S                                 | S                               | S                              | S                | S                          |
| D1 Autonomy, self-improvement or AI research and development | S                      | S                            | S                                 | S                               | S                              | S                | S                          |
| D1 Persuasion or manipulation                                | NF                     | S                            | S~                                | S                               | S                              | NF               | S                          |
| D1 Other named domains                                       | S                      | S                            | S                                 | S~                              | S~                             | S                | S                          |
| D2 Named levels or thresholds                                | S                      | S                            | S                                 | S                               | S~                             | S                | S                          |
| D2 How a threshold is defined                                | S~                     | S                            | S                                 | S                               | S~                             | S                | S~                         |
| D3 Safeguards required                                       | S                      | S                            | S                                 | S                               | S~                             | S                | S                          |
| D3 Pause, non-deployment or non-training                     | S                      | S                            | S                                 | S                               | S                              | S                | S                          |
| D4 Determination of capability or safeguard adequacy         | S                      | S                            | S                                 | S~                              | NF                             | S                | S                          |
| D4 Board or external oversight                               | S                      | NF                           | S                                 | S                               | NF                             | S~               | S~                         |
| D5 Evaluation timing                                         | S~                     | S                            | S                                 | S                               | S                              | S                | S                          |
| D6 Provisions conditioned on other developers                | S                      | S                            | S                                 | NF                              | NF                             | NF               | S~                         |
| D6 Other exceptions or discretion                            | S                      | S                            | S                                 | S                               | S                              | S                | S                          |
| D7 Internal reporting                                        | S                      | S~                           | S                                 | S~                              | S                              | S                | S                          |
| D7 Public or external reporting                              | S                      | S                            | S                                 | S                               | S                              | S                | S                          |
| D8 Revision process and approval                             | S                      | S                            | S                                 | S                               | S                              | S                | S                          |
| D8 Stated changes from the previous edition                  | S                      | S                            | S                                 | –                               | NF                             | S                | S                          |

### Every edition, by facet

**Anthropic · Responsible Scaling Policy**

| Facet                                                        | v1.0 | v2.0 | v2.1 | v2.2 | v3.0 | v3.1 | v3.2 | v3.3 | v3.4 |
| ------------------------------------------------------------ | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| D1 Chemical, biological, radiological or nuclear weapons     | S    | S    | S    | S    | S    | S    | S    | S    | S    |
| D1 Cyber operations                                          | S    | S    | S    | S    | NF   | NF   | NF   | NF   | NF   |
| D1 Autonomy, self-improvement or AI research and development | S    | S    | S    | S    | S    | S    | S    | S    | S    |
| D1 Persuasion or manipulation                                | NF   | S~   | S~   | S~   | NF   | NF   | NF   | NF   | NF   |
| D1 Other named domains                                       | S~   | S~   | S~   | S~   | S    | S    | S    | S    | S    |
| D2 Named levels or thresholds                                | S    | S    | S    | S    | S    | S    | S    | S    | S    |
| D2 How a threshold is defined                                | S    | S    | S    | S    | S~   | S~   | S~   | S~   | S~   |
| D3 Safeguards required                                       | S    | S    | S    | S    | S    | S    | S    | S    | S    |
| D3 Pause, non-deployment or non-training                     | S    | S    | S    | S    | S    | S    | S    | S    | S    |
| D4 Determination of capability or safeguard adequacy         | S~   | S    | S    | S    | S    | S    | S    | S    | S    |
| D4 Board or external oversight                               | S~   | S~   | S~   | S~   | S    | S    | S    | S    | S    |
| D5 Evaluation timing                                         | S    | S    | S    | S    | S~   | S~   | S~   | S~   | S~   |
| D6 Provisions conditioned on other developers                | S~   | S    | S    | S    | S    | S    | S    | S    | S    |
| D6 Other exceptions or discretion                            | S    | S    | S    | S    | S    | S    | S    | S    | S    |
| D7 Internal reporting                                        | S    | S    | S    | S    | S    | S    | S    | S    | S    |
| D7 Public or external reporting                              | S    | S    | S    | S    | S    | S    | S    | S    | S    |
| D8 Revision process and approval                             | S    | S    | S    | S    | S    | S    | S    | S    | S    |
| D8 Stated changes from the previous edition                  | –    | S    | S    | S    | S    | S    | S    | S    | S    |

**Google DeepMind · Frontier Safety Framework**

| Facet                                                        | v1.0 | v2.0 | v3.0 | v3.1 |
| ------------------------------------------------------------ | ---- | ---- | ---- | ---- |
| D1 Chemical, biological, radiological or nuclear weapons     | S    | S    | S    | S    |
| D1 Cyber operations                                          | S    | S    | S    | S    |
| D1 Autonomy, self-improvement or AI research and development | S    | S    | S    | S    |
| D1 Persuasion or manipulation                                | NF   | NF   | S    | S    |
| D1 Other named domains                                       | S~   | S    | S    | S    |
| D2 Named levels or thresholds                                | S    | S    | S    | S    |
| D2 How a threshold is defined                                | S    | S    | S    | S    |
| D3 Safeguards required                                       | S~   | S    | S    | S    |
| D3 Pause, non-deployment or non-training                     | S    | S    | S    | S    |
| D4 Determination of capability or safeguard adequacy         | NF   | S    | S    | S    |
| D4 Board or external oversight                               | NF   | NF   | NF   | NF   |
| D5 Evaluation timing                                         | S    | S    | S    | S    |
| D6 Provisions conditioned on other developers                | NF   | S    | S    | S    |
| D6 Other exceptions or discretion                            | S    | S    | S    | S    |
| D7 Internal reporting                                        | NF   | S~   | S~   | S~   |
| D7 Public or external reporting                              | NF   | S    | S    | S    |
| D8 Revision process and approval                             | S    | S    | S    | S    |
| D8 Stated changes from the previous edition                  | –    | S    | NF   | S    |

**OpenAI · Preparedness Framework**

| Facet                                                        | Beta | Version 2 |
| ------------------------------------------------------------ | ---- | --------- |
| D1 Chemical, biological, radiological or nuclear weapons     | S    | S         |
| D1 Cyber operations                                          | S    | S         |
| D1 Autonomy, self-improvement or AI research and development | S    | S         |
| D1 Persuasion or manipulation                                | S    | S~        |
| D1 Other named domains                                       | S~   | S         |
| D2 Named levels or thresholds                                | S    | S         |
| D2 How a threshold is defined                                | S    | S         |
| D3 Safeguards required                                       | S    | S         |
| D3 Pause, non-deployment or non-training                     | S    | S         |
| D4 Determination of capability or safeguard adequacy         | S    | S         |
| D4 Board or external oversight                               | S    | S         |
| D5 Evaluation timing                                         | S    | S         |
| D6 Provisions conditioned on other developers                | NF   | S         |
| D6 Other exceptions or discretion                            | S    | S         |
| D7 Internal reporting                                        | S    | S         |
| D7 Public or external reporting                              | NF   | S         |
| D8 Revision process and approval                             | S    | S         |
| D8 Stated changes from the previous edition                  | –    | S         |

**OpenAI · Frontier Governance Framework**

| Facet                                                        | May 2026 edition |
| ------------------------------------------------------------ | ---------------- |
| D1 Chemical, biological, radiological or nuclear weapons     | S                |
| D1 Cyber operations                                          | S                |
| D1 Autonomy, self-improvement or AI research and development | S                |
| D1 Persuasion or manipulation                                | S                |
| D1 Other named domains                                       | S~               |
| D2 Named levels or thresholds                                | S                |
| D2 How a threshold is defined                                | S                |
| D3 Safeguards required                                       | S                |
| D3 Pause, non-deployment or non-training                     | S                |
| D4 Determination of capability or safeguard adequacy         | S~               |
| D4 Board or external oversight                               | S                |
| D5 Evaluation timing                                         | S                |
| D6 Provisions conditioned on other developers                | NF               |
| D6 Other exceptions or discretion                            | S                |
| D7 Internal reporting                                        | S~               |
| D7 Public or external reporting                              | S                |
| D8 Revision process and approval                             | S                |
| D8 Stated changes from the previous edition                  | –                |

**xAI · Frontier Artificial Intelligence Framework**

| Facet                                                        | December 2025 edition | June 2026 edition |
| ------------------------------------------------------------ | --------------------- | ----------------- |
| D1 Chemical, biological, radiological or nuclear weapons     | S                     | S                 |
| D1 Cyber operations                                          | S                     | S                 |
| D1 Autonomy, self-improvement or AI research and development | S~                    | S                 |
| D1 Persuasion or manipulation                                | NF                    | S                 |
| D1 Other named domains                                       | S                     | S~                |
| D2 Named levels or thresholds                                | S~                    | S~                |
| D2 How a threshold is defined                                | S~                    | S~                |
| D3 Safeguards required                                       | S                     | S~                |
| D3 Pause, non-deployment or non-training                     | S~                    | S                 |
| D4 Determination of capability or safeguard adequacy         | NF                    | NF                |
| D4 Board or external oversight                               | NF                    | NF                |
| D5 Evaluation timing                                         | S                     | S                 |
| D6 Provisions conditioned on other developers                | NF                    | NF                |
| D6 Other exceptions or discretion                            | S                     | S                 |
| D7 Internal reporting                                        | S~                    | S                 |
| D7 Public or external reporting                              | S                     | S                 |
| D8 Revision process and approval                             | S                     | S                 |
| D8 Stated changes from the previous edition                  | –                     | NF                |

**Meta · Frontier AI Framework / Advanced AI Scaling Framework**

| Facet                                                        | v1.1 | v2.0 |
| ------------------------------------------------------------ | ---- | ---- |
| D1 Chemical, biological, radiological or nuclear weapons     | S    | S    |
| D1 Cyber operations                                          | S    | S    |
| D1 Autonomy, self-improvement or AI research and development | S    | S    |
| D1 Persuasion or manipulation                                | NF   | NF   |
| D1 Other named domains                                       | NF   | S    |
| D2 Named levels or thresholds                                | S    | S    |
| D2 How a threshold is defined                                | S    | S    |
| D3 Safeguards required                                       | S    | S    |
| D3 Pause, non-deployment or non-training                     | S    | S    |
| D4 Determination of capability or safeguard adequacy         | S    | S    |
| D4 Board or external oversight                               | NF   | S~   |
| D5 Evaluation timing                                         | S    | S    |
| D6 Provisions conditioned on other developers                | NF   | NF   |
| D6 Other exceptions or discretion                            | S    | S    |
| D7 Internal reporting                                        | S    | S    |
| D7 Public or external reporting                              | S    | S    |
| D8 Revision process and approval                             | S    | S    |
| D8 Stated changes from the previous edition                  | –    | S    |

**Microsoft · Frontier Governance Framework**

| Facet                                                        | Feb 2025 (Version 1) | Feb 2026 |
| ------------------------------------------------------------ | -------------------- | -------- |
| D1 Chemical, biological, radiological or nuclear weapons     | S                    | S        |
| D1 Cyber operations                                          | S                    | S        |
| D1 Autonomy, self-improvement or AI research and development | S                    | S        |
| D1 Persuasion or manipulation                                | NF                   | S        |
| D1 Other named domains                                       | NF                   | S        |
| D2 Named levels or thresholds                                | S                    | S        |
| D2 How a threshold is defined                                | S~                   | S~       |
| D3 Safeguards required                                       | S                    | S        |
| D3 Pause, non-deployment or non-training                     | S                    | S        |
| D4 Determination of capability or safeguard adequacy         | S                    | S        |
| D4 Board or external oversight                               | S~                   | S~       |
| D5 Evaluation timing                                         | S                    | S        |
| D6 Provisions conditioned on other developers                | S~                   | S~       |
| D6 Other exceptions or discretion                            | S                    | S        |
| D7 Internal reporting                                        | S                    | S        |
| D7 Public or external reporting                              | S                    | S        |
| D8 Revision process and approval                             | S                    | S        |
| D8 Stated changes from the previous edition                  | –                    | S        |

## D1. Risk domains covered

_Which risk domains does the edition name as within its scope?_

### D1.cbrn Chemical, biological, radiological or nuclear weapons

**Criterion:** The edition names any of chemical, biological, radiological or nuclear weapons (alone or combined) as a domain it tracks or sets a threshold for.

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated
  - “Our ongoing project is focused on defining three factors sequentially for each domain of interest (CBRN and cyber risks)” (PDF p. 20 (printed p. 20), Appendices, 'ASL-3 Evaluations for Misuse Risks', second paragraph, first sentence). _The three factors are threat models, capabilities and evaluations._
  - Mapping note: CBRN is named as a domain of interest for threat models and evaluations, and the ASL-3 red-teaming measure says misuse domains 'should at a minimum include causes of extreme CBRN risks, and cybersecurity' (PDF p. 8). The ASL-3 misuse capability itself (PDF p. 6) is defined in domain-general terms (deliberately-caused catastrophic harm); no CBRN-specific threshold is set. Bioweapons risks are stated as the first area of effort (PDF p. 20).
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “The ability to significantly help individuals or groups with basic technical backgrounds … create/obtain and deploy CBRN weapons.” (PDF p. 7 (printed p. 3), §2 Capability Thresholds and Required Safeguards, table row 'Chemical, Biological, Radiological, and Nuclear (CBRN) weapons', Capability Thresholds column). _The omitted words give 'undergraduate STEM degrees' as an example of basic technical backgrounds._
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “CBRN-3: The ability to significantly help individuals or groups with basic technical backgrounds … create/obtain and deploy CBRN weapons.” (PDF p. 8 (printed p. 4), §2 Capability Thresholds and Required Safeguards, table row 'Chemical, Biological, Radiological, and Nuclear (CBRN) weapons', entry 'CBRN-3', Capability Thresholds column). _A second threshold, CBRN-4, concerns substantial uplift to moderately resourced state programs (same table, PDF p. 8; Appendix C, PDF p. 20)._
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “CBRN-3: The ability to significantly help individuals or groups with basic technical backgrounds … create/obtain and deploy CBRN weapons.” (PDF p. 8 (printed p. 4), §2 Capability Thresholds and Required Safeguards, table row 'Chemical, Biological, Radiological, and Nuclear (CBRN) weapons', entry 'CBRN-3', Capability Thresholds column). _A second threshold, CBRN-4, concerns substantial uplift to moderately resourced state programs (same table, PDF p. 8; Appendix C, PDF p. 20)._
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated
  - “Non-novel chemical/biological weapons production.” (PDF p. 6, §1 Our Recommendations for Industry-Wide Safety, threshold table, row title, left column ('Capability or usage threshold')). _The row covers significant help to individuals or groups with basic technical backgrounds in creating or obtaining and deploying such weapons._
  - “Novel chemical/biological weapons production. AI systems with the ability to significantly help threat actors” (PDF p. 7, §1, threshold table, next row title, left column). _The example given is moderately resourced expert-backed teams._
  - Mapping note: Chemical and biological weapons are named in two threshold rows; radiological and nuclear weapons are not named as thresholds ('CBRN' appears only in changelog entries describing earlier versions).
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated
  - “create/obtain and deploy chemical and/or biological weapons with serious potential for catastrophic” (PDF p. 6, §1 Our Recommendations for Industry-Wide Safety, threshold table, row 'Non-novel chemical/biological weapons production', left column ('Capability or usage threshold')). _The row title cannot be matched in this text layer; the row concerns AI systems that can significantly help individuals or groups with basic technical backgrounds._
  - Mapping note: Chemical and biological weapons are named in two threshold rows; radiological and nuclear weapons are not named as thresholds ('CBRN' appears only in changelog entries describing earlier versions).
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated
  - “Non-novel chemical/biological weapons production.” (PDF p. 6, §1 Our Recommendations for Industry-Wide Safety, threshold table, row title, left column ('Capability or usage threshold')). _The row covers significant help to individuals or groups with basic technical backgrounds in creating or obtaining and deploying such weapons._
  - “Novel chemical/biological weapons production. AI systems with the ability to significantly help threat actors” (PDF p. 7, §1, threshold table, next row title, left column). _The example given is moderately resourced expert-backed teams._
  - Mapping note: Chemical and biological weapons are named in two threshold rows; radiological and nuclear weapons are not named as thresholds ('CBRN' appears only in changelog entries describing earlier versions).
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated
  - “create/obtain and deploy chemical and/or biological weapons with serious potential for catastrophic” (PDF p. 6, §1 Our Recommendations for Industry-Wide Safety, threshold table, row 'Non-novel chemical/biological weapons production', left column ('Capability or usage threshold')). _The row title cannot be matched in this text layer; the row concerns AI systems that can significantly help individuals or groups with basic technical backgrounds._
  - Mapping note: Chemical and biological weapons are named in two threshold rows ('Non-novel' and 'Novel chemical/biological weapons production'); the novel row was redefined in v3.3 as functional substitution for the scarce specialist expertise that is the primary barrier to novel development (see D8.changes). Radiological and nuclear weapons are not named as thresholds; 'CBRN' appears only in changelog entries describing earlier versions.
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated
  - “create/obtain and deploy chemical and/or biological weapons with serious potential for catastrophic” (PDF p. 6, §1 Our Recommendations for Industry-Wide Safety, threshold table, row 'Non-novel chemical/biological weapons production', left column ('Capability or usage threshold')). _The row title cannot be matched in this text layer; the row concerns AI systems that can significantly help individuals or groups with basic technical backgrounds._
  - Mapping note: Chemical and biological weapons are named in two threshold rows ('Non-novel' and 'Novel chemical/biological weapons production'); the novel row was redefined in v3.3 as functional substitution for the scarce specialist expertise that is the primary barrier to novel development (see D8.changes). Radiological and nuclear weapons are not named as thresholds; 'CBRN' appears only in changelog entries describing earlier versions.
- **Google DeepMind · FSF · 2024** (published 2024-05-17): stated
  - “We are starting with an initial set of CCLs in the domains of Autonomy, Biosecurity, Cybersecurity, and Machine Learning R&D.” (PDF p. 1 (printed p. 1), opening section, second paragraph, third sentence)
  - “Chemical, radiological, and nuclear risks: Powerful capabilities in each of these domains are currently covered by existing model evaluations … they are potential candidates for inclusion into the Framework.” (PDF p. 6 (printed p. 6), Future work, bullet 'Updated set of risks and mitigations', second sub-bullet)
  - Mapping note: Only the biological domain ('Biosecurity') has CCLs in this edition (Bio amateur enablement level 1, Bio expert enablement level 1). Chemical, radiological and nuclear risks are named only in Future work as potential candidates for inclusion, covered by existing model evaluations outside the Framework.
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “The table below details a set of CCLs we have identified through ongoing analysis of the CBRN, Cyber, and Machine Learning R&D risk domains.” (PDF p. 4 (printed p. 4), Misuse Critical Capability Levels, first paragraph, first sentence)
  - Mapping note: CBRN is defined (PDF p. 2) as risks of models assisting a 'chemical, biological, radiological, or nuclear (“CBRN”) attack'. One CCL: CBRN uplift 1 (Table 1, PDF p. 5).
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “we have determined severe risks may be most likely to arise from future models: CBRN, cyber, harmful manipulation, and machine learning R&D.” (PDF p. 5 (printed p. 5), §1.3 Outline of Our Risk Assessment Process, 'Identification' bullet, first sentence)
  - Mapping note: One CCL: CBRN uplift level 1 (Table 2.2.1.a, PDF p. 10).
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “risks may be most likely to arise from future models: CBRN, cyber, harmful manipulation, as well as machine learning R&D and misalignment.” (PDF p. 5 (printed p. 5), §1.3.1 Risk Identification, fourth sentence)
  - Mapping note: One CCL (CBRN uplift level 1) and one TCL (CBRN uplift TCL), PDF p. 11.
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated
  - “CBRN is focused on risks related to model-assisted creation of chemical, biological, radiological, and/or nuclear threats.” (PDF p. 9, Tracked Risk Categories › 'CBRN (chemical, biological, radiological, nuclear)', opening sentence)
  - Mapping note: One Tracked Risk Category covers all four; it has a Low–Critical table (PDF p. 9).
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “Biological and Chemical capabilities that … can also reduce barriers to creating and using biological or chemical weapons.” (PDF p. 2 (printed p. 1), opening page, first bullet of the Tracked Categories list)
  - “Nuclear and Radiological capabilities are now a Research Category.” (PDF p. 9 (printed p. 8), §2.3 Research Categories, box 'Changes to Tracked Categories in version 2', second paragraph)
  - Mapping note: Biological and chemical capability is a Tracked Category with High and Critical thresholds; nuclear and radiological capability is a Research Category without thresholds (Table 2 lists a potential response).
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated
  - “across key risk categories, including cybersecurity, CBRN (chemical, biological, radiological, and nuclear), harmful manipulation, and loss of control risks.” (PDF p. 3 (printed p. 01), §1 Introduction, second paragraph, second sentence)
  - “We principally build safeguards against biological and chemical threats” (PDF p. 10 (printed p. 08), §2.4 Risk tiers › 'CBRN', first paragraph, second sentence)
  - Mapping note: CBRN has a three-tier table (PDF pp. 10–11). For nuclear and radiological threats the edition states continued research and threat-model development rather than tiers specific to them.
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): stated
  - “Biological and Chemical Weapons: xAI approaches addressing risks using threat modeling.” (PDF p. 4 (no printed page numbers), 'Addressing Risks of Malicious Use' › '2. Risk Assessment', first paragraph, first sentence)
  - “Radiological and Nuclear Weapons: … generally pose an acceptable risk.” (PDF p. 5, 'Addressing Risks of Malicious Use' › '2. Risk Assessment', paragraph 'Radiological and Nuclear Weapons', heading and end of first sentence)
  - Mapping note: Biological and chemical weapons have a numeric deployment acceptance criterion (see D2.levels); radiological and nuclear weapons are named as assessed, with assessments to date concluding the models 'do not substantially increase the likelihood of malicious use' and 'generally pose an acceptable risk', and no threshold is set for them.
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): stated
  - “four primary risk domains where significant or severe outcomes are most likely to emerge in current and future systems: CBRN Risks, Offensive Cybersecurity Risks, Loss of Control Risks and Harmful Manipulation Risks.” (PDF p. 2, §2.1 Risk Identification, third paragraph, first sentence)
  - Mapping note: Detailed in §2.1(a) 'Addressing CBRN Risks' (PDF pp. 3–4); no numeric threshold is stated.
- **Meta · FAF · v1.1** (published 2025-02-03): stated
  - “Proliferation of known medium-impact biological and chemical weapons for low and moderate skill actors.” (PDF p. 15 (printed p. 15), §3.4.2, outcome CB 1)
  - Mapping note: Chemical and biological weapons are named; the cell does not extend this to radiological or nuclear weapons.
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “The Framework currently focuses on catastrophic risks in three areas: Chemical & Biological, Cybersecurity, and Loss of Control.” (PDF p. 1 (unnumbered opening page), second paragraph, second sentence)
  - “Radiological and nuclear risks have also been identified as other potential sources of risk” (PDF p. 36 (printed p. 36), §4.2.4 Emerging Evaluations and Outcomes, 'Radiological and nuclear', first sentence)
  - Mapping note: Chemical and biological risks are tracked with outcomes CB 1–CB 3 (§3.4.2). Radiological and nuclear risks are placed under 'Emerging Evaluations and Outcomes', described as too nascent to incorporate, with no threshold.
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated
  - “Chemical, biological, radiological, and nuclear (CBRN) weapons. A model’s ability to provide significant capability uplift” (PDF p. 4 (printed p. 3), §2 Capabilities and risks, 'Tracked high-risk capabilities', first bullet)
  - Mapping note: Capability thresholds for low, medium, high and critical are set in Appendix I (PDF p. 12).
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “Chemical, biological, radiological, and nuclear (CBRN) weapons. A model’s ability to provide significant capability uplift” (PDF p. 4 (printed p. 3), §2 Capabilities and risks, 'Tracked high-risk capabilities', first bullet)
  - Mapping note: Capability thresholds for low, medium, high and critical are set in Appendix I (PDF p. 12).

### D1.cyber Cyber operations

**Criterion:** The edition names cyber attacks, cyber offence or cybersecurity uplift as a tracked domain.

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated
  - “Our ongoing project is focused on defining three factors sequentially for each domain of interest (CBRN and cyber risks)” (PDF p. 20 (printed p. 20), Appendices, 'ASL-3 Evaluations for Misuse Risks', second paragraph, first sentence). _The ASL-3 deployment red-teaming measure (PDF p. 8) also names cybersecurity as a minimum misuse domain._
  - Mapping note: Cyber is named as a misuse domain of interest under the domain-general ASL-3 misuse capability; no cyber-specific threshold is set.
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “Cyber Operations: The ability to significantly enhance or automate sophisticated destructive cyber attacks” (PDF p. 8 (printed p. 4), §2, table 'Capabilities / Ongoing Assessment', row 'Cyber Operations')
  - Mapping note: Named under 'Ongoing Assessment' as a capability that may require stronger safeguards than ASL-2; the edition sets no Capability Threshold or Required Safeguards for it and says these will be determined 'in a future iteration of this policy'.
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “Cyber Operations: The ability to significantly enhance or automate sophisticated destructive cyber attacks” (PDF p. 9 (printed p. 5), §2, table 'Capabilities / Ongoing Assessment', row 'Cyber Operations')
  - Mapping note: Named under 'Ongoing Assessment' as a capability that may require stronger safeguards than ASL-2; the edition sets no Capability Threshold or Required Safeguards for it and says these will be determined 'in a future iteration of this policy'.
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “Cyber Operations: The ability to significantly enhance or automate sophisticated destructive cyber attacks” (PDF p. 9 (printed p. 5), §2, table 'Capabilities / Ongoing Assessment', row 'Cyber Operations')
  - Mapping note: Named under 'Ongoing Assessment' as a capability that may require stronger safeguards than ASL-2; the edition sets no Capability Threshold or Required Safeguards for it and says these will be determined 'in a future iteration of this policy'.
- **Anthropic · RSP · v3.0** (effective 2026-02-24): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–19 (all sections, appendices and changelog read).
  - Searched for: “cyber”, “hack”, “intrusion”, “exploit”, “offens”, “vulnerab”, “security”
  - Hits set aside: No hits for cyber, hack, intrusion, offens or vulnerab. 'exploited' (PDF p. 13, §3.5) is a redaction reason (information that could be exploited to cause harm). 'security' hits (PDF pp. 3, 6–8, 11, 13, 15, 18–19) concern Anthropic's own security controls and model-weight protection (e.g. RAND SL4, 'moonshot R&D for security'), the Roadmap area 'Security', national-security redaction grounds, and changelog descriptions of earlier ASL security standards; none names cyber offence or cyber uplift as a tracked domain. The Automated R&D row's example domains are energy, robotics, weapons development and AI itself (PDF p. 8).
- **Anthropic · RSP · v3.1** (effective 2026-04-02): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–20 (all sections, appendices and changelog read).
  - Searched for: “cyber”, “hack”, “intrusion”, “exploit”, “offens”, “vulnerab”, “security”
  - Hits set aside: No hits for cyber, hack, intrusion, offens or vulnerab. 'exploited' (PDF p. 14, §3.5) is a redaction reason (information that could be exploited to cause harm). 'security' hits (PDF pp. 3, 6–8, 12, 14–15, 18–19) concern Anthropic's own security controls and model-weight protection (e.g. RAND SL4, 'moonshot R&D for security'), the Roadmap area 'Security', national-security redaction grounds, and changelog descriptions of earlier ASL security standards; none names cyber offence or cyber uplift as a tracked domain. The Automated R&D row's example domains are energy, robotics, weapons development and AI itself (PDF p. 8).
- **Anthropic · RSP · v3.2** (effective 2026-04-29): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–20 (all sections, appendices and changelog read).
  - Searched for: “cyber”, “hack”, “intrusion”, “exploit”, “offens”, “vulnerab”, “security”
  - Hits set aside: No hits for cyber, hack, intrusion, offens or vulnerab. 'exploited' (PDF p. 14, §3.5) is a redaction reason (information that could be exploited to cause harm). 'security' hits (PDF pp. 3, 6–8, 12, 14, 16, 19–20) concern Anthropic's own security controls and model-weight protection (e.g. RAND SL4, 'moonshot R&D for security'), the Roadmap area 'Security', national-security redaction grounds, and changelog descriptions of earlier ASL security standards; none names cyber offence or cyber uplift as a tracked domain. The Automated R&D row's example domains are energy, robotics, weapons development and AI itself (PDF p. 8).
- **Anthropic · RSP · v3.3** (effective 2026-05-26): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–20 (all sections, appendices and changelog read).
  - Searched for: “cyber”, “hack”, “intrusion”, “exploit”, “offens”, “vulnerab”, “security”
  - Hits set aside: No hits for cyber, hack, intrusion, offens or vulnerab. 'exploited' (PDF p. 14, §3.5) is a redaction reason (information that could be exploited to cause harm). 'security' hits (PDF pp. 3, 6–9, 12, 14, 16, 19–20) concern Anthropic's own security controls and model-weight protection (e.g. RAND SL4, 'moonshot R&D for security'), the Roadmap area 'Security', national-security redaction grounds, and changelog descriptions of earlier ASL security standards; none names cyber offence or cyber uplift as a tracked domain. The Automated R&D row's example domains are energy, robotics, weapons development and AI itself (PDF p. 8).
- **Anthropic · RSP · v3.4** (effective 2026-07-08): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–21 (all sections, appendices and changelog read).
  - Searched for: “cyber”, “hack”, “intrusion”, “exploit”, “offens”, “vulnerab”, “security”
  - Hits set aside: No hits for cyber, hack, intrusion, offens or vulnerab. 'exploited' (PDF p. 14, §3.5) is a redaction reason (information that could be exploited to cause harm). 'security' hits (PDF pp. 3, 6–9, 12, 14, 16, 19–20) concern Anthropic's own security controls and model-weight protection (e.g. RAND SL4, 'moonshot R&D for security'), the Roadmap area 'Security', national-security redaction grounds, and changelog descriptions of earlier ASL security standards; none names cyber offence or cyber uplift as a tracked domain. The Automated R&D row's example domains are energy, robotics, weapons development and AI itself (PDF p. 8).
- **Google DeepMind · FSF · 2024** (published 2024-05-17): stated
  - “We are starting with an initial set of CCLs in the domains of Autonomy, Biosecurity, Cybersecurity, and Machine Learning R&D.” (PDF p. 1 (printed p. 1), opening section, second paragraph, third sentence)
  - Mapping note: Named as 'Cybersecurity'; the CCL table (PDF p. 5) defines Cyber autonomy level 1 and Cyber enablement level 1.
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “The table below details a set of CCLs we have identified through ongoing analysis of the CBRN, Cyber, and Machine Learning R&D risk domains.” (PDF p. 4 (printed p. 4), Misuse Critical Capability Levels, first paragraph, first sentence)
  - Mapping note: Two CCLs: Cyber autonomy level 1 and Cyber uplift level 1 (Table 1, PDF p. 5).
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “we have determined severe risks may be most likely to arise from future models: CBRN, cyber, harmful manipulation, and machine learning R&D.” (PDF p. 5 (printed p. 5), §1.3 Outline of Our Risk Assessment Process, 'Identification' bullet, first sentence)
  - Mapping note: One CCL: Cyber uplift level 1 (Table 2.2.2.a, PDF p. 10); the v2.0 Cyber autonomy level 1 is not present.
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “risks may be most likely to arise from future models: CBRN, cyber, harmful manipulation, as well as machine learning R&D and misalignment.” (PDF p. 5 (printed p. 5), §1.3.1 Risk Identification, fourth sentence)
  - Mapping note: One CCL: Cyber uplift level 1 (Table 2.2.2.a, PDF p. 12).
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated
  - “Cybersecurity is focused on risks related to use of the model for cyber-exploitation” (PDF p. 8, Tracked Risk Categories › 'Cybersecurity', opening sentence)
  - Mapping note: Named as a Tracked Risk Category with a Low–Critical table (PDF p. 8).
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “Cybersecurity capabilities that … can also create new risks of scaled cyberattacks and vulnerability exploitation.” (PDF p. 2 (printed p. 1), opening page, second bullet of the Tracked Categories list)
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated
  - “across key risk categories, including cybersecurity, CBRN (chemical, biological, radiological, and nuclear), harmful manipulation, and loss of control risks.” (PDF p. 3 (printed p. 01), §1 Introduction, second paragraph, second sentence)
  - Mapping note: Listed as 'Cyber offense' among the systemic risk categories (PDF p. 6), with a three-tier table (PDF p. 9).
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): stated
  - “Cyber Attacks on Critical Infrastructure: … Thus, xAI currently relies on our basic refusal policy to prevent misuse for cyber attacks.” (PDF pp. 5–6, 'Addressing Risks of Malicious Use' › '2. Risk Assessment', paragraph 'Cyber Attacks on Critical Infrastructure', heading and second sentence)
  - Mapping note: Named as a risk-assessment heading with listed cyber benchmarks (e.g. Cybench, WMDP-Cyber, PDF p. 4) and a commitment to 're-assess the cyber misuse risks in future releases' (PDF p. 6); the edition says it is still working on identifying enforceable critical steps for cyber and sets no cyber threshold.
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): stated
  - “four primary risk domains where significant or severe outcomes are most likely to emerge in current and future systems: CBRN Risks, Offensive Cybersecurity Risks, Loss of Control Risks and Harmful Manipulation Risks.” (PDF p. 2, §2.1 Risk Identification, third paragraph, first sentence)
  - “xAI treats AI-accelerated malicious cyber offense as a core risk domain.” (PDF p. 4, §2.1(c) 'Addressing Risks of Malicious Offensive Cybersecurity Usage', second paragraph, first sentence)
- **Meta · FAF · v1.1** (published 2025-02-03): stated
  - “Automated discovery and reliable exploitation of critical zero-day vulnerabilities” (PDF p. 14 (printed p. 14), §3.4.1, outcome Cyber 2 (opening of the outcome))
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the software the outcome concerns (current, popular software that follows security best practices) and its timing (before defenders can find and patch the vulnerabilities). Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: Cyber operations are a named domain, with outcomes and threat scenarios.
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “The Framework currently focuses on catastrophic risks in three areas: Chemical & Biological, Cybersecurity, and Loss of Control.” (PDF p. 1 (unnumbered opening page), second paragraph, second sentence)
  - Mapping note: Outcomes Cyber 1–3 (§3.4.1, PDF pp. 18–20) include large-scale compromise, zero-day discovery and exploitation, and scaled fraud, extortion and scams; operational thresholds in §4.2.1.
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated
  - “Offensive cyberoperations. A model’s ability to provide significant capability uplift … highly disruptive or destructive cyberattacks” (PDF p. 4 (printed p. 3), §2 Capabilities and risks, 'Tracked high-risk capabilities', second bullet)
  - Mapping note: Capability thresholds in Appendix I (PDF p. 13).
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “Offensive cyberoperations. A model’s ability to provide significant capability uplift … highly disruptive or destructive cyberattacks” (PDF p. 4 (printed p. 3), §2 Capabilities and risks, 'Tracked high-risk capabilities', second bullet)
  - Mapping note: Capability thresholds in Appendix I (PDF p. 13).

### D1.autonomy Autonomy, self-improvement or AI research and development

**Criterion:** The edition names autonomous operation, replication, self-improvement, AI research and development automation, or loss of control through such capabilities as a tracked domain. Overlap rule: autonomy, self-replication and AI research and development are recorded here; loss of control or misalignment defined through deception or undermining human oversight is recorded under D1.other.

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated
  - “Autonomous replication in the lab: The model shows early signs of autonomous self-replication ability” (PDF p. 7 (printed p. 7), 'ASL-3 Commitments' › 'ASL-3 Capabilities and Threat Models', numbered item 2, first sentence). _The same sentence defines the trigger as a 50% aggregate success rate on the tasks in the autonomy-evaluations appendix (PDF pp. 15–20)._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the definition of early signs as a 50% aggregate success rate on the appendix tasks. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “fully automate the work of an entry-level remote-only Researcher at Anthropic, or cause dramatic acceleration in the rate of effective scaling” (PDF p. 7 (printed p. 3), §2, table row 'Autonomous AI Research and Development (AI R&D)', Capability Thresholds column). _A 'Model Autonomy checkpoint' (2–8 hour software engineering tasks) is used to rule out this threshold and is described as a checkpoint towards AI R&D and autonomous replication (PDF p. 8; Appendix C, PDF p. 20)._
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “AI R&D-4: The ability to fully automate the work of an entry-level, remote-only Researcher at Anthropic. AI R&D-5: The ability to cause dramatic acceleration in the rate of effective scaling.” (PDF p. 20 (printed p. 16), Appendix C Detailed Capability Thresholds, 'Autonomous AI Research and Development', entries 'AI R&D-4' and 'AI R&D-5' (first sentence)). _The same two thresholds appear in the §2 table (PDF p. 8); a Model Autonomy checkpoint is used to rule them out and is linked to autonomous replication (PDF pp. 8–9, 20)._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the second sentence of AI R&D-5, which defines dramatic acceleration as a one-year rise in effective training compute equal to two years of the average rate of early 2018 to early 2024. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “AI R&D-4: The ability to fully automate the work of an entry-level, remote-only Researcher at Anthropic. AI R&D-5: The ability to cause dramatic acceleration in the rate of effective scaling.” (PDF p. 20 (printed p. 16), Appendix C Detailed Capability Thresholds, 'Autonomous AI Research and Development', entries 'AI R&D-4' and 'AI R&D-5' (first sentence)). _The same two thresholds appear in the §2 table (PDF p. 8); a Model Autonomy checkpoint is used to rule them out and is linked to autonomous replication (PDF pp. 8–9, 20)._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the second sentence of AI R&D-5, which defines dramatic acceleration as a one-year rise in effective training compute equal to two years of the average rate of early 2018 to early 2024. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated
  - “Automated R&D in key domains.” (PDF p. 8, §1, threshold table, row title, left column). _The row covers AI systems that can fully automate or dramatically accelerate the work of large, top-tier research teams in domains such as energy, robotics, weapons development and AI itself._
  - Mapping note: Named as a threshold for automated R&D in key domains, with evaluations currently focused on AI R&D. Autonomous, goal-directed operation appears as a component of the high-stakes sabotage opportunities row (see D1.other). There is no separate autonomous replication threshold.
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated
  - “AI systems that can fully automate, or otherwise dramatically accelerate, the work of large, top-tier teams of human researchers” (PDF p. 8, §1, threshold table, row 'Automated R&D in key domains', left column, first sentence). _The sentence continues: in domains where fast progress could cause threats to international security or rapid disruptions to the global balance of power._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the restriction to domains where fast progress could threaten international security or the global balance of power. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: Named as a threshold for automated R&D in key domains, with evaluations currently focused on AI R&D. Autonomous, goal-directed operation appears as a component of the high-stakes sabotage opportunities row (see D1.other). There is no separate autonomous replication threshold.
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated
  - “Automated R&D in key domains.” (PDF p. 8, §1, threshold table, row title, left column). _The row covers AI systems that can fully automate or dramatically accelerate the work of large, top-tier research teams in domains such as energy, robotics, weapons development and AI itself._
  - Mapping note: Named as a threshold for automated R&D in key domains, with evaluations currently focused on AI R&D. Autonomous, goal-directed operation appears as a component of the high-stakes sabotage opportunities row (see D1.other). There is no separate autonomous replication threshold.
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated
  - “AI systems that can fully automate, or otherwise dramatically accelerate, the work of large, top-tier teams of human researchers” (PDF p. 8, §1, threshold table, row 'Automated R&D in key domains', left column, first sentence). _The sentence continues: in domains where fast progress could cause threats to international security or rapid disruptions to the global balance of power._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the restriction to domains where fast progress could threaten international security or the global balance of power. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: Named as a threshold for automated R&D in key domains, with evaluations currently focused on AI R&D. Autonomous, goal-directed operation appears as a component of the misaligned AI systems in high-stakes settings row (see D1.other). There is no separate autonomous replication threshold.
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated
  - “AI systems that can fully automate, or otherwise dramatically accelerate, the work of large, top-tier teams of human researchers” (PDF p. 8, §1, threshold table, row 'Automated R&D in key domains', left column, first sentence). _The sentence continues: in domains where fast progress could cause threats to international security or rapid disruptions to the global balance of power._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the restriction to domains where fast progress could threaten international security or the global balance of power. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: Named as a threshold for automated R&D in key domains, with evaluations currently focused on AI R&D. Autonomous, goal-directed operation appears as a component of the misaligned AI systems in high-stakes settings row (see D1.other). There is no separate autonomous replication threshold.
- **Google DeepMind · FSF · 2024** (published 2024-05-17): stated
  - “We are starting with an initial set of CCLs in the domains of Autonomy, Biosecurity, Cybersecurity, and Machine Learning R&D.” (PDF p. 1 (printed p. 1), opening section, second paragraph, third sentence)
  - ““Autonomy” captures the potential misuse of AI models with significant capacity for agency and flexible action/tool use over long time horizons and across multiple domains.” (PDF p. 2 (printed p. 2), footnote 2)
  - Mapping note: Two domains map here: 'Autonomy' (Autonomy level 1, framed as misuse of an agentic model) and 'Machine Learning R&D' (levels 1 and 2). Neither is framed as loss of control by the model itself; misaligned AI is named only in Future work (see D1.other).
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “The table below details a set of CCLs we have identified through ongoing analysis of the CBRN, Cyber, and Machine Learning R&D risk domains.” (PDF p. 4 (printed p. 4), Misuse Critical Capability Levels, first paragraph, first sentence)
  - “Note that we have removed the Autonomy risk domain, which was included in Frontier Safety Framework version 1.0.” (PDF p. 5 (printed p. 5), Table 1, footnote 9, first sentence)
  - Mapping note: ML R&D is tracked as a misuse domain (ML R&D uplift level 1, ML R&D autonomy level 1). The v1.0 Autonomy domain is stated as removed; footnote 9 says most of its risk 'is now covered by our misalignment section' (see D1.other).
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “we have determined severe risks may be most likely to arise from future models: CBRN, cyber, harmful manipulation, and machine learning R&D.” (PDF p. 5 (printed p. 5), §1.3 Outline of Our Risk Assessment Process, 'Identification' bullet, first sentence)
  - Mapping note: Machine learning R&D is a separate risk type with its own section (§3) and CCLs (ML R&D acceleration level 1, ML R&D automation level 1). Misalignment and instrumental reasoning are handled in an exploratory section (see D1.other).
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “risks may be most likely to arise from future models: CBRN, cyber, harmful manipulation, as well as machine learning R&D and misalignment.” (PDF p. 5 (printed p. 5), §1.3.1 Risk Identification, fourth sentence)
  - Mapping note: Machine learning R&D is tracked in a combined 'ML R&D and Misalignment' domain with ML R&D acceleration level 1 and ML R&D automation level 1 (Table 3.2.2.a, PDF p. 15) and the Stealth and Situational Awareness TCL (PDF p. 14).
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated
  - “include autonomous replication, adaptation, and AI R&D as part of the model autonomy risk category” (PDF p. 12, Tracked Risk Categories › 'Unknown unknowns', second paragraph, final sentence)
  - Mapping note: 'Model autonomy' is a Tracked Risk Category with a Low–Critical table (PDF p. 11); its introduction calls autonomy a prerequisite for self-exfiltration, self-improvement and resource acquisition.
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “AI Self-improvement capabilities that … could also create new challenges for human control of AI systems.” (PDF p. 2 (printed p. 1), opening page, third bullet of the Tracked Categories list)
  - Mapping note: AI Self-improvement is a Tracked Category. Long-range Autonomy and Autonomous Replication and Adaptation are named as Research Categories without thresholds (Table 2, PDF p. 8).
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated
  - “across key risk categories, including cybersecurity, CBRN (chemical, biological, radiological, and nuclear), harmful manipulation, and loss of control risks.” (PDF p. 3 (printed p. 01), §1 Introduction, second paragraph, second sentence)
  - “Outside of risks related to AI selfimprovement, these risk tiers remain exploratory and may evolve substantially.” (PDF p. 12 (printed p. 10), §2.4 Risk tiers › 'Loss of control', first paragraph, final sentence)
  - Mapping note: The domain is framed as loss of control, with a three-tier table; self-improvement is named within it rather than as its own category.
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): stated, partly (a weaker form than the criterion’s words)
  - “This FAIF discusses two major categories of AI risk—malicious use and loss of control.” (PDF p. 1, 'Scope', first sentence)
  - Mapping note: Loss of control is a named risk category, but it is assessed through propensities (deception, sycophancy; MASK threshold, see D1.other) rather than autonomy, replication or AI R&D capability thresholds. The edition says replication or shutdown-prevention scenarios assume offensive cyber capabilities it also tracks (PDF p. 2); AI R&D automation appears only as a metric it may publish (PDF p. 8).
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): stated
  - “four primary risk domains where significant or severe outcomes are most likely to emerge in current and future systems: CBRN Risks, Offensive Cybersecurity Risks, Loss of Control Risks and Harmful Manipulation Risks.” (PDF p. 2, §2.1 Risk Identification, third paragraph, first sentence)
  - “risks from humans losing the ability to reliably direct, modify, or shut down a model” (PDF p. 1, §1 Introduction, third paragraph, third sentence)
  - Mapping note: The domain is framed as loss of control (defined by the quoted clause); autonomy, replication or AI R&D automation are not named as separate tracked capabilities. §2.1(b) (PDF p. 4) describes oversight, training against deception and sycophancy, and sandboxed agent evaluation.
- **Meta · FAF · v1.1** (published 2025-02-03): stated
  - “Autonomous cyber operations” (PDF p. 14 (printed p. 14), §3.4.1, cyber outcomes table, enabling capabilities column)
  - Mapping note: Named as an enabling capability within the cyber domain, not as a domain with thresholds of its own. The same table names autonomous execution of multi-step tasks, and §4.2 (PDF p. 17) takes account of automated AI research and development that enhances capabilities. No autonomous replication threshold is named.
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “The Framework currently focuses on catastrophic risks in three areas: Chemical & Biological, Cybersecurity, and Loss of Control.” (PDF p. 1 (unnumbered opening page), second paragraph, second sentence)
  - “TS.1.1 AI development accelerates such that new capabilities and behaviors emerge faster than the … organization's evaluation processes.” (PDF pp. 22–23, §3.4.3 Loss of Control, table row 'Loss of Control 1', Potential Threat Scenario column). _The table cell continues across the page break; in the text layer the adjacent cells and the footnotes fall between its two parts, which '…' marks. No words of the cell are omitted. The outcome is 'Loss of Control 1: Loss of ability to evaluate AI safety before deployment'._
  - “Autonomous AI R&D: Ability to autonomously and consistently complete tasks which are … representative of the work of a researcher to progress AI development.” (PDF pp. 22–23, §3.4.3 Loss of Control, table row 'Loss of Control 1', Example Enabling Capabilities column). _As in entry 2, '…' marks only the page break; no words of the cell are omitted._
  - Mapping note: Meta names one domain, Loss of Control, defined through 'failures of critical control mechanisms' (PDF p. 22). Its outcome Loss of Control 1 rests on autonomous AI R&D and evaluation awareness, framed as example enabling capabilities of a control failure rather than as a domain of their own (PDF pp. 22–23), with capability checkpoints in §4.2.3; it is recorded here. Its outcome Loss of Control 2, AI undermining monitoring, is recorded under D1.other under the D1 overlap rule. Self-exfiltration and autonomous replication appear only as illustrative emerging threat scenarios (PDF p. 38).
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated
  - “Advanced autonomy. A model’s ability to complete expert-level tasks autonomously, including AI research and development.” (PDF p. 4 (printed p. 3), §2 Capabilities and risks, 'Tracked high-risk capabilities', third bullet)
  - Mapping note: Capability thresholds in Appendix I (PDF p. 14); the critical level is full automation of the AI R&D pipeline. Loss of control is not named.
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “Advanced autonomy. A model’s ability to complete expert-level tasks autonomously, including AI research and development.” (PDF p. 4 (printed p. 3), §2 Capabilities and risks, 'Tracked high-risk capabilities', third bullet)
  - Mapping note: Advanced autonomy has capability thresholds in Appendix I (PDF p. 14). Loss of control, a separately named tracked capability defined through 'adaptive, deceptive, or self-reinforcing mechanisms' (PDF p. 4), is recorded under D1.other under the D1 overlap rule.

### D1.persuasion Persuasion or manipulation

**Criterion:** The edition names persuasion or manipulation of people as a tracked domain.

- **Anthropic · RSP · 2023** (effective 2023-09-19): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–22 (all sections read, including tables, footnotes and appendices).
  - Searched for: “persua”, “manipulat”, “influenc”, “decei|decept”, “misinformation”, “propaganda|election|politic”, “fraud”
  - Hits set aside: No hits for persua, manipulat, influenc, decei/decept or propaganda/election/politic. 'misinformation' (PDF p. 1, opening statement, second paragraph): listed among harms addressed by Anthropic's other AI-safety work, described as complementary to and outside these commitments. 'fraud' (PDF p. 15, appendix 'ASL-3 Evaluations for Autonomous Capabilities'): an example of resource accumulation within the autonomy threat model, not a persuasion domain.
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated, partly (a weaker form than the criterion’s words)
  - “the potential risks of highly persuasive AI models … not yet sufficiently understood to include in our current commitments.” (PDF p. 8 (printed p. 4), §2, footnote 3). _The omitted words state that Anthropic is actively consulting experts and believes this capability is not yet sufficiently understood._
  - Mapping note: Persuasion is named and explicitly excluded from current commitments; it is not a tracked domain in this edition.
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated, partly (a weaker form than the criterion’s words)
  - “the potential risks of highly persuasive AI models … not yet sufficiently understood to include in our current commitments.” (PDF p. 9 (printed p. 5), §2, footnote 2). _The omitted words state that Anthropic is actively consulting experts and believes this capability is not yet sufficiently understood._
  - Mapping note: Persuasion is named and explicitly excluded from current commitments; it is not a tracked domain in this edition.
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated, partly (a weaker form than the criterion’s words)
  - “the potential risks of highly persuasive AI models … not yet sufficiently understood to include in our current commitments.” (PDF p. 9 (printed p. 5), §2, footnote 2). _The omitted words state that Anthropic is actively consulting experts and believes this capability is not yet sufficiently understood._
  - Mapping note: Persuasion is named and explicitly excluded from current commitments; it is not a tracked domain in this edition.
- **Anthropic · RSP · v3.0** (effective 2026-02-24): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–19 (all sections, appendices and changelog read).
  - Searched for: “persua”, “manipul”, “deceiv”, “influence”, “propaganda”, “disinform”
  - Hits set aside: No hits for persua, influence, propaganda or disinform. 'manipulate'/'manipulation' and 'deceive'/'deception' (PDF pp. 7 and 9) occur in the high-stakes sabotage opportunities and Automated R&D rows: AI systems manipulating how successor systems are trained or how testing works, evidence that models lack the propensity to deceive or manipulate users, and AI capabilities for deception and obfuscation of evidence. These describe misalignment and sabotage concerns and the evidence a safety case should include, not persuasion or manipulation of people as a tracked domain. Recorded as not found; a comparer may treat the user-manipulation propensity as adjacent.
- **Anthropic · RSP · v3.1** (effective 2026-04-02): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–20 (all sections, appendices and changelog read).
  - Searched for: “persua”, “manipul”, “deceiv”, “influence”, “propaganda”, “disinform”
  - Hits set aside: No hits for persua, influence, propaganda or disinform. 'manipulate'/'manipulation' and 'deceive'/'deception' (PDF pp. 7 and 9) occur in the high-stakes sabotage opportunities and Automated R&D rows: AI systems manipulating how successor systems are trained or how testing works, evidence that models lack the propensity to deceive or manipulate users, and AI capabilities for deception and obfuscation of evidence. These describe misalignment and sabotage concerns and the evidence a safety case should include, not persuasion or manipulation of people as a tracked domain. Recorded as not found; a comparer may treat the user-manipulation propensity as adjacent.
- **Anthropic · RSP · v3.2** (effective 2026-04-29): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–20 (all sections, appendices and changelog read).
  - Searched for: “persua”, “manipul”, “deceiv”, “influence”, “propaganda”, “disinform”
  - Hits set aside: No hits for persua, influence, propaganda or disinform. 'manipulate'/'manipulation' and 'deceive'/'deception' (PDF pp. 7 and 9) occur in the high-stakes sabotage opportunities and Automated R&D rows: AI systems manipulating how successor systems are trained or how testing works, evidence that models lack the propensity to deceive or manipulate users, and AI capabilities for deception and obfuscation of evidence. These describe misalignment and sabotage concerns and the evidence a safety case should include, not persuasion or manipulation of people as a tracked domain. Recorded as not found; a comparer may treat the user-manipulation propensity as adjacent.
- **Anthropic · RSP · v3.3** (effective 2026-05-26): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–20 (all sections, appendices and changelog read).
  - Searched for: “persua”, “manipul”, “deceiv”, “influence”, “propaganda”, “disinform”
  - Hits set aside: No hits for persua, influence, propaganda or disinform. 'manipulate'/'manipulation' and 'deceive'/'deception' (PDF pp. 8–9) occur in the misaligned AI systems in high-stakes settings and Automated R&D rows: AI systems manipulating how successor systems are trained or how testing works, evidence that models lack the propensity to deceive or manipulate users, and AI capabilities for deception and obfuscation of evidence. These describe misalignment and sabotage concerns and the evidence a safety case should include, not persuasion or manipulation of people as a tracked domain. Recorded as not found; a comparer may treat the user-manipulation propensity as adjacent.
- **Anthropic · RSP · v3.4** (effective 2026-07-08): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–21 (all sections, appendices and changelog read).
  - Searched for: “persua”, “manipul”, “deceiv”, “influence”, “propaganda”, “disinform”
  - Hits set aside: No hits for persua, influence, propaganda or disinform. 'manipulate'/'manipulation' and 'deceive'/'deception' (PDF pp. 8–9) occur in the misaligned AI systems in high-stakes settings and Automated R&D rows: AI systems manipulating how successor systems are trained or how testing works, evidence that models lack the propensity to deceive or manipulate users, and AI capabilities for deception and obfuscation of evidence. These describe misalignment and sabotage concerns and the evidence a safety case should include, not persuasion or manipulation of people as a tracked domain. Recorded as not found; a comparer may treat the user-manipulation propensity as adjacent.
- **Google DeepMind · FSF · 2024** (published 2024-05-17): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–7 (all sections, both tables, footnotes and acknowledgements read)
  - Searched for: “persua”, “manipul”, “decei/decept”, “influenc”, “belief”
  - Hits set aside: No hits for any term in the text layer. The four named risk domains (PDF pp. 1, 2, 5) and the Future work list of candidate risks (PDF p. 6) do not include persuasion or manipulation.
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–9 (all sections, Tables 1–2, footnotes and the Updates and changes page read)
  - Searched for: “persua”, “manipul”, “influenc”, “belief”, “decepti”
  - Hits set aside: No hits for persua, manipul, influenc or belief. 'decepti' hits (PDF pp. 1, 2, 3, 6, 7, 8) all concern 'deceptive alignment', defined as AI systems purposefully undermining human control (PDF p. 6), not models persuading or manipulating people; recorded under D1.other.
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “we have determined severe risks may be most likely to arise from future models: CBRN, cyber, harmful manipulation, and machine learning R&D.” (PDF p. 5 (printed p. 5), §1.3 Outline of Our Risk Assessment Process, 'Identification' bullet, first sentence)
  - “The CCL and our assessment of the risk in this domain is exploratory and subject to further research” (PDF p. 10 (printed p. 10), §2.2.3 Harmful Manipulation, Note, second sentence)
  - Mapping note: Tracked as a misuse domain with one CCL marked '(exploratory)': Harmful manipulation level 1 (Table 2.2.3.a, PDF pp. 10–11).
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “risks may be most likely to arise from future models: CBRN, cyber, harmful manipulation, as well as machine learning R&D and misalignment.” (PDF p. 5 (printed p. 5), §1.3.1 Risk Identification, fourth sentence)
  - “The CCL and our assessment of the risk in this domain is exploratory and subject to further research” (PDF p. 12 (printed p. 12), §2.2.3 Harmful Manipulation, Note, second sentence)
  - Mapping note: One CCL marked '(exploratory)': Harmful manipulation level 1 (Table 2.2.3.a, PDF p. 12).
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated
  - “Persuasion is focused on risks related to convincing people to change their beliefs (or act on)” (PDF p. 10, Tracked Risk Categories › 'Persuasion', opening sentence)
  - Mapping note: Named as a Tracked Risk Category with a Low–Critical table (PDF p. 10).
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated, partly (a weaker form than the criterion’s words)
  - “Persuasion category risks do not fit the criteria for inclusion.” (PDF p. 9 (printed p. 8), §2.3, box 'Changes to Tracked Categories in version 2', 'Persuasion' paragraph, final sentence)
  - Mapping note: Named only as excluded: the passage states that persuasion risks fall outside the Framework's criteria and describes other measures (Model Spec, misuse monitoring) outside the Framework.
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated
  - “across key risk categories, including cybersecurity, CBRN (chemical, biological, radiological, and nuclear), harmful manipulation, and loss of control risks.” (PDF p. 3 (printed p. 01), §1 Introduction, second paragraph, second sentence)
  - “OpenAI’s approach to harmful manipulation remains exploratory” (PDF p. 11 (printed p. 09), §2.4 Risk tiers › 'Harmful manipulation', first sentence)
  - Mapping note: Named as one of the key risk categories and given its own section under §2.4 Risk tiers, without a tier table; the edition says its approach is 'exploratory' and the tier 'subject to further research'. §2.2 says risks are currently estimated for CBRN, cyber offense and loss of control, and that an approach for harmful manipulation is in early stages (PDF p. 7).
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–11 (p. 12 blank): all sections read
  - Searched for: “persua”, “manipul”, “influenc”, “sycophan”, “disinform/misinform”
  - Hits set aside: PDF p. 5 'Genetic manipulation of animal-infecting pathogens' (biology method, not manipulation of people); PDF p. 6 'robustly resisting attempted manipulation and adversarial attacks' (manipulation of the model by users); PDF pp. 2, 6, 7 sycophancy and deception are model propensities measured under loss of control (recorded in D1.other), not persuasion or manipulation of people as a domain; PDF p. 8 '2. Public Understanding' describes exploring truth-seeking tools, not a tracked risk domain.
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): stated
  - “four primary risk domains where significant or severe outcomes are most likely to emerge in current and future systems: CBRN Risks, Offensive Cybersecurity Risks, Loss of Control Risks and Harmful Manipulation Risks.” (PDF p. 2, §2.1 Risk Identification, third paragraph, first sentence)
  - “risks of models with high manipulative capabilities potentially being misused” (PDF p. 1, §1 Introduction, third paragraph, fourth sentence)
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out that the misuse is misuse that could reasonably result in large-scale harm. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: Named as 'Harmful Manipulation Risks' (footnote 1 attributes the term to the EU General-Purpose AI Code of Practice); unlike the other three domains it has no dedicated subsection in §2.1.
- **Meta · FAF · v1.1** (published 2025-02-03): **not found** within the recorded search.
  - Inspected: Whole edition, PDF pp. 1–21, read in the text layer of the decoded PDF of the Internet Archive capture of 2025-02-13; cover and PDF pp. 12–13 and 19 inspected visually
  - Searched for: “persua”, “manipul”, “scam”, “groom”, “influence”
  - Hits set aside: PDF p. 14, §3.4.1, outcome Cyber 3 and threat scenario TS.3.1: scams and grooming are grouped as cyber-enabled economic harm, not named as a persuasion or manipulation domain. PDF p. 18: influence concerns variables that affect the benefits of research. No persuasion or manipulation stems found.
- **Meta · AASF · v2** (published 2026-04-08): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–44 (p. 45 blank): all sections, tables, footnotes and both appendices read
  - Searched for: “persua”, “manipul”, “influenc”, “decept/deceiv”, “scam/phish”, “social engineering”
  - Hits set aside: PDF pp. 19–20, 30 Cyber 3 ('scaled long form fraud, extortion, and scams', scam content and personality generation, grooming, spear-phishing) is classed under the Cybersecurity domain and framed as casualties or financial loss; it is not named as a persuasion or manipulation domain (a comparer may wish to note it). PDF p. 35 'tendency toward deception' is a propensity evaluation for Loss of Control; PDF p. 39 'influence' refers to research impact. No match for 'persua' or 'manipul'.
- **Microsoft · FGF · Feb 2025** (published 2025-02): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–15 (p. 16 blank): all sections, both appendices read
  - Searched for: “persua”, “manipul”, “influenc”, “decept”, “disinform/misinform”, “social engineering”
  - Hits set aside: PDF p. 13 Appendix I, Offensive cyberoperations table, Medium row mentions 'low-level spoofing, phishing, or social engineering attacks' as part of the cyber capability threshold, not as a persuasion or manipulation domain. No other hits.
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “Harmful manipulation. A model’s ability to strategically distort human behavior or beliefs at scale.” (PDF p. 4 (printed p. 3), §2 Capabilities and risks, 'Tracked high-risk capabilities', fifth bullet)
  - Mapping note: Named as a tracked high-risk capability. No thresholds are set: Appendix I says Microsoft is researching evaluation approaches and risk acceptance criteria for manipulation risk (PDF p. 15). Appendix I also prohibits use of its generative AI services to manipulate users (PDF p. 15).

### D1.other Other named domains

**Criterion:** Any further domain the edition names as tracked (for example misalignment, deceptive behaviour, sabotage of oversight). Research categories or monitored-only domains are recorded with their status as worded. Overlap rule: loss of control or misalignment defined through deception or undermining human oversight is recorded here; autonomy, self-replication and AI research and development go under D1.autonomy.

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated, partly (a weaker form than the criterion’s words)
  - “potentially behave in ways contrary to the intent of their designers or users” (PDF p. 3 (printed p. 3), Framework › 'Sources of Catastrophic Risk', second bullet ('Autonomy and replication'), first sentence). _The clause describes systems that, through increased autonomy and imperfect steering methods, may act against their designers' intent._
  - Mapping note: Behaviour contrary to designers' intent is named inside the 'Autonomy and replication' risk source, not as a separate tracked domain. Only two risk sources are named (misuse; autonomy and replication). Undermining of safety measures appears only in the speculative ASL-4 section (PDF p. 15).
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated, partly (a weaker form than the criterion’s words)
  - “the risk that an AI system attempts to subvert the goals of its operators” (PDF p. 6 (printed p. 2), §1 Background, paragraph after the Deployment/Security Standards bullets). _Given as an example of future risks in response to which the framework may be refined._
  - Mapping note: Named as a possible future risk, not a tracked domain. Misaligned goals also appear within the AI R&D Required Safeguards, which expect an affirmative case about the risk of models pursuing misaligned goals (PDF p. 7).
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated, partly (a weaker form than the criterion’s words)
  - “the risk that an AI system attempts to subvert the goals of its operators” (PDF p. 6 (printed p. 2), §1 Background, paragraph after the Deployment/Security Standards bullets). _Given as an example of future risks in response to which the framework may be refined._
  - Mapping note: Named as a possible future risk, not a tracked domain. Misaligned goals appear within the AI R&D-4 Required Safeguards, which require an affirmative case identifying risks from models pursuing misaligned goals (PDF p. 8).
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated, partly (a weaker form than the criterion’s words)
  - “the risk that an AI system attempts to subvert the goals of its operators” (PDF p. 6 (printed p. 2), §1 Background, paragraph after the Deployment/Security Standards bullets). _Given as an example of future risks in response to which the framework may be refined._
  - Mapping note: Named as a possible future risk, not a tracked domain. Misaligned goals appear within the AI R&D-4 Required Safeguards (PDF p. 8); the v2.2 changelog describes AI R&D-4 threat models as entailing autonomous internal sabotage (PDF p. 23).
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated
  - “High-stakes sabotage opportunities.” (PDF p. 7, §1, threshold table, row title, left column). _The row covers AI systems that are highly relied on, with extensive access to sensitive assets and moderate capacity for autonomous, goal-directed operation and subterfuge, that could carry out sabotage leading to irreversibly and substantially higher odds of a later global catastrophe._
  - Mapping note: A threshold row on sabotage by AI systems; the right column asks for compartmentalization, monitoring, capability assessments and evidence about models' propensity to deceive, manipulate or sabotage users.
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated
  - ““High-stakes sabotage opportunities”” (PDF p. 9, §1, threshold table, row 'Automated R&D in key domains', right column, where the row title is cited (the title in the row itself, PDF p. 7, cannot be matched in this text layer)). _The row covers AI systems that are highly relied on, with extensive access to sensitive assets and moderate capacity for autonomous, goal-directed operation and subterfuge, that could carry out sabotage leading to irreversibly and substantially higher odds of a later global catastrophe._
  - Mapping note: A threshold row on sabotage by AI systems; the right column asks for compartmentalization, monitoring, capability assessments and evidence about models' propensity to deceive, manipulate or sabotage users.
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated
  - “High-stakes sabotage opportunities.” (PDF p. 7, §1, threshold table, row title, left column). _The row covers AI systems that are highly relied on, with extensive access to sensitive assets and moderate capacity for autonomous, goal-directed operation and subterfuge, that could carry out sabotage leading to irreversibly and substantially higher odds of a later global catastrophe._
  - Mapping note: A threshold row on sabotage by AI systems; the right column asks for compartmentalization, monitoring, capability assessments and evidence about models' propensity to deceive, manipulate or sabotage users.
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated
  - ““Misaligned AI systems in high-stakes settings”” (PDF p. 9, §1, threshold table, row 'Automated R&D in key domains', right column, where the row title is cited (the title in the row itself, PDF p. 7, cannot be matched in this text layer)). _The row covers AI systems that are highly relied on, with extensive access to sensitive assets and moderate capacity for autonomous, goal-directed operation and subterfuge, that could carry out sabotage leading to irreversibly and substantially higher odds of a later global catastrophe._
  - Mapping note: A threshold row on sabotage by AI systems; the right column asks for compartmentalization, monitoring, capability assessments and evidence about models' propensity to deceive, manipulate or sabotage users. The row was retitled from 'High-stakes sabotage opportunities' in v3.3. The row title is not in the text layer as a separate line; the quotation is the next row's cross-reference to it, which gives the title verbatim.
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated
  - ““Misaligned AI systems in high-stakes settings”” (PDF p. 9, §1, threshold table, row 'Automated R&D in key domains', right column, where the row title is cited (the title in the row itself, PDF p. 7, cannot be matched in this text layer)). _The row covers AI systems that are highly relied on, with extensive access to sensitive assets and moderate capacity for autonomous, goal-directed operation and subterfuge, that could carry out sabotage leading to irreversibly and substantially higher odds of a later global catastrophe._
  - Mapping note: A threshold row on sabotage by AI systems; the right column asks for compartmentalization, monitoring, capability assessments and evidence about models' propensity to deceive, manipulate or sabotage users. The row was retitled from 'High-stakes sabotage opportunities' in v3.3. The row title is not in the text layer as a separate line; the quotation is the next row's cross-reference to it, which gives the title verbatim.
- **Google DeepMind · FSF · 2024** (published 2024-05-17): stated, partly (a weaker form than the criterion’s words)
  - “Misaligned AI: protection against the risk of systems acting adversarially against humans may require additional Framework components” (PDF p. 6 (printed p. 6), Future work, bullet 'Updated set of risks and mitigations', first sub-bullet)
  - Mapping note: Named only in Future work as a possible addition ('possible examples'), with no CCL or threshold in this edition. No further tracked domain beyond the four in D1.cbrn–D1.autonomy.
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “we also include an exploratory section addressing deceptive alignment risk” (PDF p. 1 (printed p. 1, unnumbered), opening section, third paragraph, second sentence)
  - Mapping note: Deceptive alignment is tracked through an exploratory section with two Instrumental Reasoning CCLs (Table 2, PDF p. 7); the edition says it 'primarily addresses misuse risk'.
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “For misalignment risk, we outline an exploratory approach” (PDF p. 4 (printed p. 4), §1.2 Critical Capability Levels, fifth paragraph, first sentence)
  - “We exclude misalignment risk from this list of domains because of its exploratory nature.” (PDF p. 5 (printed p. 5), §1.3, footnote 4)
  - Mapping note: Misalignment has illustrative Instrumental Reasoning CCLs (Table 4.a, PDF p. 15) without explicit risk acceptance criteria or security mitigations; it is excluded from the list of identified risk domains.
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “risks may be most likely to arise from future models: CBRN, cyber, harmful manipulation, as well as machine learning R&D and misalignment.” (PDF p. 5 (printed p. 5), §1.3.1 Risk Identification, fourth sentence). _The edition counts misalignment within one combined 'ML R&D and Misalignment' risk domain, not as a separate domain._
  - Mapping note: Misalignment is no longer a separate exploratory section; it is part of the combined 'ML R&D and Misalignment' domain, tracked through the Stealth and Situational Awareness TCL, described (PDF p. 14) as a baseline capability level 'above which misalignment risks may begin to arise'.
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated, partly (a weaker form than the criterion’s words)
  - “we include deception and social engineering evaluations as part of the persuasion risk category” (PDF p. 12, Tracked Risk Categories › 'Unknown unknowns', second paragraph, final sentence)
  - Mapping note: No fifth tracked domain is named. Deception is evaluated within the persuasion category rather than as its own domain. The edition also describes an 'unknown unknowns' process for identifying new categories (PDF pp. 5, 12), and the illustrative Scorecard lists 'Unknown Unknowns' as a row (PDF p. 15); this is a process, not a named domain.
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “Undermining Safeguards: ability and propensity for the model to act to undermine safeguards placed on it” (PDF p. 8 (printed p. 7), Table 2 'Research Categories', fourth row)
  - Mapping note: Named as a Research Category, not a Tracked Category: the edition sets no thresholds for it. Table 2 also names Sandbagging as a Research Category; deception appears as an example within Undermining Safeguards.
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated, partly (a weaker form than the criterion’s words)
  - “Such risks may emerge from misalignment with human intent or values, selfimprovement, model deception, or autonomous self-improvement.” (PDF p. 12 (printed p. 10), §2.4 Risk tiers › 'Loss of control', first paragraph, second sentence)
  - Mapping note: No fifth category is named; misalignment and deception are named as sources of loss-of-control risk, not as separate categories.
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): stated
  - “Our risk acceptance criteria for system deployment is maintaining a dishonesty rate of less than 1 out of 2 on MASK.” (PDF p. 7, 'Addressing Risks of Loss of Control' › '2. Risk Assessment', paragraph beginning 'Thresholds:', first sentence)
  - Mapping note: Dishonesty (deception) is tracked as a concerning propensity within the loss-of-control category, with this numeric criterion; sycophancy is measured without a stated threshold (PDF p. 7).
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): stated, partly (a weaker form than the criterion’s words)
  - “xAI particularly focuses on the risks of malicious use and safeguard circumvention (e.g., jailbreaks)” (PDF p. 1, §1 Introduction, third paragraph, first sentence)
  - “Within our risk management framework, we may identify and assess other risks.” (PDF p. 1, §1 Introduction, third paragraph, final sentence)
  - Mapping note: No domain beyond the four is named as tracked; safeguard circumvention is named as a focus alongside malicious use, and other risks only as a possibility.
- **Meta · FAF · v1.1** (published 2025-02-03): **not found** within the recorded search.
  - Inspected: Whole edition, PDF pp. 1–21, read in the text layer of the decoded PDF of the Internet Archive capture of 2025-02-13; cover and PDF pp. 12–13 and 19 inspected visually
  - Searched for: “decep”, “misalign”, “sabot”, “oversight”, “domain”
  - Hits set aside: PDF p. 16, §4.1: deception concerns the reliability of evaluations; no deceptive-behaviour or loss-of-control outcome or monitored domain is named. Domain hits on PDF pp. 3, 7, 8, 10, 14, 16 and 21 refer to the two named domains, expert disciplines, possible future domains not yet named, or the glossary.
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “Loss of Control 2: Loss of ability to monitor AI behavior during operation TS.2.1* AI disables or corrupts monitors to reduce oversight and accomplish its objectives.” (PDF p. 23, §3.4.3 Loss of Control, table row 'Loss of Control 2', Outcome and Potential Threat Scenario columns). _Example enabling capabilities in the same row are monitor awareness and monitor interference._
  - “Physical autonomy has emerged as another nascent outcome arising from Frontier AI.” (PDF p. 36 (printed p. 36), §4.2.4 Emerging Evaluations and Outcomes, 'Physical autonomy', first sentence)
  - Mapping note: Meta names one domain, Loss of Control, one of the three areas the Framework 'currently focuses on' (PDF p. 1). Under the D1 overlap rule its outcome Loss of Control 2, defined through AI undermining monitoring, is recorded here; Loss of Control 1 (autonomous AI R&D) is recorded under D1.autonomy. Physical autonomy (entry 1) is listed under 'Emerging Evaluations and Outcomes' with a sample outcome and threat scenario, not incorporated into the thresholds.
- **Microsoft · FGF · Feb 2025** (published 2025-02): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–15 (p. 16 blank): all sections, both appendices read
  - Searched for: “speculative”, “potential capability-related risks”, “bias”, “misalign”, “loss of control”, “broader set of risks”
  - Hits set aside: PDF p. 3 'Longer-term or more speculative capabilities are the subject of ongoing research' names no domain; PDF p. 4 'We continue to study a range of potential capability-related risks' names none; PDF p. 5 'broader set of risks' refers to the broader AI governance program; PDF p. 9 'bias or discrimination' are residual risks for deployers to address, not tracked domains. No match for 'misalign' or 'loss of control'.
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “Loss of control. A model’s ability to undermine effective human control through adaptive, deceptive, or self-reinforcing mechanisms such that, when deployed, a model can no longer be reliably directed, modified, or shut down.” (PDF p. 4 (printed p. 3), §2 Capabilities and risks, 'Tracked high-risk capabilities', fourth bullet)
  - Mapping note: Separately named tracked capability, recorded here under the D1 overlap rule because it is defined through deceptive mechanisms that undermine human control. No thresholds are set: Appendix I says Microsoft is researching evaluation approaches and risk acceptance criteria for loss of control risk (PDF p. 15).

## D2. Thresholds and triggers

_What capability levels does the edition define, and how is a level defined?_

### D2.levels Named levels or thresholds

**Criterion:** The names and structure of the capability levels or thresholds the edition uses.

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated
  - “We define a series of AI capability thresholds that represent increasing potential risks” (PDF p. 2 (printed p. 2), Framework, first paragraph, second sentence). _The sentence continues: each ASL requires more stringent safety, security and operational measures than the previous one. The summary table (PDF p. 4) lists ASL-1, ASL-2, ASL-3, ASL-4 and ASL-5+; only ASL-2 and ASL-3 are defined, with ASL-4 to be defined before ASL-3 models are trained (PDF p. 4, item 3)._
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “a Capability Threshold serves as a trigger for shifting from an ASL-N Standard to an ASL-N+1 Standard” (PDF p. 7 (printed p. 3), §1 Background, final paragraph, third sentence). _Two Capability Thresholds are specified (CBRN weapons; Autonomous AI R&D), plus a Model Autonomy checkpoint; ASL-2 and ASL-3 Standards are defined and ASL-4 thresholds are stated to be in preparation (PDF p. 14)._
  - Mapping note: Levels are split into Capability Thresholds (capabilities) and ASL Standards (safeguards); the thresholds carry no numbered labels in this edition.
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “CBRN-3: The ability to significantly help individuals or groups with basic technical backgrounds … create/obtain and deploy CBRN weapons.” (PDF p. 8 (printed p. 4), §2 Capability Thresholds and Required Safeguards, table row 'Chemical, Biological, Radiological, and Nuclear (CBRN) weapons', entry 'CBRN-3', Capability Thresholds column). _One of four labelled Capability Thresholds (CBRN-3, CBRN-4, AI R&D-4, AI R&D-5; table PDF p. 8)._
  - “AI R&D-4: The ability to fully automate the work of an entry-level, remote-only Researcher at Anthropic. AI R&D-5: The ability to cause dramatic acceleration in the rate of effective scaling.” (PDF p. 20 (printed p. 16), Appendix C Detailed Capability Thresholds, 'Autonomous AI Research and Development', entries 'AI R&D-4' and 'AI R&D-5' (first sentence)). _CBRN-4 (substantial uplift to moderately resourced state programs) is the fourth labelled threshold. A Model Autonomy checkpoint sits below the AI R&D thresholds (PDF pp. 8–9)._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the second sentence of AI R&D-5, which defines dramatic acceleration as a one-year rise in effective training compute equal to two years of the average rate of early 2018 to early 2024. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: Levels are split into labelled Capability Thresholds (capabilities) and ASL Standards (safeguards); §1 (PDF p. 7) describes a Capability Threshold as a trigger for shifting from an ASL-N Standard to an ASL-N+1 Standard or higher. ASL-2 and ASL-3 Standards are specified; ASL-4 Standards are referenced as expected requirements to be detailed later.
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “CBRN-3: The ability to significantly help individuals or groups with basic technical backgrounds … create/obtain and deploy CBRN weapons.” (PDF p. 8 (printed p. 4), §2 Capability Thresholds and Required Safeguards, table row 'Chemical, Biological, Radiological, and Nuclear (CBRN) weapons', entry 'CBRN-3', Capability Thresholds column). _One of four labelled Capability Thresholds (CBRN-3, CBRN-4, AI R&D-4, AI R&D-5; table PDF p. 8)._
  - “AI R&D-4: The ability to fully automate the work of an entry-level, remote-only Researcher at Anthropic. AI R&D-5: The ability to cause dramatic acceleration in the rate of effective scaling.” (PDF p. 20 (printed p. 16), Appendix C Detailed Capability Thresholds, 'Autonomous AI Research and Development', entries 'AI R&D-4' and 'AI R&D-5' (first sentence)). _CBRN-4 (substantial uplift to moderately resourced state programs) is the fourth labelled threshold. A Model Autonomy checkpoint sits below the AI R&D thresholds (PDF pp. 8–9)._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the second sentence of AI R&D-5, which defines dramatic acceleration as a one-year rise in effective training compute equal to two years of the average rate of early 2018 to early 2024. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: Levels are split into labelled Capability Thresholds (capabilities) and ASL Standards (safeguards); §1 (PDF p. 7) describes a Capability Threshold as a trigger for shifting from an ASL-N Standard to an ASL-N+1 Standard or higher. ASL-2 and ASL-3 Standards are specified; ASL-4 Standards are referenced as expected requirements to be detailed later.
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated
  - “The left column identifies capability thresholds that would call for heightened mitigations.” (PDF p. 4, §1 Our Recommendations for Industry-Wide Safety, first paragraph)
  - Mapping note: The table's left column is headed 'Capability or usage threshold' and has four unranked rows: non-novel chemical/biological weapons production; novel chemical/biological weapons production; high-stakes sabotage opportunities; automated R&D in key domains. Appendix B keeps 'AI Safety Levels' (ASLs) only to refer to present mitigation levels, not as a ladder of future capability levels.
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated
  - “The left column identifies capability thresholds that would call for heightened mitigations.” (PDF p. 4, §1 Our Recommendations for Industry-Wide Safety, first paragraph). _The sentence ends 'mitigations.'_
  - Mapping note: The table's left column is headed 'Capability or usage threshold' and has four unranked rows: non-novel chemical/biological weapons production; novel chemical/biological weapons production; high-stakes sabotage opportunities; automated R&D in key domains. Appendix B keeps 'AI Safety Levels' (ASLs) only to refer to present mitigation levels, not as a ladder of future capability levels.
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated
  - “The left column identifies capability thresholds that would call for heightened mitigations.” (PDF p. 4, §1 Our Recommendations for Industry-Wide Safety, first paragraph)
  - Mapping note: The table's left column is headed 'Capability or usage threshold' and has four unranked rows: non-novel chemical/biological weapons production; novel chemical/biological weapons production; high-stakes sabotage opportunities; automated R&D in key domains. Appendix B keeps 'AI Safety Levels' (ASLs) only to refer to present mitigation levels, not as a ladder of future capability levels.
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated
  - “The left column identifies capability thresholds that would call for heightened mitigations.” (PDF p. 4, §1 Our Recommendations for Industry-Wide Safety, first paragraph). _The sentence ends 'mitigations.'_
  - Mapping note: The table's left column is headed 'Capability or usage threshold' and has four unranked rows: non-novel chemical/biological weapons production; novel chemical/biological weapons production; misaligned AI systems in high-stakes settings; automated R&D in key domains. Appendix B keeps 'AI Safety Levels' (ASLs) only to refer to present mitigation levels, not as a ladder of future capability levels.
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated
  - “The left column identifies capability thresholds that would call for heightened mitigations.” (PDF p. 4, §1 Our Recommendations for Industry-Wide Safety, first paragraph). _The sentence ends 'mitigations.'_
  - Mapping note: The table's left column is headed 'Capability or usage threshold' and has four unranked rows: non-novel chemical/biological weapons production; novel chemical/biological weapons production; misaligned AI systems in high-stakes settings; automated R&D in key domains. Appendix B keeps 'AI Safety Levels' (ASLs) only to refer to present mitigation levels, not as a ladder of future capability levels.
- **Google DeepMind · FSF · 2024** (published 2024-05-17): stated
  - “The Framework is built around capability thresholds called “Critical Capability Levels.”” (PDF p. 2 (printed p. 2), Framework, component '1 - Critical Capability Levels', first sentence)
  - Mapping note: Seven CCLs across four domains (table, PDF pp. 5–6): Autonomy level 1; Bio amateur enablement level 1; Bio expert enablement level 1; Cyber autonomy level 1; Cyber enablement level 1; Machine Learning R&D levels 1 and 2. Detection uses 'early warning evaluations' with a 'pass' condition (see D5.cadence); separate Security Levels 0–4 and Deployment Levels 0–3 describe mitigations, not capability thresholds.
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “We describe two sets of CCLs: misuse CCLs that can indicate heightened risk of severe harm from misuse if not addressed, and deceptive alignment CCLs” (PDF p. 2 (printed p. 2), Framework, component '1 - Critical Capability Levels', second paragraph)
  - Mapping note: Misuse CCLs (Table 1): CBRN uplift 1, Cyber autonomy level 1, Cyber uplift level 1, ML R&D uplift level 1, ML R&D autonomy level 1. Deceptive alignment CCLs (Table 2): Instrumental Reasoning Levels 1 and 2. Early warning evaluations carry an 'alert threshold' set below each CCL (PDF p. 3).
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “We describe three sets of CCLs: misuse CCLs, machine learning R&D CCLs, and misalignment CCLs.” (PDF p. 4 (printed p. 4), §1.2 Critical Capability Levels, second paragraph)
  - Mapping note: Misuse: CBRN uplift level 1, Cyber uplift level 1, Harmful manipulation level 1 (exploratory). ML R&D: ML R&D acceleration level 1, ML R&D automation level 1. Misalignment (illustrative): Instrumental Reasoning Levels 1 and 2. Early warning evaluations carry 'alert thresholds' below each CCL (PDF p. 5).
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “capability levels at which frontier AI models may pose significant or severe risks (which we call “Tracked Capability Levels (TCLs)” and “Critical Capability Levels (CCLs)” respectively)” (PDF p. 2 (printed p. 2), Overview, third paragraph, first sentence)
  - “We identify TCLs for CBRN risk, as well as ML R&D and misalignment risks.” (PDF p. 4 (printed p. 4), §1.2, last paragraph, third sentence)
  - Mapping note: Two tiers. CCLs: CBRN uplift level 1, Cyber uplift level 1, Harmful manipulation level 1 (exploratory), ML R&D acceleration level 1, ML R&D automation level 1. TCLs: CBRN uplift TCL, Stealth and Situational Awareness TCL. Alert thresholds are defined for CCLs (PDF p. 5); the text uses 'T/CCL' for both tiers.
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated
  - “In general, “low” on this gradation scale is meant to indicate that the corresponding category of risks is not yet a significant problem, while “critical” represents the maximal level of concern.” (PDF p. 5, Tracked Risk Categories, second paragraph, final sentence). _The scale has four levels (Low, Medium, High, Critical) for each Tracked Risk Category; each model receives a pre-mitigation and a post-mitigation level in the Scorecard._
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “High capability thresholds mean capabilities that significantly increase existing risk vectors for severe harm. … Critical capability thresholds mean capabilities that present a meaningful risk of a qualitatively new threat vector for severe harm with no ready precedent.” (PDF p. 5 (printed p. 4), §2.2 Tracked Categories, first paragraph)
  - Mapping note: Two levels, High and Critical, are defined for each Tracked Category in Table 1 (PDF pp. 6–7).
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated
  - “For cyber offense systemic risks, we have established a tier system … The system consists of the following tiers:” (PDF p. 9 (printed p. 07), §2.4 Risk tiers › 'Cyber offense', introductory paragraph)
  - Mapping note: Tiers 1–3 are tabulated for cyber offense, CBRN and loss of control (PDF pp. 9–12); harmful manipulation has no tier table.
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): stated, partly (a weaker form than the criterion’s words)
  - “Our risk acceptance criteria for system deployment is maintaining an answer rate of less than 1 out of 20 on restricted queries.” (PDF p. 6, 'Addressing Risks of Malicious Use' › '2. Risk Assessment', paragraph beginning 'Thresholds:', second sentence). _The restricted queries are biology and chemistry queries developed with SecureBio (same paragraph). The second numeric criterion, a MASK dishonesty rate, is quoted under D1 Other named domains._
  - Mapping note: No named or tiered capability levels. The edition states two numeric 'risk acceptance criteria for system deployment' (this one and the MASK criterion in D1.other) and says it plans to add thresholds tied to other benchmarks.
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): stated, partly (a weaker form than the criterion’s words)
  - “In assessing whether to accept residual risk, we review the risk tiers for each systemic risk category and incorporate appropriate safety margins.” (PDF p. 6, first §2.3 'Systemic risk acceptance determination', second paragraph, third sentence)
  - Mapping note: 'Risk tiers' are mentioned but not named or described. The edition states no numeric thresholds; the December 2025 benchmark acceptance criteria (bio/chem answer rate, MASK) do not appear.
- **Meta · FAF · v1.1** (published 2025-02-03): stated
  - “The model would not provide significant uplift towards execution of a threat scenario.” (PDF p. 13 (printed p. 13), §3.3 Risk thresholds, Table 1: Risk thresholds for frontier AI, Moderate row, Risk Threshold column (text below the measure label 'Release'))
  - Mapping note: Table 1 has three rows, Critical, High and Moderate, with measure labels ‘Stop development’, ‘Do not release’ and ‘Release’; quotes for the High and Critical rows are in D2.definition.
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “We report risk assessments for the model in plausible deployment contexts (critical, high, or moderate or lower)” (PDF p. 8 (printed p. 8), §2.2.1 Preparedness Reports, fourth paragraph, second sentence (opening))
  - Mapping note: Table 1 (PDF p. 15) has three rows (Critical, High, Moderate or lower) with measures 'Develop with Mitigations', 'Deploy with mitigations' and 'Deploy'; the High row reads 'Deployment of the Frontier AI could substantially contribute to any threat scenario associated with a catastrophic outcome' (dataset evidence evidence-prov-meta-aasf-v2-0-high-threshold).
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated
  - “whether the capability poses a low, medium, high, or critical risk” (PDF p. 4 (printed p. 3), §2 Capabilities and risks, paragraph after the tracked-capabilities list, first sentence)
  - Mapping note: Each tracked capability is scored on these four risk levels, defined per capability in Appendix I; low and medium carry 'Deployment allowed in line with Responsible AI Program requirements', high and critical 'Further review and mitigations required'.
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “whether the capability poses a low, medium, high, or critical risk” (PDF p. 4 (printed p. 3), §2 Capabilities and risks, paragraph after the tracked-capabilities list, first sentence)
  - Mapping note: Low, medium, high and critical levels are defined in Appendix I for three of the five tracked capabilities: CBRN weapons, offensive cyberoperations and advanced autonomy (PDF pp. 12–14). For loss of control and harmful manipulation, Appendix I states that evaluation approaches and risk acceptance criteria are being researched (PDF p. 15). Low and medium carry 'Deployment allowed in line with Responsible AI Program requirements', high and critical 'Further review and mitigations required'.

### D2.definition How a threshold is defined

**Criterion:** The edition’s general definition of what reaching a threshold means (for example uplift relative to a baseline, or a capability that could cause severe harm).

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated
  - “Access to the model would substantially increase the risk of deliberately-caused catastrophic harm … measured relative to today’s baseline level of risk” (PDF p. 6 (printed p. 6), 'ASL-3 Commitments' › 'ASL-3 Capabilities and Threat Models', numbered item 1, first and second sentences). _An ASL-3 model is one that meets this or the autonomy criterion either immediately or with post-training costing under 1% of total training cost (PDF p. 6); the baseline is illustrated as access to search engines and textbooks._
  - Mapping note: The quotation gives the misuse criterion. The edition's general definition of an ASL-3 model is one meeting this or an autonomous-replication criterion, immediately or with post-training costing under 1% of total training cost (PDF pp. 6–7).
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “a prespecified level of AI capability that, if reached, signals (1) a meaningful increase in the level of risk” (PDF p. 7 (printed p. 3), §1 Background, final paragraph, second sentence). _The sentence continues: if the model remains under the existing safeguards, together with a corresponding need to upgrade to a higher ASL Standard. The CBRN threshold is assessed against 2023-level online resources (Appendix C, PDF p. 20)._
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “a prespecified level of AI capability that, if reached, signals (1) a meaningful increase in the level of risk” (PDF p. 7 (printed p. 3), first paragraph (continuing §1 Background), second sentence). _The sentence continues: if the model remains under the existing safeguards, and a corresponding need to upgrade to a higher ASL Standard. CBRN-3 is assessed against 2023-level online resources (Appendix C, PDF p. 20)._
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “a prespecified level of AI capability that, if reached, signals (1) a meaningful increase in the level of risk” (PDF p. 7 (printed p. 3), first paragraph (continuing §1 Background), second sentence). _The sentence continues: if the model remains under the existing safeguards, and a corresponding need to upgrade to a higher ASL Standard. CBRN-3 is assessed against 2023-level online resources (Appendix C, PDF p. 20)._
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated, partly (a weaker form than the criterion’s words)
  - “cannot presently give highly specific advance detail on what evaluations will determine whether risk thresholds have been passed” (PDF p. 4, §1, third paragraph, first sentence)
  - “a model could compress two years of 2018 – 2024 AI progress into a single year” (PDF p. 8, §1, threshold table, row 'Automated R&D in key domains', left column, paragraph beginning 'Our working operationalization'). _Stated as the 'working operationalization' that triggers the Automated R&D threshold._
  - Mapping note: No general definition of reaching a threshold: each row describes a capability that would call for heightened mitigations, and the industry-wide recommendations rely on arguments making a strong case for safety. Only the Automated R&D row has an operationalization, which also defines 'highly capable' (§3.6).
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated, partly (a weaker form than the criterion’s words)
  - “cannot presently give highly specific advance detail on what evaluations will determine whether risk thresholds have been passed” (PDF p. 4, §1, third paragraph, first sentence)
  - “fully substitute for our entire set of Research Scientists and Research Engineers, at competitive costs” (PDF p. 8, §1, threshold table, row 'Automated R&D in key domains', left column, paragraph beginning 'We will consider this threshold'). _Condition (1) for considering the threshold met (models would be able to do this); the sentence continues '(i.e., within a factor of 5)' and gives alternative (2), 'dramatic acceleration' of AI progress, defined as double the rate of progress plausibly attributable to automated research._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the gloss of competitive cost as within a factor of five, and its locator stopped before the continuation on PDF p. 9. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: No general definition of reaching a threshold: each row describes a capability that would call for heightened mitigations. Only the Automated R&D row has an operationalization (two alternative conditions); from v3.1 'highly capable' in §3.6 refers to this threshold.
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated, partly (a weaker form than the criterion’s words)
  - “cannot presently give highly specific advance detail on what evaluations will determine whether risk thresholds have been passed” (PDF p. 4, §1, third paragraph, first sentence)
  - “fully substitute for our entire set of Research Scientists and Research Engineers, at competitive costs” (PDF p. 8, §1, threshold table, row 'Automated R&D in key domains', left column, paragraph beginning 'We will consider this threshold'). _Condition (1) for considering the threshold met (models would be able to do this); the sentence continues '(i.e., within a factor of 5)' and gives alternative (2), 'dramatic acceleration' of AI progress, defined as double the rate of progress plausibly attributable to automated research._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the gloss of competitive cost as within a factor of five, and its locator stopped before the continuation on PDF p. 9. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: No general definition of reaching a threshold: each row describes a capability that would call for heightened mitigations. Only the Automated R&D row has an operationalization (two alternative conditions); from v3.1 'highly capable' in §3.6 refers to this threshold.
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated, partly (a weaker form than the criterion’s words)
  - “cannot presently give highly specific advance detail on what evaluations will determine whether risk thresholds have been passed” (PDF p. 4, §1, third paragraph, first sentence)
  - “observe or expect double the rate of progress … in AI aggregate capabilities compared to the rate we’d expect in the absence of significant AI contributions to AI R&D” (PDF p. 9, §1, threshold table, row 'Automated R&D in key domains', left column, paragraph beginning 'We would consider scenario (2)', condition (a)). _Condition (a) of scenario (2), 'dramatic acceleration'; the spaced ellipsis after 'progress' omits only a footnote marker. Measured against the rate expected without significant AI contributions to AI R&D. Condition (b) requires the doubling to be plausibly attributable to automated research or engineering; scenario (1) is that models could fully substitute for all Research Scientists and Research Engineers at competitive costs._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase gave condition (a) as if sufficient alone, leaving out condition (b), that the doubling plausibly be substantially attributable to automated research or engineering such that the trend could bring further acceleration. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: No general definition of reaching a threshold: each row describes a capability that would call for heightened mitigations. Only the Automated R&D row has an operationalization (two alternative scenarios).
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated, partly (a weaker form than the criterion’s words)
  - “cannot presently give highly specific advance detail on what evaluations will determine whether risk thresholds have been passed” (PDF p. 4, §1, third paragraph, first sentence)
  - “double the rate of progress … compared to both the rate we’d expect and the fastest rate of extended progress” (PDF p. 9, §1, threshold table, row 'Automated R&D in key domains', left column, paragraph beginning 'We would consider scenario (2)', condition (a)). _Condition (a) of scenario (2), 'dramatic acceleration'; the spaced ellipsis after 'progress' omits a footnote marker and 'in AI aggregate capabilities'. Measured in AI aggregate capabilities, with footnote 9 defining extended progress as over at least three model generations. Condition (b) requires the doubling to be plausibly attributable to automated research or engineering; scenario (1) is that models could fully substitute for all Research Scientists and Research Engineers at competitive costs._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase gave condition (a) as if sufficient alone, leaving out condition (b), that the doubling plausibly be substantially attributable to automated research or engineering such that continued progress seems likely to bring further acceleration. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: No general definition of reaching a threshold: each row describes a capability that would call for heightened mitigations. Only the Automated R&D row has an operationalization (two alternative scenarios). v3.4 compares the doubling against both the expected rate and the fastest observed extended rate.
- **Google DeepMind · FSF · 2024** (published 2024-05-17): stated
  - “These are capability levels at which, absent mitigation measures, models may pose heightened risk. … define the CCLs as the minimal set of capabilities a model must possess to do so.” (PDF p. 2 (printed p. 2), Framework, component '1 - Critical Capability Levels', second and third sentences)
  - Mapping note: Individual CCLs are defined by capability descriptions, some relative to a comparison ('compared to other means' for Bio amateur enablement level 1).
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “These are capability levels at which, absent mitigation measures, AI models or systems may pose heightened risk of severe harm.” (PDF p. 2 (printed p. 2), Framework, component '1 - Critical Capability Levels', first paragraph, second sentence)
  - Mapping note: The same paragraph says the CCLs were selected 'to be conservative'. Some CCLs carry a baseline in footnotes: CBRN uplift 1 is 'Compared to a counterfactual of not using generative AI systems' (footnote 10); Cyber uplift level 1 is 'Relative to the counterfactual of using 2024 AI technology and tooling' (footnote 13).
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “These are capability levels at which, absent mitigation measures, frontier AI models or systems may pose heightened risk of severe harm.” (PDF p. 4 (printed p. 4), §1.2 Critical Capability Levels, first paragraph, second sentence)
  - Mapping note: Misuse CCLs are worded as 'additional expected harm at severe scale', which footnote 10 (PDF p. 10) defines as 'relative to a baseline without generative AI'.
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “These are capability levels at which, absent mitigation measures, frontier AI models or systems may pose heightened risk of severe harm.” (PDF p. 4 (printed p. 4), §1.2, first paragraph, second sentence). _Defines CCLs._
  - “They represent the capability levels at which, absent mitigation measures, frontier AI models or systems may pose heightened risk of significant but not severe levels of harm.” (PDF p. 18, glossary, entry for Tracked Capability Levels). _Glossary definition of TCLs; the first quotation defines CCLs._
  - Mapping note: Misuse T/CCLs are measured 'relative to a baseline without generative AI' (footnote 8, PDF p. 11).
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated
  - “any risk which could result in hundreds of billions of dollars in economic damage or lead to the severe harm or death of many individuals” (PDF p. 2, Introduction, footnote 1)
  - Mapping note: The edition gives no single cross-category definition of reaching a level. Each level is defined per category in tables with 'Definition' and 'Rationale for threshold' columns (PDF pp. 8–11); the edition calls its estimates for 'medium' through 'critical' speculative (PDF p. 7).
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “Capability thresholds concretely describe things an AI system … could meaningfully increase risk of severe harm.” (PDF p. 5 (printed p. 4), §2.2 Tracked Categories, first paragraph, third sentence)
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated
  - “risk tiers that concretely describe things an AI system might be able to help someone do or might be able to do on its own that could meaningfully increase risk of severe harm” (PDF p. 7 (printed p. 05), §2.2 Systemic risk analysis)
  - Mapping note: Tiers are defined per risk category in §2.4 (PDF pp. 9–12). Separately, §2.1 defines systemic risk by severity, including risks that a model will materially contribute to more than 50 fatalities or $1 billion of damage from a single incident (PDF p. 6).
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): stated, partly (a weaker form than the criterion’s words)
  - “The necessity and extent of deployment of certain safeguards and mitigations may depend on how a model performs on relevant benchmarks.” (PDF p. 10, 'Operational and Societal Risks' › '5. Deployment Decisions', second paragraph, second sentence)
  - Mapping note: No general definition of what reaching a threshold means; thresholds are expressed only as benchmark acceptance criteria (D2.levels). The Scope cross-refers to the TFAIA definition of Catastrophic Risk (PDF p. 1, footnote 1) as risk scope, not as a threshold definition.
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): stated, partly (a weaker form than the criterion’s words)
  - “xAI applies a systemic risk acceptance criteria to each identified risk, incorporating a margin of security, to determine whether each identified systemic risk and the overall systemic risk are acceptable” (PDF p. 5, first §2.3 'Systemic risk acceptance determination', first sentence, up to 'acceptable')
  - Mapping note: The edition defines acceptability of systemic risk rather than a capability threshold; the acceptance criteria themselves are not stated. Residual risk is said to take account of the scale and probability of harm (PDF p. 6).
- **Meta · FAF · v1.1** (published 2025-02-03): stated
  - “The model provides significant uplift towards execution of a threat scenario (i.e. significantly enhances performance on key capabilities or tasks needed to produce a catastrophic outcome) but does not enable execution of any threat scenario that has been identified as potentially sufficient to produce a catastrophic outcome.” (PDF p. 13 (printed p. 13), §3.3 Risk thresholds, Table 1: Risk thresholds for frontier AI, High row, Risk Threshold column (text below the measure label 'Do not release'))
  - “The model would uniquely enable the execution of at least one of the threat scenarios that have been identified as potentially sufficient to produce a catastrophic outcome and that risk cannot be mitigated in the proposed deployment context.” (PDF p. 13 (printed p. 13), §3.3 Risk thresholds, Table 1: Risk thresholds for frontier AI, Critical row, Risk Threshold column (text below the measure label 'Stop development'))
  - “Our high and moderate risk thresholds are defined in terms of the level of uplift a frontier AI provides towards realising a threat scenario.” (PDF p. 12 (printed p. 12), §3.3 Risk thresholds)
  - Mapping note: The Critical row is defined by uniquely enabling a threat scenario whose risk cannot be mitigated in the proposed deployment context; the High and Moderate rows by the level of uplift (PDF p. 12).
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “We define our thresholds based on the extent to which Frontier AI would substantially contribute to the execution of any of the threat scenarios” (PDF p. 3 (printed p. 3), §1.1 Scope, third paragraph, first sentence (opening))
  - Mapping note: Appendix I defines 'substantially contribute' as the model being 'a material factor in a given outcome' (PDF p. 42). The critical threshold additionally covers models that 'could uniquely enable' a threat scenario where risk cannot be mitigated (PDF p. 26); 'uniquely enabling' is defined as 'an essential controlling factor' (PDF p. 42).
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated, partly (a weaker form than the criterion’s words)
  - “The model provides a meaningful uplift to an expert’s … ability to develop and deliver a novel CBRN threat.” (PDF p. 12 (printed p. 11), Appendix I – Capability thresholds, CBRN weapons table, High row, Capability threshold column (first statement))
  - Mapping note: No single general definition of reaching a threshold; the quotation is the High row of the CBRN table, one example. Thresholds are qualitative, per-capability descriptions (§3, PDF p. 6; Appendix I). CBRN and cyber levels are framed as uplift to actors of given skill; autonomy levels by task length and AI R&D automation.
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated, partly (a weaker form than the criterion’s words)
  - “The model provides a meaningful uplift to an expert’s … ability to develop and deliver a novel CBRN threat.” (PDF p. 12 (printed p. 11), Appendix I – Capability thresholds, CBRN weapons table, High row, Capability threshold column (first statement))
  - Mapping note: No single general definition of reaching a threshold; the quotation is the High row of the CBRN table, one example. Thresholds are qualitative, per-capability descriptions (§3, PDF p. 6; Appendix I). CBRN and cyber levels are framed as uplift to actors of given skill; autonomy levels by task length and AI R&D automation.

## D3. Required actions when a threshold is reached

_What does the edition say must happen when a model reaches a threshold?_

### D3.safeguards Safeguards required

**Criterion:** Safeguards, mitigations or standards the edition requires (or states it will apply) for a model at or above a threshold.

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated
  - “the Containment Measures we commit to implement before training such a model, and the Deployment Measures we commit to take before deploying it” (PDF p. 3 (printed p. 3), 'Initial Commitments', numbered item 2 ('ASL-3')). _ASL-3 Containment Measures are mainly model-weight security and internal compartmentalization (PDF p. 8); Deployment Measures include red-teaming, automated detection, internal usage controls and tiered access (PDF pp. 8–9)._
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “The ASL-3 Deployment Standard and the ASL-3 Security Standard … are required.” (PDF p. 7 (printed p. 3), §2, table row 'CBRN weapons', Required Safeguards column). _The omitted words describe these standards as protecting against misuse and model-weight theft by non-state adversaries. For AI R&D the table requires the ASL-3 Security Standard at minimum, expects a higher security standard and an affirmative case on misaligned goals. Criteria for the ASL-3 Deployment and Security Standards are in §4.1–4.2 (PDF pp. 11–13)._
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “The ASL-3 Deployment Standard and the ASL-3 Security Standard … are required.” (PDF p. 8 (printed p. 4), §2, table row 'CBRN', entry 'CBRN-3', Required Safeguards column). _The omitted words describe these standards as protecting against misuse and model-weight theft by non-state adversaries. The same table expects ASL-4 Deployment and Security Standards for CBRN-4, requires the ASL-3 Security Standard plus an affirmative case on misaligned goals for AI R&D-4, and at minimum the ASL-4 Security Standard for AI R&D-5. Required Safeguards are to be described at minimum before training or deploying a model reaching a threshold (PDF p. 8)._
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “The ASL-3 Deployment Standard and the ASL-3 Security Standard … are required.” (PDF p. 8 (printed p. 4), §2, table row 'CBRN', entry 'CBRN-3', Required Safeguards column). _The omitted words describe these standards as protecting against misuse and model-weight theft by non-state adversaries. The same table expects ASL-4 Deployment and Security Standards for CBRN-4, requires the ASL-3 Security Standard plus an affirmative case on misaligned goals for AI R&D-4, and at minimum the ASL-4 Security Standard for AI R&D-5. Footnote 11 (PDF p. 13) places sophisticated or state-compromised insiders out of scope for the ASL-3 Security Standard._
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated
  - “We will maintain or improve on our ASL-3 protections, which include classifier guards at least as robust as our initial Constitutional Classifiers” (PDF p. 6, §1, threshold table, row 'Non-novel chemical/biological weapons production', middle column ('Mitigations—our plan as a company'))
  - Mapping note: Company plans (middle column) are separated from industry-wide recommendations (right column), which the edition says it cannot unilaterally and unconditionally commit to. For the novel chemical/biological row the company column extends protections at least as strong as ASL-3 to more use cases; for the high-stakes sabotage opportunities and Automated R&D rows it lists Risk Report disclosure, security and alignment projects rather than a named standard.
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated
  - “We will maintain or improve on our ASL-3 protections, which include classifier guards at least as robust as our initial Constitutional Classifiers” (PDF p. 6, §1, threshold table, row 'Non-novel chemical/biological weapons production', middle column ('Mitigations—our plan as a company')). _The cell opens by stating that Anthropic will maintain or improve on its ASL-3 protections, which include these guards._
  - Mapping note: Company plans (middle column) are separated from industry-wide recommendations (right column), which the edition says it cannot unilaterally and unconditionally commit to. For the novel chemical/biological row the company column extends protections at least as strong as ASL-3 to more use cases; for the high-stakes sabotage opportunities and Automated R&D rows it lists Risk Report disclosure, security and alignment projects rather than a named standard.
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated
  - “We will maintain or improve on our ASL-3 protections, which include classifier guards at least as robust as our initial Constitutional Classifiers” (PDF p. 6, §1, threshold table, row 'Non-novel chemical/biological weapons production', middle column ('Mitigations—our plan as a company')). _The guards are described as at least as robust as the initial Constitutional Classifiers; the list continues with access controls, red-teaming, bug bounties, threat intelligence and security controls._
  - Mapping note: Company plans (middle column) are separated from industry-wide recommendations (right column), which the edition says it cannot unilaterally and unconditionally commit to. For the novel chemical/biological row the company column extends protections at least as strong as ASL-3 to more use cases; for the high-stakes sabotage opportunities and Automated R&D rows it lists Risk Report disclosure, security and alignment projects rather than a named standard.
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated
  - “We will maintain or improve on our ASL-3 protections, which include classifier guards at least as robust as our initial Constitutional Classifiers” (PDF p. 6, §1, threshold table, row 'Non-novel chemical/biological weapons production', middle column ('Mitigations—our plan as a company')). _The cell opens by stating that Anthropic will maintain or improve on its ASL-3 protections, which include these guards._
  - Mapping note: Company plans (middle column) are separated from industry-wide recommendations (right column), which the edition says it cannot unilaterally and unconditionally commit to. For the novel chemical/biological row the company column extends protections at least as strong as ASL-3 to more use cases; for the misaligned AI systems in high-stakes settings and Automated R&D rows it lists Risk Report disclosure, security and alignment projects rather than a named standard.
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated
  - “We will maintain or improve on our ASL-3 protections, which include classifier guards at least as robust as our initial Constitutional Classifiers” (PDF p. 6, §1, threshold table, row 'Non-novel chemical/biological weapons production', middle column ('Mitigations—our plan as a company')). _The cell opens by stating that Anthropic will maintain or improve on its ASL-3 protections, which include these guards._
  - Mapping note: Company plans (middle column) are separated from industry-wide recommendations (right column), which the edition says it cannot unilaterally and unconditionally commit to. For the novel chemical/biological row the company column extends protections at least as strong as ASL-3 to more use cases; for the misaligned AI systems in high-stakes settings and Automated R&D rows it lists Risk Report disclosure, security and alignment projects rather than a named standard.
- **Google DeepMind · FSF · 2024** (published 2024-05-17): stated, partly (a weaker form than the criterion’s words)
  - “When a model reaches evaluation thresholds (i.e. passes a set of early warning evaluations), we will formulate a response plan based on the analysis of the CCL and evaluation results.” (PDF p. 2 (printed p. 2), Framework, component '3 - Applying mitigations', first paragraph, first sentence)
  - “we will develop mitigation plans that map the CCLs to the security and deployment levels described.” (PDF p. 6 (printed p. 6), Future work, bullet 'Mitigation plans', last sentence)
  - Mapping note: The edition defines Security Levels 0–4 and Deployment Levels 0–3 (PDF pp. 3–4) but does not assign a level to any CCL; the mapping is stated as future work. Reaching a threshold leads to a response plan; the edition's provision for holding deployment or development when mitigations are not ready is quoted under D3 Pause, non-deployment or non-training.
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “The following deployment mitigation process will be applied to models reaching a CCL” (PDF p. 4 (printed p. 4), Misuse, Mitigation Approach, 'Deployment Mitigations', first sentence)
  - “We recommend a security level to each of these CCLs” (PDF p. 4 (printed p. 4), Misuse Critical Capability Levels, first paragraph, third sentence)
  - Mapping note: Recommended security levels in Table 1 range from 'generally aligned with RAND SL 2' to RAND SL 4; they are described as recommendations for the field. For Instrumental Reasoning Level 1 the mitigation is automated monitoring of chain-of-thought (Table 2).
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “The following mitigation process for external deployments will be applied to models reaching a misuse CCL” (PDF p. 8 (printed p. 8), §2.1.2 Deployment Mitigations, first sentence)
  - “The following mitigation process will be applied for deployments of a model reaching a ML R&D CCL.” (PDF p. 12 (printed p. 12), §3.1.2 Deployment Mitigations, first sentence)
  - Mapping note: Recommended security levels per CCL (Security level 2 for misuse CCLs; 3 and 4 for ML R&D CCLs) are given in Tables 2.2.1.a–3.2.1.a and described as the minimum the field should apply. Risk acceptance (§1.6) also allows security judged adequate on other grounds (see D6.discretion).
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “The following mitigation process for external deployments will be applied to models reaching a misuse T/CCL” (PDF p. 10 (printed p. 10), §2.1.2 Deployment Mitigations, first sentence)
  - “We recommend a security level for each CCL” (PDF p. 11 (printed p. 11), §2.2 Misuse Capability Levels, first paragraph, third sentence)
  - Mapping note: Recommended security levels: 'Security level 2+' (defined on PDF p. 9 as RAND SL2 plus insider-threat and non-state-actor measures) for CBRN, cyber and harmful manipulation CCLs; 3 and 4 for ML R&D CCLs. A parallel deployment process applies to ML R&D and Misalignment T/CCLs (§3.1.2). For the Stealth and Situational Awareness TCL, safeguards such as chain-of-thought monitoring are applied if residual risk from internal deployment is deemed unacceptable (PDF p. 14).
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated
  - “we will ensure that our security is hardened in a way that is designed to prevent our mitigations and controls from being circumvented via exfiltration” (PDF p. 20, Governance › Safety baselines › 'Asset Protection', first sentence)
  - Mapping note: The other two safety baselines (restricting deployment and development, PDF p. 21) require mitigations that bring post-mitigation risk to set levels; they are recorded under the pause facet.
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “Covered systems that cross this capability threshold are required to have robust and effective safeguards … before they are deployed and appropriate security controls as they are developed.” (PDF p. 5 (printed p. 4), §2.2 Tracked Categories, first paragraph, sentence following the definition of High capability thresholds)
  - Mapping note: Refers to High thresholds. Table 1 lists risk-specific safeguard guidelines, and Appendix C gives illustrative safeguards and the security practices required for High capability models (PDF pp. 17–22).
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated
  - “OpenAI tailors these measures to the capability of a model and its deployment, as appropriate, to mitigate systemic risks to acceptable levels.” (PDF p. 13 (printed p. 11), §2.5 Safety mitigations, first paragraph, second sentence)
  - Mapping note: No tier-by-tier safeguard requirements are stated; safeguards are tied to residual risk being within acceptable levels. Security mitigations are listed in §3 (PDF pp. 16–17).
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): stated
  - “we continue to design and deploy the following safeguards into our models: … Input and output filters” (PDF p. 6, 'Addressing Risks of Malicious Use' › '3. Safeguard Implementation', second paragraph lead-in and third bullet). _The list also names safety training and system prompts._
  - “information security standards sufficient to prevent its critical model information from being stolen by a motivated non-state actor.” (PDF p. 9, 'Operational and Societal Risks' › '3. Information Security', first sentence)
  - Mapping note: Safeguards are stated for deployed models generally and are not keyed to a capability threshold; heightened safeguards are triggered by prompts posing a foreseeable risk of mass-casualty or WMD use (PDF p. 3).
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): stated, partly (a weaker form than the criterion’s words)
  - “xAI implements appropriate safety mitigations to address the systemic risks stemming from our models” (PDF p. 6, second §2.3 'Safety mitigations', first sentence (opening))
  - “xAI will maintain a documented Security Goal that identifies the threat actors against which mitigations are designed to protect against” (PDF p. 7, §2.4 Security mitigations, first paragraph, first sentence (opening))
  - Mapping note: Mitigations are not keyed to named thresholds; the closest threshold-linked provision is the risk-acceptance condition quoted under D3 Pause, non-deployment or non-training. CBRN-specific heightened safeguards are triggered by prompts demonstrating intent (PDF p. 3).
- **Meta · FAF · v1.1** (published 2025-02-03): stated
  - “Access is limited to a core research team, alongside security protections to prevent hacking or exfiltration.” (PDF p. 13 (printed p. 13), §3.3 Risk thresholds, Table 1: Risk thresholds for frontier AI, High row, Measures column, security mitigations)
  - Mapping note: The High row also requires mitigations that reduce risk to moderate levels. The Critical row limits access further, with security protections qualified by feasibility and commercial practicability (see “Other exceptions or discretion”); measures at the moderate level depend on evaluations and the release strategy.
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “Proceed with deployment of the Frontier AI only if sufficient mitigations are defined, implemented and validated to reduce risk to that of a moderate or lower model.” (PDF p. 15 (printed p. 15), §3.3 Risk Thresholds, Table 1, High row, Measures column, under the label 'Deploy with mitigations')
  - Mapping note: Table 1 also assigns security measures: heightened access controls to model weights for High and Critical (for Critical 'as overseen by the Chief AI Officer and/or Director of Alignment and Risk … insofar as is technically feasible and commercially practicable').
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated
  - “Models posing high-risk … will be subject to security measures protective against most cybercrime groups and insider threats.” (PDF p. 8 (printed p. 7), §4 Mitigations, Security measures, fourth paragraph, first sentence)
  - Mapping note: Safety mitigations are applied 'so that the model’s risk level remains at low or medium once mitigations have been applied' (PDF p. 8); critical-risk models are subject to 'the highest level of security safeguards' (PDF p. 8).
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “Models posing high-risk … will be subject to security measures protective against most cybercrime groups and insider threats.” (PDF p. 8 (printed p. 7), §4 Mitigations, Security measures, fourth paragraph, first sentence)
  - Mapping note: Safety mitigations are applied 'so that the model’s risk level remains at low or medium once mitigations have been applied' (PDF p. 8); critical-risk models are subject to 'the highest level of security safeguards' (PDF p. 8).

### D3.halt Pause, non-deployment or non-training

**Criterion:** A statement that development, training or deployment will stop, pause or not proceed when required safeguards are not in place or a level is reached.

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated
  - “we commit to pause the scaling … and/or delay the deployment of new models whenever our scaling ability outstrips our ability to comply with the safety procedures for the corresponding ASL” (PDF p. 2 (printed p. 2), Framework, paragraph beginning 'Complying with higher ASLs', second sentence). _The ellipsis omits a footnote marker. The Evaluation Protocol response policy (PDF p. 13, step 2) also requires pausing training when an evaluation triggers and sufficient Containment Measures are not yet implemented._
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “we are unable to make the showing required above, we will restrict model deployment and further scaling.” (PDF p. 14 (printed p. 10), §4.3 Safeguards Decision, final sentence). _§4.3: the showing is that the Required Safeguards are implemented. 'Restrict' is the edition's word; §6 describes interim measures and, failing those, further restrictions._
  - “If the pretraining model’s capabilities are comparable or greater, we will pause training until we have implemented the ASL-3 Security Standard and established it is sufficient for the model.” (PDF p. 15 (printed p. 11), §6.2 Restrict Deployment and Further Scaling, bullet 'Monitoring pretraining', third sentence). _'The pretraining model' is compared with the model that required the ASL-3 Security Standard (same paragraph); footnote treats the Security Standard alone as sufficient to continue training._
  - Mapping note: Deployment and further scaling are 'restricted' (not stated as paused) if the Required Safeguards showing cannot be made; training pauses in the stated pretraining case.
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “we are unable to make the showing required above, we will restrict model deployment and further scaling.” (PDF p. 14 (printed p. 10), §4.3 Safeguards Decision, final sentence). _§4.3: the showing is that the Required Safeguards are implemented. 'Restrict' is the edition's word; §6 describes interim measures and, failing those, further restrictions._
  - “If the pretraining model’s capabilities are comparable or greater, we will pause training until we have implemented the ASL-3 Security Standard and established it is sufficient for the model.” (PDF p. 15 (printed p. 11), §6.2 Restrict Deployment and Further Scaling, bullet 'Monitoring pretraining', third sentence). _'The pretraining model' is compared with the model that required the ASL-3 Security Standard (same paragraph); footnote treats the Security Standard alone as sufficient to continue training._
  - Mapping note: Deployment and further scaling are 'restricted' (not stated as paused) if the Required Safeguards showing cannot be made; training pauses in the stated pretraining case.
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “we are unable to make the showing required above, we will restrict model deployment and further scaling.” (PDF p. 14 (printed p. 10), §4.3 Safeguards Decision, final sentence). _§4.3: the showing is that the Required Safeguards are implemented. 'Restrict' is the edition's word; §6 describes interim measures and, failing those, further restrictions._
  - “If the pretraining model’s capabilities are comparable or greater, we will pause training until we have implemented the ASL-3 Security Standard and established it is sufficient for the model.” (PDF p. 15 (printed p. 11), §6.2 Restrict Deployment and Further Scaling, bullet 'Monitoring pretraining', third sentence). _'The pretraining model' is compared with the model that required the ASL-3 Security Standard (same paragraph); footnote treats the Security Standard alone as sufficient to continue training._
  - Mapping note: Deployment and further scaling are 'restricted' (not stated as paused) if the Required Safeguards showing cannot be made; training pauses in the stated pretraining case.
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated
  - “We will delay AI development and deployment as needed to achieve this, until and unless we no longer believe we have a significant lead.” (PDF p. 16, Appendix A: Commitments Related to Competitors, table row 'Anthropic in the lead', Commitment column, second sentence). _Applies only in Appendix A's 'Anthropic in the lead' scenario. 'This' refers to a strong argument that catastrophic risk is contained, along the lines of the industry-wide recommendations._
  - Mapping note: The only delay commitments are in Appendix A and are tied to competitor scenarios (Anthropic in the lead; competitors with strong safety measures); see D6.competitor. No passage commits to not training or deploying a model without adequate safeguards (the dataset records that provision as not found in this edition).
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated
  - “We will delay AI development and deployment as needed to achieve this, until and unless we no longer believe we have a significant lead.” (PDF p. 17 (printed p. 16), Appendix A: Commitments Related to Competitors, table row 'Anthropic in the lead', Commitment column, second sentence). _Applies only in Appendix A's 'Anthropic in the lead' scenario. 'This' refers to a strong argument that catastrophic risk is contained, along the lines of the industry-wide recommendations._
  - “the commitments below do not preclude us from taking cautionary action, such as refraining from training or deploying models, in other circumstances.” (PDF p. 16 (printed p. 15), Appendix A: Commitments Related to Competitors, introductory paragraph, second-to-last sentence). _The next sentence says Anthropic 'would strongly consider pausing development and/or deployment' to improve the safety profiles of its models._
  - Mapping note: Delay commitments are tied to Appendix A competitor scenarios (see D6.competitor); outside them the edition says it would 'strongly consider' pausing (conditional wording, added in v3.1). No passage commits to not training or deploying a model without adequate safeguards (the dataset records that provision as not found in this edition).
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated
  - “We will delay AI development and deployment as needed to achieve this, until and unless we no longer believe we have a significant lead.” (PDF p. 17 (printed p. 16), Appendix A: Commitments Related to Competitors, table row 'Anthropic in the lead', Commitment column, second sentence). _Applies only in Appendix A's 'Anthropic in the lead' scenario. 'This' refers to a strong argument that catastrophic risk is contained, along the lines of the industry-wide recommendations._
  - “the commitments below do not preclude us from taking cautionary action, such as refraining from training or deploying models, in other circumstances.” (PDF p. 17 (printed p. 16), Appendix A: Commitments Related to Competitors, introductory paragraph, second-to-last sentence). _The next sentence says Anthropic 'would strongly consider pausing development and/or deployment' to improve the safety profiles of its models._
  - Mapping note: Delay commitments are tied to Appendix A competitor scenarios (see D6.competitor); outside them the edition says it would 'strongly consider' pausing (conditional wording, added in v3.1). No passage commits to not training or deploying a model without adequate safeguards (the dataset records that provision as not found in this edition).
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated
  - “We will delay AI development and deployment as needed to achieve this, until and unless we no longer believe we have a significant lead.” (PDF p. 17 (printed p. 16), Appendix A: Commitments Related to Competitors, table row 'Anthropic in the lead', Commitment column, second sentence). _Applies only in Appendix A's 'Anthropic in the lead' scenario. 'This' refers to a strong argument that catastrophic risk is contained, along the lines of the industry-wide recommendations._
  - “the commitments below do not preclude us from taking cautionary action, such as refraining from training or deploying models, in other circumstances.” (PDF p. 17 (printed p. 16), Appendix A: Commitments Related to Competitors, introductory paragraph, second-to-last sentence). _The next sentence says Anthropic 'would strongly consider pausing development and/or deployment' to improve the safety profiles of its models._
  - Mapping note: Delay commitments are tied to Appendix A competitor scenarios (see D6.competitor); outside them the edition says it would 'strongly consider' pausing (conditional wording, added in v3.1). No passage commits to not training or deploying a model without adequate safeguards (the dataset records that provision as not found in this edition).
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated
  - “We will delay AI development and deployment as needed to achieve this, until and unless we no longer believe we have a significant lead.” (PDF p. 17, Appendix A: Commitments Related to Competitors, table row 'Anthropic in the lead', Commitment column, second sentence). _Applies only in Appendix A's 'Anthropic in the lead' scenario. 'This' refers to a strong argument that catastrophic risk is contained, along the lines of the industry-wide recommendations._
  - “the commitments below do not preclude us from taking cautionary action, such as refraining from training or deploying models, in other circumstances.” (PDF p. 17 (printed p. 17), Appendix A: Commitments Related to Competitors, introductory paragraph, second-to-last sentence). _The next sentence says Anthropic 'would strongly consider pausing development and/or deployment' to improve the safety profiles of its models._
  - Mapping note: Delay commitments are tied to Appendix A competitor scenarios (see D6.competitor); outside them the edition says it would 'strongly consider' pausing (conditional wording, added in v3.1). No passage commits to not training or deploying a model without adequate safeguards (the dataset records that provision as not found in this edition).
- **Google DeepMind · FSF · 2024** (published 2024-05-17): stated
  - “A model may reach evaluation thresholds before mitigations at appropriate levels are ready. If this happens, we would put on hold further deployment or development, or implement additional protocols” (PDF p. 2 (printed p. 2), Framework, component '3 - Applying mitigations', third paragraph, first sentence and opening of second sentence). _Putting on hold is one of two alternatives; the other is 'additional protocols (such as the implementation of more precise early warning evaluations for a given CCL)'._
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “If this happens, the response plan may involve putting deployment or further development on hold until adequate mitigations can be applied.” (PDF p. 3 (printed p. 3), Framework, component '3 - Applying Mitigations', third paragraph, second sentence). _'This' is a model flagged by an alert threshold being assessed to pose risks for which readily available mitigations may not be sufficient._
  - Mapping note: Conditional wording ('may involve'). Deployment is also conditioned on safety-case approval (see D4.determination).
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “external deployments of a model take place only after the appropriate governance function determines the safety case regarding each CCL the model has reached to be adequate.” (PDF p. 9 (printed p. 9), §2.1.2 Deployment Mitigations, numbered step 2, first sentence)
  - “This is required only for external deployment, not further development.” (PDF p. 7 (printed p. 7), §1.6 Summary of Risk Acceptance Criteria, misuse CCL bullet, first sub-bullet, final sentence). _Refers to the deployment-mitigation acceptance criterion for misuse CCLs._
  - Mapping note: A deployment gate: external deployment, and for ML R&D CCLs also large scale internal deployment (PDF p. 12), takes place only after governance approval of a safety case. The misuse deployment-mitigation criterion applies 'only for external deployment, not further development'. No passage states that development will be put on hold (the v2.0 'on hold' sentence is absent).
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “external deployments of a model take place only after the appropriate governance function determines the residual risk to be acceptable” (PDF p. 10 (printed p. 10), §2.1.2 Deployment Mitigations, numbered step 2, first sentence). _The sentence continues '(including a safety case where a CCL has been reached)'._
  - Mapping note: A deployment gate: external deployment (and, under §3.1.2, high-risk internal deployment) takes place only after a governance determination that residual risk is acceptable. The misuse deployment-mitigation acceptance criterion is 'required only for external deployment, not internal deployment or further development' (PDF p. 7). No passage states that development will be put on hold.
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated
  - “Only models with a post-mitigation score of "medium" or below can be deployed.” (PDF p. 21, Governance › Safety baselines › 'Restricting deployment', first sentence)
  - “Only models with a post-mitigation score of "high" or below can be developed further.” (PDF p. 21, Governance › Safety baselines › 'Restricting development', first sentence)
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “We do not deploy models that reach a High capability threshold until the associated risks that they pose are sufficiently minimized.” (PDF p. 4 (printed p. 3), §1 Introduction, third bullet ('Safeguard against severe harms'), second sentence)
  - “If a model under development reaches a Critical capability threshold, we also require safeguards to sufficiently minimize the associated risks during development, irrespective of deployment plans.” (PDF p. 4 (printed p. 3), §1 Introduction, third bullet). _Table 1 (PDF pp. 6–7) states in the response column of each Critical row that further development halts until safeguards and security controls meeting a Critical standard are specified. The text layer interleaves the table’s columns, so that wording is described here rather than quoted._
  - Mapping note: The deployment statement is conditioned on risks being 'sufficiently minimized'. §4.3 allows adjustment of required safeguards under stated conditions (see the competitor facet).
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated
  - “If residual risks associated with the model exceed acceptable risk levels, the model is not deployed unless additional mitigation measures are implemented that sufficiently minimize risk.” (PDF p. 13 (printed p. 11), §2.5 Safety mitigations, first paragraph, third sentence)
  - Mapping note: The condition is residual risk relative to acceptable levels, not a named tier; the statement concerns deployment, not training.
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): stated, partly (a weaker form than the criterion’s words)
  - “If we determine that allowing a system to continue running would materially and unjustifiably increase the likelihood of a catastrophic event, we may temporarily fully shut down” (PDF p. 9, 'Operational and Societal Risks' › '4. Governance Approach', numbered list item 3). _An incident-response provision for an imminent threat (Governance Approach, item 4); the shutdown is optional ('may')._
  - Mapping note: This is an incident-response option ('may') in the event of an imminent threat, not a stated consequence of reaching a threshold. The deployment acceptance criteria (D2.levels) are not accompanied by an explicit statement that deployment will not proceed if they are not met.
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): stated
  - “xAI will only proceed with the development, the making available on the market, and/or the use of the model, if the systemic risks stemming from the model are determined to be acceptable.” (PDF p. 6, first §2.3 'Systemic risk acceptance determination', fourth paragraph, first sentence)
- **Meta · FAF · v1.1** (published 2025-02-03): stated
  - “If a frontier AI is assessed to have reached the critical risk threshold and cannot be mitigated, we will stop development and implement the measures outlined in Table 1.” (PDF p. 12 (printed p. 12), §3.3 Risk thresholds, first paragraph, third sentence)
  - “If the results of our evaluations indicate that a frontier AI has a “high” risk threshold … we will not release the frontier AI externally.” (PDF p. 17 (printed p. 17), §4.2 Evaluation and mitigation, paragraph beginning 'We may take into account monetary costs', second sentence)
  - “If a model appears to uniquely enable the execution of a threat scenario we will pause development while we investigate whether barriers to realizing the catastrophic outcome remain.” (PDF p. 13 (printed p. 13), §3.3 Risk thresholds, Table 1: Risk thresholds for frontier AI, Critical row, Measures column, first bullet, second sentence)
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “we will only continue development of the Frontier AI if our risk assessments are complete and safeguards are defined, implemented and validated” (PDF p. 17 (printed p. 17), §3.3 Risk Thresholds, final sentence of the paragraph beginning on PDF p. 16). _Opens 'Should either scenario arise' (the two critical-threshold scenarios); the sentence continues 'to reduce risk to the moderate or lower risk threshold'._
  - Mapping note: Applies to either critical-threshold scenario. Development and deployment are conditioned on validated mitigations rather than stopped; for cyber, a model meeting the simple-suite threshold is provisionally rated high and 'such deployment will not be implemented' until complex evaluation is complete (PDF p. 29); the change log records the critical measure changing from 'Stop' to 'Develop with Mitigations' (see D8.changes).
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated
  - “If, during the implementation of this framework, we identify a risk we cannot sufficiently mitigate, we will pause development and deployment” (PDF p. 9 (printed p. 8), §4 Mitigations, Safety mitigations, paragraph 'Post-mitigation capability assessment and safety buffer', second sentence)
  - Mapping note: The pause is tied to unmitigable risk rather than to reaching a level; high or critical models are 'subject to further review and safety and security mitigations prior to deployment' (PDF p. 7).
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “If, during the implementation of this framework, we identify a risk we cannot sufficiently mitigate, we will pause development and deployment” (PDF p. 9 (printed p. 8), §4 Mitigations, Safety mitigations, paragraph 'Post-mitigation capability assessment and safety buffer', second sentence)
  - Mapping note: The pause is tied to unmitigable risk rather than to reaching a level; high or critical models are 'subject to further review and safety and security mitigations prior to deployment' (PDF p. 7).

## D4. Who decides

_Who determines thresholds and safeguard adequacy, and who oversees those decisions?_

### D4.determination Determination of capability or safeguard adequacy

**Criterion:** The person, office or body the edition names as making or approving the determination that a threshold is reached, that safeguards are adequate, or that a model may be deployed.

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated, partly (a weaker form than the criterion’s words)
  - “Stakeholders including the CISO and CEO should be immediately convened to determine whether the level of danger merits deletion of the weights.” (PDF p. 13 (printed p. 13), Evaluation Protocol, bullet 'Response policy', step (2c), second sentence). _Applies where a model has already surpassed the next ASL during training._
  - Mapping note: The edition does not name who determines that an ASL threshold has been reached or that safeguards are adequate; analyses in the response policy are stated without a named decision-maker. The named determination concerns weight deletion. A designated Responsible Scaling Officer is responsible for ensuring commitments are executed (PDF p. 10, item 7).
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “Safeguards Report(s) will be escalated to the CEO and the Responsible Scaling Officer, who will (1) make the ultimate determination” (PDF p. 13 (printed p. 9), §4.3 Safeguards Decision, second bullet). _The determination is whether the Required Safeguards are satisfied, and item (2) gives the same officers any deployment-related decisions. §3.3 (PDF p. 10) gives the CEO and RSO the parallel determination on Capability Reports._
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “Safeguards Report(s) will be escalated to the CEO and the Responsible Scaling Officer, who will (1) make the ultimate determination” (PDF p. 14 (printed p. 10), §4.3 Safeguards Decision, numbered item 2). _The determination is whether the Required Safeguards are satisfied, and item (2) gives the same officers any deployment-related decisions. §3.3 (PDF p. 11) gives the CEO and RSO the parallel determination on Capability Reports._
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “Safeguards Report(s) will be escalated to the CEO and the Responsible Scaling Officer, who will (1) make the ultimate determination” (PDF p. 14 (printed p. 10), §4.3 Safeguards Decision, numbered item 2). _The determination is whether the Required Safeguards are satisfied, and item (2) gives the same officers any deployment-related decisions. §3.3 (PDF p. 11) gives the CEO and RSO the parallel determination on Capability Reports._
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated
  - “CEO and RSO will make the ultimate determination regarding the adequacy of the risk assessment and any downstream deployment or development plans.” (PDF p. 12, §3.4 Procedures, item 3 ('Executive approval'), second sentence)
  - Mapping note: The determination is tied to approval of a Risk Report rather than to a per-threshold capability or safeguards determination. The RSO's duties also include approving relevant model development or deployment decisions (§4, item 1).
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated
  - “CEO and RSO will make the ultimate determination regarding the adequacy of the risk assessment and any downstream deployment or development plans.” (PDF p. 13 (printed p. 12), §3.4 Procedures, item 3 ('Executive approval'), second sentence)
  - Mapping note: The determination is tied to approval of a Risk Report rather than to a per-threshold capability or safeguards determination. The RSO's duties also include approving relevant model development or deployment decisions (§4, item 1).
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated
  - “CEO and RSO will make the ultimate determination regarding the adequacy of the risk assessment and any downstream deployment or development plans.” (PDF p. 13 (printed p. 12), §3.4 Procedures, item 3 ('Executive approval'), second sentence)
  - Mapping note: The determination is tied to approval of a Risk Report rather than to a per-threshold capability or safeguards determination. The RSO's duties also include approving relevant model development or deployment decisions (§4, item 1).
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated
  - “CEO and RSO will make the ultimate determination regarding the adequacy of the risk assessment and any downstream deployment or development plans.” (PDF p. 13 (printed p. 12), §3.4 Procedures, item 3 ('Executive approval'), second sentence)
  - Mapping note: The determination is tied to approval of a Risk Report rather than to a per-threshold capability or safeguards determination. The RSO's duties also include approving relevant model development or deployment decisions (§4, item 1).
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated
  - “CEO and RSO will make the ultimate determination regarding the adequacy of the risk assessment and any downstream deployment or development plans.” (PDF p. 13, §3.4 Procedures, item 3 ('Executive approval'), second sentence)
  - Mapping note: The determination is tied to approval of a Risk Report rather than to a per-threshold capability or safeguards determination. The RSO's duties also include approving relevant model development or deployment decisions (§4, item 1).
- **Google DeepMind · FSF · 2024** (published 2024-05-17): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–7 (all sections, both tables, footnotes and acknowledgements read)
  - Searched for: “council”, “approv”, “decid/decision”, “determin”, “govern”, “board”, “leadership/executive”, “review”
  - Hits set aside: PDF p. 2 'We determine CCLs by analyzing several high-risk domains': describes how CCLs are defined, names no person or body that determines a model has reached one. PDF p. 2 'additional risks flagged by the review': no reviewer named. PDF p. 1 'It will be reviewed periodically' concerns the Framework (D8.process). PDF p. 7 'under the leadership of' names the Framework's authors, not a decision role. 'govern' hits only in a footnote URL (PDF p. 1). No council, board or approval step found.
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “the response plan will be reviewed and approved by appropriate corporate governance bodies such as the Google DeepMind AGI Safety Council” (PDF p. 7 (printed p. 7), Governance and Accountability, 'Governance', first sentence). _Applies 'when alert thresholds are reached'. The sentence also names the Google DeepMind Responsibility and Safety Council and/or Google Trust & Compliance Council, and opens 'For Google models'._
  - “general availability deployment … of a model takes place only after the appropriate corporate governance body determines the safety case regarding each CCL the model has reached to be adequate.” (PDF p. 4 (printed p. 4), Misuse, Mitigation Approach, 'Deployment Mitigations', numbered step 2). _Footnote marker 8 omitted at the ellipsis._
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “external deployments of a model take place only after the appropriate governance function determines the safety case regarding each CCL the model has reached to be adequate.” (PDF p. 9 (printed p. 9), §2.1.2 Deployment Mitigations, numbered step 2, first sentence)
  - “We then determine whether the model has met or will meet a CCL” (PDF p. 5 (printed p. 5), §1.3, 'Acceptance determination and mitigations' bullet, first sentence)
  - Mapping note: The 'appropriate governance function' is not named; the v2.0 councils are not mentioned. 'We' (the developer) makes the CCL determination.
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “external deployments of a model take place only after the appropriate governance function determines the residual risk to be acceptable” (PDF p. 10 (printed p. 10), §2.1.2 Deployment Mitigations, numbered step 2, first sentence). _The sentence continues '(including a safety case where a CCL has been reached)'._
  - Mapping note: The 'appropriate governance function' is not named. The same function may also exempt low-risk external deployments from a critical capability assessment (see D6.discretion).
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated
  - “The OpenAI Leadership, i.e., the CEO or a person designated by them, serves as the default decision-maker on all decisions” (PDF p. 23, Governance › Operations › Parties, paragraph on OpenAI Leadership)
  - Mapping note: The Safety Advisory Group assesses each case and its Chair forwards a recommendation to Leadership (PDF p. 24); the Security team assesses and implements the asset-protection baseline (PDF p. 20).
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “OpenAI Leadership can approve or reject these recommendations, and our Board’s Safety and Security Committee provides oversight of these decisions.” (PDF p. 4 (printed p. 3), §1 Introduction, final paragraph, second sentence). _'These recommendations' are those of the Safety Advisory Group (SAG)._
  - Mapping note: The SAG reviews the Capabilities Report and decides on next steps (§3.3, PDF p. 10) and assesses whether safeguards sufficiently minimize risk (§4.2, PDF p. 11); Appendix B gives OpenAI Leadership (the CEO or a designee) all final decisions, including deployment go/no-go (PDF p. 16).
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated, partly (a weaker form than the criterion’s words)
  - “We document a justification for why the systemic risks stemming from the model are acceptable, including reasonably foreseeable conditions under which the justification may no longer hold, as informed by recommendations from OpenAI’s Safety Advisory Group and external experts, as available and appropriate.” (PDF p. 13 (printed p. 11), §2.5 Safety mitigations, second paragraph, second sentence)
  - “Additional detail about our deployment governance can be found in Appendix B of the PF.” (PDF p. 20 (printed p. 18), §6 Allocation of responsibility for risk management, final sentence)
  - Mapping note: The edition does not itself name who makes the acceptance or deployment determination; it names advisers and refers to the Preparedness Framework's Appendix B.
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–11 (p. 12 blank): all sections read
  - Searched for: “decid/decision”, “approv”, “risk owner”, “leadership”, “officer”, “board”, “determin”
  - Hits set aside: PDF p. 9 '4. Governance Approach' designates 'risk owners' responsible for mitigating identified risks, periodic audits and monitoring for incidents, but does not give them (or any named person or body) the determination of thresholds, safeguard adequacy or deployment; PDF p. 9 'If we determine…' items refer to xAI generically during incident response; PDF p. 10 '5. Deployment Decisions' says 'We will also balance various factors when making deployment decisions' without naming a decision-maker.
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–9 (p. 10 blank): all sections read
  - Searched for: “decid/decision”, “approv”, “risk owner”, “leadership”, “officer”, “determin”
  - Hits set aside: PDF p. 6 'The final decision also reflects an overall judgment based on all the available evidence' does not name who decides (recorded under D6.discretion); PDF pp. 2, 5, 6 'determine/determination' refer to xAI generically; PDF p. 8 §3 designates risk owners for mitigating risks and monitoring incidents, not for threshold, safeguard or deployment determinations; PDF p. 9 §4 refers to 'internal governance structures' without naming a body.
  - Archive check: Confirmed not found on 2026-10-26 by a cross-family archive check of the Internet Archive capture of 2026-07-16 (https://web.archive.org/web/20260716003429/https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf), whose SHA-256 matches the recorded publisher copy; see research/archive-checks-2026-10-26/codex-report.md.
- **Meta · FAF · v1.1** (published 2025-02-03): stated
  - “Informed by this analysis, a leadership team will either request further testing or information, require additional mitigations or improvements, or they will approve the model for release.” (PDF p. 8 (printed p. 8), §2.1.3 Decide, 'Make a decision on release', second sentence)
  - “A final assessment of uplift is approved by senior-level decision-makers through our AI Risk process (see Section 2.1).” (PDF p. 13 (printed p. 13), §3.3 Risk thresholds, footnote 7 (attached to Table 1, High row, Risk Threshold column), third and final sentence)
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “the Chief AI Officer and Director of Alignment and Risk … will assign a risk threshold.” (PDF p. 6 (printed p. 6), §2.1.2 Evaluate and Mitigate, 'Evaluate for performance and safety', paragraph beginning 'These assessments typically use a version of the Frontier AI', second sentence (footnote marker omitted))
  - “the Chief AI Officer or the Director of Alignment and Risk will determine whether to … approve the model for deployment.” (PDF p. 7 (printed p. 7), §2.1.3 Decide, 'Make a decision on deployment', second sentence)
  - Mapping note: Threshold assignment names both officers ('and'); the deployment decision names either ('or'). §2.3 adds that deployment follows 'with the approval of the Chief AI Officer' (PDF p. 10).
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated
  - “The Executive Officers (or their delegates) will make the final decision on whether to approve the recommendation for secure and trustworthy deployment.” (PDF p. 10 (printed p. 9), §5 Governance, Risk-informed deployment decision, second paragraph, first sentence)
  - Mapping note: No named role assigns the pre-mitigation score; the Executive Officers are those 'responsible for Microsoft’s AI governance program'.
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “The Executive Officers (or their delegates) will make the final decision on whether to approve the recommendation for secure and trustworthy deployment.” (PDF p. 10 (printed p. 9), §5 Governance, Risk-informed deployment decision, second paragraph, first sentence)
  - Mapping note: No named role assigns the pre-mitigation score; the Executive Officers are those 'responsible for Microsoft’s AI governance program'.

### D4.oversight Board or external oversight

**Criterion:** A role the edition gives to a board, board committee, trust, or external party in overseeing or reviewing those decisions.

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated, partly (a weaker form than the criterion’s words)
  - “Share results of ASL evaluations promptly with Anthropic's governing bodies, including the board of directors and LTBT” (PDF p. 10 (printed p. 10), Procedural Commitments, numbered item 6)
  - Mapping note: The board and LTBT are given an information role for evaluation results and quarterly implementation reports; the board approves policy updates after LTBT consultation (item 1, recorded under D8.process). Evaluation-related policy changes must pass that Update Process before training resumes (PDF p. 13, step 2a). External audits are mentioned only in the speculative ASL-4 sketch (PDF p. 15).
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated, partly (a weaker form than the criterion’s words)
  - “decide to proceed with deployment and training, they will share their decision … with the Board of Directors and the Long-Term Benefit Trust before moving forward.” (PDF p. 13 (printed p. 9), §4.3 Safeguards Decision, fourth bullet). _The omitted words list the underlying Capability Report, internal feedback and any external feedback._
  - Mapping note: The Board and LTBT are informed before deployment or training proceeds; no approval role on the decision is stated. The edition also commits to an approximately annual third-party review of procedural compliance (§7.2 item 4, PDF p. 17) and to escalating noncompliance reports about the RSO to Board members (§7.1 item 5, PDF p. 16).
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated, partly (a weaker form than the criterion’s words)
  - “decide to proceed with deployment and training, they will share their decision … with the Board of Directors and the Long-Term Benefit Trust before moving forward.” (PDF p. 14 (printed p. 10), §4.3 Safeguards Decision, numbered item 4). _The omitted words list the underlying Safeguards Report (v2.0 named the Capability Report here), internal feedback and any external feedback._
  - Mapping note: The Board and LTBT are informed before deployment or training proceeds; no approval role on the decision is stated. An approximately annual third-party procedural compliance review is also committed (§7.2 item 4, PDF p. 17).
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated, partly (a weaker form than the criterion’s words)
  - “decide to proceed with deployment and training, they will share their decision … with the Board of Directors and the Long-Term Benefit Trust before moving forward.” (PDF p. 14 (printed p. 10), §4.3 Safeguards Decision, numbered item 4). _The omitted words list the underlying Safeguards Report, internal feedback and any external feedback._
  - Mapping note: The Board and LTBT are informed before deployment or training proceeds; no approval role on the decision is stated. An approximately annual third-party procedural compliance review is also committed (§7.2 item 4, PDF p. 17).
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated
  - “In the event that marginal risk analysis … plays a major role in a decision to move forward, explicit approval of the Risk Report by the Board and LTBT … will be required.” (PDF p. 12, §3.4 Procedures, item 5 ('Modified process when marginal risk analysis is important to our case')). _Otherwise the Board and LTBT are informed after the CEO and RSO approve a Risk Report._
  - Mapping note: Otherwise the CEO and RSO share their decision(s), the Risk Report and internal feedback with the Board and LTBT after approval (§3.4 item 4). External reviewers of Risk Reports are selected in consultation with the Board and LTBT and asked to publish commentary (§3.6); an approximately annual third-party review of procedural compliance is commissioned (§4).
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated
  - “In the event that marginal risk analysis … plays a major role in a decision to move forward, explicit approval of the Risk Report by the Board and LTBT … will be required.” (PDF p. 13 (printed p. 12), §3.4 Procedures, item 5 ('Modified process when marginal risk analysis is important to our case')). _Otherwise the Board and LTBT are informed after the CEO and RSO approve a Risk Report._
  - Mapping note: Otherwise the CEO and RSO share their decision(s), the Risk Report and internal feedback with the Board and LTBT after approval (§3.4 item 4). External reviewers of Risk Reports are selected in consultation with the Board and LTBT and asked to publish commentary (§3.6); an approximately annual third-party review of procedural compliance is commissioned (§4).
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated
  - “In the event that marginal risk analysis … plays a major role in a decision to move forward, explicit approval of the Risk Report by the Board and LTBT … will be required.” (PDF p. 13 (printed p. 12), §3.4 Procedures, item 5 ('Modified process when marginal risk analysis is important to our case')). _Otherwise the Board and LTBT are informed after the CEO and RSO approve a Risk Report._
  - “upon the LTBT’s request, we will conduct a public or private external review” (PDF p. 14 (printed p. 13), §3.6 External Review, final paragraph before §3.6.1)
  - Mapping note: Otherwise the CEO and RSO share their decision(s), the Risk Report and internal feedback with the Board and LTBT after approval (§3.4 item 4). External reviewers of Risk Reports are selected with the Board consulted and LTBT approval required (from v3.2) and asked to publish commentary (§3.6); an approximately annual third-party review of procedural compliance is commissioned (§4).
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated
  - “In the event that marginal risk analysis … plays a major role in a decision to move forward, explicit approval of the Risk Report by the Board and LTBT … will be required.” (PDF p. 13 (printed p. 12), §3.4 Procedures, item 5 ('Modified process when marginal risk analysis is important to our case')). _Otherwise the Board and LTBT are informed after the CEO and RSO approve a Risk Report._
  - “upon the LTBT’s request, we will conduct a public or private external review” (PDF p. 14 (printed p. 13), §3.6 External Review, final paragraph before §3.6.1)
  - Mapping note: Otherwise the CEO and RSO share their decision(s), the Risk Report and internal feedback with the Board and LTBT after approval (§3.4 item 4). External reviewers of Risk Reports are selected with the Board consulted and LTBT approval required (from v3.2) and asked to publish commentary (§3.6); an approximately annual third-party review of procedural compliance is commissioned (§4).
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated
  - “In the event that marginal risk analysis … plays a major role in a decision to move forward, explicit approval of the Risk Report by the Board and LTBT … will be required.” (PDF p. 14, §3.4 Procedures, item 5 ('Modified process when marginal risk analysis is important to our case')). _Otherwise the Board and LTBT are informed after the CEO and RSO approve a Risk Report._
  - “upon the LTBT’s request, we will conduct a public or private external review” (PDF p. 14, §3.6 External Review, final paragraph before §3.6.1)
  - Mapping note: Otherwise the CEO and RSO share their decision(s), the Risk Report and internal feedback with the Board and LTBT after approval (§3.4 item 4). External reviewers of Risk Reports are selected with the Board consulted and LTBT approval required (from v3.2) and asked to publish commentary (§3.6); an approximately annual third-party review of procedural compliance is commissioned (§4).
- **Google DeepMind · FSF · 2024** (published 2024-05-17): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–7 (all sections read).
  - Searched for: “board”, “council”, “third part”, “independent”, “external”, “oversight”, “audit”, “trust”, “review”
  - Hits set aside: PDF p. 1: 'Where appropriate, involve external parties in the process to help inform and guide our approach' is a general principle with no oversight role. PDF p. 6 (Future work): 'We will also explore how to appropriately involve independent third parties in our risk assessment and mitigation processes' states an intention to explore, not a role. 'trust' hits (PDF pp. 3–4) are security levels ('High-trust developer environments'). No board, council or external body is given a role in reviewing decisions.
  - Mapping note: The edition states that it will explore involving independent third parties (Future work, PDF p. 6); this is recorded as context, not as a stated oversight role.
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–9 (all sections read).
  - Searched for: “board”, “council”, “third part”, “independent”, “external”, “oversight”, “audit”, “trust”, “review”
  - Hits set aside: PDF p. 7: 'The Google DeepMind AGI Safety Council will periodically review the implementation of the Framework', and response plans are 'reviewed and approved by appropriate corporate governance bodies such as the Google DeepMind AGI Safety Council, Google DeepMind Responsibility and Safety Council, and/or Google Trust & Compliance Council': internal bodies, not a board or external party (recorded under D4 Determination). PDF p. 1: 'involve external parties to help inform and guide our approach' and PDF p. 3: 'We may use additional external evaluators' describe inputs to assessment, not review of decisions. No board or external party is given a role in reviewing decisions.
  - Mapping note: Review is assigned to internal councils (PDF p. 7); the facet asks for a board, trust or external party.
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–16 (all sections, tables, footnotes and §5.3 read)
  - Searched for: “board”, “council”, “oversight”, “external”, “third party / independent”, “trust”
  - Hits set aside: No hits for board, council or trust. 'oversight' hits concern model behaviour ('deployed without adequate control and oversight', PDF p. 12; 'circumvent basic oversight mechanisms', PDF p. 15). 'external' hits: 'involving internal and external experts as needed' (PDF p. 6) and 'external evaluations' (PDF p. 5) are inputs to assessment; 'we may engage relevant and appropriate external actors, including governments, to inform our responsible development and deployment practices' (PDF p. 5) informs practices, not decisions; the remainder concern external deployment or disclosure (D7.external). 'independent' hits only 'model independent information' (PDF p. 5). Internal review by the 'appropriate governance function' and 'appropriate corporate governance bodies' is recorded under D4.determination and D8.process.
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–20 (all sections read).
  - Searched for: “board”, “council”, “third part”, “independent”, “external”, “oversight”, “audit”, “trust”, “review”
  - Hits set aside: PDF p. 16 (§4.1): 'legal, compliance, and safety reviews with escalation procedures to ensure appropriate oversight' describes internal reviews. PDF p. 17: the updated Framework and assessment 'will be reviewed by the appropriate corporate governance bodies' (internal; recorded under D8 Revision). PDF p. 2 'involve external parties to help inform and guide the approach', PDF p. 4 'involving internal and external experts as needed', PDF p. 6 'external evaluations' and 'engage relevant external actors, including governments, to inform our responsible development and deployment practices' are inputs, not review of decisions. No board or external party is given a role in reviewing decisions.
  - Mapping note: Internal reviews with escalation are described (§4.1, PDF p. 16); the facet asks for a board, trust or external party.
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated
  - “Where necessary, the BoD may reverse a decision and/or mandate a revised course of action” (PDF p. 24, Governance › Operations › 'Decision process', third paragraph)
  - Mapping note: The edition also states that Scorecard evaluations and mitigations will be audited by independent third parties (PDF p. 25); those audits concern evaluation results, not review of decisions.
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “OpenAI Leadership can approve or reject these recommendations, and our Board’s Safety and Security Committee provides oversight of these decisions.” (PDF p. 4 (printed p. 3), §1 Introduction, final paragraph, second sentence)
  - “Where necessary, the Board may reverse a decision and/or mandate a revised course of action.” (PDF p. 16 (printed p. 15), Appendix B 'Decision-making practices', paragraph on the Safety and Security Committee, final sentence)
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated
  - “The board of directors of OpenAI Ireland Limited exercise systemic risk oversight under this Framework for EU purposes.” (PDF p. 20 (printed p. 18), §6 Allocation of responsibility for risk management, final paragraph)
  - Mapping note: Material updates to the Framework go to the OpenAI Foundation board's Safety and Security Committee and the OpenAI Ireland Limited board for oversight (§7.1, PDF p. 21).
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–10 (all sections read).
  - Searched for: “board”, “council”, “third part”, “independent”, “external”, “oversight”, “audit”, “trust”, “review”
  - Hits set aside: No board or director is mentioned. PDF p. 8: 'we may also provide vetted and qualified external red teams or appropriate government agencies unredacted versions' concerns access to publications (recorded under D7), not review of decisions. PDF p. 9: risk owners are 'responsible for periodic audits to enforce framework implementation' (internal; recorded under D7 Internal reporting). PDF p. 5: 'Independent third-party assessments' of cyber capability and PDF p. 3: 'trusted third-party safety auditors' as vetted users are evaluation inputs. No board or external party is given a role in reviewing threshold or deployment decisions.
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–9 (p. 10 blank): all sections read
  - Searched for: “board”, “director”, “external/third”, “independ”, “audit”, “oversight”, “authorit”
  - Hits set aside: No board or director is mentioned. PDF p. 2 'relevant external research' is an input to risk identification; PDF p. 4 'scalable model oversight' concerns oversight of models; PDF p. 8 feedback from 'other third parties' is an incident channel; PDF p. 9 incident reports to 'relevant authorities' when legally reportable (recorded in D7.external) and 'ongoing legal and compliance reviews' (internal) do not give an external party or board a role in reviewing decisions.
  - Archive check: Confirmed not found on 2026-10-26 by a cross-family archive check of the Internet Archive capture of 2026-07-16 (https://web.archive.org/web/20260716003429/https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf), whose SHA-256 matches the recorded publisher copy; see research/archive-checks-2026-10-26/codex-report.md.
- **Meta · FAF · v1.1** (published 2025-02-03): **not found** within the recorded search.
  - Inspected: Whole edition, PDF pp. 1–21, read in the text layer of the decoded PDF of the Internet Archive capture of 2025-02-13; cover and PDF pp. 12–13 and 19 inspected visually
  - Searched for: “board”, “trust”, “oversight”, “external”, “third”, “review”
  - Hits set aside: PDF p. 13, Table 1, footnote 7: the final assessment of uplift involves numerous experts, “including third parties where appropriate”; this is involvement in an assessment, not a role in overseeing or reviewing decisions. No board or oversight stems. Trust hits (PDF pp. 8–9, 21) concern trustworthiness or trusted release partners. External hits (PDF pp. 6–8, 10–11, 17–18, 21) concern reference models, expertise, threat modelling or the release context. Review hits (PDF pp. 5, 8) describe centralised, internal review. No board or external party is given a role in reviewing decisions.
  - Mapping note: The edition involves third parties “where appropriate” in the assessment of uplift (Table 1, footnote 7, PDF p. 13); this is recorded as context, not as a role in overseeing or reviewing decisions.
- **Meta · AASF · v2** (published 2026-04-08): stated, partly (a weaker form than the criterion’s words)
  - “Meta’s Board of Directors provides oversight of the company’s product and regulatory compliance” (PDF p. 10 (printed p. 10), §2.3 Accountability, third paragraph, final sentence)
  - Mapping note: The board role is stated as general product and regulatory compliance oversight, not a specific role in framework decisions. An internal governance function periodically reviews risk management practices (same paragraph).
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated, partly (a weaker form than the criterion’s words)
  - “This framework is subject to Microsoft’s broader corporate governance procedures, including independent internal audit and board oversight.” (PDF p. 10 (printed p. 9), §5 Governance, 'Oversight and reporting channels', first sentence)
  - Mapping note: The board role is stated through general corporate governance; no specific board review of framework decisions is described.
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated, partly (a weaker form than the criterion’s words)
  - “This framework is subject to Microsoft’s broader corporate governance procedures, including independent internal audit and board oversight.” (PDF p. 10 (printed p. 9), §5 Governance, 'Oversight and reporting channels', first sentence)
  - Mapping note: The board role is stated through general corporate governance; no specific board review of framework decisions is described.

## D5. Evaluation cadence and timing

_When, or how often, does the edition say models are evaluated?_

### D5.cadence Evaluation timing

**Criterion:** The edition’s statement of when evaluations are run: before deployment, at compute or capability intervals, on a calendar, or on another trigger.

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated
  - “Anthropic will conduct an evaluation of its models for next-ASL capabilities both (1) after every 4x jump in effective compute … and (2) every 3 months” (PDF p. 12 (printed p. 12), Evaluation Protocol, bullet 'Timing', first sentence). _The omitted words extend the 4x trigger to mid-training. The 3-month evaluation is stated as monitoring fine-tuning, tooling and similar improvements; a 6x 'safety buffer' is set against the 4x interval (PDF p. 11)._
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “notably more performant on automated tests in risk-relevant domains (defined as 4x or more in Effective Compute” (PDF p. 9 (printed p. 5), §3.1 Preliminary Assessment, numbered item 1). _This and a second criterion (six months' accumulated finetuning and elicitation improvements, item 2) define 'notably more capable', which triggers a comprehensive assessment; the RSO may also require one at their discretion._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): locator wrong; its locator named only item 1, while the six-month alternative is item 2. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “notably more performant on automated tests in risk-relevant domains (defined as 4x or more in Effective Compute” (PDF p. 10 (printed p. 6), §3.1 Preliminary Assessment, numbered item 1). _This and a second criterion (six months' accumulated finetuning and elicitation improvements, item 2) define 'notably more capable', which triggers a comprehensive assessment; the RSO may also require one at their discretion._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): locator wrong; its locator named only item 1, while the six-month alternative is item 2. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “notably more performant on automated tests in risk-relevant domains (defined as 4x or more in Effective Compute” (PDF p. 10 (printed p. 6), §3.1 Preliminary Assessment, numbered item 1). _This and a second criterion (six months' accumulated finetuning and elicitation improvements, item 2) define 'notably more capable', which triggers a comprehensive assessment; the RSO may also require one at their discretion._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): locator wrong; its locator named only item 1, while the six-month alternative is item 2. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated, partly (a weaker form than the criterion’s words)
  - “We will publish a Risk Report every 3-6 months.” (PDF p. 10, §3.1 Scope and Timing, paragraph 'Timing')
  - Mapping note: The edition sets a publication cadence for Risk Reports, which contain capability and alignment evaluation results, not a schedule for running evaluations. It adds interim discussions when a publicly deployed model is significantly more capable than those in the latest Risk Report, and within 30 days of determining that an internally deployed model is in scope. No compute- or capability-interval trigger is stated.
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated, partly (a weaker form than the criterion’s words)
  - “We will publish a Risk Report every 3-6 months.” (PDF p. 11 (printed p. 10), §3.1 Scope and Timing, paragraph 'Timing')
  - Mapping note: The edition sets a publication cadence for Risk Reports, which contain capability and alignment evaluation results, not a schedule for running evaluations. It adds interim discussions when a publicly deployed model is significantly more capable than those in the latest Risk Report, and within 30 days of determining that an internally deployed model is in scope. No compute- or capability-interval trigger is stated.
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated, partly (a weaker form than the criterion’s words)
  - “We will publish a Risk Report every 3-6 months.” (PDF p. 11 (printed p. 10), §3.1 Scope and Timing, paragraph 'Timing')
  - Mapping note: The edition sets a publication cadence for Risk Reports, which contain capability and alignment evaluation results, not a schedule for running evaluations. It adds interim discussions when a publicly deployed model is significantly more capable than those in the latest Risk Report, and within 30 days of determining that an internally deployed model is in scope. No compute- or capability-interval trigger is stated.
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated, partly (a weaker form than the criterion’s words)
  - “We will publish a Risk Report every 3-6 months.” (PDF p. 11 (printed p. 10), §3.1 Scope and Timing, paragraph 'Timing')
  - Mapping note: The edition sets a publication cadence for Risk Reports, which contain capability and alignment evaluation results, not a schedule for running evaluations. 'Off-cycle updates' analyse an individual model when a publicly deployed model is significantly more capable than all models for which certain risks were publicly analysed, or within 30 days for qualifying internal models. No compute- or capability-interval trigger is stated.
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated, partly (a weaker form than the criterion’s words)
  - “We will publish a Risk Report every 3-6 months.” (PDF p. 11, §3.1 Scope and Timing, paragraph 'Timing')
  - Mapping note: The edition sets a publication cadence for Risk Reports, which contain capability and alignment evaluation results, not a schedule for running evaluations. 'Off-cycle updates' analyse an individual model when a publicly deployed model is significantly more capable than all models for which certain risks were publicly analysed, or within 30 days for qualifying internal models. Risk Reports cover a coverage date no more than 30 days before publication. No compute- or capability-interval trigger is stated.
- **Google DeepMind · FSF · 2024** (published 2024-05-17): stated
  - “We are aiming to evaluate our models every 6x in effective compute … and for every 3 months of fine-tuning progress.” (PDF p. 2 (printed p. 2), Framework, component '2 - Evaluating frontier models', second paragraph, first sentence). _Footnote marker 3 omitted at the ellipsis; footnote 4 says early warning evaluations are designed to be passed before a model is 6x in effective compute or 3 months of fine-tuning away from a CCL._
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “We intend to evaluate our most powerful frontier models regularly to check whether their AI capabilities are approaching a CCL.” (PDF p. 3 (printed p. 3), Framework, component '2 - Assessing the Capabilities of Frontier Models', first paragraph, first sentence)
  - Mapping note: No compute or calendar interval is stated (the v1.0 '6x effective compute / 3 months' interval is absent). The same paragraph adds evaluation of models 'that could indicate an exceptional increase in capabilities' and, where appropriate, assessment 'before and during training'; evaluations may be run more frequently if the safety buffer is no longer adequate.
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “We conduct a risk assessment for the first external deployment of a new frontier AI model.” (PDF p. 4 (printed p. 4), §1.3 Outline of Our Risk Assessment Process, first paragraph, second sentence)
  - Mapping note: The next sentence (PDF pp. 4–5) adds a further risk assessment for subsequent versions 'if the model has meaningful new capabilities or a material increase in performance'. Capability evaluations that decide whether a risk assessment is needed 'may be triggered, for example, upon the completion of a pre-training or post-training run' (PDF p. 5). No compute or calendar interval is stated.
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “We conduct a critical capability assessment prior to the first external deployment … of a new frontier AI model.” (PDF p. 5 (printed p. 5), §1.3.2 Inherent Risk Assessment, first paragraph, second sentence). _Footnote marker 4 omitted at the ellipsis._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out footnote 4, attached to the same sentence, under which the assessment may not be conducted for low-risk external deployments. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: Material capability change assessments are run 'on various checkpoints upon the completion of a post-training run' (PDF p. 5). For subsequent versions, a further critical capability assessment follows if the model has meaningful new capabilities or material performance increases that could undermine the risk-acceptance justification. No compute or calendar interval is stated.
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated
  - “as often as needed to catch any non-trivial capability change, including before, during, and after training. This would include whenever there is a >2x effective compute increase or major algorithmic breakthrough.” (PDF p. 13, Scorecard › 'Evaluating pre-mitigation risk', final two sentences)
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “Prior to deployment, every covered model undergoes the suite of Scalable Evaluations.” (PDF p. 10 (printed p. 9), §3.3 Capability threshold determinations, first sentence)
  - Mapping note: Coverage is triggered by deployments (§3.2 lists covered deployments); a development checkpoint is covered when forecasts and threat models justify it (PDF p. 10). No compute-interval trigger is stated.
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated
  - “Before deployment, models in scope of this Framework undergo a suite of scalable evaluations” (PDF p. 8 (printed p. 06), §2.3 Systemic risk acceptance determination, second paragraph, first sentence)
  - Mapping note: §2.2 states assessment 'may take place' throughout the lifecycle (PDF p. 7); §4 describes lighter-touch evaluations at trigger points and a six-monthly decision on updating the Model Report (PDF p. 18).
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): stated
  - “Pre-deployment reviews include assessing benchmark results (e.g., WMDP scores) and mitigation effectiveness. For internal use, we review catastrophic risks like oversight evasion before extensive rollout.” (PDF p. 10, 'Operational and Societal Risks' › '5. Deployment Decisions', second paragraph, third and fourth sentences)
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): stated
  - “xAI will conduct a full systemic risk assessment and mitigation process of our frontier models at least once a year.” (PDF p. 2, §2 Risk Management Framework, second paragraph, first sentence)
  - “These evaluations are performed precedent to the wider deployment of our models” (PDF p. 6, first §2.3 'Systemic risk acceptance determination', first paragraph (continued from PDF p. 5), second sentence)
  - Mapping note: Smaller-scale evaluations 'may' also be run at listed trigger points: an updated model release, a serious incident, materially increased risk from use or integration, or a material change in the basis for acceptability (PDF p. 2).
- **Meta · FAF · v1.1** (published 2025-02-03): stated
  - “We typically repeat evaluations as a frontier AI nears or completes training.” (PDF p. 18 (printed p. 18), §4.2 Evaluation and mitigation)
  - Mapping note: “Typically” is the edition’s word. Evaluations also run at an initial checkpoint (PDF p. 16), as follow-ups triggered by the capabilities found (PDF p. 17), and in the assessment before release (§2.1.2, PDF pp. 7–8).
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “We typically repeat evaluations as a Frontier AI model nears or completes training.” (PDF p. 26 (printed p. 26), §4.2 Evaluation and mitigation, sixth paragraph, first sentence)
  - Mapping note: Evaluations are also triggered by monitored indicators during development (PDF p. 5), preliminary assessments precede controlled deployments (PDF p. 8), and residual risk is assessed before deployment (PDF p. 6).
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated
  - “The leading indicator assessment is run during pre-training, after pre-training is complete, and prior to deployment” (PDF p. 6 (printed p. 5), §3 Evaluation and assessment, paragraph continued from PDF p. 5, first sentence)
  - “we will conduct subsequent deeper capability assessments on a periodic basis, and at least once every six months.” (PDF p. 7 (printed p. 6), §3, Deeper capability assessment, 'Timing of deeper capability assessment')
  - Mapping note: Leading indicator assessment applies to models optimised for or expected to have frontier capabilities and to any model pre-trained with more than 10^26 FLOPs (PDF p. 5), and is repeated at least every six months (PDF p. 6).
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “run during pre-training, after pre-training is complete, after post-training, and prior to deployment” (PDF p. 6 (printed p. 5), §3 Evaluation and assessment, second paragraph, first sentence)
  - “we will conduct subsequent deeper capability assessments if there are material changes to the deployed model’s risk profile” (PDF p. 7 (printed p. 6), §3, Deeper capability assessment, 'Timing of deeper capability assessment')
  - Mapping note: Leading indicator assessment applies to models in scope of frontier-model laws (EU AI Act, TFAIA, RAISE Act) and to substantial fine-tuning, and is repeated at least every six months (PDF p. 6).

## D6. Exceptions and discretion

_Where does the edition allow departures from its own procedures?_

### D6.competitor Provisions conditioned on other developers

**Criterion:** A provision that relaxes, adjusts or conditions the developer’s safeguards or commitments on what other developers do or have (often called a “race” or “marginal risk” clause). Scope tests that decide whether a model is covered by the framework are recorded as context, not counted.

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated, partly (a weaker form than the criterion’s words)
  - “to avoid a “race to the bottom”, the latter should not include the effects of other companies’ language models” (PDF p. 5 (printed p. 5), ASL-2 Commitments, footnote 5, third sentence). _'The latter' refers to lowering a model's ASL because dangerous information has become more widely available; the footnote excludes other companies' models from that consideration._
  - “a clearly bad actor (such as a rogue state) is scaling in so reckless a manner … we could envisage a substantial loosening of these restrictions” (PDF p. 10 (printed p. 10), Procedural Commitments, item 1 ('Update Process'), second sub-bullet, first sentence). _The condition is a situation of extreme emergency in which such scaling is likely to lead to imminent global catastrophe and AI itself helps in defence; the loosening is described as an emergency response, to be taken only in consultation with governmental authorities, with the case presented publicly to the extent possible._
  - Mapping note: The first entry declines to condition ASL classification on other developers' models; the second conditions a possible loosening on another actor's (not necessarily a developer's) reckless scaling.
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “It is possible at some point in the future that another actor in the frontier AI ecosystem will pass, or be on track to imminently pass, a Capability Threshold without implementing measures equivalent to the Required Safeguards” (PDF p. 16 (printed p. 12), footnote 18 (attached to §7.1 item 7 'Policy changes'), first and second sentences). _The footnote continues that in such a scenario Anthropic might decide to lower its Required Safeguards, would acknowledge the overall risk, and would make a case to the U.S. government for regulatory action._
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “It is possible at some point in the future that another actor in the frontier AI ecosystem will pass, or be on track to imminently pass, a Capability Threshold without implementing measures equivalent to the Required Safeguards” (PDF p. 17 (printed p. 13), footnote 17 (attached to §7.1 item 7 'Policy changes'), first and second sentences). _The footnote continues that in such a scenario Anthropic might decide to lower its Required Safeguards, would acknowledge the overall risk, and would make a case to the U.S. government for regulatory action._
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “It is possible at some point in the future that another actor in the frontier AI ecosystem will pass, or be on track to imminently pass, a Capability Threshold without implementing measures equivalent to the Required Safeguards” (PDF p. 17 (printed p. 13), footnote 17 (attached to §7.1 item 7 'Policy changes'), first and second sentences). _The footnote continues that in such a scenario Anthropic might decide to lower its Required Safeguards, would acknowledge the overall risk, and would make a case to the U.S. government for regulatory action._
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated
  - “we will meet or exceed the overall risk reduction posture of these competitors” (PDF p. 16, Appendix A, table row 'Competitors have strong safety measures', Commitment column, first sentence). _Appendix A scenario 'Competitors have strong safety measures'._
  - “We will make a significant effort to meet or exceed that performance standard. However, we will not necessarily delay AI development and deployment in this scenario.” (PDF p. 16, Appendix A, table row 'General upleveling', Commitment column, second sentence). _Appendix A scenario 'General upleveling': a competitor has implemented a significantly better risk mitigation that Anthropic could implement at comparable or lower cost._
  - Mapping note: Appendix A ('Commitments Related to Competitors') has three scenarios; the 'Anthropic in the lead' delay is recorded under D3.halt. §1 says Anthropic cannot unilaterally and unconditionally commit to the industry-wide recommendations, framing the change as a collective action problem. Where a decision relies on marginal risk analysis, Risk Reports add a competitive landscape analysis (§3.3) and need Board and LTBT approval (§3.4).
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated
  - “we will meet or exceed the overall risk reduction posture of these competitors” (PDF p. 17 (printed p. 16), Appendix A, table row 'Competitors have strong safety measures', Commitment column, first sentence). _Appendix A scenario 'Competitors have strong safety measures'._
  - “We will make a significant effort to meet or exceed that performance standard. However, we will not necessarily delay AI development and deployment in this scenario.” (PDF p. 17 (printed p. 16), Appendix A, table row 'General upleveling', Commitment column, second sentence). _Appendix A scenario 'General upleveling': a competitor has implemented a significantly better risk mitigation that Anthropic could implement at comparable or lower cost._
  - Mapping note: Appendix A ('Commitments Related to Competitors') has three scenarios; the 'Anthropic in the lead' delay is recorded under D3.halt. §1 says Anthropic cannot unilaterally and unconditionally commit to the industry-wide recommendations, framing the change as a collective action problem. Where a decision relies on marginal risk analysis, Risk Reports add a competitive landscape analysis (§3.3) and need Board and LTBT approval (§3.4).
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated
  - “we will meet or exceed the overall risk reduction posture of these competitors” (PDF p. 17 (printed p. 16), Appendix A, table row 'Competitors have strong safety measures', Commitment column, first sentence). _Appendix A scenario 'Competitors have strong safety measures'._
  - “We will make a significant effort to meet or exceed that performance standard. However, we will not necessarily delay AI development and deployment in this scenario.” (PDF p. 17 (printed p. 16), Appendix A, table row 'General upleveling', Commitment column, second sentence). _Appendix A scenario 'General upleveling': a competitor has implemented a significantly better risk mitigation that Anthropic could implement at comparable or lower cost._
  - Mapping note: Appendix A ('Commitments Related to Competitors') has three scenarios; the 'Anthropic in the lead' delay is recorded under D3.halt. §1 says Anthropic cannot unilaterally and unconditionally commit to the industry-wide recommendations, framing the change as a collective action problem. Where a decision relies on marginal risk analysis, Risk Reports add a competitive landscape analysis (§3.3) and need Board and LTBT approval (§3.4).
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated
  - “we will meet or exceed the overall risk reduction posture of these competitors” (PDF p. 17 (printed p. 16), Appendix A, table row 'Competitors have strong safety measures', Commitment column, first sentence). _Appendix A scenario 'Competitors have strong safety measures'._
  - “We will make a significant effort to meet or exceed that performance standard. However, we will not necessarily delay AI development and deployment in this scenario.” (PDF p. 17 (printed p. 16), Appendix A, table row 'General upleveling', Commitment column, second sentence). _Appendix A scenario 'General upleveling': a competitor has implemented a significantly better risk mitigation that Anthropic could implement at comparable or lower cost._
  - Mapping note: Appendix A ('Commitments Related to Competitors') has three scenarios; the 'Anthropic in the lead' delay is recorded under D3.halt. §1 says Anthropic cannot unilaterally and unconditionally commit to the industry-wide recommendations, framing the change as a collective action problem. Where a decision relies on marginal risk analysis, Risk Reports add a competitive landscape analysis (§3.3) and need Board and LTBT approval (§3.4).
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated
  - “we will meet or exceed the overall risk reduction posture of these competitors” (PDF p. 17, Appendix A, table row 'Competitors have strong safety measures', Commitment column, first sentence). _Appendix A scenario 'Competitors have strong safety measures'._
  - “We will make a significant effort to meet or exceed that performance standard. However, we will not necessarily delay AI development and deployment in this scenario.” (PDF p. 17, Appendix A, table row 'General upleveling', Commitment column, second sentence). _Appendix A scenario 'General upleveling': a competitor has implemented a significantly better risk mitigation that Anthropic could implement at comparable or lower cost._
  - Mapping note: Appendix A ('Commitments Related to Competitors') has three scenarios; the 'Anthropic in the lead' delay is recorded under D3.halt. §1 says Anthropic cannot unilaterally and unconditionally commit to the industry-wide recommendations, framing the change as a collective action problem. Where a decision relies on marginal risk analysis, Risk Reports add a competitive landscape analysis (§3.3) and need Board and LTBT approval (§3.4).
- **Google DeepMind · FSF · 2024** (published 2024-05-17): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–7 (all sections, both tables, footnotes and acknowledgements read)
  - Searched for: “other developers/labs/companies/models/organi(sations)”, “industry”, “widely available / publicly available”, “competit / race”, “field”
  - Hits set aside: 'industry' hits are mitigation descriptions, not conditions on other developers: Security Level 0 'Industry standard development and enterprise controls' (PDF p. 3) and Deployment Level 1 'prevailing industry safeguards' (PDF p. 4). 'field' hits only in the acknowledgements (PDF p. 7, a surname). No provision makes the developer's actions depend on what other developers do or have.
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “our adoption of the protocols described in this Framework may depend on whether such organizations across the field adopt similar protocols.” (PDF p. 1 (printed p. 1, unnumbered), opening section, paragraph beginning 'The safety of frontier AI systems', last sentence, final clause). _The sentence makes the condition explicit: adoption of the protocols may depend on whether organisations across the field adopt similar protocols._
  - “a model does not possess capabilities meaningfully different from other widely available models that have not demonstrably caused or contributed to severe risks” (PDF p. 5 (printed p. 5), Misuse Critical Capability Levels, paragraph beginning 'These recommended security levels', second sentence). _Given as an example of when recommended security levels 'may be adjusted'._
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “a model does not possess capabilities meaningfully different from other publicly available models that have weaker security applied” (PDF p. 9 (printed p. 9), §2.2 Misuse Critical Capability Levels, second paragraph, second sentence). _Given as an example of when recommended security levels may be adjusted._
  - “if other models are similarly capable and have few mitigations, then the marginal risk added by our release is likely low” (PDF p. 7 (printed p. 7), §1.6, misuse CCL bullet, first sub-bullet, parenthetical example). _One example within a risk-acceptance criterion for misuse CCLs, which also requires a determination by the appropriate governance function._
  - Mapping note: The v2.0 clause making adoption of the protocols depend on other organisations is not present; the overview (PDF p. 2) says certain mitigations are 'most effective when adopted by industry as a whole'. §2.1.2 step 1.b.iv (PDF p. 9) also lists other publicly deployed models' capabilities and mitigations as a safety-case factor.
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “if other models are similarly capable and have few mitigations, then the marginal risk added by our external deployment is likely low” (PDF p. 7 (printed p. 7), §1.3.5 Risk Acceptance Determination, misuse T/CCL bullet, first sub-bullet, parenthetical example). _One example within a risk-acceptance criterion for misuse CCLs, which also requires a determination by the appropriate governance function._
  - “a model does not possess capabilities meaningfully different from other publicly available models that have weaker security applied” (PDF p. 11 (printed p. 11), §2.2 Misuse Capability Levels, second paragraph, second sentence). _Given as an example of when recommended security levels may be adjusted._
- **OpenAI · Preparedness · Beta** (published 2023-12-18): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–27 (all sections read).
  - Searched for: “other organi”, “industry”, “competit”, “race”, “marginal”, “others”, “peer”, “comparable”
  - Hits set aside: PDF p. 3, Introduction, final paragraph: recognises other organisations for publishing Responsible Scaling Policies and encourages others to adopt similar approaches; it does not make any provision depend on other developers. 'comparable' hits (PDF pp. 9, 10, 17, 18) are level definitions comparing model output to existing resources or human content. No hits for 'competit', 'race', 'marginal' or 'peer'.
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “another frontier AI model developer might develop or release a system with High or Critical capability … without instituting comparable safeguards” (PDF p. 13 (printed p. 12), §4.3 Marginal risk, first paragraph, first sentence)
  - “If we are able to rigorously confirm that such a scenario has occurred, then we could adjust accordingly the level of safeguards that we require in that capability area, but only if:” (PDF p. 13 (printed p. 12), §4.3 Marginal risk, first paragraph). _The listed conditions are that the adjustment does not meaningfully increase the overall risk of severe harm, that OpenAI publicly acknowledges it, and that its safeguards stay more protective than the other developer’s._
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–22 (all sections read).
  - Searched for: “other developer”, “competit”, “race”, “marginal”, “industry”, “peer”, “comparable”, “similarly safe”, “other deployed”
  - Hits set aside: PDF p. 4, §1: draws on RSPs and 'industry best practices' (not a conditional provision). PDF p. 5, §2.1: 'industry bodies such as the Frontier Model Forum' as feedback sources. PDF p. 7, §2.2: 'insights from other deployed models' as a risk-assessment input, not a provision that changes OpenAI's actions. PDF p. 18, §4: no Model Report update needed if 'the model is considered similarly safe or safer (under Appendix 2.2 of the Code of Practice)'; it governs report updates only, not safeguards, so it is not counted (see the mapping note). PDF p. 22, §7.2: 'other incidents affecting the industry' as an assessment factor. 'developer' hits (PDF pp. 6, 12) concern a model evading its developer's controls. No hits for 'competit', 'race', 'marginal' or 'peer'.
  - Mapping note: Exemption from Model Report updates by reference to the EU Code of Practice's similarly-safe-or-safer test, whose safe reference model may be another provider's model (Code, Appendix 2.1); governs reporting only, not safeguards.
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–11 (p. 12 blank): all sections read
  - Searched for: “other developers”, “competitor”, “industry/peer”, “readily available”, “frontier developer”, “race”
  - Hits set aside: PDF p. 1 'frontier developer' occurs only inside the quoted TFAIA definition (footnote 1); PDF pp. 2, 7 'industry peers' concern collaboration on bottlenecks and shared evaluation difficulty; PDF p. 3 'information that is already readily and easily available, including by an internet search' conditions responses on public availability of information, not on other developers' models (recorded under D6.discretion context); PDF p. 9 distillation of reasoning traces concerns security against extraction, not a conditional provision.
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–9 (p. 10 blank): all sections read
  - Searched for: “other developers”, “competitor”, “industry/peer”, “readily available”, “market”, “race”
  - Hits set aside: PDF pp. 2, 5, 6 'market' occurs in 'post-market monitoring', 'market analysis' and 'making available on the market', none conditioned on other developers; PDF p. 8 distillation of reasoning traces concerns security against extraction. The December 2025 'readily and easily available' clause does not appear.
  - Archive check: Confirmed not found on 2026-10-26 by a cross-family archive check of the Internet Archive capture of 2026-07-16 (https://web.archive.org/web/20260716003429/https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf), whose SHA-256 matches the recorded publisher copy; see research/archive-checks-2026-10-26/codex-report.md.
- **Meta · FAF · v1.1** (published 2025-02-03): **not found** within the recorded search.
  - Inspected: Whole edition, PDF pp. 1–21, read in the text layer of the decoded PDF of the Internet Archive capture of 2025-02-13; cover and PDF pp. 12–13 and 19 inspected visually
  - Searched for: “compet”, “race”, “marginal”, “other”, “existing”, “reference”
  - Hits set aside: No competitor, race or marginal stems. PDF p. 4: scope relative to the most advanced models, recorded as context under the scope-test rule; p. 6: external reference-class comparisons; p. 8: existing mitigations; p. 9: other frameworks; p. 12: net new and existing resources; p. 15: novel biological capabilities; p. 17: other barriers and cost constraints; p. 18: other discoveries and variables; p. 19: engagement with peers; p. 21: existing resources in the definition of uplift studies. These are scope, evaluation baselines, barriers or update inputs, not provisions that relax safeguards on what other developers do. Table 1 (p. 13): the route through other barriers tests whether a catastrophic outcome remains feasible, not other developers’ commitments.
- **Meta · AASF · v2** (published 2026-04-08): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–44 (p. 45 blank): all sections, tables, footnotes and both appendices read
  - Searched for: “other developer / other compan”, “competit”, “race”, “marginal”, “industry”, “most advanced models”, “open source / widely available / publicly available”
  - Hits set aside: No hits for 'other developer', 'other compan', 'race' or 'marginal'. 'competition' (PDF pp. 28–29) names capture-the-flag competitions used as cyber benchmarks. 'industry' (PDF pp. 7, 8, 41) refers to evolving industry practices as a reason to re-evaluate mitigations, update the Framework or revise definitions. 'the most advanced models' (Appendix I, PDF p. 41; change log, PDF p. 44) is part of the scope criterion for which models count as Frontier AI: a model 'reasonably likely to be more capable … than our existing models or the most advanced models'. It decides which models the Framework covers, not what Meta does depending on other developers' conduct. PDF p. 4, §2.1.1: 'We compare these various factors against our own models and those available externally' identifies a 'reference class' of comparable models for tracking performance and anticipating risks and required assessments; it does not relax, adjust or condition Meta's safeguards or commitments. 'open-source' and 'widely used' (PDF pp. 5, 8, 31) concern evaluations and defender access. No provision relaxes, adjusts or conditions Meta's safeguards or commitments on what other developers do or have.
  - Mapping note: Comparative scope and reference-class provisions, not a waiver of safeguards conditional on other developers. Appendix I compares a model with 'the most advanced models' (not limited to Meta's) to decide whether it is Frontier AI (PDF p. 41); §2.1.1 compares a planned model 'against our own models and those available externally' to identify a 'reference class' used to anticipate risks and required assessments (PDF p. 4). Both are recorded here as context.
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated, partly (a weaker form than the criterion’s words)
  - “considers the marginal capability uplift … including currently available open-weights models.” (PDF p. 7 (printed p. 6), §3, Deeper capability assessment, 'Holistic risk assessment' bullet, final sentence). _Part of the holistic risk assessment whose results 'then inform a determination' of whether a model has a tracked capability and at what level._
  - Mapping note: A marginal-uplift consideration in the risk determination, measured against available tools and open-weights models; it does not state that measures change depending on other developers’ actions.
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated, partly (a weaker form than the criterion’s words)
  - “considers the marginal capability uplift … including currently available open-weights models.” (PDF p. 7 (printed p. 6), §3, Deeper capability assessment, 'Holistic risk assessment' bullet, final sentence). _In this edition the holistic risk assessment, of which this is part, 'may also inform' the determination of a model's risk level; the February 2025 edition says such results 'then inform' it._
  - Mapping note: A marginal-uplift consideration in the risk determination, measured against available tools and open-weights models; it does not state that measures change depending on other developers’ actions.

### D6.discretion Other exceptions or discretion

**Criterion:** Any other stated exception, deviation, override or room for judgement in applying the framework.

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated
  - “In limited cases, models with capabilities relevant to catastrophic harm may be made available to a select group of vetted users” (PDF p. 9 (printed p. 9), 'ASL-3 Deployment Measures', bullet 'Tiered access', first sentence). _Conditional on a use-case that cannot be separated from dangerous capabilities and on access being granted safely with sufficient oversight. Other stated room for exceptions: case-by-case disabling of trust-and-safety tooling at ASL-2 (footnote 6, PDF p. 6) and an undertaking to explore exceptions for some low-risk use-cases within the ASL-3 automated-detection measure (PDF p. 9)._
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “where this policy is unintentionally ambiguous, we will act in accordance with the Responsible Scaling Officer or CEO’s judgment” (PDF p. 15 (printed p. 11), §7.1, footnote 17). _Other stated discretion: CEO and RSO may approve interim measures (§6.2, PDF p. 14); trusted users may receive a version with reduced safeguards under alternative controls (§4.1 item 6, PDF p. 12); the RSO may limit further training below the default 4x (footnote 9, PDF p. 10)._
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “where this policy is unintentionally ambiguous, we will act in accordance with the Responsible Scaling Officer or CEO’s judgment” (PDF p. 16 (printed p. 12), §7.1, footnote 16). _Other stated discretion: CEO and RSO may approve interim measures (§6.2, PDF p. 15); trusted users may receive a version with reduced safeguards under alternative controls (§4.1 item 6, PDF p. 12); the RSO may limit further training below the default 4x (footnote 8, PDF p. 11)._
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “where this policy is unintentionally ambiguous, we will act in accordance with the Responsible Scaling Officer or CEO’s judgment” (PDF p. 16 (printed p. 12), §7.1, footnote 16). _Other stated discretion: CEO and RSO may approve interim measures (§6.2, PDF p. 15); trusted users may receive a version with reduced safeguards under alternative controls (§4.1 item 6, PDF p. 12); the RSO may limit further training below the default 4x (footnote 8, PDF p. 11)._
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated
  - “These are not hard commitments but rather public goals” (PDF p. 3, Introduction, paragraph on Frontier Safety Roadmaps, final sentence). _Refers only to the goals in the Frontier Safety Roadmap, not to the policy as a whole._
  - “making judgment calls on policy interpretation and application” (PDF p. 15, §4 Governance, item 1 ('Responsible Scaling Officer'), duty (6))
  - Mapping note: Further room for judgement: Appendix A says Anthropic will often have to use its best judgment on whether a competitor scenario applies; Risk Reports may record deviations from described mitigations (§3.2); redactions may be made for listed reasons 'not limited to' those (§3.5); a report is 'significantly redacted' in the judgment of the RSO, CEO, Board or LTBT (§3.6).
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated
  - “These are not hard commitments but rather public goals” (PDF p. 3, Introduction, paragraph on Frontier Safety Roadmaps, final sentence). _Refers only to the goals in the Frontier Safety Roadmap, not to the policy as a whole._
  - “making judgment calls on policy interpretation and application” (PDF p. 16 (printed p. 15), §4 Governance, item 1 ('Responsible Scaling Officer'), duty (6))
  - Mapping note: Further room for judgement: Appendix A says Anthropic will often have to use its best judgment on whether a competitor scenario applies; Risk Reports may record deviations from described mitigations (§3.2); redactions may be made for listed reasons 'not limited to' those (§3.5); a report is 'significantly redacted' in the judgment of the RSO, CEO, Board or LTBT (§3.6).
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated
  - “These are not hard commitments but rather public goals” (PDF p. 3, Introduction, paragraph on Frontier Safety Roadmaps, final sentence). _Refers only to the goals in the Frontier Safety Roadmap, not to the policy as a whole._
  - “making judgment calls on policy interpretation and application” (PDF p. 16 (printed p. 15), §4 Governance, item 1 ('Responsible Scaling Officer'), duty (6))
  - Mapping note: Further room for judgement: Appendix A says Anthropic will often have to use its best judgment on whether a competitor scenario applies; Risk Reports may record deviations from described mitigations (§3.2); redactions may be made for listed reasons 'not limited to' those (§3.5); a report is 'significantly redacted' in the judgment of the RSO, CEO, Board or LTBT (§3.6).
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated
  - “These are not hard commitments but rather public goals” (PDF p. 3, Introduction, paragraph on Frontier Safety Roadmaps, final sentence). _Refers only to the goals in the Frontier Safety Roadmap, not to the policy as a whole._
  - “making judgment calls on policy interpretation and application” (PDF p. 16 (printed p. 15), §4 Governance, item 1 ('Responsible Scaling Officer'), duty (6))
  - Mapping note: Further room for judgement: Appendix A says Anthropic will often have to use its best judgment on whether a competitor scenario applies; Risk Reports may record deviations from described mitigations (§3.2); redactions may be made for listed reasons 'not limited to' those (§3.5); a report is 'significantly redacted' in the judgment of the RSO, CEO, Board or LTBT (§3.6).
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated
  - “not hard commitments but rather public goals” (PDF p. 3, Introduction, paragraph on Frontier Safety Roadmaps, final sentence). _Refers only to the goals in the Frontier Safety Roadmap, not to the policy as a whole._
  - “making judgment calls on policy interpretation and application” (PDF p. 16, §4 Governance, item 1 ('Responsible Scaling Officer'), duty (6))
  - Mapping note: Further room for judgement: Appendix A says Anthropic will often have to use its best judgment on whether a competitor scenario applies; Risk Reports may record deviations from described mitigations (§3.2); redactions may be made for listed reasons 'not limited to' those (§3.5); a report is 'significantly redacted' in the judgment of the RSO, CEO, Board or LTBT (§3.6).
- **Google DeepMind · FSF · 2024** (published 2024-05-17): stated
  - “the mitigation options listed below are illustrative and will need to be tailored to different use cases and risks.” (PDF p. 4 (printed p. 4), Deployment Mitigations, introductory paragraph, last sentence)
  - Mapping note: Other room for judgement: the response plan also takes into account 'additional risks flagged by the review and the deployment context' (PDF p. 2), and the hold provision offers 'additional protocols' as an alternative (D3.halt).
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “or if we assess that the benefits of the open release of model weights outweigh the risks.” (PDF p. 5 (printed p. 5), Misuse Critical Capability Levels, paragraph beginning 'These recommended security levels', second sentence, final clause). _A second example of when recommended security levels may be adjusted._
  - Mapping note: Other stated room for judgement: early warning evaluations may be run more frequently or alert thresholds adjusted (PDF p. 3).
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “or we otherwise assess that the level of security applied is adequate” (PDF p. 7 (printed p. 7), §1.6 Summary of Risk Acceptance Criteria, misuse and ML R&D CCL bullets, second sub-bullets). _Alternative to reaching the recommended security level; examples given include assessing that the benefits of open release of weights outweigh the risks._
  - Mapping note: Risk acceptance criteria are introduced with 'if, for example', so the listed conditions are examples rather than an exhaustive test. The closing Note (PDF p. 7) says assessments 'will often involve some level of subjective analysis'.
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “A critical capability assessment may not be conducted for low-risk external deployments (e.g. to a small number of trusted testers)” (PDF p. 5 (printed p. 5), §1.3.2 Inherent Risk Assessment, footnote 4). _Footnote 4. The exception applies if the appropriate governance function determines the residual risk of such deployments to be acceptable, even if the model has reached a T/CCL._
  - Mapping note: §1.3.3 (PDF p. 6) says the specific mitigations implemented 'may be determined when a T/CCL is reached'. Security adequacy may also be assessed on other grounds than the recommended level (§1.3.5), and the closing Note says assessments 'will often involve some level of subjective analysis' (PDF p. 8).
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated
  - “Note that this should not preclude safety-enhancing development.” (PDF p. 21, Governance › Safety baselines › 'Restricting development', third sentence)
  - “For the avoidance of doubt, Leadership can also make decisions without the SAG’s participation, i.e., the SAG does not have the ability to “filibuster”” (PDF p. 24, Governance › Operations › 'Decision process', third paragraph, parenthetical)
  - Mapping note: The edition also allows the SAG Chair, Leadership or Board to adjust the monthly report cadence (PDF p. 23) and provides a fast-track process (PDF p. 24).
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “OpenAI Leadership can also make decisions without the SAG’s participation” (PDF p. 16 (printed p. 15), Appendix B, SAG responsibilities, fifth bullet)
  - Mapping note: Other stated room for judgement: threshold determinations reflect 'holistic judgment' (PDF p. 10); footnote 6 states that distilled, fine-tuned or quantized models from a model below High will ordinarily not require additional safety measures (PDF p. 10); disclosures may be redacted or summarized (PDF p. 14).
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated
  - “also reflects a holistic judgment based on the totality of available evidence” (PDF p. 8 (printed p. 06), §2.3 Systemic risk acceptance determination, final paragraph, final sentence)
  - “We will not consider an update necessary if (1) the model’s capabilities have not materially changed since the last update” (PDF p. 18 (printed p. 16), §4 Model reporting › 'Model report updates', final sentence). _Two further exemptions follow: (2) a more capable model is planned for release within a month, and (3) the model is considered similarly safe or safer under Appendix 2.2 of the EU Code of Practice. The provision concerns updates to the Model Report._
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): stated
  - “we may selectively allow xAI’s models to respond to such requests from some vetted, highly trusted users” (PDF p. 3, 'Addressing Risks of Malicious Use', third paragraph, single sentence (opening clause)). _The same sentence also allows responses where the information is already readily available, including by an internet search._
  - “It is conceivable that … the expected benefits of model deployment may outweigh the risks identified by a particular benchmark.” (PDF p. 10, 'Operational and Societal Risks' › '5. Deployment Decisions', second paragraph, sixth sentence). _The omitted words are 'for a particular modality and/or type of release'._
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): stated
  - “The final decision also reflects an overall judgment based on all the available evidence” (PDF p. 6, first §2.3 'Systemic risk acceptance determination', third paragraph, third sentence)
  - “xAI may change its approach from that listed above in order to make additional improvements.” (PDF p. 7, second §2.3 'Safety mitigations', paragraph following the safeguards list, second sentence)
  - Mapping note: The December 2025 trusted-user and benefits-outweigh-benchmark clauses do not appear in this edition.
- **Meta · FAF · v1.1** (published 2025-02-03): stated
  - “insofar as is technically feasible and commercially practicable” (PDF p. 13 (printed p. 13), §3.3 Risk thresholds, Table 1: Risk thresholds for frontier AI, Critical row, Measures column, security mitigations (qualifying clause))
  - Mapping note: Qualifies the Critical row’s security protections against hacking and exfiltration. The edition also leaves to judgement whether further barriers justify revised threat scenarios (Table 1; §4.2, PDF p. 17) and whether to re-evaluate after a revision (§5.1, PDF p. 19). No general power to override the framework is stated.
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “Final deployment decisions may also consider additional factors beyond those covered in this Framework.” (PDF p. 15 (printed p. 15), §3.3 Risk Thresholds, Table 1, note below the Measures column, second sentence)
  - Mapping note: Other stated room for judgement: cyber capabilities may be made available 'to qualified and trusted customers where appropriate' (PDF p. 30); chemical and biological capabilities may be offered to trusted researchers 'with reduced mitigations via structured access controls' (PDF p. 33, research area), and non-material modifications are presumed to inherit the underlying model's threshold (PDF p. 17).
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated
  - “We use qualitative capability thresholds to guide this classification process as they offer important flexibility across different models and contexts” (PDF p. 6 (printed p. 5), §3, Deeper capability assessment, first paragraph, second sentence)
  - “the marginal benefits of a model outweigh any residual risk” (PDF p. 10 (printed p. 9), §5 Governance, Risk-informed deployment decision, first paragraph, numbered point 2)). _The second of three points the deployment recommendation must make together: mitigation to low or medium risk, benefits outweighing residual risk, and secure and trustworthy deployment. The Executive Officers decide._
  - Mapping note: Point 2 is one element of the recommendation submitted for the deployment decision.
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “the marginal benefits of a model outweigh any residual risk” (PDF p. 10 (printed p. 9), §5 Governance, Risk-informed deployment decision, first paragraph, numbered point 2)). _The second of three points the deployment recommendation must make together: mitigation to low or medium risk, benefits outweighing residual risk, and secure and trustworthy deployment. The Executive Officers decide._
  - Mapping note: Point 2 is one element of the recommendation submitted for the deployment decision.

## D7. Transparency and reporting

_To whom does the edition say it reports, internally and externally?_

### D7.internal Internal reporting

**Criterion:** Reporting or records the edition requires inside the developer (to leadership, a board, staff or a compliance function).

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated
  - “Each quarter, they will share a report on implementation status to our board and LTBT” (PDF p. 10 (printed p. 10), Procedural Commitments, numbered item 7 ('Responsible Scaling Officer'), second sentence). _'They' is the Responsible Scaling Officer; the sentence continues by requiring the report to note any deficiencies in implementation. Item 6 requires prompt sharing of ASL evaluation results with the board and LTBT; item 8 requires a non-compliance reporting policy allowing anonymous feedback._
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “We will share summaries of Capability Reports and Safeguards Reports with Anthropic’s regular-clearance staff” (PDF p. 16 (printed p. 12), §7.1 Internal Governance, numbered item 3 ('Transparency'), first sentence). _Also: the RSO notifies the Board of noncompliance posing material risk and regularly updates it on noncompliance (§7.1 items 1 and 5); decisions and reports go to the Board and LTBT (§4.3)._
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “We will share summaries of Capability Reports and Safeguards Reports with Anthropic’s regular-clearance staff” (PDF p. 16 (printed p. 12), §7.1 Internal Governance, numbered item 3 ('Transparency'), first sentence). _Also: the RSO notifies the Board of noncompliance posing material risk and regularly updates it on noncompliance (§7.1 items 1 and 5); decisions and reports go to the Board and LTBT (§4.3)._
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “We will share summaries of Capability Reports and Safeguards Reports with Anthropic’s regular-clearance staff” (PDF p. 16 (printed p. 12), §7.1 Internal Governance, numbered item 3 ('Transparency'), first sentence). _Also: the RSO notifies the Board of noncompliance posing material risk and regularly updates it on noncompliance (§7.1 items 1 and 5); decisions and reports go to the Board and LTBT (§4.3)._
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated
  - “We will share final, unredacted Risk Reports with Anthropic’s regular-clearance staff.” (PDF p. 15, §4 Governance, item 2 ('Internal transparency'))
  - Mapping note: Also: quarterly updates to the Board on noncompliance reports (§4); the Frontier Safety Roadmap is shared with all full-time employees, the Board and the LTBT (§2); after approving a Risk Report the CEO and RSO share decisions, the report and internal feedback with the Board and LTBT (§3.4).
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated
  - “We will share final, unredacted Risk Reports with Anthropic’s regular-clearance staff.” (PDF p. 16 (printed p. 15), §4 Governance, item 2 ('Internal transparency'))
  - Mapping note: Also: quarterly updates to the Board on noncompliance reports (§4); the Frontier Safety Roadmap is shared with all full-time employees, the Board and the LTBT (§2); after approving a Risk Report the CEO and RSO share decisions, the report and internal feedback with the Board and LTBT (§3.4).
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated
  - “We will share final, unredacted Risk Reports with Anthropic’s regular-clearance staff.” (PDF p. 16 (printed p. 15), §4 Governance, item 3 ('Internal transparency'))
  - “regularly brief the LTBT on plans and developments related to our Risk Reports, including model training” (PDF p. 16 (printed p. 15), §4 Governance, item 2 ('Long Term Benefit Trust'))
  - Mapping note: Also: quarterly updates to the Board on noncompliance reports (§4); the Frontier Safety Roadmap is shared with all full-time employees, the Board and the LTBT (§2); after approving a Risk Report the CEO and RSO share decisions, the report and internal feedback with the Board and LTBT (§3.4).
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated
  - “We will share final, unredacted Risk Reports with Anthropic’s regular-clearance staff.” (PDF p. 16 (printed p. 15), §4 Governance, item 3 ('Internal transparency'))
  - “regularly brief the LTBT on plans and developments related to our Risk Reports, including model training” (PDF p. 16 (printed p. 15), §4 Governance, item 2 ('Long Term Benefit Trust'))
  - Mapping note: Also: quarterly updates to the Board on noncompliance reports (§4); the Frontier Safety Roadmap is shared with all full-time employees, the Board and the LTBT (§2); after approving a Risk Report the CEO and RSO share decisions, the report and internal feedback with the Board and LTBT (§3.4).
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated
  - “share final, unredacted Risk Reports with a large number of Anthropic employees (at least 200).” (PDF p. 16, §4 Governance, item 3 ('Internal transparency')). _The item adds that minimally-redacted Risk Reports go to all regular-clearance staff._
  - “regularly brief the LTBT on plans and developments related to our Risk Reports, including model training” (PDF p. 16, §4 Governance, item 2 ('Long Term Benefit Trust'))
  - Mapping note: Also: quarterly updates to the Board on noncompliance reports (§4); the Frontier Safety Roadmap is shared with all full-time employees, the Board and the LTBT (§2); after approving a Risk Report the CEO and RSO share decisions, the report and internal feedback with the Board and LTBT (§3.4).
- **Google DeepMind · FSF · 2024** (published 2024-05-17): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–7 (all sections, both tables, footnotes and acknowledgements read)
  - Searched for: “report”, “record”, “log”, “inform”, “notif/alert”, “review”, “council”
  - Hits set aside: PDF p. 3 'enhanced logging' and PDF p. 4 'automated monitoring and logging of large-scale internal deployments' are security/deployment mitigation measures, not reporting to leadership or a compliance function. PDF p. 6 'exploring internal policies around alerting relevant stakeholder bodies' concerns external bodies (counted under D7.external). 'inform' hits (PDF pp. 1, 6) concern the Framework being informed by external discussion or forecasting to inform preparations. No 'report' or 'record' hits.
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated, partly (a weaker form than the criterion’s words)
  - “the response plan will be reviewed and approved by appropriate corporate governance bodies such as the Google DeepMind AGI Safety Council” (PDF p. 7 (printed p. 7), Governance and Accountability, 'Governance', first sentence)
  - Mapping note: No separate internal reporting or record-keeping requirement is stated; the closest provision is that response plans go to corporate governance bodies for review and approval.
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated, partly (a weaker form than the criterion’s words)
  - “Material updates to a safety case will be submitted to the appropriate governance function for review.” (PDF pp. 9–13 (printed pp. 9 and 13), §2.1.2 and §3.1.2 Deployment Mitigations, numbered step 3, second sentence (identical in both))
  - Mapping note: Submission for review of safety-case updates; no other internal reporting or record requirement is stated.
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated, partly (a weaker form than the criterion’s words)
  - “Material updates to a safety case will be submitted to the appropriate governance function for review” (PDF pp. 10–14 (printed pp. 10 and 14), §2.1.2 and §3.1.2 Deployment Mitigations, numbered step 3, second sentence (identical in both))
  - Mapping note: Submission for review of safety-case updates. §4.1 (PDF p. 16) describes escalation procedures in general terms; no other internal reporting or record requirement is stated.
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated
  - “providing a monthly report (sent to the SAG, Leadership and BoD) synthesizing the above with any potential protective actions” (PDF p. 23, Governance › Operations › 'Process', Preparedness team responsibilities, fifth item)
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out that the SAG Chair, OpenAI Leadership and/or the Board can adjust the monthly cadence as needed. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: The edition also states that the Framework, reports and decisions will be documented and visible to the Board and within OpenAI, with redactions as needed (PDF p. 24, 'Internal visibility').
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “We will document relevant reports made to the SAG and of SAG’s decision and reasoning.” (PDF p. 13 (printed p. 12), §5.1 Internal governance, 'Internal Transparency', first sentence)
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated, partly (a weaker form than the criterion’s words)
  - “We document a justification for why the systemic risks stemming from the model are acceptable, including reasonably foreseeable conditions under which the justification may no longer hold, as informed by recommendations from OpenAI’s Safety Advisory Group and external experts, as available and appropriate.” (PDF p. 13 (printed p. 11), §2.5 Safety mitigations, second paragraph, second sentence)
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase attached the qualifier “as available and appropriate” to the external experts alone, where the passage places it after the whole clause; the correction keeps the passage’s ambiguity and does not resolve it. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: The passage records a documented justification but does not name its internal recipients. §2.6 states that the incident response plan includes notifying appropriate internal teams (PDF p. 14).
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): stated, partly (a weaker form than the criterion’s words)
  - “Internally, we allow xAI employees to anonymously report concerns about nonadherence, with protections from retaliation.” (PDF p. 8, 'Operational and Societal Risks' › '1. Public transparency and third-party review', numbered item 1 ('Frontier AI Framework adherence'), second sentence)
  - “Risk owners are also responsible for periodic audits to enforce framework implementation.” (PDF p. 9, 'Operational and Societal Risks' › '4. Governance Approach', first paragraph, second sentence)
  - Mapping note: No internal recipient (leadership, board or compliance function) is named for reports or audit results.
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): stated
  - “Results of our systemic risk assessment and mitigation processes and measures will be documented.” (PDF p. 2, §2 Risk Management Framework, third paragraph)
  - Mapping note: No internal recipient is named. 'Employee escalation' is listed as an incident-identification channel (PDF p. 8).
- **Meta · FAF · v1.1** (published 2025-02-03): stated
  - “documenting mitigation strategies and residual risks across a set of applicable risk categories.” (PDF p. 7 (printed p. 7), §2.1.2 (risk assessment process))
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase said the records cover each risk category that applies, where the passage says they cover a set of applicable risk categories. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: §2.1.3 (PDF p. 8) passes the assessment of remaining risk to research and product teams, then to multidisciplinary review and leadership. These are internal records; no schedule of reports to a board is stated.
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “all reports will be ultimately submitted to the internal governance function, the Chief AI Officer, and the Director of Alignment and Risk” (PDF p. 10 (printed p. 10), §2.3.1 Reporting, second sentence)
  - Mapping note: Refers to employee non-compliance reports under a protocol the edition says Meta 'is developing'.
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated
  - “Documentation regarding the pre-mitigation and post-mitigation capability assessment will be provided to Executive Officers responsible for Microsoft’s AI governance program” (PDF p. 10 (printed p. 9), §5 Governance, Risk-informed deployment decision, first paragraph)
  - Mapping note: Employees can also report concerns through internal channels with protection from retaliation (PDF p. 10).
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “Documentation regarding the pre-mitigation and post-mitigation capability assessment will be provided to Executive Officers responsible for Microsoft’s AI governance program” (PDF p. 10 (printed p. 9), §5 Governance, Risk-informed deployment decision, first paragraph)
  - Mapping note: Employees can also report concerns through internal channels with protection from retaliation (PDF p. 10).

### D7.external Public or external reporting

**Criterion:** Disclosure the edition says it will make to the public, to governments, or to other external parties, excluding publication of the framework itself (recorded under D8 Revision).

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated
  - “Publicly share evaluation results after model deployment where possible” (PDF p. 10 (printed p. 10), Procedural Commitments, numbered item 5). _The item continues: in some cases in the initial model card, in other cases with a delay if it serves a broad safety interest. ASL-3 deployment measures add a vulnerability and incident disclosure process with other labs, subject to security or legal constraints (PDF p. 9); ASL-2 measures include publishing model cards (PDF p. 6)._
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “We will publicly release key information related to the evaluation and deployment of our models” (PDF p. 16 (printed p. 12), §7.2 Transparency and External Input, numbered item 1 ('Public disclosures'), first sentence). _The sentence continues: not including sensitive details. §7.2 item 3 (PDF p. 17) commits to notifying a relevant U.S. Government entity if a model requires stronger protections than ASL-2; footnote 19 expects evaluation details to go to a U.S. Government entity where a model is not deployed publicly._
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “We will publicly release key information related to the evaluation and deployment of our models” (PDF p. 17 (printed p. 13), §7.2 Transparency and External Input, numbered item 1 ('Public disclosures'), first sentence). _The sentence continues: not including sensitive details. §7.2 item 3 commits to notifying a relevant U.S. Government entity if a model requires stronger protections than ASL-2; footnote 18 expects evaluation details to go to a U.S. Government entity where a model is not deployed publicly._
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “We will publicly release key information related to the evaluation and deployment of our models” (PDF p. 17 (printed p. 13), §7.2 Transparency and External Input, numbered item 1 ('Public disclosures'), first sentence). _The sentence continues: not including sensitive details. §7.2 item 3 commits to notifying a relevant U.S. Government entity if a model requires stronger protections than ASL-2; footnote 18 expects evaluation details to go to a U.S. Government entity where a model is not deployed publicly._
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated
  - “publish a public version of our Risk Report” (PDF p. 13, §3.5 Publication and Redactions, first sentence). _The section adds that Anthropic will aim to minimize redactions._
  - Mapping note: Also: the Frontier Safety Roadmap is published in redacted form (§2); external reviewers are asked to publish commentary within 30 days (§3.6.2); for the novel chemical/biological weapons production row (PDF p. 7) the company column says threat-pathway content and policy recommendations will be shared with policymakers; substantiated noncompliance involving a material safety risk 'may' be publicly noticed (§4).
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated
  - “publish a public version of our Risk Report” (PDF p. 14 (printed p. 13), §3.5 Publication and Redactions, first sentence). _The section adds that Anthropic will aim to minimize redactions._
  - Mapping note: Also: the Frontier Safety Roadmap is published in redacted form (§2); external reviewers are asked to publish commentary within 30 days (§3.6.2); for the novel chemical/biological weapons production row (PDF p. 7) the company column says threat-pathway content and policy recommendations will be shared with policymakers; substantiated noncompliance involving a material safety risk 'may' be publicly noticed (§4).
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated
  - “publish a public version of our Risk Report” (PDF p. 14 (printed p. 13), §3.5 Publication and Redactions, first sentence). _The section adds that Anthropic will aim to minimize redactions._
  - Mapping note: Also: the Frontier Safety Roadmap is published in redacted form (§2); external reviewers are asked to publish commentary within 30 days (§3.6.2); for the novel chemical/biological weapons production row (PDF p. 7) the company column says threat-pathway content and policy recommendations will be shared with policymakers; substantiated noncompliance involving a material safety risk 'may' be publicly noticed (§4).
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated
  - “publish a public version of our Risk Report” (PDF p. 14 (printed p. 13), §3.5 Publication and Redactions, first sentence). _The section adds that Anthropic will aim to minimize redactions._
  - Mapping note: Also: the Frontier Safety Roadmap is published in redacted form (§2); external reviewers are asked to publish commentary within 30 days (§3.6.2); for the novel chemical/biological weapons production row (PDF p. 7) the company column says threat-pathway content and policy recommendations will be shared with policymakers; substantiated noncompliance involving a material safety risk 'may' be publicly noticed (§4).
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated
  - “publish a public version of our Risk Report” (PDF p. 14, §3.5 Publication and Redactions, first sentence). _The section adds that Anthropic will aim to minimize redactions._
  - “disclose the existence of each redaction” (PDF p. 14, §3.5 Publication and Redactions, paragraph after the list of redaction reasons). _The sentence continues: 'made in the public version of the report and aim to give a brief justification for such redactions', adding that in many cases this will necessarily be very high-level. The disclosure of each redaction is stated as a commitment; the justification is an aim._
  - Mapping note: Also: the Frontier Safety Roadmap is published in redacted form (§2); external reviewers are asked to publish commentary within 30 days (§3.6.2); for the novel chemical/biological weapons production row (PDF p. 7) the company column says threat-pathway content and policy recommendations will be shared with policymakers; substantiated noncompliance involving a material safety risk 'may' be publicly noticed (§4).
- **Google DeepMind · FSF · 2024** (published 2024-05-17): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–7 (all sections read).
  - Searched for: “publish”, “disclos”, “share”, “government”, “authorit”, “stakeholder”, “alert”, “external”
  - Hits set aside: PDF p. 6 (Future work): 'We are exploring internal policies around alerting relevant stakeholder bodies when, for example, evaluation thresholds are met' describes a policy under exploration, not a disclosure the edition says it will make. PDF p. 6 (Future work): 'we will publish substantive revisions as appropriate' was considered; it is publication of the Framework itself, which the criterion excludes (recorded under D8 Revision). No commitment to disclose evaluation results, threshold determinations or mitigations to the public or governments was found.
  - Mapping note: The edition says it is exploring policies on alerting stakeholder bodies (PDF p. 6); recorded as context.
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “If we assess that a model has reached a CCL that poses an unmitigated and material risk to overall public safety, we aim to share information with appropriate government authorities” (PDF p. 7 (printed p. 7), Governance and Accountability, 'Disclosure', first sentence (continues on PDF p. 8)). _The sentence continues 'where it will facilitate the development of safe AI'; the edition adds it 'may also consider disclosing information to other external organizations' (PDF p. 8)._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the condition that sharing will facilitate the development of safe AI. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: Conditional wording ('aim to'). This served copy splits the sentence across PDF pp. 7–8; the 2025-02-05 archive capture has it on PDF p. 8.
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “If we assess that a model has reached a CCL that poses an unmitigated and material risk to overall public safety, we aim to share relevant information with appropriate government authorities” (PDF p. 16 (printed p. 16), §5.2 Disclosures, first paragraph, first sentence). _The sentence continues 'where it will facilitate safety of frontier AI'; the section adds the developer 'may also consider disclosing information to other external organisations'._
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the condition that sharing will facilitate the safety of frontier AI. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: Conditional wording ('aim to').
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “If we assess that a model has reached a CCL that poses an unmitigated and material risk to overall public safety, we aim to share relevant information with appropriate government authorities where it will facilitate safety of frontier AI.” (PDF p. 17 (printed p. 17), §5.2 Disclosures, first sentence). _Condition (same sentence): if the developer assesses that a model has reached a CCL that poses an unmitigated and material risk to overall public safety. The section adds the developer 'may also consider disclosing information to other external organizations'._
  - Mapping note: Conditional wording ('aim to'). The trigger refers to CCLs only, not TCLs.
- **OpenAI · Preparedness · Beta** (published 2023-12-18): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–27 (all sections read).
  - Searched for: “publish”, “public”, “disclos”, “government”, “report”, “system card”, “share”, “external”
  - Hits set aside: 'publishing Responsible Scaling Policies' (PDF p. 3) describes other organisations. 'public' (PDF p. 9 and elsewhere) occurs in threshold definitions ('disrupt public life'). 'report' hits concern internal reports to the SAG, Leadership and Board (recorded under D7 Internal reporting). System cards are named only as an existing safety process (PDF p. 20). 'External access' (PDF p. 25): 'We will also continue to enable external research and government access for model releases' concerns access to models for red-teaming and testing, not disclosure of reports, evaluations or decisions. Adjacent passages recorded as context: 'alerting distribution partners' (PDF p. 14, Mitigations, first paragraph) is a conditional mitigation option, and 'Scorecard evaluations (and corresponding mitigations) will be audited by qualified, independent third-parties to ensure accurate reporting of results' (PDF p. 25, Accountability, Audits) is a third-party audit; neither is a disclosure commitment. No commitment to disclose Scorecard results, decisions or reports to the public or to governments was found.
  - Mapping note: Access for external researchers and government to test model releases (PDF p. 25) is external engagement but not disclosure; it is recorded here as context.
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “We will release information about our Preparedness Framework results … for major deployments.” (PDF p. 13 (printed p. 12), §5.2 Transparency and external participation, 'Public disclosures', first sentence)
  - Mapping note: §4.3 also requires public acknowledgement of a marginal-risk adjustment (PDF p. 13).
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated
  - “We also publish details of these assessments in system cards or in other reporting when a model launches.” (PDF p. 18 (printed p. 16), §4 Model reporting, first paragraph, second sentence)
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the boundary set by the preceding sentence, which limits the assessments to models in scope of the Framework. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - “for reporting to appropriate authorities within the required deadlines” (PDF p. 15 (printed p. 13), §2.6 › 'External reporting', second sentence). _The sentence is conditional on an incident being determined reportable under applicable laws._
  - Mapping note: The first paragraph of §4 also names a Safety and Security Model Report ('Transparency Reports' under the TFAIA); §7.1 states that changelogs for material updates are published within 30 days (PDF p. 21); as publication of the framework itself, that is recorded under D8 Revision, not here.
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): stated
  - “we may publish the following types of information listed below.” (PDF p. 8, 'Operational and Societal Risks' › '1. Public transparency and third-party review', second paragraph, first sentence)
  - “Benchmark results: Share with relevant audiences leading benchmark results … upon new major releases.” (PDF p. 8, same section, numbered item 2). _An item in the list introduced by 'we may publish'._
  - Mapping note: Publication is conditional ('may publish'), with possible redaction. The edition also states it may notify law enforcement agencies of an imminent threat (PDF p. 9, item 1).
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): stated
  - “When reportable under applicable laws and regulations, xAI will provide the relevant authorities with a copy of the incident report within the required deadlines” (PDF p. 9, §3 Incident reporting, numbered item 4 (continued from PDF p. 8))
  - Mapping note: External reporting is stated only for legally reportable incidents; the December 2025 list of information xAI may publish does not appear.
- **Meta · FAF · v1.1** (published 2025-02-03): stated
  - “We also plan to continue sharing relevant information about how we develop and evaluate our models responsibly” (PDF p. 9 (printed p. 9), §2.2)
  - Mapping note: Conditional wording (“plan to”). The channels named are model cards, research papers and guidance on responsible use; no deadline, recipient or mandatory incident report is stated.
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “We will publish a preparedness report for each closed or open Frontier AI release in a timely manner in connection with the deployment” (PDF p. 7 (printed p. 7), §2.2.1 Preparedness Reports, first sentence)
  - Mapping note: Meta will also 'as appropriate, provide relevant authorities' with an internal-use risk report (PDF p. 9). A model spec and adherence results are also to be published (§2.2.3, PDF p. 9).
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated
  - “Information about the capabilities and limitations of the model, relevant evaluations, and the model’s risk classification will be shared publicly” (PDF p. 10 (printed p. 9), §5 Governance, Risk-informed deployment decision, third paragraph, first sentence)
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the care to minimise information hazards and to protect commercially sensitive information, which qualifies the same sentence. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: Public sharing is qualified by care to minimise information hazards and protect commercially sensitive information.
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “Information about the capabilities and limitations of the model, relevant evaluations, and the model’s risk classification will be shared publicly” (PDF p. 10 (printed p. 9), §5 Governance, Risk-informed deployment decision, third paragraph, first sentence)
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out the care to minimise information hazards and to protect commercially sensitive information, which qualifies the same sentence. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - “We will report information about tracked high-risk capabilities as required by regulation” (PDF p. 10 (printed p. 9), §5 Governance, Risk-informed deployment decision, third paragraph, second sentence)
  - Mapping note: Public sharing is qualified by care to minimise information hazards and protect commercially sensitive information. Reports on serious or critical incidents go to regulatory authorities and impacted customers 'as appropriate' (PDF p. 9).

## D8. Revision

_How is the edition revised, and what does it say changed from the previous edition?_

### D8.process Revision process and approval

**Criterion:** How the edition says the framework will be reviewed, updated and approved.

- **Anthropic · RSP · 2023** (effective 2023-09-19): stated
  - “Follow an "Update Process" for this document, including approval by the board of directors, following consultation with the Long-Term Benefit Trust (LTBT).” (PDF p. 10 (printed p. 10), Procedural Commitments, numbered item 1, first sentence). _The next sentence states that updates will be noted and reflected in the document before they are implemented._
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “proposed by the CEO and the Responsible Scaling Officer and approved by the Board of Directors, in consultation with the Long-Term Benefit Trust” (PDF p. 16 (printed p. 12), §7.1 Internal Governance, numbered item 7 ('Policy changes'), first sentence). _The subject is changes to this policy. The item adds that the public version is updated before changes take effect, with differences recorded in a change log._
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “proposed by the CEO and the Responsible Scaling Officer and approved by the Board of Directors, in consultation with the Long-Term Benefit Trust” (PDF p. 17 (printed p. 13), §7.1 Internal Governance, numbered item 7 ('Policy changes'), first sentence). _The subject is changes to this policy. §5 (PDF p. 14) adds that, when upgrading to Required Safeguards, the policy will be updated to include any additional Capability Thresholds for which those safeguards would be insufficient._
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “proposed by the CEO and the Responsible Scaling Officer and approved by the Board of Directors, in consultation with the Long-Term Benefit Trust” (PDF p. 17 (printed p. 13), §7.1 Internal Governance, numbered item 7 ('Policy changes'), first sentence). _The subject is changes to this policy. §5 (PDF p. 14) adds that, when upgrading to Required Safeguards, the policy will be updated to include any additional Capability Thresholds for which those safeguards would be insufficient._
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated
  - “Changes to the RSP will be proposed by the CEO and RSO, and approved by the Board in consultation with the LTBT.” (PDF p. 15, §4 Governance, item 7 ('Policy changes'), first sentence)
  - Mapping note: The same item commits to publishing updated versions on or before their effective date and recording differences in the Change Log; the Introduction calls the RSP a living document to be continually updated, and §2 says Roadmap goals may change.
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated
  - “Changes to the RSP will be proposed by the CEO and RSO, and approved by the Board in consultation with the LTBT.” (PDF p. 16 (printed p. 15), §4 Governance, item 7 ('Policy changes'), first sentence)
  - Mapping note: The same item commits to publishing updated versions on or before their effective date and recording differences in the Change Log; the Introduction calls the RSP a living document to be continually updated, and §2 says Roadmap goals may change.
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated
  - “Changes to the RSP will be proposed by the CEO and RSO, and approved by the Board in consultation with the LTBT.” (PDF p. 16 (printed p. 15), §4 Governance, item 8 ('Policy changes'), first sentence)
  - Mapping note: The same item commits to publishing updated versions on or before their effective date and recording differences in the Change Log; the Introduction calls the RSP a living document to be continually updated, and §2 says Roadmap goals may change.
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated
  - “Changes to the RSP will be proposed by the CEO and RSO, and approved by the Board in consultation with the LTBT.” (PDF p. 16 (printed p. 15), §4 Governance, item 8 ('Policy changes'), first sentence)
  - Mapping note: The same item commits to publishing updated versions on or before their effective date and recording differences in the Change Log; the Introduction calls the RSP a living document to be continually updated, and §2 says Roadmap goals may change.
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated
  - “Changes to the RSP will be proposed by the CEO and RSO, and approved by the Board in consultation with the LTBT.” (PDF p. 16, §4 Governance, item 8 ('Policy changes'), first sentence)
  - Mapping note: The same item commits to publishing updated versions on or before their effective date and recording differences in the Change Log; the Introduction calls the RSP a living document to be continually updated, and §2 says Roadmap goals may change.
- **Google DeepMind · FSF · 2024** (published 2024-05-17): stated
  - “It will be reviewed periodically and we expect it to evolve substantially as our understanding of the risks and benefits of frontier models improves.” (PDF p. 1 (printed p. 1), opening section, third paragraph, third sentence)
  - “we will publish substantive revisions as appropriate.” (PDF p. 6 (printed p. 6), Future work, second paragraph, second sentence)
  - Mapping note: No reviewer, approval body or fixed interval is named.
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “We will review the Framework periodically and we expect it to evolve substantially” (PDF p. 1 (printed p. 1, unnumbered), opening section, last paragraph, third sentence)
  - Mapping note: Future Work (PDF p. 8) adds 'we will publish substantive revisions as appropriate'. No approval body or fixed interval for revisions is named.
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): stated
  - “The Frontier Safety Framework will be updated at least once a year” (PDF p. 16 (printed p. 16), §5.1 Updates, first sentence). _The sentence continues: more frequently if there are reasonable grounds to believe adequacy or adherence has been materially undermined._
  - “The updated version and framework assessment will be reviewed by the appropriate corporate governance bodies.” (PDF p. 16 (printed p. 16), §5.1 Updates, last sentence)
  - Mapping note: The process includes an assessment of the Framework's appropriateness and of adherence to it (§5.1).
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “The Frontier Safety Framework will be reviewed at least once a year” (PDF p. 17 (printed p. 17), §5.1 Updates, first sentence). _The sentence continues: more frequently if there are reasonable grounds to believe adequacy or adherence has been materially undermined._
  - “The updated version and framework assessment will be reviewed by the appropriate corporate governance bodies.” (PDF p. 17 (printed p. 17), §5.1 Updates, last sentence)
- **OpenAI · Preparedness · Beta** (published 2023-12-18): stated
  - “If the Preparedness or any other team determines that any changes to the Preparedness Framework are necessary, it will include a case for this change in its report.” (PDF p. 23, Governance › Operations › 'Process', final paragraph, first sentence)
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “We will review and potentially update the Preparedness Framework for continued sufficiency at least once a year.” (PDF p. 16 (printed p. 15), Appendix B, 'Updates to the Preparedness Framework', third sentence)
  - Mapping note: Appendix B (PDF p. 16): the SAG reviews proposed changes to the Framework and makes a recommendation processed according to the standard decision-making process, in which OpenAI Leadership makes final decisions.
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): stated
  - “Material updates will be presented to the Safety and Security Committee of the board of directors of the OpenAI Foundation and to the board of directors of OpenAI Ireland Limited for oversight” (PDF p. 21 (printed p. 19), §7.1 Update and approval process, fourth (final) sentence, up to 'for oversight')
  - “OpenAI will complete a Framework Assessment at least once every 12 months” (PDF p. 22 (printed p. 20), §7.2 Framework assessment, first sentence)
    - Paraphrase check: Cross-family paraphrase check of 2026-10-28 (codex-paraphrases-2026-10-28.md): drift; the paraphrase left out that the 12 months run from the effective dates of the TFAIA and the EU Code of Practice. Corrected on 2026-10-28 by the maintainer’s decision of that day; the cell’s status is unchanged.
  - Mapping note: 'Presented … for oversight' is not stated as approval: the edition names no approver. §7.1 states that updates may be proposed by named officers, that the Legal function oversees the update process, and that changelogs for material updates are published within 30 days (PDF p. 21). The edition describes itself as overlapping with the Preparedness Framework, which OpenAI continues to use and evolve (PDF p. 4).
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): stated
  - “this FAIF will be continually adapted and updated as circumstances change, before major new capabilities are launched, and in response to incidents.” (PDF p. 10, 'Operational and Societal Risks' › '5. Deployment Decisions', second paragraph, fifth sentence (closing clause))
  - Mapping note: No approval body or fixed review interval for the framework is named; the Introduction says xAI 'plans to continuously review and adjust this FAIF' (PDF p. 1) and section 1 that it intends to publish updates (PDF p. 8).
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): stated
  - “We will review this Framework periodically, and expect significant changes as the capabilities of our models expand.” (PDF p. 2, §1 Introduction, final paragraph, final sentence)
  - Mapping note: No review interval or approval body for framework revisions is stated; the Security Goal is to be reviewed at least every year (PDF p. 7).
- **Meta · FAF · v1.1** (published 2025-02-03): stated
  - “We will update our Framework based on these observations.” (PDF p. 19 (printed p. 19), §5.1)
  - Mapping note: The observations are of deployed models and the wider ecosystem; technical developments and engagement with peers and the community also inform revisions (§5.1, PDF p. 19). No approval body or interval for revisions is named.
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “We will update our Framework … at least every twelve months, whichever is sooner. … have it confirmed by our Director of Alignment and Risk and Chief AI Officer” (PDF p. 40 (printed p. 40), §5.1 Updates to our Framework, first paragraph, fourth to sixth sentences)
  - Mapping note: Updates are also triggered when Meta has 'reasonable grounds to believe either its adequacy or our adherence to it has been materially undermined' (same sentence); published updates are to include a justification recorded in the change log.
- **Microsoft · FGF · Feb 2025** (published 2025-02): stated
  - “Every six months, we will have an explicit discussion on how this framework may need to be improved.” (PDF p. 10 (printed p. 9), §5 Governance, 'Updates to this framework', second sentence)
  - “Any updates to our practices will be reviewed by Microsoft’s Chief Responsible AI Officer prior to their adoption.” (PDF p. 10 (printed p. 9), §5 Governance, 'Updates to this framework', fourth sentence)
  - Mapping note: Updates are to be made public 'where appropriate' at adoption (same paragraph).
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “At least every twelve months, we will have an explicit discussion” (PDF p. 10 (printed p. 9), §5 Governance, 'Updates to this framework', second sentence)
  - “Any updates to our practices will be reviewed by Microsoft’s Chief Responsible AI Officer prior to their adoption.” (PDF p. 10 (printed p. 9), §5 Governance, 'Updates to this framework', fourth sentence)
  - “All material revisions will be made public within 30 days of adoption” (PDF p. 10 (printed p. 9), §5 Governance, 'Updates to this framework', fifth sentence)

### D8.changes Stated changes from the previous edition

**Criterion:** The edition’s own statement (changelog, introduction or summary) of what changed from its predecessor. Not applicable to the first edition in a sequence.

- **Anthropic · RSP · 2023** (effective 2023-09-19): n/a. _First edition in this framework sequence._
- **Anthropic · RSP · v2.0** (effective 2024-10-15): stated
  - “The term “ASL” now refers to groups of technical and operational safeguards (it previously also referred to models).” (PDF p. 21 (printed p. 17), Changelog, October 15, 2024 entry, paragraph 'ASL definition changed', first sentence). _The same entry lists further changes: autonomous replication threshold replaced by a checkpoint; AI R&D threshold added; affirmative-case testing instead of prespecified evaluations; evaluation cadence moved from three to six months; less prescriptive methodology and safeguards; new Capability and Safeguards Reports; revised governance measures._
- **Anthropic · RSP · v2.1** (effective 2025-03-31): stated
  - “We have also disaggregated our existing AI R&D capability thresholds, separating them into two distinct levels” (PDF p. 22 (printed p. 18), Changelog, March 31, 2025 (RSP v2.1) entry, paragraph 'New Capability Thresholds', second sentence). _The same entry records a new CBRN development threshold (for moderately resourced state programs) and, under 'Iterative Commitment', replaces the commitment to define ASL-N+1 evaluations with a commitment to reevaluate Capability Thresholds whenever safeguards are upgraded._
- **Anthropic · RSP · v2.2** (effective 2025-05-14): stated
  - “This update excludes both sophisticated insiders and state-compromised insiders from the ASL-3 Security Standard.” (PDF p. 23 (printed p. 19), Changelog, May 14, 2025 (RSP v2.2) entry, paragraph 'ASL-3 Security', first sentence). _The entry adds that previously only 'highly sophisticated state-compromised insiders' were explicitly excluded, and gives as rationale that the CBRN-3 and AI R&D-4 threat models do not warrant protection against either group._
- **Anthropic · RSP · v3.0** (effective 2026-02-24): stated
  - “This update is a comprehensive rewrite of our RSP.” (PDF p. 19, Changelog, entry 'February 24, 2026 (RSP v3.0)'). _The entry links to a separate summary of changes, which is not part of this document._
  - “We now separate our plans as a company—those which we expect to achieve regardless of what any other company does—from our more ambitious industry-wide recommendations.” (PDF p. 3, Introduction, paragraph beginning 'We now separate')
  - Mapping note: The Introduction also says the previous RSP committed to mitigations reducing absolute risk 'without regard to' other developers, and names Frontier Safety Roadmaps and Risk Reports as new requirements.
- **Anthropic · RSP · v3.1** (effective 2026-04-02): stated
  - “(1) how we operationalize the Automated R&D capability threshold; (2) how we use internal feedback on Risk Reports; and (3) that we may consider pausing development or deployment even where the commitments described in Appendix A are not triggered.” (PDF p. 20 (printed p. 19), Changelog, entry 'April 2, 2026 (RSP v3.1)', first sentence). _The sentence opens 'This revision addresses the following points'; the entry adds that the changes are 'mostly clarificatory' except that (1) involves some substantive changes._
- **Anthropic · RSP · v3.2** (effective 2026-04-29): stated
  - “This update authorizes the LTBT to request external review of Risk Reports, gives the LTBT the power to approve our selection of external reviewers, and formalizes a requirement that we provide the LTBT with regular briefings.” (PDF p. 20 (printed p. 19), Changelog, entry 'April 29, 2026 (RSP v3.2)')
- **Anthropic · RSP · v3.3** (effective 2026-05-26): stated
  - “(1) revises our threshold for novel chemical/biological weapons production to better track the threat model of concern; (2) refines our approach to off-cycle updates regarding the risks of individual models; and (3) makes minor terminology changes.” (PDF p. 20 (printed p. 19), Changelog, entry 'May 26, 2026 (RSP v3.3)'). _The sentence opens 'This update'._
  - Mapping note: Observed in the text: the novel chemical/biological row is redefined, §3.1 adds 'Off-cycle updates' and narrows internal in-scope models to high-stakes misalignment or automated R&D risks, and the sabotage row is retitled 'Misaligned AI systems in high-stakes settings'.
- **Anthropic · RSP · v3.4** (effective 2026-07-08): stated
  - “makes five changes: … revises the Automated R&D capability threshold” (PDF p. 20, Changelog, entry 'July 8, 2026 (RSP v3.4)', lead-in and item 1). _The lead-in opens 'This update'; the spaced ellipsis omits the item number '1.' and 'It'._
  - “fully unredacted Risk Reports be shared with at least 200 Anthropic employees, rather than with all regular-clearance Anthropic staff.” (PDF p. 21, Changelog, entry 'July 8, 2026 (RSP v3.4)', item 2, first sentence)
  - Mapping note: Items 3–5 (not quoted) set a Risk Report coverage date up to 30 days before publication, require high-level public disclosure of redactions, and allow external review to be split across reviewers so long as every unredacted part is reviewed by at least one.
- **Google DeepMind · FSF · 2024** (published 2024-05-17): n/a. _First edition in this framework sequence._
- **Google DeepMind · FSF · v2.0** (published 2025-02-04): stated
  - “Note that we have removed the Autonomy risk domain, which was included in Frontier Safety Framework version 1.0.” (PDF p. 5 (printed p. 5), Table 1, footnote 9, first sentence). _The footnote continues: 'Most of the advanced risk that was captured by this CCL is now covered by our misalignment section.'_
  - Mapping note: No consolidated changelog: the 'Updates and changes' page (PDF p. 9) lists only Version 1.0 and a corrected link (21 March 2025). Changes from v1.0 are stated in passing: Future Work (PDF p. 8) says 'we have updated our CCLs and underlying threat models from version 1.0', and footnote 6 (PDF p. 4) also says the deployment mitigation process 'is derived from that required by Deployment Level 2' in v1.0.
- **Google DeepMind · FSF · v3.0** (published 2025-09-22): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–16 (all sections, tables, footnotes and §5.3 read)
  - Searched for: “version 2 / version 1”, “previous”, “chang”, “introduc”, “this update / updated”
  - Hits set aside: §5.3 'Past Updates and Changes' (PDF p. 16) lists only 'Version 2.0 (4 February 2025)' and 'Version 1.0 (17 May 2024)' with no description of changes. 'previous' (PDF p. 5) refers to a previous risk assessment. 'chang' hits describe future change ('We may change our approach', PDF p. 2; 'may be substantially changed over time', PDF p. 10) or model capability changes (PDF pp. 5, 9, 13). 'updated' hits concern safety cases (PDF pp. 9, 13) and the future update process (PDF p. 16). No 'introduc' hits. The edition contains no statement of what changed from v2.0; the dataset's harmful-manipulation change claim rests on a separate announcement, not on this text.
- **Google DeepMind · FSF · v3.1** (published 2026-04-17): stated
  - “Introduced CBRN TCLs and outlined mitigation and risk acceptance process.” (PDF p. 17 (printed p. 17), §5.3 Past Updates and Changes, Version 3.1 (April 17, 2026), first bullet)
  - “Incorporated the previous exploratory Misalignment risk domain into a combined ML R&D and Misalignment risk domain” (PDF p. 17 (printed p. 17), §5.3, Version 3.1, second bullet)
  - Mapping note: The changelog's remaining Version 3.1 bullets: enhanced security for CBRN, Cyber and Harmful Manipulation CCLs to Security Level 2+ against non-state actors and insider threats; more detail on the risk management process, a description of the internal governance structure, and a glossary.
- **OpenAI · Preparedness · Beta** (published 2023-12-18): n/a. _First edition in this framework sequence._
- **OpenAI · Preparedness · Version 2** (published 2025-04-15): stated
  - “Also, we are removing terms “low” and “medium” from the Framework, because those levels were not operationally involved in the execution of our Preparedness work.” (PDF p. 15 (printed p. 14), Appendix A 'Change log', item 2, final sentence)
  - Mapping note: The change log has 12 items (PDF pp. 15–16); others include introducing Research Categories (item 5), handling persuasion outside the Framework, moving Nuclear and Radiological to Research Categories, Capabilities and Safeguards Reports, deprioritising safety drills, the marginal-risk approach and the governance process.
- **OpenAI · FGF · May 2026 edition** (published 2026-05-28): n/a. _First edition in this framework sequence; the edition contains no changelog._
- **xAI · FAIF · December 2025 edition** (revised 2025-12-30): n/a. _First edition in this framework sequence; the text names no predecessor document._
- **xAI · FAIF · June 2026 edition** (effective 2026-06-30): **not found** within the recorded search.
  - Inspected: Whole text layer, PDF pp. 1–9 (p. 10 blank): all sections read
  - Searched for: “previous”, “December”, “version”, “revis”, “chang”, “replace”
  - Hits set aside: The edition has no change log or summary of changes and does not mention the December 2025 edition. PDF p. 2 'We may change our approach over time' and PDF p. 7 'xAI may change its approach' describe possible future change; PDF p. 2 'versions of a model' and 'materially changed' concern models; PDF p. 8 'changes to systemic factors' concerns incident post-mortems.
  - Archive check: Confirmed not found on 2026-10-26 by a cross-family archive check of the Internet Archive capture of 2026-07-16 (https://web.archive.org/web/20260716003429/https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf), whose SHA-256 matches the recorded publisher copy; see research/archive-checks-2026-10-26/codex-report.md. That check notes that its blindness for this cell was compromised, because the edition notes stating that no change log exists had been shown to it.
- **Meta · FAF · v1.1** (published 2025-02-03): n/a. _First edition in this framework sequence (“This is the first iteration of our Frontier AI Framework”, Introduction, PDF p. 5, confirmed by the re-check of 2026-10-27)._
- **Meta · AASF · v2** (published 2026-04-08): stated
  - “Replaced "uniquely enable" with "substantially contribute to" as the primary standard” (PDF p. 44 (printed p. 44), Appendix II – Change log, entry 'April 7, 2026 (Advanced AI Scaling Framework v2.0)', sub-bullet 'Updated risk threshold language')
  - “Critical threshold changed from "Stop" to "Develop with Mitigations." High threshold measure changed from "Do not release" to "Deploy with mitigations."” (PDF p. 44, same entry, sub-bullet 'Revised thresholds', first and second sentences)
  - Mapping note: The same entry also records the rename from 'Frontier AI Framework', adding Loss of Control as a risk domain and emerging areas (nuclear & radiological, physical autonomy), named decision-makers and incident response, transparency requirements, and a revised Frontier AI definition.
- **Microsoft · FGF · Feb 2025** (published 2025-02): n/a. _First edition in this framework sequence (change log: “8 February 2025 – First version”)._
- **Microsoft · FGF · Feb 2026** (revised 2026-02): stated
  - “Adding harmful manipulation and loss of control as tracked high-risk capabilities” (PDF p. 16 (printed p. 15), Appendix II – Change log, 'February 2026' row, first bullet)
  - Mapping note: The row describes a 'One year update' following the EU Code of Practice, NY RAISE Act and California TFAIA, and also lists adjusting the update cadence to align with regulatory obligations, aligning scope with regulations, adjusting deeper-assessment cadence, defining substantially fine-tuned models, and other edits for clarity.

## Editions: retrieval and reading notes

### Anthropic · RSP · 2023

- Responsible Scaling Policy (2023); effective 2023-09-19. Initial public policy dated September 19, 2023; original entity and publication claim retained.
- Edition document: https://www-cdn.anthropic.com/1adf000c8f675958c2ee23805d91aaade1cd4613/responsible-scaling-policy.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20230919161730/https://www-files.anthropic.com/production/files/responsible-scaling-policy-1.0.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://www-cdn.anthropic.com/1adf000c8f675958c2ee23805d91aaade1cd4613/responsible-scaling-policy.pdf (HTTP 200, 527694 bytes, sha256 `14785337769bee567dd488d346f9cf6e36fed7792da9656a0a8b55b2f6d21c43`)
- Inspected: Whole text layer, PDF pp. 1–22 (printed page numbers equal PDF pages): opening statement and contents (p. 1); Framework (pp. 2–3, including 'Sources of Catastrophic Risk' p. 3); Initial Commitments with summary table (pp. 3–5); ASL-2 Commitments (pp. 5–6); ASL-3 Commitments (pp. 6–9); Procedural Commitments (pp. 9–10); Evaluation Protocol (pp. 11–14); Early Thoughts on ASL-4 and Higher (pp. 14–15); Appendices: Version History (p. 15), ASL-3 Evaluations for Autonomous Capabilities (pp. 15–20), ASL-3 Evaluations for Misuse Risks (pp. 20–21), ASL-2 and ASL-3 Security Commitments (pp. 21–22).
- Reading note: In this edition 'ASL-N' names both a set of safety measures and, colloquially, a model whose capabilities merit those measures (footnote 4, p. 5). Only ASL-2 and ASL-3 are defined; the 'Early Thoughts on ASL-4 and Higher' section (pp. 14–15) is described by the edition as an early guess and is not counted as a defined level or tracked domain in these cells. Safeguards are split into Containment Measures (for training/storing) and Deployment Measures (for use).

### Anthropic · RSP · v2.0

- Anthropic Responsible Scaling Policy — v2.0; effective 2024-10-15. The stated effective date is retained; a separate publication day is not inferred.
- Edition document: https://www-cdn.anthropic.com/616dee633636e5bd309cb73aed8622e80fe47839.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20241022154907/https://assets.anthropic.com/m/24a47b00f10301cd/original/Anthropic-Responsible-Scaling-Policy-2024-10-15.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://www-cdn.anthropic.com/616dee633636e5bd309cb73aed8622e80fe47839.pdf (HTTP 200, 336390 bytes, sha256 `cc522e2770c6fec6c2808ce5abd8b757a8d7fe2078d029879295df8443185f7f`)
- Inspected: Whole text layer, PDF pp. 1–22 (printed p. N = PDF p. N+4 from the Introduction onward; pp. 1–4 unnumbered): cover (p. 1); Executive Summary (pp. 2–3); Contents (p. 4); Introduction (pp. 5–6); §1 Background (pp. 6–7); §2 Capability Thresholds and Required Safeguards (pp. 7–8); §3 Capability Assessment (pp. 9–11); §4 Safeguards Assessment (pp. 11–14); §5 Follow-Up Capability Assessment (p. 14); §6 Deployment and Scaling Outcomes (pp. 14–15); §7 Governance and Transparency (pp. 15–17); Appendix A Glossary (p. 18); Appendix B ASL-2 Standard (p. 19); Appendix C Detailed Capability Thresholds (p. 20); Changelog (pp. 21–22).
- Reading note: From this edition 'ASL' names groups of safeguards (ASL Standards), not models; risk levels are expressed as Capability Thresholds, each mapped to Required Safeguards. Thresholds are named by domain (CBRN weapons; Autonomous AI R&D) without numbered labels. Cyber operations is listed separately as a capability under 'ongoing assessment'. Several operative provisions sit in footnotes (e.g. footnotes 3, 14, 17, 18).

### Anthropic · RSP · v2.1

- Anthropic Responsible Scaling Policy — v2.1; effective 2025-03-31. The stated effective date is retained; a separate publication day is not inferred.
- Edition document: https://www-cdn.anthropic.com/17310f6d70ae5627f55313ed067afc1a762a4068.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20250402134435/https://www-cdn.anthropic.com/17310f6d70ae5627f55313ed067afc1a762a4068.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://www-cdn.anthropic.com/17310f6d70ae5627f55313ed067afc1a762a4068.pdf (HTTP 200, 625648 bytes, sha256 `f0ac67ca61b1726cbcd159e6d2f595ce4f26de2ee29c594ba488f53f780d4ee7`)
- Inspected: Whole text layer, PDF pp. 1–22 (printed p. N = PDF p. N+4 from the Introduction onward; pp. 1–4 unnumbered): cover (p. 1); Executive Summary (pp. 2–3); Contents (p. 4); Introduction (pp. 5–6); §1 Background (pp. 6–7); §2 Capability Thresholds and Required Safeguards (pp. 7–9); §3 Capability Assessment (pp. 9–11); §4 Safeguards Assessment (pp. 11–14); §5 Follow-Up Capability Assessment (p. 14); §6 Deployment and Scaling Outcomes (p. 15); §7 Governance and Transparency (pp. 16–17); Appendix A Glossary (p. 18); Appendix B ASL-2 Standard (p. 19); Appendix C Detailed Capability Thresholds (p. 20); Changelog (pp. 21–22).
- Reading note: Largely the v2.0 text with renumbered footnotes and one page offset after §2. Thresholds now carry labels: CBRN-3, CBRN-4, AI R&D-4, AI R&D-5 (table PDF p. 8; detailed definitions Appendix C, PDF p. 20). §5 now commits to updating the policy with any additional Capability Thresholds when upgrading safeguards. Table wording for CBRN-4, AI R&D-4 and AI R&D-5 is repeated verbatim in Appendix C, so quotes for those thresholds are taken from Appendix C where the wording is unique.

### Anthropic · RSP · v2.2

- Anthropic Responsible Scaling Policy — v2.2; effective 2025-05-14. The stated effective date is retained; a separate publication day is not inferred.
- Edition document: https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20250514223759/https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext. The default text layer splits words and carries invisible bidi and zero-width characters, so the raw-mode layer is used.
- Retrieved 2026-10-15: https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf (HTTP 200, 342638 bytes, sha256 `4807f3970c76968a75a6dffa55d8ffe547014522b63c67e261cd02f7b6fc1e39`)
- Inspected: Whole text layer, PDF pp. 1–23 (printed p. N = PDF p. N+4 from the Introduction onward; pp. 1–4 unnumbered): cover (p. 1); Executive Summary (pp. 2–3); Contents (p. 4); Introduction (pp. 5–6); §1 Background (pp. 6–7); §2 Capability Thresholds and Required Safeguards (pp. 7–9); §3 Capability Assessment (pp. 9–11); §4 Safeguards Assessment (pp. 11–14); §5 Follow-Up Capability Assessment (p. 14); §6 Deployment and Scaling Outcomes (p. 15); §7 Governance and Transparency (pp. 16–17); Appendix A Glossary (p. 18); Appendix B ASL-2 Standard (p. 19); Appendix C Detailed Capability Thresholds (p. 20); Changelog (pp. 21–23).
- Reading note: Operative text matches v2.1 page for page except footnote 11 (PDF p. 13), which now places 'sophisticated or state-compromised insiders' out of scope for the ASL-3 Security Standard and defines basic vs sophisticated insider risk; the changelog adds a May 14, 2025 entry (PDF p. 23). The pdftotext layer of this edition carries invisible bidirectional-format characters around text runs and detaches some initial capitals onto separate lines; quotes reproduce the visible wording. Consequently `check` reports every v2.2 quote except D6.competitor as 'fragment not found'. Each v2.2 quote was verified separately (in memory, nothing written) against the layer with the format characters U+200E/F, U+202A–U+202E and U+2066–2069 removed, detached initial capitals rejoined, and whitespace ignored: all 20 entries match on exactly the PDF page given in their locator.

### Anthropic · RSP · v3.0

- Anthropic Responsible Scaling Policy — v3.0; effective 2026-02-24. The cover effective date and release announcement publication date both identify February 24, 2026.
- Edition document: https://anthropic.com/responsible-scaling-policy/rsp-v3-0; archived copy recorded in the dataset: https://web.archive.org/web/20260224203046/https://www.anthropic.com/responsible-scaling-policy/rsp-v3-0
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://www-cdn.anthropic.com/e670587677525f28df69b59e5fb4c22cc5461a17.pdf (HTTP 200, 473604 bytes, sha256 `a71bfa08a7fa4b750b2b408b4b9c8681ad50c6b53271c314f591c59c84c38064`)
- Inspected: Whole text layer, PDF pp. 1–19: cover (p. 1); contents (p. 2); Introduction (pp. 3–4); §1 Our Recommendations for Industry-Wide Safety with the threshold table (pp. 4–9); §2 Frontier Safety Roadmap (p. 10); §3 Risk Reports, §§3.1–3.6.3 (pp. 10–15); §4 Governance (p. 15); Appendix A: Commitments Related to Competitors and Appendix B: Notes on ASLs (p. 16); Changelog (pp. 17–19).
- Reading note: Printed page numbers equal PDF pages. A comprehensive rewrite: thresholds sit in a three-column table (capability or usage threshold; 'our plan as a company'; 'ambitious industry-wide recommendations'), and the edition says it cannot unilaterally commit to the right column. New instruments are the Frontier Safety Roadmap (non-binding public goals) and Risk Reports (every 3–6 months, CEO/RSO approval, external review). Competitor-dependent delay commitments are in Appendix A. ASLs survive only to name present mitigation levels (Appendix B).

### Anthropic · RSP · v3.1

- Anthropic Responsible Scaling Policy — v3.1; effective 2026-04-02. The stated effective date is retained; a separate publication day is not inferred.
- Edition document: https://www-cdn.anthropic.com/files/4zrzovbb/website/bf04581e4f329735fd90634f6a1962c13c0bd351.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20260407193305/https://www-cdn.anthropic.com/files/4zrzovbb/website/bf04581e4f329735fd90634f6a1962c13c0bd351.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext. The default text layer splits words and carries invisible bidi and zero-width characters, so the raw-mode layer is used.
- Retrieved 2026-10-15: https://www-cdn.anthropic.com/files/4zrzovbb/website/bf04581e4f329735fd90634f6a1962c13c0bd351.pdf (HTTP 200, 268348 bytes, sha256 `5aa73a3b3155ef856e429711c8d156e18d9b5ce1e28c2e0a74019a2c3c764d7b`)
- Inspected: Whole text layer, PDF pp. 1–20: cover (p. 1); contents (p. 2); Introduction (pp. 3–4); §1 with the threshold table (pp. 4–10); §2 Frontier Safety Roadmap (p. 11); §3 Risk Reports (pp. 11–15); §4 Governance (p. 16); Appendix A (pp. 16–17); Appendix B (p. 17); Changelog (pp. 17–20).
- Reading note: Printed page = PDF page up to p. 10 and PDF page − 1 from p. 11 (printed '10' appears twice). Structure as v3.0. Changes: Automated R&D threshold re-operationalized; internal feedback on Risk Reports; Appendix A pause sentence; 'highly capable' now refers to the Automated R&D threshold.

### Anthropic · RSP · v3.2

- Anthropic Responsible Scaling Policy — v3.2; effective 2026-04-29. The stated effective date is retained; a separate publication day is not inferred.
- Edition document: https://cdn.sanity.io/files/4zrzovbb/website/28c6241900d90410628a8a2003a5572faae4365a.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20260505141510/https://cdn.sanity.io/files/4zrzovbb/website/28c6241900d90410628a8a2003a5572faae4365a.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://cdn.sanity.io/files/4zrzovbb/website/28c6241900d90410628a8a2003a5572faae4365a.pdf (HTTP 200, 493353 bytes, sha256 `5410e3d986cf6917e9105c3d3a661ccc91bfbcb8672bca18b7752ca394e3f2a1`)
- Inspected: Whole text layer, PDF pp. 1–20: cover (p. 1); contents (p. 2); Introduction (pp. 3–4); §1 with the threshold table (pp. 4–10); §2 Frontier Safety Roadmap (p. 11); §3 Risk Reports (pp. 11–16); §4 Governance (p. 16); Appendix A (pp. 16–17); Appendix B (p. 17); Changelog (pp. 18–20).
- Reading note: Printed page = PDF page up to p. 10 and PDF page − 1 from p. 11. Clean text layer. Same structure as v3.1; adds LTBT-requested external review (§3.6), LTBT approval of external reviewer selection (§3.6.1) and regular LTBT briefings (§4 item 2), so later §4 items are renumbered.

### Anthropic · RSP · v3.3

- Anthropic Responsible Scaling Policy — v3.3; effective 2026-05-26. The stated effective date is retained; a separate publication day is not inferred.
- Edition document: https://cdn.sanity.io/files/4zrzovbb/website/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20260528170023/https://cdn.sanity.io/files/4zrzovbb/website/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext. The default text layer splits words and carries invisible bidi and zero-width characters, so the raw-mode layer is used.
- Retrieved 2026-10-15: https://cdn.sanity.io/files/4zrzovbb/website/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf (HTTP 200, 293120 bytes, sha256 `b7e7cc1e72e9371949415522ae3c9e61103cc739c5df64579af32dd941624f42`)
- Inspected: Whole text layer, PDF pp. 1–20: cover (p. 1); contents (p. 2); Introduction (pp. 3–4); §1 with the threshold table (pp. 4–10; columns on pp. 7–10 interleave in the text layer and were read individually); §2 Frontier Safety Roadmap (p. 11); §3 Risk Reports (pp. 11–16); §4 Governance (p. 16); Appendix A (pp. 16–17); Appendix B (p. 17); Changelog (pp. 18–20).
- Reading note: Printed page = PDF page up to p. 10 and PDF page − 1 from p. 11. Novel chemical/biological threshold redefined; sabotage row retitled 'Misaligned AI systems in high-stakes settings'; §3.1 adds 'Off-cycle updates'.

### Anthropic · RSP · v3.4

- Anthropic Responsible Scaling Policy — v3.4; effective 2026-07-08. The stated effective date is retained; a separate publication day is not inferred.
- Edition document: https://cdn.sanity.io/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20260710234036/https://cdn.sanity.io/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext. The default text layer splits words and carries invisible bidi and zero-width characters, so the raw-mode layer is used.
- Retrieved 2026-10-15: https://cdn.sanity.io/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf (HTTP 200, 304755 bytes, sha256 `6247b9e4001fd342827526fabc476c9d4dd6b2041ac00055f0ccda26f4d0b07d`)
- Inspected: Whole text layer, PDF pp. 1–21: cover (p. 1); contents (p. 2); Introduction (pp. 3–4); §1 with the threshold table (pp. 4–10; interleaved columns read individually); §2 Frontier Safety Roadmap (p. 11); §3 Risk Reports (pp. 11–16); §4 Governance (pp. 16–17); Appendix A (p. 17); Appendix B (p. 17); Changelog (pp. 18–21).
- Reading note: Printed page numbers equal PDF pages. Changes: Automated R&D scenario (2) compared also against the fastest observed extended rate; Risk Report coverage date up to 30 days before publication; fully unredacted reports to at least 200 employees; public disclosure of redactions; external review may be split across reviewers.

### Google DeepMind · FSF · 2024

- Frontier Safety Framework (2024); published 2024-05-17. The sourced publication date does not establish an implementation or effective date.
- Edition document: https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/introducing-the-frontier-safety-framework/fsf-technical-report.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20240517140902/https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/introducing-the-frontier-safety-framework/fsf-technical-report.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/introducing-the-frontier-safety-framework/fsf-technical-report.pdf (HTTP 200, 248794 bytes, sha256 `3c073cd5c7a0dd03a07d0cc826fd9d5c76801f57441ac37ef6b2163e9261543d`)
- Inspected: Whole text layer, PDF pp. 1–7: opening section and table of contents (pp. 1), Framework components 1–3 (p. 2), Mitigations: Security Mitigations table (pp. 3–4), Deployment Mitigations table (p. 4), Critical Capability Levels table (pp. 4–6), Future work (p. 6), Acknowledgements (p. 7). Text-layer page 8 is empty.
- Reading note: Printed page numbers match PDF pages. Thresholds are 'Critical Capability Levels (CCLs)'; detection uses 'early warning evaluations' with a 'pass' condition. Mitigations are graded as Security Levels 0–4 and Deployment Levels 0–3 but not yet mapped to CCLs. No governance body, internal reporting or changelog appears; external alerting and third-party involvement are stated as being explored.

### Google DeepMind · FSF · v2.0

- Google DeepMind Frontier Safety Framework — v2.0; published 2025-02-04. The sourced publication date does not establish an implementation or effective date.
- Edition document: https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/updating-the-frontier-safety-framework/Frontier%20Safety%20Framework%202.0.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20250205011727/https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/updating-the-frontier-safety-framework/Frontier%20Safety%20Framework%202.0.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/updating-the-frontier-safety-framework/Frontier%20Safety%20Framework%202.0.pdf (HTTP 200, 304584 bytes, sha256 `14a48e4ef052fba75b651ea23845c2e9557f5c638e2767656decc6410861aae3`)
- Inspected: Whole text layer, PDF pp. 1–9: opening section (p. 1), table of contents and Framework components 1–3 (pp. 2–3), Misuse: Mitigation Approach (pp. 3–4), Misuse CCLs and Table 1 (pp. 4–6), Deceptive Alignment with Table 2 and Safety Cases and Control Evaluations (pp. 6–7), Governance and Accountability: Governance, Disclosure (pp. 7–8), Future Work and Acknowledgements (p. 8), Updates and changes (p. 9).
- Reading note: Inspected copy is the current publisher file (9 pages, with an 'Updates and changes' page dated to a 21 March 2025 link correction); the 2025-02-05 archive capture has 8 pages and the Disclosure sentence entirely on p. 8. 'Alert threshold' replaces v1.0's 'pass' condition. Risk types: misuse (CBRN, Cyber, ML R&D) and exploratory deceptive alignment.

### Google DeepMind · FSF · v3.0

- Google DeepMind Frontier Safety Framework — v3.0; published 2025-09-22. The sourced publication date does not establish an implementation or effective date.
- Edition document: https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20250922134959/https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf (HTTP 200, 457871 bytes, sha256 `87ebf40b747b98468226b2198442b45ff54854975f6e9882d9ece2d009082fe5`)
- Inspected: Whole text layer, PDF pp. 1–16: cover (p. 1), Overview (p. 2), table of contents (p. 3), Section 1 Framework §§1.1–1.6 (pp. 4–7), Section 2 Misuse §§2.1–2.2 with Tables 2.2.1.a–2.2.3.a (pp. 8–11), Section 3 Machine Learning R&D §§3.1–3.2 with Table 3.2.1.a (pp. 12–14), Section 4 Misalignment (Exploratory Approach) with Table 4.a (p. 15), Section 5 Updates and Disclosures §§5.1–5.3 (p. 16).
- Reading note: Printed page numbers match PDF pages (footer 'Frontier Safety Framework | N'). Three risk types: misuse (CBRN, cyber, harmful manipulation), ML R&D, and exploratory misalignment without risk acceptance criteria. Decisions are attributed to an unnamed 'appropriate governance function'. §5.3 lists past versions without describing changes.

### Google DeepMind · FSF · v3.1

- Google DeepMind Frontier Safety Framework — v3.1; published 2026-04-17. The sourced publication date does not establish an implementation or effective date.
- Edition document: https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20260423021420/https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf (HTTP 200, 447155 bytes, sha256 `ad10d2d240e0d557ecad406dbccedcbb4a70295f8ba8eec46bfe01803cb9c301`)
- Inspected: Whole text layer, PDF pp. 1–20: cover (p. 1), Overview (p. 2), table of contents (p. 3), Section 1 Framework §§1.1–1.3.5 (pp. 4–8), Section 2 Misuse §§2.1–2.2 (pp. 9–12), Section 3 Machine Learning R&D and Misalignment §§3.1–3.2 (pp. 13–15), Section 4 Governance and Accountability (p. 16), Section 5 Updates and Disclosures §§5.1–5.3 (p. 17), Glossary (pp. 18–20).
- Reading note: Printed page numbers match PDF pages. Introduces a lower tier, 'Tracked Capability Levels (TCLs)' (significant but not severe harm), alongside CCLs; the text writes 'T/CCL' for both. Misalignment is merged into an 'ML R&D and Misalignment' domain. Introduces 'Security Level 2+'. Has its own changelog for v3.1 in §5.3.

### OpenAI · Preparedness · Beta

- OpenAI Preparedness Framework — Beta; published 2023-12-18. The sourced publication date does not establish an implementation or effective date.
- Edition document: https://cdn.openai.com/openai-preparedness-framework-beta.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20231218195930/https://cdn.openai.com/openai-preparedness-framework-beta.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://cdn.openai.com/openai-preparedness-framework-beta.pdf (HTTP 200, 27448530 bytes, sha256 `c84e3a59c7dab251e45434e0b0d3e8abadcea7293f995cf92d32269e7d290398`)
- Inspected: Whole text layer, PDF pp. 1–27: cover (p. 1); Introduction (pp. 2–3); How to read this document (p. 4); Tracked Risk Categories (pp. 5–12: Cybersecurity p. 8, CBRN p. 9, Persuasion p. 10, Model autonomy p. 11, Unknown unknowns p. 12); Scorecard incl. illustrative Scorecard (pp. 13–19); Governance: Safety baselines (pp. 20–21), Operations, Accountability (pp. 22–25); Example Scenarios (p. 26); p. 27 page furniture only.
- Reading note: Printed page numbers equal PDF page numbers. Each Tracked Risk Category has Low/Medium/High/Critical levels; the Scorecard records pre- and post-mitigation levels. Several pages are justified text that pdftotext splits into one word per line, and Governance p. 20 interleaves two columns; quotes avoid the interleaved passages. 'OpenAI Leadership' is defined as the CEO or a designee (p. 23). The Example Scenarios (p. 26) are illustrative and were not quoted.

### OpenAI · Preparedness · Version 2

- OpenAI Preparedness Framework — Version 2; published 2025-04-15. Cover last-updated date and dated publication announcement both identify April 15, 2025; no distinct effective date is asserted.
- Edition document: https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20250415191354/https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf (HTTP 200, 170399 bytes, sha256 `fae6e4cc6f7212a010bb9348fc0cde1fe711b9cad426c6a99db97740ee52729b`)
- Inspected: Whole text layer, PDF pp. 1–22: cover (p. 1); overview (p. 2); contents (p. 3); §1 Introduction (pp. 4–5); §2 Deciding where to focus (pp. 5–9, Table 1 pp. 6–7, Table 2 p. 8); §3 Measuring capabilities (pp. 9–11); §4 Safeguarding against severe harm (pp. 11–13); §5 Building trust (pp. 13–14); Appendix A Change log (pp. 15–16); Appendix B Decision-making practices (p. 16); Appendix C Illustrative safeguards, controls and efficacy assessments (pp. 17–22).
- Reading note: Printed page = PDF page − 1. Levels are High and Critical only; Tracked Categories have thresholds, Research Categories do not. Table 1 columns are interleaved in the text layer. Appendix C safeguards are stated to be illustrative, except the C.3 practices 'required' for High capability models.

### OpenAI · FGF · May 2026 edition

- OpenAI Frontier Governance Framework — May 2026 edition; published 2026-05-28. Publication date comes from the release announcement; the PDF cover has no separate version date.
- Edition document: https://cdn.openai.com/pdf/e37d949b-8c9f-4d76-b99e-4272f4631a7e/openai-frontier-governance-framework.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20260529171758/https://cdn.openai.com/pdf/e37d949b-8c9f-4d76-b99e-4272f4631a7e/openai-frontier-governance-framework.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://cdn.openai.com/pdf/e37d949b-8c9f-4d76-b99e-4272f4631a7e/openai-frontier-governance-framework.pdf (HTTP 200, 6136955 bytes, sha256 `33e4e118b24d56786c2292df6ed4d9ec635f8887b22986f98ce3c09896fcfffc`)
- Inspected: Whole text layer, PDF pp. 1–22: cover (p. 1); contents (p. 2); §1 Introduction (pp. 3–4); §2 Systemic risk assessment & mitigation (pp. 5–15: 2.1 p. 5–6, 2.2 p. 7, 2.3 p. 8, 2.4 Risk tiers pp. 9–12, 2.5 p. 13, 2.6 pp. 14–15); §3 Security risk management (pp. 16–17); §4 Model reporting (p. 18); §5 Input from external experts (p. 19); §6 Allocation of responsibility (p. 20); §7 Framework change management (pp. 21–22).
- Reading note: Printed page = PDF page − 2 (printed as '01' etc.). The PDF carries no edition date and no changelog; the only dates are the 2021 baseline in a tier definition and references to the 'Effective Dates' of the TFAIA and the EU Code of Practice. Nothing in the text indicates a revision later than May 2026. The FGF presents itself as a compliance document for California's TFAIA and the EU General-Purpose AI Code of Practice. On its relationship to the Preparedness Framework it states: “The FGF overlaps in some areas with our existing Preparedness Framework (PF). The PF and FGF together describe OpenAI’s practices, and we will continue to use and evolve the PF” (PDF p. 4), and it refers to Appendix B of the PF for deployment governance (PDF p. 20). Uses 'Tier 1–3' rather than High/Critical; several tier tables are column-interleaved in the text layer.

### xAI · FAIF · December 2025 edition

- xAI Frontier Artificial Intelligence Framework — December 2025 edition; revised 2025-12-30. The printed update date is retained; it is not silently treated as publication. The URL filename says December 31; the visible document says last updated December 30.
- Edition document: https://data.x.ai/2025-12-31-xai-frontier-artificial-intelligence-framework.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20260102171656/https://data.x.ai/2025-12-31-xai-frontier-artificial-intelligence-framework.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://data.x.ai/2025-12-31-xai-frontier-artificial-intelligence-framework.pdf (HTTP 200, 251686 bytes, sha256 `aa01669c19fca50c85323595141d08f98076cf0c48ed8f4a114ad6420c1a1012`)
- Inspected: Whole text layer, PDF pp. 1–11 (p. 12 blank): Introduction and Scope (p. 1); Overall Approach (pp. 1–3); Addressing Risks of Malicious Use (pp. 3–6: 1 Approach to Benchmarking pp. 3–4, 2 Risk Assessment pp. 4–6, 3 Safeguard Implementation p. 6); Addressing Risks of Loss of Control (pp. 6–8); Operational and Societal Risks (pp. 8–10: 1 Public transparency and third-party review p. 8, 2 Public Understanding p. 8, 3 Information Security p. 9, 4 Governance Approach p. 9, 5 Deployment Decisions p. 10); xAI Data Disclosure under AB-2013 (pp. 10–11).
- Reading note: No printed page numbers; dated 'Last updated: December 30, 2025'. Sections are unnumbered headings with numbered subsections. Thresholds are 'risk acceptance criteria for system deployment' on specific benchmarks, not named levels. States compliance with California's TFAIA. The text names no predecessor document. The xAI Data Disclosure is not framework content.

### xAI · FAIF · June 2026 edition

- xAI Frontier Artificial Intelligence Framework — June 2026 edition; effective 2026-06-30. The stated effective date is retained; a separate publication day is not inferred.
- Edition document: https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20260716003429/https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf (HTTP 200, 203142 bytes, sha256 `2c3c6313bd2fb6eeffcafedb38013c34d92c53331ddedbfa331821c75055df53`)
- Inspected: Whole text layer, PDF pp. 1–9 (p. 10 blank): §1 Introduction (pp. 1–2); §2 Risk Management Framework (p. 2) with §2.1 Risk Identification (pp. 2–5; (a) CBRN pp. 3–4, (b) Loss of Control p. 4, (c) Offensive Cybersecurity pp. 4–5), §2.2 Systemic risk analysis (p. 5), §2.3 Systemic risk acceptance determination (pp. 5–6), a second §2.3 Safety mitigations (pp. 6–7), §2.4 Security mitigations (pp. 7–8); §3 Incident reporting (pp. 8–9); §4 Governance (p. 9).
- Reading note: Effective Date 30 June 2026; no printed page numbers. Two sections are numbered 2.3. Vocabulary follows the EU General-Purpose AI Code of Practice (systemic risk, acceptance determination, post-market monitoring; footnotes 1–2). No change log; no numeric thresholds. Text has typos as printed ('use, , or'; 'CRBN').

### Meta · FAF · v1.1

- Meta Frontier AI Framework — Version 1.1; published 2025-02-03. Publication date from Meta’s dated announcement of February 3, 2025; Meta’s v2 change log also dates the initial version February 3, 2025. The earliest archive capture of the file is 2025-02-13; a revised expression under the same label followed by 2025-03-28.
- Edition document: https://ai.meta.com/static-resource/meta-frontier-ai-framework/ (expression checked in the dataset: https://web.archive.org/web/20250213105620/https://ai.meta.com/static-resource/meta-frontier-ai-framework/); archived copy recorded in the dataset: https://web.archive.org/web/20250213105620/https://ai.meta.com/static-resource/meta-frontier-ai-framework/
- Checked: Not retrieved in the 2026-10-15 run (publisher address HTTP 500; Internet Archive unreachable). Re-checked blind by a reviewer from a different model family on 2026-10-27 (codex-meta-v1-1-2026-10-27.md): the raw replay of the 2025-02-13 capture was retrieved (HTTP 200, application/pdf; decoded PDF 14,652,734 bytes, SHA-256 9fa301dfb67bf8d392abda13a2466358ffde756f14a9d55e4fe2d95f7cfecc21), all 21 pages read, and all eight carried quotations matched on their recorded pages.
- Inspected: Whole edition, PDF pp. 1–21, read in the text layer of the decoded PDF of the Internet Archive capture of 2025-02-13; cover and PDF pp. 12–13 and 19 inspected visually, by the cross-family re-check of 2026-10-27. Cells applied on 2026-10-28 by the maintainer’s decisions of 2026-10-27 and 2026-10-28.
- Reading note: Cells carried from the dataset were confirmed by the re-check; the other cells are its findings, quoted and located by the re-check, with the comparison’s mapping notes. Three findings that differed from the stored status in a way that needed judgement (D4.oversight, D7.external, D8.process) were decided by the maintainer on 2026-10-28; see review/followups-2026-10-28.md.

### Meta · AASF · v2

- Meta Advanced AI Scaling Framework — Version 2; published 2026-04-08. Publication date from Meta’s dated announcement of April 8, 2026; the framework’s own change log dates the version April 7, 2026.
- Edition document: https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2; archived copy recorded in the dataset: https://web.archive.org/web/20260408163104/https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2 (HTTP 200, 668289 bytes, sha256 `d87aa9bf00456ec747e80b84216f9f2ffc427c1e98541f8b3c8f7f52c13c7b6a`)
- Inspected: Whole text layer, PDF pp. 1–44 (p. 45 blank): opening page (p. 1); How to read this document (p. 2); Section 1 Introduction (p. 3); Section 2 Governance & Transparency (pp. 4–11: 2.1 AI Governance pp. 4–7, 2.2 Transparency pp. 7–9, 2.3 Accountability pp. 10–11); Section 3 Outcomes & Thresholds (pp. 12–24: 3.1 p. 12, 3.2 Threat modeling pp. 12–14, 3.3 Risk Thresholds pp. 15–17, 3.4 Outcomes & Threat Scenarios pp. 18–24); Section 4 Implementation (pp. 25–39: 4.1 p. 25, 4.2 Evaluation and mitigation pp. 25–38 incl. 4.2.1 Cybersecurity pp. 27–31, 4.2.2 Chemical and Biological pp. 31–33, 4.2.3 Loss of Control pp. 33–36, 4.2.4 Emerging pp. 36–38, 4.3 Benefits Assessment p. 39); Section 5 Future Work (p. 40); Appendix I Terminology (pp. 41–43); Appendix II Change log (p. 44).
- Reading note: Printed page numbers equal PDF pages. Renamed from 'Frontier AI Framework'. Thresholds are defined against outcomes and threat scenarios ('substantially contribute'), with three levels (Critical, High, Moderate or lower). The text layer of Table 1 (PDF p. 15) interleaves columns; quotes from it were taken only from contiguous cell text.

### Microsoft · FGF · Feb 2025

- Microsoft Frontier Governance Framework — Version 1 (February 2025); published 2025-02. Page footers read “Version 1 (February 2025)” and the change log dates the first version 8 February 2025. No separate dated announcement was located; the earliest archive capture is 2025-02-26, so publication is dated only to the month.
- Edition document: https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/Microsoft-Frontier-Governance-Framework.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20250226161803/https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/Microsoft-Frontier-Governance-Framework.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/Microsoft-Frontier-Governance-Framework.pdf (HTTP 200, 304300 bytes, sha256 `da0d8b1507a305fb8b5148b560d8be426549b854ca8888b999874d00e6170c4f`)
- Inspected: Whole text layer, PDF pp. 1–15 (p. 16 blank): cover (p. 1); contents (p. 2); §1 Evidence-based management of frontier risk (pp. 3–4); §2 Capabilities and risks (pp. 4–5); §3 Evaluation and assessment (pp. 5–7); §4 Mitigations (pp. 7–9); §5 Governance (p. 10); §6 Collaboration and continuous learning (p. 11); Appendix I Capability thresholds (pp. 12–14); Appendix II Change log (p. 15).
- Reading note: Printed page = PDF page − 1. Footers read 'Version 1 (February 2025)'. Four risk levels (low, medium, high, critical) per tracked capability; a two-stage process (leading indicator assessment, then deeper capability assessment).

### Microsoft · FGF · Feb 2026

- Microsoft Frontier Governance Framework — February 2026; revised 2026-02. The edition’s footers and change log date it February 2026. A publication date is not established: the file was last modified 2026-03-24 and first captured 2026-04-24.
- Edition document: https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/Frontier-Governance-Framework-Feb-2026.pdf; archived copy recorded in the dataset: https://web.archive.org/web/20260424000716/https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/Frontier-Governance-Framework-Feb-2026.pdf
- Checked: Current publisher copy retrieved 2026-10-15; text layer by pdftotext.
- Retrieved 2026-10-15: https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/Frontier-Governance-Framework-Feb-2026.pdf (HTTP 200, 831043 bytes, sha256 `3282e4fc65a84420f3bf1360d4716928883abce3d28b56804d0598c164111932`)
- Inspected: Whole text layer, PDF pp. 1–16 (p. 17 blank): cover (p. 1); contents (p. 2); §1 (p. 3); §2 Capabilities and risks incl. 'Identifying tracked high-risk capabilities' (pp. 4–5); §3 Evaluation and assessment (pp. 5–7); §4 Mitigations (pp. 8–9); §5 Governance (p. 10); §6 Collaboration and continuous learning (p. 11); Appendix I Capability thresholds incl. Loss of control and Harmful manipulation (pp. 12–15); Appendix II Change log (p. 16).
- Reading note: Printed page = PDF page − 1. Footers read 'February 2026'. Structure and much wording carried over from February 2025; 'tracked capability' is often rewritten 'tracked high-risk capability'. Loss of control and harmful manipulation are tracked without capability thresholds.
