import type { FollowupCollection } from './followup';

const json = (value: unknown) =>
  '```json\n' + JSON.stringify(value, null, 2) + '\n```\n';
const list = (values: string[]) =>
  values.map((s) => '- ' + s).join('\n') + '\n';
const cell = (s: string) => s.replaceAll('|', '\\|').replaceAll('\n', ' ');
const heading = (c: FollowupCollection, title: string) =>
  `# ${title}\n\nCollection ${c.id}, version ${c.version}; checked ${c.checkedAt}. Fingerprint: ${c.fingerprint}.\n\nExploratory machine research; not editorially accepted. Human review is not recorded.\n\n`;
export function followupGuide(c: FollowupCollection) {
  return (
    heading(c, 'Conceptual provenance II: research starter') +
    `This increment asks three bounded questions: which expression supports the mesa-optimization introduction wording; which post the Sharp Left Turn citation intended; and what a 2001–2004 author/venue corpus can establish about the exact name Coherent Extrapolated Volition (CEV). It does not test the technical validity of these ideas.

## Documented expressions and corrections

**Mesa-optimization (PCR-010).** The [currently served arXiv v1 PDF](https://arxiv.org/pdf/1906.01820v1), abstract on page 1, attributes introduction of the term to its authors. That is self-attribution, not independent priority. [Version history](https://arxiv.org/abs/1906.01820v1) dates v1 to 5 June 2019; the current PDF displays 24 March 2022. Its TeX uses a compilation-day date and its PDF creation metadata agrees with the displayed date. Later typesetting is a supported inference; the original 2019 PDF bytes and compilation history remain unverified. The alleged v4 paths return 404 and current history ends at v3. v3 is a separately inspected comparison, never replacement content for v4. See CP2-F01–F03 and CP2-C01–C02.

**Sharp Left Turn (PCR-028).** The recorded ID aW288uWABwTruBmgF yields an unrelated vegan advocacy post; the other recorded ID, 7W8HqksjBXDcKkrD7, returns 404. Neither identifies the intended essay. The identifiable expression is [Soares’s post GNhMPAWcfBCASy8e6](https://www.alignmentforum.org/posts/GNhMPAWcfBCASy8e6/a-central-ai-alignment-problem-capabilities-generalization), displayed 15 June 2022. Inspect the opening authorship note and “Discussion of a problem.” Preserve the wrong-object contradiction and unidentified path as historical correction records. Failed retrieval does not prove historical nonexistence. See CP2-F04–F05 and CP2-C03–C04.

**CEV (PCR-002).** The earliest bibliographically dated exact-name candidate found here is the work attributed to 2004 in the [current institutional reprint](https://intelligence.org/files/CEV.pdf). Its cover and section 3, printed page 5, contain the full name. The retrieved file has 2013 creation metadata; neither that metadata nor the attribution authenticates literal wording available in 2004. No independently authenticated contemporary exact-name occurrence was found within the bounded search. Historical priority remains unresolved. See CP2-F06–F07 and CP2-C05.

## Earlier candidates and the search boundary

Read [Creating Friendly AI 1.0](https://intelligence.org/files/CFAI.pdf), section 2.3 and version history, as an earlier conceptual candidate attributed to 2001. Read the [SL4 announcement](http://sl4.org/archive/0405/8881.html) and [Foresight announcement](https://events.foresight.org/update_to_friendly_ai_theory/) for period-labelled use of **Collective Volition**. These are current reprints or archive renderings. The exact linked wiki is unavailable. A reply’s [date discrepancy](http://sl4.org/archive/0405/8894.html) remains unresolved because the quoted timestamp lacks a timezone.

The investigator checked all 48 SL4 monthly indexes for 2001–2004 and searched 355 bodies selected by subjects containing “volition” or “summary of current FAI.” No exact full-name match appeared in that subset. Messages under other subjects, other venues and private correspondence are outside the search. The separate auditor searched a different 107-body subset; this is different coverage, not corroboration of archive-wide absence.

Conceptual resemblance and shared authorship do not establish transmission. Replies and a quoted announcement identify particular carriers of Collective Volition; they do not establish when the exact CEV name emerged or a broader influence chain.

## What to inspect next

Recover dated wiki revisions and original PDF editions; verify capture provenance and literal wording. Search SL4 bodies beyond the subject filter and extend the dated corpus to relevant author-site revisions and other public lists. Investigate the renaming explicitly. Resolve message chronology from original headers where available. Any first-use claim must name its corpus and surviving gaps.

The [complete appendix](appendix.md), [source/search inventory](inventory.md), [upstream correction proposal](corrections.md) and [attributed audit](audit.md) preserve the evidence and disagreements. The [blank human sample](../../../review/conceptual-provenance-ii.md) requires independent inspection before any human acceptance; broader academic reliance requires inspection of every source actually relied upon. No corpus record has been admitted to the atlas.
`
  );
}
export function followupAppendix(c: FollowupCollection) {
  const out = [
    heading(c, 'Conceptual provenance II: complete evidence appendix'),
    list(c.limits),
    '## Provenance and inherited history\n',
    `Parent: conceptual-provenance-i v1 at ${c.parentCommit}; fingerprint ${c.parentFingerprint}. Upstream: ${c.inherited.upstream.commit}. The parent collection remains byte-for-byte unchanged. Original records, evidence, source IDs and packet mappings are embedded without rewriting in collection.json under inherited. The corrections below are proposals against that baseline, not modifications to source-integrity.\n`,
    '## Findings and evidence\n',
  ];
  for (const f of c.findings) {
    out.push(
      `### ${f.id} — ${f.upstreamId}\n\nInvestigated proposition: **${f.statement}**\n\nMachine resolution: ${f.resolution}; derivation: ${f.derivation}. Admission: ${f.editorialAdmission}; human review: ${f.humanReview}.\n\nQualification: ${f.qualification}\n`,
    );
    if (f.premises.length)
      out.push('Inference premises and rationale:\n', list(f.premises));
    for (const id of f.evidenceIds) {
      const e = c.evidence.find((e) => e.id === id)!;
      const s = c.sources.find((s) => s.id === e.sourceId)!;
      out.push(
        `#### ${e.id}\n\n[${s.title}](${s.requestedUrl}) — ${s.id}; ${s.version}.\n\nLocator: ${e.locator}.\n\n**Paraphrase:** ${e.passage.text}\n\nRelationship to this proposition: ${e.role}. Source role: ${e.sourceRole}\n\nChecked ${e.checkedAt} by ${e.checkedBy}; ${e.verification}; human review ${e.humanReview}.\n\nExpression limits: ${s.limits}\n`,
      );
    }
  }
  const { manifest, ...search } = c.search;
  out.push(
    '## Historical search protocol and result\n',
    json(search),
    `All ${manifest.length} searched index/body URLs, hashes, subjects and outcomes appear in [inventory.md](inventory.md) and collection.json. Unsuccessful discovery searches are recorded above. Failure response hashes never authenticate historical source content.\n`,
  );
  out.push(
    '## Original identifiers and packet mappings\n',
    json(c.inherited),
    '## Correction history\n',
    'See [corrections.md](corrections.md) for exact baseline cells, proposed changes, reasons and linked findings. Before-values are validated against the unchanged parent.\n',
    '## Review separation\n',
    `The [machine audit](audit.md) records separate inspection and disagreements. The human sample is [a blank working pack](../../../review/conceptual-provenance-ii.md); no decision importer or admission path exists. Sample protocol:\n`,
    json(c.sample),
  );
  return out.join('\n');
}
export function followupInventory(c: FollowupCollection) {
  const out = [
    heading(c, 'Conceptual provenance II: source and search inventory'),
    'Hashes identify current response bytes, not original publication bytes. Failed-response hashes are retained solely as retrieval observations. No raw source documents, screenshots or tool logs are included. Check date is 2026-09-28; archive capture dates are unknown.\n',
  ];
  for (const s of c.sources)
    out.push(
      `## ${s.id}\n\n${s.title}\n\nFamily: ${s.family}; version: ${s.version}.\n\nRequested: [source path](${s.requestedUrl}). Resolved: [response path](${s.resolvedUrl}). HTTP ${s.httpStatus}; ${s.bytes} bytes; SHA-256 ${s.sha256}.\n\nDates (different meanings):\n`,
      json(s.dates),
      `${s.limits}\n\nRights: ${s.rights}\n`,
    );
  out.push(
    '## SL4 bounded search manifest\n',
    `${c.search.selection}\n\n${c.search.normalization}\n\n${c.search.indexCount} indexes; ${c.search.bodyCount} selected bodies; ${c.search.exactHits} exact-term hits. This curated source inventory is not a raw execution log.\n`,
    '| Kind | Source path | Subject | HTTP | Exact hits | SHA-256 |\n| --- | --- | --- | --- | --- | --- |',
  );
  for (const r of c.search.manifest)
    out.push(
      `| ${r.kind} | [${r.id}](${r.url}) | ${cell(r.subject ?? 'Monthly index')} | ${r.status} | ${r.exactTermHits ?? 'not screened'} | ${r.sha256} |`,
    );
  return out.join('\n');
}
export function followupCorrections(c: FollowupCollection) {
  const out = [
    heading(c, 'Source-integrity: separate upstream correction proposal'),
    `Target repository: futurelightcone/source-integrity, commit ${c.inherited.upstream.commit}. Status: **proposed, not applied**. This is a reviewable proposal in Selekoa; no upstream working-tree changes, private drafts or later report revisions were imported. The upstream maintainer must choose expression-ID migrations and apply corrections in a separately versioned change.\n\nKeep old cells, original packet mappings, wrong-object evidence and unresolved assertions as history. Adding a correct intended expression does not rehabilitate the erroneous identifier.\n`,
  ];
  for (const x of c.corrections)
    out.push(
      `## ${x.id}\n\nTarget: ${x.target.upstream.path}, data-record ordinal ${x.target.upstream.recordOrdinal}; projected row ${x.target.upstream.projectedRowFingerprint}. Parent ${x.target.section}/${x.target.id}/${x.target.field}.\n\nBefore:\n`,
      json(x.before),
      'Proposed representation:\n',
      json(x.proposed),
      `${x.rationale}\n\nEvidence decisions: ${x.findingIds.join(', ')}. Status: ${x.status}.\n`,
    );
  out.push(
    '## Adoption conditions\n\nValidate the proposal against the pinned cells and reconcile any newer upstream edits separately. Introduce expression-specific identities for v1, v3, the unsubstantiated v4 label, the two disputed forum IDs and the intended forum post. Retain the parent evidence and packet mappings; add correction links rather than rewriting their history. Keep CEV priority and transmission unresolved. Re-run upstream generation and review in its own repository only after a separately authorized correction task.\n',
  );
  return out.join('\n');
}
export function followupAudit(c: FollowupCollection) {
  const a = c.audit;
  return (
    heading(c, 'Conceptual provenance II: attributed machine audit') +
    `${a.actor}. ${a.model}. Checked ${a.checkedAt}.\n\n${a.method}\n\n${a.independenceLimits}\n\n` +
    a.coverage
      .map(
        (r) =>
          `## ${r.id}\n\nScope: ${r.findingIds.join(', ')}; corrections ${r.correctionIds.join(', ')}.\n\nAssessment: ${r.verdict}. ${r.assessment}\n\nSource inventory IDs: ${r.sources.join(', ')}.\n`,
      )
      .join('\n') +
    '\n## Disagreements retained\n\n' +
    a.disagreements
      .map(
        (d) =>
          `### ${d.id}: ${d.subject}\n\nInvestigator: ${d.investigatorInitial}\n\nAuditor: ${d.auditor}\n\nDisposition: ${d.disposition}\n`,
      )
      .join('\n') +
    '\n## Independent search coverage\n\n' +
    json(a.independentSearch) +
    '\n## Access limits\n\n' +
    list(a.accessLimits) +
    '\nHuman review: not_recorded. No vote, consensus threshold or machine result changes admission or review state.\n'
  );
}
export function followupHumanReview(c: FollowupCollection) {
  const ids = [
    ...new Set([c.sample.randomFindingId, ...c.sample.targetedFindingIds]),
  ];
  const out = [
    heading(c, 'Conceptual provenance II: independent human spot-check sample'),
    'Inspect the original sources and framing independently, before consulting the machine audit. These are investigated propositions, including erroneous assertions retained for correction history. Check identity, version, locator, passage context, dates, qualifications, search omissions and review labels. Record which individual evidence items you inspected. A claim-level decision never means every evidence item was checked.\n\nEnter YES, EDIT, RESEARCH MORE or REJECT only after your inspection. All fields below are deliberately blank. A material error should expand review to the affected source or extraction family. Decisions have no automatic admission or import effect.\n',
    `Random selection: ${c.sample.randomFindingId}; seed ${c.sample.seed}. ${c.sample.algorithm}\n\nPopulation: ${c.sample.population.join(', ')}.\n\n${c.sample.rationale}\n\n**Human reviewer:**\n\n**Review date:**\n`,
  ];
  for (const id of ids) {
    const f = c.findings.find((f) => f.id === id)!;
    out.push(
      `## ${id} — ${id === c.sample.randomFindingId ? 'random draw' : 'targeted family/risk sample'}\n\nInvestigated proposition: ${f.statement}\n\nQualification to assess: ${f.qualification}\n`,
    );
    for (const eid of f.evidenceIds) {
      const e = c.evidence.find((e) => e.id === eid)!;
      const s = c.sources.find((s) => s.id === e.sourceId)!;
      out.push(
        `- ${eid}: [${s.title}](${s.requestedUrl}); ${e.locator}. Version ${s.version}.\n`,
      );
    }
    out.push(
      '**Evidence IDs independently inspected:**\n\n**Human decision:**\n\n**Notes:**\n\n---\n',
    );
  }
  return out.join('\n');
}
export function followupArtifacts(c: FollowupCollection) {
  return {
    'collection.json': JSON.stringify(c, null, 2) + '\n',
    'guide.md': followupGuide(c),
    'appendix.md': followupAppendix(c),
    'inventory.md': followupInventory(c),
    'corrections.md': followupCorrections(c),
    'audit.md': followupAudit(c),
  };
}
