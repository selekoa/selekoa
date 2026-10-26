// Renders pack.md from pack.json. Called by `tools.mjs render`.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MARK = {
  stated: 'Stated',
  'not-found': 'Not found',
  'not-applicable': 'n/a',
  'carried-unverified': 'Recorded (not re-checked)',
};
const SHORT = {
  stated: 'S',
  'not-found': 'NF',
  'not-applicable': '–',
  'carried-unverified': 'R',
};

const label = (c) =>
  c.partial
    ? 'stated, partly meets the criterion'
    : MARK[c.status].toLowerCase();
const sym = (c) => (c ? (c.partial ? 'S~' : SHORT[c.status]) : '?');
const cell = (s) =>
  String(s ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\n+/g, ' ');
const dateOf = (ed) => {
  const d = ed.date;
  if (d.effectiveAt) return `effective ${d.effectiveAt}`;
  if (d.publishedAt) return `published ${d.publishedAt}`;
  if (d.revisedAt) return `revised ${d.revisedAt}`;
  return 'date unknown';
};

export function render(pack, dir) {
  const fw = new Map(pack.frameworks.map((f) => [f.id, f]));
  const eds = pack.editions;
  const cells = new Map(pack.cells.map((c) => [`${c.edition}.${c.facet}`, c]));
  const facets = pack.dimensions.flatMap((d) =>
    d.facets.map((f) => ({ ...f, key: `${d.id}.${f.id}`, dim: d })),
  );
  const edName = (ed) => {
    const dev = fw.get(ed.framework).developer;
    return `${dev} · ${(ed.shortName ?? ed.label).replace(`${dev} `, '')}`;
  };
  const latest = pack.frameworks.map((f) =>
    eds.filter((e) => e.framework === f.id).at(-1),
  );
  const count = (st) => pack.cells.filter((c) => c.status === st).length;
  const out = [
    `# ${pack.title}`,
    '',
    `${pack.status} Prepared ${pack.prepared}. Scope and method: [scope.md](scope.md). Audit: [audit.md](audit.md). Quote checks: [verification.json](verification.json). Generated from \`pack.json\` by \`tools.mjs render\`; do not edit by hand.`,
    '',
    '## Overview',
    '',
    `This pack sets ${eds.length} editions of ${pack.frameworks.length} frontier safety frameworks from ${new Set(pack.frameworks.map((f) => f.developer)).size} developers against ${pack.dimensions.length} comparison dimensions (${facets.length} facets). Each of the ${pack.cells.length} cells holds either verbatim quotations from that edition with their locations (${count('stated')} cells), a recorded search that found no such passage (${count('not-found')}), or a note that the facet does not apply (${count('not-applicable')}). ${count('carried-unverified') ? `${count('carried-unverified')} cells carry passages already in Selekoa's dataset for an edition that could not be retrieved in this run.` : ''}`,
    '',
    'How to read it:',
    '',
    ...pack.principles.map((p) => `- ${p}`),
    '- Facet labels are Selekoa’s categories. They are worded so that they fit every edition; the wording inside quotation marks is always the edition’s own. A shared category does not mean that two developers’ provisions are equivalent.',
    '- "Not found" means not found within the recorded scope and search terms, shown under each table. It is not a statement that the developer has no such practice.',
    '',
    '### Editions covered',
    '',
    '| Developer | Framework | Edition | Date | Edition document |',
    '| --- | --- | --- | --- | --- |',
    ...eds.map(
      (ed) =>
        `| ${fw.get(ed.framework).developer} | ${fw.get(ed.framework).name} | ${ed.label} | ${dateOf(ed)} | [publisher address](${ed.url})${ed.archiveUrl && ed.archiveUrl !== ed.evidenceUrl ? ` · [archived](${ed.archiveUrl})` : ''} |`,
    ),
    '',
    '### Latest edition of each framework, at a glance',
    '',
    `S = stated (quoted below), S~ = stated but only partly meets the facet's criterion (see the mapping note), NF = not found within the recorded search, – = not applicable${count('carried-unverified') ? ', R = recorded in the dataset, not re-checked' : ''}.`,
    '',
    `| Facet | ${latest.map((e) => cell(edName(e))).join(' | ')} |`,
    `| --- | ${latest.map(() => '---').join(' | ')} |`,
    ...facets.map(
      (f) =>
        `| ${f.dim.id} ${cell(f.label)} | ${latest.map((e) => sym(cells.get(`${e.id}.${f.key}`))).join(' | ')} |`,
    ),
    '',
    '### Every edition, by facet',
    '',
  ];
  for (const f of pack.frameworks) {
    const fe = eds.filter((e) => e.framework === f.id);
    out.push(
      `**${f.developer} · ${f.name}**`,
      '',
      `| Facet | ${fe.map((e) => cell(e.label)).join(' | ')} |`,
      `| --- | ${fe.map(() => '---').join(' | ')} |`,
      ...facets.map(
        (x) =>
          `| ${x.dim.id} ${cell(x.label)} | ${fe.map((e) => sym(cells.get(`${e.id}.${x.key}`))).join(' | ')} |`,
      ),
      '',
    );
  }
  for (const d of pack.dimensions) {
    out.push(`## ${d.id}. ${d.label}`, '', `_${d.question}_`, '');
    for (const f of d.facets) {
      const key = `${d.id}.${f.id}`;
      out.push(
        `### ${key} ${f.label}`,
        '',
        `**Criterion:** ${f.criterion}`,
        '',
      );
      for (const ed of eds) {
        const c = cells.get(`${ed.id}.${key}`);
        const head = `- **${edName(ed)}** (${dateOf(ed)})`;
        if (!c) {
          out.push(`${head}: missing`);
          continue;
        }
        if (c.entries?.length) {
          out.push(`${head}: ${label(c)}`);
          for (const e of c.entries)
            out.push(
              `  - “${e.quote}” (${e.locator})${e.note ? `. _${e.note}_` : ''}`,
            );
        } else if (c.status === 'not-found')
          out.push(
            `${head}: **not found** within the recorded search.`,
            `  - Inspected: ${c.notFound.inspected}`,
            `  - Searched for: ${c.notFound.searchTerms.map((t) => `“${t}”`).join(', ')}`,
            ...(c.notFound.hitsNotCounted
              ? [`  - Hits set aside: ${c.notFound.hitsNotCounted}`]
              : []),
          );
        else out.push(`${head}: ${MARK[c.status]}. _${c.reason}_`);
        if (c.mappingNote) out.push(`  - Mapping note: ${c.mappingNote}`);
      }
      out.push('');
    }
  }
  out.push('## Editions: retrieval and reading notes', '');
  for (const ed of eds) {
    out.push(
      `### ${edName(ed)}`,
      '',
      `- ${ed.title}; ${dateOf(ed)}. ${ed.dateNote ?? ''}`,
      `- Edition document: ${ed.url}${ed.evidenceUrl !== ed.url ? ` (expression checked in the dataset: ${ed.evidenceUrl})` : ''}${ed.archiveUrl ? `; archived copy recorded in the dataset: ${ed.archiveUrl}` : ''}`,
      `- Checked: ${ed.checked}`,
    );
    if (ed.retrieval)
      out.push(
        `- Retrieved ${ed.retrieval.retrievedAt}: ${ed.retrieval.finalUrl} (HTTP ${ed.retrieval.httpStatus}, ${ed.retrieval.bytes} bytes, sha256 \`${ed.retrieval.sha256}\`)`,
      );
    if (ed.inspected) out.push(`- Inspected: ${ed.inspected}`);
    if (ed.notes) out.push(`- Reading note: ${ed.notes}`);
    out.push('');
  }
  if (pack.retrievalFailures?.length) {
    out.push(
      '## Retrieval failures',
      '',
      ...pack.retrievalFailures.map((f) => `- ${f}`),
      '',
    );
  }
  writeFileSync(join(dir, 'pack.md'), out.join('\n'));
  console.log('pack.md written');
}
