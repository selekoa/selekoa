// Integrator's corrections to the source-group drafts (research/heterodox-thought).
// Run after drafting and again after audit-fixes.mjs; it is idempotent.
// node research/heterodox-thought/reconcile.mjs
// Corrections are made in drafts/, never in pack.json; each is listed in audit.md.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const DRAFTS = join(DIR, 'drafts');
const files = readdirSync(DRAFTS).filter((f) => f.endsWith('.json'));
const drafts = Object.fromEntries(
  files.map((f) => [f, JSON.parse(readFileSync(join(DRAFTS, f), 'utf8'))]),
);
const log = [];
const all = () =>
  Object.entries(drafts).flatMap(([f, d]) =>
    (d.records ?? []).map((r) => ({ f, r })),
  );

// 1. Undated pages cannot carry an event date: the two records on Moravec's
// undated preview page for Robot are moved to omissions.
{
  const d = drafts['moravec.json'];
  if (d) {
    const gone = d.records.filter(
      (r) => r.document === 'moravec-robot-book-preview',
    );
    if (gone.length) {
      d.records = d.records.filter((r) => !gone.includes(r));
      d.documents = d.documents.filter(
        (x) => x.id !== 'moravec-robot-book-preview',
      );
      const used = new Set(
        [...d.records, ...(d.links ?? [])].flatMap((r) =>
          r.evidence.map((e) => e.source),
        ),
      );
      d.sources = d.sources.filter((s) => used.has(s.key));
      d.links = (d.links ?? []).filter(
        (l) =>
          l.from !== 'moravec-robot-book-preview' &&
          l.to !== 'moravec-robot-book-preview',
      );
      d.omissions.push({
        item: 'Moravec, preview page for Robot ("Peek at new book: ROBOT"), undated (records on W02 and W10 drafted)',
        reason:
          'The page is undated and an event date is required; an Internet Archive capture of 1999-02-02 exists but could not be opened here. If the cross-family checker finds the capture identical, the records can be restored with that attested date. Removed by the integrator.',
      });
      log.push(`removed ${gone.map((r) => r.id).join(', ')} (undated page)`);
    }
  }
}

// 2. The 2007 Hyperstition post is signed "Old Nick". A chapter of the same title
// is attributed to Nick Land in Fanged Noumena (2011), whose wording was not
// compared; the document id must not attribute the post.
{
  const from = 'land-2007-critique-of-transcendental-miserablism';
  const to = 'old-nick-2007-critique-of-transcendental-miserablism';
  for (const [f, d] of Object.entries(drafts)) {
    const s = JSON.stringify(d);
    if (s.includes(from)) {
      drafts[f] = JSON.parse(s.split(from).join(to));
      log.push(`${f}: renamed ${from} to ${to}`);
    }
  }
}

// 3. hazardNote is for texts containing passages that advocate violence. The
// de Garis drafts set it where forecast-war detail was left unquoted; that is a
// quotation choice, stated in the qualification instead.
for (const { f, r } of all())
  if (f === 'de-garis.json' && r.hazardNote) {
    r.hazardNote = null;
    r.qualification +=
      ' Passages describing the forecast conflict in detail are not quoted.';
    log.push(
      `${r.id}: hazardNote moved to qualification (forecast detail, not advocacy)`,
    );
  }

// 4. Earliest located across groups. Each draft chose its own; the role goes to
// the record whose wording is dated earliest (the attested date where recorded).
// A record whose wording is attested only from a copy retrieved in October 2026
// (an undated or live page) cannot hold it. Ties at the stated precision are
// reported, not decided.
const wd = (r) => (r.attested ? r.attested.date : r.time?.date) ?? null;
const live = (r) => r.attested && String(r.attested.date) >= '2026-10';
const stanceOf = (r) =>
  r.predicate === 'articulates_proposition'
    ? 'articulates'
    : r.predicate === 'contests_proposition'
      ? 'contests'
      : 'bears_on';
const before = (a, b) => {
  const n = Math.min(a.length, b.length);
  return a.slice(0, n) < b.slice(0, n);
};
const groups = new Map();
for (const x of all()) {
  const st = stanceOf(x.r);
  if (st === 'bears_on') continue;
  const k = `${x.r.proposition}|${st}`;
  groups.set(k, [...(groups.get(k) ?? []), x]);
}
for (const [k, xs] of [...groups].sort()) {
  const [code, st] = k.split('|');
  const cands = xs.filter(({ r }) => wd(r) && !live(r));
  // Earliest: no other candidate dated definitely before it.
  const earliest = cands.filter(
    ({ r }) => !cands.some(({ r: o }) => o !== r && before(wd(o), wd(r))),
  );
  earliest.sort((a, b) => String(wd(a.r)).length - String(wd(b.r)).length);
  if (earliest.length > 1)
    log.push(
      `${code} ${st}: tie at stated precision among ${earliest.map(({ r }) => `${r.id} (${wd(r)})`).join(', ')}; role given to the first, listed as an open question`,
    );
  const holder = earliest[0]?.r;
  for (const { r } of xs) {
    const had = r.roles.includes('earliest-located');
    const should = r === holder;
    if (had && !should) {
      r.roles = r.roles.filter((x) => x !== 'earliest-located');
      if (
        !r.roles.length ||
        r.roles.every((x) => x === 'earliest-located-term')
      )
        r.roles.unshift(st === 'contests' ? 'contesting' : 'articulation');
      r.qualification = r.qualification.replace(
        /\s*[^.]*\bearliest located\b[^.]*\./gi,
        '',
      );
      r.qualification += ` Another ${st === 'contests' ? 'contesting text' : 'articulation'} on ${code} has wording attested earlier, so the role was reassigned at integration (2026-10-31).`;
      log.push(`${code} ${st}: ${r.id} loses earliest-located`);
    }
    if (should && !had) {
      r.roles = r.roles.filter(
        (x) => x !== 'articulation' && x !== 'later-restatement',
      );
      r.roles.unshift('earliest-located');
      if (st === 'contests' && !r.roles.includes('contesting'))
        r.roles.push('contesting');
      log.push(`${code} ${st}: ${r.id} becomes earliest located (${wd(r)})`);
    }
  }
}

// 5. Mechanical fixes after the further-texts draft: dataset links given as one
// semicolon-separated string become a list; a statement that reports Rees's own
// word "precursor" quotes it.
for (const { r } of all()) {
  if (typeof r.datasetLink === 'string' && r.datasetLink.includes(';')) {
    r.datasetLink = r.datasetLink.split(/\s*;\s*/).filter(Boolean);
    log.push(`${r.id}: datasetLink split into a list`);
  }
  if (r.statement.includes('transient and primitive precursor of')) {
    r.statement = r.statement.replace(
      'humans will be a transient and primitive precursor of',
      'humans will be “a transient and primitive precursor” of',
    );
    log.push(`${r.id}: Rees's wording put in quotation marks`);
  }
}

// 6. Wording of step 4's note: a record can lose the role because another
// record's wording is attested earlier, not only because its text is dated later.
for (const { r } of all()) {
  const m = r.qualification.match(
    / An earlier dated (articulation|contesting text) on (W\d\d) was located by another group \(integration, 2026-10-31\)\./,
  );
  if (m) {
    r.qualification = r.qualification.replace(
      m[0],
      ` Another ${m[1]} on ${m[2]} has wording attested earlier, so the role was reassigned at integration (2026-10-31).`,
    );
    log.push(`${r.id}: integration note reworded`);
  }
}

// 7. Scope: the second part of Lê's 2026 conversation with Land concerns his
// political views; its record (bears on W08, no mention of machine intelligence)
// and its link are removed under the scope rule for Land's later political writing.
{
  const d = drafts['land.json'];
  if (d) {
    const doc = 'le-2026-conversation-land-2';
    const before = d.records.length + (d.links ?? []).length;
    d.records = d.records.filter((r) => r.document !== doc);
    d.links = (d.links ?? []).filter((l) => l.from !== doc);
    if (d.records.length + d.links.length < before) {
      d.documents = d.documents.filter((x) => x.id !== doc);
      const used = new Set(
        [...d.records, ...d.links].flatMap((r) =>
          r.evidence.map((e) => e.source),
        ),
      );
      d.sources = d.sources.filter((s) => used.has(s.key));
      d.omissions.push({
        item: 'Vincent Lê, "A Conversation with Nick Land", part 2 (2026-01-20)',
        reason:
          "Removed by the integrator under the scope rule: the passages recorded (bearing on W08) do not mention machine intelligence, and the part concerns Land's political views, which are out of scope.",
      });
      log.push(`removed records and links of ${doc} (scope)`);
    }
  }
}

// 8. Earliest located use of a usual name, assigned as the dataset's validation
// requires: among records whose evidence contains one of the proposition's
// usual names (propositions.json, narrowed after the audit), the one whose
// wording is dated earliest holds the role, with the name it uses.
{
  const props = JSON.parse(
    readFileSync(join(DIR, 'propositions.json'), 'utf8'),
  );
  for (const p of props.propositions) {
    const terms = (p.terms ?? []).map((t) => t.toLowerCase());
    const xs = all().filter(({ r }) => r.proposition === p.code);
    const usesOf = (r) =>
      terms.filter((t) =>
        r.evidence.some((e) => e.passage.toLowerCase().includes(t)),
      );
    const users = xs.filter(({ r }) => wd(r) && usesOf(r).length);
    const first = users.filter(
      ({ r }) => !users.some(({ r: o }) => o !== r && before(wd(o), wd(r))),
    );
    first.sort((a, b) => String(wd(a.r)).length - String(wd(b.r)).length);
    if (first.length > 1)
      log.push(
        `${p.code} term: tie at stated precision among ${first.map(({ r }) => r.id).join(', ')}; role given to the first`,
      );
    const holder = first[0]?.r;
    for (const { r } of xs) {
      const had = r.roles.includes('earliest-located-term');
      if (r === holder) {
        const term = p.terms.find((t) => usesOf(r).includes(t.toLowerCase()));
        if (!had || r.term !== term) {
          if (!had) r.roles.push('earliest-located-term');
          r.term = term;
          log.push(
            `${p.code}: ${r.id} holds earliest-located-term ("${term}", ${wd(r)})`,
          );
        }
      } else if (had || r.term) {
        r.roles = r.roles.filter((x) => x !== 'earliest-located-term');
        r.term = null;
        log.push(`${p.code}: ${r.id} loses earliest-located-term`);
      }
    }
  }
}

for (const [f, d] of Object.entries(drafts))
  writeFileSync(join(DRAFTS, f), JSON.stringify(d, null, 2) + '\n');
writeFileSync(
  join(DIR, 'reconcile-log.json'),
  JSON.stringify(log, null, 2) + '\n',
);
console.log(log.join('\n'));
