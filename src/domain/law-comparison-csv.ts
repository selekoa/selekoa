/**
 * "Laws compared" as a CSV file, one row per cell: every text of every
 * instrument (both New York versions) against every question. Built from the
 * same view as the page (`lawsComparedView`), so the file and the table give
 * the same cells. Columns follow the framework comparison's file, with the
 * instrument's standing, the working translation and the date kind added
 * (review/laws-compared-pack-2026-11-02.md, "Collection and page plan").
 * The build writes it beside the page (scripts/comparison-csv.ts).
 */
import type { Dataset } from './schema';
import { lawFacetNumber } from './law-questions';
import type { LawsComparedCollection } from './law-comparison';
import {
  lawCellNote,
  lawSearchRecord,
  lawStatusLabels,
  lawsComparedView,
} from './law-comparison-view';
import { csvText } from './comparison-csv';

export const lawsComparedCsvColumns = [
  'instrument',
  'jurisdiction',
  'instrument_standing',
  'text',
  'text_date',
  'question_id',
  'question',
  'status',
  'passage_type',
  'passage',
  'translation',
  'locator',
  'source_url',
  'archive_url',
  'date_checked',
  'date_kind',
  'note',
  'search_notes',
  'record',
] as const;

export type LawsComparedCsvRow = Record<
  (typeof lawsComparedCsvColumns)[number],
  string
>;

const dateKinds: Record<string, string> = {
  publication: 'date of issue',
  effective: 'takes effect',
  revision: 'revision',
  signature: 'signature',
  announcement: 'announcement',
};

/** The rows of the CSV file, column by column, text by text, then by question. */
export function lawsComparedCsvRows(
  data: Dataset,
  collection: LawsComparedCollection,
  baseUrl = '',
): LawsComparedCsvRow[] {
  const view = lawsComparedView(data, collection);
  const evidence = new Map(data.evidence.map((e) => [e.id, e]));
  const sources = new Map(data.sources.map((s) => [s.id, s]));
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const rows: LawsComparedCsvRow[] = [];
  for (const col of view.columns)
    for (const textId of col.texts) {
      const text = entities.get(textId)!;
      const v = text.documentVersion!;
      for (const facet of view.facets) {
        const cell = view.cell(text.id, facet.id);
        const claim = cell.claim;
        const items = claim
          ? claim.evidenceIds.map((id) => evidence.get(id)!)
          : [];
        const shown =
          cell.status === 'not-found'
            ? items.filter((e) => e.passageType === 'quote')
            : items;
        const used = [...new Set(shown.map((e) => e.sourceId))].map((id) =>
          sources.get(id)!,
        );
        const search =
          claim && cell.status === 'not-found' ? lawSearchRecord(claim) : null;
        const time = claim?.time;
        rows.push({
          instrument: col.column.label,
          jurisdiction: col.column.jurisdiction,
          instrument_standing: col.column.standing,
          text: v.label,
          text_date: v.publishedAt ?? '',
          question_id: lawFacetNumber(facet.id),
          question: collection.questions[facet.id].question,
          status: lawStatusLabels[cell.status],
          passage_type: [...new Set(shown.map((e) => e.passageType))].join(
            '; ',
          ),
          passage: shown
            .map((e) =>
              e.passageType === 'quote' ? `“${e.passage}”` : e.passage,
            )
            .join('\n'),
          translation: shown
            .map((e) => e.translation ?? '')
            .join('\n')
            .trim(),
          locator: shown.map((e) => e.locator).join('\n'),
          source_url: used.map((s) => s.evidenceUrl).join('\n'),
          archive_url: used
            .map((s) => s.archivedUrl ?? '')
            .join('\n')
            .trim(),
          date_checked: [...new Set(items.map((e) => e.checkedAt))].join('; '),
          date_kind:
            time?.kind === 'event'
              ? `${dateKinds[time.basis ?? ''] ?? time.basis ?? ''}${claim?.attributes?.provision?.computed ? ' (computed)' : ''}`
              : (time?.kind ?? ''),
          note: claim ? lawCellNote(claim) : (cell.reason ?? ''),
          search_notes: search
            ? `Read: ${search.scope} Terms searched: ${search.terms}${search.setAside ? ` Passages set aside: ${search.setAside}` : ''}`
            : '',
          record: claim
            ? `${baseUrl.replace(/\/$/, '')}/claim/${claim.id}`
            : '',
        });
      }
    }
  return rows;
}

/** The CSV text, with a header row and CRLF line ends, as RFC 4180 has them. */
export function lawsComparedCsv(
  data: Dataset,
  collection: LawsComparedCollection,
  baseUrl = '',
): string {
  return csvText(
    lawsComparedCsvColumns,
    lawsComparedCsvRows(data, collection, baseUrl),
  );
}
