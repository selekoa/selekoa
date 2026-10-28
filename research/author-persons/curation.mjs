// Hand curation for the author-person pack: canonical names where the most
// frequent printed form is not the best heading, inclusion overrides, and
// candidates whose authorship is not credited in a byline (built by hand).
// Keys are selection.json keys: folded family name | first letter of given name.

// The 1955 Dartmouth proposal prints its authors with initials. The AI
// Magazine reprint (2006) gives their full names in its article record; it is
// proposed as an identity source (not yet in the dataset).
const AIMAG = 'proposed-source-aimag-2006-dartmouth-proposal';
const AIMAG_CHECK =
  'Name matched in the citation_author fields of a direct retrieval of https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/view/1904 on 2026-10-27 (SHA-256 f28d8a98c6851a40803db1e10294a2ab995011f690466e8d15285c97eb2a77cc). The article PDF returned an empty file.';
const dartmouth = (key, name, sortName) => ({
  name,
  sortName,
  identification: [
    {
      id: `ap-id-${key}`,
      kind: 'full name of an initialled credit',
      statement: `AI Magazine’s 2006 reprint of the 1955 Dartmouth proposal lists ${name} among its authors, where the 1955 typescript prints initials.`,
      time: {
        kind: 'snapshot',
        date: '2006-12-15',
        note: 'Publication date in the reprint’s article record.',
      },
      qualification:
        'Identifies the person behind an initialled credit; it records no role, affiliation or later career. The reprint’s own wording of the proposal was not compared with the typescript.',
      evidence: [
        {
          sourceId: AIMAG,
          sourceRole: 'secondary',
          support: 'supports',
          locator: 'Article record, author list',
          passage: name,
          passageType: 'quote',
          retrievalRoute: 'direct',
          check: AIMAG_CHECK,
        },
      ],
    },
  ],
});
export const curation = {
  'turing|a': { id: 'alan-turing' },
  'mccarthy|j': dartmouth('john-mccarthy', 'John McCarthy', 'McCarthy, John'),
  'rochester|n': dartmouth(
    'nathaniel-rochester',
    'Nathaniel Rochester',
    'Rochester, Nathaniel',
  ),
  'shannon|c': dartmouth(
    'claude-e-shannon',
    'Claude E. Shannon',
    'Shannon, Claude E.',
  ),
  'minsky|m': {
    ...dartmouth('marvin-minsky', 'Marvin Minsky', 'Minsky, Marvin'),
    aliases: ['Marvin L. Minsky'],
  },
};

export const PROPOSED_SOURCES = [
  {
    id: AIMAG,
    title:
      'A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence, August 31, 1955',
    authors: [
      'John McCarthy',
      'Marvin L. Minsky',
      'Nathaniel Rochester',
      'Claude E. Shannon',
    ],
    publisher:
      'AI Magazine 27(4), Association for the Advancement of Artificial Intelligence',
    publicationDate: '2006-12-15',
    canonicalUrl:
      'https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/view/1904',
    evidenceUrl:
      'https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/view/1904',
    language: 'en',
    kind: 'paper',
    accessedAt: '2026-10-27',
    purpose:
      'Identity source for the full names of the four authors of the 1955 proposal. Not a source for any proposition record.',
  },
];

// Included with one record because the maintainer's decision of 2026-10-27 names them.
export const CENTRAL = {
  'reuther|w':
    'One record; named in the maintainer’s decision of 2026-10-27 among the authors missing a person record.',
};

// Samuel Butler: the 1863 and 1865 texts are unsigned or pseudonymous and the
// 1872 edition was anonymous; only the 1901 revised edition prints his name.
// The 1863 letter is signed "Cellarius", the 1865 article is unsigned and the
// 1872 Erewhon was published anonymously. His authorship rests on his own
// prefaces in the revised edition (Project Gutenberg e-text 1906, which names
// no source printing), retrieved 2026-10-27.
const EREWHON_CHECK =
  'Verbatim match in a direct retrieval of https://www.gutenberg.org/cache/epub/1906/pg1906.txt on 2026-10-27 (SHA-256 9b034d0990931fa4dfc510a1adf4a3f256e35ba1ec9dbedcba9a382397727682).';
const butlerClaim = (o) => ({
  subject: 'samuel-butler',
  predicate: 'authored',
  topic: 'ideas',
  editorialState: 'seed',
  ...o,
});
export const EXTRA_CANDIDATES = [
  {
    key: 'butler|s',
    entity: {
      id: 'samuel-butler',
      name: 'Samuel Butler',
      sortName: 'Butler, Samuel',
      type: 'person',
      subtype: 'Author',
      aliases: ['Cellarius'],
      description:
        'Named as author of the revised edition of Erewhon (1901), whose preface claims the 1863 letter “Darwin among the Machines”, signed “Cellarius”.',
      sourceIds: ['source-erewhon-1901-gutenberg', 'source-butler-1863-press'],
    },
    inclusion:
      'Holds the earliest-located role in the superintelligence collection; none of his texts in the dataset carries his name, so authorship rests on his own 1901 preface.',
    records: null,
    collections: { superintelligence: null },
    claims: [
      butlerClaim({
        id: 'ap-samuel-butler-butler-1863-darwin-among-machines',
        object: {
          kind: 'entity',
          entityId: 'butler-1863-darwin-among-machines',
        },
        statement:
          'In the preface to the revised edition of Erewhon (dated 7 August 1901), Samuel Butler states that he rewrote and enlarged “Darwin among the Machines”, the 1863 article signed Cellarius, and calls it the first part of Erewhon written.',
        time: {
          kind: 'event',
          date: '1863-06-13',
          basis: 'publication',
          note: 'Publication date of the letter in The Press. The authorship statement is dated 1901-08-07, 38 years later.',
        },
        derivation: 'explicit',
        resolution: 'supported',
        qualification:
          'A first-person retrospective claim, not a contemporaneous credit: the 1863 letter is signed “Cellarius” and names no author. The e-text names no source printing and no printed 1901 copy was compared.',
        evidence: [
          {
            id: 'evidence-ap-samuel-butler-butler-1863-darwin-among-machines-1',
            sourceId: 'source-erewhon-1901-gutenberg',
            sourceRole: 'primary',
            support: 'supports',
            locator:
              'Preface to the Revised Edition (signed Samuel Butler, dated August 7, 1901), second paragraph',
            passage:
              'The first part of “Erewhon” written was an article headed “Darwin among the Machines,” and signed Cellarius.',
            passageType: 'quote',
            retrievalRoute: 'direct',
            check:
              EREWHON_CHECK +
              ' The same sentence is already quoted in the dataset, so it adds no words to the source’s quotation total.',
          },
          {
            id: 'evidence-ap-samuel-butler-butler-1863-darwin-among-machines-2',
            sourceId: 'source-erewhon-1901-gutenberg',
            sourceRole: 'primary',
            support: 'supports',
            locator: 'Preface to the Revised Edition, fourth paragraph',
            passage:
              'In 1865 I rewrote and enlarged “Darwin among the Machines” for the Reasoner',
            passageType: 'quote',
            retrievalRoute: 'direct',
            check: EREWHON_CHECK,
          },
        ],
        verificationStatus: 'matched',
      }),
      butlerClaim({
        id: 'ap-samuel-butler-erewhon-1872',
        object: { kind: 'entity', entityId: 'erewhon-1872' },
        statement:
          'The revised edition of Erewhon names Samuel Butler as author, and its preface, signed by him, speaks of Erewhon as his own work.',
        time: {
          kind: 'event',
          date: '1872',
          basis: 'publication',
          note: 'Year of the anonymous first edition. The credit is in the revised edition, whose preface is dated 1901-08-07.',
        },
        derivation: 'explicit',
        resolution: 'supported',
        qualification:
          'The 1872 printing was published anonymously; the credit comes from the revised edition of 1901, read in a Project Gutenberg e-text that names no source printing. It does not establish that the 1872 and 1901 texts are the same.',
        evidence: [
          {
            id: 'evidence-ap-samuel-butler-erewhon-1872-1',
            sourceId: 'source-erewhon-1901-gutenberg',
            sourceRole: 'primary',
            support: 'supports',
            locator: 'Title page of the e-text',
            passage: 'by Samuel Butler',
            passageType: 'quote',
            retrievalRoute: 'direct',
            check: EREWHON_CHECK,
          },
          {
            id: 'evidence-ap-samuel-butler-erewhon-1872-2',
            sourceId: 'source-erewhon-1901-gutenberg',
            sourceRole: 'primary',
            support: 'supports',
            locator:
              'Preface to the Revised Edition, last paragraph, before the signature “SAMUEL BUTLER.”',
            passage: '“Erewhon” took something like ten years in writing',
            passageType: 'quote',
            retrievalRoute: 'direct',
            check: EREWHON_CHECK,
          },
        ],
        verificationStatus: 'matched',
      }),
    ],
    held: [
      {
        id: 'ap-samuel-butler-butler-1865-lucubratio-ebria',
        object: { kind: 'entity', entityId: 'butler-1865-lucubratio-ebria' },
        reason:
          'Not proposed. The 1865 article is unsigned, and Butler’s 1901 preface mentions only “a second article on the same subject … in the Press shortly after the first, but I have no copy”, without a title or date. The dataset’s attribution rests on a textual match with Erewhon (its document description), not on a cited authority. An authorship record would be an inference from that match; it needs a competent bibliographic source (for example a Butler bibliography) or the maintainer’s decision.',
      },
    ],
    identification: [],
    notes: [
      '“Cellarius” is proposed as an alias because the 1863 letter is printed under it and Butler claims the letter as his.',
    ],
  },
];

// Byline readings the automatic match cannot make, each checked by the
// preparer in the cached retrieval. Keys: sourceId|selection key.
export const OVERRIDES = {
  'source-solomonoff-1985-author-pdf|solomonoff|r': {
    how: 'read by the preparer',
    place: 'override',
    passage:
      'The title block names Ray J. Solomonoff as author; the PDF text layer drops the “ff” ligature and reads “Solomono”.',
    passageType: 'paraphrase',
    locator: 'PDF p. 1, title block',
  },
  'source-vinge-1993-ntrs|vinge|v': {
    how: 'read by the preparer',
    place: 'override',
    passage:
      'The title page names Vernor Vinge, Department of Mathematical Sciences, San Diego State University; the NTRS text layer reads “Vemor”.',
    passageType: 'paraphrase',
    locator: 'PDF p. 1, title block (NASA Technical Reports Server scan)',
  },
  'source-extropians-1998-09-16-vinge|vinge|v': {
    how: 'read by the preparer',
    place: 'override',
    passage: 'Vinge asks me to forward the following to the list:',
    passageType: 'quote',
    locator:
      'First line of the message body; the forwarded text ends with the signature “Vernor”',
    statement:
      'The Extropians message “Singularity: Vinge responds” (1998-09-16), sent by Robin Hanson, forwards a text that it attributes to Vinge and that is signed “Vernor”.',
    note: 'The message is sent by Robin Hanson; the record credits Vinge with the forwarded text only.',
  },
};
