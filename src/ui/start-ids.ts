import { frontierSafetyFrameworks } from '../reading/frontier-safety-frameworks';
import { externalCommitments } from '../reading/commitments';
import { researchPaths } from '../domain/research-path';

/** The collection ids start-page actions open, for their link addresses. */
export const startIds = {
  history: frontierSafetyFrameworks,
  commitments: externalCommitments,
  reading: researchPaths[0],
};
