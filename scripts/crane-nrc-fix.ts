// Corrects the record of the NRC's Crane Clean Energy Center fuel amendment
// (`cpo-pw-crane-nrc-fuel-amendment`) from the NRC's own record, as the
// admission record of the compute, power and orbit pack (part 2,
// review/cpo-admission-2-2026-10-30.md, item 34) promised and did not apply:
// the record rested on Constellation's statement of 6 August 2026, while the
// NRC's Amendment No. 307, dated 1 July 2026, concerns the receipt and
// possession of new fuel, not a restart.
//
//   pnpm tsx scripts/crane-nrc-fix.ts --verify   match the quotations in a fresh retrieval of the NRC's texts
//   pnpm tsx scripts/crane-nrc-fix.ts            write the records and the before-snapshot
//   pnpm tsx scripts/crane-nrc-fix.ts --check    compare with the stored records
//   pnpm tsx scripts/crane-nrc-fix.ts --base <commit>
//                                   rebuild on a new base: the snapshot names that base commit
//
// `--verify` retrieves the NRC facility page and the Federal Register notice
// of 4 August 2026 (91 FR 49452) into the ignored .local/crane-nrc-fix/
// cache and writes review/crane-nrc-fix-verification-2026-11-01.json; the
// correction reads that file, never the cache. The amendment itself (ADAMS
// ML26135A004) was refused at retrieval (HTTP 403 from nrc.gov), so its text
// is not quoted; the NRC's notice of it in the Federal Register is.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { maxQuotedWords } from '../src/domain/schema';

const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const date = '2026-11-01';
const claimId = 'cpo-pw-crane-nrc-fuel-amendment';
const snapshotPath = 'review/crane-nrc-fix-before-2026-11-01.json';
const verificationPath = 'review/crane-nrc-fix-verification-2026-11-01.json';
const cache = '.local/crane-nrc-fix';
const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const words = (s: string) =>
  s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');

const facilityUrl =
  'https://www.nrc.gov/facilities-safety/facility-finder/reactors/ccec';
const noticeUrl =
  'https://www.govinfo.gov/content/pkg/FR-2026-08-04/pdf/2026-15750.pdf';
const noticeSourceId = 'source-nrc-fr-2026-08-04-biweekly-notice';

/** The quotations the correction rests on, by the text they are matched in. */
const quotes = {
  facility1: {
    text: 'facility',
    passage:
      "By Amendment No. 307, dated July 1, 2026, the NRC staff approved Constellation's request.",
  },
  facility2: {
    text: 'facility',
    passage:
      'receipt and possession of new nuclear fuel and new sealed neutron sources at the CCEC',
  },
  restartPath: {
    text: 'facility',
    passage:
      'To restart CCEC, Constellation would need to (1) gain NRC approval to restore the licensing basis of the plant to an operational status',
  },
  notice: {
    text: 'notice',
    passage:
      'The amendment revised the facility license to allow receipt and possession of new reactor fuel and new sealed neutron sources at the Christopher M. Crane Clean Energy Center.',
  },
};

const normalise = (t: string) =>
  t
    .normalize('NFKC')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&rsquo;|&#8217;|[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/-\s*\n\s*/g, '-')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .toLowerCase();

if (args.includes('--verify')) {
  // The verification file is the record of the correction's retrieval; a
  // later run would restamp it, so it is never overwritten.
  if (existsSync(verificationPath))
    throw new Error(`${verificationPath} exists; it is not overwritten.`);
  mkdirSync(cache, { recursive: true });
  const fetchTo = (url: string, file: string) =>
    execFileSync(
      'curl',
      ['-sSL', '-m', '120', '-o', file, '-w', '%{http_code}', url],
      {
        encoding: 'utf8',
      },
    );
  const facilityStatus = fetchTo(facilityUrl, `${cache}/facility.html`);
  const noticeStatus = fetchTo(noticeUrl, `${cache}/notice.pdf`);
  execFileSync('pdftotext', [`${cache}/notice.pdf`, `${cache}/notice.txt`]);
  const texts: Record<string, string> = {
    facility: readFileSync(`${cache}/facility.html`, 'utf8'),
    notice: readFileSync(`${cache}/notice.txt`, 'utf8'),
  };
  if (facilityStatus !== '200' || noticeStatus !== '200')
    throw new Error(`Retrieval failed: ${facilityStatus}, ${noticeStatus}`);
  const hash = (file: string) =>
    createHash('sha256').update(readFileSync(file)).digest('hex');
  // The notice's own pages: from the end of the preceding document to its
  // own FR Doc line, less running heads and production lines.
  const noticeOnly = texts.notice
    .split(/\[FR Doc\. 2026.15821[^\]]*\]/)[1]
    .split(/\[FR Doc\. 2026.15750/)[0]
    .split('\n')
    .filter(
      (l) =>
        !/^Federal Register \/ Vol|VerDate|Jkt |PO 0|Frm |Fmt |Sfmt |lotter on/.test(
          l,
        ),
    )
    .join(' ');
  const result = {
    checkedAt: date,
    method:
      'Each quotation was matched in a fresh retrieval of its text after Unicode compatibility normalisation (NFKC) and normalising whitespace, case, quotation marks and dashes, removing HTML tags and entities, and joining PDF line-break hyphens. The amendment itself (ADAMS ML26135A004, linked from the facility page) answered HTTP 403 from www.nrc.gov and pbadupws.nrc.gov, and the ADAMS search service refused the connection, so it was not read.',
    sources: {
      facility: {
        url: facilityUrl,
        httpStatus: Number(facilityStatus),
        sha256: hash(`${cache}/facility.html`),
      },
      notice: {
        url: noticeUrl,
        httpStatus: Number(noticeStatus),
        sha256: hash(`${cache}/notice.pdf`),
        documentWords: noticeOnly.split(/\s+/).filter(Boolean).length,
        facilityNote:
          'The facility page embeds per-request tokens, so its SHA-256 differs between retrievals of the same text.',
      },
    },
    quotes: Object.fromEntries(
      Object.entries(quotes).map(([k, q]) => [
        k,
        {
          ...q,
          words: words(q.passage),
          found: normalise(texts[q.text]).includes(normalise(q.passage)),
        },
      ]),
    ),
  };
  writeFileSync(verificationPath, JSON.stringify(result, null, 2) + '\n');
  execFileSync('pnpm', ['prettier', '--write', verificationPath], {
    stdio: 'ignore',
  });
  const missing = Object.entries(result.quotes).filter(([, q]) => !q.found);
  console.log(
    `3 quotations; not matched: ${missing.map(([k]) => k).join(', ') || 'none'}`,
  );
  process.exit(missing.length ? 1 : 0);
}

// ---------------------------------------------------------------- base
const verification: Json = read(verificationPath);
for (const [k, q] of Object.entries(verification.quotes as Json))
  if (!q.found) throw new Error('Quotation not matched: ' + k);
const stored = {
  meta: read('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, read(`data/${n}.json`)])),
} as { meta: Json } & Record<Name, Row[]>;
const storedSnapshot: Json | null = existsSync(snapshotPath)
  ? read(snapshotPath)
  : null;
const applies =
  storedSnapshot &&
  names.every((n) =>
    ((storedSnapshot.added?.[n] ?? []) as string[]).every((id) =>
      stored[n].some((r) => r.id === id),
    ),
  ) &&
  stored.claims.some(
    (c) => c.id === claimId && (c.time as Json).date === '2026-07-01',
  );
if (storedSnapshot && !applies)
  throw new Error(
    `${snapshotPath} does not describe the stored data; restore the data before rerunning.`,
  );
const snapshot: Json | null = applies ? storedSnapshot : null;
const base = {
  meta: snapshot ? snapshot.meta : stored.meta,
  ...Object.fromEntries(
    names.map((n) => {
      const added = new Set<string>(snapshot?.added[n] ?? []);
      const before = new Map<string, Row>(
        (snapshot?.before[n] ?? []).map((r: Row) => [r.id, r]),
      );
      return [
        n,
        stored[n]
          .filter((r) => !added.has(r.id))
          .map((r) => structuredClone(before.get(r.id) ?? r)),
      ];
    }),
  ),
} as { meta: Json } & Record<Name, Row[]>;
const baseArg = args.includes('--base')
  ? args[args.indexOf('--base') + 1]
  : undefined;
const baseCommit = execFileSync('git', ['rev-parse', baseArg ?? 'HEAD'], {
  encoding: 'utf8',
}).trim();
const changed: Record<Name, Map<string, Row>> = {
  entities: new Map(),
  claims: new Map(),
  sources: new Map(),
  evidence: new Map(),
};
const added: Record<Name, Row[]> = {
  entities: [],
  claims: [],
  sources: [],
  evidence: [],
};
function edit(n: Name, id: string, change: (row: Row) => void) {
  const row = base[n].find((r) => r.id === id);
  if (!row) throw new Error(`No stored ${n} row: ${id}`);
  if (!changed[n].has(id)) changed[n].set(id, structuredClone(row));
  change(row);
}

// ---------------------------------------------------------------- source
const facility = verification.sources.facility;
const notice = verification.sources.notice;
added.sources.push({
  id: noticeSourceId,
  title:
    'Biweekly Notice; Applications and Amendments to Facility Operating Licenses and Combined Licenses Involving No Significant Hazards Considerations',
  authors: ['U.S. Nuclear Regulatory Commission'],
  publisher: 'U.S. Nuclear Regulatory Commission',
  publicationDate: '2026-08-04',
  version: `Retrieved from govinfo.gov at the correction on ${date} (SHA-256 ${notice.sha256}). Federal Register print of 4 August 2026, Vol. 91, pp. 49452–49458, FR Doc. 2026-15750. Publisher as printed on the inspected expression: Federal Register (Office of the Federal Register, National Archives) via govinfo.gov.`,
  canonicalUrl:
    'https://www.federalregister.gov/documents/2026/08/04/2026-15750/biweekly-notice-applications-and-amendments-to-facility-operating-licenses-and-combined-licenses',
  evidenceUrl: noticeUrl,
  language: 'en',
  documentWords: {
    count: notice.documentWords,
    basis: `pdftotext word count of the Federal Register pages for this document, less page furniture (running heads, production lines), in the retrieval of ${date}`,
  },
  kind: 'filing',
  accessedAt: date,
  reuse: {
    attribution:
      'U.S. Nuclear Regulatory Commission, “Biweekly Notice; Applications and Amendments to Facility Operating Licenses …”, Federal Register 91 FR 49452, 2026-08-04.',
    licence: 'United States federal government work',
    note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
  },
});
edit('sources', 'source-cpo-nrc-crane-facility-page', (s) => {
  s.version = `${String(s.version).replace(/\s*$/, '')} Retrieved again at the correction of ${date}; the quoted passages are unchanged. The page embeds per-request tokens, so its SHA-256 differs between retrievals of the same text (${facility.sha256} at the correction).`;
  s.accessedAt = date;
});

// ---------------------------------------------------------------- claim
const matched = (k: keyof typeof quotes, text: string) =>
  `The quotation (${words(quotes[k].passage)} words) matched a fresh retrieval of ${date} of ${text}. Matching used Unicode compatibility normalisation (NFKC) and ignored differences of whitespace, case, quotation marks, dashes and HTML tags.`;
const correction = `Corrected on ${date} (review/crane-nrc-fix-2026-11-01.md): the record now rests on the NRC's own record.`;
const facilityLocator =
  "Additional Activities, item on Constellation's licence amendment request of June 27, 2025";
/** An earlier note kept, with the correction's own sentences after it. */
const append = (note: unknown, text: string) =>
  `${String(note).replace(/\s*No human editorial review\.$/, '')} ${text} No human editorial review.`;
edit('evidence', 'evidence-cpo-pw-crane-nrc-fuel-amendment-2', (e) => {
  e.locator = facilityLocator;
  e.note = append(
    e.note,
    `Matched again at the correction: ${matched('facility1', "the NRC's facility page")} ${correction}`,
  );
  e.checkedAt = date;
});
edit('evidence', 'evidence-cpo-pw-crane-nrc-fuel-amendment-3', (e) => {
  e.locator = facilityLocator;
  e.note = append(
    e.note,
    `Matched again at the correction: ${matched('facility2', "the NRC's facility page")} ${correction}`,
  );
  e.checkedAt = date;
});
edit('evidence', 'evidence-cpo-pw-crane-nrc-fuel-amendment-1', (e) => {
  e.note = append(
    String(e.note).replace(
      'agreed with the record.',
      'agreed with the record as admitted on 2026-10-30.',
    ),
    `Constellation's own account, attributed to it; it gives no amendment number, and reading it as Amendment No. 307 is Selekoa's. It does not stand for the NRC's action, which the NRC's record gives. ${correction}`,
  );
});
added.evidence.push({
  id: 'evidence-cpo-pw-crane-nrc-fuel-amendment-4',
  claimId,
  sourceId: noticeSourceId,
  sourceRole: 'primary',
  support: 'supports',
  locator:
    '91 FR 49456, III. Notice of Issuance of Amendments, License Amendment Issuances, entry for Christopher M. Crane Clean Energy Center (Docket No. 50–289, Amendment No. 307), Brief Description of Amendment',
  passage: quotes.notice.passage,
  passageType: 'quote',
  verification: 'machine_checked',
  checkedAt: date,
  note: `The NRC's notice of the amendment in the Federal Register, which gives the amendment date as July 1, 2026 and the ADAMS accession number ML26135A004. ${matched('notice', 'the Federal Register PDF')} ${correction} No human editorial review.`,
  retrievalRoute: 'direct',
});
added.evidence.push({
  id: 'evidence-cpo-pw-crane-nrc-fuel-amendment-5',
  claimId,
  sourceId: 'source-cpo-nrc-crane-facility-page',
  sourceRole: 'primary',
  support: 'context',
  locator: 'Restart section, opening of the list of approvals the NRC names',
  passage: quotes.restartPath.passage,
  passageType: 'quote',
  verification: 'machine_checked',
  checkedAt: date,
  note: `Context: the NRC's facility page lists approvals needed to restart the plant, of which restoring the licensing basis to operational status is the first; Amendment No. 307 is listed separately, among additional activities. ${matched('restartPath', "the NRC's facility page")} ${correction} No human editorial review.`,
  retrievalRoute: 'direct',
});
edit('claims', claimId, (c) => {
  c.object = {
    kind: 'literal',
    value:
      'Amendment No. 307 to the Crane Clean Energy Center facility licence: receipt and possession of new nuclear fuel and new sealed neutron sources',
  };
  c.statement =
    "By Amendment No. 307, dated 1 July 2026, the NRC staff approved Constellation's request to revise the Crane Clean Energy Center facility licence and technical specifications to allow receipt and possession of new nuclear fuel and new sealed neutron sources.";
  c.time = {
    kind: 'event',
    date: '2026-07-01',
    note: "Date of Amendment No. 307 as the NRC's facility page (“dated July 1, 2026”) and its Federal Register notice of 4 August 2026 (“Amendment Date”) give it. Neither says whether it is the date of issuance, signature or effect, so no basis is given; the amendment itself was not read.",
  };
  c.qualification =
    "Rests on the NRC's own record: its facility page and its Federal Register notice of the amendment. The amendment allows receipt and possession of new fuel and sealed neutron sources; the facility page lists the approvals a restart would need separately, and the record does not say the plant may restart or operate. The amendment document itself (ADAMS ML26135A004) was refused at retrieval. Constellation's statement of 6 August 2026, attributed to it as context, calls the step the approval of a fuel licence amendment request and gives 2027 as its target for restarting operations; the target is Constellation's, not the NRC's, and is not recorded as a stated date of this record.";
  c.evidenceIds = [
    'evidence-cpo-pw-crane-nrc-fuel-amendment-2',
    'evidence-cpo-pw-crane-nrc-fuel-amendment-3',
    'evidence-cpo-pw-crane-nrc-fuel-amendment-4',
    'evidence-cpo-pw-crane-nrc-fuel-amendment-5',
    'evidence-cpo-pw-crane-nrc-fuel-amendment-1',
  ];
  // Constellation's 2027 target is not the NRC's: the stated date would be
  // shown under the NRC's decision and dated by it. The decision concerns
  // fuel receipt, not a restart.
  const attributes = c.attributes as Json;
  delete attributes.statedDates;
  attributes.power = { technology: 'nuclear', mechanism: 'other' };
});

// ---------------------------------------------------------------- limits
const noticeQuoted = words(quotes.notice.passage);
if (noticeQuoted > maxQuotedWords(notice.documentWords))
  throw new Error('Over the quotation limit for the notice');

// ---------------------------------------------------------------- output
const meta = {
  ...base.meta,
  updatedAt: date > base.meta.updatedAt ? date : base.meta.updatedAt,
};
const result = {
  meta,
  ...Object.fromEntries(
    names.map((n) => [
      n,
      [...base[n], ...added[n]].map((r) => JSON.parse(JSON.stringify(r))),
    ]),
  ),
} as unknown as { meta: Json } & Record<Name, Row[]>;
const newSnapshot = {
  description:
    'Rows added and changed by the correction of the NRC Crane Clean Energy Center fuel amendment record (scripts/crane-nrc-fix.ts, review/crane-nrc-fix-2026-11-01.md). Removing the added rows and restoring the changed ones reproduces the dataset as it was at baseCommit.',
  baseCommit: snapshot && !baseArg ? snapshot.baseCommit : baseCommit,
  meta: base.meta,
  added: Object.fromEntries(names.map((n) => [n, added[n].map((r) => r.id)])),
  before: Object.fromEntries(names.map((n) => [n, [...changed[n].values()]])),
  sha256: {
    meta: sha(base.meta),
    ...Object.fromEntries(
      names.map((n) => [n, sha(base[n].map((r) => changed[n].get(r.id) ?? r))]),
    ),
  },
};
const outputs: Record<string, unknown> = {
  'data/meta.json': result.meta,
  ...Object.fromEntries(names.map((n) => [`data/${n}.json`, result[n]])),
  [snapshotPath]: newSnapshot,
};
if (check) {
  const differing = Object.entries(outputs).filter(
    ([path, value]) =>
      !existsSync(path) ||
      JSON.stringify(read(path)) !==
        JSON.stringify(JSON.parse(JSON.stringify(value))),
  );
  if (differing.length) {
    console.error(
      'Differs from stored: ' + differing.map(([p]) => p).join(', '),
    );
    process.exitCode = 1;
  } else console.log('Stored records match the correction.');
} else {
  for (const [path, value] of Object.entries(outputs))
    writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
  execFileSync('pnpm', ['prettier', '--write', ...Object.keys(outputs)], {
    stdio: 'ignore',
  });
  console.log(
    `Changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}; added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}.`,
  );
}
