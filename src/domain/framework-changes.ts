import type { Claim, Dataset, Entity, Evidence } from './schema';
import {
  comparisonDimensions,
  comparisonFacets,
  comparisonView,
  type CellStatus,
  type ComparisonCollection,
} from './framework-comparison';
import { frameworkLabels, versionDate } from './versions';

/**
 * A guided reading of the framework comparison edition by edition: what each
 * edition's cell records on each question, and where two consecutive editions'
 * cells differ. A difference is between recorded cells, never an assessment.
 */
export type FrameworkChangesCollection = {
  id: string;
  version: number;
  title: string;
  question: string;
  editorialStatus: 'machine-proposed';
  /** How to read the page: fixed text that states no record's content. */
  reading: string[];
  notCovered: {
    id: string;
    category: 'scope' | 'archive' | 'held' | 'retrieval';
    text: string;
    claimIds: string[];
  }[];
  limits: string[];
};

export const changesNotCoveredLabels = {
  scope: 'Outside the page’s bounds',
  archive: 'Editions read from archive copies',
  held: 'Held or unchecked cells',
  retrieval: 'Retrieval limits',
} as const;

/** Status wording, as on the comparison page. */
export const statusLabels: Record<CellStatus, string> = {
  stated: 'Stated',
  partly: 'Stated, partly',
  recorded: 'Recorded, not re-checked',
  'not-found': 'Not found in the recorded search',
  'not-checked': 'Not checked',
  'not-applicable': 'Does not apply',
};

/** How two consecutive editions' cells on one question compare. */
export type StepDifference =
  /** The two cells carry different statuses. */
  | 'status'
  /** Same status; the recorded passages are not the same text. */
  | 'passage'
  /** Same status and the same recorded passages, or no passage in either. */
  | 'same'
  /** The question does not apply to the earlier edition. */
  | 'not-applicable';

/** An evidence note saying the passage was read in an Internet Archive capture. */
const archiveNote = /Internet Archive/;

/** Statuses that record a passage meeting the question's criterion. */
export const locatedStatuses: CellStatus[] = ['stated', 'partly'];

/** The date an edition is ordered by, with what kind of date it is. */
export function editionDate(entity: Entity) {
  const v = entity.documentVersion!;
  const date = versionDate(entity) ?? null;
  const kind = v.effectiveAt
    ? 'effective'
    : v.revisedAt
      ? 'revised'
      : v.publishedAt
        ? 'published'
        : null;
  return { date, kind } as const;
}

/**
 * The comparison read edition by edition, computed from the comparison's
 * cells, the editions' version records and their evidence. It adds no claim
 * and gives no reason for any difference.
 */
export function frameworkChangesView(
  data: Dataset,
  collection: FrameworkChangesCollection,
  comparison: ComparisonCollection,
) {
  const compare = comparisonView(data, comparison);
  const claimsById = new Map(data.claims.map((c) => [c.id, c]));
  const evidenceById = new Map(data.evidence.map((e) => [e.id, e]));
  const byEdition = (predicate: Claim['predicate'], id: string) =>
    data.claims
      .filter((c) => c.predicate === predicate && c.subject === id)
      .sort((a, b) => a.id.localeCompare(b.id));

  const cellOf = (edition: Entity, facetId: string) => {
    const { status, claim, reason } = compare.cell(edition.id, facetId);
    const evidence = (claim?.evidenceIds ?? []).map((id) =>
      evidenceById.get(id)!,
    );
    // A recorded absence's evidence is its search record, not a passage.
    const passages: Evidence[] =
      claim?.predicate === 'states_provision' ? evidence : [];
    return { edition, status, claim, reason, passages };
  };
  type Cell = ReturnType<typeof cellOf>;
  const passageText = (cell: Cell) =>
    cell.passages
      .map((e) => `${e.passageType}:${e.passage}`)
      .sort()
      .join('\n');
  const difference = (from: Cell, to: Cell): StepDifference =>
    from.status === 'not-applicable'
      ? 'not-applicable'
      : from.status !== to.status
        ? 'status'
        : passageText(from) !== passageText(to)
          ? 'passage'
          : 'same';

  const families = compare.columns.map((column) => {
    const editions = column.editions.map((entity) => ({
      entity,
      ...editionDate(entity),
      published: data.claims.filter(
        (c) =>
          c.predicate === 'published' &&
          c.object.kind === 'entity' &&
          c.object.entityId === entity.id,
      ),
      replaces: byEdition('supersedes_document', entity.id),
      // Selekoa's records of what changed from the earlier edition. Recorded
      // assessments of a change are left to the document histories page.
      versionChanges: byEdition('changes_from', entity.id).filter(
        (c) => c.attributes?.changeBasis !== 'assessment',
      ),
      // The edition's own statement of its changes (comparison question D8.changes).
      statedChanges: cellOf(entity, 'D8.changes'),
      sources: data.sources
        .filter((s) => s.documentId === entity.id)
        .sort((a, b) => a.id.localeCompare(b.id)),
    }));
    const questions = comparisonFacets.map((facet) => {
      const cells = column.editions.map((e) => cellOf(e, facet.id));
      const steps = cells.slice(1).map((to, i) => ({
        from: cells[i],
        to,
        difference: difference(cells[i], to),
      }));
      return { facet, cells, steps };
    });
    return { ...column, editions, questions };
  });

  // For each question, the earliest compared edition of each framework whose
  // cell records a passage, and the earliest whose cell is "stated".
  const earliest = comparisonFacets.map((facet) => ({
    facet,
    families: families.map((f) => {
      const { cells } = f.questions.find((q) => q.facet.id === facet.id)!;
      const located = cells.find((c) => locatedStatuses.includes(c.status));
      const stated = cells.find((c) => c.status === 'stated');
      return {
        family: f.family,
        label: f.label,
        located: located ?? null,
        // Shown only where the earliest located cell is "stated, partly".
        stated: located?.status === 'partly' ? (stated ?? null) : null,
        // The first compared edition the question applies to records it.
        firstEdition:
          !!located &&
          located === cells.find((c) => c.status !== 'not-applicable'),
        editions: cells.length,
      };
    }),
  }));

  const cellClaims = families.flatMap((f) =>
    f.questions.flatMap((q) => q.cells.flatMap((c) => c.claim ?? [])),
  );
  const claimIds = [
    ...new Set([
      ...families.flatMap((f) =>
        f.editions.flatMap((e) =>
          [...e.published, ...e.replaces, ...e.versionChanges].map((c) => c.id),
        ),
      ),
      ...cellClaims.map((c) => c.id),
      ...collection.notCovered.flatMap((n) => n.claimIds),
    ]),
  ];
  for (const id of claimIds)
    if (!claimsById.has(id)) throw new Error('Missing collection claim: ' + id);
  // Cells whose evidence was read in an archive copy, by edition.
  const archiveCells = families.flatMap((f) =>
    f.editions.flatMap(({ entity }) => {
      const cells = f.questions
        .map((q) => q.cells.find((c) => c.edition === entity)!)
        .filter((c) => c.claim);
      const archived = cells.filter((c) =>
        c.claim!.evidenceIds.some((id) =>
          archiveNote.test(evidenceById.get(id)!.note ?? ''),
        ),
      );
      return archived.length
        ? [{ edition: entity, cells: archived, of: cells.length }]
        : [];
    }),
  );
  const editionCount = families.reduce((n, f) => n + f.editions.length, 0);
  const allDates = families
    .flatMap((f) => f.editions.map((e) => e.date))
    .filter((d): d is string => !!d)
    .sort();
  return {
    collection,
    comparison,
    dimensions: comparisonDimensions,
    families,
    earliest,
    editionCount,
    questionCount: comparisonFacets.length,
    firstDate: allDates[0],
    lastDate: allDates.at(-1)!,
    // Cells the comparison could not check, from its own definition.
    notChecked: comparison.notChecked,
    archiveCells,
    claimIds,
  };
}

export type FrameworkChangesView = ReturnType<typeof frameworkChangesView>;
export type FrameworkChangesFamily = FrameworkChangesView['families'][number];
export type FrameworkChangesQuestion =
  FrameworkChangesFamily['questions'][number];
export type FrameworkChangesCell = FrameworkChangesQuestion['cells'][number];

/** The framework label of a family, as on the comparison page. */
export const familyLabel = (family: string) =>
  frameworkLabels[family] ?? family;
