// Builds THIRD-PARTY-NOTICES.md from the installed runtime dependencies.
// Node only. The unit test regenerates the file and compares it, so the
// notices cannot go stale when a dependency changes.
import { existsSync, readdirSync, readFileSync, realpathSync } from 'node:fs';
import path from 'node:path';

type PackageJson = {
  name: string;
  version: string;
  license?: string | { type?: string };
  licenses?: { type?: string }[];
  repository?: string | { url?: string };
  dependencies?: Record<string, string>;
};

export type Notice = {
  name: string;
  version: string;
  /** The licence expression the package declares. */
  declared: string;
  /** The licence Selekoa relies on. Differs from `declared` for a choice. */
  chosen: string;
  repository: string | null;
  text: string | null;
};

/**
 * Licences accepted for shipped runtime code without further thought. A
 * dependency with any other licence stops the generator until it is reviewed.
 */
export const permissive = [
  'MIT',
  'ISC',
  'BSD-2-Clause',
  'BSD-3-Clause',
  '0BSD',
];

/**
 * Dual-licensed packages and the option chosen. citeproc-js offers CPAL-1.0 or
 * AGPL-1.0; CPAL is file-level and leaves the MIT code around it as it is.
 */
export const chosenLicence: Record<string, string> = {
  citeproc: 'CPAL-1.0',
};

const repositoryUrl = (p: PackageJson) => {
  const raw =
    typeof p.repository === 'string' ? p.repository : p.repository?.url;
  if (!raw) return null;
  return raw
    .replace(/^git\+/, '')
    .replace(/^git:\/\//, 'https://')
    .replace(/^github:/, 'https://github.com/')
    .replace(/\.git$/, '');
};

const declaredLicence = (p: PackageJson) =>
  (typeof p.license === 'string' ? p.license : p.license?.type) ??
  p.licenses?.map((l) => l.type).join(' OR ') ??
  'UNKNOWN';

/** The package directory for `name`, looked up the way Node resolves it. */
function findPackage(name: string, from: string) {
  for (let dir = from; ; dir = path.dirname(dir)) {
    const candidate = path.join(dir, 'node_modules', name);
    if (existsSync(path.join(candidate, 'package.json')))
      return realpathSync(candidate);
    if (path.dirname(dir) === dir) throw new Error(`Cannot resolve ${name}`);
  }
}

const normalise = (text: string) =>
  text
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .trim();

/** The runtime dependencies of the project, transitively, sorted by name. */
export function collectNotices(root = process.cwd()): Notice[] {
  const top = JSON.parse(
    readFileSync(path.join(root, 'package.json'), 'utf8'),
  ) as PackageJson;
  const seen = new Map<string, Notice>();
  const visit = (name: string, from: string) => {
    const dir = findPackage(name, from);
    const pkg = JSON.parse(
      readFileSync(path.join(dir, 'package.json'), 'utf8'),
    ) as PackageJson;
    const key = `${pkg.name}@${pkg.version}`;
    if (seen.has(key)) return;
    const declared = declaredLicence(pkg);
    const chosen = chosenLicence[pkg.name] ?? declared;
    if (!permissive.includes(chosen) && chosen !== 'CPAL-1.0')
      throw new Error(
        `${key} declares "${declared}". Review it, then add it to the accepted list or choose an option in src/site/third-party-notices.ts.`,
      );
    const file = readdirSync(dir).find((f) =>
      /^(licen[cs]e|copying)(\.|$)/i.test(f),
    );
    seen.set(key, {
      name: pkg.name,
      version: pkg.version,
      declared,
      chosen,
      repository: repositoryUrl(pkg),
      text: file ? normalise(readFileSync(path.join(dir, file), 'utf8')) : null,
    });
    for (const dep of Object.keys(pkg.dependencies ?? {})) visit(dep, dir);
  };
  for (const dep of Object.keys(top.dependencies ?? {})) visit(dep, root);
  return [...seen.values()].sort(
    (a, b) =>
      a.name.localeCompare(b.name) || a.version.localeCompare(b.version),
  );
}

/** The APA style's credit, read from the style file the plugin embeds. */
function apaStyleCredit(root: string) {
  const dir = findPackage('@citation-js/plugin-csl', root);
  const styles = JSON.parse(
    readFileSync(path.join(dir, 'lib', 'styles.json'), 'utf8'),
  ) as Record<string, string>;
  const apa = styles.apa;
  const authors = [...apa.matchAll(/<author><name>([^<]+)<\/name>/g)].map(
    (m) => m[1],
  );
  const licence = apa.match(/<rights license="([^"]+)"/)?.[1];
  if (!authors.length || !licence)
    throw new Error(
      'The embedded APA style no longer names its authors and licence',
    );
  return { authors, licence: licence.replace(/^http:/, 'https:') };
}

export function renderNotices(root = process.cwd()): string {
  const notices = collectNotices(root);
  const cpal = readFileSync(
    path.join(root, 'third-party', 'CPAL-1.0.txt'),
    'utf8',
  );
  const apa = apaStyleCredit(root);
  const citeproc = notices.find((n) => n.name === 'citeproc');
  if (!citeproc) throw new Error('citeproc is no longer a dependency');
  const upstream =
    citeproc.repository ?? 'https://github.com/Juris-M/citeproc-js';
  const lines: string[] = [
    '# Third-party notices',
    '',
    'Generated by `pnpm notices` and checked by the unit tests. Do not edit by hand.',
    '',
    "Selekoa's own licences are in `LICENSING.md`. This file lists the runtime",
    'dependencies that the site ships (the dependencies named in `package.json`',
    'and everything they depend on, which can include a package that the',
    'bundler leaves out), the embedded citation style and the licence text each',
    'one requires. Development tools are not shipped and are not listed. This is',
    'a good-faith notice, not legal advice.',
    '',
    '## citeproc-js',
    '',
    `The "Copy APA" button runs citeproc-js ${citeproc.version} (by Frank Bennett),`,
    "which offers CPAL-1.0 or AGPL-1.0 at the user's option. Selekoa uses it",
    'under the Common Public Attribution License 1.0 (CPAL-1.0); the text is at',
    'the end of this file. citeproc-js is unmodified, but the bundler',
    'concatenates and minifies it, which CPAL may treat as a modification.',
    '',
    'Notice under CPAL section 3.6: the Source Code version of citeproc-js is',
    `available under the terms of CPAL-1.0. The unmodified source of version ${citeproc.version}`,
    `is at ${upstream} and in the npm package \`citeproc\`. The bundled form is`,
    'reproducible from the Selekoa source repository and its `pnpm-lock.yaml`,',
    'which Selekoa keeps available for at least twelve months after any release',
    'that includes it (CPAL section 3.2).',
    '',
    'The citeproc-js distribution names no Attribution Information (CPAL',
    'Exhibit B), so CPAL section 14 requires no attribution display. The',
    'About & method page credits it regardless.',
    '',
    '## Citation style and locale data',
    '',
    'The APA style that "Copy APA" applies is embedded, unmodified, in the',
    `package \`@citation-js/plugin-csl\`. Authors: ${apa.authors.join(' and ')}.`,
    `Licence: Creative Commons Attribution-ShareAlike 3.0 (${apa.licence}).`,
    'Source: https://github.com/citation-style-language/styles. The same package',
    'embeds CSL locale files (https://github.com/citation-style-language/locales,',
    'also CC BY-SA 3.0) and two further styles that Selekoa does not use.',
    'Selekoa has not changed any of them. The references that the button',
    'produces are output, not an adaptation of the style file.',
    '',
    '## Packages',
    '',
  ];
  for (const n of notices) {
    lines.push(`### ${n.name} ${n.version}`, '');
    lines.push(
      n.chosen === n.declared
        ? `Licence: ${n.declared}`
        : `Licence: ${n.chosen} (the package declares "${n.declared}")`,
    );
    if (n.repository) lines.push(`Source: ${n.repository}`);
    lines.push('');
    if (n.chosen === 'CPAL-1.0')
      lines.push('Licence text: see "CPAL-1.0 text" below.', '');
    else if (n.text) lines.push('~~~~text', n.text, '~~~~', '');
    else
      lines.push(
        'The package ships no licence file; the licence is as declared in its package.json.',
        '',
      );
  }
  lines.push('## CPAL-1.0 text', '', '~~~~text', normalise(cpal), '~~~~', '');
  return lines.join('\n');
}
