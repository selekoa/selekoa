/**
 * The page code an address opens with, by its first path segment: the
 * components of src/ui/page-modules.tsx, each in src/ui/<name>.tsx. Plain
 * data, so that the build can name the files a built page loads.
 */
export const pageCode: Record<string, string[]> = {
  about: ['About'],
  search: ['Search'],
  dossier: ['Dossier'],
  person: ['PersonPage'],
  document: ['DocumentPage'],
  documents: ['DocumentHistory'],
  compare: ['FrameworkComparison'],
  control: ['ControlStructure'],
  commitments: ['Commitments'],
  guide: ['FrameworksLaw', 'FrameworkChanges'],
  propositions: ['Propositions'],
  stances: ['PropositionStances'],
  year: ['Chronicle'],
  years: ['Chronicle'],
  // A question is a guided reading or a question starter.
  question: ['QuestionStarter', 'ResearchPath'],
  reading: ['QuestionStarter', 'ResearchPath'],
};

/**
 * Page code for one address, where it differs from its first segment's: a
 * guided reading that loads only its own component.
 */
export const pageCodeById: Record<string, string[]> = {
  'guide/ai-compute-2023-2026': ['ComputeBuildout'],
  'control/side-by-side': ['ControlTimelines'],
};

/** The page code of a path, by name. */
export function pageCodeOf(path: string) {
  const [, first = '', id = ''] = path.split(/[/?#]/);
  return pageCodeById[`${first}/${id}`] ?? pageCode[first] ?? [];
}

/**
 * The module of each propositions collection, whole, by ID: a propositions
 * page loads its own with its code (src/ui/proposition-text.ts), and no other
 * page loads it. The same modules as `propositionLoaders`
 * (src/reading/proposition-loaders.ts).
 */
export const propositionModules: Record<string, string> = {
  superintelligence: 'src/reading/superintelligence.ts',
  'risk-debate': 'src/reading/risk-debate.ts',
  'yudkowsky-arguments': 'src/reading/yudkowsky-arguments.ts',
  'machine-succession': 'src/reading/machine-succession.ts',
  'economics-of-machine-intelligence': 'src/reading/economics.ts',
  'orbital-compute-arguments': 'src/reading/orbital-compute.ts',
  'ai-bio-arguments': 'src/reading/ai-bio-arguments.ts',
  'ai-in-science': 'src/reading/ai-in-science.ts',
};

/** The ID of the propositions collection a path names, if any. */
export function propositionsOf(path: string): string | null {
  const [, kind, id] = path.split(/[?#]/)[0].split('/');
  return kind === 'propositions' && id ? decodeURIComponent(id) : null;
}

/**
 * The modules a path opens with besides its page code, as the build's
 * manifest names them: a propositions page's collection.
 */
export const readingModulesOf = (path: string) => {
  const id = propositionsOf(path);
  return id && Object.hasOwn(propositionModules, id)
    ? [propositionModules[id]]
    : [];
};
