// Candidates for attributed-shaping records: passages of a citing dataset document that mention a
// pack paper (title, or first author's family name with the year) near wording that states use of,
// or reliance on, that paper. Candidates only: each is read and decided by the preparer.
//   node research/key-papers/shaping.mjs   -> .local/key-papers/shaping-candidates.json
import { join } from 'node:path';
import { CACHE, DIR, ROOT, cachedText, readJson, writeJson } from './tools.mjs';

const CUE =
  /\b(build(s|ing)? (up)?on|built on|inspired|motivat(ed|es)|follow(ing|s)? (the|an?|their|his|her)?\s*(approach|argument|method|framework|analysis|setup|work|idea)|based on|draw(s|n)? on|drew on|influenc|adopt(s|ed)?|extend(s|ed)?|in the spirit of|as (argued|suggested|proposed|shown) (by|in)|argues? that|argued that|pointed out|points out|introduced by|originally (proposed|introduced)|due to)\b/i;
const esc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const sel = readJson(join(DIR, 'selection.json'));
const studied = new Set(
  readJson(join(ROOT, 'data', 'claims.json'))
    .filter((c) => /_proposition$/.test(c.predicate))
    .map((c) => c.subject),
);
const out = [];
for (const p of sel.papers) {
  const fam = (p.authors?.[0] ?? '').split(/\s+/).pop();
  const titleRe = new RegExp(
    p.title
      .replace(/&amp;/g, '&')
      .split(/[^A-Za-z0-9]+/)
      .filter(Boolean)
      .map(esc)
      .join('[^A-Za-z0-9]{1,8}'),
    'gi',
  );
  const authRe =
    fam && p.year
      ? new RegExp(
          `${esc(fam)}( et al\\.?| and \\w+| & \\w+)?,? \\(?${p.year}`,
          'g',
        )
      : null;
  for (const t of p.citingTexts)
    for (const e of t.entries) {
      const text = cachedText('corpus', e.source);
      if (!text) continue;
      const flat = text.replace(/\s+/g, ' ');
      // stop before a reference list, where every title appears
      const refAt = flat.search(
        /\b(References|Bibliography|REFERENCES|Works Cited)\b(?![^.]{0,40}\bto\b)/g,
      );
      const body = refAt > 2000 ? flat.slice(0, refAt) : flat;
      for (const re of [titleRe, authRe].filter(Boolean)) {
        re.lastIndex = 0;
        for (const m of body.matchAll(re)) {
          const ctx = body.slice(
            Math.max(0, m.index - 350),
            m.index + m[0].length + 350,
          );
          if (
            CUE.test(ctx) ||
            (process.argv.includes('--all-studied') && studied.has(e.entry))
          )
            out.push({
              paper: p.id,
              citing: e.entry,
              source: e.source,
              studied: studied.has(e.entry),
              match: m[0],
              context: ctx,
            });
        }
      }
    }
}
writeJson(join(CACHE, 'shaping-candidates.json'), out);
console.log(
  `${out.length} candidate passages; ${new Set(out.map((o) => o.paper + o.citing)).size} paper-document pairs; ${out.filter((o) => o.studied).length} in studied texts`,
);
