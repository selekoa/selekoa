// Build steps for research/model-cards-5 (copied from research/model-cards-3/build.mjs, itself from pack 2), called through tools.mjs:
//   node research/model-cards-5/tools.mjs merge     drafts -> pack.json
//   node research/model-cards-5/tools.mjs verify    pack.json -> verification.json
//   node research/model-cards-5/tools.mjs render    pack.json -> pack.md
//   node research/model-cards-5/tools.mjs brief <date>   cross-family brief and verdicts
// Corrections are made in the drafts, never in pack.json.
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The question set is the first pack's, unchanged.
const QUESTIONS = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'model-cards',
  'questions.json',
);
const DEV_ORDER = [
  'Anthropic',
  'Google DeepMind',
  'Meta',
  'Microsoft',
  'OpenAI',
  'xAI',
];
const STATUSES = ['stated', 'partly', 'not-found', 'not-applicable'];
const SYMBOL = {
  stated: '●',
  partly: '◐',
  'not-found': '○',
  'not-applicable': '–',
};
// Words the notes must not use (editorial rules: no loaded or evaluative words,
// no priority words). Matched as whole words in notes and set-aside reasons.
const LOADED = [
  'merely',
  'fails',
  'failed',
  'vague',
  'robust',
  'comprehensive',
  'thorough',
  'coined',
  'impressive',
  'strong',
  'weak',
  'admits',
  'boasts',
  'unfortunately',
  'notably',
  'proves',
  'demonstrates',
  'ensures',
];

// Words that are often descriptive ("month precision only", "first-party") but
// can carry a priority or dismissive sense: listed for a reading, not failed.
const REVIEW = ['only', 'first', 'claims'];

const cardOrder = (a, b) =>
  DEV_ORDER.indexOf(a.developer) - DEV_ORDER.indexOf(b.developer) ||
  a.year - b.year ||
  (a.earliestLocated ?? '').localeCompare(b.earliestLocated ?? '') ||
  a.id.localeCompare(b.id);

function loadGroupFiles(DIR, prefix) {
  const d = join(DIR, 'drafts');
  return readdirSync(d)
    .filter((f) => f.startsWith(prefix) && f.endsWith('.json'))
    .sort()
    .map((f) => JSON.parse(readFileSync(join(d, f), 'utf8')));
}

export function merge({ loadDrafts, PACK, DIR, readJson }) {
  const q = readJson(QUESTIONS);
  const drafts = loadDrafts().filter((d) => !d.file.startsWith('inventory-'));
  const sources = loadGroupFiles(DIR, 'sources-').flat();
  const inventories = loadGroupFiles(DIR, 'inventory-');
  const srcByKey = new Map(sources.map((s) => [s.key, s]));
  const cards = drafts
    .flatMap((d) => d.cards.map((c) => ({ ...c, group: d.group })))
    .map((c) => {
      const s = srcByKey.get(c.source) ?? {};
      return {
        ...c,
        title: s.title,
        kind: s.kind,
        url: s.finalUrl ?? s.url,
      };
    })
    .sort(cardOrder);
  const qOrder = q.questions.map((x) => x.id);
  const cardIdx = new Map(cards.map((c, i) => [c.id, i]));
  const cells = drafts
    .flatMap((d) => d.cells)
    .sort(
      (a, b) =>
        cardIdx.get(a.card) - cardIdx.get(b.card) ||
        qOrder.indexOf(a.question) - qOrder.indexOf(b.question),
    );
  const pack = {
    title:
      'Model cards compared, pack 5: what frontier developers’ cards disclose',
    status:
      'Candidate research pack outside application data. Prepared by Claude on 2026-11-06, with a fresh-context same-family audit of a seeded sample (audit.md). The blind cross-family check by Codex (GPT family) covered packs 4 and 5 together (research/model-cards-4/cross-family-check-2026-11-07.md) and was adjudicated on 2026-11-09 (research/model-cards-4/adjudication/apply-2026-11-09.mjs); one cell is held for the maintainer (†). Not editorially accepted; no human review.',
    prepared: '2026-11-06',
    checkDate: '2026-11-06',
    questionSet: '../model-cards/questions.json',
    selectionRule:
      'Decision 1a: every card that cites the developer’s frontier framework or states a determination under it, plus, for each developer, the latest card before its first framework edition. This pack drafts the eight cards of pack 5 in research/model-cards-2/population.md’s adjudicated order (packs 4 and 5 follow pack 3); completed packs are not repeated here.',
    cards,
    cells,
    sources: sources.sort((a, b) => a.key.localeCompare(b.key)),
    inventory: inventories.map((i) => ({
      group: i.group,
      searched: i.searched,
      cards: i.cards,
      noCardLocated: i.noCardLocated ?? [],
    })),
    omissions: drafts.flatMap((d) =>
      (d.omissions ?? []).map((o) => `${d.group}: ${o}`),
    ),
    retrievalFailures: drafts.flatMap((d) =>
      (d.retrievalFailures ?? []).map((o) =>
        typeof o === 'string' ? `${d.group}: ${o}` : { group: d.group, ...o },
      ),
    ),
    openQuestions: drafts.flatMap((d) =>
      (d.openQuestions ?? []).map((o) =>
        typeof o === 'string' ? `${d.group}: ${o}` : { group: d.group, ...o },
      ),
    ),
  };
  writeFileSync(PACK, JSON.stringify(pack, null, 2) + '\n');
  console.log(`pack.json: ${cards.length} cards, ${cells.length} cells`);
}

export function verify({
  checkQuotes,
  cachedText,
  quoteFound,
  datasetQuotedWords,
  rawPdfText,
  readJson,
  PACK,
  DIR,
  ROOT,
  args = [],
}) {
  const pack = readJson(PACK);
  const q = readJson(QUESTIONS);
  const problems = [];
  // A source whose bytes are not in this worktree's cache (an archive capture the
  // environment cannot reach) keeps the record of the run that had them: its source,
  // quotation, page and budget checks are carried over unchanged and marked so. The
  // cells of such a source must be those that record checked (cellsDigest). An earlier
  // record without digests is matched against the pack.json it verified, given as
  // the first argument: tools.mjs verify <earlier pack.json>.
  const OUT = join(DIR, 'verification.json');
  const prev = existsSync(OUT) ? readJson(OUT) : null;
  const cachedHere = (s) =>
    existsSync(
      join(ROOT, '.local', 'model-cards', 'doc', `${s.cacheKey}.json`),
    );
  const missing = new Set(
    pack.sources.filter((s) => !cachedHere(s)).map((s) => s.key),
  );
  const digestIn = (p, key) => {
    const card = p.cards.find((c) => c.source === key)?.id;
    const cells = p.cells.filter((c) => c.card === card);
    return createHash('sha256').update(JSON.stringify(cells)).digest('hex');
  };
  const digest = (key) => digestIn(pack, key);
  if (prev && !prev.cellsDigest && args[0]) {
    const before = readJson(args[0]);
    prev.cellsDigest = Object.fromEntries(
      before.sources.map((s) => [s.key, digestIn(before, s.key)]),
    );
  }
  const cellsDigest = Object.fromEntries(
    pack.sources.map((s) => [
      s.key,
      missing.has(s.key) ? prev?.cellsDigest?.[s.key] : digest(s.key),
    ]),
  );
  const carried = [];
  for (const key of missing) {
    const was = prev?.sourceChecks?.find((x) => x.source === key);
    if (!was?.hashAndRetrievalMatch)
      problems.push(`${key}: not cached here and no earlier verified record`);
    else if (!prev.cellsDigest?.[key])
      problems.push(
        `${key}: not cached here; earlier record has no cellsDigest`,
      );
    else if (prev.cellsDigest[key] !== digest(key))
      problems.push(
        `${key}: not cached here and its cells changed since the earlier record`,
      );
    else carried.push(key);
  }
  const entities = readJson(join(ROOT, 'data', 'entities.json'));
  const entityIds = new Set(entities.map((e) => e.id));
  // Structure: one cell per card and question.
  const seen = new Map();
  const wordingReview = [];
  for (const c of pack.cells) {
    const k = `${c.card}:${c.question}`;
    if (seen.has(k)) problems.push(`${k}: duplicate cell`);
    seen.set(k, c);
    if (!STATUSES.includes(c.status)) problems.push(`${k}: status ${c.status}`);
    if (['stated', 'partly'].includes(c.status) && !c.passages?.length)
      problems.push(`${k}: ${c.status} without passages`);
    if (c.status === 'not-found' && !c.search?.read)
      problems.push(`${k}: not-found without sections read`);
    if (!pack.cards.some((card) => card.id === c.card))
      problems.push(`${k}: unknown card`);
    if (!q.questions.some((question) => question.id === c.question))
      problems.push(`${k}: unknown question`);
    if (c.status === 'not-found' && !c.search?.terms?.length)
      problems.push(`${k}: not-found without search terms`);
    if (c.status === 'not-applicable' && !c.note)
      problems.push(`${k}: not-applicable without note`);
    for (const p of c.passages ?? [])
      if (p.source !== pack.cards.find((x) => x.id === c.card)?.source)
        problems.push(`${k}: passage from another source (${p.source})`);
    const texts = [
      c.note ?? '',
      ...(c.search?.setAside ?? []).map((s) => s.reason ?? ''),
    ].join(' ');
    for (const w of LOADED)
      if (new RegExp(`\\b${w}\\b`, 'i').test(texts))
        problems.push(`${k}: wording check: "${w}" in note`);
    for (const w of REVIEW)
      for (const m of texts.matchAll(new RegExp(`\\b${w}\\b`, 'gi')))
        wordingReview.push(
          `${k}: “…${texts.slice(Math.max(0, m.index - 60), m.index + 40)}…”`,
        );
  }
  for (const card of pack.cards) {
    for (const qq of q.questions)
      if (!seen.has(`${card.id}:${qq.id}`))
        problems.push(`${card.id}:${qq.id}: missing cell`);
    for (const f of card.frameworkEditions ?? [])
      if (!entityIds.has(f))
        problems.push(`${card.id}: framework edition ${f} not in dataset`);
  }
  const sourceChecks = [];
  for (const source of pack.sources) {
    if (missing.has(source.key)) {
      const was = prev?.sourceChecks?.find((x) => x.source === source.key);
      if (was) sourceChecks.push({ ...was, carriedOver: true });
      continue;
    }
    const base = join(ROOT, '.local', 'model-cards', 'doc', source.cacheKey);
    const raw = existsSync(base + '.pdf') ? base + '.pdf' : base + '.html';
    const meta = readJson(base + '.json');
    const actualHash = createHash('sha256')
      .update(readFileSync(raw))
      .digest('hex');
    // A later fetch of the same bytes (same SHA-256, HTTP 200) verifies the recorded
    // expression; its own retrieval time is listed, not substituted for the recorded one.
    const valid =
      actualHash === source.sha256 &&
      meta.sha256 === source.sha256 &&
      source.httpStatus === 200 &&
      meta.httpStatus === 200;
    sourceChecks.push({
      source: source.key,
      hashAndRetrievalMatch: valid,
      httpStatus: meta.httpStatus,
      ...(source.retrievedAt === meta.retrievedAt
        ? {}
        : { sameBytesRetrievedAt: meta.retrievedAt }),
    });
    if (!valid)
      problems.push(source.key + ': retrieval metadata/hash mismatch');
    for (const url of [source.url, source.finalUrl])
      if (!url || url.includes('?'))
        problems.push(source.key + ': missing URL or unstripped query');
  }
  const locatorChecks = [];
  for (const cell of pack.cells)
    for (const passage of cell.passages ?? []) {
      const source = pack.sources.find(
        (source) => source.key === passage.source,
      );
      if (!source) {
        problems.push(cell.card + ': unknown passage source');
        continue;
      }
      if (missing.has(source.key)) continue;
      const match = /PDF p\. (\d+)/.exec(passage.locator);
      if (!match) continue;
      const page = Number(match[1]);
      const text = cachedText(source.cacheKey)?.split('\f')[page - 1] ?? '';
      let found = quoteFound(passage.quote, text) === true;
      // As for the quotation check: a page whose default text layer interleaves the
      // passage is read again in pdftotext's raw order, and marked so.
      let layer = null;
      if (!found) {
        const raw = rawPdfText?.(source.cacheKey)?.split('\f')[page - 1];
        if (raw && quoteFound(passage.quote, raw) === true) {
          found = true;
          layer = 'pdftotext -raw';
        }
      }
      locatorChecks.push({
        cell: cell.card + ':' + cell.question,
        pdfPage: page,
        found,
        ...(layer ? { textLayer: layer } : {}),
      });
      if (!found)
        problems.push(
          cell.card +
            ':' +
            cell.question +
            ': quote not on cited PDF page ' +
            page,
        );
    }
  // Quotations against the retrieved text, and budgets.
  const claims = pack.cells.map((c) => ({
    id: `${c.card}:${c.question}`,
    evidence: (c.passages ?? [])
      .filter((p) => !missing.has(p.source))
      .map((p) => ({
        source: p.source,
        locator: p.locator,
        passage: p.quote,
        passageType: 'quote',
      })),
  }));
  const r = checkQuotes(claims, pack.sources, datasetQuotedWords());
  problems.push(...r.problems);
  const carriedCards = new Set(
    pack.cards.filter((c) => carried.includes(c.source)).map((c) => c.id),
  );
  for (const x of prev?.perQuote ?? [])
    if (carried.includes(x.source))
      r.perQuote.push({ ...x, carriedOver: true });
  for (const x of prev?.locatorChecks ?? [])
    if (carriedCards.has(x.cell.split(':')[0]))
      locatorChecks.push({ ...x, carriedOver: true });
  for (const key of carried)
    r.perSource[key] = { ...prev.perSource[key], carriedOver: true };
  const statusCounts = {};
  for (const c of pack.cells)
    statusCounts[c.question] = {
      ...(statusCounts[c.question] ?? {}),
      [c.status]: (statusCounts[c.question]?.[c.status] ?? 0) + 1,
    };
  const out = {
    generated: 'node research/model-cards-5/tools.mjs verify',
    checkedAgainst:
      'Cached retrieved bytes and text of each card in .local/model-cards/doc (ignored); see the sources in pack.json for address, HTTP status and SHA-256.',
    method:
      'Each quotation is normalised (Unicode compatibility forms, quotation marks, dashes, PDF line-break hyphenation, whitespace, case) and searched for in the normalised text of its card; fragments joined by an ellipsis must occur in order; a quotation not found in the default PDF text layer is searched again in pdftotext’s raw reading order, and marked so (textLayer). Retrieval bytes are hashed again and matched with the source registry and cache metadata. Every quoted PDF passage is also checked on its cited PDF page. Structural checks: one cell per card and question, passages for stated and partly cells, search terms for not-found cells, a reason for not-applicable cells, framework edition identifiers present in data/entities.json, and a list of evaluative words absent from notes and set-aside reasons.',
    cards: pack.cards.length,
    cells: pack.cells.length,
    quotations: r.perQuote.length,
    quotationsFound: r.perQuote.filter((x) => x.found).length,
    problems,
    carriedOver: carried.length
      ? {
          sources: carried,
          reason:
            'Not in this worktree’s cache (archive captures not reachable here). Their source, quotation, page and budget results are copied unchanged from the earlier verification, whose cellsDigest for each matches these cells.',
        }
      : undefined,
    cellsDigest,
    wordingReview: {
      method:
        'Uses of these words in notes and set-aside reasons, listed for a reading by the integrator; each was read on 2026-11-06 and kept where descriptive (for example “month precision only”, “first-party”, “context only”).',
      words: REVIEW,
      uses: wordingReview,
    },
    cellsByQuestionAndStatus: statusCounts,
    sourceChecks,
    locatorChecks,
    perSource: r.perSource,
    perQuote: r.perQuote,
  };
  writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
  console.log(
    `${out.quotationsFound}/${out.quotations} quotations found; ${problems.length} problems`,
  );
  if (problems.length) {
    console.log(problems.join('\n'));
    process.exitCode = 1;
  }
}

const esc = (s) => String(s ?? '').replace(/\|/g, '\\|');

export function render({ readJson, PACK, DIR }) {
  const pack = readJson(PACK);
  const q = readJson(QUESTIONS);
  const L = [];
  L.push(`# ${pack.title}`, '');
  L.push(
    `Generated from \`pack.json\` by \`node research/model-cards-5/tools.mjs render\`; do not edit by hand. ${pack.status}`,
    '',
  );
  L.push(`**Question.** ${q.question}`, '');
  L.push(`**Rows.** ${pack.selectionRule}`, '');
  L.push(`${q.introduction}`, '');
  L.push('## Legend', '');
  for (const s of STATUSES) L.push(`- ${SYMBOL[s]} **${s}**: ${q.legend[s]}`);
  L.push('', '## Rules', '');
  for (const r of q.rules) L.push(`- ${r}`);
  L.push('', '## Questions', '');
  for (const x of q.questions)
    L.push(
      `- **${x.id} ${x.short}.** ${x.question} _Criterion:_ ${x.criterion}`,
    );
  L.push('', '## Overview', '');
  L.push(
    'Each symbol is one cell; the grid compares and does not rank. Symbols are not to be summed. † marks a cell on which the cross-family check disagrees and the maintainer has not decided. **Held** marks a card drafted here but held from admission by the maintainer.',
    '',
  );
  L.push(
    `| Card | ${q.questions.map((x) => x.id).join(' | ')} |`,
    `| --- | ${q.questions.map(() => ':-:').join(' | ')} |`,
  );
  const cellOf = new Map(pack.cells.map((c) => [`${c.card}:${c.question}`, c]));
  for (const card of pack.cards)
    L.push(
      `| ${esc(card.developer)}: ${esc(card.model)} (${card.year})${card.held ? ' **Held**' : ''} | ${q.questions
        .map((x) => {
          const c = cellOf.get(`${card.id}:${x.id}`);
          return `${SYMBOL[c?.status] ?? '?'}${c?.crossFamily?.readings ? '†' : ''}`;
        })
        .join(' | ')} |`,
    );
  L.push('');
  for (const card of pack.cards) {
    L.push(
      `## ${card.developer}: ${card.model} (${card.year})${card.held ? ', held' : ''}`,
      '',
    );
    if (card.held) L.push(`**Held from admission.** ${card.held}`, '');
    L.push(
      `- Card: ${card.title ?? card.source} (${card.kind ?? 'card'}), ${card.url ?? ''}`,
    );
    L.push(
      `- Framework edition in the dataset: ${card.frameworkEditions?.length ? card.frameworkEditions.map((f) => `\`${f}\``).join(', ') : 'none identified'}${card.frameworkEditionNote ? `. ${card.frameworkEditionNote}` : ''}`,
      '',
    );
    for (const x of q.questions) {
      const c = cellOf.get(`${card.id}:${x.id}`);
      if (!c) continue;
      L.push(`### ${x.id} ${x.short}: ${SYMBOL[c.status]} ${c.status}`, '');
      for (const p of c.passages ?? [])
        L.push(`> “${p.quote}” (${p.locator})`, '');
      if (c.note) L.push(c.note, '');
      if (c.crossFamily) {
        const x = c.crossFamily;
        L.push(`_Cross-family check (item ${x.item}):_ ${x.result}`);
        for (const [who, r] of Object.entries(x.readings ?? {}))
          L.push(`- ${who}: ${r}`);
        if (x.criterion) L.push(`- Criterion: ${x.criterion}`);
        L.push('');
      }
      if (c.search && c.status !== 'stated') {
        const s = c.search;
        L.push(
          `_Searched:_ ${s.read ?? ''}${s.terms?.length ? `; terms: ${s.terms.map((t) => `“${t}”`).join(', ')}` : ''}.`,
        );
        for (const a of s.setAside ?? [])
          L.push(`- Set aside: ${a.locator}: ${a.reason}`);
        L.push('');
      }
    }
  }
  L.push('## Inventory of cards located', '');
  L.push(
    'The eight cards selected for pack 5. The full inherited inventory and adjudicated population remain in research/model-cards-2/; they were not re-inventoried here.',
    '',
  );
  for (const inv of pack.inventory) {
    L.push(`### Group ${inv.group}`, '', `_Searched:_ ${inv.searched}`, '');
    L.push(
      '| Developer | Model | Card | Kind | Card date | Retrieved | Compared | Note |',
      '| --- | --- | --- | --- | --- | --- | --- | --- |',
    );
    for (const c of inv.cards)
      L.push(
        `| ${esc(c.developer)} | ${esc(c.model)} | [${esc(c.title)}](${c.url}) | ${esc(c.kind)} | ${esc(c.cardDate ?? 'unknown')} | ${esc(c.retrieved)} | ${c.compared ? 'yes' : 'no'} | ${esc(c.selectionNote)} |`,
      );
    L.push('');
    if (inv.noCardLocated.length) {
      L.push('No card located:', '');
      for (const n of inv.noCardLocated)
        L.push(`- ${n.developer}: ${n.model}. ${n.search}`);
      L.push('');
    }
  }
  L.push('## Sources', '');
  L.push(
    '| Key | Card | Address | HTTP | SHA-256 | Retrieved | Words | Archive |',
    '| --- | --- | --- | --- | --- | --- | --- | --- |',
  );
  for (const s of pack.sources)
    L.push(
      `| ${s.key} | ${esc(s.title)} | ${s.finalUrl ?? s.url} | ${s.httpStatus} | \`${(s.sha256 ?? '').slice(0, 16)}…\` | ${s.retrievedAt} | ${s.documentWords?.count ?? '?'} | ${esc(s.archive?.capture ?? s.archive?.note ?? 'not checked')} |`,
    );
  L.push('');
  if (pack.retrievalFailures.length) {
    L.push('## Retrieval failures', '');
    for (const f of pack.retrievalFailures)
      L.push(`- ${typeof f === 'string' ? f : JSON.stringify(f)}`);
    L.push('');
  }
  if (pack.omissions.length) {
    L.push('## Passages seen and not used', '');
    for (const o of pack.omissions) L.push(`- ${o}`);
    L.push('');
  }
  writeFileSync(join(DIR, 'pack.md'), L.join('\n'));
  console.log('pack.md written');
}

// The cross-family brief for packs 4 and 5 is generated by research/model-cards-4:
//   node research/model-cards-4/tools.mjs brief <date>
export function brief() {
  throw new Error('Use: node research/model-cards-4/tools.mjs brief <date>');
}
