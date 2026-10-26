import type { Claim } from '../domain/schema';
import type { Repository } from '../domain/repository';
import {
  indirectRoutes,
  restsOnReporting,
  statedReason,
} from '../domain/genealogy';

const routeMarks = {
  reader_relay: 'Read through a reader relay',
  x_syndication: 'X syndication text',
} as const;

/**
 * Marks a personnel or organisational record needs beside its statement:
 * an announced stage, reliance on reporting and indirect retrieval routes
 * (schema 2.15). The Evidence Inspector explains each one per passage.
 */
export function recordMarks(claim: Claim, repository: Repository) {
  const marks: { label: string; title: string }[] = [];
  if (claim.attributes?.activityStage === 'announced')
    marks.push({
      label: 'Announced',
      title: 'An announcement; no start or completion is established.',
    });
  if (restsOnReporting(claim, repository))
    marks.push({
      label: 'Rests on reporting',
      title: 'No primary source supports this record; it rests on reporting.',
    });
  for (const route of indirectRoutes(claim, repository))
    marks.push({
      label: routeMarks[route],
      title:
        route === 'reader_relay'
          ? 'A passage was read through a third-party reader service rendering the publisher’s current page, not an archive copy.'
          : 'A post was read through X’s syndication endpoint, which can truncate long notes.',
    });
  return marks;
}

export function RecordMarks({
  claim,
  repository,
}: {
  claim: Claim;
  repository: Repository;
}) {
  const marks = recordMarks(claim, repository);
  if (!marks.length) return null;
  return (
    <span className="review-markers record-marks">
      {marks.map((mark) => (
        <span className="record-mark" key={mark.label} title={mark.title}>
          {mark.label}
        </span>
      ))}
    </span>
  );
}

/** A reason stated by the person or organisation, collapsed and attributed. */
export function StatedReason({
  claim,
  repository,
}: {
  claim: Claim;
  repository: Repository;
}) {
  const reason = statedReason(claim, repository);
  if (!reason) return null;
  return (
    <details className="stated-reason">
      <summary>
        Stated reason, as given by {reason.by}
        {reason.date ? ` (${reason.date})` : ''}
      </summary>
      <p>
        {reason.text}{' '}
        <span className="small-note">
          Attributed to {reason.by}
          {reason.source ? `, in “${reason.source}”` : ''}; not a finding about
          why it happened.
        </span>
      </p>
    </details>
  );
}
