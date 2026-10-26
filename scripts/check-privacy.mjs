import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

// Run against the index before committing. Extra private identifiers can be supplied
// only for the current process through SELEKOA_PRIVATE_TERMS (pipe-separated).
const gitOptions = [
  '-c',
  `safe.directory=${process.cwd().replaceAll('\\', '/')}`,
];
const files = execFileSync('git', [...gitOptions, 'ls-files', '-z'], {
  encoding: 'utf8',
})
  .split('\0')
  .filter(Boolean);
const patterns = [
  /[A-Z]:[\\/]+(Users|Documents and Settings)[\\/]+[^\s"<>]+/i,
  // Absolute Unix home paths start at a text boundary, unlike a public URL's
  // interior /news/home/... segment. Retain quoted and Markdown-link paths.
  /(?:^|[\s"'`(=]|file:\/\/)\/(Users|home)\/[^/\s]+\//,
  /(?:gh[pousr]_[a-zA-Z0-9]{20,}|github_pat_[a-zA-Z0-9_]{20,}|sk-proj-[a-zA-Z0-9_-]{20,})/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
];
const privateTerms = (process.env.SELEKOA_PRIVATE_TERMS ?? '')
  .split('|')
  .filter(Boolean);
// Addresses inside a dependency's own copyright line, reproduced in
// THIRD-PARTY-NOTICES.md because the licence requires the notice.
const thirdPartyAddresses = ['d@domenic.me'];
// The corrections address chosen for publication in site.config.json.
let publishedContact;
try {
  publishedContact = JSON.parse(
    readFileSync('site.config.json', 'utf8'),
  ).contact;
} catch {
  // No site configuration here (for example in the scanner's own test).
}
let failures = 0;
for (const file of files) {
  const content =
    file +
    '\n' +
    execFileSync('git', [...gitOptions, 'show', `:${file}`], {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
    });
  const emails =
    content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) ?? [];
  if (
    patterns.some((p) => p.test(content)) ||
    privateTerms.some((t) =>
      content.toLocaleLowerCase().includes(t.toLocaleLowerCase()),
    ) ||
    // The no-reply commit address and the project's provisional role address.
    emails.some(
      (e) =>
        !/^267712019\+futurelightcone@users\.noreply\.github\.com$/.test(e) &&
        e !== 'maintainer@selekoa.org' &&
        e !== publishedContact &&
        // example.org is reserved for documentation and test fixtures.
        !e.endsWith('@example.org') &&
        !thirdPartyAddresses.includes(e),
    )
  ) {
    console.error(`Privacy review required: ${file}`);
    failures++;
  }
}
if (!files.length)
  throw new Error('No indexed files; stage intended content before scanning.');
if (failures) process.exitCode = 1;
else
  console.log(
    `Privacy scan passed for ${files.length} indexed files. Review diffs as well; this is not a proof of anonymity.`,
  );
