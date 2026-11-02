import { test, expect, type Page } from './fixtures';

// The pre-launch interface batch (review/prelaunch-interface-2026-11-01.md):
// the comparison's fixed headers, drawer, question pages and CSV file; the
// start page's "Ways in" panel and title; the banner and the footer contact.

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

const comparison = '/compare/frontier-safety-frameworks';

/** A minimal RFC 4180 reader. */
function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        value += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else value += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') {
      row.push(value);
      value = '';
    } else if (ch === '\r' && text[i + 1] === '\n') {
      row.push(value);
      rows.push(row);
      row = [];
      value = '';
      i++;
    } else value += ch;
  }
  return rows;
}

test('the comparison table keeps its headers and question column in place, and a cell opens in a drawer', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(comparison);
  // The table takes the page width, beyond the reading column.
  const scroller = page.locator('.cmp-scroll');
  expect((await scroller.boundingBox())!.width).toBeGreaterThan(1100);
  // No drawer until a cell is inspected.
  await expect(page.locator('.cmp-drawer')).toHaveCount(0);
  const header = page.locator('.cmp-table thead th').nth(1);
  const question = page.locator('.cmp-table tbody th[scope="row"]').first();
  const before = {
    header: (await header.boundingBox())!,
    question: (await question.boundingBox())!,
  };
  // Scroll the table's own box down and sideways.
  await scroller.evaluate((el) => el.scrollTo(400, 1200));
  await expect
    .poll(async () => (await header.boundingBox())!.y)
    .toBeCloseTo(before.header.y, 0);
  expect((await question.boundingBox())!.x).toBeCloseTo(before.question.x, 0);
  // The page itself never scrolls sideways.
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  // Keyboard: Tab moves through the table and out of it again.
  await scroller.focus();
  await page.keyboard.press('Tab');
  const inside = await page.evaluate(
    () => !!document.activeElement?.closest('.cmp-scroll'),
  );
  expect(inside).toBe(true);
  // Inspect a cell: the drawer opens, Escape closes it and returns focus.
  await scroller.evaluate((el) => el.scrollTo(0, 0));
  const inspect = page
    .locator('.cmp-table td')
    .getByRole('button', { name: /Inspect sources and checks/ })
    .first();
  await inspect.click();
  const drawer = page.locator('.cmp-drawer');
  await expect(drawer).toBeVisible();
  await expect(drawer.locator('#inspector')).toBeFocused();
  await expect(page).toHaveURL(/\?inspect=/);
  await page.keyboard.press('Escape');
  await expect(drawer).toHaveCount(0);
  await expect(inspect).toBeFocused();
  await expect(page).not.toHaveURL(/inspect=/);
  expect(errors).toEqual([]);
});

test('each question has a page of its own, built with its own records', async ({
  page,
}) => {
  const errors = collectErrors(page);
  const response = await page.goto(`${comparison}/d3-halt`);
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(
    'Compare frontier safety frameworks: pause, non-deployment or non-training · Selekoa',
  );
  await expect(page.locator('#cmp-question-title')).toContainText(
    'Pause, non-deployment or non-training',
  );
  await expect(page.locator('.cmp-rows > li')).toHaveCount(7);
  await expect(
    page.getByRole('button', { name: 'One question' }),
  ).toHaveAttribute('aria-pressed', 'true');
  // The page loads its own slice, not the whole records.
  const slice = await page.evaluate(() =>
    performance
      .getEntriesByType('resource')
      .map((e) => e.name)
      .filter((n) => n.includes('/slices/')),
  );
  expect(
    slice.some((n) =>
      n.endsWith('/slices/compare/frontier-safety-frameworks/d3-halt.json'),
    ),
  ).toBe(true);
  // Every question links to its page; choosing one changes the address.
  const nav = page.getByRole('navigation', { name: 'Every question' });
  await nav.getByRole('link', { name: 'Board or external oversight' }).click();
  await expect(page).toHaveURL(new RegExp(`${comparison}/d4-oversight$`));
  await expect(page.locator('#cmp-question-title')).toContainText(
    'Board or external oversight',
  );
  // Back to every question.
  await page.getByRole('button', { name: 'All frameworks' }).click();
  await expect(page).toHaveURL(new RegExp(`${comparison}$`));
  await expect(page.locator('.cmp-table')).toBeVisible();
  // The table's question names link to the question pages too.
  await expect(
    page
      .locator('.cmp-table tbody th[scope="row"]')
      .getByRole('link', { name: 'Safeguards required' }),
  ).toHaveAttribute('href', `${comparison}/d3-safeguards`);
  // The earlier query form still opens the question.
  await page.goto(`${comparison}?facet=D3.halt`);
  await expect(page.locator('#cmp-question-title')).toContainText(
    'Pause, non-deployment or non-training',
  );
  expect(errors).toEqual([]);
});

test('side by side shows two or three chosen frameworks', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto(comparison);
  await page.getByRole('button', { name: 'Side by side', exact: true }).click();
  const heads = page.locator('.cmp-table thead th');
  await expect(heads).toHaveCount(3);
  const pair = page.getByRole('group', { name: /Frameworks side by side/ });
  const boxes = pair.getByRole('checkbox');
  // Two chosen: neither can be cleared; a third can be added, not a fourth.
  await expect(boxes.nth(0)).toBeDisabled();
  await boxes.nth(4).check();
  await expect(heads).toHaveCount(4);
  await expect(boxes.nth(5)).toBeDisabled();
  await boxes.nth(0).uncheck();
  await expect(heads).toHaveCount(3);
  await expect(heads.nth(1)).toContainText('Google DeepMind');
  // The choice is in the address, and the address reopens it.
  await expect(page).toHaveURL(
    /\?frameworks=deepmind-fsf(%2C|,)openai-frontier-governance$/,
  );
  const address = page.url();
  await page.goto(address);
  await expect(
    page.getByRole('button', { name: 'Side by side', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(heads).toHaveCount(3);
  await expect(heads.nth(2)).toContainText('OpenAI');
  // Back to every framework clears it.
  await page.getByRole('button', { name: 'All frameworks' }).click();
  await expect(page).toHaveURL(new RegExp(`${comparison}$`));
  expect(errors).toEqual([]);
});

test('the CSV file gives the same cells as the table', async ({ page }) => {
  await page.goto(comparison);
  const link = page.getByRole('link', { name: 'Download every cell as CSV' });
  await expect(link).toHaveAttribute('href', `${comparison}.csv`);
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    link.click(),
  ]);
  const text = await (
    await download.createReadStream()
  )
    .toArray()
    .then((chunks) => Buffer.concat(chunks).toString('utf8'));
  const [head, ...rows] = parseCsv(text);
  const col = (name: string) => head.indexOf(name);
  expect(col('status')).toBeGreaterThan(-1);
  // Every cell of the table (the latest editions) has its row, with the
  // same status and, for a quoted cell, the same first passage.
  const cells = await page.evaluate(() => {
    const frameworks = [
      ...document.querySelectorAll('.cmp-table thead th:not(:first-child)'),
    ].map((th) => th.firstChild!.textContent!.trim());
    const editions = [
      ...document.querySelectorAll(
        '.cmp-table thead th:not(:first-child) .cmp-edition',
      ),
    ].map((e) => e.textContent!.split(' · ')[0].trim());
    return [...document.querySelectorAll('.cmp-table tbody tr')]
      .filter((tr) => tr.querySelector('th[scope="row"]'))
      .flatMap((tr) => {
        const question = tr
          .querySelector('th[scope="row"] a')!
          .textContent!.trim();
        return [...tr.querySelectorAll('td')].map((td, i) => ({
          framework: frameworks[i],
          question,
          status: td.querySelector('.cmp-status')!.textContent!.trim(),
          quote: td.querySelector('blockquote')?.textContent?.trim() ?? null,
          edition: editions[i],
        }));
      });
  });
  expect(cells.length).toBeGreaterThan(100);
  for (const cell of cells) {
    const row = rows.find(
      (r) =>
        r[col('framework')] === cell.framework &&
        r[col('edition')] === cell.edition &&
        r[col('question')] === cell.question,
    );
    expect(row, `${cell.framework} ${cell.question}`).toBeDefined();
    expect(row![col('status')]).toBe(cell.status);
    if (cell.quote)
      expect(row![col('passage')].split('\n')[0]).toBe(cell.quote);
  }
});

test('the start page offers its ways in: questions to read and tools to use', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/');
  const ways = page.getByRole('navigation', { name: 'Ways in' });
  // Directly under the search box.
  const search = (await page.locator('.landing-search').boundingBox())!;
  const panel = (await ways.boundingBox())!;
  expect(panel.y).toBeGreaterThan(search.y + search.height - 1);
  expect(panel.y - (search.y + search.height)).toBeLessThan(80);
  const tools = ways.locator('.tool-link');
  await expect(tools).toHaveCount(6);
  for (const [name, href] of [
    ['Compare frameworks', comparison],
    ['Control timelines side by side', '/control/side-by-side'],
    ['Propositions by author', '/stances'],
    ['Browse by year', '/years'],
    ['See a map', '/dossier/openai?view=map'],
    ['Explore the records', '/explore'],
  ])
    await expect(
      ways.getByRole('link', { name: new RegExp(`^${name}`) }),
    ).toHaveAttribute('href', href);
  // Questions are readings, not tools.
  await expect(
    ways.getByRole('link', { name: 'Who controlled OpenAI, and when?' }),
  ).not.toHaveClass(/tool-link/);
  // No square brackets mark a tool, and the old blocks are gone.
  expect(await ways.innerText()).not.toMatch(/[[\]]/);
  await expect(page.locator('.landing-featured, .landing-years')).toHaveCount(
    0,
  );
  // The same tool style wherever a tool appears.
  await page.goto('/governance');
  await expect(page.locator('.tool-link[data-tool="compare"]')).toBeVisible();
  await expect(page.locator('.tool-link[data-tool="years"]')).toBeVisible();
  expect(errors).toEqual([]);
});

test('the introduction sets “you” in bold and “human part” in italics', async ({
  page,
}) => {
  await page.goto('/');
  const deck = page.locator('.landing-deck');
  await expect(deck).toContainText('What they leave to you is the human part');
  await expect(deck.locator('strong')).toHaveText('you');
  await expect(deck.locator('em')).toHaveText('human part');
});

for (const width of [390, 1280, 1366, 1440, 1920])
  test(`${width}px: no line of the start page title holds a single word`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const lines = await page.locator('#landing-title').evaluate((h1) => {
      // The words of each rendered line, from each word's box.
      const text = h1.firstChild as Text;
      const range = document.createRange();
      const words: { top: number }[] = [];
      const re = /\S+/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(text.data))) {
        range.setStart(text, m.index);
        range.setEnd(text, m.index + m[0].length);
        words.push({ top: Math.round(range.getBoundingClientRect().top) });
      }
      const byLine = new Map<number, number>();
      for (const w of words) byLine.set(w.top, (byLine.get(w.top) ?? 0) + 1);
      return [...byLine.values()];
    });
    if (lines.length > 1)
      for (const n of lines) expect(n, lines.join(' / ')).toBeGreaterThan(1);
    // On a laptop or wider, the title fits on one line (maintainer, 2026-11-01).
    if (width >= 1280) expect(lines, lines.join(' / ')).toHaveLength(1);
  });

test('the banner says how the records are made and links About', async ({
  page,
}) => {
  await page.goto('/governance');
  const status = page.locator('.site-status');
  await expect(status).toHaveText(
    'Found and cross-checked by machines · How this works →',
  );
  await expect(page.getByText(/not reviewed by an editor/i)).toHaveCount(0);
  await status.getByRole('link', { name: 'How this works →' }).click();
  await expect(page).toHaveURL(/\/about/);
  await expect(page.locator('#about-built')).toBeFocused();
  // About opens with "Why machine-first", signed by the maintainer.
  const why = page.locator('section[aria-labelledby="about-why"]');
  await expect(why.locator('strong')).toHaveText(
    'Selekoa doesn’t choose between them.',
  );
  await expect(why).toContainText('Selekoa does not replace library research.');
  await expect(why).toContainText('— the maintainer');
  await expect(
    page.locator('section[aria-labelledby="about-built"]'),
  ).toContainText('No person reads every record before publication.');
});

test('the footer and About give the configured contact address', async ({
  page,
}) => {
  await page.goto('/');
  const footer = page.locator('.site-footer');
  await expect(
    footer.getByRole('link', { name: 'maintainer@selekoa.org' }),
  ).toHaveAttribute('href', 'mailto:maintainer@selekoa.org');
  await page.goto('/about');
  await expect(
    page
      .locator('section[aria-labelledby="about-what"]')
      .getByRole('link', { name: 'maintainer@selekoa.org' }),
  ).toHaveAttribute('href', 'mailto:maintainer@selekoa.org');
});

test('390px: the comparison scrolls sideways only inside its table', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(comparison);
  await page.getByRole('button', { name: 'All frameworks' }).click();
  await expect(page.locator('.cmp-table')).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  const box = page.locator('.cmp-scroll');
  expect(await box.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(
    true,
  );
  // A cell's drawer covers the screen and closes with Escape.
  const inspect = page
    .locator('.cmp-table td')
    .getByRole('button', { name: /Inspect sources and checks/ })
    .first();
  await inspect.click();
  await expect(page.locator('.cmp-drawer')).toBeVisible();
  expect(
    (await page.locator('.cmp-drawer').boundingBox())!.width,
  ).toBeLessThanOrEqual(390);
  await page.keyboard.press('Escape');
  await expect(page.locator('.cmp-drawer')).toHaveCount(0);
  await expect(inspect).toBeFocused();
});

test('a question opened from side by side gets its own page, without the side-by-side choice', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto(comparison);
  await page.getByRole('button', { name: 'Side by side', exact: true }).click();
  await expect(page).toHaveURL(/\?frameworks=/);
  await page
    .locator('.cmp-table tbody th[scope="row"]')
    .getByRole('link', { name: 'Safeguards required' })
    .click();
  await expect(page).toHaveURL(new RegExp(`${comparison}/d3-safeguards$`));
  await page.reload();
  await expect(page.locator('#cmp-question-title')).toContainText(
    'Safeguards required',
  );
  await expect(page.locator('.cmp-rows > li')).toHaveCount(7);
  expect(errors).toEqual([]);
});

test('Back from a question returns to the table the address names', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(comparison);
  await page.getByRole('button', { name: 'One question' }).click();
  await expect(page).toHaveURL(new RegExp(`${comparison}/d1-cbrn$`));
  await expect(page.locator('.cmp-rows')).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${comparison}$`));
  await expect(page.locator('.cmp-table')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'All frameworks' }),
  ).toHaveAttribute('aria-pressed', 'true');
  expect(errors).toEqual([]);
});

test('Escape in the header search stays with the search while a cell is open', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(comparison);
  await page
    .locator('.cmp-table td')
    .getByRole('button', { name: /Inspect sources and checks/ })
    .first()
    .click();
  const drawer = page.locator('.cmp-drawer');
  await expect(drawer).toBeVisible();
  const field = page.locator('#site-search input');
  await field.fill('anthropic');
  await field.press('Escape');
  await expect(drawer).toBeVisible();
  await expect(field).toBeFocused();
  // Escape inside the drawer still closes it.
  await drawer.locator('#inspector').focus();
  await page.keyboard.press('Escape');
  await expect(drawer).toHaveCount(0);
});
