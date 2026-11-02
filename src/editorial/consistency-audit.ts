// Report-only consistency audit of the whole dataset (`pnpm audit:consistency`).
// It looks for what validation (src/domain/schema.ts) does not enforce:
// near-duplicate identities, type and subtype drift, date conflicts, unused
// records, evidence-quality flags, wording, identifier hygiene and
// overlapping records from different packs. A finding is a lead for an
// editor, never a verdict: no merge, retyping or rewording follows from it
// without a separately authorised task and, for a merge, a source that
// identifies the two records as the same.
import type {
  Claim,
  Dataset,
  Entity,
  Evidence,
  Source,
} from '../domain/schema';
import { maxQuotedWords } from '../domain/schema';
import { subtypeLists } from './subtype-lists';

export const auditChecks = [
  'duplicates',
  'types',
  'dates',
  'orphans',
  'evidence',
  'wording',
  'identifiers',
  'overlaps',
] as const;
export type AuditCheck = (typeof auditChecks)[number];
export type Severity = 'high' | 'medium' | 'low' | 'info';
/** Which group of the proposed fix list a finding belongs to. */
export type FixGroup = 'mechanical' | 'needs_source' | 'convention' | 'none';

export type Finding = {
  check: AuditCheck;
  /** Sub-check, stable across runs, e.g. `source-published-after-access`. */
  code: string;
  severity: Severity;
  fix: FixGroup;
  /** Record IDs the finding concerns, most relevant first. */
  ids: string[];
  message: string;
  details?: Record<string, unknown>;
};

/** Collection definitions as the application reads them: plain objects. */
export type CollectionInput = { kind: string; id: string; definition: unknown };

export type AuditReport = {
  dataset: { updatedAt: string; schemaVersion: string };
  counts: Record<'entities' | 'claims' | 'sources' | 'evidence', number>;
  summary: {
    check: AuditCheck;
    findings: number;
    bySeverity: Record<Severity, number>;
  }[];
  findings: Finding[];
};

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const squash = (s: string) => s.trim().replace(/\s+/g, ' ');

/** Lower-case, ASCII-folded, punctuation-free form of a name for matching. */
export function normaliseName(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/&/g, ' and ')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(
      /\b(the|inc|llc|l l c|ltd|lp|l p|pbc|co|corp|corporation|company|group|holdings)\b/g,
      ' ',
    )
    .replace(/\s+/g, ' ')
    .trim();
}

/** Each name an entity is known by: its name, short name, aliases and dated names. */
function entityNames(e: Entity): string[] {
  const names = [e.name, e.shortName, ...e.aliases];
  for (const n of e.datedNames ?? []) names.push(n.name);
  // "DeepSeek / 深度求索" carries two names.
  return names
    .filter((n): n is string => Boolean(n))
    .flatMap((n) => n.split(' / '));
}

const familyOfType: Record<string, string> = {
  organisation: 'institution',
  public_body: 'institution',
  fund: 'institution',
  country: 'institution',
  person: 'person',
  document: 'document',
  concept: 'concept',
  infrastructure: 'infrastructure',
  model: 'model',
};

/** Earliest and latest day a stored date can denote, as YYYY-MM-DD. */
export function dateRange(d: string): [string, string] {
  const [y, m, day] = d.split('-');
  if (day) return [d, d];
  if (m) {
    const last = new Date(Date.UTC(Number(y), Number(m), 0)).getUTCDate();
    return [`${y}-${m}-01`, `${y}-${m}-${String(last).padStart(2, '0')}`];
  }
  return [`${y}-01-01`, `${y}-12-31`];
}
/** Whether two stored dates can denote the same day. */
export function datesCompatible(a: string, b: string): boolean {
  const [a0, a1] = dateRange(a);
  const [b0, b1] = dateRange(b);
  return a0 <= b1 && b0 <= a1;
}
const precision = (d: string) => d.split('-').length;
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
/** Whether a note names the date, as ISO text or in words ("29 October 2025"). */
export function mentionsDate(note: string, date: string): boolean {
  if (note.includes(date)) return true;
  const [y, m, d] = date.split('-');
  if (!m) return new RegExp(`\\b${y}\\b`).test(note);
  const month = months[Number(m) - 1];
  if (!d) return note.includes(`${month} ${y}`);
  const day = String(Number(d));
  return (
    note.includes(`${day} ${month} ${y}`) ||
    note.includes(`${month} ${day}, ${y}`)
  );
}

function claimDates(c: Claim): string[] {
  const t = c.time;
  if (t.kind === 'event' || t.kind === 'snapshot') return [t.date];
  if (t.kind === 'interval')
    return [t.from, t.until].filter((d): d is string => Boolean(d));
  return [];
}

/** Text spans that are our own words: quotations inside them are removed. */
export function stripQuoted(s: string): string {
  return s
    .replace(/“[^”]*”/g, ' “…” ')
    .replace(/"[^"]*"/g, ' "…" ')
    .replace(/‘[^’]*’(?!\w)/g, ' ‘…’ ');
}

type WordRule = {
  code: string;
  pattern: RegExp;
  severity: Severity;
  why: string;
};
/**
 * Wording rules. Priority words follow the editorial policy (earliest
 * located texts); motive words follow its interpretation rules; the style
 * guide's avoided words apply to reader-facing text and are reported here at
 * low severity, because the guide does not itself govern data records.
 */
export const wordRules: WordRule[] = [
  {
    code: 'priority-first',
    pattern:
      /\b(?:the|its|their|his|her|was|were|is) first(?: [\w’'-]+){0,3}? to (?:state|propose|use|describe|introduce|coin|formulate|articulate|argue|publish|suggest|discuss|warn|predict|name|define|develop|identify|raise|recognise|recognize|call)\b|\bfirst-ever\b|\bfor the first time\b|\bthe first of its kind\b|\bfirst (?:coined|used the term|articulated|formulated|developed|introduced the (?:term|concept|idea|notion))\b/i,
    severity: 'high',
    why: 'A priority claim ("the first … to") in our own words; the policy allows it only attributed to a competent authority.',
  },
  {
    code: 'priority-word',
    pattern:
      /\b(?:coined|originated|pioneered|pioneering|invented|groundbreaking|seminal)\b/i,
    severity: 'high',
    why: 'A priority or originality word in our own words (editorial policy, earliest located texts).',
  },
  {
    code: 'evaluative-word',
    pattern:
      /\b(?:landmark|historic|milestone|watershed|revolutionary|famous|famously|notorious|influential)\b/i,
    severity: 'medium',
    why: 'An evaluative word in our own words; it states significance or influence that no record establishes.',
  },
  {
    code: 'motive',
    pattern:
      /\b(?:in order to|so as to|sought to|aimed to|aiming to|intended to|wanted to|in an effort to|in a bid to|motivated by|was motivated|designed to (?:avoid|evade|placate|appease)|to curry|to appease|to placate)\b/i,
    severity: 'medium',
    why: 'A motive or purpose in our own words; a reason is recorded only where the actor stated it (schema 2.15).',
  },
  {
    code: 'ideological-label',
    pattern:
      /\b(?:doomers?|accelerationists?|e\/acc|effective altruists?|rationalists?|EA-aligned|EA-affiliated)\b/,
    severity: 'medium',
    why: 'An ideological or social label; the policy forbids assigning one from proximity, so each use needs a self-description or quotation.',
  },
  {
    code: 'style-guide-word',
    pattern:
      /\b(?:crucially|notably|worth noting|delve|landscape|robust|nuanced|importantly|interestingly|seamless(?:ly)?|leverage[sd]?)\b/i,
    severity: 'low',
    why: 'A word the style guide asks writers to avoid.',
  },
];
/**
 * Merged proposition IDs whose stance suffix or word no longer matches the
 * record, kept by decision C4 of 2026-10-29 because merged IDs are stable
 * (docs/ontology.md). New proposition IDs are stance-neutral.
 */
export const keptStanceIds = [
  'ts-a2-hanson-2008-core-argument-contests',
  'yk-y24-sl4-2002-05-03-yudkowsky-0205-3551-a',
  'yk-y24-extropians-2000-09-29-yudkowsky-6080-a',
  'yk-y22-lw-2008-fighting-a-rearguard-action-against-the-b',
  'yk-y30-lw-2008-that-tiny-note-of-discord-b',
];
/** Lower severity when the sentence attributes the wording to a source. */
const attribution =
  /\b(?:states?|stated|said|says|writes?|wrote|according to|announced|describes?|described|calls?|called|reported|reports|claims?|claimed|presents?|presented|characteri[sz]e[sd]?|labels?|labelled|self-descri|lists?|listed|names?|named|notes?|noted|introduces?|argues?|argued|recounts?|replies|replying|memo|prospectus|edition|framework|section|measure|changelog|change log)/i;
/**
 * Records and passages that describe what a text says: a purpose clause
 * there is the text's own ("measures to assess and mitigate"), not a motive
 * that Selekoa attributes to an actor.
 */
const textualPredicates = new Set([
  'states_provision',
  'provision_not_found',
  'changes_from',
  'provision_assessed',
  'articulates_proposition',
  'contests_proposition',
  'bears_on_proposition',
  'references_commitment',
  'lists_participants',
  'discusses',
]);

type TextField = {
  id: string;
  field: string;
  text: string;
  /** The field describes what a text says (a provision, a passage). */
  textual: boolean;
  /** The field is a paraphrase of a source passage. */
  paraphrase: boolean;
};

function ownTextFields(data: Dataset): TextField[] {
  const out: TextField[] = [];
  let textual = false;
  const push = (id: string, field: string, text?: string) => {
    if (text)
      out.push({
        id,
        field,
        text,
        textual,
        paraphrase: field.startsWith('passage'),
      });
  };
  const claimById = new Map(data.claims.map((c) => [c.id, c]));
  for (const e of data.entities) {
    textual = false;
    push(e.id, 'description', e.description);
    push(e.id, 'proposition.criterion', e.proposition?.criterion);
    push(e.id, 'documentVersion.dateNote', e.documentVersion?.dateNote);
    e.datedNames?.forEach((n, i) => push(e.id, `datedNames.${i}.note`, n.note));
  }
  for (const c of data.claims) {
    textual = textualPredicates.has(c.predicate);
    push(c.id, 'statement', c.statement);
    push(c.id, 'qualification', c.qualification);
    push(c.id, 'time.note', c.time.note);
    push(c.id, 'inferenceRationale', c.inferenceRationale);
    const t = c.attributes?.thought;
    push(c.id, 'thought.qualifier', t?.qualifier);
    push(c.id, 'thought.missing', t?.missing);
    push(c.id, 'thought.conditions', t?.conditions);
    push(c.id, 'thought.tier.basis', t?.tier?.basis);
    push(c.id, 'thought.engagement.rationale', t?.engagement?.rationale);
    push(c.id, 'thought.retrospective.note', t?.retrospective?.note);
    push(c.id, 'statedReason.text', c.attributes?.statedReason?.text);
    push(c.id, 'conditions', c.attributes?.conditions);
  }
  for (const v of data.evidence) {
    textual = textualPredicates.has(claimById.get(v.claimId)?.predicate ?? '');
    push(v.id, 'note', v.note);
    if (v.passageType === 'paraphrase')
      push(v.id, 'passage (paraphrase)', v.passage);
    push(v.id, 'contextOnly.reason', v.contextOnly?.reason);
    push(v.id, 'contextOnly.requires', v.contextOnly?.requires);
  }
  textual = false;
  for (const s of data.sources) push(s.id, 'reuse.note', s.reuse.note);
  return out;
}

// Stance words in proposition-record IDs. A final "-context" marks a
// context record in the human-thought collection; elsewhere "context" can be
// part of a title ("context disaster").
const stanceWords: Record<string, RegExp> = {
  articulates_proposition: /(?:^|-)(?:articulates?|articulation)(?:-|$)/,
  contests_proposition: /(?:^|-)(?:contests?|contesting)(?:-|$)/,
  bears_on_proposition: /(?:^|-)(?:bears-on|context)$/,
};
// The Yudkowsky and economics collections end each proposition-record ID in
// a stance letter: -a articulates, -b bears on, -c contests.
const stanceLetters: Record<string, string> = {
  a: 'articulates_proposition',
  b: 'bears_on_proposition',
  c: 'contests_proposition',
};
const stanceLetterPrefixes = new Set(['yk', 'ec']);
const resolutionWords: Record<string, RegExp> = {
  supported: /(?:^|-)supported(?:-|$)/,
  contested: /(?:^|-)contested(?:-|$)/,
  unresolved: /(?:^|-)unresolved(?:-|$)/,
};

function claimKey(c: Claim): string {
  const object =
    c.object.kind === 'entity'
      ? c.object.entityId
      : `“${normaliseName(String(c.object.value))}”${c.object.unit ?? ''}`;
  const a = c.attributes;
  const extra = [
    a?.provision?.key,
    a?.provision?.facet?.id,
    a?.role?.toLowerCase(),
    a?.control?.right,
    a?.transactionType,
    a?.amount && `${a.amount.value} ${a.amount.currency}`,
    a?.quantity && `${a.quantity.value} ${a.quantity.unit}`,
    a?.commitment?.stage,
    a?.changeBasis,
  ]
    .filter(Boolean)
    .join(' ');
  return [c.subject, c.predicate, object, extra].join(' | ');
}

/** Share of words two statements have in common (Jaccard), ignoring case. */
export function statementSimilarity(a: string, b: string): number {
  const set = (s: string) =>
    new Set(
      normaliseName(s)
        .split(' ')
        .filter((w) => w.length > 2),
    );
  const x = set(a);
  const y = set(b);
  const shared = [...x].filter((w) => y.has(w)).length;
  return shared / (x.size + y.size - shared || 1);
}

/** Pack prefix of an identifier: its first hyphen-separated token. */
const prefixOf = (id: string) => id.split('-')[0];

/**
 * Members a collection definition names, by field. Claim fields name claims;
 * the other fields name entities (families name framework families).
 */
const claimFields = new Set(['claimIds', 'claimId', 'extraClaimIds']);
const entityFields = new Set([
  'entityIds',
  'documentIds',
  'documentId',
  'institutionId',
  'organisationId',
  'editionIds',
  'propositionIds',
  'propositionId',
]);
const familyFields = new Set(['families', 'family']);

function collectionMembers(definition: unknown) {
  const out: { field: string; id: string }[] = [];
  const walk = (v: unknown, field: string) => {
    if (Array.isArray(v)) v.forEach((x) => walk(x, field));
    else if (v && typeof v === 'object')
      for (const [k, x] of Object.entries(v)) walk(x, k);
    else if (
      typeof v === 'string' &&
      (claimFields.has(field) ||
        entityFields.has(field) ||
        familyFields.has(field))
    )
      out.push({ field, id: v });
  };
  walk(definition, 'root');
  return out;
}

/** Runs every check and returns the findings, most severe first within each check. */
export function auditDataset(
  data: Dataset,
  collections: CollectionInput[] = [],
): AuditReport {
  const findings: Finding[] = [];
  const add = (f: Finding) => findings.push(f);
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const claims = new Map(data.claims.map((c) => [c.id, c]));
  const sources = new Map(data.sources.map((s) => [s.id, s]));
  const evidenceByClaim = new Map<string, Evidence[]>();
  const evidenceBySource = new Map<string, Evidence[]>();
  for (const v of data.evidence) {
    evidenceByClaim.set(v.claimId, [
      ...(evidenceByClaim.get(v.claimId) ?? []),
      v,
    ]);
    evidenceBySource.set(v.sourceId, [
      ...(evidenceBySource.get(v.sourceId) ?? []),
      v,
    ]);
  }
  const claimsByEntity = new Map<string, Claim[]>();
  const link = (id: string, c: Claim) =>
    claimsByEntity.set(id, [...(claimsByEntity.get(id) ?? []), c]);
  for (const c of data.claims) {
    link(c.subject, c);
    if (c.object.kind === 'entity' && c.object.entityId !== c.subject)
      link(c.object.entityId, c);
  }
  const sourcesByDocument = new Map<string, Source[]>();
  for (const s of data.sources)
    if (s.documentId)
      sourcesByDocument.set(s.documentId, [
        ...(sourcesByDocument.get(s.documentId) ?? []),
        s,
      ]);

  // 1. Duplicate or near-duplicate entities.
  {
    const byName = new Map<string, { entity: Entity; name: string }[]>();
    for (const e of data.entities) {
      // Documents are compared by title and year below.
      if (e.type === 'document') continue;
      const seen = new Set<string>();
      for (const name of entityNames(e)) {
        const key = `${familyOfType[e.type]}:${normaliseName(name)}`;
        if (normaliseName(name).length < 2 || seen.has(key)) continue;
        seen.add(key);
        byName.set(key, [...(byName.get(key) ?? []), { entity: e, name }]);
        // "Inflection" and "Inflection AI": institutions without a generic suffix.
        const bare = normaliseName(name).replace(/ (?:ai|labs?|inc)$/, '');
        const bareKey = `${familyOfType[e.type]}~${bare}`;
        if (
          familyOfType[e.type] === 'institution' &&
          bare.length > 2 &&
          !seen.has(bareKey)
        ) {
          seen.add(bareKey);
          byName.set(bareKey, [
            ...(byName.get(bareKey) ?? []),
            { entity: e, name },
          ]);
        }
      }
    }
    const reported = new Set<string>();
    for (const [key, list] of byName) {
      const ids = [...new Set(list.map((l) => l.entity.id))];
      if (ids.length < 2) continue;
      const pair = ids.slice().sort().join('+');
      if (reported.has(pair)) continue;
      reported.add(pair);
      const linked = data.claims
        .filter(
          (c) =>
            c.object.kind === 'entity' &&
            ids.includes(c.subject) &&
            ids.includes(c.object.entityId),
        )
        .map((c) => `${c.id} (${c.predicate})`);
      const kinds = [...new Set(list.map((l) => l.entity.type))];
      const subtypes = [...new Set(list.map((l) => l.entity.subtype))];
      const sharedSources = list[0].entity.sourceIds.filter((s) =>
        list.slice(1).some((l) => l.entity.sourceIds.includes(s)),
      );
      const against: string[] = [];
      if (linked.length)
        against.push(`a claim relates the two records: ${linked.join(', ')}`);
      if (subtypes.length > 1)
        against.push(`subtypes differ: ${subtypes.join(' / ')}`);
      for (const l of list)
        if (
          /historical name|predecessor|as an office|as legislators/i.test(
            l.entity.name + ' ' + l.entity.subtype,
          )
        )
          against.push(
            `${l.entity.id} is framed as a distinct historical or role referent`,
          );
      const forIt = [
        `shared name “${key.split(/[:~]/)[1]}” (${list.map((l) => `${l.entity.id}: ${l.name}`).join('; ')})`,
      ];
      if (sharedSources.length)
        forIt.push(`shared identity sources: ${sharedSources.join(', ')}`);
      add({
        check: 'duplicates',
        code:
          kinds[0] === 'person' ? 'person-name-collision' : 'name-collision',
        severity: linked.length ? 'low' : 'medium',
        fix: 'needs_source',
        ids,
        message: `${ids.join(' and ')} share a normalised name or alias (“${key.split(/[:~]/)[1]}”).`,
        details: { for: forIt, against, types: kinds },
      });
    }
    // Persons: same family name and given-name initial under different IDs.
    const persons = data.entities.filter(
      (e) => e.type === 'person' && e.sortName,
    );
    const byFamily = new Map<string, Entity[]>();
    // Chinese and other family-first names stored in the other order.
    const sortKeys = new Map(
      persons.map((p) => [normaliseName(p.sortName!), p]),
    );
    for (const p of persons) {
      const [family, given] = p.sortName!.split(', ');
      const swapped = sortKeys.get(normaliseName(`${given}, ${family}`));
      if (swapped && swapped.id !== p.id && p.id < swapped.id)
        add({
          check: 'duplicates',
          code: 'person-swapped-name-order',
          severity: 'medium',
          fix: 'needs_source',
          ids: [p.id, swapped.id],
          message: `${p.id} (“${p.name}”) and ${swapped.id} (“${swapped.name}”) have the same name elements in opposite order.`,
          details: {
            for: ['family and given names swapped between the two sortNames'],
            against: [p, swapped].map(
              (x) => `${x.id}: ${x.subtype}; ${x.description.slice(0, 160)}`,
            ),
          },
        });
      const key = `${normaliseName(family)}:${normaliseName(given).slice(0, 1)}`;
      byFamily.set(key, [...(byFamily.get(key) ?? []), p]);
    }
    for (const list of byFamily.values()) {
      if (list.length < 2) continue;
      const ids = list.map((p) => p.id);
      if (reported.has(ids.slice().sort().join('+'))) continue;
      const given = list.map((p) => p.sortName!.split(', ')[1]);
      const initials = (g: string) => /^(?:\p{Lu}\.?[ -]?)+$/u.test(g);
      // A full given name that differs beyond an initial or a middle name is
      // a different person far more often than not.
      const compatible = given.every((g) =>
        given.every(
          (h) =>
            normaliseName(g).split(' ')[0] === normaliseName(h).split(' ')[0] ||
            initials(g) ||
            initials(h),
        ),
      );
      if (!compatible) continue;
      add({
        check: 'duplicates',
        code: 'person-variant-name',
        severity: 'medium',
        fix: 'needs_source',
        ids,
        message: `Person records with the same family name and compatible given names: ${list.map((p) => `${p.id} (“${p.name}”)`).join(', ')}.`,
        details: {
          for: [
            'same family name; given names compatible (initial or first name)',
          ],
          against: list.map(
            (p) => `${p.id}: ${p.subtype}; ${p.description.slice(0, 160)}`,
          ),
        },
      });
    }
    // Sources: one URL under two source IDs splits a document's quotation budget.
    const byUrl = new Map<string, Source[]>();
    const url = (u: string) =>
      u
        .replace(/^https?:\/\/(www\.)?/, '')
        .replace(/#.*$/, '')
        .replace(/[?&](?:utm_[a-z]+|ref|source)=[^&]*/g, '')
        .replace(/\/$/, '')
        .toLowerCase();
    for (const s of data.sources) {
      const keys = new Set([url(s.canonicalUrl), url(s.evidenceUrl)]);
      for (const k of keys) byUrl.set(k, [...(byUrl.get(k) ?? []), s]);
    }
    const urlPairs = new Set<string>();
    for (const [u, list] of byUrl) {
      const ids = [...new Set(list.map((s) => s.id))];
      if (ids.length < 2) continue;
      const pair = ids.slice().sort().join('+');
      if (urlPairs.has(pair)) continue;
      urlPairs.add(pair);
      const items = ids.map((id) => sources.get(id)!);
      const versions = new Set(
        items.map(
          (s) =>
            s.version + '|' + (s.versionDate ?? '') + '|' + s.publicationDate,
        ),
      );
      const documents = new Set(items.map((s) => s.documentId ?? ''));
      const distinctExpressions = versions.size === items.length;
      // Parts of one volume or archive (chapters, appendix papers, messages
      // in one bundle): different titles and different document identities.
      const parts =
        new Set(items.map((s) => normaliseName(s.title))).size ===
          items.length &&
        documents.size === items.length &&
        !documents.has('');
      // The same title and document: one expression recorded twice, or a
      // re-inspection recorded as a new source.
      const sameWork =
        new Set(items.map((s) => normaliseName(s.title))).size === 1 &&
        (documents.size === 1 || !documents.has(''));
      add({
        check: 'duplicates',
        code: parts
          ? 'source-same-container'
          : sameWork
            ? 'source-same-work-twice'
            : 'source-same-url',
        severity: parts ? 'info' : sameWork ? 'medium' : 'low',
        fix: parts ? 'none' : sameWork ? 'convention' : 'needs_source',
        ids,
        message: `${ids.length} source records share the URL ${u}.`,
        details: {
          sources: items.map((s) => ({
            id: s.id,
            title: s.title,
            version: s.version,
            publicationDate: s.publicationDate,
            documentId: s.documentId,
            evidence: evidenceBySource.get(s.id)?.length ?? 0,
          })),
          note: distinctExpressions
            ? 'The records name different versions or dates; they may be separate expressions of a mutable page, each with its own quotation budget.'
            : 'The records give the same version and date: probably one expression recorded twice, which also splits its quotation budget.',
        },
      });
    }
    // Documents: the same title (and year) under two document IDs.
    const docKey = new Map<string, Entity[]>();
    for (const e of data.entities) {
      if (e.type !== 'document') continue;
      const k = normaliseName(e.name.replace(/\s*\(\d{4}[^)]*\)\s*$/, ''));
      if (k.length < 8) continue;
      docKey.set(k, [...(docKey.get(k) ?? []), e]);
    }
    // Messages and posts in one thread share a subject line by design.
    const threaded = /message|post|comment/i;
    const docYear = (e: Entity) =>
      new Set(
        [
          e.documentVersion?.publishedAt,
          ...(sourcesByDocument.get(e.id) ?? []).map((s) => s.publicationDate),
          ...(claimsByEntity.get(e.id) ?? [])
            .filter(
              (c) => c.predicate === 'published' || c.predicate === 'authored',
            )
            .map((c) => claimDates(c)[0]),
        ]
          .filter((d): d is string => Boolean(d))
          .map((d) => d.slice(0, 4)),
      );
    for (const [k, list] of docKey) {
      if (list.length < 2) continue;
      const ids = list.map((e) => e.id);
      if (list.every((e) => threaded.test(e.subtype))) continue;
      const families = new Set(
        list.map((e) => e.documentVersion?.family ?? ''),
      );
      // Editions of one family are versions, not duplicates.
      if (families.size === 1 && list[0].documentVersion) continue;
      const years = list.map(docYear);
      const sameYear = years.some((y, i) =>
        years.some((z, j) => i !== j && [...y].some((x) => z.has(x))),
      );
      add({
        check: 'duplicates',
        code: sameYear
          ? 'document-same-title-same-year'
          : 'document-same-title',
        severity: sameYear ? 'medium' : 'low',
        fix: sameYear ? 'convention' : 'none',
        ids,
        message: `Document records with the same title “${k}”.`,
        details: {
          documents: list.map((e, i) => ({
            id: e.id,
            name: e.name,
            subtype: e.subtype,
            version: e.documentVersion?.label,
            years: [...years[i]],
            sources: (sourcesByDocument.get(e.id) ?? []).map((s) => s.id),
          })),
        },
      });
    }
  }

  // 2. Type and subtype drift.
  {
    const subtypes = new Map<string, Map<string, string[]>>();
    for (const e of data.entities) {
      const m = subtypes.get(e.type) ?? new Map<string, string[]>();
      m.set(e.subtype, [...(m.get(e.subtype) ?? []), e.id]);
      subtypes.set(e.type, m);
    }
    for (const [type, m] of subtypes) {
      const once = [...m].filter(([, ids]) => ids.length === 1).length;
      // A type with a closed list (decision C2, 2026-10-29) is checked
      // against it below; its vocabulary is reported for context only.
      const closed = subtypeLists[type as Entity['type']];
      add({
        check: 'types',
        code: 'subtype-vocabulary',
        severity: !closed && m.size > 20 ? 'medium' : 'info',
        fix: 'convention',
        ids: [],
        message: `${type}: ${m.size} distinct subtypes for ${[...m.values()].flat().length} records; ${once} are used once.`,
        details: {
          type,
          subtypes: Object.fromEntries(
            [...m]
              .sort((a, b) => b[1].length - a[1].length)
              .map(([s, ids]) => [s, ids.length]),
          ),
        },
      });
      if (closed)
        for (const [subtype, ids] of m)
          if (!closed.includes(subtype))
            add({
              check: 'types',
              code: 'subtype-outside-list',
              severity: 'low',
              fix: 'mechanical',
              ids,
              message: `${type}: the subtype “${subtype}” is not in the closed list of docs/ontology.md (${ids.length} records).`,
            });
      // Near-identical subtypes: case, plurals and parenthetical glosses.
      const stem = (s: string) =>
        normaliseName(s)
          .replace(/s\b/g, '')
          .replace(/\b(work|report)\b/g, '')
          .trim();
      const groups = new Map<string, string[]>();
      for (const s of m.keys())
        groups.set(stem(s), [...(groups.get(stem(s)) ?? []), s]);
      for (const variants of groups.values())
        if (variants.length > 1)
          add({
            check: 'types',
            code: 'subtype-variants',
            severity: 'low',
            fix: 'convention',
            ids: variants.flatMap((v) => m.get(v)!),
            message: `${type}: near-identical subtypes ${variants.map((v) => `“${v}”`).join(', ')}.`,
          });
    }
    // Comparable institutions typed differently: a government or
    // intergovernmental body recorded as an organisation.
    const governmental =
      /\b(?:government|national|federal|ministry|state administration|agency|regulator|commission|coordination center|emergency response|ai (?:safety|security) institute|standards and innovation|department of)\b/i;
    for (const e of data.entities) {
      if (e.type !== 'organisation') continue;
      const text = `${e.name} ${e.subtype} ${e.aliases.join(' ')} ${e.description}`;
      if (
        !governmental.test(`${e.name} ${e.subtype}`) &&
        !/\b(?:government|state-backed|state-run|public institution)\b/i.test(
          e.description,
        )
      )
        continue;
      add({
        check: 'types',
        code: 'government-body-as-organisation',
        severity: 'medium',
        fix: 'convention',
        ids: [e.id],
        message: `${e.id} (“${e.name}”, subtype “${e.subtype}”) is typed organisation, though its name or description reads as a governmental body.`,
        details: { evidence: text.slice(0, 300) },
      });
    }
    // Role-relative subtypes: a subtype that describes a record's place in one
    // pack (supporting, referent) rather than what the entity is.
    const roleRelative = new Map<string, Entity[]>();
    for (const e of data.entities)
      if (
        /^(?:supporting institution|institutional referent|institutional actor|author)$/i.test(
          e.subtype,
        )
      )
        roleRelative.set(e.subtype, [
          ...(roleRelative.get(e.subtype) ?? []),
          e,
        ]);
    for (const [subtype, list] of roleRelative)
      add({
        check: 'types',
        code: 'role-relative-subtype',
        severity: list.some((e) => e.type !== 'person') ? 'medium' : 'low',
        fix: 'convention',
        ids: list.map((e) => e.id),
        message: `${list.length} ${list[0].type} records have the subtype “${subtype}”, which names their place in a pack rather than what they are.`,
        details: {
          examples: list.slice(0, 12).map((e) => `${e.id}: ${e.name}`),
        },
      });
    // Subtypes that carry a qualification or a record state.
    for (const e of data.entities)
      if (
        /\((?:[^)]*not inspected|as described by|as an office|as legislators|as joint publisher|historical name|text not)[^)]*\)|\bnot (?:inspected|adopted)\b/i.test(
          e.subtype + ' ' + e.name,
        )
      )
        add({
          check: 'types',
          code: 'qualified-subtype',
          severity: 'low',
          fix: 'convention',
          ids: [e.id],
          message: `${e.id}: the name or subtype carries a qualification (“${e.subtype}”${/\(/.test(e.name) ? `; name “${e.name}”` : ''}).`,
        });
    // Content of a document recorded as its publication: `published` claims
    // whose statement reports what the text states. Provision records need
    // document-version metadata, which these documents lack.
    const published = new Map<string, Claim[]>();
    for (const c of data.claims)
      if (c.predicate === 'published' && c.object.kind === 'entity')
        published.set(c.object.entityId, [
          ...(published.get(c.object.entityId) ?? []),
          c,
        ]);
    for (const [doc, list] of published) {
      const content = list.filter((c) =>
        /\b(?:states?|provides?|lists?|includes?|says|commits|requires|defines|sets out|describes|names)\b(?! .{0,20}\bpublished\b)/.test(
          stripQuoted(c.statement),
        ),
      );
      if (!content.length || list.length < 2) continue;
      add({
        check: 'types',
        code: 'content-recorded-as-publication',
        severity: 'medium',
        fix: 'convention',
        ids: content.map((c) => c.id),
        message: `${content.length} of ${list.length} \`published\` records on ${doc} report what the text states rather than its publication${entities.get(doc)?.documentVersion ? '' : '; the document has no version metadata, which provision records require'}.`,
        details: Object.fromEntries(
          content.map((c) => [c.id, c.statement.slice(0, 200)]),
        ),
      });
    }
    // Publisher strings: one publisher identity printed several ways, and
    // sources whose publisher is an entity in the dataset but not linked.
    const byPublisher = new Map<string, Set<string>>();
    // A printed form that is one of the publisher's dated names is the name
    // it bore at the time, not a variant.
    const datedNameOf = (id: string, name: string) =>
      data.entities
        .find((e) => e.id === id)
        ?.datedNames?.some((n) => n.name === name);
    for (const src of data.sources)
      if (src.publisherId && !datedNameOf(src.publisherId, src.publisher))
        byPublisher.set(
          src.publisherId,
          (byPublisher.get(src.publisherId) ?? new Set()).add(src.publisher),
        );
    for (const [pid, names] of byPublisher)
      if (names.size > 1)
        add({
          check: 'types',
          code: 'publisher-name-variants',
          severity: 'low',
          fix: 'convention',
          ids: [pid],
          message: `Sources linked to ${pid} print its publisher ${names.size} ways: ${[...names].map((n) => `“${n}”`).join(', ')}.`,
        });
    const institutionByName = new Map<string, Set<string>>();
    for (const e of data.entities)
      if (familyOfType[e.type] === 'institution')
        for (const n of entityNames(e))
          institutionByName.set(
            normaliseName(n),
            (institutionByName.get(normaliseName(n)) ?? new Set()).add(e.id),
          );
    const unlinked = new Map<string, string[]>();
    for (const src of data.sources) {
      if (src.publisherId) continue;
      const ids = institutionByName.get(normaliseName(src.publisher));
      if (!ids) continue;
      const key = [...ids].sort().join(' or ');
      unlinked.set(key, [...(unlinked.get(key) ?? []), src.id]);
    }
    if (unlinked.size)
      add({
        check: 'types',
        code: 'publisher-not-linked',
        // Convention C11 (2026-10-29) links only an author institution that
        // one name identifies, never a hosting platform; the rest stay
        // unlinked by that convention.
        severity: 'info',
        fix: 'convention',
        ids: [...unlinked.values()].flat(),
        message: `${[...unlinked.values()].flat().length} sources print a publisher name that matches an entity in the dataset but do not link it by publisherId (${unlinked.size} names). By convention C11 they stay unlinked: a hosting platform or a legal filing.`,
        details: Object.fromEntries(
          [...unlinked]
            .sort((a, b) => b[1].length - a[1].length)
            .map(([id, list]) => [id, list.length]),
        ),
      });
    // Renamings recorded both ways: one entity with dated names, or two
    // entities joined by a name-transition claim.
    const transitions = data.claims.filter(
      (c) => c.predicate === 'name_transition_announced',
    );
    const dated = data.entities.filter((e) => e.datedNames);
    // Decision C3 (2026-10-29): dated names for a renaming of one body; two
    // entities and a name-transition claim where the sources describe a new
    // body. Both models are then expected, so the remaining transitions are
    // listed for context.
    if (transitions.length && dated.length)
      add({
        check: 'types',
        code: 'renaming-two-models',
        severity: 'info',
        fix: 'convention',
        ids: [...dated.map((e) => e.id), ...transitions.map((c) => c.id)],
        message: `Renamings are recorded two ways, by convention C3: ${dated.length} entities carry dated names (a renaming of one body), and ${transitions.length} name-transition claims join two entities (where the sources describe a new body, or do not establish one).`,
        details: {
          datedNames: dated.map(
            (e) => `${e.id}: ${e.datedNames!.map((n) => n.name).join(' → ')}`,
          ),
          transitions: transitions.map(
            (c) =>
              `${c.id}: ${c.subject} → ${c.object.kind === 'entity' ? c.object.entityId : ''}`,
          ),
        },
      });
  }

  // 3. Date consistency.
  {
    for (const s of data.sources) {
      if (s.publicationDate && dateRange(s.publicationDate)[0] > s.accessedAt)
        add({
          check: 'dates',
          code: 'source-published-after-access',
          severity: 'high',
          fix: 'needs_source',
          ids: [s.id],
          message: `${s.id}: publication date ${s.publicationDate} is after its access date ${s.accessedAt}.`,
        });
      if (s.versionDate && dateRange(s.versionDate)[0] > s.accessedAt)
        add({
          check: 'dates',
          code: 'source-version-after-access',
          severity: 'high',
          fix: 'needs_source',
          ids: [s.id],
          message: `${s.id}: version date ${s.versionDate} is after its access date ${s.accessedAt}.`,
        });
      if (
        s.versionDate &&
        s.publicationDate &&
        dateRange(s.versionDate)[1] < dateRange(s.publicationDate)[0]
      )
        add({
          check: 'dates',
          code: 'source-version-before-publication',
          severity: 'low',
          fix: 'needs_source',
          ids: [s.id],
          message: `${s.id}: version date ${s.versionDate} is before its publication date ${s.publicationDate}.`,
        });
      for (const v of evidenceBySource.get(s.id) ?? []) {
        if (s.publicationDate && dateRange(s.publicationDate)[0] > v.checkedAt)
          add({
            check: 'dates',
            code: 'evidence-checked-before-publication',
            severity: 'high',
            fix: 'needs_source',
            ids: [v.id, s.id],
            message: `${v.id} was checked on ${v.checkedAt}, before ${s.id} was published (${s.publicationDate}).`,
          });
        // Convention C8 (2026-10-29): accessedAt is the latest inspection of
        // the expression and checkedAt the last check of the passage, so a
        // passage not re-checked at a later inspection keeps its earlier date.
        if (v.checkedAt < s.accessedAt)
          add({
            check: 'dates',
            code: 'evidence-checked-before-access',
            severity: 'info',
            fix: 'convention',
            ids: [v.id, s.id],
            message: `${v.id} was checked on ${v.checkedAt}, before its source's recorded access date ${s.accessedAt}.`,
          });
      }
      // Source expression dates against the document version they identify.
      const doc = s.documentId ? entities.get(s.documentId) : undefined;
      const dv = doc?.documentVersion;
      if (dv && (s.publicationDate || s.versionDate)) {
        const docDates = [dv.publishedAt, dv.effectiveAt, dv.revisedAt].filter(
          (d): d is string => Boolean(d),
        );
        const sourceDates = [s.publicationDate, s.versionDate].filter(
          (d): d is string => Boolean(d),
        );
        const explained = sourceDates.some((d) => mentionsDate(dv.dateNote, d));
        if (
          !sourceDates.some((d) => docDates.some((x) => datesCompatible(d, x)))
        )
          add({
            check: 'dates',
            code: explained
              ? 'source-document-version-dates-explained'
              : 'source-document-version-dates',
            severity: explained ? 'info' : 'medium',
            fix: explained ? 'none' : 'needs_source',
            ids: [s.id, doc!.id],
            message: `${s.id} (${sourceDates.join(', ')}) shares no date with its document version ${doc!.id} (${docDates.join(', ')}).`,
            details: { dateNote: dv.dateNote },
          });
      }
    }
    // Publication and authorship events against the document's own dates.
    for (const c of data.claims) {
      if (c.time.kind !== 'event' || c.object.kind !== 'entity') continue;
      if (!['published', 'authored', 'enacted'].includes(c.predicate)) continue;
      const doc = entities.get(c.object.entityId);
      if (doc?.type !== 'document') continue;
      const known = [
        doc.documentVersion?.publishedAt,
        doc.documentVersion?.effectiveAt,
        doc.documentVersion?.revisedAt,
        ...(sourcesByDocument.get(doc.id) ?? []).flatMap((s) => [
          s.publicationDate,
          s.versionDate,
        ]),
      ].filter((d): d is string => Boolean(d));
      if (!known.length) continue;
      const date = c.time.date;
      // Signature, announcement and effect dates legitimately differ from
      // a text's publication date.
      const otherBasis = c.time.basis && c.time.basis !== 'publication';
      const explained =
        doc.documentVersion?.dateNote &&
        mentionsDate(doc.documentVersion.dateNote, date);
      if (!known.some((d) => datesCompatible(d, date)))
        add({
          check: 'dates',
          code:
            otherBasis || explained
              ? 'event-basis-differs-from-document'
              : 'event-date-conflicts-document',
          severity: otherBasis || explained ? 'info' : 'medium',
          fix: otherBasis || explained ? 'none' : 'needs_source',
          ids: [c.id, doc.id],
          message: `${c.id} dates the ${c.predicate} event ${date}${c.time.basis ? ` (basis ${c.time.basis})` : ''}; ${doc.id} and its sources give ${[...new Set(known)].join(', ')}.`,
          details: {
            note: c.time.note,
            dateNote: doc.documentVersion?.dateNote,
          },
        });
    }
    // The same event recorded with different dates or precision.
    const events = new Map<string, Claim[]>();
    for (const c of data.claims) {
      if (c.time.kind !== 'event' || c.object.kind !== 'entity') continue;
      // One event per document (its publication), per object (a launch,
      // an acquisition, a veto) or per actor and organisation (a founding).
      const perObject = [
        'published',
        'authored',
        'vetoed',
        'revoked',
        'launched',
        'acquired',
      ];
      const perPair = [
        'co_founded',
        'licensing_hiring_agreement',
        'combined_into',
      ];
      if (!perObject.includes(c.predicate) && !perPair.includes(c.predicate))
        continue;
      if (
        c.time.basis &&
        c.time.basis !== 'publication' &&
        ['published', 'authored'].includes(c.predicate)
      )
        continue;
      const k = perPair.includes(c.predicate)
        ? `${c.subject} → ${c.object.entityId}|${c.predicate}`
        : `${c.object.entityId}|${['published', 'authored'].includes(c.predicate) ? 'publication' : c.predicate}`;
      events.set(k, [...(events.get(k) ?? []), c]);
    }
    for (const [k, list] of events) {
      if (list.length < 2) continue;
      const dates = [
        ...new Set(list.map((c) => (c.time as { date: string }).date)),
      ];
      if (dates.length < 2) continue;
      const conflict = dates.some((a) =>
        dates.some((b) => !datesCompatible(a, b)),
      );
      const precisions = new Set(dates.map(precision));
      if (!conflict && precisions.size < 2) continue;
      add({
        check: 'dates',
        code: conflict
          ? 'same-event-conflicting-dates'
          : 'same-event-mixed-precision',
        severity: conflict ? 'medium' : 'low',
        fix: conflict ? 'needs_source' : 'mechanical',
        ids: list.map((c) => c.id),
        message: `${k.replace('|', ' — ')}: ${list.length} records give ${dates.join(', ')}.`,
        details: Object.fromEntries(
          list.map((c) => [
            c.id,
            `${c.subject}: ${(c.time as { date: string }).date}`,
          ]),
        ),
      });
    }
    // Targets, deadlines and plans recorded as event dates.
    // A note that calls the record's own date a target or a plan.
    const target =
      /\b(?:target(?:ed)? (?:date|year)|date (?:is|was) (?:a|the) target|planned (?:date|completion)|expected (?:date|completion)|scheduled date)\b/i;
    for (const c of data.claims) {
      if (c.time.kind !== 'event') continue;
      const stage = c.attributes?.transactionStage;
      const futureOfRecord = dateRange(c.time.date)[0] > c.recordedAt;
      // A note that dates the record by its announcement and sets a planned
      // date aside follows the rule; it is not a target used as the date.
      const noteSaysTarget =
        target.test(stripQuoted(c.time.note)) &&
        !/^announcement date|not (?:independently )?(?:confirmed|used)/i.test(
          c.time.note,
        );
      // A statement such as "capacity expected online in 2026" dated 2026.
      const year = c.time.date.slice(0, 4);
      const statedTarget =
        new RegExp(
          `\\b(?:expected|planned|scheduled|target(?:ed)?|aims? to|due)\\b[^.]{0,60}\\b${year}\\b`,
          'i',
        ).test(stripQuoted(c.statement)) &&
        c.time.basis !== 'announcement' &&
        c.time.basis !== 'publication';
      if (!futureOfRecord && !noteSaysTarget && !statedTarget) continue;
      add({
        check: 'dates',
        code: futureOfRecord ? 'scheduled-date-as-event' : 'target-as-event',
        // Convention C7 (2026-10-29): an effective date still to come when
        // the record was made says so in its time note.
        severity: futureOfRecord
          ? c.time.basis === 'effective'
            ? /scheduled at the time of recording/i.test(c.time.note)
              ? 'info'
              : 'medium'
            : 'high'
          : 'medium',
        fix: futureOfRecord ? 'convention' : 'needs_source',
        ids: [c.id],
        message: futureOfRecord
          ? `${c.id}: event date ${c.time.date}${c.time.basis ? ` (basis ${c.time.basis})` : ''} is after the record was made (${c.recordedAt}); it is a scheduled date that had not yet occurred.`
          : `${c.id}: event dated ${c.time.date}, but its time note describes a target or schedule.`,
        details: { basis: c.time.basis, stage, note: c.time.note },
      });
    }
  }

  // 4. Orphans and dangling references.
  {
    const identityUse = new Set<string>();
    for (const e of data.entities) {
      e.sourceIds.forEach((s) => identityUse.add(s));
      e.datedNames?.forEach((n) =>
        n.sourceIds.forEach((s) => identityUse.add(s)),
      );
    }
    for (const s of data.sources) {
      if (evidenceBySource.has(s.id)) continue;
      add({
        check: 'orphans',
        code: identityUse.has(s.id) ? 'source-identity-only' : 'source-unused',
        severity: identityUse.has(s.id) ? 'info' : 'medium',
        fix: identityUse.has(s.id) ? 'none' : 'mechanical',
        ids: [s.id],
        message: identityUse.has(s.id)
          ? `${s.id} has no evidence; it is used only as an identity source of an entity.`
          : `${s.id} has no evidence and is not an identity source.`,
      });
    }
    for (const e of data.entities) {
      if (claimsByEntity.has(e.id)) continue;
      const referenced =
        data.meta.anchors.includes(e.id) ||
        data.entities.some(
          (x) =>
            x.documentVersion?.publisherId === e.id ||
            x.documentVersion?.family === e.id,
        ) ||
        data.sources.some(
          (s) => s.publisherId === e.id || s.documentId === e.id,
        ) ||
        data.claims.some((c) => c.attributes?.statedReason?.by === e.id);
      const versions =
        e.type === 'document' ? (sourcesByDocument.get(e.id)?.length ?? 0) : 0;
      add({
        check: 'orphans',
        code:
          e.type === 'document'
            ? 'document-without-claims'
            : 'entity-without-claims',
        severity: referenced
          ? 'info'
          : e.type === 'concept' && e.proposition
            ? 'medium'
            : 'low',
        fix: referenced ? 'none' : 'convention',
        ids: [e.id],
        message: `${e.id} (${e.type}, “${e.name}”) is the subject or object of no claim${referenced ? '; other records refer to it' : ''}${e.type === 'document' ? `; ${versions} source expression(s) identify it` : ''}.`,
      });
    }
    for (const e of data.entities) {
      if (e.type !== 'document' || !e.documentVersion) continue;
      if (!sourcesByDocument.has(e.id))
        add({
          check: 'orphans',
          code: 'version-without-source-expression',
          severity: 'low',
          fix: 'convention',
          ids: [e.id],
          message: `${e.id} carries version metadata (${e.documentVersion.label}) but no source record identifies it as its document.`,
        });
    }
    // Dangling references validation does not check.
    for (const c of data.claims) {
      const r = c.attributes?.statedReason;
      if (r && !entities.has(r.by))
        add({
          check: 'orphans',
          code: 'dangling-stated-reason-by',
          severity: 'high',
          fix: 'mechanical',
          ids: [c.id],
          message: `${c.id}: statedReason.by ${r.by} is not an entity.`,
        });
      if (r && !c.evidenceIds.includes(r.evidenceId))
        add({
          check: 'orphans',
          code: 'dangling-stated-reason-evidence',
          severity: 'high',
          fix: 'mechanical',
          ids: [c.id],
          message: `${c.id}: statedReason.evidenceId ${r.evidenceId} is not one of its evidence items.`,
        });
    }
    const looseFamilies = data.entities.filter(
      (e) => e.documentVersion && !entities.has(e.documentVersion.family),
    );
    if (looseFamilies.length)
      add({
        check: 'orphans',
        code: 'version-family-not-entity',
        severity: 'info',
        fix: 'none',
        ids: looseFamilies.map((e) => e.id),
        message: `${looseFamilies.length} document versions name a family key with no framework-family concept (allowed: a family concept is introduced only when a claim needs it).`,
      });
    // Collection members.
    const familyKeys = new Set(
      data.entities.map((e) => e.documentVersion?.family).filter(Boolean),
    );
    const inCollections = new Set<string>();
    for (const col of collections) {
      for (const { field, id } of collectionMembers(col.definition)) {
        inCollections.add(id);
        const missing = claimFields.has(field)
          ? !claims.has(id)
          : familyFields.has(field)
            ? !familyKeys.has(id) && !entities.has(id)
            : !entities.has(id);
        if (missing) {
          add({
            check: 'orphans',
            code: 'collection-member-missing',
            severity: 'high',
            fix: 'mechanical',
            ids: [id],
            message: `${col.kind}:${col.id} names ${id} in ${field}, but no such record exists.`,
          });
          continue;
        }
        const e = entities.get(id);
        const scope =
          (field.startsWith('proposition') && e && !e.proposition) ||
          ((field === 'documentIds' ||
            field === 'documentId' ||
            field === 'editionIds') &&
            e &&
            e.type !== 'document') ||
          ((field === 'institutionId' || field === 'organisationId') &&
            e &&
            !['organisation', 'public_body'].includes(e.type));
        if (scope)
          add({
            check: 'orphans',
            code: 'collection-member-out-of-scope',
            severity: 'high',
            fix: 'mechanical',
            ids: [id],
            message: `${col.kind}:${col.id} names ${id} in ${field}, but it is a ${e!.type}${field.startsWith('proposition') ? ' without a proposition block' : ''}.`,
          });
      }
    }
    if (collections.length) {
      for (const e of data.entities)
        if (e.proposition && !inCollections.has(e.id))
          add({
            check: 'orphans',
            code: 'proposition-in-no-collection',
            severity: 'medium',
            fix: 'convention',
            ids: [e.id],
            message: `Proposition ${e.proposition.code} (${e.id}) is listed by no propositions collection.`,
          });
    }
  }

  // 5. Evidence quality flags.
  {
    const supportsOf = (c: Claim) =>
      (evidenceByClaim.get(c.id) ?? []).filter((v) => v.support === 'supports');
    const byKey = new Map<string, Claim[]>();
    for (const c of data.claims)
      byKey.set(claimKey(c), [...(byKey.get(claimKey(c)) ?? []), c]);
    const reportingOnly = new Map<string, number>();
    for (const c of data.claims) {
      const sup = supportsOf(c);
      if (!sup.length || sup.some((v) => v.sourceRole === 'primary')) continue;
      reportingOnly.set(c.predicate, (reportingOnly.get(c.predicate) ?? 0) + 1);
      // Assessments rest on commentary by design.
      if (
        c.predicate === 'provision_assessed' ||
        c.predicate === 'control_assessed' ||
        c.attributes?.changeBasis === 'assessment'
      )
        continue;
      // A primary source of the actor itself, published the same day.
      if (c.time.kind === 'event' || c.time.kind === 'snapshot') {
        const day = c.time.date;
        const actors = [
          c.subject,
          c.object.kind === 'entity' ? c.object.entityId : '',
        ];
        const names = new Set(
          actors
            .map((a) => entities.get(a))
            .filter(Boolean)
            .flatMap((e) => entityNames(e!).map(normaliseName)),
        );
        const same =
          precision(day) === 3
            ? data.sources.filter(
                (s) =>
                  s.publicationDate === day &&
                  (actors.includes(s.publisherId ?? '') ||
                    names.has(normaliseName(s.publisher))) &&
                  !sup.some((v) => v.sourceId === s.id) &&
                  (evidenceBySource.get(s.id) ?? []).some(
                    (v) => v.sourceRole === 'primary',
                  ),
              )
            : [];
        if (same.length)
          add({
            check: 'evidence',
            code: 'secondary-only-actor-source-same-day',
            severity: 'medium',
            fix: 'needs_source',
            ids: [c.id, ...same.map((s) => s.id)],
            message: `${c.id} rests only on reporting; ${same.map((s) => s.id).join(', ')}, published by a party to the record on the same day (${day}), is primary evidence elsewhere in the dataset.`,
            details: {
              statement: c.statement,
              secondarySources: [...new Set(sup.map((v) => v.sourceId))],
            },
          });
      }
      const siblings = (byKey.get(claimKey(c)) ?? []).filter(
        (o) =>
          o.id !== c.id &&
          supportsOf(o).some((v) => v.sourceRole === 'primary'),
      );
      const docs = [
        c.subject,
        c.object.kind === 'entity' ? c.object.entityId : '',
      ]
        .map((id) => entities.get(id))
        .filter((e): e is Entity => e?.type === 'document');
      const textual = docs.filter((d) =>
        (sourcesByDocument.get(d.id) ?? []).some(
          (s) =>
            !sup.some((v) => v.sourceId === s.id) &&
            (evidenceBySource.get(s.id) ?? []).some(
              (v) => v.sourceRole === 'primary',
            ),
        ),
      );
      if (!siblings.length && !textual.length) continue;
      add({
        check: 'evidence',
        code: 'secondary-only-primary-elsewhere',
        severity: 'medium',
        fix: 'needs_source',
        ids: [c.id, ...siblings.map((o) => o.id)],
        message: siblings.length
          ? `${c.id} rests only on secondary evidence; ${siblings.map((o) => o.id).join(', ')} records the same subject, predicate and object with primary evidence.`
          : `${c.id} rests only on secondary evidence about ${textual.map((d) => d.id).join(', ')}, whose own text is a primary source elsewhere in the dataset.`,
        details: {
          predicate: c.predicate,
          secondarySources: [...new Set(sup.map((v) => v.sourceId))],
          primaryTextSources: textual.flatMap((d) =>
            (sourcesByDocument.get(d.id) ?? []).map((s) => s.id),
          ),
        },
      });
    }
    add({
      check: 'evidence',
      code: 'resting-on-reporting',
      severity: 'info',
      fix: 'none',
      ids: [],
      message: `${[...reportingOnly.values()].reduce((a, b) => a + b, 0)} claims rest only on secondary supporting evidence.`,
      details: {
        byPredicate: Object.fromEntries(
          [...reportingOnly].sort((a, b) => b[1] - a[1]),
        ),
      },
    });
    // Tertiary references are discovery aids, never evidence.
    const tertiary =
      /(?:^|\.)(?:wikipedia\.org|wikidata\.org|britannica\.com|wikiwand\.com|everybodywiki\.com|baike\.baidu\.com)$/i;
    for (const s of data.sources) {
      const hosts = [s.canonicalUrl, s.evidenceUrl, s.archivedUrl ?? ''].map(
        (u) => {
          try {
            return new URL(u).hostname;
          } catch {
            return '';
          }
        },
      );
      // An archive URL embeds the original address.
      const embedded =
        (s.archivedUrl ?? '').match(
          /\/web\/\d+[a-z_]*\/(https?:\/\/[^/]+)/,
        )?.[1] ?? '';
      const hit = [...hosts, embedded.replace(/^https?:\/\//, '')].find(
        (h) => h && tertiary.test(h),
      );
      if (hit && evidenceBySource.has(s.id))
        add({
          check: 'evidence',
          code: 'tertiary-source-as-evidence',
          severity: 'high',
          fix: 'needs_source',
          ids: [
            s.id,
            ...(evidenceBySource.get(s.id) ?? []).map((v) => v.claimId),
          ],
          message: `${s.id} (${hit}) is a general-reference source used as evidence for ${evidenceBySource.get(s.id)!.length} item(s).`,
        });
    }
    // Quotation headroom per source.
    for (const s of data.sources) {
      const quotes = (evidenceBySource.get(s.id) ?? []).filter(
        (v) => v.passageType === 'quote',
      );
      if (!quotes.length || !s.documentWords) continue;
      const unique = [...new Set(quotes.map((v) => squash(v.passage)))];
      const used = unique.reduce((n, p) => n + words(p), 0);
      const limit = maxQuotedWords(s.documentWords.count);
      const headroom = limit - used;
      if (headroom > Math.max(25, limit * 0.1)) continue;
      // Long texts near the cap are where later packs will want to quote;
      // a short message quoted once is at its cap by construction.
      add({
        check: 'evidence',
        code: 'quotation-headroom',
        severity:
          headroom < 0
            ? 'info'
            : limit >= 400
              ? 'medium'
              : headroom <= 5
                ? 'low'
                : 'info',
        fix: 'none',
        ids: [s.id],
        message: `${s.id}: ${used} of ${limit} quoted words used (${headroom} left) from a ${s.documentWords.count}-word document.`,
        details: {
          used,
          limit,
          headroom,
          passages: unique.length,
          documentWords: s.documentWords.count,
        },
      });
    }
  }

  // 6. Wording in our own text.
  {
    for (const f of ownTextFields(data)) {
      const own = stripQuoted(f.text);
      for (const rule of wordRules) {
        const m = own.match(rule.pattern);
        if (!m) continue;
        // The sentence the match sits in.
        const at = own.indexOf(m[0]);
        const start = Math.max(own.lastIndexOf('. ', at) + 1, 0);
        const endDot = own.indexOf('. ', at);
        const sentence = own
          .slice(start, endDot < 0 ? undefined : endDot + 1)
          .trim();
        // Negations that block a misreading are allowed by the policy.
        const negated =
          /\b(?:not|never|no|nor|neither|without)\b[^.]{0,60}$/i.test(
            own.slice(start, at),
          ) ||
          /\bnot (?:a |an )?(?:evidence|claim)s? (?:of|that)\b/i.test(sentence);
        const attributed = attribution.test(sentence);
        // Fix A4 (2026-10-29): a source's own priority wording given as
        // "describes … as" is attributed to that source by construction.
        const describedAs =
          rule.code.startsWith('priority') &&
          /\bdescribes?\b.{0,200}\bas\b.{0,120}$/is.test(own.slice(0, at));
        let severity = rule.severity;
        // A purpose clause or a term inside a record about a text is the
        // text's own; a paraphrase is attributed to its source by design.
        const sourceVoice =
          (rule.code === 'motive' ||
            rule.code === 'ideological-label' ||
            rule.code === 'evaluative-word') &&
          (f.textual || f.paraphrase);
        if (negated) severity = 'info';
        else if (sourceVoice || describedAs) severity = 'info';
        else if ((attributed || f.paraphrase) && severity === 'high')
          severity = 'medium';
        else if (attributed && severity === 'medium') severity = 'low';
        add({
          check: 'wording',
          code: rule.code,
          severity,
          fix: severity === 'info' ? 'none' : 'mechanical',
          ids: [f.id],
          message: `${f.id} ${f.field}: “${m[0]}”${negated ? ' (negated)' : sourceVoice ? ' (describes what a text says)' : describedAs ? ' (the source’s own description)' : attributed ? ' (attributed)' : ''}.`,
          details: {
            field: f.field,
            sentence: sentence.slice(0, 400),
            why: rule.why,
          },
        });
      }
    }
  }

  // 7. Identifier hygiene.
  {
    const keptStance = (id: string) => keptStanceIds.includes(id);
    for (const c of data.claims) {
      const letter = c.id.match(/-([abc])$/)?.[1];
      const lettered =
        letter && stanceLetterPrefixes.has(prefixOf(c.id))
          ? stanceLetters[letter]
          : undefined;
      if (lettered && c.predicate in stanceWords && lettered !== c.predicate)
        add({
          check: 'identifiers',
          code: 'id-states-other-stance',
          severity: keptStance(c.id) ? 'info' : 'medium',
          fix: 'convention',
          ids: [c.id],
          message: `${c.id} ends in -${letter} (${lettered.replace('_proposition', '')}), but the record is ${c.predicate}${keptStance(c.id) ? '; kept by decision C4, the suffix is historical' : ''}.`,
          details: { roles: c.attributes?.thought?.roles },
        });
      for (const [predicate, re] of Object.entries(stanceWords)) {
        if (predicate === c.predicate || !re.test(c.id)) continue;
        if (!Object.keys(stanceWords).includes(c.predicate)) continue;
        add({
          check: 'identifiers',
          code: 'id-states-other-stance',
          severity: keptStance(c.id) ? 'info' : 'medium',
          fix: 'convention',
          ids: [c.id],
          message: `${c.id} names a ${predicate.replace('_proposition', '')} stance, but the record is ${c.predicate}${keptStance(c.id) ? '; kept by decision C4, the suffix is historical' : ''}.`,
        });
      }
      for (const [resolution, re] of Object.entries(resolutionWords))
        if (re.test(c.id) && c.resolution !== resolution)
          add({
            check: 'identifiers',
            code: 'id-states-other-resolution',
            severity: 'medium',
            fix: 'convention',
            ids: [c.id],
            message: `${c.id} names “${resolution}”, but the record is ${c.resolution}.`,
          });
      if (
        /(?:^|-)(?:absent|absence|not-found)(?:-|$)/.test(c.id) !==
          (c.predicate === 'provision_not_found') &&
        /(?:^|-)(?:absent|absence|not-found)(?:-|$)/.test(c.id)
      )
        add({
          check: 'identifiers',
          code: 'id-states-absence',
          severity: 'medium',
          fix: 'convention',
          ids: [c.id],
          message: `${c.id} names an absence, but the record is ${c.predicate}.`,
        });
      const signedId = /(?:^|-)signed(?:-|$)/.test(c.id);
      const stage = c.attributes?.commitment?.stage;
      if (
        signedId &&
        c.predicate === 'signed_commitment' &&
        stage &&
        stage !== 'signed'
      )
        add({
          check: 'identifiers',
          code: 'id-states-other-stage',
          severity: 'medium',
          fix: 'convention',
          ids: [c.id],
          message: `${c.id} says “signed”, but its commitment stage is ${stage}.`,
        });
      const investId = /(?:^|-)(?:invested|investment)(?:-|$)/.test(c.id);
      const tStage = c.attributes?.transactionStage;
      if (
        investId &&
        (tStage === 'announced' || tStage === 'planned') &&
        /(?:^|-)invested(?:-|$)/.test(c.id)
      )
        add({
          check: 'identifiers',
          code: 'id-states-other-stage',
          severity: 'medium',
          fix: 'convention',
          ids: [c.id],
          message: `${c.id} says “invested”, but its transaction stage is ${tStage}.`,
        });
      // A year in the ID that no date of the record carries.
      const years = c.id
        .match(/(?:^|-)((?:18|19|20)\d{2})(?=-|$)/g)
        ?.map((y) => y.replace('-', ''));
      const dates = claimDates(c);
      if (years?.length && dates.length) {
        const recordYears = new Set(
          dates.flatMap((d) => {
            const [a, b] = dateRange(d);
            const out: string[] = [];
            for (let y = Number(a.slice(0, 4)); y <= Number(b.slice(0, 4)); y++)
              out.push(String(y));
            return out;
          }),
        );
        if (c.time.kind === 'interval') {
          const from = Number(c.time.from?.slice(0, 4) ?? 0);
          const until = Number(c.time.until?.slice(0, 4) ?? 0);
          if (from && until)
            for (let y = from; y <= until; y++) recordYears.add(String(y));
        }
        const named = [
          c.subject,
          c.object.kind === 'entity' ? c.object.entityId : '',
        ].join('-');
        const unexplained = years.filter(
          (y) => !recordYears.has(y) && !named.includes(y),
        );
        if (unexplained.length === years.length)
          add({
            check: 'identifiers',
            code: 'id-year-not-in-record',
            severity: 'low',
            fix: 'convention',
            ids: [c.id],
            message: `${c.id} names ${unexplained.join(', ')}; the record is dated ${dates.join(' to ')}${c.time.kind === 'unknown' ? '' : ` (${c.time.kind})`}.`,
          });
      }
    }
    // Record IDs named in our own prose that are not records: usually a
    // pack's working identifier that did not survive admission.
    const allIds = new Set([
      ...data.entities.map((r) => r.id),
      ...data.claims.map((r) => r.id),
      ...data.sources.map((r) => r.id),
      ...data.evidence.map((r) => r.id),
    ]);
    const structural = new Set([
      'id',
      'claimId',
      'sourceId',
      'subject',
      'entityId',
      'evidenceIds',
      'sourceIds',
      'claimIds',
      'family',
      'publisherId',
      'documentId',
      'by',
      'evidenceId',
      'key',
      'supersedes',
      'canonicalUrl',
      'evidenceUrl',
      'archivedUrl',
      'termsUrl',
    ]);
    const prose = function* (
      o: unknown,
      path: string,
    ): Generator<[string, string]> {
      if (typeof o === 'string') yield [path, o];
      else if (Array.isArray(o)) for (const x of o) yield* prose(x, path);
      else if (o && typeof o === 'object')
        for (const [k, v] of Object.entries(o))
          if (!structural.has(k)) yield* prose(v, path ? `${path}.${k}` : k);
    };
    const named =
      /\b(?:sources?|records?|claims?|evidence|entity|entities)\s+[`(]?([a-z][a-z0-9]*(?:-[a-z0-9]+)+)/g;
    for (const r of [
      ...data.entities,
      ...data.claims,
      ...data.sources,
      ...data.evidence,
    ]) {
      for (const [path, text] of prose(r, '')) {
        for (const m of text.matchAll(named)) {
          const token = m[1];
          if (allIds.has(token) || !/\d/.test(token)) continue;
          add({
            check: 'identifiers',
            code: 'prose-names-missing-id',
            severity: 'medium',
            fix: 'mechanical',
            ids: [r.id],
            message: `${r.id} ${path} names “${token}”, which is not a record ID.`,
            details: {
              text: text.slice(
                Math.max(0, (m.index ?? 0) - 80),
                (m.index ?? 0) + 120,
              ),
            },
          });
        }
      }
    }
    // Evidence IDs that embed another claim's ID.
    for (const v of data.evidence) {
      const m = v.id.match(/^(?:evidence|ev)-(.+?)(?:-\d+|-[a-z])?$/);
      if (!m) continue;
      const embedded = [m[1], v.id.replace(/^(?:evidence|ev)-/, '')].find((x) =>
        claims.has(x),
      );
      if (embedded && embedded !== v.claimId)
        add({
          check: 'identifiers',
          code: 'evidence-id-names-other-claim',
          severity: 'low',
          fix: 'convention',
          ids: [v.id, v.claimId, embedded],
          message: `${v.id} belongs to ${v.claimId}, but its ID names ${embedded}.`,
        });
    }
    // Prefix conventions by record kind.
    for (const [kind, rows] of [
      ['sources', data.sources],
      ['evidence', data.evidence],
      ['claims', data.claims],
      ['entities', data.entities],
    ] as const) {
      const counts = new Map<string, number>();
      for (const r of rows)
        counts.set(prefixOf(r.id), (counts.get(prefixOf(r.id)) ?? 0) + 1);
      const top = [...counts].sort((a, b) => b[1] - a[1]);
      add({
        check: 'identifiers',
        code: 'id-prefixes',
        severity: kind === 'sources' || kind === 'evidence' ? 'low' : 'info',
        fix: 'convention',
        ids: [],
        message: `${kind}: ${counts.size} distinct ID prefixes; most used ${top
          .slice(0, 6)
          .map(([p, n]) => `${p}- (${n})`)
          .join(', ')}.`,
        details: { kind, prefixes: Object.fromEntries(top) },
      });
    }
    // Source IDs that do not start with source- although sources are a
    // separate namespace from evidence and claims: an ID may then collide in
    // reading with a claim or evidence ID.
    const all = new Map<string, string>();
    for (const [kind, rows] of [
      ['entity', data.entities],
      ['claim', data.claims],
      ['source', data.sources],
      ['evidence', data.evidence],
    ] as const)
      for (const r of rows) {
        const prior = all.get(r.id);
        if (prior)
          add({
            check: 'identifiers',
            code: 'id-shared-across-kinds',
            severity: 'medium',
            fix: 'convention',
            ids: [r.id],
            message: `${r.id} is both a ${prior} and a ${kind} ID.`,
          });
        else all.set(r.id, kind);
      }
  }

  // 8. Cross-pack overlaps: one proposition recorded twice.
  {
    const groups = new Map<string, Claim[]>();
    for (const c of data.claims) {
      // Proposition records are already unique per text, proposition and stance.
      if (c.attributes?.thought) continue;
      // Comparison cells and provisions differ by key; the key is in claimKey.
      const k = claimKey(c);
      groups.set(k, [...(groups.get(k) ?? []), c]);
    }
    for (const [k, list] of groups) {
      if (list.length < 2) continue;
      // Same key but dated incompatibly can be two events (two roles, two lists).
      const dated = list.map((c) => ({ c, d: claimDates(c) }));
      const overlapping = dated.filter(({ c, d }) =>
        dated.some(
          (o) =>
            o.c !== c &&
            (d.length === 0 ||
              o.d.length === 0 ||
              d.some((x) => o.d.some((y) => datesCompatible(x, y)))),
        ),
      );
      if (overlapping.length < 2) continue;
      // Several scoped deltas or terms between the same pair are by design;
      // similar statements are what makes a duplicate likely.
      const similar = overlapping.some(({ c }) =>
        overlapping.some(
          ({ c: o }) =>
            o !== c && statementSimilarity(c.statement, o.statement) >= 0.5,
        ),
      );
      const packs = new Set(overlapping.map(({ c }) => prefixOf(c.id)));
      add({
        check: 'overlaps',
        code: !similar
          ? 'same-key-distinct-statements'
          : packs.size > 1
            ? 'cross-pack-duplicate'
            : 'same-pack-duplicate',
        severity: !similar ? 'info' : packs.size > 1 ? 'medium' : 'low',
        fix: !similar ? 'none' : 'convention',
        ids: overlapping.map(({ c }) => c.id),
        message: `${overlapping.length} records share ${k} with compatible dates.`,
        details: Object.fromEntries(
          overlapping.map(({ c }) => [
            c.id,
            `${c.time.kind} ${claimDates(c).join('–') || '(undated)'} · ${c.statement.slice(0, 160)}`,
          ]),
        ),
      });
    }
    // A founding recorded both as a co-founder role and as co_founded.
    const founded = new Set(
      data.claims
        .filter(
          (c) => c.predicate === 'co_founded' && c.object.kind === 'entity',
        )
        .map(
          (c) => `${c.subject}|${(c.object as { entityId: string }).entityId}`,
        ),
    );
    for (const c of data.claims) {
      if (c.predicate !== 'held_role' || c.object.kind !== 'entity') continue;
      if (!/\bco-?founder\b|\bfounder\b/i.test(c.attributes?.role ?? ''))
        continue;
      const organisation = c.object.entityId;
      const k = `${c.subject}|${organisation}`;
      if (!founded.has(k)) continue;
      const other = data.claims.filter(
        (o) =>
          o.predicate === 'co_founded' &&
          o.subject === c.subject &&
          o.object.kind === 'entity' &&
          o.object.entityId === organisation,
      );
      add({
        check: 'overlaps',
        code:
          prefixOf(c.id) === prefixOf(other[0].id)
            ? 'founder-role-and-founding'
            : 'founder-role-and-founding-cross-pack',
        severity: 'low',
        fix: 'convention',
        ids: [c.id, ...other.map((o) => o.id)],
        message: `${c.id} records the role “${c.attributes?.role}” and ${other.map((o) => o.id).join(', ')} records co_founded for the same person and organisation.`,
      });
    }
    // Identical statements on different records.
    const byStatement = new Map<string, Claim[]>();
    for (const c of data.claims) {
      const k = normaliseName(c.statement);
      byStatement.set(k, [...(byStatement.get(k) ?? []), c]);
    }
    for (const list of byStatement.values())
      if (list.length > 1)
        add({
          check: 'overlaps',
          code: 'identical-statement',
          severity: 'low',
          fix: 'convention',
          ids: list.map((c) => c.id),
          message: `${list.length} records have the same statement: “${list[0].statement.slice(0, 160)}”.`,
        });
  }

  auditRecentKinds(data, add);

  const order: Record<Severity, number> = {
    high: 0,
    medium: 1,
    low: 2,
    info: 3,
  };
  findings.sort(
    (a, b) =>
      auditChecks.indexOf(a.check) - auditChecks.indexOf(b.check) ||
      order[a.severity] - order[b.severity] ||
      a.code.localeCompare(b.code) ||
      (a.ids[0] ?? '').localeCompare(b.ids[0] ?? ''),
  );
  return {
    dataset: {
      updatedAt: data.meta.updatedAt,
      schemaVersion: data.meta.schemaVersion,
    },
    counts: {
      entities: data.entities.length,
      claims: data.claims.length,
      sources: data.sources.length,
      evidence: data.evidence.length,
    },
    summary: auditChecks.map((check) => {
      const list = findings.filter((f) => f.check === check);
      const bySeverity = { high: 0, medium: 0, low: 0, info: 0 };
      for (const f of list) bySeverity[f.severity]++;
      return { check, findings: list.length, bySeverity };
    }),
    findings,
  };
}

/**
 * Predicates whose records report what a party announced, planned or stated
 * (schema 2.21, 2.23 and earlier), as distinct from a completed transaction.
 */
const announcedPredicates = new Set([
  'investment_announced',
  'announced_funding',
  'announced_plan',
  'announced_site',
  'partnership_announced',
  'award_announced',
  'plans_capacity',
  'plans_infrastructure_spend',
  'launch_stated',
  'status_stated',
]);
/** Legal and framework texts: their records paraphrase duties and terms. */
const textPredicates = new Set([
  'states_provision',
  'provision_not_found',
  'changes_from',
  'references_commitment',
  'published',
  'enacted',
  'discusses',
  'articulates_proposition',
  'contests_proposition',
  'bears_on_proposition',
  'states_contribution',
  'credits_work',
]);
/** Words that report an event as done. */
const doneWords =
  /\b(?:raised|completed|closed|paid|received|built|operates|operating|delivered|finali[sz]ed|secured|invested)\b/i;
/** Words that attribute what follows to a source or party. */
const attributing =
  /\b(?:announc\w*|stat(?:es|ed|ing)|said|says|wrote|writes|according to|report\w*|records?|describ\w*|lists?|listed|names?|named|prints?|filing|filed|letter|release|post|update)\b/i;
/** Words that report compliance or implementation. */
const complianceWords =
  /\b(?:compl(?:y|ies|ied|iance|iant)|implemented|fulfil+(?:ed|s)?|adhere[sd]?|abides? by)\b/i;
/** Words that keep an amount's bound visible, by bound. */
const boundWords: Record<string, RegExp> = {
  up_to:
    /\bup to\b|\bas much as\b|\bat most\b|\bno more than\b|\bcan scale\b|\d\s*[–-]\s*\d/i,
  more_than: /\bmore than\b|\bover\b|\bin excess of\b|\bexceed|\+/i,
  at_least: /\bat least\b|\bor more\b|\bminimum\b|\+/i,
  approximate:
    /\babout\b|\bapproximately\b|\baround\b|\broughly\b|\bnearly\b|\bclose to\b|~/i,
};

/**
 * Checks added for the pre-launch audit of 2026-11-02: records of the kinds
 * schema 2.21 to 2.27 introduced (announced partnerships and awards, a
 * document's own contribution, attributed credits, participant entries) and
 * contradictions between records that validation does not catch: one role or
 * founding dated two incompatible ways, a role recorded after a departure.
 */
function auditRecentKinds(data: Dataset, add: (f: Finding) => void) {
  const sources = new Map(data.sources.map((s) => [s.id, s]));
  const evidence = new Map(data.evidence.map((v) => [v.id, v]));
  const own = (s: string) => stripQuoted(s);

  for (const c of data.claims) {
    // An announcement reported as done, in our own words.
    if (announcedPredicates.has(c.predicate)) {
      const text = own(c.statement);
      const done = doneWords.exec(text);
      if (done && !attributing.test(text.slice(0, done.index)))
        add({
          check: 'wording',
          code: 'announced-as-done',
          severity: 'medium',
          fix: 'needs_source',
          ids: [c.id],
          message: `${c.id} (${c.predicate}) reports “${done[0]}” in our own words without attributing it.`,
          details: { statement: c.statement },
        });
    }
    // Compliance or implementation in our own words, outside the records
    // that paraphrase a legal or framework text's terms.
    if (!textPredicates.has(c.predicate)) {
      for (const field of ['statement', 'qualification'] as const) {
        const text = own(c[field]);
        const hit = complianceWords.exec(text);
        if (!hit) continue;
        const before =
          text
            .slice(0, hit.index)
            .split(/[.;]\s/)
            .at(-1) ?? '';
        if (/\b(?:not|never|no|nor|without|neither)\b/i.test(before)) continue;
        if (
          attributing.test(before) ||
          /\b(?:requir|must|shall|commit)/i.test(before)
        )
          continue;
        add({
          check: 'wording',
          code: 'commitment-as-compliance',
          severity: field === 'statement' ? 'medium' : 'low',
          fix: 'needs_source',
          ids: [c.id],
          message: `${c.id} ${field}: “${hit[0]}” in our own words; a commitment or framework is not evidence of compliance.`,
          details: { [field]: c[field] },
        });
      }
    }
    // "Earliest" without the located scope the policy requires.
    for (const field of ['statement', 'qualification'] as const) {
      const text = own(c[field]);
      for (const m of text.matchAll(/\bearliest\b/gi)) {
        // The sentence that holds the word.
        const start = text.lastIndexOf('. ', m.index!);
        const end = text.indexOf('. ', m.index!);
        const sentence = text.slice(start + 1, end >= 0 ? end : undefined);
        if (
          /\blocated\b|\bretriev|\bsearch|\bscanned|\bcaptur|\bindex|\bwithin\b|\bin this collection|\bin these records|\bnot\b|\bno\b|\bneither\b|\bnor\b|\bcited\b|\brecorded\b|\bheld\b|\battested\b|\bdated\b|\bat the earliest\b/i.test(
            sentence,
          )
        )
          continue;
        // A source's own wording, attributed before the word.
        if (attributing.test(sentence.slice(0, m.index! - start - 1))) continue;
        add({
          check: 'wording',
          code: 'earliest-unscoped',
          severity: 'low',
          fix: 'convention',
          ids: [c.id],
          message: `${c.id} ${field}: “earliest” without a located or search scope.`,
          details: { [field]: c[field] },
        });
      }
    }
    // Schema 2.24 and 2.25: a document's own contribution, and a citing
    // document's attributed credit, rest on that document's own text.
    if (
      (c.predicate === 'states_contribution' ||
        c.predicate === 'credits_work') &&
      c.evidenceIds.length
    ) {
      const docs = c.evidenceIds
        .map((id) => evidence.get(id))
        .map((v) => (v ? sources.get(v.sourceId) : undefined))
        .map((s) => s?.documentId);
      if (!docs.includes(c.subject)) {
        const other = docs.filter((d): d is string => Boolean(d));
        add({
          check: 'evidence',
          code: 'contribution-not-own-text',
          severity: other.length ? 'medium' : 'low',
          fix: other.length ? 'needs_source' : 'mechanical',
          ids: [c.id],
          message: other.length
            ? `${c.id} (${c.predicate}) rests on ${other.join(', ')}, not on ${c.subject}'s own text.`
            : `${c.id} (${c.predicate}) rests on a source not linked to any document; ${c.subject}'s own text should be the source's document.`,
        });
      }
    }
    // An amount or quantity whose bound ("up to", "more than") the statement
    // does not show.
    for (const [kind, value] of [
      ['amount', c.attributes?.amount],
      ['quantity', c.attributes?.quantity],
    ] as const) {
      const bound = (value as { bound?: string } | undefined)?.bound;
      if (!bound || !boundWords[bound]) continue;
      if (boundWords[bound].test(c.statement)) continue;
      add({
        check: 'evidence',
        code: 'amount-bound-unstated',
        severity: 'low',
        fix: 'convention',
        ids: [c.id],
        message: `${c.id}: the ${kind}'s bound is ${bound.replace('_', ' ')}, which the statement does not say.`,
        details: { statement: c.statement },
      });
    }
  }

  // Contradictions: one role, or one founding, dated two incompatible ways.
  const startOf = (c: Claim) =>
    c.time.kind === 'interval'
      ? c.time.from
      : c.time.kind === 'event'
        ? c.time.date
        : undefined;
  const roleKey = (c: Claim) =>
    `${c.subject}|${c.object.kind === 'entity' ? c.object.entityId : ''}|${normaliseName(c.attributes?.role ?? '')}`;
  const roles = new Map<string, Claim[]>();
  for (const c of data.claims)
    if (c.predicate === 'held_role' && c.object.kind === 'entity')
      roles.set(roleKey(c), [...(roles.get(roleKey(c)) ?? []), c]);
  for (const list of roles.values()) {
    if (list.length < 2) continue;
    const ends = list
      .map((c) => (c.time.kind === 'interval' ? c.time.until : undefined))
      .filter((d): d is string => Boolean(d));
    const starts = list
      .map((c) => (c.time.kind === 'interval' ? c.time.from : undefined))
      .filter((d): d is string => Boolean(d));
    const clash = (ds: string[]) =>
      ds.some((a) => ds.some((b) => !datesCompatible(a, b)));
    if (clash(starts) || clash(ends))
      add({
        check: 'overlaps',
        code: 'role-dates-differ',
        severity: 'medium',
        fix: 'needs_source',
        ids: list.map((c) => c.id),
        message: `${list.length} records give the same role (${list[0].attributes?.role ?? 'unnamed'}) incompatible start or end dates: two tenures, or a contradiction.`,
      });
  }
  const foundings = new Map<string, Claim[]>();
  for (const c of data.claims) {
    const org =
      c.predicate === 'founding_stated'
        ? c.subject
        : c.predicate === 'co_founded' && c.object.kind === 'entity'
          ? c.object.entityId
          : undefined;
    if (org) foundings.set(org, [...(foundings.get(org) ?? []), c]);
  }
  for (const [org, list] of foundings) {
    const dated = list
      .map((c) => ({ c, d: startOf(c) }))
      .filter((x): x is { c: Claim; d: string } => Boolean(x.d));
    const clash = dated.filter((x) =>
      dated.some((y) => !datesCompatible(x.d, y.d)),
    );
    if (clash.length)
      add({
        check: 'overlaps',
        code: 'founding-dates-differ',
        severity: 'medium',
        fix: 'needs_source',
        ids: clash.map((x) => x.c.id),
        message: `${org}: founding records give incompatible dates (${[...new Set(clash.map((x) => x.d))].join(', ')}).`,
      });
  }
  // A role dated after an announced departure from the same organisation:
  // a return, or a change of role when the departure was from one role only.
  const departures = data.claims.filter(
    (c) =>
      c.predicate === 'departure_announced' &&
      c.object.kind === 'entity' &&
      c.time.kind === 'event',
  );
  for (const c of data.claims) {
    if (c.predicate !== 'held_role' || c.object.kind !== 'entity') continue;
    const at =
      c.time.kind === 'snapshot'
        ? c.time.date
        : c.time.kind === 'interval'
          ? c.time.from
          : undefined;
    if (!at) continue;
    const org = c.object.entityId;
    const before = departures.filter(
      (d) =>
        d.subject === c.subject &&
        (d.object as { entityId: string }).entityId === org &&
        d.time.kind === 'event' &&
        dateRange(d.time.date)[1] < dateRange(at)[0],
    );
    if (before.length)
      add({
        check: 'dates',
        code: 'role-after-departure',
        severity: 'info',
        fix: 'none',
        ids: [c.id, ...before.map((d) => d.id)],
        message: `${c.id} dates a role at ${org} on ${at}, after ${before.map((d) => d.id).join(', ')}: a return or a change of role, which the person page should show as such.`,
      });
  }
}
