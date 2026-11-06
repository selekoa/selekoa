/**
 * The page's reading of law cells (schema 2.31): the table as columns
 * (instruments) by rows (questions), status names, a recorded absence's
 * search and the shared sentences a page states once. Loaded with the page
 * and by the build's CSV file; shared code holds only ./law-comparison.ts.
 */
import type { Claim, Dataset } from './schema';
import { isLawCell, lawFacets } from './law-questions';
import {
  lawsComparedClaimIds,
  type LawCellStatus,
  type LawColumn,
  type LawsComparedCollection,
} from './law-comparison';

export type LawCell = {
  status: LawCellStatus;
  claim: Claim | null;
  /** Why the question does not arise, for a cell with no record. */
  reason: string | null;
};

/**
 * The comparison computed from stored claims. `editions` names texts to show
 * in place of a column's latest (New York's 2025 text). A cell never counts,
 * scores or ranks.
 */
export function lawsComparedView(
  data: Dataset,
  collection: LawsComparedCollection,
  editions: readonly string[] = [],
) {
  const claims = new Map(data.claims.map((c) => [c.id, c]));
  // Columns carry record IDs only: a page names texts and standing records
  // by their IDs, so its slice need not hold them (src/prerender/trace.ts).
  // checkLawsCompared, below, checks them against the dataset.
  const columns = collection.columns.map((column) => {
    const chosen = column.texts.find((t) => editions.includes(t));
    const latest = column.texts.at(-1)!;
    return {
      column,
      texts: column.texts,
      text: chosen ?? latest,
      /** Whether the reader chose an earlier text than the latest. */
      earlier: !!chosen && chosen !== latest,
      standing: column.standingClaimIds,
    };
  });
  // Cells are read only on claims about the texts compared, chosen by their
  // subject (src/prerender/trace.ts).
  const shown = new Set(collection.columns.flatMap((c) => c.texts));
  const cells = new Map<string, Claim>();
  for (const c of data.claims)
    if (shown.has(c.subject) && isLawCell(c))
      cells.set(`${c.subject} ${c.attributes!.provision!.facet!.id}`, c);
  const cited = new Map(
    collection.cited.map((c) => [`${c.textId} ${c.facetId}`, c]),
  );
  const cell = (textId: string, facetId: string): LawCell => {
    const claim = cells.get(`${textId} ${facetId}`);
    if (claim)
      return {
        status:
          claim.predicate === 'provision_not_found'
            ? 'not-found'
            : (claim.attributes!.provision!.facet!.status as
                'stated' | 'partly'),
        claim,
        reason: null,
      };
    const citation = cited.get(`${textId} ${facetId}`);
    if (citation) {
      const record = claims.get(citation.claimId);
      if (!record) throw new Error('No cited record: ' + citation.claimId);
      return { status: citation.status, claim: record, reason: null };
    }
    const inapplicable = collection.notApplicable.find(
      (n) => n.textId === textId && (n.facetIds as string[]).includes(facetId),
    );
    if (!inapplicable)
      throw new Error(`No law record for ${textId} ${facetId}`);
    return {
      status: 'not-applicable',
      claim: null,
      reason: inapplicable.reason,
    };
  };
  const groups = collection.groups.map((g) => ({
    ...g,
    columns: g.columns.map((id) => {
      const col = columns.find((c) => c.column.id === id);
      if (!col) throw new Error('Unknown column: ' + id);
      return col;
    }),
  }));
  return {
    collection,
    facets: lawFacets,
    columns,
    groups,
    cell,
    claimIds: lawsComparedClaimIds(data, collection),
  };
}
export type LawsComparedView = ReturnType<typeof lawsComparedView>;

/**
 * Problems with a collection against the dataset: a text that is not a
 * version of its column's family, a missing standing record.
 */
export function checkLawsCompared(
  data: Dataset,
  collection: LawsComparedCollection,
) {
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const claims = new Set(data.claims.map((c) => c.id));
  const problems: string[] = [];
  for (const column of collection.columns) {
    for (const id of column.texts) {
      const text = entities.get(id);
      if (
        text?.type !== 'document' ||
        text.documentVersion?.family !== column.family
      )
        problems.push(`Not a text of ${column.family}: ${id}`);
    }
    for (const id of column.standingClaimIds)
      if (!claims.has(id)) problems.push('No standing record: ' + id);
  }
  return problems;
}
export type LawViewColumn = LawsComparedView['columns'][number];

/** Sentences every law cell's qualification carries; a page states them once. */
export const lawStandingText = {
  stated:
    'What the instrument’s text states, from the expression read. A cell records what the text requires of the parties it defines: not whether any developer falls within them, or complied.',
  partly:
    'Stated, partly: the passage has what the question’s criterion asks for, in a weaker form than the criterion’s own words.',
  paraphrased:
    'Paraphrased with its locator, not quoted: quoting it would pass the source’s quotation limit, or the source’s length is not known.',
  absent:
    'A recorded absence within the stated scope of the text read: not evidence that the instrument lacks such a provision elsewhere, or that no other law imposes one.',
};

/** A law cell's own note: its qualification without the shared sentences. */
export function lawCellNote(claim: Claim) {
  let note = claim.qualification;
  for (const text of Object.values(lawStandingText))
    note = note.replace(text, '');
  return note.replace(/\s{2,}/g, ' ').trim();
}

/** The reader's name for each status, on the pages and in the CSV file. */
export const lawStatusLabels: Record<LawCellStatus, string> = {
  stated: 'Stated',
  partly: 'Stated, partly',
  'not-found': 'Not found in the recorded search',
  'not-applicable': 'Does not apply',
};

/** The same, short enough for a cell of the table. */
export const lawStatusShort: Record<LawCellStatus, string> = {
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
export function lawSearchRecord(claim: Claim) {
  const m =
    /The inspected scope of .*? was: (.*?) Terms searched: (.*?)(?: Passages read and not counted: (.*))? The conclusion is bounded by that scope and method\.$/s.exec(
      claim.inferenceRationale ?? '',
    );
  return m ? { scope: m[1], terms: m[2], setAside: m[3] ?? null } : null;
}

/** A column's name with the text shown, for a cell's accessible label. */
export const columnName = (col: { column: LawColumn; text: string }) =>
  col.column.textLabels && col.column.texts.length > 1
    ? `${col.column.label} (${col.column.textLabels[col.column.texts.indexOf(col.text)]})`
    : col.column.label;
