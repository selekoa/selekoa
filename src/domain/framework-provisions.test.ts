import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import {
  datasetSchema,
  maxQuotedWords,
  type Claim,
  type Dataset,
} from './schema';
import { documentHistory } from './document-history';
import { documentRecord } from './document-record';
import { documentHistoryStarter, starterMarkdown } from './starter';
import { frontierSafetyFrameworks } from '../reading/frontier-safety-frameworks';
import {
  preProvisionsRaw,
  preReaderTextIdsRaw,
} from '../editorial/historical-views';
import before from '../../review/week4a-before-2026-10-03.json';
import decisions from '../../review/week4a-stop-case-decisions-2026-10-03.json';

const data = repository.data;
const words = (s: string) => s.trim().split(/\s+/).length;
const provisions = data.claims.filter(
  (c) => c.predicate === 'states_provision',
);
const absences = data.claims.filter(
  (c) => c.predicate === 'provision_not_found',
);
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');
const clone = () => structuredClone(data) as Dataset;
const parses = (d: Dataset) => datasetSchema.safeParse(d).success;
const claim = (d: Dataset, id: string) => d.claims.find((c) => c.id === id)!;

describe('schema 2.8 framework provisions', () => {
  it('reproduces the schema 2.7 dataset exactly in the pre-4a view', () => {
    for (const key of ['entities', 'claims', 'sources', 'evidence'] as const)
      expect(sha(preProvisionsRaw[key]), key).toBe(before.sha256[key]);
    expect(sha(preProvisionsRaw.meta)).toBe(before.sha256.meta);
    expect(preProvisionsRaw.meta.schemaVersion).toBe('2.7');
    // The 2026-10-25 re-check corrections moved the current dataset to schema 2.16.
    expect(data.meta.schemaVersion).toBe('2.16');
  });

  it('applies the three stop-case decisions and keeps their history', () => {
    const pf = repository.claims.get('supersedes-pf-2')!;
    expect(pf).toMatchObject({
      resolution: 'unresolved',
      derivation: 'inferred',
    });
    for (const id of pf.evidenceIds)
      expect(repository.evidence.get(id)!.support).toBe('context');
    expect(
      repository.claims.get('eval-i-rsp-christiano-credit')!.statement,
    ).toContain('in the spirit of');
    expect(
      repository.claims.get('rsp-credits-arc-2023')!.qualification,
    ).toContain('20:15 UTC');
    expect(decisions.decisions.map((d) => d.claimId)).toEqual([
      'supersedes-pf-2',
      'eval-i-rsp-christiano-credit',
      'rsp-credits-arc-2023',
    ]);
    for (const d of decisions.decisions) {
      expect(d.before.claim).toBeTruthy();
      // As stored before the 2026-10-15 removal of record IDs from
      // reader-facing text, which reworded one of these qualifications.
      expect(d.after.claim).toEqual(
        preReaderTextIdsRaw.claims.find((c) => c.id === d.claimId),
      );
    }
  });

  it('quotes every provision from its own edition, briefly', () => {
    expect(provisions.length).toBeGreaterThan(60);
    for (const c of provisions) {
      const quote = c.evidenceIds
        .map((id) => repository.evidence.get(id)!)
        .find(
          (e) =>
            e.passageType === 'quote' &&
            e.support === 'supports' &&
            repository.sources.get(e.sourceId)!.documentId === c.subject,
        );
      expect(quote, c.id).toBeTruthy();
      expect(words(quote!.passage), c.id).toBeLessThanOrEqual(50);
      expect(c.attributes?.provision?.key.startsWith('')).toBe(true);
    }
  });

  it('keeps one kind per provision key and records absences as inferences', () => {
    const kinds = new Map<string, string>();
    for (const c of [...provisions, ...absences]) {
      const p = c.attributes!.provision!;
      expect(kinds.get(p.key) ?? p.kind, p.key).toBe(p.kind);
      kinds.set(p.key, p.kind);
    }
    for (const c of absences) {
      expect(c.derivation).toBe('inferred');
      expect(c.inferenceRationale).toMatch(/inspected scope/);
      expect(c.statement).not.toMatch(/removed|deleted|dropped/i);
    }
  });

  it('stays within the quotation limits for every framework source', () => {
    const perSource = new Map<string, { quotes: number; words: number }>();
    for (const e of data.evidence.filter((e) => e.passageType === 'quote')) {
      const t = perSource.get(e.sourceId) ?? { quotes: 0, words: 0 };
      perSource.set(e.sourceId, {
        quotes: t.quotes + 1,
        words: t.words + words(e.passage),
      });
      expect(words(e.passage), e.id).toBeLessThanOrEqual(50);
    }
    const history = documentHistory(data, frontierSafetyFrameworks);
    const ids = new Set(history.claimIds);
    const used = new Set(
      data.evidence.filter((e) => ids.has(e.claimId)).map((e) => e.sourceId),
    );
    // The 2026-10-03 rule replaced the cap of five quotes and 250 words.
    for (const id of used) {
      const t = perSource.get(id);
      if (!t) continue;
      const length = repository.sources.get(id)!.documentWords!.count;
      expect(t.words, id).toBeLessThanOrEqual(maxQuotedWords(length));
    }
  });

  it('rejects provisions without a short quote from the cited edition', () => {
    const noQuote = clone();
    const p = noQuote.claims.find((c) => c.predicate === 'states_provision')!;
    for (const e of noQuote.evidence.filter((e) => e.claimId === p.id))
      e.passageType = 'paraphrase';
    expect(parses(noQuote)).toBe(false);
    const long = clone();
    const q = long.claims.find((c) => c.predicate === 'states_provision')!;
    const e = long.evidence.find((e) => e.id === q.evidenceIds[0])!;
    e.passage = Array.from({ length: 51 }, (_, i) => 'w' + i).join(' ');
    expect(parses(long)).toBe(false);
    const dated = clone();
    const r = dated.claims.find(
      (c) => c.predicate === 'states_provision',
    )! as Claim & { time: { kind: 'event'; date: string } };
    r.time.date = '1999';
    expect(parses(dated)).toBe(false);
  });

  it('rejects explicit absences, one-sided provision changes and settled assessments', () => {
    const explicitAbsence = clone();
    const a = explicitAbsence.claims.find(
      (c) => c.predicate === 'provision_not_found',
    )!;
    a.derivation = 'explicit';
    delete a.inferenceRationale;
    expect(parses(explicitAbsence)).toBe(false);

    const oneSided = clone();
    const change = oneSided.claims.find(
      (c) => c.predicate === 'changes_from' && c.attributes?.provision,
    )!;
    const object =
      change.object.kind === 'entity' ? change.object.entityId : '';
    oneSided.claims = oneSided.claims.filter(
      (c) =>
        !(
          c.predicate === 'states_provision' &&
          c.subject === object &&
          c.attributes?.provision?.key === change.attributes!.provision!.key
        ),
    );
    oneSided.evidence = oneSided.evidence.filter((e) =>
      oneSided.claims.some((c) => c.id === e.claimId),
    );
    expect(parses(oneSided)).toBe(false);

    const settled = clone();
    claim(settled, 'rsp-v3-0-assessed-weakening').resolution = 'supported';
    expect(parses(settled)).toBe(false);

    const onePublisher = clone();
    const assessed = claim(onePublisher, 'rsp-v2-0-assessed-weakening');
    onePublisher.evidence = onePublisher.evidence.filter(
      (e) => e.id !== 'evidence-rsp-v2-0-assessed-weakening-anthropic',
    );
    assessed.evidenceIds = assessed.evidenceIds.filter(
      (id) => id !== 'evidence-rsp-v2-0-assessed-weakening-anthropic',
    );
    expect(parses(onePublisher)).toBe(false);

    // An unresolved question carries context evidence only.
    const sided = clone();
    sided.evidence.find((e) => e.claimId === 'supersedes-pf-2')!.support =
      'contradicts';
    expect(parses(sided)).toBe(false);
  });

  it('admits one contested record with both sides; the RSP assessments are open questions', () => {
    // Week 4c's disputed control assessments have their own packet and tests.
    const contested = data.claims.filter(
      (c) => c.resolution === 'contested' && c.predicate !== 'control_assessed',
    );
    // The Preparedness v2 provision records its text and is supported; the
    // dispute about it is a separate assessment record (follow-up). After
    // the different-model check the RSP assessments are unresolved.
    expect(contested.map((c) => c.id)).toEqual([
      'assessed-preparedness-v2-high-deployment-mitigation',
    ]);
    for (const id of [
      'rsp-v2-0-assessed-weakening',
      'rsp-v3-0-assessed-weakening',
    ])
      expect(repository.claims.get(id)!.resolution).toBe('unresolved');
    for (const c of contested) {
      const items = c.evidenceIds.map((id) => repository.evidence.get(id)!);
      expect(items.some((e) => e.support === 'supports')).toBe(true);
      expect(items.some((e) => e.support === 'contradicts')).toBe(true);
    }
  });

  it('adds the Meta and Microsoft families with publisher-stated replacement only', () => {
    const history = documentHistory(data, frontierSafetyFrameworks);
    const meta = history.families.find((f) => f.family === 'meta-frontier-ai')!;
    const ms = history.families.find(
      (f) => f.family === 'microsoft-frontier-governance',
    )!;
    expect(meta.editions.map((e) => e.entity.id)).toEqual([
      'meta-faf-v1-1',
      'meta-aasf-v2-0',
    ]);
    expect(ms.editions.map((e) => e.entity.id)).toEqual([
      'ms-fgf-2025',
      'ms-fgf-2026',
    ]);
    expect(meta.editions[1].replaces.map((c) => c.id)).toEqual([
      'supersedes-meta-aasf-v2-0',
    ]);
    expect(ms.editions[1].replaces.map((c) => c.id)).toEqual([
      'supersedes-ms-fgf-2026',
    ]);
    expect(
      repository.entities.get('ms-fgf-2026')!.documentVersion!.publishedAt,
    ).toBeUndefined();
    for (const id of ['meta-faf-v1-1', 'meta-aasf-v2-0', 'ms-fgf-2025'])
      for (const s of data.sources.filter((s) => s.documentId === id)) {
        expect(s.language).toBe('en');
        expect(s.archivedUrl).toMatch(/^https:\/\/web\.archive\.org\/web\//);
      }
    // Version 4: provision assessments and the revised quotation rule.
    // Version 5: reader-facing introduction, limits and open questions.
    expect(frontierSafetyFrameworks.version).toBe(5);
  });

  it('lines provisions up across editions and keeps them on the document page', () => {
    const history = documentHistory(data, frontierSafetyFrameworks);
    for (const f of history.families)
      for (const row of f.provisionKeys)
        for (const cell of row.editions) {
          if (cell.stated)
            expect(cell.stated.attributes!.provision!.key).toBe(row.key);
          expect(cell.stated && cell.absent).toBeFalsy();
        }
    const record = documentRecord(data, 'preparedness-v2')!;
    expect(record.edition!.provisions.map((c) => c.id)).toContain(
      'prov-preparedness-v2-high-deployment-restriction',
    );
    expect(record.other.some((c) => c.predicate === 'states_provision')).toBe(
      false,
    );
  });

  it('exports provisions, absences and disagreements in the starter', async () => {
    const starter = await documentHistoryStarter(
      data,
      frontierSafetyFrameworks,
    );
    const pf = starter.families.find(
      (f) => f.family === 'openai-preparedness',
    )!;
    expect(pf.editions[1].provisionClaimIds).toContain(
      'prov-preparedness-v2-high-deployment-restriction',
    );
    expect(pf.editions[1].absenceClaimIds.length).toBeGreaterThan(0);
    expect(pf.provisionKeys.length).toBeGreaterThan(0);
    const markdown = starterMarkdown(starter);
    expect(markdown).toContain('##### Provision (required action)');
    expect(markdown).toContain('##### Recorded absence');
    expect(markdown).toMatch(
      /- assessed-preparedness-v2-high-deployment-mitigation \(contested\): .*\n {2}- Supporting: .*\n {2}- Contradicting: /,
    );
    expect(markdown).toContain('- rsp-v3-0-assessed-weakening (unresolved)');
    expect(markdown).toContain('- supersedes-pf-2 (unresolved)');
  });
});
