import type { Claim } from '../domain/schema';
import type { Repository } from '../domain/repository';

/**
 * Seed is the default editorial state, so rows mark only the exceptions.
 * The stored state of every claim stays visible in the Evidence Inspector.
 */
export function reviewExceptions(claim: Claim, repository: Repository) {
  const markers: string[] = [];
  if (claim.editorialState === 'accepted') markers.push('Editorially accepted');
  if (
    claim.evidenceIds.some(
      (id) => repository.evidence.get(id)?.verification === 'human_reviewed',
    )
  )
    markers.push('Human-reviewed evidence');
  return markers;
}

/**
 * A claim's review status in plain words, for the Evidence Inspector. The
 * default state reads “Machine-checked, not reviewed by an editor”.
 */
export function reviewLabel(claim: Claim, repository: Repository) {
  const reviewed = claim.evidenceIds.some(
    (id) => repository.evidence.get(id)?.verification === 'human_reviewed',
  );
  if (claim.editorialState === 'accepted')
    return reviewed
      ? 'Editorially accepted · human-reviewed evidence'
      : 'Editorially accepted';
  return reviewed
    ? 'Not editorially accepted · human-reviewed evidence'
    : 'Machine-checked, not reviewed by an editor';
}

export function ReviewMarkers({
  claim,
  repository,
}: {
  claim: Claim;
  repository: Repository;
}) {
  const markers = reviewExceptions(claim, repository);
  if (!markers.length) return null;
  return (
    <span className="review-markers">
      {markers.map((marker) => (
        <span className="review-marker" key={marker}>
          {marker}
        </span>
      ))}
    </span>
  );
}
