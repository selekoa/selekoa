import { use, type ComponentType } from 'react';

/**
 * Page code that loads the first time its page opens, like React.lazy, with
 * one difference: a component whose code has already loaded renders at once
 * instead of suspending. The browser loads the code of the page it opens
 * before taking over the built HTML (`preloadPage`), so the whole page is
 * taken over in one pass. A page still waiting for its code when anything
 * above it changes would be drawn afresh, with a loading notice in between.
 */
type Tracked<T> = Promise<T> & {
  status?: 'pending' | 'fulfilled' | 'rejected';
  value?: T;
  reason?: unknown;
};

function track<T>(promise: Promise<T>): Tracked<T> {
  const tracked = promise as Tracked<T>;
  tracked.status = 'pending';
  tracked.then(
    (value) => {
      tracked.status = 'fulfilled';
      tracked.value = value;
    },
    (reason: unknown) => {
      tracked.status = 'rejected';
      tracked.reason = reason;
    },
  );
  return tracked;
}

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
  Commitments: loadable(() =>
    import('./Commitments').then((m) => m.Commitments),
  ),
  Propositions: loadable(() =>
    import('./Propositions').then((m) => m.Propositions),
  ),
  QuestionStarter: loadable(() =>
    import('./QuestionStarter').then((m) => m.QuestionStarter),
  ),
  About: loadable(() => import('./About').then((m) => m.About)),
  Search: loadable(() => import('./Search').then((m) => m.Search)),
};

/** The page code an address opens with, by its first path segment. */
const byPrefix: Record<string, (keyof typeof pages)[]> = {
  about: ['About'],
  search: ['Search'],
  dossier: ['Dossier'],
  person: ['PersonPage'],
  document: ['DocumentPage'],
  documents: ['DocumentHistory'],
  compare: ['FrameworkComparison'],
  control: ['ControlStructure'],
  commitments: ['Commitments'],
  propositions: ['Propositions'],
  // A question is a guided reading or a question starter.
  question: ['QuestionStarter', 'ResearchPath'],
  reading: ['QuestionStarter', 'ResearchPath'],
};

/** Loads the code of the page at a path; resolves when it has loaded. */
export function preloadPage(path: string) {
  const prefix = path.split(/[/?]/)[1] ?? '';
  return Promise.all((byPrefix[prefix] ?? []).map((n) => pages[n].preload()));
}
