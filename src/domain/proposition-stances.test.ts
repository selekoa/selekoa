import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import {
  authorFor,
  dateLine,
  propositionStances,
  stanceCsv,
  stanceCsvColumns,
  stanceCsvRows,
} from './proposition-stances';
import { parseTimelineCsv } from './control-timelines';
import { authorKey, propositionsView } from './propositions';
import { propositionStances as stancePredicates } from './predicates';
import { propositionFrames } from '../reading/proposition-frames';
import { pageMeta, pagePaths } from '../prerender/pages';
import { resolveReference } from './deep-links';
import { referencePath } from './addresses';
import { dataNeeds, slicePath } from './slices';
import { pageCodeOf } from '../ui/page-files';

const data = repository.data;
const claims = new Map(data.claims.map((c) => [c.id, c]));
const origin = 'https://example.org';

describe('propositions by author', () => {
  for (const frame of propositionFrames)
    describe(frame.id, () => {
      const view = propositionStances(data, frame);
      const page = propositionsView(data, frame);

      it('shows every stance record of the collection page, once, in its order', () => {
        expect(view.claimIds).toEqual(page.claimIds);
        expect(new Set(view.claimIds).size).toBe(view.claimIds.length);
      });

      it('takes each row from its stored record: text, proposition, stance', () => {
        for (const r of view.rows) {
          const claim = claims.get(r.claimId)!;
          expect(claim.subject).toBe(r.documentId);
          expect(claim.object).toEqual({
            kind: 'entity',
            entityId: r.propositionId,
          });
          expect(
            stancePredicates[claim.predicate as keyof typeof stancePredicates],
          ).toBe(r.stance);
          // The date as stored, at its stored precision.
          expect(claim.time.kind === 'event' && claim.time.date).toBe(r.date);
          expect(dateLine(r).startsWith(r.date)).toBe(true);
        }
      });

      it('marks earliest located only where a stored role says so', () => {
        for (const r of view.rows) {
          const roles = claims.get(r.claimId)!.attributes!.thought!.roles;
          expect(r.marks.length).toBe(
            roles.filter((role) => role.startsWith('earliest-located')).length,
          );
        }
      });

      it('lists each author’s rows from the texts’ own bylines only', () => {
        const listed = view.authors.flatMap((a) =>
          a.rows.map((r) => r.claimId),
        );
        for (const a of view.authors)
          for (const r of a.rows)
            expect(r.bylines.map(authorKey)).toContain(a.key);
        // Every row with a byline is under each of its authors; the rest
        // are listed apart.
        for (const r of view.rows)
          if (r.bylines.length) expect(listed).toContain(r.claimId);
          else expect(view.unattributed).toContain(r);
        for (const r of view.rows)
          if (r.bylineBasis === 'own source')
            expect(
              data.sources.some(
                (s) =>
                  s.documentId === r.documentId &&
                  s.authors.join() === r.bylines.join(),
              ),
            ).toBe(true);
      });

      it('orders authors alphabetically, never by how many texts they have', () => {
        const names = view.authors.map((a) => a.name);
        const collator = new Intl.Collator('en', { sensitivity: 'base' });
        expect(names).toEqual([...names].sort(collator.compare));
        expect(new Set(view.authors.map((a) => a.anchor)).size).toBe(
          view.authors.length,
        );
      });

      it('writes a CSV with exactly the rows the page shows', () => {
        const [header, ...rows] = parseTimelineCsv(stanceCsv(view, origin));
        expect(header).toEqual([...stanceCsvColumns]);
        const expected = stanceCsvRows(view, origin);
        expect(rows).toEqual(
          expected.map((row) => stanceCsvColumns.map((c) => row[c])),
        );
        expect(
          rows.map((r) => r[stanceCsvColumns.indexOf('record_id')]),
        ).toEqual(view.claimIds);
      });
    });

  it('finds an author by any of a person’s byline keys', () => {
    const view = propositionStances(data, propositionFrames[0]);
    const a = view.authors[0];
    expect(authorFor(view, ['nobody at all', a.key])).toBe(a);
    expect(authorFor(view, ['nobody at all'])).toBeNull();
  });

  it('links an author to a person page only where the name matches', () => {
    const first = propositionStances(data, propositionFrames[0]).authors[0];
    const view = propositionStances(data, propositionFrames[0], [
      { id: 'p-1', name: first.name },
      { id: 'p-2', name: 'Nobody Matching Any Byline' },
    ]);
    expect(view.authors[0].personId).toBe('p-1');
    expect(view.authors.slice(1).every((a) => a.personId !== 'p-2')).toBe(true);
  });

  it('has an index and one page per collection, each with its slice and code', () => {
    const paths = pagePaths(data);
    expect(paths).toContain('/stances');
    for (const frame of propositionFrames) {
      const path = referencePath({ kind: 'stances', id: frame.id });
      expect(path).toBe(`/stances/${frame.id}`);
      expect(paths).toContain(path);
      expect(resolveReference(path, data).target).toEqual({
        kind: 'stances',
        id: frame.id,
        inspect: undefined,
      });
      expect(pageMeta(data, path)!.title).toContain(frame.title);
      expect(slicePath(path)).toBe(`/slices/stances/${frame.id}.json`);
      expect(dataNeeds(path).records).toBe(false);
    }
    expect(resolveReference('/stances', data).target).toEqual({
      kind: 'stances',
    });
    expect(resolveReference('/stances/no-such-collection', data).target).toBe(
      null,
    );
    expect(slicePath('/stances')).toBe('/slices/stances.json');
    expect(pageCodeOf('/stances/risk-debate')).toEqual(['PropositionStances']);
  });
});
