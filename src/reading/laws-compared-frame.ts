import type { LawsComparedFrame } from '../domain/law-comparison';
import {
  lawsComparedId,
  lawsComparedQuestion,
  lawsComparedTitle,
} from './laws-compared-page';

// The identity, columns and standing records of "Laws compared", which
// shared code reads (src/release/collections.ts). Its reader text is in
// ./laws-compared.ts.
export const lawsComparedFrame: LawsComparedFrame = {
  id: lawsComparedId,
  version: 2,
  title: lawsComparedTitle,
  question: lawsComparedQuestion,
  editorialStatus: 'machine-proposed',
  // By jurisdiction, then date; the revoked and rescission-announced texts
  // last (maintainer decision 4a). Never by any count.
  columns: [
    {
      id: 'eu-ai-act',
      family: 'eu-ai-act',
      texts: ['eu-ai-act-2024'],
      standingClaimIds: ['aia-enacted'],
    },
    {
      id: 'eu-code-ss',
      family: 'eu-gpai-code-of-practice',
      texts: ['gpai-code-of-practice-2025'],
      standingClaimIds: [
        'aia-art55-code-reliance',
        'prov-eu-code-ss-adherence-not-conclusive',
        'omni-art56-adequacy-assessment',
      ],
    },
    {
      id: 'ca-sb53',
      family: 'ca-sb-53',
      texts: ['california-sb-53'],
      standingClaimIds: ['sb-enactment-2025-09-29'],
    },
    {
      id: 'ny-raise-act',
      family: 'ny-raise-act',
      texts: [
        'ny-raise-act-chapter-699-2025',
        'new-york-raise-act-chapter-96-2026',
      ],
      standingClaimIds: [
        'fl-us-ny-s6953b-signed-chapter-699',
        'ny-chapter96-signed',
        'ny-ch96-effective-date',
      ],
    },
    {
      id: 'il-aisma',
      family: 'il-public-act-104-0538',
      texts: ['il-ai-safety-measures-act'],
      standingClaimIds: ['fl-us-il-ai-safety-measures-act-signed-stated'],
    },
    {
      id: 'cn-genai-measures',
      family: 'cn-generative-ai-interim-measures',
      texts: ['cn-generative-ai-interim-measures-2023'],
      standingClaimIds: ['cn-genai-measures-issued'],
    },
    {
      id: 'cn-labelling-measures',
      family: 'cn-ai-content-labelling-measures',
      texts: ['cn-ai-content-labelling-measures-2025'],
      standingClaimIds: ['fl-cn-labelling-issued'],
    },
    {
      id: 'us-eo14110',
      family: 'us-eo-14110',
      texts: ['us-eo-14110-2023'],
      standingClaimIds: ['fl-us-eo14110-revoked'],
    },
    {
      id: 'us-bis-ifr',
      family: 'us-bis-ai-diffusion-rule',
      texts: ['us-bis-ai-diffusion-ifr-2025'],
      standingClaimIds: [
        'fl-us-bis-ai-diffusion-ifr-published',
        'fl-us-bis-ai-diffusion-rescission-announced',
      ],
    },
  ],
  // New York Chapter 699, Q11: the effect rule admitted on 2026-11-04 with
  // its computed date (decision 9a), cited instead of a second record.
  cited: [
    {
      textId: 'ny-raise-act-chapter-699-2025',
      facetId: 'L.Q11',
      claimId: 'lc-ny-ch699-effect-computed',
      status: 'stated',
    },
  ],
};
