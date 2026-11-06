import { superintelligencePropositions } from './superintelligence';
import { economicsOfMachineIntelligence } from './economics';
import { yudkowskyArguments } from './yudkowsky-arguments';
import { orbitalCompute } from './orbital-compute';
import { aiBioArguments } from './ai-bio-arguments';
import { aiInScience } from './ai-in-science';
import { riskDebate } from './risk-debate';
import { machineSuccession } from './machine-succession';
import { antecedentTexts } from './antecedent-texts';

export { superintelligencePropositions };

/**
 * Propositions collections, whole, as releases, starters and the build read
 * them. The browser's shared code reads their frames
 * (src/reading/proposition-frames.ts); a collection's page loads it whole
 * (src/reading/proposition-loaders.ts).
 */
export const propositionCollections = [
  antecedentTexts,
  superintelligencePropositions,
  riskDebate,
  yudkowskyArguments,
  machineSuccession,
  economicsOfMachineIntelligence,
  orbitalCompute,
  aiBioArguments,
  aiInScience,
];
