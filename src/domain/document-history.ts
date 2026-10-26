import type { Claim, Dataset, Entity } from './schema';
import { frameworkLabels, frameworkVersions } from './versions';

export type DocumentHistoryCollection = {
  id: string;
  version: number;
  title: string;
  question: string;
  editorialStatus: 'machine-proposed';
  families: string[];
  introduction: string;
  limits: string[];
  openQuestions: {
    id: string;
    family: string;
    text: string;
    claimIds: string[];
  }[];
};

export type EditionGap = 'no-recorded-predecessor' | 'no-recorded-change';

export const editionGapText: Record<EditionGap, string> = {
  'no-recorded-predecessor':
    'No record yet says which earlier edition, if any, this edition replaced.',
  'no-recorded-change':
    'No change from the previous edition is recorded yet. That does not mean nothing changed.',
};

const relationOrder = (a: Claim, b: Claim) => a.id.localeCompare(b.id);

/** Display order of provision kinds: what triggers, what follows, who decides, exceptions. */
export const provisionKinds = [
  'threshold',
  'required_action',
  'decision_authority',
  'exception',
] as const;
export type ProvisionKind = (typeof provisionKinds)[number];
export const provisionKindLabels: Record<ProvisionKind, string> = {
  threshold: 'Threshold or trigger',
  required_action: 'Required action',
  decision_authority: 'Who decides',
  exception: 'Exception',
};
export const partyRoleLabels = {
  decides: 'Decides',
  recommends: 'Recommends',
  can_overrule: 'Can overrule',
  informed: 'Informed',
  consulted: 'Consulted',
} as const;
const provisionOrder = (a: Claim, b: Claim) =>
  provisionKinds.indexOf(a.attributes!.provision!.kind) -
    provisionKinds.indexOf(b.attributes!.provision!.kind) ||
  a.attributes!.provision!.key.localeCompare(b.attributes!.provision!.key);
const targets = (c: Claim, id: string) =>
  c.object.kind === 'entity' && c.object.entityId === id;

/**
 * One version family: its exact editions, oldest first, and the stored claims
 * that describe each edition. Replacement exists only where a
 * supersedes_document claim records it; date order never implies it.
 */
export function familyHistory(
  data: Dataset,
  family: string,
  openQuestions: DocumentHistoryCollection['openQuestions'] = [],
) {
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const versions = frameworkVersions(data, family);
  if (!versions.length) throw new Error('Empty framework family: ' + family);
  const publisher = entities.get(versions[0].documentVersion!.publisherId)!;
  const referent = entities.get(family);
  const editions = versions.map((entity, index) => {
    const about = (predicate: Claim['predicate']) =>
      data.claims
        .filter((c) => c.predicate === predicate && c.subject === entity.id)
        .sort(relationOrder);
    const issued = data.claims
      .filter((c) => c.predicate === 'published' && targets(c, entity.id))
      .sort(relationOrder);
    const replaces = about('supersedes_document');
    const changes = about('changes_from');
    const provisions = about('states_provision').sort(provisionOrder);
    const absences = about('provision_not_found').sort(provisionOrder);
    // Disputed assessments of a stated provision, kept apart from its text.
    const assessments = about('provision_assessed').sort(provisionOrder);
    const gaps: EditionGap[] = [];
    if (index > 0 && !replaces.length) gaps.push('no-recorded-predecessor');
    if (index > 0 && !changes.length) gaps.push('no-recorded-change');
    return {
      entity,
      issued,
      replaces,
      replacedBy: data.claims
        .filter(
          (c) => c.predicate === 'supersedes_document' && targets(c, entity.id),
        )
        .sort(relationOrder),
      changes,
      provisions,
      absences,
      assessments,
      applies: about('applies_framework'),
      credits: about('explicitly_credits'),
      // The edition's own statements that it fulfils or responds to an
      // external commitment or law; never evidence of compliance.
      commitmentLinks: about('references_commitment'),
      sources: data.sources
        .filter((s) => s.documentId === entity.id)
        .sort((a, b) => a.id.localeCompare(b.id)),
      gaps,
    };
  });
  /**
   * Each distinct wording of a keyed provision, with the editions it comes
   * from, oldest first. Stated provisions give the wording; where no edition
   * states the provision, the recorded absences do. A row label taken from
   * one edition is never shown over another edition's cell.
   */
  const provisionWordings = (list: typeof editions, key: string) => {
    const of = (claims: (e: (typeof list)[number]) => Claim[]) =>
      list.flatMap((e) =>
        claims(e)
          .filter((c) => c.attributes!.provision!.key === key)
          .map((c) => ({
            label: c.object.kind === 'literal' ? String(c.object.value) : key,
            editionId: e.entity.id,
          })),
      );
    const stated = of((e) => e.provisions);
    const wordings: { label: string; editionIds: string[] }[] = [];
    for (const { label, editionId } of stated.length
      ? stated
      : of((e) => e.absences)) {
      const found = wordings.find((w) => w.label === label);
      if (found) found.editionIds.push(editionId);
      else wordings.push({ label, editionIds: [editionId] });
    }
    return wordings;
  };
  // Provision keys in reading order, with each edition's stored record for
  // that key: a stated provision, a recorded absence, or nothing recorded.
  const keyed = new Map<string, { kind: ProvisionKind; label: string }>();
  for (const e of editions)
    for (const c of [...e.provisions, ...e.absences]) {
      const p = c.attributes!.provision!;
      keyed.set(p.key, {
        kind: p.kind,
        label: c.object.kind === 'literal' ? String(c.object.value) : p.key,
      });
    }
  const provisionKeys = [...keyed.entries()]
    .sort(
      ([ka, a], [kb, b]) =>
        provisionKinds.indexOf(a.kind) - provisionKinds.indexOf(b.kind) ||
        ka.localeCompare(kb),
    )
    .map(([key, { kind, label }]) => ({
      key,
      kind,
      label,
      wordings: provisionWordings(editions, key),
      editions: editions.map((e) => ({
        editionId: e.entity.id,
        stated:
          e.provisions.find((c) => c.attributes!.provision!.key === key) ??
          null,
        absent:
          e.absences.find((c) => c.attributes!.provision!.key === key) ?? null,
        assessed: e.assessments.filter(
          (c) => c.attributes!.provision!.key === key,
        ),
      })),
    }));
  return {
    family,
    label: frameworkLabels[family] ?? family,
    publisher,
    provisionKeys,
    referent: referent as Entity | undefined,
    referentClaims: referent
      ? data.claims.filter((c) => targets(c, referent.id)).sort(relationOrder)
      : [],
    editions,
    openQuestions: openQuestions.filter((q) => q.family === family),
  };
}

/**
 * Pure projection of exact framework editions and the stored claims that
 * describe them. It returns original Claim objects and adds no assertion.
 */
export function documentHistory(
  data: Dataset,
  collection: DocumentHistoryCollection,
) {
  const families = collection.families.map((family) =>
    familyHistory(data, family, collection.openQuestions),
  );
  const claimIds = [
    ...new Set(
      families.flatMap((f) => [
        ...f.editions.flatMap((e) =>
          [
            ...e.issued,
            ...e.replaces,
            ...e.changes,
            ...e.provisions,
            ...e.absences,
            ...e.assessments,
            ...e.applies,
            ...e.credits,
            ...e.commitmentLinks,
          ].map((c) => c.id),
        ),
        ...f.referentClaims.map((c) => c.id),
        ...f.openQuestions.flatMap((q) => q.claimIds),
      ]),
    ),
  ];
  const known = new Set(data.claims.map((c) => c.id));
  for (const id of claimIds)
    if (!known.has(id)) throw new Error('Missing collection claim: ' + id);
  return { collection, families, claimIds };
}

export type DocumentHistory = ReturnType<typeof documentHistory>;
export type FamilyHistory = ReturnType<typeof familyHistory>;
export type EditionHistory = FamilyHistory['editions'][number];

/** The date an edition is identified by, with its kind; never inferred. */
export function editionAnchorDate(entity: Entity) {
  const v = entity.documentVersion!;
  if (v.effectiveAt) return { kind: 'effective', date: v.effectiveAt } as const;
  if (v.revisedAt) return { kind: 'revised', date: v.revisedAt } as const;
  if (v.publishedAt) return { kind: 'published', date: v.publishedAt } as const;
  return null;
}

const dayValue = (date: string) => {
  const [y, m = 1, d = 1] = date.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
};

/**
 * Positions each edition on a fixed calendar span (0 = 1 January of `from`,
 * 1 = 31 December of `to`). Editions without an established date are listed
 * as undated rather than placed.
 */
export function editionTimeline(
  history: DocumentHistory,
  from: number,
  to: number,
) {
  const start = Date.UTC(from, 0, 1);
  const span = Date.UTC(to + 1, 0, 1) - start;
  return history.families.map((f) => ({
    family: f.family,
    label: f.label,
    marks: f.editions.flatMap((e) => {
      const anchor = editionAnchorDate(e.entity);
      if (!anchor) return [];
      const position = (dayValue(anchor.date) - start) / span;
      if (position < 0 || position >= 1)
        throw new Error('Edition outside timeline span: ' + e.entity.id);
      return [
        {
          id: e.entity.id,
          label: e.entity.documentVersion!.label,
          ...anchor,
          position,
        },
      ];
    }),
    undated: f.editions
      .filter((e) => !editionAnchorDate(e.entity))
      .map((e) => e.entity.id),
  }));
}

export function editionDates(entity: Entity) {
  const v = entity.documentVersion!;
  return [
    ['Published', v.publishedAt],
    ['Effective', v.effectiveAt],
    ['Revised', v.revisedAt],
  ] as const;
}
