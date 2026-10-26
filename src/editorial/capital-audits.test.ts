import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import order from '../../review/capital-compute-order.json';

const text = readFileSync('review/capital-compute-review.md', 'utf8').replace(
  /\r\n/g,
  '\n',
);
const hash = (s: string) => createHash('sha256').update(s).digest('hex');
describe('Capital I historical machine-audit recording', () => {
  it('preserves the original fingerprinted body and both complete raw transcripts', () => {
    const body = text.split('<!-- capital-compute-machine-qa-20260919 -->')[0];
    expect(hash(body)).toBe(
      'ac0d630ad7b9856a8f39fdd31e1fe562221a40a2bc1824e693439489070fe572',
    );
    expect(body).toContain(
      'bdb60ded89302c48118117d552e6ab9958995432c04ad45fb98174b1f6057291',
    );
    expect(body.match(/^\*\*Human decision:\*\*$/gm)).toHaveLength(37);
    expect(body.match(/^\*\*Notes:\*\*$/gm)).toHaveLength(37);
    const blocks = [...text.matchAll(/```text\n([\s\S]*?)\n```/g)].map(
      (m) => m[1],
    );
    expect(blocks).toHaveLength(2);
    expect(hash(blocks[0])).toBe(
      '3517124586e2391529a39c8c5b359ff499f3c0f1c8abe6f9f1ff67e41e56ae43',
    );
    expect(hash(blocks[1])).toBe(
      '2c48d17d54df95468398baf75b2afd70d141bd9006087ad573821bfe304df0a4',
    );
  });

  it('maps canonical numbers without resolving Claude gaps or Grok scope discrepancies', () => {
    const note = text.split('<!-- capital-compute-attribution-20260925 -->')[1];
    const rows = [
      ...note.matchAll(
        /^\|\s*(\d{2})\s*\|\s*`([^`]+)`\s*\|\s*(YES|RESEARCH MORE)\s*\|\s*(YES)\s*\|$/gm,
      ),
    ];
    const ids = order.flatMap((g) => g.claimIds);
    expect(rows.map((r) => r[2])).toEqual(ids);
    expect(rows.map((r) => Number(r[1]))).toEqual(ids.map((_, i) => i + 1));
    expect(
      rows.filter((r) => r[3] === 'RESEARCH MORE').map((r) => Number(r[1])),
    ).toEqual([5, 6, 11, 12, 13, 19, 20, 21, 22, 23, 28, 29, 30]);
    expect(rows.filter((r) => r[3] === 'YES')).toHaveLength(24);
    expect(rows.filter((r) => r[4] === 'YES')).toHaveLength(37);
    expect(note).toContain('direct source fetches were not performed');
    expect(note).toContain('scope cautions remain visible');
    expect(note).toContain(
      '**Audit 1 / Audit 2** convention meant **Claude / Grok**',
    );
  });
});
