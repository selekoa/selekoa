// Admits the author-person pack into the dataset (maintainer decisions of
// 2026-10-27; see review/author-persons-admission-2026-10-27.md).
//
//   node research/author-persons/admit.mjs --write    # one-time admission
//
// Person records and authorship records come from pack.json. Every
// correction of the cross-family report (codex-check-2026-10-27.md) is
// applied below: printed name forms, locators, attribution levels, and the
// passages the check inspected where the preparer's retrieval failed.
// Records credited only under a username without an inspected identifying
// source are held, with the person record where nothing else remains.
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', '..');
const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
const pack = readJson('research/author-persons/pack.json');
const items = new Map(
  readJson('research/author-persons/gpt-check-verdicts-2026-10-27.json').map(
    (v) => [v.claimId, v.item],
  ),
);
const data = {
  meta: readJson('data/meta.json'),
  entities: readJson('data/entities.json'),
  claims: readJson('data/claims.json'),
  sources: readJson('data/sources.json'),
  evidence: readJson('data/evidence.json'),
};
const RECORDED = '2026-10-27';
const CHECKED = '2026-10-27';
const PENDING = 'Human editorial review is pending.';
const CROSS =
  'checked by a reviewer from a different model family on 2026-10-27';

/** Records held back, by check item, with the reason. */
const HELD = {
  A037: 'Credited only under the username “KatjaGrace”; no inspected source identifies the account.',
  A091: 'Credited only under the username “KatjaGrace”; no inspected source identifies the account.',
  A105: 'Credited only under the username “paulfchristiano” on the author’s blog; the Alignment Forum capture that identifies the account there does not cover the blog.',
};
/** Person records held because every record on them is held. */
const HELD_PERSONS = { 'katja-grace': HELD.A037 };

/** Person-record corrections: usual name kept, printed forms as aliases. */
const PERSON = {
  'nick-bostrom': {
    aliases: ['Nicholas Bostrom'],
    description:
      'Signs two 1996 Extropians mailing-list messages recorded in the propositions about superintelligence collection as “Nicholas Bostrom”, among them “Re: Thinking about the future...” (1996-09-04).',
  },
  'timothy-bresnahan': { aliases: ['Timothy F. Bresnahan'] },
  'lorin-hitt': { aliases: ['Lorin M. Hitt'] },
  'charles-i-jones': { aliases: [] },
  'vernor-vinge': { aliases: [] },
  'evan-hubinger': { aliases: ['evhub'] },
  'alan-turing': {
    name: 'Alan Turing',
    sortName: 'Turing, Alan',
    aliases: ['A. M. Turing'],
    description:
      'Credited author of “Computing Machinery and Intelligence” (1950-10), printed as “A. M. Turing”; the King’s College archive attributes three typescripts recorded in the propositions about superintelligence collection to him.',
  },
};
/** Aliases added to existing person records. */
const EXISTING_ALIASES = {
  'eliezer-yudkowsky': ['Eliezer S. Yudkowsky'],
  'paul-christiano': ['paulfchristiano'],
};

const capture = (date) => `in the Internet Archive capture of ${date}`;
const replaced = (where, why) =>
  `Passage and locator as inspected by a reviewer from a different model family on 2026-10-27 ${where}; ${why}. ${PENDING}`;
const NOT_RETRIEVED =
  'the preparer’s retrieval of 2026-10-27 had failed, so the check’s reading replaces a restatement of the source record’s author list';
const NOT_FOUND =
  'the preparer’s matcher had not found the name in a byline position';
const SCAN = 'the scan has no text layer, so the page was checked visually';

/**
 * Corrections by check item: evidence fields to replace, and statement or
 * qualification changes. `from`/`to` swap the printed form in the statement.
 */
const FIX = {
  A010: {
    from: 'is sent under the name Nick Bostrom',
    to: 'is signed “Nicholas Bostrom”',
    qualification:
      'A signature on a mailing-list message as archived; the header shows only an address. The record uses the usual form of the name, Nick Bostrom, with the printed form “Nicholas Bostrom” as an alias. Quoted text by others inside the message is not the sender’s.',
    ev: {
      passage: 'Nicholas Bostrom',
      passageType: 'quote',
      locator: 'Signature at the end of the message body',
      note: replaced(
        'in a direct retrieval and the Internet Archive capture of 2015-04-27',
        'the preparer’s matcher had found a different given name. The visible header reads “04 Sep 95”, unlike the 1996 date of the record; the check did not resolve this',
      ),
    },
  },
  A089: {
    from: 'is sent under the name Nick Bostrom',
    to: 'is signed “Nicholas Bostrom”',
    qualification:
      'A signature on a mailing-list message as archived; the header shows only an address. The record uses the usual form of the name, Nick Bostrom, with the printed form “Nicholas Bostrom” as an alias. Quoted text by others inside the message is not the sender’s.',
    ev: {
      passage: 'Nicholas Bostrom',
      passageType: 'quote',
      locator:
        'Signature at the end of the message body, before the footer navigation',
      note: replaced(
        'in a direct retrieval and the Internet Archive capture of 2015-04-27',
        'the preparer’s matcher had found a different given name',
      ),
    },
  },
  A011: {
    from: 'Timothy Bresnahan',
    to: 'Timothy F. Bresnahan',
    ev: {
      passage: 'Timothy F. Bresnahan',
      passageType: 'quote',
      locator: 'PDF cover, author lines beneath the title',
      note: replaced(
        'in a direct retrieval',
        `${SCAN}; the preparer’s matcher had found no text`,
      ),
    },
  },
  A039: {
    from: 'Lorin Hitt',
    to: 'Lorin M. Hitt',
    ev: {
      passage: 'Lorin M. Hitt',
      passageType: 'quote',
      locator: 'PDF cover, author lines beneath the title',
      note: replaced(
        'in a direct retrieval',
        `${SCAN}; the preparer’s matcher had found no text`,
      ),
    },
  },
  A090: {
    ev: {
      passage: 'Erik Brynjolfsson',
      passageType: 'quote',
      locator: 'PDF cover, author lines beneath the title',
      note: replaced(
        'in a direct retrieval',
        `${SCAN}; the preparer’s matcher had found no text`,
      ),
    },
  },
  A023: {
    ev: {
      passage: 'Tom Davidson',
      passageType: 'quote',
      locator: '“Author:” field beneath the report title',
      note: replaced(capture('2021-07-02'), NOT_RETRIEVED),
    },
  },
  A026: {
    ev: {
      passage: 'K. Eric Drexler',
      passageType: 'quote',
      locator:
        'Web edition, references section: document title and the copyright credit at the end of the section',
      note: replaced(
        capture('1997-07-09'),
        `${NOT_RETRIEVED}. The web edition, not a scan of the 1986 title page, was inspected`,
      ),
    },
  },
  A027: {
    qualificationAdd:
      'The title page names seven further contributors on a separate “with” line.',
    ev: {
      passage: 'Wassily Leontief and Faye Duchin',
      passageType: 'quote',
      locator: 'PDF page 2, report title page, “by” line',
      note: replaced(
        'in a direct retrieval of the Internet Archive microfiche scan',
        'the title page was checked visually because the OCR text misreads the names; the preparer’s matcher had found the name only outside the byline',
      ),
    },
  },
  A048: {
    qualificationAdd:
      'The title page names seven further contributors on a separate “with” line.',
    ev: {
      passage: 'Wassily Leontief and Faye Duchin',
      passageType: 'quote',
      locator: 'PDF page 2, report title page, “by” line',
      note: replaced(
        'in a direct retrieval of the Internet Archive microfiche scan',
        'the title page was checked visually because the OCR text misreads the names; the preparer’s matcher had found the name only outside the byline',
      ),
    },
  },
  A028: {
    ev: {
      passage: 'Dani Eder',
      passageType: 'quote',
      locator:
        '“From:” header (name in parentheses, address not reproduced) and the signature of the relayed message',
      note: replaced(capture('1997-07-12'), NOT_RETRIEVED),
    },
  },
  A040: {
    ev: {
      passage: 'Evan Hubinger',
      passageType: 'quote',
      locator:
        '“by” line beneath the title; the current page displays the username “evhub” in its place',
      note: replaced(capture('2019-09-23'), NOT_FOUND),
    },
  },
  A094: {
    from: 'credits Evan Hubinger as one of its 5 authors',
    to: 'credits the paper it introduces to Evan Hubinger and four co-authors',
    qualification:
      'The post’s “by” line displays the username “evhub”; its opening paragraph credits the paper to Evan Hubinger, Chris van Merwijk, Vladimir Mikulik, Joar Skalse and Scott Garrabrant, which identifies the account. Credited co-authorship; it does not allocate parts of the text between authors or imply agreement with every passage.',
    ev: {
      passage: 'Evan Hubinger',
      passageType: 'quote',
      locator:
        'Opening paragraph, crediting the paper to its five authors; the next paragraph credits the first four equally for the sequence',
      note: replaced('in a direct retrieval', NOT_FOUND),
    },
  },
  A095: {
    ev: {
      passage: 'Evan Hubinger',
      passageType: 'quote',
      locator:
        '“by” line beneath the title; the current page displays the username “evhub” in its place',
      note: replaced(capture('2022-08-30'), NOT_FOUND),
    },
  },
  A041: {
    ev: {
      locator: 'PDF page 1 (printed page 459), byline beneath the title',
      note: `Credited name checked by an automated research assistant on 2026-10-27 in a direct retrieval and ${CROSS}, who corrected the locator. ${PENDING}`,
    },
  },
  A043: {
    from: 'Jones Charles I.',
    to: 'Charles I. Jones',
    ev: {
      passage: 'Charles I. Jones',
      locator: 'PDF cover, beneath the title; repeated on the abstract page',
      note: `Credited name checked by an automated research assistant on 2026-10-27 in a direct retrieval and ${CROSS}, who corrected the quotation to the printed order. ${PENDING}`,
    },
  },
  A050: {
    ev: {
      passage: 'Edwin Mansfield',
      passageType: 'quote',
      locator:
        'Contribution title page, “Prepared for the Commission by” (OCR text of the scanned volume)',
      note: replaced(
        'in a direct retrieval of the Internet Archive scan’s OCR text',
        'the preparer’s matcher had found the name only outside the byline; the page image was not inspected',
      ),
    },
  },
  A053: {
    qualification:
      'The credit is the title-page credit of the collection On Machine Intelligence (1986), in which the chapter appears without a byline of its own; the 1968 original was not inspected. It says nothing about priority for the ideas discussed.',
    ev: {
      passage: 'DONALD MICHIE',
      locator:
        'PDF page 6, book title page; the chapter opens on PDF page 245 (printed page 240) without a byline',
      note: `Checked by a reviewer from a different model family on 2026-10-27 on a rendered page, who corrected the locator: the name the preparer matched occurs in early biographical text, not in a byline. ${PENDING}`,
    },
  },
  A058: {
    ev: {
      locator:
        '“Comment by Max More” heading immediately above the contribution’s title',
      note: `Credited name checked by an automated research assistant on 2026-10-27 in a direct retrieval and ${CROSS} in the Internet Archive capture of 2000-08-17, who corrected the locator to the contribution’s own heading. ${PENDING}`,
    },
  },
  A085: {
    from: 'credits Alan Turing as its author',
    to: 'credits A. M. Turing as its author',
    ev: {
      passage: 'A. M. TURING',
      passageType: 'quote',
      locator:
        'Offprint PDF page 1 (printed page 433), “By” line beneath the title; surname in small capitals',
      note: replaced(
        'in a direct retrieval of the offprint embedded in the King’s College archive page',
        `${SCAN}. The preparer had matched the archive site’s heading “Alan Turing”, not the offprint’s byline`,
      ),
    },
  },
  A131: {
    statement:
      'The Turing Archive catalogue at King’s College, Cambridge, attributes the typescript “Lecture to the London Mathematical Society” to Alan Turing.',
    qualification:
      'The archive catalogue’s attribution, not a byline: the inspected first and last pages of the typescript print no personal name. Interior pages were not searched. It says nothing about priority for the ideas discussed.',
    sourceRole: 'secondary',
    ev: {
      passage:
        'The archive’s catalogue description attributes the typescript to AMT: “Comprises AMT’s TS with AMS additions”.',
      passageType: 'paraphrase',
      locator: 'Archive catalogue description of the item',
      note: replaced(
        'in a direct retrieval of the archive page and the embedded typescript',
        'the preparer had matched the archive site’s heading, which is not a byline',
      ),
    },
  },
  A132: {
    statement:
      'The Turing Archive catalogue at King’s College, Cambridge, lists the typescript “Intelligent Machinery, a Heretical Theory” among Alan Turing’s papers.',
    qualification:
      'The archive catalogue’s attribution, not a byline: the inspected pages print no full personal name. The opening of the version numbered from 1 carries a handwritten “TURING” in its top margin; who wrote it, and when, is not established. It says nothing about priority for the ideas discussed.',
    sourceRole: 'secondary',
    ev: {
      passage:
        'The King’s College archive lists the typescript among the papers of Alan Turing (1912–1954).',
      passageType: 'paraphrase',
      locator:
        'Archive item page; typescript PDF pages 1, 7, 11 and 16 inspected',
      note: replaced(
        'in a direct retrieval of the archive page and the embedded typescript',
        'the preparer had matched the archive site’s heading, which is not a byline',
      ),
    },
  },
  A133: {
    statement:
      'The Turing Archive catalogue at King’s College, Cambridge, lists the broadcast script “Can Digital Computers Think?” among Alan Turing’s papers.',
    qualification:
      'The archive catalogue’s attribution, not a byline: the inspected first and last pages of the script print no personal name or signature. Interior pages were not searched. It says nothing about priority for the ideas discussed.',
    sourceRole: 'secondary',
    ev: {
      passage:
        'The King’s College archive lists the broadcast script among the papers of Alan Turing (1912–1954).',
      passageType: 'paraphrase',
      locator: 'Archive item page; script PDF pages 1 and 8 inspected',
      note: replaced(
        'in a direct retrieval of the archive page and the embedded script',
        'the preparer had matched the archive site’s heading, which is not a byline',
      ),
    },
  },
  A025: {
    statement:
      '“A Condensation of the Book Automation”, printed in the 1955 hearings Automation and Technological Change (1955-10-14), condenses John Diebold’s book Automation; the condensation was prepared by the Controllership Foundation.',
    qualification:
      'Diebold is the author of the underlying book; the condensation itself was prepared by the Controllership Foundation and inserted into the record with his statement, as the existing records on it say. The book’s wording was not compared. It says nothing about priority for the ideas discussed.',
    ev: {
      passage: 'A Condensation of the Book Automation, by John Diebold',
      locator:
        'Printed page 14, heading of the condensation and the permission note before it, which credits the Controllership Foundation with the condensation (OCR text of the scanned volume)',
      note: `Checked by an automated research assistant on 2026-10-27 in a direct retrieval of the Internet Archive scan’s OCR text and by a reviewer from a different model family on 2026-10-27, who distinguished the book’s author from the condensation’s preparer; the page image was not inspected. ${PENDING}`,
    },
  },
  A051: { ev: dartmouth('J. McCarthy') },
  A055: { ev: dartmouth('M. L. Minsky') },
  A068: { ev: dartmouth('N. Rochester') },
  A074: { ev: dartmouth('C. E. Shannon') },
  A057: {
    ev: {
      passage: 'Hans Moravec',
      passageType: 'quote',
      locator: 'Text header immediately after the title',
      note: replaced(
        'in a direct retrieval and the Internet Archive capture of 2001-03-06',
        `${NOT_RETRIEVED}. Both headers date the text July 1988; the record keeps the date of its document record`,
      ),
    },
  },
  A096: {
    ev: {
      passage: 'Hans Moravec',
      passageType: 'quote',
      locator: 'Byline beneath the article title; also in the page title',
      note: replaced(
        'in a direct retrieval and the Internet Archive capture of 2001-07-10',
        `${NOT_RETRIEVED}. The page prints “July 21, 1976” and “this version 1978”; it does not itself establish the February 1979 date of the record`,
      ),
    },
  },
  A060: {
    ev: {
      passage: 'Nils J. Nilsson',
      passageType: 'quote',
      locator: 'PDF page 1 (printed page 5), byline beneath the article title',
      note: replaced(
        'in the Internet Archive capture of 2024-03-30 of the publisher’s PDF (the publisher address returned an empty file)',
        NOT_RETRIEVED,
      ),
    },
  },
  A092: {
    ev: {
      passage: 'Robin Hanson',
      passageType: 'quote',
      locator:
        'PDF page 8 (printed page 10), byline beneath the article title; also in the contents on PDF page 1',
      note: replaced(
        'in a direct retrieval of the issue scan',
        `${NOT_RETRIEVED}; ${SCAN}`,
      ),
    },
  },
  A093: {
    ev: {
      passage: 'Robin Hanson',
      passageType: 'quote',
      locator: '“by” line beneath the title and subtitle',
      note: replaced(capture('1999-01-28'), NOT_RETRIEVED),
    },
  },
  A097: {
    ev: {
      passage: 'Vernor Vinge',
      passageType: 'quote',
      locator: '“By” line beneath “FIRST WORD”, PDF page 1 (printed page 10)',
      note: replaced(
        'in a direct retrieval of the scan',
        'the text layer omits the byline, so the page was checked visually; the preparer’s matcher had not found the name',
      ),
    },
  },
  A098: {
    ev: {
      passage: 'Eliezer S. Yudkowsky',
      passageType: 'quote',
      locator:
        'Header copyright and “by” line beneath the title and the version number 1.2.1',
      note: replaced(
        capture('2000-12-04'),
        `${NOT_RETRIEVED}. The credit is verified for the updated page of 2000, not for the 1996 wording`,
      ),
    },
  },
  A099: {
    ev: {
      passage: 'Eliezer S. Yudkowsky',
      passageType: 'quote',
      locator: 'Opening “Copyright … by” line beneath the title block',
      note: replaced(
        capture('2001-01-26'),
        `${NOT_RETRIEVED}. The page is marked as a temporary version`,
      ),
    },
  },
  ...Object.fromEntries(
    ['A100', 'A101', 'A102', 'A103', 'A104'].map((it) => [
      it,
      {
        ev: {
          passage: 'Eliezer Yudkowsky',
          passageType: 'quote',
          locator:
            'Author link in the post metadata beneath the title (Arbital mirror)',
          note: replaced(
            'in a direct retrieval of the mirror page',
            `${NOT_RETRIEVED}. The displayed credit does not establish sole authorship of every revision`,
          ),
        },
      },
    ]),
  ),
  // Maintainer decision of 2026-10-27: admitted on the publisher's author-ID
  // match. The LessWrong GraphQL API, queried on 2026-10-27, returns the same
  // userId (gb44edJjXhte8DA3A) for this post and for "What failure looks
  // like", whose 2019-06-08 Alignment Forum capture prints "Paul Christiano"
  // (response SHA-256 608ec85a… and 5307c935…).
  A108: {
    from: 'credits Paul Christiano as its author',
    to: 'credits the username “paulfchristiano” as its author',
    qualification:
      'Credited under the username “paulfchristiano”. The publisher’s post data give this post the same author account as “What failure looks like”, whose Internet Archive capture of 2019-06-08 prints “Paul Christiano” in its byline; that match identifies the account. It says nothing about priority for the ideas discussed.',
    ev: {
      passage: 'paulfchristiano',
      passageType: 'quote',
      locator: '“by” line beneath the title (username)',
      note: `Passage and locator as inspected by a reviewer from a different model family on 2026-10-27 in a direct retrieval and the Internet Archive capture of 2022-06-19. The account was identified by an automated research assistant on 2026-10-27 through the publisher’s post data (LessWrong GraphQL API), which give this post and “What failure looks like” the same author ID. ${PENDING}`,
    },
  },
  A106: {
    from: 'credits Paul Christiano as its author',
    to: 'credits the username “paulfchristiano” as its author',
    qualification:
      'Credited under the username “paulfchristiano”. The Internet Archive capture of “What failure looks like” on the same forum (2019-06-08) prints “Paul Christiano” in its byline, linked to the same account, which identifies it. It says nothing about priority for the ideas discussed.',
    ev: {
      passage: 'paulfchristiano',
      passageType: 'quote',
      locator: '“by” line beneath the title (username)',
      note: replaced(
        'in a direct retrieval',
        'the preparer had restated the source record’s author list in place of the username',
      ),
    },
  },
  A107: {
    ev: {
      passage: 'Paul Christiano',
      passageType: 'quote',
      locator:
        '“by” line beneath the title, linked to the account “paulfchristiano”; the current page displays the username',
      note: replaced(capture('2019-06-08'), NOT_FOUND),
    },
  },
  A109: {
    ev: {
      passage: 'Holden Karnofsky',
      passageType: 'quote',
      locator:
        'Author field of the comment beginning “Some personal reactions on this piece:”',
      note: replaced(capture('2020-06-23'), NOT_RETRIEVED),
    },
  },
  A141: {
    qualification:
      'Credited authorship of this contribution; the chapter dates itself 3 July 2011 within the later collection, whose joint cover credit does not make the cover authors co-authors of it. It says nothing about priority for the ideas discussed.',
    ev: {
      locator:
        'Chapter “Debating Yudkowsky”, PDF page 504 (printed page 493), byline beneath the title; the contents on PDF page 8 repeat it',
      note: `Credited name checked by an automated research assistant on 2026-10-27 in a direct retrieval and ${CROSS}, who corrected the locator from the collection cover to the chapter’s own byline. ${PENDING}`,
    },
  },
};
function dartmouth(name) {
  return {
    passage: name,
    passageType: 'quote',
    locator: 'Facsimile PDF page 1, title-page author block',
    note: replaced(
      'in a direct retrieval of the facsimile',
      `${NOT_RETRIEVED}; ${SCAN}. The initials are kept as printed; the full name rests on the 2006 AI Magazine reprint, an identity source of the person record`,
    ),
  };
}

/**
 * Sources where a quoted name would break the short-quotation limit of
 * schema 2.8: short messages and pages already near their limit, and scans
 * that record no document length. Their names are given as labelled
 * paraphrases that still state the printed form.
 */
const OVER_LIMIT = new Set([
  'source-arbital-programmer-deception',
  'source-extropians-1998-09-24-hanson',
  'source-rosenfelder-1991-cheating-turing-test',
  'source-extropians-1999-08-04-yudkowsky-1589',
  'source-extropians-1999-08-04-yudkowsky-1587',
  'source-sl4-2001-04-19-yudkowsky-0104-1166',
  'source-lw-2023-gpts-are-predictors-not-imitators',
]);
const NO_LENGTH = new Set([
  'source-vinge-1983-omni-scan',
  'source-turing-1947-amt-b-1',
  'source-minsky-1961-mit',
  'source-michie-1986-on-machine-intelligence',
  'source-mckinstry-1994-usefulness-turing-test',
  'source-extropy-13-scan',
  'source-eder-1994-sandberg-relay',
  'source-dartmouth-1955-facsimile',
]);
function labelled(row) {
  if (row.passageType !== 'quote') return;
  const why = OVER_LIMIT.has(row.sourceId)
    ? 'a quotation would exceed the short-quotation limit for this document'
    : NO_LENGTH.has(row.sourceId)
      ? 'the source records no document length against which a quotation can be checked'
      : null;
  if (!why) return;
  const where = row.locator.charAt(0).toLowerCase() + row.locator.slice(1);
  row.passage = `Credited as “${row.passage}” (${where}).`;
  row.passageType = 'paraphrase';
  row.note = row.note.replace(
    PENDING,
    `Given as a labelled paraphrase because ${why}. ${PENDING}`,
  );
}

/** The evidence note for a record the pack matched and the check left unchanged. */
function matchedNote(cl, e) {
  const how = /OCR/.test(e.locator)
    ? ' of the scan’s OCR text'
    : /GraphQL/.test(e.locator)
      ? ' through the publisher’s post data'
      : '';
  const checked = items.has(cl.id) ? ` and ${CROSS}` : '';
  const reused = /already quoted in the dataset/.test(e.check)
    ? ' The same sentence is already quoted in the dataset.'
    : '';
  return `Credited name checked by an automated research assistant on 2026-10-27 in a direct retrieval${how}${checked}.${reused} ${PENDING}`;
}

if (!process.argv.includes('--write')) {
  console.error('Pass --write.');
  process.exit(1);
}
if (data.claims.some((c) => c.id.startsWith('ap-')))
  throw new Error('Author-person records are already admitted.');
for (const c of pack.candidates)
  for (const cl of c.claims)
    if (
      !/^(matched|not retrieved|name not found|name outside byline|credited under a username|given name differs|family name only)$/.test(
        cl.verificationStatus,
      )
    )
      throw new Error(`Unexpected status ${cl.verificationStatus}`);

const omit = (o, keys) =>
  Object.fromEntries(Object.entries(o).filter(([k]) => !keys.includes(k)));
const sha = (v) => createHash('sha256').update(JSON.stringify(v)).digest('hex');
const snapshotPath = 'review/author-persons-before-2026-10-27.json';
if (existsSync(join(ROOT, snapshotPath)))
  throw new Error(`${snapshotPath} exists`);
// The commit the admission branch started from, so a re-run records the same base.
const baseCommit = execSync('git merge-base HEAD origin/main', {
  cwd: ROOT,
})
  .toString()
  .trim()
  .slice(0, 7);
const priorMeta = structuredClone(data.meta);
const priorSha = Object.fromEntries(
  ['entities', 'claims', 'sources', 'evidence', 'meta'].map((n) => [
    n,
    sha(data[n]),
  ]),
);

// The identity source for the Dartmouth authors' full names.
const sources = pack.proposedSources.map((s) => ({
  ...omit(s, ['purpose']),
  id: s.id.replace(/^proposed-/, ''),
  authorNames: s.authors.map((a) => {
    const parts = a.split(' ');
    return { family: parts.at(-1), given: parts.slice(0, -1).join(' ') };
  }),
  version:
    'Article record (citation_author fields) retrieved directly on 2026-10-27 (SHA-256 f28d8a98c6851a40803db1e10294a2ab995011f690466e8d15285c97eb2a77cc); the article PDF came back empty. Used only to identify the four authors of the 1955 proposal by their full names.',
  reuse: {
    attribution:
      'McCarthy, Minsky, Rochester and Shannon, “A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence, August 31, 1955”, AI Magazine 27(4), 2006.',
    licence: 'No open redistribution licence asserted',
    note: 'Bibliographic metadata only; no passage is quoted. Recheck terms before wider redistribution.',
  },
}));
const sourceId = (id) => id.replace(/^proposed-/, '');

const entities = [];
const claims = [];
const evidence = [];
const held = [];
const changedEntities = [];

function admitClaim(cl) {
  const item = items.get(cl.id);
  if (item && HELD[item]) {
    held.push({ claimId: cl.id, item, reason: HELD[item] });
    return false;
  }
  const fix = (item && FIX[item]) || {};
  let statement = fix.statement ?? cl.statement;
  if (fix.from) {
    if (!statement.includes(fix.from))
      throw new Error(`${item}: “${fix.from}” not in statement`);
    statement = statement.replace(fix.from, fix.to);
  }
  let qualification = fix.qualification ?? cl.qualification;
  if (fix.qualificationAdd)
    qualification = `${fix.qualificationAdd} ${qualification}`;
  if (cl.evidence.length > 1 && fix.ev)
    throw new Error(`${item}: correction on a multi-passage record`);
  const evIds = cl.evidence.map((e) => {
    if (
      e.passageType === 'paraphrase' &&
      !fix.ev &&
      cl.verificationStatus !== 'matched'
    )
      throw new Error(`${cl.id}: unmatched fallback passage without a fix`);
    const row = {
      id: e.id,
      claimId: cl.id,
      sourceId: sourceId(e.sourceId),
      sourceRole: fix.sourceRole ?? e.sourceRole,
      support: e.support,
      locator: e.locator,
      passage: e.passage,
      passageType: e.passageType,
      verification: 'machine_checked',
      checkedAt: CHECKED,
      note: matchedNote(cl, e),
      retrievalRoute: e.retrievalRoute,
      ...(fix.ev ?? {}),
    };
    if (
      /Message header/.test(row.locator) &&
      !/^(message)$/.test(data.sources.find((s) => s.id === row.sourceId)?.kind)
    )
      throw new Error(
        `${cl.id}: message-header locator on a non-message source`,
      );
    if (/not matched in a retrieval/.test(row.locator))
      throw new Error(`${cl.id}: fallback locator left`);
    evidence.push(row);
    return row.id;
  });
  for (const row of evidence.filter((r) => r.claimId === cl.id)) labelled(row);
  const rest = omit(cl, ['evidence', 'verificationStatus', 'context']);
  claims.push({
    ...rest,
    statement,
    qualification,
    evidenceIds: evIds,
    recordedAt: RECORDED,
  });
  return true;
}

for (const c of pack.candidates) {
  const id = c.entity.id;
  for (const h of c.held ?? [])
    held.push({ claimId: h.id, item: null, reason: h.reason });
  if (HELD_PERSONS[id]) {
    for (const cl of c.claims) {
      const item = items.get(cl.id);
      if (!HELD[item]) throw new Error(`${cl.id} on a held person is not held`);
      held.push({ claimId: cl.id, item, reason: HELD[item] });
    }
    held.push({ personId: id, reason: HELD_PERSONS[id] });
    continue;
  }
  const admitted = c.claims.filter(admitClaim).length;
  if (!admitted) throw new Error(`${id}: no admitted record`);
  entities.push({
    ...c.entity,
    sourceIds: c.entity.sourceIds.map(sourceId),
    ...(PERSON[id] ?? {}),
  });
}
const buckingham = entities.find((e) => e.id === 'walter-s-buckingham');
// The sort-name rule allows one comma; the suffix follows the given names.
buckingham.sortName = 'Buckingham, Walter S. Jr.';
for (const b of pack.backfill) {
  for (const cl of b.claims) admitClaim(cl);
  const extra = EXISTING_ALIASES[b.personId] ?? [];
  if (!extra.length) continue;
  const row = data.entities.find((e) => e.id === b.personId);
  changedEntities.push(structuredClone(row));
  row.aliases = [
    ...row.aliases,
    ...extra.filter((a) => !row.aliases.includes(a)),
  ];
}
for (const id of Object.keys(PERSON))
  if (!entities.some((e) => e.id === id)) throw new Error(`No person ${id}`);
for (const item of Object.keys(FIX))
  if (
    ![...items].some(
      ([cid, it]) => it === item && claims.some((c) => c.id === cid),
    )
  )
    throw new Error(`Correction ${item} not applied`);

const added = {
  entities: entities.map((e) => e.id),
  claims: claims.map((c) => c.id),
  sources: sources.map((s) => s.id),
  evidence: evidence.map((e) => e.id),
};
writeFileSync(
  join(ROOT, snapshotPath),
  JSON.stringify(
    {
      description: `Records as stored at ${baseCommit} (schema 2.17, release v0.8.0) before the admission of the author-person pack on 2026-10-27 (review/author-persons-admission-2026-10-27.md): the earlier metadata, the IDs the admission added and the two person records whose aliases it extended, as they were. The test-only historical view removes the added rows and restores the rest.`,
      baseCommit,
      meta: priorMeta,
      added,
      before: {
        entities: changedEntities,
        claims: [],
        sources: [],
        evidence: [],
      },
      sha256: priorSha,
    },
    null,
    2,
  ) + '\n',
);
writeFileSync(
  join(ROOT, 'research/author-persons/admission-held-2026-10-27.json'),
  JSON.stringify(held, null, 2) + '\n',
);
data.entities.push(...entities);
data.claims.push(...claims);
data.sources.push(...sources);
data.evidence.push(...evidence);
data.meta.updatedAt = RECORDED;
data.meta.scope +=
  ' The author-person admission of 2026-10-27 adds person records for credited authors of texts that the proposition collections study, and one authorship record per credited text, each quoting the name as printed (or, for three Turing typescripts, the archive catalogue’s attribution). The records come from a machine-prepared candidate pack checked blind by a reviewer from a different model family; no person has reviewed them. An authorship record is a credit, not sole authorship, priority, agreement, affiliation or influence.';
for (const name of ['meta', 'entities', 'claims', 'sources', 'evidence'])
  writeFileSync(
    join(ROOT, 'data', `${name}.json`),
    JSON.stringify(data[name], null, 2) + '\n',
  );
console.log(
  `Added ${entities.length} persons, ${claims.length} claims, ${evidence.length} evidence rows and ${sources.length} source; extended aliases on ${changedEntities.length} persons; held ${held.length}.`,
);
