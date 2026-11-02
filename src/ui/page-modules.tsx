import { use, type ComponentType } from 'react';
import { track, type Tracked } from './tracked';
import { pageCodeOf, propositionsOf } from './page-files';

/**
 * Page code that loads the first time its page opens, like React.lazy, with
 * one difference: a component whose code has already loaded renders at once
 * instead of suspending. The browser loads the code of the page it opens
 * before taking over the built HTML (`preloadPage`), so the whole page is
 * taken over in one pass. A page still waiting for its code when anything
 * above it changes would be drawn afresh, with a loading notice in between.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loadable<P extends Record<string, any>>(
  load: () => Promise<ComponentType<P>>,
) {
  let promise: Tracked<ComponentType<P>> | undefined;
  const preload = () => (promise ??= track(load()));
  function Loadable(props: P) {
    // `use` returns a loaded module's value at once, and suspends otherwise.
    const Component = use(preload() as Promise<ComponentType<P>>);
    return <Component {...props} />;
  }
  return Object.assign(Loadable, { preload });
}

export const pages = {
  Network: loadable(() => import('./Network').then((m) => m.Network)),
  Dossier: loadable(() => import('./Dossier').then((m) => m.Dossier)),
  ResearchPath: loadable(() =>
    import('./ResearchPath').then((m) => m.ResearchPath),
  ),
  PersonPage: loadable(() => import('./PersonPage').then((m) => m.PersonPage)),
  DocumentPage: loadable(() =>
    import('./DocumentPage').then((m) => m.DocumentPage),
  ),
  DocumentHistory: loadable(() =>
    import('./DocumentHistory').then((m) => m.DocumentHistory),
  ),
  FrameworkComparison: loadable(() =>
    import('./FrameworkComparison').then((m) => m.FrameworkComparison),
  ),
  ControlStructure: loadable(() =>
    import('./ControlStructure').then((m) => m.ControlStructure),
  ),
  PropositionStances: loadable(() =>
    import('./PropositionStances').then((m) => m.PropositionStances),
  ),
  ControlTimelines: loadable(() =>
    import('./ControlTimelines').then((m) => m.ControlTimelines),
  ),
  Commitments: loadable(() =>
    import('./Commitments').then((m) => m.Commitments),
  ),
  FrameworksLaw: loadable(() =>
    import('./FrameworksLaw').then((m) => m.FrameworksLaw),
  ),
  FrameworkChanges: loadable(() =>
    import('./FrameworkChanges').then((m) => m.FrameworkChanges),
  ),
  ComputeBuildout: loadable(() =>
    import('./ComputeBuildout').then((m) => m.ComputeBuildout),
  ),
  Propositions: loadable(() =>
    import('./Propositions').then((m) => m.Propositions),
  ),
  QuestionStarter: loadable(() =>
    import('./QuestionStarter').then((m) => m.QuestionStarter),
  ),
  Chronicle: loadable(() => import('./Chronicle').then((m) => m.Chronicle)),
  About: loadable(() => import('./About').then((m) => m.About)),
  Search: loadable(() => import('./Search').then((m) => m.Search)),
};

/**
 * Loads the code of the page at a path, and the reading text it shows (a
 * propositions page's collection, whole); resolves when they have loaded.
 */
export function preloadPage(path: string) {
  const propositions = propositionsOf(path);
  return Promise.all([
    ...pageCodeOf(path).map((n) => pages[n as keyof typeof pages].preload()),
    // Loaded with the page's code, not with every page's.
    ...(propositions
      ? [
          import('./proposition-text').then((m) =>
            m.wholePropositions(propositions),
          ),
        ]
      : []),
  ]);
}
