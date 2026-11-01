// Preparer's corrections to index metadata and the text address read for papers without an arXiv
// expression. Each entry gives its reason; nothing here changes a count.
export const CURATION = {
  'kp-superintelligence-paths-dangers-strategies-2014': {
    doi: null,
    reason:
      'The index DOI (10.5860/choice.187536) is a review in Choice, not the book. The book (Oxford University Press, 2014) has no DOI in the sources read; its text was not retrieved.',
    textUrl: null,
    bibUrl:
      'https://global.oup.com/academic/product/superintelligence-9780199678112',
  },
  'kp-ai-risk-management-framework-2023': {
    textUrl: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    titleAsPrinted:
      'Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
    versions: [
      {
        kind: 'publication (report series)',
        label: 'NIST AI 100-1',
        date: '2023-01',
        precision: 'month',
        basis: 'title page of the PDF read ("January 2023")',
      },
    ],
    reason:
      'The index gives a short title; the title page prints "Artificial Intelligence Risk Management Framework (AI RMF 1.0)" and "January 2023" (corrected after the same-family audit).',
  },
  'kp-language-models-unsupervised-multitask-learners-2019': {
    textUrl:
      'https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf',
  },
  'kp-improving-language-understanding-by-generative-2018': {
    textUrl:
      'https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf',
  },
  'kp-basic-ai-drives-2008': {
    doi: null,
    reason:
      'The index DOI (10.1201/9781351251389-3) is a 2018 reprint in an edited volume; the paper read is the 2008 proceedings text as posted by its author.',
    textUrl:
      'https://selfawaresystems.com/wp-content/uploads/2008/01/ai_drives_final.pdf',
  },
  'kp-algorithms-inverse-reinforcement-learning-2000': {
    doi: null,
    reason:
      'The index DOI (10.2460/ajvr.67.2.323) belongs to an article in the American Journal of Veterinary Research, not this paper.',
    textUrl: 'http://ai.stanford.edu/~ang/papers/icml00-irl.pdf',
  },
  'kp-imagenet-classification-deep-convolutional-neural-2012': {
    doi: null,
    reason:
      'The index DOI (10.1145/3065386) is the 2017 Communications of the ACM reprint; the paper read is the NIPS 2012 proceedings text.',
    textUrl:
      'https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf',
    bibUrl:
      'https://proceedings.neurips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html',
    versions: [
      {
        kind: 'conference publication',
        label:
          'Advances in Neural Information Processing Systems 25 (NIPS 2012)',
        date: '2012',
        precision: 'year',
        basis:
          'NeurIPS proceedings page (retrieved; also read by the same-family audit)',
        source:
          'kp-imagenet-classification-deep-convolutional-neural-2012--bib',
      },
    ],
  },
  'kp-long-short-term-memory-1997': {
    textUrl: 'https://deeplearning.cs.cmu.edu/F23/document/readings/LSTM.pdf',
    reason:
      "The authors' institute copy (bioinf.jku.at) did not answer; the text read is a copy of the Neural Computation article posted on a Carnegie Mellon course site, not the publisher's.",
  },
  'kp-zero-memory-optimizations-toward-training-2019': {
    pdfVersion: 'v2',
    reason:
      'arXiv lists v1 (4 October 2019) as withdrawn and serves no PDF for it; the text read is v2 (7 October 2019).',
  },
  'kp-natural-questions-benchmark-question-answering-2019': {
    textUrl: 'https://aclanthology.org/Q19-1026.pdf',
  },
  'kp-robots-jobs-evidence-from-us-2019': {
    textUrl:
      'https://www.nber.org/system/files/working_papers/w23285/w23285.pdf',
    reason:
      'The journal text (Journal of Political Economy, 2020) is not open; the NBER working paper (w23285, 2017) is read and its quotations are scoped to it.',
  },
  'kp-adversarial-winograd-schema-challenge-at-2019': {
    titleAsPrinted:
      'WinoGrande: An Adversarial Winograd Schema Challenge at Scale',
    arxiv: '1907.10641',
    reason:
      'arXiv identifier missing from the index record; the arXiv abstract page carries the same title.',
  },
  'kp-human-level-control-through-deep-2015': {
    textUrl: 'https://www.nature.com/articles/nature14236',
    reason:
      'Publisher page; the article text is not open. Quotations come from the abstract on that page.',
  },
  'kp-mastering-game-go-deep-neural-2016': {
    textUrl: 'https://www.nature.com/articles/nature16961',
    reason: 'Publisher page; quotations come from the abstract on that page.',
  },
  'kp-superintelligent-will-motivation-instrumental-rationality-2012': {
    textUrl: 'https://nickbostrom.com/superintelligentwill.pdf',
  },
  'kp-random-forests-2001': {
    textUrl: 'https://link.springer.com/article/10.1023/A:1010933404324',
    reason: 'Publisher page; quotations come from the abstract on that page.',
  },
  'kp-gradient-based-learning-applied-document-1998': {
    textUrl: 'http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf',
  },
  'kp-dropout-simple-way-prevent-neural-2014': {
    doi: null,
    reason:
      'The index DOI (10.5555/…) is an ACM Digital Library record; the paper read is the JMLR text.',
    textUrl: 'https://jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf',
  },
  'kp-deepseek-r1-incentivizing-reasoning-capability-2025': {
    bylineCollective: 'DeepSeek-AI',
    reason:
      'The first page prints the collective byline "DeepSeek-AI"; individual contributors are listed in the paper\'s contributions section, not in the byline. No individual authorship records are proposed.',
  },
  'kp-gpt-4-technical-report-2023': {
    bylineCollective: 'OpenAI',
    reason:
      'The first page prints the collective byline "OpenAI"; contributors are listed in the paper\'s contributions section. No individual authorship records are proposed.',
  },
};
