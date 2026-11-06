// Source register for the predictions pack. `node drafts/sources.src.mjs` writes
// drafts/sources.json, filling documentWords from the retrieved text where the
// dataset has no count. Keys match the cache under .local/predictions/doc/.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, '..', '..', '..');
const ds = new Map(
  JSON.parse(readFileSync(join(ROOT, 'data', 'sources.json'), 'utf8')).map(
    (s) => [s.id, s],
  ),
);
const d = (value, kind, note) => ({ value, kind, ...(note ? { note } : {}) });
const S = [
  // A. 1950–1979
  {
    key: 'turing1950-ox',
    cacheKey: 'turing1950-ox',
    url: 'https://www.cs.ox.ac.uk/activities/ieg/e-library/sources/t_article.pdf',
    title: 'Computing Machinery and Intelligence',
    authors: ['A. M. Turing'],
    publisher: 'Mind 59 (236): 433–460',
    date: d('1950-10', 'published'),
    kind: 'paper',
    version:
      'Later typeset transcription hosted by the University of Oxford Department of Computer Science (e-library); not the Mind printing. The dataset holds the Mind offprint scan (AMT/B/19).',
    datasetSource: 'source-turing-1950-amt-b-19',
  },
  {
    key: 'dartmouth-jmc',
    cacheKey: 'dartmouth-jmc',
    url: 'http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf',
    title:
      'A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence',
    authors: ['J. McCarthy', 'M. L. Minsky', 'N. Rochester', 'C. E. Shannon'],
    publisher: 'Typescript, dated August 31, 1955',
    date: d(
      '1955-08-31',
      'dated-typescript',
      "The read copy is a later typeset transcription on John McCarthy's Stanford site; the dataset holds the annotated facsimile of the typescript (image scan).",
    ),
    kind: 'paper',
    version:
      'Typeset transcription (jmc.stanford.edu), retrieved directly. Its text layer drops the "fi" ligature.',
    datasetSource: 'source-dartmouth-1955-facsimile',
  },
  {
    key: 'simon-newell-1958',
    cacheKey: null,
    url: 'https://doi.org/10.1287/opre.6.1.1',
    title: 'Heuristic Problem Solving: The Next Advance in Operations Research',
    authors: ['Herbert A. Simon', 'Allen Newell'],
    publisher: 'Operations Research 6 (1): 1–10',
    date: d(
      '1958-01',
      'published',
      'January–February 1958 issue; the lecture was given at an ORSA meeting in 1957 (Simon, 1998 email).',
    ),
    kind: 'paper',
    version:
      'Not retrieved: publisher page paywalled from this environment. Quotation awaiting retrieval (codex-retrieval.md).',
    awaitingRetrieval: true,
  },
  {
    key: 'simon-email-1998',
    cacheKey: 'simon-email-1998',
    url: 'https://cse.buffalo.edu/~rapaport/584/S07/simon.txt',
    title:
      'Re: citation needed for your prediction about chess (email exchange, posted as course material)',
    authors: ['Herbert A. Simon', 'William J. Rapaport'],
    publisher: 'Course page, University at Buffalo',
    date: d(
      '1998-09-24',
      'posted',
      'Date line of the emails; the copy is a later course-page transcription.',
    ),
    kind: 'message',
    version: 'Plain-text copy of two emails, retrieved directly.',
  },
  {
    key: 'good1965',
    cacheKey: 'good1965',
    url: 'https://gwern.net/doc/ai/1966-good.pdf',
    title: 'Speculations Concerning the First Ultraintelligent Machine',
    authors: ['I. J. Good'],
    publisher: 'Advances in Computers 6: 31–88',
    date: d(
      '1965',
      'published',
      'Volume dated 1965; the scanned reprint bears the series volume.',
    ),
    kind: 'paper',
    version: 'Scanned reprint with text layer, hosted by gwern.net.',
    datasetSource: 'source-good',
  },
  {
    key: 'michie1986',
    cacheKey: 'michie1986',
    url: 'https://gwern.net/doc/ai/1986-michie-onmachineintelligence.pdf',
    title:
      'Machines and the theory of intelligence (1973), chapter 11 of On Machine Intelligence, second edition',
    authors: ['Donald Michie'],
    publisher:
      'Ellis Horwood, 1986; first published in Nature 241 (1973): 507–512',
    date: d(
      '1986',
      'later-copy',
      "The chapter is dated 1973 in its heading and the book's acknowledgements give Nature 241 (1973), 507–12; the 1986 reprint is the text read.",
    ),
    kind: 'book',
    version:
      'Scan of the 1986 second edition with text layer, hosted by gwern.net; chapter 11, printed pp. 146–147.',
    datasetSource: 'source-michie-1986-on-machine-intelligence',
  },
  {
    key: 'aiimpacts-michie',
    cacheKey: 'aiimpacts-michie',
    url: 'https://aiimpacts.org/michie-survey/',
    title: 'Michie Survey',
    authors: ['AI Impacts'],
    publisher: 'AI Impacts',
    date: d(
      '2014',
      'published',
      'Page undated in the text read; AI Impacts pages of this series date from 2014 onwards. Used as a secondary reading of the figure only.',
    ),
    kind: 'web page',
    version: 'Live page, retrieved directly.',
  },
  {
    key: 'lighthill1973',
    cacheKey: 'lighthill1973',
    url: 'http://www.chilton-computing.org.uk/inf/literature/reports/lighthill_report/p001.htm',
    title:
      'Artificial Intelligence: A General Survey (Part I of the Lighthill Report)',
    authors: ['James Lighthill'],
    publisher: 'Science Research Council',
    date: d(
      '1973',
      'published',
      'Dated July 1972 in the text; published by the Science Research Council in 1973.',
    ),
    kind: 'report',
    version: 'HTML transcription hosted by chilton-computing.org.uk.',
    datasetSource: 'source-th-a-lighthill-1973',
  },
  // B. 1980–2008
  {
    key: 'degaris1989',
    cacheKey: null,
    url: 'https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/download/741/659',
    title: 'What if AI Succeeds? The Rise of the Twenty-First Century Artilect',
    authors: ['Hugo de Garis'],
    publisher: 'AI Magazine 10 (2)',
    date: d('1989', 'published'),
    kind: 'paper',
    version:
      "The download address returned a landing page to this pass; quotation checked against the dataset's passage.",
    datasetSource: 'source-ht-degaris-1989-what-if-ai-succeeds',
  },
  {
    key: 'vinge1993',
    cacheKey: 'vinge1993',
    url: 'https://ntrs.nasa.gov/api/citations/19940022856/downloads/19940022856.pdf',
    title:
      'The Coming Technological Singularity: How to Survive in the Post-Human Era',
    authors: ['Vernor Vinge'],
    publisher: 'NASA Conference Publication 10129 (VISION-21 symposium)',
    date: d('1993-12', 'published'),
    kind: 'paper',
    version:
      'NASA Technical Reports Server scan with text layer, proceedings pp. 11–22.',
    datasetSource: 'source-vinge-1993-ntrs',
  },
  {
    key: 'sits',
    cacheKey: null,
    url: 'https://web.archive.org/web/20001204213100/http://sysopmind.com:80/singularity.html',
    title: 'Staring into the Singularity (version 1.2.1)',
    authors: ['Eliezer S. Yudkowsky'],
    publisher: "Author's site (sysopmind.com)",
    date: d(
      '2000-08-31',
      'captured',
      'Version 1.2.1, "Updated: 08/31/2000", in an Internet Archive capture of 2000-12-04; first posted 1996-11-18 (claimed, not the checked wording).',
    ),
    kind: 'web page',
    version:
      "Archive capture not reachable from this environment; quotation checked against the dataset's passage.",
    datasetSource: 'source-sits-2000-capture',
  },
  {
    key: 'bostrom1998',
    cacheKey: 'bostrom1998',
    url: 'https://nickbostrom.com/superintelligence.html',
    title: 'How Long Before Superintelligence?',
    authors: ['Nick Bostrom'],
    publisher:
      "International Journal of Futures Studies 2 (1998); author's site",
    date: d(
      '1998',
      'published',
      'The page gives the 1998 journal and a 2006 reprint; it is headed "(1997)" and "Revised 25 October, 1998", with postscripts added 2000–2008. Live page: the wording is attested from retrieval.',
    ),
    kind: 'paper',
    version: 'Author-hosted HTML, retrieved directly.',
    datasetSource: 'source-th-e-bostrom-how-long-before-si',
  },
  {
    key: 'moravec1998jet',
    cacheKey: 'moravec1998jet',
    url: 'https://www.jetpress.org/volume1/moravec.htm',
    title: 'When will computer hardware match the human brain?',
    authors: ['Hans Moravec'],
    publisher: 'Journal of Evolution and Technology 1 (1998)',
    date: d('1998', 'published'),
    kind: 'paper',
    version: 'Journal HTML, retrieved directly.',
  },
  {
    key: 'moravec1999',
    cacheKey: null,
    url: 'https://frc.ri.cmu.edu/~hpm/project.archive/robot.papers/1999/SciAm.scan.html',
    title: 'Rise of the Robots',
    authors: ['Hans Moravec'],
    publisher: 'Scientific American, December 1999',
    date: d('1999-12', 'published'),
    kind: 'article',
    version:
      "Author-hosted scan transcription; the host refused this environment's TLS check, so the quotation is checked against the dataset's passage.",
    datasetSource: 'source-ht-moravec-1999-rise-of-the-robots',
  },
  {
    key: 'kurzweil2001',
    cacheKey: 'kurzweil2001',
    url: 'https://www.writingsbyraykurzweil.com/the-law-of-accelerating-returns',
    title: 'The Law of Accelerating Returns',
    authors: ['Ray Kurzweil'],
    publisher: 'writingsbyraykurzweil.com',
    date: d(
      '2001-03-07',
      'published',
      'The dataset dates it 2001-03-07; the page reads "January 2001" and carries a later site date. Live page: the wording is attested from retrieval.',
    ),
    kind: 'essay',
    version: "Live page on the author's site, retrieved directly.",
    datasetSource: 'source-ht-kurzweil-2001-loar',
  },
  {
    key: 'longbets1',
    cacheKey: 'longbets1',
    url: 'https://longbets.org/1/',
    title:
      'Long Bet 1: By 2029 no computer - or "machine intelligence" - will have passed the Turing Test',
    authors: [
      'Long Bets (The Long Now Foundation)',
      'Mitchell Kapor',
      'Ray Kurzweil',
    ],
    publisher: 'Long Bets',
    date: d('2002', 'bet-made', 'Duration given as "27 years (02002-02029)".'),
    kind: 'web page',
    version:
      'Live bet page, retrieved directly; the archive capture of 2002 is listed for Codex.',
  },
  {
    key: 'legg2011-lw',
    cacheKey: 'legg2011-lw',
    url: 'https://www.lesswrong.com/posts/No5JpRCHzBrWA4jmS',
    title: 'Q&A with Shane Legg on risks from AI',
    authors: ['XiXiDu (interviewer)', 'Shane Legg'],
    publisher: 'LessWrong',
    date: d('2011-06-17', 'posted'),
    kind: 'post',
    version:
      "Post body retrieved through the site's GraphQL endpoint (the HTML page returns HTTP 403 here).",
  },
  // C. Surveys
  {
    key: 'baum2011',
    cacheKey: 'baum2011',
    url: 'https://sethbaum.com/ac/2011_AI-Experts.pdf',
    title: 'How long until human-level AI? Results from an expert assessment',
    authors: ['Seth D. Baum', 'Ben Goertzel', 'Ted G. Goertzel'],
    publisher: 'Technological Forecasting & Social Change 78 (1): 185–195',
    date: d(
      '2011',
      'survey-report',
      "Survey at the AGI-09 conference (2009); author's file version of 20 April 2011.",
    ),
    kind: 'paper',
    version: 'Author-hosted file version, retrieved directly.',
  },
  {
    key: 'muller-bostrom',
    cacheKey: 'muller-bostrom',
    url: 'https://nickbostrom.com/papers/survey.pdf',
    title:
      'Future Progress in Artificial Intelligence: A Survey of Expert Opinion',
    authors: ['Vincent C. Müller', 'Nick Bostrom'],
    publisher:
      'In V. C. Müller (ed.), Fundamental Issues of Artificial Intelligence (Springer, Synthese Library)',
    date: d(
      '2014',
      'survey-report',
      'The file reads "forthcoming 2014"; questionnaire distributed 2012/2013. The volume appeared in 2016.',
    ),
    kind: 'book chapter',
    version: 'Author-hosted preprint, retrieved directly.',
  },
  {
    key: 'grace2017',
    cacheKey: 'grace2017',
    url: 'https://arxiv.org/pdf/1705.08807v1',
    title: 'When Will AI Exceed Human Performance? Evidence from AI Experts',
    authors: [
      'Katja Grace',
      'John Salvatier',
      'Allan Dafoe',
      'Baobao Zhang',
      'Owain Evans',
    ],
    publisher: 'arXiv:1705.08807v1',
    date: d(
      '2017-05-24',
      'survey-report',
      'Survey of researchers who published at NIPS and ICML 2015, conducted in 2016.',
    ),
    kind: 'preprint',
    version: 'arXiv version 1.',
  },
  {
    key: 'zhang2022',
    cacheKey: 'zhang2022',
    url: 'https://arxiv.org/pdf/2206.04132v1',
    title:
      'Forecasting AI Progress: Evidence from a Survey of Machine Learning Researchers',
    authors: [
      'Baobao Zhang',
      'Noemi Dreksler',
      'Markus Anderljung',
      'Lauren Kahn',
      'Charlie Giattino',
      'Allan Dafoe',
      'Michael C. Horowitz',
    ],
    publisher: 'arXiv:2206.04132v1',
    date: d('2022-06-08', 'survey-report', 'Survey conducted in 2019.'),
    kind: 'preprint',
    version: 'arXiv version 1.',
  },
  {
    key: 'espai2022',
    cacheKey: 'espai2022',
    url: 'https://wiki.aiimpacts.org/ai_timelines/predictions_of_human-level_ai_timelines/ai_timeline_surveys/2022_expert_survey_on_progress_in_ai',
    title: '2022 Expert Survey on Progress in AI',
    authors: ['AI Impacts'],
    publisher: 'AI Impacts Wiki',
    date: d(
      '2022-08',
      'survey-report',
      'The results page was first published in August 2022; the wiki page is mutable and was read live.',
    ),
    kind: 'web page',
    version:
      'Live wiki page, retrieved directly; an archive capture near publication is listed for Codex.',
  },
  {
    key: 'grace2024',
    cacheKey: 'grace2024',
    url: 'https://arxiv.org/pdf/2401.02843v1',
    title: 'Thousands of AI Authors on the Future of AI',
    authors: [
      'Katja Grace',
      'Harlan Stewart',
      'Julia Fabienne Sandkühler',
      'Stephen Thomas',
      'Ben Weinstein-Raun',
      'Jan Brauner',
    ],
    publisher: 'arXiv:2401.02843v1',
    date: d('2024-01-05', 'survey-report', 'Survey conducted in October 2023.'),
    kind: 'preprint',
    version: 'arXiv version 1.',
  },
  // E. Researchers 2009–2024
  {
    key: 'brooks-predictions',
    cacheKey: 'brooks-predictions',
    url: 'https://rodneybrooks.com/my-dated-predictions/',
    title: 'My Dated Predictions',
    authors: ['Rodney Brooks'],
    publisher: "Author's blog (rodneybrooks.com)",
    date: d(
      '2018-01-01',
      'posted',
      'The page heading reads "January 1, 2018 — Dated Predictions"; the author publishes yearly scorecards separately. Live page, so the wording is attested from retrieval.',
    ),
    kind: 'post',
    version: 'Live post, retrieved directly.',
  },
  {
    key: 'karnofsky-2021',
    cacheKey: 'karnofsky-2021',
    url: 'https://www.cold-takes.com/where-ai-forecasting-stands-today/',
    title: 'AI Timelines: Where the Arguments, and the "Experts," Stand',
    authors: ['Holden Karnofsky'],
    publisher: 'Cold Takes',
    date: d('2021-09-07', 'posted'),
    kind: 'post',
    version: 'Live post, retrieved directly.',
  },
  {
    key: 'carlsmith2022',
    cacheKey: 'carlsmith2022',
    url: 'https://arxiv.org/pdf/2206.13353v1',
    title: 'Is Power-Seeking AI an Existential Risk?',
    authors: ['Joseph Carlsmith'],
    publisher: 'arXiv:2206.13353v1',
    date: d(
      '2022-06-16',
      'published',
      'The abstract says the report was made public in April 2021 and carries a May 2022 update.',
    ),
    kind: 'preprint',
    version: 'arXiv version 1.',
    datasetSource: 'source-rd-carlsmith-2022-power-seeking',
  },
  {
    key: 'cotra-2022-update',
    cacheKey: 'cotra-2022-update',
    url: 'https://www.lesswrong.com/posts/AfH2oPHCApdKicM4m/two-year-update-on-my-personal-ai-timelines',
    title: 'Two-year update on my personal AI timelines',
    authors: ['Ajeya Cotra'],
    publisher: 'LessWrong / Alignment Forum',
    date: d('2022-08-02', 'posted'),
    kind: 'post',
    version: "Post body retrieved through the site's GraphQL endpoint.",
  },
  {
    key: 'aschenbrenner2024',
    cacheKey: 'aschenbrenner2024',
    url: 'https://situational-awareness.ai/from-gpt-4-to-agi/',
    title: 'I. From GPT-4 to AGI: Counting the OOMs',
    authors: ['Leopold Aschenbrenner'],
    publisher: 'Situational Awareness: The Decade Ahead',
    date: d(
      '2024-06',
      'published',
      'The series was published in June 2024; the dataset records the year only.',
    ),
    kind: 'essay',
    version: 'Live page, retrieved directly.',
    datasetSource: 'source-rd-aschenbrenner-2024-gpt4-to-agi',
  },
  {
    key: 'bengio2023',
    cacheKey: 'bengio2023',
    url: 'https://arxiv.org/pdf/2310.17688v1',
    title: 'Managing AI Risks in an Era of Rapid Progress',
    authors: ['Yoshua Bengio', 'Geoffrey Hinton', 'Andrew Yao', 'and others'],
    publisher: 'arXiv:2310.17688v1',
    date: d('2023-10-26', 'published'),
    kind: 'preprint',
    version: 'arXiv version 1.',
    datasetSource: 'source-rd-bengio-2023-managing-ai-risks',
  },
  // F. Laboratories and leaders
  {
    key: 'altman-ia-2024',
    cacheKey: 'altman-ia-2024',
    url: 'https://ia.samaltman.com/',
    title: 'The Intelligence Age',
    authors: ['Sam Altman'],
    publisher: "Author's site",
    date: d('2024-09-23', 'published'),
    kind: 'essay',
    version: 'Live page, retrieved directly.',
    datasetSource: 'source-rd-altman-2024-intelligence-age',
  },
  {
    key: 'amodei-mlg-2024',
    cacheKey: 'amodei-mlg-2024',
    url: 'https://www.darioamodei.com/essay/machines-of-loving-grace',
    title: 'Machines of Loving Grace',
    authors: ['Dario Amodei'],
    publisher: "Author's site",
    date: d('2024-10', 'published'),
    kind: 'essay',
    version: 'Live page, retrieved directly.',
  },
  {
    key: 'altman-reflections',
    cacheKey: 'altman-reflections',
    url: 'https://blog.samaltman.com/reflections',
    title: 'Reflections',
    authors: ['Sam Altman'],
    publisher: "Author's blog",
    date: d('2025-01-05', 'posted'),
    kind: 'post',
    version: 'Live post, retrieved directly.',
  },
  {
    key: 'altman-three-obs',
    cacheKey: 'altman-three-obs',
    url: 'https://blog.samaltman.com/three-observations',
    title: 'Three Observations',
    authors: ['Sam Altman'],
    publisher: "Author's blog",
    date: d('2025-02-09', 'posted'),
    kind: 'post',
    version: 'Live post, retrieved directly.',
  },
  {
    key: 'anthropic-ostp-2025',
    cacheKey: 'anthropic-ostp-2025',
    url: 'https://www.anthropic.com/news/anthropic-s-recommendations-ostp-u-s-ai-action-plan',
    title: "Anthropic's Recommendations to OSTP for the U.S. AI Action Plan",
    authors: ['Anthropic'],
    publisher: 'Anthropic',
    date: d('2025-03-06', 'published'),
    kind: 'announcement',
    version: 'Live page, retrieved directly.',
  },
  {
    key: 'ai2027',
    cacheKey: 'ai2027',
    url: 'https://ai-2027.com/',
    title: 'AI 2027',
    authors: [
      'Daniel Kokotajlo',
      'Scott Alexander',
      'Thomas Larsen',
      'Eli Lifland',
      'Romeo Dean',
    ],
    publisher: 'AI Futures Project (ai-2027.com)',
    date: d(
      '2025-04-03',
      'published',
      'The page reads "April 3rd 2025"; live page.',
    ),
    kind: 'web page',
    version: 'Live page, retrieved directly.',
  },
  {
    key: 'gdm-agi-safety-2025',
    cacheKey: 'gdm-agi-safety-2025',
    url: 'https://arxiv.org/pdf/2504.01849v1',
    title: 'An Approach to Technical AGI Safety and Security',
    authors: ['Rohin Shah', 'and others (Google DeepMind)'],
    publisher: 'arXiv:2504.01849v1',
    date: d('2025-04-02', 'published'),
    kind: 'preprint',
    version: 'arXiv version 1.',
  },
  {
    key: 'amodei-interp-2025',
    cacheKey: 'amodei-interp-2025',
    url: 'https://www.darioamodei.com/post/the-urgency-of-interpretability',
    title: 'The Urgency of Interpretability',
    authors: ['Dario Amodei'],
    publisher: "Author's site",
    date: d('2025-04', 'published'),
    kind: 'essay',
    version: 'Live page, retrieved directly.',
  },
  {
    key: 'altman-gentle',
    cacheKey: 'altman-gentle',
    url: 'https://blog.samaltman.com/the-gentle-singularity',
    title: 'The Gentle Singularity',
    authors: ['Sam Altman'],
    publisher: "Author's blog",
    date: d('2025-06-10', 'posted'),
    kind: 'post',
    version: 'Live post, retrieved directly.',
  },
  {
    key: 'amodei-adolescence',
    cacheKey: 'amodei-adolescence',
    url: 'https://www.darioamodei.com/essay/the-adolescence-of-technology',
    title: 'The Adolescence of Technology',
    authors: ['Dario Amodei'],
    publisher: "Author's site",
    date: d('2026-01', 'published', 'The page reads "January 2026".'),
    kind: 'essay',
    version: 'Live page, retrieved directly.',
  },
  // Awaiting retrieval (Codex)
  {
    key: 'oai-superalignment',
    cacheKey: null,
    url: 'https://openai.com/index/introducing-superalignment/',
    title: 'Introducing Superalignment',
    authors: ['Jan Leike', 'Ilya Sutskever'],
    publisher: 'OpenAI',
    date: d('2023-07-05', 'published'),
    kind: 'announcement',
    version:
      'HTTP 403 to this environment. Quotation awaiting retrieval (codex-retrieval.md).',
    datasetSource: 'source-superalignment-announcement',
    awaitingRetrieval: true,
  },
  {
    key: 'oai-governance-si',
    cacheKey: null,
    url: 'https://openai.com/index/governance-of-superintelligence/',
    title: 'Governance of superintelligence',
    authors: ['Sam Altman', 'Greg Brockman', 'Ilya Sutskever'],
    publisher: 'OpenAI',
    date: d('2023-05-22', 'published'),
    kind: 'announcement',
    version:
      'HTTP 403 to this environment. Quotation awaiting retrieval (codex-retrieval.md).',
    awaitingRetrieval: true,
  },
];
const cache = join(ROOT, '.local', 'predictions', 'doc');
const text = (k) => {
  for (const ext of ['txt', 'html'])
    if (existsSync(join(cache, `${k}.${ext}`))) return ext;
  return null;
};
for (const s of S) {
  const dsrc = s.datasetSource && ds.get(s.datasetSource);
  if (dsrc?.documentWords?.count) {
    s.documentWords = {
      count: dsrc.documentWords.count,
      basis: `Dataset count for ${s.datasetSource}.`,
    };
    continue;
  }
  if (!s.cacheKey || !text(s.cacheKey)) continue;
  const ext = text(s.cacheKey);
  const cmd = ext === 'txt' ? 'words' : 'blockwords';
  const n = Number(
    execFileSync('node', [join(DIR, '..', 'tools.mjs'), cmd, s.cacheKey], {
      encoding: 'utf8',
    }).trim(),
  );
  s.documentWords = {
    count: n,
    basis:
      ext === 'txt'
        ? `Words in the PDF text layer, counted ${new Date().toISOString().slice(0, 10)}.`
        : `Approximate body length: words in text blocks of ten or more words on the retrieved page, counted ${new Date().toISOString().slice(0, 10)}.`,
  };
}
for (const s of S)
  if (!s.documentWords && !s.awaitingRetrieval) s.documentWords = null;
writeFileSync(
  join(DIR, 'sources.json'),
  JSON.stringify({ sources: S }, null, 2) + '\n',
);
console.log(`${S.length} sources`);
