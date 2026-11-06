/**
 * What each type of page downloads before it answers input, from the client
 * build's manifest (`dist/.vite/manifest.json`), and the limit for each. A
 * page loads the entry with its static imports and stylesheets, then the
 * modules it imports on opening (the workspace and the page's own code,
 * src/ui/page-modules.tsx) with theirs, and the data files it fetches.
 * Sizes are gzip at level 9: deterministic, unlike the host's compression.
 * See docs/data-loading-design-c.md ("Stages and their gates").
 */
import { slicePath } from '../domain/slices';

export type ManifestChunk = {
  file: string;
  imports?: string[];
  css?: string[];
};
export type Manifest = Record<string, ManifestChunk>;

export type PageType = {
  name: string;
  /** A page of this type, measured as the example. */
  path: string;
  /** Manifest keys of the modules the page loads before it answers input. */
  modules: string[];
  /** Files under dist/ the page fetches before it answers input. */
  data?: string[];
  /** The most it may load, in KB of gzip-9 (1 KB = 1,000 bytes). */
  limitKb: number;
};

const workspace = ['index.html', 'src/Workspace.tsx'];
/**
 * What a page drawn from its slice loads besides its slice: the code that
 * gives it the collection index entries its slice carries, and the relation
 * core when its slice says it needs it (`pageWeights`).
 */
const core = ['src/domain/collection-index.ts'];
/** A page's slice file under dist/. */
const slice = (path: string) => slicePath(path)!.slice(1);

/**
 * Limits about 10% above the sizes measured when they were set (the records
 * grow with each admission); a stage that makes a page lighter lowers its
 * limit. Raising one is a commit of its own. Set at stage c4
 * (review/data-loading-c4-2026-10-31.md), where the projection after the
 * pending packs is recorded; the start page and search kept their limits.
 */
export const pageTypes: PageType[] = [
  { name: 'Start page', path: '/', modules: ['index.html'], limitKb: 115 },
  {
    name: 'Hub',
    path: '/governance',
    modules: [...workspace, ...core],
    data: [slice('/governance')],
    limitKb: 295,
  },
  {
    name: 'About & method',
    path: '/about',
    modules: [...workspace, ...core, 'src/ui/About.tsx'],
    data: [slice('/about')],
    limitKb: 330,
  },
  {
    name: 'Search',
    path: '/search',
    modules: [
      ...workspace,
      'src/ui/Search.tsx',
      'virtual:search-index',
      'src/domain/search-index.ts',
    ],
    limitKb: 275,
  },
  {
    name: 'Explorer',
    path: '/explore',
    modules: [...workspace, ...core],
    data: [slice('/explore')],
    limitKb: 330,
  },
  {
    name: 'Dossier',
    path: '/dossier/openai',
    modules: [...workspace, ...core, 'src/ui/Dossier.tsx'],
    data: [slice('/dossier/openai')],
    limitKb: 360,
  },
  {
    name: 'Person',
    path: '/person/jan-leike',
    modules: [...workspace, ...core, 'src/ui/PersonPage.tsx'],
    data: [slice('/person/jan-leike')],
    limitKb: 295,
  },
  {
    name: 'Document',
    path: '/document/rsp-v2-0',
    modules: [...workspace, ...core, 'src/ui/DocumentPage.tsx'],
    data: [slice('/document/rsp-v2-0')],
    limitKb: 310,
  },
  {
    name: 'Claim',
    path: '/claim/dario-anthropic-2021',
    modules: [...workspace, ...core],
    data: [slice('/claim/dario-anthropic-2021')],
    limitKb: 325,
  },
  {
    name: 'Collection',
    path: '/documents/frontier-safety-frameworks',
    modules: [...workspace, ...core, 'src/ui/DocumentHistory.tsx'],
    data: [slice('/documents/frontier-safety-frameworks')],
    limitKb: 370,
  },
  // The largest collection pages (stage c4): their slices hold most of
  // their collection's records.
  {
    name: 'Comparison',
    path: '/compare/frontier-safety-frameworks',
    modules: [...workspace, ...core, 'src/ui/FrameworkComparison.tsx'],
    data: [slice('/compare/frontier-safety-frameworks')],
    limitKb: 520,
  },
  // Set at release 0.29.0 (review/model-cards-page-2026-11-04.md), about 10%
  // above its first measured weight.
  {
    name: 'Model cards',
    path: '/compare/model-cards',
    modules: [...workspace, ...core, 'src/ui/ModelCards.tsx'],
    data: [slice('/compare/model-cards')],
    limitKb: 330,
  },
  // Set at release 0.30.0 (review/laws-compared-admission-2-2026-11-05.md),
  // about 10% above its first measured weight.
  {
    name: 'Laws compared',
    path: '/compare/laws-compared',
    modules: [...workspace, ...core, 'src/ui/LawsCompared.tsx'],
    data: [slice('/compare/laws-compared')],
    limitKb: 320,
  },
  // Set at release 0.31.0 (review/predictions-admission-2026-11-05.md),
  // about 10% above its first measured weight.
  {
    name: 'Predictions',
    path: '/predictions/predictions-on-record',
    modules: [...workspace, ...core, 'src/ui/Predictions.tsx'],
    data: [slice('/predictions/predictions-on-record')],
    limitKb: 275,
  },
  {
    name: 'Guide',
    path: '/guide/frontier-frameworks-and-law',
    modules: [
      ...workspace,
      ...core,
      'src/ui/FrameworksLaw.tsx',
      'src/ui/FrameworkChanges.tsx',
    ],
    data: [slice('/guide/frontier-frameworks-and-law')],
    limitKb: 630,
  },
  {
    name: 'Compute guide',
    path: '/guide/ai-compute-2023-2026',
    modules: [...workspace, ...core, 'src/ui/ComputeBuildout.tsx'],
    data: [slice('/guide/ai-compute-2023-2026')],
    limitKb: 340,
  },
  {
    name: 'Propositions',
    path: '/propositions/economics-of-machine-intelligence',
    modules: [
      ...workspace,
      ...core,
      'src/ui/Propositions.tsx',
      // The collection shown, whole (src/ui/proposition-text.ts).
      'src/reading/economics.ts',
    ],
    data: [slice('/propositions/economics-of-machine-intelligence')],
    limitKb: 455,
  },
  // Control timelines side by side (review/control-timelines-2026-11-01.md):
  // four organisations' control records on one axis.
  {
    name: 'Control timelines',
    path: '/control/side-by-side',
    modules: [...workspace, ...core, 'src/ui/ControlTimelines.tsx'],
    data: [slice('/control/side-by-side')],
    limitKb: 285,
  },
  // Propositions by author (review/propositions-by-thinker-2026-11-01.md):
  // its largest collection page, and the index of the collections.
  {
    name: 'By author',
    path: '/stances/economics-of-machine-intelligence',
    modules: [...workspace, ...core, 'src/ui/PropositionStances.tsx'],
    data: [slice('/stances/economics-of-machine-intelligence')],
    limitKb: 310,
  },
  {
    name: 'By author index',
    path: '/stances',
    modules: [...workspace, ...core, 'src/ui/PropositionStances.tsx'],
    data: [slice('/stances')],
    limitKb: 250,
  },
  // The chronicle (review/chronicle-by-year-2026-10-31.md): its largest
  // year page, and the index of the years.
  {
    name: 'Year',
    path: '/year/2025',
    modules: [...workspace, ...core, 'src/ui/Chronicle.tsx'],
    data: [slice('/year/2025')],
    limitKb: 400,
  },
  {
    name: 'Years index',
    path: '/years',
    modules: [...workspace, ...core, 'src/ui/Chronicle.tsx'],
    data: [slice('/years')],
    limitKb: 305,
  },
];

/** Every file a set of manifest entries loads: their files, imports and styles. */
export function filesLoaded(manifest: Manifest, keys: readonly string[]) {
  const files = new Set<string>();
  const seen = new Set<string>();
  const visit = (key: string) => {
    if (seen.has(key)) return;
    seen.add(key);
    const chunk = manifest[key];
    if (!chunk) throw new Error(`The manifest has no entry ${key}`);
    files.add(chunk.file);
    for (const css of chunk.css ?? []) files.add(css);
    for (const imported of chunk.imports ?? []) visit(imported);
  };
  for (const key of keys) visit(key);
  return [...files].sort();
}

export type PageWeight = {
  type: PageType;
  files: string[];
  /** Gzip-9 bytes in all. */
  bytes: number;
  over: boolean;
};

/** Each page type's files and their size, against its limit. */
export function pageWeights(
  manifest: Manifest,
  gzipSize: (file: string) => number,
  types: readonly PageType[] = pageTypes,
  /**
   * Whether a data file is a slice that needs the whole relation core as
   * well (`PlacedSlice.core`): the page then loads the core module too.
   */
  needsCore: (file: string) => boolean = () => false,
): PageWeight[] {
  return types.map((type) => {
    const withCore = (type.data ?? []).some(needsCore);
    const files = [
      ...filesLoaded(manifest, [
        ...type.modules,
        ...(withCore ? ['virtual:records-core'] : []),
      ]),
      ...(type.data ?? []),
    ];
    const bytes = files.reduce((sum, file) => sum + gzipSize(file), 0);
    return { type, files, bytes, over: bytes > type.limitKb * 1000 };
  });
}
