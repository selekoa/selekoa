import type { Claim, Dataset, Entity } from './schema';
import { dateOf } from './query';

/** A stopped item: listed for a later decision, never resolved by a record. */
export type StopItem = {
  id: string;
  category: 'legal_effect' | 'conflicting_dates' | 'living_person';
  text: string;
  claimIds: string[];
};

export const stopCategoryLabels: Record<StopItem['category'], string> = {
  legal_effect: 'Needs legal interpretation',
  conflicting_dates: 'Conflicting dates, no decisive source',
  living_person: 'Would go beyond a living person’s documented roles',
};

export type ControlStructureCollection = {
  id: string;
  version: number;
  title: string;
  /** The umbrella atlas identity the page is about. */
  organisationId: string;
  question: string;
  editorialStatus: 'machine-proposed';
  /**
   * Legal entities, bodies and structural documents this page reads. Records
   * touching them with a control, form, formation, conversion, naming or
   * control-assessment predicate are included; publication records only when
   * the published document is listed here, and provisions and version changes
   * only when the document that states them is listed here.
   */
  entityIds: string[];
  /** Other stored records the timeline needs, such as board actions. */
  extraClaimIds: string[];
  introduction: string;
  limits: string[];
  openQuestions: { id: string; text: string; claimIds: string[] }[];
  stops: StopItem[];
};

export const controlRightLabels = {
  controls: 'Controls',
  sole_member: 'Sole member',
  general_partner: 'General partner',
  voting_control: 'Voting control',
  elects_directors: 'Elects directors',
  appoints_directors: 'Appoints directors',
  removes_directors: 'Removes directors',
  approves_amendments: 'Approves amendments',
  veto: 'Veto',
} as const;

export const controlStageLabels = {
  planned: 'Planned',
  announced: 'Announced',
  agreed_in_principle: 'Agreed in principle',
  effective: 'Effective',
} as const;

export type ControlEntryKind =
  | 'control'
  | 'legal_form'
  | 'formation'
  | 'conversion'
  | 'naming'
  | 'board'
  | 'assessment'
  | 'document'
  | 'provision'
  | 'amendment';

export const controlEntryLabels: Record<ControlEntryKind, string> = {
  control: 'Control right',
  legal_form: 'Legal form',
  formation: 'Formation',
  conversion: 'Conversion',
  naming: 'Name change',
  board: 'Board action or role',
  assessment: 'Assessment of control',
  document: 'Structural document',
  provision: 'Provision of a governing document',
  amendment: 'Change between filed versions',
};

const kindOf: Partial<Record<Claim['predicate'], ControlEntryKind>> = {
  holds_control_right: 'control',
  has_legal_form: 'legal_form',
  formed_entity: 'formation',
  converted_into: 'conversion',
  name_transition_announced: 'naming',
  control_assessed: 'assessment',
  published: 'document',
  held_role: 'board',
  departure_announced: 'board',
  states_provision: 'provision',
  changes_from: 'amendment',
};

// Board, trustee and chair roles; a research or policy director is not a
// governance role.
const boardRole = /\bboard\b|\btrustees?\b|^(co-)?chair(man|person|woman)?\b/i;

/** The stage shown for a timeline entry; naming records are announcements. */
export function entryStage(claim: Claim) {
  const stage = claim.attributes?.control?.stage;
  if (stage) return controlStageLabels[stage];
  if (claim.predicate === 'name_transition_announced') return 'Announced';
  return null;
}

/**
 * A dated timeline of one organisation's recorded control structures: who
 * holds which right over which entity, through which instrument, announced
 * or effective, with legal forms, formations, conversions, board actions
 * and assessments of control. It returns stored claims and adds no assertion;
 * in particular it never infers a control chain from adjacent records.
 */
export function controlStructure(
  data: Dataset,
  collection: ControlStructureCollection,
) {
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const organisation = entities.get(collection.organisationId);
  if (!organisation)
    throw new Error('Missing organisation: ' + collection.organisationId);
  const listed = new Set([collection.organisationId, ...collection.entityIds]);
  for (const id of listed)
    if (!entities.has(id)) throw new Error('Missing collection entity: ' + id);
  const extra = new Set(collection.extraClaimIds);
  const objectId = (c: Claim) =>
    c.object.kind === 'entity' ? c.object.entityId : null;
  const included = data.claims.filter((c) => {
    if (extra.has(c.id)) return true;
    const kind = kindOf[c.predicate];
    if (!kind) return false;
    const object = objectId(c);
    if (kind === 'document') return !!object && listed.has(object);
    if (kind === 'provision' || kind === 'amendment')
      return listed.has(c.subject);
    if (kind === 'board')
      return (
        !!object &&
        listed.has(object) &&
        boardRole.test(c.attributes?.role ?? '')
      );
    return listed.has(c.subject) || (!!object && listed.has(object));
  });
  for (const id of extra)
    if (!included.some((c) => c.id === id))
      throw new Error('Missing collection claim: ' + id);
  const entries = included
    .map((claim) => {
      const object = objectId(claim);
      return {
        claim,
        kind: kindOf[claim.predicate] ?? ('board' as ControlEntryKind),
        date: dateOf(claim) ?? null,
        stage: entryStage(claim),
        right: claim.attributes?.control?.right ?? null,
        instrument: claim.attributes?.control?.instrument ?? null,
        subject: entities.get(claim.subject)!,
        object: object ? entities.get(object)! : null,
      };
    })
    .sort(
      (a, b) =>
        (a.date ?? '9999').localeCompare(b.date ?? '9999') ||
        a.claim.id.localeCompare(b.claim.id),
    );
  const years = [
    ...new Set(entries.map((e) => (e.date ? e.date.slice(0, 4) : null))),
  ].map((year) => ({
    year,
    entries: entries.filter(
      (e) => (e.date ? e.date.slice(0, 4) : null) === year,
    ),
  }));
  const parties = collection.entityIds
    .map((id) => entities.get(id)!)
    .filter((e) => e.type !== 'document')
    .map((entity: Entity) => ({
      entity,
      legalForms: entries
        .filter((e) => e.kind === 'legal_form' && e.subject.id === entity.id)
        .map((e) => e.claim),
    }));
  const claimIds = [
    ...new Set([
      ...entries.map((e) => e.claim.id),
      ...collection.openQuestions.flatMap((q) => q.claimIds),
      ...collection.stops.flatMap((s) => s.claimIds),
    ]),
  ];
  const known = new Set(data.claims.map((c) => c.id));
  for (const id of claimIds)
    if (!known.has(id)) throw new Error('Missing collection claim: ' + id);
  return {
    collection,
    organisation,
    parties,
    entries,
    years,
    assessments: entries
      .filter((e) => e.kind === 'assessment')
      .map((e) => e.claim),
    claimIds,
  };
}

export type ControlStructure = ReturnType<typeof controlStructure>;
export type ControlEntry = ControlStructure['entries'][number];
