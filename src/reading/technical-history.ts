import type { NamingCollection } from '../domain/naming';

const admitted = '2026-10-31';

/**
 * Kinds of AI and technical history (schema 2.26): eleven families of methods
 * and seven names, admitted on 2026-10-31 from the candidate pack in
 * research/technical-history. The maintainer placed the collection in the
 * institutional-history hub, with a timeline as its second view; the terms
 * link from the thought hub. The searches are the pack's, with the
 * cross-family check's findings beside them.
 */
export const technicalHistory: NamingCollection = {
  id: 'technical-history',
  version: 1,
  title: 'Kinds of AI and their names',
  question:
    'Which located texts, from 1943 to 2023, name and describe the families of methods in machine intelligence, and which use the names the field goes by, such as artificial intelligence, machine learning, deep learning, artificial general intelligence and large language model? For each family and name, which text is the earliest located use?',
  editorialStatus: 'machine-proposed',
  introduction:
    'Each family of methods and each name is recorded with one criterion. A naming record says that a text uses a name in the sense the criterion describes, or in another sense, which is labelled. A defining statement quotes what a text says a family is. Attributed statements say who a text credits with naming or devising something; they are kept apart and not resolved. Where a text only cites a work beside such a statement, the record is a citation, not a credit. The page records what texts say and when. It does not say where a family began, and a sequence of texts establishes no influence between them.',
  groups: [
    {
      id: 'families',
      label: 'Families of methods',
      description:
        'Symbolic AI and expert systems, search and planning, logic programming, connectionism and neural networks, deep learning, probabilistic and Bayesian methods, evolutionary computation, reinforcement learning, statistical learning and support-vector machines, hybrid and neurosymbolic approaches, and Transformers and large language models.',
      conceptIds: [
        'th-fam-symbolic-ai',
        'th-fam-search-planning',
        'th-fam-logic-programming',
        'th-fam-connectionism',
        'th-fam-deep-learning',
        'th-fam-probabilistic',
        'th-fam-evolutionary',
        'reinforcement-learning',
        'th-fam-statistical-learning',
        'th-fam-neurosymbolic',
        'th-fam-transformers-llm',
      ],
    },
    {
      id: 'names',
      label: 'Names',
      description:
        'Names the field and its methods go by. A name is recorded with the sense its criterion requires; a use in another sense is labelled.',
      conceptIds: [
        'th-term-artificial-intelligence',
        'th-term-machine-learning',
        'th-term-deep-learning',
        'th-term-agi',
        'th-term-superintelligence',
        'th-term-large-language-model',
        'th-term-foundation-model',
      ],
    },
  ],
  searches: {
    'th-fam-symbolic-ai': {
      venues:
        "IJCAI proceedings index pages 1969, 1971, 1973, 1975 and 1977 (ijcai.org; titles searched for 'expert', 'knowledge-based', 'knowledge engineer', 'symbol'); full texts of the retrieved papers and reports listed in sources (RAND P-868 and P-1584 read as page images for their summaries and opening pages only); Buchanan and Shortliffe 1984, chapter 1.",
      years: '1956–1984 among the retrieved texts; title search 1969–1977.',
      methods:
        "Regex search of the retrieved text layers for the listed names; title search of the IJCAI indexes; reading of the scanned RAND papers' first pages as images.",
      gaps: "Only titles were searched in the IJCAI indexes, not full texts; the DENDRAL reports of 1969–1971 (Machine Intelligence volumes), Shortliffe's 1974 thesis and the 1976 MYCIN book, Stanford Heuristic Programming Project memos, and the Newell and Simon 1976 lecture ('physical symbol system') were not read; Haugeland 1985 ('GOFAI') is a book not retrieved. Buchanan and Shortliffe (1984) state that 'expert system' and 'knowledge-based system' came into general use about 1975, so earlier uses are likely to exist.",
      failures:
        'dl.acm.org (Newell and Simon 1976, HTTP 403); cs.utexas.edu copy (TLS failure, then HTTP 503); amturing.acm.org (HTTP 403); sciencedirect.com (Lindsay et al. 1993 DENDRAL retrospective and Campbell et al. 2002 Deep Blue, HTTP 403).',
      check:
        'A cross-family machine check (item 12) searched again, blind, from fresh retrievals: Earliest located directly inspected naming record: Donald Michie, Knowledge Engineering, Kybernetes 2(4), 1973. The publisher-deposited abstract connects problem-solving, automatic programming and organizing knowledge in machine memory. It is a naming attestation, not an inspected full-text definition of expert systems.',
    },
    'th-fam-search-planning': {
      venues:
        'RAND papers P-868 (1956) and P-1584 (1958/1959) read as page images (cover, summary and first pages only); Minsky 1961 (MIT transcription, full text); IJCAI proceedings index pages 1969–1977 (titles) and the full texts of Sandewall 1969 and Fikes and Nilsson 1971; Hart, Nilsson and Raphael 1968 (pages 1 and 3 as images); Lighthill 1972/1973 (Part I).',
      years: '1956–1977.',
      methods:
        'Reading of the scanned first pages; regex search of text layers for "search", "planning", "heuristic search", "heuristic programming"; IJCAI title search.',
      gaps: 'The scanned Logic Theory Machine paper (64 pages) and the GPS report (29 pages) were read only on their opening pages, so an earlier use of "search" or "planning" in the 1956 paper is not excluded. Dartmouth-era texts in the dataset were not re-read for this family. Pre-1956 operations-research and game-tree texts (for example Shannon on chess programs) were not searched.',
      failures:
        'rand.org PDF paths for P-1584 (HTTP 404, then 403); ai.stanford.edu copy of the A* paper (connection reset).',
      check:
        'A cross-family machine check (item 13) searched again, blind, from fresh retrievals: Earliest located qualifying method exposition: Alan Turing, Intelligent Machinery, report dated 1948 in later bibliographic accounts; the inspected later reprint describes machine problem-solving by searching programs/choices and names intellectual searches. The inspected copy itself is a later reprint, so wording/publication and report-writing dates must be kept separate.',
    },
    'th-fam-logic-programming': {
      venues:
        'Kowalski 1974 (IFIP 74, scanned, all 6 pages read as images); Kowalski 1988 and Colmerauer and Roussel 1992 (retrospectives, full text); McCarthy 1959 and 1960 (author copies); IJCAI index titles 1969–1977.',
      years: '1959–1992.',
      methods:
        'Reading of the scanned 1974 paper page by page; regex search of the text layers for "logic programming" and "Prolog"; IJCAI title search (no title contains "logic programming").',
      gaps: "Kowalski's 1972 Jablonna paper and DCL Memo 70 (November 1973), the Marseille 1972 report (Colmerauer, Kanoui, Pasero, Roussel), van Emden and Kowalski 1976 and Kowalski 1979 were not retrieved; Hayes 1973 and Sandewall 1973 (cited by Kowalski) were not read.",
      failures: 'None for this family beyond the texts not attempted.',
      check:
        'A cross-family machine check (item 14) searched again, blind, from fresh retrievals: Earliest directly inspected qualifying exposition located: Kowalski, Predicate Logic as Programming Language, IFIP 1974. It explicitly equates axiomatizations with programs and proofs with computations. Earlier 1972–1973 Marseille reports and Kowalski memo are unresolved earlier leads, not disproved by this bounded search.',
    },
    'th-fam-connectionism': {
      venues:
        'Retrieved primary texts 1943-1997 listed under the documents of this group, the Dartmouth proposal facsimile (dataset) and Minsky 1961 (dataset transcription).',
      years: '1943-1997.',
      methods:
        'Full-text search of each retrieved text layer for "neural net", "neuron net", "nerve net", "nervous net", "connectionis", "parallel distributed"; page images read for the scanned Dartmouth proposal, Rosenblatt 1957, Widrow and Hoff 1960, Rumelhart, Hinton and Williams 1986 and LeCun et al. 1989, which have no text layer (only the pages named in the locators were read). Citation following from Minsky 1961 and Rosenblatt 1958.',
      gaps: 'Minsky\'s 1954 Princeton dissertation, cited in Minsky 1961 as "Neural Nets and the Brain Model Problem", was not retrieved; if its title page carries that wording it would be an earlier located naming (1954). Texts of the 1940s-1950s cybernetics literature (Rashevsky, Farley and Clark, Uttley, Hebb 1949) and the Thorndike-era psychological sense of "connectionism" were not searched. Feldman and Ballard, "Connectionist models and their properties" (Cognitive Science, 1982) refused (HTTP 403). The PDP volumes were read only for chapter 8. Scanned texts were read page by page, not searched in full.',
      failures:
        'onlinelibrary.wiley.com (Feldman and Ballard 1982, HTTP 403); pnas.org and Europe PMC (Hopfield 1982, HTTP 403 and 500; the Caltech copy was used); bioinf.jku.at (LSTM, expired certificate; a course copy was used); iro.umontreal.ca (Anubis bot challenge); apps.dtic.mil (ICS Report 8506, site under maintenance).',
      check:
        "A cross-family machine check (item 4) searched again, blind, from fresh retrievals: Earliest located qualifying expression: McCulloch and Pitts 1943, 'The one neuron net', in a proof constructing neuron nets that realize logical expressions. This is a narrow lexical match to neuron net; most of the paper uses nervous net, which the brief excludes as a naming expression.",
    },
    'th-fam-deep-learning': {
      venues: 'See the term ‘deep learning’; the naming search is held there.',
      years: 'See the term ‘deep learning’.',
      methods:
        'Naming records are the term records of the term ‘deep learning’; this family holds defining statements and timeline documents only.',
      gaps: 'See the term ‘deep learning’.',
      failures: 'See the term ‘deep learning’.',
    },
    'th-fam-probabilistic': {
      venues:
        'Minsky (1961, dataset transcription); AAAI-82 proceedings (Pearl); UCLA technical reports (Pearl 1985, two versions); IJCAI-85 proceedings (Cheeseman); Crossref index (bibliographic query "bayesian inference artificial intelligence machine", to 1984, 60 rows).',
      years: '1955–1985.',
      methods:
        'Full-text search of the retrieved texts for "Bayes"; reading of the report covers and abstracts from page images where there is no text layer; screening of Crossref titles.',
      gaps: 'Duda, Hart and Nilsson, "Subjective Bayesian methods for rule-based inference systems" (AFIPS 1976; reprinted 1981) was found in the index but not retrieved; Pearl\'s 1988 book and 1950s–1960s pattern-recognition literature (for example Chow 1957) were not searched. The Dartmouth proposal and Samuel (1959) do not use "Bayes".',
      failures:
        'Semantic Scholar API: HTTP 429 for the Duda, Hart and Nilsson search.',
      check:
        "A cross-family machine check (item 7) searched again, blind, from fresh retrievals: Earliest located qualifying name in inspected text: Minsky, Steps Toward Artificial Intelligence, January 1961, p. 15, 'Bayes network model'. This replaces the checker's preliminary 1964 result after an earlier primary occurrence was encountered during item 9 research.",
    },
    'th-fam-evolutionary': {
      venues:
        'Crossref index (bibliographic queries "genetic algorithm", "simulated evolution", "evolutionary programming", "evolution strategy", publication dates to 1980, 100 rows each, titles screened); Crossref journal listing for Evolutionary Computation (ISSN 1063-6560), 1993; Koza (1990 report); Minsky (1961).',
      years: '1955–1993.',
      methods:
        'Title screening of index results; full-text search of the retrieved texts.',
      gaps: 'The texts most often cited for the family\'s early history were not retrieved: Friedberg (IBM Journal 1958), Holland (J. ACM 1962; book 1975), Fogel, Owens and Walsh (book 1966), Bagley (thesis 1967), Rechenberg (1965 report; 1973 book), De Jong (thesis 1975). The "genetic algorithm" query returned only items with incorrect dates (1970-01-01 placeholders for recent papers); "simulated evolution" returned no matching title. The search’s earliest record was therefore an index title, and a fuller search is likely to find earlier texts.',
      failures:
        'ACM Digital Library HTTP 403 (Holland 1962, dl.acm.org/doi/pdf/10.1145/321127.321128); University of Michigan Deep Blue HTTP 403 and an empty bitstream page (De Jong 1975, deepblue.lib.umich.edu/handle/2027.42/4507); MIT Press direct.mit.edu browser challenge, HTTP 403 (Bäck and Schwefel 1993).',
      check:
        "A cross-family machine check (item 8) searched again, blind, from fresh retrievals: Earliest inspected qualifying use located: Wiley's announcement of Fogel, Owens and Walsh, Artificial Intelligence Through Simulated Evolution, advertising the 1966 book. The announcement explicitly names evolutionary programming and describes mutation followed by selection of the better logical machine.",
    },
    'reinforcement-learning': {
      venues:
        'Dartmouth proposal (1996 transcription); Samuel (1959 reprint); Minsky (1961); Sutton (1988); Watkins (1989, page images of title page and preface only); Tesauro (1995); Sutton and Barto (2018), section 1.7 and chapter notes.',
      years: '1955–1995, with the 2018 history for attributed statements.',
      methods:
        'Full-text search for "reinforcement learning" and "reinforcement"; citation following from Sutton and Barto\'s history.',
      gaps: "Minsky's 1954 Princeton dissertation and the 1960s engineering literature named by Sutton and Barto (Waltz and Fu 1965; Mendel 1966) were not retrieved. Watkins's thesis has no text layer and was not searched beyond its first pages.",
      failures:
        'None for the texts listed; see the evolutionary and statistical-learning blocks for refusals by shared hosts.',
      check:
        'A cross-family machine check (item 9) searched again, blind, from fresh retrievals: Earliest located exact reinforcement-learning name: Minsky, Steps Toward Artificial Intelligence, January 1961, section III. The inspected source explicitly contrasts a reinforcement learning device with Pavlovian conditioning and labels complex reinforcement learning systems.',
    },
    'th-fam-statistical-learning': {
      venues:
        'Valiant (CACM 1984); Crossref index records for Boser, Guyon and Vapnik (COLT 1992) and Cortes and Vapnik (Machine Learning 1995); Burges (1998 tutorial, pre-publication copy).',
      years: '1984–1998.',
      methods:
        'Retrieval of the lead texts; full-text search of Burges for its history statements; index records where the text refused.',
      gaps: "Vapnik's books (1979, 1995, 1998), Vapnik and Chervonenkis (1960s–1970s, in Russian) and Aizerman et al. (1964) were not retrieved or searched; the search’s earliest record was an index title, and a fuller search, especially of Russian-language texts, may find earlier ones.",
      failures:
        'Springer link.springer.com browser challenge for Cortes and Vapnik (content/pdf/10.1007/BF00994018.pdf and the article page); image.diku.dk mirror HTTP 503; svms.org/training/BOGV92.pdf now serves an unrelated page; ACM Digital Library not reachable for Boser et al.',
      check:
        'A cross-family machine check (item 10) searched again, blind, from fresh retrievals: Earliest directly inspected qualifying formal account located: Valiant, A Theory of the Learnable, November 1984. It defines concepts learned from examples drawn under arbitrary distributions with polynomial computation and probability/error guarantees.',
    },
    'th-fam-neurosymbolic': {
      venues:
        "Towell and Shavlik (authors' copy, AI journal 1994); Mao et al. (arXiv 2019); Marcus (arXiv 2020); Garcez and Lamb (arXiv 2020); Kautz (AI Magazine article page 2022).",
      years: '1990–2022.',
      methods:
        'Retrieval of the lead texts; full-text search for "hybrid", "symbolic", "neuro-symbolic", "neurosymbolic".',
      gaps: 'Earlier hybrid connectionist-symbolic work (for example Hinton 1990, Sun 1996, Shavlik 1994 in Machine Learning, Garcez, Broda and Gabbay 2002, Garcez, Lamb and Gabbay 2009, all cited by the retrieved texts) was not retrieved; no index search was made for "neuro-symbolic" before 1994.',
      failures:
        'ftp.cs.wisc.edu over FTP timed out (the HTTPS address answered); the Kautz article PDF returned an empty body and the Wiley copy refused (HTTP 403).',
      check:
        'A cross-family machine check (item 11) searched again, blind, from fresh retrievals: Earliest directly inspected primary full-text qualifying name located: Towell, Shavlik and Noordewier, AAAI 1990, KBANN hybrid learning system. A 1989 Shavlik–Towell article is an earlier qualifying publisher-abstract lead; direct access refused, so its historical body wording remains unchecked.',
    },
    'th-fam-transformers-llm': {
      venues:
        'arXiv (v1 PDFs and abstract pages of the papers listed), the ACL Anthology (proceedings PDFs), cdn.openai.com (GPT-1 and GPT-2 PDFs).',
      years:
        '2014-2023 for the texts read; the naming search for "Transformer" in this sense covered only the texts below and their reference lists.',
      methods:
        'Full-text search of the retrieved texts (tools.mjs grep) for "Transformer", "attention" and "large language model"; citation following from GPT-1, GPT-2, GPT-3, BERT and Zhao et al. back to Vaswani et al. and Bahdanau et al.',
      gaps: 'No index search for "Transformer" as an architecture name before 2017-06 (the word is common in other senses, e.g. electrical transformers and Chomskyan transformations); earlier attention-based models other than Bahdanau et al. were not read. The large-language-model naming records are kept in the term section (the term ‘large language model’), not here.',
      failures:
        'openai.com (GPT-2, GPT-3 and ChatGPT announcement pages) refused with HTTP 403.',
      check:
        "A cross-family machine check (item 15) searched again, blind, from fresh retrievals: Earliest located qualifying family name: Vaswani and colleagues, Attention Is All You Need, arXiv v1 submitted June 12, 2017. The v1 itself names Transformer and excludes recurrence and convolutions. Earlier statistical or recurrent large language models do not meet this item's Transformer-family sense.",
    },
    'th-term-artificial-intelligence': {
      venues:
        "Crossref REST API (query 'artificial intelligence', publication dates up to 1955-12-31, top 1,000 records screened for the phrase in titles and abstracts); Europe PMC (exact phrase, 1800–1956); the Dartmouth facsimile (title page and PDF p. 2 read as images).",
      years: 'Indexes: up to 1955-12-31 (Crossref) and 1956 (Europe PMC).',
      methods:
        "Phrase filters on index titles and abstracts; reading the facsimile pages; McCarthy's later accounts read for attributed statements.",
      gaps: "Book and periodical full texts before 1956 were not searched (Google Books and the Internet Archive full-text search did not answer). The dataset's Turing texts (1947–1951) were not re-grepped in this pass. The pack extends the dataset's Dartmouth record and does not claim that no earlier use exists.",
      failures:
        'jmc.stanford.edu (connection closed, recorded by the proxy); Google Books API (quota); scholar.archive.org (429).',
      check:
        'A cross-family machine check (item 3) searched again, blind, from fresh retrievals: Earliest located qualifying use: the McCarthy–Minsky–Rochester–Shannon Dartmouth proposal, bearing August 31, 1955. This is a proposal date, distinct from the proposed summer 1956 research event.',
    },
    'th-term-machine-learning': {
      venues:
        'Crossref index (bibliographic query "machine learning", publication dates 1940 to 1959, 200 rows by relevance, titles screened for the phrase); the Dartmouth proposal (1955) in the 1996 HTML transcription; Samuel (1959) in a later reprint; Minsky (1961) in the dataset transcription. Turing (1950) is in the dataset only as a scan without a text layer and was not searched.',
      years:
        '1936–1961 for the earliest-located question; later uses recorded only where a retrieved text of this group already contained the term.',
      methods:
        'Full-text search of the retrieved texts; screening of Crossref titles for "machine learning" and "learning machine"; reading of the index records for the earliest hits.',
      gaps: 'Only titles and metadata are searched in Crossref, not full texts; Google Books, HathiTrust and the Internet Archive full-text search were not used. 1950s conference proceedings outside Crossref (for example IRE convention records) were not searched. The pre-1959 texts of Samuel, Friedberg ("A Learning Machine", IBM Journal 1958) and Selfridge were not read.',
      failures:
        'Campaigne (1959) text: ACM Digital Library HTTP 403 (dl.acm.org/doi/pdf/10.1145/1457838.1457868 and the landing page); Semantic Scholar has no abstract. Samuel (1959) on IEEE Xplore not attempted (the index link is the IEEE host, which refuses automated retrieval in earlier packs).',
      check:
        'A cross-family machine check (item 6) searched again, blind, from fresh retrievals: Earliest located documentary title: Howard Campaigne, Some experiments in machine learning, in the Western Joint Computer Conference proceedings (1959), associated with the March 3–5, 1959 event. Full text refused access; the title and event are verified through ACM-deposited Crossref metadata, so the exact passage-level sense remains only title-level checked.',
    },
    'th-term-deep-learning': {
      venues:
        "Retrieved primary texts of the neural-network line 1943-2015 (McCulloch and Pitts; Rosenblatt 1957 and 1958; Widrow and Hoff; Minsky 1961; Fukushima; Hopfield; Rumelhart, Hinton and Williams 1986 and the PDP chapter; LeCun et al. 1989; Hochreiter and Schmidhuber; Hinton, Osindero and Teh; Bengio et al. NIPS 2006; Bengio and LeCun 2007; Hinton 2007 (Trends in Cognitive Sciences); Ranzato et al. CVPR 2007; Weston, Ratle and Collobert ICML 2008; Bengio 2009; Goodfellow et al. 2014; LeCun, Bengio and Hinton 2015), Dechter (AAAI-86), and Schmidhuber's surveys of 2014 and 2022 for leads.",
      years:
        '1943-2015 for the texts read; index queries limited to 1980-2005.',
      methods:
        'Full-text search of each retrieved text for "deep learning", "learn deep", "deep network" and "deep belief"; Semantic Scholar bulk search for "deep learning" with "neural", "network", "neurons" and for "learn deep", years 1980-2005 (2026-10-29); a Crossref bibliographic query for "deep learning" neural to 2005; citation following from Schmidhuber 2014 and 2022.',
      gaps: 'Aizenberg, Aizenberg and Vandewalle (2000), which Schmidhuber 2022 names as the text that brought the term to neural networks, was not retrieved (book). Gomez and Schmidhuber (GECCO 2005, "learn deep memories") was not retrieved (404). Bengio\'s 2007 technical report version of Learning Deep Architectures for AI (Montréal TR 1312) sits behind a bot challenge. The NIPS 2007 workshop pages were not searched. Semantic Scholar and Crossref results before 2006 are dominated by the education-research sense ("deep learning" as opposed to surface learning) and by misdated records; one unverified Semantic Scholar record dated 1999 ("DEEP LEARNING Automatic Target Recognition Using Neural Networks") could not be checked (rate limit, no full text) and is not counted. Texts read with no use of the term: Hinton, Osindero and Teh 2006; Bengio et al. 2006; Bengio and LeCun 2007; Hinton 2007; Ranzato et al. 2007; Krizhevsky et al. 2012; Hochreiter and Schmidhuber 1997.',
      failures:
        'Springer book page for Aizenberg et al. 2000 (bot challenge); Google Books API (HTTP 429, quota); people.idsia.ch/~juergen/gecco05gomez.pdf (HTTP 404); iro.umontreal.ca (Anubis bot challenge); now Publishers page (HTTP 403); ICML 2007 paper URL redirected to an unrelated page; Semantic Scholar single-paper search (HTTP 429).',
      check:
        'A cross-family machine check (item 5) searched again, blind, from fresh retrievals: Earliest directly verified qualifying use located: Deep Learning Workshop: Foundations and Future Directions, NIPS 2007 announcement. An opened 2007-10-18 capture displays revision 1 dated October 12, 2007, describing many hidden layers and explicitly calling the question deep learning. The event date is December 6, 2007.',
    },
    'th-term-agi': {
      venues:
        "Crossref REST API (query.bibliographic, publication dates up to 1997-12-31, 1,000 top-ranked records per query screened for the exact phrase in titles and deposited abstracts); Semantic Scholar bulk search (exact phrase, year ≤ 1997, titles and abstracts); Europe PMC (exact phrase, 1900–1997, titles, abstracts and full texts it indexes); the full texts retrieved for this group (Good 1965, the Dartmouth facsimile pages read as images, Vinge 1993, Gubrud 1997, Bostrom 1997/1998 with postscripts, Legg and Hutter 2007, McCarthy's two pages); SL4 mailing-list subject indexes, every month from 2000-02 to 2002-06 (subject lines only); citation following from Goertzel's 2011 account. arXiv API (exact phrase in all fields, ascending by submission date): earliest record 2003-02-10 (Schmidhuber, 'The New AI: General & Sound & Relevant for Physics'), none before 1998 (arXiv holds little before the 1990s).",
      years:
        'Indexes: everything they hold up to 1997-12-31. SL4: 2000-02 to 2002-06. Retrieved texts: 1955–2011.',
      methods:
        "Exact-phrase filters on index records (titles and abstracts only, not full text, except Europe PMC's open full texts); full-text grep of retrieved texts for 'artificial general intelligence', 'general intelligence' and '\\bAGI\\b'; subject-line grep of SL4 indexes; following Goertzel's 2011 pointer to Gubrud 1997.",
      gaps: "No full-text search of books, magazines, conference proceedings or Usenet before 1997 was possible: Google Books (API daily quota exhausted), the Internet Archive's full-text scholar search (rate-limited, 429) and OpenAlex (rate-limited) did not answer on 2026-10-29, and Usenet archives (Google Groups) are not retrievable here. Index records before 1997 rarely carry abstracts, so a use in a body text would not be found. Crossref and Semantic Scholar returned no record with the phrase before 1998; Semantic Scholar returned four records for 'general artificial intelligence' (1983–1991) without abstracts, not opened and not the term. Extropians list archives 1996–2001 and SL4 message bodies were not searched. The 2007 Springer volume and Goertzel's 2014 survey were not retrieved.",
      failures:
        'Google Books API (quota exceeded); scholar.archive.org (429); OpenAlex API (rate limit); web.archive.org availability and CDX services (429 and connection reset), so no capture address is recorded for the Foresight pages; sciendo.com and degruyter.com for Goertzel 2014 (403 and 202 challenge); link.springer.com (client challenge); agi-conf.org (403 challenge); dblp.org (Anubis challenge); vetta.org (TLS chain not verifiable over https; bot check 401 over http). Retried later in the session: the Archive availability service (429), scholar.archive.org (rate-limit page) and OpenAlex (daily budget exhausted) still did not answer.',
      check:
        'A cross-family machine check (item 1) searched again, blind, from fresh retrievals: Earliest located qualifying text: Mark Avrum Gubrud, Nanotechnology and International Security, draft for the November 5–8, 1997 conference. The exact wording is demonstrably present in the opened 1998-02-07 capture; no qualifying pre-1997 primary passage was located.',
    },
    'th-term-superintelligence': {
      venues:
        "Crossref REST API (queries 'superintelligence', 'super-intelligence' and 'superintelligent', publication dates up to 1997-12-31, top 1,000 records screened for the strings in titles and abstracts); Semantic Scholar bulk search (exact 'superintelligence', year ≤ 1997); Europe PMC (the three strings, 1900–1997); full texts retrieved for this group (Good 1965, Vinge 1993, the Extropians messages of 1996-08-30, 1996-09-03 (two) and 1996-11-19 in the dataset, Bostrom 1997/1998). arXiv API (all fields): earliest record 2014-05-14.",
      years: 'Indexes: up to 1997-12-31. Retrieved texts: 1965–2008.',
      methods:
        "String filters on index titles and abstracts; full-text grep of retrieved texts for 'super-?intellig'; comparison with the dataset's earliest quoted use (Yudkowsky, 'Staring into the Singularity', 1996-11-18 wording attested in a 2000 capture).",
      gaps: "Index hits not retrieved: 'Genes for super-intelligence?' (Journal of Medical Genetics, 1981 and 1982 correspondence; doi 10.1136/jmg.18.6.410 and others; human sense on its face; jmg.bmj.com and pmc.ncbi.nlm.nih.gov answered 403 or a challenge); 'Are all aliens super-intelligent?' (Science and Public Policy, 1987; adjective, aliens); 'Clive Sinclair: towards the superintelligent machine' (Computer Bulletin / ITNOW 32(8), 1990, doi 10.1093/combul/32.8.12; adjective, machine sense on its face; academic.oup.com 403); a 1982 Krankenpflege Journal item '[Superintelligent--but unrecognized]' (adjective, human sense on its face, not opened); Europe PMC full-text hits of 1908–1947 (BMJ 1921, Eugenics Review 1922 and others) whose scans were not served (challenge). Semantic Scholar matched two records (1976, 1994) without visible text; not verified. Books (for example Moravec 1988) and Usenet were not searched; Google Books and the Internet Archive full-text search did not answer. 'Superintelligent' (adjective) is outside the criterion and is listed here only.",
      failures:
        'jmg.bmj.com (403); academic.oup.com (403); pmc.ncbi.nlm.nih.gov PDF of BMJ 1921 (challenge); Google Books API (quota); scholar.archive.org (429); OpenAlex (rate limit).',
      check:
        'A cross-family machine check (item 2) searched again, blind, from fresh retrievals: Earliest located qualifying noun: Jacob T. Schwartz, The Limits of Artificial Intelligence, technical report 212, March 1986, pp. 36–37. This precedes Vinge 1993. The retrieved primary OCR explicitly describes artificial superintelligences with capabilities far exceeding humans.',
    },
    'th-term-large-language-model': {
      venues:
        'ACL Anthology (full bibliography with abstracts, anthology+abstracts.bib.gz, retrieved 2026-10-29: 138,796 entries, 21,003 dated 2007 or earlier, of which 2,178 carry abstracts); Crossref (query.bibliographic, publication date to 2006-12-31, first 50 results); arXiv API (abstract phrase search, submitted 1991-01-01 to 2007-12-31, singular and plural). After the audit: the ISCA Archive (ICSLP 96 found through Semantic Scholar’s abstract search); other speech venues (Eurospeech, ICASSP) were not searched systematically.',
      years:
        'To 2007 for the earliest-located search; 2008-2019 in the ACL Anthology bibliography for later uses.',
      methods:
        'Phrase search "large language model(s)" in titles and abstracts (ACL Anthology bibliography, Crossref, arXiv API); full-text search of the retrieved papers; citation following from Brants et al. 2007 (which cites Emami et al. 2007, "Large-scale distributed language modeling", ICASSP, not retrieved).',
      gaps: 'Title and abstract search only: most pre-2008 ACL entries have no abstract, and full texts were not searched; speech-recognition venues (ICASSP, Interspeech, ICSLP) outside Crossref titles were not searched; Google Scholar and Google Books were not used; non-English expressions were not searched. Crossref returned only "large vocabulary" and "large-scale" titles, none with the phrase.',
      failures:
        'Semantic Scholar search API returned HTTP 429 twice (2026-10-29); no result from it is used.',
      check:
        "A cross-family machine check (item 16) searched again, blind, from fresh retrievals: Earliest located statistical use: Hu, Turin and Brown, ICSLP 1996, Language Modeling with Stochastic Automata. Its exact phrase concerns parameterized statistical language-model size. Earliest inspected neural use located: Radford and colleagues' GPT-2 report (2019 attribution), preceding the November 2019 Witteveen–Andrews paper.",
    },
    'th-term-foundation-model': {
      venues:
        'arXiv API (abstract phrase search "foundation model" and "foundation models", submitted 1991-01-01 to 2021-08-15: 24 results each); ACL Anthology bibliography with abstracts (all entries dated 2021 or earlier).',
      years:
        'To 2021-08-15 (the day before the Bommasani et al. v1 submission).',
      methods:
        'Phrase search in abstracts; for each machine-learning hit, the v1 (and any pre-August-2021 version) PDF was retrieved and searched for the phrase, because the arXiv API searches the latest version.',
      gaps: 'Abstracts only, except for the version checks; full texts of arXiv papers, journals and conference proceedings outside the ACL Anthology were not searched; Google Scholar not used. The ML-sense hits found (arXiv 2010.03688 AxFormer, 2102.12037 conditional VAEs, 1810.13306 AutoML survey, 2101.09858 facial affect review) carry the phrase only in versions revised in 2022 or later: their v1 texts (and 1810.13306v4, 2102.12037v2) do not contain it. No ACL Anthology title or abstract to 2021 contains the phrase.',
      failures: 'none for this search.',
      check:
        'A cross-family machine check (item 17) searched again, blind, from fresh retrievals: Earliest located qualifying name: Bommasani and colleagues, On the Opportunities and Risks of Foundation Models, arXiv v1 submitted August 16, 2021. The v1 abstract defines models trained on broad data at scale and adaptable to many downstream tasks, then explicitly calls them foundation models.',
    },
  },
  attributed: {
    'th-term-agi': [
      'th-credit-goertzel-2011-legg',
      'th-credit-goertzel-2011-self',
      'th-credit-goertzel-2011-gubrud',
    ],
    'th-term-artificial-intelligence': ['th-credit-mccarthy-review-term'],
    'th-term-deep-learning': [
      'th-dl-credit-schmidhuber2014-2006',
      'th-dl-credit-schmidhuber2022-dechter',
      'th-dl-credit-schmidhuber2022-aizenberg',
    ],
    'th-term-large-language-model': [
      'th-term-llm-zhao-credits-chinchilla',
      'th-term-llm-zhao-credits-cot',
    ],
    'th-fam-connectionism': [
      'th-cn-credit-pdp8-parker',
      'th-cn-credit-pdp8-lecun',
      'th-cn-credit-lbh-werbos',
      'th-cn-credit-schmidhuber2014-linnainmaa',
      'th-cn-credit-schmidhuberbp-linnainmaa',
      'th-cn-credit-schmidhuberbp-kelley',
      'th-cn-credit-schmidhuberbp-werbos',
    ],
    'reinforcement-learning': [
      'th-rl-sb-credits-minsky-1954',
      'th-rl-sutton-1988-credits-samuel',
      'th-rl-sb-credits-samuel',
      'th-rl-sb-credits-watkins',
    ],
    'th-fam-evolutionary': ['th-evo-koza-credits-holland'],
    'th-fam-statistical-learning': [
      'th-stat-burges-credits-boser',
      'th-stat-burges-credits-cortes',
    ],
    'th-fam-neurosymbolic': [
      'th-ns-marcus-credits-mao',
      'th-ns-garcez-lamb-credits-kautz',
    ],
    'th-fam-transformers-llm': ['th-fam-tllm-attention-credits-bahdanau'],
    'th-fam-symbolic-ai': [
      'th-sym-credit-feigenbaum-1977-michie',
      'th-sym-credit-feigenbaum-1977-self',
      'th-sym-credit-buchanan-shortliffe-1984-feigenbaum',
    ],
    'th-fam-logic-programming': [
      'th-lp-credit-kowalski-1988-prolog-name',
      'th-lp-credit-colmerauer-1992-prolog-name',
      'th-lp-credit-kowalski-1988-colmerauer',
    ],
  },
  corrections: [
    {
      conceptId: 'th-term-superintelligence',
      replaced:
        'Vinge’s paper in the VISION-21 proceedings (December 1993), headlined as earliest located by the research pack of 2026-10-29.',
      reason:
        'The cross-family check located Schwartz’s technical report of March 1986, which uses the plural noun for artificial minds exceeding human ability. It is read in OCR text, not a page facsimile.',
      claimIds: ['th-term-si-vinge-1993', 'th-term-si-schwartz-1986'],
      recordedAt: admitted,
    },
    {
      conceptId: 'th-term-deep-learning',
      replaced:
        'Weston, Ratle and Collobert’s ICML 2008 paper, headlined as earliest located by the research pack of 2026-10-29.',
      reason:
        'The cross-family check opened an archive capture of the NIPS 2007 Deep Learning Workshop page of 18 October 2007; the page’s revision is dated 12 October 2007 and the workshop was planned for 6 December 2007.',
      claimIds: ['th-dl-term-weston-2008', 'th-term-dl-nips-2007'],
      recordedAt: admitted,
    },
    {
      conceptId: 'th-term-agi',
      replaced:
        'A withheld role: the research pack’s audit withheld it on 2026-10-29 because Gubrud’s 1997 paper was read only in an undated current copy.',
      reason:
        'The cross-family check opened an archive capture of the paper’s original address dated 7 February 1998, which attests the wording by that date. The November 1997 conference date is shown only as stated.',
      claimIds: ['th-term-agi-gubrud-1997'],
      recordedAt: admitted,
    },
    {
      conceptId: 'th-term-large-language-model',
      replaced:
        'Brants and others, Large Language Models in Machine Translation (June 2007), headlined in a draft of the research pack.',
      reason:
        'The research pack’s same-family audit found Hu, Turin and Brown’s ICSLP 96 paper (October 1996), which uses the phrase in the same statistical sense.',
      claimIds: ['th-term-llm-brants-2007', 'th-term-llm-hu-1996'],
      recordedAt: '2026-10-29',
    },
  ],
  limits: [
    '“Earliest located” means the earliest text found by the searches described for each family or name. It is not a claim of first use, coinage or origin.',
    'A naming record says that a text uses a name. A defining statement says what a text says a family is. Neither says where a family began, and the order of texts establishes no influence.',
    'Where a quoted wording survives only in a later copy, such as an archive capture or a reprint, the date from which it is attested decides which text is earliest located, and both dates are shown.',
    'Six families and the name ‘machine learning’ have no earliest located use for now. Their earliest leads are known only from index titles, citations or undated copies, or, for statistical learning, a dated candidate that has been read (Valiant, 1984) must first be reconciled with the criterion. The role waits until then, and each names its leads.',
    'Attributed statements record what a text says about who named or devised something. Where texts disagree they are shown side by side and not resolved.',
    'A machine selected and classified these records. A same-family audit and a check by a model from another family re-examined them. No person has reviewed them.',
  ],
};
