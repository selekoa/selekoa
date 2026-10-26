import { describe, expect, it } from 'vitest';
import { seriesLabel, versionStatus } from './version';

describe('version wording', () => {
  it('says 0.x is a work in progress', () => {
    expect(seriesLabel('0.4.0')).toBe('0.x');
    expect(versionStatus('0.12.3')).toBe('version 0.x, a work in progress');
  });
  it('does not call a later series a work in progress', () => {
    expect(versionStatus('1.0.0')).toBe('version 1.x');
  });
  it('copes with no release', () => {
    expect(seriesLabel(null)).toBeNull();
    expect(versionStatus(null)).toBe('a work in progress');
  });
});
