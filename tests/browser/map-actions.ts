import { expect, type Page } from './fixtures';

// Click a real, unobscured point on the rendered curve, not a historical pixel.
export async function clickMapClaim(page: Page, id: string) {
  const line = page.locator(`.map-edge[data-claim-ids~="${id}"] .edge-hit`);
  await line.scrollIntoViewIfNeeded();
  const point = await line.evaluate((node) => {
    const path = node as SVGPathElement;
    const bundle = path.parentElement!.getAttribute('data-bundle-id');
    const matrix = path.getScreenCTM()!;
    for (const t of [0.25, 0.75, 0.4, 0.6, 0.15, 0.85, 0.5]) {
      const p = path
        .getPointAtLength(path.getTotalLength() * t)
        .matrixTransform(matrix);
      if (
        document
          .elementFromPoint(p.x, p.y)
          ?.closest('[data-bundle-id]')
          ?.getAttribute('data-bundle-id') === bundle
      )
        return { x: p.x, y: p.y };
    }
    return null;
  });
  expect(point, `An exposed click target for ${id}`).not.toBeNull();
  await page.mouse.move(point!.x, point!.y);
  await page.mouse.click(point!.x, point!.y);
}
