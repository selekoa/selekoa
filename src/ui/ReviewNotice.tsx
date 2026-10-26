import type { ReviewStatus } from '../domain/review-status';
import './reading-first.css';

/**
 * Dataset-level exceptions to the machine-checked default, listed by identity
 * in a disclosure on the About & method page.
 */
export function ReviewExceptions({
  status,
  statements,
  onClaim,
}: {
  status: ReviewStatus;
  /** Statements of the listed claims, by claim ID. */
  statements: Record<string, string>;
  onClaim: (id: string) => void;
}) {
  const accepted = status.acceptedClaimIds.map((id) => ({
    id,
    statement: statements[id],
  }));
  const reviewed = status.humanReviewedEvidence.length;
  return (
    <details className="review-details" id="review-status" tabIndex={-1}>
      <summary>
        Exceptions: {accepted.length} editorially accepted{' '}
        {accepted.length === 1 ? 'claim' : 'claims'} and {reviewed}{' '}
        human-reviewed evidence {reviewed === 1 ? 'record' : 'records'}
      </summary>
      <ul className="review-exceptions" aria-label="Review-state exceptions">
        {accepted.map((claim) => (
          <li key={claim.id}>
            <span className="review-exception-kind">
              Editorially accepted claim
            </span>
            <button
              className="text-button"
              data-review-claim={claim.id}
              onClick={() => onClaim(claim.id)}
            >
              {claim.statement}
            </button>
          </li>
        ))}
        {status.humanReviewedEvidence.map((item) => (
          <li key={item.evidenceId}>
            <span className="review-exception-kind">
              Human-reviewed evidence · {item.reviewer} · {item.checkedAt}
            </span>
            <button
              className="text-button"
              data-review-claim={item.claimId}
              onClick={() => onClaim(item.claimId)}
            >
              {status.acceptedClaimIds.includes(item.claimId)
                ? 'Evidence for the accepted claim above'
                : statements[item.claimId]}
            </button>
          </li>
        ))}
      </ul>
      <p className="review-notice-note">
        “Not editorially accepted” describes a claim’s recorded status. It does
        not mean that no person has read a linked passage. A machine check is
        not a human review, and neither makes a claim certain. Elsewhere, lists
        mark only the exceptions above, and the Evidence Inspector shows every
        claim’s status. Before you rely on a claim, check it against the
        original source.
      </p>
    </details>
  );
}
