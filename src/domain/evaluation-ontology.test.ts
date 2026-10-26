import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { format, resolveConfig } from 'prettier';
import { preSortNameRepository as repository } from '../editorial/pre-sort-name-data';
import { preSortNameRaw } from '../editorial/pre-sort-name-data';
import { datasetSchema, type Claim } from './schema';
import { institutionalDossier } from './dossier';
import { queryDataset, timeLabel } from './query';
import {
  claimReference,
  researchPacket,
  packetJson,
  packetMarkdown,
} from './references';
import {
  compactClaims,
  relationFamily,
  stageLabel,
  isProvisional,
} from '../ui/mapGrammar';
import { renderSeedReview } from '../editorial/seed-review';
import increment from '../../review/evaluation-ontology-i-increment.json';
import atlas from '../../review/institutional-atlas-increment.json';
import order from '../../review/evaluation-ontology-i-order.json';
import sample from '../../review/evaluation-ontology-i-sample.json';
const data = repository.data;
const ids = increment.added.claims;
function changed(id: string, mutate: (c: Claim, d: typeof data) => void) {
  const d = structuredClone(data);
  mutate(
    d.claims.find((c) => c.id === id)!,
    d,
  );
  return datasetSchema.safeParse(d);
}
describe('evaluation ontology boundaries', () => {
  it('preserves every baseline record and the three actor identities', () => {
    for (const k of ['entities', 'claims', 'sources', 'evidence'] as const) {
      const raw = preSortNameRaw(k) as {
        id: string;
      }[];
      const prior = raw.filter((r) => increment.baseline[k].ids.includes(r.id));
      expect(prior.map((r) => r.id)).toEqual(increment.baseline[k].ids);
      expect(
        createHash('sha256').update(JSON.stringify(prior)).digest('hex'),
      ).toBe(increment.baseline[k].sha256);
    }
    expect(
      ['alignment-research-center', 'arc-evals', 'metr'].map(
        (id) => repository.entities.get(id)?.id,
      ),
    ).toEqual(['alignment-research-center', 'arc-evals', 'metr']);
    for (const id of ids.slice(0, 2))
      expect(repository.claims.get(id)?.subject).toBe(
        'alignment-research-center',
      );
    expect(repository.claims.get('eval-i-gpt4-arc-credit')?.predicate).toBe(
      'explicitly_credits',
    );
    expect(repository.claims.get('eval-i-claude-arc-credit')?.predicate).toBe(
      'explicitly_credits',
    );
    expect(repository.claims.get('rsp-credits-arc-2023')?.object).toEqual({
      kind: 'entity',
      entityId: 'arc-evals',
    });
  });
  it.each(['proposed', 'announced', 'reported_performed'] as const)(
    'accepts a separately scoped %s engagement stage',
    (activityStage) => {
      expect(
        changed(ids[0], (c) => {
          c.attributes!.activityStage = activityStage;
        }).success,
      ).toBe(true);
    },
  );
  it.each(['activityStage', 'evaluatedSystem', 'activityScope'] as const)(
    'rejects missing %s',
    (key) => {
      expect(
        changed(ids[0], (c) => {
          delete c.attributes![key];
        }).success,
      ).toBe(false);
    },
  );
  it('rejects empty system descriptions, invalid endpoints and unscoped evidence', () => {
    const mutations: ((c: Claim, d: typeof data) => void)[] = [
      (c) => {
        c.attributes!.evaluatedSystem = ' ';
      },
      (c) => {
        c.subject = 'beth-barnes';
      },
      (c) => {
        c.object = { kind: 'entity', entityId: 'gpt4-system-card-2023' };
      },
      (c) => {
        c.object = { kind: 'literal', value: 'OpenAI' };
      },
      (c) => {
        c.object = { kind: 'entity', entityId: c.subject };
      },
      (c) => {
        c.attributes!.transactionStage = 'completed';
      },
      (c, d) => {
        d.evidence.find((e) => e.id === c.evidenceIds[0])!.sourceRole =
          'secondary';
      },
      (c, d) => {
        d.evidence.find((e) => e.id === c.evidenceIds[0])!.support = 'context';
      },
      (c, d) => {
        d.sources.find(
          (s) =>
            s.id ===
            d.evidence.find((e) => e.id === c.evidenceIds[0])!.sourceId,
        )!.publisherId = 'metr';
      },
      (c) => {
        c.derivation = 'inferred';
        c.inferenceRationale = 'Name similarity';
      },
    ];
    for (const mutate of mutations)
      expect(changed(ids[0], mutate).success).toBe(false);
  });
  it('rejects legal-successor scope and completed transitions without inventing a legal ontology', () => {
    for (const id of ids.slice(2)) {
      expect(
        changed(id, (c) => {
          c.attributes!.activityStage = 'reported_performed';
        }).success,
      ).toBe(false);
      expect(
        changed(id, (c) => {
          c.attributes!.transitionScope = 'legal_successor' as never;
        }).success,
      ).toBe(false);
      expect(
        changed(id, (c) => {
          c.predicate = 'legal_successor' as never;
        }).success,
      ).toBe(false);
      expect(
        changed(id, (c) => {
          c.predicate = 'acquired';
        }).success,
      ).toBe(false);
      expect(
        changed(id, (c) => {
          c.time = {
            kind: 'event',
            date: '2023',
            basis: 'effective',
            note: 'Incorporation',
          };
        }).success,
      ).toBe(false);
      expect(
        changed(id, (c) => {
          c.time = { kind: 'unknown', note: 'Announcement date unknown' };
        }).success,
      ).toBe(true);
    }
    expect(
      changed(ids[2], (c) => {
        c.attributes!.transitionScope = 'name_announcement';
      }).success,
    ).toBe(false);
    expect(
      changed('eval-i-gpt4-arc-credit', (c) => {
        c.attributes = { activityStage: 'reported_performed' };
      }).success,
    ).toBe(false);
  });
  it('preserves temporal uncertainty and keeps stage separate from family', () => {
    const first = repository.claims.get(ids[0])!;
    const second = repository.claims.get(ids[1])!;
    expect(timeLabel(first)).toBe('Date unknown');
    expect(second.time).toMatchObject({ kind: 'interval', from: '2022' });
    expect(second.time.note).toContain('fall 2022');
    expect(timeLabel(second)).toContain('End unknown');
    const variants = ['proposed', 'announced', 'reported_performed'].map(
      (activityStage) =>
        ({
          ...first,
          id: activityStage,
          attributes: { ...first.attributes, activityStage },
        }) as Claim,
    );
    expect(new Set(variants.map(relationFamily))).toEqual(
      new Set(['governance']),
    );
    expect(variants.map(stageLabel)).toEqual([
      'proposed',
      'announced',
      'reported_performed',
    ]);
    expect(variants.map(isProvisional)).toEqual([true, true, false]);
    expect(compactClaims(variants)).toHaveLength(3);
    const through2022 = queryDataset(data, {
      topic: 'all',
      throughYear: 2022,
      entityType: 'all',
      focusId: null,
    }).claims.map((c) => c.id);
    expect(through2022).toEqual(expect.arrayContaining(ids.slice(0, 2)));
    expect(through2022).not.toContain(ids[2]);
    for (const id of ids.slice(2)) {
      const claim = repository.claims.get(id)!;
      expect(relationFamily(claim)).toBe('people');
      expect(stageLabel(claim)).toBe('announced');
      expect(claim.time).toMatchObject({
        kind: 'event',
        basis: 'announcement',
      });
      const source = repository.sources.get(
        repository.evidence.get(claim.evidenceIds[0])!.sourceId,
      )!;
      expect(source.version).toContain('no authenticated 2023 snapshot');
      expect(source.versionDate).toBeUndefined();
    }
  });
  it('projects exact directed claims into maps and dossiers, without transitive legal identity', async () => {
    for (const id of ids) {
      const c = repository.claims.get(id)!;
      if (c.object.kind !== 'entity') throw Error('Expected entity');
      for (const entityId of [c.subject, c.object.entityId]) {
        expect(
          institutionalDossier(data, entityId)!.claims.find((r) => r.id === id),
        ).toBe(c);
        expect(
          queryDataset(data, {
            topic: 'all',
            throughYear: 2026,
            entityType: 'all',
            focusId: entityId,
          }).claims.find((r) => r.id === id),
        ).toBe(c);
      }
      expect(
        await claimReference(data, c, 'https://example.org/#/claim/' + id),
      ).toContain(id);
    }
    expect(
      institutionalDossier(data, 'metr')!.claims.map((c) => c.id),
    ).not.toContain(ids[0]);
    const selection = {
      id: 'evaluation-test',
      version: 1,
      institutionId: 'alignment-research-center',
      title: 'Evaluation',
      question: 'Scope?',
      editorialStatus: 'machine-proposed' as const,
      introduction: [],
      sections: [
        {
          id: 'records',
          kind: 'principal' as const,
          title: 'Records',
          description: '',
          gap: '',
          passages: [],
        },
      ],
      items: ids.slice(0, 3).map((claimId) => ({
        claimId,
        sectionId: 'records',
        rationale: 'Test export',
      })),
    };
    const packet = await researchPacket(data, selection);
    const json = packetJson(packet);
    const md = packetMarkdown(packet);
    for (const id of ids.slice(0, 3)) {
      expect(json).toContain(id);
      expect(md).toContain(id);
    }
    expect(json).toContain('reported_performed');
    expect(md).toContain('evaluatedSystem');
    expect(json).toContain('source-eval-ontology-i-gpt4-card');
  });
  it('keeps seeds and machine states, reproduces new blank pack and records a pending human sample', async () => {
    expect(order.flatMap((g) => g.claimIds)).toEqual(ids);
    expect(sample.claimIds).toEqual(ids);
    expect(ids).toContain(sample.randomClaimId);
    for (const id of ids) {
      const c = repository.claims.get(id)!;
      expect(c.editorialState).toBe('seed');
      expect(repository.evidence.get(c.evidenceIds[0])).toMatchObject({
        verification: 'machine_checked',
        checkedAt: '2026-09-28',
      });
      expect(
        repository.evidence.get(c.evidenceIds[0])?.reviewer,
      ).toBeUndefined();
    }
    const path = 'review/evaluation-ontology-i-review.md';
    const expected = await format(
      renderSeedReview(
        {
          meta: atlas.baselineMeta,
          ...Object.fromEntries(
            ['entities', 'claims', 'sources', 'evidence'].map((key) => {
              const k = key as keyof typeof atlas.baseline;
              return [
                k,
                data[k].filter((r) => atlas.baseline[k].ids.includes(r.id)),
              ];
            }),
          ),
        },
        order,
        {
          selection: true,
          title: 'Evaluation Ontology I — exploratory seeds',
        },
      ),
      { ...(await resolveConfig(path)), parser: 'markdown' },
    );
    expect(readFileSync(path, 'utf8').replaceAll('\r\n', '\n')).toBe(expected);
    const sampleText = readFileSync(
      'review/evaluation-ontology-i-spot-check.md',
      'utf8',
    );
    for (const field of ['Human reviewer', 'Inspection date', 'Sample outcome'])
      expect(sampleText).toMatch(
        new RegExp('\\*\\*' + field + ':\\*\\*\\r?\\n(?:\\r?\\n|$)'),
      );
  });
});
