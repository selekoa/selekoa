import type { Dataset } from './schema';
import { researchPaths } from './research-path';
import { documentHistories } from '../reading/frontier-safety-frameworks';
import { controlStructures } from '../reading/control-structures';
import { commitmentCollections } from '../reading/commitments';
import { questionStarters } from '../reading/self-governance';
import { propositionCollections } from '../reading/human-thought';

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
  | { kind: 'control'; id: string; inspect?: string }
  | { kind: 'commitments'; id: string; inspect?: string }
  | { kind: 'propositions'; id: string; inspect?: string }
  | { kind: 'claim'; id: string }
  | { kind: 'dossier'; id: string; inspect?: string }
  | { kind: 'person'; id: string; inspect?: string }
  | { kind: 'document'; id: string; inspect?: string }
  | ({ kind: 'question' } & QuestionTarget)
  /** The earlier address of a question page; still resolves. */
  | ({ kind: 'reading' } & QuestionTarget);

export function referenceHash(target: ReferenceTarget) {
  if (target.kind === 'about') return '#/about';
  if (target.kind === 'hub') return `#/${target.id}`;
  const params = new URLSearchParams();
  if (target.kind === 'explore') {
    if (target.q) params.set('q', target.q);
    if (target.view) params.set('view', target.view);
    return `#/explore${params.size ? '?' + params : ''}`;
  }
  if (target.kind === 'search') {
    if (target.q) params.set('q', target.q);
    if (target.mode) params.set('mode', target.mode);
    if (target.inspect) params.set('inspect', target.inspect);
    return `#/search${params.size ? '?' + params : ''}`;
  }
  if (target.kind === 'reading' || target.kind === 'question') {
    if (target.section) params.set('section', target.section);
    if (target.claim) params.set('claim', target.claim);
  }
  if (target.kind !== 'claim' && target.inspect)
    params.set('inspect', target.inspect);
  return `#/${target.kind}/${encodeURIComponent(target.id)}${params.size ? '?' + params : ''}`;
}

export function resolveReference(
  hash: string,
  data: Dataset,
): {
  target: ReferenceTarget | null;
  notice: string | null;
} {
  // An empty address is the reading-first start page.
  if (!hash || hash === '#/') return { target: null, notice: null };
  if (hash === '#explorer')
    return { target: { kind: 'explore' }, notice: null };
  const hub = /^#\/(governance|ideas|institutions)$/.exec(hash);
  if (hub)
    return { target: { kind: 'hub', id: hub[1] as HubId }, notice: null };
  const explore = /^#\/explore(?:\?(.*))?$/.exec(hash);
  if (explore) {
    const params = new URLSearchParams(explore[1]);
    const q = params.get('q') ?? undefined;
    const view = params.get('view') ?? undefined;
    if (
      [...params.keys()].some(
        (key) =>
          !['q', 'view'].includes(key) || params.getAll(key).length !== 1,
      ) ||
      (view !== undefined && view !== 'timeline' && view !== 'map')
    )
      return {
        target: null,
        notice:
          'This link does not match any record in this dataset. Selekoa has not substituted another record.',
      };
    return { target: { kind: 'explore', q, view }, notice: null };
  }
  if (hash === '#/about') return { target: { kind: 'about' }, notice: null };
  const invalid = {
    target: null,
    notice:
      'This link does not match any record in this dataset. Selekoa has not substituted another record.',
  };
  const search = /^#\/search(?:\?(.*))?$/.exec(hash);
  if (search) {
    const params = new URLSearchParams(search[1]);
    const q = params.get('q') ?? undefined;
    const mode = params.get('mode') ?? undefined;
    const inspect = params.get('inspect') ?? undefined;
    if (
      [...params.keys()].some(
        (key) =>
          !['q', 'mode', 'inspect'].includes(key) ||
          params.getAll(key).length !== 1,
      ) ||
      (mode !== undefined && mode !== 'names') ||
      (inspect !== undefined && !data.claims.some((c) => c.id === inspect))
    )
      return invalid;
    return {
      target: { kind: 'search', q, mode, inspect },
      notice: null,
    };
  }
  const match =
    /^#\/(claim|dossier|reading|question|documents|document|person|control|commitments|propositions)\/([^/?]+)(?:\?(.*))?$/.exec(
      hash,
    );
  if (!match) return invalid;
  let id: string;
  try {
    id = decodeURIComponent(match[2]);
  } catch {
    return invalid;
  }
  const kind = match[1];
  const params = new URLSearchParams(match[3]);
  const allowed =
    kind === 'reading' || kind === 'question'
      ? ['section', 'claim', 'inspect']
      : kind === 'claim'
        ? []
        : ['inspect'];
  if (
    [...params.keys()].some(
      (key) =>
        !allowed.includes(key) ||
        params.getAll(key).length !== 1 ||
        !params.get(key),
    )
  )
    return invalid;
  const hasClaim = (value: string) => data.claims.some((c) => c.id === value);
  if (kind === 'claim') {
    if (!hasClaim(id)) return invalid;
    const successors = data.claims.filter((c) => c.supersedes === id);
    return {
      target: { kind, id },
      notice: successors.length
        ? 'A newer claim replaces this one. The original record is kept, and the Evidence Inspector links to its replacement.'
        : null,
    };
  }
  const inspect = params.get('inspect') ?? undefined;
  if (inspect && !hasClaim(inspect)) return invalid;
  if (kind === 'documents')
    return documentHistories.some((d) => d.id === id)
      ? { target: { kind, id, inspect }, notice: null }
      : invalid;
  if (kind === 'control')
    return controlStructures.some((d) => d.id === id)
      ? { target: { kind, id, inspect }, notice: null }
      : invalid;
  if (kind === 'commitments')
    return commitmentCollections.some((d) => d.id === id)
      ? { target: { kind, id, inspect }, notice: null }
      : invalid;
  if (kind === 'propositions')
    return propositionCollections.some((d) => d.id === id)
      ? { target: { kind, id, inspect }, notice: null }
      : invalid;
  const entityOf = (type: string) =>
    data.entities.some((e) => e.id === id && e.type === type);
  if (kind === 'dossier')
    return entityOf('organisation')
      ? { target: { kind, id, inspect }, notice: null }
      : invalid;
  if (kind === 'person' || kind === 'document')
    return entityOf(kind)
      ? { target: { kind, id, inspect }, notice: null }
      : invalid;
  const section = params.get('section') ?? undefined;
  const claim = params.get('claim') ?? undefined;
  // A question starter has sections but no reading position.
  const starter = questionStarters.find((s) => s.id === id);
  if (starter)
    return claim || (section && !starter.sections.some((s) => s.id === section))
      ? invalid
      : {
          target: { kind: 'question', id, section, inspect },
          notice: null,
        };
  const selection = researchPaths.find((s) => s.id === id);
  if (!selection) return invalid;
  if (section && !selection.sections.some((s) => s.id === section))
    return invalid;
  if (
    claim &&
    !selection.items.some(
      (i) => i.claimId === claim && (!section || i.sectionId === section),
    )
  )
    return invalid;
  return {
    target: {
      kind: kind === 'reading' ? 'reading' : 'question',
      id,
      section,
      claim,
      inspect,
    },
    notice: null,
  };
}
