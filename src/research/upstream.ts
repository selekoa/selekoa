import { z } from 'zod';
import { fingerprint } from '../domain/references';

export const upstreamRepository = 'futurelightcone/source-integrity';
export const upstreamCommit = '54c62fc426d7b6ae008fd6acd3f53a0b993248ac';
export const columns = {
  claims:
    'CLAIM_ID CONCEPT CLAIM_TYPE ASSERTION_CLASS PROVENANCE_TAXONOMY ATOMIC_CLAIM SEARCH_SCOPE VENUE_SCOPE NETWORK_SCOPE PRIORITY_SENSITIVE EARLIEST_POSITIVE_EVIDENCE_DATE SEARCH_BOUNDARY EARLIER_CANDIDATES_FOUND PRIORITY_STATUS MACHINE_PRELIMINARY_STATUS RATIONALE HUMAN_VERDICT HUMAN_NOTES'.split(
      ' ',
    ),
  evidence:
    'CLAIM_ID SOURCE_ID EXPRESSION_ID SOURCE_ROLE ASSERTION_CLASS PROVENANCE_TAXONOMY PASSAGE PASSAGE_COMPOSITION LOCATION EVIDENCE_URL CAPTURE_DATE TEMPORALLY_ADEQUATE SOURCE_ROLE_ADEQUATE MACHINE_PRELIMINARY_STATUS SOURCE_ESTABLISHES RATIONALE CONFIDENCE HUMAN_VERDICT HUMAN_NOTES'.split(
      ' ',
    ),
  sources:
    'SOURCE_ID EXPRESSION_ID WORK_ID CANONICAL_BIBLIOGRAPHIC_IDENTITY AUTHORS TITLE DATE VENUE CANONICAL_URL EXPRESSION_URL_USED EXPRESSION_DATE CAPTURE_DATE SOURCE_ROLE ORIGINAL_PACKET_URL HISTORICAL_ORGANIZATION_CONTEXT IDENTITY_EVIDENCE'.split(
      ' ',
    ),
  mappings:
    'PACKET_CLAIM_ID PACKET_OCCURRENCE_ID SOURCE_ID ATOMIC_CLAIM_IDS PACKET_LEVEL_ATOMIC_CLAIM_IDS PROVENANCE_CLASSIFICATION_CLAIM_IDS PROVENANCE_MAPPING_BASIS TREATMENT'.split(
      ' ',
    ),
} as const;
export type Table = keyof typeof columns;
export const paths: Record<Table, string> = {
  claims: 'reports/canonical-claims.csv',
  evidence: 'reports/claim-evidence.csv',
  sources: 'reports/canonical-sources.csv',
  mappings: 'reports/claim-atomization-crosswalk.csv',
};

/** CSV record ordinals, not physical lines: quoted cells can contain newlines. */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [],
    cell = '',
    quoted = false,
    closed = false;
  const input = text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (quoted) {
      if (char === '"' && input[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
        closed = true;
      } else cell += char;
    } else if (char === ',' || char === '\n') {
      row.push(cell);
      cell = '';
      closed = false;
      if (char === '\n') {
        rows.push(row);
        row = [];
      }
    } else if (char === '"' && !cell && !closed) quoted = true;
    else {
      if (closed || char === '"') throw new Error('Malformed CSV quote');
      cell += char;
    }
  }
  if (quoted) throw new Error('Unclosed CSV quote');
  if (cell || row.length || closed) rows.push([...row, cell]);
  const headers = rows.shift();
  if (!headers?.length || new Set(headers).size !== headers.length)
    throw new Error('Missing or duplicate CSV headers');
  return rows.map((cells) => {
    if (cells.length !== headers.length)
      throw new Error('CSV column count mismatch');
    return Object.fromEntries(headers.map((key, i) => [key, cells[i]]));
  });
}

export const splitIds = (value: string) =>
  value
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);
const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/);
const rowSchema = (keys: readonly string[]) =>
  z.strictObject({
    ordinal: z.number().int().positive(),
    // Digest of the projected cells; private packet prose is deliberately excluded.
    fingerprint: digest,
    values: z.strictObject(
      Object.fromEntries(keys.map((key) => [key, z.string()])),
    ),
  });
export const snapshotSchema = z.strictObject({
  repository: z.literal(upstreamRepository),
  commit: z.literal(upstreamCommit),
  retrievedAt: z.literal('2026-09-28'),
  files: z.array(
    z.strictObject({
      path: z.string(),
      sha256: digest,
      gitBlob: z.string().regex(/^[a-f0-9]{40}$/),
    }),
  ),
  claims: z.array(rowSchema(columns.claims)).min(1),
  evidence: z.array(rowSchema(columns.evidence)).min(1),
  sources: z.array(rowSchema(columns.sources)).min(1),
  mappings: z.array(rowSchema(columns.mappings)),
});
export type Snapshot = z.infer<typeof snapshotSchema>;
export type UpstreamRow = Snapshot['claims'][number];

export async function captureSnapshot(
  files: { path: string; content: string; sha256: string; gitBlob: string }[],
  selectedIds: string[],
): Promise<Snapshot> {
  if (new Set(selectedIds).size !== selectedIds.length)
    throw new Error('Duplicate selected claim');
  const tables = Object.fromEntries(
    Object.entries(paths).map(([key, path]) => {
      const file = files.find((f) => f.path === path);
      if (!file) throw new Error('Missing upstream file: ' + path);
      return [
        key,
        parseCsv(file.content).map((values, i) => ({ ordinal: i + 1, values })),
      ];
    }),
  ) as Record<Table, { ordinal: number; values: Record<string, string> }[]>;
  const selected = new Set(selectedIds);
  tables.claims = tables.claims.filter((r) => selected.has(r.values.CLAIM_ID));
  if (tables.claims.length !== selected.size)
    throw new Error('Missing or duplicate upstream claim');
  tables.evidence = tables.evidence.filter((r) =>
    selected.has(r.values.CLAIM_ID),
  );
  const expressions = new Set(
    tables.evidence.map((r) => r.values.EXPRESSION_ID),
  );
  tables.sources = tables.sources.filter((r) =>
    expressions.has(r.values.EXPRESSION_ID),
  );
  tables.mappings = tables.mappings.filter((r) =>
    [
      'ATOMIC_CLAIM_IDS',
      'PACKET_LEVEL_ATOMIC_CLAIM_IDS',
      'PROVENANCE_CLASSIFICATION_CLAIM_IDS',
    ].some((key) => splitIds(r.values[key]).some((id) => selected.has(id))),
  );
  const projected: Partial<Record<Table, UpstreamRow[]>> = {};
  for (const key of Object.keys(paths) as Table[]) {
    projected[key] = await Promise.all(
      tables[key].map(async (row) => {
        const values = Object.fromEntries(
          columns[key].map((name) => {
            if (!(name in row.values))
              throw new Error('Missing upstream column: ' + name);
            return [name, row.values[name]];
          }),
        );
        return {
          ordinal: row.ordinal,
          values,
          fingerprint: await fingerprint(values),
        };
      }),
    );
  }
  return snapshotSchema.parse({
    repository: upstreamRepository,
    commit: upstreamCommit,
    retrievedAt: '2026-09-28',
    files: files
      .map(({ path, sha256, gitBlob }) => ({ path, sha256, gitBlob }))
      .sort((a, b) => (a.path < b.path ? -1 : 1)),
    ...projected,
  });
}

export async function validateSnapshot(input: unknown): Promise<Snapshot> {
  const snapshot = snapshotSchema.parse(input);
  if (
    snapshot.files.length !== 4 ||
    new Set(snapshot.files.map((f) => f.path)).size !== 4 ||
    Object.values(paths).some((p) => !snapshot.files.some((f) => f.path === p))
  )
    throw new Error('Upstream file manifest mismatch');
  for (const key of Object.keys(paths) as Table[]) {
    if (
      new Set(snapshot[key].map((r) => r.ordinal)).size !== snapshot[key].length
    )
      throw new Error('Duplicate upstream row address');
    for (const row of snapshot[key]) {
      if ((await fingerprint(row.values)) !== row.fingerprint)
        throw new Error('Upstream row fingerprint mismatch');
      if (row.values.HUMAN_VERDICT || row.values.HUMAN_NOTES)
        throw new Error('Importing human review requires a separate task');
    }
  }
  return snapshot;
}
