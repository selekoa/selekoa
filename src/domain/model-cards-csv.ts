/**
 * "Model cards compared" as a CSV file, one row per cell: every card against
 * every question. Built from the same view as the page (`modelCardsView`),
 * so the file and the table give the same cells. The build writes it beside
 * the page (scripts/comparison-csv.ts). Columns are those listed in the
 * pack's review note (review/model-cards-pack-2026-11-02.md, "CSV").
 */
import type { Dataset } from './schema';
import {
  cardCellNote,
  cardDate,
  cardDeveloper,
  cardEditions,
  cardSearchRecord,
  cardStatusLabels,
  modelCardsView,
} from './model-cards-view';
import { cardFacetNumber } from './model-card-facets';
import type { ModelCardsCollection } from './model-cards';
import { csvText } from './comparison-csv';

export const modelCardsCsvColumns = [
  'card_id',
  'developer',
  'card',
  'card_date',
  'card_date_kind',
  'release_date',
  'framework_edition',
  'question_id',
  'question',
  'status',
  'quotation',
  'locator',
  'note',
  'search_scope',
  'search_terms',
  'passages_set_aside',
  'source_url',
  'sha256',
  'date_checked',
  'record',
] as const;

export type ModelCardsCsvRow = Record<
  (typeof modelCardsCsvColumns)[number],
  string
>;

/** The rows of the CSV file, card by card in row order, then by question. */
export function modelCardsCsvRows(
  data: Dataset,
  collection: ModelCardsCollection,
  families: readonly string[],
  baseUrl = '',
): ModelCardsCsvRow[] {
  const view = modelCardsView(data, collection);
  const evidence = new Map(data.evidence.map((e) => [e.id, e]));
  const sources = new Map(data.sources.map((s) => [s.id, s]));
  const editions = cardEditions(data, families);
  const quotes = (claimId: string | undefined) =>
    claimId
      ? data.claims
          .find((c) => c.id === claimId)!
          .evidenceIds.map((id) => evidence.get(id)!)
          .filter((e) => e.passageType === 'quote')
      : [];
  const rows: ModelCardsCsvRow[] = [];
  for (const card of view.rows) {
    const dateCell = view.cell(card.id, 'MC.Q01').claim;
    const release = view.cell(card.id, 'MC.Q02');
    const releaseText =
      release.status === 'not-found'
        ? ''
        : quotes(release.claim?.id)
            .map((e) => `“${e.passage}”`)
            .join('\n');
    for (const facet of view.facets) {
      const cell = view.cell(card.id, facet.id);
      const claim = cell.claim;
      const items = claim
        ? claim.evidenceIds.map((id) => evidence.get(id)!)
        : [];
      const passages = items.filter((e) => e.passageType === 'quote');
      const search =
        claim && cell.status === 'not-found' ? cardSearchRecord(claim) : null;
      const cellSources = [
        ...new Set((items.length ? items : []).map((e) => e.sourceId)),
      ].map((id) => sources.get(id)!);
      const shownSources = cellSources.length
        ? cellSources
        : card.sourceIds.slice(0, 1).map((id) => sources.get(id)!);
      rows.push({
        card_id: card.id,
        developer: cardDeveloper(data, card).name,
        card: card.name,
        card_date: cardDate(card, dateCell),
        card_date_kind:
          card.documentVersion?.label ??
          (dateCell?.time.kind === 'event' ? '' : (dateCell?.time.note ?? '')),
        release_date: releaseText,
        framework_edition: (editions.get(card.id) ?? []).join('; '),
        question_id: cardFacetNumber(facet.id),
        question: collection.questions[facet.id].question,
        status: cardStatusLabels[cell.status],
        quotation: passages.map((e) => `“${e.passage}”`).join('\n'),
        locator: (passages.length ? passages : items)
          .map((e) => e.locator)
          .join('\n'),
        note: claim ? cardCellNote(claim) : (cell.reason ?? ''),
        search_scope: search?.scope ?? '',
        search_terms: search?.terms ?? '',
        passages_set_aside: search?.setAside ?? '',
        source_url: shownSources.map((s) => s.evidenceUrl).join('\n'),
        sha256: shownSources
          .map((s) => /SHA-256 ([0-9a-f]{64})/.exec(s.version ?? '')?.[1] ?? '')
          .join('\n'),
        date_checked: [...new Set(items.map((e) => e.checkedAt))].join('; '),
        record: claim ? `${baseUrl.replace(/\/$/, '')}/claim/${claim.id}` : '',
      });
    }
  }
  return rows;
}

/** The CSV text, with a header row and CRLF line ends, as RFC 4180 has them. */
export function modelCardsCsv(
  data: Dataset,
  collection: ModelCardsCollection,
  families: readonly string[],
  baseUrl = '',
): string {
  return csvText(
    modelCardsCsvColumns,
    modelCardsCsvRows(data, collection, families, baseUrl),
  );
}
