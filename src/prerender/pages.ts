/**
 * The pages Selekoa builds as HTML, and each page's title and description.
 * Pure: the same functions serve the build and, later, rendering on request.
 * See docs/architecture.md ("Addresses and pre-rendered pages").
 */
import type { Dataset } from '../domain/schema';
import { referencePath, resolveReference } from '../domain/deep-links';
import { hubIds, startPath, type ReferenceTarget } from '../domain/addresses';
import { researchPaths } from '../domain/research-path';
import { landingSummary } from '../domain/landing';
import { documentHistories } from '../reading/frontier-safety-frameworks';
import { frameworkComparison } from '../reading/framework-comparison';
import { controlStructures } from '../reading/control-structures';
import { commitmentCollections } from '../reading/commitments';
import { questionStarters } from '../reading/self-governance';
import { propositionCollections } from '../reading/human-thought';
import { hubOutline, hubTitles } from '../ui/Hub';

export const siteName = 'Selekoa';
export const siteTagline = 'A documentary history of machine intelligence';
export const siteDescription =
  'A documentary history of machine intelligence. Records of people, institutions, documents, capital and governance, each linked to its source passage.';

/**
 * Every page address the build writes, start page first. Search and the
 * explorer are built once, without a query; a query opens in the browser.
 * The earlier `reading` address is not built: it resolves to its question.
 */
export function pagePaths(data: Dataset): string[] {
  const of = (targets: ReferenceTarget[]) => targets.map(referencePath);
  const entities = (type: string) =>
    data.entities.filter((e) => e.type === type).map((e) => e.id);
  return [
    startPath,
    ...of(hubIds.map((id) => ({ kind: 'hub', id }))),
    ...of([{ kind: 'about' }, { kind: 'search' }, { kind: 'explore' }]),
    ...of(documentHistories.map((c) => ({ kind: 'documents', id: c.id }))),
    ...of([{ kind: 'compare', id: frameworkComparison.id }]),
    ...of(controlStructures.map((c) => ({ kind: 'control', id: c.id }))),
    ...of(
      commitmentCollections.map((c) => ({ kind: 'commitments', id: c.id })),
    ),
    ...of(
      propositionCollections.map((c) => ({ kind: 'propositions', id: c.id })),
    ),
    ...of(
      [...questionStarters, ...researchPaths].map((c) => ({
        kind: 'question',
        id: c.id,
      })),
    ),
    ...of(entities('organisation').map((id) => ({ kind: 'dossier', id }))),
    ...of(entities('person').map((id) => ({ kind: 'person', id }))),
    ...of(entities('document').map((id) => ({ kind: 'document', id }))),
    ...of(data.claims.map((c) => ({ kind: 'claim', id: c.id }))),
  ];
}

/** Shortens text to at most `max` characters at a word boundary. */
export function clip(text: string, max: number) {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return (
    (space > max / 2 ? cut.slice(0, space) : cut).replace(/[,;:.]$/, '') + '…'
  );
}

export type PageMeta = {
  /** The document title, ending in the site name. */
  title: string;
  /** The meta description, at most 200 characters. */
  description: string;
};

const page = (heading: string, description: string): PageMeta => ({
  title: `${heading} · ${siteName}`,
  description: clip(description, 200),
});

/**
 * The title and description of the page at an address, or null when the
 * address opens no page. The query (an inspected claim, a search) does not
 * change them.
 */
export function pageMeta(data: Dataset, address: string): PageMeta | null {
  const { target, notice } = resolveReference(address.split(/[?#]/)[0], data);
  // No target and no notice: the start page.
  if (!target)
    return notice
      ? null
      : { title: `${siteName} · ${siteTagline}`, description: siteDescription };
  const entity = (id: string) => data.entities.find((e) => e.id === id);
  switch (target.kind) {
    case 'hub':
      return page(
        hubTitles[target.id],
        hubOutline(landingSummary(data), target.id).description,
      );
    case 'about':
      return page(
        'About & method',
        'How Selekoa’s records are found, checked and labelled, what they do not cover, how to cite them and how to report a correction.',
      );
    case 'search':
      return page(
        'Search',
        'Search Selekoa’s claims, evidence passages, sources and names.',
      );
    case 'explore':
      return page(
        'Record explorer',
        'Every claim in the dataset as a list, a timeline or a map, filtered by topic, year and type of record.',
      );
    case 'documents': {
      const c = documentHistories.find((d) => d.id === target.id)!;
      return page(c.title, c.question);
    }
    case 'compare':
      return page(
        'Compare frontier safety frameworks',
        frameworkComparison.question,
      );
    case 'control': {
      const c = controlStructures.find((d) => d.id === target.id)!;
      return page(c.title, c.question);
    }
    case 'commitments': {
      const c = commitmentCollections.find((d) => d.id === target.id)!;
      return page(c.title, c.question);
    }
    case 'propositions': {
      const c = propositionCollections.find((d) => d.id === target.id)!;
      return page(c.title, c.question);
    }
    case 'question':
    case 'reading': {
      const c =
        questionStarters.find((d) => d.id === target.id) ??
        researchPaths.find((d) => d.id === target.id)!;
      const institution =
        'institutionId' in c && c.institutionId
          ? entity(c.institutionId)?.name
          : undefined;
      return page(
        institution ? `${institution}: ${c.title.toLowerCase()}` : c.title,
        c.question,
      );
    }
    case 'dossier': {
      const e = entity(target.id)!;
      return page(`${e.name}: institutional dossier`, e.description);
    }
    case 'person':
      return page(entity(target.id)!.name, entity(target.id)!.description);
    case 'document':
      return page(entity(target.id)!.name, entity(target.id)!.description);
    case 'claim': {
      const claim = data.claims.find((c) => c.id === target.id)!;
      return page(
        `Claim: ${clip(claim.statement, 70).replace(/\.$/, '')}`,
        claim.statement,
      );
    }
  }
}
