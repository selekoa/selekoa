// Writes drafts/sources.json: the source registry for the laws-compared pack.
// Hash, status and retrieval date come from the ignored retrieval cache; archive
// captures from the Internet Archive availability API (unchecked: capture pages
// themselves could not be opened from this environment).
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, '..', '..');
const CACHE = join(ROOT, '.local', 'laws-compared', 'doc');
const ds = JSON.parse(readFileSync(join(ROOT, 'data', 'sources.json'), 'utf8'));
const dsById = new Map(ds.map((s) => [s.id, s]));
const S = [
  {
    key: 'eu-ai-act',
    datasetSource: 'source-eu-ai-act-2024',
    documentId: 'eu-ai-act-2024',
    url: 'http://publications.europa.eu/resource/cellar/dc8116a1-3fe6-11ef-865a-01aa75ed71a1.0006.03/DOC_1',
    officialUrl:
      'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401689',
    language: 'en',
    title:
      'Regulation (EU) 2024/1689 (Artificial Intelligence Act), Official Journal L series 2024/1689 of 12.7.2024, English XHTML from the Publications Office repository (Cellar)',
    publisher: 'Publications Office of the European Union',
    version:
      'Official Journal text as published on 12.7.2024. Amendments made by Regulation (EU) 2026/1744 are not applied to this text; they are read in source eu-omnibus. EUR-Lex returned HTTP 202 with an empty body, as in earlier packs; Cellar serves the same Official Journal manifestation (same SHA-256 as the ai-bio pack copy of 2026-10-28).',
  },
  {
    key: 'eu-omnibus',
    datasetSource: 'source-eu-digital-omnibus-ai-2026',
    documentId: 'eu-digital-omnibus-ai-2026',
    url: 'http://publications.europa.eu/resource/cellar/b459c07f-86fb-11f1-bf5e-01aa75ed71a1.0006.03/DOC_1',
    officialUrl:
      'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744',
    language: 'en',
    title:
      'Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal L series 2026/1744 of 24.7.2026, English XHTML from Cellar',
    publisher: 'Publications Office of the European Union',
    version: 'Official Journal text as published on 24.7.2026.',
  },
  {
    key: 'eu-cop-ss',
    datasetSource: 'source-eu-code-safety-security',
    documentId: 'gpai-code-of-practice-2025',
    url: 'https://ec.europa.eu/newsroom/dae/redirection/document/118119',
    language: 'en',
    title:
      'General-Purpose AI Code of Practice: Safety and Security chapter (final version, 10 July 2025)',
    publisher: 'European Commission (AI Office)',
    version:
      'PDF served on 2026-11-01. The dataset records the same 15,392-word text in the Internet Archive capture of 2025-07-10, with different PDF pagination; page numbers below are those of the file served on 2026-11-01.',
  },
  {
    key: 'ca-sb53',
    datasetSource: 'source-ca-sb53-chaptered',
    documentId: 'california-sb-53',
    url: 'https://downloads.leginfo.legislature.ca.gov/pubinfo_2025.zip',
    officialUrl:
      'https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53',
    language: 'en',
    title:
      'SB 53 (2025–2026), chaptered version 20250SB5390CHP (Chapter 138, Statutes of 2025), CAML XML record BILL_VERSION_TBL_8965.lob in the Legislative Counsel’s public database file pubinfo_2025.zip',
    publisher:
      'California Legislative Counsel Bureau (legislative information database, downloads.leginfo.legislature.ca.gov)',
    version:
      'Chaptered version 90, dated 2025-09-29, read from the Legislative Counsel’s bulk database file pubinfo_2025.zip (last modified 26 October 2026) by byte-range retrieval of one archive member; the SHA-256 is that of the extracted member. leginfo.legislature.ca.gov refused (HTTP 403) on 2026-11-01. Same version as the dataset source, a different manifestation; the quotation budget is shared with it. The database’s law-section table (load of 2026-10-03) shows Business and Professions Code §§ 22757.10–22757.16, Government Code § 11546.8 and Labor Code §§ 1107–1107.2 as “Added by Stats. 2025, Ch. 138” with no later amendment.',
  },
  {
    key: 'ny-s6953b',
    datasetSource: 'source-ny-s6953b-2025',
    documentId: 'ny-raise-act-chapter-699-2025',
    url: 'https://legislation.nysenate.gov/pdf/bills/2025/S6953B',
    language: 'en',
    title:
      'New York Senate Bill S6953-B (2025–2026), print as amended 9 June 2025',
    publisher: 'New York State Senate, Open Legislation',
    version:
      'Print S6953-B, the print signed as Chapter 699 of 2025 according to the Assembly bill record (ny-s6953-assembly). The chapter as printed in the session laws was not inspected.',
  },
  {
    key: 'ny-s6953-assembly',
    datasetSource: 'source-ny-s6953-assembly-record',
    documentId: 'ny-raise-act-chapter-699-2025',
    url: 'https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S06953&term=2025&Summary=Y&Actions=Y',
    language: 'en',
    title:
      'New York S06953: summary and actions (New York State Assembly bill search)',
    publisher: 'New York State Assembly',
    version:
      'Bill-search page retrieved 2026-11-01, action list ending 12/19/2025 SIGNED CHAP.699 and APPROVAL MEMO.76.',
  },
  {
    key: 'ny-s8828',
    datasetSource: 'source-ny-s8828-assembly-record',
    documentId: 'new-york-raise-act-chapter-96-2026',
    url: 'https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S8828&term=2025&Summary=Y&Actions=Y&Text=Y',
    language: 'en',
    title:
      'New York S08828 / A09449: summary, actions and text (New York State Assembly bill search)',
    publisher: 'New York State Assembly',
    version:
      'Bill-search page retrieved 2026-11-01, showing the action list ending 03/27/2026 SIGNED CHAP.96 and the bill text. The chapter as printed in the session laws was not inspected. The Senate’s PDF of S8828 (legislation.nysenate.gov/pdf/bills/2025/S8828, SHA-256 d6973fcb7696f5cb5c809aa414e0ce9ce30b7193f76fdf95c38333afe4c9785e) was retrieved as a cross-check copy and not quoted.',
  },
  {
    key: 'cn-genai',
    datasetSource: 'source-cn-generative-ai-measures-2023-govcn',
    sharedBudgetWith: ['source-cn-generative-ai-measures-2023'],
    documentId: 'cn-generative-ai-interim-measures-2023',
    url: 'https://www.gov.cn/zhengce/zhengceku/202307/content_6891752.htm',
    language: 'zh-Hans',
    title:
      '生成式人工智能服务管理暂行办法 (Interim Measures for the Management of Generative Artificial Intelligence Services), gov.cn State Council policy library copy',
    publisher: '中国政府网 (www.gov.cn), 国务院政策文件库',
    version:
      'gov.cn policy-library page (source given as 国家网信办网站; 成文日期 2023-07-10), same SHA-256 as the frameworks-to-law pack’s copy of 2026-10-27. cac.gov.cn was not retrieved. The page body repeats the text twice (a print copy).',
  },
  {
    key: 'cn-labelling',
    datasetSource: 'source-cn-labelling-measures-2025',
    documentId: 'cn-ai-content-labelling-measures-2025',
    url: 'https://www.gov.cn/zhengce/zhengceku/202503/content_7014286.htm',
    language: 'zh-Hans',
    title:
      '关于印发《人工智能生成合成内容标识办法》的通知 (Notice on issuing the Measures for Labelling AI-Generated Synthetic Content), 国信办通字〔2025〕2号',
    publisher: '中国政府网 (www.gov.cn), 国务院政策文件库',
    version:
      'gov.cn policy-library page (source given as 国家网信办网站; 成文日期 2025-03-07), same SHA-256 as the dataset source’s copy of 2026-10-27.',
  },
  {
    key: 'cn-gb45438',
    datasetSource: 'source-cn-gb-45438-2025-catalogue',
    documentId: 'cn-gb-45438-2025',
    url: 'https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=F32EA2A561F1886CD8D606513512D547',
    language: 'zh-Hans',
    title:
      'GB 45438-2025 网络安全技术 人工智能生成合成内容标识方法 (catalogue entry, 国家标准全文公开系统)',
    publisher: '国家市场监督管理总局、国家标准化管理委员会 (catalogue)',
    version:
      'Catalogue entry only; the standard’s text was not retrieved (the download address returned the catalogue page).',
  },
  {
    key: 'cn-csl',
    datasetSource: 'source-cn-csl-amendment-2025',
    documentId: 'cn-cybersecurity-law-amendment-2025',
    url: 'https://www.gov.cn/yaowen/liebiao/202510/content_7046194.htm',
    language: 'zh-Hans',
    title:
      '全国人民代表大会常务委员会关于修改《中华人民共和国网络安全法》的决定 (Decision on Amending the Cybersecurity Law), gov.cn copy of the Xinhua release',
    publisher: '中国政府网 (www.gov.cn)',
    version:
      'gov.cn news-list page dated 2025-10-29, same SHA-256 as the dataset source’s copy.',
  },
  {
    key: 'us-eo14110',
    datasetSource: 'source-us-eo-14110-fr',
    documentId: 'us-eo-14110-2023',
    url: 'https://www.govinfo.gov/content/pkg/FR-2023-11-01/pdf/2023-24283.pdf',
    language: 'en',
    title:
      'Executive Order 14110 of October 30, 2023, Safe, Secure, and Trustworthy Development and Use of Artificial Intelligence (88 FR 75191)',
    publisher:
      'Federal Register (Office of the Federal Register, National Archives) via govinfo.gov',
    version: 'Federal Register PDF of 1 November 2023.',
  },
  {
    key: 'us-eo14148',
    datasetSource: 'source-us-eo-14148-fr',
    documentId: 'us-eo-14148-2025',
    url: 'https://www.govinfo.gov/content/pkg/FR-2025-01-28/pdf/2025-01901.pdf',
    language: 'en',
    title:
      'Executive Order 14148 of January 20, 2025, Initial Rescissions of Harmful Executive Orders and Actions (90 FR 8237)',
    publisher: 'Federal Register via govinfo.gov',
    version: 'Federal Register PDF of 28 January 2025.',
  },
  {
    key: 'us-bis-ifr',
    datasetSource: 'source-us-bis-ai-diffusion-ifr-fr',
    documentId: 'us-bis-ai-diffusion-ifr-2025',
    url: 'https://www.govinfo.gov/content/pkg/FR-2025-01-15/pdf/2025-00636.pdf',
    language: 'en',
    title:
      'Framework for Artificial Intelligence Diffusion (interim final rule, 90 FR 4544)',
    publisher: 'Federal Register via govinfo.gov',
    version:
      'Federal Register PDF of 15 January 2025, same SHA-256 as the dataset source’s copy of 2026-10-27. NIST and BIS pages served after late September 2026 may carry changed terms (see the frameworks-to-law pack); this Federal Register PDF is a fixed publication.',
  },
  {
    key: 'bis-rescission',
    datasetSource: null,
    documentId: 'us-bis-ai-diffusion-ifr-2025',
    url: 'https://www.bis.gov/press-release/department-commerce-announces-rescission-biden-era-artificial-intelligence-diffusion-rule-strengthens',
    language: 'en',
    title:
      'Department of Commerce Announces Rescission of Biden-Era Artificial Intelligence Diffusion Rule, Strengthens Chip-Related Export Controls (BIS press release)',
    publisher: 'Bureau of Industry and Security',
    version:
      'Page served on 2026-11-01. A page served after late September 2026 may not be the text as first released.',
  },
  {
    key: 'us-eo14409',
    datasetSource: 'source-us-eo-14409-fr',
    documentId: 'us-eo-14409-2026',
    url: 'https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf',
    language: 'en',
    title:
      'Executive Order 14409 of June 2, 2026, Promoting Advanced Artificial Intelligence Innovation and Security',
    publisher: 'Federal Register via govinfo.gov',
    version: 'Federal Register PDF of 5 June 2026.',
  },
  {
    key: 'uk-ks2026',
    datasetSource: 'source-uk-kings-speech-2026-notes',
    documentId: 'uk-kings-speech-2026-notes',
    url: 'https://assets.publishing.service.gov.uk/media/6a18713db95db968c8f3bbfd/The_King_s_Speech_2026_-_background_briefing_notes.pdf',
    language: 'en',
    title: 'The King’s Speech 2026: background briefing notes',
    publisher: 'Prime Minister’s Office (GOV.UK)',
    version: 'PDF served on 2026-11-01.',
  },
  {
    key: 'uk-ks2024',
    datasetSource: 'source-uk-kings-speech-2024',
    documentId: 'uk-kings-speech-2024',
    url: 'https://www.gov.uk/government/speeches/the-kings-speech-2024',
    language: 'en',
    title: 'The King’s Speech 2024',
    publisher: 'Prime Minister’s Office (GOV.UK)',
    version: 'Page served on 2026-11-01.',
  },
  {
    key: 'uk-mou-openai',
    datasetSource: 'source-uk-openai-mou-2025',
    documentId: 'uk-openai-mou-2025',
    url: 'https://www.gov.uk/government/publications/memorandum-of-understanding-between-the-uk-and-openai-on-ai-opportunities/memorandum-of-understanding-between-uk-and-openai-on-ai-opportunities',
    language: 'en',
    title:
      'Memorandum of Understanding between the UK and OpenAI on AI opportunities',
    publisher: 'Department for Science, Innovation and Technology (GOV.UK)',
    version: 'Page served on 2026-11-01.',
  },
  {
    key: 'uk-si-2026-425',
    datasetSource: null,
    documentId: null,
    url: 'https://www.legislation.gov.uk/uksi/2026/425/made',
    language: 'en',
    title:
      'The Data Protection Act 2018 (Code of Practice on Artificial Intelligence and Automated Decision-Making) Regulations 2026 (SI 2026/425), as made',
    publisher: 'legislation.gov.uk (The National Archives)',
    version:
      'Original (as made) version, made 16 April 2026, served on 2026-11-01. Found by the legislation.gov.uk title searches recorded in the UK finding (feeds cached as uk-leg-ai-2023 to uk-leg-ai-2026, not quoted).',
  },
];
const cjkCount = (t) => (t.match(/[㐀-鿿]/g) ?? []).length;
const words = (t) => t.trim().split(/\s+/).filter(Boolean).length;
process.argv[2] = 'none';
const { cachedText } = await import('./tools.mjs');
const out = [];
for (const s of S) {
  const meta = JSON.parse(readFileSync(join(CACHE, `${s.key}.json`), 'utf8'));
  const d = s.datasetSource ? dsById.get(s.datasetSource) : null;
  let documentWords;
  if (d?.documentWords)
    documentWords = {
      count: d.documentWords.count,
      basis: `Taken over from dataset source ${d.id}; the quotation budget is shared with it.`,
    };
  else {
    const t = cachedText(s.key) ?? '';
    documentWords = s.language.startsWith('zh')
      ? {
          count: cjkCount(t),
          basis: 'Han characters of the cached page text, counted 2026-11-01',
        }
      : {
          count: words(t),
          basis:
            'Whitespace-separated words of the cached text, counted 2026-11-01 (includes page furniture)',
        };
  }
  let archive = {
    capture: d?.archivedUrl ?? null,
    capturedAt: d?.archivedAt ?? null,
    via: d?.archivedUrl ? `dataset source ${d.id}` : null,
    checked: false,
  };
  if (!archive.capture) {
    try {
      const q = encodeURIComponent(s.url.replace(/^https?:\/\//, ''));
      const r = JSON.parse(
        execFileSync(
          'curl',
          ['-sS', '-m', '40', `http://archive.org/wayback/available?url=${q}`],
          { encoding: 'utf8' },
        ),
      );
      const c = r.archived_snapshots?.closest;
      if (c?.available)
        archive = {
          capture: c.url,
          capturedAt: `${c.timestamp.slice(0, 4)}-${c.timestamp.slice(4, 6)}-${c.timestamp.slice(6, 8)}`,
          via: 'Internet Archive availability API, 2026-11-01',
          checked: false,
        };
      else
        archive = {
          capture: null,
          capturedAt: null,
          via: 'Internet Archive availability API, 2026-11-01: no capture listed',
          checked: false,
        };
    } catch {
      archive = {
        capture: null,
        capturedAt: null,
        via: 'availability API request failed',
        checked: false,
      };
    }
  }
  out.push({
    ...s,
    cacheKey: s.key,
    httpStatus: meta.httpStatus,
    sha256: meta.sha256,
    retrievedAt: meta.retrievedAt.slice(0, 10),
    documentWords,
    archive,
  });
}
writeFileSync(
  join(DIR, 'drafts', 'sources.json'),
  JSON.stringify(out, null, 2) + '\n',
);
console.log(
  out
    .map(
      (s) =>
        `${s.key}\t${s.documentWords.count}\t${s.archive.capture ?? s.archive.via}`,
    )
    .join('\n'),
);
