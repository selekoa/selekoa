import type { Claim, Dataset } from './schema';
import type { Predicate } from './predicates';
import { institutionalDossier } from './dossier';
import { relatedTo, timeLabel, dateOf } from './query';
import { anthropicFormation } from '../reading/anthropic-formation';

export type ReadingPassage = {
  id: string;
  text: string;
  claimIds: string[];
};

/**
 * A reusable research question: the question, one principal reading, optional
 * context branches and their authored passages. "What is disputed" and the
 * open questions are computed from the selected records, the branch limits and
 * the record warnings, so they cannot drift from the stored claims.
 */
export type QuestionSelection = {
  id: string;
  version: number;
  /** Optional anchoring institution: its dossier and map become exits. */
  institutionId?: string;
  title: string;
  question: string;
  editorialStatus: 'machine-proposed';
  introduction: ReadingPassage[];
  sections: {
    id: string;
    kind: 'principal' | 'context';
    title: string;
    description: string;
    gap: string;
    passages: ReadingPassage[];
    /** Record groups in this section; a group without predicates takes the rest. */
    groups?: { title: string; predicates?: Predicate[] }[];
  }[];
  items: {
    claimId: string;
    sectionId: string;
    rationale: string;
    warning?: string;
  }[];
  /** Shown beside the optional branches; says what the branches are not. */
  branchNote?: string;
  /** Authored open questions beyond the branch limits and record warnings. */
  openQuestions?: ReadingPassage[];
};
/** The earlier name of the question format; old imports keep working. */
export type PathSelection = QuestionSelection;
export const researchPaths: readonly QuestionSelection[] = [anthropicFormation];

/** Compare date precision conservatively; a later day in an event year is not
 * enough to call documentation retrospective. No event date is manufactured. */
export function latestPossibleDay(date: string) {
  if (date.length === 4) return date + '-12-31';
  if (date.length === 7) {
    const [year, month] = date.split('-').map(Number);
    return date + '-' + new Date(Date.UTC(year, month, 0)).getUTCDate();
  }
  return date;
}
export function readingDates(data: Dataset, claim: Claim) {
  const date = dateOf(claim);
  const sourceIds = new Set(
    data.evidence
      .filter((e) => claim.evidenceIds.includes(e.id))
      .map((e) => e.sourceId),
  );
  return {
    record:
      timeLabel(claim) +
      (date?.length === 4
        ? ' · year-only precision'
        : date?.length === 7
          ? ' · month-only precision'
          : ''),
    publications: data.sources
      .filter((s) => sourceIds.has(s.id))
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((s) => ({
        sourceId: s.id,
        title: s.title,
        date: s.publicationDate,
        retrospective:
          !!date &&
          claim.time.kind !== 'interval' &&
          !!s.publicationDate &&
          (s.publicationDate.length === 4
            ? s.publicationDate + '-01-01'
            : s.publicationDate.length === 7
              ? s.publicationDate + '-01'
              : s.publicationDate) > latestPossibleDay(date),
      })),
  };
}

/** Resolve the question anchored to an institution, if any (dossier exits). */
export function researchPath(
  data: Dataset,
  institutionId: string,
  selections: readonly QuestionSelection[] = researchPaths,
) {
  const selection = selections.find((s) => s.institutionId === institutionId);
  return selection ? resolveQuestion(data, selection) : null;
}

/** Resolve a question by its own ID. */
export function questionPath(
  data: Dataset,
  id: string,
  selections: readonly QuestionSelection[] = researchPaths,
) {
  const selection = selections.find((s) => s.id === id);
  return selection ? resolveQuestion(data, selection) : null;
}

/** Resolve selection metadata to original validated objects, not copied facts. */
export function resolveQuestion(data: Dataset, selection: QuestionSelection) {
  const institutionId = selection.institutionId;
  const dossier = institutionId
    ? institutionalDossier(data, institutionId)
    : null;
  if (institutionId && !dossier)
    throw new Error('Invalid path institution: ' + institutionId);
  // An anchored question reads only records in its institution's dossier.
  const claims = new Map(
    (dossier?.claims ?? data.claims).map((c) => [c.id, c]),
  );
  const ids = new Set(selection.items.map((i) => i.claimId));
  if (!ids.size || ids.size !== selection.items.length)
    throw new Error('A reading path must contain distinct claim IDs');
  const sections = new Map(selection.sections.map((s) => [s.id, s]));
  if (
    sections.size !== selection.sections.length ||
    selection.sections.filter((s) => s.kind === 'principal').length !== 1
  )
    throw new Error(
      'A reading path needs exactly one principal section and distinct branches',
    );
  const items = selection.items.map((item) => {
    const claim = claims.get(item.claimId);
    const section = sections.get(item.sectionId);
    if (!claim || !section)
      throw new Error('Invalid reading selection: ' + item.claimId);
    return {
      ...item,
      claim,
      section,
      dates: readingDates(data, claim),
      context:
        institutionId && relatedTo(claim, institutionId)
          ? 'Direct institutional evidence'
          : claim.topic === 'people'
            ? 'Separate personnel context'
            : 'Documentary relation',
    };
  });
  if (selection.sections.some((s) => !items.some((i) => i.sectionId === s.id)))
    throw new Error('Empty reading branch');
  const passages = [
    ...selection.introduction,
    ...selection.sections.flatMap((s) => s.passages),
    ...(selection.openQuestions ?? []),
  ];
  if (
    new Set(passages.map((p) => p.id)).size !== passages.length ||
    passages.some(
      (p) =>
        !p.id.trim() ||
        !p.text.trim() ||
        !p.claimIds.length ||
        new Set(p.claimIds).size !== p.claimIds.length ||
        p.claimIds.some((id) => !ids.has(id)),
    )
  )
    throw new Error('Invalid reading passage support');
  const evidence = data.evidence.filter((e) => ids.has(e.claimId));
  return {
    ...selection,
    institution: dossier?.institution ?? null,
    items,
    totalClaims: dossier?.claims.length ?? null,
    disputed: {
      claims: items
        .map((i) => i.claim)
        .filter((c) => c.resolution !== 'supported'),
      counterevidence: evidence.filter((e) => e.support === 'contradicts'),
    },
    openQuestionList: [
      ...(selection.openQuestions ?? []).map((q) => ({
        ...q,
        source: 'authored' as const,
        sectionId: null,
      })),
      // Each branch limit, followed by that branch's record warnings.
      ...selection.sections.flatMap((s) => [
        {
          id: 'limit-' + s.id,
          text: s.gap,
          claimIds: items
            .filter((i) => i.sectionId === s.id)
            .map((i) => i.claimId),
          source: 'branch-limit' as const,
          sectionId: s.id,
        },
        ...items
          .filter((i) => i.sectionId === s.id && i.warning)
          .map((i) => ({
            id: 'warning-' + i.claimId,
            text: i.warning!,
            claimIds: [i.claimId],
            source: 'record-warning' as const,
            sectionId: s.id,
          })),
      ]),
    ],
  };
}
export type ResearchPath = ReturnType<typeof resolveQuestion>;
/** Old bookmarks still resolve by ID after regrouping; order is not identity. */
export function readingPosition(path: ResearchPath, claimId?: string | null) {
  const index = path.items.findIndex((item) => item.claimId === claimId);
  return index < 0
    ? path.items.findIndex((i) => i.section.kind === 'principal')
    : index;
}
