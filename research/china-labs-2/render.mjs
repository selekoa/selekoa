// Renders pack.md from pack.json. Called by `tools.mjs render`.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const GROUPS = [
  ['moonshot', 'Moonshot AI (月之暗面)'],
  ['minimax', 'MiniMax (稀宇科技)'],
  ['baidu', 'Baidu (百度) and ERNIE (文心)'],
  ['bytedance-seed', 'ByteDance Seed (字节跳动 Seed)'],
  ['governance', 'Governance texts'],
];
const cell = (s) =>
  String(s ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ');
const when = (t) => {
  if (t.kind === 'event' || t.kind === 'snapshot')
    return `${t.date} · ${t.kind}${t.basis ? ` (${t.basis})` : ''}`;
  if (t.kind === 'interval') return `${t.from ?? '?'} – ${t.until ?? '?'}`;
  return 'unknown';
};

export function render(pack, dir) {
  const root = join(dir, '..', '..');
  const ents = new Map(
    JSON.parse(readFileSync(join(root, 'data', 'entities.json'), 'utf8')).map(
      (e) => [e.id, e],
    ),
  );
  for (const e of pack.entities) if (!e.existing) ents.set(e.id, e);
  const name = (id) => ents.get(id)?.name ?? id;
  const sources = new Map(pack.sources.map((s) => [s.id, s]));
  const reporting = (c) =>
    !c.evidence.some(
      (e) =>
        e.support === 'supports' &&
        sources.get(e.sourceId)?.sourceClass === 'primary',
    );
  const out = [
    `# ${pack.title}`,
    '',
    'Generated from `pack.json` by `node research/china-labs-2/tools.mjs render`; do not edit by hand. A candidate pack outside application data: nothing here is editorially accepted. See [README.md](README.md) for method and limits and [scope.md](scope.md) for the choice of institutions.',
    '',
    `${pack.claims.length} records, ${pack.sources.length} sources (${pack.sources.filter((s) => s.language?.startsWith('zh')).length} in Chinese), ${pack.entities.filter((e) => !e.existing).length} proposed entities, ${pack.entities.filter((e) => e.existing).length} existing entities reused.`,
    '',
    'Chinese passages are quoted in the original. Their English renderings are machine translations; no human translation verification is claimed. "Fixed" marks an arXiv version, a Git or Hugging Face commit or a filing; "mutable" marks a page read as it stood on retrieval.',
    '',
  ];
  for (const [g, title] of GROUPS) {
    const claims = pack.claims.filter((c) => c.group === g);
    if (!claims.length) continue;
    out.push(`## ${title}`, '', `${claims.length} records.`, '');
    out.push('| Date | Record | Sources |', '| --- | --- | --- |');
    for (const c of claims) {
      const srcs = [...new Set(c.evidence.map((e) => e.sourceId))]
        .map((id) => sources.get(id))
        .map(
          (s) =>
            `${s.originalTitle ?? s.title} (${s.version?.kind === 'mutable-page' ? 'mutable' : 'fixed'})`,
        );
      out.push(
        `| ${cell(when(c.time))} | ${cell(c.statement)}${reporting(c) ? ' *Rests on reporting.*' : ''} <br>\`${c.id}\` | ${cell(srcs.join('; '))} |`,
      );
    }
    out.push('', '### Passages and qualifications', '');
    for (const c of claims) {
      out.push(
        `- **\`${c.id}\`** ${c.subject} → \`${c.predicate}\` → ${c.object.kind === 'entity' ? name(c.object.entityId) : `“${c.object.value}”`}. ${c.qualification}`,
      );
      for (const e of c.evidence) {
        const s = sources.get(e.sourceId);
        const text =
          e.passageType === 'quote'
            ? `“${e.passage}”`
            : `Paraphrase: ${e.passage} (anchor “${e.anchor}”)`;
        out.push(
          `  - ${e.support}, ${e.sourceRole}: ${text}${e.translation?.text ? ` — machine translation: “${e.translation.text}”` : ''} (${s.publisher}, ${e.locator})`,
        );
      }
    }
    out.push('');
  }
  out.push(
    '## Proposed entities',
    '',
    '| ID | Type | Name | Description |',
    '| --- | --- | --- | --- |',
  );
  for (const e of pack.entities.filter((x) => !x.existing))
    out.push(
      `| \`${e.id}\` | ${e.type}${e.documentKind ? ` (${e.documentKind})` : ''} | ${cell(e.name)} | ${cell(e.description)} |`,
    );
  out.push(
    '',
    '## Sources',
    '',
    '| ID | Title | Publisher | Date | Language | Version | Route, retrieved |',
    '| --- | --- | --- | --- | --- | --- | --- |',
  );
  for (const s of pack.sources)
    out.push(
      `| \`${s.id}\` | ${cell(s.originalTitle ? `${s.originalTitle} (${s.title})` : s.title)} <br>${s.url} | ${cell(s.publisher)} | ${s.publicationDate ?? 'undated'} | ${s.language} | ${s.version.kind}${s.version.id ? ` ${cell(s.version.id)}` : ''} | ${s.retrieval?.route ?? s.route}, ${s.retrieval?.retrievedAt ?? '?'} |`,
    );
  out.push('', '## What each drafting pass searched', '');
  for (const [g, title] of GROUPS)
    if (pack.searched?.[g]) out.push(`- **${title}.** ${pack.searched[g]}`);
  writeFileSync(join(dir, 'pack.md'), out.join('\n') + '\n');
  console.log(`pack.md: ${pack.claims.length} records`);
}
