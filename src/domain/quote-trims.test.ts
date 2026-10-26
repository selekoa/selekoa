import { describe, expect, it } from 'vitest';
import quoteTrims from '../../review/quote-trims-before-2026-10-13.json';
import { repository } from './repository';

// The 2026-10-13 trims only cut words: each kept fragment of a shortened
// quotation lies, in order, inside one fragment of the earlier quotation, so
// it stays a verbatim part of the source the earlier one was checked against.
const fragments = (quote: string) =>
  quote
    .split(/\s*(?:\[(?:\.\.\.|…)\]|…|\.\.\.)\s*/)
    .map((f) => f.trim())
    .filter(Boolean);

function keepsWords(after: string, before: string) {
  const earlier = fragments(before);
  let i = 0;
  let from = 0;
  for (const fragment of fragments(after)) {
    for (; i < earlier.length; i++, from = 0) {
      const at = earlier[i]!.indexOf(fragment, from);
      if (at >= 0) {
        from = at + fragment.length;
        break;
      }
    }
    if (i === earlier.length) return false;
  }
  return true;
}

describe('quotation trims of 2026-10-13', () => {
  it('shorten passages by cutting words and update only stated word counts', () => {
    for (const prior of quoteTrims.before.evidence) {
      const current = repository.evidence.get(prior.id);
      expect(current, prior.id).toBeDefined();
      expect(current!.passageType, prior.id).toBe('quote');
      expect(current!.passage.length, prior.id).toBeLessThan(
        prior.passage.length,
      );
      expect(keepsWords(current!.passage, prior.passage), prior.id).toBe(true);
      // A note that states the quotation's word count gives the new count
      // and the earlier one.
      const note = prior.note.replace(
        /The quotation \((\d+) words\)/,
        (_, n: string) =>
          `The quotation (${current!.passage.trim().split(/\s+/).length} words; trimmed 2026-10-13 from ${n} words)`,
      );
      expect(current!.note, prior.id).toBe(note);
      expect(
        { ...current, passage: prior.passage, note: prior.note },
        prior.id,
      ).toEqual(prior);
    }
  });
});
