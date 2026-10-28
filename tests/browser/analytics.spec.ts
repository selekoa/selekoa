import { readSiteConfig } from '../../scripts/site-config';
import { analyticsTag } from '../../src/site/site-config';
import { expect, test } from './fixtures';

// The other specs replace the analytics script with an empty one; this checks
// that the build under test still carries the configured tag.
test('the built start page carries the configured analytics tag', async ({
  request,
}) => {
  const tag = analyticsTag(readSiteConfig());
  const html = await (await request.get('/')).text();
  if (tag) expect(html).toContain(tag);
  else expect(html).not.toMatch(/cloudflareinsights|goatcounter/);
});
