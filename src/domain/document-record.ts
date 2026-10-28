import { comparisonFacets, isComparisonCell } from './framework-comparison';
import type { Claim, Dataset } from './schema';
import type { Predicate } from './predicates';
import { dateOf, relatedTo } from './query';
import { familyHistory } from './document-history';

/**
 * Document-to-document and document-to-actor relations, each shown as its own
 * labelled list in both directions where the schema allows. A later relation
 * (for example an explicit reply) is one more row here, not a new page type.
 */
export const documentRelations: readonly {
  id: string;
  predicate: Predicate;
  direction: 'outgoing' | 'incoming';
  label: string;
  note: string;
  /** Listed only when present, not among the relations a document lacks. */
  onlyWhenPresent?: boolean;
}[] = [
  {
    id: 'cites',
    predicate: 'cites',
    direction: 'outgoing',
    label: 'Cites',
    note: 'Explicit references in this document. Citation is neither agreement nor influence.',
  },
  {
    id: 'cited-by',
    predicate: 'cites',
    direction: 'incoming',
    label: 'Cited by',
    note: 'Recorded documents that explicitly reference this one. A citation to a work does not identify which version was read.',
  },
  {
    id: 'credits',
    predicate: 'explicitly_credits',
    direction: 'outgoing',
    label: 'Explicitly credits',
    note: 'People or institutions this document expressly credits, with the scope stated in each record.',
  },
  {
    id: 'uses-method-from',
    predicate: 'uses_method_from',
    direction: 'outgoing',
    label: 'Reports using a method from',
    note: 'Methods this document reports using in its own study. Reported use is not independently verified implementation.',
  },
  {
    id: 'method-used-by',
    predicate: 'uses_method_from',
    direction: 'incoming',
    label: 'Method reported as used by',
    note: 'Recorded documents that report using a method from this one.',
  },
  {
    id: 'applies',
    predicate: 'applies_framework',
    direction: 'outgoing',
    label: 'Applies parts of',
    note: 'Partial application only; not succession or wholesale adoption.',
  },
  {
    id: 'applied-by',
    predicate: 'applies_framework',
    direction: 'incoming',
    label: 'Parts applied by',
    note: 'Recorded documents that apply parts of this one.',
  },
  {
    id: 'discusses',
    predicate: 'discusses',
    direction: 'outgoing',
    label: 'Discusses',
    note: 'Concepts explicitly discussed. No earliest use, invention or transmission is claimed.',
  },
  {
    id: 'articulates',
    predicate: 'articulates_proposition',
    direction: 'outgoing',
    label: 'Articulates',
    note: 'Propositions whose criterion a passage of this document meets. The record says what the text states, in its register; it is not evidence that the proposition is true.',
    onlyWhenPresent: true,
  },
  {
    id: 'contests',
    predicate: 'contests_proposition',
    direction: 'outgoing',
    label: 'Contests',
    note: 'Propositions a passage of this document disputes, or a premise they depend on.',
    onlyWhenPresent: true,
  },
  {
    id: 'bears-on',
    predicate: 'bears_on_proposition',
    direction: 'outgoing',
    label: 'Bears on',
    note: 'Propositions a passage comes close to without meeting the criterion; each record names what is missing.',
    onlyWhenPresent: true,
  },
  {
    id: 'evaluates',
    predicate: 'reports_evaluation_of',
    direction: 'outgoing',
    label: 'Reports evaluation of',
    note: 'Evaluation categories named in the document, not findings that a system has the property.',
  },
];

const byDate = (a: Claim, b: Claim) =>
  (dateOf(a) ?? '9999').localeCompare(dateOf(b) ?? '9999') ||
  a.id.localeCompare(b.id);
const targets = (c: Claim, id: string) =>
  c.object.kind === 'entity' && c.object.entityId === id;

/**
 * A document's record: identity, issuing and authorship claims, dates with
 * their stated basis, exact source expressions, its version family (shared
 * with document histories) and every other stored relation. Nothing is added.
 */
export function documentRecord(data: Dataset, documentId: string) {
  const document = data.entities.find(
    (e) => e.id === documentId && e.type === 'document',
  );
  if (!document) return null;
  const sources = new Map(data.sources.map((s) => [s.id, s]));
  const related = data.claims.filter((c) => relatedTo(c, documentId));
  const incoming = (predicate: Predicate) =>
    related
      .filter((c) => c.predicate === predicate && targets(c, documentId))
      .sort(byDate);
  const issued = incoming('published');
  const authored = incoming('authored');
  const supported = incoming('supported_research');
  const relations = documentRelations.map((r) => ({
    ...r,
    claims: related
      .filter(
        (c) =>
          c.predicate === r.predicate &&
          (r.direction === 'outgoing'
            ? c.subject === documentId
            : targets(c, documentId)),
      )
      .sort(byDate),
  }));
  const version = document.documentVersion;
  const family = version ? familyHistory(data, version.family) : null;
  const edition = family?.editions.find((e) => e.entity.id === documentId);
  // Deltas recorded by a later version against this one.
  const laterChanges = edition
    ? related
        .filter((c) => c.predicate === 'changes_from' && targets(c, documentId))
        .sort(byDate)
    : [];
  const familyClaims = edition
    ? [
        ...edition.issued,
        ...edition.replaces,
        ...edition.replacedBy,
        ...edition.changes,
        ...edition.provisions,
        ...edition.absences,
        ...edition.assessments,
        ...laterChanges,
      ]
    : [];
  const shown = new Set(
    [
      ...issued,
      ...authored,
      ...supported,
      ...relations.flatMap((r) => r.claims),
      ...familyClaims,
    ].map((c) => c.id),
  );
  // Comparison cells (schema 2.17) have their own section.
  const facetOrder = comparisonFacets.map((f) => f.id);
  const comparison = related
    .filter((c) => !shown.has(c.id) && isComparisonCell(c))
    .sort(
      (a, b) =>
        facetOrder.indexOf(a.attributes!.provision!.facet!.id) -
        facetOrder.indexOf(b.attributes!.provision!.facet!.id),
    );
  const other = related
    .filter((c) => !shown.has(c.id) && !isComparisonCell(c))
    .sort(byDate);
  /** Distinct dated bases from issuing and authorship claims, never inferred. */
  const claimDates = [...issued, ...authored].reduce<
    { date: string; basis: string; claimIds: string[] }[]
  >((dates, c) => {
    const time = c.time;
    if (time.kind !== 'event' && time.kind !== 'snapshot') return dates;
    const basis =
      time.kind === 'snapshot' ? 'snapshot' : (time.basis ?? 'event');
    const found = dates.find((d) => d.date === time.date && d.basis === basis);
    if (found) found.claimIds.push(c.id);
    else dates.push({ date: time.date, basis, claimIds: [c.id] });
    return dates;
  }, []);
  return {
    document,
    identitySources: document.sourceIds.map((id) => sources.get(id)!),
    exactSources: data.sources
      .filter((s) => s.documentId === documentId)
      .sort((a, b) => a.id.localeCompare(b.id)),
    issued,
    authored,
    supported,
    claimDates,
    family,
    edition,
    laterChanges,
    relations,
    comparison,
    other,
  };
}

export type DocumentRecord = NonNullable<ReturnType<typeof documentRecord>>;
