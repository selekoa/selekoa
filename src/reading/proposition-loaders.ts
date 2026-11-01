/**
 * Each propositions collection, whole, loaded by its ID: only the page that
 * shows a collection loads its text (src/ui/proposition-text.ts). The build
 * names the same files (`propositionModules` in src/ui/page-files.ts).
 */
import type { PropositionsCollection } from '../domain/propositions';

export const propositionLoaders: Record<
  string,
  () => Promise<PropositionsCollection>
> = {
  superintelligence: () =>
    import('./superintelligence').then((m) => m.superintelligencePropositions),
  'risk-debate': () => import('./risk-debate').then((m) => m.riskDebate),
  'yudkowsky-arguments': () =>
    import('./yudkowsky-arguments').then((m) => m.yudkowskyArguments),
  'economics-of-machine-intelligence': () =>
    import('./economics').then((m) => m.economicsOfMachineIntelligence),
  'orbital-compute-arguments': () =>
    import('./orbital-compute').then((m) => m.orbitalCompute),
  'ai-bio-arguments': () =>
    import('./ai-bio-arguments').then((m) => m.aiBioArguments),
  'ai-in-science': () => import('./ai-in-science').then((m) => m.aiInScience),
};
