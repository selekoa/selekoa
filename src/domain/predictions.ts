/**
 * "Predictions on record" (schema 2.32): dated predictions about machine
 * intelligence, each a `states_prediction` record on the document that states
 * it. This module holds the collection's types, the claims it resolves to and
 * the rows the page, its chart and its CSV read. It judges no prediction:
 * there is no outcome, no count by outcome, no ranking and no combined
 * estimate. A row's target years are the years the text prints, never a year
 * computed from a relative horizon.
 */
import type { Claim, Dataset } from './schema';
import type { PredictionForm } from './prediction-fields';

export type PredictionsFrame = {
  id: string;
  version: number;
  title: string;
  question: string;
  editorialStatus: 'machine-proposed';
};

export type PredictionsCollection = PredictionsFrame & {
  introduction: string;
  /** What the collection does not do, said once on the page. */
  doesNot: string[];
  /** The forms of prediction, in the order the page lists them. */
  forms: { id: PredictionForm; label: string; description: string }[];
  /** The marks a row can carry, with what each means. */
  marks: { id: PredictionMark; label: string; description: string }[];
  limits: string[];
  searchNote: {
    scope: string;
    methods: string[];
    gaps: string[];
    notRecorded: { text: string; reason: string }[];
  };
};

export type PredictionMark =
  'forecast-or-aim' | 'reported-later' | 'reported-statement' | 'attested';

type Prediction = NonNullable<NonNullable<Claim['attributes']>['prediction']>;

export type PredictionRow = {
  claimId: string;
  documentId: string;
  /** The document's title, as the dataset names it. */
  document: string;
  /** The date the record is dated by: the text's own date. */
  sourceDate: string;
  /** The first year of the source date, for the chart and the decade filter. */
  sourceYear: number;
  decade: number;
  form: PredictionForm;
  predictor: string;
  event: string;
  eventType: 'quote' | 'paraphrase';
  horizon: string;
  horizonKind: Prediction['horizon']['kind'];
  /** Printed target years only; empty for relative, period, vague and figure horizons. */
  years: number[];
  probability?: string;
  confidence?: string;
  marks: PredictionMark[];
  /** The date from which the quoted wording is attested, where later than the text's. */
  attested?: string;
  /** The date of the earlier estimate a later report gives. */
  estimateOf?: string;
};

export const isPrediction = (c: Pick<Claim, 'predicate'>) =>
  c.predicate === 'states_prediction';

/** Every prediction record of the dataset, in dataset order. */
export function predictionsClaimIds(
  data: Pick<Dataset, 'claims'>,
  frame: Pick<PredictionsFrame, 'id'>,
): string[] {
  void frame;
  return data.claims.filter(isPrediction).map((c) => c.id);
}

const year = (date: string) => Number(date.slice(0, 4));

/** The page's rows, by source date, then by the dataset's order. */
export function predictionRows(
  data: Pick<Dataset, 'claims' | 'entities'>,
): PredictionRow[] {
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const rows: PredictionRow[] = [];
  data.claims.forEach((c) => {
    // The predicate first: reading other claims' attributes would put every
    // claim in the page's slice (src/prerender/trace.ts).
    if (!isPrediction(c) || c.time.kind !== 'event') return;
    const p = c.attributes?.prediction;
    if (!p) return;
    const marks: PredictionMark[] = [];
    if (p.mode === 'forecast-or-aim') marks.push('forecast-or-aim');
    if (p.retrospective) marks.push('reported-later');
    if (p.form === 'reported-statement') marks.push('reported-statement');
    if (p.attested?.date && p.attested.date > c.time.date)
      marks.push('attested');
    const sourceYear = year(c.time.date);
    rows.push({
      claimId: c.id,
      documentId: c.subject,
      document: entities.get(c.subject)?.name ?? c.subject,
      sourceDate: c.time.date,
      sourceYear,
      decade: Math.floor(sourceYear / 10) * 10,
      form: p.form,
      predictor: p.predictor.label,
      event: p.event.text,
      eventType: p.event.type,
      horizon: p.horizon.asStated,
      horizonKind: p.horizon.kind,
      years: [...new Set(p.horizon.years ?? [])].sort((a, b) => a - b),
      ...(p.probability ? { probability: p.probability.asStated } : {}),
      ...(p.confidence ? { confidence: p.confidence.asStated } : {}),
      marks,
      ...(p.attested?.date && marks.includes('attested')
        ? { attested: p.attested.date }
        : {}),
      ...(p.retrospective ? { estimateOf: p.retrospective.estimateOf } : {}),
    });
  });
  return rows
    .map((r, i) => [r, i] as const)
    .sort(([a, i], [b, j]) =>
      a.sourceDate === b.sourceDate
        ? i - j
        : a.sourceDate < b.sourceDate
          ? -1
          : 1,
    )
    .map(([r]) => r);
}

/** The decades of the rows' source dates, oldest first. */
export const predictionDecades = (rows: PredictionRow[]) =>
  [...new Set(rows.map((r) => r.decade))].sort((a, b) => a - b);
