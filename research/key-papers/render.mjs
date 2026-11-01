// Renders pack.md from pack.json.
//   node research/key-papers/render.mjs
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { DIR, ROOT, readJson } from './tools.mjs';

const pack = readJson(join(DIR, 'pack.json'));
const corpus = readJson(join(DIR, 'corpus.json'));
const entryName = new Map(
  corpus.map((d) => [d.document ?? d.sources[0].id, d.name]),
);
const ents = new Map(
  readJson(join(ROOT, 'data', 'entities.json')).map((e) => [e.id, e]),
);
const personName = new Map([
  ...pack.persons.proposed.map((p) => [p.id, p.name]),
]);
for (const [id, e] of ents) if (e.type === 'person') personName.set(id, e.name);

const esc = (s) =>
  String(s ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ');
const L = [];
const P = (...x) => L.push(...x);

P(
  '# Key papers and publications on AI: candidate pack',
  '',
  'Generated from [pack.json](pack.json) by `node research/key-papers/render.mjs`; do not edit by hand. Candidate research pack outside application data. Machine-prepared and audited by the same model family (Claude); cross-family check not yet run; no human review. Nothing here is admitted. See the [README](README.md) and [scope](scope.md) for method and limits.',
  '',
);
const c = pack.counts;
P(
  '|  |  |',
  '| --- | --- |',
  `| Papers | ${c.papers} (basis 1: ${c.basis1}; basis 2: ${c.basis2}) |`,
  `| Already document records in the dataset | ${c.existingDocuments} |`,
  `| Candidate records | ${c.claims}: ${c.byKind.states} “states”, ${c.byKind.authored} authorship, ${c.byKind.cites} citation, ${c.byKind.shaping} attributed-credit |`,
  `| Person records | ${c.proposedPersons} proposed (credited on two or more pack papers), ${c.reusedPersons} existing reused |`,
  `| Credited authors without a person record | ${c.authorsListedWithoutRecord} |`,
  `| Near-misses (basis 1, count ${pack.rule.nearMissBand}) | ${pack.nearMisses.length} |`,
  `| Excluded by the subject rule | ${pack.excluded.length} |`,
  '',
  `**Basis 1.** ${pack.rule.basis1} Check date ${pack.checkDate}. The count is of dataset documents (corpus entries) whose retrieved text cites the work; it is a lower bound (see scope).`,
  '',
  `**Basis 2.** ${pack.rule.basis2.index} \`citationCount\`, query \`${pack.rule.basis2.query}\`, ${pack.rule.basis2.filters}; retrieved ${pack.rule.basis2.retrievedAt}; up to ${pack.rule.basis2.cap} works not admitted by basis 1. A citation count is a property of the index, not a measure of quality or influence.`,
  '',
);

const docs = pack.documents;
const byKind = (id, k) =>
  pack.claims.filter(
    (x) =>
      x.kind === k &&
      (k === 'cites' || k === 'shaping'
        ? x.object.entityId === id
        : k === 'authored'
          ? x.object.entityId === id
          : x.subject === id),
  );

P(
  '## Basis 1: cited by the record',
  '',
  '| # | Paper | Year | Citing dataset documents |',
  '| --: | --- | --- | --: |',
);
docs
  .filter((d) => d.basis === 1)
  .sort(
    (a, b) =>
      b.citationBasis.count - a.citationBasis.count ||
      a.title.localeCompare(b.title),
  )
  .forEach((d, i) =>
    P(
      `| ${i + 1} | [${esc(d.title)}](#${d.id}) | ${d.year ?? '—'} | ${d.citationBasis.count} |`,
    ),
  );
P(
  '',
  '## Basis 2: a stated citation count',
  '',
  '| Index rank | Paper | Year | Semantic Scholar citations | Citing dataset documents |',
  '| --: | --- | --- | --: | --: |',
);
docs
  .filter((d) => d.basis === 2)
  .sort((a, b) => a.basis2.rank - b.basis2.rank)
  .forEach((d) =>
    P(
      `| ${d.basis2.rank} | [${esc(d.title)}](#${d.id}) | ${d.year ?? '—'} | ${d.basis2.citationCount.toLocaleString('en')} | ${d.citationBasis.count} |`,
    ),
  );
P('');

P('## Papers by year', '');
const years = [...new Set(docs.map((d) => d.year ?? 'undated'))].sort();
for (const y of years) {
  P(`### ${y}`, '');
  for (const d of docs
    .filter((x) => (x.year ?? 'undated') === y)
    .sort((a, b) => a.title.localeCompare(b.title))) {
    P(`<a id="${d.id}"></a>`, '', `#### ${d.title}`, '');
    P(
      `- ID \`${d.id}\`${d.existingEntity ? ' (existing dataset document)' : ' (proposed)'}; subtype ${d.subtype}.`,
      `- Basis ${d.basis}: ${d.basis === 1 ? `cited by ${d.citationBasis.count} dataset documents` : `${d.basis2.citationCount.toLocaleString('en')} citations in ${d.basis2.index} (rank ${d.basis2.rank}, ${d.basis2.retrievedAt}); cited by ${d.citationBasis.count} dataset documents`}.`,
      `- Identifiers: ${
        Object.entries(d.externalIds)
          .map(([k, v]) => `${k} ${v}`)
          .join('; ') || 'none'
      }.`,
      `- Authors as printed${d.bylineRead ? ` (${d.bylineRead}, first page)` : ''}: ${d.authorsAsPrinted.length ? d.authorsAsPrinted.map((n) => `“${esc(n)}”`).join(', ') : 'not read'}${d.authorsNotOnFirstPage.length ? `. Not found on the first page (index names): ${d.authorsNotOnFirstPage.length > 12 ? `${d.authorsNotOnFirstPage.length} names` : d.authorsNotOnFirstPage.join(', ')}` : ''}.`,
    );
    if (d.curation) P(`- Preparer's note: ${d.curation}`);
    if (d.arxivComments)
      P(`- arXiv comments (author-supplied): “${esc(d.arxivComments)}”`);
    if (d.arxivJournalRef)
      P(
        `- arXiv journal reference (author-supplied): “${esc(d.arxivJournalRef)}”`,
      );
    P('');
    if (d.versions.length) {
      P(
        '| Version | Kind | Date | Precision | Basis |',
        '| --- | --- | --- | --- | --- |',
      );
      for (const v of d.versions)
        P(
          `| ${esc(v.label)} | ${v.kind} | ${v.date} | ${v.precision} | ${esc(v.basis)} |`,
        );
      P('');
    } else P('No dated version was recorded.', '');
    const st = byKind(d.id, 'states');
    if (st.length) {
      P('States:', '');
      for (const s of st)
        P(
          `- ${esc(s.statement)} “${esc(s.evidence[0].passage)}” (${esc(s.evidence[0].locator)})${s.priorityClaim ? ' — the paper’s own priority or novelty claim' : ''}`,
        );
      P('');
    } else if (d.statesOmitted) P(`No “states” record: ${d.statesOmitted}`, '');
    const sh = byKind(d.id, 'shaping');
    if (sh.length) {
      P(
        'Attributed-credit records (the citing document’s own attribution):',
        '',
      );
      for (const s of sh)
        P(
          `- [${s.attribution}] ${esc(s.statement)} ${s.evidence[0].passageType === 'quote' ? `“${esc(s.evidence[0].passage)}”` : `(${esc(s.evidence[0].passage)})`} (${esc(entryName.get(s.subject) ?? s.subject)}, ${esc(s.evidence[0].locator)}${s.attested ? `; wording attested ${s.attested.date ?? 'by an undated later copy'}: ${esc(s.attested.note)}` : ''})`,
        );
      P('');
    }
    const ci = byKind(d.id, 'cites');
    if (ci.length)
      P(
        `Cited by: ${ci.map((x) => `${esc(entryName.get(x.subject) ?? x.subject.replace(/^source:/, ''))} (${x.evidence[0].locator})`).join('; ')}.`,
        '',
      );
    const au = byKind(d.id, 'authored');
    if (au.length)
      P(
        `Authorship records: ${au.map((a) => `\`${a.subject}\`${a.subjectExisting ? '' : ' (proposed)'}`).join(', ')}.`,
        '',
      );
  }
}

P(
  '## Proposed person records',
  '',
  'Credited on two or more pack papers under one printed name. Name as printed; no affiliation, role or identity beyond the printed name.',
  '',
  '| ID | Name | Papers | Printed forms |',
  '| --- | --- | --: | --- |',
);
for (const p of [...pack.persons.proposed].sort((a, b) =>
  a.id.localeCompare(b.id),
))
  P(
    `| \`${p.id}\` | ${esc(p.name)} | ${new Set(p.credits.map((x) => x.paper)).size} | ${[...new Set(p.credits.map((x) => x.printed))].map((x) => `“${esc(x)}”`).join(', ')} |`,
  );
P(
  '',
  '## Existing person records reused',
  '',
  pack.persons.reused
    .map((r) => `\`${r.id}\` (${new Set(r.credits.map((x) => x.paper)).size})`)
    .join(', ') || 'None.',
  '',
);
if (pack.persons.variants.length) {
  P(
    '## Possible same person under two printed forms (not merged)',
    '',
    'Family name and first initial agree; the pack does not merge them. Each goes to the cross-family check.',
    '',
  );
  for (const v of pack.persons.variants.slice(0, 200))
    P(`- ${v.map((x) => `\`${esc(x)}\``).join(' / ')}`);
  P('');
}
P(
  '## Near-misses',
  '',
  `Cited by ${pack.rule.nearMissBand} dataset documents, one below the threshold.`,
  '',
  '| Paper | Count |',
  '| --- | --: |',
);
for (const n of pack.nearMisses) P(`| ${esc(n.title)} | ${n.count} |`);
P(
  '',
  '## Excluded by the subject rule',
  '',
  '| Paper | Count | Reason |',
  '| --- | --: | --- |',
);
for (const e of pack.excluded)
  P(`| ${esc(e.title)} | ${e.count} | ${esc(e.reason)} |`);
P(
  '',
  '## Basis 2: works passed over',
  '',
  '| Index rank | Work | Citations | Reason |',
  '| --: | --- | --: | --- |',
);
for (const s of pack.basis2Skipped)
  P(
    `| ${s.rank} | ${esc(s.title)} | ${s.citationCount?.toLocaleString('en')} | ${esc(s.reason)} |`,
  );
P('');
if (pack.retrievalFailures?.length) {
  P('## Retrieval failures', '', '| Source | Result |', '| --- | --- |');
  for (const r of pack.retrievalFailures)
    P(`| ${esc(r.item)} | ${esc(r.result)} |`);
  P('');
}
writeFileSync(join(DIR, 'pack.md'), L.join('\n') + '\n');
console.log(`pack.md: ${L.length} lines`);
