/**
 * The address, title and wording of the propositions-by-author pages
 * (src/ui/PropositionStances.tsx), apart from their code, so that the
 * start page, the hubs and the build can name them without loading it.
 * `/stances` lists the collections; `/stances/<collection>` shows one.
 */
export const stancesTitle = 'Propositions by author';
export const stancesQuestion =
  'For each proposition, which texts articulate, contest or bear on it, who wrote them and when?';
/** The CSV of one collection's stances, written by the build. */
export const stancesCsvPath = (collectionId: string) =>
  `/stances/${collectionId}.csv`;
