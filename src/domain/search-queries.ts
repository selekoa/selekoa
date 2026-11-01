import type { Dataset } from './schema';
import { foldText } from './search';

/**
 * The fixed query set: every query of the search tests, words of every
 * kind of field and script, prefixes, phrases, IDs, apostrophes, hyphens,
 * initials, digits and queries that match nothing. Deterministic.
 */
export function searchQueries(data: Dataset) {
  const tests = [
    'whistleblower',
    'ASL-3',
    '"ASL 3"',
    'Responsible Scaling Officer',
    'Altman',
    'Altman board',
    'Altman zzzunmatched',
    '   ',
    'AGI',
    'MIRI',
    '深度求索',
    'critic',
    'board',
    "Anthropic's board",
    'Anthropic’s board',
    'Anthropics board',
    "anthropic's control structure",
    'Long-Term Benefit Trust',
    'responsible scaling',
  ];
  const words = new Set<string>();
  const phrases: string[] = [];
  const pick = <T>(list: T[], every: number) =>
    list.filter((_, i) => i % every === 0);
  for (const c of pick(data.claims, 97)) {
    const w = c.statement.split(/\s+/);
    phrases.push(w.slice(1, 3).join(' '), `"${w.slice(2, 4).join(' ')}"`);
    words.add(w[w.length >> 1]);
  }
  for (const e of pick(data.evidence, 211)) {
    const w = e.passage.split(/\s+/);
    words.add(w[w.length >> 1]);
    phrases.push(e.locator.split(/\s+/).slice(0, 2).join(' '));
  }
  for (const s of pick(data.sources, 61)) words.add(s.title.split(/\s+/)[0]);
  for (const e of pick(data.entities, 43)) {
    words.add(e.name);
    for (const a of e.aliases.slice(0, 1)) words.add(a);
  }
  const ids = [
    ...pick(data.claims, 401).map((c) => c.id),
    ...pick(data.evidence, 997).map((e) => e.id),
    ...pick(data.entities, 301).map((e) => e.id),
  ];
  const unspaced = [
    ...new Set(
      data.entities.flatMap((e) =>
        [e.name, ...e.aliases].filter((n) => /\p{Script=Han}/u.test(n)),
      ),
    ),
  ].slice(0, 8);
  const chinese = unspaced.flatMap((n) => [
    n,
    [...n].slice(0, 1).join(''),
    [...n].slice(1, 3).join(''),
  ]);
  const odd = [
    'a',
    'x',
    'I',
    '2023',
    '20',
    'gpt-4',
    'GPT 4',
    'u.s.',
    'U.S. government',
    'e',
    'ai',
    'AI safety',
    'open',
    'OpenAI’s',
    'openais',
    'Ö',
    'café',
    '“frontier model”',
    '—',
    'zzzz',
    'q',
    'co-founder',
    'co founder',
    'cofounder',
    'deepmind google',
    'the',
    'of the',
    'ASL',
    'RSP',
    'rsp-v2-0',
    'Yudkowsky',
    'Leike',
    'export controls',
    'EU AI Act',
    'interpretability',
    'superintelligence',
    'compute',
    'safety',
  ];
  const queries = [
    ...tests,
    ...odd,
    ...chinese,
    ...[...words].filter(Boolean),
    ...phrases.filter((p) => p.trim()),
    ...ids,
    ...[...words].slice(0, 30).map((w) => foldText(w).slice(0, 3)),
  ];
  return [...new Set(queries)];
}
