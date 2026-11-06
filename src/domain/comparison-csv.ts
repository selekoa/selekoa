/**
 * The framework comparison as a CSV file, one row per cell: every edition of
 * every framework against every question. Built from the same view as the
 * page (`comparisonView`), so the file and the table give the same cells.
 * The build writes it beside the page (scripts/comparison-csv.ts).
 */
import type { Dataset } from './schema';
import {
  cellNote,
  cellStatusLabels,
  comparisonFacets,
  comparisonView,
  type ComparisonCollection,
} from './framework-comparison';

export const comparisonCsvColumns = [
  'framework',
  'publisher',
  'edition',
  'edition_date',
  'question_group',
  'question_id',
  'question',
  'status',
  'passage_type',
  'passage',
  'page',
  'source_url',
  'archive_url',
  'date_checked',
  'note',
  'search_notes',
  'record',
] as const;

export type ComparisonCsvRow = Record<
  (typeof comparisonCsvColumns)[number],
  string
>;

/** The rows of the CSV file, framework by framework, edition by edition. */
export function comparisonCsvRows(
  data: Dataset,
  collection: ComparisonCollection,
  baseUrl = '',
): ComparisonCsvRow[] {
  const view = comparisonView(data, collection);
  const evidence = new Map(data.evidence.map((e) => [e.id, e]));
  const sources = new Map(data.sources.map((s) => [s.id, s]));
  const rows: ComparisonCsvRow[] = [];
  for (const column of view.columns)
    for (const edition of column.editions) {
      const version = edition.documentVersion!;
      const dated = version.effectiveAt
        ? `effective ${version.effectiveAt}`
        : version.publishedAt
          ? `published ${version.publishedAt}`
          : version.revisedAt
            ? `revised ${version.revisedAt}`
            : 'date unknown';
      const editionSource = data.sources.find(
        (s) => s.documentId === edition.id,
      );
      for (const facet of comparisonFacets) {
        const cell = view.cell(edition.id, facet.id);
        const claim = cell.claim;
        const items = claim
          ? claim.evidenceIds.map((id) => evidence.get(id)!)
          : [];
        const found = cell.status !== 'not-found';
        // The page shows quotations, and paraphrases of stated cells; a
        // recorded absence's paraphrase is its search record.
        const passages = found
          ? items.filter(
              (e) =>
                e.passageType === 'quote' ||
                (claim!.predicate === 'states_provision' &&
                  e.passageType === 'paraphrase'),
            )
          : [];
        const shownSources = [
          ...new Set(
            (passages.length ? passages : items).map((e) => e.sourceId),
          ),
        ].map((id) => sources.get(id)!);
        const urlSources = shownSources.length
          ? shownSources
          : editionSource
            ? [editionSource]
            : [];
        rows.push({
          framework: column.label,
          publisher: column.publisher,
          edition: version.label ?? edition.name,
          edition_date: dated,
          question_group: facet.dimension.label,
          question_id: facet.id,
          question: facet.label,
          status: cellStatusLabels[cell.status],
          passage_type: [...new Set(passages.map((e) => e.passageType))].join(
            '; ',
          ),
          passage: passages
            .map((e) =>
              e.passageType === 'quote'
                ? `“${e.passage}”`
                : `Paraphrase: ${e.passage}`,
            )
            .join('\n'),
          page: (found ? passages : items).map((e) => e.locator).join('\n'),
          source_url: urlSources.map((s) => s.evidenceUrl).join('\n'),
          archive_url: urlSources
            .map((s) => s.archivedUrl ?? '')
            .filter(Boolean)
            .join('\n'),
          date_checked: [...new Set(items.map((e) => e.checkedAt))].join('; '),
          note: claim ? cellNote(claim) : (cell.reason ?? ''),
          search_notes: found
            ? ''
            : claim!.inferenceRationale ||
              items
                .map((e) => e.note ?? '')
                .filter(Boolean)
                .join('\n'),
          record: claim
            ? `${baseUrl.replace(/\/$/, '')}/claim/${claim.id}`
            : '',
        });
      }
    }
  return rows;
}

/** A field as RFC 4180 writes it: quoted when it holds a comma, quote or line break. */
const field = (value: string) =>
  /[",\r\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;

/** CSV text from rows, with a header row and CRLF line ends, as RFC 4180 has them. */
export function csvText<C extends string>(
  columns: readonly C[],
  rows: Record<C, string>[],
): string {
  return (
    [
      columns.join(','),
      ...rows.map((row) => columns.map((c) => field(row[c])).join(',')),
    ].join('\r\n') + '\r\n'
  );
}

/** The CSV text, with a header row and CRLF line ends, as RFC 4180 has them. */
export function comparisonCsv(
  data: Dataset,
  collection: ComparisonCollection,
  baseUrl = '',
): string {
  return csvText(
    comparisonCsvColumns,
    comparisonCsvRows(data, collection, baseUrl),
  );
}
