import type { Dataset } from './schema';
import { researchPaths } from './research-path';
import { documentHistories } from '../reading/frontier-safety-frameworks';
import { frameworkComparison } from '../reading/framework-comparison';
import { facetById } from './framework-comparison';
import { controlStructures } from '../reading/control-structures';
import { commitmentCollections } from '../reading/commitments';
import { questionStarters } from '../reading/self-governance';
import { propositionCollections } from '../reading/human-thought';
import {
  normalisePath,
  type HubId,
  type ReferenceTarget,
  queryForm,
} from './addresses';

export {
  hubIds,
  legacyHashPath,
  normalisePath,
  referencePath,
  startPath,
} from './addresses';
export type { HubId, ReferenceTarget } from './addresses';

/**
 * The page an address opens: a path from the site root with its query, such
 * as `/person/jan-leike?inspect=<claim>`. An address that names no record, or
 * carries an unknown parameter, opens no page and returns the notice.
 */
export function resolveReference(
  address: string,
  data: Dataset,
): {
  target: ReferenceTarget | null;
  notice: string | null;
} {
  address = queryForm(address);
  const query = address.indexOf('?');
  const path = normalisePath(query < 0 ? address : address.slice(0, query));
  const ref = path + (query < 0 ? '' : address.slice(query));
  // The site root is the reading-first start page, whatever its query.
  if (path === '/') return { target: null, notice: null };
  const hub = /^\/(governance|ideas|institutions)$/.exec(ref);
  if (hub)
    return { target: { kind: 'hub', id: hub[1] as HubId }, notice: null };
  const explore = /^\/explore(?:\?(.*))?$/.exec(ref);
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
  if (ref === '/about') return { target: { kind: 'about' }, notice: null };
  const invalid = {
    target: null,
    notice:
      'This link does not match any record in this dataset. Selekoa has not substituted another record.',
  };
  const search = /^\/search(?:\?(.*))?$/.exec(ref);
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
    /^\/(claim|dossier|reading|question|documents|compare|document|person|control|commitments|propositions)\/([^/?]+)(?:\?(.*))?$/.exec(
      ref,
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
        : kind === 'compare'
          ? ['facet', 'inspect']
          : kind === 'dossier'
            ? ['view', 'inspect']
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
  if (kind === 'compare') {
    const facet = params.get('facet') ?? undefined;
    return id === frameworkComparison.id && (!facet || facetById(facet))
      ? { target: { kind, id, facet, inspect }, notice: null }
      : invalid;
  }
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
  if (kind === 'dossier') {
    const view = params.get('view') ?? undefined;
    return entityOf('organisation') && (!view || view === 'map')
      ? {
          target: { kind, id, view: view as 'map' | undefined, inspect },
          notice: null,
        }
      : invalid;
  }
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
