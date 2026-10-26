import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  buildRelease,
  changelogIndex,
  compareReleases,
  inputFingerprint,
  inputFromRelease,
  type ReleaseRecords,
  type Removals,
} from './build';
import {
  currentInput,
  readRelease,
  readRemovals,
  releasedVersions,
} from './files';
import {
  csvColumns,
  recordFields,
  recordTypes,
  releaseFormatVersion,
  writableFormatVersions,
} from './format';

const slow = { timeout: 120_000 };
const versions = await releasedVersions();
const latest = versions.at(-1)!;
// After later data edits, releases are checked from their own records instead.
const dataUnchanged =
  (await readRelease(latest)).manifest.inputFingerprint ===
  (await inputFingerprint(currentInput()));
const ids = (records: ReleaseRecords, type: (typeof recordTypes)[number]) =>
  new Set(records[type].map((r) => r.id as string));
const recordedRemovals = (changesJson: string): Removals =>
  Object.fromEntries(
    Object.entries(
      JSON.parse(changesJson).removed as Record<
        string,
        { id: string; reason: string }[]
      >,
    ).map(([t, rows]) => [
      t,
      Object.fromEntries(rows.map((r) => [r.id, r.reason])),
    ]),
  );
const empty = (): ReleaseRecords =>
  Object.fromEntries(
    recordTypes.map((t) => [t, []]),
  ) as unknown as ReleaseRecords;

describe('dataset releases', () => {
  it('has a first release', () => {
    expect(versions[0]).toBe('0.1.0');
  });

  it.each(versions)('v%s matches its manifest checksums', async (version) => {
    const { manifest, files } = await readRelease(version);
    expect(manifest.version).toBe(version);
    const listed = manifest.files.map((f) => f.path);
    expect([...listed, 'manifest.json'].sort()).toEqual(
      Object.keys(files).sort(),
    );
    for (const file of manifest.files) {
      const bytes = Buffer.from(files[file.path], 'utf8');
      expect(bytes.length, file.path).toBe(file.bytes);
      expect(createHash('sha256').update(bytes).digest('hex'), file.path).toBe(
        file.sha256,
      );
    }
  });

  it.each(versions)(
    'v%s reproduces byte for byte from its own records',
    async (version) => {
      const released = await readRelease(version);
      const { formatVersion } = released.manifest;
      if (
        !(writableFormatVersions as readonly string[]).includes(formatVersion)
      )
        return;
      const input = inputFromRelease(released.records, released.manifest);
      expect(await inputFingerprint(input)).toBe(
        released.manifest.inputFingerprint,
      );
      const index = versions.indexOf(version);
      const previous =
        index > 0 ? await readRelease(versions[index - 1]) : null;
      const rebuilt = await buildRelease({
        input,
        version,
        date: released.manifest.releasedAt,
        previous,
        removals: recordedRemovals(released.files['changes.json']),
        formatVersion,
      });
      expect(Object.keys(rebuilt.files).sort()).toEqual(
        Object.keys(released.files).sort(),
      );
      for (const name of Object.keys(rebuilt.files))
        expect(rebuilt.files[name] === released.files[name], name).toBe(true);
    },
    slow.timeout,
  );

  it.runIf(dataUnchanged)(
    'the latest release reproduces from the current data',
    async () => {
      const released = await readRelease(latest);
      const input = currentInput();
      const index = versions.indexOf(latest);
      const rebuilt = await buildRelease({
        input,
        version: latest,
        date: released.manifest.releasedAt,
        previous: index > 0 ? await readRelease(versions[index - 1]) : null,
        removals: recordedRemovals(released.files['changes.json']),
        formatVersion: released.manifest.formatVersion,
      });
      expect(Object.keys(rebuilt.files).sort()).toEqual(
        Object.keys(released.files).sort(),
      );
      for (const name of Object.keys(released.files))
        expect(rebuilt.files[name] === released.files[name], name).toBe(true);
    },
    slow.timeout,
  );

  it('never drops a released ID without a listed removal', async () => {
    for (let i = 1; i < versions.length; i++) {
      const before = await readRelease(versions[i - 1]);
      const after = await readRelease(versions[i]);
      const changes = JSON.parse(after.files['changes.json']);
      for (const type of recordTypes) {
        const kept = ids(after.records, type);
        const gone = [...ids(before.records, type)].filter(
          (id) => !kept.has(id),
        );
        expect(
          changes.removed[type].map((r: { id: string }) => r.id).sort(),
        ).toEqual(gone.sort());
        for (const id of gone)
          expect(after.files['CHANGELOG.md']).toContain('`' + id + '`');
      }
    }
  });

  it('keeps every ID of the latest release in the current data or in release/removals.json', async () => {
    const released = await readRelease(latest);
    const removals = await readRemovals();
    const input = currentInput();
    const current: Record<string, Set<string>> = {
      entities: new Set(input.entities.map((r) => r.id)),
      claims: new Set(input.claims.map((r) => r.id)),
      evidence: new Set(input.evidence.map((r) => r.id)),
      sources: new Set(input.sources.map((r) => r.id)),
      collections: new Set(
        input.collections.map((c) => `${c.kind}/${c.definition.id}`),
      ),
    };
    const silent = recordTypes.flatMap((type) =>
      [...ids(released.records, type)]
        .filter((id) => !current[type].has(id) && !removals[type]?.[id])
        .map((id) => `${type}/${id}`),
    );
    expect(silent).toEqual([]);
  });

  it('keeps the changelog index current', async () => {
    const manifests = await Promise.all(
      versions.map(async (v) => (await readRelease(v)).manifest),
    );
    expect(await readFile('release/CHANGELOG.md', 'utf8')).toBe(
      changelogIndex(manifests),
    );
  });

  it('keeps quoted source text in the third-party quote field only', async () => {
    const { records, manifest } = await readRelease(latest);
    expect(manifest.thirdPartyText.fields).toEqual(['evidence.quote']);
    for (const e of records.evidence) {
      expect(e.passageType === 'quote', e.id as string).toBe('quote' in e);
      expect('quote' in e !== 'paraphrase' in e, e.id as string).toBe(true);
      expect('passage' in e).toBe(false);
    }
    // Releases before format 1.4 say no licence is granted; they are immutable.
    expect(manifest.licence.granted).toBe(
      !['1.1', '1.2', '1.3'].includes(manifest.formatVersion),
    );
  });

  it('documents every released field and CSV column', async () => {
    const doc = await readFile('docs/dataset-format.md', 'utf8');
    for (const type of recordTypes) {
      for (const field of recordFields[type])
        expect(doc, `${type}.${field.name}`).toContain('`' + field.name + '`');
      for (const column of csvColumns[type])
        expect(doc, `${type}.csv ${column}`).toContain(column);
    }
  });
});

describe('release comparison', () => {
  const records = (claims: Record<string, unknown>[]) => ({
    ...empty(),
    claims,
  });
  const previous = {
    version: '0.1.0',
    records: records([
      { id: 'a', statement: 'A' },
      { id: 'b', statement: 'B' },
    ]),
  };

  it('refuses a silent removal', () => {
    expect(() =>
      compareReleases(
        '0.2.0',
        records([{ id: 'a', statement: 'A' }]),
        previous,
        {},
      ),
    ).toThrow(/without a recorded removal reason.*claims\/b/);
  });

  it('lists additions, changes and reasoned removals by ID', () => {
    const changes = compareReleases(
      '0.2.0',
      records([
        { id: 'a', statement: 'A, corrected' },
        { id: 'c', statement: 'C' },
      ]),
      previous,
      { claims: { b: 'Duplicate of claim a.' } },
    );
    expect(changes.added.claims).toEqual(['c']);
    expect(changes.changed.claims).toEqual(['a']);
    expect(changes.removed.claims).toEqual([
      { id: 'b', reason: 'Duplicate of claim a.' },
    ]);
  });

  it('refuses to number a release at or below the previous one', async () => {
    const released = await readRelease(latest);
    await expect(
      buildRelease({
        input: currentInput(),
        version: latest,
        date: '2026-10-04',
        previous: { version: latest, records: released.records },
      }),
    ).rejects.toThrow(/must be later/);
  });
});

describe('citations in a release', () => {
  it(
    'gives every source as a CSL-JSON item from format 1.2',
    async () => {
      const released = await readRelease(latest);
      const release = await buildRelease({
        input: currentInput(),
        version: '999.0.0',
        date: '2026-10-07',
        previous: { version: latest, records: released.records },
        removals: await readRemovals(),
      });
      expect(release.manifest.formatVersion).toBe(releaseFormatVersion);
      expect(release.manifest.files.map((f) => f.path)).toContain(
        'sources.csl.json',
      );
      const items = JSON.parse(release.files['sources.csl.json']) as {
        id: string;
      }[];
      const sources = JSON.parse(release.files['sources.json']) as {
        id: string;
      }[];
      expect(items.map((i) => i.id)).toEqual(sources.map((s) => s.id));
      const fields = new Set(items.flatMap((i) => Object.keys(i)));
      expect([...fields].sort()).toEqual(
        [
          'URL',
          'accessed',
          'author',
          'container-title',
          'id',
          'issued',
          'language',
          'note',
          'publisher',
          'title',
          'type',
        ].sort(),
      );
      expect(release.files['README.md']).toContain('`sources.csl.json`');
    },
    slow.timeout,
  );

  it(
    'states the licence from format 1.4 and still says none for 1.3',
    async () => {
      const released = await readRelease(latest);
      const make = (formatVersion: string) =>
        buildRelease({
          input: inputFromRelease(released.records, released.manifest),
          version: '999.0.0',
          date: '2026-10-07',
          previous: null,
          formatVersion,
        });
      const current = await make(releaseFormatVersion);
      expect(current.manifest.licence).toMatchObject({
        granted: true,
        data: { spdx: 'CC-BY-4.0' },
        code: { spdx: 'MIT' },
      });
      expect(current.files['README.md']).toContain('CC BY 4.0');
      expect(current.files['README.md']).not.toContain('unpublished');
      const older = await make('1.3');
      expect(older.manifest.licence.granted).toBe(false);
      expect(older.files['README.md']).toContain('No licence is granted');
    },
    slow.timeout,
  );

  it('refuses a format it cannot write', async () => {
    await expect(
      buildRelease({
        input: currentInput(),
        version: '999.0.0',
        date: '2026-10-07',
        previous: null,
        formatVersion: '1.0',
      }),
    ).rejects.toThrow(/cannot be written/);
  });
});
