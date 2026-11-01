import type { Claim, Dataset, Entity } from './schema';

/**
 * A guided reading of the compute, power and chip records: a timeline built
 * from the records' own dates, the stated targets kept apart from it, and the
 * records by section with each figure as its source states it. Every date,
 * figure and label on the page is computed from the records listed in the
 * definition; the definition's text adds no claim.
 */
export type ComputeBuildoutCollection = {
  id: string;
  version: number;
  title: string;
  question: string;
  editorialStatus: 'machine-proposed';
  /** The calendar years the timeline covers, inclusive. */
  period: { from: number; to: number };
  /** Which records the page draws on, in one or two sentences. */
  bounds: string;
  /** Short passages, each resting on the records it names. */
  orientation: { id: string; text: string; claimIds: string[] }[];
  sections: {
    id: string;
    title: string;
    /** A short label for timeline rows. */
    tag: string;
    note?: string;
    groups: { id: string; heading: string; claimIds: string[] }[];
  }[];
  /**
   * The propositions collection on compute in orbit, linked from the orbit
   * section, not repeated.
   */
  orbit: { sectionId: string; collectionId: string; text: string };
  notCovered: {
    id: string;
    category: keyof typeof computeNotCoveredLabels;
    text: string;
    claimIds: string[];
  }[];
  limits: string[];
};

export const computeNotCoveredLabels = {
  scope: 'Outside the page’s bounds',
  held: 'Held at admission',
  retrieval: 'Retrieval limits',
  coding: 'How figures were coded',
} as const;

/** What kind of record a row is, from its predicate. */
const kindLabels: Partial<Record<Claim['predicate'], string>> = {
  announced_site: 'Site announced',
  plans_capacity: 'Capacity stated in a plan',
  compute_capacity: 'Compute capacity commitment',
  status_stated: 'Status stated',
  plans_infrastructure_spend: 'Spending plan',
  power_agreement: 'Power agreement',
  regulator_decision: 'Regulator decision',
  announced_plan: 'Plan announced',
  supply_agreement: 'Supply agreement',
  government_award: 'Government award',
  granted_equity_right: 'Equity right granted',
  investment_announced: 'Investment announced',
  invested_in: 'Investment',
  cloud_terms: 'Cloud commitment',
  published: 'Text issued or published',
  enacted: 'Text signed or issued',
  states_provision: 'Provision',
  revoked: 'Revocation',
  cites: 'Text names another text',
  designated_zone: 'Zone designated',
  launch_stated: 'Launch stated',
  filed_application: 'Application filed',
  accepted_for_filing: 'Accepted for filing',
  uses_hardware_from: 'Hardware stated',
};

export const recordKind = (claim: Claim) =>
  kindLabels[claim.predicate] ?? claim.predicate.replaceAll('_', ' ');

const stageLabels: Record<string, string> = {
  announced: 'announced',
  planned: 'plan',
  committed: 'commitment',
  contracted: 'contract',
  letter_of_intent: 'letter of intent',
  term_sheet: 'term sheet',
  closed: 'closed',
  operational: 'stated as in production',
  preliminary: 'preliminary award',
  final: 'final award',
  disbursed: 'disbursed',
};

/** The stage a record states, with the source's own words where kept. */
export function recordStage(claim: Claim) {
  const a = claim.attributes;
  const stage = a?.awardStage ?? a?.transactionStage;
  const label = stage
    ? (stageLabels[stage] ?? stage.replaceAll('_', ' '))
    : null;
  if (a?.stageWording)
    return label ? `${label} (as worded: “${a.stageWording}”)` : a.stageWording;
  return label;
}

const boundLabels: Record<string, string> = {
  exact: 'as stated, with no bound',
  up_to: 'up to',
  at_least: 'at least',
  approximate: 'about',
  more_than: 'more than',
  less_than: 'less than',
};

export const measureLabels: Record<string, string> = {
  it_capacity: 'IT capacity',
  facility_power: 'facility power',
  grid_connection: 'power delivered to the grid',
  generation_capacity: 'generation capacity',
  contracted_energy: 'contracted energy',
  chips: 'number of chips',
  not_stated: 'not stated',
};

const scopeLabels: Record<string, string> = {
  transaction: 'one transaction',
  round_total: 'a round’s total, not one investor’s share',
  cumulative: 'cumulative',
  project: 'one project',
  programme: 'a programme',
};

/** A power figure: megawatts or gigawatts in the unit's own wording. */
const powerUnit = /^(MW|GW|MWe|MWs|megawatt|gigawatt)/i;

const number = (n: number) => n.toLocaleString('en-GB');

/** A whole amount in billions where it is exact to three decimals, else in full. */
function money(value: number, currency: string) {
  const billions = value / 1e9;
  if (
    value >= 1e9 &&
    Math.abs(billions * 1000 - Math.round(billions * 1000)) < 1e-6
  )
    return `${currency} ${number(billions)} billion`;
  return `${currency} ${number(value)}`;
}

export type ComputeFigure = {
  key: string;
  kind: 'quantity' | 'amount';
  /** The figure with its unit as stored; never converted. */
  value: string;
  bound: string;
  /** What a power figure measures; null for amounts and counts. */
  measures: string | null;
  /** An amount's scope, with its stated basis. */
  scope: string | null;
};

/** The figures a record states, one per stored figure, as stored. */
export function recordFigures(claim: Claim): ComputeFigure[] {
  const a = claim.attributes;
  const figures: ComputeFigure[] = [];
  if (a?.quantity) {
    const q = a.quantity;
    const value = q.range
      ? `${number(q.range.from)}–${number(q.range.to)}`
      : number(q.value);
    figures.push({
      key: `${claim.id}-quantity`,
      kind: 'quantity',
      value: `${value} ${q.unit}`,
      bound: q.range
        ? 'a range'
        : q.bound
          ? boundLabels[q.bound]
          : 'not stated',
      measures: q.measures
        ? measureLabels[q.measures]
        : powerUnit.test(q.unit)
          ? measureLabels.not_stated
          : null,
      scope: null,
    });
  }
  if (a?.amount) {
    const m = a.amount;
    figures.push({
      key: `${claim.id}-amount`,
      kind: 'amount',
      value: money(m.value, m.currency),
      bound: boundLabels[m.bound],
      measures: null,
      scope:
        scopeLabels[m.scope] +
        (m.scopeNote && m.scopeNote !== 'investor_commitment'
          ? `: ${m.scopeNote}`
          : m.scopeNote === 'investor_commitment'
            ? ': this investor’s commitment'
            : ''),
    });
  }
  return figures;
}

const statedKindLabels: Record<string, string> = {
  target_operation: 'Operation target',
  target_completion: 'Completion target',
  construction_start_target: 'Construction start target',
  delivery_target: 'Delivery target',
  launch_target: 'Launch target',
  deadline: 'Deadline',
  contract_term: 'Contract runs until',
  construction_start_stated: 'Construction start reported',
  operational_stated: 'Operation start reported',
};

export type ComputeStatedDate = {
  key: string;
  claim: Claim;
  kind: string;
  /** The date at the precision stated, or null where only wording is kept. */
  date: string | null;
  wording: string | null;
  statedBy: string;
  note: string | null;
  sectionId: string;
};

export type ComputeRecord = {
  claim: Claim;
  kind: string;
  stage: string | null;
  date: string | null;
  precision: 'year' | 'month' | 'day' | null;
  /** A snapshot is one dated report of a state. */
  snapshot: boolean;
  basis: string | null;
  announcement: boolean;
  figures: ComputeFigure[];
  statedDates: ComputeStatedDate[];
  sectionId: string;
  groupId: string;
  /** The parties named, subject first. */
  parties: string[];
};

const precisionOf = (date: string) =>
  date.length === 4 ? 'year' : date.length === 7 ? 'month' : 'day';

export const entityLabel = (e: Entity) => e.shortName ?? e.name;

export function computeBuildoutView(
  data: Dataset,
  collection: ComputeBuildoutCollection,
) {
  const claims = new Map(data.claims.map((c) => [c.id, c]));
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const name = (id: string) => {
    const e = entities.get(id);
    return e ? entityLabel(e) : id;
  };
  const record = (
    claim: Claim,
    sectionId: string,
    groupId: string,
  ): ComputeRecord => {
    const time = claim.time;
    const date =
      time.kind === 'event' || time.kind === 'snapshot' ? time.date : null;
    return {
      claim,
      kind: recordKind(claim),
      stage: recordStage(claim),
      date,
      precision: date ? precisionOf(date) : null,
      snapshot: time.kind === 'snapshot',
      // A filing is dated by the filing date as the regulator lists it.
      basis:
        time.kind === 'event'
          ? (time.basis ??
            (claim.predicate === 'filed_application' ? 'filing' : null))
          : null,
      announcement: time.kind === 'event' && time.basis === 'announcement',
      figures: recordFigures(claim),
      statedDates: (claim.attributes?.statedDates ?? []).map((d, i) => ({
        key: `${claim.id}-stated-${i}`,
        claim,
        kind: statedKindLabels[d.kind] ?? d.kind.replaceAll('_', ' '),
        date: d.date ?? null,
        wording: d.wording ?? null,
        statedBy: name(d.statedBy),
        note: d.note ?? null,
        sectionId,
      })),
      sectionId,
      groupId,
      parties: [
        name(claim.subject),
        ...(claim.object.kind === 'entity'
          ? [name(claim.object.entityId)]
          : []),
      ],
    };
  };
  const byDate = (a: ComputeRecord, b: ComputeRecord) =>
    (a.date ?? '9999').localeCompare(b.date ?? '9999') ||
    a.claim.id.localeCompare(b.claim.id);
  const sections = collection.sections.map((s) => ({
    ...s,
    groups: s.groups.map((g) => ({
      ...g,
      records: g.claimIds
        .map((id) => {
          const claim = claims.get(id);
          if (!claim) throw new Error(`${collection.id}: no claim ${id}`);
          return record(claim, s.id, g.id);
        })
        .sort(byDate),
    })),
  }));
  const records = sections.flatMap((s) => s.groups.flatMap((g) => g.records));
  const timeline = [...records].sort(byDate);
  const stated = records
    .flatMap((r) => r.statedDates)
    .sort(
      (a, b) =>
        (a.date ?? '9999').localeCompare(b.date ?? '9999') ||
        a.key.localeCompare(b.key),
    );
  return {
    collection,
    sections,
    records,
    timeline,
    stated,
    figures: records.flatMap((r) => r.figures),
    claimIds: [
      ...new Set([
        ...records.map((r) => r.claim.id),
        ...collection.orientation.flatMap((o) => o.claimIds),
        ...collection.notCovered.flatMap((n) => n.claimIds),
      ]),
    ],
  };
}

export type ComputeBuildoutView = ReturnType<typeof computeBuildoutView>;
export type ComputeSection = ComputeBuildoutView['sections'][number];
