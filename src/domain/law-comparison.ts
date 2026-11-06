/**
 * "Laws compared" (schema 2.31): binding instruments that address developers
 * of frontier or general-purpose AI models, put the same law questions
 * (src/domain/law-questions.ts). A column is an instrument: one document
 * family, whose texts are its versions (New York's RAISE Act as signed in
 * 2025 and as amended in 2026 are one column with two texts); every other
 * column has one text. This module holds the collection's types and the
 * claims it resolves to, which shared code reads; the page's reading of the
 * cells is in ./law-comparison-view.ts.
 */
import type { Dataset } from './schema';
import { isLawCell, lawFacets, type LawFacetId } from './law-questions';

export type LawCellStatus =
  'stated' | 'partly' | 'not-found' | 'not-applicable';

/** What shared code needs of a column: its texts and its standing records. */
export type LawColumnFrame = {
  id: string;
  /** The document family every text of the column belongs to. */
  family: string;
  /** The compared texts, oldest first; the page shows the last unless asked. */
  texts: string[];
  /** The records the column's standing rests on, shown with its header. */
  standingClaimIds: string[];
};

export type LawColumn = LawColumnFrame & {
  /** The instrument's name in the column header. */
  label: string;
  jurisdiction: string;
  /** The standing in a few words, under the header. */
  standing: string;
  /** The standing in full, with the column's other texts read. */
  standingNote: string;
  /** Short names of the texts, for the version switch, in `texts` order. */
  textLabels?: string[];
};

/**
 * A cell answered by a record of the dataset that is not a law cell: a
 * provision admitted before the law questions existed, which the cell cites
 * instead of a second record of the same rule (New York Chapter 699, Q11).
 */
export type CitedCell = {
  textId: string;
  facetId: LawFacetId;
  claimId: string;
  status: 'stated' | 'partly';
};

export type LawsComparedFrame = {
  id: string;
  version: number;
  title: string;
  question: string;
  editorialStatus: 'machine-proposed';
  columns: LawColumnFrame[];
  cited: CitedCell[];
};

export type LawsComparedCollection = Omit<LawsComparedFrame, 'columns'> & {
  columns: LawColumn[];
  /** Column groups, in order; the last is "Revoked, or rescission announced". */
  groups: { heading: string; note?: string; columns: string[] }[];
  /** What a row and a column are: under the title. */
  introduction: string;
  /** How to read a cell, shown with the legend. */
  reading: string;
  /** Each question's wording and criterion, keyed by law question. */
  questions: Record<LawFacetId, { question: string; criterion: string }>;
  legend: Record<LawCellStatus, string>;
  /** The four rules that decide "partly" (maintainer decision 5a). */
  partlyRules: string[];
  limits: string[];
  /** The collection's scope, stated once ("How we searched"). */
  howWeSearched: string[];
  /** Cells with no record because the question does not arise. */
  notApplicable: { textId: string; facetIds: LawFacetId[]; reason: string }[];
};

/**
 * The collection's records: every text's cells, column by column and text
 * by text in order, then by question; then each column's standing records.
 */
export function lawsComparedClaimIds(data: Dataset, frame: LawsComparedFrame) {
  const texts = new Set(frame.columns.flatMap((c) => c.texts));
  const cells = new Map<string, string>();
  for (const c of data.claims)
    if (texts.has(c.subject) && isLawCell(c))
      cells.set(`${c.subject} ${c.attributes!.provision!.facet!.id}`, c.id);
  for (const c of frame.cited) cells.set(`${c.textId} ${c.facetId}`, c.claimId);
  const ids = frame.columns.flatMap((col) =>
    col.texts.flatMap((t) =>
      lawFacets.flatMap((f) => cells.get(`${t} ${f.id}`) ?? []),
    ),
  );
  const seen = new Set(ids);
  for (const id of frame.columns.flatMap((c) => c.standingClaimIds))
    if (!seen.has(id)) {
      seen.add(id);
      ids.push(id);
    }
  return ids;
}
