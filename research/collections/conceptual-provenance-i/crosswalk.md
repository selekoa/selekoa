# Pinned upstream crosswalk

Collection: conceptual-provenance-i · v1
Upstream: [futurelightcone/source-integrity@54c62fc426d7b6ae008fd6acd3f53a0b993248ac](https://github.com/futurelightcone/source-integrity/blob/54c62fc426d7b6ae008fd6acd3f53a0b993248ac/reports/BASELINE-v1.md)
Collection fingerprint: sha256:2cda4362df4062c9bc0cda6ce322e26e1efd20c1c1e90928e8eface47d543faf

**Preliminary machine research. Investigated propositions are not accepted facts. Human review is not recorded.**

All addresses refer to the pinned commit. Ordinals count CSV data records after the header, not physical lines. Evidence has no upstream evidence ID: its pinned file and ordinal are its address; Selekoa assigns si-evidence-NNN from that ordinal. A changed upstream commit requires an explicit new mapping.

The upstream atomization crosswalk includes source-grouped and packet-level associations. These are not necessarily semantic equivalence or evidence for every mapped proposition. Selected atomic propositions are reproduced verbatim; raw packet prose and dissertation drafts are excluded. Follow the private upstream repository to inspect packet assertions.

## Inputs

| File                                                                                                                                                                                 | Git blob                                 | SHA-256 of exact upstream bytes                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | ----------------------------------------------------------------------- |
| [reports/canonical-claims.csv](https://github.com/futurelightcone/source-integrity/blob/54c62fc426d7b6ae008fd6acd3f53a0b993248ac/reports/canonical-claims.csv)                       | 7a3d447329f99f084da024b68e7ad31da7387e4b | sha256:90ef2fa4d9ac550bd3d3a302c3e65b22918970b78a2a32c73fccf4371237bdc0 |
| [reports/canonical-sources.csv](https://github.com/futurelightcone/source-integrity/blob/54c62fc426d7b6ae008fd6acd3f53a0b993248ac/reports/canonical-sources.csv)                     | be5ca72639e3b57e33b1f5bc86fd24709a996ddd | sha256:626fd7522f515ba14d4e7f9d6c33a1436eb47aee9660942fbf1a6307e5899419 |
| [reports/claim-atomization-crosswalk.csv](https://github.com/futurelightcone/source-integrity/blob/54c62fc426d7b6ae008fd6acd3f53a0b993248ac/reports/claim-atomization-crosswalk.csv) | d8e5639d6b49c129e6a2c7af8b62271ede3a045c | sha256:2ebd2a2dcd0113aec35523621bc6a2c8503dfa3295a6c15838bb4932279980a2 |
| [reports/claim-evidence.csv](https://github.com/futurelightcone/source-integrity/blob/54c62fc426d7b6ae008fd6acd3f53a0b993248ac/reports/claim-evidence.csv)                           | 7729bfc72cff278a176a8389880e7c9410618839 | sha256:8db7399c3ba11c6bd21eed9f45e9f08f906bebe1cef4c8fd090eb822f7009927 |

## Proposition and evidence addresses

| Local ID        | Upstream ID / CSV ordinal                                                       | Projected row fingerprint                                               |
| --------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| si-pcr-001      | PCR-001; canonical-claims.csv #1                                                | sha256:c4edf7d308abbd182d5c9f32c3e94690e766612ac78d960801109fb46735a966 |
| si-pcr-002      | PCR-002; canonical-claims.csv #2                                                | sha256:34f8a5761dcea914407e934860184dcebe3b469c9352d0fe172f355e7e9a5a8e |
| si-pcr-004      | PCR-004; canonical-claims.csv #4                                                | sha256:245a51651f57b4386e1a1b61e40a2113658a86e7735818037b2633e002e84cba |
| si-pcr-010      | PCR-010; canonical-claims.csv #10                                               | sha256:c6cca2ad592a6dfa45777a9f783168ac40e1fa5243adb2ead2e1945b4411a4a6 |
| si-pcr-015      | PCR-015; canonical-claims.csv #15                                               | sha256:51d6a50bf5e4f06fa39a6a93f426b9027c3cbe7b0dbab0fe536d298fa3745366 |
| si-pcr-017      | PCR-017; canonical-claims.csv #17                                               | sha256:76bb081958b2829687b03a2fe78b59b6a8766e36a77402fcd819fa1d0f60cf50 |
| si-pcr-027      | PCR-027; canonical-claims.csv #27                                               | sha256:5f21ce3ac63c2175321235682170af0d9b4e244e8faad7f3e98ec8a6da715a67 |
| si-pcr-028      | PCR-028; canonical-claims.csv #28                                               | sha256:cd13b38225ab46fb6c7f4c476f05251514fe5a31f9e4d53f71b2ad0f8eef41ac |
| si-pcr-035      | PCR-035; canonical-claims.csv #35                                               | sha256:7950aae38cafe79cca598f3c379a90a1682760e461fb947b1c21a76928925ec9 |
| si-pcr-036      | PCR-036; canonical-claims.csv #36                                               | sha256:aa61830d2e55138b6970d9a0cc836e381345ac982b3dd3e97b77096c6b577a31 |
| si-pcr-045      | PCR-045; canonical-claims.csv #45                                               | sha256:b5291b7ed85ce6a5353417042b44191442c0ebf30d68ad95b58f931fec011d46 |
| si-evidence-001 | claim-evidence.csv #1; si-pcr-001; SRC-0EA45CE29F2E19; EXP-SRC-0EA45CE29F2E19   | sha256:e2484a08627425b69e01d64b2d37087e6f92e6f999ad87f2d1055a8b204e05ed |
| si-evidence-002 | claim-evidence.csv #2; si-pcr-002; SRC-0EA45CE29F2E19; EXP-SRC-0EA45CE29F2E19   | sha256:e51ae3d076e852ffa3733d79d99dcb1b0513c106159c9e19d010ce3665641a95 |
| si-evidence-004 | claim-evidence.csv #4; si-pcr-004; SRC-ABCAEFF03FC610; EXP-SRC-ABCAEFF03FC610   | sha256:758fdc4800ee604bb1268018ab3c33f18d7833bae790705e10a13940ce1f2436 |
| si-evidence-010 | claim-evidence.csv #10; si-pcr-010; SRC-C4858D4EF280D8; EXP-SRC-C4858D4EF280D8  | sha256:60674568097b8a8cbf713019db09d69819e164136a872f1080f8a0e6fa9e3be7 |
| si-evidence-015 | claim-evidence.csv #15; si-pcr-015; SRC-0AE9913B1E4386; EXP-SRC-0AE9913B1E4386  | sha256:4112912916cd5688137d950661cbeb3279bc062154ec60ba6d148b4010ad81c2 |
| si-evidence-017 | claim-evidence.csv #17; si-pcr-017; SRC-4CFF40B66717D3; EXP-SRC-4CFF40B66717D3  | sha256:8efacaf59218536a3509c172ad2b321c1d23d5498c46bb0337b15b3022d03a03 |
| si-evidence-027 | claim-evidence.csv #27; si-pcr-027; SRC-1499B14EC3A5FA; EXP-SRC-1499B14EC3A5FA  | sha256:66b5fad7679776d2541f63cfe04d11b4822e54c5a941cd6c5e44a95a9681bad2 |
| si-evidence-028 | claim-evidence.csv #28; si-pcr-028; SRC-5F06443CBCE60C; EXP-SRC-5F06443CBCE60C  | sha256:dd7be8b51af4caf8289ff6e3821b2f875689391af75d439cbe56254f7df5057c |
| si-evidence-035 | claim-evidence.csv #35; si-pcr-035; SRC-DDCCCC33B75D1F; EXP-SRC-DDCCCC33B75D1F  | sha256:484b22b8c960639cd7db1d5e89b68627e6c02b0621fab595b3d0ba1dd5bfdd8f |
| si-evidence-036 | claim-evidence.csv #36; si-pcr-036; SRC-1D11B0192154B5; EXP-SRC-1D11B0192154B5  | sha256:80a6cfdf10077d8027c2107a6523b16f7b4764873d92430daa193c320d0118d9 |
| si-evidence-045 | claim-evidence.csv #45; si-pcr-045; SRC-C4858D4EF280D8; EXP-SRC-C4858D4EF280D8  | sha256:0793c9923f4e5e7b17f83574cde22fcde2aabf3bb4f0389a9cfd07f2e43fc091 |
| si-evidence-053 | claim-evidence.csv #53; si-pcr-045; SRC-0AE9913B1E4386; EXP-SRC-0AE9913B1E4386  | sha256:1428c2b7b384c8fc8fa9760fd36e0ab815e1c414182f8c6421202c6434d662a4 |
| si-evidence-054 | claim-evidence.csv #54; si-pcr-045; SRC-A1186C87F23AB9; EXP-SRC-A1186C87F23AB9  | sha256:17f1ce101ce8d8ed2ee005d07048cedceb02d267175b772cb822d42fdfb6e07c |
| si-evidence-055 | claim-evidence.csv #55; si-pcr-045; SRC-5F06443CBCE60C; EXP-SRC-5F06443CBCE60C  | sha256:4aa484579b7835ec633c90d24da61238d8b118dca03e325e65662d336b68c217 |
| si-evidence-056 | claim-evidence.csv #56; si-pcr-015; SRC-4CFF40B66717D3; EXP-SRC-4CFF40B66717D3  | sha256:fa4069eb92be9e268228d584af32be693c0ef33a3d39c525cf0e0992fdbf9d81 |
| si-evidence-057 | claim-evidence.csv #57; si-pcr-015; SRC-8ACF9B1CBCDFCC; EXP-SRC-8ACF9B1CBCDFCC  | sha256:d25a39e4dfdf7b431342efcda4c0264d2c07789e0b52a7b35faf3271d80846ac |
| si-evidence-062 | claim-evidence.csv #62; si-pcr-010; SRC-ABABC71FC66115; EXP-SRC-ABABC71FC66115  | sha256:17e328e2218a373d057b849ea02eacb7147bd759ef22fbef7bffc42c2044a4fc |
| si-evidence-102 | claim-evidence.csv #102; si-pcr-036; SRC-DDCCCC33B75D1F; EXP-SRC-DDCCCC33B75D1F | sha256:eca71dca777a47594ef9cdd50dd0f4ecaf811454154930ce0f5f2eb54f95643d |

## Packet mappings

| Upstream crosswalk ordinal | Packet claim / occurrence                        | Mapping basis                   | Selected records       |
| -------------------------- | ------------------------------------------------ | ------------------------------- | ---------------------- |
| 1                          | CLM-000648605EAF59 / OCC-PKT-STATE-001-0021-02   | source-expression relationships | si-pcr-015             |
| 2                          | CLM-0278A4BA705E26 / OCC-PKT-AUDIT-001-0036-03   | packet-level assertion mapping  | si-pcr-015; si-pcr-017 |
| 3                          | CLM-0491516CE955BD / OCC-PKT-AUDIT-001-0031-01   | source-expression relationships | si-pcr-004             |
| 5                          | CLM-04C1A78BF76ABF / OCC-PKT-DOSSIER-002-0044-02 | source-expression relationships | si-pcr-015; si-pcr-045 |
| 6                          | CLM-04F1BA96245B28 / OCC-PKT-AUDIT-001-0037-02   | source-expression relationships | si-pcr-015; si-pcr-045 |
| 9                          | CLM-0F4CA6CAD5CA8D / OCC-PKT-AUDIT-001-0037-01   | packet-level assertion mapping  | si-pcr-015; si-pcr-017 |
| 17                         | CLM-1CFC56BFE841D6 / OCC-PKT-DOSSIER-002-0036-01 | source-expression relationships | si-pcr-015; si-pcr-017 |
| 18                         | CLM-1EF9627F8EEFAB / OCC-PKT-AUDIT-001-0039-01   | source-expression relationships | si-pcr-028; si-pcr-045 |
| 19                         | CLM-2203D9EEFD96F8 / OCC-PKT-DOSSIER-001-0090-01 | source-expression relationships | si-pcr-036             |
| 32                         | CLM-516438628E13B3 / OCC-PKT-DOSSIER-002-0014-01 | source-expression relationships | si-pcr-010             |
| 36                         | CLM-5878B03B65EC06 / OCC-PKT-AUDIT-001-0043-02   | source-expression relationships | si-pcr-045             |
| 39                         | CLM-5B7D3A51C3AB5D / OCC-PKT-AUDIT-001-0036-04   | source-expression relationships | si-pcr-015; si-pcr-045 |
| 46                         | CLM-647F3FEB51206F / OCC-PKT-AUDIT-001-0035-01   | source-expression relationships | si-pcr-010; si-pcr-045 |
| 47                         | CLM-67328F127ED294 / OCC-PKT-AUDIT-001-0046-02   | source-expression relationships | si-pcr-035; si-pcr-036 |
| 51                         | CLM-6D3C12B1B80381 / OCC-PKT-DOSSIER-002-0014-02 | source-expression relationships | si-pcr-010; si-pcr-045 |
| 54                         | CLM-70500D03CB4A40 / OCC-PKT-DOSSIER-002-0069-01 | source-expression relationships | si-pcr-045             |
| 58                         | CLM-77403DE05B9400 / OCC-PKT-AUDIT-001-0067-01   | source-expression relationships | si-pcr-015; si-pcr-045 |
| 60                         | CLM-7D3D4497177F41 / OCC-PKT-DOSSIER-001-0054-01 | source-expression relationships | si-pcr-045             |
| 62                         | CLM-810EA2E5644F7B / OCC-PKT-AUDIT-001-0046-01   | source-expression relationships | si-pcr-036             |
| 63                         | CLM-84B0CBEA4ACE2F / OCC-PKT-AUDIT-001-0034-02   | source-expression relationships | si-pcr-010; si-pcr-045 |
| 64                         | CLM-8C8E75D850B0CD / OCC-PKT-DOSSIER-001-0014-01 | source-expression relationships | si-pcr-001; si-pcr-002 |
| 67                         | CLM-945A26EFB19D6B / OCC-PKT-AUDIT-001-0034-01   | packet-level assertion mapping  | si-pcr-010             |
| 70                         | CLM-9D4AAD82BD6A17 / OCC-PKT-DOSSIER-001-0069-01 | source-expression relationships | si-pcr-045             |
| 76                         | CLM-A99624F618E4D6 / OCC-PKT-STATE-001-0037-01   | source-expression relationships | si-pcr-015             |
| 77                         | CLM-AAAF566841D6FF / OCC-PKT-AUDIT-001-0030-01   | source-expression relationships | si-pcr-001; si-pcr-002 |
| 81                         | CLM-AF7D96EC1BE770 / OCC-PKT-DOSSIER-002-0044-01 | source-expression relationships | si-pcr-015; si-pcr-017 |
| 83                         | CLM-B29FA94B23766C / OCC-PKT-DOSSIER-002-0054-01 | source-expression relationships | si-pcr-010; si-pcr-045 |
| 87                         | CLM-BD480AC043B553 / OCC-PKT-DOSSIER-001-0062-01 | source-expression relationships | si-pcr-045             |
| 89                         | CLM-CCB42656A07662 / OCC-PKT-DOSSIER-002-0024-01 | source-expression relationships | si-pcr-010             |
| 91                         | CLM-D07AFEB2ADC4C7 / OCC-PKT-AUDIT-001-0067-03   | source-expression relationships | si-pcr-010; si-pcr-045 |
| 93                         | CLM-D4BBDA983192E9 / OCC-PKT-DOSSIER-001-0021-01 | source-expression relationships | si-pcr-004             |
| 94                         | CLM-D678F56C12432D / OCC-PKT-DOSSIER-002-0060-01 | source-expression relationships | si-pcr-028; si-pcr-045 |
| 95                         | CLM-D6ABB7CC34B13E / OCC-PKT-DOSSIER-002-0052-01 | source-expression relationships | si-pcr-027             |
| 97                         | CLM-D75F6AD71CFB76 / OCC-PKT-DOSSIER-002-0077-01 | source-expression relationships | si-pcr-045             |
| 98                         | CLM-D86CD3CF190616 / OCC-PKT-DOSSIER-002-0036-02 | source-expression relationships | si-pcr-015; si-pcr-045 |
| 99                         | CLM-DCABF9CB405B2C / OCC-PKT-AUDIT-001-0067-04   | source-expression relationships | si-pcr-028; si-pcr-045 |
| 102                        | CLM-EB7196D32BAF71 / OCC-PKT-DOSSIER-002-0046-01 | source-expression relationships | si-pcr-045             |
| 104                        | CLM-F29CFFB4EF8EB9 / OCC-PKT-AUDIT-001-0067-02   | source-expression relationships | si-pcr-045             |
| 106                        | CLM-FCB2B5CB5D5CB3 / OCC-PKT-AUDIT-001-0038-01   | source-expression relationships | si-pcr-027             |
| 107                        | CLM-FD236DEB4271B8 / OCC-PKT-DOSSIER-002-0024-02 | source-expression relationships | si-pcr-010; si-pcr-045 |
| 108                        | CLM-FF1E5169CB7328 / OCC-PKT-AUDIT-001-0042-03   | source-expression relationships | si-pcr-045             |

The JSON preserves all three original mapping lists, original source IDs and treatment text. No source ID is silently collapsed into another expression or work. Unmapped selected propositions remain visible in the collection; a source-grouped mapping is not invented for them.
