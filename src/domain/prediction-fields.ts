/**
 * Prediction records (schema 2.32): the enumerations of
 * `attributes.prediction` on a `states_prediction` record, and the text
 * checks the schema applies to them. This module imports nothing, so the
 * schema, the collection and the page can share it.
 *
 * A prediction record documents what a text states and when. It is dated by
 * the text, never by the target; it has no outcome field, and no reader of it
 * judges whether a prediction came true.
 */

/**
 * How the prediction is put: a forecast stated in a text, a public bet, an
 * expert survey's published result, a forecasting platform's figure from a
 * dated copy, or a text's report of other people's predictions.
 */
export const predictionForms = [
  'stated-forecast',
  'public-bet',
  'expert-survey',
  'platform-question',
  'reported-statement',
] as const;
export type PredictionForm = (typeof predictionForms)[number];

/** Who predicts. A survey's figure belongs to the survey; an unnamed predictor has a reporter. */
export const predictorKinds = [
  'person',
  'persons',
  'organisation',
  'survey',
  'platform',
  'unnamed',
] as const;

/**
 * The horizon as worded: a printed year or date (`absolute`), years attached
 * to probabilities (`quantile`), an amount of time from a starting point
 * (`relative`, never converted to a year), a named period, a vague horizon,
 * or a horizon given only in a figure.
 */
export const horizonKinds = [
  'absolute',
  'quantile',
  'relative',
  'period',
  'vague',
  'figure',
] as const;
export type HorizonKind = (typeof horizonKinds)[number];

/** A dated occasion from which a horizon counts, other than the text's own date. */
export const occasionKinds = ['address', 'poll'] as const;

/** What a documentary dispute on a prediction record is about; never its outcome. */
export const predictionDisputes = [
  'wording',
  'attribution',
  'version',
] as const;

/** Horizon kinds whose stated years are printed calendar years. */
export const yearHorizonKinds: readonly HorizonKind[] = [
  'absolute',
  'quantile',
];

/** Comparison form of a passage: quotation marks, dashes, spaces and case. */
export const normaliseWords = (s: string) =>
  s
    .normalize('NFKC')
    .replace(/[‘’`]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[‐-―−]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

/** The words a paraphrase quotes: every run inside quotation marks. */
export const quotedFragments = (passage: string) =>
  [...passage.matchAll(/“([^”]+)”|"([^"]+)"/g)].map((m) => m[1] ?? m[2]);

/**
 * Words that would judge a prediction, rank a predictor or claim priority.
 * They may appear only inside quotation marks in a prediction record's own
 * text (statement, qualification, notes).
 */
export const predictionVerdictWords =
  /\b(came true|come true|comes true|fulfil\w*|unfulfil\w*|was right|were right|was wrong|were wrong|proved (?:right|wrong|correct)|correctly|accurate(?:ly)?|inaccurate|vindicat\w*|falsified|did not happen|has happened|have happened|first to|coined|originated|pioneered|prescient)\b/i;

/** A text with its quoted runs removed, for the verdict-word check. */
export const unquoted = (s: string) => s.replace(/“[^”]*”|"[^"]*"/g, ' ');
