// Test-only historical view: schema 2.7 added source language and archive
// capture fields, revised framework-source reuse notes, replaced selected
// framework paraphrases with checked quotes or corrected wording, and dated
// the dataset accordingly. Reversing exactly those changes reproduces the 2.6
// dataset, so earlier baselines and packs stay checkable without rewriting
// their stored references.
import before from '../../review/framework-evidence-before-2026-10-03.json';
import { preProvisionsRaw } from './historical-views';

// Built on the pre-4a view, so later authorised changes stay reversed too.
const { entities, claims, sources, evidence, meta } = preProvisionsRaw;

const addedScope =
  " Schema 2.7 records each source's language; the frontier safety framework sources also record the nearest existing Internet Archive capture, checked 2026-10-03. A capture shows only what the archive held on its date and does not authenticate earlier bytes.";

/** Evidence rows as stored before schema 2.7, keyed by ID. */
export const preFrameworkEvidenceRows: Record<string, unknown> =
  Object.fromEntries(before.evidenceBefore.map((row) => [row.id, row]));
const priorReuse: Record<string, unknown> = before.sourceReuseBefore;

export function withoutSourceArchiveFields<T extends object>(row: T): T {
  const copy = structuredClone(row) as T & {
    language?: string;
    archivedUrl?: string;
    archivedAt?: string;
  };
  delete copy.language;
  delete copy.archivedUrl;
  delete copy.archivedAt;
  return copy;
}

function restoreSource<T extends { id: string; reuse: unknown }>(row: T): T {
  const copy = withoutSourceArchiveFields(row);
  if (priorReuse[row.id]) copy.reuse = structuredClone(priorReuse[row.id]);
  return copy;
}

function restoreEvidence<T extends { id: string }>(row: T): T {
  const prior: unknown = preFrameworkEvidenceRows[row.id];
  return structuredClone((prior ?? row) as T);
}

if (!meta.scope.endsWith(addedScope))
  throw new Error('Schema 2.7 scope note changed; update the historical view');

/** Raw stored rows as they were before schema 2.7. */
export const preFrameworkEvidenceRaw = {
  meta: {
    ...meta,
    schemaVersion: '2.6',
    updatedAt: '2026-09-29',
    scope: meta.scope.slice(0, -addedScope.length),
  },
  entities: structuredClone(entities),
  claims: structuredClone(claims),
  sources: sources.map(restoreSource),
  evidence: evidence.map(restoreEvidence),
};
