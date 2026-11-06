/**
 * "Predictions on record" as a CSV file, one row per record, with the page
 * table's columns, from the same rows (`predictionRows`). The build writes it
 * beside the page (scripts/comparison-csv.ts). It carries no outcome column.
 */
import type { Dataset } from './schema';
import { csvText } from './comparison-csv';
import { predictionRows, type PredictionsCollection } from './predictions';

export const predictionsCsvColumns = [
  'source_date',
  'form',
  'predictor',
  'predicted_event',
  'event_wording',
  'horizon_as_stated',
  'horizon_kind',
  'printed_target_years',
  'probability_as_stated',
  'confidence_as_stated',
  'marks',
  'wording_attested_from',
  'estimate_reported_of',
  'document',
  'record',
] as const;

/** The collection as a CSV file, one row per record, with the table's columns. */
export function predictionsCsv(
  data: Pick<Dataset, 'claims' | 'entities'>,
  collection: Pick<PredictionsCollection, 'forms' | 'marks'>,
  baseUrl = '',
): string {
  const form = new Map(collection.forms.map((f) => [f.id, f.label]));
  const mark = new Map(collection.marks.map((m) => [m.id, m.label]));
  return csvText(
    predictionsCsvColumns,
    predictionRows(data).map((r) => ({
      source_date: r.sourceDate,
      form: form.get(r.form) ?? r.form,
      predictor: r.predictor,
      predicted_event: r.event,
      event_wording: r.eventType === 'quote' ? 'quotation' : 'paraphrase',
      horizon_as_stated: r.horizon,
      horizon_kind: r.horizonKind,
      printed_target_years: r.years.join(' '),
      probability_as_stated: r.probability ?? '',
      confidence_as_stated: r.confidence ?? '',
      marks: r.marks.map((m) => mark.get(m) ?? m).join('; '),
      wording_attested_from: r.attested ?? '',
      estimate_reported_of: r.estimateOf ?? '',
      document: r.document,
      record: `${baseUrl}/claim/${r.claimId}`,
    })),
  );
}
