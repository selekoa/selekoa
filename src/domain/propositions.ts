import { propositionFrames } from '../reading/proposition-frames';
import { remember, type Remembered } from './memo';
import type {
  Claim,
  Dataset,
  Engagement,
  Entity,
  Evidence,
  RecheckHeadline,
  Register,
  Source,
  ThoughtRole,
  Tier,
} from './schema';
import { propositionStances } from './predicates';
import { isPropositionRecord } from './query';

/**
 * A collection of propositions (schema 2.11): for each proposition, the
 * located texts that articulate, contest or bear on it, in date order, with
 * the earliest located text and the earliest located use of its usual name.
 * Records relate a text to a proposition, never to another text.
 */
export type PropositionsCollection = {
  id: string;
  version: number;
  title: string;
  question: string;
  editorialStatus: 'machine-proposed';
  introduction: string;
  groups: {
    id: string;
    label: string;
    description: string;
    propositionIds: string[];
  }[];
  /** The collection's scope, stated once: venues, methods and known gaps. */
  searchNote: {
    scope: string;
    venues: { period: string; items: string[] }[];
    methods: string[];
    gaps: string[];
    corrections: string;
  };
  /** Headlines replaced since the candidate searches, kept on record. */
  corrections: {
    propositionId: string;
    replaced: string;
    reason: string;
    claimIds: string[];
    recordedAt: string;
  }[];
  limits: string[];
  /** The years the date strip spans, and its labelled ticks (1860–2025 by default). */
  axis?: { from: number; to: number; ticks: string[] };
  /**
   * What the most-developed headline says when no record holds the role;
   * null when the collection names no most-developed records.
   */
  mostDevelopedEmpty?: string | null;
  /**
   * The start page's description, with {propositions}, {records} and {texts}
   * replaced by counts; a general description when omitted.
   */
  landing?: string;
  /** The start page's button text; "Read the propositions →" when omitted. */
  landingAction?: string;
  /** What the earliest-located headline says when no text articulates it. */
  earliestEmpty?: string;
  /** Per proposition: premises that no located passage addresses. */
  openPremises?: Record<string, string[]>;
  /**
   * Per proposition: overlapping propositions recorded in another
   * collection, with how they relate. A link records an overlap of criteria,
   * never a relation between texts.
   */
  related?: Record<string, { propositionId: string; relation: string }[]>;
  /**
   * Published exchanges in which one text answers another, as a reading
   * list. Each reply is its own `cites` record; the grouping is the
   * collection's and is not stored in the dataset.
   */
  exchanges?: {
    title: string;
    period: string;
    documentIds: string[];
    note: string;
  }[];
  /**
   * For a collection that sorts its texts into tiers (schema 2.13): what each
   * tier holds. Earliest located is then named within tier 1, and the tier-2
   * earliest separately.
   */
  tiers?: Record<Tier, string>;
};

/**
 * The reader text of a propositions collection: what only its own page and
 * starter show. Pages other than its own read its frame, which the browser
 * holds for every collection (src/reading/proposition-frames.ts).
 */
export type PropositionsText = Pick<
  PropositionsCollection,
  | 'introduction'
  | 'searchNote'
  | 'corrections'
  | 'limits'
  | 'openPremises'
  | 'related'
  | 'exchanges'
>;
export type PropositionsFrame = Omit<
  PropositionsCollection,
  keyof PropositionsText
>;

export type Stance =
  (typeof propositionStances)[keyof typeof propositionStances];

export const stanceLabels: Record<Stance, string> = {
  articulates: 'Articulates',
  contests: 'Contests',
  bears_on: 'Bears on',
};
export const roleLabels: Record<ThoughtRole, string> = {
  'earliest-located': 'Earliest located',
  'earliest-located-term': 'Earliest located use of the name',
  articulation: 'Articulation',
  'most-developed': 'Most developed',
  contesting: 'Contesting',
  context: 'Context',
  'later-restatement': 'Later restatement',
  'earliest-located-tier-2': 'Earliest located in tier 2',
};
export const tierLabels: Record<Tier, string> = { 1: 'Tier 1', 2: 'Tier 2' };
export const engagementLabels: Record<Engagement, string> = {
  'engages-premise': 'Engages a premise',
  'contrary-only': 'States the contrary',
};
export const registerLabels: Record<Register, string> = {
  nonfiction: 'Nonfiction',
  fiction: 'Fiction',
  satirical: 'Satirical',
  dream: 'Framed as a dream',
  relay: 'Relay of another author',
};

/**
 * Schema 2.28: the date a headline was put under re-check, or null. A record
 * that holds the role again takes precedence on the page.
 */
const recheckedSince = (entity: Entity, headline: RecheckHeadline) =>
  entity.proposition?.underRecheck?.find((r) => r.headline === headline)
    ?.recordedAt ?? null;

const stanceOf = (claim: Claim) =>
  propositionStances[claim.predicate as keyof typeof propositionStances];

/** The date of a record's wording: the attested date where recorded. */
export function wordingDate(claim: Claim): string | undefined {
  const attested = claim.attributes?.thought?.attested;
  if (attested) return attested.date;
  return claim.time.kind === 'event' ? claim.time.date : undefined;
}

export type PropositionRecord = {
  claim: Claim;
  document: Entity;
  /** "Authors · title", as a citation names the text. */
  label: string;
  sources: Source[];
  stance: Stance;
  roles: ThoughtRole[];
  register: Register;
  term?: string;
  qualifier?: string;
  missing?: string;
  /** The date the work is dated by. */
  dated: string;
  claimed?: { date: string; note: string };
  attested?: { date?: string; note: string };
  /** The date of the quoted wording, which decides earliest located. */
  wording?: string;
  engagement?: { kind: Engagement; rationale: string };
  retrospective?: { from?: string; until?: string; note: string };
  /** Schema 2.13: the text's tier, model conditions and stated estimates. */
  tier?: { value: Tier; basis: string };
  conditions?: string;
  estimates?: {
    holder: string;
    value: string;
    horizon: string;
    definition: string;
    conditional: boolean;
    conditions?: string;
  }[];
  /** The authors named by the document's own source. */
  authors: string[];
  evidence: Evidence[];
};

function record(
  data: Dataset,
  claim: Claim,
  entities: Map<string, Entity>,
  sources: Map<string, Source>,
): PropositionRecord {
  const thought = claim.attributes!.thought!;
  const evidence = data.evidence.filter((e) => e.claimId === claim.id);
  const document = entities.get(claim.subject)!;
  const used = [...new Set(evidence.map((e) => e.sourceId))].map((id) =>
    sources.get(id)!,
  );
  // The document's own source names its authors; a supporting source may not.
  const own = used.find((s) => s.documentId === document.id) ?? used[0];
  return {
    claim,
    document,
    label: [own?.authors.join('; '), document.name].filter(Boolean).join(' · '),
    authors: own?.authors ?? [],
    evidence,
    sources: used,
    stance: stanceOf(claim),
    roles: thought.roles,
    register: thought.register,
    term: thought.term,
    qualifier: thought.qualifier,
    missing: thought.missing,
    dated: claim.time.kind === 'event' ? claim.time.date : '',
    claimed: thought.claimed,
    attested: thought.attested,
    wording: wordingDate(claim),
    engagement: thought.engagement,
    retrospective: thought.retrospective,
    tier: thought.tier,
    conditions: thought.conditions,
    estimates: thought.estimates,
  };
}

/**
 * Later texts by an author of an articulating text that contest the same
 * proposition. Derived from the records each time; no record links one text
 * to another.
 */
export function laterContests(
  r: PropositionRecord,
  records: PropositionRecord[],
): PropositionRecord[] {
  if (r.stance !== 'articulates' || !r.wording) return [];
  const own = new Set(r.authors.map(authorKey));
  return records.filter(
    (x) =>
      x.stance === 'contests' &&
      x.authors.some((a) => own.has(authorKey(a))) &&
      !!x.wording &&
      definitelyAfter(x.wording, r.wording!),
  );
}

/**
 * An author's name without middle initials, so that "Eliezer S. Yudkowsky"
 * and "Eliezer Yudkowsky" as printed on two sources match.
 */
export const authorKey = (name: string) =>
  name
    .toLowerCase()
    .replace(/(^|\s)[a-z]\.(?=\s)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Whether date `a` is later than date `b` whatever their precision. */
function definitelyAfter(a: string, b: string) {
  const start = (a + '-01-01').slice(0, 10);
  const end = b.length === 4 ? b + '-12-31' : b.length === 7 ? b + '-31' : b;
  return start > end;
}

const byDate = (a: PropositionRecord, b: PropositionRecord) =>
  a.dated.localeCompare(b.dated) ||
  (a.wording ?? '9999').localeCompare(b.wording ?? '9999') ||
  a.claim.id.localeCompare(b.claim.id);

export function propositionsView<C extends PropositionsFrame>(
  data: Dataset,
  collection: C,
) {
  // From a frame, the view has no reader text: no premises, related
  // propositions, corrections or exchanges. Only a collection's own page,
  // which loads it whole, shows them.
  const text = collection as Partial<PropositionsText>;
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const sources = new Map(data.sources.map((s) => [s.id, s]));
  // Only the records on this collection's propositions, chosen by their
  // relation fields, are read: a page reads no other collection's records
  // (src/prerender/trace.ts).
  const own = new Set(collection.groups.flatMap((g) => g.propositionIds));
  const records = data.claims
    .filter(
      (c) =>
        isPropositionRecord(c) &&
        c.object.kind === 'entity' &&
        own.has(c.object.entityId),
    )
    .map((c) => record(data, c, entities, sources));
  const groups = collection.groups.map((group) => ({
    ...group,
    propositions: group.propositionIds.map((id) => {
      const entity = entities.get(id);
      if (!entity?.proposition)
        throw new Error('Not a proposition in this dataset: ' + id);
      const list = records
        .filter(
          (r) =>
            r.claim.object.kind === 'entity' && r.claim.object.entityId === id,
        )
        .sort(byDate);
      const withRole = (role: ThoughtRole) =>
        list.find((r) => r.roles.includes(role)) ?? null;
      return {
        entity,
        proposition: entity.proposition,
        records: list,
        stated: list.filter((r) => r.stance !== 'bears_on'),
        context: list.filter((r) => r.stance === 'bears_on'),
        earliest:
          list.find(
            (r) =>
              r.stance === 'articulates' &&
              r.roles.includes('earliest-located'),
          ) ?? null,
        earliestContest:
          list.find(
            (r) =>
              r.stance === 'contests' && r.roles.includes('earliest-located'),
          ) ?? null,
        // Schema 2.13: the earliest located tier-2 texts, shown separately.
        earliestTier2:
          list.find(
            (r) =>
              r.stance === 'articulates' &&
              r.roles.includes('earliest-located-tier-2'),
          ) ?? null,
        earliestContestTier2:
          list.find(
            (r) =>
              r.stance === 'contests' &&
              r.roles.includes('earliest-located-tier-2'),
          ) ?? null,
        // Schema 2.16: the reason an earliest located role is withheld.
        earliestWithheld:
          entity.proposition.withheld?.find(
            (w) => w.role === 'earliest-located',
          )?.reason ?? null,
        earliestTier2Withheld:
          entity.proposition.withheld?.find(
            (w) => w.role === 'earliest-located-tier-2',
          )?.reason ?? null,
        // Schema 2.28: the date from which a headline is under re-check.
        recheck: {
          earliest: recheckedSince(entity, 'earliest-located'),
          contest: recheckedSince(entity, 'earliest-located-contesting'),
          term: recheckedSince(entity, 'earliest-located-term'),
        },
        openPremises: text.openPremises?.[id] ?? [],
        related: (text.related?.[id] ?? []).flatMap((r) => {
          const other = entities.get(r.propositionId);
          return other?.proposition ? [{ ...r, entity: other }] : [];
        }),
        earliestTerm: withRole('earliest-located-term'),
        // Schema 2.29: no name headline, by a recorded decision.
        termDropped: !!entity.proposition.noTermHeadline,
        mostDeveloped: withRole('most-developed'),
        corrections: (text.corrections ?? []).filter(
          (c) => c.propositionId === id,
        ),
      };
    }),
  }));
  const shown = groups.flatMap((g) => g.propositions.flatMap((p) => p.records));
  const claimIds = shown.map((r) => r.claim.id);
  // The exchanges' texts, as the dataset holds them.
  const exchanges = (text.exchanges ?? []).map((x) => ({
    ...x,
    documents: x.documentIds.flatMap((id) => {
      const d = entities.get(id);
      return d ? [d] : [];
    }),
  }));
  return {
    collection,
    groups,
    exchanges,
    claimIds,
    documentIds: [...new Set(shown.map((r) => r.document.id))],
    sourceIds: [...new Set(shown.flatMap((r) => r.sources.map((s) => s.id)))],
    years: {
      first: shown
        .map((r) => r.dated)
        .sort()[0]
        ?.slice(0, 4),
      last: shown
        .map((r) => r.dated)
        .sort()
        .at(-1)
        ?.slice(0, 4),
    },
  };
}

export type PropositionsView = ReturnType<
  typeof propositionsView<PropositionsCollection>
>;
export type PropositionEntry =
  PropositionsView['groups'][number]['propositions'][number];

/**
 * The records a context-only passage must be shown with, each with a
 * quotation that can itself be shown alone, where one exists.
 */
export function requiredContext(
  evidence: Evidence,
  claims: ReadonlyMap<string, Claim>,
  items: ReadonlyMap<string, Evidence>,
) {
  return (evidence.contextOnly?.claimIds ?? []).flatMap((id) => {
    const claim = claims.get(id);
    if (!claim) return [];
    const quote = claim.evidenceIds
      .map((e) => items.get(e))
      .find((e) => e && e.passageType === 'quote' && !e.contextOnly);
    return [{ claim, quote: quote ?? null }];
  });
}

/** "1998 · wording attested 2000-08-17", "1965 · claimed 1962-10". */
export function recordDates(r: PropositionRecord) {
  return [
    r.dated,
    ...(r.attested
      ? [
          r.attested.date
            ? `wording attested ${r.attested.date}`
            : 'wording known only from a later, undated copy',
        ]
      : []),
    ...(r.claimed ? [`claimed ${r.claimed.date}`] : []),
  ].join(' · ');
}

/**
 * Where a propositions collection names a document earliest located: one
 * line per headline the document holds, worded as the collection's own
 * headline, with the claim that holds the role.
 */
export type EarliestMark = {
  collectionId: string;
  propositionId: string;
  claimId: string;
  text: string;
};

const views = new WeakMap<
  Dataset,
  Map<string, Remembered<ReturnType<typeof propositionsView>>>
>();
/** Each document's marks, as computed from the whole dataset. */
const marksByDocument = new WeakMap<Dataset, Map<string, EarliestMark[]>>();

/**
 * Gives a dataset every document's marks, as computed from the whole dataset
 * (src/domain/collection-index.ts), for a page drawn from part of it.
 */
export function seedEarliestMarks(
  data: Dataset,
  stored: [string, EarliestMark[]][],
) {
  marksByDocument.set(data, new Map(stored));
}

/** The marks of every document that has any. */
export function everyEarliestMark(data: Dataset): [string, EarliestMark[]][] {
  return data.entities
    .filter((e) => e.type === 'document')
    .map(
      (e) =>
        [e.id, earliestMarks(data, propositionFrames, e.id)] as [
          string,
          EarliestMark[],
        ],
    )
    .filter(([, marks]) => marks.length);
}

const allMarks = new WeakMap<Dataset, EarliestMark[]>();

/**
 * Every earliest-located mark of every document: as given to a part of the
 * dataset, or computed once from the whole dataset.
 */
export function allEarliestMarks(data: Dataset): EarliestMark[] {
  const seeded = marksByDocument.get(data);
  if (seeded) return [...seeded.values()].flat();
  let marks = allMarks.get(data);
  if (!marks)
    allMarks.set(
      data,
      (marks = everyEarliestMark(data).flatMap(([, list]) => list)),
    );
  return marks;
}

export function earliestMarks(
  data: Dataset,
  collections: readonly PropositionsFrame[],
  documentId: string,
): EarliestMark[] {
  const seeded = marksByDocument.get(data);
  if (seeded && collections === propositionFrames)
    return seeded.get(documentId) ?? [];
  const cache = views.get(data) ?? new Map();
  views.set(data, cache);
  const marks: EarliestMark[] = [];
  for (const collection of collections) {
    const view = remember(cache, collection.id, () =>
      propositionsView(data, collection),
    );
    const tiered = !!collection.tiers;
    const title = collection.title;
    for (const group of view.groups)
      for (const entry of group.propositions) {
        const name = `${entry.proposition.code} ${entry.entity.name}`;
        const headlines: [PropositionRecord | null, string][] = [
          [
            entry.earliest,
            tiered
              ? `Earliest located in tier 1 of ${title} for ${name}`
              : `Earliest located in ${title} for ${name}`,
          ],
          [
            entry.earliestTier2,
            `Earliest located in tier 2 of ${title} for ${name}`,
          ],
          [
            entry.earliestContest,
            `Earliest located ${tiered ? 'tier-1 ' : ''}text contesting ${name} in ${title}`,
          ],
          [
            entry.earliestContestTier2,
            `Earliest located tier-2 text contesting ${name} in ${title}`,
          ],
          [
            entry.proposition.terms.length ? entry.earliestTerm : null,
            `Earliest located use of the name${entry.earliestTerm?.term ? ` “${entry.earliestTerm.term}”` : ''} in ${title} for ${name}`,
          ],
        ];
        for (const [r, text] of headlines)
          if (r?.document.id === documentId)
            marks.push({
              collectionId: collection.id,
              propositionId: entry.entity.id,
              claimId: r.claim.id,
              text,
            });
      }
  }
  return marks;
}
