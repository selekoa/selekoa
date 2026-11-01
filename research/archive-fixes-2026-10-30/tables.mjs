// Writes the tables of review/archive-fixes-2026-10-30.md from changes.json,
// between the record's tables markers. Run after apply.mjs:
//
//   node research/archive-fixes-2026-10-30/tables.mjs
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', '..');
const RECORD = 'review/archive-fixes-2026-10-30.md';
const log = JSON.parse(
  readFileSync(join(ROOT, 'research/archive-fixes-2026-10-30/changes.json')),
);
const cell = (v) => String(v ?? '').replace(/\|/g, '\\|');
const table = (head, rows) =>
  [
    `| ${head.join(' | ')} |`,
    `| ${head.map((h) => (h === 'Item' ? '---:' : '---')).join(' | ')} |`,
    ...rows.map((r) => `| ${r.map(cell).join(' | ')} |`),
  ].join('\n');
const day = (url, d) => `[${d}](${url})`;
const code = (id) => `\`${id}\``;

const byFound = (k) => log.links.filter((l) => l.foundBy === k).length;
const withQuotes = log.links.filter(
  (l) => l.status === 'quotation-problems',
).length;
const headline = log.quotations.filter((q) => q.headline).length;

const out = [
  `### Archive links added (${log.links.length})`,
  `Found through CDX: ${byFound('CDX')}; saved by the check (Save Page Now) and read back: ${byFound('saved-new')}. ${withQuotes} of these sources also had a quotation difference, listed under quotations.`,
  table(
    ['Item', 'Source', 'Capture (`archivedAt`)', 'Found by'],
    log.links.map((l) => [
      l.n,
      code(l.id),
      day(l.url, l.archivedAt),
      { CDX: 'CDX', 'saved-new': 'Save Page Now' }[l.foundBy] ?? l.foundBy,
    ]),
  ),
  `### Cited captures replaced (${log.captureChanges.length})`,
  table(
    ['Item', 'Source', 'Before', 'After', 'Reason'],
    log.captureChanges.map((c) => [
      c.n,
      code(c.id),
      day(
        c.from,
        c.from
          .match(/web\/(\d{4})(\d{2})(\d{2})/)
          .slice(1)
          .join('-'),
      ),
      day(c.url, c.archivedAt),
      c.reason,
    ]),
  ),
  `### Quotations fixed (${log.quotations.length})`,
  `Each passage now reads as the capture; \`checkedAt\` is the day the check read the capture, except for the human-reviewed Levy passage, which keeps its review date. ${headline} rows bear a headline role, or quote the same passage as one that does, and were first held under the override rule; the maintainer's decision of 2026-10-30 applies them, since they change no wording. The before and after texts are in [\`changes.json\`](../research/archive-fixes-2026-10-30/changes.json).`,
  table(
    [
      'Item',
      'Evidence',
      'Source',
      'Correction',
      'Headline role',
      '`checkedAt`',
    ],
    log.quotations.map((q) => [
      q.n,
      code(q.id),
      code(q.source),
      q.what,
      q.headline ?? '',
      q.checkedAt,
    ]),
  ),
  `### Locators fixed (${log.locators.length})`,
  table(
    ['Item', 'Evidence', 'Before', 'After'],
    log.locators.map((l) => [l.n, code(l.id), l.from, l.to]),
  ),
  `### Canonical URLs updated (${log.urls.length})`,
  table(
    ['Source', 'Before', 'After'],
    log.urls.map((u) => [code(u.id), `<${u.from}>`, `<${u.to}>`]),
  ),
  `### Held, unchanged (${log.held.length})`,
  table(
    ['Kind', 'Item', 'Record', 'Reason'],
    log.held.map((h) => [
      h.kind,
      h.n ?? '—',
      h.ids.map(code).join(', '),
      h.reason,
    ]),
  ),
  `### Checked, no change needed (${log.unchanged.length})`,
  table(
    ['Item', 'Record', 'Reason'],
    log.unchanged.map((u) => [
      u.n ?? '—',
      u.ids.map(code).join(', '),
      u.reason,
    ]),
  ),
].join('\n\n');

const path = join(ROOT, RECORD);
const record = readFileSync(path, 'utf8');
const start = '<!-- tables:start -->';
const end = '<!-- tables:end -->';
const a = record.indexOf(start);
const b = record.indexOf(end);
if (a < 0 || b < a) throw new Error('No tables markers in the record');
writeFileSync(
  path,
  record.slice(0, a + start.length) + '\n\n' + out + '\n\n' + record.slice(b),
);
execSync(`pnpm -s prettier --write ${RECORD}`, { cwd: ROOT });
