/**
 * The page's reading of model-card cells (schema 2.30): the table as rows
 * and columns, status names, a recorded absence's search, a card's date and
 * the framework editions it cites. Loaded with the pages that show cards
 * (Model cards compared, Compare frameworks) and by the build's CSV file;
 * shared code holds only ./model-cards.ts.
 */
import type { Claim, Dataset, Entity } from './schema';
import { selected } from './memo';
import {
  cardFacets,
  isCardCell,
  modelCardsClaimIds,
  type CardCellStatus,
  type ModelCardsCollection,
} from './model-cards';

/**
 * The comparison as rows (cards) by columns (questions), computed from
 * stored claims. A cell never counts, scores or ranks.
 */
export function modelCardsView(
  data: Dataset,
  collection: ModelCardsCollection,
) {
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const rows = collection.cards.map((id) => {
    const card = entities.get(id);
    if (card?.type !== 'document')
      throw new Error('Not a card document: ' + id);
    return card;
  });
  // Cells are read only on claims about the cards shown, chosen by their
  // subject (src/prerender/trace.ts).
  const shown = new Set(collection.cards);
  const cells = new Map<string, Claim>();
  for (const c of data.claims)
    if (shown.has(c.subject) && isCardCell(c))
      cells.set(`${c.subject} ${c.attributes!.provision!.facet!.id}`, c);
  const cell = (cardId: string, facetId: string) => {
    const claim = cells.get(`${cardId} ${facetId}`);
    if (claim) {
      const status: CardCellStatus =
        claim.predicate === 'provision_not_found'
          ? 'not-found'
          : (claim.attributes!.provision!.facet!.status as 'stated' | 'partly');
      return { status, claim, reason: null };
    }
    const inapplicable = collection.notApplicable.find(
      (n) => n.cardId === cardId && (n.facetIds as string[]).includes(facetId),
    );
    if (!inapplicable)
      throw new Error(`No card record for ${cardId} ${facetId}`);
    return {
      status: 'not-applicable' as CardCellStatus,
      claim: null,
      reason: inapplicable.reason,
    };
  };
  return {
    collection,
    facets: cardFacets,
    rows,
    cell,
    claimIds: modelCardsClaimIds(data, collection),
  };
}
export type ModelCardsView = ReturnType<typeof modelCardsView>;

/** Sentences every card cell's qualification carries; a page states them once. */
export const cardStandingText = {
  stated:
    'What the card states, quoted from the expression read. A card is the developer’s own account: not evidence that an evaluation was run as described, that a safeguard works, or that a finding is independent.',
  partly:
    'Stated, partly: the passage has what the question’s criterion asks for, in a weaker or narrower form than the criterion’s own words.',
  absent:
    'A recorded absence within the stated scope of the card read: not evidence that the developer did not do the thing asked about, or did not disclose it elsewhere.',
};

/** A card cell's own note: its qualification without the shared sentences. */
export function cardCellNote(claim: Claim) {
  let note = claim.qualification;
  for (const text of Object.values(cardStandingText))
    note = note.replace(text, '');
  return note.trim();
}

/** The reader's name for each status, on the pages and in the CSV file. */
export const cardStatusLabels: Record<CardCellStatus, string> = {
  stated: 'Stated',
  partly: 'Stated, partly',
  'not-found': 'Not found in the recorded search',
  'not-applicable': 'Does not apply',
};

/** The same, short enough for a cell of the table. */
export const cardStatusShort: Record<CardCellStatus, string> = {
  stated: 'Stated',
  partly: 'Partly',
  'not-found': 'Not found',
  'not-applicable': 'Does not apply',
};

/**
 * A recorded absence's search, read from its stored reasoning: the scope
 * read, the terms searched and the passages read and set aside, each with
 * its reason. Null when the reasoning does not have that form.
 */
export function cardSearchRecord(claim: Claim) {
  const m =
    /The inspected scope of .*? was: (.*?) Terms searched: (.*?)(?: Passages read and not counted: (.*))? The conclusion is bounded by that scope and method\.$/s.exec(
      claim.inferenceRationale ?? '',
    );
  return m ? { scope: m[1], terms: m[2], setAside: m[3] ?? null } : null;
}

/**
 * A card's own date, as its record states it: the printed date and any
 * revision date, or the date its cells carry; "No printed date" otherwise.
 * A repository commit date is never a card date.
 */
export function cardDate(card: Entity, dateCell: Claim | null | undefined) {
  const v = card.documentVersion;
  const parts = v
    ? [
        v.publishedAt && `dated ${v.publishedAt}`,
        v.revisedAt &&
          v.revisedAt !== v.publishedAt &&
          `revised ${v.revisedAt}`,
      ].filter(Boolean)
    : [];
  if (parts.length) return parts.join(' · ');
  const t = dateCell?.time;
  if (t?.kind === 'event')
    return t.basis === 'revision' ? `revised ${t.date}` : `dated ${t.date}`;
  return 'No printed date';
}

/**
 * The framework editions each card cites, from its `cites` claims whose
 * object is an edition of one of these framework families, in claim order.
 */
export function cardEditions(data: Dataset, families: readonly string[]) {
  const family = new Set(families);
  const editions = new Map(
    data.entities
      .filter(
        (e) =>
          e.type === 'document' &&
          !!e.documentVersion &&
          family.has(e.documentVersion.family),
      )
      .map((e) => [e.id, e]),
  );
  // Chosen by their relation fields alone: a page's slice holds them only
  // when they are marked as selected (src/domain/memo.ts).
  const links = selected(
    'claims',
    data.claims.filter(
      (c) =>
        c.predicate === 'cites' &&
        c.object.kind === 'entity' &&
        editions.has(c.object.entityId),
    ),
  );
  const byCard = new Map<string, string[]>();
  for (const c of links)
    byCard.set(c.subject, [
      ...(byCard.get(c.subject) ?? []),
      (c.object as { entityId: string }).entityId,
    ]);
  return byCard;
}

/** The developer of a card: the publisher of its first source. */
export function cardDeveloper(data: Dataset, card: Entity) {
  const source = data.sources.find((s) => s.id === card.sourceIds[0]);
  return {
    id: card.documentVersion?.publisherId ?? source?.publisherId ?? '',
    name: source?.publisher ?? '',
  };
}
