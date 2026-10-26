import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import {
  renderSupplement,
  validateSupplement,
} from './research-supplement.mjs';

const input = JSON.parse(
  await readFile(
    new URL(
      '../research/collections/research-baseline-supplement-v1/supplement.json',
      import.meta.url,
    ),
    'utf8',
  ),
);
const altered = (edit) => {
  const copy = structuredClone(input);
  edit(copy);
  return copy;
};

test('frozen supplement reproduces the complete packet without changing human states', async () => {
  const before = JSON.stringify(input);
  assert.equal(
    await renderSupplement(input),
    await readFile(
      new URL(
        '../research/collections/research-baseline-supplement-v1/packet.md',
        import.meta.url,
      ),
      'utf8',
    ),
  );
  assert.equal(JSON.stringify(input), before);
});
test('rejects promotion of a title observation to complete evidence review or acceptance', () => {
  for (const edit of [
    (s) => {
      s.humanObservations[0].scope = 'complete_document';
    },
    (s) => {
      s.humanObservations[0].editorialDecision = 'YES';
    },
    (s) => {
      s.humanObservations[0].observedAt = '2026-09-28';
    },
    (s) => {
      s.humanObservations[0].notReviewed = [];
    },
    (s) => {
      s.evidence[1].humanObservationIds = ['RBS1-H01'];
    },
    (s) => {
      s.editorialAcceptance = 'accepted';
    },
  ])
    assert.throws(() => validateSupplement(altered(edit)));
});
test('rejects capture substitutions and conflation of document and capture dates', () => {
  for (const edit of [
    (s) => {
      s.sources[0].resolvedUrl = 'https://intelligence.org/files/CEV.pdf';
    },
    (s) => {
      s.sources[0].captureTimestamp = '2004-05-01T00:00:00Z';
    },
    (s) => {
      s.sources[0].displayedPublicationDate = '2004-06-23';
    },
  ])
    assert.throws(() => validateSupplement(altered(edit)));
});
test('rejects invented employment boundaries, continuity and exact-name priority', () => {
  for (const edit of [
    (s) => {
      s.employmentInterval.start = '2013-05-01';
    },
    (s) => {
      s.employmentInterval.end = '2015-03-17';
    },
    (s) => {
      s.employmentInterval.continuity = 'confirmed';
    },
    (s) => {
      s.exactNamePriority = 'supported';
    },
  ])
    assert.throws(() => validateSupplement(altered(edit)));
});
test('rejects detached evidence, duplicates and borrowing another finding evidence', () => {
  for (const edit of [
    (s) => {
      s.evidence[0].sourceId = 'unknown';
    },
    (s) => {
      s.sources.push(s.sources[0]);
    },
    (s) => {
      s.findings[3].evidenceIds.push('RBS1-E03');
    },
  ])
    assert.throws(() => validateSupplement(altered(edit)));
});
test('reader failure cannot be rewritten as an observed HTTP 404', () => {
  assert.throws(() =>
    validateSupplement(
      altered((s) => {
        s.retrievalFailures[0].httpStatus = 404;
      }),
    ),
  );
});
