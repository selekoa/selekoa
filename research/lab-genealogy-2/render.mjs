// Renders pack.md from pack.json and the dataset's existing records.
// Called by `tools.mjs render`.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const GENEALOGY = new Set([
  'held_role',
  'co_founded',
  'departure_announced',
  'launched',
  'acquired',
  'unit_of',
  'combined_into',
  'formed_entity',
  'converted_into',
  'separation_announced',
  'name_transition_announced',
  'founding_stated',
  'licensing_hiring_agreement',
  'unit_disbanded',
  'announced_funding',
  'participated_in_round',
  'investment_announced',
]);
const CAPITAL = new Set([
  'announced_funding',
  'participated_in_round',
  'investment_announced',
]);
const LEADERSHIP =
  /\b(ceo|chief|president|cto|cfo|coo|cpo|chair|director of research|head|lead|board|trustee|founding lead|vp|vice president|executive|general manager|managing director|officer)\b/i;

const MONTHS = [
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
function fmtDate(d) {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  if (!m) return y;
  if (!day) return `${MONTHS[Number(m) - 1]} ${y}`;
  return `${Number(day)} ${MONTHS[Number(m) - 1]} ${y}`;
}
function when(t) {
  if (t.kind === 'event') return fmtDate(t.date);
  if (t.kind === 'snapshot') return `as of ${fmtDate(t.date)}`;
  if (t.kind === 'interval')
    return `${t.from ? fmtDate(t.from) : '?'}–${t.until ? fmtDate(t.until) : ''}`.replace(
      /–$/,
      '– (end not stated)',
    );
  return 'undated';
}
const sortKey = (c) => c.time.date ?? c.time.from ?? c.time.until ?? '9999';
const year = (c) =>
  c.time.kind === 'unknown' ? 'Undated' : sortKey(c).slice(0, 4);
const cell = (s) =>
  String(s ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ');

export function render(pack, dir) {
  const root = join(dir, '..', '..');
  const read = (f) => JSON.parse(readFileSync(join(root, 'data', f), 'utf8'));
  const dataEntities = read('entities.json');
  const dataClaims = read('claims.json');
  const ents = new Map(dataEntities.map((e) => [e.id, e]));
  for (const e of pack.entities) if (!e.existing) ents.set(e.id, e);
  const name = (id) => ents.get(id)?.name ?? id;
  const sources = new Map(pack.sources.map((s) => [s.id, s]));
  const labs = pack.labs ?? [];
  const labOrgs = new Set(labs.flatMap((l) => [l.id, ...(l.includes ?? [])]));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for a lab filter
  const touches = (c) =>
    labOrgs.has(c.subject) ||
    (c.object.kind === 'entity' && labOrgs.has(c.object.entityId));

  // Pack records and the dataset's existing genealogy records for the same labs.
  const packClaims = pack.claims.map((c) => ({ ...c, origin: 'pack' }));
  // Dataset context: records from 2023 on (or undated) on the people and organisations the pack touches.
  const packIds = new Set(
    pack.claims.flatMap((c) => [c.subject, c.object.entityId].filter(Boolean)),
  );
  const recent = (c) => c.time.kind === 'unknown' || sortKey(c) >= '2023';
  const dataset = dataClaims
    .filter(
      (c) =>
        GENEALOGY.has(c.predicate) &&
        recent(c) &&
        (packIds.has(c.subject) || packIds.has(c.object.entityId)),
    )
    .map((c) => ({ ...c, origin: 'dataset' }));
  const all = [...packClaims, ...dataset].sort(
    (a, b) => sortKey(a).localeCompare(sortKey(b)) || a.id.localeCompare(b.id),
  );

  const srcLabel = (c) => {
    if (c.origin === 'dataset') return 'dataset record';
    const ss = [...new Set(c.evidence.map((e) => e.sourceId))].map((id) =>
      sources.get(id),
    );
    return ss
      .map(
        (s) =>
          `${s.publisher}${s.sourceClass === 'reporting' ? ' (reporting)' : ''}`,
      )
      .join('; ');
  };
  const line = (c) =>
    `- **${when(c.time)}.** ${c.statement} _(${srcLabel(c)}; \`${c.id}\`)_`;

  const out = [];
  const push = (...l) => out.push(...l);
  const people = pack.entities.filter(
    (e) => (ents.get(e.id)?.type ?? e.type) === 'person',
  );
  const counts = {
    claims: pack.claims.length,
    dataset: dataset.length,
    sources: pack.sources.length,
    primary: pack.sources.filter((s) => s.sourceClass === 'primary').length,
    reporting: pack.sources.filter((s) => s.sourceClass !== 'primary').length,
    newPeople: people.filter((e) => !e.existing).length,
    people: people.length,
    newOrgs: pack.entities.filter(
      (e) => !e.existing && e.type === 'organisation',
    ).length,
    reasons: pack.claims.filter((c) => c.statedReason).length,
  };
  push(
    `# ${pack.title}`,
    '',
    'Generated from `pack.json` by `node research/lab-genealogy-2/tools.mjs render`; do not edit by hand. A candidate research pack outside application data: machine-prepared and machine-audited, with no human review. Each line is one record; read its source before relying on it.',
    '',
    '## How to read this',
    '',
    '- A line records that a source **documents** an event or a role at a date. It does not say why anything happened. Where a person or organisation stated a reason in its own words, the record attributes it (see [Stated reasons](#stated-reasons)).',
    '- Dates keep their precision. "as of" marks a role shown on a dated document (a snapshot), not a start date. An announcement date is not a start or last working day. "Undated" means no source gave a date.',
    '- "(reporting)" marks a record that rests on news reporting because no primary source could be retrieved.',
    "- `dataset record` lines are already in Selekoa's dataset and are shown here for continuity; they were not re-checked by this pack.",
    '- A sequence of roles is not a continuous employment history, and a move is not a transfer of influence, ideas or loyalty.',
    '',
    '## Coverage',
    '',
    `${counts.claims} new candidate records from ${counts.sources} sources (${counts.primary} primary, ${counts.reporting} reporting), shown together with ${counts.dataset} existing dataset records on the same labs. ${counts.people} people appear in the pack (${counts.newPeople} proposed as new entities) and ${counts.newOrgs} organisations are proposed as new entities. ${counts.reasons} records carry a reason stated by the person or organisation concerned.`,
    '',
  );

  // Per-lab genealogy tables.
  push('## Lab by lab', '');
  for (const lab of labs) {
    const ids = new Set([lab.id, ...(lab.includes ?? [])]);
    const mine = all.filter(
      (c) =>
        ids.has(c.subject) ||
        (c.object.kind === 'entity' && ids.has(c.object.entityId)),
    );
    if (!mine.length) continue;
    push(`### ${lab.name}`, '');
    if (lab.note) push(lab.note, '');
    const groups = [
      [
        'Founding',
        (c) =>
          ['co_founded', 'founding_stated', 'launched'].includes(c.predicate),
      ],
      [
        'Structure and deals',
        (c) =>
          [
            'acquired',
            'unit_of',
            'combined_into',
            'formed_entity',
            'converted_into',
            'separation_announced',
            'name_transition_announced',
            'licensing_hiring_agreement',
            'unit_disbanded',
          ].includes(c.predicate),
      ],
      [
        'Leadership, board and research leads',
        (c) =>
          c.predicate === 'held_role' &&
          LEADERSHIP.test(c.attributes?.role ?? ''),
      ],
      [
        'Other documented roles',
        (c) =>
          c.predicate === 'held_role' &&
          !LEADERSHIP.test(c.attributes?.role ?? ''),
      ],
      ['Departures announced', (c) => c.predicate === 'departure_announced'],
      ['Funding as stated', (c) => CAPITAL.has(c.predicate)],
    ];
    for (const [title, f] of groups) {
      const rows = mine.filter(f);
      if (!rows.length) continue;
      push(
        `**${title}**`,
        '',
        '| When | Who / what | Record | Source | ID |',
        '| --- | --- | --- | --- | --- |',
      );
      for (const c of rows) {
        const literal = (o) =>
          typeof o.value === 'number'
            ? `${o.unit} ${o.value.toLocaleString('en-GB')}`
            : cell(o.value);
        const who =
          ents.get(c.subject)?.type === 'person'
            ? name(c.subject)
            : `${name(c.subject)} → ${c.object.kind === 'entity' ? name(c.object.entityId) : literal(c.object)}`;
        const role = c.attributes?.role ? ` (${c.attributes.role})` : '';
        push(
          `| ${when(c.time)} | ${cell(who + role)} | ${cell(c.statement)} | ${cell(srcLabel(c))} | \`${c.id}\` |`,
        );
      }
      push('');
    }
  }

  // Timeline.
  push('## Timeline', '');
  const evs = new Map((pack.events ?? []).map((e) => [e.id, e]));
  let currentYear = null;
  for (const c of all) {
    const y = year(c);
    if (y !== currentYear) {
      push('', `### ${y}`, '');
      currentYear = y;
    }
    push(line(c));
  }
  push('');
  if (evs.size) {
    push(
      '### Grouped events',
      '',
      'Records that belong to one announced event, as grouped by the preparer.',
      '',
    );
    for (const e of evs.values()) {
      const members = all.filter((c) => c.event === e.id);
      if (!members.length) continue;
      push(
        `- **${fmtDate(e.date)} — ${e.title}:** ${members.map((c) => `\`${c.id}\``).join(', ')}`,
      );
    }
    push('');
  }

  // Who went where: people documented at two or more organisations.
  push(
    '## Who went where',
    '',
    'People in this pack documented at two or more organisations in this pack and the dataset (all years), in date order. Each step is a separate record; gaps between them are unknown, undated roles are listed last, and the path is not an employment history.',
    '',
  );
  const byPerson = new Map();
  const pathRecords = [
    ...packClaims,
    ...dataClaims
      .filter((c) => GENEALOGY.has(c.predicate) && packIds.has(c.subject))
      .map((c) => ({ ...c, origin: 'dataset' })),
  ].sort(
    (a, b) => sortKey(a).localeCompare(sortKey(b)) || a.id.localeCompare(b.id),
  );
  for (const c of pathRecords) {
    if (ents.get(c.subject)?.type !== 'person' || c.object.kind !== 'entity')
      continue;
    const l = byPerson.get(c.subject) ?? [];
    l.push(c);
    byPerson.set(c.subject, l);
  }
  // Organisations are grouped into lab families (a lab and its units); other organisations stand alone.
  const family = new Map();
  for (const l of labs)
    for (const id of [l.id, ...(l.includes ?? [])]) family.set(id, l.id);
  const fam = (id) => family.get(id) ?? id;
  const famName = (id) => labs.find((l) => l.id === id)?.name ?? name(id);
  const paths = [...byPerson.entries()]
    .map(([p, cs]) => [p, cs, new Set(cs.map((c) => fam(c.object.entityId)))])
    .filter(([, , fams]) => fams.size >= 2)
    .sort((a, b) =>
      (ents.get(a[0]).sortName ?? name(a[0])).localeCompare(
        ents.get(b[0]).sortName ?? name(b[0]),
      ),
    );
  const verb = {
    held_role: '',
    co_founded: 'co-founded ',
    departure_announced: 'departure announced from ',
    launched: 'launched ',
  };
  const step = (c) =>
    `${verb[c.predicate] ?? c.predicate + ' '}${name(c.object.entityId)}${c.attributes?.role ? ` (${c.attributes.role})` : ''}, ${when(c.time)} \`${c.id}\``;
  const pairs = new Map();
  for (const [p, cs] of paths) {
    const dated = cs.filter((c) => c.time.kind !== 'unknown');
    const undated = cs.filter((c) => c.time.kind === 'unknown');
    push(
      `- **${name(p)}:** ${dated.map(step).join(' → ') || '(no dated record)'}${undated.length ? `; undated: ${undated.map(step).join('; ')}` : ''}`,
    );
    // Changes of lab family along the dated role and founding records (returns included;
    // departure announcements are not presence at a lab).
    const seq = [];
    for (const c of dated.filter(
      (x) => x.predicate !== 'departure_announced',
    )) {
      const f = fam(c.object.entityId);
      if (seq.length && seq.at(-1)[0] === f) continue;
      seq.push([f, c]);
    }
    for (let i = 0; i + 1 < seq.length; i++) {
      const [fa, a] = seq[i];
      const [fb, b] = seq[i + 1];
      // Dates whose precision overlaps (2024 and 2024-05-14) have no order either.
      if (
        sortKey(b).startsWith(sortKey(a)) ||
        sortKey(a).startsWith(sortKey(b))
      )
        continue;
      const k = `${fa}\t${fb}`;
      const l = pairs.get(k) ?? [];
      l.push([p, a, b]);
      pairs.set(k, l);
    }
  }
  push(
    '',
    '### Between organisations',
    '',
    'For each person above, each change of organisation between consecutive dated records (a lab and its units count as one organisation), with the two records. The order is that of the dates of the records, which may be snapshots or announcements: a pair is not a documented transfer, it does not say the earlier role had ended, and undated records, departure announcements and changes between records whose dates overlap (the same day, or 2024 and May 2024) are left out. Pairs are listed alphabetically, not by number of people.',
    '',
    '| From | To | Person (the two records) |',
    '| --- | --- | --- |',
  );
  const sortedPairs = [...pairs.entries()].sort((a, b) => {
    const [fa, ta] = a[0].split('\t').map(famName);
    const [fb, tb] = b[0].split('\t').map(famName);
    return fa.localeCompare(fb) || ta.localeCompare(tb);
  });
  for (const [k, l] of sortedPairs) {
    const [f, t] = k.split('\t');
    push(
      `| ${cell(famName(f))} | ${cell(famName(t))} | ${cell(l.map(([p, a, b]) => `${name(p)} (\`${a.id}\` → \`${b.id}\`)`).join('; '))} |`,
    );
  }
  push('');

  // Stated reasons.
  push(
    '## Stated reasons',
    '',
    'Reasons appear only where the person or organisation concerned stated them in a cited source. They are attributed statements, not findings.',
    '',
  );
  const reasons = pack.claims.filter((c) => c.statedReason);
  if (!reasons.length) push('None recorded.');
  for (const c of reasons)
    push(
      `- \`${c.id}\` — ${name(c.statedReason.by)} stated: ${c.statedReason.text} _(evidence \`${c.statedReason.evidenceId}\`)_`,
    );
  push('');

  // Searches, omissions and retrieval failures, from the drafts.
  push(
    '## How we searched',
    '',
    'Each drafting pass recorded what it searched and what it could not retrieve.',
    '',
  );
  for (const d of pack.drafts ?? [])
    push(
      `- **${d.group}** ([${d.file}](${d.file})): ${d.searched ?? 'not recorded'}`,
    );
  push(
    '',
    '## Omissions',
    '',
    'People, moves, rounds and deals considered and left out, with the reason. An omission is not a judgement of importance.',
    '',
    '| Group | Item | Reason |',
    '| --- | --- | --- |',
  );
  for (const o of pack.omitted ?? [])
    push(`| ${o.group} | ${cell(o.item)} | ${cell(o.reason)} |`);
  push(
    '',
    '## Retrieval failures',
    '',
    'Pages that refused this environment or returned no usable text. The cross-family brief asks the checker to open an archive copy of each.',
    '',
    '| Group | Address | What | Result |',
    '| --- | --- | --- | --- |',
  );
  for (const r of pack.retrievalFailures ?? [])
    push(
      `| ${r.group} | ${cell(r.url)} | ${cell(r.what)} | ${cell(r.result)} |`,
    );
  push(
    '',
    '## Existing records used, not duplicated',
    '',
    `${(pack.existingUsed ?? []).length} dataset records cover propositions the passes found already recorded: ${(pack.existingUsed ?? []).map((id) => `\`${id}\``).join(', ')}.`,
    '',
  );

  // Records left out at integration, and passages proposed for existing records.
  push(
    '',
    '## Held and dropped at integration',
    '',
    'Records drafted but left out of the pack by the integrator (`integration.json`): duplicates of another draft or of a dataset record, and records held for a maintainer decision. They stay in their drafts.',
    '',
    '| Record | Kept instead | Reason |',
    '| --- | --- | --- |',
  );
  for (const d of pack.dropped ?? [])
    push(
      `| \`${d.id}\` | ${d.keep ? `\`${d.keep}\`` : '—'} | ${cell(d.reason)} |`,
    );
  push(
    '',
    '## Evidence proposed for existing records',
    '',
    'Passages that bear on a proposition the dataset already holds, proposed as additional evidence for that record rather than as a new record.',
    '',
    '| Existing record | Source | Locator | Passage | Support | Note |',
    '| --- | --- | --- | --- | --- | --- |',
  );
  for (const x of pack.evidenceForExisting ?? []) {
    const s = sources.get(x.evidence.sourceId);
    push(
      `| \`${x.existingClaimId}\` | ${cell(s ? `${s.publisher}, ${s.title}` : x.evidence.sourceId)} | ${cell(x.evidence.locator)} | ${cell(x.evidence.passageType === 'quote' ? `“${x.evidence.passage}”` : `${x.evidence.passage} (anchor “${x.evidence.anchor}”)`)} | ${x.evidence.support} | ${cell(x.note)} |`,
    );
  }
  push('');

  // Proposed entities.
  push(
    '## Proposed new entities',
    '',
    '| ID | Type | Name | Description |',
    '| --- | --- | --- | --- |',
  );
  for (const e of pack.entities.filter((x) => !x.existing))
    push(
      `| \`${e.id}\` | ${e.type} | ${cell(e.name)}${e.aliases?.length ? ` (${cell(e.aliases.join(', '))})` : ''} | ${cell(e.description)} |`,
    );
  push('');

  // Sources.
  push(
    '## Sources',
    '',
    '| ID | Publisher | Title | Date | Class | Retrieved |',
    '| --- | --- | --- | --- | --- | --- |',
  );
  for (const s of pack.sources)
    push(
      `| \`${s.id}\` | ${cell(s.publisher)} | [${cell(s.title)}](${s.url}) | ${s.publicationDate ? fmtDate(s.publicationDate) : 'undated'} | ${s.sourceClass} | ${s.retrieval ? `${s.retrieval.route}, ${s.retrieval.retrievedAt}` : 'not retrieved'} |`,
    );
  push('');
  writeFileSync(
    join(dir, 'pack.md'),
    out.join('\n').replace(/\n{3,}/g, '\n\n'),
  );
  console.log(
    `pack.md: ${pack.claims.length} pack records, ${dataset.length} dataset records, ${paths.length} paths`,
  );
}
