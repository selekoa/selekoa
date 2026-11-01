import type { Dataset } from './schema';
import { dateOf, isPropositionRecord } from './query';
import { datasetVersion } from './slices';

/**
 * Dataset-wide values the explorer shows on every page, computed by the
 * build from the whole dataset (`virtual:site-facts`), so that a page drawn
 * from part of the records shows the same.
 */
export type SiteFacts = {
  /** Years of the claims the explorer shows, latest first. */
  years: number[];
  /** The latest date any evidence was checked. */
  latestCheck: string;
  /** How many claims the explorer shows: every claim but proposition records. */
  explorable: number;
  /** How many of those each topic has. */
  topics: Record<string, number>;
  /** Every claim and entity, counted. */
  claims: number;
  entities: number;
  /** The entity types recorded, in the order they first occur. */
  entityTypes: Dataset['entities'][number]['type'][];
  /**
   * The dataset's fingerprint (src/domain/slices.ts): a part fetched for the
   * next page must be of the records this build was made with.
   */
  version: string;
};

export function siteFacts(data: Dataset): SiteFacts {
  const explorable = data.claims.filter((c) => !isPropositionRecord(c));
  return {
    years: [
      ...new Set(
        explorable
          .map(dateOf)
          .filter((d): d is string => Boolean(d))
          .map((d) => Number(d.slice(0, 4))),
      ),
    ].sort((a, b) => b - a),
    latestCheck: data.evidence
      .map((e) => e.checkedAt)
      .sort()
      .at(-1)!,
    explorable: explorable.length,
    topics: Object.fromEntries(
      [...new Set(explorable.map((c) => c.topic))].map((topic) => [
        topic,
        explorable.filter((c) => c.topic === topic).length,
      ]),
    ),
    claims: data.claims.length,
    entities: data.entities.length,
    entityTypes: [...new Set(data.entities.map((e) => e.type))],
    version: datasetVersion(data),
  };
}
