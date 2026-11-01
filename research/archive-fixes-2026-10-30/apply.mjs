// Applies the maintainer's decision of 2026-10-30 on the cross-family archive
// verification of 2026-10-28 (research/archive-verification-2026-10-28/
// codex-report.json) and the link-health report of 2026-10-29
// (review/link-health-2026-10-29.json), the maintainer's decisions of the same
// day on the fixes this script first held, and the narrowing of criterion O7 in
// "Arguments about compute in orbit". Record: review/archive-fixes-2026-10-30.md.
//
//   node research/archive-fixes-2026-10-30/apply.mjs
//
// Every change is made here, from the dataset as stored at the base commit, so
// the script can be re-run and gives the same result. It was first run on
// 9e7f400 (release v0.12.1) and is now run on 1875b85 (release v0.14.0), after
// main was merged into the branch; the 91 sources added by part 2 of the
// compute, power and orbit admission are outside the report's scope. It writes data/*.json,
// the before-snapshot review/archive-fixes-before-2026-10-30.json and the list
// of changes and holds research/archive-fixes-2026-10-30/changes.json, from
// which the record's tables are written.
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', '..');
const BASE = '1875b85';
const RECORDED = '2026-10-30';
const SNAPSHOT = 'review/archive-fixes-before-2026-10-30.json';
const CHANGES = 'research/archive-fixes-2026-10-30/changes.json';
const REPORT = 'research/archive-verification-2026-10-28/codex-report.json';
const LINK_HEALTH = 'review/link-health-2026-10-29.json';
const names = ['entities', 'claims', 'sources', 'evidence'];
const atBase = (file) =>
  JSON.parse(
    execSync(`git show ${BASE}:${file}`, {
      cwd: ROOT,
      maxBuffer: 1 << 28,
    }).toString(),
  );
const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
const writeJson = (p, v) =>
  writeFileSync(join(ROOT, p), JSON.stringify(v, null, 2) + '\n');
const data = {
  meta: atBase('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, atBase(`data/${n}.json`)])),
};
const sha = (v) => createHash('sha256').update(JSON.stringify(v)).digest('hex');
const priorMeta = structuredClone(data.meta);
const priorSha = Object.fromEntries(
  [...names, 'meta'].map((n) => [n, sha(data[n])]),
);
const report = readJson(REPORT);
const linkHealth = readJson(LINK_HEALTH);

const before = { entities: [], claims: [], sources: [], evidence: [] };
const added = { entities: [], claims: [], sources: [], evidence: [] };
const index = Object.fromEntries(
  names.map((n) => [n, new Map(data[n].map((r) => [r.id, r]))]),
);
const find = (name, id) => {
  const row = index[name].get(id);
  if (!row) throw new Error(`No ${name} row ${id}`);
  return row;
};
/** Changes a stored row in place, keeping its earlier state for the snapshot. */
function change(name, id, fn) {
  const row = find(name, id);
  if (!before[name].some((r) => r.id === id))
    before[name].push(structuredClone(row));
  fn(row);
  return row;
}

const log = {
  links: [],
  captureChanges: [],
  quotations: [],
  locators: [],
  urls: [],
  held: [],
  unchanged: [],
};
const hold = (kind, ids, n, reason) => log.held.push({ kind, ids, n, reason });

// The day of a Wayback capture, from its timestamp.
const captureDay = (url) => {
  const m = url.match(
    /^https:\/\/web\.archive\.org\/web\/(\d{4})(\d{2})(\d{2})\d{6}\//,
  );
  if (!m) throw new Error(`Not a Wayback capture URL: ${url}`);
  return `${m[1]}-${m[2]}-${m[3]}`;
};
// The day the check read the capture it used (its successful replay).
const readDay = (item) => {
  const hit = item.attempts.find(
    (a) => a.url === item.capture.rawUrl && a.httpStatus === 200,
  );
  const at = hit?.checkedAt ?? item.completedAt;
  if (!at) throw new Error(`No read date for item ${item.n}`);
  return at.slice(0, 10);
};

// Evidence on a passage that bears a proposition collection's headline role
// (earliest located, earliest located use of the name, earliest located
// tier 2, most developed) was first held under the override rule. The
// maintainer's decision of 2026-10-30 (open decision 1) applies the capture's
// typography to these passages; their wording is unchanged. The note says so.
const HEADLINE_ROLES = new Set([
  'earliest-located',
  'earliest-located-term',
  'earliest-located-tier-2',
  'most-developed',
]);
const headlineRoles = (evidenceId) => {
  const claim = find('claims', find('evidence', evidenceId).claimId);
  return (claim.attributes?.thought?.roles ?? []).filter((r) =>
    HEADLINE_ROLES.has(r),
  );
};

// Another evidence record on a headline passage that quotes the same passage
// of the same source, as stored at the base (the loop corrects passages).
const basePassage = new Map(data.evidence.map((e) => [e.id, e.passage]));
const headlineTwin = (e) =>
  data.evidence.find(
    (o) =>
      o.id !== e.id &&
      o.sourceId === e.sourceId &&
      basePassage.get(o.id) === basePassage.get(e.id) &&
      headlineRoles(o.id).length,
  )?.id;

// ---------------------------------------------------------------------------
// Holds decided by reading the report item by item (see the record).
const HELD_QUOTATIONS = {
  'lg-ev-ant-matheny-ltbt-departure-2023':
    'The cited 2023 capture predates the dated departure footnote; a later capture that contains it is needed (report item 26).',
  'lg-ev-ant-bahl-ltbt-departure-2026':
    'The cited 2023 capture predates the dated departure footnote; a later capture that contains it is needed (report item 26).',
  'lg-ev-ant-robinson-ltbt-departure-2026':
    'The cited 2023 capture predates the dated departure footnote; a later capture that contains it is needed (report item 26).',
  'evidence-assessed-preparedness-v2-high-deployment-mitigation-coggins-conclusion':
    'The cited capture is the arXiv abstract page, not the full text; an archived full-text PDF is needed (report item 61).',
  'evidence-assessed-preparedness-v2-high-deployment-mitigation-coggins-ceo':
    'The cited capture is the arXiv abstract page, not the full text; an archived full-text PDF is needed (report item 61).',
  'evidence-ts-a1-butler-1863-context':
    'No change: the difference is a space before a semicolon in the newspaper OCR; the report recommends inspecting the page image first (report item 35).',
  'evidence-ts-a4-butler-1863-context':
    'No change: the difference is a space before a semicolon in the newspaper OCR; the report recommends inspecting the page image first (report item 35).',
  'evidence-ts-a6-grace-2014-treacherous-turn':
    'The " / " joins a bullet and its sub-bullet; the locator does not say so, as other records using this notation do. Recommended: add the notation to the locator (report item 111).',
  'evidence-ap-vladimir-mikulik-rlo-2019-deceptive-alignment':
    'The authorship record quotes the name “Vlad Mikulik” from the publisher’s post data; the capture’s byline reads “Vladimir Mikulik”. Changing the quoted name changes what the record says (report item 148).',
  'evidence-ap-mark-rosenfelder-rosenfelder-1992-real-life-turing-test':
    'The captured message header gives an address only, no name; the authorship record needs another attribution or a different locator (report item 644).',
};
// Human-reviewed evidence: the maintainer's decision of 2026-10-30 (open
// decision 2) drops the final full stop, which the capture lacks. The review
// date and reviewer stay; the note records the change.
const LEVY = 'evidence-levy-brain-intern-2017-cv';
const HELD_LINKS = {
  'source-rosenfelder-1992-real-life-turing-test':
    'The capture does not show the quoted sender name; held with its authorship quotation (report item 644).',
};
// Sources whose cited capture failed in the check: replaced by the capture the
// check used, or held.
const CAPTURE_CHANGES = {
  'source-eu-commission-opinion-2025':
    'The cited capture of 2025-08-13 holds only an empty redirect; the document was read in the capture of 2025-10-06 it redirects to.',
  'source-loosemore-2015-debunking-fallacies':
    'The cited capture of 2019-04-28 is an empty application shell without the article.',
  'source-openai-christiano-2026':
    'The cited capture of 2026-09-09 could not be replayed (a decoding error, then a timeout); the check read the capture of the next day at the same address.',
  'source-sl4-2002-03-08-yudkowsky':
    'The cited capture of 2004-09-15 serves a different message at this address; the capture of 2007-05-05 serves the cited message.',
};
// Sources that took a merged record's archive copy on 2026-10-29, after the
// item list was built: the check read a later capture of the kept record.
const MERGED_CAPTURES = {
  'source-atlas-openai-leadership': {
    kind: 'unchanged',
    reason:
      'Kept. Its archive copy of 2023-11-17 came from the merged source-openai-leadership-transition-2023, whose item (137) verified that capture; this item read a capture of 2026-09-14.',
  },
  'source-atlas-openai-return': {
    kind: 'unchanged',
    reason:
      'Kept by the maintainer’s decision of 2026-10-30 (open decision 4) until it is re-read. Its archive copy of 2023-11-30 came from the merged source-openai-new-initial-board-2023; item 138 could not replay it (a timeout) and verified a capture of 2024-05-02 at the renamed /index/ path, and this item one of 2026-09-13. A timeout does not show the capture is broken, and the 2023 copy is the one closest to publication.',
  },
};
const MERGED_INTO = {
  'source-openai-leadership-transition-2023': 'source-atlas-openai-leadership',
  'source-openai-new-initial-board-2023': 'source-atlas-openai-return',
  'source-eval-ontology-i-claude2-card': 'source-eval-i-claude2-card',
  'source-eval-ontology-i-gpt4-card': 'source-eval-i-gpt4-card',
  'source-eval-ontology-i-metr-name': 'source-eval-i-metr-name',
  'source-eval-ontology-i-spinout': 'source-eval-i-spinout',
};
// Manual quotation fixes: wording the report gives that is not a 1:1
// typographic substitution. Each keeps the proposition.
const MANUAL_QUOTATIONS = {
  'evidence-cm-eu-code-published-1': {
    passage:
      'Today, the European Commission has received the final version of the General-Purpose AI Code of Practice',
    what: 'the opening word “Today,” restored, so the quotation no longer capitalises “the”',
  },
  'evidence-eutm-top-domain-names-2': {
    passage:
      'Small and medium-sized enterprises (SMEs), including start-ups, should disclose top 5% of all domain names or 1 000 internet domain names, whichever is lower.',
    what: 'the digit-grouping space in “1 000”, as printed',
  },
  'evidence-rsp-v2-0-assessed-weakening-saferai-title': {
    passage:
      'Anthropic’s Responsible Scaling Policy Update Makes a Step Backwards',
    what: 'the headline’s capitalisation, as printed',
  },
};
const LOCATORS = {
  'evidence-ts-a5-solomonoff-1985': {
    from: 'Main text, discussion of milestone F (PDF page 4)',
    to: 'Main text, discussion of milestone F (PDF page 5, printed page 5)',
    n: 168,
  },
};

// ---------------------------------------------------------------------------
// Typographic correction: the stored passage with each quotation mark,
// apostrophe or comma replaced by the capture's form at the same place.
// Editorial elision marks stay as stored.
const QUOTES = new Set(["'", '"', '‘', '’', '“', '”']);
const COMMAS = new Set([',', '，']);
const same = (a, b) =>
  (QUOTES.has(a) && QUOTES.has(b)) || (COMMAS.has(a) && COMMAS.has(b));
function typographic(stored, capture) {
  let cap = capture.split('[…]').join('[...]');
  let tail = '';
  if (stored.endsWith(' [...]') && !cap.endsWith(' [...]')) tail = ' [...]';
  const body = tail ? stored.slice(0, -tail.length) : stored;
  if (body.length !== cap.length) return null;
  let out = '';
  const kinds = new Set();
  for (let i = 0; i < body.length; i++) {
    if (body[i] === cap[i]) out += body[i];
    else if (same(body[i], cap[i])) {
      out += cap[i];
      kinds.add(QUOTES.has(cap[i]) ? 'quotes' : 'commas');
    } else return null;
  }
  return { passage: out + tail, kinds };
}
const describe = (kinds) =>
  [
    kinds.has('quotes') && 'quotation marks and apostrophes',
    kinds.has('commas') && 'full-width commas',
  ]
    .filter(Boolean)
    .join(' and ') + ' as in the capture';

// ---------------------------------------------------------------------------
// 1 and 4. Archive links and quotation fixes, item by item.
for (const item of report) {
  const source = index.sources.get(item.source);
  if (!source) {
    const kept = MERGED_INTO[item.source];
    log.unchanged.push({
      n: item.n,
      ids: [item.source],
      reason: kept
        ? `Merged into ${kept} by the audit fixes of 2026-10-29, after the item list was built; see that source's item.`
        : 'Removed by the audit fixes of 2026-10-29, after the item list was built.',
    });
    continue;
  }
  const cap = item.capture?.url ?? null;
  const confirmed = item.documentIdentity?.status === 'confirmed';
  const verifiedCapture =
    cap &&
    confirmed &&
    (item.status === 'verified' || item.status === 'quotation-problems');

  if (!verifiedCapture) {
    const reason = {
      'archive-retrieval-blocked':
        'Retrieval gap: no capture could be read back' +
        (cap
          ? ` (a new capture, ${captureDay(cap)}, answered 403 on replay)`
          : ' (Save Page Now returned no capture)') +
        '.',
      'wrong-document':
        'The only capture found shows an X error page, not the post; X is excluded from new saves.',
      'no-capture-saving-excluded':
        'No capture exists, and the page is excluded from new saves.',
      'no-capture-current-differs':
        'No capture exists; the current page differs from two quotations at section symbols, so no capture was saved.',
    }[item.status];
    hold(
      item.status === 'archive-retrieval-blocked'
        ? 'retrieval gap'
        : 'no verified capture',
      [item.source],
      item.n,
      reason ?? item.pendingReason,
    );
  } else if (HELD_LINKS[item.source]) {
    if (!source.archivedUrl)
      hold('archive link', [item.source], item.n, HELD_LINKS[item.source]);
  } else if (!source.archivedUrl) {
    change('sources', source.id, (s) => {
      s.archivedUrl = cap;
      s.archivedAt = captureDay(cap);
    });
    log.links.push({
      n: item.n,
      id: source.id,
      url: cap,
      archivedAt: captureDay(cap),
      foundBy: item.foundBy,
      status: item.status,
    });
  } else if (source.archivedUrl !== cap) {
    const merged = MERGED_CAPTURES[source.id];
    if (merged?.kind === 'held')
      hold('capture change', [source.id], item.n, merged.reason);
    else if (merged)
      log.unchanged.push({
        n: item.n,
        ids: [source.id],
        reason: merged.reason,
      });
    else if (CAPTURE_CHANGES[source.id]) {
      const from = source.archivedUrl;
      change('sources', source.id, (s) => {
        s.archivedUrl = cap;
        s.archivedAt = captureDay(cap);
      });
      log.captureChanges.push({
        n: item.n,
        id: source.id,
        from,
        url: cap,
        archivedAt: captureDay(cap),
        reason: CAPTURE_CHANGES[source.id],
      });
    } else
      log.unchanged.push({
        n: item.n,
        ids: [source.id],
        reason: `The check followed the cited capture's own redirect to ${cap}; the cited capture works and is kept.`,
      });
  }

  for (const q of item.quotations) {
    if (q.result === 'verbatim') continue;
    if (!index.evidence.has(q.id)) continue;
    if (q.result === 'unverified-retrieval') continue; // held with the source
    if (HELD_QUOTATIONS[q.id]) {
      const reason = HELD_QUOTATIONS[q.id];
      if (reason.startsWith('No change'))
        log.unchanged.push({ n: item.n, ids: [q.id], reason });
      else hold('quotation', [q.id], item.n, reason);
      continue;
    }
    const e = find('evidence', q.id);
    if (q.id === LEVY) {
      const from = e.passage;
      const to = from.replace(/\.$/, '');
      if (to === from || to !== q.captureText)
        throw new Error(
          `${LEVY}: the capture is not the passage without its full stop`,
        );
      change('evidence', LEVY, (row) => {
        row.passage = to;
        row.note += ` On ${RECORDED}, by the maintainer’s decision of that day, the final full stop was dropped, since the archive capture of ${captureDay(cap)}, which a cross-family archive check read on ${readDay(item)}, has none; the wording is unchanged. The human review of ${row.checkedAt} applies to the passage as it then stood.`;
      });
      log.quotations.push({
        n: item.n,
        id: LEVY,
        source: source.id,
        from,
        to,
        what: 'the final full stop dropped, as in the capture (human-reviewed passage)',
        checkedAt: e.checkedAt,
      });
      continue;
    }
    let fix = MANUAL_QUOTATIONS[q.id];
    if (!fix) {
      if (q.proposedCorrection !== q.captureText)
        throw new Error(
          `Item ${item.n} ${q.id}: correction is not the capture text`,
        );
      const t = typographic(e.passage, q.captureText);
      if (!t)
        throw new Error(`Item ${item.n} ${q.id}: not a typographic difference`);
      fix = { passage: t.passage, what: describe(t.kinds) };
    }
    const roles = headlineRoles(q.id);
    const twin = headlineTwin(e);
    const headline = roles.length
      ? ` The record bears the headline role ${roles.join(', ')}; the change was first held under the override rule and is applied by the same decision, since it changes no wording.`
      : twin
        ? ` It quotes the same passage of the same source as the headline record ${twin} and changes with it.`
        : '';
    const day = readDay(item);
    const from = e.passage;
    change('evidence', q.id, (row) => {
      row.passage = fix.passage;
      row.checkedAt = day;
      // The retrieval route stays: it records how the passage was first read,
      // and none of the schema's routes describes an archive read.
      row.note += ` On ${RECORDED}, by the maintainer’s decision of that day, the quotation was corrected to the archive capture of ${captureDay(cap)} (${fix.what}), which a cross-family archive check read on ${day}; the proposition is unchanged.${headline}${row.retrievalRoute ? ' The retrieval route is that of the earlier check.' : ''}`;
    });
    log.quotations.push({
      n: item.n,
      id: q.id,
      source: source.id,
      from,
      to: fix.passage,
      what: fix.what,
      checkedAt: day,
      ...(roles.length || twin
        ? { headline: roles.length ? roles.join(', ') : `with ${twin}` }
        : {}),
    });
  }
}

// 3. Locators.
for (const [id, { from, to, n }] of Object.entries(LOCATORS)) {
  const e = find('evidence', id);
  if (e.locator !== from) throw new Error(`${id}: locator is “${e.locator}”`);
  const roles = headlineRoles(id);
  if (roles.length) {
    hold(
      'locator',
      [id],
      n,
      `Bears the headline role ${roles.join(', ')} (override rule). Recommended: “${to}”.`,
    );
    continue;
  }
  change('evidence', id, (row) => {
    row.locator = to;
    row.note += ` On ${RECORDED}, by the maintainer’s decision of that day, the locator was corrected to the page a cross-family archive check inspected visually.`;
  });
  log.locators.push({ n, id, from, to });
}

// ---------------------------------------------------------------------------
// 5. Canonical addresses: the 16 same-document moves of the link-health
// report, among them source-us-ai-action-plan-release-2025. The two moves
// that need a look (a soft 404 and a Substack migration) are not changed.
// The maintainer's decision of 2026-10-30 (open decision 3) keeps the policy
// page address of source-rsp-3-0: the content-hashed PDF address it redirects
// to is fragile. Its evidenceUrl, the same page address, still serves the PDF.
const KEPT_ADDRESS = {
  'source-rsp-3-0':
    'Kept by the maintainer’s decision of 2026-10-30 (open decision 3): the page redirects to a content-hashed PDF address, which is fragile. The evidence address is the same page address and serves the PDF that was inspected.',
};
const NOT_SAME_DOCUMENT = {
  'source-nordhaus-2015-cowles':
    'The old address redirects to a site search page (a soft 404), not the document.',
  'source-hanson-2008-core-argument':
    'The post moved to Substack, where two quotations match only loosely; it has no capture.',
};
for (const r of linkHealth.results) {
  if (r.class !== 'moved') continue;
  if (KEPT_ADDRESS[r.id]) {
    log.unchanged.push({ n: null, ids: [r.id], reason: KEPT_ADDRESS[r.id] });
    continue;
  }
  if (NOT_SAME_DOCUMENT[r.id]) {
    hold('canonical URL', [r.id], null, NOT_SAME_DOCUMENT[r.id]);
    continue;
  }
  const moved = ['canonicalUrl', 'evidenceUrl']
    .map((f) => ({ f, v: r.fields[f] }))
    .find(({ v }) => v?.class === 'moved');
  const s = find('sources', r.id);
  if (moved.v.url !== s.canonicalUrl)
    throw new Error(`${r.id}: the moved address is not the canonical one`);
  const from = s.canonicalUrl;
  change('sources', r.id, (row) => {
    row.canonicalUrl = moved.v.finalUrl;
  });
  log.urls.push({ id: r.id, from, to: moved.v.finalUrl });
}
if (log.urls.length !== 15)
  throw new Error(`${log.urls.length} canonical moves`);

// ---------------------------------------------------------------------------
// 6. Criterion O7 of "Arguments about compute in orbit", narrowed by the
// maintainer's decision of 2026-10-30: only texts that discuss computing placed
// in orbit for this purpose count. Kolasinski (1989), on spacecraft
// electronics, becomes context; the Lumen Orbit white paper returns as earliest
// located, the role it held before part 1 of the compute, power and orbit
// admission. The correction is listed on the collection page
// (src/reading/orbital-compute.ts), with the replaced headline.
const O7 = {
  criterion:
    'Ionizing radiation in orbit degrades or disrupts the hardware of computing placed in orbit for this purpose, such as an orbital data centre or orbital compute, requiring shielding, redundancy, error correction or hardened parts. Texts on space electronics in general do not meet it.',
  alias:
    'Radiation in orbit degrades or disrupts the hardware of orbital compute, which needs mitigation.',
  earliest: 'cpo-orb-oc7-lumen-2024',
  earliestSource: 'source-cpo-orb-lumen-wp-gh',
  context: 'cpo-orb-oc7-kolasinski-1989',
};
change('entities', 'oc7-radiation-effects', (p) => {
  if (p.sourceIds.join() !== 'source-cpo-kolasinski-1989')
    throw new Error('O7: unexpected sources');
  p.proposition.criterion = O7.criterion;
  p.aliases = [O7.alias];
  p.sourceIds = [O7.earliestSource];
});
change('claims', O7.context, (c) => {
  if (c.attributes.thought.roles.join() !== 'earliest-located')
    throw new Error('O7: Kolasinski is not earliest located');
  c.predicate = 'bears_on_proposition';
  c.attributes.thought.roles = ['context'];
  c.attributes.thought.missing =
    'computing placed in orbit for this purpose: the paper concerns radiation effects on spacecraft electronics and memories, not orbital data centres or orbital compute';
  c.qualification =
    'Recorded as context. The paper concerns spacecraft electronics and argues nothing about placing compute in orbit. It was earliest located from part 1 of the compute, power and orbit admission (2026-10-30), when the criterion asked only that radiation in orbit disrupt computing hardware; the maintainer narrowed the criterion on 2026-10-30 to texts that discuss computing placed in orbit for this purpose, which the paper does not. The Lumen Orbit white paper (2024) is earliest located again, a correction recorded on the collection page.';
});
change('claims', O7.earliest, (c) => {
  if (c.attributes.thought.roles.join() !== 'articulation')
    throw new Error('O7: Lumen is not an articulation');
  c.attributes.thought.roles = ['earliest-located'];
  c.qualification =
    'Earliest located among the texts found by the pack’s searches of 2026-10-28 and the cross-family check’s bounded search of 2026-10-29/30; not a claim that no earlier text exists. From a proponent, which treats radiation as a manageable design cost. It held the role in the pack, lost it at part 1 of the admission to a 1989 paper on space radiation and electronic microcircuits, and holds it again since the maintainer narrowed the criterion on 2026-10-30 to texts that discuss computing placed in orbit for this purpose (a correction recorded on the collection page).';
});

// ---------------------------------------------------------------------------
// Metadata and snapshot.
writeJson(SNAPSHOT, {
  description: `Records as stored at ${BASE} (schema 2.21, release v0.14.0) before the maintainer’s decisions of ${RECORDED} on the archive verification of 2026-10-28 and the link-health report of 2026-10-29, and the narrowing of criterion O7 (review/archive-fixes-2026-10-30.md): the earlier metadata, the IDs the change added and the rows it changed, as they were. The test-only historical view restores them.`,
  baseCommit: BASE,
  meta: priorMeta,
  added,
  before,
  sha256: priorSha,
});
writeJson(CHANGES, log);
data.meta.updatedAt = RECORDED;
data.meta.scope += ` On ${RECORDED}, by the maintainer’s decision of that day on a cross-family archive verification of 2026-10-28, ${log.links.length + log.captureChanges.length} sources gained an archive copy that the check read and identified as the document, or one in place of a cited copy that failed, ${log.quotations.length} quotations were corrected to their capture’s typography or wording without changing what any record states, ${log.locators.length} locator was corrected, and, from a link-health check of 2026-10-29, ${log.urls.length} canonical addresses follow the document to its new address. A capture shows only what the archive held on its date. The same day the criterion of proposition O7 (radiation) in “Arguments about compute in orbit” was narrowed to texts that discuss computing placed in orbit for this purpose; a 1989 paper on spacecraft electronics became context, and the Lumen Orbit white paper is earliest located again. All records remain seeds.`;
for (const n of ['meta', ...names]) writeJson(`data/${n}.json`, data[n]);
// The stored files are formatted by the repository's Prettier settings.
execSync(
  `pnpm -s prettier --write ${['meta', ...names].map((n) => `data/${n}.json`).join(' ')} ${SNAPSHOT} ${CHANGES}`,
  { cwd: ROOT },
);
console.log(
  `Links ${log.links.length}, capture changes ${log.captureChanges.length}, quotations ${log.quotations.length}, locators ${log.locators.length}, URLs ${log.urls.length}, held ${log.held.length}, unchanged ${log.unchanged.length}; changed ${names.map((n) => `${before[n].length} ${n}`).join(', ')}.`,
);
