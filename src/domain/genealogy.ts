// Reader marks for personnel and organisational records (schema 2.15): a
// record that rests on reporting, the retrieval routes of its passages and a
// reason stated by the person or organisation concerned.
import type { Claim, Evidence } from './schema';
import type { Repository } from './repository';

export type RetrievalRoute = NonNullable<Evidence['retrievalRoute']>;

/** Labels shown with a passage, and on a record using such a passage. */
export const retrievalRouteLabels: Record<RetrievalRoute, string> = {
  direct: 'Retrieved directly from the publisher',
  reader_relay:
    'Read through a reader relay (r.jina.ai): a third-party rendering of the publisher’s current page, not an archive copy',
  x_syndication:
    'Post text read through X’s syndication endpoint, which can truncate long notes',
};

const evidenceOf = (claim: Claim, repository: Repository) =>
  claim.evidenceIds
    .map((id) => repository.evidence.get(id))
    .filter((e): e is Evidence => Boolean(e));

/**
 * A supported or contested record rests on reporting when none of its
 * supporting passages comes from a primary source. Derived, never stored.
 */
export function restsOnReporting(claim: Claim, repository: Repository) {
  const supporting = evidenceOf(claim, repository).filter(
    (e) => e.support === 'supports',
  );
  return (
    supporting.length > 0 && supporting.every((e) => e.sourceRole !== 'primary')
  );
}

/** The non-direct routes through which the record's passages were read. */
export function indirectRoutes(claim: Claim, repository: Repository) {
  return [
    ...new Set(
      evidenceOf(claim, repository)
        .map((e) => e.retrievalRoute)
        .filter(
          (r): r is Exclude<RetrievalRoute, 'direct'> =>
            r === 'reader_relay' || r === 'x_syndication',
        ),
    ),
  ];
}

/** The stated reason with the name of whoever stated it, if any. */
export function statedReason(claim: Claim, repository: Repository) {
  const reason = claim.attributes?.statedReason;
  if (!reason) return undefined;
  const by = repository.entities.get(reason.by);
  const passage = repository.evidence.get(reason.evidenceId);
  const source = passage && repository.sources.get(passage.sourceId);
  return {
    text: reason.text,
    by: by?.name ?? reason.by,
    source: source?.title,
    date: source?.publicationDate ?? undefined,
  };
}
