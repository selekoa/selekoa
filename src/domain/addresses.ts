/**
 * Page addresses: real paths from the site root, such as `/person/<id>`, with
 * an optional query for the inspected claim. Search and explore terms go in
 * the fragment (`/search#q=…`), so they stay in the browser and never reach
 * the host's logs; the earlier `?q=` form still resolves. This module imports
 * nothing, so the start page can build real links before the records load.
 * The URL scheme is described in docs/architecture.md ("Addresses").
 */

type QuestionTarget = {
  id: string;
  section?: string;
  claim?: string;
  inspect?: string;
};

export const hubIds = ['governance', 'ideas', 'institutions'] as const;
export type HubId = (typeof hubIds)[number];

export type ReferenceTarget =
  | { kind: 'explore'; q?: string; view?: 'timeline' | 'map' }
  | { kind: 'hub'; id: HubId }
  | { kind: 'about' }
  | { kind: 'search'; q?: string; mode?: 'names'; inspect?: string }
  | { kind: 'documents'; id: string; inspect?: string }
  /** The framework comparison, optionally at one question (facet). */
  | { kind: 'compare'; id: string; facet?: string; inspect?: string }
  | { kind: 'control'; id: string; inspect?: string }
  | { kind: 'commitments'; id: string; inspect?: string }
  | { kind: 'propositions'; id: string; inspect?: string }
  | { kind: 'claim'; id: string }
  /** An organisation's dossier, or with `view: 'map'` its direct connections. */
  | { kind: 'dossier'; id: string; view?: 'map'; inspect?: string }
  | { kind: 'person'; id: string; inspect?: string }
  | { kind: 'document'; id: string; inspect?: string }
  | ({ kind: 'question' } & QuestionTarget)
  /** The earlier address of a question page; still resolves. */
  | ({ kind: 'reading' } & QuestionTarget);

export function referencePath(target: ReferenceTarget) {
  if (target.kind === 'about') return '/about';
  if (target.kind === 'hub') return `/${target.id}`;
  const params = new URLSearchParams();
  if (target.kind === 'explore') {
    if (target.q) params.set('q', target.q);
    if (target.view) params.set('view', target.view);
    return `/explore${params.size ? '#' + params : ''}`;
  }
  if (target.kind === 'search') {
    if (target.q) params.set('q', target.q);
    if (target.mode) params.set('mode', target.mode);
    if (target.inspect) params.set('inspect', target.inspect);
    return `/search${params.size ? '#' + params : ''}`;
  }
  if (target.kind === 'reading' || target.kind === 'question') {
    if (target.section) params.set('section', target.section);
    if (target.claim) params.set('claim', target.claim);
  }
  if (target.kind === 'compare' && target.facet)
    params.set('facet', target.facet);
  if (target.kind === 'dossier' && target.view) params.set('view', target.view);
  if (target.kind !== 'claim' && target.inspect)
    params.set('inspect', target.inspect);
  // The earlier `reading` address is kept only as a redirect.
  const kind = target.kind === 'reading' ? 'question' : target.kind;
  return `/${kind}/${encodeURIComponent(target.id)}${params.size ? '?' + params : ''}`;
}

/** The start page's address. */
export const startPath = '/';

/**
 * The path of an earlier hash address (`#/person/x?inspect=y`, `#explorer`),
 * or null for an ordinary fragment such as `#about-method`. The path is not
 * checked here: an address that names no record still shows the notice.
 */
export function legacyHashPath(hash: string): string | null {
  if (hash === '#explorer') return '/explore';
  if (hash === '#' || hash === '#/') return '/';
  if (!hash.startsWith('#/')) return null;
  return hash.slice(1).replace(/^\/reading\//, '/question/');
}

/**
 * Normalises a path as a host may deliver it: `/index.html` and a trailing
 * slash name the same page as the path without them.
 */
export function normalisePath(pathname: string): string {
  const path = pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  return path.length > 1 ? path.replace(/\/+$/, '') : '/';
}

/**
 * The address with search terms moved from the fragment to the query
 * (`/search#q=x` → `/search?q=x`), the form the resolver reads. Other
 * addresses are returned unchanged.
 */
export function queryForm(address: string): string {
  return address.replace(
    /^(\/(?:search|explore)(?:\.html)?\/?)#(?=[^/])/,
    '$1?',
  );
}
