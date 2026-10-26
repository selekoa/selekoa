import { describe, expect, it } from 'vitest';
import { repository } from './repository';

const data = repository.data;
const recordIds = new Set(
  [...data.entities, ...data.claims, ...data.sources, ...data.evidence].map(
    (r) => r.id,
  ),
);
// Research-pack passage, take and premise codes, archive message IDs, the
// internal collection name and a stray double full stop.
const internal =
  /\b[A-Z]\d{1,2}[ab]?-(?:[a-z]\d*|\d+|P\d|e\d+|s\d+)\b|\bT\d\d\b|\bP\d\b|\b\dQ\d\d-\d+\b|\b(?:extropians|sl4)[.:]|human-thought|\bcode [A-Z]\d|\)\.\./;

describe('reader-facing claim text (2026-10-15)', () => {
  it('names no record ID or internal code in qualifications or reasoning', () => {
    const found: string[] = [];
    for (const c of data.claims)
      for (const text of [c.qualification, c.inferenceRationale ?? '']) {
        const ids = (
          text.match(/\b[a-z0-9]+(?:-[a-z0-9]+){2,}\b/g) ?? []
        ).filter((w) => recordIds.has(w));
        const code = internal.exec(text)?.[0];
        if (ids.length || code)
          found.push(`${c.id}: ${[...ids, code ?? ''].join(' ')}`);
      }
    expect(found).toEqual([]);
  });
});
