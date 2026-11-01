import type { Dataset } from './schema';
import { coverage } from './coverage';
import { chinaScope } from './landing';
import { documentHistory } from './document-history';
import { commitmentsView } from './commitments';
import { frontierSafetyFrameworks } from '../reading/frontier-safety-frameworks';
import { externalCommitments } from '../reading/commitments';

/**
 * The dataset-wide figures About & method shows, computed by the build from
 * the whole dataset (`virtual:about-facts`), so that the page is drawn
 * without the records (docs/data-loading-design-c.md, stage c4).
 */
export function aboutFacts(data: Dataset) {
  const history = documentHistory(data, frontierSafetyFrameworks);
  return {
    coverage: coverage(data),
    chinaScope: chinaScope(data),
    /** Safety frameworks with a document history, and their editions. */
    frameworks: history.families.length,
    editions: history.families.reduce((n, f) => n + f.editions.length, 0),
    /** Texts on the external commitments page. */
    commitmentTexts: commitmentsView(data, externalCommitments).documents
      .length,
  };
}
export type AboutFacts = ReturnType<typeof aboutFacts>;
