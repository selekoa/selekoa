import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { format, resolveConfig } from 'prettier';
import { createRepository } from '../domain/repository';
import { propositionsView } from '../domain/propositions';
import { superintelligencePropositions } from '../reading/human-thought';
import { earliestPacketPath, renderEarliestPacket } from './earliest-packet';
import { preEarliestFixesRaw } from './historical-views';

// The stored packet was checked as generated, before the corrections from
// that check were applied, so it is reproduced from the earlier records.
const checked = createRepository(preEarliestFixesRaw).data;

describe('cross-model packet of earliest-located records', () => {
  it('matches the stored packet and holds every headline record once', async () => {
    const body = renderEarliestPacket(checked, superintelligencePropositions);
    const options = (await resolveConfig(earliestPacketPath)) ?? {};
    expect(readFileSync(earliestPacketPath, 'utf8')).toBe(
      await format(body, { ...options, parser: 'markdown' }),
    );
    const view = propositionsView(checked, superintelligencePropositions);
    const headlines = new Set(
      view.groups
        .flatMap((g) => g.propositions)
        .flatMap((p) => [p.earliest, p.earliestTerm])
        .filter((r) => r !== null)
        .map((r) => r.claim.id),
    );
    const listed = [...body.matchAll(/^## [A-C]\d+ .*: `([^`]+)`$/gm)].map(
      (m) => m[1],
    );
    expect(listed.sort()).toEqual([...headlines].sort());
    expect(body).not.toMatch(/\b(agree|disagree|unable)\b:/);
  });
});
