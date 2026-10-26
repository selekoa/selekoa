import type { Dataset } from './schema';

/**
 * Stored editorial and verification states, counted without interpretation.
 * Exceptions are listed by identity so they can be inspected, never summarised away.
 */
export function reviewStatus(data: Dataset, claimIds?: readonly string[]) {
  const scope = claimIds ? new Set(claimIds) : null;
  const claims = scope
    ? data.claims.filter((c) => scope.has(c.id))
    : data.claims;
  const claimSet = new Set(claims.map((c) => c.id));
  const evidence = data.evidence.filter((e) => claimSet.has(e.claimId));
  const accepted = claims.filter((c) => c.editorialState === 'accepted');
  const humanReviewed = evidence.filter(
    (e) => e.verification === 'human_reviewed',
  );
  return {
    claims: claims.length,
    seedClaims: claims.length - accepted.length,
    acceptedClaimIds: accepted.map((c) => c.id),
    evidence: evidence.length,
    machineCheckedEvidence: evidence.length - humanReviewed.length,
    humanReviewedEvidence: humanReviewed.map((e) => ({
      evidenceId: e.id,
      claimId: e.claimId,
      reviewer: e.reviewer ?? '',
      checkedAt: e.checkedAt,
    })),
  };
}

export type ReviewStatus = ReturnType<typeof reviewStatus>;

export function reviewStatusSentences(status: ReviewStatus) {
  return [
    `${status.seedClaims} of ${status.claims} claims are exploratory records that are not editorially accepted (editorial state: seed).` +
      (status.acceptedClaimIds.length
        ? ` Editorially accepted: ${status.acceptedClaimIds.join(', ')}.`
        : ' No claim in this scope is editorially accepted.'),
    `${status.machineCheckedEvidence} of ${status.evidence} evidence records are machine-checked only.` +
      (status.humanReviewedEvidence.length
        ? ` Human-reviewed: ${status.humanReviewedEvidence.map((e) => `${e.evidenceId} (claim ${e.claimId}; ${e.reviewer}; ${e.checkedAt})`).join(', ')}.`
        : ' No evidence record in this scope is human-reviewed.'),
    'The seed state describes a claim’s recorded editorial status. It does not mean that no person has read a linked passage. A machine check is not a human review, and neither makes a claim certain.',
  ];
}
