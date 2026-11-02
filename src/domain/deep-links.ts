import type { Dataset } from './schema';
import { researchPaths } from './research-path';
import { documentHistories } from '../reading/frontier-safety-frameworks';
import { frameworkComparison } from '../reading/framework-comparison';
import { comparisonFacets, facetById } from './framework-comparison';
import { frameworkVersions } from './versions';
import { controlStructures } from '../reading/control-structures';
import { controlTimelinesId } from '../reading/control-timelines-page';
import { commitmentCollections } from '../reading/commitments';
import { guideIds } from '../reading/guides';
import { questionStarters } from '../reading/self-governance';
import { propositionFrames } from '../reading/proposition-frames';
import { parseYearPageId } from './chronicle-index';
import {
  facetSlug,
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
  if (ref === '/years') return { target: { kind: 'years' }, notice: null };
  if (ref === '/stances') return { target: { kind: 'stances' }, notice: null };
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
  // A comparison question's own page: `/compare/<id>/<question>`.
  const question = /^\/compare\/([^/?]+)\/([^/?]+)(?:\?(.*))?$/.exec(ref);
  const facetPage = question
    ? comparisonFacets.find((f) => facetSlug(f.id) === question[2])
    : undefined;
  if (question && !facetPage) return invalid;
  const match = question
    ? [ref, 'compare', question[1], question[3]]
    : /^\/(claim|dossier|reading|question|documents|compare|document|person|control|commitments|guide|propositions|stances|year)\/([^/?]+)(?:\?(.*))?$/.exec(
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
          ? ['facet', 'edition', 'frameworks', 'inspect']
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
    // The earlier `?facet=` form still opens the question.
    if (facetPage && params.has('facet')) return invalid;
    const facet = facetPage?.id ?? params.get('facet') ?? undefined;
    const editions = params.get('edition')?.split(',');
    // At most one chosen edition per framework, each one the comparison holds.
    const families = editions?.map(
      (edition) =>
        frameworkComparison.families.find((family) =>
          frameworkVersions(data, family).some((e) => e.id === edition),
        ) ?? null,
    );
    // Side by side: two or three distinct frameworks, never with one question.
    const frameworks = params.get('frameworks')?.split(',');
    const pairOk =
      !frameworks ||
      (!facet &&
        frameworks.length >= 2 &&
        frameworks.length <= 3 &&
        new Set(frameworks).size === frameworks.length &&
        frameworks.every((f) => frameworkComparison.families.includes(f)));
    return id === frameworkComparison.id &&
      (!facet || facetById(facet)) &&
      pairOk &&
      (!families ||
        (families.every(Boolean) && new Set(families).size === families.length))
      ? {
          target: {
            kind,
            id,
            facet,
            editions,
            ...(frameworks ? { frameworks } : {}),
            inspect,
          },
          notice: null,
        }
      : invalid;
  }
  if (kind === 'control')
    return controlStructures.some((d) => d.id === id) ||
      id === controlTimelinesId
      ? { target: { kind, id, inspect }, notice: null }
      : invalid;
  if (kind === 'commitments')
    return commitmentCollections.some((d) => d.id === id)
      ? { target: { kind, id, inspect }, notice: null }
      : invalid;
  if (kind === 'guide')
    return guideIds.includes(id)
      ? { target: { kind, id, inspect }, notice: null }
      : invalid;
  if (kind === 'propositions' || kind === 'stances')
    return propositionFrames.some((d) => d.id === id)
      ? { target: { kind, id, inspect }, notice: null }
      : invalid;
  if (kind === 'year')
    return parseYearPageId(data, id)
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
