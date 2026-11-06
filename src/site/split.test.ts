import { describe, expect, it } from 'vitest';
import { repository } from '../domain/repository';
import type { Dataset } from '../domain/schema';
import { createSearchIndex } from '../domain/search';
import { buildIndexFiles, chunkShown } from '../domain/search-index';
import { searchCollections, searchFacets } from '../ui/search-facets';
import {
  assemble,
  contentOf,
  coreFields,
  coreOf,
  mergeIndexes,
  mergeSlices,
  packSlice,
  unpackSlice,
  type PlacedSlice,
} from '../domain/slices';
import { collectionIndex, indexFor } from '../domain/collection-index';
import { propositionCollections } from '../reading/human-thought';
import { propositionFrames } from '../reading/proposition-frames';
import { propositionLoaders } from '../reading/proposition-loaders';
import { propositionModules } from '../ui/page-files';
import { wholeCollections } from '../release/whole-collections';
import { applicationCollections } from '../release/collections';
import {
  neighbourhood,
  sliceOf,
  startTrace,
  tracedDataset,
} from '../prerender/trace';
import { checkSlice, renderSlice } from '../prerender/render';

/**
 * The parts of the dataset the browser can load, put together, give the
 * records exactly as the build validated them: nothing lost, nothing added
 * or changed on the way. The browser has the records chunk
 * (src/domain/repository.ts) and the static search index, whose chunks hold
 * every searchable record once. Parts are made from the validated dataset,
 * not the data files: validation trims text (a few stored fields end in a
 * space). See docs/data-loading-design-c.md ("Split completeness").
 */
const data = repository.data;
const kinds = ['entities', 'claims', 'sources', 'evidence'] as const;

/** Every part of the dataset the browser can load. */
const browserParts = (): Dataset[] => [repository.data];

/** The parts put together, record by record and field by field. */
function reassemble(parts: Dataset[]) {
  const merged = Object.fromEntries(
    kinds.map((kind) => [kind, new Map<string, Record<string, unknown>>()]),
  ) as Record<(typeof kinds)[number], Map<string, Record<string, unknown>>>;
  for (const part of parts)
    for (const kind of kinds)
      for (const record of part[kind]) {
        const held = merged[kind].get(record.id);
        for (const [field, value] of Object.entries(record))
          if (held && field in held) expect(held[field]).toEqual(value);
        merged[kind].set(record.id, { ...held, ...record });
      }
  return merged;
}

describe('split completeness', () => {
  it('reassembles every record of the dataset, as validated', () => {
    const merged = reassemble(browserParts());
    for (const kind of kinds) {
      expect(merged[kind].size, kind).toBe(data[kind].length);
      for (const record of data[kind])
        expect(merged[kind].get(record.id), record.id).toEqual(record);
    }
  });

  it('keeps the dataset description', () => {
    expect(browserParts().some((p) => p.meta === data.meta)).toBe(true);
  });
});

describe('split completeness of the search index', () => {
  const facets = searchFacets(data);
  const files = buildIndexFiles(data, {
    collections: searchCollections(data),
    organisations: facets.organisations.map((o) => o.id),
  });
  const index = createSearchIndex(data);
  const stored = files.chunks.flatMap((c) => c.records);

  it('stores every searchable record once, with its searched text', () => {
    expect(stored.length).toBe(index.records.length);
    expect(new Set(stored.map((r) => r.n)).size).toBe(stored.length);
    for (const r of stored) {
      const original = index.records[r.n];
      expect([r.type, r.id], String(r.n)).toEqual([original.type, original.id]);
      expect([...r.fields, ['id', r.id]], r.id).toEqual(
        original.fields.map((f) => [f.field, f.text]),
      );
    }
  });

  it('names each record in the postings of its words', () => {
    const ordinals = new Map<number, number>();
    let ordinal = 0;
    for (const chunk of files.chunks)
      for (const r of chunk.records) ordinals.set(r.n, ordinal++);
    const posted = new Map<string, Set<number>>();
    for (const file of files.postings)
      file.words.forEach((word, i) => {
        let v = 0;
        posted.set(word, new Set(file.postings[i].map((d) => (v += d))));
      });
    expect(files.manifest.types.length).toBe(stored.length);
    for (const record of index.records.filter((_, n) => n % 7 === 0))
      for (const f of record.fields)
        for (const word of f.folded.split(/[^\p{L}\p{N}]+/u).filter(Boolean))
          expect(
            posted.get(word)?.has(ordinals.get(index.records.indexOf(record))!),
            word,
          ).toBe(true);
  });

  it("shows records with the dataset's own values", () => {
    for (const chunk of files.chunks) {
      const shown = chunkShown(chunk);
      for (const kind of kinds)
        for (const record of shown[kind] as { id: string }[]) {
          const original = repository[kind].get(record.id) as unknown as Record<
            string,
            unknown
          >;
          for (const [field, value] of Object.entries(record))
            expect(value, `${record.id}.${field}`).toEqual(original[field]);
        }
    }
  });
});

describe('split completeness of per-page data', () => {
  const held = coreOf(data);

  it('holds every record in the core, with its relation fields, in order', () => {
    for (const kind of kinds) {
      expect(held[kind].length, kind).toBe(data[kind].length);
      data[kind].forEach((record, i) => {
        expect(held.at[kind][i]).toBe(i);
        for (const field of coreFields[kind])
          expect(
            (held[kind][i] as Record<string, unknown>)[field],
            `${record.id}.${field}`,
          ).toEqual((record as unknown as Record<string, unknown>)[field]);
      });
    }
  });

  it("puts in each slice records with the dataset's own values and places", async () => {
    for (const path of [
      '/dossier/openai',
      '/person/eliezer-yudkowsky',
      '/document/rsp-v2-0',
      '/claim/dario-anthropic-2021',
      '/propositions/superintelligence',
    ]) {
      const { slice } = (await renderSlice(path))!;
      for (const kind of kinds)
        slice[kind].forEach((record, i) => {
          const original = data[kind][slice.at[kind][i]] as unknown as Record<
            string,
            unknown
          >;
          expect(original.id, path).toBe(record.id);
          for (const [field, value] of Object.entries(record))
            expect(value, `${path} ${record.id}.${field}`).toEqual(
              original[field],
            );
          // A slice stands alone: each record has its relation fields.
          for (const field of coreFields[kind])
            expect(
              record[field as keyof typeof record],
              `${path} ${field}`,
            ).toEqual(original[field]);
        });
    }
  });
});

describe('slice files', () => {
  it('gives back every slice as it was packed, field for field', async () => {
    for (const path of [
      '/compare/model-cards',
      '/dossier/openai',
      '/claim/dario-anthropic-2021',
    ]) {
      const { slice } = (await renderSlice(path))!;
      const file = JSON.parse(JSON.stringify(packSlice(slice)));
      expect(unpackSlice(file), path).toEqual(
        JSON.parse(JSON.stringify(slice)),
      );
    }
    const core = coreOf(data);
    expect(unpackSlice(JSON.parse(JSON.stringify(packSlice(core))))).toEqual(
      JSON.parse(JSON.stringify(core)),
    );
  });

  it('reads a slice that is not packed as it stands', () => {
    const core = coreOf(data);
    expect(unpackSlice(core)).toBe(core);
  });
});

describe('the collection index in slices', () => {
  const whole = collectionIndex(data);
  const sample = [
    '/dossier/openai',
    '/person/eliezer-yudkowsky',
    '/document/rsp-v2-0',
    '/claim/dario-anthropic-2021',
    '/propositions/risk-debate',
    '/year/2025',
  ];

  it("carries in each slice only the entries of the slice's own records", async () => {
    for (const path of sample) {
      const { slice } = (await renderSlice(path))!;
      const index = slice.index!;
      const claims = new Set(slice.claims.map((c) => c.id));
      const entities = new Set(slice.entities.map((e) => e.id));
      expect(
        index.byClaim.every(([id]) => claims.has(id)),
        path,
      ).toBe(true);
      expect(
        index.marks.every(([id]) => entities.has(id)),
        path,
      ).toBe(true);
      // Every collection, in order, with only the claims the slice holds.
      expect(index.collections.map((c) => c.title)).toEqual(
        whole.collections.map((c) => c.title),
      );
      for (const c of index.collections)
        expect(
          c.claimIds.every((id) => claims.has(id)),
          path,
        ).toBe(true);
      // Each entry as the whole index has it.
      const byClaim = new Map(whole.byClaim);
      for (const [id, keys] of index.byClaim)
        expect(keys, id).toEqual(byClaim.get(id));
      expect(index.byClaim.length, path).toBe(
        whole.byClaim.filter(([id]) => claims.has(id)).length,
      );
      // The chronicle's years whole; its dates those of the claims held.
      expect(index.chronicle.years, path).toEqual(whole.chronicle.years);
      expect(
        index.chronicle.scheduled.every((key) =>
          claims.has(key.slice(0, key.lastIndexOf('@'))),
        ),
        path,
      ).toBe(true);
      expect(index.chronicle.statedBy, path).toEqual(
        whole.chronicle.statedBy.flatMap(([year, list]) => {
          const held = list.filter(([id]) => claims.has(id));
          return held.length ? [[year, held]] : [];
        }),
      );
    }
  });

  it("gives a year page the stated dates of its year's records", async () => {
    const { slice } = (await renderSlice('/year/2025'))!;
    const stated = whole.chronicle.statedBy.find(([y]) => y === 2025)![1];
    expect(stated.length).toBeGreaterThan(0);
    expect(
      slice.index!.chronicle.statedBy.find(([y]) => y === 2025)![1],
    ).toEqual(stated);
    // Not the whole index: other years' stated dates are left out.
    expect(slice.index!.chronicle.statedBy.length).toBeLessThan(
      whole.chronicle.statedBy.length,
    );
  });

  it("gives a person's page the records of texts the person wrote", async () => {
    const { slice } = (await renderSlice('/person/eliezer-yudkowsky'))!;
    const records = slice.index!.collections.flatMap((c) => c.records ?? []);
    expect(records.length).toBeGreaterThan(50);
  });

  it('puts the entries of several slices together as one slice of their records', async () => {
    // One at a time: drawing a page holds its parts in the one store.
    const slices: PlacedSlice[] = [];
    for (const path of sample) slices.push((await renderSlice(path))!.slice);
    const merged = mergeSlices(slices);
    const together = indexFor(whole, data, merged);
    const sorted = (index: typeof whole) => ({
      byClaim: [...index.byClaim].sort((a, b) => a[0].localeCompare(b[0])),
      marks: [...index.marks].sort((a, b) => a[0].localeCompare(b[0])),
      collections: index.collections.map((c) => ({
        ...c,
        claimIds: [...c.claimIds].sort(),
        ...(c.records
          ? {
              records: [...c.records].sort((a, b) =>
                a.claim.id.localeCompare(b.claim.id),
              ),
            }
          : {}),
      })),
    });
    // The person's records by author come from the person's slice alone.
    expect(sorted(merged.index!).byClaim).toEqual(sorted(together).byClaim);
    expect(sorted(merged.index!).marks).toEqual(sorted(together).marks);
    expect(sorted(merged.index!).collections.map((c) => c.claimIds)).toEqual(
      sorted(together).collections.map((c) => c.claimIds),
    );
    expect(merged.index!.chronicle).toEqual(together.chronicle);
    expect(mergeIndexes([slices[0].index!])).toBe(slices[0].index);
    expect(mergeIndexes([])).toBeUndefined();
  });

  it('gives a slice that needs the whole relation core the whole index', () => {
    const slice = { ...coreOf(data), core: true as const };
    expect(indexFor(whole, data, slice)).toBe(whole);
  });
});

describe('propositions collections without their text', () => {
  it('are their whole collections without the text, in the same order', () => {
    expect(propositionFrames.map((f) => f.id)).toEqual(
      propositionCollections.map((c) => c.id),
    );
    const text = [
      'introduction',
      'searchNote',
      'corrections',
      'limits',
      'openPremises',
      'related',
      'exchanges',
    ];
    propositionCollections.forEach((whole, i) => {
      const frame = propositionFrames[i] as Record<string, unknown>;
      for (const [field, value] of Object.entries(whole))
        if (text.includes(field)) expect(frame[field], field).toBeUndefined();
        // The frame's groups leave out the descriptions only the page shows.
        else if (field === 'groups')
          expect(frame.groups, `${whole.id}.groups`).toEqual(
            whole.groups.map((g) => ({
              id: g.id,
              label: g.label,
              propositionIds: g.propositionIds,
            })),
          );
        else expect(frame[field], `${whole.id}.${field}`).toBe(value);
    });
  });

  it('load each collection whole by its ID, from the module the build names', async () => {
    const ids = propositionCollections.map((c) => c.id).sort();
    expect(Object.keys(propositionLoaders).sort()).toEqual(ids);
    expect(Object.keys(propositionModules).sort()).toEqual(ids);
    for (const whole of propositionCollections) {
      expect(await propositionLoaders[whole.id](), whole.id).toBe(whole);
      const module = (await import(
        /* @vite-ignore */ `../../${propositionModules[whole.id]}`
      )) as Record<string, unknown>;
      expect(Object.values(module), whole.id).toContain(whole);
    }
  });

  it('are recorded whole in releases', () => {
    expect(wholeCollections.map((c) => c.definition.id)).toEqual(
      applicationCollections.map((c) => c.definition.id),
    );
    for (const c of wholeCollections.filter((c) => c.kind === 'propositions'))
      expect(propositionCollections).toContain(c.definition);
  });
});

describe('the dataset description in a slice', () => {
  const keys = (slice: PlacedSlice) => Object.keys(slice.meta ?? {});

  it('carries only the fields of the description read, in stored order', () => {
    const traced = tracedDataset(data);
    const trace = startTrace();
    void traced.meta.updatedAt;
    void traced.meta.anchors.length;
    void ('missing' in traced.meta);
    const slice = sliceOf(data, trace);
    const stored = Object.keys(data.meta).filter(
      (f) => f === 'anchors' || f === 'updatedAt',
    );
    expect(keys(slice)).toEqual(stored);
    expect(slice.meta!.anchors).toEqual(data.meta.anchors);
    // Read whole (spread, JSON), it is carried whole.
    const whole = startTrace();
    void { ...traced.meta };
    expect(sliceOf(data, whole).meta).toEqual(data.meta);
    // Unread, it is not carried.
    expect(sliceOf(data, startTrace()).meta).toBeUndefined();
  });

  it("carries a page's fields read: the anchors alone for a dossier", async () => {
    const dossier = (await renderSlice('/dossier/openai'))!;
    expect(keys(dossier.slice)).toEqual(['anchors']);
    expect(dossier.slice.meta!.anchors).toEqual(data.meta.anchors);
    // Whatever another page reads of it, it carries as stored.
    const document = (await renderSlice('/document/rsp-v2-0'))!;
    for (const [field, value] of Object.entries(document.slice.meta ?? {}))
      expect(value, field).toEqual(data.meta[field as keyof typeof data.meta]);
  });

  it('puts the fields of several slices together', async () => {
    const part = (meta: PlacedSlice['meta']): PlacedSlice => ({
      ...(meta ? { meta } : {}),
      entities: [],
      claims: [],
      sources: [],
      evidence: [],
      at: { entities: [], claims: [], sources: [], evidence: [] },
    });
    const { anchors, updatedAt, schemaVersion } = data.meta;
    expect(
      mergeSlices([
        part({ anchors }),
        part(undefined),
        part({ updatedAt, anchors }),
      ]).meta,
    ).toEqual({ anchors, updatedAt });
    expect(mergeSlices([part(undefined)]).meta).toBeUndefined();
    // The fullest description first: one read whole keeps its stored order.
    expect(
      Object.keys(mergeSlices([part({ anchors }), part(data.meta)]).meta!),
    ).toEqual(Object.keys(data.meta));
    expect(
      mergeSlices([part({ schemaVersion }), part({ updatedAt })]).meta,
    ).toEqual({ schemaVersion, updatedAt });
    // Pages draw alike when held with slices carrying other fields.
    const pages = ['/dossier/openai', '/about', '/document/rsp-v2-0'];
    const drawn: NonNullable<Awaited<ReturnType<typeof renderSlice>>>[] = [];
    for (const page of pages) drawn.push((await renderSlice(page))!);
    for (const [i, page] of pages.entries()) {
      const others = Object.fromEntries(
        pages.flatMap((p, k) => (k === i ? [] : [[p, drawn[k].slice]])),
      );
      expect(
        await checkSlice(page, drawn[i].slice, drawn[i].html, others),
        page,
      ).toBe(true);
    }
  });
});

describe('the neighbourhood of a slice', () => {
  it("holds each claim's passages, subject and object, each passage's claim and source", () => {
    const claim = data.claims.find((c) => c.object.kind === 'entity')!;
    const passage = data.evidence.find((e) => e.claimId !== claim.id)!;
    const near = neighbourhood(data, {
      entities: new Set(),
      claims: new Set([claim.id]),
      sources: new Set(),
      evidence: new Set([passage.id]),
    });
    for (const id of [claim.id, passage.claimId])
      expect(near.claims.has(id), id).toBe(true);
    for (const c of data.claims.filter((c) => near.claims.has(c.id))) {
      for (const e of data.evidence.filter((e) => e.claimId === c.id))
        expect(near.evidence.has(e.id), e.id).toBe(true);
      expect(near.entities.has(c.subject), c.subject).toBe(true);
      if (c.object.kind === 'entity')
        expect(near.entities.has(c.object.entityId)).toBe(true);
    }
    for (const e of data.evidence.filter((e) => near.evidence.has(e.id)))
      expect(near.sources.has(e.sourceId), e.sourceId).toBe(true);
  });
});

describe('split completeness of the whole records', () => {
  it('puts the core and the content together into the dataset, field order and all', () => {
    // As the browser reads them: modules of JSON.
    const json = <T>(value: T): T => JSON.parse(JSON.stringify(value));
    const whole = assemble(json(coreOf(data)), json(contentOf(data)));
    // Exports serialise records, so the order of their fields counts too.
    expect(JSON.stringify(whole)).toBe(JSON.stringify(data));
  });

  it('refuses a core and content of different versions', () => {
    const core = { ...coreOf(data), version: 'other' };
    expect(() => assemble(core, contentOf(data))).toThrow(/versions/);
  });
});
