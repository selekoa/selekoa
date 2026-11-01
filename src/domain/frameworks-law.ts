import type { Claim, Dataset, Entity } from './schema';
import { dateOf } from './query';
import { selected } from './memo';
import { provisionKinds } from './document-history';
import { frameworkVersions, frameworkLabels } from './versions';

/**
 * The standing of an instrument: its form and recorded stage, chosen from the
 * records shown with it. Never its legal effect, and never compliance.
 */
export const standingLabels = {
  binding: 'Binding text',
  'requires-framework': 'Law requiring a framework',
  'compliance-route': 'Voluntary code with a legal role',
  'executive-order': 'Executive order',
  voluntary: 'Voluntary',
  agreement: 'Memorandum',
  statement: 'Declaration or statement',
  proposed: 'Bill, draft or proposal',
  guidance: 'Guidance, report or plan',
  announced: 'Known from an announcement',
} as const;
export type Standing = keyof typeof standingLabels;

/** What each standing means, for the legend; one sentence each. */
export const standingNotes: Record<Standing, string> = {
  binding:
    'A law, regulation, rule, measure or mandatory standard, recorded as enacted, signed, issued or published by a body that makes such texts.',
  'requires-framework':
    'A law that requires developers in the categories it defines to write and publish a safety framework or protocol.',
  'compliance-route':
    'A voluntary code that a law lets providers rely on to demonstrate compliance.',
  'executive-order':
    'An order of the US President, recorded as signed. It directs the federal government; what each order requires is quoted from its text.',
  voluntary:
    'A commitment, code, memorandum or reporting framework whose own text or publisher calls it voluntary or not binding.',
  agreement:
    'A memorandum between a government and a developer whose recorded text states no binding force either way.',
  statement:
    'A declaration, summit or ministerial statement, speech, press release or announcement by a government. It states positions or plans.',
  proposed:
    'A bill, draft, proposed rule or recommendation that the records do not show as adopted in that form.',
  guidance:
    'Interpretive guidance, an assessment, a recommended standard, a report, an evaluation summary or a policy plan.',
  announced:
    'A text known only from an announcement or a later statement; the text itself was not inspected.',
};

/** Later records that change an instrument's standing; computed, never authored. */
export const changeLabels = {
  revoked: 'Revoked',
  'revocation-announced': 'Revocation announced',
  vetoed: 'Vetoed',
  'later-version': 'Later version recorded',
  'second-round': 'Second round recorded',
} as const;
export type StandingChange = keyof typeof changeLabels;

export type FrameworksLawInstrument = {
  documentId: string;
  standing: Standing;
  /**
   * How a later version of the same family is labelled when it is the same
   * text signed by another group, not a replacement (maintainer decision of
   * 2026-10-29 on the White House commitments).
   */
  laterVersion?: 'second-round';
  /** Records about this text that show its standing. */
  standingClaimIds: string[];
};

export type FrameworksLawCollection = {
  id: string;
  version: number;
  title: string;
  question: string;
  editorialStatus: 'machine-proposed';
  /** Where the texts come from, in one sentence. */
  coverage: string;
  /** The calendar years the page covers, inclusive. */
  period: { from: number; to: number };
  /** Framework families, as on the comparison page. */
  families: string[];
  /** Texts whose signatories the commitments page lists. */
  commitmentTextIds: string[];
  /** Short passages, each resting on the records it names. */
  orientation: { id: string; text: string; claimIds: string[] }[];
  sections: {
    id: string;
    title: string;
    /** A short label for timeline rows. */
    tag: string;
    note?: string;
    instruments: FrameworksLawInstrument[];
    /** Records not about one text, such as agreements with developers. */
    relatedClaimIds?: string[];
    relatedHeading?: string;
  }[];
  notCovered: {
    id: string;
    category: 'scope' | 'held' | 'gap' | 'retrieval';
    text: string;
    claimIds: string[];
  }[];
  limits: string[];
};

export const notCoveredLabels = {
  scope: 'Outside the page’s bounds',
  held: 'Held at admission',
  gap: 'Gap in the records',
  retrieval: 'Retrieval limit',
} as const;

/** What a timeline row's date is. */
export type TimelineDateKind =
  /** A dated action: signed, published, introduced, vetoed, announced. */
  | 'event'
  /** One dated report of a state, such as a published list. */
  | 'snapshot'
  /** A date a text sets for itself, such as when it takes effect. */
  | 'stated'
  /** A date field of the document record, with no claim of its own. */
  | 'document';

export type TimelineEntry = {
  key: string;
  date: string;
  precision: 'year' | 'month' | 'day';
  dateKind: TimelineDateKind;
  basis: string | null;
  /** The date is after the latest evidence check: a date set for the future. */
  scheduled: boolean;
  label: string;
  lane: 'framework' | 'instrument';
  documentId: string;
  sectionId: string | null;
  claims: Claim[];
};

const targets = (c: Claim, id: string) =>
  c.object.kind === 'entity' && c.object.entityId === id;
const byDate = (a: Claim, b: Claim) =>
  (dateOf(a) ?? '9999').localeCompare(dateOf(b) ?? '9999') ||
  a.id.localeCompare(b.id);
const provisionOrder = (a: Claim, b: Claim) =>
  provisionKinds.indexOf(a.attributes!.provision!.kind) -
    provisionKinds.indexOf(b.attributes!.provision!.kind) ||
  a.attributes!.provision!.key.localeCompare(b.attributes!.provision!.key);
const precisionOf = (date: string) =>
  date.length === 4 ? 'year' : date.length === 7 ? 'month' : 'day';

/** The lifecycle predicates a timeline row can come from. */
const lifecyclePredicates = new Set<Claim['predicate']>([
  'published',
  'enacted',
  'introduced',
  'passed',
  'vetoed',
  'revoked',
  'signed_commitment',
  'lists_participants',
]);

/** The row label of a lifecycle record about an instrument. */
function instrumentLabel(claim: Claim): string {
  const basis = claim.time.kind === 'event' ? claim.time.basis : undefined;
  switch (claim.predicate) {
    case 'published':
      return basis === 'announcement'
        ? 'Announced'
        : basis === 'signature'
          ? 'Issued'
          : 'Published';
    case 'enacted':
      return basis === 'signature'
        ? 'Signed'
        : basis === 'announcement'
          ? 'Signing announced'
          : basis === 'publication'
            ? 'Issued'
            : 'Adopted';
    case 'introduced':
      return 'Introduced';
    case 'passed':
      return 'Passed a vote';
    case 'vetoed':
      return 'Vetoed';
    case 'revoked':
      return claim.attributes?.activityStage === 'announced'
        ? 'Revocation announced'
        : 'Revoked';
    case 'signed_commitment':
      return basis === 'announcement'
        ? 'Signing announced'
        : basis === 'signature'
          ? 'Signed'
          : 'Signatory added to the text';
    case 'lists_participants': {
      const count = claim.attributes?.listing?.count;
      return count === undefined
        ? 'Participants listed'
        : `Participants listed: ${count}${claim.attributes!.listing!.countBasis === 'counted' ? ', counted by Selekoa' : ''}`;
    }
    case 'evaluation_engagement':
      return claim.attributes?.activityStage === 'announced'
        ? 'Agreement announced'
        : claim.attributes?.activityStage === 'reported_performed'
          ? 'Work reported'
          : 'Engagement recorded';
    case 'states_provision':
      // A text with several dates of application, such as the EU AI Act,
      // says which part each date is for.
      return claim.attributes?.provision?.computed
        ? 'Takes effect: date fixed by the text’s rule'
        : claim.attributes?.provision?.kind === 'statement' &&
            claim.object.kind === 'literal'
          ? `Date stated in the text: ${String(claim.object.value)}`
          : 'Takes effect: date stated in the text';
    default:
      return claim.predicate;
  }
}

/**
 * The document a lifecycle record dates. A record whose object is a record
 * (published, enacted, signed, revoked, vetoed) dates its object; a record
 * with a literal object (a participant list) dates its subject.
 */
function datedDocument(claim: Claim): string {
  return claim.object.kind === 'entity' ? claim.object.entityId : claim.subject;
}

/**
 * Framework editions, laws and government texts with their dated records, by
 * section; the framework-to-instrument links; and a timeline computed from
 * the records. A pure projection of stored claims and document records: it
 * adds no assertion and joins no record to another by date.
 */
export function frameworksLawView(
  data: Dataset,
  collection: FrameworksLawCollection,
  /**
   * The latest date any evidence was checked, over the whole dataset. A page
   * passes the build's site fact (`virtual:site-facts`), so that it is drawn
   * without reading every passage (2026-10-31: that read put every claim and
   * passage in the guide's slice); exports and releases compute it here.
   */
  latestCheckOfDataset?: string,
) {
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const claimsById = new Map(data.claims.map((c) => [c.id, c]));
  const claim = (id: string) => {
    const found = claimsById.get(id);
    if (!found) throw new Error('Missing collection claim: ' + id);
    return found;
  };
  const latestCheck =
    latestCheckOfDataset ??
    data.evidence
      .map((e) => e.checkedAt)
      .sort()
      .at(-1)!;
  const instrumentIds = new Set(
    collection.sections.flatMap((s) => s.instruments.map((i) => i.documentId)),
  );
  const editions = collection.families.flatMap((family) =>
    frameworkVersions(data, family).map((entity) => ({ family, entity })),
  );
  const editionIds = new Set(editions.map((e) => e.entity.id));
  const commitmentTexts = new Set(collection.commitmentTextIds);

  // Framework editions' own statements that name an instrument.
  const links = data.claims
    .filter(
      (c) =>
        c.predicate === 'references_commitment' &&
        editionIds.has(c.subject) &&
        c.object.kind === 'entity' &&
        instrumentIds.has(c.object.entityId),
    )
    .sort(byDate);

  const sections = collection.sections.map((section) => ({
    ...section,
    instruments: section.instruments.map((item) => {
      const entity = entities.get(item.documentId);
      if (!entity || entity.type !== 'document')
        throw new Error('Missing instrument document: ' + item.documentId);
      const standingClaims = item.standingClaimIds.map(claim);
      // A standing rests on records about this text, or about another text
      // on the page that provides for it (a law's article on codes).
      for (const c of standingClaims)
        if (![c.subject, datedDocument(c)].some((id) => instrumentIds.has(id)))
          throw new Error(
            `Standing record ${c.id} is not about the page's texts`,
          );
      const about = (predicate: Claim['predicate']) =>
        data.claims
          .filter((c) => c.predicate === predicate && c.subject === entity.id)
          .sort(byDate);
      const toward = (predicate: Claim['predicate']) =>
        data.claims
          .filter((c) => c.predicate === predicate && targets(c, entity.id))
          .sort(byDate);
      const lifecycle = data.claims
        .filter(
          (c) =>
            lifecyclePredicates.has(c.predicate) &&
            datedDocument(c) === entity.id &&
            // Signatories of commitment texts are on the commitments page.
            !(
              c.predicate === 'signed_commitment' &&
              commitmentTexts.has(entity.id)
            ),
        )
        .sort(byDate);
      const statedDates = about('states_provision').filter(
        (c) => c.time.kind === 'event' && c.time.basis === 'effective',
      );
      const changes: { change: StandingChange; claims: Claim[] }[] = (
        [
          [
            'revoked',
            toward('revoked').filter(
              (c) => c.attributes?.activityStage !== 'announced',
            ),
          ],
          [
            'revocation-announced',
            toward('revoked').filter(
              (c) => c.attributes?.activityStage === 'announced',
            ),
          ],
          ['vetoed', toward('vetoed')],
          [item.laterVersion ?? 'later-version', toward('changes_from')],
        ] as [StandingChange, Claim[]][]
      )
        .filter(([, claims]) => claims.length)
        .map(([change, claims]) => ({ change, claims }));
      const publisherId = entity.documentVersion?.publisherId;
      return {
        ...item,
        entity,
        publisher: publisherId ? (entities.get(publisherId) ?? null) : null,
        standingClaims,
        changes,
        lifecycle,
        statedDates,
        provisions: [
          ...about('states_provision'),
          ...about('provision_not_found'),
        ].sort(provisionOrder),
        // Version comparisons with an earlier text of the same family.
        versionChanges: about('changes_from'),
        cites: about('cites'),
        citedBy: toward('cites'),
        links: links.filter((c) => targets(c, entity.id)),
        // Counted by relation alone: marked as used, so that a page drawn
        // from its slice holds the records it counts (src/domain/memo.ts).
        signatoryCount: commitmentTexts.has(entity.id)
          ? selected('claims', toward('signed_commitment')).length
          : 0,
        sources: data.sources
          .filter((s) => s.documentId === entity.id)
          .sort((a, b) => a.id.localeCompare(b.id)),
      };
    }),
    related: (section.relatedClaimIds ?? []).map(claim).sort(byDate),
  }));

  // The timeline: one row per document, record kind and date.
  const rows = new Map<string, TimelineEntry>();
  const add = (
    c: Claim | null,
    entry: Omit<TimelineEntry, 'key' | 'claims' | 'precision' | 'scheduled'>,
  ) => {
    const key = `${entry.date}|${entry.documentId}|${entry.label}`;
    const row = rows.get(key);
    if (row) {
      if (c) row.claims.push(c);
      return;
    }
    rows.set(key, {
      ...entry,
      key,
      precision: precisionOf(entry.date),
      scheduled: entry.date > latestCheck.slice(0, entry.date.length),
      claims: c ? [c] : [],
    });
  };
  const timeOf = (c: Claim) => ({
    date: dateOf(c)!,
    dateKind: (c.time.kind === 'snapshot'
      ? 'snapshot'
      : 'event') as TimelineDateKind,
    basis: c.time.kind === 'event' ? (c.time.basis ?? null) : null,
  });
  for (const { entity } of editions)
    for (const c of data.claims
      .filter((c) => c.predicate === 'published' && targets(c, entity.id))
      .sort(byDate))
      add(c, {
        ...timeOf(c),
        label: 'Framework edition',
        lane: 'framework',
        documentId: entity.id,
        sectionId: null,
      });
  for (const section of sections) {
    for (const item of section.instruments) {
      const id = item.entity.id;
      for (const c of item.lifecycle)
        if (dateOf(c))
          add(c, {
            ...timeOf(c),
            label: instrumentLabel(c),
            lane: 'instrument',
            documentId: id,
            sectionId: section.id,
          });
      for (const c of item.statedDates)
        add(c, {
          ...timeOf(c),
          dateKind: 'stated',
          label: instrumentLabel(c),
          lane: 'instrument',
          documentId: id,
          sectionId: section.id,
        });
      // A document record's date with no record of its own on that date.
      const recorded = new Set(
        [...rows.values()]
          .filter((r) => r.documentId === id)
          .map((r) => r.date),
      );
      const published = item.entity.documentVersion?.publishedAt;
      if (published && !recorded.has(published))
        add(null, {
          date: published,
          dateKind: 'document',
          basis: null,
          label: 'Published',
          lane: 'instrument',
          documentId: id,
          sectionId: section.id,
        });
    }
    for (const c of section.related)
      if (dateOf(c))
        add(c, {
          ...timeOf(c),
          label: instrumentLabel(c),
          lane: 'instrument',
          documentId: c.subject,
          sectionId: section.id,
        });
  }
  const timeline = [...rows.values()].sort(
    (a, b) =>
      a.date.localeCompare(b.date) ||
      (a.lane === b.lane ? 0 : a.lane === 'framework' ? -1 : 1) ||
      a.documentId.localeCompare(b.documentId) ||
      a.label.localeCompare(b.label),
  );
  for (const row of timeline) {
    const year = Number(row.date.slice(0, 4));
    if (
      !row.scheduled &&
      (year < collection.period.from || year > collection.period.to)
    )
      throw new Error('Timeline row outside the period: ' + row.key);
  }

  // Which framework editions name which instrument, by framework family,
  // instruments in order of their earliest dated row.
  const firstDate = new Map<string, string>();
  for (const row of timeline)
    if (!firstDate.has(row.documentId)) firstDate.set(row.documentId, row.date);
  const linkedIds = [
    ...new Set(
      links.map((c) => (c.object.kind === 'entity' ? c.object.entityId : '')),
    ),
  ].sort(
    (a, b) =>
      (firstDate.get(a) ?? '').localeCompare(firstDate.get(b) ?? '') ||
      a.localeCompare(b),
  );
  const linkMatrix = collection.families.map((family) => ({
    family,
    label: frameworkLabels[family] ?? family,
    cells: linkedIds.map((documentId) => ({
      documentId,
      claims: links.filter(
        (c) =>
          targets(c, documentId) &&
          entities.get(c.subject)!.documentVersion?.family === family,
      ),
    })),
  }));

  const claimIds = [
    ...new Set([
      ...collection.orientation.flatMap((o) => o.claimIds),
      ...timeline.flatMap((r) => r.claims.map((c) => c.id)),
      ...sections.flatMap((s) => [
        ...s.instruments.flatMap((i) =>
          [
            ...i.standingClaims,
            ...i.changes.flatMap((c) => c.claims),
            ...i.lifecycle,
            ...i.statedDates,
            ...i.provisions,
            ...i.versionChanges,
            ...i.cites,
            ...i.citedBy,
            ...i.links,
          ].map((c) => c.id),
        ),
        ...s.related.map((c) => c.id),
      ]),
      ...links.map((c) => c.id),
      ...collection.notCovered.flatMap((n) => n.claimIds),
    ]),
  ];
  for (const id of claimIds) claim(id);
  return {
    collection,
    sections,
    timeline,
    editions: editions.map((e) => ({
      ...e,
      links: links.filter((c) => c.subject === e.entity.id),
    })),
    links,
    linkedIds,
    linkMatrix,
    latestCheck,
    claimIds,
  };
}

export type FrameworksLawView = ReturnType<typeof frameworksLawView>;
export type FrameworksLawSection = FrameworksLawView['sections'][number];
export type FrameworksLawItem = FrameworksLawSection['instruments'][number];

/** Short display name of a document. */
export const shortName = (entity: Entity) =>
  entity.shortName ?? entity.documentVersion?.label ?? entity.name;
