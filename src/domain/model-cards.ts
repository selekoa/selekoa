/**
 * Model-card questions (schema 2.30). A card question is Selekoa's question
 * put to every compared system card, model card or safety report; one claim
 * per card and question records what the card states on it, or that no
 * passage was found within a recorded search. Cards are not framework
 * editions, so card questions are a set of their own, outside the framework
 * comparison's facets (src/domain/framework-comparison.ts). This module holds
 * only the identifiers and labels that validation and the view need; each
 * question's wording and criterion are in the collection definition
 * (src/reading/model-cards.ts). Labels come from the adjudicated candidate
 * pack (`research/model-cards/questions.json`).
 */
import type { Dataset } from './schema';

export {
  cardDevelopers,
  cardFacetById,
  cardFacetNumber,
  cardFacets,
  type CardFacetId,
} from './model-card-facets';
import {
  cardFacetById,
  cardFacets,
  type CardFacetId,
} from './model-card-facets';

/** The provision kind every card cell carries, and only card cells. */
export const cardFacetKind = 'disclosure';

/** The provision key a card cell carries: `model-card-q01` for `MC.Q01`. */
export const cardFacetKey = (facetId: string) =>
  'model-card-' + facetId.slice(3).toLowerCase();

export const isCardFacetKey = (key: string) => key.startsWith('model-card-');

/** A card cell: a claim answering one card question for one card. */
export const isCardCell = (claim: {
  attributes?: { provision?: { facet?: { id: string } } };
}) => !!cardFacetById(claim.attributes?.provision?.facet?.id ?? '');

export type CardCellStatus =
  'stated' | 'partly' | 'not-found' | 'not-applicable';

export type ModelCardsCollection = {
  id: string;
  version: number;
  title: string;
  question: string;
  editorialStatus: 'machine-proposed';
  /** What a row and a column are: two sentences under the title. */
  introduction: string;
  /** Each question's wording and criterion, keyed by card question. */
  questions: Record<CardFacetId, { question: string; criterion: string }>;
  legend: Record<CardCellStatus, string>;
  limits: string[];
  /** The collection's scope, stated once ("How we searched"). */
  howWeSearched: string[];
  /** Rows: card documents, by developer in alphabetical order, then date. */
  cards: string[];
  /** Cells with no record because the question does not arise for the card. */
  notApplicable: { cardId: string; facetIds: CardFacetId[]; reason: string }[];
};

/**
 * The part of the collection shared code reads: its identity and its rows.
 * The reader text stays with the page and the release
 * (src/reading/model-cards.ts), as propositions frames do.
 */
export type ModelCardsFrame = Pick<
  ModelCardsCollection,
  'id' | 'version' | 'title' | 'question' | 'editorialStatus' | 'cards'
>;

/** The collection's cells, card by card in row order, then by question. */
export function modelCardsClaimIds(data: Dataset, frame: ModelCardsFrame) {
  const shown = new Set(frame.cards);
  const cells = new Map<string, string>();
  for (const c of data.claims)
    if (shown.has(c.subject) && isCardCell(c))
      cells.set(`${c.subject} ${c.attributes!.provision!.facet!.id}`, c.id);
  return frame.cards.flatMap((card) =>
    cardFacets.flatMap((f) => cells.get(`${card} ${f.id}`) ?? []),
  );
}
